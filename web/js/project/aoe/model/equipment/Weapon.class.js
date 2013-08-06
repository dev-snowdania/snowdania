JClass.import('aoe.model.equipment.Equipment');

_class= JClass.create( 'Weapon', aoe.Equipment,
{
	initialize: function($super,pType,pQuality,pBulk,pStrength,pRange,pLogJsClassName){
		$super(pType,pQuality,pBulk,pLogJsClassName);
		this.range = pRange;
		
		if(typeof pStrength == 'number'){
			this.strength = {global: new aoe.Attribute(pStrength)};
		}else{
			this.strength = pStrength;
		}
	},
	
	getRange: function(){
		return this.range;
	},
	
	setStrength : function(pStrength,pAction){
		
		if(pStrength<0){
			pStrength=0;
		}
		
		if(typeof pAction == 'undefined'){
			pAction = "global";
		}
		
		if(!this.strength[pAction]){
			this.strength[pAction] = new aoe.Attribute(pStrength);
			this.pcs.firePropertyChange('strength',null,pStrength,{action: pAction});
		}else{
			if(pStrength != this.strength[pAction].get()){
				var oldValue=this.strength[pAction].get();
				this.strength[pAction].set(pStrength);
				this.pcs.firePropertyChange('strength',oldValue,this.strength[pAction].get(),{action: pAction});
			}
		}
	},
	
	damage: function($super,pDamage){
		
		var ratio = pDamage / this.quality.get();
		
		$super(pDamage);
		
		if(pDamage>0){
			// if quality change the damage of the weapon change at the ratio
			for(pAction in this.strength){
				var str = this.strength[pAction].get() - (this.strength[pAction].get()*ratio);
				this.setStrength(str,pAction);
			};
			
		}
	},
	
	getStrength: function(pAction){
		if(typeof pAction == 'undefined'){
			pAction = "global";
		}
		
		if(!this.strength[pAction]){
			pAction = "global";
		}
		
		return this.strength[pAction].get();
	},
	
	getStrengthAttribute: function(pAction){
		
		if(typeof pAction == 'undefined'){
			pAction = "global";
		}
		
		if(!this.strength[pAction]){
			pAction = "global";
		}
		
		return this.strength[pAction];
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