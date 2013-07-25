JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'Interaction',
{
	initialize: function(){
		this.pcs = new jsx.PropertyChangeSupport(this);
		this.logMsg='une interaction a lieu!';
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	setActionManager:function(pActManager){
		this.actionManager = pActManager;
	},
	
	interact: function(player){
		
		if(this.actionManager){
			var action = this.actionManager.get("DoNothing");
			MVC.doAction('aoe.controller.InteractionController','executeAction',[action]);
		}
	},
	
	wound : function(damage){
		console.log(this.getJsClassName()+" perd "+damage+" points de vie");
	}
	
});