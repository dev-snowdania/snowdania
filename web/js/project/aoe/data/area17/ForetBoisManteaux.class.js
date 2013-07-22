JClass.import('aoe.model.map.ForestCase');
JClass.import('aoe.data.area17.MeuteLoupsAffames');

_class= JClass.create( 'ForetBoisManteaux', aoe.ForestCase,
{
	initialize: function($super)
	{
		$super();
		this.logMessage= aoe.getLang('LogForetBoisManteaux');
		
		var inter1 = new aoe.MeuteLoupsAffames();
		this.interactions.push([50,inter1]);
	}
	
});