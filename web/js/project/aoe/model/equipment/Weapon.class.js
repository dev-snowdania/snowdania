JClass.import('aoe.model.equipment.Equipment');

_class= JClass.create( 'Weapon', aoe.Equipment,
{
	initialize: function($super,pType,pQuality,pBulk,pStrength,pRange,pLogJsClassName){
		$super(pType,pQuality,pBulk,pLogJsClassName);
		this.range = pRange;
		this.strength = new aoe.Attribute(pStrength);
	},
	
	getRange: function(){
		return this.range;
	},
	
	setStrength : function(pStrength){
		
		if(pStrength<0){
			pStrength=0;
		}
		
		if(pStrength != this.strength.get()){
			var oldValue=this.strength.get();
			this.strength.set(pStrength);
			this.pcs.firePropertyChange('strength',oldValue,this.strength.get());
		}
	},
	
	damage: function($super,pDamage){
		
		var ratio = pDamage / this.quality.get();
		
		$super(pDamage);
		
		if(pDamage>0){
			// if quality change the damage of the weapon change at the ratio
			var str = this.strength.get() - (this.strength.get()*ratio);
			this.setStrength(str);
		}
	},
	
	getStrength: function(){
		return this.strength.get();
	},
	
	getStrengthAttribute: function(){
		return this.strength;
	},
	
	checkForAction: function($super,pAction){
		
		var interactiveSession = pAction.getContext();
		
		if(interactiveSession.getDistance()>=this.range[0] && interactiveSession.getDistance()<=this.range[1]){
			return $super(pAction);
		}else{
			console.log("la distance pour utiliser %eq doit être entre %d1 et %d2 métres".gsub("%eq",this.label).gsub("%d1",this.range[0]).gsub("%d2",this.range[1]));
			return false;
		}
	}
});