import apiFetch from "@wordpress/api-fetch";
import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { createBlock, registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
import customTags from "../../custom-tags";
import metadata from "./block.json";

var myStore = wp.data.select("ComboBlocksStore");
registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff0",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M160 26H0V35.4118H160V26Z" fill="url(#paint0_linear_61_288)" />
				<path
					d="M120 44.8237H0V54.2355H120V44.8237Z"
					fill="url(#paint1_linear_61_288)"
				/>
				<path d="M160 93H77V102H160V93Z" fill="#C15940" />
				<path d="M127.907 112H77V121H127.907V112Z" fill="#C15940" />
				<path
					d="M18.0325 112.536H20.2042C20.7307 112.536 21.2086 112.744 21.5599 113.083C22.4373 113.787 23.353 114.349 24.2944 114.729C25.1647 115.081 26.065 115.274 26.9853 115.274C27.9055 115.274 28.8058 115.081 29.6761 114.729C30.6603 114.332 31.6163 113.736 32.5299 112.986L33.7663 114.49L32.5271 112.979C32.8908 112.681 33.33 112.536 33.7663 112.536H33.7709H35.9381C40.899 112.536 45.4077 114.564 48.675 117.832C51.9424 121.099 53.9704 125.608 53.9704 130.569V140.216C53.9704 141.295 53.0956 142.17 52.0166 142.17H1.95379C0.874785 142.17 0 141.295 0 140.216V130.569C0 125.608 2.02811 121.099 5.29552 117.832C8.56284 114.564 13.0716 112.536 18.0325 112.536ZM19.5397 116.444H18.0325C14.1502 116.444 10.6194 118.033 8.05834 120.594C5.49725 123.155 3.90759 126.686 3.90759 130.569V138.262H50.0629V130.569C50.0629 126.686 48.4732 123.155 45.9122 120.594C43.3512 118.033 39.8203 116.444 35.938 116.444H34.4308C33.3801 117.237 32.2755 117.883 31.1262 118.347C29.7921 118.885 28.407 119.181 26.9852 119.181C25.5634 119.181 24.1783 118.885 22.8442 118.347C21.6949 117.883 20.5902 117.237 19.5397 116.444Z"
					fill="#C15940"
				/>
				<path
					d="M26.9866 71C32.2264 71 36.9938 72.2788 40.3886 74.9934C43.5569 77.527 45.4914 81.2236 45.4914 86.1887C45.4914 91.5205 43.1555 98.6459 39.4592 104.008C36.214 108.717 31.8729 112.155 26.9867 112.155C22.1005 112.155 17.7593 108.717 14.5142 104.008C10.8178 98.6459 8.48193 91.5206 8.48193 86.1887C8.48193 81.2236 10.4165 77.527 13.5848 74.9934C16.9796 72.2788 21.7469 71 26.9866 71ZM37.9615 78.0311C35.3063 75.9078 31.3919 74.9076 26.9866 74.9076C22.5814 74.9076 18.667 75.9078 16.0118 78.0311C13.7628 79.8295 12.3895 82.5172 12.3895 86.1887C12.3895 90.818 14.4536 97.0567 17.7196 101.795C20.2899 105.524 23.5525 108.247 26.9867 108.247C30.4209 108.247 33.6835 105.524 36.2538 101.795C39.5198 97.0567 41.5839 90.818 41.5839 86.1887C41.5839 82.5172 40.2106 79.8295 37.9616 78.0311H37.9615Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_288"
						x1="0"
						y1="30.7059"
						x2="160"
						y2="30.7059"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_288"
						x1="0"
						y1="49.5296"
						x2="120"
						y2="49.5296"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/post-author"],
				transform: (attributes, innerBlocks) => {
					var items = [];
					if (attributes.showAvatar) {
						items.push({
							id: "avatar",
							label: "Avatar",
						});
					}
					items.push({
						id: "name",
						label: "Name",
					});
					if (attributes.showBio) {
						items.push({
							id: "description",
							label: "Description",
						});
					}
					return createBlock("combo-blocks/post-author", {
						wrapper: {
							options: {
								tag: "div",
								class: "pg-post-author",
							},
							styles: {
								display: {
									Desktop: "block",
								},
							},
						},
						elements: {
							items: items,
						},
						avatar: {
							options: {
								class: "avatar",
								size: attributes.avatarSize,
								default: "",
							},
							styles: {
								display: {
									Desktop: "block",
								},
								backgroundColor: {
									Desktop: "",
								},
								overflow: {
									Desktop: "hidden",
								},
								margin: {
									Desktop: "0px 20px 0px 0px",
								},
								borderRadius: {
									Desktop: "100px 100px 100px 100px",
								},
								float: {
									Desktop: "left",
								},
							},
						},
						name: {
							options: {
								class: "name",
								prefix: "",
								postfix: "",
								linkTo: attributes.isLink ? "authorLink" : "",
								linkToMeta: "",
								customUrl: "",
							},
							styles: {
								color: {
									Desktop: "#000000",
								},
								fontSize: {
									Desktop: "18px",
								},

								fontStyle: {
									Desktop: "normal",
								},
								fontWeight: {
									Desktop: "400",
								},
							},
						},
						description: {
							options: {
								class: "description",
								prefix: "",
								postfix: "",
							},
							styles: {
								color: {
									Desktop: "#000000",
								},
								fontSize: {
									Desktop: "18px",
								},

								fontStyle: {
									Desktop: "normal",
								},
								fontWeight: {
									Desktop: "400",
								},
							},
						},
					});
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/post-author"],
				transform: (attributes) => {
					var elements = attributes.elements.items;
					var avatar = attributes.avatar.options;
					var name = attributes.name.options;
					function checkIDExists(idToCheck) {
						return elements.some((item) => item.id === idToCheck);
					}
					const nameExists = checkIDExists("name");
					const descriptionExists = checkIDExists("description");
					const avatarExists = checkIDExists("avatar");
					// var content = attributes.readMore;
					return createBlock("core/post-author", {
						avatarSize: avatar.size,
						isLink: name.linkTo.length > 0 ? true : false,
						linkTarget: "_blank",
						showAvatar: avatarExists ? true : false,
						showBio: descriptionExists ? true : false,
					});
				},
			},
		],
	},
	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;
		var blockName = props.name;
		var blockNameLast = blockName.split("/")[1];
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var wrapper = attributes.wrapper;
		// var liveMode = attributes.liveMode;
		var visible = attributes.visible;
		var elements = attributes.elements;
		var avatar = attributes.avatar;
		var description = attributes.description;
		var name = attributes.name;
		var linkAttr = attributes.linkAttr;
		var blockCss = attributes.blockCss;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];

		var liveMode =
			typeof context["combo-blocks/liveMode"] == "undefined"
				? false
				: context["combo-blocks/liveMode"];

		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var nameSelector = blockClass + " .name";
		var descriptionSelector = blockClass + " .description";
		var avatarSelector = blockClass + " .avatar";
		var avatarImgSelector = blockClass + " .avatar img";
		const CustomTagWrapper = `${wrapper.options.tag}`;
		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var [postAuthor, setPostAuthor] = useState({});
		var [html, setHtml] = useState({});
		var [loading, setLoading] = useState(false);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		var [postAuthorId, setPostAuthorId] = liveMode
			? useEntityProp("postType", postType, "author", postId)
			: useState("");
		var [currentPostUrl, setCurrentPostUrl] = liveMode
			? useEntityProp("postType", postType, "link", postId)
			: useState("");
		const [postAuthorX, setpostAuthorX] = liveMode
			? useEntityProp("postType", postType, "author", postId)
			: useState("");
		useEffect(() => {
			// setpostAuthorData([]);

			if (liveMode) {
				setLoading(true);
				apiFetch({
					path: "/combo-blocks/v2/get_user_data",
					method: "POST",
					data: { id: postAuthorX, fields: [] },
				}).then((res) => {
					var optionsX = { ...elements, data: res };
					setAttributes({ elements: optionsX });
					setLoading(false);
				});
			}
		}, [blockId]);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[nameSelector] = name;
			blockCssObj[descriptionSelector] = description;
			blockCssObj[avatarSelector] = avatar;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			if (liveMode) {
				apiFetch({
					path: "/wp/v2/users/" + postAuthorId,
					method: "GET",
				}).then((res) => {
					setPostAuthor(res);
				});
			}
		}, [postAuthorId]);
		var linkToArgsBasic = {
			postUrl: { label: __("Post URL", "combo-blocks"), value: "postUrl" },
			homeUrl: { label: __("Home URL", "combo-blocks"), value: "homeUrl" },
			authorUrl: { label: __("Author URL", "combo-blocks"), value: "authorUrl" },
			authorLink: {
				label: __("Author Link", "combo-blocks"),
				value: "authorLink",
			},
			authorMail: {
				label: __("Author Mail", "combo-blocks"),
				value: "authorMail",
				isPro: true,
			},
			authorMeta: {
				label: __("Author Meta", "combo-blocks"),
				value: "authorMeta",
				isPro: true,
			},
			customField: {
				label: __("Custom Field", "combo-blocks"),
				value: "customField",
				isPro: true,
			},
			customUrl: {
				label: __("Custom URL", "combo-blocks"),
				value: "customUrl",
				isPro: true,
			},
		};
		let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);
		var userFields = [
			{ id: "avatar", label: "Avatar" },
			{ id: "name", label: "Name" },
			{ id: "description", label: "Description" },
		];
		function setUserField(option, index) {
			//var isExist = elements.items.find(x => x.label === option.label);
			var elementsX = elements.items.push(option);
			setAttributes({ elements: { items: elements.items } });
		}
		function generatehtml() {
			var nameHtml =
				postAuthor.name != undefined
					? `<span className='prefix'>${name.options.prefix}</span>${postAuthor.name}<span className='postfix'>${name.options.postfix}</span>`
					: "Author Name 1";
			if (name.options.linkTo == "postUrl") {
				nameHtml = `<span className='prefix'>${name.options.prefix
					}</span><a href="${currentPostUrl}">${postAuthor.name != undefined ? postAuthor.name : "Author Name"
					}</a><span className='postfix'>${name.options.postfix}</span>`;
			}
			if (name.options.linkTo == "authorUrl") {
				nameHtml = `<span className='prefix'>${name.options.prefix
					}</span><a href="${postAuthor.url}">${postAuthor.name != undefined ? postAuthor.name : "Author Name"
					}</a><span className='postfix'>${name.options.postfix}</span>`;
			}
			if (name.options.linkTo == "authorLink") {
				nameHtml = `<span className='prefix'>${name.options.prefix
					}</span><a href="${postAuthor.link}">${postAuthor.name != undefined ? postAuthor.name : "Author Name"
					}</a><span className='postfix'>${name.options.postfix}</span>`;
			}
			if (name.options.linkTo == "authorMeta") {
				nameHtml = `<span className='prefix'>${name.options.prefix
					}</span><a href="${postAuthor.link}">${postAuthor.name != undefined ? postAuthor.name : "Author Name"
					}</a><span className='postfix'>${name.options.postfix}</span>`;
			}
			if (name.options.linkTo == "customUrl") {
				nameHtml = `<span className='prefix'>${name.options.prefix
					}</span><a href="${name.options.customUrl}">${postAuthor.name != undefined ? postAuthor.name : "Author Name"
					}</a><span className='postfix'>${name.options.postfix}</span>`;
			}
			html.name = <div className={name.options.class} dangerouslySetInnerHTML={{ __html: nameHtml }}></div>;
			html.description = (
				<div className={description.options.class} dangerouslySetInnerHTML={{ __html: postAuthor?.description }}>

				</div>
			);
			if (postAuthor.avatar_urls != undefined) {
				var avatarHtml = `<img alt='' src=${postAuthor.avatar_urls != undefined
					? postAuthor.avatar_urls[avatar.options.size]
					: ""
					} />`;
				html.avatar = (
					<div className={avatar.options.class} dangerouslySetInnerHTML={{ __html: avatarHtml }}> </div>
				);
			}
			setTimeout((x) => {
				setHtml(html);
			}, 100);
		}
		useEffect(() => {
			setTimeout(() => {
				generatehtml();
			}, 1000);
		}, [postAuthor]);
		useEffect(() => {
			generatehtml();
		}, [name]);
		useEffect(() => {
			generatehtml();
		}, [description]);
		useEffect(() => {
			generatehtml();
		}, [avatar]);
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			if (action == "insert") {
				const position =
					select("core/editor").getBlockInsertionPoint(parentClientId);
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(
						wp.blocks.parse(content),
						position.index,
						position.rootClientId
					);
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				// var elementsX = attributes.elements;
				var avatarX = attributes.avatar;
				var nameX = attributes.name;
				var descriptionX = attributes.description;
				// var linkAttrX = attributes.linkAttr;
				var blockCssY = attributes.blockCssY;
				var blockCssObj = {};
				if (descriptionX != undefined) {
					var descriptionY = { ...descriptionX, options: description.options };
					setAttributes({ description: descriptionY });
					blockCssObj[descriptionSelector] = descriptionY;
				}
				if (nameX != undefined) {
					var nameY = { ...nameX, options: name.options };
					setAttributes({ name: nameY });
					blockCssObj[nameSelector] = nameY;
				}
				if (avatarX != undefined) {
					var avatarY = { ...avatarX, options: avatar.options };
					setAttributes({ avatar: avatarY });
					blockCssObj[avatarSelector] = avatarY;
				}
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				var blockCssRules = myStore.getBlockCssRules(blockCssObj);
				var items = blockCssRules;
				setAttributes({ blockCssY: { items: items } });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}
		function onChangeStyleWrapper(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ wrapper: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleWrapper(sudoScource, key) {
			let obj = { ...wrapper };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ wrapper: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleAvatar(sudoScource, key) {
			let obj = { ...avatar };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ avatar: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				avatarSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleName(sudoScource, key) {
			let obj = { ...name };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ name: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nameSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onRemoveStyleDescription(sudoScource, key) {
			let obj = { ...description };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ description: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				descriptionSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}

		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
		}
		function onChangeStyleAvatar(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, avatar);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ avatar: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				avatarSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleAvatar(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, avatar);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ avatar: object });
		}
		function onChangeStyleName(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, name);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ name: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nameSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onRemoveStyleName(sudoScource, key) {
			var object = myStore.deletePropertyDeep(name, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ name: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nameSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleName(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, name);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ name: object });
		}
		function onChangeStyleDescription(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, description);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ description: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				descriptionSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onRemoveStyleDescription(sudoScource, key) {
			var object = myStore.deletePropertyDeep(description, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ description: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				descriptionSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleDescription(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, description);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ description: object });
		}
		function onBulkAddWrapper(sudoScource, cssObj) {
			let obj = Object.assign({}, wrapper);
			obj[sudoScource] = cssObj;
			setAttributes({ wrapper: obj });
			var selector = myStore.getElementSelector(sudoScource, wrapperSelector);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddAvatar(sudoScource, cssObj) {
			let obj = Object.assign({}, avatar);
			obj[sudoScource] = cssObj;
			setAttributes({ avatar: obj });
			var selector = myStore.getElementSelector(sudoScource, avatarSelector);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddName(sudoScource, cssObj) {
			let obj = Object.assign({}, name);
			obj[sudoScource] = cssObj;
			setAttributes({ name: obj });
			var selector = myStore.getElementSelector(sudoScource, nameSelector);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddDescription(sudoScource, cssObj) {
			let obj = Object.assign({}, description);
			obj[sudoScource] = cssObj;
			setAttributes({ description: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				descriptionSelector
			);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onResetWrapper(sudoScources) {
			let obj = Object.assign({}, wrapper);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						wrapperSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ wrapper: obj });
		}
		function onResetAvatar(sudoScources) {
			let obj = Object.assign({}, avatar);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						avatarSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ avatar: obj });
		}
		function onResetDescription(sudoScources) {
			let obj = Object.assign({}, description);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						descriptionSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ description: obj });
		}
		function onResetName(sudoScources) {
			let obj = Object.assign({}, name);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						nameSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ name: obj });
		}
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			linkAttrObj();
		}, [linkAttr]);
		var linkAttrObj = () => {
			var sdsd = {};
			linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItems(sdsd);
			//return sdsd;
		};
		const CustomTag = `${wrapper.tag}`;
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		const MY_TEMPLATE = [];
		const elementsToAdd = elements.items.length;
		// Add elements to MY_TEMPLATE
		for (let i = 0; i < elementsToAdd; i++) {
			var metakey = elements.items[i].id;
			metakey = metakey == "name" ? "display_name" : metakey;
			MY_TEMPLATE.push([
				"combo-blocks/post-author-fields",
				{
					wrapper: {
						options: { class: "pg-author-fields", tag: "div" },
						styles: { display: { Desktop: "block" } },
					},
					field: {
						options: {
							linkTo: "postUrl",
							linkToMeta: "",
							linkTarget: "",
							avatarSize: "",
							dateFormat: "",
							customUrl: "",
							prefix: "",
							postfix: "",
							linkAttr: [],
						},
						styles: {
							color: { Desktop: "#000000 !important" },
							fontSize: { Desktop: "18px" },

							fontStyle: { Desktop: "normal" },
							fontWeight: { Desktop: "400" },
						},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "",
							position: "beforePostDate",
							class: "icon",
						},
						styles: {
							color: { Desktop: "#000000" },
							margin: { Desktop: "0px 10px 0px 10px" },
							fontSize: { Desktop: "18px" },
						},
					},
					metaKey: metakey,
					frontText: {
						options: { text: "Author: ", class: "inline-block" },
						styles: {
							color: { Desktop: "#000000" },
							fontSize: { Desktop: "18px" },

							fontStyle: { Desktop: "normal" },
							fontWeight: { Desktop: "400" },
						},
					},
					prefix: {
						options: { text: "", class: "prefix", position: "" },
						styles: {
							color: { Desktop: "#000000 !important" },
							fontSize: { Desktop: "18px" },

							fontStyle: { Desktop: "normal" },
							fontWeight: { Desktop: "400" },
							margin: { Desktop: "0px 10px 0px 0px" },
						},
					},
					postfix: {
						options: { text: "", class: "postfix", position: "" },
						styles: {
							color: { Desktop: "#000000 !important" },
							fontSize: { Desktop: "18px" },

							fontStyle: { Desktop: "normal" },
							fontWeight: { Desktop: "400" },
							margin: { Desktop: "0px 0px 0px 10px" },
						},
					},
					blockCssY: {
						items: {
							".pgeffa949b2182": { display: { Desktop: "block" } },
							".pgeffa949b2182 .fieldVal": {
								color: { Desktop: "#000000 !important" },
								"font-size": { Desktop: "18px" },

								"font-style": { Desktop: "normal" },
								"font-weight": { Desktop: "400" },
							},
							".pgeffa949b2182 .frontText": {
								color: { Desktop: "#000000" },
								"font-size": { Desktop: "18px" },

								"font-style": { Desktop: "normal" },
								"font-weight": { Desktop: "400" },
							},
							".pgeffa949b2182 .icon": {
								color: { Desktop: "#000000" },
								margin: { Desktop: "0px 10px 0px 10px" },
								"font-size": { Desktop: "18px" },
							},
							".pgeffa949b2182 .prefix": {
								color: { Desktop: "#000000 !important" },
								"font-size": { Desktop: "18px" },

								"font-style": { Desktop: "normal" },
								"font-weight": { Desktop: "400" },
								margin: { Desktop: "0px 10px 0px 0px" },
							},
							".pgeffa949b2182 .postfix": {
								color: { Desktop: "#000000 !important" },
								"font-size": { Desktop: "18px" },

								"font-style": { Desktop: "normal" },
								"font-weight": { Desktop: "400" },
								margin: { Desktop: "0px 0px 0px 10px" },
							},
						},
					},
				},
			]);
		}
		const ALLOWED_BLOCKS = [
			"combo-blocks/post-author-fields",
			"combo-blocks/layers",
			"combo-blocks/flex-wrap",
		];
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
		});
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Wrapper", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={wrapper.options.class}
										onChange={(newVal) => {
											var options = { ...wrapper.options, class: newVal };
											setAttributes({
												wrapper: { styles: wrapper.styles, options: options },
											});
										}}
									/>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Block ID", "combo-blocks")}
										</label>
										<InputControl
											value={blockId}
											disabled={true}
											onChange={(newVal) => {
												setAttributes({
													blockId: newVal,
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={wrapper.options.tag}
											options={[
												{ label: __("Choose", "combo-blocks"), value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={wrapper}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												wrapper,
												"wrapper",
												wrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												wrapper,
												"wrapper",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												wrapper,
												"wrapper",
												wrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												wrapper,
												"wrapper",
												wrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												wrapper,
												"wrapper",
												wrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Block Variations", "combo-blocks")}
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={blockNameLast}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PGtoggle>

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Visibility", "combo-blocks")}
							initialOpen={false}>
							<PGVisible
								visible={visible}
								onChange={(prams) => {
									setAttributes({ visible: prams });
								}}
							/>
						</PGtoggle>
					</div>
				</InspectorControls>
				<>
					<CustomTagWrapper {...innerBlocksProps}>
						{innerBlocksProps.children}
					</CustomTagWrapper>
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		// return null;
		return <InnerBlocks.Content />;
	},
});
