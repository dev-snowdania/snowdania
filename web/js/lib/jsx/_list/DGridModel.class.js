function DGridModel(rows,cols,val)
{
	this.data=new Array();
	
	for(var i=0;i<rows;i++){
		this.data[i]=new Array();
		for(var j=0;j<cols;j++){
			this.data[i][j]=val;
		}
	}
	
	this.set = function(i,j,val)
	{
		if(this.data[i]==null)
		{
			this.data[i]=new Array();
		}
		this.data[i][j]=val;
	}
	
	this.add = function(i,val)
	{
		if(this.data[i]==null)
		{
			this.data[i]=new Array();
		}
		this.data[i].push(val);
	}
	
	this.get = function(i,j)
	{
		if(this.data[i])
		{
			if(this.data[i][j]) return this.data[i][j];
			else return null;
		}
		else return null;
	}
	
	this.getLine = function(i)
	{
		if(this.data[i])
		{
			return this.data[i];
		}
		else return null;
	}
	
	this.getLength = function(i)
	{
		if(i!=null)
		{
			if(this.data[i]) return this.data[i].length;
			else return null;
		}
		else return this.data.length;
	}
}