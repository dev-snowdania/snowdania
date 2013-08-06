JClass.import('jsx.jGraphic.JDropPanel');
//JClass.import('jsx.jGraphic.JLabel');

JClass.import('aoe.view.ActionEquipmentPanel');

_class=JClass.create("InteractionActionPanel",jsx.JDropPanel,
{
	initialize:function($super,action){
		$super("gPanel"+action.getJsClassName(),"gPanel gPanelInteractionAction");
		
		this.action = action;
		this.equipment = this.action.getEquipment();
		this.skill = this.action.getSkill();
		
		this.equipmentPanelManager = {};
		
		this.initPanel();
	},
	
	getAction: function(){
		return this.action;
	},
	
	getEquipment : function(){
		return this.equipment;
	},
	
	initPanel: function(){
		
		this.button= new jsx.JButton(this.action.getLabel(),"gBtn"+this.action.getJsClassName());
		if(this.action.getStatus()==aoe.Action.STATUS_ACTIVE){
			this.button.setReadOnly(false);
		}else{
			this.button.setReadOnly(true);
		}
		this.button.addEventListener("click",function(e,action){
			var p = this.jObject.parents(".gPanelInteractionAction");
			
			var skill,equipment;
			
			var skillChooser = p.find(".gFieldInteractionActionSkillChooser");
			if(skillChooser.length){
				skill = skillChooser.val();
			}
			
			var equipmentChooser = p.find(".gFieldInteractionActionEquipmentChooser");
			if(equipmentChooser.length){
				equipment = equipmentChooser.val();
			}
			
			MVC.doAction('aoe.controller.InteractionController','executeAction',[action,skill,equipment]);
		},this.action);
		
		this.sep1 = new jsx.JSeparator();
		this.sep2 = new jsx.JSeparator();
		this.sep3 = new jsx.JSeparator();
		this.sep4 = new jsx.JSeparator();
		
		if(this.action.getSkillJsClassName()){
				
			if(this.skill){
				this.skillField = new jsx.JTextField(this.skill.getLevel(),"gFieldInteractionActionSkill"+this.action.getJsClassName(),"gFld gTxtFld gReadOnlyFld");
				this.skillLabel = new jsx.JLabel(this.skill.getLabel(),this.skillField,"gLabelInteractionAction"+this.action.getJsClassName(),"gLabel gLabelFld");
			}
			
			this.skillChooserField = new jsx.JSelectField(null,{},"gFieldInteractionActionSkillChooser"+this.action.getJsClassName(),"gFld gSelectFld gFieldInteractionActionSkillChooser");
			this.skillChooserField.addOption("","-- none --");
			
			this.skillChooserField.addEventListener("change",function(e,action){
				
				var p = jQuery("#"+this.id).parents(".gPanelInteractionAction");
				
				var skill,equipment;
				
				skill = this.jObject.val();
				
				var equipmentChooser = p.find(".gFieldInteractionActionEquipmentChooser");
				if(equipmentChooser.length){
					equipment = equipmentChooser.val();
				}
				
				MVC.doAction('aoe.controller.InteractionController','checkAction',[action,skill,equipment]);
			},this.action);
			
			var skillManager = this.action.getContext().getPlayer().getSkills(true);
			var sk,val = null;
			while(sk=skillManager.next()){
				if(sk.getJsClassName() == this.action.getSkillJsClassName()){
					val = sk.getJsClassName();
					this.skillChooserField.addOption(sk.getJsClassName(),sk.getLabel()+" ("+sk.getLevel()+")");
				}
			}
			
			this.skillChooserField.setValue(val);
		}
		
		if(this.action.getEquipmentJsClassName().length>0){
			this.equipmentChooserField = new jsx.JSelectField(null,{},"gFieldInteractionActionEquipmentChooser"+this.action.getJsClassName(),"gFld gSelectFld gFieldInteractionActionEquipmentChooser");
			this.equipmentChooserField.addOption("","-- none --");
			
			this.equipmentChooserField.addEventListener("change",function(e,action){
				
				
				
				var prt = this.jObject.parents(".gPanelInteractionAction");
				
				var skill,equipment;
				
				var skillChooser = prt.find(".gFieldInteractionActionSkillChooser");
				if(skillChooser.length){
					skill = skillChooser.val();
				}
				
				equipment = this.jObject.val();
				
				prt.find(".gPanelInteractionActionEquipment").hide();
				prt.find("#gPanel"+action.getJsClassName()+equipment).show();
				
				MVC.doAction('aoe.controller.InteractionController','checkAction',[action,skill,equipment]);
			},this.action);
			
			this.action.getContext().getPlayer().getCurrentHand().reset().each(function(pEquipment,pList,pContext){
				if(pContext.action.getEquipmentJsClassName().intersect([pEquipment.getJsClassName()]).length>0){
					val = pEquipment.getOid();
					pContext.equipmentChooserField.addOption(pEquipment.getOid(),pEquipment.getLabel());
					
					pContext.addEquipmentPanel(pEquipment,false);
				}
			},this);
			
			//this.equipmentChooserField.setValue(val);
		}
		
	},
	
	addEquipmentPanel: function(pEquipment,pDraw){
		
		if(typeof pDraw == 'undefined'){
			pDraw = true;
		}
		
		var eqpPanel = new aoe.ActionEquipmentPanel(pEquipment,this.action);
		eqpPanel.setParent(this.gContentPanel);
		
		this.equipmentPanelManager[pEquipment.getJsClassName()+pEquipment.getOid()] = eqpPanel;
		
		pEquipment.getPropertyChangeSupport().addListener(eqpPanel);
		
		if(pDraw){
			eqpPanel.draw();
		}
	},
	
	removeEquipmentPanel: function(pEquipment){
		
		var panel = this.equipmentPanelManager[pEquipment.getJsClassName()+pEquipment.getOid()];
		
		panel.eraser();
		
		delete this.equipmentPanelManager[pEquipment.getJsClassName()+pEquipment.getOid()];
	},
	
	draw: function($super){
		//this.addComponent(this.button);
		this.gHeaderTitlePanel.addComponent(this.button);
		
		if(this.action.getEquipmentJsClassName().length>0){
			//this.addComponent(this.equipmentChooserField);
			this.gContentPanel.addComponent(this.equipmentChooserField);
		}
		
		if(this.action.getSkillJsClassName()){
			//this.addComponent(this.skillChooserField);
			this.gContentPanel.addComponent(this.skillChooserField);
		}
		
		//this.addComponent(this.sep4);
		this.gContentPanel.addComponent(this.sep4);
		
		if(this.skill){
			this.gContentPanel.addComponent(this.sep1);
			this.gContentPanel.addComponent(this.skillLabel);
			this.gContentPanel.addComponent(this.skillField);
		}
		
		$super();
		
		var val,pane = null;
		for(panelKey in this.equipmentPanelManager){
			panel = this.equipmentPanelManager[panelKey];
			panel.draw();
			//val= panel.getEquipment().getOid();
			//this.addEquipmentPanel(panel.getEquipment());
		}
		//console.log(this.action.getEquipment());
		if(this.action.getEquipment()){
			this.equipmentChooserField.setValue(this.action.getEquipment().getOid());
			this.equipmentChooserField.getJQuery().trigger("change");
		}
	},
	
	getActionButton: function(){
		return this.button;
	},
	
	getSkillField: function(){
		return this.skillField;
	},
	
	getSkillChooserField: function(){
		return this.skillChooserField;
	},
	
	getEquipmentChooserField: function(){
		return this.equipmentChooserField;
	},
	
	propertyChange: function(evt){
		
		var action = evt.getSource();
		
		if(!action.getPlayer() || action.getPlayer().getJsClassName() == "Player"){
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
		}
		
	},
});