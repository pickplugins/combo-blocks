import {
	BlockContextProvider,
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	MediaUpload, MediaUploadCheck,
	RichText,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	Button,
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	SelectControl,
	ToggleControl
} from "@wordpress/components";
import {
	select,
	useDispatch,
	useSelect
} from "@wordpress/data";
import {
	memo,
	useEffect,
	useState
} from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	addTemplate,
	close,
	copy,
	Icon,
	link,
	linkOff,
	menu,
	pages,
	replace,
	rotateLeft
} from "@wordpress/icons";

import { ReactSortable } from "react-sortablejs";
import PGcssOpenaiPrompts from "../../components/openai-prompts";

import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
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
				<path
					d="M69.3335 61H0V78.3334H69.3335V61Z"
					fill="url(#paint0_linear_61_610)"
				/>
				<path
					d="M9.33389 71.6666L5.77832 68.1111C5.77832 68.1111 5.77832 67.6666 5.77832 67.2222C5.77832 67.2222 6.22277 67.2222 6.66721 67.2222L9.33389 70.3333L12.0006 67.2222C12.0006 67.2222 12.445 66.7777 12.8895 67.2222C12.8895 67.2222 13.3339 67.6666 12.8895 68.1111L9.33389 71.6666Z"
					fill="#C15940"
				/>
				<path
					d="M61.3339 67.2224H18.2227V71.6669H61.3339V67.2224Z"
					fill="#C15940"
				/>
				<path
					d="M160 61H90.6665V78.3334H160V61Z"
					fill="url(#paint1_linear_61_610)"
				/>
				<path
					d="M99.9999 71.6666L96.4443 68.1111C96.4443 68.1111 96.4443 67.6666 96.4443 67.2222C96.4443 67.2222 96.8888 67.2222 97.3332 67.2222L99.9999 70.3333L102.667 67.2222C102.667 67.2222 103.111 66.7777 103.555 67.2222C103.555 67.2222 104 67.6666 103.555 68.1111L99.9999 71.6666Z"
					fill="#C15940"
				/>
				<path d="M152 67.2224H108.889V71.6669H152V67.2224Z" fill="#C15940" />
				<path
					d="M69.3335 92.5554H0V109.889H69.3335V92.5554Z"
					fill="url(#paint2_linear_61_610)"
				/>
				<path
					d="M9.33389 103.667L5.77832 100.111C5.77832 100.111 5.77832 99.6666 5.77832 99.2222C5.77832 99.2222 6.22277 99.2222 6.66721 99.2222L9.33389 102.333L12.0006 99.2222C12.0006 99.2222 12.445 98.7777 12.8895 99.2222C12.8895 99.2222 13.3339 99.6666 12.8895 100.111L9.33389 103.667Z"
					fill="#C15940"
				/>
				<path
					d="M61.3339 98.7778H18.2227V103.222H61.3339V98.7778Z"
					fill="#C15940"
				/>
				<path
					d="M160 92.5554H90.6665V109.889H160V92.5554Z"
					fill="url(#paint3_linear_61_610)"
				/>
				<path
					d="M99.9999 103.667L96.4443 100.111C96.4443 100.111 96.4443 99.6666 96.4443 99.2222C96.4443 99.2222 96.8888 99.2222 97.3332 99.2222L99.9999 102.333L102.667 99.2222C102.667 99.2222 103.111 98.7777 103.555 99.2222C103.555 99.2222 104 99.6666 103.555 100.111L99.9999 103.667Z"
					fill="#C15940"
				/>
				<path d="M152 98.7778H108.889V103.222H152V98.7778Z" fill="#C15940" />
				<defs>
					<linearGradient
						id="paint0_linear_61_610"
						x1="0"
						y1="69.6667"
						x2="69.3335"
						y2="69.6667"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_610"
						x1="90.6665"
						y1="69.6667"
						x2="160"
						y2="69.6667"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_610"
						x1="0"
						y1="101.222"
						x2="69.3335"
						y2="101.222"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_610"
						x1="90.6665"
						y1="101.222"
						x2="160"
						y2="101.222"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
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
		var parentBlockX = context.parentBlock;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var blockCssY = attributes.blockCssY;
		var categories = attributes.categories;
		var galleryItems = attributes.galleryItems;
		var lightbox = attributes.lightbox;
		let isProFeature = applyFilters("isProFeature", true);
		const CustomTagItemWrapper =
			itemWrap.options.tag.length != 0 ? `${itemWrap.options.tag}` : "div";
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const itemsSelector = blockClass + " .item";
		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		const [posts, setPosts] = useState([]); // Using the hook.
		const [activeBlockContextId, setActiveBlockContextId] = useState();
		const [linkPickerOpen, setLinkPickerOpen] = useState(false);

		const [AIautoUpdate, setAIautoUpdate] = useState(false);
		var [AIWriter, setAIWriter] = useState(false); // Using the hook.
		var formattedPrompt = "Respond only with json array useing following format {url: '',title: 'video title', } and no other text. Do not include any explanations, introductions, or concluding remarks.";

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} items-loop`,
		});
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		const parentBlock = select("core/block-editor").getBlock(parentClientId);
		const ALLOWED_BLOCKS = [
			"combo-blocks/flex-wrap",
			"combo-blocks/layers",
			"combo-blocks/images-field",
		];
		const MY_TEMPLATE = [["combo-blocks/images-field", {}]];
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});
		const TEMPLATE = [["combo-blocks/images-field", {}]];
		function PostTemplateInnerBlocks({ attsx }) {
			var className = itemWrap.options.class;
			const innerBlocksProps = useInnerBlocksProps(
				{ className: className },
				{ template: attsx }
			);
			return (
				<CustomTagItemWrapper {...innerBlocksProps}></CustomTagItemWrapper>
			);
		}
		function PostTemplateBlockPreview({
			blocks,
			blockContextId,
			isHidden,
			setActiveBlockContextId,
		}) {
			var className = itemWrap.options.class;
			const blockPreviewProps = useBlockPreview({
				blocks,
				props: {
					className: className,
				},
			});
			const handleOnClick = () => {
				setActiveBlockContextId(blockContextId);
			};
			const style = {
				display: isHidden ? "none" : undefined,
			};
			return (
				<div
					{...blockPreviewProps}
					tabIndex={0}
					role="button"
					onClick={handleOnClick}
					style={style}
				/>
			);
		}
		const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			var className = itemWrap.options.class;
			if (parentBlock != null) {
				// var itemsWrapOptions = {
				// 	...itemsWrap.options,
				// 	excludedWrapper: true,
				// };
				// setAttributes({
				// 	itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
				// });
				if (parentBlock.name == "combo-blocks/filterable-grid") {
					var itemsWrapOptions = {
						...itemsWrap.options,
						excludedWrapper: false,
					};
					setAttributes({
						itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
					});
				} else {
					var itemsWrapOptions = {
						...itemsWrap.options,
						excludedWrapper: true,
					};
					setAttributes({
						itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
					});
				}
				if (parentBlock.name == "combo-blocks/content-slider") {
					className = " pg-content-slider-item splide__slide ";
				}
				if (parentBlock.name == "combo-blocks/grid-wrap") {
					className = " pg-grid-wrap-item ";
				}
				if (parentBlock.name == "combo-blocks/masonry-wrap") {
					className = " pg-masonry-wrap-item ";
				}
				if (parentBlock.name == "combo-blocks/filterable-grid") {
					className = " item ";
				}
				if (parentBlock.name == "combo-blocks/image-gallery") {
					className = " pg-image-gallery-item ";
				}
				if (parentBlock.name == "combo-blocks/image-accordion") {
					className = " pg-image-accordion-item ";
				}
				if (parentBlock.name == "combo-blocks/filterable-grid") {
					var options = {
						...itemWrap.options,
						class: className,
						termsClass: true,
					};
					setAttributes({
						itemWrap: { ...itemWrap, options: options },
					});
				} else {
					var options = { ...itemWrap.options, class: className };
					setAttributes({
						itemWrap: { ...itemWrap, options: options },
					});
				}
			}
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var itemX = blockCssRules;
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);
		var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
		var linkToArgsBasic = {
			noUrl: { label: __("No URL", "combo-blocks"), value: "" },
			termUrl: { label: __("No URL", "combo-blocks"), value: "termUrl" },
		};
		let linkToArgs = linkToArgsBasic;
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
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
				var lightboxX = attributes.lightbox;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (lightboxX != undefined) {
					var lightboxY = { ...lightboxX, options: lightbox.options };
					setAttributes({ lightbox: lightboxY });
					blockCssObj[lightboxSelector] = lightboxY;
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
		const copyData = (data) => {
			const dataString = JSON.stringify(data, null, 2);
			navigator.clipboard
				.writeText(dataString)
				.then(() => {
					// alert("Data copied to clipboard!");
				})
				.catch((err) => {

				});
		};
		const pasteData = () => {
			navigator.clipboard
				.readText()
				.then((text) => {
					const parsedData = JSON.parse(text);
					setAttributes({ galleryItems: parsedData });
				})
				.catch((err) => {

				});
		};
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PGtoggle title="Videos" initialOpen={true}>
							<div className="flex items-center justify-center my-3 gap-2 flex-wrap">
								<MediaUploadCheck>
									<MediaUpload
										className="bg-gray-700 hover:bg-gray-600"
										onSelect={(media) => {
											var galleryItemsX = [...galleryItems];
											var items = [];
											media.map((item) => {
												items.push({
													id: item.id,
													title: item.title,
													url: item.url,
													link: "",
													categories: [],
												});
											});
											setAttributes({ galleryItems: items });
										}}
										onClose={() => { }}
										allowedTypes={["image"]}
										value={galleryItems.map((item) => {
											return item.id;
										})}
										multiple="add"
										render={({ open }) => (
											<div
												className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
												onClick={open}>
												<Icon
													icon={addTemplate}
													className="fill-white "
													size={14}
												/>
												{__("Add", "combo-blocks")}
											</div>
										)}
									/>
								</MediaUploadCheck>
								<MediaUploadCheck>
									<MediaUpload
										className="bg-gray-700 hover:bg-gray-600"
										onSelect={(media) => {
											var galleryItemsX = [...galleryItems];
											var items = [];
											media.map((item) => {
												items.push({
													id: item.id,
													title: item.title,
													url: item.url,
													link: "",
													categories: [],
												});
											});
											setAttributes({ galleryItems: items });
										}}
										onClose={() => { }}
										allowedTypes={["image"]}
										value={[]}
										multiple="add"
										render={({ open }) => (
											<div
												className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
												onClick={open}>
												<Icon
													icon={replace}
													className="fill-white "
													size={14}
												/>
												{__("Replace", "combo-blocks")}
											</div>
										)}
									/>
								</MediaUploadCheck>
								<div className="relative 	"

								>
									<div className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600" onClick={(ev) => {
										ev.preventDefault();
										ev.stopPropagation();
										setAIWriter(!AIWriter)
									}}>AI</div>
									{AIWriter && (
										<Popover position="bottom right">
											<div className="w-[800px] p-3">



												<PGcssOpenaiPrompts value={""} formattedPrompt={formattedPrompt} promptsAgs={{ action: 'write', aiModel: 'gpt-4-turbo' }} autoUpdate={AIautoUpdate}
													onResponseLoaded={(value, autoUpdate) => {



														// if (autoUpdate) {
														// 	var options = { ...text.options, content: value };
														// 	setAttributes({ text: { ...text, options: options } });
														// }


													}}
													clickHandle={(value, action) => {







													}}

												/>
											</div>
										</Popover>
									)}

								</div>


								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {
										copyData(galleryItems);
									}}>
									<Icon icon={copy} className="fill-white " size={14} />
									{__("Copy", "combo-blocks")}
								</div>
								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {
										pasteData();
									}}>
									<Icon icon={pages} className="fill-white " size={14} />
									{__("Paste", "combo-blocks")}
								</div>
								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {
										setAttributes({ galleryItems: [] });
									}}>
									<Icon icon={rotateLeft} className="fill-white " size={14} />
									{__("Reset", "combo-blocks")}
								</div>
							</div>
							<ReactSortable
								list={galleryItems}
								handle={".handle"}
								setList={(item) => {
									setAttributes({
										galleryItems: galleryItems,
									});
								}}>
								{galleryItems.map((item, index) => (
									<div key={item.id} className="">
										<PGtoggle
											title={
												<>
													<span
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															var galleryItemsX = [...galleryItems];
															galleryItemsX.splice(index, 1);
															setAttributes({
																galleryItems: galleryItemsX,
															});
														}}>
														<Icon icon={close} />
													</span>
													<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
														<Icon icon={menu} />
													</span>
													<span className="mx-2">{item.title}</span>
												</>
											}
											initialOpen={false}>
											<div className="p-3">
												<img src={item.url} alt="" />
											</div>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Title", "combo-blocks")}
												</label>
												<InputControl
													value={item.title}
													onChange={(newVal) => {
														var galleryItemsX = [...galleryItems];
														galleryItemsX[index].title = newVal;
														setAttributes({
															galleryItems: galleryItemsX,
														});
													}}
												/>
											</div>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Description", "combo-blocks")}
												</label>
												<div>
													<RichText
														className="components-textarea-control__input"
														tagName={"div"}
														value={item.description}
														allowedFormats={[
															"core/bold",
															"core/italic",
															"core/link",
														]}
														onChange={(content) => {
															var galleryItemsX = [...galleryItems];
															galleryItemsX[index].description = content;
															setAttributes({
																galleryItems: galleryItemsX,
															});
														}}
														placeholder={__("Start Writing...")}
													/>
												</div>
											</div>
											<PanelRow>
												<label for="" className="font-medium text-slate-900 ">
													{__("Link", "combo-blocks")}
												</label>
												<div className="relative">
													<Button
														className={linkPickerOpen ? "!bg-gray-400" : ""}
														icon={link}
														onClick={(ev) => {
															setLinkPickerOpen((prev) => !prev);
														}}></Button>
													{item?.link?.length > 0 && (
														<Button
															className="!text-red-500 ml-2"
															icon={linkOff}
															onClick={(ev) => {
																var galleryItemsX = [...galleryItems];
																galleryItemsX[index].link = "";
																setAttributes({
																	galleryItems: galleryItemsX,
																});
															}}></Button>
													)}
													{linkPickerOpen && (
														<Popover position="bottom right">
															<LinkControl
																settings={[]}
																value={item?.link}
																onChange={(newVal) => {
																	var galleryItemsX = [...galleryItems];
																	galleryItemsX[index].link = newVal.url;
																	setAttributes({
																		galleryItems: galleryItemsX,
																	});
																}}
															/>
															<div className="p-2">
																<span className="font-bold">
																	{__("Linked to:", "combo-blocks")}
																</span>{" "}
																{item?.link.length != 0
																	? item.link
																	: __("No link", "combo-blocks")}{" "}
															</div>
														</Popover>
													)}
												</div>
											</PanelRow>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Categories", "combo-blocks")}
												</label>
												<div>
													<InputControl
														isPressEnterToChange={true}
														onChange={(newVal) => {
															var galleryItemsX = [...galleryItems];
															galleryItemsX[index].categories.push(newVal);
															setAttributes({
																galleryItems: galleryItemsX,
															});
														}}
													/>
												</div>
											</div>
											<p>Press ENTER to add.</p>
											<div className="flex flex-wrap gap-2 items-center">
												{galleryItems[index]?.categories?.map((item, j) => {
													return (
														<div
															className="flex  gap-2 items-center border border-solid pr-2"
															key={j}>
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var galleryItemsX = [...galleryItems];
																	galleryItemsX[index].categories.splice(j, 1);
																	setAttributes({
																		galleryItems: galleryItemsX,
																	});
																}}>
																<Icon icon={close} />
															</span>
															<span>{item}</span>
														</div>
													);
												})}
											</div>
										</PGtoggle>
									</div>
								))}
							</ReactSortable>
						</PGtoggle>
						<PGtoggle title="Categories" initialOpen={true}>
							<div className="flex items-center my-3 gap-2">
								<div
									className="pg-font  cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
									onClick={(ev) => {
										var categoriesX = [...categories];
										var items = [];
										categoriesX.push({
											label: "",
											icon: {},
										});
										setAttributes({ categories: categoriesX });
									}}>
									Add
								</div>
							</div>
							<ReactSortable
								list={categories}
								handle={".handle"}
								setList={(item) => {
									setAttributes({
										categories: categories,
									});
								}}>
								{categories.map((item, index) => (
									<div key={item.id} className="">
										<PGtoggle
											title={
												<>
													<span
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															var categoriesX = [...categories];
															categoriesX.splice(index, 1);
															setAttributes({
																categories: categoriesX,
															});
														}}>
														<Icon icon={close} />
													</span>
													<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
														<Icon icon={menu} />
													</span>
													<span className="mx-2">{item.label}</span>
												</>
											}
											initialOpen={false}>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Label", "combo-blocks")}
												</label>
												<InputControl
													value={item.label}
													onChange={(newVal) => {
														var categoriesX = [...categories];
														categoriesX[index].label = newVal;
														setAttributes({
															categories: categoriesX,
														});
													}}
												/>
											</div>
										</PGtoggle>
									</div>
								))}
							</ReactSortable>
						</PGtoggle>
						<PGtoggle title={__("Wrapper", "combo-blocks")} initialOpen={false}>
							<ToggleControl
								label="Wrapper Exclude?"
								help={
									itemsWrap.options.excludedWrapper
										? "Wrapper Excluded."
										: "Wrapper Included"
								}
								checked={itemsWrap.options.excludedWrapper ? true : false}
								onChange={(e) => {
									var options = {
										...itemsWrap.options,
										excludedWrapper: itemsWrap.options.excludedWrapper
											? false
											: true,
									};
									setAttributes({
										itemsWrap: { ...itemsWrap, options: options },
									});
								}}
							/>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Item", "combo-blocks")}
							initialOpen={false}>
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Item Wrapper Tag", "combo-blocks")}
								</label>
								<SelectControl
									label=""
									value={itemWrap.options.tag}
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
										{ label: "li", value: "li" },
									]}
									onChange={(newVal) => {
										var options = { ...itemWrap.options, tag: newVal };
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</PanelRow>
							<div className="my-3">
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Item Wrapper Class", "combo-blocks")}
								</label>
								<InputControl
									value={itemWrap.options.class}
									onChange={(newVal) => {
										var options = { ...itemWrap.options, class: newVal };
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</div>
							<div className=" flex flex-col gap-4 ">
								<ToggleControl
									label={__("Counter Class?", "combo-blocks")}
									help={
										itemWrap.options.counterClass
											? __("Counter Class Added.", "combo-blocks")
											: __("Counter Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.counterClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											counterClass: itemWrap.options.counterClass
												? false
												: true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
								<ToggleControl
									label={__("Odd/Even Class?", "combo-blocks")}
									help={
										itemWrap.options.oddEvenClass
											? __("Odd/Even Class Added.", "combo-blocks")
											: __("Odd/Even Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.oddEvenClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											oddEvenClass: itemWrap.options.oddEvenClass
												? false
												: true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
								<ToggleControl
									label={__("Categories Class?", "combo-blocks")}
									help={
										itemWrap.options.termsClass
											? __("Terms Class Added.", "combo-blocks")
											: __("Terms Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.termsClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											termsClass: itemWrap.options.termsClass ? false : true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</div>
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
					{itemsWrap.options.excludedWrapper && (
						<>
							{galleryItems.length > 0 && (
								<>
									{galleryItems.map((post, j) => {
										return (
											<BlockContextProvider
												key={post.id}
												value={{
													imageData: post,
													loopIndex: j,
													imageId: post.id,
												}}>
												{post.id ===
													(activeBlockContextId || galleryItems[0]?.id) ? (
													<>
														<PostTemplateInnerBlocks attsx={TEMPLATE} />
													</>
												) : null}
												<MemoizedPostTemplateBlockPreview
													blocks={childBlocks}
													blockContextId={post.id}
													setActiveBlockContextId={setActiveBlockContextId}
													isHidden={
														post.id ===
														(activeBlockContextId || galleryItems[0]?.id)
													}
												/>
											</BlockContextProvider>
										);
									})}
								</>
							)}
						</>
					)}
					{!itemsWrap.options.excludedWrapper && (
						<>
							<div {...blockProps}>
								{galleryItems.length > 0 && (
									<>
										{galleryItems.map((post, j) => {
											return (
												<BlockContextProvider
													key={post.id}
													value={{
														imageData: post,
														loopIndex: j,
														imageId: post.id,
													}}>
													{post.id ===
														(activeBlockContextId || galleryItems[0]?.id) ? (
														<>
															<PostTemplateInnerBlocks attsx={TEMPLATE} />
														</>
													) : null}
													<MemoizedPostTemplateBlockPreview
														blocks={childBlocks}
														blockContextId={post.id}
														setActiveBlockContextId={setActiveBlockContextId}
														isHidden={
															post.id ===
															(activeBlockContextId || galleryItems[0]?.id)
														}
													/>
												</BlockContextProvider>
											);
										})}
									</>
								)}
							</div>
						</>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return <InnerBlocks.Content />;
	},
});
