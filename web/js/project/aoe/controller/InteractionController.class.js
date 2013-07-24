JClass.import('aoe.view.InteractionWindow');

JClass.import('aoe.model.action.ShotArrow');
JClass.import('aoe.model.action.RunAway');

JClass.import('aoe.model.ActionManager');

_class=JClass.create("InteractionController",{
	
	initialize:function(){
		;
	},
	
	showPopup : function(pPlayer,pInteraction,pMapCase){
		//MVC.getCacheInstance().getObject('uneGameLog').addMessage(this.logMsg);
		
		var actions = [];
		
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
				actions1.add(pAction,pAction.getJsClassName());
			}
		},this);
		
		var popup = new aoe.InteractionWindow(500,pPlayer,actions1,pInteraction,actions2);
		popup.draw();
		popup.show();
	},
	
	executeAction : function(pAction){
		
		pAction.execute();
	}
 
});