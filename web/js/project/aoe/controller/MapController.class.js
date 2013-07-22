JClass.import('aoe.view.IhmArea');
JClass.import('aoe.data.area17.MapArea17');

_class=JClass.create("GameController",{
	
	initialize:function()
	{
		aoe.mergeLangFile(aoe.classPath+'aoe/data/fr.js');
		this.ihmArea=new aoe.IhmArea(this);
		this.map = new aoe.MapArea17();
		this.currentPlayer=new aoe.Player();
		this.currentPlayer.setName("dark vador");
		this.currentPlayer.setLang('fr');
		this.currentPlayer.setPosX(0);
		this.currentPlayer.setPosY(0);
		this.gameLog=new aoe.LogStatus();
		MVC.getCacheInstance().setObject(this.gameLog,'uneGameLog');
	},
	
	showMap : function(){
		// dessine le jeu
		this.ihmArea.draw();
		
		var mapPanel= this.ihmArea.getMapPanel();
		var playerPanel= this.ihmArea.getPlayerPanel();
		var equipPanel= playerPanel.getEquipmentPanel();//alert("fôrét".utf8Encode());
		
		//on associe les listeners
		this.map.getPropertyChangeSupport().addListener(mapPanel);
		this.currentPlayer.getPropertyChangeSupport().addListener(playerPanel.getEquipmentPanel());
		this.gameLog.getPropertyChangeSupport().addListener(this.ihmArea.getStatusPanel());
		
		/*
		//construct the MVC binding
		uneMap = new aoe.MapArea17();
		unMapController = new MapController();
		uneMapView = new MapPanel(unMapController);
		unMapController.addModel(uneMap);
		unMapController.addView(uneMapView);
		//show the view
		uneMapView.setVisible(true);
		//display initial properties on view by firing the property actions
		uneMap.fireInitialProperties();
		*/
		
		try
		{
			this.map.load(this.currentPlayer.getLang());
			if(this.map.isLoaded())
			{
				var gTable=mapPanel.getMapTable();
				this.map.cases.each(function(p){
					var mCase=p.value;
					var k=p.key.split('.');
					var x = parseInt(k[0]);
					var y = parseInt(k[1]);
					var gCase=gTable.getCase(y,x);
					
					//on associe la case model à la case graphique
					if(gCase!=null){
						mCase.getPropertyChangeSupport().addListener(gCase);
					}
				},this);
				
				this.map.objects.each(function(p){
					var mObject=p.value;
					mObject.getPropertyChangeSupport().addListener(equipPanel);
				},this);
				
				this.map.movePlayer(this.currentPlayer,this.map.getPlayerPosX(),this.map.getPlayerPosY());
				
				this.map.revealAllCases();
				
				/* mise à l'échelle de la carte */
				mapPanel.resizeCaseTo(GameConfig.getCaseWidth(),GameConfig.getCaseHeight());
		
			}
		}
		catch(e){throw e;}
	},
	
	movePlayerWest : function()
	{
		this.movePlayer(-1,0);
	},

	movePlayerEast : function()
	{
		this.movePlayer(1,0);
	},

	movePlayerNorth : function()
	{
		this.movePlayer(0,-1);
	},
	
	movePlayerNorthWest : function()
	{
		this.movePlayer(-1,-1);
	},
	
	movePlayerNorthEast : function()
	{
		this.movePlayer(1,-1);
	},

	movePlayerSouth : function()
	{
		this.movePlayer(0,1);
	},
	
	movePlayerSouthWest : function()
	{
		this.movePlayer(-1,1);
	},
	
	movePlayerSouthEast : function()
	{
		this.movePlayer(1,1);
	},
	
	movePlayer : function(x,y)
	{
		var x= (this.currentPlayer.getPosX()+x);
		var y= (this.currentPlayer.getPosY()+y);
		this.map.movePlayer(this.currentPlayer,x,y);
	},
	
	zoom : function(pInc)
	{
		var mapPanel= this.ihmArea.getMapPanel();
		mapPanel.zoom(pInc);
	}
 
});