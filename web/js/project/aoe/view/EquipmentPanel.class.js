JClass.import('jsx.jGraphic.JDropPanel');
JClass.import('jsx.jGraphic.JButton');
JClass.import('jsx.jGraphic.table.JTable');


_class= JClass.create( 'EquipmentPanel', jsx.JDropPanel,
{
	initialize: function($super,pCtrl,maxObjects,numCols,id,className){
		$super(id,className);
		
		this.gTable = new jsx.JTable(null,"gEquipmentTable");
		
		this.maxObjects=maxObjects;
		this.numCols=numCols;
		numRows=Math.ceil((this.maxObjects/this.numCols));

		this.dGridModel = [];
		for(var i=0;i<numRows;i++){
			this.dGridModel[i]=[];
			for(var j=0;j<this.numCols;j++)
				this.dGridModel[i][j]='';
		}
		
		this.controller=pCtrl;
		this.selectedOid=null;
		this.model=[];
		this.modelIndex=new Hash();
	},
	
	addObject : function(pObject){
		if((this.model.length)<=this.maxObjects){
			this.model.push(pObject);
			this.updateContent();
		}
	},
	
	removeObject : function(pObject){
		this.model.splice(this.model.indexOf(pObject), 1);
		this.updateContent();
	},
	
	updateContent : function(){
		this.modelIndex=new Hash();
		this.gTable.reset();
		
		var index=1;
		this.model.each(function(pObject){
			//this.numObjects++;
			var gBtn = new jsx.JButton(pObject.getShortcut());
			gBtn.setInfoBulle(pObject.getLabel()+" ("+pObject.getUnit()+")");
			gBtn.propertyChange = function(evt){
				switch(evt.getPropertyName()){
					case 'unit':
						var mObject=evt.getSource();
						this.setInfoBulle(mObject.getLabel()+" ("+evt.getNewValue()+")");
					break;
				}
			};
			gBtn.addEventListener("click",function(e,ctx){
				ctx.selectedOid=this.getOid();
				// TODO: à revoir
				if(ctx.id=='gEquipmentPanel'){
					ctx.controller.switchEquipmentToHand(ctx.getSelectedObject());
				} else{
					ctx.controller.switchHandToEquipment(ctx.getSelectedObject());
				}
			},this);
			pObject.getPropertyChangeSupport().addListener(gBtn);
			
			this.modelIndex.set(gBtn.getOid(),pObject);
			
			var iRow= Math.ceil((index/this.numCols))-1;
			var iCol=this.numCols-(((iRow+1)*this.numCols)-index)-1;
			var gCase=this.gTable.createCell(iRow,iCol);
			gCase.addComponent(gBtn);	
			index++;
		},this);
		
		this.gTable.draw();
	},
	
	getSelectedObject : function(){
		if(this.selectedOid!=null){
			return this.modelIndex.get(this.selectedOid);
		} else{
			return null;
		}
	},
	
	setMaxObject : function(max){
		this.maxObjects=max;
	},
	
	draw : function($super){
		this.gTable.setDataModel(this.dGridModel);
		this.addContentComponent(this.gTable);

		$super();
	}
});