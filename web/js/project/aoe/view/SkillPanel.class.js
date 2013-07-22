Util_importClass("lib.graphic.GDropPanel");
Util_importClass("lib.graphic.GButton");
Util_importClass("lib.graphic.GTable");
Util_importClass("lib.list.DGridModel");

SkillPanel.prototype = new GDropPanel; 
function SkillPanel(numRows,maxCols,id,className)
{
	this.super=GDropPanel;
	this.super(id,className);
	
	this.gTable = new GTable(null,"gSkillTable");
	this.numSkills=0;
	this.maxCols=maxCols;
	this.numRows=numRows;
	
	this.dGridModel = new DGridModel(this.numRows,this.maxCols);
	
	this.addSkill = function(label,desc,level)
	{
		this.numSkills++;
		gCase = new GTableCase();
		var gBtn = new GButton(label+" ("+level+")");
		gBtn.setInfoBulle(desc);
		gCase.addComponent(gBtn);
		//if(this.numSkills<=this.numRows)
		var indexRow= this.numSkills-1;
		var indexCol=0;
		this.gTable.setGTableCase(indexRow,indexCol,gCase);
		if(this.jObject!=null)
		{
			this.gTable.draw();
		}
	}
	
	this.removeSkill = function()
	{
		;
	}
	
	this.draw = function()
	{
		this.gTable.setDataModel(this.dGridModel);
		this.addComponent(this.gTable);

		EquipmentPanel.prototype.draw.call(this);
	}
}