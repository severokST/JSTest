Crafty.c('Player',{
	init: function(){
		this.requires('Actor, Fourway, Color, Collision')

			.fourway(self.speed)
			.color('rgb(0,0,100)')
			.collide();
		    //.moveonTransition()
		    
		   //this.x = 10
		    //this.y = 10

	},
	

	  collide: function() {
		    this.onHit('Solid', this.stopMovement);
            this.onHit('Enemy', this.die);
            this.onHit('MoveLocation', this.moveLocation);
		    return this;
		},
	

	
	  stopMovement: function() {
		    this.x = 10*Game.map_grid.tile.width
		    this.y = 10*Game.map_grid.tile.height
		},
	
		moveLocation: function(){
		
		
		},
	
	  moveLocation: function(){
		  this.x = Game.map_grid.width*Game.map_grid.tile.width - (self.x*1.5)
		  this.y = Game.map_grid.height*Game.map_grid.tile.height - (self.y*1.5)
		  
	  }
	
	
});
