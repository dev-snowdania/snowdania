JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'LogStatus',
{
	initialize: function()
	{
		this.messages=[];
		
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function()
	{
		return this.pcs;
	},
	
	addMessage : function(msg)
	{
		this.messages.push(msg);
		this.pcs.firePropertyChange('logStatusAdded',null,msg);
	},
	
	getLastMessage : function()
	{
		return this.messages.last();
	}
});