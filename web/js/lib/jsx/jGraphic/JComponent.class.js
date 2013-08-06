
_class= JClass.create( 'JComponent',
{
	initialize: function(id,className){
		this.parent=null;
		this.jObject=null;
		this.tmpl=null;
		this.id=id;
		this.className=className;
		this.value=null;
		this.subComponents=[];
		this.evts=[];
		this.jsxEvts=[];
		this.attr=new Hash();
		this.infoBulle=null;
		this.css=new Hash();
		
		this.controller=null;
	},
	
	
	setTemplate : function(tmpl){
		this.tmpl=tmpl;
	},
	
	setParent : function(parent){
		this.parent=parent;
	},
	
	getParent : function(className){
		if(this.parent==null) return null;
		if(className){
			if(this.parent.getJsClassName()==className){
				return this.parent;
			} else {
				return this.parent.getParent(className);
			}
		}else {
			return this.parent;
		}
	},
	
	setId : function(id){
		this.id=id;
	},
	
	setInfoBulle : function(infoBulle){
		this.infoBulle=infoBulle;
		if(this.jObject!=null){
			this.jObject.attr('infobulle',this.infoBulle);
		}
	},
	
	getInfoBulle : function(){
		return this.infoBulle;
	},
	
	getId : function(){
		return this.id;
	},
	
	setClassName : function(cls){
		this.className=cls;
		if(this.jObject!=null){
			this.jObject.removeClass();
			this.jObject.addClass(this.className);
		}
	},
	
	getValue :function(){
		return this.value;
	},
	
	setValue :function(val){
		this.value=val;
		this.setJValue();
	},
	
	setJValue : function(){
		if(this.jObject!=null){
			this.jObject.html(this.value);
		}
	},
	
	addComponent:function(gPanel){
		gPanel.setParent(this);
		this.subComponents.push(gPanel);
		if(this.jObject!=null){
			this.jObject.append(gPanel.getJQuery());
		}
	},
	
	getComponent:function(i){
		return this.subComponents[i];
	},
	
	getJQuery: function(){
		return this.jObject;
	},
	
	getJQueryPrt: function(){
		if(this.parent==null){
			return jQuery("BODY")
		} else {
			return this.parent.getJQuery();
		}
	},
	
	setAttr:function(name,val){
		this.attr.set(name,val);
	},
	
	setCss:function(name,val){
		this.css.set(name,val);
		if(this.jObject){
			this.jObject.css(name,val);
		}
	},
	
	bindEvent:function(evtName,func){
		this.evts.push([evtName,func]);
	},
	
	addEventListener:function(evtName,func,ctxObject){
		this.jsxEvts.push([evtName,func,ctxObject]);
	},
	
	eraser : function(){
		if(this.jObject){
			this.jObject.remove();
		}
		this.jObject = null;
		
		if(this.subComponents.length>0){
			for(var i=0;i<this.subComponents.length;i++){
				this.subComponents[i].eraser();
			}
		}
	},
	
	clean : function(){
		
		if(this.subComponents.length>0){
			for(var i=0;i<this.subComponents.length;i++){
				this.subComponents[i].eraser();
			}
		}
		
		this.subComponents=[];
		
		if(this.jObject){
			this.jObject.html('');
		}
	},
	
	redraw : function(){
		this.clean();
		this.draw();
	},
	
	draw : function(){
		var dom=this.getJQueryPrt();
		if(dom){
			var newC=false;
			if(this.jObject==null){
				this.jObject = jQuery(this.tmpl);
				newC=true;
			}else {
				this.jObject.html('');
			}
			
			if(this.subComponents.length==0 && this.value==null){
				this.value=" ";
			}
			
			if(this.id){
				this.jObject.attr("id",this.id);
			}
			if(this.className){
				this.setClassName(this.className);
			}
			if(this.infoBulle){
				this.jObject.attr('infobulle',this.infoBulle);
			}
			
			if(typeof this.drawCustom=='function'){
				this.drawCustom();
			}
			
			this.setJValue();
			
			if(this.attr.size()>0){
				this.attr.each(function(p){
					this.jObject.attr(p.key,p.value);
				},this);
			}
			if(this.css.size()>0){
				this.css.each(function(p){
					this.jObject.css(p.key,p.value);
				},this);
			}
			if(this.evts.length>0){
				var evt;
				for(var i=0;i<this.evts.length;i++){
					evt=this.evts[i];
					this.jObject.bind(evt[0],evt[1]);
				}
			}
			
			if(this.jsxEvts.length>0){
				var evt;
				for(var i=0;i<this.jsxEvts.length;i++){
					evt=this.jsxEvts[i];
					var d= this.jObject.get(0);
					d.jsx=this;
					d.jsxCtx=evt[2];
					if(typeof evt[1]=='function'){
						this[evt[0]]=evt[1];
					}
					this.jObject.bind(evt[0],function(e){
						if (!e) var e = window.event;
						var m =eval("this.jsx."+e.type);
						if(typeof m=='function'){
							return m.call(this.jsx,e,this.jsxCtx);
						}
					});
				}
			}
			
			if(newC){
				var d= this.jObject.get(0);
				d.jsx=this;
				dom.append(this.jObject);
			}
		}
		
		for(var i=0;i<this.subComponents.length;i++){
			this.subComponents[i].draw();
		}
	}
});