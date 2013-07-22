JClass.import('aoe.model.equipment.Equipment');

_class= JClass.create( 'Bow', aoe.Equipment,
{
	initialize: function($super)
	{
		$super();
		this.shortcut= aoe.getLang('EqBowShort');
		this.label= aoe.getLang('EqBowLabel');
		this.description= aoe.getLang('EqBowDesc');
		this.logMessage= aoe.getLang('EqBowLog');
		this.unit=10;
	}
});