Ti.include("CustomToolBar.js");

var tab2view = Ti.UI.createView({
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: '#fff'
})

var toolBar = createCustomToolbar({
	title: 'Blast Analysis',
});

tab2view.add(toolBar);

var blastAnalysisTitlesData = [
    {title:'Pressure / Impulse', header:'Technical', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'Detonation Pressure', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'Acoustic (Noise) Estimates', header:'Safety and Injury Reduction', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'Expl Consequence Analysis', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'Danger Areas', hasChild: true, selectedBackgroundColor: '#ff8f34'},
];

var blastAnalysisTitlesTable = createCustomList({
    top: (54) + 'dp',
    height: 'auto',	
    data:blastAnalysisTitlesData,
    
    click: function(e) {
	    switch (e.title) {
	    	case 'Expl Consequence Analysis': {
	    		
				var consequenceWindow = Titanium.UI.createWindow({  
					backgroundColor: '#eee',
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
					    
				var consequenceToolBar = createCustomToolbar({
					title: 'Expl Consequence Analysis',
					backWindow: consequenceWindow,				
				});
			
				consequenceWindow.add(consequenceToolBar);
							
				var consequenceContentView = Titanium.UI.createView({
				    height:'auto',
				    width: Ti.Platform.displayCaps.platformWidth,
				    left: 0,
				    layout:'vertical'
				});		
				
				var consequenceLabel = Titanium.UI.createLabel({
					color:'#444',
					height:'auto', 
					width:'auto',
					text:'This tool estimates the damage to a human (70kg Man) to be expected from an explosively'
					+ ' generated blast wave.  The results shown are for a Hemi-Spherical Charge Surface Burst, as'
					+ ' this most replicates real life scenarios.\n\n'
					+ 'The peak reflected pressure calculated is compared against the threshold levels'
					+ ' and a Red (Danger/Intolerable Risk) or Green (Tolerable Risk) indicator is shown.',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});		
								
				consequenceContentView.add(consequenceLabel);
				
				
				var consequenceTitlesData = [
				    {
				    	title:' ', 
				    	header:'Charge Mass', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'chargeMass',
				    	selectionEnabled: false,
				    },
				    {
				    	title:consequenceTNTEquivalence, 
				    	header:'TNT Equivalence', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'tntEquivalence',
				    	hasChild: true
				    },			
				    {
				    	title:' ', 
				    	header:'Stand-off Distance', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'standOffDistance',
				    	selectionEnabled: false,
				    },		
				];
				
				var consequenceTitlesTable = createCustomList({
				    top: '30dp',
				    bottom: '20dp',
				    height: '335dp',	
				    data:consequenceTitlesData,
				    lines: true,
				    click: function(e) {
					    if(e.header == 'TNT Equivalence') {
							var consequenceTNTEquivalenceWindow = Titanium.UI.createWindow({  
								backgroundColor: '#eee',
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
							
							var consequenceTNTEquivalenceToolBar = createCustomToolbar({
								title: 'TNT Equivalence',
								backWindow: consequenceTNTEquivalenceWindow,
							});
						
							consequenceTNTEquivalenceWindow.add(consequenceTNTEquivalenceToolBar);		
							
							var consequenceTNTEquivalenceTable = Titanium.UI.createTableView({
								top: '54dp',
								separatorColor: '#ddd',
							    data: getConsequenceTNTEquivalenceData(consequenceTNTEquivalenceTable),
							});
							
							consequenceTNTEquivalenceTable.addEventListener('click', function(e){
								
								consequenceTNTEquivalence = e.row.data;
								Ti.App.Properties.setString("consequence_tnt_equivalence", JSON.stringify(consequenceTNTEquivalence));
								
								e.row.parent.setData(getConsequenceTNTEquivalenceData());
							});
							
							
							consequenceTNTEquivalenceWindow.add(consequenceTNTEquivalenceTable);
							
							consequenceTNTEquivalenceWindow.open({animated:true});
						}
				    }
				});				
				
				consequenceContentView.add(consequenceTitlesTable);	
				
				var consequenceCalculateButton = Titanium.UI.createButton({ 
					title: 'Calculate', 
					top: '25dp',
					bottom: '25dp',
					height: '44dp',
					backgroundImage: '/images/blue.png',
					width: '270dp',
					color: '#fff',
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue', fontWeight: 'bold'},
					consequenceChargeMassField: undefined,
					consequenceStandOffDistanceField: undefined,
				}); 	
				
				consequenceCalculateButton.addEventListener('touchstart',function(e) {
					e.source.backgroundImage = '/images/blue_sel.png';
				});
				
				consequenceCalculateButton.addEventListener('touchcancel',function(e) {
					e.source.backgroundImage = '/images/blue.png';
				});				
				
				consequenceCalculateButton.addEventListener('touchend',function(e) {
					
					e.source.backgroundImage = '/images/blue.png';
					
					//apply changes again
					applyConsequenceChargeMassField(e.source.consequenceChargeMassField);
					applyconsequenceStandOffDistanceField(e.source.consequenceStandOffDistanceField);
				
					var consequenceResultsWindow = Titanium.UI.createWindow({  
						backgroundColor: '#eee',
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
					
					var consequenceResultsToolBar = createCustomToolbar({
						title: 'Results',
						backWindow: consequenceResultsWindow,
					});
				
					consequenceResultsWindow.add(consequenceResultsToolBar);
					
					var consequenceResultsContentView = Titanium.UI.createView({
					    height:'auto',
					    width: Ti.Platform.displayCaps.platformWidth,
					    left: 0,
					    top: '54dp',
					    layout:'vertical'
					});		
					
					var onsequenceResultsDescLabel = Titanium.UI.createLabel({
						color:'#444',
						height:'auto', 
						width:'auto',
						text:'Peak Reflected Pressure:',
						
						font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
						textAlign:'left',
						top: '23dp',
						width: (Ti.Platform.displayCaps.platformWidth - 50),	
						left: 25,					
					});	
					
					consequenceResultsContentView.add(onsequenceResultsDescLabel);						
					
					var consequenceResultsLabel = Titanium.UI.createLabel({
						color:'#000',
						height:'40dp', 
						width:'auto',
						text: calculatePeakReflectedPressure(consequenceChargeMass, jsonData.tntItem[consequenceTNTEquivalence].equivalence, consequenceStandOffDistance),
						bottom: '25dp',
						font:{fontSize:'36dp',fontFamily:'Helvetica Neue'},
						textAlign:'left',
						top: 0,
						width: (Ti.Platform.displayCaps.platformWidth - 50),	
						left: 25,			
					});			
					
					consequenceResultsContentView.add(consequenceResultsLabel);			

					var consequenceResultsTitlesTable = createCustomList({
					    top: '166dp',
					    height: 'auto',	
					    data:getConsequenceResultsTitleData(),
					});				
					
					var line = Titanium.UI.createView({
					    width: "100%",
					    height: 1,
					    backgroundColor: "#777",
					    zIndex: 2,
					    top: 0,
					});	
					
					consequenceResultsTitlesTable.add(line);						
										
					consequenceResultsWindow.add(consequenceResultsContentView);
					consequenceResultsWindow.add(consequenceResultsTitlesTable);	
					
					consequenceResultsWindow.open({animated:true});	
				});					
				
				consequenceContentView.add(consequenceCalculateButton);	
				
				var consequenceLabel2 = Titanium.UI.createLabel({
					color:'#666',
					height:'auto', 
					width:'auto',
					text:'The biological effect of a short rising blast pressure will be the same between the incident pressure, '
					+ 'incident pressure plus the dynamic pressure and the reflected pressure. Therefore the damage caused to a human'
					+ ' is specific only to the maximum pressure and not the pressure type.\n\n' 
					+ 'A human ear will rupture at 34.5 KPa regardless of whether it is reflected or incident pressure,'
					+ ' so only the maximum effective pressure needs considering, which equate to the pressure type with the'
					+ ' highest value. In this case where we are considering the effect on standing humans, the reflected pressure'
					+ ' will usually be the greatest pressure type at a specific distance.',
					font:{fontSize:'14dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					bottom: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});		
								
				consequenceContentView.add(consequenceLabel2);								
				
				var chargeMassRow = consequenceTitlesTable.refs['chargeMass'];		
				
		        var consequenceChargeMassField = Ti.UI.createTextField({ 
		            hintText:'Enter a Charge Mass',
		            height:'36dp',
		            width:	chargeMassRow.width * 0.85,
		            top:'12dp',
		            borderWidth: 1,
		            borderRadius: 15, 
		            borderStyle: Titanium.INPUT_BORDERSTYLE_ROUNDED, 
		            value: (measurement == 'Metric (SI)' ? roundNumber(consequenceChargeMass, 3) : roundNumber((parseFloat(consequenceChargeMass) * 2.20462), 3)),
		            left: '5dp',
		            backgroundImage: '/images/transparent.png',
		            font:{fontSize:'18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue'},
		            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		        });		
		       consequenceChargeMassField.addEventListener('blur', function(e){	
					applyConsequenceChargeMassField(e);
		        });		
		        consequenceChargeMassField.addEventListener('return', function(e){	
					applyConsequenceChargeMassField(e);
		        });
				consequenceChargeMassField.addEventListener('change',function(e){
				    e.source.value = e.source.value.replace(/[^0-9\.]+/g,"");
				});			       
				
				consequenceCalculateButton.consequenceChargeMassField = consequenceChargeMassField;
		        
		        chargeMassRow.add(consequenceChargeMassField);
		        
				var consequenceChargeMassFieldLabel = Titanium.UI.createLabel({ 
					color:'#444',
					top:'7dp',
					right: '15dp',
					width: 'auto',
					height:'36dp', 
					text: (measurement == 'Metric (SI)' ? 'kg' : 'lb'),
					
					font:{fontSize:'18dp', fontWeight: 'bold'},
					textAlign:'right',
				});		      
				
				chargeMassRow.add(consequenceChargeMassFieldLabel);  
		        
		        var tntEquivalenceRow = consequenceTitlesTable.refs['tntEquivalence'];
		        
				//ensure that a ref of tntEquivalenceRow remainds in the window for updates
				consequenceWindow.tntEquivalenceRow = tntEquivalenceRow;		        
		        
		        //update the value when this window opens again
		        consequenceWindow.addEventListener("focus", function(e) {
		        	if(e.source.tntEquivalenceRow != undefined) {
		        		e.source.tntEquivalenceRow.text.text = consequenceTNTEquivalence;
		        	}
		        });			
				
				var standOffDistanceRow = consequenceTitlesTable.refs['standOffDistance'];	
				
		        var consequenceStandOffDistanceField = Ti.UI.createTextField({ 
		            hintText:'Enter a Stand-off Distance',
		            height:'36dp',
		            width:	standOffDistanceRow.width * 0.85,
		            top:'12dp',
		            borderWidth: 1,
		            borderRadius: 15, 
		            borderStyle: Titanium.INPUT_BORDERSTYLE_ROUNDED, 
		            value: (measurement == 'Metric (SI)' ? roundNumber(consequenceStandOffDistance, 3) : roundNumber((parseFloat(consequenceStandOffDistance) * 3.2808399), 3)),
		            left: '5dp',
		            backgroundImage: '/images/transparent.png',
		            font:{fontSize:'18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue'},
		            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		        });		
		        consequenceStandOffDistanceField.addEventListener('blur', function(e){	
					applyconsequenceStandOffDistanceField(e);
		        });		
		        consequenceStandOffDistanceField.addEventListener('return', function(e){	
					applyconsequenceStandOffDistanceField(e);
					e.source.blur();
		        });
				consequenceStandOffDistanceField.addEventListener('change',function(e){
				    e.source.value = e.source.value.replace(/[^0-9\.]+/g,"");
				});		
				
		        standOffDistanceRow.add(consequenceStandOffDistanceField);
		        
				var consequenceStandOffDistanceFieldLabel = Titanium.UI.createLabel({ 
					color:'#444',
					top:'7dp',
					right: '15dp',
					width: 'auto',
					height:'36dp', 
					text: (measurement == 'Metric (SI)' ? 'm' : 'ft'),
					
					font:{fontSize:'18dp', fontWeight: 'bold'},
					textAlign:'right',
				});		      
				
				standOffDistanceRow.add(consequenceStandOffDistanceFieldLabel);  		        
		        
		        consequenceCalculateButton.consequenceStandOffDistanceField = consequenceStandOffDistanceField;  					
				
				
				var consequenceScrollView = Titanium.UI.createScrollView({
				    contentHeight:'auto',
				    top: (54) + 'dp',					    
				});
				
				consequenceScrollView.add(consequenceContentView);
				
				consequenceWindow.add(consequenceScrollView);
				
				consequenceWindow.open({animated:true});				
				break;
	    	}
	    	case 'Danger Areas': {
	    		
				var dangerAreasWindow = Titanium.UI.createWindow({  
					backgroundColor: '#eee',
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
				
				var dangerAreasToolBar = createCustomToolbar({
					title: 'Danger Areas',
					backWindow: dangerAreasWindow,					
				});
			
				dangerAreasWindow.add(dangerAreasToolBar);	
				
				var dangerAreasContentView = Titanium.UI.createView({
				    height:'auto',
				    width: Ti.Platform.displayCaps.platformWidth,
				    left: 0,
				    layout:'vertical'
				});		
				
				var dangerAreasLabel = Titanium.UI.createLabel({
					color:'#444',
					height:'auto', 
					width:'auto',
					text:'This tool estimates the appropriate safety distances to be used for Explosion Danger'
					+ ' Areas (including Fragmentation Hazard Zones) for multi-item ammunition disposal by open'
					+ ' detonation.\n\n'
					+ 'Note: The All Up Weight (AUW) is the total weight of the ammunition, not just the explosive mass.',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});		
								
				dangerAreasContentView.add(dangerAreasLabel);
				
				var dangerAreasTitlesData = [
				    {
				    	title:' ', 
				    	header:'All Up Weight (AUW)', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'allUpWeight',
				    	selectionEnabled: false,
				    },
				];
				
				var dangerAreasTitlesTable = createCustomList({
				    top: '30dp',
				    bottom: '20dp',
				    height: '135dp',	
				    data:dangerAreasTitlesData,
				    lines: true,
				});				
				
				dangerAreasContentView.add(dangerAreasTitlesTable);	
				
				var dangerAreasCalculateButton = Titanium.UI.createButton({ 
					title: 'Calculate', 
					top: '25dp',
					bottom: '25dp',
					height: '44dp',
					backgroundImage: '/images/blue.png',
					width: '270dp',
					color: '#fff',
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue', fontWeight: 'bold'},
					dangerAreasAllUpWeightField: undefined,
				}); 	
				
				dangerAreasCalculateButton.addEventListener('touchstart',function(e) {
					e.source.backgroundImage = '/images/blue_sel.png';
				});
				
				dangerAreasCalculateButton.addEventListener('touchcancel',function(e) {
					e.source.backgroundImage = '/images/blue.png';
				});				
				
				dangerAreasCalculateButton.addEventListener('touchend',function(e) {
					
					e.source.backgroundImage = '/images/blue.png';
					
					//apply changes again
					applyDangerAreasAllUpWeightField(e.source.dangerAreasAllUpWeightField);
				
					var dangerAreasResultsWindow = Titanium.UI.createWindow({  
						backgroundColor: '#eee',
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
					
					var dangerAreasResultsToolBar = createCustomToolbar({
						title: 'Results',
						backWindow: dangerAreasResultsWindow,
					});
				
					dangerAreasResultsWindow.add(dangerAreasResultsToolBar);	
					
					var dangerAreasResultsContentView = Titanium.UI.createView({
					    height:'auto',
					    width: Ti.Platform.displayCaps.platformWidth,
					    left: 0,
					    layout:'vertical',
					    backgroundColor:'#eee',
					});								

					var dangerAreasResultsTitlesTable = createCustomList({
					    height: 'auto',	
					    height: '335dp',
					    data:getDangerAreasResultsTitleData(),
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
					
					dangerAreasResultsContentView.add(dangerAreasResultsTitlesTable);
					
					var line = Titanium.UI.createView({
					    width: "100%",
					    height: 1,
					    backgroundColor: "#777",
					    zIndex: 2,
					    bottom: 0,
					});	
					
					dangerAreasResultsTitlesTable.add(line);								

					var dangerAreasResultsLabel = Titanium.UI.createLabel({
						color:'#666',
						height:'auto', 
						width:'auto',
						text:'Note:\n\n'
						+ 'For very large AUW the Danger Area for Bulk Explosive Only will be'
						+ ' greater than the Normal Fragmentation Distance.  This is a formularic'
						+ ' issue where the data input falls outside the experimental data used'
						+ ' to develop the formula. In these rare instances Users should use'
						+ ' professional judgment as to which would be the more appropriate distance'
						+ ' to apply in such cases.',
						
						font:{fontSize:'14dp',fontFamily:'Helvetica Neue'},
						textAlign:'left',
						top: '25dp',
						bottom: '25dp',
						width: (Ti.Platform.displayCaps.platformWidth - 50),	
						left: 25,					
					});			
					
					
					dangerAreasResultsContentView.add(dangerAreasResultsLabel);
					
					var dangerAreasResultsScrollView = Titanium.UI.createScrollView({
					    contentHeight:'auto',
					    top: (54) + 'dp',				    
					});

					dangerAreasResultsScrollView.add(dangerAreasResultsContentView);
					
					dangerAreasResultsWindow.add(dangerAreasResultsScrollView);
					
					dangerAreasResultsWindow.open({animated:true});	
				});					
				
				dangerAreasContentView.add(dangerAreasCalculateButton);			
				
				var allUpWeightRow = dangerAreasTitlesTable.refs['allUpWeight'];	
				
		        var dangerAreasAllUpWeightField = Ti.UI.createTextField({ 
		            hintText:'Enter a All Up Weight',
		            height:'36dp',
		            width:	allUpWeightRow.width * 0.85,
		            top:'12dp',
		            borderWidth: 1,
		            borderRadius: 15, 
		            borderStyle: Titanium.INPUT_BORDERSTYLE_ROUNDED, 
		            value: (measurement == 'Metric (SI)' ? roundNumber(dangerAreasAllUpWeight, 3) : roundNumber((parseFloat(dangerAreasAllUpWeight) * 2.20462), 3)),
		            left: '5dp',
		            backgroundImage: '/images/transparent.png',
		            font:{fontSize:'18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue'},
		            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		        });		
		        dangerAreasAllUpWeightField.addEventListener('blur', function(e){	
					applyDangerAreasAllUpWeightField(e);
		        });		
		        dangerAreasAllUpWeightField.addEventListener('return', function(e){	
					applyDangerAreasAllUpWeightField(e);
					e.source.blur();
		        });
				dangerAreasAllUpWeightField.addEventListener('change',function(e){
				    e.source.value = e.source.value.replace(/[^0-9\.]+/g,"");
				});		
				
		        allUpWeightRow.add(dangerAreasAllUpWeightField);
		        
				var dangerAreasAllUpWeightFieldLabel = Titanium.UI.createLabel({ 
					color:'#444',
					top:'7dp',
					right: '15dp',
					width: 'auto',
					height:'36dp', 
					text: (measurement == 'Metric (SI)' ? 'kg' : 'lb'),
					
					font:{fontSize:'18dp', fontWeight: 'bold'},
					textAlign:'right',
				});		      
				
				allUpWeightRow.add(dangerAreasAllUpWeightFieldLabel);  		        
		        
		        dangerAreasCalculateButton.dangerAreasAllUpWeightField = dangerAreasAllUpWeightField;  			
		        
				var dangerAreasLabel2 = Titanium.UI.createLabel({
					color:'#666',
					height:'auto', 
					width:'auto',
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
					font:{fontSize:'14dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					bottom: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});		
								
				dangerAreasContentView.add(dangerAreasLabel2);		        		
				
				var dangerAreasScrollView = Titanium.UI.createScrollView({
				    contentHeight:'auto',
				    top: (54) + 'dp',					    
				});
				
				dangerAreasScrollView.add(dangerAreasContentView);
				
				dangerAreasWindow.add(dangerAreasScrollView);
				
				dangerAreasWindow.open({animated:true});					
					    		
	    		break;
	    	}	    	
	    	case 'Acoustic (Noise) Estimates': {
	    		
				var acousticEstimatesWindow = Titanium.UI.createWindow({  
					backgroundColor: '#eee',
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
				
				var acousticEstimatesToolBar = createCustomToolbar({
					title: 'Acoustic Estimates',
					backWindow: acousticEstimatesWindow,				
				});
			
				acousticEstimatesWindow.add(acousticEstimatesToolBar);	
				
				var acousticEstimatesContentView = Titanium.UI.createView({
				    height:'auto',
				    width: Ti.Platform.displayCaps.platformWidth,
				    left: 0,
				    layout:'vertical'
				});	
				
				var acousticEstimatesLabel = Titanium.UI.createLabel({
					color:'#444',
					height:'auto', 
					width:'auto',
					text:'This tool estimates the distance at which an acoustic level'
					+ ' of 140dB(C) should be expected under average ambient conditions,'
					+ ' from an un-tamped explosion.\n\n'
					//+ 'Users should note that it is only an estimation based on the generally accepted'
					//+ ' simple formula of 215 x (Charge Mass x TNT Equivalence) ^(1/3).\n\n'
					+ 'Fill in the fields below and the tool will esimate the distance.'
					+ ' Users should note that this estimation is highly conservative:',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});	
				
				acousticEstimatesContentView.add(acousticEstimatesLabel);	
				
				var acousticEstimatesTitlesData = [
				    {
				    	title:' ', 
				    	header:'Charge Mass', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'chargeMass',
				    	selectionEnabled: false,
				    },
				    {
				    	title:acousticEstimatesTNTEquivalence, 
				    	header:'TNT Equivalence', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'tntEquivalence',
				    	hasChild: true
				    },		
				];
				
				var acousticEstimatesTitlesTable = createCustomList({
				    top: '30dp',
				    bottom: '20dp',
				    height: '235dp',	
				    data:acousticEstimatesTitlesData,
				    lines: true,
					click: function(e) {
					    if(e.header == 'TNT Equivalence') {
							var acousticEstimatesTNTEquivalenceWindow = Titanium.UI.createWindow({  
								backgroundColor: '#eee',
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
							
							var acousticEstimatesTNTEquivalenceToolBar = createCustomToolbar({
								title: 'TNT Equivalence',
								backWindow: acousticEstimatesTNTEquivalenceWindow,
							});
						
							acousticEstimatesTNTEquivalenceWindow.add(acousticEstimatesTNTEquivalenceToolBar);		
							
							var acousticEstimatesTNTEquivalenceTable = Titanium.UI.createTableView({
								top: '54dp',
								separatorColor: '#ddd',
							    data: getAcousticEstimatesTNTEquivalenceData(acousticEstimatesTNTEquivalenceTable),
							});
							
							acousticEstimatesTNTEquivalenceTable.addEventListener('click', function(e){
								
								acousticEstimatesTNTEquivalence = e.row.data;
								Ti.App.Properties.setString("acoustic_estimates_tnt_equivalence", JSON.stringify(acousticEstimatesTNTEquivalence));
								
								e.row.parent.setData(getAcousticEstimatesTNTEquivalenceData());
							});
							
							
							acousticEstimatesTNTEquivalenceWindow.add(acousticEstimatesTNTEquivalenceTable);
							
							acousticEstimatesTNTEquivalenceWindow.open({animated:true});
						}
				    }				    
				});
				
				acousticEstimatesContentView.add(acousticEstimatesTitlesTable);	
				
				var chargeMassRow = acousticEstimatesTitlesTable.refs['chargeMass'];		
				
		        var acousticEstimatesChargeMassField = Ti.UI.createTextField({ 
		            hintText:'Enter a Charge Mass',
		            height:'36dp',
		            width:	chargeMassRow.width * 0.85,
		            top:'12dp',
		            borderWidth: 1,
		            borderRadius: 15, 
		            borderStyle: Titanium.INPUT_BORDERSTYLE_ROUNDED, 
		            value: (measurement == 'Metric (SI)' ? roundNumber(acousticEstimatesChargeMass, 3) : roundNumber((parseFloat(acousticEstimatesChargeMass) * 2.20462), 3)),
		            left: '5dp',
		            backgroundImage: '/images/transparent.png',
		            font:{fontSize:'18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue'},
		            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
		        });		
		        acousticEstimatesChargeMassField.addEventListener('blur', function(e){	
					applyAcousticEstimatesChargeMassField(e);
		        });		
		        acousticEstimatesChargeMassField.addEventListener('return', function(e){	
					applyAcousticEstimatesChargeMassField(e);
		        });
				acousticEstimatesChargeMassField.addEventListener('change',function(e){
				    e.source.value = e.source.value.replace(/[^0-9\.]+/g,"");
				});			       
		        
		        chargeMassRow.add(acousticEstimatesChargeMassField);
		        
				var acousticEstimatesChargeMassFieldLabel = Titanium.UI.createLabel({ 
					color:'#444',
					top:'7dp',
					right: '15dp',
					width: 'auto',
					height:'36dp', 
					text: (measurement == 'Metric (SI)' ? 'kg' : 'lb'),
					
					font:{fontSize:'18dp', fontWeight: 'bold'},
					textAlign:'right',
				});		      
				
				chargeMassRow.add(acousticEstimatesChargeMassFieldLabel);  	
				
		        var tntEquivalenceRow = acousticEstimatesTitlesTable.refs['tntEquivalence'];
		        	
				var acousticEstimatesTotalDescLabel = Titanium.UI.createLabel({
					color:'#444',
					height:'auto', 
					width:'auto',
					text:'Estimated Distance:',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});	
				
				acousticEstimatesContentView.add(acousticEstimatesTotalDescLabel);
				
				var acousticEstimatesTotalLabel = Titanium.UI.createLabel({
					color:'#000',
					height:'auto', 
					width:'auto',
					text: calculateAcousticTotal(),
					bottom: '25dp',
					font:{fontSize:'48dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: 0,
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,			
				});	
				
				//ensure that a ref of tntEquivalenceRow remainds in the window for updates
				acousticEstimatesWindow.acousticEstimatesTotalLabel = acousticEstimatesTotalLabel;			
				acousticEstimatesWindow.tntEquivalenceRow = tntEquivalenceRow;	      				
				acousticEstimatesChargeMassField.acousticEstimatesTotalLabel = acousticEstimatesTotalLabel;
				
		        //update the value when this window opens again
		        acousticEstimatesWindow.addEventListener("focus", function(e) {
		        	if(e.source.tntEquivalenceRow != undefined) {
		        		e.source.tntEquivalenceRow.text.text = acousticEstimatesTNTEquivalence;
		        		e.source.acousticEstimatesTotalLabel.text = calculateAcousticTotal();
		        	}
		        });						
				
				acousticEstimatesContentView.add(acousticEstimatesTotalLabel);	
				
				var acousticEstimatesLabel2 = Titanium.UI.createLabel({
					color:'#666',
					height:'auto', 
					width:'auto',
					text:'This level is the maximum Exposure Limit Value Level (ELV) above which'
					+ ' mitigation activities should be initiated to reduce noise exposure for humans.\n\n'
					+ 'Users should note that it is only an estimation based on the generally accepted'
					+ ' simple formula of 215 x (Charge Mass x TNT Equivalence)^(1/3).\n\n'
					+ 'Users should always'
					+ ' comply with the requirements of national legislation for the accurate measurement'
					+ ' of acoustic levels when conducting logistic level or industrial explosive related'
					+ ' operations.  The formula is, however, useful for the conduct of response EOD operations.',
					font:{fontSize:'14dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					bottom: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});		
								
				acousticEstimatesContentView.add(acousticEstimatesLabel2);		
				
				var acousticEstimatesScrollView = Titanium.UI.createScrollView({
				    contentHeight:'auto',
				    top: (54) + 'dp',					    
				});
				
				acousticEstimatesScrollView.add(acousticEstimatesContentView);
				
				acousticEstimatesWindow.add(acousticEstimatesScrollView);
				
				acousticEstimatesWindow.open({animated:true});						
					    		
	    		break;
	    	}
	    	case 'Detonation Pressure': {
	    		
				var detonationPressureWindow = Titanium.UI.createWindow({  
					backgroundColor: '#eee',
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
				
				var detonationPressureToolBar = createCustomToolbar({
					title: 'Detonation Pressure',
					backWindow: detonationPressureWindow,					
				});
			
				detonationPressureWindow.add(detonationPressureToolBar);	
				
				var detonationPressureContentView = Titanium.UI.createView({
				    height:'auto',
				    width: Ti.Platform.displayCaps.platformWidth,
				    left: 0,
				    layout:'vertical'
				});	
				
				var detonationPressureLabel = Titanium.UI.createLabel({
					color:'#444',
					height:'auto', 
					width:'auto',
					text:'This tool provides an approximation of the detonation pressure'
					+ ' when given a limited range of values of an explosive compound.',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});	
				
				detonationPressureContentView.add(detonationPressureLabel);					
				
				var detonationPressureTitlesData = [
				    {
				    	title:' ', 
				    	header:'Density (d)', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'density',
				    	selectionEnabled: false,
				    },	
				    {
				    	title:' ', 
				    	header:'Velocity of Detonation (VD)', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'velocityOfDetonation',
				    	selectionEnabled: false,
				    },		
				];
				
				var detonationPressureTitlesTable = createCustomList({
				    top: '30dp',
				    bottom: '20dp',
				    height: '235dp',	
				    data:detonationPressureTitlesData,
				    lines: true,
				});
				
				detonationPressureContentView.add(detonationPressureTitlesTable);	
				
				var densityRow = detonationPressureTitlesTable.refs['density'];		
				
		        var detonationPressureDensityField = Ti.UI.createTextField({ 
		            hintText:'Enter a Density',
		            height:'36dp',
		            width:	densityRow.width * 0.85,
		            top:'12dp',
		            borderWidth: 1,
		            borderRadius: 15, 
		            borderStyle: Titanium.INPUT_BORDERSTYLE_ROUNDED, 
		            value: (measurement == 'Metric (SI)' ? roundNumber(detonationPressureDensity, 3) : 
		            	(measurement == 'UK Imperial' ? roundNumber(parseFloat(detonationPressureDensity) * 0.01022412855, 3) : roundNumber(parseFloat(detonationPressureDensity * 0.0083454044873), 3))),
		            left: '5dp',
		            backgroundImage: '/images/transparent.png',
		            font:{fontSize:'18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue'},
		            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
		        });		
		        detonationPressureDensityField.addEventListener('blur', function(e){	
					applyDetonationPressureDensityField(e);
		        });		
		        detonationPressureDensityField.addEventListener('return', function(e){	
					applyDetonationPressureDensityField(e);
		        });
				detonationPressureDensityField.addEventListener('change',function(e){
				    e.source.value = e.source.value.replace(/[^0-9\.]+/g,"");
				});			       
		        
		        densityRow.add(detonationPressureDensityField);
		        
				var detonationPressureDensityFieldLabel = Titanium.UI.createLabel({ 
					color:'#444',
					top:'7dp',
					right: '15dp',
					width: 'auto',
					height:'36dp', 
					text: (measurement == 'Metric (SI)' ? 'kg/m³' : 'lb/gal'),
					
					font:{fontSize:'18dp', fontWeight: 'bold'},
					textAlign:'right',
				});			
				
				densityRow.add(detonationPressureDensityFieldLabel);
								
				var velocityOfDetonationRow = detonationPressureTitlesTable.refs['velocityOfDetonation'];		
				
		        var detonationPressureVelocityOfDetonationField = Ti.UI.createTextField({ 
		            hintText:'Enter a Velocity of Detonation',
		            height:'36dp',
		            width:	velocityOfDetonationRow.width * 0.85,
		            top:'12dp',
		            borderWidth: 1,
		            borderRadius: 15, 
		            borderStyle: Titanium.INPUT_BORDERSTYLE_ROUNDED, 
					value: (measurement == 'Metric (SI)' ? roundNumber(detonationPressureVelocityOfDetonation, 3) : roundNumber(parseFloat(detonationPressureVelocityOfDetonation) * 3.2808399, 3)),
		            left: '5dp',
		            backgroundImage: '/images/transparent.png',
		            font:{fontSize:'18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue'},
		            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
		        });		
		        detonationPressureVelocityOfDetonationField.addEventListener('blur', function(e){	
					applyDetonationPressureVelocityOfDetonationField(e);
		        });		
		        detonationPressureVelocityOfDetonationField.addEventListener('return', function(e){	
					applyDetonationPressureVelocityOfDetonationField(e);
					e.source.blur();
		        });
				detonationPressureVelocityOfDetonationField.addEventListener('change',function(e){
				    e.source.value = e.source.value.replace(/[^0-9\.]+/g,"");
				});			       
		        
		        velocityOfDetonationRow.add(detonationPressureVelocityOfDetonationField);
		        
				var detonationPressureVelocityOfDetonationFieldLabel = Titanium.UI.createLabel({ 
					color:'#444',
					top:'7dp',
					right: '15dp',
					width: 'auto',
					height:'36dp', 
					text: (measurement == 'Metric (SI)' ? 'm/s' : 'ft/sec'),
					
					font:{fontSize:'18dp', fontWeight: 'bold'},
					textAlign:'right',
				});			
				
				velocityOfDetonationRow.add(detonationPressureVelocityOfDetonationFieldLabel);	
				
				var detonationPressureTotalDescLabel = Titanium.UI.createLabel({
					color:'#444',
					height:'auto', 
					width:'auto',
					text:'Estimated Detonation Pressure:',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});	
				
				detonationPressureContentView.add(detonationPressureTotalDescLabel);
				
				var detonationPressureTotalLabel = Titanium.UI.createLabel({
					color:'#000',
					height:'auto', 
					width:'auto',
					text: calculateDetonationPressureTotal(),
					bottom: '25dp',
					font:{fontSize:'48dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: 0,
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,			
				});	
				
				detonationPressureDensityField.detonationPressureTotalLabel = detonationPressureTotalLabel;
				detonationPressureVelocityOfDetonationField.detonationPressureTotalLabel = detonationPressureTotalLabel;
				
				detonationPressureContentView.add(detonationPressureTotalLabel);				
				
				var detonationPressureScrollView = Titanium.UI.createScrollView({
				    contentHeight:'auto',
				    top: (54) + 'dp',					    
				});
				
				detonationPressureScrollView.add(detonationPressureContentView);
				
				detonationPressureWindow.add(detonationPressureScrollView);
				
				detonationPressureWindow.open({animated:true});					
					    		
	    		break;
	    	}
			case 'Pressure / Impulse': {
				var pressureImpulseWindow = Titanium.UI.createWindow({
					backgroundColor: '#eee',
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
				
				var pressureImpulseToolBar = createCustomToolbar({
					title: 'Pressure / Impulse',
					backWindow: pressureImpulseWindow,						
				});
			
				pressureImpulseWindow.add(pressureImpulseToolBar);
							
				var pressureImpulseContentView = Titanium.UI.createView({
				    height:'auto',
				    width: Ti.Platform.displayCaps.platformWidth,
				    left: 0,
				    layout:'vertical'
				});		
				
				var pressureImpulseLabel = Titanium.UI.createLabel({
					color:'#444',
					height:'auto', 
					width:'auto',
					text:'This tool estimates the pressure and impulse data from the given data.'
					+ ' The results shown are for a Hemi-Spherical Charge Surface Burst, as this'
					+ ' most replicates real life scenarios:',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});		
								
				pressureImpulseContentView.add(pressureImpulseLabel);
				
				
				var pressureImpulseTitlesData = [
				    {
				    	title:' ', 
				    	header:'Charge Mass', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'chargeMass',
				    	selectionEnabled: false,
				    },
				    {
				    	title:pressureImpulseTNTEquivalence, 
				    	header:'TNT Equivalence', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'tntEquivalence',
				    	hasChild: true
				    },			
				    {
				    	title:' ', 
				    	header:'Stand-off Distance', 
				    	selectedBackgroundColor: '#ff8f34', 
				    	ref: 'standOffDistance',
				    	selectionEnabled: false,
				    },		
				];
				
				var pressureImpulseTitlesTable = createCustomList({
				    top: '30dp',
				    bottom: '20dp',
				    height: '335dp',	
				    data:pressureImpulseTitlesData,
				    lines: true,
				    click: function(e) {
					    if(e.header == 'TNT Equivalence') {
							var pressureImpulseTNTEquivalenceWindow = Titanium.UI.createWindow({  
								backgroundColor: '#eee',
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
							
							var pressureImpulseTNTEquivalenceToolBar = createCustomToolbar({
								title: 'TNT Equivalence',
								backWindow: pressureImpulseTNTEquivalenceWindow,
							});
						
							pressureImpulseTNTEquivalenceWindow.add(pressureImpulseTNTEquivalenceToolBar);		
							
							var pressureImpulseTNTEquivalenceTable = Titanium.UI.createTableView({
								top: '54dp',
								separatorColor: '#ddd',
							    data: getPressureImpulseTNTEquivalenceData(pressureImpulseTNTEquivalenceTable),
							});
							
							pressureImpulseTNTEquivalenceTable.addEventListener('click', function(e){
								
								pressureImpulseTNTEquivalence = e.row.data;
								Ti.App.Properties.setString("pressure_impulse_tnt_equivalence", JSON.stringify(pressureImpulseTNTEquivalence));
								
								e.row.parent.setData(getPressureImpulseTNTEquivalenceData());
							});
							
							
							pressureImpulseTNTEquivalenceWindow.add(pressureImpulseTNTEquivalenceTable);
							
							pressureImpulseTNTEquivalenceWindow.open({animated:true});
						}
				    }
				});				
				
				pressureImpulseContentView.add(pressureImpulseTitlesTable);	
				
				var pressureImpulseCalculateButton = Titanium.UI.createButton({ 
					title: 'Calculate', 
					top: '25dp',
					bottom: '25dp',
					height: '44dp',
					backgroundImage: '/images/blue.png',
					width: '270dp',
					color: '#fff',
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue', fontWeight: 'bold'},
					pressureImpulseChargeMassField: undefined,
					pressureImpulseStandOffDistanceField: undefined,
				}); 	
				
				pressureImpulseCalculateButton.addEventListener('touchstart',function(e) {
					e.source.backgroundImage = '/images/blue_sel.png';
				});
				
				pressureImpulseCalculateButton.addEventListener('touchcancel',function(e) {
					e.source.backgroundImage = '/images/blue.png';
				});				
				
				pressureImpulseCalculateButton.addEventListener('touchend',function(e) {
					
					e.source.backgroundImage = '/images/blue.png';
					
					//apply changes again
					applyPressureImpulseChargeMassField(e.source.pressureImpulseChargeMassField);
					applypressureImpulseStandOffDistanceField(e.source.pressureImpulseStandOffDistanceField);
				
					var pressureImpulseResultsWindow = Titanium.UI.createWindow({  
						backgroundColor: '#eee',
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
					
					var pressureImpulseResultsToolBar = createCustomToolbar({
						title: 'Results',
						backWindow: pressureImpulseResultsWindow,
					});
				
					pressureImpulseResultsWindow.add(pressureImpulseResultsToolBar);			

					var pressureImpulseResultsTitlesTable = createCustomList({
					    top: (54) + 'dp',
					    height: 'auto',	
					    data:getPressureImpulseResultsTitleData(),
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
					
					pressureImpulseResultsWindow.add(pressureImpulseResultsTitlesTable);	
					
					pressureImpulseResultsWindow.open({animated:true});	
				});					
				
				pressureImpulseContentView.add(pressureImpulseCalculateButton);				
				
				var chargeMassRow = pressureImpulseTitlesTable.refs['chargeMass'];		
				
		        var pressureImpulseChargeMassField = Ti.UI.createTextField({ 
		            hintText:'Enter a Charge Mass',
		            height:'36dp',
		            width:	chargeMassRow.width * 0.85,
		            top:'12dp',
		            borderWidth: 1,
		            borderRadius: 15, 
		            borderStyle: Titanium.INPUT_BORDERSTYLE_ROUNDED, 
		            value: (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseChargeMass, 3) : roundNumber((parseFloat(pressureImpulseChargeMass) * 2.20462), 3)),
		            left: '5dp',
		            backgroundImage: '/images/transparent.png',
		            font:{fontSize:'18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue'},
		            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION ,
		        });		
		        pressureImpulseChargeMassField.addEventListener('blur', function(e){	
					applyPressureImpulseChargeMassField(e);
		        });		
		        pressureImpulseChargeMassField.addEventListener('return', function(e){	
					applyPressureImpulseChargeMassField(e);
		        });
				pressureImpulseChargeMassField.addEventListener('change',function(e){
				    e.source.value = e.source.value.replace(/[^0-9\.]+/g,"");
				});			       
				
				pressureImpulseCalculateButton.pressureImpulseChargeMassField = pressureImpulseChargeMassField;
		        
		        chargeMassRow.add(pressureImpulseChargeMassField);
		        
				var pressureImpulseChargeMassFieldLabel = Titanium.UI.createLabel({ 
					color:'#444',
					top:'7dp',
					right: '15dp',
					width: 'auto',
					height:'36dp', 
					text: (measurement == 'Metric (SI)' ? 'kg' : 'lb'),
					
					font:{fontSize:'18dp', fontWeight: 'bold'},
					textAlign:'right',
				});		      
				
				chargeMassRow.add(pressureImpulseChargeMassFieldLabel);  
		        
		        var tntEquivalenceRow = pressureImpulseTitlesTable.refs['tntEquivalence'];
		        
				//ensure that a ref of tntEquivalenceRow remainds in the window for updates
				pressureImpulseWindow.tntEquivalenceRow = tntEquivalenceRow;		        
		        
		        //update the value when this window opens again
		        pressureImpulseWindow.addEventListener("focus", function(e) {
		        	if(e.source.tntEquivalenceRow != undefined) {
		        		e.source.tntEquivalenceRow.text.text = pressureImpulseTNTEquivalence;
		        	}
		        });			
				
				var standOffDistanceRow = pressureImpulseTitlesTable.refs['standOffDistance'];	
				
		        var pressureImpulseStandOffDistanceField = Ti.UI.createTextField({ 
		            hintText:'Enter a Stand-off Distance',
		            height:'36dp',
		            width:	standOffDistanceRow.width * 0.85,
		            top:'12dp',
		            borderWidth: 1,
		            borderRadius: 15, 
		            borderStyle: Titanium.INPUT_BORDERSTYLE_ROUNDED, 
		            value: (measurement == 'Metric (SI)' ? roundNumber(pressureImpulseStandOffDistance, 3) : roundNumber((parseFloat(pressureImpulseStandOffDistance) * 3.2808399), 3)),
		            left: '5dp',
		            backgroundImage: '/images/transparent.png',
		            font:{fontSize:'18dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue'},
		            keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		        });		
		        pressureImpulseStandOffDistanceField.addEventListener('blur', function(e){	
					applypressureImpulseStandOffDistanceField(e);
		        });		
		        pressureImpulseStandOffDistanceField.addEventListener('return', function(e){	
					applypressureImpulseStandOffDistanceField(e);
					e.source.blur();
		        });
				pressureImpulseStandOffDistanceField.addEventListener('change',function(e){
				    e.source.value = e.source.value.replace(/[^0-9\.]+/g,"");
				});		
				
		        standOffDistanceRow.add(pressureImpulseStandOffDistanceField);
		        
				var pressureImpulseStandOffDistanceFieldLabel = Titanium.UI.createLabel({ 
					color:'#444',
					top:'7dp',
					right: '15dp',
					width: 'auto',
					height:'36dp', 
					text: (measurement == 'Metric (SI)' ? 'm' : 'ft'),
					
					font:{fontSize:'18dp', fontWeight: 'bold'},
					textAlign:'right',
				});		      
				
				standOffDistanceRow.add(pressureImpulseStandOffDistanceFieldLabel);  		        
		        
		        pressureImpulseCalculateButton.pressureImpulseStandOffDistanceField = pressureImpulseStandOffDistanceField;  					
				
				
				var pressureImpulseScrollView = Titanium.UI.createScrollView({
				    contentHeight:'auto',
				    top: (54) + 'dp',					    
				});
				
				pressureImpulseScrollView.add(pressureImpulseContentView);
				
				pressureImpulseWindow.add(pressureImpulseScrollView);
				
				pressureImpulseWindow.open({animated:true});				
				break;
			}
		}
	}  
});

tab2view.add(blastAnalysisTitlesTable);

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

function calculateAcousticTotal() {
	//215 * (Charge Mass (in metres) * TNT Equiv)^(1/3)
	var part1 = (parseFloat(acousticEstimatesChargeMass) * parseFloat(jsonData.tntItem[acousticEstimatesTNTEquivalence].equivalence));
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

function applyDangerAreasAllUpWeightField(dangerAreasAllUpWeightField) {
	//check if value is a valid value
	if(isNumber(dangerAreasAllUpWeightField.value)) {
	    dangerAreasAllUpWeight = (measurement == 'Metric (SI)' ? parseFloat(dangerAreasAllUpWeightField.value) : (parseFloat(dangerAreasAllUpWeightField.value) * 0.453592));
	    Ti.App.Properties.setString("danger_areas_all_up_weight", JSON.stringify(dangerAreasAllUpWeight));
	}
}

function applyAcousticEstimatesChargeMassField(acousticEstimatesChargeMassField) {
	//check if value is a valid value
	if(isNumber(acousticEstimatesChargeMassField.value)) {
	    acousticEstimatesChargeMass = (measurement == 'Metric (SI)' ? parseFloat(acousticEstimatesChargeMassField.value) : (parseFloat(acousticEstimatesChargeMassField.value) * 0.453592));
	    Ti.App.Properties.setString("acoustic_esimates_charge_mass", JSON.stringify(acousticEstimatesChargeMass));
		//update total
	    acousticEstimatesChargeMassField.source.acousticEstimatesTotalLabel.text = calculateAcousticTotal();
	} 
}

function applyPressureImpulseChargeMassField(pressureImpulseChargeMassField){
	//check if value is a valid value
	if(isNumber(pressureImpulseChargeMassField.value)) {
	    pressureImpulseChargeMass = (measurement == 'Metric (SI)' ? parseFloat(pressureImpulseChargeMassField.value) : (parseFloat(pressureImpulseChargeMassField.value) * 0.453592));
	    Ti.App.Properties.setString("pressure_impulse_charge_mass", JSON.stringify(pressureImpulseChargeMass));
	}
}

function applypressureImpulseStandOffDistanceField(pressureImpulseStandOffDistanceField) {
	//check if value is a valid value
	if(isNumber(pressureImpulseStandOffDistanceField.value)) {
	    pressureImpulseStandOffDistance = (measurement == 'Metric (SI)' ? parseFloat(pressureImpulseStandOffDistanceField.value) : (parseFloat(pressureImpulseStandOffDistanceField.value) * 0.30479999953));
	    Ti.App.Properties.setString("pressure_impulse_standoff_distance", JSON.stringify(pressureImpulseStandOffDistance));
	} 
}

function applyConsequenceChargeMassField(consequenceChargeMassField){
	//check if value is a valid value
	if(isNumber(consequenceChargeMassField.value)) {
	    consequenceChargeMass = (measurement == 'Metric (SI)' ? parseFloat(consequenceChargeMassField.value) : (parseFloat(consequenceChargeMassField.value) * 0.453592));
	    Ti.App.Properties.setString("pressure_impulse_charge_mass", JSON.stringify(consequenceChargeMass));
	}
}

function applyconsequenceStandOffDistanceField(consequenceStandOffDistanceField) {
	//check if value is a valid value
	if(isNumber(consequenceStandOffDistanceField.value)) {
	    consequenceStandOffDistance = (measurement == 'Metric (SI)' ? parseFloat(consequenceStandOffDistanceField.value) : (parseFloat(consequenceStandOffDistanceField.value) * 0.30479999953));
	    Ti.App.Properties.setString("pressure_impulse_standoff_distance", JSON.stringify(consequenceStandOffDistance));
	} 
}

function applyDetonationPressureDensityField(detonationPressureDensityField) {
	//check if value is a valid value
	if(isNumber(detonationPressureDensityField.value)) {
	    detonationPressureDensity = (measurement == 'Metric (SI)' ? parseFloat(detonationPressureDensityField.value) : 
	    (measurement == 'UK Imperial' ? (parseFloat(detonationPressureDensityField.value) * 97.8078469094) : (parseFloat(detonationPressureDensityField.value) * 119.8264)));
	    Ti.App.Properties.setString("detonation_pressure_density", JSON.stringify(detonationPressureDensity));
		//update total
	    detonationPressureDensityField.source.detonationPressureTotalLabel.text = calculateDetonationPressureTotal();
	}
}

function applyDetonationPressureVelocityOfDetonationField(detonationPressureVelocityOfDetonationField) {
		//check if value is a valid value
	if(isNumber(detonationPressureVelocityOfDetonationField.value)) {
	    detonationPressureVelocityOfDetonation = (measurement == 'Metric (SI)' ? parseFloat(detonationPressureVelocityOfDetonationField.value) : (parseFloat(detonationPressureVelocityOfDetonationField.value) * 0.3048));
	    Ti.App.Properties.setString("detonation_pressure_velocity_of_detonation", JSON.stringify(detonationPressureVelocityOfDetonation));
		//update total
	    detonationPressureVelocityOfDetonationField.source.detonationPressureTotalLabel.text = calculateDetonationPressureTotal();
	}
}

function getAcousticEstimatesTNTEquivalenceData(acousticEstimatesTNTEquivalenceTable) {
	var acousticEstimatesTNTEquivalenceData = [];
				
	for(var i = 0; i < jsonData.tnt.length; i++ ) {
		var ticked = false;
		
		if(acousticEstimatesTNTEquivalence == jsonData.tnt[i]) {
			ticked = true;
		}
		
		var row = Ti.UI.createTableViewRow({
    		title: '',	
    		selectedBackgroundColor: '#ff8f34',
    		hasCheck: ticked,
    		className: 'noHeader',
    		right: '10dp',    		
    		data: jsonData.tnt[i],
    		parent: acousticEstimatesTNTEquivalenceTable,
    	});
    	
	   var text = Ti.UI.createLabel ({
		    text: ((jsonData.tnt[i].length > 30 && Ti.Platform.displayCaps.platformWidth < 481) ? (jsonData.tnt[i].substring(0,30) + '...') : jsonData.tnt[i]),
		    color:'#000',
		    font:{fontSize:'20dp', fontWeight:'bold', fontFamily:'Helvetica Neue' },
		    width:Ti.Platform.displayCaps.platformWidth - 50,
		    height:'auto',
		    top:'10dp',
		    bottom: '10dp',
		    left:'10dp',
		    touchEnabled: false,
		});    	
    	
    	
    	row.add(text);
    	acousticEstimatesTNTEquivalenceData.push(row);
	}
	
	return acousticEstimatesTNTEquivalenceData;
}

function getConsequenceTNTEquivalenceData(consequenceTNTEquivalenceTable) {
	var consequenceTNTEquivalenceData = [];
				
	for(var i = 0; i < jsonData.tnt.length; i++ ) {
		var ticked = false;
		
		if(consequenceTNTEquivalence == jsonData.tnt[i]) {
			ticked = true;
		}
		
		var row = Ti.UI.createTableViewRow({
    		title: '',	
    		selectedBackgroundColor: '#ff8f34',
    		hasCheck: ticked,
    		className: 'noHeader',
    		right: '10dp',    		
    		data: jsonData.tnt[i],
    		parent: consequenceTNTEquivalenceTable,
    	});
    	
	   var text = Ti.UI.createLabel ({
		    text: ((jsonData.tnt[i].length > 30 && Ti.Platform.displayCaps.platformWidth < 481) ? (jsonData.tnt[i].substring(0,30) + '...') : jsonData.tnt[i]),
		    color:'#000',
		    font:{fontSize:'20dp', fontWeight:'bold', fontFamily:'Helvetica Neue' },
		    width:Ti.Platform.displayCaps.platformWidth - 50,
		    height:'auto',
		    top:'10dp',
		    bottom: '10dp',
		    left:'10dp',
		    touchEnabled: false,
		});    	
    	
    	
    	row.add(text);
    	consequenceTNTEquivalenceData.push(row);
	}
	
	return consequenceTNTEquivalenceData;
}

function getPressureImpulseTNTEquivalenceData(pressureImpulseTNTEquivalenceTable) {
	var pressureImpulseTNTEquivalenceData = [];
				
	for(var i = 0; i < jsonData.tnt.length; i++ ) {
		var ticked = false;
		
		if(pressureImpulseTNTEquivalence == jsonData.tnt[i]) {
			ticked = true;
		}
		
		var row = Ti.UI.createTableViewRow({
    		title: '',	
    		selectedBackgroundColor: '#ff8f34',
    		hasCheck: ticked,
    		className: 'noHeader',
    		right: '10dp',    		
    		data: jsonData.tnt[i],
    		parent: pressureImpulseTNTEquivalenceTable,
    	});
    	
	   var text = Ti.UI.createLabel ({
		    text: ((jsonData.tnt[i].length > 30 && Ti.Platform.displayCaps.platformWidth < 481) ? (jsonData.tnt[i].substring(0,30) + '...') : jsonData.tnt[i]),
		    color:'#000',
		    font:{fontSize:'20dp', fontWeight:'bold', fontFamily:'Helvetica Neue' },
		    width:Ti.Platform.displayCaps.platformWidth - 50,
		    height:'auto',
		    top:'10dp',
		    bottom: '10dp',
		    left:'10dp',
		    touchEnabled: false,
		});    	
    	
    	
    	row.add(text);
    	pressureImpulseTNTEquivalenceData.push(row);
	}
	
	return pressureImpulseTNTEquivalenceData;
}

function getPressureImpulseResultsTitleData() {
	var peakIncidentPressure = calculatePeakIncidentPressure(pressureImpulseChargeMass, jsonData.tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandOffDistance);
	
	if(peakIncidentPressure == 'Inavlid') {
		var statusAlert = Titanium.UI.createAlertDialog({title: 'Invalid values entered',message: 'The values are not within this tool\'s threshold'});
		statusAlert.show();
	}
		
	return [{
	    		title:peakIncidentPressure, 
	    		header:'Peak Incident Pressure',  
	    		selectedBackgroundColor: '#ff8f34',
		    },
		    {
		    	title:calculatePeakReflectedPressure(pressureImpulseChargeMass, jsonData.tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandOffDistance),
		    	header:'Peak Reflected Pressure',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculateIncidentImpulse(pressureImpulseChargeMass, jsonData.tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandOffDistance),
		    	header:'Incident Impulse',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculateReflectedImpulse(pressureImpulseChargeMass, jsonData.tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandOffDistance),
		    	header:'Reflected Impulse',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculateShockFrontVelocity(pressureImpulseChargeMass, jsonData.tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandOffDistance),
		    	header:'Shock Front Velocity',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculateArrivalTime(pressureImpulseChargeMass, jsonData.tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandOffDistance),
		    	header:'Arrival Time',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		    {
		    	title:calculatePositivePhaseDuraction(pressureImpulseChargeMass, jsonData.tntItem[pressureImpulseTNTEquivalence].equivalence, pressureImpulseStandOffDistance),
		    	header:'Positive Phase Duraction',  
		    	selectedBackgroundColor: '#ff8f34'
		    },
		] ;
}

function getConsequenceResultsTitleData() {
	
	var peakReflectedPressureVal = calculatePeakReflectedPressure(consequenceChargeMass, jsonData.tntItem[consequenceTNTEquivalence].equivalence, consequenceStandOffDistance, true);
	
	var red = '#e18383';
	var green = '#8be183';
	
	return [{
		    	title: (measurement == 'Metric (SI)' ? '34.5 kPa' : '718 lb/ft²-force') ,
		    	header:'Ear Drum Rupture Threshold',  
		    	selectionEnabled: false,
	    		backgroundColor: (peakReflectedPressureVal > 34.5 ? red : green),		    	
		    },
		    {
		    	title:(measurement == 'Metric (SI)' ? '203 kPa' : '4,224 lb/ft²-force') ,
		    	header:'Lung Damage Threshold',  
		    	selectionEnabled: false,
		    	backgroundColor: (peakReflectedPressureVal > 203 ? red : green),	
		    },
		    {
		    	title:(measurement == 'Metric (SI)' ? '690 kPa' : '14,359 lb/ft²-force'),
		    	header:'Fatality Threshold',  
		    	selectionEnabled: false,
		    	backgroundColor: (peakReflectedPressureVal > 690 ? red : green),	
		    },
		    {
		    	title:(measurement == 'Metric (SI)' ? '897 kPa' : '18,667 lb/ft²-force'),
		    	header:'50% Fatalities',  
		    	selectionEnabled: false,
		    	backgroundColor: (peakReflectedPressureVal > 897 ? red : green),	
		    },
		    {
		    	title:(measurement == 'Metric (SI)' ? '1,380 kPa' : '28,718 lb/ft²-force'),
		    	header:'99% Fatalities',  
		    	selectionEnabled: false,
		    	backgroundColor: (peakReflectedPressureVal > 1380 ? red : green),	
		    },
		] ;
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

function calculateScaledDistance(chargeMass, tntEquivalance, standoffDistance) {
	return parseFloat(standoffDistance) / (Math.pow(parseFloat(tntEquivalance) * parseFloat(chargeMass), (1/3)));
}

function log10(val) {
  return Math.log(val) / Math.log(10);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}