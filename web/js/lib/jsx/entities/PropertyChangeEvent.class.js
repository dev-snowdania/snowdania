
_class=JClass.create("PropertyChangeEvent",{
	
	initialize : function(model,propName,oldValue,newValue,contextValues)
	{
		this.source = model;
		this.propName=propName;
		this.oldValue=oldValue;
		this.newValue=newValue;
		this.contextValues=new Hash(contextValues);
	},
	
	getSource : function()
	{
		return this.source;
	},
	
	getPropertyName : function()
	{
		return this.propName;
	},
	
	getOldValue : function()
	{
		return this.oldValue;
	},
	
	getNewValue : function()
	{
		return this.newValue;
	},
	
	getContextValue : function(k)
	{
		return this.contextValues.get(k);
	}
});