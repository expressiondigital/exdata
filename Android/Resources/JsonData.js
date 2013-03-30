//process tnt equiv data

var loadJsonData = function(init) {
	
	function _charOrdA(a, b) {
		a = a.toLowerCase(); 
		b = b.toLowerCase();
		if (a>b) return 1;
		if (a <b) return -1;
		return 0; 
	}
	
	function _charOrdD(a, b) {
		a = a.toLowerCase(); 
		b = b.toLowerCase();
		if (a<b) return 1;
		if (a >b) return -1;
		return 0; 
	}	

	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'tnt.json');
	
	var json = JSON.parse(file.read().text);
	
	var tnt = [];
	var tntItem = [];
	var _tnt;
	
	for(i=0; i< json.tnt.length; i++){
		_tnt = json.tnt[i];
		tnt.push(_tnt.title);
		tntItem[_tnt.title] = _tnt
	}
	
	//process explosives data
	
	file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'explosives.json');
	
	json = JSON.parse(file.read().text);
	
	var explosives = [];
	var explosivesItem = [];
	var _explosive;
	
	for(i=0; i< json.explosives.length; i++){
		_explosive = json.explosives[i];
		explosives.push(_explosive.title);
		explosivesItem[_explosive.title] = _explosive;
	}
	
	
	//sort array
	explosives.sort(_charOrdA);
	explosivesItem.sort(_charOrdA);
	
	return {
		'explosives': explosives,
		'explosivesItem': explosivesItem,
		'tnt': tnt,
		'tntItem': tntItem,
	}	

}