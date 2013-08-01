JClass.import('aoe.model.map.ForestCase');
JClass.import('aoe.data.area17.LoupSolitaire');

_class= JClass.create( 'ForetBoisManteaux', aoe.ForestCase,
{
	initialize: function($super)
	{
		$super();
		this.logMessage= aoe.getLang('LogForetBoisManteaux');
		

		this.visibility = 50;
		this.strength = 10;
		
		var inter1 = new aoe.LoupSolitaire();
		this.interactions.push([50,inter1]);
	}
	
});