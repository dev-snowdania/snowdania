/*
 * permet d'attribuer des attributs et méthodes à tous les objets du model
 */

jsx.createClass("Cache",Hash,{
	
	initialize : function($super,o)
	{
		$super(o);
		this.propertyChangeSupport = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport : function()
	{
		return this.propertyChangeSupport;
	},
	
	firePropertyChange : function(propName,k,v)
	{
		this.propertyChangeSupport.firePropertyChange(propName,{key: k, value : v});
	},
	
	getObjectByClass : function(_class)
	{
		var result =[];
		this.each(function(v,k){
			if(typeof v.getJsClass == 'function') 
			{
				if(v.getJsClass()==_class) result.push(v);
			}
		});
		return result;
	},
	
	set : function($super,k,v)
	{
		$super(key,value);
		this.firePropertyChange("Cache.set",k,v)
	},
	
	unset : function($super,k)
	{
		v = $super(k);
		this.firePropertyChange("Cache.unset",k,v)
	}
});