export function setupMenu() {
	document.addEventListener("DOMContentLoaded", function (event) {
		var mobileToggle = document.querySelector(".mobile-menu-toggle");
		var mobileMenuWrap = document.querySelector(".mobile-menu-wrap");
		var mobileMenuClose = document.querySelector(".mobile-menu-close");



		if (mobileToggle != null) {
			mobileToggle.addEventListener("click", (event) => {
				mobileMenuWrap.toggleAttribute("active");
			});
		}
		if (mobileMenuClose != null) {
			mobileMenuClose.addEventListener("click", (event) => {
				mobileMenuWrap.toggleAttribute("active");
			});
		}
	});
}
