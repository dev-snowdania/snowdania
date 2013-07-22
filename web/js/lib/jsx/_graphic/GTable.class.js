GTable.prototype = new GComponent; 
function GTable(id,className)
{
	this.super=GComponent;
	this.super(id,className);
	this.tmpl="<table></table>";
	this.dataModel=new DGridModel();
	this.gRows=new Array();
	this.gCases=new Array();
	
	this.setDataModel = function(dataModel)
	{
		this.dataModel=dataModel;
	}
	
	this.getDataModel = function()
	{
		return this.dataModel;
	}
	
	this.draw = function()
	{
		for(var i=0;i<this.dataModel.getLength();i++)
		{
			var gRow, gCase, data;
			if(this.gRows[i]) gRow = this.gRows[i];
			else gRow = new GTableRow();
			for(var j=0;j<this.dataModel.getLength(i);j++)
			{
				if(this.gCases[i+"."+j]) gCase = this.gCases[i+"."+j];
				else gCase = new GTableCase();
				data = this.dataModel.get(i,j);
				gCase.setValue(data);
				gRow.addComponent(gCase);
			}
			this.addComponent(gRow);
		}
		GTable.prototype.draw.call(this);
	}
	
	this.setGTableRow = function(i, gTableRow)
	{
		this.gRows[i]=gTableRow;
	}
	
	this.setGTableCase = function(i, j, gTableCase)
	{
		this.gCases[i+"."+j]=gTableCase;
	}
	
	this.getGTableCase = function(i, j)
	{
		return this.gCases[i+"."+j];
	}
}

GTableRow.prototype = new GComponent;
function GTableRow(id,className)
{
	this.super=GComponent;
	this.super(id,className);
	this.tmpl="<tr></tr>";
}

GTableCase.prototype = new GComponent;
function GTableCase(id,className)
{
	this.super=GComponent;
	this.super(id,className);
	this.tmpl="<td></td>";
}