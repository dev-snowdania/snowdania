JClass.import('aoe.model.action.Action');

_class= JClass.create( 'ShotArrow', aoe.Action,
{
	initialize: function($super){
		
		$super();
		this.skillClassName = 'Archery';
		this.equipmentClassName = 'Bow';
		this.label = aoe.getLang('ActStrikeArrowLabel');
		this.description = aoe.getLang('ActStrikeArrowDesc');
		this.logMessage = aoe.getLang('ActStrikeArrowLog');
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
		var landscape = this.context.get('landscape');
		var player = this.context.get('player');
		var interaction = this.context.get('interaction');
		var skill = this.context.get('skill');
		
		var damage = equipment.getStrength();
		
		switch(pDiceThrow.quality){
			case Dice.NO_QUALITY:
				interaction.wound(damage);
			break;
			case Dice.QUALITY_GOOD:
				damage += 20;
				interaction.wound(damage);
			break;
			case Dice.QUALITY_VERY_GOOD:
				damage += 40;
				interaction.wound(damage);
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