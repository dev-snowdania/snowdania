JClass.import('jsx.util.JCache');

MVC = {
	cacheInstance:null,
	
	doAction: function(cls,mthd,p) {
		try{
			var r;
			var oClsCtrl=this.getCacheInstance().getObjectByClass(cls);
			
			if(oClsCtrl.size()==0)
			{
				oClsCtrl = JClass.import(cls);
				oCtrl = new oClsCtrl();
				this.getCacheInstance().setObject(oCtrl,oCtrl.getJsClass());
			}
			else oCtrl=oClsCtrl.get(cls);
			
			return JClass.callMethod(oCtrl,mthd,p);
		}
		catch(e) {throw "Error: JSX.doAction: "+e;}
	},
	
	getCacheInstance : function()
	{
		if(this.cacheInstance==null) this.cacheInstance=new jsx.JCache();
		return this.cacheInstance;
	},
};