JClass.import('aoe.model.map.MapCase');

_class= JClass.create( 'MountainCase', aoe.MapCase,
{
	initialize: function($super)
	{
		$super();
		if(this.className != undefined && this.className != ""){
			this.className += ',tbl-cell, bg_mt';
		}else{
			this.className = 'tbl-cell, bg_mt';
		}
		this.logMsgMoveErr=aoe.getLang('CaseMtnLogErr');
		
		this.coeffTiredness = 3;
	},
	
	tryMove : function($super,player)
	{
		return $super(player);
	}
	
});