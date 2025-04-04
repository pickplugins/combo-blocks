export function setupMasonry() {
	document.addEventListener("DOMContentLoaded", function (event) {
		var ComboBlocksMasonryWrap = document.querySelectorAll(".ComboBlocksMasonryWrap");
		if (ComboBlocksMasonryWrap != null) {
			ComboBlocksMasonryWrap.forEach((item) => {
				var masonryArgs = item.getAttribute("data-masonry");
				var masonryArgsObj = JSON.parse(masonryArgs);
				var masonryOptions = masonryArgsObj;
				var blockargs = item.getAttribute("data-block-id");
				var blockArgsObj = JSON.parse(blockargs);
				var blockId = blockArgsObj.blockId;
				// var elemX = document.querySelector(".pg" + blockId);
				var elemX = document.querySelector("." + blockId);
				if (elemX != null) {
					// elemX.forEach((item) => {
					imagesLoaded(item, function () {
						var msnry = new Masonry(item, masonryOptions);
					});
					// });
				}
			});
		}
	});
}