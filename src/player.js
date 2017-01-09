Crafty.c('Player',{
	
	command:0,
	moving:0,
	init: function(){
		this.requires('Actor, Keyboard, Motion, Color, Collision, Tween')

			//.fourway(self.speed)
			.color('rgb(0,0,100)')
			.collide()
			.bind('KeyDown', function(e) {							//Track key press (Player commanding movement)
				if(e.key == Crafty.keys.LEFT_ARROW) {
					this.command += 1
					//this.x+=10
					//this.tween({x:this.x-Game.map_grid.tile.width},100)
				} else if (e.key == Crafty.keys.RIGHT_ARROW) {
					this.command += 2
					//this.tween({x:this.x+Game.map_grid.tile.width},100)
				} else if (e.key == Crafty.keys.UP_ARROW) {
					this.command += 4
				} else if (e.key == Crafty.keys.DOWN_ARROW) {
					this.command += 8
				}
			})
			.bind('KeyUp', function(e) {							//Track key release (Player cancel movement)
				if(e.key == Crafty.keys.LEFT_ARROW) {
					this.command -=1
				} else if (e.key == Crafty.keys.RIGHT_ARROW) {
					this.command -=2
				} else if (e.key == Crafty.keys.UP_ARROW) {
					this.command -=4
				} else if (e.key == Crafty.keys.DOWN_ARROW) {
					this.command -=8
				}
			})
			.bind('TweenEnd', function(e){
				this.moving = 0
			})
			.bind('EnterFrame', function(e,dt){
				if (this.moving == 0){
					switch(this.command){
					case 1:
						this.tween({x:this.x-Game.map_grid.tile.width},200)
						this.moving = 1 
						break;
					case 2:
						this.tween({x:this.x+Game.map_grid.tile.width},200)
						this.moving = 2 
						break;
					case 4:
						this.tween({y:this.y-Game.map_grid.tile.width},200)
						this.moving = 4 
						break;
					case 8:
						this.tween({y:this.y+Game.map_grid.tile.width},200)
						this.moving = 8 
						break;
					
					}
					
				  
					
				}
			
			})
			
		
	

	},
	

	  collide: function() {
		    this.onHit('Solid', this.stopMovement);
            this.onHit('Enemy', this.die);
            this.onHit('MoveLocation', this.moveLocation);
		    return this;
		},
	


	
	  stopMovement: function() {

		    this.moving = 0
		    this.cancelTween('x')
		    this.cancelTween('y')
		    this.x -= this.dx
		    this.y -= this.dy
		},
	
	
	  moveLocation: function(){
		  this.x = Game.map_grid.width*Game.map_grid.tile.width - (self.x*1.5)
		  this.y = Game.map_grid.height*Game.map_grid.tile.height - (self.y*1.5)
		  
	  }
	
	
});
