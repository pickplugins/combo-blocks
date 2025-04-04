export function setupBackToTop() {
	document.addEventListener("DOMContentLoaded", function (event) {
		(() => {
			"use strict";
			window.addEventListener("load", () => {
				document.querySelectorAll(".pg-back-to-top").forEach((e) => {
					const t = e.getAttribute("data-settings"),
						o = JSON.parse(t);
					// Ensure the button starts hidden
					e.style.display = "none";
					e.addEventListener("click", () => {
						window.scrollTo({
							left: 0,
							top: o.offset_top,
							behavior: "smooth",
						});
					});
					document.addEventListener("scroll", () => {
						if (o.show_scroll) {
							let scrollTop = window.scrollY;
							let threshold =
								parseInt(o.show_after, 10) + parseInt(o.offset_top, 10);
							e.style.display = scrollTop > threshold ? "block" : "none";
						}
					});
				});
			});
		})();
	});
}