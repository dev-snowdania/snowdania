JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.JButton');

_class= JClass.create( 'JDropPanel', jsx.JPanel,
{
	initialize: function($super,id,className)
	{
		$super(id,className);
		this.gHeaderPanel = new jsx.JPanel(null,"gDropPanelHeader");
		this.gHeaderTitlePanel=new jsx.JPanel(null,"gDropPanelHeaderTitle");
		
		this.gDropButton=new jsx.JButton();
		this.toggle = {
			states:[0,1],
			labels:['down','up'],
			funcs:[function () {
				  jQuery(this).text("up");
				  jQuery(this).parent().parent().parent().children().eq(1).slideDown("slow");
				},
			      function () {
			    	  jQuery(this).text("down");
			    	 jQuery(this).parent().parent().parent().children().eq(1).slideUp("slow");
			      }]
		};
			    
		this.gHeaderBtnPanel=new jsx.JPanel(null,"gDropPanelHeaderBtn");
		this.gContentPanel = new jsx.JPanel(null,"gDropPanelContent");
		
		this.title="&nbsp;";
	},
	
	getToggle : function()
	{
		return this.toggle;
	},
	
	setTitle : function(title)
	{
		this.title=title;
	},
	
	getTitle : function()
	{
		return this.title;
	},
	
	getHeaderPanel : function()
	{
		return this.gHeaderPanelr;
	},
	
	getHeaderTitle : function()
	{
		return this.gHeaderTitlePanel;
	},
	
	getDropButton : function()
	{
		return this.gDropButton;
	},
	
	getHeaderPanel : function()
	{
		return this.gHeaderBtnPanel;
	},
	
	getContentPanel : function()
	{
		return this.gContentPanel;
	},
	
	addContentComponent : function(component)
	{
		this.gContentPanel.addComponent(component);
	},
	
	draw : function($super)
	{
		this.gHeaderTitlePanel.setValue(this.title);
		
		var behavior=[];
		for(var i=0;i<this.toggle.states.length;i++)
		{
			var ind=this.toggle.states[i];
			behavior[i]=this.toggle.funcs[ind];
		}
		this.gDropButton.setLabel(this.toggle.labels[this.toggle.states[0]]);
		this.gDropButton.setToggleBehavior(behavior);
		
		this.gHeaderBtnPanel.addComponent(this.gDropButton);
		
		this.gHeaderPanel.addComponent(this.gHeaderTitlePanel);
		this.gHeaderPanel.addComponent(this.gHeaderBtnPanel);
		
		this.addComponent(this.gHeaderPanel);
		this.addComponent(this.gContentPanel);

		$super();
	}
});