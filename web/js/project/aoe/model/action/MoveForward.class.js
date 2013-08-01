JClass.import('aoe.model.action.Action');

_class= JClass.create( 'MoveForward', aoe.Action,
{
	initialize: function($super){
		
		$super(this.getJsClassName());
		this.skillClassName = 'Running';
		this.equipmentClassName = null;
	},
	
	preExecute : function(){
		
		if(!this.skill){
			return false;
		}
		
		var l = this.skill.getLevel();
		
		return l;
	},
	
	postExecute : function(pResult, pDiceThrow){
		
		var mvPt = this.player.getSpeed(true);
		
		switch(pDiceThrow.quality){
			case Dice.NO_QUALITY:
				this.context.reduceDistance(mvPt);
			break;
			case Dice.QUALITY_GOOD:
				this.context.reduceDistance(mvPt);
			break;
			case Dice.QUALITY_VERY_GOOD:
				this.context.reduceDistance(mvPt);
				break;
			case Dice.QUALITY_PERFECT:
				this.context.reduceDistance(mvPt);
				break;
			case Dice.QUALITY_BAD:
				;
				break;
			case Dice.QUALITY_VERY_BAD:
				;
				break;
			case Dice.QUALITY_WORTH:
				;
				break;
		}
		
		
	}
});