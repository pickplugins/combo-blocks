export function setupReactions() {
	document.addEventListener("DOMContentLoaded", function (event) {

		var pgReactionBtns = document.querySelectorAll(".pg-reaction");

		console.log(pgReactionBtns);


		if (pgReactionBtns != null) {
			pgReactionBtns.forEach((el) => {
				el.addEventListener("click", function () {
					var reactionName = el.getAttribute("data-name");

					var parentElement = el.parentElement;
					var dataObject = parentElement.getAttribute("data-object");
					var dataReactions = parentElement.getAttribute("data-reactions");
					var currentReaction = parentElement.getAttribute("data-current-reaction");
					var dataObjectObj = JSON.parse(dataObject);
					var dataReactionsObj = JSON.parse(dataReactions);

					var objType = dataObjectObj.type;
					var objId = dataObjectObj.id;
					var blockId = dataObjectObj.blockId;

					console.log(dataReactionsObj);


					parentElement.setAttribute('data-current-reaction', reactionName);

					var nonce = combo_blocks_blocks_vars[blockId]._wpnonce;


					let data = {
						objId: objId,
						objType: objType,
						reaction: reactionName,
						_wpnonce: nonce,
					};

					if (currentReaction.length == 0) {
						data.action = "add";
					} else {
						data.action = "update";

					}



					fetch(combo_blocks_blocks_vars["siteUrl"] + "/wp-json/combo-blocks/v2/update_reactions", {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json;charset=utf-8",
							"X-WP-Nonce": nonce
						},
					})
						.then((response) => {
							if (response.ok && response.status < 400) {
								response.json().then((responseData) => {

									console.log(responseData);


								});
							}
						})
						.catch((_error) => {
							//this.saveAsStatus = 'error';
							// handle the error
						});



				})

			})
		}










		const summary = document.querySelector(".summary");

		if (summary != null) {
			summary.addEventListener("click", function () {
				const overlay = document.querySelector(".overlay");
				overlay.classList.toggle("hidden");
			});
		}



	});
}