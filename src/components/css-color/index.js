const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import {
	Button,
	Dropdown,
	ColorPalette,
	SelectControl,
	PanelRow,
	__experimentalInputControl as InputControl,
	Popover,
	ToggleControl,
} from "@wordpress/components";
import colorsPresets from "../../colors-presets";

import apiFetch from "@wordpress/api-fetch";
import {
	memo,
	useMemo,
	useState,
	useRef,
	useEffect,
	useCallback,
} from "@wordpress/element";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [valArgs, setValArgs] = useState(props.val.split(" "));
	const [val, setval] = useState(valArgs[0]);
	const [isImportant, setImportant] = useState(
		valArgs[1] == undefined ? false : true
	);
	const [customColor, setCustomColor] = useState([]);
	const [newColorPreset, setNewColorPreset] = useState([]);
	3;
	useEffect(() => {
		if (window.comboBlocksEditor.colors != undefined) {
			setCustomColor(window.comboBlocksEditor.colors);
		}
	}, [window.comboBlocksEditor]);

	useEffect(() => {
		const transformedColors = customColor.map((color, index) => {
			const name = color.substring(1).toUpperCase();
			const upperCaseColor = color.toUpperCase();
			return {
				name,
				color: upperCaseColor,
			};
		});
		// const newColor = transformedColors.concat(
		// 	colorsPresets.slice(0, 6 - transformedColors.length)
		// );
		let newColor;
		if (transformedColors.length >= 6) {
			newColor = transformedColors;
		} else {
			newColor = transformedColors.concat(
				colorsPresets.slice(0, 6 - transformedColors.length)
			);
		}
		setNewColorPreset(newColor);
	}, [customColor]);
	return (
		<div>
			<div className="p-2 relative">
				<PanelRow className="mb-2">
					<ToggleControl
						label={
							isImportant
								? __("Important (Enabled)", "combo-blocks")
								: __("Important?", "combo-blocks")
						}
						checked={isImportant}
						className="!mb-0"
						onChange={(arg) => {
							setImportant((isImportant) => !isImportant);
							if (isImportant) {
								props.onChange(val, "color");
							} else {
								props.onChange(val + " !important", "color");
							}
						}}
					/>
					{/* <span
						className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
						onClick={props.handleToggleClick}>
						<span className="text-[20px] text-white ">&times;</span>
					</span> */}
				</PanelRow>
				<ColorPalette
					value={val}
					colors={newColorPreset}
					enableAlpha
					onChange={(newVal) => {
						//props.onChange(newVal, 'color');
						setval(newVal);
						if (isImportant) {
							props.onChange(newVal + " !important", "color");
						} else {
							props.onChange(newVal, "color");
						}
					}}
				/>
				<PanelRow>
					<label htmlFor="">{__("Global Value", "combo-blocks")}</label>
					<SelectControl
						label=""
						value={val}
						options={[
							{ label: __("Choose", "combo-blocks"), value: "" },
							{ label: "Inherit", value: "inherit" },
							{ label: "Initial", value: "initial" },
							{ label: "Revert", value: "revert" },
							{ label: "Revert-layer", value: "revert-layer" },
							{ label: "Unset", value: "unset" },
						]}
						onChange={(newVal) => {
							setval(newVal);
							if (isImportant) {
								props.onChange(newVal + " !important", "color");
							} else {
								props.onChange(newVal, "color");
							}
						}}
					/>
				</PanelRow>
			</div>
		</div>
	);
}
class PGcssColor extends Component {
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
		var { val, enableAlpha, onChange, label } = this.props;
		var colorVal = val.replace(" !important", "");
		var placeholderStyle = {
			backgroundImage:
				"repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)",
			backgroundPosition: "0 0,25px 25px",
			backgroundSize: "50px 50px",
			boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 20%)",
			cursor: "pointer",
		};
		var defaultbtnStyle = {
			backgroundImage:
				"repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)",
			backgroundPosition: "0 0,25px 25px",
			backgroundSize: "50px 50px",
			boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 20%)",
			cursor: "pointer",
		};
		var btnStyle = {
			backgroundColor: val,
			boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 20%)",
			cursor: "pointer",
		};
		return (
			<div>
				{/* <div className="my-4">
					<div className="relative h-10" style={placeholderStyle}>
						<div
							className="absolute w-full  h-full top-0 left-0 text-center"
							style={btnStyle}
							onClick={this.handleToggleClick}>
							<span className="w-full text-center left-0 top-1/2 -translate-y-1/2	 absolute">
								{val == undefined ? "Set Color" : colorVal}
							</span>
						</div>
					</div>
				</div> */}
				<Html
					enableAlpha={enableAlpha}
					val={val}
					onChange={onChange}
					warn={this.state.showWarning}
					handleToggleClick={this.handleToggleClick}
				/>
			</div>
		);
	}
}
export default PGcssColor;
