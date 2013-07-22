JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JButton', jsx.JComponent,
{
	initialize: function($super,label,id,className)
	{
		$super(id,className);
		this.tmpl="<button></button>";
		this.setValue(label);
		this.toggleFunc=null;
	},
	
	setLabel : function(label)
	{
		this.setValue(label);
	},
	
	getLabel : function()
	{
		return this.getValue();
	},
	
	setToggleBehavior : function(funcs)
	{
		this.toggleFunc=funcs;
		if(this.jObject!=null)
		{
			if(this.toggleFunc.length==2)
				this.jObject.toggle(this.toggleFunc[0],this.toggleFunc[1]);
			if(this.toggleFunc.length==3)
				this.jObject.toggle(this.toggleFunc[0],this.toggleFunc[1],this.toggleFunc[2]);
		}
	},
	
	draw : function($super)
	{
		$super();
		if(this.toggleFunc) this.setToggleBehavior(this.toggleFunc);
	}
});