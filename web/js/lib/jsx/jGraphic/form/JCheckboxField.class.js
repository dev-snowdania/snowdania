JClass.import('jsx.jGraphic.form.JField');

_class= JClass.create( 'JCheckboxField', jsx.JField,
{
	initialize: function($super,id,className)
	{
		$super(id,className);
		this.tmpl="<input type='CHECKBOX'/>";
	}
});