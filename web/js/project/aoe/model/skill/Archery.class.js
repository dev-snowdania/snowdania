JClass.import('aoe.model.skill.Skill');

_class= JClass.create( 'Archery', aoe.Skill,
{
	initialize: function($super,level){
		$super(level,this.getJsClassName());
	}
});