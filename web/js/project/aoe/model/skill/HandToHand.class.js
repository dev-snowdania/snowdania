JClass.import('aoe.model.skill.Skill');

_class= JClass.create( 'HandToHand', aoe.Skill,
{
	initialize: function($super,level){
		$super(level);
		this.code = 'HndToHnd';
		this.label= aoe.getLang('SkHndToHndLabel');
		this.description= aoe.getLang('SkHndToHndDesc');
		this.logMessage= aoe.getLang('SkHndToHndLog');
	}
});