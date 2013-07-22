Util_importClass("lib.graphic.GComponent");

GForm.prototype = new GComponent; 
function GForm(id,className)
{
	this.super=GComponent;
	this.super(id,className);
	this.addJsClassName(arguments.callee);
	this.tmpl="<form></form>";
}

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