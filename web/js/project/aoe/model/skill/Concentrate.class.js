JClass.import('aoe.model.skill.Skill');

_class= JClass.create( 'Concentrate', aoe.Skill,
{
	initialize: function($super,level){
		$super(level,this.getJsClassName());
	}
});