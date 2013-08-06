JClass.import('aoe.model.interaction.LivingInteraction');

JClass.import('aoe.model.skill.Skill');
//JClass.import('aoe.model.skill.Stealth');
JClass.import('aoe.model.skill.Wrestling');
JClass.import('aoe.model.SkillManager');

JClass.import('aoe.model.equipment.Claw');

_class= JClass.create( 'LoupSolitaire', aoe.LivingInteraction,
{
	initialize: function($super){
		$super(
				"Loup Solitaire",
				"Le loup solitaire s'est fait exclure de la meute suite à une attaque ratée de cervidé, au moment ou la meute en avait le plus besoin. En attendant de trouver une louve et former un couple alpha, le loup solitaire parcours les forets et les landes là où la nourriture se fait rare. Il a de grande chance d'être hostile et s'attaquera facilement à un individu solitaire.",
				300,
				10
				);
		this.logMsg='un loup solitaire vous attaque!';
		
		var run = new aoe.Running(80);
		this.skills.add(run,run.getJsClassName());
		
		var wrestling = new aoe.Wrestling(90);
		this.skills.add(wrestling,wrestling.getJsClassName());
		
		//var stealth = new aoe.Stealth(70);
		//this.skills.add(stealth,stealth.getJsClassName());
		
		this.currentHand=new aoe.EquipmentManager();
		
		var claw = new aoe.Claw();
		this.currentHand.add(claw,claw.getOid());
	},
	
	interact: function($super,pInteractiveSession){
		
		if(this.actionManager){
			
			//artifical intelligence for the interaction
			var action = this.actionManager.get("DoNothing");
			
			if(pInteractiveSession.getDistance()>1){
				action = this.actionManager.get("MoveForward");
				if(!action.checkStatus()){
					action = this.actionManager.get("DoNothing");
				}
			}else if(pInteractiveSession.getDistance()==1){
				action = this.actionManager.get("Catch");
				if(!action.checkStatus()){
					console.log('oups no!');
					action = this.actionManager.get("DoNothing");
				}
			}
			else{
				if(pInteractiveSession.getTurnCounter()==1){
					//try to sneak
					//action = this.actionManager.get("Sneak");
					action = this.actionManager.get("ScratchByClaw");
				}else{
					//50% to attack with claws / 50% to attack with muzzle;
					action = this.actionManager.get("ScratchByClaw");
				}
			}
			MVC.doAction('aoe.controller.InteractionController','executeAction',[action,null,null]);
		
			/*var action = this.actionManager.get("DoNothing");
			MVC.doAction('aoe.controller.InteractionController','executeAction',[action]);*/
			
		}
	}
});