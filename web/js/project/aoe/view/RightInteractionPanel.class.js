JClass.import('aoe.view.InteractionPanel');

_class=JClass.create("RightInteractionPanel",aoe.InteractionPanel,
{
	initialize:function($super,pWindow,player){
		$super("gRightInteractionPanel","gPanel",pWindow,player);
		
		this.gLabel=new jsx.JLabel(this.player.getName(),"gLabelPanel");
		this.addComponent(this.gLabel);
		
		this.gLabelDescription=new jsx.JLabel(this.player.getDescription(),"gLabelPanel");
		this.addComponent(this.gLabelDescription);
	}
});