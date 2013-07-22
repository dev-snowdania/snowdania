JClass.import('jsx.jGraphic.JComponent');
JClass.import('jsx.jGraphic.table.JTableCell');
JClass.import('jsx.jGraphic.table.JTableRow');

_class= JClass.create( 'JTable', jsx.JComponent,
{
	initialize : function($super,id,className)
	{
		if(className != undefined){
			className += ',tbl';
		}else{
			className = 'tbl';
		}
		$super(id,className);
		this.tmpl="<div></div>";
		this.dataModel=null;
		this.rows=[];
		this.cells=new Hash();
	},
	
	setDataModel : function(dm)
	{
		this.dataModel=dm;
	},
	
	getDataModel : function()
	{
		return this.dataModel;
	},
	
	reset: function()
	{
		this.rows=[];
		this.cells=new Hash();
	},
	
	draw : function($super)
	{
		if(this.dataModel!=null)
		{
			this.clean();var row, cell;
			this.dataModel.each(function(r,i)
			{
				if(this.rows[i]) row = this.rows[i];
				else row = new jsx.JTableRow();
				r.each(function(c,j)
				{
					cell=this.getCell(i,j);
					if(cell==undefined) {cell = new jsx.JTableCell();}
					cell.setValue(c);
					row.addComponent(cell);
				},this);
				this.addComponent(row);
			},this);
			$super();
		}
	},
	
	setRow : function(i,r)
	{
		this.rows[i]=r;
	},
	
	setCell : function(i, j, c)
	{
		this.cells.set((i+"."+j),c);
	},
	
	getCell : function(i, j)
	{
		return this.cells.get(i+"."+j);
	},
	
	createCell:function(i,j)
	{
		this.setCell(i, j, new jsx.JTableCell());
		return this.getCell(i,j);
	}
});