JClass.import('aoe.model.action.Action');

_class= JClass.create( 'SwitchEquipment', aoe.Action,
{
	initialize: function($super){
		
		$super();
		this.skillClassName = null;
		this.equipmentClassName = null;
		this.label = "Changer d'équipement";
		this.description = aoe.getLang('ActStrikeArrowDesc');
		this.logMessage = aoe.getLang('ActStrikeArrowLog');
	},
	
	preExecute : function(){
		var level =100;
		
		return level;
	},
	
	postExecute : function(pResult, pDiceThrow){
		var equipment = this.context.get('equipment');
		var mapCase = this.context.get('mapCase');
		var player = this.context.get('player');
		var interaction = this.context.get('interaction');
		var skill = this.context.get('skill');
		
		
		player.getBackpack().removeObject(pObject);
		player.getCurrentHand().addObject(pObject);
		
	}
});