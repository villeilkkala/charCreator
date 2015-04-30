		/**
		* @author       Ville Ilkkala <ville.ilkkala@gmail.com>
		* @copyright    2015 Ville Ilkkala
		* @license      {@link http://opensource.org/licenses/MIT}
		*/
		
		/****************
		CHARACTER CREATOR
		*****************

		--Description--
		This plugin is used to create dynamic game characters with Phaser and MightyEditor.

		--Usage--
		Include plugin in the index.html
		<script type="text/javascript" src="js/lib/charCreator.js"></script>

		Load it inside the boot.js create() function:
		this.game.plugin=this.game.plugins.add(Phaser.Plugin.charCreator);

		New character is created by calling the plugin's charCreate function as follows:

		this.someCharacter = this.game.plugin.charCreate({
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

		--ToDo--
		- make an alternative for tinting sprites for performance
		- make animations dynamic

		--Data sctucture--
		Parts should be arranged into groups as follows. Place sprites at [sprites]. Names and quantities don't matter.

		character_master (main group of your character)
			character
				upper_body
					front_arm
						shirt
							shirt1
								[sprites]
							shirt2
							shirt[n]
						arm
							arm1
								[sprites]
							arm2
							arm[n]							
						front_forearm
							shirt
								shirt1
									[sprites]
								shirt2
								shirt[n]
							arm
								arm1
									[sprites]
								arm2
								arm[n]							
							front_hand
								hand
									hand1
										[sprites]
									hand2
									hand[n]
					head
						head1
							face
								jewelry
									jewelry1
										[sprites]
									jewelry2
									jewelry[n]								
								beard
									beard1
										[sprites]
									beard2
									beard[n]									
								mouth
									mouth1
										[sprites]
									mouth2
									mouth[n]								
								hair_front
									hair1
										[sprites]
									hair2
									hair[n]									
								eyebrows
									left_eyebrow
										eyebrow1
											[sprites]
										eyebrow2
										eyebrow[n]									
									right_eyebrow
										eyebrow1
											[sprites]
										eyebrow2
										eyebrow[n]
								moustache
									moustache1
										[sprites]
									moustache2
									moustache[n]									
								nose
									nose1
										[sprites]
									nose2
									nose[n]								
								cheeks
									left_cheek
										cheek1
											[sprites]
										cheek2
										cheek[n]										
									right_cheek
										cheek1
											[sprites]
										cheek2
										cheek[n]								
								front_eye
									eye1
										eyeball (sprite)
										eye1 (sprite, named same as the parent, tint is used on this to make it skintoned)
										eye1_while (sprite)
									eye2
									eye[n]									
								rear_eye
									eye1
										eyeball (sprite)
										eye1 (sprite, named same as the parent, tint is used on this to make it skintoned)
										eye1_while (sprite)
									eye2
									eye[n]								
								head
									[sprites]
								hair_back
									hair1
										[sprites]
									hair2
									hair[n]
							neck
								neck1
									[sprites]
								neck2
								neck[n]							
						head2
						...head[n]						
					torso
						clothes
						[sprites]
					rear_arm
						shirt
							shirt1
								[sprites]
							shirt2
							shirt[n]
						arm
							arm1
								[sprites]
							arm2
							...arm[n]							
						rear_forearm
							shirt
								shirt1
									[sprites]
								shirt2
								shirt[n]
							arm
								arm1
									[sprites]
								arm2
								arm[n]
							rear_hand
								hand
									hand1
										[sprites]
									hand2
									hand[n]
				front_leg
					pants
						pants1
							[sprites]
						pants2
						pants[n]					
					leg
						leg1
							[sprites]
						leg2
						leg[n]					
					front_shin
						pants
							pants1
								[sprites]
							pants2
							pants[n]					
						leg
							leg1
								[sprites]
							leg2
							leg[n]
						front_foot
							shoe
								shoe1
									[sprites]
								shoe2
								shoe[n]							
							foot
								foot1
									[sprites]
								foot2
								foot[n]												
				rear_leg
					pants
						pants1
							[sprites]
						pants2
						pants[n]					
					leg
						leg1
							[sprites]
						leg2
						leg[n]					
					rear_shin
						pants
							pants1
								[sprites]
							pants2
							pants[n]					
						leg
							leg1
								[sprites]
							leg2
							leg[n]
						rear_foot
							shoe
								shoe1
									[sprites]
								shoe2
								shoe[n]							
							foot
								foot1
									[sprites]
								foot2
								foot[n]				
*/

Phaser.Plugin.charCreator = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);
};
 
Phaser.Plugin.charCreator.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.charCreator.prototype.constructor = Phaser.Plugin.SamplePlugin;
 
Phaser.Plugin.charCreator.prototype.charCreate = function (char) {		

		//Create the character using MightyEditor's mt.create.

		this.character = mt.create(char.source);
		mt.createTweens(this.character);
		
		for (var name in char.colors) {
			char.colors[name] = "0x"+char.colors[name];
		}

		//this is used to enable things afterwards.
		this.parts = new Array();
		
		
		/**********************
		****Torso manager******
		**********************/
		
		this.upper_body = this.character.mt.children.character.mt.children.upper_body.mt.children;
		
		this.torso = defineAsset({
			source:			this.upper_body.torso.mt.children,
			prefix:			"torso",
			number:			char.bodyparts.torso,
			color:			char.colors.skintone,
			parts:			this.parts
		});
		
		/**********************
		Legs and pants manager
		**********************/
		
		this.front_leg = this.character.mt.children.character.mt.children.front_leg.mt.children;
		this.rear_leg = this.character.mt.children.character.mt.children.rear_leg.mt.children;
		
		this.ass_pants = defineAsset({
			source:			this.torso.mt.children.clothes.mt.children.pants.mt.children,
			prefix:			"pants",
			number:			char.clothing.pants,
			color:			char.colors.pants,
			parts:			this.parts
		});	
		
		this.frontThighBody = defineAsset({
			source:			this.front_leg.leg.mt.children,
			prefix:			"leg",
			number:			char.bodyparts.legs,
			color:			char.colors.skintone,
			parts:			this.parts
		});	
		
		this.rearThighBody = defineAsset({
			source:			this.rear_leg.leg.mt.children,
			prefix:			"leg",
			number:			char.bodyparts.legs,
			color:			char.colors.skintone,
			parts:			this.parts
		});			
		
		this.frontThighPants = defineAsset({
			source:			this.front_leg.pants.mt.children,
			prefix:			"pants",
			number:			char.clothing.pants,
			color:			char.colors.pants,
			parts:			this.parts
		});	
			
		this.rearThighPants = defineAsset({
			source:			this.rear_leg.pants.mt.children,
			prefix:			"pants",
			number:			char.clothing.pants,
			color:			char.colors.pants,
			parts:			this.parts
		});
		
		this.frontShinBody = defineAsset({
			source:			this.front_leg.front_shin.mt.children.leg.mt.children,
			prefix:			"leg",
			number:			char.bodyparts.legs,
			color:			char.colors.skintone,
			parts:			this.parts
		});			

		this.rearShinBody = defineAsset({
			source:			this.rear_leg.rear_shin.mt.children.leg.mt.children,
			prefix:			"leg",
			number:			char.bodyparts.legs,
			color:			char.colors.skintone,
			parts:			this.parts
		});					
		
		this.frontShinPants = defineAsset({
			source:			this.front_leg.front_shin.mt.children.pants.mt.children,
			prefix:			"pants",
			number:			char.clothing.pants,
			color:			char.colors.pants,
			parts:			this.parts
		});	
		
		this.rearShinPants = defineAsset({
			source:			this.rear_leg.rear_shin.mt.children.pants.mt.children,
			prefix:			"pants",
			number:			char.clothing.pants,
			color:			char.colors.pants,
			parts:			this.parts
		});
		
		this.frontFootBody = defineAsset({
			source:			this.front_leg.front_shin.mt.children.front_foot.mt.children.foot.mt.children,
			prefix:			"foot",
			number:			char.bodyparts.legs,
			color:			char.colors.skintone,
			parts:			this.parts
		});
		
		this.rearFootBody = defineAsset({
			source:			this.rear_leg.rear_shin.mt.children.rear_foot.mt.children.foot.mt.children,
			prefix:			"foot",
			number:			char.bodyparts.legs,
			color:			char.colors.skintone,
			parts:			this.parts
		});		

		this.frontFootShoe = defineAsset({
			source:			this.front_leg.front_shin.mt.children.front_foot.mt.children.shoe.mt.children,
			prefix:			"shoe",
			number:			char.clothing.shoes,
			color:			char.colors.shoes,
			parts:			this.parts
		});
		
		this.rearFootShoe = defineAsset({
			source:			this.rear_leg.rear_shin.mt.children.rear_foot.mt.children.shoe.mt.children,
			prefix:			"shoe",
			number:			char.clothing.shoes,
			color:			char.colors.shoes,
			parts:			this.parts
		});
		
		
		/**********************
		Shirt and arms manager
		**********************/
		
		this.shirt = defineAsset({
			source:			this.torso.mt.children.clothes.mt.children.shirt.mt.children,
			prefix:			"shirt",
			number:			char.clothing.shirt,
			color:			char.colors.shirt,
			parts:			this.parts
		});
		
		this.front_arm = this.upper_body.front_arm.mt.children;

		this.frontArmBody = defineAsset({
			source:			this.front_arm.arm.mt.children,
			prefix:			"arm",
			number:			char.bodyparts.arms,
			color:			char.colors.skintone,
			parts:			this.parts
		});
		
		this.frontArmSleeve = defineAsset({
			source:			this.front_arm.shirt.mt.children,
			prefix:			"shirt",
			number:			char.clothing.shirt,
			color:			char.colors.shirt,
			parts:			this.parts
		});	
		
		this.rear_arm = this.upper_body.rear_arm.mt.children;

		this.rearArmBody = defineAsset({
			source:			this.rear_arm.arm.mt.children,
			prefix:			"arm",
			number:			char.bodyparts.arms,
			color:			char.colors.skintone,
			parts:			this.parts
		});		
		
		this.rearArmSleeve = defineAsset({
			source:			this.rear_arm.shirt.mt.children,
			prefix:			"shirt",
			number:			char.clothing.shirt,
			color:			char.colors.shirt,
			parts:			this.parts
		});
		
		this.front_forearm = this.front_arm.front_forearm.mt.children;
		
		this.frontForearmBody = defineAsset({
			source:			this.front_arm.front_forearm.mt.children.arm.mt.children,
			prefix:			"arm",
			number:			char.bodyparts.arms,
			color:			char.colors.skintone,
			parts:			this.parts
		});		
		
		this.frontForearmSleeve = defineAsset({
			source:			 this.front_forearm.shirt.mt.children,
			prefix:			"shirt",
			number:			char.clothing.shirt,
			color:			char.colors.shirt,
			parts:			this.parts
		});	
		
		this.rear_forearm = this.rear_arm.rear_forearm.mt.children;

		this.rearForearmBody = defineAsset({
			source:			this.rear_arm.rear_forearm.mt.children.arm.mt.children,
			prefix:			"arm",
			number:			char.bodyparts.arms,
			color:			char.colors.skintone,
			parts:			this.parts
		});			
		
		this.rearForearmSleeve = defineAsset({
			source:			 this.rear_forearm.shirt.mt.children,
			prefix:			"shirt",
			number:			char.clothing.shirt,
			color:			char.colors.shirt,
			parts:			this.parts
		});

		this.frontHandBody = defineAsset({
			source:			this.front_arm.front_forearm.mt.children.front_hand.mt.children.hand.mt.children,
			prefix:			"hand",
			number:			char.bodyparts.arms,
			color:			char.colors.skintone,
			parts:			this.parts
		});
		
		this.rearHandBody = defineAsset({
			source:			this.rear_arm.rear_forearm.mt.children.rear_hand.mt.children.hand.mt.children,
			prefix:			"hand",
			number:			char.bodyparts.arms,
			color:			char.colors.skintone,
			parts:			this.parts
		});		

		
		/**********************
		****Boobs manager*****
		**********************/		
		if(this.shirt != undefined) {
		this.boobs = this.shirt.mt.children["boobs"+char.clothing.shirt];
			if (char.bodyparts.boobs == true) {
				this.parts.push(this.boobs);
				tint(this.boobs, char.colors.shirt);	
			} else this.boobs.visible = false;
		}
		
		
		/**********************
		*****Head manager******
		**********************/
		this.head = defineAsset({
			source:			 this.upper_body.head.mt.children,
			prefix:			"head_",
			number:			char.bodyparts.head,
			color:			char.skintone,
			parts:			this.parts
		});	
		
		this.face = this.head.mt.children.face.mt.children;	
		this.face_body = this.face.head;
		tint(this.face_body, char.colors.skintone);
		
		this.neck = this.head.mt.children.neck;
		tint(this.neck, char.colors.skintone);
			
		this.beard = defineAsset({
			source:			 this.face.beard.mt.children,
			prefix:			"beard",
			number:			char.hair.beard,
			color:			char.colors.beard,
			parts:			this.parts
		});			
		
		this.leftEyebrow = defineAsset({
			source:			 this.face.eyebrows.mt.children.left_eyebrow.mt.children,
			prefix:			"eyebrow",
			number:			char.hair.eyebrows,
			color:			char.colors.eyebrow,
			parts:			this.parts
		});	
		
		this.rightEyebrow = defineAsset({
			source:			 this.face.eyebrows.mt.children.right_eyebrow.mt.children,
			prefix:			"eyebrow",
			number:			char.hair.eyebrows,
			color:			char.colors.eyebrow,
			parts:			this.parts
		});			
		
		this.moustache = defineAsset({
			source:			 this.face.moustache.mt.children,
			prefix:			"moustache",
			number:			char.hair.moustache,
			color:			char.colors.moustache,
			parts:			this.parts
		});		

		this.nose = defineAsset({
			source:			 this.face.nose.mt.children,
			prefix:			"nose",
			number:			char.headparts.nose,
			color:			char.colors.skintone,
			parts:			this.parts
		});	
		
		this.mouth = defineAsset({
			source:			 this.face.mouth.mt.children,
			prefix:			"mouth",
			number:			char.headparts.mouth,
			color:			null,
			parts:			this.parts
		});
		
		this.leftCheek = defineAsset({
			source:			 this.face.cheeks.mt.children.left_cheek.mt.children,
			prefix:			"cheek",
			number:			char.headparts.cheeks,
			color:			char.colors.skintone,
			parts:			this.parts
		});	
		
		this.rightCheek = defineAsset({
			source:			 this.face.cheeks.mt.children.right_cheek.mt.children,
			prefix:			"cheek",
			number:			char.headparts.cheeks,
			color:			char.colors.skintone,
			parts:			this.parts
		});				
		
		this.hairFront = defineAsset({
			source:			 this.face.hair_front.mt.children,
			prefix:			"hair",
			number:			char.hair.hair,
			color:			char.colors.hair,
			parts:			this.parts
		});		
		
		this.hairRear = defineAsset({
			source:			 this.face.hair_back.mt.children,
			prefix:			"hair",
			number:			char.hair.hair,
			color:			char.colors.hair,
			parts:			this.parts
		});	
		
		
		/**********************
		*****Eyes manager******
		**********************/		

		// Eyes have the white part separate from the skintoned overlay, which has to be tinted separately

		this.frontEye = defineAsset({
			source:			 this.face.front_eye.mt.children,
			prefix:			"eye",
			number:			char.headparts.eyes,
			color:			null,
			parts:			this.parts
		});

		this.frontEye.mt.children["eye"+char.headparts.eyes].tint = char.colors.skintone;
		
		this.rearEye = defineAsset({
			source:			 this.face.rear_eye.mt.children,
			prefix:			"eye",
			number:			char.headparts.eyes,
			color:			null,
			parts:			this.parts
		});

		this.rearEye.mt.children["eye"+char.headparts.eyes].tint = char.colors.skintone;
		
		this.eye = this.rearEye.mt.children["eye"+char.headparts.eyes];
		tint(this.rearEye["eye"+char.eyes], char.colors.skintone);

		
		/**********************
		**Animations manager***
		**********************/	
		
		// Set base animations
		this.character.mt.movies.baseWalk = this.character.mt.movies[char.animations.walkstyle];


		
		/**********************
		*******Finally*********
		**********************/			
		
		//Set all parts visible	before returning
		setVisible(this.parts);
		
		//Return everything, hooray!
		return this.character;
		
		
		/**********************
		****Helper functions***
		**********************/	
				
		// Main asset defining function
		function defineAsset(asset) {
			var a = asset.source;
			setInvisible(a);
			a = a[asset.prefix+asset.number.toString()];
			asset.parts.push(a);
			if(asset.color != null) tint(a, asset.color);
			return a;
		}	
		
		// Sets all objects invisible before choosing which one to use
		function setInvisible(group) {
			for(var h in group) {group[h].visible = false;}		
		}
		
		// Sets the chosen items visible
		function setVisible(array) {
			array.forEach(function (part) {
				if(part != undefined) part.visible = true;
			});			
		}
		
		// Tints objects. Takes the last group with only sprites inside as a parameter. That's why there is the mt.children after object.
		function tint(object, color) {
			if (object == undefined) return;
			for(var h in object.mt.children) {
				object.mt.children[h].tint = color;
			}
		}
};