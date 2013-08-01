JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.JLabel');

_class=JClass.create("InteractionPanel",jsx.JPanel,
{
	initialize:function($super,id,className,pWindow){
		$super(id,className);
		//this.controller=ctrl;
		this.win = pWindow;
		
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
	}
});