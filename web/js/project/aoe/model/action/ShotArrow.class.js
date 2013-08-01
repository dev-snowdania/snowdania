JClass.import('aoe.model.action.Action');

_class= JClass.create( 'ShotArrow', aoe.Action,
{
	initialize: function($super){
		
		$super(this.getJsClassName());
		this.skillClassName = 'Archery';
		this.equipmentClassName = 'Bow';
	},
	
	preExecute : function(){
		
		if(!this.equipment || !this.skill){
			return false;
		}
		
		var delta = this.context.checkContextForPlayer(player,"SKILL",["DISTANT_THROW"]);
		
		var level = this.skill.getLevel() + delta;
		
		if(this.equipment){
			var qa = this.equipment.getQualityLabel();
			switch(qa){
				case aoe.Equipment.QUALITY_WORTH:
					level -= 15;
					break;
				case aoe.Equipment.QUALITY_VERY_BAD:
					level -= 10;
					break;
				case aoe.Equipment.QUALITY_BAD:
					level -= 5;
					break;
				case aoe.Equipment.QUALITY_GOOD:
					level += 5;
					break;
				case aoe.Equipment.QUALITY_VERY_GOOD:
					level += 10;
					break;
				case aoe.Equipment.QUALITY_BEST:
					level += 15;
					break;
			}
		}
		
		console.log("shot arrow level: "+level);
		
		return level;
	},
	
	postExecute : function(pResult, pDiceThrow){
		
		
		var damage = this.equipment.getStrength();
		
		this.equipment.useUnit(1);
		
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
			case Dice.QUALITY_PERFECT:
				damage += 50;
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