JClass.import('aoe.model.action.Action');

_class= JClass.create( 'Target', aoe.Action,
{
	initialize: function($super){
		
		$super(this.getJsClassName());
		this.skillClassName = "Concentrate";
		this.equipmentClassName = null;
	},
	
	doable: function(pPlayer){
		if(pPlayer.getJsClassName()=='Player'){
			return true
		}else{
			return false;
		}
	},
	
	preExecute : function(){
		
		if(!this.skill){
			return false;
		}
		
		var l = this.skill.getLevel();
		console.log("viser level: "+l);
		
		return l;
	},
	
	postExecute : function(pResult, pDiceThrow){
		
		var log = "bonus de %s% suite à une action de viser";
		var bonus = {type: "SKILL", tags: ["DISTANT_THROW"], value: 0, lifetime: 1};
		
		switch(pDiceThrow.quality){
			case Dice.NO_QUALITY:
				bonus.value += 10;
				bonus.log = log.sub('%s',bonus.value);
				this.context.addContextToPlayer(player,bonus);
			break;
			case Dice.QUALITY_GOOD:
				bonus.value += 15;
				bonus.log = log.sub('%s',bonus.value);
				this.context.addContextToPlayer(player,bonus);
			break;
			case Dice.QUALITY_VERY_GOOD:
				bonus.value += 20;
				bonus.log = log.sub('%s',bonus.value);
				this.context.addContextToPlayer(player,bonus);
				break;
			case Dice.QUALITY_PERFECT:
				bonus.value += 30;
				bonus.log = log.sub('%s',bonus.value);
				this.context.addContextToPlayer(player,bonus);
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