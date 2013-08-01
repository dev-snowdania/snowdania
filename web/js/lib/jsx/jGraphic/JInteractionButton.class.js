JClass.import('jsx.jGraphic.JButton');

_class= JClass.create( 'JInteractionButton', jsx.JButton,
{
	initialize: function($super,tmplLabel,id,className){
		$super("",id,className);
	},
	
	propertyChange: function(evt){
		switch(evt.getPropertyName())
		{
			case 'unit':
				label = this.modelLabel + " ("+evt.getNewValue()+")";
				this.setJValue(label);
			break;
		}
	}
});