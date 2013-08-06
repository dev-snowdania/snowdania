JClass.import('aoe.model.map.MapCase');

_class= JClass.create( 'HillCase', aoe.MapCase,
{
	initialize: function($super)
	{
		$super();
		if(this.className != undefined && this.className != ""){
			this.className += ',tbl-cell, bg_hi';
		}else{
			this.className = 'tbl-cell, bg_hi';
		}
		
		this.coeffTiredness = 2;
	},
	
	tryMove : function($super,player)
	{
		/*if(player.getEquipmentByType(EQUI_BOAT).length==0) 
		{
			//this.updateGameStatus("vous devez disposer d'un bateau pour traverser les rivi�res.");
			return false;
		}*/
		return $super(player);
	}
	
});