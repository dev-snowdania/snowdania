JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.JLabel');

_class=JClass.create("InteractionPanel",jsx.JPanel,
{
	initialize:function($super,id,className,pWindow,pPlayer,pActions){
		$super(id,className);
		//this.controller=ctrl;
		this.win = pWindow;
		this.player = pPlayer;
		this.actions = pActions;
		
		this.initPanel();
	},
	
	initPanel: function(){
		;
	},
	
	activate: function(){
		if(this.jObject){
			this.jObject.addClass("gInteractionPanelActive");
		}
	},
	
	desactivate: function(){
		if(this.jObject){
			this.jObject.removeClass("gInteractionPanelActive");
		}
	},
	
	propertyChange: function(evt){
		switch(evt.getPropertyName())
		{
			case 'addEquipment':
				;
			break;
		}
	}
});