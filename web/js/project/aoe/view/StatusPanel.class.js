JClass.import('jsx.jGraphic.JPanel');

_class=JClass.create("StatusPanel",jsx.JPanel,
{
	initialize:function($super)
	{
		$super("gStatus","gStatus");
	},
	
	draw: function($super)
	{
		$super();
	},
	
	propertyChange : function(evt)
	{
		switch(evt.getPropertyName())
		{
			case 'logStatusAdded':
				var oLogStatus=evt.getSource();
				this.getJQuery().html(this.getJQuery().html()+"<span>"+oLogStatus.getLastMessage().htmlEntities()+"</span><br/>");
			break;
		}
	}
});