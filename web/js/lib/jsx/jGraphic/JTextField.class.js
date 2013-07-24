JClass.import('jsx.jGraphic.JField');

_class= JClass.create( 'JTextField', jsx.JField,
{
	initialize: function($super,value,id,className)
	{
		$super(value,id,className);
		this.tmpl="<input type='TEXT'/>";
	}
});