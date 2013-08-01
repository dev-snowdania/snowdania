JClass.import('jsx.entities.PropertyChangeSupport');

JClass.import('jsx.observable.ObservableList');

_class= JClass.create( 'Action',
{
	initialize: function(pLogJsClassName){
		this.skillClassName = null;
		this.equipmentClassName = null;
		
		if(pLogJsClassName){
			this.label = aoe.getLang('Act'+pLogJsClassName+'Label');
			this.description = aoe.getLang('Act'+pLogJsClassName+'Desc');
			this.logMessage = aoe.getLang('Act'+pLogJsClassName+'Log');
		}
		
		this.player = null;
		this.opponent = null;
		this.skill = null;
		this.equipment = null;
		this.mapCase = null;
		this.context = null;
		
		this.status = aoe.Action.STATUS_ACTIVE;
		
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	getSkillJsClassName: function(){
		return this.skillClassName;
	},
	
	getEquipmentJsClassName: function(){
		return this.equipmentClassName;
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
	
	getPlayer : function(){
		return this.player;
	},
	
	getOpponent : function(){
		return this.opponent;
	},
	
	getMapCase : function(){
		return this.mapCase;
	},
	
	getEquipment : function(){
		return this.equipment;
	},
	
	getSkill : function(){
		return this.skill;
	},
	
	clone : function(){
		this.context = new jsx.ObservableList();
		this.oid=++OBJECT_GLOBAL_COUNTER;
	},
	
	setContext : function(pInteractiveSession,pPlayer){
		
		this.context = pInteractiveSession;
		
		//init default objects
		if(this.skillClassName){
			var skills = pPlayer.getSkills().getByJsClassName(this.skillClassName);
			if(skills.length==0){
				return false;
			}
			this.skill = skills[0];
		}
		
		if(this.equipmentClassName){
			var equipments = pPlayer.getCurrentHand().getByJsClassName(this.equipmentClassName);
			if(equipments.length==0){
				return false;
			}
			this.equipment = equipments[0];
		}
	},
	
	setStatus : function(pStatus){
		if(pStatus != this.status){
			var oldValue=this.status;
			this.status = pStatus;
			this.pcs.firePropertyChange('status',oldValue,this.status);
		}
		
		//console.log(this.getJsClassName()+": "+this.status);
	},
	
	getStatus : function(){
		return this.status;
	},
	
	checkStatus : function(pSkill,pEquipment){
		
		if(!pSkill){
			pSkill = this.skill;
		}
		
		if(!pEquipment){
			pEquipment = this.equipment;
		}
		
		status = aoe.Action.STATUS_ACTIVE;
		
		/*if(!this.equipment){
			if(this.equipmentClassName){
				var equipments = this.player.getCurrentHand().getByJsClassName(this.equipmentClassName);
				if(equipments.length==0){
					return false;
				}
				this.addToContext(equipments[0],'equipment');
			}
		}*/
		
		if(pEquipment){
			if(!pEquipment.checkForAction(this)){
				status = aoe.Action.STATUS_INACTIVE;
			}
		}else{
			if(this.equipmentClassName){
				status = aoe.Action.STATUS_INACTIVE;
			}
		}
		
		if(pSkill){
			;
		}else{
			if(this.skillClassName){
				status = aoe.Action.STATUS_INACTIVE;
			}
		}

		this.setStatus(status);
		
		return this.status;
	},
	
	doable: function(pPlayer){
		/*if(this.skillClassName){
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
		}*/
		
		return true;
	},
	
	execute: function(pSkill,pEquipment){
		
		
		if(this.context.getTurn()==aoe.InteractiveSession.PLAYER){
			this.player = this.context.getPlayer();
			this.opponent = this.context.getInteraction();
		}else{
			this.opponent = this.context.getPlayer();
			this.player = this.context.getInteraction();
		}
		
		if(pSkill){
			this.skill = pSkill;
		}
		
		if(pEquipment){
			this.equipment = pEquipment;
		}
		
		this.checkStatus();
		
		if(this.status==aoe.Action.STATUS_INACTIVE){
			return false;
		}
		
		
		var level = this.preExecute();
		
		if(level){
		
			console.log(this.logMessage['execute'].sub('%s',this.player.getJsClassName()));
			
			var diceThrow=Dice.throwD100(level);
			var r = diceThrow.succeed;
		
			var msg = this.logMessage[diceThrow.quality];
			
			console.log(msg.sub("%s",this.opponent.getJsClassName()));
			
			var result = {result: r, diceThrow: diceThrow, logMessage: msg};
			
			this.postExecute(r,diceThrow);
			
			//var interactiveSession = this.context.get('interactiveSession');
			
			//MVC.doAction('aoe.controller.InteractionController','playOpponent',[]);
			
			return result;
		}else{
			return  {result: r};
		}
	}
});

_class.STATUS_ACTIVE = "ACTION_STATUS_ACTIVE";
_class.STATUS_INACTIVE = "ACTION_STATUS_INACTIVE";