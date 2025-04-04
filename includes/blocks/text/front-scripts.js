export function setupText() {
	document.addEventListener("DOMContentLoaded", function () {
		const contentElement = document.querySelector('[clicktocopy="1"]');
		if (contentElement) {
			const copyContent = contentElement.getAttribute("data-copycontent");
			if (copyContent) {
				contentElement.addEventListener("click", function () {
					copyToClipboard(copyContent);
				});
			} else {
			}
		}
		function copyToClipboard(text) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
				})
				.catch((err) => {
					alert("Failed to copy content.");
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
		const animateonElement = document.querySelectorAll('[data-animateon]');
		if (animateonElement != null) {
			animateonElement.forEach((el) => {
				var animateon = el.getAttribute("data-animateon");
				var elementId = el.getAttribute("id");
				var animateonObj = JSON.parse(animateon)
				var elementHndle = document.querySelector("#" + elementId);
				animateonObj.forEach((animate) => {
					var animationName = animate.animationName
					var event = animate.event
					var delay = parseInt(animate.delay)
					var duration = parseInt(animate.duration)
					if (event == 'load') {
						elementHndle.classList.add("animate__animated");
						elementHndle.classList.add("animate__" + animationName);
						setTimeout(() => {
							elementHndle.classList.remove("animate__animated");
							elementHndle.classList.remove("animate__" + animationName);
						}, 2000);
					}
					if (event == 'click') {
						elementHndle.addEventListener("click", function (e) {
							elementHndle.classList.add("animate__animated");
							elementHndle.classList.add("animate__" + animationName);
							setTimeout(() => {
								elementHndle.classList.remove("animate__animated");
								elementHndle.classList.remove("animate__" + animationName);
							}, 2000);
						})
					}
					if (event == 'scroll') {
						document.addEventListener("scroll", function (e) {
							const target = document.querySelector("#" + elementId);
							var isViewport = isInViewport(target);
							if (isViewport) {
								elementHndle.classList.add("animate__animated");
								elementHndle.classList.add("animate__" + animationName);
								setTimeout(() => {
									elementHndle.classList.remove("animate__animated");
									elementHndle.classList.remove("animate__" + animationName);
								}, 2000);
							}
						})
					}
					if (event == 'mouseover') {
						elementHndle.addEventListener("mouseover", function (e) {
							elementHndle.classList.add("animate__animated");
							elementHndle.classList.add("animate__" + animationName);
							setTimeout(() => {
								elementHndle.classList.remove("animate__animated");
								elementHndle.classList.remove("animate__" + animationName);
							}, 2000);
						})
					}
					if (event == 'mouseout') {
						elementHndle.addEventListener("mouseout", function (e) {
							elementHndle.classList.add("animate__animated");
							elementHndle.classList.add("animate__" + animationName);
							setTimeout(() => {
								elementHndle.classList.remove("animate__animated");
								elementHndle.classList.remove("animate__" + animationName);
							}, 2000);
						})
					}
				})
			})
		}
		const tooltipElement = document.querySelectorAll('[data-tooltip]');
		if (tooltipElement != null) {
			tooltipElement.forEach((el) => {
				var animateon = el.getAttribute("data-tooltip");
				var elementId = el.getAttribute("id");
				var tooltipObj = JSON.parse(animateon)
				var elementHndle = document.querySelector("#" + elementId);
				var options = {}
				tooltipObj.map(item => {
					options[item.id] = item.value
				})
				tippy("#" + elementId, options);
			})
		}
		const typedElement = document.querySelectorAll('[data-typed]');
		if (typedElement != null) {
			typedElement.forEach((el) => {
				var animateon = el.getAttribute("data-typed");
				var elementId = el.getAttribute("id");
				var typedObj = JSON.parse(animateon)
				var elementHndle = document.querySelector("#" + elementId);
				var options = {}
				typedObj.map(item => {
					var val = item.value;
					if (item.id == 'typeSpeed') {
						val = parseInt(item.value);
					}

					options[item.id] = val
				})


				var typed = new Typed("#" + elementId + " .pg-text", options);

			})
		}




		const tiltElement = document.querySelectorAll('[data-tilt]');
		if (tiltElement != null) {
			tiltElement.forEach((el) => {
				var tilt = el.getAttribute("data-tilt");
				var elementId = el.getAttribute("id");
				var tiltObj = JSON.parse(tilt)
				var elementHndle = document.querySelector("#" + elementId);
				var options = {}
				tiltObj.map(item => {
					options[item.id] = item.value
				})
				tippy("#" + elementId, options);
				VanillaTilt.init(document.querySelector("#" + elementId), options);
			})
		}
	});
}