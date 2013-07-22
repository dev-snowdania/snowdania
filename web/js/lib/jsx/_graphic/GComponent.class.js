Util_importClass("lib.__View");

GComponent.prototype = new __View; 
function GComponent(id,className)
{
	this.super=__View;
	this.super();
	this.addJsClassName(arguments.callee);
	this.parent=null;
	this.jObject=null;
	this.tmpl=null;
	this.id=id;
	this.className=className;
	this.value=null;
	this.controller=null;
	this.subComponents=new Array();
	this.evts=new Array();
	this.attr=new Array();
	this.infoBulle=null;
	
	
	this.setTemplate = function(tmpl)
	{
		this.tmpl=tmpl;
	}
	
	this.setParent = function(parent)
	{
		this.parent=parent;
	}
	
	this.getParent = function(className)
	{
		if(this.parent==null) return null;
		if(className)
		{
			if(Util_getClassName(this.parent)==className) return this.parent;
			else return this.parent.getParent(className);
		}
		else return this.parent;
	}
	
	this.setId = function(id)
	{
		this.id=id;
	}
	
	this.setInfoBulle = function(infoBulle)
	{
		this.infoBulle=infoBulle;
	}
	
	this.getController = function()
	{
		if(this.controller!=null) return this.controller;
		else
		{
			if(this.parent!=null) return this.parent.getController();
			else return null;
		}
	}
	
	this.getId = function()
	{
		return this.id;
	}
	
	this.setClassName = function(cls)
	{
		this.className=cls;
	}
	
	this.setValue = function(val)
	{
		this.value=val;
		this.setJValue();
	}
	
	this.setJValue = function()
	{
		if(this.jObject!=null)
		{
			this.jObject.text(this.value);
		}
	}
	
	this.addComponent= function(gPanel)
	{
		gPanel.setParent(this);
		this.subComponents.push(gPanel);
	}
	
	this.getJObject= function()
	{
		return this.jObject;
	}
	
	this.getJParent= function()
	{
		if(this.parent==null) return $("BODY");
		else return this.parent.getJObject();
	}
	
	this.setAttr=function(name,val)
	{
		this.attr[name]=val;
	}
	
	this.bindEvent=function(evtName,func)
	{
		this.evts.push(new Array(evtName,func));
	}
	
	this.draw = function()
	{
		var dom=this.getJParent();
		if(dom)
		{
			if(this.subComponents.length==0 && this.value==null) this.value=" ";
			this.jObject = $(this.tmpl);
			if(this.id)
				this.jObject.attr("id",this.id);
			if(this.className)
				this.jObject.addClass(this.className);
			if(this.infoBulle)
				this.jObject.attr("title",this.infoBulle);
			this.setJValue();
			if(this.attr.length>0)
			{
				for(i in this.attr)
				{
					this.jObject.attr(i,this.attr[i]);
				}
			}
			if(this.evts.length>0)
			{
				var evt;
				for(var i=0;i<this.evts.length;i++)
				{
					evt=this.evts[i]
					this.jObject.bind(evt[0],evt[1]);
				}
			}
			var d= this.jObject.get(0);
			d.view=this;
			dom.append(this.jObject);
		}
		
		for(var i=0;i<this.subComponents.length;i++)
		{
			this.subComponents[i].draw();
		}
	}
}

$(document).ready(function(e){
	$('BODY').append($('<div></div>').attr('id','infoBulle'));
	$('[title]').hover(function(e){
		$('#infoBulle').text($(this).attr('title')).css('top', e.pageY).css('left', e.pageX+10).fadeOut();
	},
	function(e){
		$('#infoBulle').fadeOut();
	});
})