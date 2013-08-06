JClass.import('aoe.model.map.RiverCase');

_class= JClass.create( 'DeepWaterCase', aoe.RiverCase,
{
	initialize: function($super)
	{
		$super();
		if(this.className != undefined && this.className != ""){
			this.className += ',tbl-cell, bg_dp_wa';
		}else{
			this.className = 'tbl-cell, bg_dp_wa';
		}
		this.logMsgMoveErr=aoe.getLang('CaseRivLogErr');
	},
	
	tryMove : function($super,player)
	{
		var l=player.getBackpack().getByJsClassName('MagicCarpet');
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