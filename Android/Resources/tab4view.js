Ti.include("CustomToolBar.js");

var tab4view = Ti.UI.createView({
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: '#fff'
})

var toolBar = createCustomToolbar({
		title: 'More',
	});

tab4view.add(toolBar);

var moreTitlesData = [
    {title:'Risk Management', header:'', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    {title:'About', header:'', hasChild: true, selectedBackgroundColor: '#ff8f34'},
	{title:'Tell a Friend', header:'',  selectedBackgroundColor: '#ff8f34'},    
    {title:'Terms and Conditions', header:'', hasChild: true, selectedBackgroundColor: '#ff8f34'},
    //{title:'Vote for this app', selectedBackgroundColor: '#ff8f34'},
];
var moreTitlesTable = createCustomList({
    top: (54) + 'dp',
    height: 'auto',	
    data:moreTitlesData,
    
    click: function(e) {
	    switch (e.title) {
			case 'Tell a Friend': {
				var emailDialog = Titanium.UI.createEmailDialog();
				
				emailDialog.subject = "Take a look at this Android app";
				emailDialog.toRecipients = [];
				emailDialog.messageBody = 'Hello,\n\n' 
				+ 'I recently downloaded the eXdata application from the Google Play Store.\n\n'
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
				+ 'You can find the xData app on the Google Play Store for only GBP £10.99.';
				
				emailDialog.open();		
				break;
			}
			case 'Risk Management': {
			
				var riskManagementWindow = Titanium.UI.createWindow({
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
				
				var riskManagementToolBar = createCustomToolbar({
					title: 'Risk Management',
					backWindow: riskManagementWindow,			
				});
			
				riskManagementWindow.add(riskManagementToolBar);
							
				var riskManagementContentView = Titanium.UI.createView({
				    height:'auto',
				    width: Ti.Platform.displayCaps.platformWidth,
				    left: 0,
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
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					left: 25,
					width: (Ti.Platform.displayCaps.platformWidth - 50),
					top: '25dp',
				});

				
				var diagramView = Ti.UI.createView( {
					height: '362dp',
					width: '270dp',
					top: '20dp',
					bottom: '30dp',
					backgroundImage: '/images/risk_management.png',	
				});				
						
				riskManagementContentView.add(riskManagementLabel);
				riskManagementContentView.add(diagramView);
				
				
				
				var riskManagementScrollView = Titanium.UI.createScrollView({
				    contentHeight:'auto',
				    top: (54) + 'dp',				    
				});
				
				riskManagementScrollView.add(riskManagementContentView);

				riskManagementWindow.add(riskManagementScrollView);			
				
				riskManagementWindow.open({animated:true});
							
				break;
			}	
			case 'Terms and Conditions': {
			
				var termsWindow = Titanium.UI.createWindow({  
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
				
				var termsToolBar = createCustomToolbar({
					title: 'Terms and Conditions',
					backWindow: termsWindow,					
				});
			
				termsWindow.add(termsToolBar);				
				
				var termsContentView = Titanium.UI.createView({
				    height:'auto',
				    backgroundColor:'#eee',
				    top:0,
				    left:0,
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
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					bottom: '20dp',
					left: 25,
					width: (Ti.Platform.displayCaps.platformWidth - 50),					
				});
				
				termsContentView.add(termsLabel);
				
				var termsScrollView = Titanium.UI.createScrollView({
				    contentHeight:'auto',
				    top: (54) + 'dp',					    
				});
				
				termsScrollView.add(termsContentView);
				 
				termsWindow.add(termsScrollView);
				
				termsWindow.open({animated:true});			
				
				break;
					
			}	
			case 'About': {
				
				var informationWindow = Titanium.UI.createWindow({  
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
				
				var informationToolBar = createCustomToolbar({
					title: 'About',
					backWindow: informationWindow,				
				});
			
				informationWindow.add(informationToolBar);						
				
				var informationContentView = Titanium.UI.createView({
				    height:'auto',
				    backgroundColor:'#eee',
				    top:0,
				    left:0,
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
					+ ' information or amendments should be sent to:\n',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					top: '25dp',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					left: 25,					
				});
				
				var information2Label = Titanium.UI.createLabel({
					color:'#444',
					height:'auto', 
					width:'auto',
					left: 25,
					text:'They will be included in the next updated version of the application.  Similarly any data on'
					+ ' new explosives can be submitted the same way.\n\n'
					+ ' This application was developed by:\n\n'
					+ '•	DomGan (UK); and',
					
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
				});			
				
				var information3Label = Titanium.UI.createLabel({
					color:'#444',
					top:'20dp',
					height:'auto', 
					width:'100%',
					text:'•	Explosive Capabilities Limited',
					left: 25,
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
				});
				
				var information4Label = Titanium.UI.createLabel({
					color:'#444',
					top:'20dp',
					height:'auto', 
					bottom: '30dp',
					width:'100%',
					left: 25,
					text:'Explosive Capabilities (UK) Limited disclaim any liability incurred'
					+ ' in conjunction with the use of any information in this application.\n\n'
					+ 'Additional forthcoming Apps include:\n\n'
					+ '•	eXstore – for the estimation of safe storage quantity distances.'
					+ ' Includes Hazard Division and Compatibility Group data.',
					width: (Ti.Platform.displayCaps.platformWidth - 50),	
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
				});
				
				var informationLink1Label = Titanium.UI.createLabel({
					color:'#444',
					color: "blue",
					height:'auto', 
					width:'auto',
					left: 45,
					bottom: '25dp',
					text:'director@explosivecapabilities.com',
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
				});			
				
				var informationLink2Label = Titanium.UI.createLabel({
					color:'#444',
					color: "blue",
					height:'auto', 
					width:'auto',
					left: 45,
					text:'www.domgan.com',
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
				});
				
				var informationLink3Label = Titanium.UI.createLabel({
					color:'#444',
					color: "blue",
					height:'auto', 
					width:'auto',
					left: 45,
					text:'www.explosivecapabilities.com',
					font:{fontSize:'16dp',fontFamily:'Helvetica Neue'},
					textAlign:'left',
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
				    top: (54) + 'dp',					    
				});
				
				informationScrollView.add(informationContentView);
				 
				informationWindow.add(informationScrollView);
				
				informationWindow.open({animated:true});
				
				break;
			}
		}
    }    
});

tab4view.add(moreTitlesTable);