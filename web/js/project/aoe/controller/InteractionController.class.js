JClass.import('aoe.view.InteractionWindow');

JClass.import('aoe.model.action.ShotArrow');
JClass.import('aoe.model.action.RunAway');
JClass.import('aoe.model.action.DoNothing');

JClass.import('aoe.model.ActionManager');

JClass.import('aoe.model.interaction.InteractiveSession');

_class=JClass.create("InteractionController",{
	
	initialize:function(){
		;
	},
	
	showPopup : function(pPlayer,pInteraction,pMapCase){
		//MVC.getCacheInstance().getObject('uneGameLog').addMessage(this.logMsg);
		
		this.interactiveSession = new aoe.InteractiveSession();
		this.interaction = pInteraction;
		
		//interaction lsiten the interactive Session to know when to act
		//this.interactiveSession.getPropertyChangeSupport().addListener(pInteraction);
		
		//Define actions for each side.
		var actions = [];
		
		var doNothing = new aoe.DoNothing();
		actions.push(doNothing);
		
		var runAway = new aoe.RunAway();
		actions.push(runAway);
		
		var shotArrow = new aoe.ShotArrow();
		actions.push(shotArrow);
		
		var actions1 = new aoe.ActionManager();
		var actions2 = new aoe.ActionManager();
		
		actions.each(function(pAction,i){
			if(pAction.doable(pPlayer)){
				pAction.addToContext(pPlayer,'player');
				pAction.addToContext(pInteraction,'interaction');
				pAction.addToContext(this.interactiveSession,'interactiveSession');
				actions1.add(pAction,pAction.getJsClassName());
				actions2.add(pAction,pAction.getJsClassName());
			}
		},this);
		
		pInteraction.setActionManager(actions2);
		
		//draw the popup
		if(this.popup){
			this.popup.eraser();
		}
		this.popup = new aoe.InteractionWindow(500,pPlayer,actions1,pInteraction,actions2);
		this.popup.draw();
		
		// start the interaction
		this.interactiveSession.getPropertyChangeSupport().addListener(this.popup);
		this.interactiveSession.start();
	},
	
	closePopup : function(){
		//console.log('close popup');
		if(this.popup){
			this.popup.close();
		}
	},
	
	playOpponent : function(){
		
		this.interaction.interact();
		//this.interactiveSession.changeTurn();
	},
	
	executeAction : function(pAction){
		
		pAction.execute();
		
		this.interactiveSession.changeTurn();
	}
 
});