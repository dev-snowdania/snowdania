JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'InteractiveSession',
{
	initialize: function(pPlayer,pInteraction,pMapCase){
		this.pcs = new jsx.PropertyChangeSupport(this);
		this.logMsg="";
		
		this.status = 'stop';
		
		/**
		 * who is actualing playing
		 */
		this.turn = null;
		
		/**
		 * number of turn in this session
		 */
		this.turnCounter = null;
		
		/**
		 * distance between the opponents in meters
		 */
		this.distance = 0;
		
		/**
		 * execution context for a player: bonus, malus ect...
		 */
		this.context = {};
		
		this.player = pPlayer;
		this.interaction = pInteraction;
		this.mapCase = pMapCase;
	},
	
	getPlayer: function(){
		return this.player;
	},
	
	getInteraction: function(){
		return this.interaction;
	},
	
	getMapCase: function(){
		return this.mapCase;
	},
	
	getTurn: function(){
		return this.turn;
	},
	
	checkActionsStatus: function(){
		
		var player;
		if(this.turn==aoe.InteractiveSession.PLAYER){
			player = this.player;
		}else{
			player = this.interaction;
		}
		
		//console.log(player.getJsClassName());
		var actions = player.getActionManager(true);
		//console.log("test");
		var act;
		while(act = actions.next()){
			act.checkStatus();
		}
	},
	
	addContextToPlayer: function(pPlayer,pContext){
		var key = pPlayer.getOid().toString();
		if(!this.context[key]){
			this.context[key] = [];
		}
		this.context[key].push(pContext);
	},
	
	/**
	 * Vérifie le contexte pour le joueur.
	 */
	checkContextForPlayer: function(pPlayer,pType,pTag){
		
		var key = pPlayer.getOid().toString();
		var delta=0;
		if(this.context[key]){
			this.context[key].each(function(pContext,ctx){
				
				if(pContext.type == pType && pContext.tags.intersect(pTag).length>0){
					if(pContext.lifetime>0){
						pContext.lifetime--;
						delta += pContext.value;
						console.log(pContext.log);
					}
				}
			},this);
		}
		
		console.log("delta total: "+delta);
		
		return delta;
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	getTurnCounter:function(){
		return this.turnCounter;
	},
	
	getDistance:function(){
		return this.distance;
	},
	
	reduceDistance:function(pDistance){
		this.setDistance(this.distance-pDistance);
	},
	
	setTurn: function(pTurn){
		
		console.log("Tour N°"+this.turnCounter);
		console.log(pTurn+" play");
		
		var oldValue=this.turn;
		this.turn=pTurn;
		this.pcs.firePropertyChange('turn',oldValue,this.turn);
		
		this.checkActionsStatus();
	},
	
	setDistance: function(pDistance){
		
		if(pDistance<0){
			pDistance = 0;
		}
		
		if(pDistance != this.distance){
			var oldValue=this.distance;
			this.distance=pDistance;
			this.pcs.firePropertyChange('distance',oldValue,this.distance);
		}
	},
	
	setStatus: function(pStatus){
		
		var oldValue=this.status;
		this.status=pStatus;
		this.pcs.firePropertyChange('status',oldValue,this.status);
	},
	
	changeTurn: function(){
		//console.log(this.turn);
		
		if(this.status=='stop'){
			return;
		}
		
		this.turnCounter++;
		
		if(this.turn==aoe.InteractiveSession.PLAYER){
			this.setTurn(aoe.InteractiveSession.OPPONENT);
			this.playOpponent();
		}else{
			this.setTurn(aoe.InteractiveSession.PLAYER);
		}
	},
	
	start: function(){
		console.log("début de session interactive");
		
		this.turnCounter = 1;
		
		this.setStatus('start');
		
		this.setDistance(this.mapCase.getVisibility());
		
		//define who has the initiative, the smallest number win
		var diceThrowOpponent=Dice.throwD100();
		var diceThrowPlayer=Dice.throwD100(diceThrowOpponent.result);
		
		//console.log(diceThrowPlayer);
		//console.log(diceThrowOpponent);
		
		if(diceThrowPlayer.succeed){
			console.log("player has initiative");
			
			this.setTurn(aoe.InteractiveSession.PLAYER);
		}else{
			console.log("oppponent has initiative");
			this.setTurn(aoe.InteractiveSession.OPPONENT);
			this.playOpponent();
		}
	},
	
	playOpponent: function(){
		window.setTimeout(function(){MVC.doAction('aoe.controller.InteractionController','playOpponent',[])},2000);
	},
	
	stop : function(){
		console.log("fin de session interactive");
		this.setStatus('stop');
	}
	
});

_class.PLAYER = "INTER_SESS_PLAYER";
_class.OPPONENT = "INTER_SESS_OPPONENT";