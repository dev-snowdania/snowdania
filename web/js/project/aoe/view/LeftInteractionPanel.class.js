JClass.import('aoe.view.InteractionPanel');
JClass.import('aoe.view.InteractionActionPanel');
JClass.import('aoe.view.ActionPanelManager');

JClass.import('jsx.observable.ObservableList');
_class=JClass.create("LeftInteractionPanel",aoe.InteractionPanel,
{
	initialize:function($super,pWindow,pPlayer){
		$super("gLeftInteractionPanel","gPanel gInteractionPanel",pWindow,pPlayer);
		
		this.player = pPlayer;
		this.actions = this.player.getActionManager(true);
		
		this.gLabel=new jsx.JLabel(this.player.getName(),null,"gLabelInteractionPlayer");
		
		this.actionPanelManager = new aoe.ActionPanelManager();
		
		this.actions.reset().each(function(pAction,pList,pContext){
			
			try{
				var actType = "aoe.view."+pAction.getJsClassName()+"ActionPanel";
				var oCls = JClass.import(actType);
				
				var pane = new oCls(pAction);
			}
			catch(e){
				var pane = new aoe.InteractionActionPanel(pAction);
			}
			
			pAction.getPropertyChangeSupport().addListener(pane);
			
			pContext.actionPanelManager.add(pane,pAction.getJsClassName());
		},this);
	},
	
	getActionPanelManager: function(){
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