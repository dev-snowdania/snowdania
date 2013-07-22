JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JForm', jsx.jGraphic.JComponent,
{
	initialize: function($super,label,id,className)
	{
		$super(id,className);
		this.tmpl="<form></form>";
	}
});

GField.prototype = new GComponent; 
function GField(id,className)
{
	
	this.super=GComponent;
	this.super(id,className);this.addJsClassName(arguments.callee);
	
	this.setJValue = function(val)
	{
		if(this.jObject!=null)
			this.jObject.val(val);
	}
}

GCheckboxField.prototype = new GField; 
function GCheckboxField(id,className)
{
	
	this.super=GField;
	this.super(id,className);this.addJsClassName(arguments.callee);
	this.tmpl="<input type='CHECKBOX'/>";
}

GLabel.prototype = new GComponent; 
function GLabel(val,gField,id,className)
{
	this.super=GComponent;
	this.super(id,className);
	this.tmpl="<label></label>";
	this.value=val;
	this.gField=gField;
}