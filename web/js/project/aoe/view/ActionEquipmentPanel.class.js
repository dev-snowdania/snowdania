JClass.import('jsx.jGraphic.JPanel');
//JClass.import('jsx.jGraphic.JLabel');

_class=JClass.create("ActionEquipmentPanel",jsx.JPanel,
{
	initialize:function($super,pEquipment,pAction){
		$super("gPanel"+pAction.getJsClassName()+pEquipment.getOid(),"gPanel gPanelInteractionActionEquipment");
		
		this.equipment = pEquipment;
		this.action = pAction;
		
		this.initPanel(pEquipment);
	},
	
	getEquipment : function(){
		return this.equipment;
	},
	
	initPanel: function(pEquipment){
		
		this.equipmentLabel = new jsx.JLabel(pEquipment.getLabel(),null,"gLabelInteractionActionEquipment"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gLabel gLabelFld");
		
		this.equipmentDamageField = new jsx.JTextField(pEquipment.getStrength(this.action.getJsClassName()),"gFieldInteractionActionEquipmentDamage"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gFld gTxtFld gFieldInteractionActionEquipmentDamage gReadOnlyFld");
		this.equipmentDamageLabel = new jsx.JLabel("D",this.equipmentDamageField,"gLabelInteractionActionEquipmentDamage"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gLabel gLabelFld");
		
		this.equipmentDamageMaxField = new jsx.JTextField(pEquipment.getStrengthAttribute(this.action.getJsClassName()).getMax(),"gFieldInteractionActionEquipmentDamageMax"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gFld gTxtFld gFieldInteractionActionEquipmentDamage gReadOnlyFld");
		this.equipmentDamageMaxLabel = new jsx.JLabel("/",this.equipmentDamageMaxField,"gLabelInteractionActionEquipmentDamageMax"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gLabel gLabelFld");
		
		this.equipmentQualityField = new jsx.JTextField(pEquipment.getQuality()+" ("+aoe.getLang(pEquipment.getQualityLabel())+")","gFieldInteractionActionEquipmentQuality"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gFld gTxtFld gFieldInteractionActionEquipmentQuality gReadOnlyFld");
		this.equipmentQualityLabel = new jsx.JLabel("Q",this.equipmentQualityField,"gLabelInteractionActionEquipmentQuality"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gLabel gLabelFld");
		
		var range = pEquipment.getRange();
		this.equipmentRangeField = new jsx.JTextField(range[0]+"-"+range[1],"gFieldInteractionActionEquipmentRange"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gFld gTxtFld gFieldInteractionActionEquipmentRange gReadOnlyFld");
		this.equipmentRangeLabel = new jsx.JLabel("P",this.equipmentRangeField,"gLabelInteractionActionEquipmentRange"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gLabel gLabelFld");
		
		if(pEquipment instanceof aoe.RangeWeapon){
			this.equipmentUnitField = new jsx.JTextField(pEquipment.getUnit(),"gFieldInteractionActionEquipmentUnit"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gFld gTxtFld gFieldInteractionActionEquipmentUnit gReadOnlyFld");
			this.equipmentUnitLabel = new jsx.JLabel("U",this.equipmentUnitField,"gLabelInteractionActionEquipmentUnit"+this.action.getJsClassName()+pEquipment.getJsClassName()+pEquipment.getOid(),"gLabel gLabelFld");
		}
		
		this.sep1 = new jsx.JSeparator();
		this.sep2 = new jsx.JSeparator();
		
	},
	
	draw: function($super){
		this.addComponent(this.sep1);
		this.addComponent(this.equipmentLabel);
		this.addComponent(this.sep2);
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
		
		$super();
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
	},
	
	propertyChange: function(evt){
		var eqp = evt.getSource();
		
		switch(evt.getPropertyName()){
			case 'unit':
				this.getEquipmentUnitField().setValue(evt.getNewValue());
			break;
			case 'quality':
				this.getEquipmentQualityField().setValue(evt.getNewValue()+" ("+aoe.getLang(evt.getSource().getQualityLabel())+")");
			break;
			case 'strength':
				if(evt.getContextValue('action') == 'global' || evt.getContextValue('action') == this.action.getJsClassName()){
					this.getEquipmentDamageField().setValue(evt.getNewValue());
				}
			break;
			
		}
		
	},
});