JClass.import('aoe.model.equipment.Weapon');

_class= JClass.create( 'RangeWeapon', aoe.Weapon,
{
	initialize: function($super,pType,pQuality,pBulk,pStrength,pRange,pUnit,pLogJsClassName){
		$super(pType,pQuality,pBulk,pStrength,pRange,pLogJsClassName);
		this.unit = pUnit;
	},
	
	getUnit : function(){
		return this.unit;
	},
	
	useUnit : function(i){
		if(this.unit>0) {
			this.setUnit((this.unit-i));
		}
	},
	
	setUnit : function(pUnit){
		var oldUnit=this.unit;
		this.unit = pUnit;
		this.pcs.firePropertyChange('unit',oldUnit,this.unit);
	},
	
	checkForAction: function($super,pAction){
		
		var interactiveSession = pAction.getContext();
		
		if(this.unit>0){
			return $super(pAction);
		}else{
			console.log("le nombre d'unité de %eq doit être supérieure à 0".gsub("%eq",this.label));
			return false;
		}
	}
});