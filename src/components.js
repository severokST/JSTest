Crafty.c('Map', {
	init: function(){
		this.requires('Canvas');
		
		
	}
})

Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  },
  
  at_random: function(){
	  
	  var clear = 0				//Attempt to pick a random location currently not occupied
	  var tx = 0				//Temporary selected x-y positions
	  var ty = 0
	  while (clear == 0){
		  clear = 1;
		  tx = Math.round(Math.random()*Game.map_grid.width+1)-2;		//Select potential location
		  ty = Math.round(Math.random()*Game.map_grid.height+1)-2;
		  if (tx==0||ty==0||tx==Game.map_grid.width||ty==Game.map_grid.height){clear = 0;}	//Test against map boundries
		  if (tx==Game.Player.x && ty ==Game.Player.y){clear = 0;}							//Test against player location
		  for (var objcheck = 0; objcheck<Game.obj_list.length;objcheck++){
			  if(tx==Game.obj_list[objcheck].x&&ty==Game.obj_list[objcheck].y){clear = 0;}	//Test against existing level objects
		  }
	  }
	  
	  this.attr({x: tx*Game.map_grid.tile.width,y: ty*Game.map_grid.tile.width});		//Area clear, place object
	  
	  return this;
  }
  
});

Crafty.c('Actor',{

	init: function(){
		this.requires('2D, Canvas, Grid')

	}
});

Crafty.c('Moving',{
	moving:0,
	command:0,
	speed:200,
	sneaking:0,
	init: function(){
		
		this.requires('Actor,Tween')

		    .bind('TweenEnd', function(e){
		    	this.moving = 0
		    })

	},
	
	move: function(){
		if (this.moving == 0){
			switch(this.command){
			case 1:
				this.tween({x:this.x-Game.map_grid.tile.width},this.speed+this.sneaking);
				this.moving = 1 ;
				break;
			case 2:
				this.tween({x:this.x+Game.map_grid.tile.width},this.speed+this.sneaking);
				this.moving = 2 ;
				break;
			case 4:
				this.tween({y:this.y-Game.map_grid.tile.width},this.speed+this.sneaking);
				this.moving = 4 ;
				break;
			case 8:
				this.tween({y:this.y+Game.map_grid.tile.width},this.speed+this.sneaking);
				this.moving = 8 ;
				break;
		
			}
		}
		
		
	}
	

})




Crafty.c('Transition',{
	init: function(){
		this.requires('Actor, Color, MoveLocation')
		.color('rgb(0,100,0)');
		
	}
	
})


