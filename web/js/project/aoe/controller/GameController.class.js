JClass.import('jsx.jGraphic.JDropPanel');
JClass.import('jsx.jGraphic.table.JTable');

JClass.import('aoe.view.IhmArea');
JClass.import('aoe.data.area17.MapArea17');
JClass.import('aoe.model.Player');
JClass.import('aoe.model.log.LogStatus');
JClass.import('aoe.model.GameConfig');

_class=JClass.create("GameController",{
	
	initialize:function()
	{
		aoe.mergeLangFile(aoe.classPath+'aoe/data/fr.js');
		this.ihmArea=new aoe.IhmArea(this);
		this.map = new aoe.MapArea17();
		
		this.currentPlayer=new aoe.Player();
		this.currentPlayer.setName("darky");
		this.currentPlayer.setImage("web/js/project/aoe/data/player/portrait.png",{"background-position": "-106px -24px"});
		this.currentPlayer.setLang('fr');
		this.currentPlayer.setPosX(0);
		this.currentPlayer.setPosY(0);
		
		this.gameLog=new aoe.LogStatus();
		MVC.getCacheInstance().setObject(this.gameLog,'uneGameLog');
	},
	
	showMap : function(){
		// draw the map
		this.ihmArea.draw();
		
		var mapPanel= this.ihmArea.getMapPanel();
		var playerPanel= this.ihmArea.getPlayerPanel();
		var equipPanel= playerPanel.getEquipmentPanel();
		
		//on associe les listeners
		this.map.getPropertyChangeSupport().addListener(this);
		this.currentPlayer.getPropertyChangeSupport().addListener(playerPanel);
		this.currentPlayer.getBackpack().addListener(playerPanel);
		this.currentPlayer.getCurrentHand().addListener(playerPanel);
		this.gameLog.getPropertyChangeSupport().addListener(this.ihmArea.getStatusPanel());
		
		/*
		this.showMapView(new aoe.MapArea17());
		*/
		
		//joueur
		this.currentPlayer.fireInitialProperties();
		
		// chargement de la carte
		try
		{
			this.map.load(this.currentPlayer.getLang());
		}
		catch(e){throw e;}
		
		//console.log(this.map.playerPosX+" "+this.map.playerPosY);
		
		this.movePlayerTo(this.map.playerPosX,this.map.playerPosY);
		
		//this.zoom(-40);
	},
	
	showMapView : function(pMap){
		//construct the MVC binding
		unMapController = new MapController();
		uneMapView = new MapPanel(unMapController);
		unMapController.addModel(uneMap);
		unMapController.addView(uneMapView);
		//show the view
		uneMapView.setVisible(true);
		//display initial properties on view by firing the property actions
		uneMap.load();
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
	
	movePlayerTo : function(x,y){
		var pX = this.currentPlayer.getPosX();
		var pY = this.currentPlayer.getPosY();
		
		this._movePlayer(pX,pY,x,y,"");
	},
	
	movePlayer : function(x,y){
		var pX = this.currentPlayer.getPosX();
		var pY = this.currentPlayer.getPosY();
		var nX= (pX+x);
		var nY= (pY+y);
		
		var nCoords = ''+x+','+y;
		
		this._movePlayer(pX,pY,nX,nY,nCoords);
	},
	
	_movePlayer : function(pX,pY,nX,nY,nCoords){
		
		if(!this.map.movePlayer(this.currentPlayer,nX,nY)){
		
			var otherCases = [];
			for(v=-1;v<=1;v++){
				for(w=-1;w<=1;w++){
					coords = ''+v+','+w;
					if(coords != nCoords){
						otherCases.push(coords);
					}
				}
			}
			
			//try to move the player to surrounded cases
			var dead = true;
			for(var k=0;k<otherCases.length;k++){
				coords = otherCases[k].split(',');
				nX = parseInt(coords[0]);
				nY = parseInt(coords[1]);
				
				if(this.map.tryMovePlayer(this.currentPlayer,(pX+nX),(pY+nY))){
					dead = false;
					break;
				}
			}
			
			if(dead){
				alert('Game Over!');
			}
		}
	},
	
	zoom : function(pInc){
		var mapPanel= this.ihmArea.getMapPanel();
		mapPanel.zoom(pInc);
	},
	
	switchEquipmentToHand : function(pObject){
		if(this.currentPlayer.getCurrentHand().addObject(pObject)){
			this.currentPlayer.getBackpack().removeObject(pObject);
			this.currentPlayer.checkAttitude();
		}
	},
	
	switchHandToEquipment : function(pObject){
		if(this.currentPlayer.getBackpack().addObject(pObject)){
			this.currentPlayer.getCurrentHand().removeObject(pObject);
			this.currentPlayer.checkAttitude();
		}
	},
	
	propertyChange : function(evt){
		var mapPanel= this.ihmArea.getMapPanel();
		var equipPanel= this.ihmArea.getPlayerPanel().getEquipmentPanel();
		
		switch(evt.getPropertyName()){
			case 'mapLoaded':
				var map=evt.getSource();
				mapPanel.redrawMap(map);
				var gTable=mapPanel.getMapTable();
				this.map.cases.each(function(p){
					var mCase=p.value;
					var k=p.key.split('.');
					var x = parseInt(k[0]);
					var y = parseInt(k[1]);
					var gCase=gTable.getCase(y,x);
					
					//on associe la case model � la case graphique
					if(gCase!=null){
						mCase.getPropertyChangeSupport().addListener(gCase);
					}
				},this);
				
				map.objects.each(function(p){
					var mObject=p.value;
					mObject.getPropertyChangeSupport().addListener(equipPanel);
				},this);
				
				map.movePlayer(this.currentPlayer,map.getPlayerPosX(),map.getPlayerPosY());
				map.revealAllCases();
				/* mise � l'�chelle de la carte */
				mapPanel.resizeCaseTo(GameConfig.getCaseWidth(),GameConfig.getCaseHeight());
			break;
		}		
	},
 
});