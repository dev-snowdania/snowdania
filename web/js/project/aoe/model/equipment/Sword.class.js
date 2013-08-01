JClass.import('aoe.model.equipment.Weapon');

_class= JClass.create( 'Sword', aoe.Weapon,
{
	initialize: function($super,pQuality){
		$super(aoe.Equipment.ONE_HAND,50,5,50,[0,2],this.getJsClassName());
	}
});