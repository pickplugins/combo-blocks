export function setupForm() {
	document.addEventListener("DOMContentLoaded", function (event) {
		// To assign event
		const pgFormSubmitted = new Event("pgFormSubmitted");
		var conditions = document.querySelectorAll(`[data-conditions]`);
		var calculations = document.querySelectorAll(`[data-calculations]`);
		var submittriggers = document.querySelectorAll(`[data-submittriggers]`);

		var conditionsSelector = [];
		var calculationsSelector = {};
		var calculationsFields = {};



		var pgForms = document.querySelectorAll(".pg-form-wrap form");
		var pgFormFields = document.querySelectorAll(".pg-form-field");
		/*Hide all error message on load form*/
		if (pgFormFields != null) {
			pgFormFields.forEach((pgFormField) => {
				var fieldId = pgFormField.getAttribute("id");
				var errorWrap = document.querySelector("#" + fieldId + " .error-wrap");
				if (errorWrap != null) {
					errorWrap.style.display = "none";
				}
			});
		}

		function addEvent(obj, evt, fn) {
			if (obj.addEventListener) {
				obj.addEventListener(evt, fn, false);
			} else if (obj.attachEvent) {
				obj.attachEvent("on" + evt, fn);
			}
		}




		if (submittriggers != null) {
			var onsubmitProceed = true;
			var submitFormByTriggers = [];
			submittriggers.forEach((form) => {



				var formId = form.getAttribute("data-formId");

				var submittriggers = form.getAttribute("data-submittriggers");
				var submittriggersObj = JSON.parse(submittriggers);
				var formByID = document.querySelector(`[data-formid="${formId}"]`);
				var onprocessargs = formByID.getAttribute("data-onprocessargs");

				var formargs = formByID.getAttribute("data-formargs");
				var formargsObj = JSON.parse(formargs);
				var fieldInfo = formargsObj.fieldInfo;
				var onprocessargsObj = JSON.parse(onprocessargs);

				var loadingWrap = document.querySelector("." + formId + "-loading");

				submittriggersObj.map((item) => {

					var id = item.id;




					if (id == "onChangeForm") {

						form.addEventListener("change", (event) => {

							const formData = new FormData(form);

							formData.append("formType", formargsObj.type);
							formData.append("onprocessargs", JSON.stringify(onprocessargsObj));


							submitFormByTriggers['onChangeForm'] = true;
							loadingWrap.style.display = "block";
							processSubmit(formId, formData);
						})
					}

					if (id == "onChangeFields") {
						var value = item.value;
						var selectorHndle = document.querySelector(`[name="${value}"]`);
						selectorHndle.addEventListener("input", (event) => {
							submitFormByTriggers['onChangeFields'] = true;

						})

					}

					if (id == "clickElement") {
						var value = item.value;
						if (value.length == 0) return;
						var selectorHndle = document.querySelector(value);
						selectorHndle.addEventListener("click", (event) => {
							submitFormByTriggers['clickElement'] = true;

						})

					}

					if (id == "onExit") {

						addEvent(document, "mouseout", function (e) {




							if (e.toElement == null && e.relatedTarget == null) {


								e.preventDefault();
								e.defaultPrevented;
								var confirmationMessage = "tab close";
								e.preventDefault();
								submitFormByTriggers['onExit'] = true;

								//return "Are you sure you want to exit?";
								//(e || window.event).returnValue = confirmationMessage; //Gecko + IE
								return confirmationMessage;

							}
						});
					}





				})

			})


		}





		if (conditions != null) {

			var j = 0;
			conditions.forEach((conditionWrap) => {


				var conditionArg = conditionWrap.getAttribute("data-conditions");


				var conditionObj = JSON.parse(conditionArg);
				conditionWrap.style.display = "none";
				conditionObj.map((item) => {
					var args = item.args
					args.map((arg) => {
						var selector = arg.selector

						if (!conditionsSelector.includes(selector)) {
							conditionsSelector.push(selector);

						}
					})
				})
			});


			conditionsSelector.map((selectorName) => {


				var selectorHndles = document.querySelectorAll(`[name="${selectorName}"]`);
				if (selectorHndles == null) return;

				selectorHndles.forEach((selectorHndle) => {

					var targetType = selectorHndle.type;
					var checked = selectorHndle.checked;
					var targetValX = selectorHndle.value;
					conditions.forEach((conditionWrap) => {

						if (!checked) {
							return;
						}

						var conditionArg = conditionWrap.getAttribute("data-conditions");
						var conditionObj = JSON.parse(conditionArg);
						conditionObj.map((item) => {
							var args = item.args
							args.map((arg) => {

								var selector = arg.selector
								var value = arg.value
								var values = arg.values
								var compare = arg.compare
								if (selectorName == selector) {
									if (compare == 'empty') {
										if (targetValX.length == 0) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'notEmpty') {
										if (targetValX.length > 0) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'lengthEqual') {
										if (targetValX.length == parseInt(value)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'lengthGtEq') {
										if (targetValX.length >= parseInt(value)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'lengthGt') {
										if (targetValX.length > parseInt(value)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'lengthLtEq') {
										if (targetValX.length <= parseInt(value)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'lengthLt') {
										if (targetValX.length < parseInt(value)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == '>=') {
										if (targetValX >= parseInt(value)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == '<=') {
										if (targetValX <= parseInt(value)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == '=') {
										if (value == targetValX) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == '!=') {
										if (value != targetValX) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'contain') {
										if (targetValX.includes(values)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'notContain') {
										if (!targetValX.includes(values)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'between') {
										if (parseInt(targetValX) > values[0] && parseInt(targetValX) < values[1]) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'exist') {
										if (targetValX.includes(values)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
									if (compare == 'regexp') {

										var pattern = new RegExp(value);
										if (targetValX.match(pattern)) {
											conditionWrap.style.display = "block";
										} else {
											conditionWrap.style.display = "none";
										}
									}
								}

							})

						})

					});

					selectorHndle.addEventListener("input", (event) => {

						var targetVal = event.target.value;



						conditions.forEach((conditionWrap) => {
							var conditionArg = conditionWrap.getAttribute("data-conditions");
							var conditionObj = JSON.parse(conditionArg);
							conditionObj.map((item) => {
								var args = item.args
								args.map((arg) => {

									var selector = arg.selector
									var value = arg.value
									var values = arg.values
									var compare = arg.compare
									if (selectorName == selector) {
										if (compare == 'empty') {
											if (targetVal.length == 0) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'notEmpty') {
											if (targetVal.length > 0) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'lengthEqual') {
											if (targetVal.length == parseInt(value)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'lengthGtEq') {
											if (targetVal.length >= parseInt(value)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'lengthGt') {
											if (targetVal.length > parseInt(value)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'lengthLtEq') {
											if (targetVal.length <= parseInt(value)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'lengthLt') {
											if (targetVal.length < parseInt(value)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == '>=') {
											if (targetVal >= parseInt(value)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == '<=') {
											if (targetVal <= parseInt(value)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == '=') {
											if (value == targetVal) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == '!=') {
											if (value != targetVal) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'contain') {
											if (targetVal.includes(values)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'notContain') {
											if (!targetVal.includes(values)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'between') {
											if (parseInt(targetVal) > values[0] && parseInt(targetVal) < values[1]) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'exist') {
											if (targetVal.includes(values)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
										if (compare == 'regexp') {

											var pattern = new RegExp(value);
											if (targetVal.match(pattern)) {
												conditionWrap.style.display = "block";
											} else {
												conditionWrap.style.display = "none";
											}
										}
									}

								})

							})

						});


					})
				})



			})
		}





		if (calculations != null) {
			calculations.forEach((calculationsWrap) => {
				var rules = calculationsWrap.getAttribute("data-calculations");
				var wrapId = calculationsWrap.getAttribute("id");
				//var conditionObj = JSON.parse(conditionArg);

				const matches = rules.match(/\${(.*?)}/g).map(match => match.slice(2, -1));

				calculationsSelector[wrapId] = matches;
				// conditionObj.map((item) => {
				// 	var args = item.args
				// 	args.map((arg) => {
				// 		var selector = arg.selector
				// 		calculationsSelector.push(selector);
				// 	})
				// })
			});
		}



		Object.entries(calculationsSelector).map((args) => {

			var wrapId = args[0]
			var fields = args[1]



			fields.forEach((selectorName) => {

				var selectorHndles = document.querySelectorAll(`[name="${selectorName}"]`);

				selectorHndles.forEach((selectorHndle) => {
					selectorHndle.addEventListener("input", (event) => {

						var targetVal = event.target.value;
						calculationsFields[selectorName] = targetVal;
						updateCalcField(wrapId, { field: selectorName, value: targetVal })
					})
				})
			})
		})


		function updateCalcField(wrapId, obj = {}) {
			var wrapHndle = document.querySelector(`#${wrapId}`);
			var wrapHndleInput = document.querySelector(`#${wrapId} input`);
			var rules = wrapHndle.getAttribute("data-calculations");

			//rules = rules.replace(/<\/[^>]+(>|$)/g, "");

			if (rules == null) return;

			const result = rules.replace(/\$\{(.*?)\}/g, (match, p1) => calculationsFields[p1] != null ? calculationsFields[p1] : 0);

			wrapHndleInput.value = eval(result)



		}





		/*Check each form on page load*/
		var BreakException = {};
		var busy = false;
		try {
			if (pgForms != null) {
				pgForms.forEach((form) => {
					var formId = form.getAttribute("data-formId");
					const pgFormChanged = new CustomEvent("pgFormChanged", { detail: { formId: formId } });
					form.addEventListener('change', function () {
						document.dispatchEvent(pgFormChanged);
					});
					form.addEventListener("submit", (event) => {
						event.preventDefault();
						var formByID = document.querySelector(`[data-formid="${formId}"]`);
						const formData = new FormData(event.target);
						var onsubmitprams = formByID.getAttribute("data-onsubmitprams");
						var onprocessargs = formByID.getAttribute("data-onprocessargs");
						var onsubmitObj = JSON.parse(onsubmitprams);
						var formargs = formByID.getAttribute("data-formargs");
						var formargsObj = JSON.parse(formargs);
						var fieldInfo = formargsObj.fieldInfo;
						var onprocessargsObj = JSON.parse(onprocessargs);
						formData.append("formType", formargsObj.type);
						formData.append("onprocessargs", JSON.stringify(onprocessargsObj));

						if (formargsObj.type == "registerForm") {
							var form_blocks_vars = (combo_blocks_blocks_vars[formId] != undefined) ? combo_blocks_blocks_vars[formId] : {};
							var allowed_user_meta = (form_blocks_vars.allowed_user_meta != undefined) ? form_blocks_vars.allowed_user_meta : "";
							formData.append("allowedUserMeta", JSON.stringify(allowed_user_meta));
						}




						var loadingWrap = document.querySelector("." + formId + "-loading");
						var responsesWrap = document.querySelector(
							"." + formId + "-responses"
						);
						var onsubmitProceed = true;
						Object.entries(onsubmitObj).map((args) => {
							var action = args[1];
							var actionId = action.id;
							if (actionId == "simpleMath") {
								var simpleMathInput = document.querySelector('input[name="simple_math"]');
								if (window.pgSimpleMath.result != simpleMathInput.value) {
									onsubmitProceed = false;
									var responseHtml = "";
									responseHtml += '<div class="error">';
									responseHtml += "Math challenge failed.";
									responseHtml += "</div>";
									responsesWrap.innerHTML = responseHtml;
									responsesWrap.style.display = "block";
								} else {
									responsesWrap.innerHTML = "";
								}
							}
							if (actionId == "validation") {
								var errors = validateFormFields(formId, formData, fieldInfo);
								responsesWrap.innerHTML = "";
								// loadingWrap.style.display = "none";
								if (Object.keys(errors).length > 0) {
									var responseHtml = "";
									Object.entries(errors).map((x) => {
										var html = x[1];
										responseHtml += '<div class="error">';
										responseHtml += html;
										responseHtml += "</div>";
									});
									responsesWrap.innerHTML = responseHtml;
									responsesWrap.style.display = "block";
									// loadingWrap.style.display = "none";
									//onsubmitProceed = true;
									throw errors;
								}
							}
							if (actionId == "submitConfirm") {
								if (confirm("Are you confirmed?")) {
									//onsubmitProceed = true;
									//processSubmit(formId, formData);
									document.dispatchEvent(pgFormSubmitted);
								} else {
									onsubmitProceed = false;
								}
							}
							if (actionId == "recaptchaValidation") {
								var errors = {};
								let queryString = new URLSearchParams(formData).toString();
								let params = new URLSearchParams(queryString);
								var recaptchaResponse = params.get("g-recaptcha-response"); // "foo"
								//let recaptchaResponse = queryString.includes("g-recaptcha-response");
								if (recaptchaResponse == null || recaptchaResponse.length == 0) {
									onsubmitProceed = false;
									var showOnResponse = action.showOnResponse;
									var successMessage = action.successMessage;
									var errorMessage = action.errorMessage;
									if (showOnResponse) {
										var responseHtml = "";
										//var html = x[1];
										responseHtml += '<div class="error">';
										responseHtml += errorMessage;
										responseHtml += "</div>";
										responsesWrap.innerHTML = responseHtml;
										responsesWrap.style.display = "block";
									}
									throw errors;
									//processSubmit(formId, formData);
								}
							}
						});
						if (onsubmitProceed) {
							loadingWrap.style.display = "block";
							processSubmit(formId, formData);
							document.dispatchEvent(pgFormSubmitted);
						}
					});
				});
			}
		} catch (e) {
			if (e !== BreakException) throw e;
		}


		function validateFormFields(formId, formData, fieldInfo) {
			var errorData = {};
			Object.entries(fieldInfo).map((field) => {
				var fieldId = field[0];
				var args = field[1];
				var inputName = args.inputName;
				var errorText = args.errorText;
				var required = args.required == undefined ? false : args.required;
				errorData[inputName] = {
					id: fieldId,
					errorText: errorText,
					required: required,
				};
			});
			var errors = {};
			var formByID = document.querySelector(`[data-formid="${formId}"]`);
			for (var pair of formData.entries()) {
				var inputName = pair[0];
				var inputValue = pair[1];
				var required =
					errorData[inputName] == undefined
						? false
						: errorData[inputName].required;
				if (required && inputValue.length == 0) {
					errors[inputName] = errorData[inputName].errorText;
					var fieldWrap = document.querySelector("." + errorData[inputName].id);
					fieldWrap.classList.add("error");
				}
			}
			return errors;
		}
		function processSubmit(formId, formData) {
			var formByID = document.querySelector(`[data-formid="${formId}"]`);
			var responsesWrap = document.querySelector("." + formId + "-responses");
			var loadingWrap = document.querySelector("." + formId + "-loading");
			responsesWrap.style.display = "none";
			var onprocessargs = formByID.getAttribute("data-onprocessargs");
			var onprocessargsObj = JSON.parse(onprocessargs);
			var aftersubmitargs = formByID.getAttribute("data-aftersubmitargs");
			var aftersubmitargsObj = JSON.parse(aftersubmitargs);

			var formargs = formByID.getAttribute("data-formargs");
			var formargsObj = JSON.parse(formargs);
			var formFieldNames = [];
			for (var pair of formData.entries()) {
				var inputName = pair[0];
				var inputValue = pair[1];
				formFieldNames.push(inputName);
			}




			formData.append("formFieldNames", formFieldNames);




			fetch(
				combo_blocks_blocks_vars["siteUrl"] + "/wp-json/combo-blocks/v2/process_form_data",
				{
					method: "POST",
					body: formData,
				}
			)
				.then((response) => {
					if (response.ok && response.status < 400) {
						response.json().then((data) => {


							var successArgs = data.success == undefined ? {} : data.success;
							var errorsArgs = data.errors == undefined ? {} : data.errors;
							if (aftersubmitargsObj == null) return;
							for (var i = 0; i < aftersubmitargsObj.length; i++) {
								var action = aftersubmitargsObj[i];
								var actionId = action.id;
								if (actionId == "showResponse") {
									responsesWrap.style.display = "block";
									var responseHtml = "";
									Object.entries(successArgs).map((x) => {
										var html = x[1];
										responseHtml += '<div class="success">';
										responseHtml += html;
										responseHtml += "</div>";
									});
									Object.entries(errorsArgs).map((x) => {
										var html = x[1];
										responseHtml += '<div class="error">';
										responseHtml += html;
										responseHtml += "</div>";
									});
									responsesWrap.innerHTML = responseHtml;
								}
								if (actionId == "showText") {
									var successMessage = action.successMessage;
									var failedMessage = action.failedMessage;
									responsesWrap.style.display = "block";
									var responseHtml = "";
									if (Object.entries(errorsArgs).length == 0) {
										responseHtml += '<div class="success">';
										responseHtml += successMessage;
										responseHtml += "</div>";
									} else {
										responseHtml += '<div class="error">';
										responseHtml += failedMessage;
										responseHtml += "</div>";
									}
									responsesWrap.innerHTML = responseHtml;
								}
								if (Object.entries(errorsArgs).length > 0) {
									break;
								};
								if (actionId == "redirectToURL") {
									var url = action.url;
									location.href = url;
								}
								if (actionId == "buildGETRequest") {
									//var url = action.url;
									//location.href = url;
									var pageUrl = window.location.href.split("?")[0];
									var url = window.location;
									formData.delete('formType');
									formData.delete('onprocessargs');
									formData.delete('formFieldNames');
									formData.delete('_wp_http_referer');
									let queryString = new URLSearchParams(formData).toString();
									location.href = pageUrl + "?" + queryString;
								}
								if (actionId == "refreshPage") {
									var delay =
										action.delay.length == 0 ? 500 : parseInt(action.delay);
									if (delay) {
										setTimeout(() => {
											location.reload();
										}, delay);
									}
								}
								if (actionId == "loggedOut") {
									fetch(
										combo_blocks_blocks_vars["siteUrl"] +
										"/wp-json/combo-blocks/v2/loggedout_current_user",
										{
											method: "POST",
											body: { nonce: formFieldNames._wpnonce },
										}
									)
										.then((response) => {
											if (response.ok && response.status < 400) {
												response.json().then((data) => { });
											}
										})
										.catch((error) => { });
								}
								if (actionId == "hideForm") {
									formByID.style.display = "none";
								}
								if (actionId == "hidePopup") {
									var popupId = formargsObj.popupId;
									var delay = parseInt(action.delay);
									setTimeout(() => {
										var popupWrap = document.querySelector("." + popupId);
										popupWrap.style.display = "none";
									}, delay)
								}
								if (actionId == "clearForm") {
									formByID.reset();
								}
							};
							loadingWrap.style.display = "none";
							setTimeout(() => {
							}, 2000);
						});
					}
				})
				.catch((error) => { });
		}
	});
}