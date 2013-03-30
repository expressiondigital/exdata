
var createCustomToolbar = function(init) {
	
	
	var bar =  Ti.UI.createView( 
		{ 
			top: 0,
			left: 0,
			width: Ti.Platform.displayCaps.platformWidth,
			height: '54dp',
			//backgroundColor: 'red',
			backgroundImage: '/images/bg_toolbar.png',	
		}
	);
	
	//add title
	
	var shadow = Ti.UI.createLabel({
		text:  ((init.title.length > 15 && Ti.Platform.displayCaps.platformWidth < 481) ? (init.title.substring(0,15) + '...') : init.title),
		font: {  fontSize: '24dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
		left: (Ti.Platform.displayCaps.platformWidth < 481 && init.backWindow != undefined ? '63dp' : 0),
		top: -1,
		color: '#444',
		textAlign: 'center',
		width: (Ti.Platform.displayCaps.platformWidth < 481 && init.backWindow != undefined ? (Ti.Platform.displayCaps.platformWidth - 70) : Ti.Platform.displayCaps.platformWidth),
		height: '50dp',
	});		
	
	var title = Ti.UI.createLabel({
		text: ((init.title.length > 15 && Ti.Platform.displayCaps.platformWidth < 481) ? (init.title.substring(0,15) + '...') : init.title),
		font: {  fontSize: '24dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
		left: (Ti.Platform.displayCaps.platformWidth < 481 && init.backWindow != undefined ? '63dp' : 0),
		top: 0,
		color: '#fff',
		textAlign: 'center',
		width: (Ti.Platform.displayCaps.platformWidth < 481 && init.backWindow != undefined ? (Ti.Platform.displayCaps.platformWidth - 70) : Ti.Platform.displayCaps.platformWidth),
		height: '50dp',
	});	
	
	bar.add(shadow);
	bar.add(title);	
	
	if(init.backWindow != undefined) {
		var backButton = Titanium.UI.createButton({ 
			title: '', 
			top: '7dp',
			bottom: '5dp',
			left: '7dp',
			height: '38dp',
			backgroundImage: '/images/back.png',
			width: '63dp',
			backWindow: init.backWindow,
		}); 	
		
		backButton.addEventListener('touchstart',function(e) {
			e.source.backgroundImage = '/images/back_sel.png';
		});
		
		backButton.addEventListener('touchend',function(e) {
			e.source.backWindow.close();
			e.source.backgroundImage = '/images/back.png';
		});	
	
		backButton.addEventListener('touchcancel',function(e) {
			e.source.backgroundImage = '/images/back.png';
		});
		
		bar.add(backButton);
	}
			
	return bar;
}