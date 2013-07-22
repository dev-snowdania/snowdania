JClass.import('jsx.entities.PropertyChangeSupport');
JClass.import('jsx.util.Util');

var MAP_NUM_ROWS = "NR";
var MAP_NUM_COLS = "NC";

var MC_SHAPE_LINE = "LI";
var MC_SHAPE_RECTANGLE = "RE";
var MC_SHAPE_CIRCLE = "CI";

_class= JClass.create( 'Map',
{
	initialize: function($super)
	{
		this.numRows=0;
		this.numCols=0;
		this.cases=new Hash();
		
		this.objects=new Hash();
		
		this.dataMap=null;
		this.loaded=false;
		
		this.playerPosX=0;
		this.playerPosY=0;
		
		this.pcs =new jsx.PropertyChangeSupport(this);
		
		this.mapFile='map.js';
	},
	
	getPlayerPosX: function()
	{
		return this.playerPosX;
	},
	
	getPlayerPosY: function()
	{
		return this.playerPosY;
	},
	
	getPropertyChangeSupport:function()
	{
		return this.pcs;
	},

	load : function(lang)
	{
		this.loaded=(this.loadLang(lang)&&this.loadMap());
		return this.loaded;
	},
	
	includeFile : function(file)
	{
		var jScript = jQuery("<script></script>");
		jScript.attr('type','text/javascript');
		jScript.attr('src',file);
		jQuery('BODY').append(jScript);
	},
	
	loadLang : function(lang)
	{
		return aoe.mergeLangFile(this.getJsDir()+lang+'.js');
	},
	
	loadMap : function()
	{
		this.includeFile(this.getJsDir()+this.mapFile);
		var data = dataMap; 
		if(data!=undefined)
		{
			this.numRows=data.map.cases.rows;
			this.numCols=data.map.cases.cols;
			
			// initialisation
			for(var i=0;i<this.numRows;i++)
			{
				for(var j=0;j<this.numCols;j++)
				{
					var mCase=data.map.cases.defaultCase;
					if(this.checkModel(mCase))
					{
						this.createCaseFromModel(mCase,j,i);
					}
				}
			}
			
			for(var i=0;i<data.map.cases.mcase.length;i++)
			{
				var mCase=data.map.cases.mcase[i];
				if(this.checkModel(mCase))
				{
					if(mCase.shape)
					{
						switch(mCase.shape)
						{
							case MC_SHAPE_LINE:
								this.drawLineFromModel(mCase);
								break;
							case MC_SHAPE_RECTANGLE:
								break;
							case MC_SHAPE_CIRCLE:
								this.drawCircleFromModel(mCase);
								break;
						}
					}
					else
					{
						this.createCaseFromModel(mCase,mCase.x,mCase.y);
					}
				}
			}
			
			for(i=0;i<data.map.objects.mobject.length;i++)
			{
				var mObject=data.map.objects.mobject[i];
				
				try{
					var oCls = JClass.import(mObject.type);
				}
				catch(e){throw "Map.loadData: Error: impossible d'importer l'objet "+mObject.type+e;}
				
				var oObject = new oCls();
				
				var mCase=this.getCase(mObject.x,mObject.y);
				if(mCase!=null)
				{
					mCase.addObject(oObject);
				}
				this.addObject(oObject,mObject.x,mObject.y);
			}
			
			this.playerPosX=data.map.player.x;
			this.playerPosY=data.map.player.y;
			
			this.loaded=true;
			this.pcs.firePropertyChange('mapLoaded',null,null,{});
			return true;
		}
		else return false;
	},

	isLoaded:function()
	{
		return this.loaded;
	},
	
	checkModel : function(mCase)
	{
		if(mCase.x==MAP_NUM_ROWS) mCase.x=this.numRows-1;
		if(mCase.x==MAP_NUM_COLS) mCase.x=this.numCols-1;
		if(mCase.y==MAP_NUM_ROWS) mCase.y=this.numRows-1;
		if(mCase.y==MAP_NUM_COLS) mCase.y=this.numCols-1;
		
		if(mCase.x2 && mCase.y2)
		{
			if(mCase.x2==MAP_NUM_ROWS) mCase.x2=this.numRows-1;
			if(mCase.x2==MAP_NUM_COLS) mCase.x2=this.numCols-1;
			if(mCase.y2==MAP_NUM_ROWS) mCase.y2=this.numRows-1;
			if(mCase.y2==MAP_NUM_COLS) mCase.y2=this.numCols-1;
		}
		
		return true;
		
	},
	
	createCaseFromModel : function(mCase,x,y)
	{
		if(x>=this.numCols || x<0 || y>=this.numRows || y<0 ) return false
		
		try{
			JClass.import(mCase.type);
		}
		catch(e){throw "Map.createCaseFromModel: Error: impossible d'importer la case "+mCase.type+" "+e;}
					
		var oCls = JClass.get(mCase.type);
		
		var oCase = new oCls();
		this.cases.set(x+"."+y,oCase);
		return true;
	},
	
	drawLineFromModel : function(mCase) {
		var x1 = Math.round(mCase.x);
		var x2 = Math.round(mCase.x2);
		var y1 = Math.round(mCase.y);
		var y2 = Math.round(mCase.y2);
		//alert(mCase.value+":"+mCase.x+","+mCase.y+"<=>"+mCase.x2+","+mCase.y2);
		var y = x = 0;
		var signX = (x1 - x2) / Math.abs(x1 - x2) * -1;
		var signY = (y1 - y2) / Math.abs(y1 - y2) * -1;
		if (Math.abs((y2 - y1) / (x2 - x1)) <= 1) 
		{
			while (x <= Math.abs(x2 - x1)) {
				y = (y2 - y1) / Math.abs(x2 - x1) * x;
				this.createCaseFromModel(mCase,(signX * x + x1),(y + y1));
				x++;
			}
		} 
		else 
		{
			while (y <= Math.abs(y2 - y1)) 
			{
				x = (x2 - x1) / Math.abs(y2 - y1) * y;
				this.createCaseFromModel(mCase,(x + x1),(signY * y + y1));
				y++;
			}
		}
	},
	
	drawCircleFromModel : function(mCase) {
		var a = mCase.x;
		var b = mCase.y;
		var r = mCase.r;

		var y = 0;
		var x;
		for (x = 0; x <= Math.round(r / Math.sqrt(2)); x++) {
			y = Math.sqrt(Math.pow(r, 2) - (Math.pow(x, 2)));		
			mCase.x=(a - x);
			mCase.y=(y + b);
			mCase.x2=(2 * x)+(a - x)
			mCase.y2=(y + b);
			this.drawLineFromModel(mCase);
			mCase.x=(a - x);
			mCase.y=(b - y);
			mCase.x2=(2 * x)+(a - x);
			mCase.y2=(b - y);
			this.drawLineFromModel(mCase);
			mCase.x=(a - y);
			mCase.y=(b - x);
			mCase.x2=(2 * y)+(a - y);
			mCase.y2=(b - x);
			this.drawLineFromModel(mCase);
			mCase.x=(a - y);
			mCase.y=(x + b);
			mCase.x2=(2 * y)+(a - y);
			mCase.y2=(x + b);
			this.drawLineFromModel(mCase);
			
		}
	},
	
	getCase : function(x,y)
	{
		if(x>=this.numCols || x<0 || y>=this.numRows || y<0 ) return null;
		return this.cases.get(x+"."+y);
	},
	
	addObject : function(oObject,x,y)
	{
		this.objects.set((x+"."+y),oObject);
	},
	
	getObject : function(x,y)
	{
		var index=x+"."+y;
		return this.objects.get(index);
	},
	
	deleteObject : function(x,y)
	{
		var index=x+"."+y;
		if(this.indexObjects[index]) this.indexObjects[index]=null;
	},

	getNumRows : function()
	{
		return this.numRows;
	},

	getNumCols : function()
	{
		return this.numCols;
	},
	
	tryMovePlayer : function(player,x,y)
	{
		var mCase = this.getCase(x,y);
		if(mCase!=null){
			// ancienne case
			//var mCaseOld = this.getCase(player.getPosX(),player.getPosY());
			
			var r= mCase.tryMove(player);
			
			return r;
		}
	},
	
	movePlayer : function(player,x,y)
	{
		var mCase = this.getCase(x,y);
		if(mCase!=null){
			// ancienne case
			var mCaseOld = this.getCase(player.getPosX(),player.getPosY());
			
			var r= mCase.movePlayer(player,mCaseOld);
			
			if(r){		
				//this.ihmArea.propertyChanged("gCaseContent",null,"&nbsp;",this.posJx,this.posJy);
				//$("#"+this.getGCaseId(this.posJx,this.posJy)).html("&nbsp;");

				// nouvelle case
				//this.ihmArea.propertyChanged("gCaseContent",null,"J",x,y);
				//$("#"+this.getGCaseId(x,y)).html("J");
				
				/*if(mcaseOld.getType()!=MCASE_FORET && mCase.getType()==MCASE_FORET)
					this.updateGameStatus("Attention! les forêts peuvent abriter des bêtes dangereuses");
				
				this.posJx=x;
				this.posJy=y;
				
				// objet trouvé
				var oObject = map.getObject(x,y);
				if(oObject)
				{
					player.addEquipement(oObject);
					map.deleteObject(x,y);
					this.updateEquipmentList();
					this.updateGameStatus(oObject.getGameStatus());
				}*/
				
				player.setPosX(x);
				player.setPosY(y);
				
				//révele les cases alantours
				this.revealCaseAround(player,x,y);
			}
			
			return r;
		}
		
		return false;
	},
	
	revealCaseAround : function(player,x,y)
	{
		var indice=1;
		//if(player.getEquipmentByType(EQUI_LIGHT).length>0) indice=2;
		
		for(var i=1;i<=indice;i++)
		{
			this.revealCase((x-i),y);
			this.revealCase((x+i),y);
			this.revealCase(x,(y-i));
			this.revealCase(x,(y+i));
			this.revealCase((x-i),(y-i));
			this.revealCase((x+i),(y+i));
			this.revealCase((x+i),(y+i));
			this.revealCase((x-i),(y+i));
			this.revealCase((x+i),(y-i));
			
			this.revealCase((x+i),(y-(i-1)));
			this.revealCase((x+i),(y+(i-1)));
			this.revealCase((x-i),(y-(i-1)));
			this.revealCase((x-i),(y+(i-1)));
			this.revealCase((x-(i-1)),(y-i));
			this.revealCase((x-(i-1)),(y+i));
			this.revealCase((x+(i-1)),(y+i));
			this.revealCase((x-(i-1)),(y+i));
			this.revealCase((x+(i-1)),(y-i));
		}
	},
	
	revealCase : function(x,y)
	{
		var oCase=this.getCase(x,y);
		
		if(oCase!=null)
		{
			oCase.setRevealed(true);
		}
	},
	
	revealAllCases : function()
	{
		var x,y;
		for(x=0;x<this.getNumCols();x++)
		{
			for(y=0;y<this.getNumRows();y++)
			{
				this.revealCase(x,y);
			}
		}
	},
});