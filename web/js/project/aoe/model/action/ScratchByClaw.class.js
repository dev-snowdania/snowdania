JClass.import('aoe.model.action.Action');

_class= JClass.create( 'ScratchByClaw', aoe.Action,
{
	initialize: function($super){
		
		$super(this.getJsClassName());
		this.skillClassName = 'Wrestling';
		this.equipmentClassName = 'Claw';
	},
	
	doable: function(pPlayer){
		if(pPlayer.getJsClassName()=='LoupSolitaire'){
			return true
		}else{
			return false;
		}
	},
	
	preExecute : function(){
		
		if(!this.equipment || !this.skill){
			return false;
		}
		
		var l = this.skill.getLevel();
		
		return l;
	},
	
	postExecute : function(pResult, pDiceThrow){
		
		var damage = this.equipment.getStrength();
		
		switch(pDiceThrow.quality){
			case Dice.NO_QUALITY:
				this.opponent.wound(damage);
			break;
			case Dice.QUALITY_GOOD:
				damage += 20;
				this.opponent.wound(damage);
			break;
			case Dice.QUALITY_VERY_GOOD:
				damage += 40;
				this.opponent.wound(damage);
				break;
			case Dice.QUALITY_BAD:
				//weapon is damaged
				var qa = this.equipment.getQuality();
				diceThrowQuality = Dice.throwD100(qa);
				if(!diceThrowQuality.succeed){
					this.equipment.damage(5);
				}
				break;
			case Dice.QUALITY_VERY_BAD:
				//weapon is damaged
				var qa = this.equipment.getQuality()-15;
				diceThrowQuality = Dice.throwD100(qa);
				if(!diceThrowQuality.succeed){
					this.equipment.damage(20);
				}
				break;
			case Dice.QUALITY_WORTH:
				//player is wounded by his own weapon
				damage = 10;
				this.player.wound(damage);
				//weapon is damaged
				var qa = this.equipment.getQuality()-30;
				diceThrowQuality = Dice.throwD100(qa);
				if(!diceThrowQuality.succeed){
					this.equipment.damage(20);
				}
				break;
		}
		
		
	}
});