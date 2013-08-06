JClass.import('aoe.model.map.MountainCase');

_class= JClass.create( 'HighMountainCase', aoe.MountainCase,
{
	initialize: function($super)
	{
		$super();
		this.className = 'tbl-cell, bg_hg_mt';
		//console.log(this.getJsClassName()+" "+this.className);
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