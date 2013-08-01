JClass.import('aoe.view.InteractionWindow');

JClass.import('aoe.model.action.ScratchByClaw');
JClass.import('aoe.model.action.ShotArrow');
JClass.import('aoe.model.action.HitWithEdge');
JClass.import('aoe.model.action.RunAway');
JClass.import('aoe.model.action.MoveForward');
JClass.import('aoe.model.action.DoNothing');
JClass.import('aoe.model.action.Target');

JClass.import('aoe.model.ActionManager');

JClass.import('aoe.model.interaction.InteractiveSession');

_class=JClass.create("InteractionController",{
	
	initialize:function(){
		;
	},
	
	showPopup : function(pPlayer,pInteraction,pMapCase){
		//MVC.getCacheInstance().getObject('uneGameLog').addMessage(this.logMsg);
		
		this.interactiveSession = new aoe.InteractiveSession(pPlayer,pInteraction,pMapCase);
		
		//interaction lsiten the interactive Session to know when to act
		//this.interactiveSession.getPropertyChangeSupport().addListener(pInteraction);
		
		//Define actions for each side.
		var actions = [];
		
		var doNothing = new aoe.DoNothing();
		actions.push(doNothing);
		
		var target = new aoe.Target();
		actions.push(target);
		
		var runAway = new aoe.RunAway();
		actions.push(runAway);
		
		var moveForward = new aoe.MoveForward();
		actions.push(moveForward);
		
		var shotArrow = new aoe.ShotArrow();
		actions.push(shotArrow);
		
		var hitWithEdge = new aoe.HitWithEdge();
		actions.push(hitWithEdge);
		
		var scratchByClaw = new aoe.ScratchByClaw();
		actions.push(scratchByClaw);
		
		var actions1 = new aoe.ActionManager();
		var actions2 = new aoe.ActionManager();
		
		actions.each(function(pAction,i){
			if(pAction.doable(pPlayer)){
				
				pAction.setContext(this.interactiveSession,pPlayer);
				
				/*pAction.checkStatus();
				pAction.addToContext(pPlayer,'player');
				pAction.addToContext(pInteraction,'interaction');
				pAction.addToContext(this.interactiveSession,'interactiveSession');*/
				
				actions1.add(pAction,pAction.getJsClassName());
			}
			pAction2 = Object.clone(pAction);
			pAction2.clone();
			if(pAction2.doable(pInteraction)){
				
				pAction2.setContext(this.interactiveSession,pInteraction);
				//pAction2.getPropertyChangeSupport().addListener(this.popup);
				
				/*pAction2.addToContext(pPlayer,'interaction');
				pAction2.addToContext(pInteraction,'player');
				pAction2.addToContext(this.interactiveSession,'interactiveSession');*/
				
				actions2.add(pAction2,pAction2.getJsClassName());
			}
		},this);
		
		pPlayer.setActionManager(actions1);
		pInteraction.setActionManager(actions2);
		
		//draw the popup
		if(this.popup){
			this.popup.eraser();
		}
		this.popup = new aoe.InteractionWindow(600,pPlayer,pInteraction,pMapCase);
		this.popup.draw();
		
		//set the Pattern Obersver
		this.interactiveSession.getPropertyChangeSupport().addListener(this.popup);
		this.interactiveSession.getPlayer().getPropertyChangeSupport().addListener(this.popup);
		this.interactiveSession.getPlayer().getCurrentHand().addListener(this.popup);
		this.interactiveSession.getPlayer().getBackpack().addListener(this.popup);
		this.interactiveSession.getInteraction().getPropertyChangeSupport().addListener(this.popup);
		
		var act1;
		actions1.reset();
		while((act1=actions1.next())){
			act1.getPropertyChangeSupport().addListener(this.popup);
			var eqp = act1.getEquipment();
			if(eqp){
				eqp.getPropertyChangeSupport().addListener(this.popup);
			}
		}
		
		this.interactiveSession.getInteraction().fireInitialProperties();
		
		// start the interaction
		this.interactiveSession.start();
	},
	
	closePopup : function(){
		//console.log('close popup');
		if(this.popup){
			this.popup.close();
		}
	},
	
	playOpponent : function(){
		this.interactiveSession.getInteraction().interact(this.interactiveSession);
		//this.interactiveSession.changeTurn();
	},
	
	checkAction : function(pAction,pSkill,pEquipment){
		
		
		if(this.interactiveSession.getTurn()==aoe.InteractiveSession.PLAYER){
			player = this.interactiveSession.getPlayer();
		}else{
			player = this.interactiveSession.getInteraction();
		}
		
		var skill,equipment;
		
		if(pSkill){
			var skill = player.getSkills(true).getByJsClassName(pSkill);
			skill = skill[0];
		}
		
		if(pEquipment){
			var equipment = player.getCurrentHand(true).get(pEquipment);
		}
		
		pAction.checkStatus(skill,equipment);
		
	},
	
	executeAction : function(pAction,pSkill,pEquipment){
		
		
		if(this.interactiveSession.getTurn()==aoe.InteractiveSession.PLAYER){
			player = this.interactiveSession.getPlayer();
		}else{
			player = this.interactiveSession.getInteraction();
		}
		
		var skill,equipment = null;
		if(pSkill){
			var skill = player.getSkills(true).getByJsClassName(pSkill);
			skill = skill[0];
		}
		
		if(pEquipment){
			var equipment = player.getCurrentHand(true).get(pEquipment);
		}
		
		var r=pAction.execute(skill,equipment);
		
		if(r){
			this.interactiveSession.changeTurn();
		}
		
	}
 
});