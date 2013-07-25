JClass.import('jsx.jGraphic.JWindow');

JClass.import('aoe.view.LeftInteractionPanel');
JClass.import('aoe.view.RightInteractionPanel');

_class=JClass.create("InteractionWindow",jsx.JWindow,
{
	initialize:function($super,width,player1,actions1,player2,actions2){
		$super("popupInteraction","popup_block",width);
		
		this.modal = true;
		
		this.leftInteractionPanel= new aoe.LeftInteractionPanel(this,player1,actions1);
		this.rightInteractionPanel= new aoe.RightInteractionPanel(this,player2,actions2);
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
	},
	
	propertyChange: function(evt){
		switch(evt.getPropertyName())
		{
			case 'turn':
				if(evt.getNewValue()==aoe.InteractiveSession.PLAYER){
					console.log("enable player panel");
					this.leftInteractionPanel.activate();
					this.rightInteractionPanel.desactivate();
				}else{
					console.log("enable opponent panel");
					this.rightInteractionPanel.activate();
					this.leftInteractionPanel.desactivate();
				}
			break;
		}
	}
});