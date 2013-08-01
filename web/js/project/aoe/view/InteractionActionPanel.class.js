JClass.import('jsx.jGraphic.JPanel');
//JClass.import('jsx.jGraphic.JLabel');

_class=JClass.create("InteractionActionPanel",jsx.JPanel,
{
	initialize:function($super,action){
		$super("gPanel"+action.getJsClassName(),"gPanel gPanelInteractionAction");
		
		this.action = action;
		this.equipment = this.action.getEquipment();
		this.skill = this.action.getSkill();
		
		this.initPanel();
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
		
		if(this.action.getEquipmentJsClassName()){
			this.equipmentChooserField = new jsx.JSelectField(null,{},"gFieldInteractionActionEquipmentChooser"+this.action.getJsClassName(),"gFld gSelectFld gFieldInteractionActionEquipmentChooser");
			this.equipmentChooserField.addOption("","-- none --");
			
			this.equipmentChooserField.addEventListener("change",function(e,action){
				
				var p = this.jObject.parents(".gPanelInteractionAction");
				
				var skill,equipment;
				
				var skillChooser = p.find(".gFieldInteractionActionSkillChooser");
				if(skillChooser.length){
					skill = skillChooser.val();
				}
				
				equipment = this.jObject.val();
				
				MVC.doAction('aoe.controller.InteractionController','checkAction',[action,skill,equipment]);
			},this.action);
			
			var equipmentManager = this.action.getContext().getPlayer().getCurrentHand(true);
			var eq, val = null;
			while(eq=equipmentManager.next()){
				if(eq.getJsClassName() == this.action.getEquipmentJsClassName()){
					val = eq.getOid();
					this.equipmentChooserField.addOption(eq.getOid(),eq.getLabel()+" (D:"+eq.getStrength()+")");
				}
			}
			
			console.log("eq: "+val);
			this.equipmentChooserField.setValue(val);
			
			if(this.equipment){
				
				this.equipmentLabel = new jsx.JLabel(this.equipment.getLabel(),null,"gLabelInteractionActionEquipment"+this.action.getJsClassName(),"gLabel gLabelFld");
				
				this.equipmentDamageField = new jsx.JTextField(this.equipment.getStrength(),"gFieldInteractionActionEquipmentDamage"+this.action.getJsClassName(),"gFld gTxtFld gFieldInteractionActionEquipmentDamage gReadOnlyFld");
				this.equipmentDamageLabel = new jsx.JLabel("D",this.equipmentDamageField,"gLabelInteractionActionEquipmentDamage"+this.action.getJsClassName(),"gLabel gLabelFld");
				
				this.equipmentDamageMaxField = new jsx.JTextField(this.equipment.getStrengthAttribute().getMax(),"gFieldInteractionActionEquipmentDamageMax"+this.action.getJsClassName(),"gFld gTxtFld gFieldInteractionActionEquipmentDamage gReadOnlyFld");
				this.equipmentDamageMaxLabel = new jsx.JLabel("/",this.equipmentDamageMaxField,"gLabelInteractionActionEquipmentDamageMax"+this.action.getJsClassName(),"gLabel gLabelFld");
				
				this.equipmentQualityField = new jsx.JTextField(this.equipment.getQuality()+" ("+aoe.getLang(this.equipment.getQualityLabel())+")","gFieldInteractionActionEquipmentQuality"+this.action.getJsClassName(),"gFld gTxtFld gFieldInteractionActionEquipmentQuality gReadOnlyFld");
				this.equipmentQualityLabel = new jsx.JLabel("Q",this.equipmentQualityField,"gLabelInteractionActionEquipmentQuality"+this.action.getJsClassName(),"gLabel gLabelFld");
				
				var range = this.equipment.getRange();
				this.equipmentRangeField = new jsx.JTextField(range[0]+"-"+range[1],"gFieldInteractionActionEquipmentRange"+this.action.getJsClassName(),"gFld gTxtFld gFieldInteractionActionEquipmentRange gReadOnlyFld");
				this.equipmentRangeLabel = new jsx.JLabel("P",this.equipmentRangeField,"gLabelInteractionActionEquipmentRange"+this.action.getJsClassName(),"gLabel gLabelFld");
				
				if(this.equipment instanceof aoe.RangeWeapon){
					this.equipmentUnitField = new jsx.JTextField(this.equipment.getUnit(),"gFieldInteractionActionEquipmentUnit"+this.action.getJsClassName(),"gFld gTxtFld gFieldInteractionActionEquipmentUnit gReadOnlyFld");
					this.equipmentUnitLabel = new jsx.JLabel("U",this.equipmentUnitField,"gLabelInteractionActionEquipmentUnit"+this.action.getJsClassName(),"gLabel gLabelFld");
				}
				
			}
		}
		
	},
	
	draw: function($super){
		this.addComponent(this.button);
		
		if(this.action.getSkillJsClassName()){
			this.addComponent(this.skillChooserField);
		}
		
		if(this.action.getEquipmentJsClassName()){
			this.addComponent(this.equipmentChooserField);
		}
		
		this.addComponent(this.sep4);
		
		if(this.skill){
			this.addComponent(this.sep1);
			this.addComponent(this.skillLabel);
			this.addComponent(this.skillField);
		}
		
		if(this.equipment){
			this.addComponent(this.sep2);
			this.addComponent(this.equipmentLabel);
			this.addComponent(this.sep3);
			this.addComponent(this.equipmentDamageLabel);
			this.addComponent(this.equipmentDamageField);
			this.addComponent(this.equipmentDamageMaxLabel);
			this.addComponent(this.equipmentDamageMaxField);
			this.addComponent(this.equipmentQualityLabel);
			this.addComponent(this.equipmentQualityField);
			this.addComponent(this.equipmentRangeLabel);
			this.addComponent(this.equipmentRangeField);
			
			if(this.equipment instanceof aoe.RangeWeapon){
				this.addComponent(this.equipmentUnitLabel);
				this.addComponent(this.equipmentUnitField);
			}
			
		}
		
		$super();
	},
	
	getActionButton: function(){
		return this.button;
	},
	
	getSkillField: function(){
		return this.skillField;
	},
	
	getEquipmentDamageField: function(){
		return this.equipmentDamageField;
	},
	
	getEquipmenRangeField: function(){
		return this.equipmentRangeField;
	},
	
	getEquipmentUnitField: function(){
		return this.equipmentUnitField;
	},
	
	getEquipmentQualityField: function(){
		return this.equipmentQualityField;
	}
});