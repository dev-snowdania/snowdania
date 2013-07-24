JClass.import('aoe.view.InteractionPanel');

//JClass.import('jsx.Graphic.JInteractionButton');

_class=JClass.create("LeftInteractionPanel",aoe.InteractionPanel,
{
	initialize:function($super,pWindow,pPlayer,pActions){
		$super("gLeftInteractionPanel","gPanel",pWindow,pPlayer,pActions);
		
		this.gLabel=new jsx.JLabel(this.player.getName(),null,"gLabelInteractionPlayer");
		this.addComponent(this.gLabel);
		
		this.actions.reset();
		var act;
		while(act = this.actions.next()){
			
			var equipment = act.getContext().get('equipment');
			if(equipment){
				var label = act.getLabel()+" ("+equipment.getUnit()+")";
				var btn= new jsx.JButton(label,"g"+act.getJsClassName());
			}else{
				var label = act.getLabel();
				var btn= new jsx.JButton(label,"g"+act.getJsClassName());
			}
			
			btn.addEventListener("click",function(e,action){
				MVC.doAction('aoe.controller.InteractionController','executeAction',[action]);
			},act);
			this.addComponent(btn);
		}
	}
});