"use strict";
window.characterCreator.state.play = {
	preload: function(){
	},
	
	create: function(){

		
		this.dude = this.game.plugin.charCreate({
			source:			"character_master",
			bodyparts: {
				torso:		1,			
				arms:		1,		
				legs:		1,
				head: 		2,	
				boobs:		false,
			},
			headparts: {
				mouth:		1,
				eyes:		1,
				cheeks:		1,
				nose:		1,
			},
			hair: {
				hair:		3,
				moustache:	1,
				eyebrows:	1,
				beard:		1,
			},			
			clothing: {
				shirt:		2,
				shoes:		1,
				pants:		1,				
			},
			colors: {	
				hair:		"999966",
				beard:		"877D69",
				moustache:	"877D69",
				eyebrow: 	"877D69",
				shirt:		"CE9E39",
				skintone:	"ffe0bd",
				pants:		"50ADB8",
				shoes:		"999966",
			},
			animations: {						
				idle:		"baseIdle",
				walkstyle:	"baseWalk",
			},
			
		});	
		console.log(this.dude);
		this.dude.mt.movies.baseWalk.start().loop();
		
	},
	
	update: function(){
		

	}
};