JClass.import('aoe.model.map.MapCase');

_class= JClass.create( 'PlainCase', aoe.MapCase,
{
	initialize: function($super)
	{
		$super();
		if(this.className != undefined && this.className != ""){
			this.className += ',tbl-cell, bg_pl';
		}else{
			this.className = 'tbl-cell, bg_pl';
		}
	},
	
	tryMove : function($super,player)
	{
		/*if(player.getEquipmentByType(EQUI_BOAT).length==0) 
		{
			//this.updateGameStatus("vous devez disposer d'un bateau pour traverser les rivières.");
			return false;
		}*/
		return $super(player);
	}
	
});