JClass.import('aoe.model.action.Action');

_class= JClass.create( 'RunAway', aoe.Action,
{
	initialize: function($super){
		
		$super(this.getJsClassName());
		this.skillClassName = 'Running';
		this.equipmentClassName = [];
	},
	
	preExecute : function(){
		var equipment = this.context.get('equipment');
		var mapCase = this.context.get('mapCase');
		var player = this.context.get('player');
		var skill = this.context.get('skill');
		var interactiveSession = this.context.get('interactiveSession');
		
		var l = skill.getLevel();
		//distance between two oppoent is important. bigger is the distance, better are the chances to escape
		l += Math.ceil(interactiveSession.getDistance()/2);
		console.log('level: '+l);
		
		return l;
	},
	
	postExecute : function(pResult, pDiceThrow){
		
		
		switch(pDiceThrow.quality){
			case Dice.NO_QUALITY:
				this.context.stop();
			break;
			case Dice.QUALITY_GOOD:
				
				this.context.stop();
			break;
			case Dice.QUALITY_VERY_GOOD:
				
				this.context.stop();
				break;
			case Dice.QUALITY_PERFECT:
				
				//the opponent is completly exhausted by the chase and loose health
				damage = 10;
				this.opponent.wound(damage);
				
				this.context.stop();
				break;
			case Dice.QUALITY_BAD:
				damage = 5;
				this.player.wound(damage);
				break;
			case Dice.QUALITY_VERY_BAD:
				damage = 10;
				this.player.wound(damage);
				break;
			case Dice.QUALITY_WORTH:
				damage = 20;
				this.player.wound(damage);
				break;
		}
		
		
	}
});