JClass.import('jsx.entities.PropertyChangeSupport');

JClass.import('aoe.model.EquipmentManager');

JClass.import('aoe.model.Skill');
JClass.import('aoe.model.SkillManager');

_class= JClass.create( 'Player',
{
	initialize: function(type)
	{
		this.name=null;
		this.img=null;
		this.score=0;
		this.force=60;
		this.dexterite=60;
		this.intelligence=60;
		this.pointVie=100;
		this.pointMagie=0;
		this.argent=100;
		this.lang=null;
		this.posX=-1;
		this.posY=-1;
		
		this.skills = new aoe.SkillManager();
		
		var bagarre = new aoe.Skill();
		bagarre.setLabel('Bagarre');
		bagarre.setDescription('se battre avec les poings');
		bagarre.setLevel(1);
		this.skills.add(bagarre);
		
		var fuir = new aoe.Skill();
		fuir.setLabel('Fuir');
		fuir.setDescription('fuir un combat');
		fuir.setLevel(1);
		this.skills.add(fuir);
		
		var marchander = new aoe.Skill();
		marchander.setLabel('Marchander');
		marchander.setDescription('pouvoir de négociation');
		marchander.setLevel(1);
		this.skills.add(marchander);
		
		this.backpack=new aoe.EquipmentManager();
		this.backpack.setEventKeys('addEquipment','removeEquipment');
		this.currentHand=new aoe.EquipmentManager();
		this.currentHand.setEventKeys('addHandEquipment','removeHandEquipment');
		
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function()
	{
		return this.pcs;
	},

	setPosX : function(x)
	{
		this.posX=x;
	},
	
	setPosY : function(y)
	{
		this.posY=y;
	},
	
	getPosX : function()
	{
		return this.posX;
	},
	
	getPosY : function()
	{
		return this.posY;
	},
	
	setName : function(name)
	{
		var oldValue=this.name;
		this.name=name;
		this.pcs.firePropertyChange('name',oldValue,this.name);
	},

	setScore : function(score)
	{
		this.score=score;
	},

	getName : function(name)
	{
		return this.name;
	},
	
	getPointVie : function()
	{
		return this.pointVie;
	},
	
	getPointMagie : function()
	{
		return this.pointMagie;
	},
	
	getForce : function()
	{
		return this.force;
	},
	
	getDexterite : function()
	{
		return this.dexterite;
	},
	
	getIntelligence : function()
	{
		return this.intelligence;
	},
	
	getArgent : function()
	{
		return this.argent;
	},
	
	setImage : function(pImg)
	{
		this.img=pImg;
	},
	
	getImage : function()
	{
		return this.img;
	},
	
	setLang : function(l)
	{
		this.lang=l;
	},
	
	getLang : function()
	{
		return this.lang;
	},
	
	getBackpack : function()
	{
		return this.backpack;
	},
	
	getCurrentHand : function()
	{
		return this.currentHand;
	},
	
	getSkills : function(){
		return this.skills;
	},
	
	fireInitialProperties : function()
	{
		this.pcs.firePropertyChange('name',null,this.name);
		this.pcs.firePropertyChange('img',null,this.img);
		/*this.equipement.each(function(pEquip,i)
		{
			this.pcs.firePropertyChange('addEquipment',{object:pEquip});
		},this);*/
	}
});