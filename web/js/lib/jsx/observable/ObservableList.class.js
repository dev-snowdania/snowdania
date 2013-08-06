JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'ObservableList',
{
	initialize: function(){
		this.elements = [];
		this.searchIndexes = {};
		this.index = -1;		
		this.addEventKey = 'addElement';
		this.removeEventKey = 'removeElement';
		
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function(){
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
	
	add : function(pElement,pKey){
		this.elements.push(pElement);
		if(pKey){
			this.searchIndexes[pKey] = pElement;
		}
		this.pcs.firePropertyChange(this.addEventKey,null,pElement);
		
		return true;
	},
	
	remove : function(pElement,pKey){
		this.elements.splice(this.elements.indexOf(pElement), 1);
		if(pKey){
			this.searchIndexes[pKey] = null;
		}
		this.pcs.firePropertyChange(this.removeEventKey,null,pElement);
		
		return true;
	},
	
	get: function(pKey){
		if(typeof pKey == 'string'){
			if(this.searchIndexes[pKey]){
				return this.searchIndexes[pKey];
			}else{
				return null;
			}
		}else{
			if(this.elements[i]){
				return this.elements[i];
			}else{
				return null;
			}
		}
	},
	
	has: function(pKey){
		if(this.searchIndexes[pKey]){
			return this.searchIndexes[pKey];
		}else{
			return false;
		}
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
		return this;
	},
	
	getByJsClassName : function(pElemClsName)
	{
		var newElem=[];
		//console.log(typeof pElemClsName);
		if(typeof pElemClsName != 'object'){
			pElemClsName = [pElemClsName];
		}
		this.elements.each(function(el,i)
		{
			if(pElemClsName.intersect([el.getJsClassName()]).length>0) {
				newElem.push(el);
			}
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
	},
	
	fireInitialProperties : function(){
		this.reset();
		var el;
		while(el=this.next()){
			this.pcs.firePropertyChange(this.addEventKey,null,el);
		}
	},
	
	each: function(pCallBackFunc,pContext){
		var elem = this.next();
		
		if(elem){
			var r = pCallBackFunc(elem,this,pContext);
			
			if(typeof r =="boolean" && !r){
				return;
			}else{
				return this.each(pCallBackFunc,pContext);
			}
		}
		
		return this;
	}
});