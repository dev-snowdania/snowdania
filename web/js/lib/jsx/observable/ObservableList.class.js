JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'ObservableList',
{
	initialize: function()
	{
		this.elements=[];
		this.index = -1;		
		this.addEventKey='addElement';
		this.removeEventKey='removeElement';
		
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function()
	{
		return this.pcs;
	},
	
	setEventKeys:function(pKey1,pKey2){
		this.addEventKey=pKey1;
		this.removeEventKey=pKey2;
	},
	
	isEmpty:function(){
		return (this.elements.length>0);
	},
	
	size:function(){
		return (this.elements.length);
	},
	
	add : function(pElement){
		this.elements.push(pElement);
		this.pcs.firePropertyChange(this.addEventKey,null,pElement);
	},
	
	remove : function(pElement){
		this.elements.splice(this.elements.indexOf(pElement), 1);
		this.pcs.firePropertyChange(this.removeEventKey,null,pElement);
	},
	
	get: function(i){
		return this.elements[i];
	},
	
	next: function(){
		this.index++;
		if(this.index>(this.elements.length-1)){
			return null;
		}else{
			return this.elements[this.index];
		}
	},
	
	reset: function(i){
		this.index = -1;
	},
	
	getByJsClassName : function(pElemClsName)
	{
		var newElem=[];
		this.elements.each(function(el,i)
		{
			if(el.getJsClassName()==pElemClsName) newElem.push(el);
		},this);
		return newElem;
	},
	
	addListener : function(pListener){
		this.pcs.addListener(pListener);
	},
	
	removeListener : function(pListener){
		this.pcs.removeListener(pListener);
	},
	
	hasListener : function(){
		return this.pcs.hasListeners();
	}
});