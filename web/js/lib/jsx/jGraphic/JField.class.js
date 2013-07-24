JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JField', jsx.JComponent,
{
	initialize: function($super,value,id,className)
	{
		$super(id,className);
		this.value=value;
		this.readOnly = false;
	},
	
	setJValue : function(){
		if(this.jObject!=null){
			this.jObject.val(this.value);
		}
	},
	
	setReadOnly : function(bool){
		
		this.readOnly = bool;
		
		if(this.jObject!=null){
			this.jObject.attr('disabled',bool);
		}
	},
	
	drawCustom : function(){
		this.jObject.attr('disabled',this.readOnly);
	}
});