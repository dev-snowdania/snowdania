JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JSeparator', jsx.JComponent,
{
	initialize: function($super,id,className,label)
	{
		if(className && className!=""){
			className += " gSep";
		}else{
			className = "gSep";
		}
		
		if(!label){
			label = "&nbsp;";
		}
		
		$super(id,className);
		this.tmpl="<div></div>";
		this.value=label;
	}
});