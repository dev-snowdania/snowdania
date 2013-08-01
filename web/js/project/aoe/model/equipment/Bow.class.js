JClass.import('aoe.model.equipment.RangeWeapon');

_class= JClass.create( 'Bow', aoe.RangeWeapon,
{
	initialize: function($super,pQuality){
		$super(aoe.Equipment.TWO_HANDS,50,10,70,[5,50],3,this.getJsClassName());
	}
});