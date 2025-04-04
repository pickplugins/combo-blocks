const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import {
	Panel,
	PanelRow,
	PanelItem,
	Button,
	Dropdown,
	SelectControl,
	Popover,
	Spinner,
	ToggleControl,
} from "@wordpress/components";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
} from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";
import apiFetch from "@wordpress/api-fetch";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import colorsPresets from "../../colors-presets";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var important = "";
	if (typeof props.val == "object") {
		var topX = props.val.top;
		var rightX = props.val.right;
		var bottomX = props.val.bottom;
		var leftX = props.val.left;
		var important = "";
		var valParts = [topX, rightX, bottomX, leftX, ""];
	} else {
		var valParts =
			props.val != undefined
				? props.val.split(" ")
				: ["5px", "5px", "5px", "5px", ""];
		var topX = valParts[0];
		var rightX = valParts[1];
		var bottomX = valParts[2];
		var leftX = valParts[3];
		var important = valParts[4];
	}
	const [valX, setvalX] = useState({
		top: topX,
		right: rightX,
		bottom: bottomX,
		left: leftX,
	});
	const [isImportant, setImportant] = useState(
		valParts.includes("!important") ? true : false
	);
	return (
		<div>
			<BoxControl
				label=""
				values={valX}
				onChange={(nextValues) => {
					// setvalX({ top: nextValues.top, right: nextValues.right, bottom: nextValues.bottom, left: nextValues.left })
					// props.onChange(nextValues.top + ' ' + nextValues.right + ' ' + nextValues.bottom + ' ' + nextValues.left, 'margin');
					setvalX({
						top: nextValues.top,
						right: nextValues.right,
						bottom: nextValues.bottom,
						left: nextValues.left,
					});
					if (isImportant) {
						props.onChange(
							nextValues.top +
							" " +
							nextValues.right +
							" " +
							nextValues.bottom +
							" " +
							nextValues.left +
							" !important",
							"margin"
						);
					} else {
						props.onChange(
							nextValues.top +
							" " +
							nextValues.right +
							" " +
							nextValues.bottom +
							" " +
							nextValues.left,
							"margin"
						);
					}
				}}
			/>
			<ToggleControl
				help={
					isImportant
						? __("Important Enabled", "combo-blocks")
						: __("Important?", "combo-blocks")
				}
				checked={isImportant}
				onChange={(arg) => {
					setImportant((isImportant) => !isImportant);
					if (isImportant) {
						props.onChange(
							valX.top + " " + valX.right + " " + valX.bottom + " " + valX.left,
							"margin"
						);
					} else {
						props.onChange(
							valX.top +
							" " +
							valX.right +
							" " +
							valX.bottom +
							" " +
							valX.left +
							" !important",
							"margin"
						);
					}
				}}
			/>
		</div>
	);
}
class PGcssMargin extends Component {
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
export default PGcssMargin;
