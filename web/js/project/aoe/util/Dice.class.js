_class=-1;

Dice = {
	QUALITY_GOOD:1,
	QUALITY_VERY_GOOD:2,
	QUALITY_PERFECT:3,
	NO_QUALITY:0,
	QUALITY_BAD:-1,
	QUALITY_VERY_BAD:-2,
	QUALITY_WORTH:-3,
	
	throwD100: function(num) {
		var r =(Math.floor(Math.random() * 100)+1);
		if(num==undefined) return r;
		var q;
		if(num==1) q=Dice.QUALITY_PERFECT;
		else
		{
			if(num==100) q=Dice.QUALITY_WORTH;
			else
			{
				var diff=(num-r);
				if(diff>=0) 
				{
					if(diff<40) q=Dice.QUALITY_GOOD;
					else 
					{
						if(diff<80) q=Dice.QUALITY_VERY_GOOD;
						else q=Dice.QUALITY_PERFECT;
					}
				}
				else 
				{
					if(diff<-40) q=Dice.QUALITY_BAD;
					else 
					{
						if(diff<-80) q=Dice.QUALITY_VERY_BAD;
						else q=Dice.QUALITY_WORTH;
					}
				}
			}
		}
		return [r,q];
	}
};