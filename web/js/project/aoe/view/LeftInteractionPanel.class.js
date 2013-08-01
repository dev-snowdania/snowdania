JClass.import('aoe.view.InteractionPanel');
JClass.import('aoe.view.InteractionActionPanel');

JClass.import('jsx.observable.ObservableList');
_class=JClass.create("LeftInteractionPanel",aoe.InteractionPanel,
{
	initialize:function($super,pWindow,pPlayer){
		$super("gLeftInteractionPanel","gPanel gInteractionPanel",pWindow,pPlayer);
		
		this.player = pPlayer;
		this.actions = this.player.getActionManager(true);
		
		this.gLabel=new jsx.JLabel(this.player.getName(),null,"gLabelInteractionPlayer");
		
		this.actionPanelManager = new jsx.ObservableList();
		
		this.actions.reset();
		var act,pane;
		while(act = this.actions.next()){
			pane = new aoe.InteractionActionPanel(act);
			this.actionPanelManager.add(pane,act.getJsClassName());
		}
	},
	
	getActionPanelManager: function(reset){
		if(reset){
			this.actionPanelManager.reset();
		}
		return this.actionPanelManager;
	},
	
	activate: function($super){
		$super();
		
		this.actionPanelManager.reset();
		var pane;
		while((pane=this.actionPanelManager.next())){
			//btn.setReadOnly(false);
		}
		/*this.interactiveButtonsManager.each(function(pBtn,i){
			pBtn.setReadOnly(false);
		},this);*/
	},
	
	desactivate: function($super){
		$super();
		
		this.actionPanelManager.reset();
		var pane;
		while((pane=this.actionPanelManager.next())){
			//btn.setReadOnly(true);
		}
	},
	
	draw : function($super){
		
		this.addComponent(this.gLabel);
		
		this.actionPanelManager.reset();
		var pane;
		while((pane=this.actionPanelManager.next())){
			this.addComponent(pane);
		}
			
		$super();
	}
});