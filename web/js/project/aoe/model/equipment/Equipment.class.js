JClass.import('jsx.entities.PropertyChangeSupport');
JClass.import('aoe.model.Attribute');

_class= JClass.create( 'Equipment',
{
	initialize: function(pType,pQuality,pBulk,pLogJsClassName){
		
		this.shortcut = aoe.getLang('Eq'+pLogJsClassName+'Short');
		this.label = aoe.getLang('Eq'+pLogJsClassName+'Label');
		this.description = aoe.getLang('Eq'+pLogJsClassName+'Desc');
		this.logMessage = aoe.getLang('Eq'+pLogJsClassName+'Log');
		this.quality = new aoe.Attribute(pQuality);
		//encombrement
		this.bulk = pBulk;
		//nombre de main pour l'utiliser
		this.type = pType;
		//this.logMessage='vous avez trouvé un objet';
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	getType: function(){
		return this.type;
	},
	
	getShortcut: function(){
		return this.shortcut;
	},
	
	getLabel : function(){
		return this.label;
	},
	
	getDescription : function(){
		return this.description;
	},
	
	setQuality : function(pQuality){
		
		if(pQuality<0){
			pQuality=0;
		}
		
		if(pQuality != this.quality.get()){
			var oldQuality=this.quality.get();
			this.quality.set(pQuality);
			this.pcs.firePropertyChange('quality',oldQuality,this.quality.get());
			console.log(this.getJsClassName()+ " est endommagé. Sa qualité est maintenant "+this.getQualityLabel());
		}
	},
	
	getLogMessage : function(){
		return this.logMessage;
	},
	
	getQuality: function(){
		return this.quality.get();
	},
	
	getQualityLabel: function(){
		var qa = this.quality.get();
		if(qa<= 0){
			return aoe.Equipment.STATUS_BROKEN;
		}else if(qa>0 && qa<= 10){
			return aoe.Equipment.QUALITY_WORTH;
		}else if(qa>10 && qa<=20){
			return aoe.Equipment.QUALITY_VERY_BAD;
		}else if(qa>20 && qa<=40){
			return aoe.Equipment.QUALITY_BAD;
		}else if(qa>40 && qa<=60){
			return aoe.Equipment.QUALITY_NORMAL;
		}else if(qa>60 && qa<=70){
			return aoe.Equipment.QUALITY_GOOD;
		}else if(qa>70 && qa<=80){
			return aoe.Equipment.QUALITY_VERY_GOOD;
		}else{
			return aoe.Equipment.QUALITY_BEST;
		}
	},
	
	damage: function(pDamage){
		
		if(pDamage>0){
			this.setQuality((this.quality.get() - pDamage));
		}
	},
	
	getBulk: function(){
		return this.bulk;
	},
	
	checkForAction: function(pAction){
		if(this.quality.get()>0){
			return true;
		}else{
			console.log("la qualité %eq doit être supérieure à 0".gsub("%eq",this.label));
			return false;
		}
	}
});

_class.ONE_HAND = "WEAPON_ONE_HAND";
_class.TWO_HANDS = "WEAPON_TWO_HANDS";
_class.ONE_AND_HALF_HAND = "WEAPON_ONE_AND_HALF_HAND";

_class.STATUS_BROKEN = "EQP_STATUS_BROKEN";
_class.QUALITY_WORTH = "EQP_QA_WORTH";
_class.QUALITY_VERY_BAD = "EQP_QA_V_BAD";
_class.QUALITY_BAD = "EQP_QA_BAD";
_class.QUALITY_NORMAL = "EQP_QA_NORMAL";
_class.QUALITY_GOOD = "EQP_QA_GOOD";
_class.QUALITY_VERY_GOOD = "EQP_QA_V_GOOD";
_class.QUALITY_BEST = "EQP_QA_BEST";