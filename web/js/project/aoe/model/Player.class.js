JClass.import('jsx.entities.PropertyChangeSupport');

//managers
JClass.import('aoe.model.EquipmentManager');
JClass.import('aoe.model.SkillManager');

//Equipment
JClass.import('aoe.model.equipment.Sword');
JClass.import('aoe.model.equipment.Backpack');

//skills
JClass.import('aoe.model.skill.Fencing');
JClass.import('aoe.model.skill.Wrestling');
JClass.import('aoe.model.skill.Running');
JClass.import('aoe.model.skill.Archery');
JClass.import('aoe.model.skill.Stealth');
JClass.import('aoe.model.skill.Concentrate');


_class= JClass.create( 'Player',
{
	initialize: function(type){
		
		this.name = null;
		this.img = null;
		this.score = 0;
		this.force = 40;
		this.dexterite = 40;
		this.intelligence = 40;
		this.pointVie = 1000;
		this.pointMagie = 0;
		this.argent = 0;
		this.popularity = 0;
		this.attitude = aoe.Player.ATTITUDE_NEUTRAL;
		this.pointExperience = 0;
		this.speed = 5; // in kilometer per hour
		this.lang = null;
		this.posX = -1;
		this.posY = -1;
		
		this.skills = new aoe.SkillManager();
		
		var fencing = new aoe.Fencing(40);
		this.skills.add(fencing,fencing.getJsClassName());
		
		var wrestling = new aoe.Wrestling(10);
		this.skills.add(wrestling,wrestling.getJsClassName());
		
		var run = new aoe.Running(80);
		this.skills.add(run,run.getJsClassName());
		
		var concentrate = new aoe.Concentrate(40);
		this.skills.add(concentrate,concentrate.getJsClassName());
		
		var archery = new aoe.Archery(50);
		this.skills.add(archery,archery.getJsClassName());
		
		this.backpack=new aoe.EquipmentManager();
		this.backpack.setEventKeys('addEquipment','removeEquipment');
		
		var backpack = new aoe.Backpack();
		this.backpack.setContainer(backpack);
		
		var sword = new aoe.Sword();
		this.backpack.addObject(sword);
		
		this.currentHand=new aoe.EquipmentManager();
		this.currentHand.setEventKeys('addHandEquipment','removeHandEquipment');
		
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},

	setPosX : function(x){
		this.posX=x;
	},
	
	setPosY : function(y){
		this.posY=y;
	},
	
	getPosX : function(){
		return this.posX;
	},
	
	getPosY : function()
	{
		return this.posY;
	},
	
	getSpeed : function(turn){
		if(turn){
			return Math.ceil(((this.speed*1000)/3600)*3);
		}else{
			return this.speed;
		}
	},
	
	setName : function(name){
		var oldValue=this.name;
		this.name=name;
		this.pcs.firePropertyChange('surname',oldValue,this.name);
	},
	
	setPointVie : function(pdv){
		var oldValue=this.pointVie;
		this.pointVie=pdv;
		this.pcs.firePropertyChange('pdv',oldValue,this.pointVie);
	},
	
	setArgent : function(arg){
		var oldValue=this.argent;
		this.argent=arg;
		this.pcs.firePropertyChange('arg',oldValue,this.argent);
	},
	
	setAttitude : function(atd){
		var oldValue=this.attitude;
		this.attitude=atd;
		this.pcs.firePropertyChange('atd',oldValue,this.attitude);
	},
	
	setPopularity : function(pop){
		var oldValue=this.popularity;
		this.popularity=pop;
		this.pcs.firePropertyChange('pop',oldValue,this.popularity);
	},

	setScore : function(score){
		this.score=score;
	},
	
	setActionManager:function(pActManager){
		this.actionManager = pActManager;
	},
	
	getActionManager:function(pReset){
		if(pReset){
			this.actionManager.reset();
		}
		return this.actionManager;
	},

	getName : function(name){
		return this.name;
	},
	
	getPointVie : function(){
		return this.pointVie;
	},
	
	getPointMagie : function(){
		return this.pointMagie;
	},
	
	getForce : function(){
		return this.force;
	},
	
	getDexterite : function(){
		return this.dexterite;
	},
	
	getIntelligence : function(){
		return this.intelligence;
	},
	
	getArgent : function(){
		return this.argent;
	},
	
	getAttitude : function(){
		return this.attitude;
	},
	
	setImage : function(pImg){
		this.img=pImg;
	},
	
	getImage : function(){
		return this.img;
	},
	
	setLang : function(l){
		this.lang=l;
	},
	
	getLang : function(){
		return this.lang;
	},
	
	getBackpack : function(reset){
		if(reset){
			this.backpack.reset();
		}
		return this.backpack;
	},
	
	getCurrentHand : function(reset){
		if(reset){
			this.currentHand.reset();
		}
		return this.currentHand;
	},
	
	getSkills : function(reset){
		if(reset){
			this.skills.reset();
		}
		return this.skills;
	},
	
	fireInitialProperties : function(){
		this.pcs.firePropertyChange('surname',null,this.name);
		this.pcs.firePropertyChange('img',null,this.img);
		this.pcs.firePropertyChange('pdv',null,this.pointVie);
		this.pcs.firePropertyChange('arg',null,this.argent);
		this.pcs.firePropertyChange('atd',null,this.attitude);
		this.pcs.firePropertyChange('pop',null,this.popularity);
		
		this.backpack.fireInitialProperties();
	},
	
	wound : function(damage){
		this.setPointVie((this.pointVie - damage));
		console.log(this.getJsClassName()+" perd "+damage+" points de vie");
	}
});

//methods & constants class
_class.ATTITUDE_AGRESSIVE = -2;
_class.ATTITUDE_HOSTILE = -1;
_class.ATTITUDE_NEUTRAL = 0;
_class.ATTITUDE_SOCIAL = 1;
_class.ATTITUDE_FRIENDLY = 2;