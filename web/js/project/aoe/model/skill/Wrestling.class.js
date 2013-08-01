JClass.import('aoe.model.skill.Skill');

_class= JClass.create( 'Wrestling', aoe.Skill,
{
	initialize: function($super,level){
		$super(level);
		this.label= aoe.getLang('SkWrestlingLabel');
		this.description= aoe.getLang('SkWrestlingDesc');
		this.logMessage= aoe.getLang('SkWrestlingLog');
	}
});