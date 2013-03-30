// custom iPhone looking tab group for Android and so on. Please take a look to app.js to find some usages

// *** input param:
//
// tabs: [] // tab definitions
//   - (optional) visible: bool - whether the tab visible on default
//   - (optional) imagePath: string - path to unselected icon
//   - (optional) selectedImagePath: string - path to selected icon
//   - (optional) imageWidth - self-describing
//   - (optional) imageHeight - self-describing
//   - name: string - name of tab (you can point on tab either by index or by tab name when calling tab group methods)
//   - title: string - tab visible name (title)
//   - (optional) badge: string - tab badge 
//   - (optional) titleFont: {FONT} - tab font
//   - (optional) view: Ti.UI.View - tab view
//   - tabClick: function(tabNo0Based) - click handler
//
// *** returns:
//  {
//    root: view - tabgroup container (usually full screen). all tab views will be placed inside this
//    tabCount: number of tabs created
//    activeTab: zero-based active tab index ot null if no tab is selected
//
//    setActiveTab: function(tabNo0BasedOrName) - change tab method
//    setTabBadge: function(tabNo0BasedOrName, badgeText) - set tab badge
//    addTab: function(tab) - add new tab
//    setTabVisible(tabNo0Based, visibleFlag) - set tab visibility
//  }

var createCustomTabGroup = function(init) {
	
	// magic constants, sizes, ratios and so on
	
	
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
	    if ( Titanium.Platform.displayCaps.dpi > 160 )
	        return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
	    else 
	        return ThePixels;
	}
	 
	 
	function DPUnitsToPixels(TheDPUnits)
	{
	    if ( Titanium.Platform.displayCaps.dpi > 160 )
	          return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
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


	////////////////////////////////////////////////
	// sorry for non-english comments below
	//   -- yury

	// tabGroup занимает все пространство дисплея
	var tabGroupView = Ti.UI.createView( {
		left:0,
		top:0,
		width: Ti.Platform.displayCaps.platformWidth,
		height: UI_MAIN_AREA_NOTAB_HEIGHT, // notab - поскольку мы и будем встраивать табы внутрь вьющки
		// backgroundColor: 'red',
	} );
	
	var containerView = Ti.UI.createView( {
		left:0,
		top:0,
		width: UI_SCR_WIDTH,
		height: UI_MAIN_AREA_NOTAB_HEIGHT - BG_H * get_height_scale_480(),

		// backgroundColor: 'green',
	} );
	
	tabGroupView.add(containerView);
	
	var bar =  Ti.UI.createView( 
		{ 
			top: UI_MAIN_AREA_NOTAB_HEIGHT - BG_H * get_height_scale_480(),
			left: 0,
			width: Ti.Platform.displayCaps.platformWidth,
			height: BG_H * get_height_scale_480(),
			//backgroundColor: 'red',
			backgroundImage: '/images/bg_tabgroup_bottom.png',	
		}
	);
	
	tabGroupView.add(bar);

	var tabs = [];
	if (typeof(init.tabs) != 'undefined') {
		tabs = init.tabs;
	}
	
	var tabUI = {
		root: tabGroupView,
		activeTab: null,
		
		addTab: function(tabInfo) {
			this._tabs.push(tabInfo);
			this._refreshTabs();
		},
		
		setActiveTab: function(tabNoOrName) {
			
			var tabNo = this._findTabIndex(tabNoOrName);
			if (tabNo < 0) return;
			
			if (tabNo == this.activeTab) {
				return; // avoid redundand switches
			}
			
			if (tabNo < 0 || tabNo > (this._tabs.length -1 )) {
				return; // bad, bad-bad tabNo
			}
			
			if (this.activeTab != null) { // если таб был активен - сбросить его
				var tabView = this._getTabView(this.activeTab);
				tabView.setActive(false);
				
				var cv = this._getTabContentView(this.activeTab);
				cv.setVisible(false);
			};
			
			var tabView = this._getTabView(tabNo);
			tabView.setActive(true);
			
			var cv = this._getTabContentView(tabNo);
			cv.setVisible(true);
			
			
			this.activeTab = tabNo;
		},
	
		setTabBadge: function(tabNo0BasedOrName, badgeText) {
			var idx = this._findTabIndex(tabNo0BasedOrName);
			if (idx < 0) return;
			
			var tabView = this._getTabView(idx);
			tabView.setBadge(badgeText);
		},
		
		getTabInfo: function(tabNo0BasedOrName) {
			var idx = this._findTabIndex(tabNo0BasedOrName);
			if (idx < 0) return;
			
			return this._tabs[idx];			
		},
		
		//////////////////////////////////
		// internal: не рекомендуется методы могут измениться
		_tabs: tabs,
		_titleFont: {
			fontSize : get_scaled_font_size(8), 
			fontWeight : 'bold', 
			fontFamily: 'Helvetica Neue' 
		},
		
		_badgeFont: {
			fontSize : get_scaled_font_size(9), 
			fontWeight : 'bold', 
			fontFamily: 'Helvetica Neue' 
		},
		
		// перестроить весь tabGroup
		_refreshTabs: function() {
			this._refreshContentViews();
			this._refreshTabButtons();
		},
		
	
		// поиск таба. если не найден, вернет -1
		_findTabIndex: function(indexOrName) {
			// если уже дали индекс, его и вернуть
			if (indexOrName >= 0) return indexOrName;
			
			for (kid in this._tabs) {
				var tab = this._tabs[kid];
				
				if (typeof(tab.name) == 'undefined') {
					continue
				}
				
				if (tab.name == indexOrName) {
					return kid;
				}
			}
			
			return -1;
		},
		
		///////////////
		// Внимание! эти функции знают о внутренней иерархии контрола. если будет необходимо поменять что-то в структуре -- нужно отразить тут
		// - container
		// -- contentView
		// --- contentView0
		// --- contentView1 etc...
		// - tabs
		// -- tabView
		// --- tabView0
		// --- tabView1 etc...
		
		// перестроить контент
		_refreshContentViews: function() {
			var conrentView = this.root.children[0]; // content
			if (conrentView.children.length > 0) {
				conrentView.remove(this.root.children[0])
			}
			var newView = this._getContainerView();
			conrentView.add(newView);
		}, 
		
		// перестроить набор кнопок под табы
		_refreshTabButtons: function() {
			var tabView = this.root.children[1]; // tabs
			if (tabView.children.length > 0) {
				tabView.remove(this.root.children[0])
			}
			var newView = this._makeTabButtons();
			tabView.add(newView);
		},
		
		// создать новый контейнер для контента
		_getContainerView: function() {
			var view = Ti.UI.createView();

			for (kid in this._tabs) {
				
				var tab = this._tabs[kid];
				
				var cv;
				if (typeof(tab.view) == 'undefined') {
					cv = Ti.UI.createView(); // stub
				} else {
					cv = tab.view;
				}

				cv.setVisible(false);
				
				view.add(cv);
			}		

			return view; 
		},
		
		_getTabContentView: function(tabNo) {
			return this.root.children[0].children[0].children[tabNo];
		},
		
		
		_getTabView: function(tabNo) {

			var tabView = this.root.children[1];
			return tabView.children[0].children[tabNo];
		},
		
		// end of hierarchy-awareness
		////////////////////
		
		_makeTabButtons: function() {
			var view = Ti.UI.createView();

			var spc = 3 *  get_height_scale();
			var ratio480 = Ti.Platform.displayCaps.platformWidth / 480; 
			var iconWH = 50 * ratio480;

			var titleTop = PixelsToDPUnits(5) + PixelsToDPUnits(iconWH); // 10 is from font
			
			var tabGeom = {
				numTabs: this._tabs.length,
				tabWidth: this.root.width / this._tabs.length,
				tabSpacing: spc,
				titleTop: titleTop,
				
				imgCenterTop:  PixelsToDPUnits(4),
				imgCenterLeft: (this.root.width / this._tabs.length) / 2 - spc, // tabWidth / 2
				//BG_H * get_height_scale_480(),
			}


			for (kid in this._tabs) {
				var tabView = this._makeTabButton(this._tabs[kid], kid, tabGeom, kid == this._activeTab);
				view.add(tabView);
			}			

			return view;
		},
		
		_makeTabButton: function(info, index, geom, active) {
			
			
			var view = Ti.UI.createView({
				top: geom.tabSpacing,
				left: index * geom.tabWidth + geom.tabSpacing,
				width: geom.tabWidth - 2 * geom.tabSpacing,
				height: BG_H  * get_height_scale_480() - 2 * geom.tabSpacing,
				itemIndex: index,
			});
			
			var viewBg = Ti.UI.createView({
				width: geom.tabWidth - 2 * geom.tabSpacing,
				height: BG_H  * get_height_scale_480() -  geom.tabSpacing,
				backgroundColor: '#555',
				borderRadius: geom.tabSpacing,
				opacity: 0.5,			
			})
			
			view.add(viewBg);
			
			var title = Ti.UI.createLabel({
				text: info.title,
				font: this._titleFont,
				textAlign: 'center',
				
				top: geom.titleTop,
				left: geom.tabSpacing,
				width: geom.tabWidth - 4 * geom.tabSpacing,
				
				//backgroundColor: 'green',
			})
			
			view.add(title);

			
			// если есть имидж
			if (typeof(info.imagePath) != 'undefined') {
				
				var img = Ti.UI.createImageView({
					top: geom.imgCenterTop ,
					left: geom.imgCenterLeft - (PixelsToDPUnits(info.imageWidth) / 2),
					width: PixelsToDPUnits(info.imageWidth),
					height: PixelsToDPUnits(info.imageHeight),
					
				//	backgroundColor: 'yellow',
					
				})
				
				view.add(img)
			}
			
			view.setActive = function(activeFlag) {
				title.color = (activeFlag?'white':'#888');
				
				if (typeof(img) != 'undefined') {
					img.image = (activeFlag? info.selectedImagePath : info.imagePath)
				}
				
				viewBg.setVisible(activeFlag);
				
			}
			
			view.setActive(active);

			/// badge
			
			var badge = Ti.UI.createLabel({
				font: this._titleFont,
				textAlign: 'left',
								
				top: geom.tabSpacing,
				left: 2 * geom.tabSpacing,
				//width: geom.tabWidth/2,
				
				color: 'white',
				backgroundColor: 'red',
				borderRadius: 2 * geom.tabSpacing,
				borderColor: 'white',
				borderWidth: 2,
			})
			
			view.add(badge);

			view.setBadge = function(text) {
				if (typeof(text) == 'undefined' || text == null || text == "") {
					badge.setVisible(false);
				} else {
					badge.setVisible(true);
					badge.setText("  " + text + "  ");
				}
			}
			
			view.setBadge(info.badge);
			
			view.addEventListener('click', function (ex) {
				
				e = { source: view, index: index };
				
				if (index == this.activeTab) {
					return; // чтобы избежать лишних событий
				}
				
				if (typeof(init.tabClick) != 'undefined') {
					init.tabClick(e);		
				}
			
		    });
		      
			
			return view;
		},
	}
	
	tabUI._refreshTabs();
	
	return tabUI;
}