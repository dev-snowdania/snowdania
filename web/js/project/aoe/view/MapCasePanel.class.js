JClass.import('jsx.jGraphic.JPanel');
JClass.import('jsx.jGraphic.table.JTableCell');

_class=JClass.create("MapCasePanel",jsx.JTableCell,
{
	initialize : function($super,x,y)
	{
		$super();
		this.jp=new jsx.JPanel();
		// le map panel parent
		this.mapPanel=null;
		this.x=y;
		this.y=x;
	},
	
	draw : function($super)
	{
		//this.addComponent(this.jp);
		this.setValue("&nbsp;");
		$super();
	},
	
	setMapPanel:function(obj)
	{
		this.mapPanel=obj;
	},
	
	/*setValue:function(val)
	{
		this.jp.setValue(val);
	},*/
	
	propertyChange: function(evt)
	{
		switch(evt.getPropertyName())
		{
			case 'revealed':
				var mCase=evt.getSource();
				
				if(evt.getNewValue()==true){
					if(mCase.hasObject()){
						this.setValue('?');
					}
					this.setClassName(mCase.getClassName());
				}
			break;
			case 'currentPlayer':
				var mPlayer=evt.getNewValue();
				var mCase=evt.getSource();
				
				if(mPlayer==null){
					// player leave case
					if(mCase.hasObject()){
						this.setValue('?');
					}else{
						this.setValue("&nbsp;");
					}
				} else{
					// player enter case
					//this.setValue('J');
					this.setValue('&nbsp;');
					this.jObject.addClass('current-player');
					
					var x=mPlayer.getPosX('x');
					var y=mPlayer.getPosY('y');
					this.mapPanel.scrollToTarget(x,y);
				}
			break;
		}
	},
	
	mouseenter : function(e){
		//MVC.getCacheInstance().getObject('uneGameLog').addMessage(this.x+","+this.y);
		//this.getJQuery().css('background','#000');
		this.getJQuery().addClass('tbl-cell-hover');
	},
	
	mouseleave : function(e){
		this.getJQuery().removeClass('tbl-cell-hover');
	}
})