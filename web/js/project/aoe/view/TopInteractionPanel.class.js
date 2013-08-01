JClass.import('aoe.view.InteractionPanel');

/*JClass.import('jsx.jGraphic.JTextField');
JClass.import('jsx.jGraphic.JLabel');
JClass.import('jsx.jGraphic.JSeparator');*/

_class=JClass.create("TopInteractionPanel",aoe.InteractionPanel,
{
	initialize:function($super,pWindow,pMapCase){
		$super("gTopInteractionPanel","gPanel gInteractionPanel",pWindow);
		
		this.mapCase = pMapCase;
		
		this.gLabelMapCase=new jsx.JLabel(pMapCase.getJsClassName(),null,"gLabelMapCase");
		
		this.gSep1=new jsx.JSeparator();
		
		this.gDistanceField=new jsx.JTextField(null,"gDistanceFld","gFld gTxtFld gReadOnlyFld");
		this.gDistanceField.setReadOnly(true);
		
		this.gDistanceLabel=new jsx.JLabel("Distance",this.gDistanceField,"gDistanceLabel","gLabel gLabelFld");
		
		this.gSep2=new jsx.JSeparator();
		
	},
	
	draw : function($super){
		
		this.addComponent(this.gLabelMapCase);
		this.addComponent(this.gSep1);
		this.addComponent(this.gDistanceLabel);
		this.addComponent(this.gDistanceField);
		this.addComponent(this.gSep2);
			
		$super();
	},
	
	getDistanceField: function(){
		return this.gDistanceField;
	}
});