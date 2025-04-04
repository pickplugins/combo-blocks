export function setupNumberCounter() {
	document.addEventListener("DOMContentLoaded", function (event) {
		const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
			const target = document.querySelector(qSelector);
			let startTimestamp = null;
			const step = (timestamp) => {
				if (!startTimestamp) startTimestamp = timestamp;
				const progress = Math.min((timestamp - startTimestamp) / duration, 1);
				//target.innerText = Math.floor(progress * (end - start) + start);
				var numberX = progress * (end - start) + start;
				if (Number.isInteger(end)) {
					target.innerText = Math.floor(numberX);
				} else {
					target.innerText = Number(numberX).toFixed(0);
				}
				if (progress < 1) {
					window.requestAnimationFrame(step);
				}
			};
			window.requestAnimationFrame(step);
		};
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
		var ComboBlocksNumberCount = document.querySelectorAll(".ComboBlocksNumberCount");
		if (ComboBlocksNumberCount != null) {
			ComboBlocksNumberCount.forEach((item) => {
				var numberCountArgs = item.getAttribute("data-number-counter");
				var numberCountArgsObj = JSON.parse(numberCountArgs);


				var blockId = numberCountArgsObj.blockId;
				var start = numberCountArgsObj.start;
				var end = numberCountArgsObj.end;
				var duration = numberCountArgsObj.duration;
				var onScroll = numberCountArgsObj.onScroll;



				// var source = numberCountArgsObj.source;
				// var saleCount = numberCountArgsObj.saleCount;
				// var metaValue = numberCountArgsObj.metaValue;
				// var end = "";
				// if (source.length > 0) {
				// 	if (source == "post_meta") {
				// 		end = metaValue;
				// 	} else {
				// 		end = saleCount;
				// 	}
				// } else {
				// 	end = endX;
				// }
				var wrapHandle = "." + blockId + " .number-count";
				if (onScroll) {
					document.addEventListener("scroll", function (e) {
						const target = document.querySelector(wrapHandle);
						var isInView = isInViewport(target);
						if (isInView) {
							counterAnim(wrapHandle, start, end, duration);
						}
					});
				} else {
					counterAnim(wrapHandle, start, end, duration);
				}
			});
		}
	});
}