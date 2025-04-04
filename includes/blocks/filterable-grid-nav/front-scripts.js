//import mixitup from 'mixitup';
export function setupFilterableGridNav() {
  document.addEventListener("DOMContentLoaded", function (event) {
    var ComboBlocksPostGrid = document.querySelectorAll(
      ".ComboBlocksFilterableGridNav"
    );


    if (ComboBlocksPostGrid != null) {
      ComboBlocksPostGrid.forEach((item) => {
        var postgridargs = item.getAttribute("data-postgridargs");
        var postgridargsObj = JSON.parse(postgridargs);
        var blockId = postgridargsObj.blockId;

        var activeFilter = postgridargsObj.activeFilter;
        var activeFilterSlug = activeFilter.slug;
        var perPage = postgridargsObj.perPage;
        var logicBetweenGroups = postgridargsObj.logicBetweenGroups;
        var logicWithinGroup = postgridargsObj.logicWithinGroup;
        var multifilter = postgridargsObj.multifilter;

        activeFilterSlug =
          activeFilterSlug.length == 0 ? "all" : activeFilterSlug;
        activeFilterSlug =
          activeFilterSlug == "all" ? "all" : "." + activeFilterSlug;

        var lazyLoad = postgridargsObj.lazyLoad;
        var lazyLoadEnable = lazyLoad.enable;

        if (lazyLoadEnable == "yes") {
          var lazyloadWrap = document.querySelector("#lazyload-" + blockId);

          item.style.display = "block";
          lazyloadWrap.style.display = "none";
        }

        var containerEl = document.querySelector(".items-loop");
        var mixer = mixitup(containerEl, {
          selectors: {
            control: ".pg-filter-" + blockId,
            target: ".item",
            pageList: ".pager-list-" + blockId,
          },

          pagination: {
            limit: perPage,
            maxPagers: 5,
            hidePageListIfSinglePage: true,
          },
          templates: {
            pagerPrev:
              '<span class="page-numbers prev pg-filter-' +
              blockId +
              ' ${classNames}" data-page="prev">Prev</span>',
            pagerNext:
              '<span class="page-numbers next pg-filter-' +
              blockId +
              ' ${classNames}" data-page="next">Next</span>',
            pager:
              '<span class="page-numbers pg-filter-' +
              blockId +
              ' ${classNames}" data-page="${pageNumber}">${pageNumber}</span>',
          },

          multifilter: {
            enable: multifilter,
            logicWithinGroup: logicWithinGroup,
            logicBetweenGroups: logicBetweenGroups,
          },

          load: {
            filter: activeFilterSlug,
          },
        });
      });
    }

    // function isInViewport(el) {
    //   const rect = el.getBoundingClientRect();
    //   return (
    //     rect.top >= 0 &&
    //     rect.left >= 0 &&
    //     rect.bottom <=
    //     (window.innerHeight || document.documentElement.clientHeight) &&
    //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    //   );
    // }

    // var loader = document.querySelector(".infinite-loader");

    // if (loader != null) {
    //   document.addEventListener(
    //     "scroll",
    //     function () {
    //       var isInView = isInViewport(loader);
    //       var loading = loader.getAttribute("loading");

    //       if (isInView) {
    //         loader.classList.add("visible");
    //         if (loading == null) {
    //           loadPostsOnScroll();
    //         }
    //         //loadPostsOnScroll();
    //       } else {
    //         loader.classList.remove("visible");
    //       }
    //     },
    //     {
    //       passive: true,
    //     }
    //   );
    // }

    // function loadPostsOnScroll() {
    //   loader.setAttribute("loading", "true");

    //   var loaderParent = loader.closest("div[data-blockArgs]");
    //   var blockargs = loaderParent.getAttribute("data-blockargs");

    //   var blockargsObj = blockargs != null ? JSON.parse(blockargs) : {};
    //   var blockId =
    //     blockargsObj.blockId != undefined ? blockargsObj.blockId : null;
    //   if (blockId == null) return;

    //   var noPosts = blockargsObj.noPosts;

    //   if (noPosts == true) return;

    //   var queryArgs = combo_blocks_vars[blockId].queryArgs;
    //   var rawData = combo_blocks_vars[blockId].layout.rawData;

    //   var pagination = blockargsObj.pagination;
    //   var loadMoreText = pagination.loadMoreText;
    //   var noMorePosts = pagination.noMorePosts;

    //   var loadingText = pagination.loadingText;
    //   var loadingIcon = pagination.loadingIcon;
    //   var page = pagination.page;

    //   loader.innerHTML = loadingIcon + loadingText;

    //   setTimeout(() => {
    //     //loader.innerHTML = loadingText;

    //     var queryArgsX = queryArgs.map((x) => {
    //       if (x.id == "paged") {
    //         x.val = page + 1;
    //         blockargsObj.pagination.page = page + 1;
    //       }

    //       return x;
    //     });

    //     loaderParent.setAttribute("blockargs", JSON.stringify(blockargsObj));

    //     let data = {
    //       queryArgs: queryArgsX,
    //       rawData: rawData,
    //     };

    //     fetch(combo_blocks_vars["siteUrl"] + "/wp-json/combo-blocks/v2/get_posts", {
    //       method: "POST",
    //       body: JSON.stringify(data),
    //       headers: {
    //         "Content-Type": "application/json;charset=utf-8",
    //       },
    //     })
    //       .then((response) => {
    //         if (response.ok && response.status < 400) {
    //           response.json().then((dataX) => {
    //             var posts = dataX["posts"] != undefined ? dataX["posts"] : [];
    //             var noPosts =
    //               dataX["noPosts"] != undefined ? dataX["noPosts"] : false;

    //             if (noPosts == true) {
    //               loader.innerHTML = noMorePosts;
    //               blockargsObj.noPosts = true;
    //               loaderParent.setAttribute(
    //                 "blockargs",
    //                 JSON.stringify(blockargsObj)
    //               );

    //               return;
    //             }

    //             if (!noPosts) {
    //               var html = "";

    //               posts.map((x) => {
    //                 html += '<div class="item">' + x.html + "</div>";
    //               });

    //               itemsLoopWrap.insertAdjacentHTML("beforeend", html);
    //               //loader.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    //             }

    //             loader.removeAttribute("loading");
    //           });
    //         }
    //       })
    //       .catch((_error) => {
    //         //this.saveAsStatus = 'error';
    //         // handle the error
    //       });
    //   }, 500);
    // }

    // const loadMorewrap = document.querySelector(".loadmore .page-numbers");
    // const itemsLoopWrap = document.querySelector(".items-loop");
    // const loopLoadingWrap = document.querySelector(".loop-loading");

    // var paginationAjax = document.querySelector(".pagination.ajax");

    // if (paginationAjax != null) {
    //   new MutationObserver(function (mutationsList, observer) {
    //     for (const mutation of mutationsList) {
    //       if (mutation.type === "childList") {
    //         ajaxPageClick();
    //       }
    //     }
    //   }).observe(paginationAjax, { childList: true, subtree: true });
    // }

    // function ajaxPageClick() {
    //   var paginationAjaxLink = document.querySelectorAll(".pagination.ajax a");

    //   if (paginationAjaxLink != null) {
    //     paginationAjaxLink.forEach((el) =>
    //       el.addEventListener("click", (event) => {
    //         event.preventDefault();
    //         var href = event.target.getAttribute("href");

    //         var hrefParts = href.split("/");
    //         var filtered = hrefParts.filter(function (el) {
    //           return el;
    //         });
    //         var lastElement = parseInt(filtered.pop());

    //         var blockargs = el
    //           .closest("div[data-blockArgs]")
    //           .getAttribute("data-blockargs");

    //         var blockargsObj = blockargs != null ? JSON.parse(blockargs) : {};
    //         var blockId =
    //           blockargsObj.blockId != undefined ? blockargsObj.blockId : null;

    //         if (blockId == null) return;

    //         var queryArgs = combo_blocks_vars[blockId].queryArgs;
    //         var rawData = combo_blocks_vars[blockId].layout.rawData;

    //         var pagination = blockargsObj.pagination;
    //         var loadMoreText = pagination.loadMoreText;
    //         var loadingText = pagination.loadingText;
    //         var loadingIcon = pagination.loadingIcon;

    //         var queryArgsX = queryArgs.map((x) => {
    //           if (x.id == "paged") {
    //             x.val = lastElement;
    //           }

    //           return x;
    //         });

    //         let data = {
    //           queryArgs: queryArgsX,
    //           rawData: rawData,
    //         };

    //         loopLoadingWrap.innerHTML = loadingIcon + loadingText;

    //         fetch(combo_blocks_vars["siteUrl"] + "/wp-json/combo-blocks/v2/get_posts", {
    //           method: "POST",
    //           body: JSON.stringify(data),
    //           headers: {
    //             "Content-Type": "application/json;charset=utf-8",
    //           },
    //         })
    //           .then((response) => {
    //             if (response.ok && response.status < 400) {
    //               response.json().then((dataX) => {
    //                 var posts = dataX["posts"] != undefined ? dataX["posts"] : [];
    //                 var pagination =
    //                   dataX["pagination"] != undefined ? dataX["pagination"] : [];

    //                 var html = "";
    //                 var paginationHtml = "";

    //                 posts.map((x) => {
    //                   html += '<div class="item">' + x.html + "</div>";
    //                 });

    //                 pagination.map((x) => {
    //                   paginationHtml += x;
    //                 });

    //                 loopLoadingWrap.innerHTML = "";
    //                 itemsLoopWrap.innerHTML = html;

    //                 paginationAjax.innerHTML = paginationHtml;

    //                 setTimeout(() => {
    //                   itemsLoopWrap.scrollIntoView({
    //                     behavior: "smooth",
    //                     block: "start",
    //                     inline: "nearest",
    //                   });
    //                   setTimeout(() => {
    //                     window.scrollBy(0, -30);
    //                   }, 500);
    //                 }, 500);
    //               });
    //             }
    //           })
    //           .catch((_error) => {
    //             //this.saveAsStatus = 'error';
    //             // handle the error
    //           });
    //       })
    //     );
    //   }
    // }

    // ajaxPageClick();

    // loadMorewrap != null &&
    //   loadMorewrap.addEventListener("click", function () {
    //     var disabled = loadMorewrap.getAttribute("disabled");

    //     if (disabled == "disabled") return;

    //     var loadMorewrapparent = loadMorewrap.closest("div[data-blockArgs]");
    //     var blockargs = loadMorewrapparent.getAttribute("data-blockargs");

    //     // const blockargs = loadMorewrap.getAttribute('blockargs');
    //     var blockargsObj = blockargs != null ? JSON.parse(blockargs) : {};
    //     var blockId =
    //       blockargsObj.blockId != undefined ? blockargsObj.blockId : null;
    //     if (blockId == null) return;

    //     var queryArgs = combo_blocks_vars[blockId].queryArgs;
    //     var rawData = combo_blocks_vars[blockId].layout.rawData;

    //     var pagination = blockargsObj.pagination;
    //     var loadMoreText = pagination.loadMoreText;
    //     var noMorePosts = pagination.noMorePosts;

    //     var loadingText = pagination.loadingText;
    //     var loadingIcon = pagination.loadingIcon;
    //     var page = pagination.page;

    //     var noPosts = blockargsObj.noPosts;

    //     loadMorewrap.innerHTML = loadingIcon + loadingText;

    //     setTimeout(() => {
    //       loadMorewrap.innerHTML = loadMoreText;

    //       var queryArgsX = queryArgs.map((x) => {
    //         if (x.id == "paged") {
    //           x.val = page + 1;
    //           blockargsObj.pagination.page = page + 1;
    //         }

    //         return x;
    //       });

    //       loadMorewrapparent.setAttribute(
    //         "blockargs",
    //         JSON.stringify(blockargsObj)
    //       );

    //       let data = {
    //         queryArgs: queryArgsX,
    //         rawData: rawData,
    //       };

    //       fetch(combo_blocks_vars["siteUrl"] + "/wp-json/combo-blocks/v2/get_posts", {
    //         method: "POST",
    //         body: JSON.stringify(data),
    //         headers: {
    //           "Content-Type": "application/json;charset=utf-8",
    //         },
    //       })
    //         .then((response) => {
    //           if (response.ok && response.status < 400) {
    //             response.json().then((dataX) => {
    //               var posts = dataX["posts"] != undefined ? dataX["posts"] : [];
    //               var noPosts =
    //                 dataX["noPosts"] != undefined ? dataX["noPosts"] : false;

    //               if (!noPosts) {
    //                 var html = "";

    //                 posts.map((x) => {
    //                   html += '<div class="item">' + x.html + "</div>";
    //                 });

    //                 itemsLoopWrap.insertAdjacentHTML("beforeend", html);
    //                 loadMorewrap.scrollIntoView({
    //                   behavior: "smooth",
    //                   block: "start",
    //                   inline: "nearest",
    //                 });
    //               }

    //               if (noPosts) {
    //                 loadMorewrap.innerHTML = noMorePosts;
    //                 loadMorewrap.setAttribute("disabled", "disabled");
    //               }
    //             });
    //           }
    //         })
    //         .catch((_error) => {
    //           //this.saveAsStatus = 'error';
    //           // handle the error
    //         });
    //     }, 500);
    //   });

    /*##############################*/
  });
}