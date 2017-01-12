Crafty.c('Player',{

	init: function(){
		this.requires('Actor, Moving, Keyboard, Motion, Color, Collision')

			.color('rgb(0,0,100)')
			.collide()
			.bind('KeyDown', function(e) {							//Track key press (Player commanding movement)
				if(e.key == Crafty.keys.SHIFT) {
					this.sneaking = 400
				}
				if(e.key == Crafty.keys.A) {
					this.command += 1
				} else if (e.key == Crafty.keys.D) {
					this.command += 2
				} else if (e.key == Crafty.keys.W) {
					this.command += 4
				} else if (e.key == Crafty.keys.S) {
					this.command += 8
				}
			})
			.bind('KeyUp', function(e) {							//Track key release (Player cancel movement)
				if(e.key == Crafty.keys.SHIFT) {
					this.sneaking = 0
				}
				if(e.key == Crafty.keys.A) {
					this.command -=1
				} else if (e.key == Crafty.keys.D) {
					this.command -=2
				} else if (e.key == Crafty.keys.W) {
					this.command -=4
				} else if (e.key == Crafty.keys.S) {
					this.command -=8
				}
			})
		    .bind('EnterFrame', function(e,dt){
		    	if (this.moving == 0 && this.command!=0){
		    		this.move();
					
		    	}
		
		    });

			
		
	

	},
	

	  collide: function() {
		    this.onHit('Solid', this.stopMovement);
            this.onHit('Enemy', this.die);
            this.onHit('MoveLocation', this.moveLocation);
		    return this;
		},
	


	  die:function(){
		  alert("You got eaten! \n Level reached:"+ Game.level);
		  Game.level = 0
		  Game.Generate_map();
		  
	  },
	
	  stopMovement: function() {
          //  alert(hitdata)
		    this.moving = 0
		    this.cancelTween('x')
		    this.cancelTween('y')
		    this.x -= this.dx
		    this.y -= this.dy
		    this.x = Math.round(this.x/Game.map_grid.tile.width)*Game.map_grid.tile.width
		    this.y = Math.round(this.y/Game.map_grid.tile.height)*Game.map_grid.tile.height
		},
	
	
	  moveLocation: function(data){	  
		  this.cancelTween('x')
		  this.cancelTween('y')
		  //this.at_random();
		  Game.Generate_map();
		  //this.x = Game.map_grid.width*Game.map_grid.tile.width - (self.x*1.5)
		  //this.y = Game.map_grid.height*Game.map_grid.tile.height - (self.y*1.5)
		  
	  }
	
	
});
