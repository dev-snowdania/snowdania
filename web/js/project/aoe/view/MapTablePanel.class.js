JClass.import('aoe.view.MapCasePanel');
JClass.import('jsx.jGraphic.table.JTable');

_class=JClass.create("MapTablePanel",jsx.JTable,
{
	createCell:function(i,j)
	{
		this.setCell(i, j, new aoe.MapCasePanel(i,j));
		return this.getCell(i,j);
	},
	
	getCase:function(x,y)
	{
		return this.getCell(x,y);
	}
});