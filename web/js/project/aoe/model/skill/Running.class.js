JClass.import('aoe.model.skill.Skill');

_class= JClass.create( 'Running', aoe.Skill,
{
	initialize: function($super,level){
		$super(level);
		this.code = 'Running';
		this.label= aoe.getLang('SkRunningLabel');
		this.description= aoe.getLang('SkRunningDesc');
		this.logMessage= aoe.getLang('SkRunningLog');
	}
});