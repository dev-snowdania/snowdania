JClass.import('aoe.model.AbstractModel');

_class= JClass.create( 'Quest', aoe.model.AbstractModel,
{
	initialize: function($super){
		$super();
		// description
		this.description="";
		// mission remplie?
		this.validated=false;
		// argent
		this.money=0;
		// point d'expérience
		this.xp=0;
		// point de guilde
		this.gp=0;
		
		this.player=null;
		this.pnj=null;
		
		// la quete parente si existante
		this.parent=null;
		
		// sous quêtes
		this.quests = [];
	},
	
	setValidated: function(pBool){
		var oldValue=this.validated;
		this.validated=pBool;
		this.pcs.firePropertyChange('validated',oldValue,this.validated);
	},
	
	isValidated: function(){
		return this.validated;
	},
	
	validate: function(){
		this.setValidated(true);
		if(parent!=null){
			this.parent.checkSubQuestValidation();
		}
	},
	
	checkSubQuestValidation: function(){
		var numValidated=0;
		this.quests.each(function(p){
			if(p.isValidated()){
				numValidated++;
			}
		},this);
		if(numValidated==this.quests.length){
			this.setValidated(true);
		}
	}
});