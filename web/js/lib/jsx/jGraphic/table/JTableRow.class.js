JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JTableRow', jsx.jGraphic.JComponent,
{
	initialize : function($super,id,className)
	{
		if(className != undefined){
			className += ',tbl-row';
		}else{
			className = 'tbl-row';
		}
		$super(id,className);
		this.tmpl="<div></div>";
	}
});