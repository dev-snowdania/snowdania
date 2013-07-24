JClass.import('jsx.entities.PropertyChangeSupport');
JClass.import('aoe.util.Dice');

_class= JClass.create( 'MapCase',
{
	initialize: function(){
		this.revealed=false;
		this.pcs = new jsx.PropertyChangeSupport(this);
		this.objects=[];
		this.currentPlayer=null;
		this.className='';
		this.interactions=[];
		// message si premi�re entr�e sur une case de ce type 
		this.logMessage=null;
		// message si tentative de d�placement en �chec
		this.logMsgMoveErr=null;
	},

	getPropertyChangeSupport:function(){
		return this.pcs;
	},
	
	getClassName : function(){
		if(this.revealed)
			return this.className;
		else return "bg_ep";
	},
	
	getLogMessage : function(){
		return this.logMessage;
	},
	
	setRevealed: function(pBool)
	{
		var oldValue=this.revealed;
		this.revealed=pBool;
		this.pcs.firePropertyChange('revealed',oldValue,this.revealed,{});
	},
	
	hasObject:function(){
		return (this.objects.length>0);
	},
	
	addObject : function(oObject){
		this.objects.push(oObject);
	},
	
	removeObject : function(pObject){
		this.objects.splice(this.objects.indexOf(pObject), 1);
	},
	
	getObject : function(i){
		return this.objects[i];
	},
	
	setCurrentPlayer:function(pPlayer){
		this.currentPlayer=pPlayer;
		this.pcs.firePropertyChange('currentPlayer',null,this.currentPlayer);
	},
	
	hasCurrentPlayer:function(){
		return (this.currentPlayer!=null);
	},
	
	removePlayer : function(player){
		//this.currentPlayer=null;
		//this.pcs.firePropertyChange('playerLeaveCase',{});
		this.setCurrentPlayer(null);
	},
	
	movePlayer : function(player,mCaseOld){
		var b=this.tryMove(player);
		if(b){
			if(mCaseOld!=null){
				mCaseOld.removePlayer();
			}
			this.setRevealed(true);
			//this.currentPlayer=player;
			//this.pcs.firePropertyChange('playerEnterCase',{x:player.getPosX(),y:player.getPosY()});
			this.setCurrentPlayer(player);
			
			if(mCaseOld.getJsClass()!=this.getJsClass() && this.logMessage){
				MVC.getCacheInstance().getObject('uneGameLog').addMessage(this.logMessage);
			}
			
			// interactions
			this.interactions.each(function(a){
				var proba=a[0];
				var diceThrow=Dice.throwD100(proba);
				//console.log(diceThrow);
				if(diceThrow.succeed){
					// l'interaction a lieu
					var oInter = a[1];
					//console.log('interact!');
					//oInter.interact(player);
					MVC.doAction('aoe.controller.InteractionController','showPopup',[player,oInter]);
					throw $break;
				}
			},this);
			
			
			if(this.hasObject()){
				this.objects.each(function(oObject){
					var r = confirm("Voulez-vous ramasser "+oObject.getLabel()+"?");
					if(r){
						player.getCurrentHand().add(oObject,oObject.getJsClassName());
						this.removeObject(oObject);
						var oLog=MVC.getCacheInstance().getObject('uneGameLog');
						oLog.addMessage(oObject.getLogMessage());
					}
				},this);
				
			}
		}else{
			if(this.logMsgMoveErr){
				MVC.getCacheInstance().getObject('uneGameLog').addMessage(this.logMsgMoveErr);
			}
		}
		return b;
	},
	
	tryMove : function(player){
		return true;
	}
	
});