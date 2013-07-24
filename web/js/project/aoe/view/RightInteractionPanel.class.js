JClass.import('aoe.view.InteractionPanel');

_class=JClass.create("RightInteractionPanel",aoe.InteractionPanel,
{
	initialize:function($super,pWindow,pPlayer,pActions){
		$super("gRightInteractionPanel","gPanel",pWindow,pPlayer,pActions);
		
		this.gLabel=new jsx.JLabel(this.player.getName(),null,"gLabelInteraction");
		this.addComponent(this.gLabel);
		
		this.gLabelDescription=new jsx.JLabel(this.player.getDescription(),null,"gLabelPanel");
		this.addComponent(this.gLabelDescription);
	}
});