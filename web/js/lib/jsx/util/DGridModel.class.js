
_class= JClass.create( 'DGridModel', Enumerable, 
{
	initialize : function(rows,cols,val)
	{
		for(var i=0;i<rows;i++){
			this[i]=[];
			for(var j=0;j<cols;j++){
				this[i][j]=val;
			}
		}
	},
	
	_each : function(iterator)
	{
		;
	}
});