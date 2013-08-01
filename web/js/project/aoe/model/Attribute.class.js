
_class= JClass.create( 'Attribute',
{
	initialize: function(pValue,pMaxValue){
		this.value = pValue;
		if(pMaxValue){
			this.maxValue = pMaxValue;
		}else{
			this.maxValue = pValue;
		}
	},
	
	set:function(pValue){
		if(pValue>this.maxValue){
			this.value = this.maxValue;
		}else{
			this.value = pValue;
		}
	},
	
	get:function(){
		return this.value;
	},
	
	getMax:function(){
		return this.maxValue;
	},
	
	getRatio:function(){
		return (this.value/this.maxValue);
	},
	
	remove:function(pValue,pUnit){
		if(pUnit && pUnit=='%'){
			this.set(this.value - Math.ceil((this.value*pValue)/100)); 
		}else{
			this.set(this.value - pValue);
		}
	},
});