_class=-1;

Dice = {
	QUALITY_GOOD : "qa_good",
	QUALITY_VERY_GOOD : "qa_v_good",
	QUALITY_PERFECT : "qa_perfect",
	NO_QUALITY : "qa_no_qa",
	QUALITY_BAD : "qa_bad",
	QUALITY_VERY_BAD : "qa_v_bad",
	QUALITY_WORTH : "qa_worth",
	
	throwD100: function(num) {
		var r =(Math.floor(Math.random() * 100)+1);
		if(num==undefined) return {result: r};
		var q,succeed;
		
		//magic numbers, 1 & 2 means always a success, whatever the number to reach
		if(r == 1 || r == 2) {
			succeed = true;
			if(num<=0){
				q=Dice.NO_QUALITY;
			}else{
				q=Dice.QUALITY_PERFECT;
			}
		}
		else{
			//magic numbers, 99 & 100 means always a failure, whatever the number to reach
			if(r==100 || r == 99) {
				succeed = false;
				if(num>=100){
					q=Dice.QUALITY_BAD;
				}else{
					q=Dice.QUALITY_WORTH;
				}
			}
			else{
				var diff=(num-r);
				if(diff>=0) {
					//success
					succeed = true;
					if(diff<20) {
						q=Dice.NO_QUALITY;
					}else{
						if(diff<40) {
							q=Dice.QUALITY_GOOD;
						}else {
							if(diff<80) q=Dice.QUALITY_VERY_GOOD;
							else q=Dice.QUALITY_PERFECT;
						}
					}
				}
				else {
					//failure
					diff = Math.abs(diff);
					succeed = false;
					
					if(diff<40) {
						q=Dice.QUALITY_BAD;
					}else {
						if(diff<80) q=Dice.QUALITY_VERY_BAD;
						else q=Dice.QUALITY_WORTH;
					}
				}
			}
		}
		return {result: r, quality: q, succeed: succeed};
	}
};