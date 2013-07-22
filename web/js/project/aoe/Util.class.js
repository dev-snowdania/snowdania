function Util_getUrlParameter(pname)
{
    var nom=new Array();
    var valeur=new Array();

    // On enlève le ?
    param = window.location.search.slice(1,window.location.search.length);

    // On sépare le paramètres....
    // first[0] est de la forme param=valeur

    first = param.split("&");

    for(i=0;i<first.length;i++){
        second = first[i].split("=");
        nom[i] = second[0];
        valeur[i] = second[1];
        if(nom[i]==pname) return valeur[i];
    }
    return null;

}

function Util_throwDice100()
{
	return Math.floor(Math.random() * 100)+1;
}

function Util_importClass(className,func)
{
	var file = _Util_getClassFileName(JS_CLASS_PATH+className);
	_Util_importClass(file,func);
}

function _Util_getClassFileName(className)
{
	return className.replace(".","/").replace(".","/")+ ".class.js";
}

function _Util_importClass(file,func)
{
	
	//jQuery.getScript(file);
	if(LOADED_CLASSES.indexOf(file)==-1)
	{
		var jScript = $("<script></script>");
		jScript.attr('type','text/javascript');
		jScript.attr('src',file);
		$('HEAD').append(jScript);
		LOADED_CLASSES.push(file);
	}		
}

var LOADED_CLASSES = new Array();

function Util_getClassName(obj) 
{
	if (typeof obj != "object" || obj === null) return false;
	return /(\w+)\(/.exec(obj.constructor.toString())[1];
}

function Util_isObjectsEquals(a, b) {
	var prop, otype, isOK = true;
	for (prop in a) {
		if (a.hasOwnProperty(prop)) {
			otype = Object.prototype.toString.call(a[prop]).match(/^\[object\s(.*)\]$/)[1];
			isOK  = (!/^(String|Number|Window)$/.test(otype)) ? arguments.callee(a[prop], b[prop]) : (a[prop] === b[prop]);
			if (isOK !== true) {
				break;
			}
		}
	}
	return isOK;
};

String.prototype.trim = function()
{
	return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
} 






