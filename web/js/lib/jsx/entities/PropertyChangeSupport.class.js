JClass.import('jsx.util.Util');
JClass.import('jsx.entities.PropertyChangeEvent');

/*
 * permet d'attribuer des attributs et méthodes à tous les objets du model
 */

_class=JClass.create("PropertyChangeSupport",{
	
	initialize : function(source)
	{
		this.listeners=[];
		this.source=source;
		this.observable=true;
	},

	addListener : function(listener)
	{
		if (!(typeof listener.propertyChange == 'function')) return false;
		var flag=true;
		this.listeners.each(function(l){
			if(l.compareTo(listener)) {flag=false;throw $break;}
		},this);
		if(flag) this.listeners.push(listener);
		return flag;
	},
	
	removeListener : function(listener)
	{
		var newListeners = [];
		this.listeners.each(function(l){
			if(!l.compareTo(listener)) newListeners.push(listener);
		});
		
		this.listeners=newListeners;
	},
	
	hasListeners : function()
	{
		return (this.listeners.length>0);
	},
	
	firePropertyChange : function(propName,oldValue,newValue,contextValues)
	{
		if(this.observable)
		{
			var evt = new jsx.PropertyChangeEvent(this.source,propName,oldValue,newValue,contextValues);
			this.listeners.each(function(l){
				l.propertyChange(evt);
			},this);
		}
	},
	
	setObservable : function(bool)
	{
		this.observable=bool;
	},
	
	isObservable : function()
	{
		return this.observable;
	}
	
});