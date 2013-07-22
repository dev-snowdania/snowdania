JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'Equipment',
{
	initialize: function()
	{
		this.shortcut=null;
		this.label=null;
		this.description=null;
		this.unit=0;
		this.logMessage='vous avez trouvé un objet';
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function()
	{
		return this.pcs;
	},
	
	getShortcut: function()
	{
		return this.shortcut;
	},
	
	getLabel : function()
	{
		return this.label;
	},
	
	getDescription : function()
	{
		return this.description;
	},
	
	getUnit : function()
	{
		return this.unit;
	},
	
	useUnit : function()
	{
		if(this.unit>0) {
			var oldUnit=this.unit;
			this.unit--;
			this.pcs.firePropertyChange('unit',oldUnit,this.unit);
		}
	},
	
	getLogMessage : function()
	{
		return this.logMessage;
	}
});