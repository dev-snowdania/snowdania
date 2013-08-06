JClass.import('aoe.model.action.Action');

_class= JClass.create( 'SwitchEquipment', aoe.Action,
{
	initialize: function($super){
		
		$super(this.getJsClassName());
		this.skillClassName = null;
		this.equipmentClassName = [];
	},
	
	doable: function(pPlayer){
		if(pPlayer.getJsClassName()=='Player'){
			return true;
		}else{
			return false;
		}
	},
	
	checkStatus : function(pEquipmentToSwitch,pDirection){
		
		if(!pEquipmentToSwitch){
			pEquipmentToSwitch = this.equipmentToSwitch;
		}
		
		if(!pDirection){
			pDirection = this.direction;
		}
		
		player = this.context.getPlayer();
		
		status = aoe.Action.STATUS_ACTIVE;
		
		if(pDirection=='addToBackpack'){
			if(pEquipmentToSwitch){
				if(!player.getBackpack().checkObject(pEquipmentToSwitch)){
					console.log('not enough to store object in your backpack');
					status = aoe.Action.STATUS_INACTIVE;
				}
			}else{
				status = aoe.Action.STATUS_INACTIVE;
			}
		}else if(pDirection=='addToCurrentHand'){
			if(pEquipmentToSwitch){
				if(!player.getCurrentHand().checkObject(pEquipmentToSwitch)){
					console.log('not enough to grab object in your hand');
					status = aoe.Action.STATUS_INACTIVE;
				}
			}else{
				status = aoe.Action.STATUS_INACTIVE;
			}
		}else{
			status = aoe.Action.STATUS_INACTIVE;
		}

		this.setStatus(status);
		
		return this.status;
	},
	
	setEquipmentToSwitch: function(pEquipment,pDirection){
		this.equipmentToSwitch = pEquipment;
		this.direction = pDirection;
	},
	
	preExecute : function(){
		var level =100;
		return level;
	},
	
	postExecute : function(pResult, pDiceThrow){
		if(this.direction=='addToBackpack'){
			this.player.getCurrentHand().removeObject(this.equipmentToSwitch);
			this.player.getBackpack().addObject(this.equipmentToSwitch);
			this.player.checkAttitude();
		}else{
			this.player.getBackpack().removeObject(this.equipmentToSwitch);
			this.player.getCurrentHand().addObject(this.equipmentToSwitch);
			this.player.checkAttitude();
		}
		
	}
});