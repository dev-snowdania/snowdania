JClass.import('jsx.jGraphic.JDropPanel');
//JClass.import('jsx.jGraphic.JLabel');

_class=JClass.create("SwitchEquipmentActionPanel",jsx.JDropPanel,
{
	initialize:function($super,action){
		
		$super("gPanel"+action.getJsClassName(),"gPanel gPanelInteractionAction");
		this.action = action;
		
		this.initPanel();
	},
	
	getEquipment : function(){
		return null;
	},
	
	initPanel: function(){
		
		this.button= new jsx.JButton(this.action.getLabel(),"gBtn"+this.action.getJsClassName());
		if(this.action.getStatus()==aoe.Action.STATUS_ACTIVE){
			this.button.setReadOnly(false);
		}else{
			this.button.setReadOnly(true);
		}
		this.button.addEventListener("click",function(e,pContext){
			var eqpBackpack,eqpCurrentHand=null;
			
			var jObject = pContext.backpackField.getJQuery();
			if(jObject){
				eqpBackpack = jObject.val();
			}
			
			var jObject = pContext.currentHandField.getJQuery();
			if(jObject){
				eqpCurrentHand = jObject.val();
			}
			
			MVC.doAction('aoe.controller.InteractionController','executeSwitchEquipment',[pContext.action,eqpBackpack,eqpCurrentHand]);
		},this);
		
		this.sep1 = new jsx.JSeparator();
		this.sep2 = new jsx.JSeparator();
		
		this.initBackpackField();
		this.initCurrentHandField();
		
	},
	
	initBackpackField: function(){
		
		this.backpackField = new jsx.JSelectField(null,{},"gFieldInteractionActionBackpackChooser"+this.action.getJsClassName(),"gFld gSelectFld gFieldInteractionActionSkillChooser");
		this.backpackField.addOption("","-- none --");
		this.backpackField.addOption("addToBackpack","-- Ajouter au backapack --");
		
		this.backpackField.addEventListener("change",function(e,pContext){
			var eqpBackpack,eqpCurrentHand=null;
			
			var jObject = pContext.backpackField.getJQuery();
			if(jObject){
				eqpBackpack = jObject.val();
			}
			
			var jObject = pContext.currentHandField.getJQuery();
			if(jObject){
				eqpCurrentHand = jObject.val();
			}
			
			MVC.doAction('aoe.controller.InteractionController','checkSwitchEquipment',[pContext.action,eqpBackpack,eqpCurrentHand]);
		},this);
		
		var backpackManager = this.action.getContext().getPlayer().getBackpack();
		backpackManager.reset().each(function(pEquipment,pList,pContext){
			pContext.backpackField.addOption(pEquipment.getOid(),pEquipment.getLabel());
		},this);
	},
	
	initCurrentHandField: function(){
		
		this.currentHandField = new jsx.JSelectField(null,{},"gFieldInteractionActionCurrentHandChooser"+this.action.getJsClassName(),"gFld gSelectFld gFieldInteractionActionSkillChooser");
		this.currentHandField.addOption("","-- none --");
		this.currentHandField.addOption("addToCurrentHand","-- Ajouter à main courante --");
		
		this.currentHandField.addEventListener("change",function(e,pContext){
			var eqpBackpack,eqpCurrentHand=null;
			
			var jObject = pContext.backpackField.getJQuery();
			if(jObject){
				eqpBackpack = jObject.val();
			}
			
			var jObject = pContext.currentHandField.getJQuery();
			if(jObject){
				eqpCurrentHand = jObject.val();
			}
			
			MVC.doAction('aoe.controller.InteractionController','checkSwitchEquipment',[pContext.action,eqpBackpack,eqpCurrentHand]);
		},this);
		
		var currentHandManager = this.action.getContext().getPlayer().getCurrentHand();
		currentHandManager.reset().each(function(pEquipment,pList,pContext){
			pContext.currentHandField.addOption(pEquipment.getOid(),pEquipment.getLabel());
		},this);
	},
	
	draw: function($super){
		this.gHeaderTitlePanel.addComponent(this.button);
		
		this.gContentPanel.addComponent(this.sep1);
		
		this.gContentPanel.addComponent(this.backpackField);
		
		this.gContentPanel.addComponent(this.sep2);
		
		this.gContentPanel.addComponent(this.currentHandField);
		
		$super();
	},
	
	getAction: function(){
		return this.action;
	},
	
	getActionButton: function(){
		return this.button;
	},
	
	getEquipmentChooserField: function(){
		return null;
	},
	
	getBackpackField: function(){
		return this.backpackField;
	},
	
	getCurrentHandField: function(){
		return this.currentHandField;
	},
	
	propertyChange: function(evt){
		
		var action = evt.getSource();
		
		switch(evt.getPropertyName()){
			case 'status':
				if(evt.getNewValue()==aoe.Action.STATUS_ACTIVE){
					this.gHeaderPanel.getJQuery().effect("highlight", {color:"orange"}, 3000);
					this.getActionButton().setReadOnly(false);
				}else{
					this.getActionButton().setReadOnly(true);
				}
			break;
			
		}
	},
});