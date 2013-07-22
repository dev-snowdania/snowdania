JClass.import('aoe.model.interaction.Interaction');

JClass.import('aoe.model.Skill');
JClass.import('aoe.model.SkillManager');

_class= JClass.create( 'MeuteLoupsAffames', aoe.Interaction,
{
	initialize: function($super){
		$super();
		this.logMsg='une meute de loup affamé vous attaque!';

		this.name = "Meute de loup affamée";
		this.description = "La meute de loup est un ennemi redoutable. La force du groupe, des griffes acérées et des crocs aiguisés sont autant d'atouts qui les rendent difficiles à vaincre. La bataille va être rude."
		
		this.skills = new aoe.SkillManager();
		
		var griffer	= new aoe.Skill();
		griffer.setLabel('Griffer');
		griffer.setDescription('se battre avec les griffe');
		griffer.setLevel(2);
		this.skills.add(griffer);
		
		var mordre = new aoe.Skill();
		mordre.setLabel('Mordre');
		mordre.setDescription('attaque avec la gueule');
		mordre.setLevel(2);
		this.skills.add(mordre);
	},
	
	getName : function(){
		return this.name;
	},
	
	getDescription : function(){
		return this.description;
	},
});