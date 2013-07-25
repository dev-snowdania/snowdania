JClass.import('jsx.entities.PropertyChangeSupport');

_class= JClass.create( 'InteractiveSession',
{
	initialize: function(){
		this.pcs = new jsx.PropertyChangeSupport(this);
		this.logMsg="";
		
		this.turn = null;
	},
	
	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	setTurn: function(pTurn){
		var oldValue=this.turn;
		this.turn=pTurn;
		this.pcs.firePropertyChange('turn',oldValue,this.turn);
	},
	
	changeTurn: function(){
		//console.log(this.turn);
		if(this.turn==aoe.InteractiveSession.PLAYER){
			this.setTurn(aoe.InteractiveSession.OPPONENT);
			MVC.doAction('aoe.controller.InteractionController','playOpponent',[]);
		}else{
			this.setTurn(aoe.InteractiveSession.PLAYER);
		}
	},
	
	start: function(pPlayer,pOpponent){
		console.log("début de session interactive");
		
		//define who has the initiative, the smallest number win
		var diceThrowOpponent=Dice.throwD100();
		var diceThrowPlayer=Dice.throwD100(diceThrowOpponent.result);
		
		console.log(diceThrowPlayer);
		console.log(diceThrowOpponent);
		
		if(diceThrowPlayer.succeed){
			console.log("player has initiative");
			
			this.setTurn(aoe.InteractiveSession.PLAYER);
		}else{
			console.log("oppponent has initiative");
			this.setTurn(aoe.InteractiveSession.OPPONENT);
			MVC.doAction('aoe.controller.InteractionController','playOpponent',[]);
		}
	},
	
	end : function(damage){
		console.log("fin de session interactive");
	}
	
});

_class.PLAYER = "INTER_SESS_PLAYER";
_class.OPPONENT = "INTER_SESS_OPPONENT";