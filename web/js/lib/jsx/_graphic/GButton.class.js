Util_importClass("lib.graphic.GComponent");

GButton.prototype = new GComponent; 
function GButton(label,id,className)
{
	this.super=GComponent;
	this.super(id,className);
	this.tmpl="<button></button>";
	this.setValue(label);
	this.toggleFunc=null;
	
	this.setToggleBehavior = function(funcs)
	{
		this.toggleFunc=funcs;
		if(this.jObject!=null)
		{
			if(this.toggleFunc.length==2)
				this.jObject.toggle(this.toggleFunc[0],this.toggleFunc[1]);
			if(this.toggleFunc.length==3)
				this.jObject.toggle(this.toggleFunc[0],this.toggleFunc[1],this.toggleFunc[2]);
		}
	}
	
	this.draw = function()
	{
		GButton.prototype.draw.call(this);
		if(this.toggleFunc) this.setToggleBehavior(this.toggleFunc);
	}
}