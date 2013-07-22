JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.JLabel');

_class=JClass.create("InteractionPanel",jsx.JPanel,
{
	initialize:function($super,id,className,pWindow,player){
		$super(id,className);
		//this.controller=ctrl;
		this.pWindow = pWindow;
		
		this.player = player;
		
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