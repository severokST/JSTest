
Game = {

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
					else{
						Crafty.e('Floor').at(x,y);
				
					}

				}


			
			}

			Crafty.e('Player').at(10,10);
			Crafty.e('Transition').at(1,10);
			
			Crafty.e('M1').at(10,20);
			Crafty.e('Monster').at(20,20);

		
		}
}