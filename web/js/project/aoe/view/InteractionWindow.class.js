JClass.import('jsx.jGraphic.JWindow');

JClass.import('aoe.view.LeftInteractionPanel');
JClass.import('aoe.view.RightInteractionPanel');

_class=JClass.create("InteractionWindow",jsx.JWindow,
{
	initialize:function($super,width,player1,player2){
		$super("popupInteraction","popup_block",width);
		
		this.leftInteractionPanel= new aoe.LeftInteractionPanel(this,player1);
		this.rightInteractionPanel= new aoe.RightInteractionPanel(this,player2);
	},
	
	getLeftInteractionPanel:function(){
		return this.leftInteractionPanel;
	},
	
	getRightInteractionPanel:function(){
		return this.rightInteractionPanel;
	},
	
	draw : function($super){
		
		this.addComponent(this.leftInteractionPanel);
		this.addComponent(this.rightInteractionPanel);

		$super();
	}
});