Ti.include("CustomToolBar.js");
Ti.include("CustomList.js");

var UI_SCR_WIDTH = Ti.Platform.displayCaps.platformWidth;
var UI_SCR_HEIGHT = Ti.Platform.displayCaps.platformHeight;


var get_height_scale = function() {
	return PixelsToDPUnits(Ti.Platform.displayCaps.platformWidth / 320);
}

var get_height_scale_480 = function(val) {
	return PixelsToDPUnits(Ti.Platform.displayCaps.platformWidth / 480);
}

var get_scaled_font_size = function(fontSizePx) {
	var newSz = Math.round(fontSizePx * get_height_scale() );
	
	if (newSz < 6) newSz = 6;
	
	return newSz + "px";
}

function PixelsToDPUnits(ThePixels)
{
	var dpi = Titanium.Platform.displayCaps.dpi;
	if(dpi > 210 && dpi < 240) {
		dpi = 240;
	}
	
    if ( Titanium.Platform.displayCaps.dpi > 160 )
        return (ThePixels / (dpi / 160));
    else 
        return ThePixels;
}
 
 
function DPUnitsToPixels(TheDPUnits)
{
	var dpi = Titanium.Platform.displayCaps.dpi;
	if(dpi == 213 && dpi < 240) {
		dpi = 240;
	}
	
    if ( Titanium.Platform.displayCaps.dpi > 160 )
          return (TheDPUnits * (dpi / 160));
    else 
        return TheDPUnits;
}	

// for android, it is really scary
var statusBarHeight;
 
switch ( Ti.Platform.displayCaps.dpi ) {
case 160:
    statusBarHeight = 25;
    break;
case 120:
    statusBarHeight = 19;
    break;
case 240:
    statusBarHeight = 38;
    break;
case 320:
    statusBarHeight = 50;
    break;
default:
    statusBarHeight = PixelsToDPUnits(25);
    break;
}


var tabGroupHeight = 85*Ti.Platform.displayCaps.platformWidth/480;

// full screen area
var UI_MAIN_AREA_HEIGHT = UI_SCR_HEIGHT - statusBarHeight - tabGroupHeight; 
var UI_MAIN_AREA_NOTAB_HEIGHT = UI_SCR_HEIGHT - statusBarHeight; 

var UI_AREA_WITH_SMALL_BANNER_NOTAB_HEIGHT = UI_MAIN_AREA_NOTAB_HEIGHT;

var BG_W = 480, BG_H = 85;

var tab1view = Ti.UI.createView({
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: '#fff'
})

var toolBar = createCustomToolbar({
	title: 'Explosives',
});

tab1view.add(toolBar);

var explosiveTableRows = [];
var explosiveTableIndexRows = [];
var i = 0;
var alphaRowCount =0;
var curheader = '0';

for(i=0; i< jsonData.explosives.length; i++){
  	
  	if( jsonData.explosives[i].substring(0,1) != curheader)
  	{
    	curheader = jsonData.explosives[i].substring(0,1);
    	alphaRowCount++;

 
    	var row = Ti.UI.createTableViewRow({
    		header: jsonData.explosives[i].substring(0,1),	
    		backgroundSelectedColor: 'transparent',
    		className: 'withHeader',
    		backgroundColor: '#fff',
    		backgroundSelectedColor: 'transparent'
    	});

    	
  	} else {
  		var row = Ti.UI.createTableViewRow({backgroundSelectedColor: 'transparent', className: 'noHeader', backgroundColor: '#fff'});
  	}
 
  	row.data = jsonData.explosivesItem[jsonData.explosives[i]];

   
   var text = Ti.UI.createLabel ({
	    text: jsonData.explosives[i],
	    color:'#000',
	    font:{fontSize:'20dp', fontWeight:'bold', fontFamily:'Helvetica Neue' },
	    width:'250dp',
	    height:'70dp',
	    top:0,
	    left:'10dp',
	    touchEnabled: false,
	});
		
	
	row.add(text);

   explosiveTableRows.push( row );  	
}


// reset curheader var
curheader = '0'; 

// determine Row height by dividing by Alpha Table height
var rowHeight = ((UI_MAIN_AREA_NOTAB_HEIGHT - BG_H * get_height_scale_480()) - DPUnitsToPixels(60) - 20)/parseInt(alphaRowCount);

var rowIndexID = [];

for (i=0; i < jsonData.explosives.length; i++) 
{  
 
  if( jsonData.explosives[i].substring(0,1) != curheader)
  {
    curheader = jsonData.explosives[i].substring(0,1);
    var alphaRow = Ti.UI.createTableViewRow({
        color:'#fff',
        width: '28dp',
        height: rowHeight,
        backgroundColor:"transparent",
        backgroundSelectedColor:"transparent",
        className: 'index'
    });
 
 
    // define IndexRow for main Table
    rowIndexID.push( { id: i });
 
    var alphaLabel = Ti.UI.createLabel({
		top:0, 
		width: '28dp',
		left: 0,
		font: {  fontSize: '10dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
		color: '#666',
		textAlign: 'center',
		height: rowHeight,
		text: curheader,
    });

    alphaRow.add( alphaLabel );
 
    explosiveTableIndexRows.push( alphaRow );
  }
}


var explosivesTable = Ti.UI.createTableView({
  backgroundColor: '#fff',
  width:toolBar.width,
  rowHeight:'70dp',
  top: toolBar.height,
  separatorStyle:  Titanium.UI.iPhone.TableViewStyle.GROUPED,
  separatorColor: '#ddd',
});


// create table view event listener
explosivesTable.addEventListener('click', function(e){
	
	e.row.backgroundColor='#ff8f34';
	
	explosiveWindow = Titanium.UI.createWindow({
		backgroundColor: '#fff',
		data: e.row.data,
		barColor:'#ff8f34',
		windowSoftInputMode:Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED,  //** important to make a heavyweight window
		tabBarHidden:true,	
		navBarHidden:true,	
		statusBarHidden:true,
		orientationModes: [ // at this time, it works only on portrait screens
			Titanium.UI.UPSIDE_PORTRAIT,
			Titanium.UI.PORTRAIT,
		],		
	});  
	
	var explosiveToolBar = createCustomToolbar({
		title: 'Data',
		backWindow: explosiveWindow,
	});

	explosiveWindow.add(explosiveToolBar);
    
    var explosiveTable = createCustomList({
    	top: (54 + 70) + 'dp',
    	height: 'auto',
    	data: getExplosiveTableData(),
    	
    	click: function(e) {
			var statusAlert = Titanium.UI.createAlertDialog({
				title: e.header,
				message: e.title,
				buttonNames: ['Copy', 'Back'],
			});
			statusAlert.addEventListener('click', function(ev) {
			    if (ev.index == 0) { // clicked "Copy"
			      	Titanium.UI.Clipboard.setText(e.title);
			    } else if (ev.index == 1) { // clicked "back"
			      // do nothing
			    }
			 });			
			statusAlert.show();	
    	}
    });
    
	
	var explosiveTableTitleView = Titanium.UI.createView({
		left: 0,
		top: explosiveToolBar.height,
		backgroundColor: '#eee',
		height: '70dp',
	});
	
	var explosiveTableTitle = Titanium.UI.createLabel({
		color:'#000',
		top:0,
		left: 25,
		height:'70dp', 
		width: (Ti.Platform.displayCaps.platformWidth - 50),
		text: e.row.data.title,
		
		font:{fontSize:'22dp',fontWeight: 'bold',fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff'
	});
	
	var line = Titanium.UI.createView({
	    width: "100%",
	    height: 1,
	    bottom: 0,
	    backgroundColor: "#777",
	    zIndex: 2,
	});
	
	explosiveTableTitleView.add(explosiveTableTitle);
	explosiveTableTitleView.add(line);
		
	explosiveWindow.add(explosiveTableTitleView);
	explosiveWindow.add(explosiveTable);


    explosiveWindow.open({animated:true});
    
	e.row.backgroundColor = '#fff';    
});

explosivesTable.setData( explosiveTableRows );


var explosivesAlphaTable = Ti.UI.createTableView({
  //separatorColor: 'transparent',
  opacity:0.65,
  scrollable:false,
  right:5,
  top: '60dp',
  width:'28dp',
  borderRadius:13,
  backgroundColor:"transparent",
  separatorColor: "transparent",
  zIndex: 2,
  bottom: 2,
  touchEnabled : false
});

explosivesAlphaTable.setData( explosiveTableIndexRows );

tab1view.add(explosivesTable);
tab1view.add(explosivesAlphaTable);


var previousIndex = 0;


explosivesAlphaTable.addEventListener('touchstart', function(e)
{
  explosivesAlphaTable.backgroundColor = '#bbb';
 
});
 
explosivesAlphaTable.addEventListener('touchend', function(e)
{
  explosivesAlphaTable.backgroundColor = 'transparent';
});

explosivesAlphaTable.addEventListener('touchmove', function(e)
{
	explosivesAlphaTable.backgroundColor = '#bbb';
	applyAlphaTableMove(e);
});

explosivesAlphaTable.addEventListener('click', function(e)
{
	applyAlphaTableMove(e);
});

function applyAlphaTableMove(e) {
	try {
		
		var localPoint = {x:e.x, y:e.y}
		var convPoint = e.source.convertPointToView(localPoint, tab1view);
		
		if (convPoint) {
			var newIndex = Math.ceil( (convPoint.y - DPUnitsToPixels(60) - 10) / (rowHeight));
		}
		
		var rowIndex = rowIndexID[ newIndex ].id; 
	 
		// scroll to index on main Table, and make sure its on the TOP position
		// to make sure it doesnt jiggle, check to make sure newIndex is not the same as previousIndex
		if( rowIndex != previousIndex )
		{
			explosivesTable.scrollToIndex(rowIndex + newIndex,{animated:true});
			previousIndex = newIndex;  		
		}
  
  	} catch (e) {
		Ti.API.info("error is " + e);
	}  
}

function getExplosiveTableData() {
	var explosiveTableData = [];

	explosiveTableData = [{title:explosiveWindow.data.user, header:'User', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.user == 'N/A'},
				{title:explosiveWindow.data.formula, header:'Formula', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.formula == 'N/A'},
			    {title:explosiveWindow.data.composition, header:'Composition', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.composition == 'N/A'},
			    {title:explosiveWindow.data.chemical_name, header:'Chemical Name', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.chemical_name == 'N/A'},
			    {title:explosiveWindow.data.normal_colour, header:'Normal Colour', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.normal_colour == 'N/A'}];
	switch (measurement) {
		case 'Metric (SI)':
		{
			explosiveTableData.push.apply(explosiveTableData, [
				{title:(explosiveWindow.data.density=='N/A' ? explosiveWindow.data.density  : explosiveWindow.data.density  + ' kg/m3'), header:'Density', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.density == 'N/A'},
				{title:(explosiveWindow.data.velocity_of_detonation=='N/A' ? explosiveWindow.data.velocity_of_detonation  : explosiveWindow.data.velocity_of_detonation  + ' m/s'), header:'Velocity of Detonation', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.velocity_of_detonation == 'N/A'},
				{title:(explosiveWindow.data.detonation_pressure=='N/A' ? explosiveWindow.data.detonation_pressure  : explosiveWindow.data.detonation_pressure  + ' GPa'), header:'Detonation Pressure', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.detonation_pressure == 'N/A'},
				{title:((explosiveWindow.data.melting_point=='N/A' || explosiveWindow.data.melting_point=='NO') ? explosiveWindow.data.melting_point  : explosiveWindow.data.melting_point  + ' °C'), header:'Melting Point', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.melting_point == 'N/A'},
				{title:(explosiveWindow.data.detonating_temperature=='N/A' ? explosiveWindow.data.detonating_temperature  : explosiveWindow.data.detonating_temperature  + ' °C'), header:'Detonating Temperature', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.detonating_temperature == 'N/A'},
			]);
			break;
		}	
		case 'US Imperial':
		{
			explosiveTableData.push.apply(explosiveTableData, [
				{title:(explosiveWindow.data.density=='N/A' ? explosiveWindow.data.density  : roundNumber((parseFloat(explosiveWindow.data.density) * 0.0083454044873), 3)  + ' lb/gal'), header:'Density', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.density == 'N/A'},
				{title:(explosiveWindow.data.velocity_of_detonation=='N/A' ? explosiveWindow.data.velocity_of_detonation  : (parseFloat(explosiveWindow.data.velocity_of_detonation) * 3.281)  + ' ft/sec'), header:'Velocity of Detonation', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.velocity_of_detonation == 'N/A'},
				{title:(explosiveWindow.data.detonation_pressure=='N/A' ? explosiveWindow.data.detonation_pressure  : roundNumber((parseFloat(explosiveWindow.data.detonation_pressure) * 20,885,434.373), 3)  + ' lb/ft²-force'), header:'Detonation Pressure', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.detonation_pressure == 'N/A'},
				{title:((explosiveWindow.data.melting_point=='N/A' || explosiveWindow.data.melting_point=='NO') ? explosiveWindow.data.melting_point  : roundNumber(((parseFloat(explosiveWindow.data.melting_point) * 1.8) + 32), 3)  + ' °F'), header:'Melting Point', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.melting_point == 'N/A'},
				{title:(explosiveWindow.data.detonating_temperature=='N/A' ? explosiveWindow.data.detonating_temperature  : roundNumber(((parseFloat(explosiveWindow.data.detonating_temperature) * 1.8) + 32), 3)  + ' °F'), header:'Detonating Temperature', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.detonating_temperature == 'N/A'},
			]);
			break;
		}		
		case 'UK Imperial':
		{
			explosiveTableData.push.apply(explosiveTableData, [
				{title:(explosiveWindow.data.density=='N/A' ? explosiveWindow.data.density  : roundNumber((parseFloat(explosiveWindow.data.density) * 0.01022412855), 3)  + ' lb/gal'), header:'Density', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.density == 'N/A'},
				{title:(explosiveWindow.data.velocity_of_detonation=='N/A' ? explosiveWindow.data.velocity_of_detonation  : roundNumber((parseFloat(explosiveWindow.data.velocity_of_detonation) * 3.281), 3)  + ' ft/sec'), header:'Velocity of Detonation', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.velocity_of_detonation == 'N/A'},
				{title:(explosiveWindow.data.detonation_pressure=='N/A' ? explosiveWindow.data.detonation_pressure  : roundNumber((parseFloat(explosiveWindow.data.detonation_pressure) * 20,885,434.373), 3)  + ' lb/ft²-force'), header:'Detonation Pressure', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.detonation_pressure == 'N/A'},
				{title:((explosiveWindow.data.melting_point=='N/A' || explosiveWindow.data.melting_point=='NO') ? explosiveWindow.data.melting_point  : roundNumber(((parseFloat(explosiveWindow.data.melting_point) * 1.8) + 32), 3)  + ' °F'), header:'Melting Point', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.melting_point == 'N/A'},
				{title:(explosiveWindow.data.detonating_temperature=='N/A' ? explosiveWindow.data.detonating_temperature  : roundNumber(((parseFloat(explosiveWindow.data.detonating_temperature) * 1.8) + 32), 3)  + ' °F'), header:'Detonating Temperature', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.detonating_temperature == 'N/A'},
			]);
			break;
		}	
	}
	
	explosiveTableData.push.apply(explosiveTableData, [
		{title:explosiveWindow.data.steam_at_low_pressure, header:'Steam at Low Pressure', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.steam_at_low_pressure == 'N/A'},
		{title:explosiveWindow.data.reaction_with_low_pressure_steam, header:'Low Pressure Steam Reaction', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.reaction_with_low_pressure_steam == 'N/A'},
		{title:explosiveWindow.data.usual_method_of_filling, header:'Usual Method of Filling', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.usual_method_of_filling == 'N/A'},
		{title:explosiveWindow.data.usual_use, header:'Usual Use', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.usual_use == 'N/A'},
		{title:explosiveWindow.data.solvents, header:'Solvents', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.solvents == 'N/A'},
		{title:explosiveWindow.data.remarks, header:'Remarks', selectedBackgroundColor: '#ff8f34', selectionEnabled: explosiveWindow.data.remarks == 'N/A', extended: true},
	]);	

	
	return explosiveTableData;
		
}


// Custom header row
        /*
        var headerShadowLabel = Ti.UI.createLabel({
            width:'100%',
            color: '#444',
            left: 10,
            top: -1,
            text: jsonData.explosives[i].substring(0,1),
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontFamily:'Helvetica Neue',
                fontWeight:'bold',
                fontSize:18
            }
        });
                
        var headerLabel = Ti.UI.createLabel({
            width:'100%',
            color: '#fff',
            left: 10,
            top: -2,
            text: jsonData.explosives[i].substring(0,1),
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontFamily:'Helvetica Neue',
                fontWeight:'bold',
                fontSize:18
            }
        });
        var headerView = Ti.UI.createView({
            backgroundImage: '/images/bg_table_header.png',	
            height: 23,
            width:'100%'
        });
        
        headerView.add(headerShadowLabel);
        headerView.add(headerLabel);
 
        var headerSection = Ti.UI.createTableViewSection({
        	headerView: headerView
        });

        explosiveTableRows.push( headerSection );  	
        */