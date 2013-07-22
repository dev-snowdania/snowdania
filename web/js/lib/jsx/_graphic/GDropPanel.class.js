Util_importClass("lib.graphic.GPanel");

GDropPanel.prototype = new GPanel; 
function GDropPanel(id,className)
{
	this.super=GPanel;
	this.super(id,className);
	
	this.gHeaderPanel = new GPanel(null,"gDropPanelHeader");
	this.gHeaderTitlePanel=new GPanel(null,"gDropPanelHeaderTitle");
	this.gDropButton=new GButton("down");
	this.gHeaderBtnPanel=new GPanel(null,"gDropPanelHeaderBtn");
	this.gContentPanel = new GPanel(null,"gDropPanelContent");
	
	this.title="&nbsp;";
	
	this.setTitle = function(title)
	{
		this.title=title;
	}
	
	this.getTitle = function()
	{
		return this.title;
	}
	
	this.getHeaderPanel = function()
	{
		return this.gHeaderPanelr;
	}
	
	this.getHeaderTitle = function()
	{
		return this.gHeaderTitlePanel;
	}
	
	this.getDropButton = function()
	{
		return this.gDropButton;
	}
	
	this.getHeaderPanel = function()
	{
		return this.gHeaderBtnPanel;
	}
	
	this.getContentPanel = function()
	{
		return this.gContentPanel;
	}
	
	this.addComponent = function(component)
	{
		this.gContentPanel.addComponent(component);
	}
	
	this.draw = function()
	{
		this.gHeaderTitlePanel.setValue(this.title);
		this.gDropButton.setToggleBehavior(new Array(
			      function () {
				        this.view.setValue("up");
				        var jContentObj = this.view.getParent().getParent().getParent().getContentPanel().getJObject();
				        jContentObj.slideDown("slow");
				      },
			      function () {
			    	  this.view.setValue("down");
			    	  var jContentObj = this.view.getParent().getParent().getParent().getContentPanel().getJObject();
				      jContentObj.slideUp("slow");
			      }
			    ));
		this.gHeaderBtnPanel.addComponent(this.gDropButton);
		
		this.gHeaderPanel.addComponent(this.gHeaderTitlePanel);
		this.gHeaderPanel.addComponent(this.gHeaderBtnPanel);
		
		GPanel.prototype.addComponent.call(this,this.gHeaderPanel);
		GPanel.prototype.addComponent.call(this,this.gContentPanel);

		GPanel.prototype.draw.call(this);
	}
}