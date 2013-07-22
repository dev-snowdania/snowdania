
/*
 * permet de stocker des objets accessible statiquement
 */
_class = -1;

var Util={
	compareObject : function(a, b) {
		var prop, otype, isOK = true;
		for (prop in a) {
			if (a.hasOwnProperty(prop)) {
				otype = Object.prototype.toString.call(a[prop]).match(/^\[object\s(.*)\]$/)[1];
				isOK  = (!/^(String|Number|Window)$/.test(otype)) ? arguments.callee(a[prop], b[prop]) : (a[prop] === b[prop]);
				if (isOK !== true) {
					break;
				}
			}
		}
		return isOK;
	}
	
};