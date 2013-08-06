JClass.import('jsx.jGraphic.JField');

_class= JClass.create( 'JSelectField', jsx.JField,
{
	initialize: function($super,value,options,id,className)
	{
		$super(value,id,className);
		this.tmpl="<select></select>";
		this.options=options;
		this.indexes=[];
	},
	
	addOption: function(val,txt){
		this.options[val.toString()]=txt;
		this.indexes.push({'value':val,'text':txt});
		
		if(this.jObject){
			this.jObject.append("<option value='"+val+"'>"+txt+"</option>");
		}
	},
	
	hasOption: function(val){
		if(this.options[val.toString()]){
			return true;
		}else{
			return false;
		}
	},
	
	removeOption: function(val){
		var elem = this.options[val.toString()];
		this.indexes.splice(this.indexes.indexOf(elem), 1);
		delete this.options[val.toString()];
		
		if(this.jObject){
			this.jObject.find("option[value="+val+"]").remove();
		}
	},
	
	drawCustom: function($super){
		//this.jObject.attr('readonly',this.readOnly);
		/*for(var k in this.options){
			if (this.options.hasOwnProperty(k)) {
				this.jObject.append("<option value='"+k+"'>"+this.options[k]+"</option>");
			}
		}*/
		
		for(var i=0; i<this.indexes.length;i++){
			this.jObject.append("<option value='"+this.indexes[i].value+"'>"+this.indexes[i].text+"</option>");
		}
		
		$super();
		
		//console.log($super);
	}
});