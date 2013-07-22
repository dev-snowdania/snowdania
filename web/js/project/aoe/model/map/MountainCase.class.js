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
	},
	
	tryMove : function($super,player)
	{
		var l=player.getBackpack().getByJsClassName('ClimbingEquipment');
		if(l.length>0) 
		{
			var mObject=l[0];
			mObject.useUnit();
			if(mObject.getUnit()<=0) return false;
			return true;
		}
		else return false;
	}
	
});