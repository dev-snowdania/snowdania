JClass.import('aoe.model.action.Action');

_class= JClass.create( 'MoveForward', aoe.Action,
{
	initialize: function($super){
		
		$super(this.getJsClassName());
		this.skillClassName = null;
		this.equipmentClassName = [];
	},
	
	checkStatus : function(){
		
		if(this.context.getDistance()<=1){
			this.setStatus(aoe.Action.STATUS_INACTIVE);
			return false;
		}else{
			this.setStatus(aoe.Action.STATUS_ACTIVE);
		}
		
		return true;
	},
	
	preExecute : function(){
		
		var l = 100;
		
		return l;
	},
	
	postExecute : function(pResult, pDiceThrow){
		
		var mvPt = this.player.getSpeed(true);
		var limit = 1;
		
		switch(pDiceThrow.quality){
			case Dice.NO_QUALITY:
				this.context.reduceDistance(mvPt,limit);
			break;
			case Dice.QUALITY_GOOD:
				this.context.reduceDistance(mvPt,limit);
			break;
			case Dice.QUALITY_VERY_GOOD:
				this.context.reduceDistance(mvPt,limit);
				break;
			case Dice.QUALITY_PERFECT:
				this.context.reduceDistance(mvPt,limit);
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