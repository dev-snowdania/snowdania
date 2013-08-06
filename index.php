<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>SNOWDANIA</title>
<link REL="StyleSheet" HREF="web/css/main.css" TITLE="Contemporary" TYPE="text/css">
<script type="text/javascript" src="web/js/lib/prototype/prototype.js"></script>
<script type="text/javascript" src="web/js/lib/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="web/js/lib/jquery/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="web/js/lib/jquery/plugins/jquery.scrollTo-min.js"></script>

<script type="text/javascript" src="web/js/lib/jsx/jsx.js"></script>
<script type="text/javascript" src="web/js/lib/jsx/JClass.class.js"></script>

<script>
jsx.classPath="web/js/lib/";
var aoe={
	classPath:"web/js/project/",
	multilang:new Hash(),
	
	getLang:function(k)
	{
		return this.multilang.get(k);
	},
	
	mergeLangFile:function(file)
	{
		dataLang=null;
		JClass.include(file);
		//alert(file);
		if(dataLang!=undefined)
		{
			this.multilang = this.multilang.merge(dataLang);
			return true;
		}
		else return false;
	}
};

jQuery.noConflict();

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, ((jQuery(window).height() - jQuery(this).outerHeight()) / 2) + 
    		jQuery(window).scrollTop()) + "px");
    this.css("left", Math.max(0, ((jQuery(window).width() - jQuery(this).outerWidth()) / 2) + 
    		jQuery(window).scrollLeft()) + "px");
    return this;
}

jQuery(document).ready(function(){
	try
	{
		JClass.import('jsx.MVC');
		MVC.doAction('aoe.controller.GameController','showMap',['une map']);
		//JSX.run('aoe.controller.GameController','showMap','une map');
	}
	catch(e) {alert(e);}
});

jQuery(document).ready(function(e){

	jQuery('BODY').append(jQuery('<div></div>').attr('id','infoBulle'));
	jQuery('#infoBulle').on('mouseenter mouseleave',function(e){
		if (e.type == 'mouseenter') {
			jQuery('#infoBulle').css('z-index',1000);
		    jQuery('#infoBulle').text(jQuery(this).attr('infobulle')).css('top', e.pageY+10).css('left', e.pageX+10).css('zIndex',1000).fadeIn();
		} else {
			if (e.type == 'mouseleave') {
				jQuery('#infoBulle').fadeOut();
			}
			else {
				jQuery('#infoBulle').css('top', e.pageY).css('left', e.pageX+10);
			}
		}
	});
})

//JClass.import('aoe.controller.GameController','showMap','une map');
</script>
</head>
<body>
</body>
</html>