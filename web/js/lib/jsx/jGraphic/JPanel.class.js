JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JPanel', jsx.JComponent,
{
	initialize: function($super,id,className)
	{
		$super(id,className);
		this.tmpl="<div></div>";
	}
});