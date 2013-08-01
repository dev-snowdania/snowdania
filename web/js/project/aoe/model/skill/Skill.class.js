JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'Skill',
{
	initialize: function(pLevel,pLogJsClassName,pMaxLevel){
		
		this.level = pLevel;
		
		if(pMaxLevel){
			this.maxLevel = pMaxLevel;
		}else{
			this.maxLevel = pLevel;
		}
		
		if(pLogJsClassName){
			this.label = aoe.getLang('Sk'+pLogJsClassName+'Label');
			this.description = aoe.getLang('Sk'+pLogJsClassName+'Desc');
			this.logMessage = aoe.getLang('Sk'+pLogJsClassName+'Log');
		}
		
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	getShortcut: function(){
		return this.shortcut;
	},
	
	setLabel : function(v){
		this.label = v;
	},
	
	getLabel : function(){
		return this.label;
	},
	
	setDescription : function(v){
		this.description = v;
	},
	
	getDescription : function(){
		return this.description;
	},
	
	setLevel : function(pLevel){
		this.level = pLevel;
	},
	
	getLevel : function(){
		return this.level;
	},
	
	getLogMessage : function(){
		return this.logMessage;
	},
	
	getMaxLevel:function(){
		return this.maxLevel;
	},
	
	getRatioLevel:function(){
		return (this.level/this.maxLevel);
	},
	
	removeLevel:function(pLevel,pUnit){
		if(pUnit && pUnit=='%'){
			this.setLevel(this.level - Math.ceil((this.level*pLevel)/100)); 
		}else{
			this.setLevel(this.level - pLevel);
		}
	},
});