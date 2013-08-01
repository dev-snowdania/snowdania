JClass.import('aoe.model.skill.Skill');

_class= JClass.create( 'Running', aoe.Skill,
{
	initialize: function($super,level){
		$super(level,this.getJsClassName());
	}
});