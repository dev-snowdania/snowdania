
/*
 * permet de stocker des objets accessible statiquement
 */
_class = JClass.create('JCache',{
	
	initialize:function()
	{
		this.objs=new Hash();
	},
	
	getObject: function(k)
	{
		return this.objs.get(k);
	},
	
	getObjectByClassName: function(clsN)
	{
		var r=new Hash();
		this.objs.each(function(pair){
			if(typeof pair.value.getJsClassName == 'function') 
			{
				if(pair.value.getJsClassName()==clsN) r.set(pair.key,pair.value);
			}
		});
		return r;
	},
	
	getObjectByClass: function(cls)
	{
		var r=new Hash();
		this.objs.each(function(pair){
			if(typeof pair.value.getJsClassName == 'function') 
			{
				if(pair.value.getJsClass()==cls) r.set(pair.key,pair.value);
			}
		});
		return r;
	},
	
	setObject: function(obj,k)
	{
		this.objs.set(k,obj);
	}
});