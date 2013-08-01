JClass.import('aoe.model.action.Action');

_class= JClass.create( 'Target', aoe.Action,
{
	initialize: function($super){
		
		$super();
		this.skillClassName = null;
		this.equipmentClassName = null;
		this.label = aoe.getLang('ActDoNothingLabel');
		this.description = aoe.getLang('ActDoNothingDesc');
		this.logMessage = aoe.getLang('ActDoNothingLog');
	},
	
	preExecute : function(){
		return 0;
	},
	
	postExecute : function(pResult, pDiceThrow){
		;
	}
});