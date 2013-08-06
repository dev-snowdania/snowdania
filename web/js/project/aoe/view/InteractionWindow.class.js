JClass.import('jsx.jGraphic.JWindow');

JClass.import('aoe.view.TopInteractionPanel');
JClass.import('aoe.view.LeftInteractionPanel');
JClass.import('aoe.view.RightInteractionPanel');

_class=JClass.create("InteractionWindow",jsx.JWindow,
{
	initialize:function($super,width,player1,player2,pMapCase){
		$super("popupInteraction","popup_block",width);
		
		this.modal = true;
		
		this.topInteractionPanel= new aoe.TopInteractionPanel(this,pMapCase);
		this.leftInteractionPanel= new aoe.LeftInteractionPanel(this,player1);
		this.rightInteractionPanel= new aoe.RightInteractionPanel(this,player2);
	},
	
	getLeftInteractionPanel:function(){
		return this.leftInteractionPanel;
	},
	
	getRightInteractionPanel:function(){
		return this.rightInteractionPanel;
	},
	
	getTopInteractionPanel:function(){
		return this.topInteractionPanel;
	},
	
	draw : function($super){
		
		this.addComponent(this.topInteractionPanel);
		this.addComponent(this.leftInteractionPanel);
		this.addComponent(this.rightInteractionPanel);
			
		$super();
	},
	
	propertyChange: function(evt){
		//console.log(evt.getSource().getJsClassName());
		if(evt.getSource() instanceof aoe.Equipment){
			this.propertyChangeEquipment(evt);
		}else if(evt.getSource() instanceof aoe.Interaction){
			this.propertyChangeInteraction(evt);
		}else if(evt.getSource() instanceof aoe.Action){
			this.propertyChangeAction(evt);
		}
		else{
			switch(evt.getSource().getJsClassName()){
				case "InteractiveSession":
					this.propertyChangeInteractiveSession(evt);
					break;
				case "EquipmentManager":
					this.propertyChangeEquipmentManager(evt);
					break;
				default:
					//this.propertyChangeDefault(evt);
					break;
			}
		}
	},
	
	propertyChangeEquipmentManager: function(evt){
		
		var eqp = evt.getNewValue();
		
		this.leftInteractionPanel.getActionPanelManager().reset().each(function(pPanel,pList,pEvt){
			if(pPanel.getEquipmentChooserField() && pPanel.getAction().getEquipmentJsClassName().intersect([eqp.getJsClassName()]).length>0){
				switch(evt.getPropertyName()){
					case 'addHandEquipment':
						if(!pPanel.getEquipmentChooserField().hasOption(eqp.getOid())){
							pPanel.getEquipmentChooserField().addOption(eqp.getOid(),eqp.getLabel());
							
							pPanel.getEquipmentChooserField().setValue(eqp.getOid());
							
							pPanel.getEquipmentChooserField().getJQuery().trigger("change");
							
							pPanel.addEquipmentPanel(eqp);
						}
					break;
					case 'removeHandEquipment':
						if(pPanel.getEquipmentChooserField().hasOption(eqp.getOid())){
							pPanel.getEquipmentChooserField().removeOption(eqp.getOid());
							
							pPanel.removeEquipmentPanel(eqp);
						}
					break;
					default:
						break;
				}
			}
		},evt);
		
		switch(evt.getPropertyName()){
			case 'addHandEquipment':
				this.leftInteractionPanel.getActionPanelManager().get("SwitchEquipment").getCurrentHandField().addOption(eqp.getOid().toString(),eqp.getLabel());
			break;
			case 'removeHandEquipment':
				this.leftInteractionPanel.getActionPanelManager().get("SwitchEquipment").getCurrentHandField().removeOption(eqp.getOid().toString());
			break;
			case 'addEquipment':
				this.leftInteractionPanel.getActionPanelManager().get("SwitchEquipment").getBackpackField().addOption(eqp.getOid().toString(),eqp.getLabel());
			break;
			case 'removeEquipment':
				this.leftInteractionPanel.getActionPanelManager().get("SwitchEquipment").getBackpackField().removeOption(eqp.getOid().toString());
			break;
			default:
				break;
		}
	},
	
	propertyChangeAction: function(evt){
		
		/*var panel;
		if(evt.getSource().getContext().getPlayer().getJsClassName() == 'Player'){
			panel = this.leftInteractionPanel;
		}else{
			//panel = this.rightInteractionPanel;
			return false;
		}
		
		var action = evt.getSource();
		var actionPanel = panel.getActionPanelManager().get(action.getJsClassName());
		
		switch(evt.getPropertyName())
		{
			case 'status':
				//console.log("action status change for "+action.getJsClassName());
				if(evt.getNewValue()==aoe.Action.STATUS_ACTIVE){
					actionPanel.getActionButton().setReadOnly(false);
				}else{
					actionPanel.getActionButton().setReadOnly(true);
				}
			break;
			
		}*/
	},
	
	propertyChangeEquipment: function(evt){
		var eqp = evt.getSource();
		
		this.leftInteractionPanel.getActionPanelManager().reset().each(function(pPanel,pList,pEvt){
			var eqp2 = pPanel.getEquipment();
			if(eqp2 && eqp2.compareTo(eqp)){
				switch(evt.getPropertyName()){
					case 'unit':
						pPanel.getEquipmentUnitField().setValue(evt.getNewValue());
					break;
					case 'quality':
						pPanel.getEquipmentQualityField().setValue(evt.getNewValue()+" ("+aoe.getLang(evt.getSource().getQualityLabel())+")");
					break;
					case 'strength':
						pPanel.getEquipmentDamageField().setValue(evt.getNewValue());
					break;
					
				}
			}
		},evt);
		
	},
	
	propertyChangeInteraction: function(evt){
		switch(evt.getPropertyName())
		{
			case 'status':
				if(evt.getNewValue()==aoe.LivingInteraction.STATUS_DEAD){
					this.rightInteractionPanel.getJQuery().addClass('gPanelDead');
				}
			break;
			case 'pdv':
				this.rightInteractionPanel.getHealthField().setValue(evt.getNewValue());
			break;
		}
	},
	
	propertyChangeInteractiveSession: function(evt){
		switch(evt.getPropertyName())
		{
			case 'turn':
				if(evt.getNewValue()==aoe.InteractiveSession.PLAYER){
					this.leftInteractionPanel.activate();
					this.rightInteractionPanel.desactivate();
				}else{
					this.rightInteractionPanel.activate();
					this.leftInteractionPanel.desactivate();
				}
			break;
			case 'status':
				if(evt.getNewValue()=='stop'){
					this.close();
				}
				break;
			case 'distance':
				this.topInteractionPanel.getDistanceField().setValue(evt.getNewValue());
				if(evt.getNewValue()<10){
					//this.leftInteractionPanel.getInteractiveButtonsManager(true).get('ShotArrow').setReadOnly(true);
				}else{
					//this.leftInteractionPanel.getInteractiveButtonsManager(true).get('ShotArrow').setReadOnly(false);
				}
			break;
			
		}
	}
});