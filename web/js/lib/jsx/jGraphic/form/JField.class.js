JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JField', jsx.jGraphic.JComponent,
{
	initialize: function($super,id,className)
	{
		$super(id,className);
	},
	
	setJValue : function(val)
	{
		if(this.getJQuery()!=null)
			this.getJQuery().val(val);
	}
});