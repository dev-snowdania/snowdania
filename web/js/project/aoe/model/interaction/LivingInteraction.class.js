JClass.import('aoe.model.interaction.Interaction');
JClass.import('aoe.model.Attribute');

_class= JClass.create( 'LivingInteraction', aoe.Interaction, 
{
	initialize: function($super,pName,pDescription,pHealth,pSpeed){
		$super(pName,pDescription);
		
		this.pointVie = new aoe.Attribute(pHealth);
		this.speed = new aoe.Attribute(pSpeed); // in kilometer per hour

		this.skills = new aoe.SkillManager();
		
		this.status = aoe.LivingInteraction.STATUS_ALIVE;
	},
	
	setActionManager:function(pActManager){
		this.actionManager = pActManager;
	},
	
	getActionManager:function(reset){
		if(reset){
			this.actionManager.reset();
		}
		return this.actionManager;
	},
	
	setStatus : function(pStatus){
		if(pStatus != this.status){
			
			if(pStatus==aoe.LivingInteraction.STATUS_DEAD){
				console.log("%s rend son dernier souffle après un combat épique".gsub("%s",this.getJsClassName()));
			}
			
			var oldValue=this.status;
			this.status=pStatus;
			this.pcs.firePropertyChange('status',oldValue,this.status);
		}
	},
	
	setPointVie : function(pdv){
		
		if(pdv != this.pointVie){
			var oldValue=this.pointVie.get();
			this.pointVie.set(pdv);
			this.pcs.firePropertyChange('pdv',oldValue,this.pointVie.get());
			
			if(this.pointVie.get()<=0){
				this.setStatus(aoe.LivingInteraction.STATUS_DEAD);
			}else{
				if(this.pointVie.getRatio()<0.25){
					//this.speed.remove(75,'%');
					//console.log(this.getJsClassName()+" est gravement blessé: sa mobilité est quasi nulle et ses capacités générales fortement diminuées");
				}else if(this.pointVie.getRatio()<0.5){
					//this.speed.remove(50,'%');
					//console.log(this.getJsClassName()+" est sérieusement blessé: sa vitesse est réduite, ses capacités d'attaque sont réduites");
				} 
			}
		}
	},
	
	interact: function(pInteractiveSession){
		
		;
	},
	
	getCurrentHand : function(reset){
		if(reset){
			this.currentHand.reset();
		}
		return this.currentHand;
	},
	
	getSkills : function(reset){
		if(reset){
			this.skills.reset();
		}
		return this.skills;
	},
	
	wound : function(damage){
		if((this.pointVie.get() - damage)<0){
			this.setPointVie(0);
		}else{
			this.setPointVie((this.pointVie.get() - damage));
		}
		console.log(this.getJsClassName()+" perd "+damage+" points de vie");
	},
	
	fireInitialProperties : function(){
		this.pcs.firePropertyChange('pdv',null,this.pointVie.get());
		/*this.equipement.each(function(pEquip,i)
		{
			this.pcs.firePropertyChange('addEquipment',{object:pEquip});
		},this);*/
	},
	
	getSpeed : function(turn){
		if(turn){
			return Math.ceil(((this.speed.get()*1000)/3600)*3);
		}else{
			return this.speed.get();
		}
	}
	
});

_class.STATUS_ALIVE = "LIVING_INTERACTION_STATUS_ALIVE";
_class.STATUS_DEAD = "LIVING_INTERACTION_STATUS_DEAD";