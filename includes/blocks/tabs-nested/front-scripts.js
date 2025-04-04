export function setupTabs() {
	document.addEventListener("DOMContentLoaded", function (event) {
		window.pgTabs = {
			id: "",
			navActiveIndex: 0,
			navActiveId: "",
			navsIndex: [],
			wrapperClass: "pg-tabs",
			navsWrapper: "navs-wrapper",
			navItem: "nav-item",
			panelsWrap: "panels-wrap",
			pgTabsPanel: "pg-tabs-panel",
			progress: "progress",
			progressFill: "progress-fill",
			paginationWrapper: "tabs-pagination",
			paginationItem: "page-numbers",
			paginationPrev: "prev ",
			paginationNext: "next ",
			listenUrlHash: () => {
				var hash = window.location.hash;
				if (hash.length == 0) return;
				var hashWrap = document.querySelector('[href="' + hash + '"]');

				if (hashWrap != null) {
					var index = hashWrap.getAttribute("index")
					window.pgTabs.switchNavs(index)
				}


			},
			switchNavs: (index) => {
				if (window.pgTabs.id.length == 0) return;
				var pgTabId = window.pgTabs.id;
				var navsIndex = window.pgTabs.navsIndex;
				var navActiveId = navsIndex[index];
				window.pgTabs.navActiveIndex = index;
				window.pgTabs.navActiveId = navActiveId;
				var navItems = document.querySelectorAll(`#${pgTabId} .nav-item`);
				var tabPanels = document.querySelectorAll(`#${pgTabId} .pg-tabs-panel`);
				var pgTab = document.querySelector(`#${pgTabId}`);
				var iconToggle = pgTab.querySelectorAll(".nav-icon-toggle");
				var iconIdle = pgTab.querySelectorAll(".nav-icon-idle");
				navItems.forEach((tab) => {
					tab.classList.remove("nav-item-active");
					tab.classList.add("nav-item");
				});
				// hide all tab panels
				tabPanels.forEach((panel) => {
					panel.classList.remove("pg-tabs-panel-active");
					panel.setAttribute('hidden', true)
				});
				var currentTarget = document.querySelector(`#${navActiveId}`);
				if (currentTarget != null) {
					//currentTarget.classList.remove("nav-item");
					currentTarget.classList.add("nav-item-active");
				}
				var tabByattr = document.querySelector(
					`.pg-tabs-panel[data-tab-id="${navActiveId}"]`
				);
				if (tabByattr != null) {
					tabByattr.classList.add("pg-tabs-panel-active");
					tabByattr.setAttribute('hidden', false)
				}
				iconIdle.forEach((iconI, J) => {
					iconToggle[J].style.display = "none";
					iconIdle[J].style.display = "inline-block";
				});
				if (iconToggle[index] != undefined) {
					iconToggle[index].style.display = "inline-block";
				}
				if (iconIdle[index] != undefined) {
					iconIdle[index].style.display = "none";
				}
			},
			switchNext: () => {
				var navActiveIndex = window.pgTabs.navActiveIndex;
				var max = window.pgTabs.navsIndex.length - 1;
				var nextIndex = (navActiveIndex + 1 > max) ? 0 : (navActiveIndex + 1);
				window.pgTabs.switchNavs(nextIndex);
			},
			switchPrev: () => {
				var navActiveIndex = window.pgTabs.navActiveIndex;
				var max = window.pgTabs.navsIndex.length - 1;
				var nextIndex = (navActiveIndex - 1 < 0) ? max : (navActiveIndex - 1);
				window.pgTabs.switchNavs(nextIndex);
			},
			initTabs: ({ selector = "[data-pgTabs]" }) => {
				// Tabs Wrapper Selectors
				var pgTabs = document.querySelectorAll(selector);
				if (pgTabs.length == 0) return;
				if (pgTabs != null) {
					pgTabs.forEach((item) => {
						// parse tabs data
						var tabDataX = item.getAttribute("data-pgTabs");
						var tabDataObject = JSON.parse(tabDataX);
						var activeTab = tabDataObject.activeTab;
						var pgTabId = tabDataObject.id;
						var navsIndex = tabDataObject.navsIndex;
						window.pgTabs.id = pgTabId;
						window.pgTabs.navsIndex = navsIndex;
						window.pgTabs.navActiveId = activeTab;
						//window.pgTabs.switchNavs(0)
						// Assign navs active class
						pgTabs.forEach((pgTab) => {
							if (activeTab == pgTabId) {
								pgTab.classList.add("nav-item-active");
							}
						});
					});
				}
				pgTabs.forEach((pgTab) => {
					var pgTabId = pgTab.getAttribute("id");
					var tabDataX = pgTab.getAttribute("data-pgTabs");
					var tabDataObject = JSON.parse(tabDataX);
					var activeTab = tabDataObject.activeTab;
					var navItems = document.querySelectorAll(`#${pgTabId} .nav-item`);
					var tabPanels = document.querySelectorAll(`#${pgTabId} .pg-tabs-panel`);
					var iconToggle = pgTab.querySelectorAll(".nav-icon-toggle");
					var iconIdle = pgTab.querySelectorAll(".nav-icon-idle");
					navItems.forEach((item, index) => {
						var tabIdX = item.getAttribute("data-tab-id");
						if (activeTab == tabIdX) {
							item.classList.add("nav-item-active");

							console.log(tabPanels[index]);

							if (tabPanels[index] != undefined) {
								tabPanels[index].classList.add("pg-tabs-panel-active");
								tabPanels[index].setAttribute('hidden', false)
							}

							if (iconToggle[index] != undefined) {
								iconToggle[index].style.display = "inline-block";
							}
							if (iconIdle[index] != undefined) {
								iconIdle[index].style.display = "none";
							}
						} else {
							if (iconToggle[index] != undefined) {
								iconToggle[index].style.display = "none";
							}
							if (iconIdle[index] != undefined) {
								iconIdle[index].style.display = "inline-block";
							}
						}
						item.addEventListener("click", function (event) {
							event.preventDefault();
							navItems.forEach((tab) => {
								tab.classList.remove("nav-item-active");
								tab.classList.add("nav-item");
							});
							// hide all tab panels
							tabPanels.forEach((panel) => {
								panel.classList.remove("pg-tabs-panel-active");
								panel.setAttribute('hidden', true)
							});
							//event.currentTarget.classList.remove("nav-item");
							event.currentTarget.classList.add("nav-item-active");
							var tabId = event.currentTarget.getAttribute("data-tab-id");
							var navActiveIndex = window.pgTabs.navActiveIndex;
							window.pgTabs.navsIndex.map((z, j) => {
								if (tabId == z) {
									navActiveIndex = j;
								}
							});
							window.pgTabs.navActiveIndex = navActiveIndex
							window.pgTabs.navActiveId = tabId;
							if (tabId == tabIdX) {
								iconIdle.forEach((iconI, J) => {
									iconToggle[J].style.display = "none";
									iconIdle[J].style.display = "inline-block";
								});
								if (iconToggle[index] != undefined) {
									iconToggle[index].style.display = "inline-block";
								}
								if (iconIdle[index] != undefined) {
									iconIdle[index].style.display = "none";
								}
							}
							var tabByattr = document.querySelector(
								`.pg-tabs-panel[data-tab-id="${tabId}"]`
							);
							tabByattr.classList.add("pg-tabs-panel-active");
							tabByattr.setAttribute('hidden', false)
						});
					});
				});
				var tabsNextWrap = document.querySelector("#" + window.pgTabs.id + " .next ");
				var tabsPrevWrap = document.querySelector("#" + window.pgTabs.id + " .prev ");
				var tabsPageNumbers = document.querySelectorAll("#" + window.pgTabs.id + " .page-numbers ");
				if (tabsNextWrap != null) {
					tabsNextWrap.addEventListener("click", function (event) {
						window.pgTabs.switchNext()
					})
				}
				if (tabsPrevWrap != null) {
					tabsPrevWrap.addEventListener("click", function (event) {
						window.pgTabs.switchPrev()
					})
				}
				if (tabsPageNumbers != null) {
					tabsPageNumbers.forEach((PageNumbers) => {
						PageNumbers.addEventListener("click", function (event) {
							var target = event.target;
							var itemClass = [];
							target.classList.forEach((item) => {
								itemClass.push(item)
							})
							if (itemClass.includes("prev")) {
							}
							else if (itemClass.includes("next")) {
							}
							else {
								var index = parseInt(target.getAttribute("index"));
								window.pgTabs.switchNavs(index)
							}
						})
					})
				}
			},
		}
		window.pgTabs.initTabs({ selector: "[data-pgTabs]" });
		window.pgTabs.listenUrlHash();
	});
}
