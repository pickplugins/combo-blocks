"use strict";
export function setupPopup() {
	document.addEventListener("DOMContentLoaded", function (event) {
		var popupActions = {
			clickCount: 0,
			scrollEnd: false,
			scrollPercent: 0,
			scrollFixed: 2000,
		};
		var popupClose = document.querySelectorAll(".close");
		if (popupClose != null) {
			popupClose.forEach((el) => {
				var popupId = el.getAttribute("data-popup-id");
				var closeAnimation = el.getAttribute("data-close-animation");
				el.addEventListener("click", (event) => {
					var popup = document.querySelector("." + popupId);
					popup.classList.add("animate__animated");
					popup.classList.add("animate__" + closeAnimation);
					setTimeout(() => {
						popup.classList.remove("animate__animated");
						popup.classList.remove("animate__" + closeAnimation);
						popup.style.display = "none";
					}, 2000);
				});
			});
		}
		function isInViewport(el) {
			const rect = el.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}
		function getScrollPercentage() {
			// Return the scroll percentage.
			return Math.round(
				((document.documentElement.scrollTop + document.body.scrollTop) /
					(document.documentElement.scrollHeight -
						document.documentElement.clientHeight)) *
				100
			);
		}
		function getScrollAmount() {
			// Return the scroll percentage.
			return Math.round(
				document.documentElement.scrollTop + document.body.scrollTop
			);
		}
		function getUrlPrams() {
			var prams = [];
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			entries = urlParams.entries();
			for (const entry of entries) {
				prams[entry[0]] = entry[1];
			}
			return prams;
		}
		function hasUrlPrams(pram) {
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			return urlParams.has(pram);
		}
		function hasCookie(name) {
			var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
			if (match) return match[2];
		}
		function checkReferrer() { }
		function popupDelay() {
			var dataVisible = document.querySelectorAll("[data-pgpopup-trigger]");
			if (dataVisible != null) {
				dataVisible.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupPrams = item.getAttribute("data-prams");
					var popupPramsObj = JSON.parse(popupPrams);
					var isLogged = popupPramsObj.isLogged;
					var userId = popupPramsObj.userId;
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					if (popupWrap == null) return;
					Object.entries(attrObj).map((group) => {
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (conditionId == "delay") {
								setTimeout(() => {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}, parseInt(conditions.value));
							}
							if (conditionId == "initial") {
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							}
							if (conditionId == "cookieExist") {
								var cookieExist = hasCookie(conditions.value);
								if (cookieExist) {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
							}
							if (conditionId == "cookieNotExist") {
								var cookieExist = hasCookie(conditions.value);
								if (cookieExist == undefined) {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
							}
							if (conditionId == "userLogged") {
								if (isLogged) {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
							}
							if (conditionId == "userId") {
								var userIds = conditions.value.split(",");
								var userIdsX = userIds.map((x) => parseInt(x));
								if (userIdsX.includes(parseInt(userId))) {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
							}
							if (conditionId == "urlPrams") {
								var urlPrams = conditions.value.split(",");
								urlPrams.map((x) => {
									if (hasUrlPrams(x)) {
										popupWrap.style.display = "block";
										var popup = document.querySelector("." + popupId);
										var entranceAnimation =
											popupWrap.getAttribute("data-entrance-animation");
										popup.classList.add("animate__animated");
										popup.classList.add("animate__" + entranceAnimation);
										setTimeout(() => {
											popup.classList.remove("animate__animated");
											popup.classList.remove("animate__" + entranceAnimation);
											// popup.style.display = "none";
										}, 2000);
									}
								});
							}
						});
					});
				});
			}
			var closeTrigger = document.querySelectorAll("[data-pgpopup-close-trigger]");
			if (closeTrigger != null) {
				closeTrigger.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-close-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupPrams = item.getAttribute("data-prams");
					var popupPramsObj = JSON.parse(popupPrams);
					var isLogged = popupPramsObj.isLogged;
					var userId = popupPramsObj.userId;
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					Object.entries(attrObj).map((group) => {
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (conditionId == "delay") {
								setTimeout(() => {
									//popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var closeAnimation = popupWrap.getAttribute("data-close-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + closeAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + closeAnimation);
										popup.style.display = "none";
									}, 2000);
								}, parseInt(conditions.value));
							}
						});
					});
				});
			}
		}
		popupDelay();
		// window.addEventListener('beforeunload', function (e) {
		//     e.preventDefault();
		//     e.returnValue = '';
		// });
		function addEvent(obj, evt, fn) {
			if (obj.addEventListener) {
				obj.addEventListener(evt, fn, false);
			} else if (obj.attachEvent) {
				obj.attachEvent("on" + evt, fn);
			}
		}
		addEvent(document, "mouseout", function (e) {
			if (e.toElement == null && e.relatedTarget == null) {
				if (dataVisible != null) {
					dataVisible.forEach((item) => {
						var attr = item.getAttribute("data-pgpopup-trigger");
						var attrObj = JSON.parse(attr);
						var popupId = item.getAttribute("data-popup-id");
						var popupWrap = document.querySelector(
							'[data-popup-id="' + popupId + '"]'
						);
						Object.entries(attrObj).map((group) => {
							var groupData = group[1];
							var groupLogic = groupData.logic;
							var groupArgs = groupData.args;
							groupArgs.map((conditions) => {
								var conditionId = conditions.id;
								if (conditionId == "onExit") {
									popupWrap.style.display = "block";
									e.preventDefault();
									e.defaultPrevented;
									if (conditions.value) {
										var confirmationMessage = "tab close";
										e.preventDefault();
										//return "Are you sure you want to exit?";
										//(e || window.event).returnValue = confirmationMessage; //Gecko + IE
										return confirmationMessage;
									}
								}
							});
						});
					});
				}
			}
		});
		window.oncontextmenu = function (event) {
			var dataVisible = document.querySelectorAll("[data-pgpopup-trigger]");
			if (dataVisible != null) {
				dataVisible.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					Object.entries(attrObj).map((group) => {
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (conditionId == "clickRight") {
								popupWrap.style.display = "block";
								if (conditions.value) {
									event.preventDefault();
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
							}
						});
					});
				});
			}
		};
		document.addEventListener("scroll", function (e) {
			//popupActions.scrollStart = true;
			var scrollPercentage = getScrollPercentage();
			var scrollAmount = getScrollAmount();
			var dataVisible = document.querySelectorAll("[data-pgpopup-trigger]");
			if (dataVisible != null) {
				dataVisible.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					Object.entries(attrObj).map((group) => {
						var groupId = group[0];
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (
								conditionId == "scrollPercent" &&
								parseInt(conditions.min) <= scrollPercentage &&
								parseInt(conditions.max) >= scrollPercentage
							) {
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							}
							if (
								conditionId == "scrollFixed" &&
								parseInt(conditions.min) <= scrollAmount &&
								parseInt(conditions.max) >= scrollAmount
							) {
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							}
							if (
								conditionId == "scrollEnd" &&
								95 <= scrollPercentage &&
								100 >= scrollPercentage
							) {
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							}
							if (conditionId == "scrollElement") {
								var elementHandle = conditions.value;
								const target = document.querySelector(elementHandle);
								var isViewport = isInViewport(target);
								if (isViewport) {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
							}
						});
					});
				});
			}
		});
		document.addEventListener("scroll", function (e) {
			//popupActions.scrollStart = true;
			var scrollPercentage = getScrollPercentage();
			var scrollAmount = getScrollAmount();
			var closeTrigger = document.querySelectorAll("[data-pgpopup-close-trigger]");
			if (closeTrigger != null) {
				closeTrigger.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-close-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					Object.entries(attrObj).map((group) => {
						var groupId = group[0];
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (
								conditionId == "scrollPercent" &&
								parseInt(conditions.min) <= scrollPercentage &&
								parseInt(conditions.max) >= scrollPercentage
							) {
								//popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							}
							if (
								conditionId == "scrollFixed" &&
								parseInt(conditions.min) <= scrollAmount &&
								parseInt(conditions.max) >= scrollAmount
							) {
								//popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							}
							if (
								conditionId == "scrollEnd" &&
								95 <= scrollPercentage &&
								100 >= scrollPercentage
							) {
								//popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							}
							if (conditionId == "scrollElement") {
								var elementHandle = conditions.value;
								const target = document.querySelector(elementHandle);
								var isViewport = isInViewport(target);
								if (isViewport) {
									//popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var closeAnimation = popupWrap.getAttribute("data-close-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + closeAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + closeAnimation);
										popup.style.display = "none";
									}, 2000);
								}
							}
						});
					});
				});
			}
		});
		document.addEventListener("click", function (e) {
			popupActions.clickCount += 1;
			var dataVisible = document.querySelectorAll("[data-pgpopup-trigger]");
			if (dataVisible != null) {
				dataVisible.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					Object.entries(attrObj).map((group) => {
						var groupId = group[0];
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (conditionId == "clickFirst" && popupActions.clickCount == 1) {
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							}
							if (
								conditionId == "clickCount" &&
								popupActions.clickCount == parseInt(conditions.value)
							) {
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							}
						});
					});
				});
			}
		});
		document.addEventListener("keydown", function (e) {
			var dataVisible = document.querySelectorAll("[data-pgpopup-trigger]");
			if (dataVisible != null) {
				dataVisible.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					Object.entries(attrObj).map((group) => {
						var groupId = group[0];
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							var keyCode = e.key;
							if (conditionId == "keyPress") {
								if (conditions.values.includes(keyCode)) {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
							}
						});
					});
				});
			}
		});
		document.addEventListener("keydown", function (e) {
			var closeTrigger = document.querySelectorAll("[data-pgpopup-close-trigger]");
			if (closeTrigger != null) {
				closeTrigger.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-close-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					Object.entries(attrObj).map((group) => {
						var groupId = group[0];
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (conditionId == "keyPress") {
								if (
									(conditions.value == "esc" && e.key === "Escape") ||
									(conditions.value == "enter" && e.key === "Enter") ||
									(conditions.value == "backspace" && e.key === "Backspace")
								) {
									var popup = document.querySelector("." + popupId);
									var closeAnimation = popupWrap.getAttribute("data-close-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + closeAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + closeAnimation);
										popup.style.display = "none";
									}, 2000);
								}
								// You can add more key conditions here if needed
							}
						});
					});
				});
			}
		});
		document.addEventListener("click", function (e) {
			popupActions.clickCount += 1;
			var closeTrigger = document.querySelectorAll("[data-pgpopup-close-trigger]");
			if (closeTrigger != null) {
				closeTrigger.forEach((item) => {
					var attr = item.getAttribute("data-pgpopup-close-trigger");
					var attrObj = JSON.parse(attr);
					var popupId = item.getAttribute("data-popup-id");
					var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
					Object.entries(attrObj).map((group) => {
						var groupId = group[0];
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (conditionId == "clickFirst" && popupActions.clickCount == 1) {
								//popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							}
							if (
								conditionId == "clickCount" &&
								popupActions.clickCount == parseInt(conditions.value)
							) {
								//popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							}
						});
					});
				});
			}
		});
		var dataVisible = document.querySelectorAll("[data-pgpopup-trigger]");
		var closeTrigger = document.querySelectorAll("[data-pgpopup-close-trigger]");
		if (dataVisible != null) {
			dataVisible.forEach((item) => {
				var attr = item.getAttribute("data-pgpopup-trigger");
				var attrObj = JSON.parse(attr);
				var popupId = item.getAttribute("data-popup-id");
				var popupPrams = item.getAttribute("data-prams");
				var popupPramsObj = JSON.parse(popupPrams);
				var isLogged = popupPramsObj.isLogged;
				var userId = popupPramsObj.userId;
				Object.entries(attrObj).map((group) => {
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;
					groupArgs.map((conditions) => {
						var conditionId = conditions.id;
						if (conditionId == "clickElement") {
							var clickHandle = document.querySelector(conditions.value);
							var popupWrap = document.querySelector(
								'[data-popup-id="' + popupId + '"]'
							);
							clickHandle.addEventListener("click", function (e) {
								event.preventDefault();
								event.stopPropagation();
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							});
						}
						if (conditionId == "mouseOutElement") {
							if (conditions.value.length == 0) return;
							var clickHandle = document.querySelector(conditions.value);
							var popupWrap = document.querySelector(
								'[data-popup-id="' + popupId + '"]'
							);
							clickHandle.addEventListener("mouseout", function (e) {
								event.preventDefault();
								event.stopPropagation();
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							});
						}
						if (conditionId == "mouseOverElement") {
							if (conditions.value.length == 0) return;
							var clickHandle = document.querySelector(conditions.value);
							var popupWrap = document.querySelector(
								'[data-popup-id="' + popupId + '"]'
							);
							clickHandle.addEventListener("mouseover", function (e) {
								event.preventDefault();
								event.stopPropagation();
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							});
						}
						if (conditionId == "wooAddToCart") {
							if (conditions.value.length == 0) return;
							var clickHandle = document.querySelector('.ajax_add_to_cart');
							var popupWrap = document.querySelector(
								'[data-popup-id="' + popupId + '"]'
							);
							clickHandle.addEventListener("click", function (e) {
								event.preventDefault();
								event.stopPropagation();
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var entranceAnimation =
									popupWrap.getAttribute("data-entrance-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 2000);
							});
						}
						if (conditionId == "dateCountdownExpired") {
							var isOnce = conditions.once;
							var count = 0;
							var popupWrap = document.querySelector(".pg-popup");
							document.addEventListener("pgDateCountdownExpired", function (e) {
								if (isOnce) {
									if (count < 1) {
										popupWrap.style.display = "block";
										var popup = document.querySelector("." + popupId);
										var entranceAnimation =
											popupWrap.getAttribute("data-entrance-animation");
										popup.classList.add("animate__animated");
										popup.classList.add("animate__" + entranceAnimation);
										setTimeout(() => {
											popup.classList.remove("animate__animated");
											popup.classList.remove("animate__" + entranceAnimation);
											// popup.style.display = "none";
										}, 2000);
									}
								} else {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var entranceAnimation =
										popupWrap.getAttribute("data-entrance-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
								count += 1;
							});
						}
					});
				});
			});
		}
		if (closeTrigger != null) {
			closeTrigger.forEach((item) => {
				var attr = item.getAttribute("data-pgpopup-close-trigger");
				var attrObj = JSON.parse(attr);
				var popupId = item.getAttribute("data-popup-id");
				var popupPrams = item.getAttribute("data-prams");
				var popupPramsObj = JSON.parse(popupPrams);
				var isLogged = popupPramsObj.isLogged;
				var userId = popupPramsObj.userId;
				Object.entries(attrObj).map((group) => {
					var groupData = group[1];
					var groupLogic = groupData.logic;
					var groupArgs = groupData.args;
					groupArgs.map((conditions) => {
						var conditionId = conditions.id;
						if (conditionId == "clickElement") {
							var clickHandle = document.querySelector(conditions.value);
							var popupWrap = document.querySelector(
								'[data-popup-id="' + popupId + '"]'
							);
							clickHandle.addEventListener("click", function (e) {
								event.preventDefault();
								event.stopPropagation();
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							});
						}
						if (conditionId == "mouseOutElement") {
							if (conditions.value.length == 0) return;
							var clickHandle = document.querySelector(conditions.value);
							var popupWrap = document.querySelector(
								'[data-popup-id="' + popupId + '"]'
							);
							clickHandle.addEventListener("mouseout", function (e) {
								event.preventDefault();
								event.stopPropagation();
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							});
						}
						if (conditionId == "mouseOverElement") {
							if (conditions.value.length == 0) return;
							var clickHandle = document.querySelector(conditions.value);
							var popupWrap = document.querySelector(
								'[data-popup-id="' + popupId + '"]'
							);
							clickHandle.addEventListener("mouseover", function (e) {
								event.preventDefault();
								event.stopPropagation();
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							});
						}
						if (conditionId == "fluentformSubmission") {
							//if (conditions.value.length == 0) return;
							var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
							document.addEventListener("fluentform_submission_success", function (e) {
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							})
						}
						if (conditionId == "formidableformsSubmission") {
							//if (conditions.value.length == 0) return;
							var popupWrap = document.querySelector('[data-popup-id="' + popupId + '"]');
							document.addEventListener("frmFormComplete", function (e) {
								popupWrap.style.display = "block";
								var popup = document.querySelector("." + popupId);
								var closeAnimation = popupWrap.getAttribute("data-close-animation");
								popup.classList.add("animate__animated");
								popup.classList.add("animate__" + closeAnimation);
								setTimeout(() => {
									popup.classList.remove("animate__animated");
									popup.classList.remove("animate__" + closeAnimation);
									popup.style.display = "none";
								}, 2000);
							})
						}
						if (conditionId == "dateCountdownExpired") {
							var isOnce = conditions.once;
							var count = 0;
							var popupWrap = document.querySelector(".pg-popup");
							document.addEventListener("pgDateCountdownExpired", function (e) {
								if (isOnce) {
									if (count < 1) {
										popupWrap.style.display = "block";
										var popup = document.querySelector("." + popupId);
										var closeAnimation =
											popupWrap.getAttribute("data-close-animation");
										popup.classList.add("animate__animated");
										popup.classList.add("animate__" + closeAnimation);
										setTimeout(() => {
											popup.classList.remove("animate__animated");
											popup.classList.remove("animate__" + closeAnimation);
											popup.style.display = "none";
										}, 2000);
									}
								} else {
									popupWrap.style.display = "block";
									var popup = document.querySelector("." + popupId);
									var closeAnimation = popupWrap.getAttribute("data-close-animation");
									popup.classList.add("animate__animated");
									popup.classList.add("animate__" + closeAnimation);
									setTimeout(() => {
										popup.classList.remove("animate__animated");
										popup.classList.remove("animate__" + closeAnimation);
										popup.style.display = "none";
									}, 2000);
								}
								count += 1;
							});
						}
					});
				});
			});
		}
	});
}