JClass.import('aoe.model.skill.Skill');

_class= JClass.create( 'Wrestling', aoe.Skill,
{
	initialize: function($super,level){
		$super(level,this.getJsClassName());
	}
});