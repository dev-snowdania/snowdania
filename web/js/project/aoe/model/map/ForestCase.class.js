JClass.import('aoe.model.map.MapCase');

_class= JClass.create( 'ForestCase', aoe.MapCase,
{
	initialize: function($super)
	{
		$super();
		if(this.className != undefined && this.className != ""){
			this.className += ',tbl-cell, bg_fo';
		}else{
			this.className = 'tbl-cell, bg_fo';
		}
	},
	
	tryMove : function($super,player)
	{
		return $super(player);
	}
	
});