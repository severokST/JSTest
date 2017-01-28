Crafty.c('Monster',{
	init: function(){
		this.requires('Actor, Moving, Color, Enemy,Collision')
		.color('rgb(150,0,0)')
		.collide()
		.bind('EnterFrame', function(e,dt){
			if (this.moving == 0){		
				this.ai();
				this.move();
			}
		})
		
	},
	
	ai: function(){
		this.speed = 1200;
		var mx = this.x - Game.Player.x;
		var my = this.y - Game.Player.y;
		var agro = 200;
		if (Game.Player.sneaking){agro = 20;}
		
		var distance = Math.sqrt(mx*mx + my*my);
		if (distance < agro){
			
			this.speed = 200;
		
			if (Math.abs(mx) > Math.abs(my)){
				if(mx>0){this.command = 1;}
				else{this.command = 2;}
				
			}
			else{
				if (my>0){this.command = 4;}
				else{this.command = 8;}
			}
			console.log("Command: " + this.command);
			
		}
		else{
			this.command = 1<<Math.round(Math.random()*4);
		}
			
			
		 
		
	},
	
	collide: function() {
	    this.onHit('Solid', this.stopMovement);
	    return this;
	},

	  stopMovement: function() {
		    this.moving = 0
		    this.cancelTween('x')
		    this.cancelTween('y')
		    //this.x -= this.dx
		    //this.y -= this.dy
		    this.x = Math.round(this.x/Game.map_grid.tile.width)*Game.map_grid.tile.width
		    this.y = Math.round(this.y/Game.map_grid.tile.height)*Game.map_grid.tile.height
		},
});

Crafty.c('M1',{


	init:function(){
		this.requires('Monster')
		.color('rgb(250,0,0)')

		
		

		
	},

	
});

