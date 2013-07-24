JClass.import('aoe.model.skill.Skill');

_class= JClass.create( 'Archery', aoe.Skill,
{
	initialize: function($super,level){
		$super(level);
		this.label= aoe.getLang('SkBowUsingLabel');
		this.description= aoe.getLang('SkBowUsingDesc');
		this.logMessage= aoe.getLang('SkBowUsingLog');
	}
});