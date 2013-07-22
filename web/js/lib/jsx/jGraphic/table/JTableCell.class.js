JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JTableCell', jsx.jGraphic.JComponent,
{
	initialize : function($super,id,className)
	{
		if(className != undefined){
			className += ',tbl-cell';
		}else{
			className = 'tbl-cell';
		}
		$super(id,className);
		this.tmpl="<div></div>";
	}
});