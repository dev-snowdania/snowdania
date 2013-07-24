JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'Skill',
{
	initialize: function(level){
		this.code = null;
		this.label = null;
		this.description = null;
		this.level = level;
		this.logMessage = 'vous avez développé une nouvelle compétence';
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
	
	setLevel : function(v){
		this.level = v;
	},
	
	getLevel : function(){
		return this.level;
	},
	
	getLogMessage : function(){
		return this.logMessage;
	},
	
	getCode: function(){
		return this.code;
	}
});