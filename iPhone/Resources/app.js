// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();
var currentTab;
var explosiveWindow;
var explosiveTable;
var acousticEstimatesTNTEquivalenceTable;
var acousticTotalLabel;
var detonationPressureTotalLabel;
var detonationPressureDensityFieldLabel;
var detonationPressureDensityField;
var detonationPressureVelocityOfDetonationFieldLabel;
var detonationPressureVelocityOfDetonationField;
var pressureImpulseChargeMassFieldLabel;
var pressureImpulseChargeMassField;
var pressureImpulseStandoffDistanceFieldLabel;
var pressureImpulseStandoffDistanceField;
var dangerAreasAllUpWeightField;
var dangerAreasAllUpWeightFieldLabel;
var consequenceChargeMassFieldLabel;
var consequenceChargeMassField;
var consequenceStandoffDistanceFieldLabel;
var consequenceStandoffDistanceField;
var acousticEstimatesMassField;
var acousticEstimatesMassFieldLabel;
var pressureImpulseResultsTitlesTable;
var consequenceResultsTitlesTable;
var consequenceResultsLabel;
var dangerAreasResultsTitlesTable;
var remarksLabel;
var measurement = JSON.parse(Ti.App.Properties.getString("measurement"));
//if value isn't set default to metic
if(measurement == undefined) {
	measurement = 'Metric (SI)';
}

var acousticEstimatesTNTEquivalence = JSON.parse(Ti.App.Properties.getString("acoustic_esimates_tnt_equivalence"));
//if value isn't set TNT
if(acousticEstimatesTNTEquivalence == undefined) {
	acousticEstimatesTNTEquivalence = 'TNT';
}

var acousticEstimatesChargeMass = JSON.parse(Ti.App.Properties.getString("acoustic_esimates_charge_mass"));
if(acousticEstimatesChargeMass == undefined) {
	acousticEstimatesChargeMass = '10';
}

var detonationPressureDensity = JSON.parse(Ti.App.Properties.getString("detonation_pressure_density"));
if(detonationPressureDensity == undefined) {
	detonationPressureDensity = '10';
}

var detonationPressureVelocityOfDetonation = JSON.parse(Ti.App.Properties.getString("detonation_pressure_velocity_of_detonation"));
if(detonationPressureVelocityOfDetonation == undefined) {
	detonationPressureVelocityOfDetonation = '10';
}

var pressureImpulseTNTEquivalence = JSON.parse(Ti.App.Properties.getString("pressure_impulse_tnt_equivalence"));
if(pressureImpulseTNTEquivalence == undefined) {
	pressureImpulseTNTEquivalence = 'TNT';
}

var pressureImpulseChargeMass = JSON.parse(Ti.App.Properties.getString("pressure_impulse_charge_mass"));
if(pressureImpulseChargeMass == undefined) {
	pressureImpulseChargeMass = '10';
}

var pressureImpulseStandoffDistance = JSON.parse(Ti.App.Properties.getString("pressure_impulse_standoff_distance"));
if(pressureImpulseStandoffDistance == undefined) {
	pressureImpulseStandoffDistance = '10';
}

var consequenceTNTEquivalence = JSON.parse(Ti.App.Properties.getString("consequence_tnt_equivalence"));
if(consequenceTNTEquivalence == undefined) {
	consequenceTNTEquivalence = 'TNT';
}

var consequenceChargeMass = JSON.parse(Ti.App.Properties.getString("consequence_charge_mass"));
if(consequenceChargeMass == undefined) {
	consequenceChargeMass = '10';
}

var consequenceStandoffDistance = JSON.parse(Ti.App.Properties.getString("consequence_standoff_distance"));
if(consequenceStandoffDistance == undefined) {
	consequenceStandoffDistance = '10';
}

var dangerAreasAllUpWeight = JSON.parse(Ti.App.Properties.getString("danger_areas_all_up_weight"));
if(dangerAreasAllUpWeight == undefined) {
	dangerAreasAllUpWeight = '10';
}

// first window is a list of all explosives


//process tnt equiv data

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
explosives.sort(charOrdA);
explosivesItem.sort(charOrdA);

var explosiveTableRows = [];
var explosiveTableIndexRows = [];
var i = 0;
var alphaRowCount =0;
var curheader = '0';

for(i=0; i< explosives.length; i++){
  	
  	if( explosives[i].substring(0,1) != curheader)
  	{
    	curheader = explosives[i].substring(0,1);
    	alphaRowCount++;
    	var row = Ti.UI.createTableViewRow({
    		header: explosives[i].substring(0,1),	
    		selectedBackgroundColor: '#ff8f34',
    		className: 'withHeader',
    	});
    	
  	} else {
  		var row = Ti.UI.createTableViewRow({selectedBackgroundColor: '#ff8f34', className: 'withoutHeader'});
  	}
  	
 
  	row.data = explosivesItem[explosives[i]];

   
   var text = Ti.UI.createLabel
	({
	    text: explosives[i],
	    color:'#000',
	    font:{fontSize:20, fontWeight:'bold', fontFamily:'Helvetica Neue' },
	    width:250,
	    height:70,
	    top:0,
	    left:10
	});
	
	row.add(text);

   explosiveTableRows.push( row );  	
}




// reset curheader var
curheader = '0'; 

// determine Row height by dividing by Alpha Table height
var rowHeight = ((Titanium.Platform.displayCaps.platformHeight == 960 || Titanium.Platform.displayCaps.platformHeight == 480) ? 355 : (355 + 88))/alphaRowCount; //176px extra

var rowIndexID = [];

for (i=0; i < explosives.length; i++) 
{  
 
  if( explosives[i].substring(0,1) != curheader)
  {
    curheader = explosives[i].substring(0,1);
    var alphaRow = Ti.UI.createTableViewRow({
        color:'#fff',
        width:28,
        backgroundColor:"transparent",
        backgroundSelectedColor:"transparent",
        selectedBackgroundColor: "transparent"
    });
 
    alphaRow.height = rowHeight;
 
    // define IndexRow for main Table
    rowIndexID.push( { id: i });
 
    var alphaLabel = Ti.UI.createLabel({
		top:0, 
		width:28,
		left: 0,
		font: {  fontSize: 10, fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
		color: '#444',
		textAlign: 'center'
    });
    alphaLabel.text = curheader;
    alphaLabel.height = rowHeight;
    alphaRow.add( alphaLabel );
 
    explosiveTableIndexRows.push( alphaRow );
  }
}


//var explosiveItems = doc.getElementsByTagName("title");

var explsoivesDataWindow = Titanium.UI.createWindow({  
    title:'Explosives',
    backgroundColor:'#fff',
    barColor:'#ff8f34',
});

var explosivesTable = Ti.UI.createTableView({
  backgroundColor: '#fff',
  width:320,
  rowHeight:70,
  separatorStyle:  Titanium.UI.iPhone.TableViewStyle.GROUPED,
});


// create table view event listener
explosivesTable.addEventListener('click', function(e){
    
	explosiveWindow = Titanium.UI.createWindow({
		title: 'Data',
		backgroundColor: '#eee',
		data: e.rowData.data,
		barColor:'#ff8f34',
	});  
    
	explosiveTable = Titanium.UI.createTableView({
	    data: getExplosiveTableData(),
	    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	    top: 70,
	});
	
	explosiveTable.addEventListener('click', function(e){
		
		var isRemarks = (e.rowData.header == 'Remarks' && remarksLabel.text !='N/A');
		
		if(e.rowData.title != 'N/A' || isRemarks) {
			var statusAlert = Titanium.UI.createAlertDialog({
				title: e.rowData.header,
				message: (isRemarks ? remarksLabel.text : e.rowData.title),
				buttonNames: ['Copy', 'Back'],
			});
			statusAlert.addEventListener('click', function(ev) {
			    if (ev.index == 0) { // clicked "Copy"
			    	if(!isRemarks) {
			      		Titanium.UI.Clipboard.setText(e.rowData.title);
			     	} else {
			     		Titanium.UI.Clipboard.setText(remarksLabel.text);
			     	}
			    } else if (ev.index == 1) { // clicked "back"
			      // do nothing
			    }
			  });			
			statusAlert.show();	
		}
			
	});
	
	var explosiveTableTitleView = Titanium.UI.createView({
		left: 0,
		top: 0,
	});
	
	var explosiveTableTitle = Titanium.UI.createLabel({
		color:'#000',
		top:0,
		left:25,
		height:70, 
		width: 270,
		text: e.rowData.data.title,
		
		font:{fontSize:22,fontWeight: 'bold',fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff'
	});
	
	var line = Titanium.UI.createView({
	    width: "100%",
	    height: 1,
	    top: 69,
	    borderWidth: 1,
	    borderColor: "#777",
	});
	
	explosiveTableTitleView.add(explosiveTableTitle);
	explosiveTableTitleView.add(line);
	explosiveWindow.add(explosiveTableTitleView);
	explosiveWindow.add(explosiveTable);

    tabGroup.activeTab.open(explosiveWindow);
});

explosivesTable.setData( explosiveTableRows );

var explosivesAlphaTable = Ti.UI.createTableView({
  separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
  opacity:0.65,
  scrollable:false,
  right:5,
  top:5,
  width:28,
  height:(Titanium.Platform.displayCaps.platformHeight == 960 || Titanium.Platform.displayCaps.platformHeight == 480) ? 355 : (355 + 88),
  borderRadius:13,
  backgroundColor:"transparent"
});

explosivesAlphaTable.setData( explosiveTableIndexRows );

explsoivesDataWindow.add(explosivesTable);
explsoivesDataWindow.add(explosivesAlphaTable);

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

var tab1 = Titanium.UI.createTab({  
    icon:'tab_2.png',
    title:'Explosives',
    window:explsoivesDataWindow
});


var blastAnalysisWindow = Titanium.UI.createWindow({  
    title:'Blast Analysis',
    backgroundColor:'#fff',
    barColor:'#ff8f34',
});

var blastAnalysisTitlesData = [
    {title:'Pressure / Impulse', header:'Technical', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'Detonation Pressure', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'Acoustic (Noise) Estimates', header:'Safety and Injury Reduction', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'Expl Consequence Analysis', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'Danger Areas', hasChild: true, selectedBackgroundColor: '#ff8f34'},
];
var blastAnalysisTitlesTable = Titanium.UI.createTableView({
    data:blastAnalysisTitlesData,
    style:Titanium.UI.iPhone.TableViewStyle.GROUPED
});

blastAnalysisWindow.add(blastAnalysisTitlesTable);

var tab2 = Titanium.UI.createTab({  
    icon:'tab_1.png',
    title:'Blast Analysis',
    window:blastAnalysisWindow
});

// create table view event listener
blastAnalysisTitlesTable.addEventListener('click', function(e){
	
	switch (e.rowData.title) {
		case 'Danger Areas': {
			
			var dangerAreasWindow = Titanium.UI.createWindow({  
			    title:'Danger Areas',
			    backgroundColor:'#eee',
			    barColor:'#ff8f34',
			});
			
			var dangerAreasContentView = Titanium.UI.createView({
			    height:'auto',
			    width:'100%',
			    backgroundColor:'#eee',
			    top:25,
			    left:0,
			    layout:'vertical'
			});		
			
			var dangerAreasLabel = Titanium.UI.createLabel({
				color:'#444',
				top:0,
				left: 25,
				width: 270,
				height:'auto', 
				text:'This tool estimates the appropriate safety distances to be used for Explosion Danger'
				+ ' Areas (including Fragmentation Hazard Zones) for multi-item ammunition disposal by open'
				+ ' detonation.\n\n'
				+ 'Note: The All Up Weight (AUW) is the total weight of the ammunition, not just the explosive mass.',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});		
			
			var dangerAreas2Label = Titanium.UI.createLabel({
				color:'#666',
				top:30,
				bottom: 30,
				left: 25,
				width: 270,
				height:'auto', 
				text:'The distances take no account of any tamping or protective works; in such cases professional judgment'
				+ ' should be applied by an appropriately trained and qualified individual.\n\n'
				+ 'The following equations are used to estimate the fragmentation hazard area ‘outside which one would not'
				+ ' normally expect more than one significant fragment to travel’.  The ‘Reduced Distance’ should only be used'
				+ ' where there is no immediate public access to the demolition area.\n\n'
				+ 'Normal Fragmentation Distance = 634 x AUW^(1/6)\n\n'
				+ 'Reduced Fragmentation Distance = 444 x AUW^(1/6)\n\n'
				+ 'Normal Blast Distance = 130 x AUW^(1/3)\n\n'
				+ 'Alternative Methodology\n\n'
				+ 'The Australian Defence Science and Technology Organisation (DSTO) conducted research in March 1997 into'
				+ ' multi-item demolition of ammunition and explosives. They concluded that fragmentation explosion danger'
				+ ' areas for multi-item demolitions can be reduced to that of the largest NEQ single munition in the'
				+ ' demolition provided:\n\n'
				+ 'a) the ordnance is arranged in a linear array and NOT a stack;\n\n'
				+ 'b) the ordnance is detonated simultaneously; and \n\n'
				+ 'c) the items are GREATER than one charge diameter apart.\n\n'
				+ 'In this case the formula to be applied would be:\n\n'
				+ 'R = 370 x (AUW)^(1/5)\n\n'
				+ 'Where,\n\n'
				+ '	R = Range (m)\n'
				+ '	AUW = All Up Weight (kg)\n\n'
				+ 'The formula contained within this application are applicable to the more complex scenario of stacked'
				+ ' ammunition disposal by open detonation.',
				font:{fontSize:14,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});					
			
			var line = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 269,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});		
			
			var line2 = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 379,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});		
			
			var dangerAreasCalculateButton = Titanium.UI.createButton({ 
				title: 'Calculate', 
				left: 25,
				top: 170,
				height: 40,
				backgroundImage: 'blue.png',
				width: '85%',
				font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			}); 
			
			dangerAreasCalculateButton.addEventListener('click',function(e) {
				
				var dangerAreasResultsWindow = Titanium.UI.createWindow({  
				    title:'Results',
				    backgroundColor:'#fff',
				    barColor:'#ff8f34',
				});
				
				dangerAreasResultsTitlesTable = Titanium.UI.createTableView({
				    data:getDangerAreasResultsTitleData(),
				    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
				    scrollable: false,
				});
				
				dangerAreasResultsTitlesTable.addEventListener('click', function(e){
					if(e.rowData.title != 'N/A') {
						var statusAlert = Titanium.UI.createAlertDialog({
							title: e.rowData.header,
							message: e.rowData.title,
							buttonNames: ['Copy', 'Back'],
						});
						statusAlert.addEventListener('click', function(ev) {
						    if (ev.index == 0) { // clicked "Copy"
						      Titanium.UI.Clipboard.setText(e.rowData.title);
						    } else if (ev.index == 1) { // clicked "back"
						      // do nothing
						    }
						  });			
						statusAlert.show();	
					}	
				});
				
				var dangerAreasResultsContentView = Titanium.UI.createView({
				    height:'auto',
				    width:'100%',
				    backgroundColor:'#eee',
				    top:280,
				    left:0,
				    layout:'vertical',
				    zIndex: 2,
				});			
				
				var line = Titanium.UI.createView({
				    width: "100%",
				    height: 1,
				    top: 0,
				    borderWidth: 1,
				    borderColor: "#777",
				    zIndex: 1000,
				});						
				
				var dangerAreasResultsLabel = Titanium.UI.createLabel({
					color:'#666',
					top:30,
					bottom: 30,
					left: 25,
					width: 270,
					height:'auto', 
					text:'Note:\n\n'
					+ 'For very large AUW the Danger Area for Bulk Explosive Only will be'
					+ ' greater than the Normal Fragmentation Distance.  This is a formularic'
					+ ' issue where the data input falls outside the experimental data used'
					+ ' to develop the formula. In these rare instances Users should use'
					+ ' professional judgment as to which would be the more appropriate distance'
					+ ' to apply in such cases.',
					font:{fontSize:14,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					shadowOffset:{x:1,y:1},
					shadowColor:'#fff'
				});					
				
				dangerAreasResultsContentView.add(line);
				dangerAreasResultsContentView.add(dangerAreasResultsLabel);
				
				var dangerAreasResultsScrollView = Titanium.UI.createScrollView({
				    contentHeight:'auto',
				});		
								
				dangerAreasResultsScrollView.add(dangerAreasResultsTitlesTable);
				dangerAreasResultsScrollView.add(dangerAreasResultsContentView);
				
				dangerAreasResultsWindow.add(dangerAreasResultsScrollView);
				
				tabGroup.activeTab.open(dangerAreasResultsWindow);	
			});		
			
			var dangerAreasTitlesData = [];
			
			
			var dangerAreasAllUpWeightRow = Ti.UI.createTableViewRow({
				title: '',
				header: 'All Up Weight (AUW)',
				selectedBackgroundColor: '#ff8f34',
			});
			
	        dangerAreasAllUpWeightField = Ti.UI.createTextField({ 
	            hintText:'Enter a All Up Weight',
	            height:42,
	            width:280,
	            top:0,
	            value: (measurement == 'Metric (SI)' ? roundNumber(dangerAreasAllUpWeight, 3) : roundNumber((parseFloat(dangerAreasAllUpWeight) * 2.20462), 3)),
	            left:10,
	            font:{fontSize:16, fontWeight: 'bold'},
	            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
	        });

	        dangerAreasAllUpWeightField.addEventListener('return', function(){	
				//check if value is a valid value
				if(isNumber(dangerAreasAllUpWeightField.value)) {
				    dangerAreasAllUpWeight = (measurement == 'Metric (SI)' ? parseFloat(dangerAreasAllUpWeightField.value) : (parseFloat(dangerAreasAllUpWeightField.value) * 0.453592));
				    Ti.App.Properties.setString("danger_areas_all_up_weight", JSON.stringify(dangerAreasAllUpWeight));
				} else {
					var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid Number',message: 'Please enter a valid All Up Weight'});
    				statusAlert.show();
					dangerAreasAllUpWeightField.value = (measurement == 'Metric (SI)' ? roundNumber(dangerAreasAllUpWeight, 3) : roundNumber((parseFloat(dangerAreasAllUpWeight) * 2.20462), 3));
				}
	        });		        
	        
			dangerAreasAllUpWeightFieldLabel = Titanium.UI.createLabel({ 
				color:'#444',
				top:0,
				left: 230,
				width: 45,
				height:42, 
				text: (measurement == 'Metric (SI)' ? 'kg' : 'lb'),
				
				font:{fontSize:16, fontWeight: 'bold'},
				textAlign:'right',
			});
				        
	        dangerAreasAllUpWeightField.add(dangerAreasAllUpWeightFieldLabel);
	        dangerAreasAllUpWeightRow.add(dangerAreasAllUpWeightField);		
			
			dangerAreasTitlesData.push(dangerAreasAllUpWeightRow);
			
			var dangerAreasTable = Titanium.UI.createTableView({
			    data:dangerAreasTitlesData,
			    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			    scrollable: false,
			    top: 270,
			    height: 110,
			});			
			
			var dangerAreasScrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			});			
			
			dangerAreasContentView.add(dangerAreasLabel);
			dangerAreasContentView.add(dangerAreasCalculateButton);
			dangerAreasContentView.add(dangerAreas2Label);
			
			dangerAreasScrollView.add(dangerAreasContentView);
			dangerAreasScrollView.add(dangerAreasTable);
			dangerAreasScrollView.add(line);
			dangerAreasScrollView.add(line2);
			
			dangerAreasWindow.add(dangerAreasScrollView);				
			
			tabGroup.activeTab.open(dangerAreasWindow);			
						
			break;
		}
		case 'Detonation Pressure': {
			
			var detonationPressureWindow = Titanium.UI.createWindow({  
			    title:'Detonation Pressure',
			    backgroundColor:'#eee',
			    barColor:'#ff8f34',
			});
			
			var detonationPressureContentView = Titanium.UI.createView({
			    height:'auto',
			    width:'100%',
			    backgroundColor:'#eee',
			    top:25,
			    left:0,
			    layout:'vertical'
			});		
			
			var detonationPressureLabel = Titanium.UI.createLabel({
				color:'#444',
				top:0,
				left: 25,
				width: 270,
				height:'auto', 
				text:'This tool provides an approximation of the detonation pressure'
				+ ' when given a limited range of values of an explosive compound.',
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			var line = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 139,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});		
			
			var line2 = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 339,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});		
			
			var detonationPressureTotalDescLabel = Titanium.UI.createLabel({
				color:'#444',
				top:250,
				left: 25,
				width: 270,
				height:'auto', 
				text:'Estimated Detonation Pressure:',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			detonationPressureTotalLabel = Titanium.UI.createLabel({
				color:'#000',
				top:0,
				left: 25,
				width: 270,
				height:'auto', 
				text: calculateDetonationPressureTotal(),
				bottom: 25,
				font:{fontSize:48,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});				
						
			
			var detonationPressureTitlesData = [];
			
			var detonationPressureDensityRow = Ti.UI.createTableViewRow({
				title: '',
				header: 'Density (d)',
				selectedBackgroundColor: '#ff8f34',
			});
			
	        detonationPressureDensityField = Ti.UI.createTextField({ 
	            hintText:'Enter a Density',
	            height:42,
	            width:280,
	            top:0,
	            value: (measurement == 'Metric (SI)' ? roundNumber(detonationPressureDensity, 3) : 
	            	(measurement == 'UK Imperial' ? roundNumber(parseFloat(detonationPressureDensity) * 0.01022412855, 3) : roundNumber(parseFloat(detonationPressureDensity * 0.0083454044873), 3))),
	            left:10,
	            font:{fontSize:16, fontWeight: 'bold'},
	            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
	        });
	        detonationPressureDensityField.addEventListener('return', function(){	
				applyDetonationPressureDensityField();
	        });	
	        detonationPressureDensityField.addEventListener('blur', function(){	
				applyDetonationPressureDensityField();
	        });		        
	        
	        detonationPressureDensityFieldLabel = Titanium.UI.createLabel({ 
				color:'#444',
				top:0,
				left: 230,
				width: 45,
				height:42, 
				text: (measurement == 'Metric (SI)' ? 'kg/m³' : 'lb/gal'),
				
				font:{fontSize:16, fontWeight: 'bold'},
				textAlign:'right',
			});
	        
	        detonationPressureDensityField.add(detonationPressureDensityFieldLabel);
	        detonationPressureDensityRow.add(detonationPressureDensityField);		
			detonationPressureTitlesData.push(detonationPressureDensityRow);	        
	        
	      	var detonationPressureVelocityOfDetonationRow = Ti.UI.createTableViewRow({
				title: '',
				header: 'Velocity of Detonation (VD)',
				selectedBackgroundColor: '#ff8f34',
			});
			
	        detonationPressureVelocityOfDetonationField = Ti.UI.createTextField({ 
	            hintText:'Enter a Velocity of Detonation',
	            height:42,
	            width:280,
	            top:0,
	            value: (measurement == 'Metric (SI)' ? roundNumber(detonationPressureVelocityOfDetonation, 3) : roundNumber(parseFloat(detonationPressureVelocityOfDetonation) * 3.2808399, 3)),
	            left:10,
	            font:{fontSize:16, fontWeight: 'bold'},
	            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
	        });	
	        detonationPressureVelocityOfDetonationField.addEventListener('return', function(){	
				applyDetonationPressureVelocityOfDetonationField();
	        });
	       	detonationPressureVelocityOfDetonationField.addEventListener('blur', function(){	
				applyDetonationPressureVelocityOfDetonationField();
	        });		
	        	        
			detonationPressureVelocityOfDetonationFieldLabel = Titanium.UI.createLabel({ 
				color:'#444',
				top:0,
				left: 230,
				width: 45,
				height:42, 
				text: (measurement == 'Metric (SI)' ? 'm/s' : 'ft/sec'),
				
				font:{fontSize:16, fontWeight: 'bold'},
				textAlign:'right',
			});
				        
	        detonationPressureVelocityOfDetonationField.add(detonationPressureVelocityOfDetonationFieldLabel);
	        detonationPressureVelocityOfDetonationRow.add(detonationPressureVelocityOfDetonationField);		
			detonationPressureTitlesData.push(detonationPressureVelocityOfDetonationRow);
			
			var detonationPressureTable = Titanium.UI.createTableView({
			    data:detonationPressureTitlesData,
			    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			    scrollable: false,
			    top: 140,
			    height: 200,
			});			
			
			var detonationPressureScrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			});			
			
			detonationPressureContentView.add(detonationPressureLabel);
			detonationPressureContentView.add(detonationPressureTotalDescLabel);
			detonationPressureContentView.add(detonationPressureTotalLabel);
			
			
			detonationPressureScrollView.add(detonationPressureContentView);
			detonationPressureScrollView.add(detonationPressureTable);
			detonationPressureScrollView.add(line);
			detonationPressureScrollView.add(line2);
			
			detonationPressureWindow.add(detonationPressureScrollView);				
			
			tabGroup.activeTab.open(detonationPressureWindow);
						
			break;
		}
		case 'Expl Consequence Analysis': {
			
			var consequenceWindow = Titanium.UI.createWindow({  
			    title:'Expl Consequence Analysis',
			    backgroundColor:'#eee',
			    barColor:'#ff8f34',
			});
			
			var consequenceContentView = Titanium.UI.createView({
			    height:'auto',
			    width:'100%',
			    backgroundColor:'#eee',
			    top:25,
			    left:0,
			    layout:'vertical'
			});			
			
			var consequenceLabel = Titanium.UI.createLabel({
				color:'#444',
				top:0,
				left: 25,
				width: 270,
				height:'auto', 
				text:'This tool estimates the damage to a human (70kg Man) to be expected from an explosively'
				+ ' generated blast wave.  The results shown are for a Hemi-Spherical Charge Surface Burst, as'
				+ ' this most replicates real life scenarios.\n\n'
				+ 'The peak reflected pressure calculated is compared against the threshold levels'
				+ ' and a Red (Danger/Intolerable Risk) or Green (Tolerable Risk) indicator is shown.',

				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});			
			
			var consequence2Label = Titanium.UI.createLabel({
				color:'#666',
				top:30,
				bottom: 30,
				left: 25,
				width: 270,
				height:'auto', 
				text:'The biological effect of a short rising blast pressure will be the same between the incident pressure, '
				+ 'incident pressure plus the dynamic pressure and the reflected pressure. Therefore the damage caused to a human'
				+ ' is specific only to the maximum pressure and not the pressure type.\n\n' 
				+ 'A human ear will rupture at 34.5 KPa regardless of whether it is reflected or incident pressure,'
				+ ' so only the maximum effective pressure needs considering, which equate to the pressure type with the'
				+ ' highest value. In this case where we are considering the effect on standing humans, the reflected pressure'
				+ ' will usually be the greatest pressure type at a specific distance.',
				font:{fontSize:14,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});					
			
			var line = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 344,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});		
			
			var line2 = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 634,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});
			
			var consequenceCalculateButton = Titanium.UI.createButton({ 
				title: 'Calculate', 
				left: 25,
				top: 350,
				height: 40,
				backgroundImage: 'blue.png',
				width: '85%',
				font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			}); 
			
			consequenceCalculateButton.addEventListener('click',function(e) {
				
				var consequenceResultsWindow = Titanium.UI.createWindow({  
				    title:'Results',
				    backgroundColor:'#fff',
				    barColor:'#ff8f34',
				});
				
				
				var consequenceResultsContentView = Titanium.UI.createView({
				    height:'auto',
				    width:'100%',
				    backgroundColor:'#eee',
				    top:0,
				    left:0,
				    layout:'vertical'
				});		
				
				var consequenceResultsDescLabel = Titanium.UI.createLabel({
					color:'#444',
					top:25,
					left: 25,
					width: 270,
					height:'auto', 
					text:'Peak Reflected Pressure:',
					
					font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
					textAlign:'left',
					shadowOffset:{x:1,y:1},
					shadowColor:'#fff'
				});
				
				consequenceResultsLabel = Titanium.UI.createLabel({
					color:'#000',
					top:0,
					left: 25,
					width: 270,
					height:40, 
					text: calculatePeakReflectedPressure(consequenceChargeMass, tntItem[consequenceTNTEquivalence].equivalence, consequenceStandoffDistance),
					
					font:{fontSize:36,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					shadowOffset:{x:1,y:1},
					shadowColor:'#fff'
				});		
							
				var line = Titanium.UI.createView({
				    width: "100%",
				    height: 1,
				    top: 109,
				    borderWidth: 1,
				    borderColor: "#777",
				    zIndex: 1000,
				});		
				
				consequenceResultsContentView.add(consequenceResultsDescLabel);
				consequenceResultsContentView.add(consequenceResultsLabel);				
				
				consequenceResultsTitlesTable = Titanium.UI.createTableView({
				    data:getConsequenceResultsTitleData(),
				    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
				    top: 110,
				});
				
				consequenceResultsWindow.add(consequenceResultsContentView);
				consequenceResultsWindow.add(consequenceResultsTitlesTable);
				consequenceResultsWindow.add(line);
				
				tabGroup.activeTab.open(consequenceResultsWindow);	
			});		
			
			var consequenceTitlesData = [];
			
			
			var consequenceMassRow = Ti.UI.createTableViewRow({
				title: '',
				header: 'Charge Mass',
				selectedBackgroundColor: '#ff8f34',
			});
			
	        consequenceChargeMassField = Ti.UI.createTextField({ 
	            hintText:'Enter a Charge Mass',
	            height:42,
	            width:280,
	            top:0,
	            value: (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseChargeMass, 3) : roundNumber((parseFloat(pressureImpulseChargeMass) * 2.20462), 3)),
	            left:10,
	            font:{fontSize:16, fontWeight: 'bold'},
	            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
	        });
	        consequenceChargeMassField.addEventListener('blur', function(){	
				applyConsequenceChargeMassField();
	        });		 
	        consequenceChargeMassField.addEventListener('return', function(){	
				applyConsequenceChargeMassField();
	        });		        
	        
			consequenceChargeMassFieldLabel = Titanium.UI.createLabel({ 
				color:'#444',
				top:0,
				left: 230,
				width: 45,
				height:42, 
				text: (measurement == 'Metric (SI)' ? 'kg' : 'lb'),
				
				font:{fontSize:16, fontWeight: 'bold'},
				textAlign:'right',
			});
				        
	        consequenceChargeMassField.add(consequenceChargeMassFieldLabel);
	        consequenceMassRow.add(consequenceChargeMassField);		
			
			consequenceTitlesData.push(consequenceMassRow);
			
			var consequenceEquivalenceRow = Ti.UI.createTableViewRow({
				title: consequenceTNTEquivalence,
				header: 'TNT Equivalence',
				hasChild: true,
				selectedBackgroundColor: '#ff8f34',
			});		
			
			consequenceEquivalenceRow.addEventListener('click', function(e){
				
				consequenceTNTEquivalenceTable = Titanium.UI.createTableView({
				    data: getConsequenceTNTEquivalenceData(),
				});
				
				consequenceTNTEquivalenceTable.addEventListener('click', function(e){
					consequenceTNTEquivalence = e.rowData.title;
					Ti.App.Properties.setString("pressure_impulse_tnt_equivalence", JSON.stringify(consequenceTNTEquivalence));
					
					consequenceTNTEquivalenceTable.setData(getConsequenceTNTEquivalenceData());
					
					consequenceEquivalenceRow.title = e.rowData.title;
				});

				var consequenceTNTEquivalenceWindow = Titanium.UI.createWindow({  
				    title:'TNT Equivalence',
				    backgroundColor:'#fff',
				    barColor:'#ff8f34',
				});
				
				consequenceTNTEquivalenceWindow.add(consequenceTNTEquivalenceTable);
				
				tabGroup.activeTab.open(consequenceTNTEquivalenceWindow);

			});				
			
			consequenceTitlesData.push(consequenceEquivalenceRow);
			
			var consequenceStandoffDistanceRow = Ti.UI.createTableViewRow({
				title: '',
				header: 'Stand-off Distance',
				selectedBackgroundColor: '#ff8f34',
			});
			
	        consequenceStandoffDistanceField = Ti.UI.createTextField({ 
	            hintText:'Enter a Stand-off Distance',
	            height:42,
	            width:280,
	            top:0,
	            value: (measurement == 'Metric (SI)' ? roundNumber(consequenceStandoffDistance, 3) : roundNumber((parseFloat(consequenceStandoffDistance) * 3.2808399), 3)),
	            left:10,
	            font:{fontSize:16, fontWeight: 'bold'},
	            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
	        });
        
	        consequenceStandoffDistanceField.addEventListener('blur', function(){	
				applyConsequenceStandoffDistanceField();
	        });		        
	        consequenceStandoffDistanceField.addEventListener('return', function(){	
				applyConsequenceStandoffDistanceField();
	        });		        
	        
			consequenceStandoffDistanceFieldLabel = Titanium.UI.createLabel({ 
				color:'#444',
				top:0,
				left: 230,
				width: 45,
				height:42, 
				text: (measurement == 'Metric (SI)' ? 'm' : 'ft'),
				
				font:{fontSize:16, fontWeight: 'bold'},
				textAlign:'right',
			});
				        
	        consequenceStandoffDistanceField.add(consequenceStandoffDistanceFieldLabel);
	        consequenceStandoffDistanceRow.add(consequenceStandoffDistanceField);		
			
			consequenceTitlesData.push(consequenceStandoffDistanceRow);			
			
			var consequenceTable = Titanium.UI.createTableView({
			    data:consequenceTitlesData,
			    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			    scrollable: false,
			    top: 345,
			    height: 290,
			});
					
			
			var consequenceScrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			});


			consequenceContentView.add(consequenceLabel);
			consequenceContentView.add(consequenceCalculateButton);
			consequenceContentView.add(consequence2Label);
			

			consequenceScrollView.add(line);
			consequenceScrollView.add(line2);
			consequenceScrollView.add(consequenceContentView);			
			consequenceScrollView.add(consequenceTable);


			consequenceWindow.add(consequenceScrollView);
						
			tabGroup.activeTab.open(consequenceWindow);	
									
			break;
		}		
		case 'Pressure / Impulse': {
			
			var pressureImpulseWindow = Titanium.UI.createWindow({  
			    title:'Back',
			    backgroundColor:'#eee',
			    barColor:'#ff8f34',
			});
			
			var pressureImpulseContentView = Titanium.UI.createView({
			    height:'auto',
			    width:'100%',
			    backgroundColor:'#eee',
			    top:25,
			    left:0,
			    layout:'vertical'
			});			
			
			var pressureImpulseLabel = Titanium.UI.createLabel({
				color:'#444',
				top:0,
				left: 25,
				width: 270,
				height:'auto', 
				text:'This tool estimates the pressure and impulse data from the given data.'
				+ ' The results shown are for a Hemi-Spherical Charge Surface Burst, as this'
				+ ' most replicates real life scenarios:',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});			
			
			var line = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 174,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});		
			
			var line2 = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 464,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});
			
			var pressureImpulseCalculateButton = Titanium.UI.createButton({ 
				title: 'Calculate', 
				left: 25,
				top: 350,
				bottom: 30,
				height: 40,
				backgroundImage: 'blue.png',
				width: '85%',
				font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			}); 
			
			pressureImpulseCalculateButton.addEventListener('click',function(e) {
				
				var pressureImpulseResultsWindow = Titanium.UI.createWindow({  
				    title:'Results',
				    backgroundColor:'#fff',
				    barColor:'#ff8f34',
				});
				
				pressureImpulseResultsTitlesTable = Titanium.UI.createTableView({
				    data:getPressureImpulseResultsTitleData(),
				    style:Titanium.UI.iPhone.TableViewStyle.GROUPED
				});
				
				pressureImpulseResultsTitlesTable.addEventListener('click', function(e){
					if(e.rowData.title != 'N/A') {
						var statusAlert = Titanium.UI.createAlertDialog({
							title: e.rowData.header,
							message: e.rowData.title,
							buttonNames: ['Copy', 'Back'],
						});
						statusAlert.addEventListener('click', function(ev) {
						    if (ev.index == 0) { // clicked "Copy"
						      Titanium.UI.Clipboard.setText(e.rowData.title);
						    } else if (ev.index == 1) { // clicked "back"
						      // do nothing
						    }
						  });			
						statusAlert.show();	
					}	
				});				
				
				pressureImpulseResultsWindow.add(pressureImpulseResultsTitlesTable);
				
				tabGroup.activeTab.open(pressureImpulseResultsWindow);	
			});		
			
			var pressureImpulseTitlesData = [];
			
			
			var pressureImpulseMassRow = Ti.UI.createTableViewRow({
				title: '',
				header: 'Charge Mass',
				selectedBackgroundColor: '#ff8f34',
			});
			
	        pressureImpulseChargeMassField = Ti.UI.createTextField({ 
	            hintText:'Enter a Charge Mass',
	            height:42,
	            width:280,
	            top:0,
	            value: (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseChargeMass, 3) : roundNumber((parseFloat(pressureImpulseChargeMass) * 2.20462), 3)),
	            left:10,
	            font:{fontSize:16, fontWeight: 'bold'},
	            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
	        });
	        pressureImpulseChargeMassField.addEventListener('blur', function(){	
				applyPressureImpulseChargeMassField();
	        });		
	        pressureImpulseChargeMassField.addEventListener('return', function(){	
				applyPressureImpulseChargeMassField();
	        });		        
	        
			pressureImpulseChargeMassFieldLabel = Titanium.UI.createLabel({ 
				color:'#444',
				top:0,
				left: 230,
				width: 45,
				height:42, 
				text: (measurement == 'Metric (SI)' ? 'kg' : 'lb'),
				
				font:{fontSize:16, fontWeight: 'bold'},
				textAlign:'right',
			});
				        
	        pressureImpulseChargeMassField.add(pressureImpulseChargeMassFieldLabel);
	        pressureImpulseMassRow.add(pressureImpulseChargeMassField);		
			
			pressureImpulseTitlesData.push(pressureImpulseMassRow);
			
			var pressureImpulseEquivalenceRow = Ti.UI.createTableViewRow({
				title: pressureImpulseTNTEquivalence,
				header: 'TNT Equivalence',
				hasChild: true,
				selectedBackgroundColor: '#ff8f34',
			});		
			
			pressureImpulseEquivalenceRow.addEventListener('click', function(e){
				
				pressureImpulseTNTEquivalenceTable = Titanium.UI.createTableView({
				    data: getPressureImpulseTNTEquivalenceData(),
				});
				
				pressureImpulseTNTEquivalenceTable.addEventListener('click', function(e){
					pressureImpulseTNTEquivalence = e.rowData.title;
					Ti.App.Properties.setString("pressure_impulse_tnt_equivalence", JSON.stringify(pressureImpulseTNTEquivalence));
					
					pressureImpulseTNTEquivalenceTable.setData(getPressureImpulseTNTEquivalenceData());
					
					pressureImpulseEquivalenceRow.title = e.rowData.title;
				});

				var pressureImpulseTNTEquivalenceWindow = Titanium.UI.createWindow({  
				    title:'TNT Equivalence',
				    backgroundColor:'#fff',
				    barColor:'#ff8f34',
				});
				
				pressureImpulseTNTEquivalenceWindow.add(pressureImpulseTNTEquivalenceTable);
				
				tabGroup.activeTab.open(pressureImpulseTNTEquivalenceWindow);

			});				
			
			pressureImpulseTitlesData.push(pressureImpulseEquivalenceRow);
			
			var pressureImpulseStandoffDistanceRow = Ti.UI.createTableViewRow({
				title: '',
				header: 'Stand-off Distance',
				selectedBackgroundColor: '#ff8f34',
			});
			
	        pressureImpulseStandoffDistanceField = Ti.UI.createTextField({ 
	            hintText:'Enter a Stand-off Distance',
	            height:42,
	            width:280,
	            top:0,
	            value: (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseStandoffDistance, 3) : roundNumber((parseFloat(pressureImpulseStandoffDistance) * 3.2808399), 3)),
	            left:10,
	            font:{fontSize:16, fontWeight: 'bold'},
	            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
	        });
        
	        pressureImpulseStandoffDistanceField.addEventListener('blur', function(){	
				applyPressureImpulseStandoffDistanceField();
	        });	        
	        pressureImpulseStandoffDistanceField.addEventListener('return', function(){	
				applyPressureImpulseStandoffDistanceField();
	        });		        
	        
			pressureImpulseStandoffDistanceFieldLabel = Titanium.UI.createLabel({ 
				color:'#444',
				top:0,
				left: 230,
				width: 45,
				height:42, 
				text: (measurement == 'Metric (SI)' ? 'm' : 'ft'),
				
				font:{fontSize:16, fontWeight: 'bold'},
				textAlign:'right',
			});
				        
	        pressureImpulseStandoffDistanceField.add(pressureImpulseStandoffDistanceFieldLabel);
	        pressureImpulseStandoffDistanceRow.add(pressureImpulseStandoffDistanceField);		
			
			pressureImpulseTitlesData.push(pressureImpulseStandoffDistanceRow);			
			
			var pressureImpulseTable = Titanium.UI.createTableView({
			    data:pressureImpulseTitlesData,
			    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			    scrollable: false,
			    top: 175,
			    height: 290,
			});
					
			
			var pressureImpulseScrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			});


			pressureImpulseContentView.add(pressureImpulseLabel);
			pressureImpulseContentView.add(pressureImpulseCalculateButton);
			

			pressureImpulseScrollView.add(line);
			pressureImpulseScrollView.add(line2);
			pressureImpulseScrollView.add(pressureImpulseContentView);			
			pressureImpulseScrollView.add(pressureImpulseTable);


			pressureImpulseWindow.add(pressureImpulseScrollView);
						
			tabGroup.activeTab.open(pressureImpulseWindow);	
									
			break;
		}
		case 'Acoustic (Noise) Estimates': {
			
			var acousticEstimatesWindow = Titanium.UI.createWindow({  
			    title:'Acoustic Estimates',
			    backgroundColor:'#eee',
			    barColor:'#ff8f34',
			});
			
			var acousticEstimatesContentView = Titanium.UI.createView({
			    height:'auto',
			    width:'100%',
			    backgroundColor:'#eee',
			    top:25,
			    left:0,
			    layout:'vertical'
			});
			
			var acousticEstimatesLabel = Titanium.UI.createLabel({
				color:'#444',
				top:0,
				left: 25,
				width: 270,
				height:'auto', 
				text:'This tool estimates the distance at which an acoustic level'
				+ ' of 140dB(C) should be expected under average ambient conditions,'
				+ ' from an un-tamped explosion.\n\n'
				//+ 'Users should note that it is only an estimation based on the generally accepted'
				//+ ' simple formula of 215 x (Charge Mass x TNT Equivalence) ^(1/3).\n\n'
				+ 'Fill in the fields below and the tool will esimate the distance.'
				+ ' Users should note that this estimation is highly conservative:',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			var acousticEstimates2Label = Titanium.UI.createLabel({
				color:'#666',
				top:20,
				bottom: 30,
				left: 25,
				width: 270,
				height:'auto', 
				text:'This level is the maximum Exposure Limit Value Level (ELV) above which'
				+ ' mitigation activities should be initiated to reduce noise exposure for humans.\n\n'
				+ 'Users should note that it is only an estimation based on the generally accepted'
				+ ' simple formula of 215 x (Charge Mass x TNT Equivalence)^(1/3).\n\n'
				+ 'Users should always'
				+ ' comply with the requirements of national legislation for the accurate measurement'
				+ ' of acoustic levels when conducting logistic level or industrial explosive related'
				+ ' operations.  The formula is, however, useful for the conduct of response EOD operations.',
				
				font:{fontSize:14,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});			
			
			var acousticTotalDescLabel = Titanium.UI.createLabel({
				color:'#444',
				top:250,
				left: 25,
				width: 270,
				height:'auto', 
				text:'Estimated Distance:',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			acousticTotalLabel = Titanium.UI.createLabel({
				color:'#000',
				top:0,
				left: 25,
				width: 270,
				height:'auto', 
				text: calculateAcousticTotal(),
				
				font:{fontSize:48,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});		
						
			var line = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 259,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});		
			
			var line2 = Titanium.UI.createView({
			    width: "100%",
			    height: 1,
			    top: 459,
			    borderWidth: 1,
			    borderColor: "#777",
			    zIndex: 1000,
			});		
			
			var acousticEstimatesTitlesData = [];
			
			var acousticEstimatesMassRow = Ti.UI.createTableViewRow({
				title: '',
				header: 'Charge Mass (M)',
				selectedBackgroundColor: '#ff8f34',
			});
			
	        acousticEstimatesMassField = Ti.UI.createTextField({ 
	            hintText:'Enter a Charge Mass',
	            height:42,
	            width:280,
	            top:0,
	            value: (measurement == 'Metric (SI)' ? roundNumber(acousticEstimatesChargeMass, 3) : roundNumber((parseFloat(acousticEstimatesChargeMass) * 2.20462), 3)),
	            left:10,
	            font:{fontSize:16, fontWeight: 'bold'},
	            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
	        });
	        acousticEstimatesMassField.addEventListener('return', function(){	
				//check if value is a valid value
				if(isNumber(acousticEstimatesMassField.value)) {
				    acousticEstimatesChargeMass = (measurement == 'Metric (SI)' ? parseFloat(acousticEstimatesMassField.value) : (parseFloat(acousticEstimatesMassField.value) * 0.453592));
				    Ti.App.Properties.setString("acoustic_esimates_charge_mass", JSON.stringify(acousticEstimatesChargeMass));
					//update total
				    acousticTotalLabel.text = calculateAcousticTotal();
				} else {
					var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid Number',message: 'Please enter a valid charge mass'});
    				statusAlert.show();
					acousticEstimatesMassField.value = (measurement == 'Metric (SI)' ? roundNumber(acousticEstimatesChargeMass, 3) : roundNumber((parseFloat(acousticEstimatesChargeMass) * 2.20462), 3));
				}
	        });		        
	        
			acousticEstimatesMassFieldLabel = Titanium.UI.createLabel({ 
				color:'#444',
				top:0,
				left: 230,
				width: 45,
				height:42, 
				text: (measurement == 'Metric (SI)' ? 'kg' : 'lb'),
				
				font:{fontSize:16, fontWeight: 'bold'},
				textAlign:'right',
			});
				        
	        acousticEstimatesMassField.add(acousticEstimatesMassFieldLabel);
	        acousticEstimatesMassRow.add(acousticEstimatesMassField);		
			
			acousticEstimatesTitlesData.push(acousticEstimatesMassRow);
			
			var acousticEstimatesEquivalenceRow = Ti.UI.createTableViewRow({
				title: acousticEstimatesTNTEquivalence,
				header: 'TNT Equivalence',
				hasChild: true,
				selectedBackgroundColor: '#ff8f34',
			});		
			
			acousticEstimatesTitlesData.push(acousticEstimatesEquivalenceRow);
			
			var acousticEstimatesTable = Titanium.UI.createTableView({
			    data:acousticEstimatesTitlesData,
			    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			    scrollable: false,
			    top: 260,
			    height: 200,
			});
			
			acousticEstimatesTable.addEventListener('click', function(e){
				
				
				acousticEstimatesTNTEquivalenceTable = Titanium.UI.createTableView({
				    data: getAcousticEstimatesTNTEquivalenceData(),
				});
				
				acousticEstimatesTNTEquivalenceTable.addEventListener('click', function(e){
					acousticEstimatesTNTEquivalence = e.rowData.title;
					Ti.App.Properties.setString("acoustic_esimates_tnt_equivalence", JSON.stringify(acousticEstimatesTNTEquivalence));
					
					acousticEstimatesTNTEquivalenceTable.setData(getAcousticEstimatesTNTEquivalenceData());
					
					acousticEstimatesEquivalenceRow.title = e.rowData.title;
					acousticTotalLabel.text = calculateAcousticTotal();
				});

				var acousticEstimatesTNTEquivalenceWindow = Titanium.UI.createWindow({  
				    title:'TNT Equivalence',
				    backgroundColor:'#fff',
				    barColor:'#ff8f34',
				});
				
				acousticEstimatesTNTEquivalenceWindow.add(acousticEstimatesTNTEquivalenceTable);
				
				tabGroup.activeTab.open(acousticEstimatesTNTEquivalenceWindow);

			});

			var acousticEstimatesScrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			});


			acousticEstimatesContentView.add(acousticEstimatesLabel);
			acousticEstimatesContentView.add(acousticTotalDescLabel);
			acousticEstimatesContentView.add(acousticTotalLabel);
			acousticEstimatesContentView.add(acousticEstimates2Label);
			
			acousticEstimatesScrollView.add(line);
			acousticEstimatesScrollView.add(line2);
			acousticEstimatesScrollView.add(acousticEstimatesContentView);
			acousticEstimatesScrollView.add(acousticEstimatesTable);
			
			acousticEstimatesWindow.add(acousticEstimatesScrollView);
						
			tabGroup.activeTab.open(acousticEstimatesWindow);
						
			break;
		}
	}


});


var settingsWindow = Titanium.UI.createWindow({  
    title:'Settings',
    backgroundColor:'#eee',
    barColor:'#ff8f34',
});

var settingsRow = Ti.UI.createTableViewRow({
	title: measurement,
	header: 'Units displayed',
	selectedBackgroundColor: '#ff8f34',
});

var settingsPickerView = Titanium.UI.createView({
	height:251,
	bottom:-251
});

var slideInSettingsPickerView =  Titanium.UI.createAnimation({bottom:0});
var slideOutSettingsPickerView =  Titanium.UI.createAnimation({bottom:-251});

var settingsData = [];

var settingsPicker = Ti.UI.createPicker({
	top:43	
});
settingsPicker.selectionIndicator=true;

var settingsPickerData = [
	Titanium.UI.createPickerRow({title:'Metric (SI)'}),
	Titanium.UI.createPickerRow({title:'UK Imperial'}),
	Titanium.UI.createPickerRow({title:'US Imperial'}),
];

 
settingsPicker.add(settingsPickerData);

settingsWindow.addEventListener('open', function() {

	switch (measurement) {
		case 'Metric (SI)': {
			settingsPicker.setSelectedRow(0, 0, false);
			break
		}
		case 'UK Imperial': {
			settingsPicker.setSelectedRow(0, 1, false);
			break
		}
			case 'US Imperial': {
			settingsPicker.setSelectedRow(0, 2, false);
			break
		}
	}
});


var settingsPickerCancel =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
 
var settingsPickerDone =  Titanium.UI.createButton({
	title:'Done',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
 
var settingsPickerSpacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

settingsRow.addEventListener('click',function() {
	settingsPickerView.animate(slideInSettingsPickerView);
});
 
settingsPickerCancel.addEventListener('click',function() {
	settingsPickerView.animate(slideOutSettingsPickerView);
});

settingsPickerDone.addEventListener('click',function() {
	settingsRow.title =  settingsPicker.getSelectedRow(0).title;
	measurement = settingsPicker.getSelectedRow(0).title;
	settingsPickerView.animate(slideOutSettingsPickerView);
	Ti.App.Properties.setString("measurement", JSON.stringify(measurement));
	
	//update the data window if exits
	if(explosiveTable != undefined) {
		explosiveTable.setData(getExplosiveTableData());
	}
	
	if(acousticTotalLabel != undefined) {
		acousticTotalLabel.text = calculateAcousticTotal();
	}
	
	if(detonationPressureTotalLabel != undefined) {
		detonationPressureTotalLabel.text = calculateDetonationPressureTotal();
	}	
	
	if(acousticEstimatesMassFieldLabel != undefined) {
		acousticEstimatesMassFieldLabel.text =  (measurement == 'Metric (SI)' ? 'kg' : 'lb');
	}	
	
	if(acousticEstimatesMassField != undefined) {
		acousticEstimatesMassField.value =  (measurement == 'Metric (SI)' ? roundNumber(acousticEstimatesChargeMass,3) : roundNumber((parseFloat(acousticEstimatesChargeMass) * 2.20462), 3));
	}		
	
	if(detonationPressureDensityFieldLabel != undefined) {
		detonationPressureDensityFieldLabel.text =  (measurement == 'Metric (SI)' ? 'kg/m³' : 'lb/gal');
	}		
					
	if(detonationPressureDensityField != undefined) {
		detonationPressureDensityField.value =  (measurement == 'Metric (SI)' ? roundNumber(detonationPressureDensity, 3) : 
	            	(measurement == 'UK Imperial' ? roundNumber(parseFloat(detonationPressureDensity) * 0.01022412855, 3) : roundNumber(parseFloat(detonationPressureDensity * 0.0083454044873), 3)));
	}	
	
	if(detonationPressureVelocityOfDetonationFieldLabel != undefined) {
		detonationPressureVelocityOfDetonationFieldLabel.text = (measurement == 'Metric (SI)' ? 'm/s' : 'ft/sec');
	}		
	
	if(detonationPressureVelocityOfDetonationField != undefined) {
		detonationPressureVelocityOfDetonationField.value =  (measurement == 'Metric (SI)' ? roundNumber(detonationPressureVelocityOfDetonation, 3) : roundNumber(parseFloat(detonationPressureVelocityOfDetonation) * 3.2808399, 3));
	}			
	
	if(pressureImpulseChargeMassFieldLabel != undefined) {
		pressureImpulseChargeMassFieldLabel.text =  (measurement == 'Metric (SI)' ? 'kg' : 'lb');
	}		
	
	if(pressureImpulseChargeMassField != undefined) {
		pressureImpulseChargeMassField.value =  (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseChargeMass,3) : roundNumber((parseFloat(pressureImpulseChargeMass) * 2.20462), 3));
	}	
	
	if(pressureImpulseStandoffDistanceFieldLabel != undefined) {
		pressureImpulseStandoffDistanceFieldLabel.text =  (measurement == 'Metric (SI)' ? 'm' : 'ft');
	}		
	
	if(pressureImpulseStandoffDistanceField != undefined) {
		pressureImpulseStandoffDistanceField.value =  (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseStandoffDistance, 3) : roundNumber((parseFloat(pressureImpulseStandoffDistance) * 3.2808399), 3));
	}
	
	if(pressureImpulseResultsTitlesTable != undefined) {
		pressureImpulseResultsTitlesTable.setData(getPressureImpulseResultsTitleData());
	}	
	
	if(consequenceChargeMassFieldLabel != undefined) {
		consequenceChargeMassFieldLabel.text =  (measurement == 'Metric (SI)' ? 'kg' : 'lb');
	}		
	
	if(consequenceChargeMassField != undefined) {
		consequenceChargeMassField.value =  (measurement == 'Metric (SI)' ? roundNumber(consequenceChargeMass,3) : roundNumber((parseFloat(consequenceChargeMass) * 2.20462), 3));
	}	
	
	if(consequenceStandoffDistanceFieldLabel != undefined) {
		consequenceStandoffDistanceFieldLabel.text =  (measurement == 'Metric (SI)' ? 'm' : 'ft');
	}		
	
	if(consequenceStandoffDistanceField != undefined) {
		consequenceStandoffDistanceField.value =  (measurement == 'Metric (SI)' ? roundNumber(consequenceStandoffDistance, 3) : roundNumber((parseFloat(consequenceStandoffDistance) * 3.2808399), 3));
	}	
	
	if(consequenceResultsTitlesTable != undefined) {
		consequenceResultsTitlesTable.setData(getConsequenceResultsTitleData());
	}		
	
	if(consequenceResultsLabel != undefined) {
		consequenceResultsLabel.text = calculatePeakReflectedPressure(consequenceChargeMass, tntItem[consequenceTNTEquivalence].equivalence, consequenceStandoffDistance);
	}			
	
	if(dangerAreasResultsTitlesTable != undefined) {
		dangerAreasResultsTitlesTable.setData(getDangerAreasResultsTitleData());
	}				
	
	if(dangerAreasAllUpWeightFieldLabel != undefined) {
		dangerAreasAllUpWeightFieldLabel.text =  (measurement == 'Metric (SI)' ? 'kg' : 'lb');
	}		
	
	if(dangerAreasAllUpWeightField != undefined) {
		dangerAreasAllUpWeightField.value =  (measurement == 'Metric (SI)' ? roundNumber(dangerAreasAllUpWeight,3) : roundNumber((parseFloat(dangerAreasAllUpWeight) * 2.20462), 3));
	}	
	
});

var settingsPickerToolbar =  Titanium.UI.iOS.createToolbar({
	top:0,
	items:[settingsPickerCancel,settingsPickerSpacer,settingsPickerDone],
	barColor: '#000',
});

settingsPickerView.add(settingsPickerToolbar);
settingsPickerView.add(settingsPicker);

//settingsRow.add(settingsPicker);

settingsData.push(settingsRow);
    
var settingsTable = Titanium.UI.createTableView({
    data:settingsData,
    style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
    rowHeight: 50,
});


settingsWindow.add(settingsTable);
settingsWindow.add(settingsPickerView);



var tab3 = Titanium.UI.createTab({  
    icon:'tab_3.png',
    title:'Settings',
    window:settingsWindow
});

var moreWindow = Titanium.UI.createWindow({  
    title:'More',
    backgroundColor:'#eee',
    barColor:'#ff8f34',
});

var moreTitlesData = [
    {title:'Risk Management', header:'', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'About', header:'', hasChild: true, selectedBackgroundColor: '#ff8f34'},
	{title:'Tell a Friend', header:'',  selectedBackgroundColor: '#ff8f34'},    
    {title:'Terms and Conditions', header:'', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    //{title:'Vote for this app', selectedBackgroundColor: '#ff8f34'},
];
var moreTitlesTable = Titanium.UI.createTableView({
    data:moreTitlesData,
    style:Titanium.UI.iPhone.TableViewStyle.GROUPED
});

// create table view event listener
moreTitlesTable.addEventListener('click', function(e){
	switch (e.rowData.title) {
		case 'Tell a Friend': {
			var emailDialog = Titanium.UI.createEmailDialog();
			
			emailDialog.subject = "Take a look at this iPhone app";
			emailDialog.toRecipients = [];
			emailDialog.messageBody = 'Hello,\n\n' 
			+ 'I recently downloaded the eXdata application from the Apple App Store.\n\n'
			+ 'It is a great data source for explosive safety related issues and in support'
			+ ' of humanitarian explosive ordnance disposal (EOD) operations.\n\n'
			+ 'Here is what you get:\n\n'
			+ '•	A database of over 580 explosive types, including former Warsaw Pact'
			+ ' military explosives encountered during humanitarian EOD clearance operations'
			+ ' globally.  Manufacturers names for commercial explosives are also included.\n\n'
			+ '•	A range of open source data for each explosive type, including Composition'
			+ ' Formulae, Density, Velocity of Detonation, TNT Equivalence and Melting Points'
			+ ' where available.\n\n'
			+ '•	A calculator for Peak Incident Pressure, Incident Impulse, Peak Reflected'
			+ ' Pressure, Reflected Impulse, Shock Front Velocity, Arrival Time and Positive'
			+ ' Phase Duration based on change size and distance.  The result is referenced'
			+ 'against threshold values for injuries to personnel with a simple GREEN/RED'
			+ ' Go/No Go system used.\n\n'
			+ '•	An estimator for Detonation Pressures. Useful information for EOD Operators'
			+ ' to determine whether that commercially available explosive is ‘man enough’ for'
			+ ' the task.\n\n'
			+ '•	An estimator for Explosion Danger Areas to determine fragmentation hazard'
			+ ' areas for multi-item logistic disposal.\n\n'			
			+ '•	An estimator for appropriate distances with reference to Acoustic Levels'
			+ ' (@140 dB(C) – the UK limit) from a blast source.\n\n'
			+ '•	A choice of SI, Imperial (UK) or Imperial (US) units.\n\n'
			+ 'You can find the xData app on the App Store for only GBP £10.99.';
			
			emailDialog.open();		
			break;
		}
		case 'Risk Management': {
			
			var riskManagementWindow = Titanium.UI.createWindow({  
			    title:'Risk Management',
			    backgroundColor:'#eee',
			    barColor:'#ff8f34',
			});
			
			var riskManagementContentView = Titanium.UI.createView({
			    height:'auto',
			    width:'85%',
			    backgroundColor:'#eee',
			    top:25,
			    left:20,
			    layout:'vertical'
			});		
			
			var riskManagementLabel = Titanium.UI.createLabel({
				color:'#444',
				height:'auto', 
				width:'auto',
				text:'A critical element of explosive safety or security planning is the implementation'
				+ ' of a robust, effective and integrated risk management system, which should examine'
				+ ' both organizational and structural protection or mitigation responses.\n\n'
				+ 'Risk management is sometimes a misunderstood term, within which there are common'
				+ ' misconceptions in terms of the relationship between, for example, risk assessment'
				+ ' and risk analysis.\n\n'
				+ 'The following matrix, derived from ISO Guide 51:1999 Safety Aspects, identifies the'
				+ ' relationship between the different components of risk management that should be used'
				+ ' during blast analysis:',
				bottom: 20,
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			var riskManagementDiagram1View = Titanium.UI.createView({
			    height:375,
			    width:280,
			    backgroundColor:'#f3b8b8',
				borderColor: "#777",
				borderWidth: 1,
				left: 20,
				top: 490,
				bottom: 30,
				zIndex: 2,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram1Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Risk Management',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});
			
			riskManagementDiagram1View.add(riskManagementDiagram1Label);			
			
			var riskManagementDiagram2View = Titanium.UI.createView({
			    height:250,
			    width:260,
			    backgroundColor:'#f2ed9e',
				borderColor: "#777",
				borderWidth: 1,
				left: 40,
				top: 530,
				bottom: 30,
				zIndex: 3,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram2Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Risk Assessment',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});
			
			riskManagementDiagram2View.add(riskManagementDiagram2Label);			
			
			var riskManagementDiagram3View = Titanium.UI.createView({
			    height:200,
			    width:240,
			    backgroundColor:'#e99a66',
				borderColor: "#777",
				borderWidth: 1,
				left: 60,
				top: 570,
				bottom: 30,
				zIndex: 4,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram3Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Risk Analysis',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});
			
			riskManagementDiagram3View.add(riskManagementDiagram3Label);
			
			var riskManagementDiagram4View = Titanium.UI.createView({
			    height:60,
			    width:220,
			    backgroundColor:'#b8d186',
				borderColor: "#777",
				borderWidth: 1,
				left: 80,
				top: 610,
				bottom: 30,
				zIndex: 5,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram4Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Hazard Identification and Analysis',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});
			
			riskManagementDiagram4View.add(riskManagementDiagram4Label);		
			
			var riskManagementDiagram5View = Titanium.UI.createView({
			    height:40,
			    width:220,
			    backgroundColor:'#d0dfb4',
				borderColor: "#777",
				borderWidth: 1,
				left: 80,
				top: 669,
				bottom: 30,
				zIndex: 6,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram5Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Risk Estimation',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});
			
			riskManagementDiagram5View.add(riskManagementDiagram5Label);	
			
			var riskManagementDiagram6View = Titanium.UI.createView({
			    height:40,
			    width:240,
			    backgroundColor:'#b37043',
				borderColor: "#777",
				borderWidth: 1,
				left: 60,
				top: 708,
				bottom: 30,
				zIndex: 7,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram6Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Risk and ALARP Evaluation',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});			
			
			riskManagementDiagram6View.add(riskManagementDiagram6Label);	
			
			var riskManagementDiagram7View = Titanium.UI.createView({
			    height:40,
			    width:260,
			    backgroundColor:'#a3c3b0',
				borderColor: "#777",
				borderWidth: 1,
				left: 40,
				top: 747,
				bottom: 30,
				zIndex: 7,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram7Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Risk Reduction',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});			
			
			riskManagementDiagram7View.add(riskManagementDiagram7Label);	
			
			var riskManagementDiagram8View = Titanium.UI.createView({
			    height:40,
			    width:260,
			    backgroundColor:'#b3cadd',
				borderColor: "#777",
				borderWidth: 1,
				left: 40,
				top: 786,
				bottom: 30,
				zIndex: 7,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram8Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Risk Acceptance',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});			
			
			riskManagementDiagram8View.add(riskManagementDiagram8Label);	
			
			var riskManagementDiagram9View = Titanium.UI.createView({
			    height:40,
			    width:260,
			    backgroundColor:'#dbd5e4',
				borderColor: "#777",
				borderWidth: 1,
				left: 40,
				top: 825,
				bottom: 30,
				zIndex: 7,
			    layout:'vertical'
			});					
			
			var riskManagementDiagram9Label = Titanium.UI.createLabel({
				color:'#222',
				height:'auto', 
				width:'auto',
				left: 10,
				top: 10,
				text:'Risk Communication',
				font:{fontSize:14, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
				textAlign:'left',
			});			
			
			riskManagementDiagram9View.add(riskManagementDiagram9Label);	
						
			riskManagementContentView.add(riskManagementLabel);
			
			
			var riskManagementScrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			});
			
			riskManagementScrollView.add(riskManagementContentView);
			riskManagementScrollView.add(riskManagementDiagram1View);
			riskManagementScrollView.add(riskManagementDiagram2View);
			riskManagementScrollView.add(riskManagementDiagram3View);
			riskManagementScrollView.add(riskManagementDiagram4View);
			riskManagementScrollView.add(riskManagementDiagram5View);
			riskManagementScrollView.add(riskManagementDiagram6View);
			riskManagementScrollView.add(riskManagementDiagram7View);
			riskManagementScrollView.add(riskManagementDiagram8View);
			riskManagementScrollView.add(riskManagementDiagram9View);
			 
			riskManagementWindow.add(riskManagementScrollView);			
			
			tabGroup.activeTab.open(riskManagementWindow);
						
			break;
		}
		case 'Terms and Conditions': {
			
			var termsWindow = Titanium.UI.createWindow({  
			    title:'Terms and Conditions',
			    backgroundColor:'#eee',
			    barColor:'#ff8f34',
			});
			
			var termsContentView = Titanium.UI.createView({
			    height:'auto',
			    width:'85%',
			    backgroundColor:'#eee',
			    top:25,
			    left:20,
			    layout:'vertical'
			});
			
			
			var termsLabel = Titanium.UI.createLabel({
				color:'#444',
				height:'auto', 
				width:'auto',
				text:'The eXdata Application is to be used for reference or educational'
				+ ' purposes only and is intended to work on Apple iOS devices as outlined'
				+ ' in Apple’s iOS SDK Developer Agreement.\n\n'
				+ 'Whilst Explosive Capabilities Limited have taken reasonable care to ensure that the'
				+ ' information contained within eXdata is accurate as at date of release. Explosive Capabilities'
				+ ' does not warrant the accuracy or completeness of the information.  In terms of explosive data,'
				+ ' eXdata is intended as a general guide only – for more specific information on a particular type'
				+ ' of explosive reference should be made to the relevant manufacturer’s Material Safety Data Sheet (MSDS).\n\n'
				+ 'The information and systems contained within eXdata are intended for use by suitably trained, qualified'
				+ ' and experienced persons.  Explosive Capabilities Limited cannot know or control the conditions under'
				+ ' which this information may be used so each user should consider the information in the specific context'
				+ ' of the application of the information.\n\n'
				+ 'Explosive Capabilities Limited and its employees or agents assume no liability whatsoever for results'
				+ ' obtained or loss or damage of any kind incurred as a result of, use of, or reliance upon, the information.'
				+ ' Independent explosive engineering professional advice should always be obtained to ensure that your'
				+ ' activities comply with the relevant international agreements, national legislation and accord with best'
				+ ' industry practice and standards.\n\n'
				+ 'Copyright 2012 Explosive Capabilities (UK) Limited.  All rights reserved.',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				bottom: 30,
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			termsContentView.add(termsLabel);
			
			var termsScrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			});
			
			termsScrollView.add(termsContentView);
			 
			termsWindow.add(termsScrollView);
			
			tabGroup.activeTab.open(termsWindow);			
			
			break;
				
		}	
		case 'About': {
			
			var informationWindow = Titanium.UI.createWindow({  
			    title:'About',
			    backgroundColor:'#eee',
			    barColor:'#ff8f34',
			});
			
			var informationContentView = Titanium.UI.createView({
			    height:'auto',
			    width:'85%',
			    backgroundColor:'#eee',
			    top:25,
			    left:20,
			    layout:'vertical'
			});
			
			
			var informationLabel = Titanium.UI.createLabel({
				color:'#444',
				height:'auto', 
				width:'auto',
				text:'All of the information and calculators contained within this application is based on open'
				+ ' public sources and included without guarantee by Explosive Capabilities (UK) Limited.\n\n'
				+ '•	Bowen, Estimate of Mans Tolerance to the Direct Effects of Air Blast, October 1968.\n\n'
				+ '•	Explosive Capabilities Limited, Explosives – Data and Guidance (EOD and Demilitarization), Edition 2012/1, 03 June 2012.\n\n'
				+ '•	Kingery and Bulmash, Airblast Parameters from TNT Spherical Air Burst and Hemispherical Surface Burst. Technical Report'
				+ ' ARBRL-TR-0255. Ballistics Research Laboratory, Aberdeen Proving Ground, Maryland, USA. April 1984.\n\n'
				+ '•	Kinney and Graham, Explosive Shocks in Air, (ISBN 3-540-15147-8), 1985.\n\n'
				+ '•	International Ammunition Technical Guideline (IATG) 01.70 Formulae for Ammunition Management\n\n'
				+ '•	UK DEFSTAN 00-27 Measurement of Impulse Noise from Military Weapons, Explosives and Pyrotechnics, Issue 2, 27 June 2005.\n\n'
				+ 'Data for explosive types may vary dependent on the methodology used to measure it and the detailed'
				+ ' composition of the explosive.  The data contained within this application has been obtained from a'
				+ ' range of sources and the most common data, or worse case data, has been included.  Any major factual errors, additional'
				+ ' information or amendments should be sent to:\n\n',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			var information2Label = Titanium.UI.createLabel({
				color:'#444',
				height:'auto', 
				width:'auto',
				text:'They will be included in the next updated version of the application.  Similarly any data on'
				+ ' new explosives can be submitted the same way.\n\n'
				+ ' This application was developed by:\n\n'
				+ '•	DomGan (UK); and',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});			
			
			var information3Label = Titanium.UI.createLabel({
				color:'#444',
				top:20,
				height:'auto', 
				width:'100%',
				text:'•	Explosive Capabilities Limited',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			var information4Label = Titanium.UI.createLabel({
				color:'#444',
				top:20,
				height:'auto', 
				bottom: 30,
				width:'100%',
				text:'Explosive Capabilities (UK) Limited disclaim any liability incurred'
				+ ' in conjunction with the use of any information in this application.\n\n'
				+ 'Additional forthcoming Apps include:\n\n'
				+ '•	eXstore – for the estimation of safe storage quantity distances.'
				+ ' Includes Hazard Division and Compatibility Group data.',
				
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			var informationLink1Label = Titanium.UI.createLabel({
				color:'#444',
				color: "blue",
				height:'auto', 
				width:'auto',
				left: 0,
				bottom: 25,
				text:'director@explosivecapabilities.com',
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});			
			
			var informationLink2Label = Titanium.UI.createLabel({
				color:'#444',
				color: "blue",
				height:'auto', 
				width:'auto',
				left: 10,
				text:'www.domgan.com',
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			var informationLink3Label = Titanium.UI.createLabel({
				color:'#444',
				color: "blue",
				height:'auto', 
				width:'auto',
				left: 10,
				text:'www.explosivecapabilities.com',
				font:{fontSize:16,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				shadowOffset:{x:1,y:1},
				shadowColor:'#fff'
			});
			
			informationLink1Label.addEventListener('click', function(e){
				var emailDialog = Titanium.UI.createEmailDialog();
				emailDialog.subject = "";
				emailDialog.toRecipients = ['director@explosivecapabilities.com'];
				emailDialog.messageBody = '';
				
				emailDialog.open();				
			});			
			
			informationLink2Label.addEventListener('click', function(e){
				Titanium.Platform.openURL('http://www.domgan.com');
			});
			
			informationLink3Label.addEventListener('click', function(e){
				Titanium.Platform.openURL('http://www.explosivecapabilities.com');
			});
			
			
			informationContentView.add(informationLabel);
			informationContentView.add(informationLink1Label);
			informationContentView.add(information2Label);
			informationContentView.add(informationLink2Label);
			informationContentView.add(information3Label);
			informationContentView.add(informationLink3Label);
			informationContentView.add(information4Label);
			
			var informationScrollView = Titanium.UI.createScrollView({
			    contentHeight:'auto',
			});
			
			informationScrollView.add(informationContentView);
			 
			informationWindow.add(informationScrollView);
			
			tabGroup.activeTab.open(informationWindow);
			
			break;
		}
	}
});

moreWindow.add(moreTitlesTable);

var tab4 = Titanium.UI.createTab({  
    icon:'tab_4b.png',
    title:'More',
    window:moreWindow
});




//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);    


// open tab group
//open sponsor window, then open tabgroup
var sponsorWindow = Titanium.UI.createWindow({
	title: 'Sponsor',
	backgroundColor: '#eee',
	backgroundImage: 'sponsor-background.png',
	opacity: 0,	
});  

var sponsorImage = Titanium.UI.createView({
	width: 294,
	height: 95,
	left: 13,
	top: (Titanium.Platform.displayCaps.platformHeight /2) - 75,
	backgroundImage: 'sponsor.png',
});

/*
eXdataImage = Titanium.UI.createView({
	width: 58,
	height: 58,
	left: 132,
	top: 40,
	backgroundImage: 'exdata.png',
});
*/

var sponsorText = Titanium.UI.createLabel({
	width: 320,
	top:40,
	text: 'eXdata is sponsored by',
	color: '#444',
	shadowOffset:{x:1,y:1},
	shadowColor:'#fff',
	textAlign: 'center',	
});

var sponsorText2 = Titanium.UI.createLabel({
	width: 320,
	bottom:40,
	text: 'www.eodsonline.com',
	color: 'blue',
	shadowOffset:{x:1,y:1},
	shadowColor:'#fff',
	textAlign: 'center',	
});

sponsorText2.addEventListener('click', function(e){
	Titanium.Platform.openURL('http://www.eodsonline.com');
});

sponsorWindow.add(sponsorImage);
sponsorWindow.add(sponsorText);
sponsorWindow.add(sponsorText2);
//sponsorWindow.add(eXdataImage);

sponsorWindow.open({opacity:1.0, duration:500});

setTimeout(function() {
    sponsorWindow.close({opacity:0.0, duration:300});
    setTimeout(function() {
    	tabGroup.open({antimated: true});
    }, 300);
}, 5000);
//


function getExplosiveTableData() {
	var explosiveTableData = [];

	explosiveTableData = [{title:explosiveWindow.data.user, header:'User', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.user == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:explosiveWindow.data.formula, header:'Formula', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.formula == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
			    {title:explosiveWindow.data.composition, header:'Composition', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.composition == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
			    {title:explosiveWindow.data.chemical_name, header:'Chemical Name', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.chemical_name == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
			    {title:explosiveWindow.data.normal_colour, header:'Normal Colour', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.normal_colour == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)}];
	switch (measurement) {
		case 'Metric (SI)':
		{
			explosiveTableData.push.apply(explosiveTableData, [
				{title:(explosiveWindow.data.density=='N/A' ? explosiveWindow.data.density  : explosiveWindow.data.density  + ' kg/m3'), header:'Density', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.density == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.velocity_of_detonation=='N/A' ? explosiveWindow.data.velocity_of_detonation  : explosiveWindow.data.velocity_of_detonation  + ' m/s'), header:'Velocity of Detonation', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.velocity_of_detonation == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.detonation_pressure=='N/A' ? explosiveWindow.data.detonation_pressure  : explosiveWindow.data.detonation_pressure  + ' GPa'), header:'Detonation Pressure', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.detonation_pressure == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:((explosiveWindow.data.melting_point=='N/A' || explosiveWindow.data.melting_point=='NO') ? explosiveWindow.data.melting_point  : explosiveWindow.data.melting_point  + ' °C'), header:'Melting Point', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.melting_point == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.detonating_temperature=='N/A' ? explosiveWindow.data.detonating_temperature  : explosiveWindow.data.detonating_temperature  + ' °C'), header:'Detonating Temperature', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.detonating_temperature == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
			]);
			break;
		}	
		case 'US Imperial':
		{
			explosiveTableData.push.apply(explosiveTableData, [
				{title:(explosiveWindow.data.density=='N/A' ? explosiveWindow.data.density  : roundNumber((parseFloat(explosiveWindow.data.density) * 0.0083454044873), 3)  + ' lb/gal'), header:'Density', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.density == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.velocity_of_detonation=='N/A' ? explosiveWindow.data.velocity_of_detonation  : (parseFloat(explosiveWindow.data.velocity_of_detonation) * 3.281)  + ' ft/sec'), header:'Velocity of Detonation', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.velocity_of_detonation == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.detonation_pressure=='N/A' ? explosiveWindow.data.detonation_pressure  : roundNumber((parseFloat(explosiveWindow.data.detonation_pressure) * 20,885,434.373), 3)  + ' lb/ft²-force'), header:'Detonation Pressure', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.detonation_pressure == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:((explosiveWindow.data.melting_point=='N/A' || explosiveWindow.data.melting_point=='NO') ? explosiveWindow.data.melting_point  : roundNumber(((parseFloat(explosiveWindow.data.melting_point) * 1.8) + 32), 3)  + ' °F'), header:'Melting Point', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.melting_point == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.detonating_temperature=='N/A' ? explosiveWindow.data.detonating_temperature  : roundNumber(((parseFloat(explosiveWindow.data.detonating_temperature) * 1.8) + 32), 3)  + ' °F'), header:'Detonating Temperature', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.detonating_temperature == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
			]);
			break;
		}		
		case 'UK Imperial':
		{
			explosiveTableData.push.apply(explosiveTableData, [
				{title:(explosiveWindow.data.density=='N/A' ? explosiveWindow.data.density  : roundNumber((parseFloat(explosiveWindow.data.density) * 0.01022412855), 3)  + ' lb/gal'), header:'Density', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.density == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.velocity_of_detonation=='N/A' ? explosiveWindow.data.velocity_of_detonation  : roundNumber((parseFloat(explosiveWindow.data.velocity_of_detonation) * 3.281), 3)  + ' ft/sec'), header:'Velocity of Detonation', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.velocity_of_detonation == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.detonation_pressure=='N/A' ? explosiveWindow.data.detonation_pressure  : roundNumber((parseFloat(explosiveWindow.data.detonation_pressure) * 20,885,434.373), 3)  + ' lb/ft²-force'), header:'Detonation Pressure', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.detonation_pressure == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:((explosiveWindow.data.melting_point=='N/A' || explosiveWindow.data.melting_point=='NO') ? explosiveWindow.data.melting_point  : roundNumber(((parseFloat(explosiveWindow.data.melting_point) * 1.8) + 32), 3)  + ' °F'), header:'Melting Point', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.melting_point == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
				{title:(explosiveWindow.data.detonating_temperature=='N/A' ? explosiveWindow.data.detonating_temperature  : roundNumber(((parseFloat(explosiveWindow.data.detonating_temperature) * 1.8) + 32), 3)  + ' °F'), header:'Detonating Temperature', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.detonating_temperature == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
			]);
			break;
		}	
	}
	
	explosiveTableData.push.apply(explosiveTableData, [
		{title:explosiveWindow.data.steam_at_low_pressure, header:'Steam at Low Pressure', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.steam_at_low_pressure == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
		{title:explosiveWindow.data.reaction_with_low_pressure_steam, header:'Low Pressure Steam Reaction', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.reaction_with_low_pressure_steam == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
		{title:explosiveWindow.data.usual_method_of_filling, header:'Usual Method of Filling', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.usual_method_of_filling == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
		{title:explosiveWindow.data.usual_use, header:'Usual Use', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.usual_use == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
		{title:explosiveWindow.data.solvents, header:'Solvents', selectedBackgroundColor: '#ff8f34', selectionStyle: (explosiveWindow.data.solvents == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)},
	]);	
	
	var remarksRow = Ti.UI.createTableViewRow({
		selectedBackgroundColor: '#ff8f34',
		header:'Remarks',
		height: 'auto',
		selectionStyle: (explosiveWindow.data.remarks == 'N/A' ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : Titanium.UI.iPhone.TableViewCellSelectionStyle.BLUE)
	});
	
   remarksLabel = Ti.UI.createLabel
	({
	    text: explosiveWindow.data.remarks,
	    color:'#000',
	    font:{fontSize:18, fontWeight: 'bold', fontFamily:'Helvetica Neue' },
	    width:272,
	    height:'auto',
	    top:12,
	    bottom: 15,
	    left:10
	});	
	explosiveTableData.push(remarksRow);
	
	remarksRow.add(remarksLabel);
	
	return explosiveTableData;
		
}

function getAcousticEstimatesTNTEquivalenceData() {
	var acousticEstimatesTNTEquivalenceData = [];
				
	for(var i = 0; i < tnt.length; i++ ) {
		var ticked = false;
		
		if(acousticEstimatesTNTEquivalence == tnt[i]) {
			ticked = true;
		}
		
		
		var row = Ti.UI.createTableViewRow({
    		title: tnt[i],	
    		selectedBackgroundColor: '#ff8f34',
    		hasCheck: ticked,
    	});
    	
    	acousticEstimatesTNTEquivalenceData.push(row);
	}
	
	return acousticEstimatesTNTEquivalenceData;
}

function getPressureImpulseTNTEquivalenceData() {
	var pressureImpulseTNTEquivalenceData = [];
				
	for(var i = 0; i < tnt.length; i++ ) {
		var ticked = false;
		
		if(pressureImpulseTNTEquivalence == tnt[i]) {
			ticked = true;
		}
		
		var row = Ti.UI.createTableViewRow({
    		title: tnt[i],	
    		selectedBackgroundColor: '#ff8f34',
    		hasCheck: ticked,
    	});
    	
    	pressureImpulseTNTEquivalenceData.push(row);
	}
	
	return pressureImpulseTNTEquivalenceData;
}

function getConsequenceTNTEquivalenceData() {
	var consequenceTNTEquivalenceData = [];
				
	for(var i = 0; i < tnt.length; i++ ) {
		var ticked = false;
		
		if(consequenceTNTEquivalence == tnt[i]) {
			ticked = true;
		}
		
		var row = Ti.UI.createTableViewRow({
    		title: tnt[i],	
    		selectedBackgroundColor: '#ff8f34',
    		hasCheck: ticked,
    	});
    	
    	consequenceTNTEquivalenceData.push(row);
	}
	
	return consequenceTNTEquivalenceData;
}

function calculateAcousticTotal() {
	//215 * (Charge Mass (in metres) * TNT Equiv)^(1/3)
	var part1 = (parseFloat(acousticEstimatesChargeMass) * parseFloat(tntItem[acousticEstimatesTNTEquivalence].equivalence));
	var part2 = Math.pow(part1, (1/3)) * 215;
		
	switch(measurement) {
		case 'Metric (SI)':
			return roundNumber(part2, 2) + ' m';
		case 'UK Imperial':
		case 'US Imperial':
			return roundNumber(part2 * 3.2808399, 2) + ' ft';
	}
}


function calculateDetonationPressureTotal() {
	var sum = Math.pow(parseFloat(detonationPressureVelocityOfDetonation), 2) * parseFloat(detonationPressureDensity) * 2.5 * 0.0000001;
	
	switch(measurement) {
		case 'Metric (SI)':
			return roundNumber(sum, 3) + ' GPa';
		case 'UK Imperial':
		case 'US Imperial':
			return roundNumber(sum * 20885434.373, 2) + ' lb/ft²-force';
	}	
}

function log10(val) {
  return Math.log(val) / Math.log(10);
}

function calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance) {
	return parseFloat(standoffDistance) / (Math.pow(parseFloat(tntEquivalance) * parseFloat(chargeMass), (1/3)));
}

function calculatePeakIncidentPressure(chargeMass, tntEquivalance, standoffDistance) {
	
	var scaledDistance = calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance);
	var log10ScaledDistance = log10(scaledDistance);
	
	if(scaledDistance < 0.064 || scaledDistance > 40) {
		return 'Invalid';
	}	
	
	var U = ((-0.214362789151) + (1.35034249993) * log10ScaledDistance);
	var fU = ((-1.6958988741) * U);
	var fU2 = ((-0.154159376846) * Math.pow(U, 2));
	var fU3 = ((0.514060730593) * Math.pow(U, 3));
	var fU4 = ((0.0988534365274) * Math.pow(U, 4));
	var fU5 = ((-0.293912623038) * Math.pow(U, 5));
	var fU6 = ((-0.0268112345019) * Math.pow(U, 6));
	var fU7 = ((0.109097496421) * Math.pow(U, 7));
	var fU8 = ((0.00162846756311) * Math.pow(U, 8));
	var fU9 = ((-0.0214631030242) * Math.pow(U, 9));
	var fU10 = ((0.0001456723382) * Math.pow(U, 10));
	var fU11 = ((0.00167847752266) * Math.pow(U, 11));
	
	switch (measurement) {
		case 'Metric (SI)': {		
			return roundNumber(Math.pow(10,(2.78076916577 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7 + fU8 + fU9 + fU10 + fU11)), 3) + ' kPa';
		}
		case 'UK Imperial':
		case 'US Imperial': {
			return roundNumber((Math.pow(10,(2.78076916577 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7 + fU8 + fU9 + fU10 + fU11))) * 20.81, 3) + ' lb/ft²-force';
		}
	}			
} 

function calculatePeakReflectedPressure(chargeMass, tntEquivalance, standoffDistance, onlyVal) {
	if(onlyVal == undefined) {
		onlyVal = false;
	}
	
	var scaledDistance = calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance);
	var log10ScaledDistance = log10(scaledDistance);
	
	if(scaledDistance < 0.0674 || scaledDistance > 40) {
		return 'Invalid';
	}	
	
	var U = ((-0.240657322658) + (1.3663771922) * log10ScaledDistance);
	var fU = ((-2.21030870597) * U);
	var fU2 = ((-0.218536586295) * Math.pow(U, 2));
	var fU3 = ((0.895319589372) * Math.pow(U, 3));
	var fU4 = ((0.24989009775) * Math.pow(U, 4));
	var fU5 = ((-0.569249436807) * Math.pow(U, 5));
	var fU6 = ((-0.11791682383) * Math.pow(U, 6));
	var fU7 = ((0.224131161411) * Math.pow(U, 7));
	var fU8 = ((0.0245620259375) * Math.pow(U, 8));
	var fU9 = ((-0.0455116002694) * Math.pow(U, 9));
	var fU10 = ((-0.0019093073888) * Math.pow(U, 10));
	var fU11 = ((0.00361471193389) * Math.pow(U, 11));
	
	var places = 3;
	
	if(chargeMass > 100 && standoffDistance < 100) {
		places = 2;
	}
	
	
	if(chargeMass > 100 && standoffDistance < 10) {
		places = 1;
	}
	
		
	if(onlyVal) {
		return parseInt(roundNumber(Math.pow(10,(3.40283217581 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7 + fU8 + fU9 + fU10 + fU11)), places));
	}
	
	switch (measurement) {
		case 'Metric (SI)': {	
			return roundNumber(Math.pow(10,(3.40283217581 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7 + fU8 + fU9 + fU10 + fU11)), places) + ' kPa';
		}
		case 'UK Imperial':
		case 'US Imperial': {
			return roundNumber((Math.pow(10,(3.40283217581 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7 + fU8 + fU9 + fU10 + fU11))) * 20.81, 1 ) + ' lb/ft²-force';
		}
	}
} 

function calculateIncidentImpulse(chargeMass, tntEquivalance, standoffDistance) {
	
	var scaledDistance = calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance);
	var log10ScaledDistance = log10(scaledDistance);
	
	var U = ((-1.94708846747) + (2.40697745406) * log10ScaledDistance);
	var fU = ((-0.384519026965) * U);
	var fU2 = ((-0.0260816706301) * Math.pow(U, 2));
	var fU3 = ((0.00595798753822) * Math.pow(U, 3));
	var fU4 = ((0.0145445261077) * Math.pow(U, 4));
	var fU5 = ((-0.00663289334734) * Math.pow(U, 5));
	var fU6 = ((-0.00284189327204) * Math.pow(U, 6));
	var fU7 = ((0.0013644816227) * Math.pow(U, 7));
	
	var FTotal = 0;
	
	if(scaledDistance > 0.955 && scaledDistance < 40) {
		FTotal = Math.pow(10,(1.67281645863 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7));
	}
	
	var VTotal = 0;	
	
	var V = ((2.06761908721) + (3.0760329666) * log10ScaledDistance);
	var fV = ((-0.502992763686) * V);
	var fV2 = ((0.1713356452351) * Math.pow(V, 2));
	var fV3 = ((0.0450176963051) * Math.pow(V, 3));
	var fV4 = ((-0.0118964626402) * Math.pow(V, 4));
	
	if(scaledDistance > 0.0674 && scaledDistance < 0.955) {
		VTotal = Math.pow(10,(2.52455620925 + fV + fV2 + fV3 + fV4));
	}	

	if(VTotal + FTotal == 0) {
		return 'Invalid';
	} else {
		switch (measurement) {
			case 'Metric (SI)': {
				return roundNumber( (VTotal + FTotal) * Math.pow((chargeMass * tntEquivalance),(1/3)) , 3) + ' kPa.msec';
			}
			case 'UK Imperial':
			case 'US Imperial': {
				return roundNumber( ((VTotal + FTotal) * Math.pow((chargeMass * tntEquivalance),(1/3)) * 0.14504) , 3) + ' psi.msec';
			}
		}
	}
	
} 

function calculateReflectedImpulse(chargeMass, tntEquivalance, standoffDistance) {
	
	var scaledDistance = calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance);
	var log10ScaledDistance = log10(scaledDistance);
	
	if(scaledDistance < 0.0674 || scaledDistance > 40) {
		return 'Invalid';
	}	
	
	var U = ((-0.246208804814) + (1.33422049854) * log10ScaledDistance);
	var fU = ((-0.949516092853) * U);
	var fU2 = ((0.112136118689) * Math.pow(U, 2));
	var fU3 = ((-0.0250659183287) * Math.pow(U, 3));
	
	switch (measurement) {
		case 'Metric (SI)': {	
			return roundNumber(Math.pow(10,(2.70588058103 + fU + fU2 + fU3)) * Math.pow((chargeMass * tntEquivalance),(1/3)), 3) + ' kPa.msec';
		}
		case 'UK Imperial':
		case 'US Imperial': {
			return roundNumber((Math.pow(10,(2.70588058103 + fU + fU2 + fU3)) * Math.pow((chargeMass * tntEquivalance),(1/3)) * 0.14504), 3) + ' psi.msec';
		}
	}			
} 

function calculateShockFrontVelocity(chargeMass, tntEquivalance, standoffDistance) {
	
	var scaledDistance = calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance);
	var log10ScaledDistance = log10(scaledDistance);
	
	if(scaledDistance < 0.0674 || scaledDistance > 40) {
		return 'Invalid';
	}	
	
	var U = ((-0.2024225716178) + (1.37784223635) * log10ScaledDistance);
	var fU = ((-0.698029762594) * U);
	var fU2 = ((0.158916781906) * Math.pow(U, 2));
	var fU3 = ((0.4438112098136) * Math.pow(U, 3));
	var fU4 = ((-0.113402023921) * Math.pow(U, 4));
	var fU5 = ((-0.369887075049) * Math.pow(U, 5));
	var fU6 = ((0.129230567449) * Math.pow(U, 6));
	var fU7 = ((0.19857981197) * Math.pow(U, 7));
	var fU8 = ((-0.0867636217397) * Math.pow(U, 8));
	var fU9 = ((-0.0620391900135) * Math.pow(U, 9));
	var fU10 = ((0.0307482926566) * Math.pow(U, 10));
	var fU11 = ((0.0102657234407) * Math.pow(U, 11));
	var fU12 = ((-0.00546533250772) * Math.pow(U, 12));
	var fU13 = ((-0.000693180974) * Math.pow(U, 13));
	var fU14 = ((0.0003847494916) * Math.pow(U, 14));
	
	switch (measurement) {
		case 'Metric (SI)': {		
			return roundNumber(Math.pow(10,(-0.06621072854 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7 + fU8 + fU9 + fU10 + fU11 + fU12 + fU13 + fU14)), 3) + ' m/s';
		}
		case 'UK Imperial':
		case 'US Imperial': {
			return roundNumber((Math.pow(10,(-0.06621072854 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7 + fU8 + fU9 + fU10 + fU11 + fU12 + fU13 + fU14))) * 3.2808399, 3) + ' ft/sec';
		}
	}		
} 

function calculateArrivalTime(chargeMass, tntEquivalance, standoffDistance) {
	
	var scaledDistance = calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance);
	var log10ScaledDistance = log10(scaledDistance);
	
	if(scaledDistance < 0.0674 || scaledDistance > 40) {
		return 'Invalid';
	}	
	
	var U = ((-0.202425716178) + (1.37784223635) * log10ScaledDistance);
	var fU = ((1.35706496258) * U);
	var fU2 = ((0.052492798645) * Math.pow(U, 2));
	var fU3 = ((-0.196563954086) * Math.pow(U, 3));
	var fU4 = ((-0.0601770052288) * Math.pow(U, 4));
	var fU5 = ((0.0696360270891) * Math.pow(U, 5));
	var fU6 = ((0.0215297490092) * Math.pow(U, 6));
	var fU7 = ((-0.0161658930785) * Math.pow(U, 7));
	var fU8 = ((-0.00232531970294) * Math.pow(U, 8));
	var fU9 = ((0.00147752067524) * Math.pow(U, 9));
	
	return roundNumber(Math.pow(10,(-0.0591634288046 + fU + fU2 + fU3 + fU4 + fU5 + fU6 + fU7 + fU8 + fU9)) * Math.pow((chargeMass * tntEquivalance),(1/3)), 3) + ' msec';
} 

function calculatePositivePhaseDuraction(chargeMass, tntEquivalance, standoffDistance) {
	
	var scaledDistance = calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance);
	var log10ScaledDistance = log10(scaledDistance);
	
	var U = ((-3.53626218091) + (3.46349745571) * log10ScaledDistance);
	var fU = ((0.0933035304009) * U);
	var fU2 = ((-0.0005849420883) * Math.pow(U, 2));
	var fU3 = ((-0.0022688499501) * Math.pow(U, 3));
	var fU4 = ((-0.00295908591505) * Math.pow(U, 4));
	var fU5 = ((0.00148029868929) * Math.pow(U, 5));

	
	var FTotal = 0;
	
	if(scaledDistance > 2.78 && scaledDistance < 40) {
		FTotal = Math.pow(10,(0.686906642409 + fU + fU2 + fU3 + fU4 + fU5));
	}
	
	var VTotal = 0;	
	
	var V = ((1.92946154068) + (5.25099193925) * log10ScaledDistance);
	var fV = ((0.130143717675) * V);
	var fV2 = ((0.134872511954) * Math.pow(V, 2));
	var fV3 = ((0.0391574276906) * Math.pow(V, 3));
	var fV4 = ((-0.00475933664702) * Math.pow(V, 4));
	var fV5 = ((-0.00428144598008) * Math.pow(V, 5));
	
	if(scaledDistance > 0.178 && scaledDistance < 1.01) {
		VTotal = Math.pow(10,(-0.614227603559 + fV + fV2 + fV3 + fV4 + fV5));
	}	
	
	var WTotal = 0;	
	
	var W = ((-2.12492525216) + (9.2996288611) * log10ScaledDistance);
	var fW = ((-0.0297944268976) * W);
	var fW2 = ((0.030632954288) * Math.pow(W, 2));
	var fW3 = ((0.0183405574086) * Math.pow(W, 3));
	var fW4 = ((-0.0173964666211) * Math.pow(W, 4));
	var fW5 = ((-0.00106321963633) * Math.pow(W, 5));
	var fW6 = ((0.00562060030977) * Math.pow(W, 6));
	var fW7 = ((0.0001618217499) * Math.pow(W, 7));
	var fW8 = ((-0.0006860188944) * Math.pow(W, 8));
	
	if(scaledDistance < 2.78 && scaledDistance > 1.01) {
		WTotal = Math.pow(10,(0.315409245784 + fW + fW2 + fW3 + fW4 + fW5 + fW6 + fW7 + fW8));
	}		

	if(VTotal + FTotal + WTotal == 0) {
		return 'Invalid';
	} else {
		return roundNumber( (FTotal + VTotal + WTotal) * Math.pow((chargeMass * tntEquivalance),(1/3)) , 3) + ' msec';
	}
	
} 

function getConsequenceResultsTitleData() {
	
	var peakReflectedPressureVal = calculatePeakReflectedPressure(consequenceChargeMass, tntItem[consequenceTNTEquivalence].equivalence, consequenceStandoffDistance, true);
	
	var red = '#e18383';
	var green = '#8be183';
	
	return [{
		    	title: (measurement == 'Metric (SI)' ? '34.5 kPa' : '718 lb/ft²-force') ,
		    	header:'Ear Drum Rupture Threshold',  
		    	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
	    		backgroundColor: (peakReflectedPressureVal > 34.5 ? red : green),		    	
		    },
		    {
		    	title:(measurement == 'Metric (SI)' ? '203 kPa' : '4,224 lb/ft²-force') ,
		    	header:'Lung Damage Threshold',  
		    	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		    	backgroundColor: (peakReflectedPressureVal > 203 ? red : green),	
		    },
		    {
		    	title:(measurement == 'Metric (SI)' ? '690 kPa' : '14,359 lb/ft²-force'),
		    	header:'Fatality Threshold',  
		    	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		    	backgroundColor: (peakReflectedPressureVal > 690 ? red : green),	
		    },
		    {
		    	title:(measurement == 'Metric (SI)' ? '897 kPa' : '18,667 lb/ft²-force'),
		    	header:'50% Fatalities',  
		    	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		    	backgroundColor: (peakReflectedPressureVal > 897 ? red : green),	
		    },
		    {
		    	title:(measurement == 'Metric (SI)' ? '1,380 kPa' : '28,718 lb/ft²-force'),
		    	header:'99% Fatalities',  
		    	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		    	backgroundColor: (peakReflectedPressureVal > 1380 ? red : green),	
		    },
		] ;
}

function getPressureImpulseResultsTitleData() {
	var peakIncidentPressure = calculatePeakIncidentPressure(pressureImpulseChargeMass, tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandoffDistance);
	
	return [{
	    		title:peakIncidentPressure, 
	    		header:'Peak Incident Pressure',  
	    		selectedBackgroundColor: '#ff8f34',
		    },
		    {
		    	title:calculatePeakReflectedPressure(pressureImpulseChargeMass, tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandoffDistance),
		    	header:'Peak Reflected Pressure',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculateIncidentImpulse(pressureImpulseChargeMass, tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandoffDistance),
		    	header:'Incident Impulse',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculateReflectedImpulse(pressureImpulseChargeMass, tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandoffDistance),
		    	header:'Reflected Impulse',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculateShockFrontVelocity(pressureImpulseChargeMass, tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandoffDistance),
		    	header:'Shock Front Velocity',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculateArrivalTime(pressureImpulseChargeMass, tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandoffDistance),
		    	header:'Arrival Time',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculatePositivePhaseDuraction(pressureImpulseChargeMass, tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandoffDistance),
		    	header:'Positive Phase Duraction',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		] ;
		
	if(peakIncidentPressure == 'Inavlid') {
		var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid values entered',message: 'The values are out of this tool\'s threshold'});
		statusAlert.show();
	}
}

function getDangerAreasResultsTitleData() {
	return [{
	    		title:getNormalFragmentationDistance(dangerAreasAllUpWeight), 
	    		header:'Normal Fragmentation Distance',  
	    		selectedBackgroundColor: '#ff8f34',
		    },
		    {
		    	title:getReducedFragmentationDistance(dangerAreasAllUpWeight),
		    	header:'Reduced Fragmentation Distance',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:getNormalBlastDistanceDistance(dangerAreasAllUpWeight),
		    	header:'Distance (Bulk Explosive Only)',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		] ;
}

function getNormalFragmentationDistance(auw) {
	
	var part1 = (634 * Math.pow(parseFloat(auw), (1/6)));
	
	switch(measurement) {
		case 'Metric (SI)':
			return roundNumber(part1, 2) + ' m';
		case 'UK Imperial':
		case 'US Imperial':
			return roundNumber(part1 * 3.2808399, 2) + ' ft';
	}	
}

function getReducedFragmentationDistance(auw) {
	
	var part1 = (444 * Math.pow(parseFloat(auw), (1/6)));
	
	switch(measurement) {
		case 'Metric (SI)':
			return roundNumber(part1, 2) + ' m';
		case 'UK Imperial':
		case 'US Imperial':
			return roundNumber(part1 * 3.2808399, 2) + ' ft';
	}	
}

function getNormalBlastDistanceDistance(auw) {

	var part1 = (130 * Math.pow(parseFloat(auw), (1/3)));
	
	switch(measurement) {
		case 'Metric (SI)':
			return roundNumber(part1, 2) + ' m';
		case 'UK Imperial':
		case 'US Imperial':
			return roundNumber(part1 * 3.2808399, 2) + ' ft';
	}	
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function charOrdA(a, b) {
	a = a.toLowerCase(); 
	b = b.toLowerCase();
	if (a>b) return 1;
	if (a <b) return -1;
	return 0; 
}

function charOrdD(a, b) {
	a = a.toLowerCase(); 
	b = b.toLowerCase();
	if (a<b) return 1;
	if (a >b) return -1;
	return 0; 
}

function applyAlphaTableMove(e) {
	
	try {
		
		var localPoint = {x:e.x, y:e.y}
		var convPoint = e.source.convertPointToView(localPoint, explsoivesDataWindow);
		
		if (convPoint) {
			var newIndex = Math.ceil( convPoint.y /rowHeight) - 1;
		}
		
		var rowIndex = rowIndexID[ newIndex ].id;   
	 
		// scroll to index on main Table, and make sure its on the TOP position
		// to make sure it doesnt jiggle, check to make sure newIndex is not the same as previousIndex
		if( rowIndex != previousIndex )
		{
			explosivesTable.scrollToIndex(rowIndex,{animated:false,position:Ti.UI.iPhone.TableViewScrollPosition.TOP});
			previousIndex = newIndex;  		
		}
  
  	} catch (e) {
		Ti.API.info("error is " + e);
	}  
}

function applyDetonationPressureVelocityOfDetonationField() {
		//check if value is a valid value
	if(isNumber(detonationPressureVelocityOfDetonationField.value)) {
	    detonationPressureVelocityOfDetonation = (measurement == 'Metric (SI)' ? parseFloat(detonationPressureVelocityOfDetonationField.value) : (parseFloat(detonationPressureVelocityOfDetonationField.value) * 0.3048));
	    Ti.App.Properties.setString("detonation_pressure_velocity_of_detonation", JSON.stringify(detonationPressureVelocityOfDetonation));
		//update total
	    detonationPressureTotalLabel.text = calculateDetonationPressureTotal();
	} else {
		var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid Number',message: 'Please enter a valid Velocity of Detonation'});
		statusAlert.show();
		detonationPressureVelocityOfDetonationField.value = (measurement == 'Metric (SI)' ? roundNumber(detonationPressureVelocityOfDetonation, 3) : roundNumber(parseFloat(detonationPressureVelocityOfDetonation) * 3.2808399, 3));
	}
}

function applyDetonationPressureDensityField() {
	//check if value is a valid value
	if(isNumber(detonationPressureDensityField.value)) {
	    detonationPressureDensity = (measurement == 'Metric (SI)' ? parseFloat(detonationPressureDensityField.value) : 
	    (measurement == 'UK Imperial' ? (parseFloat(detonationPressureDensityField.value) * 97.8078469094) : (parseFloat(detonationPressureDensityField.value) * 119.8264)));
	    Ti.App.Properties.setString("detonation_pressure_density", JSON.stringify(detonationPressureDensity));
		//update total
	    detonationPressureTotalLabel.text = calculateDetonationPressureTotal();
	} else {
		var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid Number',message: 'Please enter a valid Density'});
		statusAlert.show();
		detonationPressureDensityField.value = (measurement == 'Metric (SI)' ? roundNumber(detonationPressureDensity, 3) : 
			(measurement == 'UK Imperial' ? roundNumber(parseFloat(detonationPressureDensity) * 0.01022412855, 3) : roundNumber(parseFloat(detonationPressureDensity) * 0.0083454044873, 3)));
	}
}

function applyConsequenceChargeMassField() {
	//check if value is a valid value
	if(isNumber(consequenceChargeMassField.value)) {
	    consequenceChargeMass = (measurement == 'Metric (SI)' ? parseFloat(consequenceChargeMassField.value) : (parseFloat(consequenceChargeMassField.value) * 0.453592));
	    Ti.App.Properties.setString("consequence_charge_mass", JSON.stringify(consequenceChargeMass));
	} else {
		var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid Number',message: 'Please enter a valid charge mass'});
		statusAlert.show();
		consequenceChargeMassField.value = (measurement == 'Metric (SI)' ? roundNumber(consequenceChargeMass, 3) : roundNumber((parseFloat(consequenceChargeMass) * 2.20462), 3));
	}
}

function applyConsequenceStandoffDistanceField(){
	//check if value is a valid value
	if(isNumber(consequenceStandoffDistanceField.value)) {
	    consequenceStandoffDistance = (measurement == 'Metric (SI)' ? parseFloat(consequenceStandoffDistanceField.value) : (parseFloat(consequenceStandoffDistanceField.value) * 0.30479999953));
	    Ti.App.Properties.setString("consequence_standoff_distance", JSON.stringify(consequenceStandoffDistance));
	} else {
		var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid Number',message: 'Please enter a valid stand-off distance'});
		statusAlert.show();
		consequenceStandoffDistanceField.value = (measurement == 'Metric (SI)' ? roundNumber(consequenceStandoffDistance, 3) : roundNumber((parseFloat(consequenceStandoffDistance) * 3.2808399), 3));
	}
}

function applyPressureImpulseChargeMassField(){
	//check if value is a valid value
	if(isNumber(pressureImpulseChargeMassField.value)) {
	    pressureImpulseChargeMass = (measurement == 'Metric (SI)' ? parseFloat(pressureImpulseChargeMassField.value) : (parseFloat(pressureImpulseChargeMassField.value) * 0.453592));
	    Ti.App.Properties.setString("pressure_impulse_charge_mass", JSON.stringify(pressureImpulseChargeMass));
	} else {
		var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid Number',message: 'Please enter a valid charge mass'});
		statusAlert.show();
		pressureImpulseChargeMassField.value = (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseChargeMass, 3) : roundNumber((parseFloat(pressureImpulseChargeMass) * 2.20462), 3));
	}
}

function applyPressureImpulseStandoffDistanceField() {
	//check if value is a valid value
	if(isNumber(pressureImpulseStandoffDistanceField.value)) {
	    pressureImpulseStandoffDistance = (measurement == 'Metric (SI)' ? parseFloat(pressureImpulseStandoffDistanceField.value) : (parseFloat(pressureImpulseStandoffDistanceField.value) * 0.30479999953));
	    Ti.App.Properties.setString("pressure_impulse_standoff_distance", JSON.stringify(pressureImpulseStandoffDistance));
	} else {
		var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid Number',message: 'Please enter a valid stand-off distance'});
		statusAlert.show();
		pressureImpulseStandoffDistanceField.value = (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseStandoffDistance, 3) : roundNumber((parseFloat(pressureImpulseStandoffDistance) * 3.2808399), 3));
	}
}