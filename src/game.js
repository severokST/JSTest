
Game = {

		level: 0,
		
        obj_list: {
        	map_tile:[],
        	objects:[],
        	enemies:[]
        },
        
        map:[],
        Player:0,

		map_grid: {
			width: 50,
			height: 25,
			tile: {
				width: 20,
				height: 20
			}
		},
		
		location:{
			x:25,
			y:50,
			map: {
				width: 500,
				height: 500
			}
		},
		
		width: function(){
			
			return this.map_grid.width * this.map_grid.tile.width;
		},
		
		height: function(){
			
			return this.map_grid.height * this.map_grid.tile.height;
		},
		
		

		start: function(){

			Crafty.init(Game.width(), Game.height());
			Crafty.background('green');


			for (var x = 0; x<Game.map_grid.width;x++){

				Game.obj_list.map_tile[x]= new Array(Game.map_grid.height);
				//console.log("Spawned Array")
				for (var y = 0; y<Game.map_grid.height;y++){
					var at_edge = x == 0 || x == Game.map_grid.width -1 || y == 0  || y == Game.map_grid.height - 1;
					if (at_edge){
						Crafty.e('Transition').at(x,y);				
					}
					
					Game.obj_list.map_tile[x][y] = Crafty.e('Terrain').at(x,y);
				}
			}
		
				
			
			Game.Player = Crafty.e('Player').at(10,10);
			
			Game.Generate_map(Game.location.x,Game.location.y);
			Game.Load_area();
			
			

		},
		
		Generate_map: function(){
				for(var x = 0; x<Game.location.map.width;x++){
					Game.map[x]= new Array(Game.location.map.height);
					for(var y = 0; y<Game.location.map.height;y++){
						Game.map[x][y]=0;		//Initialise Grid.   0 = Ocean
					}
				}
				for(var p = 0; p<4;p++){
					x = Math.round(Math.random()*Game.location.map.width/2)+Game.location.map.width/4;
					y = Math.round(Math.random()*Game.location.map.height/2)+Game.location.map.height/4;
					Game.map[x][y]=1;
				}
													//Place Island seed tile -   1 = Grass
				for(var p = 0; p<=500;p++){			//Randomly expand island into neighbouring tiles. 
					for(var x = 2; x<Game.location.map.width-2;x++){
						for(var y = 2; y<Game.location.map.height-2;y++){
							if(p==500){					//Check for coast - Generate shore
								if(Game.map[x][y]==1){
									var acc = 0;
									for(var xs = x-1;xs<=x+1;xs++){
										for(var ys = y-1;ys<=y+1;ys++){
											if(Game.map[xs][ys]==0){acc = 1;}
										}
									}
									if(acc){Game.map[x][y]=2}
								}
							}
							else{
								if(Game.map[x][y]==0){	

									var acc = 0;
									for(var xs = x-2;xs<=x+2;xs++){				//Scan neighboruing tiles in 5x5 area
										for(var ys = y-2;ys<=y+2;ys++){
										    var check = (xs!=x||ys!=y)
											if (check){
												acc+=Game.map[xs][ys];			//More neighbouring land = more likely to spread
											}
										}
									}
									if(Math.random()*180<=acc){Game.map[x][y]=1}	//Selected via trial and error. 
								}
							}
						}
					}
					
				}
				for(var x = 2; x<Game.location.map.width-2;x++){
					for(var y = 2; y<Game.location.map.height-2;y++){
						if(Game.map[x][y]==1){
							var resource = Math.round(Math.random()*200);
							switch(resource){
								case 0:
								case 1:
									Game.map[x][y]=3;
									break;
								case 10:
									Game.map[x][y]=4;
							}
						}
					}
				}
				for(var p = 0; p<=10;p++){			//Randomly expand island into neighbouring tiles. 
					for(var x = 2; x<Game.location.map.width-2;x++){
						for(var y = 2; y<Game.location.map.height-2;y++){
							var tacc = 0;
							var racc = 0;
							if(Game.map[x][y]==1){
								var acc = 0;
								for(var xs = x-1;xs<=x+1;xs++){
									for(var ys = y-1;ys<=y+1;ys++){
										if(Game.map[xs][ys]==3){tacc+=1}
										if(Game.map[xs][ys]==4){racc+=1}
									}
								}
									if(Math.random()*12<=tacc){Game.map[x][y]=3}
								else{
									if(Math.random()*50<=racc){Game.map[x][y]=4}
								}
		
							}
						}
					}
				}
				
			},
		
		Load_area: function(){
		//	
			var x = Game.location.x;
			var y = Game.location.y;
			console.log("Loading area: "+x+", "+y)
        //    console.log("Purge objects")
			while(Game.obj_list.objects.length){			//Todo: Swap with Store function for revisiting area
				objpurge= Game.obj_list.objects.pop();
				objpurge.destroy();
			}
       //     console.log("Purge enemies")
			while(Game.obj_list.enemies.length){			//Ditto?
				objpurge= Game.obj_list.enemies.pop();
				objpurge.destroy();
			}
        //    console.log("Purging done")
			
			for(var xregion=0;xregion<10;xregion++){								//Select X-region of tiles
				for(var yregion=0;yregion<5;yregion++){								//Select Y-region of tiles
					var Tx = x*10+xregion											//Precalc array index
					var Ty = y*5+yregion											//JS does not seem to like calculations in index
					//console.log(Tx)
					//console.log(Ty)
				    //console.log(Game.map[Tx][Ty])
					var TerrType = Game.map[Tx][Ty];								//Load terrain type from array
					//console.log(TerrType)
					for(var xrfill=xregion*5;xrfill<xregion*5+5 ;xrfill++){		//X-Region to fill
						for(var yrfill=yregion*5;yrfill<yregion*5+5;yrfill++){		//Y-Region to fill
							//var drawx = xregion*5+xrfill
							//var drawy = yregion*5+yrfill
							//TerrType = yregion;
							//console.log(TerrType)
							switch(TerrType){
								case 0:
									//console.log("Set terain")
									Game.obj_list.map_tile[xrfill][yrfill].type("Ocean");
									//console.log("Type set")
									break;
								case 1:
									Game.obj_list.map_tile[xrfill][yrfill].type("Grass");
									break;
								case 2:
									Game.obj_list.map_tile[xrfill][yrfill].type("Beach");
									break;
								case 3:
									Game.obj_list.map_tile[xrfill][yrfill].type("Tree");
									break;
								case 4:
									Game.obj_list.map_tile[xrfill][yrfill].type("Rock");
									break;
							}
							//console.log("Terrain set")
						}
					}
				}
			}
			//console.log("Doneso")
		}

	}
	
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
	/*		
			
			
			
			
			Game.level += 1;
			
			while(Game.obj_list.length){
				objpurge= Game.obj_list.pop();
				objpurge.destroy();}
			Game.obj_list.push(Crafty.e('Transition').at_random());

			for(var count = 0; count<Game.level;count++){Game.obj_list.push(Crafty.e('Monster').at_random());}
			
			//Game.obj_list.push(Crafty.e('M1').at_random());
			//Game.obj_list.push(Crafty.e('Monster').at_random());

			//var listlength = Game.obj_list.length
			//while(listlength > 1){
			//	list_item = Game.obj_list.pop();
			//	list_item.destroy();
			//	listlength = Game.obj_list.length
			//}
			for(var count = 0; count<5*Game.level+20;count++){
				var x1 = Math.floor(Math.random()* Game.map_grid.width-2)+1;
				var y1 = Math.floor(Math.random()* Game.map_grid.height-2)+1;
				var length = Math.floor(Math.random()*3);
				var direction = Math.floor(Math.random()*2);
				switch (direction){
					case 0:
						var x2 = x1;
						var y2 = y1 + length;
						break;
						
					case 1:
						var x2 = x1 + length;
						var y2 = y1;
						break
				}
				for(var x_place = x1; x_place<=x2;x_place++){
					for(var y_place = y1; y_place<=y2; y_place++){
						Game.obj_list.push(Crafty.e('Wall').at(x_place,y_place));
								
					}
				}
			
				
				
			}
			
		}
}*/