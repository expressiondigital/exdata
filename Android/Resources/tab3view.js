Ti.include("CustomToolBar.js");

var tab3view = Ti.UI.createView({
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: '#fff'
})

var toolBar = createCustomToolbar({
		title: 'Settings',
	});

tab3view.add(toolBar);

var settingsTitlesData = [
    {title:'Units', header:'Measurements Displayed', hasChild: false, selectionEnabled: false, ref: 'measurementsRow'},
];

var settingsTitlesTable = createCustomList({
    top: (54) + 'dp',
    height: 'auto',	
    data:settingsTitlesData,
});

var measurementsRow = settingsTitlesTable.refs['measurementsRow'];

var settingsPicker = Ti.UI.createPicker({
	right: '15dp',
	top: '5dp',	
});

settingsPicker.addEventListener('change',function() {
	measurement = settingsPicker.getSelectedRow(0).title;
	Ti.App.Properties.setString("measurement", JSON.stringify(measurement));
});

mainWindow.addEventListener('open', function() {

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

settingsPicker.selectionIndicator=true;

var settingsPickerData = [
	Titanium.UI.createPickerRow({title:'Metric (SI)'}),
	Titanium.UI.createPickerRow({title:'UK Imperial'}),
	Titanium.UI.createPickerRow({title:'US Imperial'}),
];

settingsPicker.add(settingsPickerData);

measurementsRow.add(settingsPicker);


tab3view.add(settingsTitlesTable);
