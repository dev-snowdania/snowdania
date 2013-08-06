JClass.import('aoe.model.equipment.Weapon');

_class= JClass.create( 'Dagger', aoe.Weapon,
{
	initialize: function($super,pQuality,pDommage){
		
		if(typeof pQuality == 'undefined'){
			pQuality = 50;
		}
		
		if(typeof pDommage == 'undefined'){
			pDommage = {global: new aoe.Attribute(25), HitWithTip: new aoe.Attribute(50)};
		}
		
		$super(aoe.Equipment.ONE_HAND,pQuality,5,pDommage,[0,1],this.getJsClassName());
	}
});