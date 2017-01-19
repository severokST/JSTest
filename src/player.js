Crafty.c('Player',{

	init: function(){
		this.requires('Actor, Moving, Keyboard, Motion, Color, Collision, Gamepad')
			.gamepad(0)
			// TODO: encapsulate better to be vendor-generic
			.bind('GamepadKeyChange', function (e) {
				var button = e.button;
				var value = e.value; // 1 or 0
				// These values are specific to a Logitech F310
				// Not sure if other controllers are similar or not
				// Button 12: up
				// Button 13: down
				// Button 14: left
				// Button 15: right
				// value is 1 on press, we want to add
				// value is 0 on release, we want to subtract
				var addOrSubtract = value == 1 ? 1 : -1;
				// Key down
				if (button == 14) { // left
					this.command += addOrSubtract;
				} else if (button == 15) { // right
					this.command += 2 * addOrSubtract;
				} else if (button == 12) { // up
					this.command += 4 * addOrSubtract;
				} else if (button == 13) { // down
					this.command += 8 * addOrSubtract;
				}
			})
			.color('rgb(0,0,255)')
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
	

	collide: function(){
		//  alert("Collision")
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
	
	stopMovement: function(){
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
		  
		  alert("moving")
		  this.cancelTween('x')
		  this.cancelTween('y')
		  
		  var Trans = data[0].obj
		  
		 // alert(Trans.x + " " + Trans.y)
		  
		  if (Trans.x == 0){
			  alert("Left")
			  Game.location.x-=1;
			  this.at(10,10);
			 // this.x = 
			  //this.x = Game.map_grid.width -2*Game.map_grid.tile.width;
		  }
		  if (Trans.x == (Game.map_grid.width-1)*Game.map_grid.tile.width){
			  alert("Right")
			  Game.location.x+=1;
			  this.at(10,10);
			 // this.x = 2*Game.map_grid.tile.width;
		  }
		  if (Trans.y == 0){
			  alert("Up")
			  Game.location.y-=1;
			  alert(Game.location.y)
			  this.at(10,10);
			//  this.y = Game.map_grid.height-2*Game.map_grid.tile.height;	  
		  }
		  if (Trans.y == (Game.map_grid.height-1)*Game.map_grid.tile.height){
			  alert("Down")
			  Game.location.y+=1;
			  this.at(10,10);
			 // this.y = 2*Game.map_grid.tile.height;
		  }
		  
		 //  alert("To load area")
		  Game.Load_area();
		  // alert("Area loaded")
		  //this.at_random();
		  //Game.Generate_map();
		  //this.x = Game.map_grid.width*Game.map_grid.tile.width - (self.x*1.5)
		  //this.y = Game.map_grid.height*Game.map_grid.tile.height - (self.y*1.5)
		  
	  }
	
	
});
