JClass.import('aoe.model.equipment.Equipment');

_class= JClass.create( 'MagicCarpet', aoe.Equipment,
{
	initialize: function($super)
	{
		$super();
		this.shortcut='MC';
		this.label='tapis magique';
		this.description="le tapis magique vous permet d'aller n'importe où sans contrainte";
		this.logMessage="félicitation vous avez trouvé un tapis magique! vous pouvez maintenant traverser tout type de terrain";
		this.unit=10;
	}
});