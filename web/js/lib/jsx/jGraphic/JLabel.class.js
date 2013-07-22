JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JLabel', jsx.JComponent,
{
	initialize: function($super,label,gField,id,className)
	{
		$super(id,className);
		this.tmpl="<label></label>";
		this.value=label;
		this.gField=gField;
	}
});