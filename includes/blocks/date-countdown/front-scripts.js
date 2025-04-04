export function setupDateCountdown() {
	document.addEventListener("DOMContentLoaded", function (event) {
		// To assign event
		const pgDateCountdownExpired = new Event("pgDateCountdownExpired");
		function countdown(blockId, startDate, endDate) {
			var secondHandle = "." + blockId + " .second-countdown";
			var minuteHandle = "." + blockId + " .minute-countdown";
			var hourHandle = "." + blockId + " .hour-countdown";
			var dayHandle = "." + blockId + " .day-countdown";
			var countdownHandle = "." + blockId + " .countdown-wrapper";
			var innerHandle = "." + blockId + " .inner";
			var WrapperHandle = " .ComboBlocksDateCountdown";
			const targetWrapper = document.querySelector(WrapperHandle);
			const targetInner = document.querySelector(innerHandle);
			const targetCountdown = document.querySelector(countdownHandle);
			const targetSecond = document.querySelector(secondHandle);
			const targetMinute = document.querySelector(minuteHandle);
			const targetHour = document.querySelector(hourHandle);
			const targetDay = document.querySelector(dayHandle);
			const dateInput1 = startDate;
			const dateInput2 = endDate;
			const currentDate = new Date();
			const date1 = new Date(dateInput1);
			const date2 = new Date(dateInput2);
			var date = "";
			var customDate = new Date(date1);
			if (currentDate > date1) {
				date = currentDate;
			}
			if (currentDate < date1) {
				if (targetWrapper != null) {
					targetWrapper.style.display = "none";
				}
				date = date1;
			} else {
				if (targetWrapper != null) {
					targetWrapper.style.display = "block";
				}
			}
			// const date = currentDate > date1 ? currentDate : date1;
			const timeDifference = date2 - date;
			if (timeDifference <= 0) {
				document.dispatchEvent(pgDateCountdownExpired);
				var contentWrapper = document.querySelector(".countdown-wrapper");
				contentWrapper.style.display = "none";
				// targetInner.style.display = "block";
				if (targetCountdown != null) {
					// targetCountdown.style.display = "none";
				}
				return;
			}
			if (timeDifference > 0) {
				var innerWrap = document.querySelector(".inner");
				if (innerWrap !== null) {
					//innerWrap.style.display = "none";
				}
			}
			document.addEventListener("pgDateCountdownExpired", (event) => {
			});
			const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
			const formattedDays = String(days).padStart(2, "0");
			const formattedHours = String(hours).padStart(2, "0");
			const formattedMinutes = String(minutes).padStart(2, "0");
			const formattedSeconds = String(seconds).padStart(2, "0");
			targetSecond.innerText = formattedSeconds;
			targetMinute.innerText = formattedMinutes;
			targetHour.innerText = formattedHours;
			targetDay.innerText = formattedDays;
		}
		function expiredArg(eventCounter) {
			var dataVisible = document.querySelectorAll("[data-countdown-expired-arg]");
			if (dataVisible != null) {
				dataVisible.forEach((item) => {
					var countdownExpiredArg = item.getAttribute("data-countdown-expired-arg");
					var countdownExpiredArgObject = JSON.parse(countdownExpiredArg);
					var dateCountdownId = item.getAttribute("date-countdown-id");
					var dateCountdownWrap = document.querySelector(
						'[date-countdown-id="' + dateCountdownId + '"]'
					);
					var innerWrap = document.querySelector(".inner");
					var countdownWrap = document.querySelector(".countdown-wrapper");
					Object.entries(countdownExpiredArgObject).map((group) => {
						var groupData = group[1];
						var groupLogic = groupData.logic;
						var groupArgs = groupData.args;
						groupArgs.map((conditions) => {
							var conditionId = conditions.id;
							if (conditionId == "redirectURL") {
								value = conditions.url;
								delay = conditions.delay;
								if (value == "") {
								} else {
									if (delay > 0) {
										setTimeout(function () {
											window.location.href = value;
										}, delay);
									} else {
										window.location.href = value;
									}
								}
							}
							if (conditionId == "wcHideCartButton") {
								var elementWrap = document.querySelector(".cart");
								var element2Wrap = document.querySelector(".add_to_cart_button");
								if (elementWrap != null) {
									elementWrap.style.display = "none";
								}
								if (element2Wrap != null) {
									element2Wrap.style.display = "none";
								}
							}
							if (conditionId == "hideCountdown") {
								countdownWrap.style.display = "none";
							}
							if (conditionId == "showExpiredMsg") {
								document.addEventListener("pgDateCountdownExpired", (event) => {
									var innerWrap = document.querySelector(".inner");
									innerWrap.style.display = "block";
								});
							}
							if (conditionId == "showElement") {
								value = conditions.value;
								var elementWrap = document.querySelector(value);
								if (elementWrap != null) {
									elementWrap.style.display = "block";
								}
							}
							if (conditionId == "showPopup") {
								var elementWrap = document.querySelector(".pg-popup");
								if (eventCounter < 2) {
									if (elementWrap != null) {
										elementWrap.style.display = "block";
									}
								}
							}
						});
					});
				});
			}
		}
		var eventCounter = 0;
		document.addEventListener("pgDateCountdownExpired", (event) => {
			eventCounter += 1;
			expiredArg(eventCounter);
		});
		var ComboBlocksDateCountdown = document.querySelectorAll(".ComboBlocksDateCountdown");
		if (ComboBlocksDateCountdown != null) {
			ComboBlocksDateCountdown.forEach((item) => {
				var dateCountdownArgs = item.getAttribute("data-date-countdown");
				var dateCountdownArgsObj = JSON.parse(dateCountdownArgs);
				// const pgDateCountdownExpired = new Event("pgDateCountdownExpired");
				var blockId = dateCountdownArgsObj.blockId;
				var startDate = dateCountdownArgsObj.startDate;
				var endDate = dateCountdownArgsObj.endDate;
				var scheduleTime = dateCountdownArgsObj.scheduleTime;
				var dateCountdown = dateCountdownArgsObj.dateCountdown;
				var dateCountdownType = dateCountdownArgsObj.dateCountdown.options.type;
				var everDay =
					dateCountdownArgsObj.dateCountdown.options.everGreenTime.day;
				var everHour =
					dateCountdownArgsObj.dateCountdown.options.everGreenTime.hour;
				var everMinute =
					dateCountdownArgsObj.dateCountdown.options.everGreenTime.minute;
				var scheduleArgs = [];
				scheduleTime.forEach((items) => {
					var startTime = items.startTime;
					var endTime = items.endTime;
					var weekDays = items.weekdays;
					scheduleArgs.push({
						startTime: startTime,
						endTime: endTime,
						weekDays: weekDays,
					});
				});
				var scheduleTimeDifference = 0;
				var currentWeekDay = new Date().getDay();
				var date = new Date(startDate * 1000);
				startDate = date.toISOString().slice(0, 16);
				//cookie
				let everDurationX = 0;
				// Function to read a cookie by name
				function getCookie(cookieName) {
					const name = cookieName + "=";
					const decodedCookie = decodeURIComponent(document.cookie);
					const cookieArray = decodedCookie.split(";");
					for (let i = 0; i < cookieArray.length; i++) {
						let cookie = cookieArray[i].trim();
						if (cookie.indexOf(name) === 0) {
							return cookie.substring(name.length, cookie.length);
						}
					}
					return null;
				}
				// Function to set a cookie with a name, value, and expiration date
				function setCookie(cookieName, cookieValue, days) {
					const d = new Date();
					d.setTime(d.getTime() + days);
					// d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
					const expires = "expires=" + d.toUTCString();
					// const expires = "expires=" + days.toUTCString();
					document.cookie =
						cookieName + "=" + cookieValue + "; " + expires + "; path=/";
				}
				// Check if the cookie exists
				const cookieData = getCookie("pgEverGreenCountdownData" + blockId);
				if (!cookieData) {
					const totalTime =
						(everDay * 24 * 60 * 60 + everHour * 60 * 60 + everMinute * 60) *
						1000;
					// It's the first visit or the cookie is not present, start the countdown from the current time.
					const everStart = new Date().getTime();
					// Calculate the end time (everEnd) based on your logic
					const everEnd = everStart + totalTime; // Calculate the end time as needed
					let everDuration = everEnd - everStart;
					everDurationX = everDuration;
					// Create a JSON object to store both start and end times
					const pgEverGreenCountdownData = {
						startTime: everStart,
						endTime: everEnd,
					};
					setCookie(
						"pgEverGreenCountdownData" + blockId,
						JSON.stringify(pgEverGreenCountdownData),
						totalTime
					); // Set the cookie for 30 days
				} else {
					// The cookie exists, retrieve the JSON object
					const pgEverGreenCountdownData = JSON.parse(cookieData);
					const everStart = new Date().getTime();
					const everEnd = pgEverGreenCountdownData.endTime;
					// Calculate the remaining time and continue the countdown
					let everDuration = everEnd - everStart;
					everDurationX = everDuration;
				}
				//cookie
				// const totalTime =
				// 	(everDay * 24 * 60 * 60 + everHour * 60 * 60 + everMinute * 60) * 1000;
				// const everStart = new Date().getTime();
				// const everEnd = everStart + totalTime;
				// let everDuration = everEnd - everStart;
				setInterval(() => {
					if (dateCountdownType == "fixed") {
						countdown(blockId, startDate, endDate);
					}
					if (dateCountdownType == "everGreen") {
						// document.cookie = "pgDateCountdownEverGreenTime=" + everDuration;
						var countdownWrap = document.querySelector(".countdown-wrapper");
						countdownWrap.style.display = "none";
						if (everDurationX > 0) {
							const targetSecond = document.querySelector(
								"." + blockId + " .second-countdown"
							);
							const targetMinute = document.querySelector(
								"." + blockId + " .minute-countdown"
							);
							const targetHour = document.querySelector(
								"." + blockId + " .hour-countdown"
							);
							const targetDay = document.querySelector(
								"." + blockId + " .day-countdown"
							);
							countdownWrap.style.display = "flex";
							everDurationX -= 1000;
							const days = Math.floor(everDurationX / (1000 * 60 * 60 * 24));
							const hours = Math.floor(
								(everDurationX % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
							);
							const minutes = Math.floor(
								(everDurationX % (1000 * 60 * 60)) / (1000 * 60)
							);
							const seconds = Math.floor((everDurationX % (1000 * 60)) / 1000);
							const formattedDays = String(days).padStart(2, "0");
							const formattedHours = String(hours).padStart(2, "0");
							const formattedMinutes = String(minutes).padStart(2, "0");
							const formattedSeconds = String(seconds).padStart(2, "0");
							targetSecond.innerText = formattedSeconds;
							targetMinute.innerText = formattedMinutes;
							targetHour.innerText = formattedHours;
							targetDay.innerText = formattedDays;
						}
					}
					if (dateCountdownType == "scheduled") {
						var countdownWrap = document.querySelector(".countdown-wrapper");
						countdownWrap.style.display = "none";
						scheduleArgs.map((item, index) => {
							var compare = item.weekDays.compare;
							var startTime = item.startTime;
							var endTime = item.endTime;
							const currentDate = new Date();
							const [startHours, startMinutes] = startTime.split(":").map(Number);
							const [endHours, endMinutes] = endTime.split(":").map(Number);
							const startDate = new Date(
								currentDate.getFullYear(),
								currentDate.getMonth(),
								currentDate.getDate(),
								startHours,
								startMinutes,
								0
							);
							const endDate = new Date(
								currentDate.getFullYear(),
								currentDate.getMonth(),
								currentDate.getDate(),
								endHours,
								endMinutes,
								0
							);
							if (compare == "=") {
								if (currentWeekDay == item.weekDays.value) {
									if (currentDate > startDate && currentDate < endDate) {
										start = startDate.getTime();
										end = endDate.getTime();
										countdownWrap.style.display = "flex";
										countdown(blockId, start, end);
									}
								}
							}
							if (compare == "!=") {
								if (currentWeekDay != item.weekDays.value) {
									if (currentDate > startDate && currentDate < endDate) {
										start = startDate.getTime();
										end = endDate.getTime();
										countdownWrap.style.display = "flex";
										countdown(blockId, start, end);
									}
								}
							}
							if (compare == ">") {
								if (currentWeekDay > item.weekDays.value) {
									if (currentDate > startDate && currentDate < endDate) {
										start = startDate.getTime();
										end = endDate.getTime();
										countdownWrap.style.display = "flex";
										countdown(blockId, start, end);
									}
								}
							}
							if (compare == "<") {
								if (currentWeekDay < item.weekDays.value) {
									if (currentDate > startDate && currentDate < endDate) {
										start = startDate.getTime();
										end = endDate.getTime();
										countdownWrap.style.display = "flex";
										countdown(blockId, start, end);
									}
								}
							}
							if (compare == ">=") {
								if (currentWeekDay >= item.weekDays.value) {
									if (currentDate > startDate && currentDate < endDate) {
										start = startDate.getTime();
										end = endDate.getTime();
										countdownWrap.style.display = "flex";
										countdown(blockId, start, end);
									}
								}
							}
							if (compare == "<=") {
								if (currentWeekDay <= item.weekDays.value) {
									if (currentDate > startDate && currentDate < endDate) {
										start = startDate.getTime();
										end = endDate.getTime();
										countdownWrap.style.display = "flex";
										countdown(blockId, start, end);
									}
								}
							}
							if (compare == "exist") {
								var hasExist = item.weekDays.values.includes(currentWeekDay);
								if (hasExist) {
									if (currentDate > startDate && currentDate < endDate) {
										start = startDate.getTime();
										end = endDate.getTime();
										countdownWrap.style.display = "flex";
										countdown(blockId, start, end);
									}
								}
							}
							if (compare == "between") {
								var days = item.weekDays.values;
								var daysFrom = days[0] == undefined ? "" : days[0];
								var daysTo = days[1] == undefined ? "" : days[1];
								if (currentWeekDay >= daysFrom && currentWeekDay <= daysTo) {
									if (currentDate > startDate && currentDate < endDate) {
										start = startDate.getTime();
										end = endDate.getTime();
										countdownWrap.style.display = "flex";
										countdown(blockId, start, end);
									}
								}
							}
						});
					}
				}, 1000);
				// expiredArg();
				//   countdown(wrapHandle, startDate, endDate);
			});
		}
	});
}