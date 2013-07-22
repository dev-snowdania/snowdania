Util_importClass("lib.graphic.GComponent");

GImage.prototype = new GComponent; 
function GImage(src,id,className)
{
	this.super=GComponent;
	this.super(id,className);
	this.tmpl="<img/>";
	this.setAttr("src",src);
	
	this.draw = function()
	{
		GComponent.prototype.draw.call(this);
	}
}