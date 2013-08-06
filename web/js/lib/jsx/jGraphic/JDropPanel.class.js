JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.JButton');

_class= JClass.create( 'JDropPanel', jsx.JPanel,
{
	initialize: function($super,id,className)
	{
		if(typeof className == "undefined"){
			className = "gDropPanel";
		}else{
			className += " gDropPanel";
		}
		$super(id,className);
		this.gHeaderPanel = new jsx.JPanel(null,"gDropPanelHeader");
		this.gHeaderTitlePanel=new jsx.JPanel(null,"gDropPanelHeaderTitle");
		
		this.gDropButton=new jsx.JButton();
		this.toggle = {
			states:[0,1],
			labels:['down','up'],
			funcs:[function () {
				  jQuery(this).text("up");
				  jQuery(this).parents(".gDropPanel").find(".gDropPanelContent").slideDown("slow");
				},
			      function () {
			    	  jQuery(this).text("down");
			    	 jQuery(this).parents(".gDropPanel").find(".gDropPanelContent").slideUp("slow");
			      }]
		};
			    
		this.gHeaderBtnPanel=new jsx.JPanel(null,"gDropPanelHeaderBtn");
		this.gContentPanel = new jsx.JPanel(null,"gDropPanelContent");
		
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
		if(typeof this.title == "undefined"){
			if(this.gHeaderTitlePanel.subComponents.length == 0){
				this.title = "&nbsp;"
			}
		}
		
		if(typeof this.title != "undefined"){
			this.gHeaderTitlePanel.setValue(this.title);
		}
		
		var behavior=[];
		for(var i=0;i<this.toggle.states.length;i++)
		{
			var ind=this.toggle.states[i];
			behavior[i]=this.toggle.funcs[ind];
		}
		this.gDropButton.setLabel(">>");
		this.gDropButton.addEventListener("click",function(e,action){
			
			this.jObject.parents(".gDropPanel").find(".gDropPanelContent").toggle(200);
			
			/*var p = jQuery("#"+this.id).parents(".gPanelInteractionAction");
			
			var skill,equipment;
			
			skill = this.jObject.val();
			
			var equipmentChooser = p.find(".gFieldInteractionActionEquipmentChooser");
			if(equipmentChooser.length){
				equipment = equipmentChooser.val();
			}
			
			MVC.doAction('aoe.controller.InteractionController','checkAction',[action,skill,equipment]);*/
		},this);
		//this.gDropButton.setToggleBehavior(behavior);
		
		this.gHeaderBtnPanel.addComponent(this.gDropButton);
		
		this.gHeaderPanel.addComponent(this.gHeaderTitlePanel);
		this.gHeaderPanel.addComponent(this.gHeaderBtnPanel);
		
		this.addComponent(this.gHeaderPanel);
		this.addComponent(this.gContentPanel);

		$super();
	}
});