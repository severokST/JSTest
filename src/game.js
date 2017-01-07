Game = {
		
		
		map_grid: {
			width: 102,
			height: 57,
			tile: {
				width: 10,
				height: 10
			}
		},
		
		width: function(){
			
			return this.map_grid.width * this.map_grid.tile.width;
		},
		
		height: function(){
			
			return this.map_grid.height * this.map_grid.tile.height;
		},
		
		

		start: function(){
			
			Crafty.init(1020,570);
			Crafty.background('green');
		
		
			for (var x = 0; x<Game.map_grid.width;x++){
				for (var y = 0; y<Game.map_grid.height;y++){
					var at_edge = x == 0 || x == Game.map_grid.width -1 || y == 0  || y == 45|| y == Game.map_grid.height - 1;
					if (at_edge){
						Crafty.e('2D,Canvas,Color')
							.attr({
								x: x*Game.map_grid.tile.width,
								y: y*Game.map_grid.tile.height,
								w: Game.map_grid.tile.width,
								h: Game.map_grid.tile.height
							})
							.color('rgb(0,0,0)');
						
						
					}
					else{
						if(y>45){
							Crafty.e('2D,Canvas,Color')
								.attr({
									x: x*Game.map_grid.tile.width,
									y: y*Game.map_grid.tile.height,
									w: Game.map_grid.tile.width,
									h: Game.map_grid.tile.height
									
								})
							.color('rgb(50,50,200)');
						}
					}

				}
			}
		
		}
}