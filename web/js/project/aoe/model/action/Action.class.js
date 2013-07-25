JClass.import('jsx.entities.PropertyChangeSupport');

JClass.import('jsx.observable.ObservableList');

_class= JClass.create( 'Action',
{
	initialize: function(){
		this.skillClassName = null;
		this.equipmentClassName = null;
		this.label = null;
		this.description = null;
		this.logMessage = {};
		this.context = new jsx.ObservableList();
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
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
	
	getLogMessage : function(){
		return this.logMessage;
	},
	
	getContext : function(){
		return this.context;
	},
	
	doable: function(pPlayer){
		if(this.skillClassName){
			var skills = pPlayer.getSkills().getByJsClassName(this.skillClassName);
			if(skills.length==0){
				return false;
			}
			this.addToContext(skills[0],'skill');
		}
		
		if(this.equipmentClassName){
			var equipments = pPlayer.getCurrentHand().getByJsClassName(this.equipmentClassName);
			if(equipments.length==0){
				return false;
			}
			this.addToContext(equipments[0],'equipment');
		}
		
		return true;
	},
	
	addToContext : function(pObject, pKey){
		this.context.add(pObject, pKey);
	},
	
	execute: function(){
		
		var level = this.preExecute();
		
		var diceThrow=Dice.throwD100(level);
		var r = diceThrow.succeed;
	
		var msg = this.logMessage[diceThrow.quality];
		
		var result = {result: r, diceThrow: diceThrow, logMessage: msg};
		
		this.postExecute(r,diceThrow);
		
		console.log(level);
		console.log(diceThrow);
		console.log(result);
		
		//var interactiveSession = this.context.get('interactiveSession');
		
		//MVC.doAction('aoe.controller.InteractionController','playOpponent',[]);
		
		return result;
	}
});