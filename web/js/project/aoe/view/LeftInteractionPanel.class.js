JClass.import('aoe.view.InteractionPanel');

_class=JClass.create("LeftInteractionPanel",aoe.InteractionPanel,
{
	initialize:function($super,pWindow,player){
		$super("gLeftInteractionPanel","gPanel",pWindow,player);
		
		var skills = this.player.getSkills();
		
		var skill=skills.next();
		while(skill){
			var btn= new jsx.JButton(skill.getLabel()+"("+skill.getLevel()+")");
			this.addComponent(btn);
			skill=skills.next();
		}
	}
});