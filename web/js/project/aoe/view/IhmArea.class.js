JClass.import('jsx.jGraphic.JPanel');

JClass.import('aoe.view.MapPanel');
//JClass.import('aoe.view.InfoPanel');
JClass.import('aoe.view.PlayerPanel');
JClass.import('aoe.view.StatusPanel');

_class=JClass.create("IhmArea",jsx.JPanel,
{
	initialize:function($super,pCtrl){
		$super("gGame","gGame");
		
		this.playerPanel= new aoe.PlayerPanel(pCtrl,this);
		this.mapPanel= new aoe.MapPanel();
		this.statusPanel = new aoe.StatusPanel();
		
		this.controller=pCtrl;
	},
	
	getMapPanel:function(){
		return this.mapPanel;
	},
	
	/*getInfoPanel:function()
	{
		return this.infoPanel;
	},*/
	
	getPlayerPanel:function(){
		return this.playerPanel;
	},
	
	getStatusPanel:function(){
		return this.statusPanel;
	},
	
	draw : function($super){
		
		//this.addComponent(this.infoPanel);
		this.addComponent(this.playerPanel);
		this.addComponent(this.mapPanel);
		this.addComponent(this.statusPanel);

		$super();
	}
});