Crafty.c('Monster',{
	init: function(){
		this.requires('Actor, Color, Enemy')
		.color('rgb(150,0,0)');
		
	}
	
});

Crafty.c('M1',{


	init:function(){
		this.requires('Monster')
		.color('rgb(250,0,0)')

		
	},
	
    ai: function(){
    	this.y -=1
    	
    }
	
});

