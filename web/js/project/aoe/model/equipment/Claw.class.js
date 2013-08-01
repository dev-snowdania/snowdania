JClass.import('aoe.model.equipment.Weapon');

_class= JClass.create( 'Claw', aoe.Weapon,
{
	initialize: function($super){
		$super(aoe.Equipment.ONE_HAND,50,5,50,[0,0],this.getJsClassName());
	}
});