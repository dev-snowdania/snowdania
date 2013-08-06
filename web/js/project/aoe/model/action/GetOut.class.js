JClass.import('aoe.model.action.Action');

_class= JClass.create( 'GetOut', aoe.Action,
{
	initialize: function($super){
		
		$super(this.getJsClassName());
		this.skillClassName = 'Wrestling';
		this.equipmentClassName = [];
	},
	
	checkStatus : function(){
		
		if(this.context.getDistance()>0){
			this.setStatus(aoe.Action.STATUS_INACTIVE);
		}else{
			this.setStatus(aoe.Action.STATUS_ACTIVE);
		}
	},
	
	preExecute : function(){
		
		if(!this.skill){
			return false;
		}
		
		var l = this.skill.getLevel();
		return l;
	},
	
	postExecute : function(pResult, pDiceThrow){
		
		switch(pDiceThrow.quality){
			case Dice.NO_QUALITY:
				this.context.setDistance(1);
			break;
			case Dice.QUALITY_GOOD:
				this.context.setDistance(1);
			break;
			case Dice.QUALITY_VERY_GOOD:
				this.context.setDistance(2);
				break;
			case Dice.QUALITY_PERFECT:
				this.context.setDistance(2);
				damage = 10;
				this.opponent.wound(damage);
				break;
			case Dice.QUALITY_BAD:
				break;
			case Dice.QUALITY_VERY_BAD:
				break;
			case Dice.QUALITY_WORTH:
				damage = 10;
				this.player.wound(damage);
				break;
		}
		
		
	}
});