JClass.import('aoe.view.InteractionPanel');

/*JClass.import('jsx.jGraphic.JTextField');
JClass.import('jsx.jGraphic.JLabel');
JClass.import('jsx.jGraphic.JSeparator');*/

_class=JClass.create("RightInteractionPanel",aoe.InteractionPanel,
{
	initialize:function($super,pWindow,pPlayer){
		$super("gRightInteractionPanel","gPanel gInteractionPanel",pWindow);
		
		this.player = pPlayer;
		
		this.gLabel=new jsx.JLabel(this.player.getName(),null,"gLabelInteraction");
		
		this.gSep1=new jsx.JSeparator();
		
		this.gHealthField=new jsx.JTextField(null,"gHealthFld","gFld gTxtFld gReadOnlyFld");
		this.gHealthField.setReadOnly(true);
		
		this.gHealthLabel=new jsx.JLabel("PDV",this.gHealthField,"gHealthLabel","gLabel gLabelFld");
		
		this.gSep2=new jsx.JSeparator();
		
		this.gLabelDescription=new jsx.JLabel(this.player.getDescription(),null,"gLabelPanel");
		
	},
	
	draw : function($super){
		
		this.addComponent(this.gLabel);
		this.addComponent(this.gSep1);
		this.addComponent(this.gHealthLabel);
		this.addComponent(this.gHealthField);
		this.addComponent(this.gSep2);
		this.addComponent(this.gLabelDescription);
			
		$super();
	},
	
	getHealthField: function(){
		return this.gHealthField;
	}
});