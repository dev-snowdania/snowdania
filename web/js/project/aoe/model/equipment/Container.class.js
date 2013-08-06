JClass.import('aoe.model.equipment.Equipment');

_class= JClass.create( 'Container', aoe.Equipment,
{
	initialize: function($super,pType,pQuality,pBulk,pStorage,pLogJsClassName){
		
		$super(pType,pQuality,pBulk,pLogJsClassName);
		this.storage = new aoe.Attribute(0,pStorage);
	},
	
	setStorage : function(pStorage){
		
		if(pStorage> this.storage.getMax()){
			return false;
		}
		
		if(pStorage != this.storage.get()){
			var oldValue = this.storage.get();
			this.storage.set(pStorage);
			this.pcs.firePropertyChange('storage',oldValue,this.storage.get());
		}
		
		return true;
	},
	
	checkObject: function(pObject){
		
		var storage = (this.storage.get() + pObject.getBulk());
		
		if(storage> this.storage.getMax()){
			return false;
		}else{
			return true;
		}
	},
	
	addObject: function(pObject){
		if(this.setStorage(this.storage.get() + pObject.getBulk())){
			console.log("add object %po to %co".gsub("%po",pObject.getJsClassName()).gsub("%co",this.getJsClassName()));
			return true;
		}else{
			console.log("not enough space in %co to store %po".gsub("%co",this.getJsClassName()).gsub("%po",pObject.getJsClassName()));
			return false;
		}
	},
	
	removeObject: function(pObject){
		if(this.setStorage(this.storage.get() - pObject.getBulk())){
			console.log("remove object %po from %co".gsub("%po",pObject.getJsClassName()).gsub("%co",this.getJsClassName()));
			return true;
		}else{
			return false;
		}
	}
});