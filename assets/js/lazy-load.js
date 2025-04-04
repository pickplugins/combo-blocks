document.addEventListener("DOMContentLoaded", function () {
	var lazyImages = document.querySelectorAll("img[data-src]");

	function lazyLoad() {
		lazyImages.forEach(function (img) {
			if (
				img.getBoundingClientRect().top <= window.innerHeight &&
				img.getBoundingClientRect().bottom >= 0
			) {
				// If the image is within the viewport
				var width = img.hasAttribute("data-width")
					? img.getAttribute("data-width")
					: img.getAttribute("width");
				var height = img.hasAttribute("data-height")
					? img.getAttribute("data-height")
					: img.getAttribute("height");
				if (img.hasAttribute("data-width")) {
					img.setAttribute("width", 20);
				}
				if (img.hasAttribute("data-height")) {
					img.setAttribute("height", 20);
				}

				if (img.getAttribute("data-loaded") !== "true") {
					var newImg = new Image();
					newImg.src = img.getAttribute("data-src");
					newImg.onload = function () {
						img.src = img.getAttribute("data-src");
						// img.removeAttribute("data-src");
						img.setAttribute("data-loaded", "true");
						setTimeout(function () {
							img.setAttribute("width", width);
							img.setAttribute("height", height);
							img.removeAttribute("data-width");
							img.removeAttribute("data-height");
						}, 1);
					};
				}
			}
		});
	}

	lazyLoad();

	window.addEventListener("scroll", lazyLoad);
	window.addEventListener("load", lazyLoad);
});
