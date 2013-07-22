
/*
 * top class 
 * permet d'attribuer des attributs et méthodes à tous les objets du framework
 */
function __MVC()
{
	this.uuid=null;
	this.jsClassName=new Array('__MVC');
		
	this.setUUID = function(uuid)
	{
		this.uuid=uuid;
	}
	
	this.getUUID = function()
	{
		return this.uuid;
	}
	
	this.compareTo = function(obj)
	{
		if(this.obj.getUUID()==this.uuid) return true;
		else return false
	}
	
	this.addJsClassName = function(callee)
	{
		callee=callee.toString();
		var calleeName=callee.substring(callee.indexOf('function')+'function'.length,callee.indexOf('(')).trim();
		this.jsClassName.push(calleeName);
	}
	
	this.getJsClassName = function()
	{
		return this.jsClassName.reverse()[0];
	}
	
	this.isInstanceOf = function(jsClassName)
	{
		var jsClassNames=this.jsClassName.reverse();
		for(var i=0;i<jsClassNames.length;i++)
			if(jsClassNames[i]==jsClassName) return true;
		return false;
	}
}