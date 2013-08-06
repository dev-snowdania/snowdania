JClass.import('aoe.model.equipment.Weapon');

_class= JClass.create( 'Sword', aoe.Weapon,
{
	initialize: function($super,pQuality,pDommage){
		
		if(typeof pQuality == 'undefined'){
			pQuality = 50;
		}
		
		if(typeof pDommage == 'undefined'){
			pDommage = 50;
		}
		
		$super(aoe.Equipment.ONE_HAND,pQuality,5,pDommage,[1,2],this.getJsClassName());
	}
});