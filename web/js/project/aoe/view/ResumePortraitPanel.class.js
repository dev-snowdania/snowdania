JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.JButton');
JClass.import('jsx.jGraphic.JSelectField');
JClass.import('jsx.jGraphic.JTextField');
JClass.import('jsx.jGraphic.JLabel');
JClass.import('jsx.jGraphic.JSeparator');

_class=JClass.create("ResumePortraitPanel",jsx.JPanel,
{
	initialize:function($super,ctrl,prtPanel)
	{
		$super("gResumePortraitPanel","gResumePortraitPanel");
		this.controller=ctrl;
		this.parentPanel = prtPanel;
		
		this.gSurnameTxtFld=new jsx.JTextField("","gSurnameTxtFld","gFld gTxtFld gReadOnlyFld");
		this.gSurnameTxtFld.setReadOnly(true);
		
		this.gSep1=new jsx.JSeparator();
		
		this.gPdvLabel=new jsx.JLabel("PDV",this.gPdvTxtFld,"gPdvLabel","gLabel gLabelFld");
		
		this.gPdvTxtFld=new jsx.JTextField("0","gPdvTxtFld","gFld gTxtFld gReadOnlyFld");
		this.gPdvTxtFld.setReadOnly(true);
		
		this.gPdvLabel=new jsx.JLabel("PDV",this.gPdvTxtFld,"gPdvLabel","gLabel gLabelFld");
		
		this.gSep2=new jsx.JSeparator();
		
		this.gArgTxtFld=new jsx.JTextField(null,"gArgTxtFld","gFld gTxtFld gReadOnlyFld");
		this.gArgTxtFld.setReadOnly(true);
		
		this.gArgLabel=new jsx.JLabel("ARG",this.gArgTxtFld,"gArgLabel","gLabel gLabelFld");
		
		this.gSep3=new jsx.JSeparator();
		
		this.gAttitudeFld=new jsx.JSelectField(null,{},"gAttitudeFld","gFld gSelectFld");
		this.gAttitudeFld.addOption(aoe.Player.ATTITUDE_AGRESSIVE,"Agressive");
		this.gAttitudeFld.addOption(aoe.Player.ATTITUDE_HOSTILE,"Hostile");
		this.gAttitudeFld.addOption(aoe.Player.ATTITUDE_NEUTRAL,"Neutre");
		this.gAttitudeFld.addOption(aoe.Player.ATTITUDE_FRIENDLY,"Amicale");
		this.gAttitudeFld.addOption(aoe.Player.ATTITUDE_SOCIAL,"Sociale");
		
		this.gAttitudeLabel=new jsx.JLabel("ATT",this.gAttitudeFld,"gAtdLabel","gLabel gLabelFld");
		
		this.gPopularityFld=new jsx.JTextField(null,"gPopularityFld","gFld gTxtFld gReadOnlyFld");
		this.gPopularityFld.setReadOnly(true);
		
		this.gPopularityLabel=new jsx.JLabel("POP",this.gPopularityFld,"gPopularityLabel","gLabel gLabelFld");
		
		this.gSep4=new jsx.JSeparator();
		
		this.gTirednessFld=new jsx.JTextField(null,"gTirednessFld","gFld gTxtFld gReadOnlyFld");
		this.gTirednessFld.setReadOnly(true);
		
		this.gTirednessLabel=new jsx.JLabel("TIR",this.gTirednessFld,"gTirednessLabel","gLabel gLabelFld");
		
		this.gSep5=new jsx.JSeparator();
		
	},
	
	draw: function($super){
		this.addComponent(this.gSurnameTxtFld);
		this.addComponent(this.gSep1);
		this.addComponent(this.gPdvLabel);
		this.addComponent(this.gPdvTxtFld);
		this.addComponent(this.gSep2);
		this.addComponent(this.gArgLabel);
		this.addComponent(this.gArgTxtFld);
		this.addComponent(this.gSep3);
		this.addComponent(this.gAttitudeLabel);
		this.addComponent(this.gAttitudeFld);
		this.addComponent(this.gSep4);
		this.addComponent(this.gPopularityLabel);
		this.addComponent(this.gPopularityFld);
		this.addComponent(this.gSep5);
		this.addComponent(this.gTirednessLabel);
		this.addComponent(this.gTirednessFld);
		
		$super();
	},
	
	getSurnameField: function(){
		return this.gSurnameTxtFld;
	},
	
	getPdvField: function(){
		return this.gPdvTxtFld;
	},
	
	getArgField: function(){
		return this.gArgTxtFld;
	},
	
	getAttitudeField: function(){
		return this.gAttitudeFld;
	},
	
	getPopularityField: function(){
		return this.gPopularityFld;
	},
	
	getTirednessField: function(){
		return this.gTirednessFld;
	}
});