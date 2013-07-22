JClass.import('jsx.jGraphic.JComponent');

_class= JClass.create( 'JWindow', jsx.JComponent,
{
	initialize: function($super,id,className,width)
	{
		$super(id,className);
		this.tmpl="<div></div>";
		
		this.width= width;
	},
	
	//Lorsque vous cliquez sur un lien de la classe poplight et que le href commence par #
	show: function() {
		//Faire apparaitre la pop-up et ajouter le bouton de fermeture
		jQuery('#' + this.id).fadeIn().css({
			'width': Number(this.width)
		})
		.prepend('<a href="#" class="close"><img src="close_pop.png" class="btn_close" title="Fermer" alt="Fermer" /></a>');

		//Récupération du margin, qui permettra de centrer la fenêtre - on ajuste de 80px en conformité avec le CSS
		var popMargTop = (jQuery('#' + id).this.height() + 80) / 2;
		var popMargLeft = (jQuery('#' + id).this.width() + 80) / 2;

		//On affecte le margin
		jQuery('#' + this.id).css({
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});

		//Effet fade-in du fond opaque
		jQuery('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
		
		//Fermeture de la pop-up et du fond
		jQuery('a.close, #fade').live('click', function() { //Au clic sur le bouton ou sur le calque...
			JQuery('#fade , .popup_block').fadeOut(function() {
				JQuery('#fade, a.close').remove();  //...ils disparaissent ensemble
			});
			return false;
		});
		//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
		jQuery('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
	}
});