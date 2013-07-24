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
	
	propertyChange: function(evt){
		switch(evt.getPropertyName())
		{
			case 'addEquipment':
				;
			break;
		}
	}
});