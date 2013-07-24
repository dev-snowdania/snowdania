JClass.import('aoe.model.action.Action');

_class= JClass.create( 'RunAway', aoe.Action,
{
	initialize: function($super){
		
		$super();
		this.skillClassName = 'Running';
		this.equipmentClassName = null;
		this.code = 'RunAway';
		this.label = aoe.getLang('ActRunAwayLabel');
		this.description = aoe.getLang('ActRunAwayDesc');
		this.logMessage = aoe.getLang('ActRunAwayLog');
	}
});