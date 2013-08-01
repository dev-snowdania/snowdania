JClass.import('aoe.model.interaction.Interaction');

JClass.import('aoe.model.skill.Skill');
//JClass.import('aoe.model.skill.Stealth');
JClass.import('aoe.model.skill.Wrestling');
JClass.import('aoe.model.SkillManager');

JClass.import('aoe.model.equipment.Claw');

_class= JClass.create( 'MeuteLoupsAffames', aoe.Interaction,
{
	initialize: function($super){
		$super(
				"Meute de loup affamée",
				"La meute de loup est un ennemi redoutable. La force du groupe, des griffes acérées et des crocs aiguisés sont autant d'atouts qui les rendent difficiles à vaincre. La bataille va être rude."
				);
		this.logMsg='une meute de loup affamé vous attaque!';

		this.pointVie=500;

		this.skills = new aoe.SkillManager();
		
		/*var griffer	= new aoe.Skill();
		griffer.setLabel('Griffer');
		griffer.setDescription('se battre avec les griffe');
		griffer.setLevel(2);
		this.skills.add(griffer);
		
		var mordre = new aoe.Skill();
		mordre.setLabel('Mordre');
		mordre.setDescription('attaque avec la gueule');
		mordre.setLevel(2);
		this.skills.add(mordre);*/
		
		var wrestling = new aoe.Wrestling(60);
		this.skills.add(wrestling,wrestling.getJsClassName());
		
		var stealth = new aoe.Stealth(70);
		this.skills.add(stealth,stealth.getJsClassName());
		
		this.currentHand=new aoe.EquipmentManager();
		
		var claw = new aoe.Claw();
		this.currentHand.add(claw,claw.getJsClassName());
	},
	
	interact: function($super,pInteractiveSession){
		
		if(this.actionManager){
			
			//artifical intelligence for the interaction
			var action = this.actionManager.get("DoNothing");
			if(pInteractiveSession.getTurnCounter()==1){
				//try to sneak
				//action = this.actionManager.get("Sneak");
				action = this.actionManager.get("ScratchByClaw");
			}else{
				//50% to attack with claws / 50% to attack with muzzle;
				action = this.actionManager.get("ScratchByClaw");
			}
			MVC.doAction('aoe.controller.InteractionController','executeAction',[action]);
			
			/*var action = this.actionManager.get("DoNothing");
			MVC.doAction('aoe.controller.InteractionController','executeAction',[action]);*/
		}
	}
});