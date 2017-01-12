
Game = {
		
		level: 0,
        obj_list:[],
        Player:0,
        

		map_grid: {
			width: 50,
			height: 25,
			tile: {
				width: 20,
				height: 20
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

				for (var y = 0; y<Game.map_grid.height;y++){
					var at_edge = x == 0 || x == Game.map_grid.width -1 || y == 0  || y == Game.map_grid.height - 1;
					if (at_edge){
						Crafty.e('Wall').at(x,y);				
					}
					//else{
					//	Crafty.e('Floor').at(x,y);
				
					//}

				}
			}
				
		   
				
				

			


			
			

			Game.Player = Crafty.e('Player').at(10,10);
			
			Game.Generate_map();


		
		},
		
		Generate_map: function(){
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
			for(var count = 0; count<5*Game.level;count++){
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
}