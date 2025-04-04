export function setupPostGrid() {
	document.addEventListener("DOMContentLoaded", function (event) {
		var ComboBlocksPostGrid = document.querySelectorAll(".ComboBlocksPostGrid");
		if (ComboBlocksPostGrid != null) {
			ComboBlocksPostGrid.forEach((item) => {
				var postgridargs = item.getAttribute("data-postgridargs");
				var postgridargsObj = JSON.parse(postgridargs);
				var blockId = postgridargsObj.blockId;
				var lazyLoad = postgridargsObj.lazyLoad;
				var lazyLoadEnable = lazyLoad.enable;
				if (lazyLoadEnable == "yes") {
					var lazyloadWrap = document.querySelector("#lazyload-" + blockId);
					item.style.display = "block";
					lazyloadWrap.style.display = "none";
				}
			});
		}
		document.addEventListener("pgFormChanged", (event) => {
			var detail = event.detail;
			var formId = detail.formId;
			var pgForm = document.getElementById(formId);
			const formData = new FormData(pgForm);
			let queryString = new URLSearchParams(formData).toString();
			let params = new URLSearchParams(queryString);
		});
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
		var loader = document.querySelector(".infinite-loader");



		if (loader != null) {
			document.addEventListener(
				"scroll",
				function () {
					var isInView = isInViewport(loader);
					var loading = loader.getAttribute("loading");
					if (isInView) {
						loader.classList.add("visible");
						if (loading == null) {
							loadPostsOnScroll();
						}
						//loadPostsOnScroll();
					} else {
						loader.classList.remove("visible");
					}
				},
				{
					passive: true,
				}
			);
		}
		function loadPostsOnScroll() {
			loader.setAttribute("loading", "true");



			var loaderParent = loader.closest("div[data-postqueryargs]");
			var blockargs = loaderParent.getAttribute("data-postqueryargs");
			var blockargsObj = blockargs != null ? JSON.parse(blockargs) : {};
			var blockId = blockargsObj.blockId != undefined ? blockargsObj.blockId : null;


			if (blockId == null) return;
			var combo_blocks_prams = window['combo_blocks_prams'][blockId]

			var noPosts = blockargsObj.noPosts;
			if (noPosts == true) return;





			var queryArgs = combo_blocks_prams.queryArgs;
			var rawData = combo_blocks_prams.layout.rawData;
			var pagination = combo_blocks_prams.pagination;
			var nonce = combo_blocks_prams._wpnonce;

			var loadMoreText = pagination.loadMoreText;
			var noMorePosts = pagination.noMorePosts;
			var loadingText = pagination.loadingText;
			var loadingIcon = pagination.loadingIcon;
			var page = pagination.page;
			loader.innerHTML = loadingIcon + loadingText;
			setTimeout(() => {
				//loader.innerHTML = loadingText;
				var queryArgsX = queryArgs.map((x) => {
					if (x.id == "paged") {
						x.val = page + 1;
						//blockargsObj.pagination.page = page + 1;
						window['combo_blocks_prams'][blockId].pagination.page = page + 1

					}
					return x;
				});
				loaderParent.setAttribute("data-blockargs", JSON.stringify(blockargsObj));
				let data = {
					queryArgs: queryArgsX,
					returnObj: 'html',
					rawData: rawData,
					_wpnonce: nonce,
				};
				fetch(combo_blocks_prams["siteUrl"] + "/wp-json/combo-blocks/v2/get_posts", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json;charset=utf-8",
						"X-WP-Nonce": nonce

					},
				})
					.then((response) => {
						if (response.ok && response.status < 400) {
							response.json().then((dataX) => {
								var posts = dataX["posts"] != undefined ? dataX["posts"] : [];
								var noPosts =
									dataX["noPosts"] != undefined ? dataX["noPosts"] : false;
								if (noPosts == true) {
									loader.innerHTML = noMorePosts;
									blockargsObj.noPosts = true;
									loaderParent.setAttribute(
										"data-blockargs",
										JSON.stringify(blockargsObj)
									);
									return;
								}
								if (!noPosts) {
									var html = "";
									posts.map((x) => {
										html += '<div className="item">' + x.html + "</div>";
									});
									itemsLoopWrap.insertAdjacentHTML("beforeend", html);
									//loader.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
								}
								loader.removeAttribute("loading");
							});
						}
					})
					.catch((_error) => {
						//this.saveAsStatus = 'error';
						// handle the error
					});
			}, 500);
		}
		const loadMorewrap = document.querySelector(".loadmore .page-numbers");



		const itemsLoopWrap = document.querySelector(".items-loop");
		const loopLoadingWrap = document.querySelector(".loop-loading");
		var paginationAjax = document.querySelector(".pagination.ajax");
		if (paginationAjax != null) {
			new MutationObserver(function (mutationsList, observer) {
				for (const mutation of mutationsList) {
					if (mutation.type === "childList") {
						ajaxPageClick();
					}
				}
			}).observe(paginationAjax, { childList: true, subtree: true });
		}
		function ajaxPageClick() {
			var paginationAjaxLink = document.querySelectorAll(".pagination.ajax a");
			if (paginationAjaxLink != null) {
				paginationAjaxLink.forEach((el) =>
					el.addEventListener("click", (event) => {
						event.preventDefault();
						var href = event.target.getAttribute("href");
						var hrefParts = href.split("/");
						var filtered = hrefParts.filter(function (el) {
							return el;
						});
						var lastElement = parseInt(filtered.pop());
						var blockargs = el.closest("div[data-postqueryargs]").getAttribute("data-postqueryargs");
						var blockargsObj = blockargs != null ? JSON.parse(blockargs) : {};
						var blockId =
							blockargsObj.blockId != undefined ? blockargsObj.blockId : null;
						if (blockId == null) return;


						var combo_blocks_prams = window['combo_blocks_prams'][blockId]


						var queryArgs = combo_blocks_prams.queryArgs;
						var rawData = combo_blocks_prams.layout.rawData;
						var nonce = combo_blocks_prams._wpnonce;
						var pagination = combo_blocks_prams.pagination;
						var loadMoreText = pagination.loadMoreText;
						var prevText = pagination.prevText;
						var nextText = pagination.nextText;
						var maxPageNum = parseInt(pagination.maxPageNum);
						var loadingText = pagination.loadingText;
						var loadingIcon = pagination.loadingIcon;
						var queryArgsX = queryArgs.map((x) => {
							if (x.id == "paged") {
								x.val = lastElement;
							}
							return x;
						});
						let data = {
							queryArgs: queryArgsX,
							returnObj: 'html',
							prevText: prevText,
							nextText: nextText,
							maxPageNum: maxPageNum,
							rawData: rawData,
							_wpnonce: nonce,
						};
						if (loopLoadingWrap != null) {
							loopLoadingWrap.innerHTML = loadingIcon + loadingText;
						}
						fetch(combo_blocks_prams["siteUrl"] + "/wp-json/combo-blocks/v2/get_posts", {
							method: "POST",
							body: JSON.stringify(data),
							headers: {
								"Content-Type": "application/json;charset=utf-8",
								"X-WP-Nonce": nonce
							},
						})
							.then((response) => {
								if (response.ok && response.status < 400) {
									response.json().then((dataX) => {
										var posts = dataX["posts"] != undefined ? dataX["posts"] : [];
										var pagination =
											dataX["pagination"] != undefined ? dataX["pagination"] : [];
										var html = "";
										var paginationHtml = "";
										posts.map((x) => {
											html += '<div className="item">' + x.html + "</div>";
										});
										pagination.map((x) => {
											paginationHtml += x;
										});
										loopLoadingWrap.innerHTML = "";
										itemsLoopWrap.innerHTML = html;
										paginationAjax.innerHTML = paginationHtml;
										setTimeout(() => {
											itemsLoopWrap.scrollIntoView({
												behavior: "smooth",
												block: "start",
												inline: "nearest",
											});
											setTimeout(() => {
												window.scrollBy(0, -30);
											}, 500);
										}, 500);
									});
								}
							})
							.catch((_error) => {
								//this.saveAsStatus = 'error';
								// handle the error
							});
					})
				);
			}
		}
		ajaxPageClick();
		loadMorewrap != null &&
			loadMorewrap.addEventListener("click", function () {
				var disabled = loadMorewrap.getAttribute("disabled");
				if (disabled == "disabled") return;
				var loadMorewrapparent = loadMorewrap.closest("div[data-postqueryargs]");



				var blockargs = loadMorewrapparent.getAttribute("data-postqueryargs");
				var blockargsObj = blockargs != null ? JSON.parse(blockargs) : {};
				var blockId =
					blockargsObj.blockId != undefined ? blockargsObj.blockId : null;
				if (blockId == null) return;


				var combo_blocks_prams = window['combo_blocks_prams'][blockId];


				var queryArgs = combo_blocks_prams.queryArgs;
				var rawData = combo_blocks_prams.layout.rawData;
				var nonce = combo_blocks_prams._wpnonce;

				var pagination = combo_blocks_prams.pagination;



				var loadMoreText = pagination.loadMoreText;
				var noMorePosts = pagination.noMorePosts;
				var loadingText = pagination.loadingText;
				var loadingIcon = pagination.loadingIcon;
				var loadMoreIcon = pagination.loadMoreIcon;
				var loadMorePosition = pagination.loadMorePosition;
				var loadingPosition = pagination.loadingPosition;
				var page = pagination.page;
				var noPosts = blockargsObj.noPosts;



				if (loadingPosition == "beforeText") {
					loadMorewrap.innerHTML = loadingIcon + " " + loadingText;
				}
				if (loadingPosition == "afterText") {
					loadMorewrap.innerHTML = loadingText + " " + loadingIcon;
				}
				setTimeout(() => {
					// loadMorewrap.innerHTML = loadMoreText;
					var queryArgsX = queryArgs.map((x) => {
						if (x.id == "paged") {
							x.val = page + 1;
							window['combo_blocks_prams'][blockId].pagination.page = page + 1

							//blockargsObj.pagination.page = page + 1;
						}
						return x;
					});
					loadMorewrapparent.setAttribute(
						"data-blockargs",
						JSON.stringify(blockargsObj)
					);
					let data = {
						queryArgs: queryArgsX,
						returnObj: 'html',
						rawData: rawData,
						_wpnonce: nonce,
					};
					fetch(combo_blocks_prams["siteUrl"] + "/wp-json/combo-blocks/v2/get_posts", {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json;charset=utf-8",
							"X-WP-Nonce": nonce
						},
					})
						.then((response) => {
							if (response.ok && response.status < 400) {
								response.json().then((dataX) => {
									var posts = dataX["posts"] != undefined ? dataX["posts"] : [];
									var noPosts =
										dataX["noPosts"] != undefined ? dataX["noPosts"] : false;
									if (!noPosts) {
										var html = "";
										posts.map((x) => {
											html += '<div className="item">' + x.html + "</div>";
										});
										itemsLoopWrap.insertAdjacentHTML("beforeend", html);
										loadMorewrap.scrollIntoView({
											behavior: "smooth",
											block: "start",
											inline: "nearest",
										});
									}
									if (noPosts) {
										loadMorewrap.innerHTML = noMorePosts;
										loadMorewrap.setAttribute("disabled", "disabled");
									}
									if (loadMorePosition == "beforeText") {
										loadMorewrap.innerHTML = loadMoreIcon + " " + loadMoreText;
									}
									if (loadMorePosition == "afterText") {
										loadMorewrap.innerHTML = loadMoreText + " " + loadMoreIcon;
									}
								});
							}
						})
						.catch((_error) => {
							//this.saveAsStatus = 'error';
							// handle the error
						});
				}, 500);
			});
	});
}