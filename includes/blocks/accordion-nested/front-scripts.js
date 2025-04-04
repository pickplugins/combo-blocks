export function setupAccordion() {
	// * not working
	document.addEventListener("DOMContentLoaded", function (event) {
		window.pgAccordion = {
			id: "",
			activeIndex: [999],
			headerList: [],
			listenUrlHash: () => {
				var hash = window.location.hash;
				var hashWrap = document.querySelector('[href="' + hash + '"]');
				if (hashWrap == null) return;
				var header = hashWrap.parentElement;
				var index = header.getAttribute("index")
				window.pgAccordion.switch(index)
			},
			switch: (index) => {
				if (window.pgAccordion.id.length == 0) return;
				var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");
				accordionHeaders.forEach((header, i) => {
					var loopIndex = header.getAttribute("index");
					window.pgAccordion.activeIndex = index
					var content = header.nextElementSibling;
					if (loopIndex == index) {
						header.classList.toggle("accordion-header-active");
						content.style.display = "block";
						content.style.height = "auto";
					} else {
						header.classList.remove("accordion-header-active");
						content.style.display = "none";
						content.style.height = 0;
					}
				});
			},
			switchNext: () => {
				var activeIndex = window.pgAccordion.activeIndex;
				var max = window.pgAccordion.headerList.length - 1;
				var nextIndex = (activeIndex + 1 > max) ? 0 : (activeIndex + 1);
				window.pgAccordion.switch(nextIndex);
			},
			switchPrev: () => {
				var activeIndex = window.pgAccordion.activeIndex;
				var max = window.pgAccordion.headerList.length - 1;
				var nextIndex = (activeIndex - 1 < 0) ? max : (activeIndex - 1);
				window.pgAccordion.switch(nextIndex);
			},
			init: ({ selector = "[data-pgaccordion]" }) => {
				if (selector.length == 0) return;
				var accordionWrap = document.querySelectorAll(selector);
				accordionWrap.forEach((accordion) => {
					var accordionData = accordion.getAttribute("data-pgaccordion");
					var accordionDataObj = JSON.parse(accordionData);
					var activeIndex = accordionDataObj.activeIndex;
					var accordionWrapId = accordionDataObj.id;
					window.pgAccordion.id = accordionWrapId;
					window.pgAccordion.activeIndex = activeIndex;
					var accordionHeaders = document.querySelectorAll("#" + accordionWrapId + " .accordion-header");
					var headerList = [];
					accordionHeaders.forEach((header, index) => {
						var headerId = header.getAttribute("id");
						headerList.push(headerId)
						header.setAttribute("index", index);
						const counter = header.querySelector(".accordion-label-counter");
						if (counter !== null) {
							counter.textContent = `${index + 1}`; // Adding 1 to start counting from 1
						}
					});
					window.pgAccordion.headerList = headerList;
					accordionHeaders.forEach((accordionHeader) => {
						var iconToggle = accordionHeader.querySelector(".accordion-icon-toggle");
						var iconIdle = accordionHeader.querySelector(".accordion-icon");
						if (iconToggle != null) {
							iconToggle.style.display = "none";
						}
					});
					if (accordionHeaders != null) {
						accordionHeaders.forEach((accordionHeader) => {
							// var fieldId = accordionHeader.getAttribute("id");
							var content = accordionHeader.nextElementSibling;
							var iconToggle = accordionHeader.querySelector(".accordion-icon-toggle");
							var iconIdle = accordionHeader.querySelector(".accordion-icon-idle");
							if (iconToggle != null) {
								iconToggle.style.display = "none";
							}
							if (content != undefined) {
								content.style.height = 0;
								content.style.overflow = "hidden";
								content.style.display = "none";
							}
							accordionHeader.addEventListener("click", (event) => {



								event.stopImmediatePropagation();
								event.preventDefault();
								accordionHeader.classList.toggle("accordion-header-active");
								content.style.height = "auto";
								if (accordionHeader.classList.contains("accordion-header-active")) {
									if (iconToggle != null) {
										iconToggle.style.display = "inline-block";
									}
									if (iconIdle != null) {
										iconIdle.style.display = "none";
									}
									content.style.display = "block";
									content.style.height = "auto";
								} else {
									if (iconIdle != null) {
										iconIdle.style.display = "inline-block";
									}
									if (iconToggle != null) {
										iconToggle.style.display = "none";
									}
									content.style.display = "none";
									content.style.height = 0;
								}
							});
						});
					}
				})
				// var nextWrap = document.querySelector("#" + window.pgAccordion.id + " .next ");
				// var prevWrap = document.querySelector("#" + window.pgAccordion.id + " .prev ");
				// var pageNumbers = document.querySelectorAll("#" + window.pgAccordion.id + " .page-numbers ");
				// nextWrap.addEventListener("click", function (event) {
				// 	window.pgAccordion.switchNext()
				// })
				// prevWrap.addEventListener("click", function (event) {
				// 	window.pgAccordion.switchPrev()
				// })
				// pageNumbers.forEach((PageNumber) => {
				// 	PageNumber.addEventListener("click", function (event) {
				// 		var target = event.target;
				// 		var itemClass = [];
				// 		target.classList.forEach((item) => {
				// 			itemClass.push(item)
				// 		})
				// 		if (itemClass.includes("prev")) {
				// 		}
				// 		else if (itemClass.includes("next")) {
				// 		}
				// 		else {
				// 			var index = parseInt(target.getAttribute("index"));
				// 			window.pgAccordion.switch(index)
				// 		}
				// 	})
				// })
			}
		}
		window.pgAccordion.init({ selector: "[data-pgaccordion]" });
		window.pgAccordion.listenUrlHash();
	});
}