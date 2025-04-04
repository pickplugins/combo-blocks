export function setupProgressBar() {
	document.addEventListener("DOMContentLoaded", function (event) {
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
		var ComboBlocksProgressBar = document.querySelectorAll(".ComboBlocksProgressBar");
		if (ComboBlocksProgressBar != null) {
			ComboBlocksProgressBar.forEach((item) => {
				var progressBarArgs = item.getAttribute("data-progress-bar");
				var progressBarArgsObj = JSON.parse(progressBarArgs);
				var blockId = progressBarArgsObj.blockId;
				var start = progressBarArgsObj.start;
				var end = progressBarArgsObj.end;
				var duration = progressBarArgsObj.duration;
				var animate = progressBarArgsObj.animate;
				var type = progressBarArgsObj.type;
				var source = progressBarArgsObj.source;
				// if (source.length > 0) {
				// 	end = saleCount;
				// } else {
				// 	end = endX;
				// }
				var wrapHandle = "." + blockId + " .progress-fill";
				if (animate == "onVisible") {
					document.addEventListener("scroll", function (e) {
						const target = document.querySelector(wrapHandle);
						var isInView = isInViewport(target);
						var animateName = "animateWidthProgress";
						if (type == "horizontal") {
							var animateName = "animateWidthProgress";
						}
						if (type == "vertical") {
							var animateName = "animateHeightProgress";
						}
						if (isInView) {
							target.classList.add(animateName);
						} else {
							target.classList.remove(animateName);
						}
					});
				}
				if (animate == "onLoad") {
					const target = document.querySelector(wrapHandle);
					var isInView = isInViewport(target);
					var animateName = "animateWidthProgress";
					if (type == "horizontal") {
						var animateName = "animateWidthProgress";
					}
					if (type == "vertical") {
						var animateName = "animateHeightProgress";
					}
					if (isInView) {
						target.classList.add(animateName);
					} else {
						target.classList.remove(animateName);
					}
				}
			});
		}
	});
}