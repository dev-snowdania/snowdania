JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'Interaction',
{
	initialize: function(pName,pDescription){
		this.pcs = new jsx.PropertyChangeSupport(this);
		this.logMsg='une interaction a lieu!';
		this.name = pName;
		this.description = pDescription;
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	interact: function(pInteractiveSession){
		
		;
	},
	
	getName : function(){
		return this.name;
	},
	
	getDescription : function(){
		return this.description;
	}
	
});

_class.STATUS_ALIVE = "INTERACTION_STATUS_ALIVE";
_class.STATUS_DEAD = "INTERACTION_STATUS_DEAD";