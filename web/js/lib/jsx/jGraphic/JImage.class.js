JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JImage', jsx.JComponent,
{
	initialize: function($super,src,alt,id,className)
	{
		$super(id,className);
		this.tmpl="<img/>";
		this.value=src;
		this.alt=alt;
	}
});

/*Util_importClass("lib.graphic.GComponent");

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
}*/