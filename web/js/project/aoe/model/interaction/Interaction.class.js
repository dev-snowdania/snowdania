JClass.import('jsx.entities.PropertyChangeSupport');

JClass.import('aoe.view.InteractionWindow');

_class= JClass.create( 'Interaction',
{
	initialize: function()
	{
		this.pcs = new jsx.PropertyChangeSupport(this);
		this.logMsg='une interaction a lieu!';
	},
	
	getPropertyChangeSupport:function()
	{
		return this.pcs;
	},
	
	interact: function(player)
	{
		MVC.getCacheInstance().getObject('uneGameLog').addMessage(this.logMsg);
		
		var popup = new aoe.InteractionWindow(500,player,this);
		popup.draw();
		popup.show();
	}
	
});