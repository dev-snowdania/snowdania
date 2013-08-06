JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.table.JTable');

JClass.import('aoe.view.MapTablePanel');
JClass.import('aoe.model.GameConfig');

_class=JClass.create("MapPanel",jsx.JPanel,
{
	initialize:function($super,pCtrl)
	{
		$super("gMap","gPanel");
		this.zoomInc=0;
		this.caseWidth=GameConfig.getCaseWidth();
		this.caseHeight=GameConfig.getCaseHeight();
		
		this.controller=pCtrl;
		
		this.initMap();
	},
	
	getMapTable : function()
	{
		return this.gTable;
	},
	
	redrawMap : function(map){
		this.clean();
		this.initMap(map);
		this.draw();
	},
	
	initMap : function(map){
		this.gTable = new aoe.MapTablePanel();
		
		this.numCols=0;
		this.numRows=0;
		
		if(map!=null){
			
			this.gTable.setCss('background-image','url('+map.getBackground()+')');
			this.gTable.setCss('opacity','0.7');
			
			var i,j,gCase;
			this.numCols=map.getNumCols();
			this.numRows=map.getNumRows();			
			var data=[];
			for(i=0;i<map.getNumRows();i++){
				data[i]=[];
				for(j=0;j<map.getNumCols();j++){
					var mCase=map.getCase(j,i);
					if(mCase){
						gCase=this.gTable.createCell(i,j);
						var idCase=this.getGCaseId(j,i);
						gCase.setId(idCase);
						gCase.setClassName(mCase.getClassName());
						gCase.setMapPanel(this);
						gCase.addEventListener('mouseenter',function(e){
							console.log("x= "+this.x+" y="+this.y);
						});
						//gCase.addEventListener('mouseleave');
						gCase.setInfoBulle(j+','+i);
					}
					data[i][j]="";
				}
			}
			this.gTable.setDataModel(data);			
		}
		this.addComponent(this.gTable);
	},
	
	getGCase : function(x,y){
		return this.gTable.getCell(y,x);
	},
	
	getGCaseId : function(x,y){
		return "C"+x+"_"+y;
	},
	
	getGridClassName : function(){
		return "bg_gr";
	},
	
	scrollToTarget : function(x,y){
		try{
			//this.mapPanel.getJQuery().scrollTo(  {left:(x*5)+'px',top:(y*5)+'px'}, 100 );
			var scrollX=x-Math.ceil(Math.ceil(this.getJQuery().width()/this.caseWidth)/2);
			if(scrollX<0) scrollX=0;
			var scrollY =y-Math.ceil(Math.ceil(this.getJQuery().height()/this.caseHeight)/2);
			if(scrollY<0) scrollY=0;
			var scrollCase= this.getGCase(scrollX,scrollY);
			if(scrollCase!=null)
				this.getJQuery().scrollTo(scrollCase.getJQuery(), 100);
		} catch(e){;}
	},
	
	resizeCaseTo : function(pWidth,pHeight){
		this.caseWidth=pWidth;
		this.caseHeight=pHeight;
		jQuery('#'+this.getId()+' .tbl-row DIV').width(pWidth);
		jQuery('#'+this.getId()+' .tbl-row DIV').height(pHeight);
		
		var mapCase = jQuery('#'+this.getId()+' .tbl-row DIV:eq(0)');
		var leftBorderWidth = parseInt(mapCase.css('border-left-width').replace('px',''));
		var rightBorderWidth = parseInt(mapCase.css('border-right-width').replace('px',''));
		
		var realWidth = (mapCase.width()) + leftBorderWidth + rightBorderWidth;
		
		jQuery('#'+this.getId()+' .tbl').width((realWidth*(this.numCols)));
	},
	
	zoom: function(pInc){
		this.zoomInc+=pInc;
		caseWidth=GameConfig.getCaseWidth()+(GameConfig.getCaseWidth()*this.zoomInc/100);
		if(caseWidth<1) caseWidth=1;
		caseHeight=GameConfig.getCaseHeight()+(GameConfig.getCaseHeight()*this.zoomInc/100);
		if(caseHeight<1) caseHeight=1;
		this.resizeCaseTo(caseWidth,caseHeight);
	},
	
	displayGrid : function(){
		jQuery('#'+this.getId()).addClass('grid');
	},
	
	hideGrid : function(){
		jQuery('#'+this.getId()).removeClass('grid');
	}
});