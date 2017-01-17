Crafty.c('Terrain',{
	TerType:0,
	
	init: function(){
		this.requires('Actor, Color')
		.type('Ocean');
		
		//this.visible = false
	},
	
	
	type: function(e) {
	    if (e === undefined) {
	        return {e: this.TerType}
	    }
		switch(e){
		case "Ocean":
			this.color('rgb(0,0,100)')
		    .attr({TerType: "Ocean"});
			
		break;
		case "Grass":
			this.color('rgb(0,200,0)')
			.attr({TerType: "Grass"});
		break;
		case "Beach":
			this.color('rgb(200,200,0)')
			.attr({TerType: "Beach"});
		break;
		case "Tree":
			this.color('rgb(0,100,0)')
			.attr({TerType: "Tree"});
		break;
		case "Rock":
			this.color('rgb(100,100,100)')
			.attr({TerType: "Rock"});
		break;

		     
		}
	}
})