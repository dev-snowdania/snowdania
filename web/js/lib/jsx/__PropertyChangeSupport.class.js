var __OBSERVERS_LIST=new Array();
var __LISTENERS_LIST=new Array();

function __PropertyChangeSupport_setObserverOn(objectModel)
{
	// rajoute l'objectModel s'il n'est pas présent
	var flag=true;
	for(var i=0;i<__OBSERVERS_LIST.length;i++)
	{
		if(Util_isObjectsEquals(__OBSERVERS_LIST[i],objectModel)) {
			flag=false;break;
		}
	}
	if(flag)
	{
		__OBSERVERS_LIST.push(objectModel);
	}
}

function __PropertyChangeSupport_setListenerOn(objectView)
{
	// rajoute l'objectView s'il n'est pas présent
	var flag=true;
	for(var i=0;i<__LISTENERS_LIST.length;i++)
	{
		if(Util_isObjectsEquals(__LISTENERS_LIST[i],objectView)) {
			flag=false;break;
		}
	}
	if(flag)
	{
		__LISTENERS_LIST.push(objectView);
	}
}

function __PropertyChangeSupport_firePropertyChange(objectModel,propertyName,values)
{
	var flag=false;
	for(var i=0;i<__OBSERVERS_LIST.length;i++)
	{
		if(Util_isObjectsEquals(__OBSERVERS_LIST[i],objectModel)) {
			//objectModel est bien observable
			flag=true;break;}
	}
	if(flag)
	{Ch
		// déclenche pour chaque listener la méthode propertyChanged
		var evt = new __PropertyChangeEvent(objectModel,propertyName,values);
		for(var i=0;i<__LISTENERS_LIST.length;i++)
		{
			if (typeof __LISTENERS_LIST[i].propertyChanged == 'function'))
				__LISTENERS_LIST[i].propertyChanged(evt);
		}
	}
}

function __PropertyChangeEvent(source,propertyName,values)
{
	this.source=source;
	this.propertyName=propertyName;
	this.values=values;
	
	this.getSource = function()
	{
		return this.source;
		
	}
	
	this.getPropertyName = function()
	{
		return this.source;
		
	}
	
	this.getValues = function()
	{
		return this.values;
		
	}
	
	this.getValue = function(index)
	{
		if(this.values[index])
			return this.values[index];
		
	}
}