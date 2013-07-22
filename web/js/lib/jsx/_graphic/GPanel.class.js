Util_importClass("lib.graphic.GComponent");

GPanel.prototype = new GComponent; 
function GPanel(id,className)
{
	this.super=GComponent;
	this.super(id,className);
	this.tmpl="<div></div>";
}