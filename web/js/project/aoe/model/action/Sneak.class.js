JClass.import('aoe.model.action.Action');

_class= JClass.create( 'Sneak', aoe.Action,
{
	initialize: function($super){
		
		$super();
		this.skillClassName = 'Stealth';
		this.equipmentClassName = null;
		this.label = aoe.getLang('ActRunAwayLabel');
		this.description = aoe.getLang('ActRunAwayDesc');
		this.logMessage = aoe.getLang('ActRunAwayLog');
	},
	
	preExecute : function(){
		var equipment = this.context.get('equipment');
		var mapCase = this.context.get('mapCase');
		var player = this.context.get('player');
		var skill = this.context.get('skill');
		
		var l = skill.getLevel();
		
		return l;
	},
	
	postExecute : function(pResult, pDiceThrow){
		var equipment = this.context.get('equipment');
		var mapCase = this.context.get('mapCase');
		var player = this.context.get('player');
		var interaction = this.context.get('interaction');
		var skill = this.context.get('skill');
		
		
		switch(pDiceThrow.quality){
			case Dice.NO_QUALITY:
				MVC.doAction('aoe.controller.InteractionController','closePopup',[]);
			break;
			case Dice.QUALITY_GOOD:
				MVC.doAction('aoe.controller.InteractionController','closePopup',[]);
			break;
			case Dice.QUALITY_VERY_GOOD:
				MVC.doAction('aoe.controller.InteractionController','closePopup',[]);
				break;
			case Dice.QUALITY_PERFECT:
				MVC.doAction('aoe.controller.InteractionController','closePopup',[]);
				break;
			case Dice.QUALITY_BAD:
				;
				break;
			case Dice.QUALITY_VERY_BAD:
				;
				break;
			case Dice.QUALITY_WORTH:
				damage = 10;
				player.wound(damage);
				break;
		}
		
		
	}
});