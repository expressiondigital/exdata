//global vars
function DPUnitsToPixels(TheDPUnits)
{
    if ( Titanium.Platform.displayCaps.dpi > 160 )
          return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
    else 
        return TheDPUnits;
}	

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

var pressureImpulseStandOffDistance = JSON.parse(Ti.App.Properties.getString("pressure_impulse_standoff_distance"));
if(pressureImpulseStandOffDistance == undefined) {
	pressureImpulseStandOffDistance = '10';
}

var consequenceTNTEquivalence = JSON.parse(Ti.App.Properties.getString("consequence_tnt_equivalence"));
if(consequenceTNTEquivalence == undefined) {
	consequenceTNTEquivalence = 'TNT';
}

var consequenceChargeMass = JSON.parse(Ti.App.Properties.getString("consequence_charge_mass"));
if(consequenceChargeMass == undefined) {
	consequenceChargeMass = '10';
}

var consequenceStandOffDistance = JSON.parse(Ti.App.Properties.getString("consequence_standoff_distance"));
if(consequenceStandOffDistance == undefined) {
	consequenceStandOffDistance = '10';
}

var dangerAreasAllUpWeight = JSON.parse(Ti.App.Properties.getString("danger_areas_all_up_weight"));
if(dangerAreasAllUpWeight == undefined) {
	dangerAreasAllUpWeight = '10';
}

// include control JS
Ti.include("CustomTabGroup.js");
Ti.include("JsonData.js");

//first we load all the JSON data
var jsonData = loadJsonData();




// create main window 
var mainWindow = Ti.UI.createWindow({
	backgroundColor: '#000',
	tabBarHidden:true,	
	navBarHidden:true,	
	statusBarHidden:true,
	exitOnClose: true,
	orientationModes: [ // at this time, it works only on portrait screens
		Titanium.UI.UPSIDE_PORTRAIT,
		Titanium.UI.PORTRAIT,
	],
	
	modal:true,
});

// include tab contents
Ti.include("/tab1view.js");
Ti.include("/tab2view.js");
Ti.include("/tab3view.js");
Ti.include("/tab4view.js");

// calculate window independed icon size (we store 64x64 icons in this sample)

var ratio480 = Ti.Platform.displayCaps.platformWidth / 480; 
var iconWH = 50 * ratio480;


// tab group configuraiton goes here
// create full-screen tab group container


var tabGroup = createCustomTabGroup({
	tabs: [ 
		{
			name: "explosives",
			title: "Explosives",
			
			imagePath: "/images/tab_explosives@64x64.png",
			selectedImagePath: "/images/tab_explosives@64x64sel.png",
			imageWidth: iconWH,
			imageHeight: iconWH,
			
			view: tab1view,
		},
		
		{ 
			name: 'blast_analysis',
			title: "Blast Analysis",
			imagePath: "/images/tab_blast_analysis@64x64.png",
			selectedImagePath: "/images/tab_blast_analysis@64x64sel.png",
			imageWidth: iconWH,
			imageHeight: iconWH,
			
			view: tab2view,

		},
		{
			name: "settings",
			title: "Settings",
			imagePath: "/images/tab_settings@64x64.png",
			selectedImagePath: "/images/tab_settings@64x64sel.png",
			imageWidth: iconWH,
			imageHeight: iconWH,
			
			view: tab3view,
		},
		{
			name: "more",
			title: "More",
			imagePath: "/images/tab_more@64x64.png",
			selectedImagePath: "/images/tab_more@64x64sel.png",
			imageWidth: iconWH,
			imageHeight: iconWH,
			
			view: tab4view,
		}
	],
	
	tabClick: function(e) {
		
		// switch between tabs
		tabGroup.setActiveTab(e.index);		
		tabGroup.setTabBadge("order", "tab " + e.index)
	},
});

mainWindow.add(tabGroup.root)
tabGroup.setActiveTab('explosives');	

// open tab group
//open sponsor window, then open tabgroup
var sponsorWindow = Titanium.UI.createWindow({
	title: 'Sponsor',
	backgroundImage: '/images/sponsor-background.png',
	tabBarHidden:true,	
	navBarHidden:true,	
	statusBarHidden:true,
	orientationModes: [ // at this time, it works only on portrait screens
		Titanium.UI.UPSIDE_PORTRAIT,
		Titanium.UI.PORTRAIT,
	],
	
	modal:true,	
});  


var sponsorImageContainer = Titanium.UI.createView({
	top: ((Titanium.Platform.displayCaps.platformHeight /2) - DPUnitsToPixels(75)),
	layout: 'vertical',
	width: Titanium.Platform.displayCaps.platformWidth,
	height: 'auto',
});

var sponsorImage = Titanium.UI.createView({
	width: '294dp',
	height: '95dp',
	backgroundImage: '/images/sponsor.png',
	layout:'vertical'	
});

sponsorImageContainer.add(sponsorImage);

var sponsorText = Titanium.UI.createLabel({
	width: Titanium.Platform.displayCaps.platformWidth,
	top:'40dp',
	text: 'eXdata is sponsored by',
	color: '#444',
	shadowOffset:{x:1,y:1},
	font: {  fontSize: '18dp',  fontFamily: 'Helvetica Neue' },
	shadowColor:'#fff',
	textAlign: 'center',	
});

var sponsorText2 = Titanium.UI.createLabel({
	width: Titanium.Platform.displayCaps.platformWidth,
	bottom:'40dp',
	text: 'www.eodsonline.com',
	color: 'blue',
	shadowOffset:{x:1,y:1},
	font: {  fontSize: '18dp',  fontFamily: 'Helvetica Neue' },
	shadowColor:'#fff',
	textAlign: 'center',	
});

sponsorText2.addEventListener('click', function(e){
	Titanium.Platform.openURL('http://www.eodsonline.com');
});

sponsorWindow.add(sponsorImageContainer);
sponsorWindow.add(sponsorText);
sponsorWindow.add(sponsorText2);
//sponsorWindow.add(eXdataImage);

sponsorWindow.open();

setTimeout(function() {
    mainWindow.open();
}, 5000);

	
