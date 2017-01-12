Crafty.c('Wall',{
	init: function(){
		this.requires('Actor, Color, Solid')
		.color('rgb(0, 0, 0)');
	},
});


Crafty.c('Floor',{
	init: function(){
		this.requires('Actor, Color, Floor')
		.color('rgb(200,200,200)')
		
	}
	
	
});
