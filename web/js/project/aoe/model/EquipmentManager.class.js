JClass.import('jsx.observable.ObservableList');

_class= JClass.create( 'EquipmentManager', jsx.ObservableList,
{
	initialize: function($super)
	{
		$super();
	},
	
	addEquipement: function(pEquipment){
		this.add(pEquipment);
	},
	
	removeEquipement: function(pEquipment){
		this.remove(pEquipment);
	}
});