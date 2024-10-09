const { Component } = wp.element;
import {
	Button,
	Dropdown,
	PanelRow,
	PanelBody,
	RangeControl,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

import {
	__experimentalInputControl as InputControl,
	ColorPalette,
} from "@wordpress/components";
import PGDropdown from "../../components/dropdown";
import { Icon, close } from "@wordpress/icons";
import { applyFilters } from "@wordpress/hooks";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var valParts = props.val != undefined ? props.val.split(",") : [];

	const [valArgs, setvalArgs] = useState([]);

	var timingFunctionargs = [
		{ label: "ease", value: "ease" },
		{ label: "linear", value: "linear" },
		{ label: "ease-in", value: "ease-in" },
		{ label: "ease-out", value: "ease-out" },
		{ label: "ease-in-out", value: "ease-in-out" },
		{ label: "step-start", value: "step-start" },
		{ label: "step-end", value: "step-end" },
	];

	var transitionPropertiesBasic = {
		all: { value: "all ", label: "All " },

		"background-color": {
			value: "background-color",
			label: "Background Color",
		},
		color: { value: "color", label: "Color" },
		"box-shadow": { value: "box-shadow", label: "Box Shadow" },
		"font-size": { value: "font-size", label: "Font Size" },
		right: { value: "right", label: "Right" },
		top: { value: "top", label: "Top" },
		width: { value: "width", label: "Width" },
		height: { value: "height", label: "Height" },
		"font-weight": { value: "font-weight", label: "Font Weight" },
		left: { value: "left", label: "Left" },
		"z-index": { value: "z-index", label: "Z-Index" },
		margin: { value: "margin", label: "Margin" },
		padding: { value: "padding", label: "Padding" },
		"max-height": { value: "max-height", label: "Max Height" },
		"max-width": { value: "max-width", label: "Max Width" },
		"min-height": { value: "min-height", label: "Min Height" },
		"min-width": { value: "min-width", label: "Min Width" },
		opacity: { value: "opacity", label: "Opacity" },
		"align-content": { value: "align-content", label: "Align Content" },
		"align-items": { value: "align-items", label: "Align Items" },
		"align-self": { value: "align-self", label: "Align Self" },
		"backface-visibility": {
			value: "backface-visibility",
			label: "Backface Visibility",
		},
		//background: { value: 'background', label: 'Background' },
		"background-attachment": {
			value: "background-attachment",
			label: "Background Attachment",
			isPro: true,
		},
		"background-blendMode": {
			value: "background-blendMode",
			label: "Background Blend Mode",
			isPro: true,
		},
		"background-clip": {
			value: "background-clip",
			label: "Background Clip",
			isPro: true,
		},
		"background-image": {
			value: "background-image",
			label: "Background Image",
		},
		"background-origin": {
			value: "background-origin",
			label: "Background Origin",
		},
		"background-repeat": {
			value: "background-repeat",
			label: "Background Repeat",
		},
		"background-position": {
			value: "background-position",
			label: "Background Position",
		},
		"background-size": { value: "background-size", label: "Background Size" },
		border: { value: "border", label: "Border" },
		"border-collapse": {
			value: "border-collapse",
			label: "Border Collapse",
			isPro: true,
		},
		"border-image": {
			value: "border-image",
			label: "Border Image",
			isPro: true,
		},
		"border-radius": { value: "border-radius", label: "Border Radius" },
		"border-spacing": {
			value: "border-spacing",
			label: "Border Spacing",
			isPro: true,
		},
		"backdrop-filter": { value: "backdrop-filter", label: "Backdrop Filter" },
		bottom: { value: "bottom", label: "Bottom" },
		"box-sizing": { value: "box-sizing", label: "Box Sizing", isPro: true },
		clear: { value: "clear", label: "Clear" },
		clip: { value: "clip", label: "Clip", isPro: true },
		clipPath: { value: "clipPath", label: "Clip Path", isPro: true },
		"column-count": {
			value: "column-count",
			label: "Column Count",
			isPro: true,
		},
		content: { value: "content", label: "Content", isPro: true },
		cursor: { value: "cursor", label: "Cursor", isPro: true },
		display: { value: "display", label: "Display" },
		direction: { value: "direction", label: "Direction" },
		float: { value: "float", label: "Float" },
		filter: { value: "filter", label: "Filter", isPro: true },
		"font-family": { value: "font-family", label: "Font Family" },
		"font-stretch": {
			value: "font-stretch",
			label: "Font Stretch",
			isPro: true,
		},
		"font-style": { value: "font-style", label: "Font Style" },
		"font-variant-caps": {
			value: "font-variant-caps",
			label: "Font VariantCaps",
			isPro: true,
		},
		"letter-spacing": {
			value: "letter-spacing",
			label: "Letter Spacing",
			isPro: true,
		},
		"line-height": { value: "line-height", label: "Line Height" },
		"list-style": { value: "list-style", label: "ListStyle" },
		outline: { value: "outline", label: "Outline", isPro: true },
		overflow: { value: "overflow", label: "Overflow" },
		"overflow-x": { value: "overflow-x", label: "OverflowX", isPro: true },
		"overflow-y": { value: "overflow-y", label: "OverflowY", isPro: true },
		perspective: { value: "perspective", label: "Perspective", isPro: true },
		position: { value: "position", label: "Position" },
		"text-align": { value: "text-align", label: "Text Align" },
		transform: { value: "transform", label: "Transform", isPro: true },
		transition: { value: "transition", label: "Transition", isPro: true },
		"vertical-align": { value: "vertical-align", label: "Vertical Align" },
		visibility: { value: "visibility", label: "Visibility" },
		"text-decoration": {
			value: "text-decoration",
			label: "Text Decoration",
			isPro: true,
		},
		"text-indent": { value: "text-indent", label: "Text Indent", isPro: true },
		"text-justify": {
			value: "text-justify",
			label: "Text Justify",
			isPro: true,
		},
		"text-overflow": { value: "text-overflow", label: "Text Overflow" },
		"text-shadow": { value: "text-shadow", label: "Text Shadow", isPro: true },
		"text-transform": {
			value: "text-transform",
			label: "Text Transform",
			isPro: true,
		},
		"word-break": { value: "word-break", label: "Word Break", isPro: true },
		"word-spacing": {
			value: "word-spacing",
			label: "Word Spacing",
			isPro: true,
		},
		"word-wrap": { value: "word-wrap", label: "Word Wrap", isPro: true },
		"writing-mode": {
			value: "writing-mode",
			label: "Writing Mode",
			isPro: true,
		},
	};

	let transitionProperties = applyFilters(
		"transitionProperties",
		transitionPropertiesBasic
	);

	useEffect(() => {
		var filtered = valParts.filter(Boolean);

		var res = filtered.map((x) => {
			if (x.length != 0) {
				var items = x.split(" ");
				var property = items[0];
				var duration = items[1];
				var timingFunction = items[2];
				var delay = items[3];

				return {
					property: property,
					duration: duration,
					timingFunction: timingFunction,
					delay: delay,
				};
			}
		});

		setvalArgs(res);
	}, [props.val]);

	return (
		<div className="mt-4">
			<div className="flex mb-3">
				<PGDropdown
					position="bottom right"
					variant="secondary"
					options={transitionProperties}
					buttonTitle="Choose"
					onChange={(option, index) => {
						valArgs.push({
							property: option.value,
							duration: "1s",
							timingFunction: "ease",
							delay: "0s",
						});

						var str = "";
						valArgs.map((x, i) => {
							str +=
								x.property +
								" " +
								x.duration +
								" " +
								x.timingFunction +
								" " +
								x.delay;
							str += ",";
						});

						var strX = str.slice(0, -1);

						props.onChange(strX, "transition");
					}}></PGDropdown>
			</div>

			{valArgs != undefined &&
				valArgs.map((arg, i) => {
					return (
						<PanelBody
							title={
								arg.property != null &&
								transitionProperties[arg.property] != undefined
									? transitionProperties[arg.property].label
									: "property"
							}
							initialOpen={false}>
							<PanelRow>
								<label htmlFor="">Duration</label>
								<InputControl
									value={arg.duration.slice(0, -1)}
									type="number"
									autocomplete="off"
									onChange={(newVal) => {
										valArgs[i].duration = newVal;

										var str = "";
										valArgs.map((x, j) => {
											if (i == j) {
												str +=
													x.property +
													" " +
													newVal +
													"s " +
													x.timingFunction +
													" " +
													x.delay;
												str += ",";
											} else {
												str +=
													x.property +
													" " +
													x.duration +
													" " +
													x.timingFunction +
													" " +
													x.delay;
												str += ",";
											}
										});
										var strX = str.slice(0, -1);
										props.onChange(strX, "transition");
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label htmlFor="">Timing Function</label>

								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={timingFunctionargs}
									buttonTitle={
										arg.timingFunction != null ? arg.timingFunction : "Choose"
									}
									onChange={(option, index) => {
										valArgs[i].timingFunction = option.value;

										var str = "";
										valArgs.map((x, j) => {
											if (i == j) {
												str +=
													x.property +
													" " +
													x.duration +
													" " +
													option.value +
													" " +
													x.delay;
												str += ",";
											} else {
												str +=
													x.property +
													" " +
													x.duration +
													" " +
													x.timingFunction +
													" " +
													x.delay;
												str += ",";
											}
										});
										var strX = str.slice(0, -1);
										props.onChange(strX, "transition");
									}}></PGDropdown>
							</PanelRow>

							<PanelRow>
								<label htmlFor="">Delay</label>
								<InputControl
									value={arg.delay.slice(0, -1)}
									type="number"
									autocomplete="off"
									onChange={(newVal) => {
										valArgs[i].delay = newVal;

										var str = "";
										valArgs.map((x, j) => {
											if (i == j) {
												str +=
													x.property +
													" " +
													x.duration +
													" " +
													x.timingFunction +
													" " +
													newVal +
													"s";
												str += ",";
											} else {
												str +=
													x.property +
													" " +
													x.duration +
													" " +
													x.timingFunction +
													" " +
													x.delay;
												str += ",";
											}
										});
										var strX = str.slice(0, -1);
										props.onChange(strX, "transition");
									}}
								/>
							</PanelRow>

							<div className="flex">
								<span
									className="hover:bg-red-500 bg-red-400 text-white ml-1 inline-block p-1 cursor-pointer"
									onClick={(ev) => {
										var hellox = valArgs.splice(i, 1);

										setvalArgs(valArgs);

										var str = "";
										valArgs.map((x, j) => {
											str +=
												x.property +
												" " +
												x.duration +
												" " +
												x.timingFunction +
												" " +
												x.delay;
											str += ",";
										});
										var strX = str.slice(0, -1);
										props.onChange(strX, "transition");
									}}>
									<span className="dashicons dashicons-no-alt"></span>
								</span>
							</div>
						</PanelBody>
					);
				})}
		</div>
	);
}

class PGcssTransition extends Component {
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
		var { val, onChange } = this.props;

		return <Html val={val} onChange={onChange} warn={this.state.showWarning} />;
	}
}

export default PGcssTransition;

