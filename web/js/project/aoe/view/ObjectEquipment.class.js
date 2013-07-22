JClass.import('jsx.jGraphic.JButton');

_class= JClass.create( 'ObjectEquipment', jsx.JButton,
{
	initialize: function($super,id,className)
	{
		$super("",id,className);
		this.model=null;
	},
	
	setModel : function(mObject)
	{
		this.model=mObject;
		this.setInfoBulle(mObject.getLabel()+" ("+mObject.getUnit()+")");
		this.setLabel(mObject.getShortcut());
	},
});