


var createCustomList = function(init) {
	
	var listView = Ti.UI.createView( {
		left:0,
		top:init.top,
		height:init.height,		
		backgroundImage: '/images/bg_list.png',		
	});
	
	function PixelsToDPUnits(ThePixels)
	{
	    if ( Titanium.Platform.displayCaps.dpi > 160 )
	        return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
	    else 
	        return ThePixels;
	}
	 
	 
	function PixelsToDPUnits(TheDPUnits)
	{
	    if ( Titanium.Platform.displayCaps.dpi > 160 )
	          return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
	    else 
	        return TheDPUnits;
	}	
	
	var listContainerScrollView = Titanium.UI.createScrollView({
	    contentHeight:'auto',
	});		
	
	var listContainerView = Ti.UI.createView( {
		left:0,
		top:0,
		width: Ti.Platform.displayCaps.platformWidth,
		height: 'auto',	
	});
		
	
	//loop through data items
	var i;
	var rowView;
	var row;
	var refs = [];	
	
	var lastHeight = 0;
	
	
	for(i = 0; i < init.data.length; i++ ) {
		row = init.data[i];
		
		var rowView = Ti.UI.createView( {
			left:'10dp',
			top: (15 + (lastHeight)) + 'dp',
			width: Ti.Platform.displayCaps.platformWidth,
			height: 'auto',
			bottom: '20dp',
		});			
		
		if(row.header != undefined && row.header != '') {
			
			var titleShadow = Ti.UI.createLabel({
				text: row.header,
				font: {  fontSize: '20dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
				left: '15dp',
				top: 1,
				height: 'auto',				
				color: '#fff',
				textAlign: 'left',
			});	
						
			var title = Ti.UI.createLabel({
				text: row.header,
				font: {  fontSize: '20dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
				left: '15dp',
				height: 'auto',				
				top: 0,
				color: '#596277',
				textAlign: 'left',
			});	
			
			rowView.add(titleShadow);
			rowView.add(title);
			
			lastHeight = lastHeight + 100;
		} else {
			lastHeight = lastHeight + 70;
			
			if(init.data[i + 1] != undefined) {
				if(init.data[i + 1].header != undefined && init.data[i + 1].header != '') {
					lastHeight = lastHeight + 30;
				}
			} 
		}
		
		//add the actual table field
		var textViewShadow = Ti.UI.createView( {
			left:0,
			top: (row.header != undefined && row.header != '')  ? '36dp' : '10dp',
			width: (Ti.Platform.displayCaps.platformWidth - PixelsToDPUnits(30)),
			height: '50dp',
			bottom: '30dp',
			backgroundColor: '#fff',
			borderRadius: 15,
			borderColor: '#fff',
			borderWidth: 1,
		});	
			
				
		var textView = Ti.UI.createView( {
			left:0,
			top: (row.header != undefined && row.header != '')  ? '35dp' : '9dp',
			width: (Ti.Platform.displayCaps.platformWidth - PixelsToDPUnits(30)),
			height:  (row.extended != undefined && row.extended != '') ? 'auto' : '50dp',
			bottom: '30dp',
			backgroundColor: (row.backgroundColor != undefined && row.backgroundColor != '') ? row.backgroundColor : '#fff',
			borderRadius: 15,
			borderColor: '#a1a7ad',
			borderWidth: 1,
			title: row.title,
			header: row.header,
			selectedBackgroundColor: row.selectedBackgroundColor,
			selectionEnabled: row.selectionEnabled,
		});
		
		textView.addEventListener('touchstart', function (e) {
			if(e.source.selectionEnabled != false) {
				e.source.backgroundColor = e.source.selectedBackgroundColor;
			}
		});
		
		textView.addEventListener('touchcancel', function (e) {
			if(e.source.selectionEnabled != false) {
				e.source.backgroundColor = (row.backgroundColor != undefined && row.backgroundColor != '') ? row.backgroundColor : '#fff';
			}
		});
		
		textView.addEventListener('touchend', function (e) {
			if (typeof(init.click) != 'undefined') {
				init.click(e.source);
			}		
				
			if(e.source.selectionEnabled != false) {
				e.source.backgroundColor = (row.backgroundColor != undefined && row.backgroundColor != '') ? row.backgroundColor : '#fff';
			}
		});		
		
				
		if(row.ref != undefined) {
			refs[row.ref] = textView;
		}		
		
		//detect hasChild and add in arrow
		if(row.hasChild != undefined && row.hasChild != '') {
			var arrowView = Ti.UI.createView( {
				right: '15dp',
				height: '14dp',
				width: '10dp',
				top: '18dp',
				backgroundImage: '/images/list_arrow.png',	
				touchEnabled:false,
			});
			
			textView.add(arrowView);
		}
		
		
		var text = [];
		
		text = Ti.UI.createLabel({
			text: ((row.title.length > 30 && Ti.Platform.displayCaps.platformWidth < 481) ? (row.title.substring(0,30) + '...') : row.title),
			font: {  fontSize: '18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
			left: '15dp',
			height:  (row.extended != undefined && row.extended != '') ? 'auto' : '48dp',				
			top: (row.extended != undefined && row.extended != '') ? '10dp' : '1dp',
			bottom: (row.extended != undefined && row.extended != '') ? '10dp' : '0',
			color: '#000',
			textAlign: 'left',
			backgroundColor: 'transparent',
			touchEnabled:false,
		});	
		
		textView.text = text;
		
		textView.add(text);
		
		rowView.add(textViewShadow);	
		rowView.add(textView);	
		
		listContainerView.add(rowView);
	}
	
	listContainerScrollView.add(listContainerView);
	
	listView.add(listContainerScrollView);
	
	if(init.lines != undefined && init.lines != '') {
		var line = Titanium.UI.createView({
		    width: "100%",
		    height: 1,
		    top: 0,
		    backgroundColor: "#777",
		    zIndex: 2,
		});				
		
		listView.add(line);	
		
		var line2 = Titanium.UI.createView({
		    width: "100%",
		    height: 1,
		    bottom: 0,
		    backgroundColor: "#777",
		    zIndex: 2,
		});				
		
		listView.add(line2);			
	}
	
	listView.refs = refs;
	
	return listView;
}