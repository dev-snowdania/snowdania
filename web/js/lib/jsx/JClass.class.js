
var JClass = {
	jsxPath: "",
	libPath: [],
	loadedClasses: [],
	_tmpCls:{},
		
	create: function(cls,prt,obj) {
		var o = this._tmpCls;
		var clss = cls.split('.');
		for(var i=0;i<clss.length;i++)
		{
			if(o[clss[i]]==undefined)
				o[clss[i]]={};
			o=o[clss[i]];
		}
		
		if(obj!=undefined) o = Class.create(prt,obj);
		else o = Class.create(prt);
		
		// on ajoute des proriétés et méthodes communes à tous les objets
		if(o.prototype.clss==undefined)
			o.prototype.clss=[];
		o.prototype.clss.push(cls);
		var clsN=clss.last();
		o.prototype.cls=cls;
		o.prototype.isInstanceOf = function(clsN){
			var jcn=this.clss.reverse();
			var flag=false;
			this.clss.each(function(v,k){
				if(v==clsN) {flag=true;throw $break;}
			});
			return flag;
		}
		o.prototype.getJsClass = function(){
			return this.cls;
		}
		o.prototype.getJsClassName = function(){
			return this.cls.substring(this.cls.lastIndexOf('.')+1,this.cls.length);
		}
		o.prototype.getJsPackage= function(){
			return this.cls.substring(0,this.cls.lastIndexOf('.'));
		}
		o.prototype.getJsDir = function(){
			var mo;
			try{
				mo = JClass.getModule(this.cls);
			}
			catch(e) {throw "Error: getJsDir: "+e;}
			var path=mo.classPath;
			
			return (path+(this.getJsPackage().replace(/\./gi,"/"))+'/');
			
		}
		//o.prototype.oid=++OBJECT_GLOBAL_COUNTER;
		o.prototype.getOid = function() {
			if(this.oid==null){
				this.oid=++OBJECT_GLOBAL_COUNTER;
			}
			return this.oid;
		}
		o.prototype.compareTo = function(obj) {
			return (this.getOid()==obj.getOid());
		}
		
		return o;
	},
	
	include: function(file)
	{
		var jScript = jQuery("<script></script>");
		jScript.attr('type','text/javascript');
		jScript.attr('src',file);
		jQuery('HEAD').append(jScript);
	},
	
	import: function(cls) {
		//jQuery.getScript(file);
		var mo;
		try{
			mo = this.getModule(cls);
		}
		catch(e) {throw "Error: JClass.import: "+e;}
		var path=mo.classPath;
		
		var file=path+(cls.replace(/\./gi,"/"))+ ".class.js";
		if(this.loadedClasses.indexOf(file)==-1)
		{
			//var _class;
			_class=null;
			this.include(file);
			//alert(file);
			if(_class=='undefined') throw("Error: JClass.import: l'importation de "+cls+" a échoué");
			else
			{
				if(_class instanceof Array)
				{
					/*for(var i=0;i<_class.length;i++)
					{
						var _cls=_class[i];
						if(typeof _cls=='function')
						{
							cls=cls.split('.');
							cls.pop();
							cls.push(_cls.prototype.getJsClassName());
							this._import(_cls,cls.join('.'),file);
						}
					}
					return _class;*/
				}
				else return this._import(_class,cls,file);
				
				
			}
		}
		else return null;//this.getClass(cls);
	},
	
	_import : function(_class,cls,file)
	{
		if(_class==-1) {return null;}
		if(typeof _class=='function')
		{
			// la classe est accessible via son nom complet (ex: module.chemin.de.classe) et son raccourci (ex: module.classe)
			try
			{
				var c = this.copy(_class,cls);
			}
			catch(e){throw "Error: JClass.import: "+e;}
			this.loadedClasses.push(file);
			return c;
		}
		else throw "Error: JClass.import: l'importation de "+cls+" a échoué";
	},
	
	copy: function(src,dst) {
		try
		{
			// on cherche la source
			var oSrc
			if( typeof src == 'string')
				oSrc = this.getJsClass(src);
			else oSrc=src;
		}
		catch(e){throw "Error: JClass.copy : la source "+src+" n'existe pas";}
		
		var o;
		try{
			o = this.getModule(dst);
		}
		catch(e) {throw "Error: JClass.copy: "+e;}
		
		// on crée la destination si inexistante
		try
		{	
			var clss = dst.split('.');
			
			// chemin raccourci
			o[clss.last()]=oSrc;
			
			//chemin complet
			for(var i=1;i<clss.length-1;i++)
			{
				if(o[clss[i]]==undefined)
					o[clss[i]]={};
				o=o[clss[i]];
			}
			o[clss.last()]=oSrc;

			oSrc.prototype.cls=dst;
			return oSrc;
		}
		catch(e){throw "Error: JClass.copy : impossible de créer la destination "+dst;}
	},
	
	remove: function(src) {
		try
		{
			// on cherche la source
			var oSrc = this.get(src);
			oSrc=null;
		}
		catch(e){throw "Error: JClass.remove : "+e;}
	},
	
	/*
	 * A partir du nom d'une classe récupère l'objet class correspondant. ex: 'mon.chemin.de.classe'
	 * @param cls: String
	 */ 
	get: function(src) {
		var p;var oSrc;
		var o;
		try{
			o = this.getModule(src);
		}
		catch(e) {throw "Error: JClass.get: "+e;}
		try
		{
			var clss = src.split('.');
			for(var i=1;i<clss.length;i++)
			{
				o=o[clss[i]];
			}
		}
		catch(e){throw "Error: JClass.get : la classe "+src+" n'existe pas";}
		return o;
	},
	
	callMethod: function(cls,mthd,param) {
		try
		{
			var c;
			if(typeof cls == 'string')
				c= this.get(cls);
			else c=cls;
		}
		catch(e){ throw "Error: JClass.callMethod: "+e;}
		
		var m;var k;
		if(typeof c == 'function')
		{
			k=c.prototype.getJsClass();
		}
		else k=c.getJsClass();
		
		m = eval(k+".prototype."+mthd);
		
		if(typeof m=='function')
		{
			return m.apply(c,param);
		}
		else throw "Error: JClass.callMethod: la méthode "+mthd+" n'existe pas pour la classe "+k;	
	},
	
	/*
	 * A partir du nom d'une classe récupère l'objet module corrspondant
	 * @param cls: String
	 */ 
	getModule: function(src) {
		var m=src.split('.')[0];
		var mo =eval(m);
		if(mo==undefined) throw "Error: JClass.getModule: le module "+m+" n'existe pas";
		else return mo;
	}
	
};