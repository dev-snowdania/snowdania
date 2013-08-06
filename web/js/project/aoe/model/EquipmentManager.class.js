JClass.import('jsx.observable.ObservableList');

_class= JClass.create( 'EquipmentManager', jsx.ObservableList,
{
	initialize: function($super,pContainer){
		$super();
		
		this.container = pContainer;
	},
	
	setContainer: function(pContainer){
		this.container = pContainer;
	},
	
	checkObject: function(pObject){
		if(this.container){
			return this.container.checkObject(pObject);
		}else{
			
			// current hand
			this.reset();
			var eqp;
			var count = 0;
			while(eqp= this.next()){
				if(eqp.getType()==aoe.Equipment.TWO_HANDS){
					count = 2;
				}else{
					count++;
				}
			}
			
			if(count<2){
				return true;
			}else{
				return false;
			}
		}
	},
	
	addObject: function(pObject){
		if(this.container){
			if(this.container.addObject(pObject)){
				return this.add(pObject,pObject.getOid());
			}
		}else{
			
			// current hand
			this.reset();
			var eqp;
			var count = 0;
			while(eqp= this.next()){
				if(eqp.getType()==aoe.Equipment.TWO_HANDS){
					count = 2;
				}else{
					count++;
				}
			}
			
			if(count<2){
				this.add(pObject,pObject.getOid());
				console.log("your grab %po in your hands".gsub("%po",pObject.getJsClassName()));
				return true
			}else{
				console.log("not enough space in your hands to store %po".gsub("%co",this.getJsClassName()).gsub("%po",pObject.getJsClassName()));
				return false;
			}
		}
	},
	
	removeObject: function(pObject){
		if(this.container){
			if(this.container.removeObject(pObject)){
				return this.remove(pObject,pObject.getOid());
			}
		}else{
			return this.remove(pObject,pObject.getOid());
		}
	}
});