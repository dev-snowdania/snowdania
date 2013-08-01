JClass.import('aoe.model.equipment.Container');

_class= JClass.create( 'Backpack', aoe.Container,
{
	initialize: function($super,pQuality){
		$super(aoe.Equipment.ONE_HAND,50,20,30,this.getJsClassName());
	}
});