const { Component, RawHTML } = wp.element;
import colorsPresets from "../../colors-presets";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
	PanelRow,
	RangeControl,
	Popover,
	ToggleControl,
	PanelBody,
	SelectControl,
} from "@wordpress/components";
import PGColorPicker from "../../components/input-color-picker";
import { Icon, close } from "@wordpress/icons";

import { useState, useEffect } from "@wordpress/element";

import { applyFilters } from "@wordpress/hooks";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	let isProFeature = applyFilters("isProFeature", true);

	var valZ =
		props.val == null || props.val == undefined || props.val.length == 0
			? "0px 0px 0px #000"
			: props.val;
	// var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '0px' : props.val;



	var colorNames = [
		"AliceBlue",
		"AntiqueWhite",
		"Aqua",
		"Aquamarine",
		"Azure",
		"Beige",
		"Bisque",
		"Black",
		"BlanchedAlmond",
		"Blue",
		"BlueViolet",
		"Brown",
		"BurlyWood",
		"CadetBlue",
		"Chartreuse",
		"Chocolate",
		"Coral",
		"CornflowerBlue",
		"Cornsilk",
		"Crimson",
		"Cyan",
		"DarkBlue",
		"DarkCyan",
		"DarkGoldenRod",
		"DarkGray",
		"DarkGrey",
		"DarkGreen",
		"DarkKhaki",
		"DarkMagenta",
		"DarkOliveGreen",
		"Darkorange",
		"DarkOrchid",
		"DarkRed",
		"DarkSalmon",
		"DarkSeaGreen",
		"DarkSlateBlue",
		"DarkSlateGray",
		"DarkSlateGrey",
		"DarkTurquoise",
		"DarkViolet",
		"DeepPink",
		"DeepSkyBlue",
		"DimGray",
		"DimGrey",
		"DodgerBlue",
		"FireBrick",
		"FloralWhite",
		"ForestGreen",
		"Fuchsia",
		"Gainsboro",
		"GhostWhite",
		"Gold",
		"GoldenRod",
		"Gray",
		"Grey",
		"Green",
		"GreenYellow",
		"HoneyDew",
		"HotPink",
		"IndianRed",
		"Indigo",
		"Ivory",
		"Khaki",
		"Lavender",
		"LavenderBlush",
		"LawnGreen",
		"LemonChiffon",
		"LightBlue",
		"LightCoral",
		"LightCyan",
		"LightGoldenRodYellow",
		"LightGray",
		"LightGrey",
		"LightGreen",
		"LightPink",
		"LightSalmon",
		"LightSeaGreen",
		"LightSkyBlue",
		"LightSlateGray",
		"LightSlateGrey",
		"LightSteelBlue",
		"LightYellow",
		"Lime",
		"LimeGreen",
		"Linen",
		"Magenta",
		"Maroon",
		"MediumAquaMarine",
		"MediumBlue",
		"MediumOrchid",
		"MediumPurple",
		"MediumSeaGreen",
		"MediumSlateBlue",
		"MediumSpringGreen",
		"MediumTurquoise",
		"MediumVioletRed",
		"MidnightBlue",
		"MintCream",
		"MistyRose",
		"Moccasin",
		"NavajoWhite",
		"Navy",
		"OldLace",
		"Olive",
		"OliveDrab",
		"Orange",
		"OrangeRed",
		"Orchid",
		"PaleGoldenRod",
		"PaleGreen",
		"PaleTurquoise",
		"PaleVioletRed",
		"PapayaWhip",
		"PeachPuff",
		"Peru",
		"Pink",
		"Plum",
		"PowderBlue",
		"Purple",
		"Red",
		"RosyBrown",
		"RoyalBlue",
		"SaddleBrown",
		"Salmon",
		"SandyBrown",
		"SeaGreen",
		"SeaShell",
		"Sienna",
		"Silver",
		"SkyBlue",
		"SlateBlue",
		"SlateGray",
		"SlateGrey",
		"Snow",
		"SpringGreen",
		"SteelBlue",
		"Tan",
		"Teal",
		"Thistle",
		"Tomato",
		"Turquoise",
		"Violet",
		"Wheat",
		"White",
		"WhiteSmoke",
		"Yellow",
		"YellowGreen",
	];


	var isMulti = valZ.split(",").length > 1 ? true : false;

	var shadows = isMulti ? valZ.split(", ") : [valZ];



	const getBoxShadowObj = (boxshadow) => {
		var sadhow_arr = [];

		boxshadow.map((arg) => {
			var inset = arg.includes("inset");
			var color = "";
			var re = /(rgba|rgb|#|hsla|hsl)/;
			var colorMatch = arg.match(re);
			var colorType = colorMatch != null ? colorMatch[0] : "";

			if (colorType == "hsl") {
				var regex = /hsl\(([^)]+)\)/;
				var matches = arg.match(regex);
				if (matches && matches.length > 1) {
					var extractedValues = matches[1];
					color = "hsl(" + extractedValues + ")";
				}
			} else if (colorType == "hsla") {
				var regex = /hsla\(([^)]+)\)/;
				var matches = arg.match(regex);
				if (matches && matches.length > 1) {
					var extractedValues = matches[1];
					color = "hsla(" + extractedValues + ")";
				}
			} else if (colorType == "rgba") {
				var regex = /rgba\(([^)]+)\)/;
				var matches = arg.match(regex);
				if (matches && matches.length > 1) {
					var extractedValues = matches[1];
					color = "rgba(" + extractedValues + ")";
				}
			} else if (colorType == "rgb") {
				var regex = /rgb\(([^)]+)\)/;
				var matches = arg.match(regex);
				if (matches && matches.length > 1) {
					var extractedValues = matches[1];
					color = "rgb(" + extractedValues + ")";
				}
			} else if (colorType == "#") {
				var regex = /#\w+/;
				var matches = arg.match(regex);
				if (matches) {
					var color = matches[0];
				}
			} else {
				var regexPattern = new RegExp(
					colorNames.join("|").toLocaleLowerCase(),
					"g"
				);
				var matches = arg.match(regexPattern);
				if (matches && matches.length > 0) {
					color = matches[0];
				}
			}

			var placement = arg;



			// if (inset) {
			// 	placement = placement.replace("inset", "");
			// }
			if (color) {
				placement = placement.replace(color, "");
			}



			var placementArr = placement.trim().split(" ");



			if (placementArr.length == 2) {
				var h = placementArr[0];
				var v = placementArr[1];
				var blur = "";
			} else if (placementArr.length == 3) {
				var h = placementArr[0];
				var v = placementArr[1];
				var blur = placementArr[2];
			}
			// else if (placementArr.length == 4) {
			// 	var h = placementArr[0];
			// 	var v = placementArr[1];
			// 	var blur = placementArr[2];
			// 	var spread = placementArr[3];
			// }

			sadhow_arr.push({
				h: h,
				v: v,
				blur: blur,
				// spread: spread,
				// inset: inset,
				color: color,
			});
		});

		return sadhow_arr;
	};

	const [shadowObj, setShadowObj] = useState(getBoxShadowObj(shadows));

	const [isImportant, setImportant] = useState(
		valZ.includes(" !important") ? true : false
	);

	useEffect(() => {


		//props.onChange(newVal + 'px ' + v + 'px ' + blur + 'px ' + spread + 'px ' + color, 'boxShadow');
		var stringArr = [];
		shadowObj.map((shadow, index) => {
			var h = shadow.h;
			var v = shadow.v;
			var blur = shadow.blur;
			// var spread = shadow.spread;
			// var inset = shadow.inset ? "inset" : "";
			var color = shadow.color;

			// var item = [h, v, blur, spread, color, inset];
			var item = [h, v, blur, color];
			var filtered = item.filter(function (el) {
				return el;
			});

			stringArr.push(filtered.join(" "));
		});

		stringArr = stringArr.join(",  ");

		if (isImportant) {
			stringArr = stringArr + " !important";
		} else {
			stringArr = stringArr;
		}



		props.onChange(stringArr, "textShadow");
	}, [shadowObj, isImportant]);

	var unitArgs = [
		{ label: "PX", value: "px" },
		{ label: "EM", value: "em" },
		{ label: "REM", value: "rem" },
		{ label: "%", value: "%" },

		{ label: "CM", value: "cm" },
		{ label: "MM", value: "mm" },
		{ label: "IN", value: "in" },
		{ label: "PT", value: "pt" },
		{ label: "PC", value: "pc" },
		{ label: "EX", value: "ex" },

		{ label: "CH", value: "ch" },
		{ label: "VW", value: "vw" },
		{ label: "VH", value: "vh" },
		{ label: "VMIN", value: "vmin" },
		{ label: "VMAX", value: "vmax" },
	];

	const [proText, setProText] = useState(false);

	const handleClick = () => {
		setProText(true);
		setTimeout(() => {
			setProText(false);
		}, 5000);
	};

	return (
		<div>
			<button
				className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-indigo-400 text-white font-medium rounded hover:bg-indigo-500 hover:text-white focus:outline-none focus:bg-gray-700"
				onClick={() => {
					if (isProFeature) {
						handleClick();
						return;
					}
					var shadowObjX = [...shadowObj];
					shadowObjX.push({
						h: "0px",
						v: "0px",
						blur: "10px",
						spread: "5px",
						inset: false,
						color: "#50547d4f",
					});
					setShadowObj(shadowObjX);
				}}>
				Add
			</button>
			{proText && (
				<a
					href="https://comboblocks.com/pricing/"
					className="pg-text-color block py-2 px-1">
					Subscribe to add multiple shadows.
				</a>
			)}
			<>
				{shadowObj.map((shadow, index) => {

					var h = shadow.h;
					var v = shadow.v;
					var blur = shadow.blur;
					// var spread = shadow.spread;
					// var inset = shadow.inset;
					var color = shadow.color;

					var hVal = h.match(/-?\d+/g) == null ? 0 : h.match(/-?\d+/g)[0];
					var hUnit =
						h.match(/[a-zA-Z%]+/g) == null ? "px" : h.match(/[a-zA-Z%]+/g)[0];

					var vVal = v.match(/-?\d+/g) == null ? 0 : v.match(/-?\d+/g)[0];
					var vUnit =
						v.match(/[a-zA-Z%]+/g) == null ? "px" : v.match(/[a-zA-Z%]+/g)[0];

					var blurVal =
						blur.match(/-?\d+/g) == null ? 0 : blur.match(/-?\d+/g)[0];
					var blurUnit =
						blur.match(/[a-zA-Z%]+/g) == null
							? "px"
							: blur.match(/[a-zA-Z%]+/g)[0];

					// var spreadVal =
					// 	spread.match(/-?\d+/g) == null ? 0 : spread.match(/-?\d+/g)[0];
					// var spreadUnit =
					// 	spread.match(/[a-zA-Z%]+/g) == null
					// 		? "px"
					// 		: spread.match(/[a-zA-Z%]+/g)[0];

					return (
						<>
							<PanelBody
								className="font-medium text-slate-900 "
								title={
									<>
										<span
											className="cursor-pointer hover:bg-red-500 hover:text-white "
											onClick={(ev) => {
												var shadowObjX = [...shadowObj];
												shadowObjX.splice(index, 1);

												setShadowObj(shadowObjX);
											}}>
											<Icon icon={close} />
										</span>

										<span>
											{
												h +
												" " +
												v +
												" " +
												blur +
												" " +
												// spread +
												// " " +
												color
												// + " " +
												// (inset ? "inset" : "")
											}
										</span>
									</>
								}
								// title={
								// 	h +
								// 	" " +
								// 	v +
								// 	" " +
								// 	blur +
								// 	" " +
								// 	spread +
								// 	" " +
								// 	color +
								// 	" " +
								// 	(inset ? "inset" : "")
								// }
								initialOpen={false}>
								<PanelRow>
									<label htmlFor="">H-Offset</label>
								</PanelRow>

								<PanelRow>
									<InputControl
										value={hVal}
										type="number"
										onChange={(newVal) => {
											var shadowObjX = [...shadowObj];
											shadowObjX[index].h = newVal + hUnit;
											setShadowObj(shadowObjX);
										}}
									/>

									<SelectControl
										label=""
										value={hUnit}
										options={unitArgs}
										onChange={(newVal) => {
											var shadowObjX = [...shadowObj];
											shadowObjX[index].h = hVal + newVal;
											setShadowObj(shadowObjX);
										}}
									/>
								</PanelRow>

								<PanelRow>
									<label htmlFor="">V-Offset</label>
								</PanelRow>

								<PanelRow>
									<InputControl
										value={vVal}
										type="number"
										onChange={(newVal) => {
											var shadowObjX = [...shadowObj];
											shadowObjX[index].v = newVal + vUnit;
											setShadowObj(shadowObjX);
										}}
									/>

									<SelectControl
										label=""
										value={vUnit}
										options={unitArgs}
										onChange={(newVal) => {
											var shadowObjX = [...shadowObj];
											shadowObjX[index].v = vVal + newVal;
											setShadowObj(shadowObjX);
										}}
									/>
								</PanelRow>

								<PanelRow>
									<label htmlFor="">Blur</label>
								</PanelRow>

								<PanelRow>
									<InputControl
										value={blurVal}
										type="number"
										onChange={(newVal) => {
											var shadowObjX = [...shadowObj];
											shadowObjX[index].blur = newVal + blurUnit;
											setShadowObj(shadowObjX);
										}}
									/>

									<SelectControl
										label=""
										value={blurUnit}
										options={unitArgs}
										onChange={(newVal) => {
											var shadowObjX = [...shadowObj];
											shadowObjX[index].blur = blurVal + newVal;
											setShadowObj(shadowObjX);
										}}
									/>
								</PanelRow>

								{/* <PanelRow>
								<label htmlFor="">Spread</label>
							</PanelRow>

							<PanelRow>
								<InputControl
									value={spreadVal}
									type="number"
									onChange={(newVal) => {
										var shadowObjX = [...shadowObj];
										shadowObjX[index].spread = newVal + spreadUnit;
										setShadowObj(shadowObjX);
									}}
								/>

								<SelectControl
									label=""
									value={spreadUnit}
									options={unitArgs}
									onChange={(newVal) => {
										var shadowObjX = [...shadowObj];
										shadowObjX[index].spread = spreadVal + newVal;
										setShadowObj(shadowObjX);
									}}
								/>
							</PanelRow> */}

								<PanelRow>
									<label htmlFor="">Color</label>
								</PanelRow>

								<PGColorPicker
									value={color}
									colors={colorsPresets}
									enableAlpha
									onChange={(newVal) => {
										var shadowObjX = [...shadowObj];
										shadowObjX[index].color = newVal;
										setShadowObj(shadowObjX);
									}}
								/>

								{/* <ToggleControl
								help={inset ? "Inset (Enabled)" : "Inset?"}
								checked={inset}
								onChange={(arg) => {
									var shadowObjX = [...shadowObj];

									if (inset) {
										shadowObjX[index].inset = false;
									} else {
										shadowObjX[index].inset = true;
									}

									setShadowObj(shadowObjX);
								}}
							/> */}
							</PanelBody>
						</>
					);
				})}

				<ToggleControl
					help={isImportant ? "Important (Enabled)" : "Important?"}
					checked={isImportant}
					onChange={(arg) => {
						setImportant((isImportant) => !isImportant);
					}}
				/>
			</>
		</div>
	);
}

class PGcssTextShadow extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		const { val, onChange } = this.props;

		return (
			<div>
				<Html val={val} onChange={onChange} warn={this.state.showWarning} />
			</div>
		);
	}
}

export default PGcssTextShadow;





