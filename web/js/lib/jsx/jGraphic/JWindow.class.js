JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JWindow', jsx.JComponent,
{
	initialize: function($super,id,className,width)
	{
		$super(id,className);
		this.tmpl="<div></div>";
		this.width= width;
		this.modal = false;
	},
	
	draw: function($super) {
		$super();
		this.show();
	},
	
	//Lorsque vous cliquez sur un lien de la classe poplight et que le href commence par #
	show: function() {
		
		var jq = this.getJQuery();
		if(jq){
			jq.fadeIn().css({
				'width': Number(this.width)
			})
			
			if(!this.modal){
				jq.prepend('<a href="#" class="close"><img src="close_pop.png" class="btn_close" title="Fermer" alt="Fermer" /></a>');
			}
			
			//center the popup
			jq.center();
	
			if(!jQuery('#fade').length){
				jQuery('body').append('<div id="fade"></div>');
			}
			
			if(!this.modal){
				jQuery('a.close, #fade').live('click', function() {
					jQuery('#fade , .popup_block').fadeOut(function() {
						jQuery('#fade, a.close').remove();
					});
					return false;
				});
			}
			
			//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
			jQuery('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
		}
	},
	
	close : function(){
		jQuery('#fade , #'+this.id).fadeOut(function() {
			jQuery('#fade, a.close').remove();
		});
	}
});