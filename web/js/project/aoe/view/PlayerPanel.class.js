JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.JButton');
JClass.import('jsx.jGraphic.JLabel');
JClass.import('jsx.jGraphic.form.JForm');
JClass.import('jsx.jGraphic.form.JField');
JClass.import('jsx.jGraphic.form.JCheckboxField');
JClass.import('jsx.jGraphic.table.JTable');
JClass.import('jsx.util.DGridModel');

JClass.import('aoe.view.EquipmentPanel');
JClass.import('aoe.view.ResumePortraitPanel');
//JClass.import('aoe.view.SkillPanel');

_class=JClass.create("PlayerPanel",jsx.JPanel,
{
	initialize:function($super,ctrl,ihmArea)
	{
		$super("gPlayer","gPanel");
		this.controller=ctrl;
		this.ihmArea = ihmArea;
		
		this.initPortraitPanel();
		this.initNavigationPanel();
		this.initZoomBar();
		this.initForm();
		this.initDropDownPanels();
	},
	
	getEquipmentPanel: function(){
		return this.gEquipPanel;
	},
	
	getHandPanel: function(){
		return this.gHandPanel;
	},
	
	initPortraitPanel: function(){
		this.gImagePortrait=new jsx.JPanel("gImagePortraitPanel","gImagePortraitPanel");
		this.addComponent(this.gImagePortrait);
		
		this.gResumePortrait=new aoe.ResumePortraitPanel(this.controller,this);
		this.addComponent(this.gResumePortrait);
	},
	
	initNavigationPanel: function(){
		this.gBtnW = new jsx.JButton(aoe.getLang('BtnWLab'),"btnDirectionW","btnDirection");
		this.gBtnW.setInfoBulle(aoe.getLang('BtnWInfo'));
		this.gBtnW.addEventListener("click",function(e,ctx){
			ctx.controller.movePlayerWest();
		},this);
		
		this.gBtnN = new jsx.JButton("N","btnDirectionN","btnDirection");
		this.gBtnN.addEventListener("click",function(e,ctx){
			ctx.controller.movePlayerNorth();
		},this);
		
		this.gBtnE = new jsx.JButton("E","btnDirectionE","btnDirection");
		this.gBtnE.addEventListener("click",function(e,ctx){
			ctx.controller.movePlayerEast();
		},this);
		
		this.gBtnS = new jsx.JButton("S","btnDirectionS","btnDirection");
		this.gBtnS.addEventListener("click",function(e,ctx){
			ctx.controller.movePlayerSouth();
		},this);
		
		this.gBtnNW = new jsx.JButton("NW","btnDirectionNW","btnDirection");
		this.gBtnNW.addEventListener("click",function(e,ctx){
			ctx.controller.movePlayerNorthWest();
		},this);
		
		this.gBtnNE = new jsx.JButton("NE","btnDirectionNE","btnDirection");
		this.gBtnNE.addEventListener("click",function(e,ctx){
			ctx.controller.movePlayerNorthEast();
		},this);
		
		this.gBtnSW = new jsx.JButton("SW","btnDirectionSW","btnDirection");
		this.gBtnSW.addEventListener("click",function(e,ctx){
			ctx.controller.movePlayerSouthWest();
		},this);
		
		this.gBtnSE = new jsx.JButton("SE","btnDirectionSE","btnDirection");
		this.gBtnSE.addEventListener("click",function(e,ctx){
			ctx.controller.movePlayerSouthEast();
		},this);
		
		this.initNavigationTable();
	},
	
	initNavigationTable: function(){
		this.gTable=new jsx.JTable("gTableNavigation");
		this.gTable.createCell(0,0).addComponent(this.gBtnNW);
		this.gTable.createCell(0,1).addComponent(this.gBtnN);
		this.gTable.createCell(0,2).addComponent(this.gBtnNE);
		this.gTable.createCell(1,0).addComponent(this.gBtnW);
		//this.gTable.createCell(1,1).setValue("&nbsp;");
		this.gTable.createCell(1,2).addComponent(this.gBtnE);
		this.gTable.createCell(2,0).addComponent(this.gBtnSW);
		this.gTable.createCell(2,1).addComponent(this.gBtnS);
		this.gTable.createCell(2,2).addComponent(this.gBtnSE);
		// TODO: a revoir
		var data=[];
		for(var i=0;i<3;i++){
			data[i]=[];
			for(var j=0;j<3;j++){
				data[i][j]="";
			}
		}
		data[1][1] = "&nbsp;";
		this.gTable.setDataModel(data);
		this.addComponent(this.gTable);
	},
	
	initZoomBar: function(){
		this.gBtnZoomIn = new jsx.JButton("z+");
		this.gBtnZoomOut = new jsx.JButton("z-");
		this.gBtnZoomIn.addEventListener("click",function(e,ctx){
			ctx.controller.zoom(10);
		},this);
		
		this.gBtnZoomOut.addEventListener("click",function(e,ctx){
			ctx.controller.zoom(-10);
		},this);
		this.addComponent(this.gBtnZoomIn);
		this.addComponent(this.gBtnZoomOut);
	},
	
	initForm: function(){
		this.gForm=new jsx.JForm();
		var gField = new jsx.JCheckboxField("fldDspGrid");
		gField.setValue("true");
		var ihmArea = this.ihmArea;
		gField.bindEvent("click",function(){
			if(jQuery(this).attr('checked')){
				ihmArea.getMapPanel().displayGrid();
			}else{
				ihmArea.getMapPanel().hideGrid();
			}
		});
		this.gForm.addComponent(gField);
		var gLabel=new jsx.JLabel("Afficher la grille",gField);
		this.gForm.addComponent(gLabel);
		this.addComponent(this.gForm);
	},
	
	initDropDownPanels: function(){
		
		this.gEquipPanel = new aoe.EquipmentPanel(this.controller,10,5,'gEquipmentPanel','gPlayerSubPanel');
		//this.gSkillPanel = new SkillPanel(5,1,"gSkillPanel");
		this.gEquipPanel.setTitle("Sac à dos");
		this.addComponent(this.gEquipPanel);
		
		this.gHandPanel = new aoe.EquipmentPanel(this.controller,5,5,'gHandPanel','gPlayerSubPanel');
		this.gHandPanel.setTitle("Main courante");
		this.addComponent(this.gHandPanel);
		
		this.gSkillPanel = new aoe.EquipmentPanel(this.controller,10,5,'gSkillPanel','gPlayerSubPanel');
		this.gSkillPanel.setTitle("Compétences");
		this.addComponent(this.gSkillPanel);
		
		this.gFriendPanel = new aoe.EquipmentPanel(this.controller,10,5,'gFriendPanel','gPlayerSubPanel');
		this.gFriendPanel.setTitle("Compagnons");
		this.addComponent(this.gFriendPanel);
		
		this.gQuestPanel = new aoe.EquipmentPanel(this.controller,10,5,'gQuestPanel','gPlayerSubPanel');
		this.gQuestPanel.setTitle("Quêtes");
		this.addComponent(this.gQuestPanel);
		
		/*this.gSkillPanel.setTitle("Comp�tences");
		this.gSkillPanel.addSkill("SF","Survie en for�t","40");
		this.gSkillPanel.addSkill("ME","Maniement de l'�p�e","60");
		this.gSkillPanel.addSkill("TA","Tir � l'arc","50");
		this.gSkillPanel.addSkill("MA","Marchandage","20");
		this.gSkillPanel.addSkill("EQ","Esquive","60");
		
		this.addComponent(this.gSkillPanel);*/
	},
	
	propertyChange: function(evt)
	{
		switch(evt.getPropertyName())
		{
			case 'addEquipment':
				var oPlayer=evt.getSource();
				var oObject=evt.getNewValue();
				this.gEquipPanel.addObject(oObject);
			break;
			case 'removeEquipment':
				var oPlayer=evt.getSource();
				var oObject=evt.getNewValue();
				this.gEquipPanel.removeObject(oObject);
			break;
			case 'addHandEquipment':
				var oPlayer=evt.getSource();
				var oObject=evt.getNewValue();
				this.gHandPanel.addObject(oObject);
			break;
			case 'removeHandEquipment':
				var oPlayer=evt.getSource();
				var oObject=evt.getNewValue();
				this.gHandPanel.removeObject(oObject);
			break;
			case 'surname':
				var mPlayer=evt.getSource();
				this.gResumePortrait.getSurnameField().getJQuery().val(evt.getNewValue());
			break;
			case 'pdv':
				var mPlayer=evt.getSource();
				this.gResumePortrait.getPdvField().getJQuery().val(evt.getNewValue());
			break;
			case 'arg':
				var mPlayer=evt.getSource();
				this.gResumePortrait.getArgField().getJQuery().val(evt.getNewValue());
			break;
			case 'atd':
				var mPlayer=evt.getSource();
				this.gResumePortrait.getAttitudeField().getJQuery().val(evt.getNewValue());
			break;
			case 'pop':
				var mPlayer=evt.getSource();
				this.gResumePortrait.getPopularityField().getJQuery().val(evt.getNewValue());
			break;
			case 'tiredness':
				var mPlayer=evt.getSource();
				this.gResumePortrait.getTirednessField().getJQuery().val(evt.getNewValue());
			break;
			case 'img':
				var mPlayer=evt.getSource();
				this.gImagePortrait.getJQuery().css('background-image',"url("+evt.getNewValue()+")");
				
				if(mPlayer.imgOptions){
					
					for(i in mPlayer.imgOptions){
						this.gImagePortrait.getJQuery().css(i, mPlayer.imgOptions[i]);
					}
				}
			break;
		}
	}
});