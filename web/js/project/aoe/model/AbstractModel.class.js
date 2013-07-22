JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'AbstractModel',
{
	initialize: function($super){
		$super();
		this.pcs = new jsx.PropertyChangeSupport(this);
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	addListener:function(pListener){
		return this.pcs.addListener(pListener);
	},
});