JClass.import('jsx.jGraphic.JPanel');

JClass.import('aoe.view.PlayerPanel');
JClass.import('aoe.view.StatusPanel');

_class=JClass.create("IhmArea",jsx.JPanel,
{
	initialize:function($super)
	{
		$super("gInfo","gInfo");
		
		this.playerPanel= new aoe.PlayerPanel();
		this.emptyPanel= new jsx.JPanel();
		this.statusPanel = new aoe.StatusPanel();
	},
	
	getPlayerPanel:function()
	{
		return this.playerPanel;
	},
	
	getStatusPanel:function()
	{
		return this.statusPanel;
	},
	
	draw : function($super)
	{
		this.addComponent(this.playerPanel);
		this.addComponent(this.emptyPanel);
		this.addComponent(this.statusPanel);

		$super();
	}
});