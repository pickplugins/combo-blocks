const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";
import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";
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
	Spinner,
	PanelBody,
	PanelRow,
	ColorPalette,
	RangeControl,
	TextareaControl,
} from "@wordpress/components";
import PGStyles from "../../components/styles";
import PGtoggle from "../toggle";
var myStore = wp.data.select("ComboBlocksStore");
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [isLoading, setisLoading] = useState(false);
	const [globalCssObj, setglobalCssObj] = useState({});
	const [globalStyles, setglobalStyles] = useState(props.args);
	var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
	//var [debounce, setDebounce] = useState(null); // Using the hook.
	//var [keyframesX, setkeyframesX] = useState(props.keyframes); // Using the hook.
	useEffect(() => {
		props.onChange(globalStyles);
	}, [globalStyles]);
	useEffect(() => {
		var cssObj = {};
		globalStyles.map((item) => {
			Object.entries(item).map((arg) => {
				var sudoSrc = arg[0];
				var sudoArgs = arg[1];
				if (sudoSrc != "options" && sudoArgs != null) {
					var selector = myStore.getElementSelector(
						sudoSrc,
						item.options.selector
					);
					var elemetnCssObj = myStore.generateElementCss(item, selector);
					Object.entries(arg[1]).map((x) => {
						var attr = x[0];
						var cssPropty = myStore.cssAttrParse(attr);
						if (cssObj[selector] == undefined) {
							cssObj[selector] = {};
						}
						if (cssObj[selector][cssPropty] == undefined) {
							cssObj[selector][cssPropty] = {};
						}
						cssObj[selector][cssPropty] = x[1];
					});
				}
			});
			// if (globalCssObj[elementSelector] == undefined) {
			//   globalCssObj[elementSelector] = {};
			// }
			// var cssPath = [elementSelector, cssPropty, breakPointX]
			// const cssObject = myStore.updatePropertyDeep(globalCssObj, cssPath, newVal)
			//setglobalCssObj(cssObject)
		});
		myStore.generateBlockCss(cssObj, "global-css", "");
	}, [globalCssObj, globalStyles]);
	function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
		var path = [sudoScource, attr, breakPointX];
		let objX = Object.assign({}, obj);
		const itemX = myStore.updatePropertyDeep(objX, path, newVal);
		globalStyles[extra.index] = itemX;
		props.onChange(globalStyles);
		var elementSelector = myStore.getElementSelector(
			sudoScource,
			obj.options.selector
		);
		var cssPropty = myStore.cssAttrParse(attr);
		if (globalCssObj[elementSelector] == undefined) {
			globalCssObj[elementSelector] = {};
		}
		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssObject = myStore.updatePropertyDeep(globalCssObj, cssPath, newVal);
		setglobalCssObj(cssObject);
	}
	function onRemoveStyleItem(sudoScource, key, obj, extra) {
		var itemX = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);
		globalStyles[extra.index] = itemX;
		props.onChange(globalStyles);
		var elementSelector = myStore.getElementSelector(
			sudoScource,
			obj.options.selector
		);
		var cssPropty = myStore.cssAttrParse(key);
		var cssObject = myStore.deletePropertyDeep(globalCssObj, [
			elementSelector,
			cssPropty,
			breakPointX,
		]);
		setglobalCssObj(cssObject);
	}
	function onAddStyleItem(sudoScource, key, obj, extra) {
		const itemX = myStore.onAddStyleItem(sudoScource, key, obj);
		globalStyles[extra.index] = itemX;
		props.onChange(globalStyles);
	}
	function duplicate(index) {
		let duplicatedArray = globalStyles.concat();
		let duplicateObject = JSON.parse(JSON.stringify(duplicatedArray[index]));
		duplicatedArray.push(duplicateObject);
		setglobalStyles(duplicatedArray);
	}
	return (
		<div className="">
			<div
				// className="bg-gray-700 hover:bg-gray-600 my-3 cursor-pointer rounded-sm inline-block text-white px-3 py-1"
				className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
				onClick={(ev) => {
					var sdsd = globalStyles.concat({
						options: { selector: ".selector" },
						styles: {},
					});
					setglobalStyles(sdsd);
				}}>
				{__("Add", "combo-blocks")}
			</div>
			{globalStyles != undefined &&
				globalStyles.map((item, index) => {
					//var itemIndex = item[0];
					//var itemArgs = item[1];
					var options = item.options;
					return (
						<PGtoggle
							title={
								<>
									<span
										className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
										onClick={() => {
											var globalStylesX = [...globalStyles];
											var sdsd = globalStylesX.splice(index, 1);
											setglobalStyles(globalStylesX);
										}}>
										<span className="text-[20px] text-white ">&times;</span>
									</span>
									<span
										className="w-[30] h-[30px] mx-5 text-lime-500 flex justify-center items-center cursor-pointer "
										onClick={() => duplicate(index)}>
										<svg
											fill="currentColor"
											width="24px"
											height="24px"
											viewBox="0 0 1920 1920"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M0 1919.887h1467.88V452.008H0v1467.88ZM1354.965 564.922v1242.051H112.914V564.922h1242.051ZM777.203 800h-112l-.001 318.041H333v112h332.202V1580h112v-349.959H1113v-112H777.202V800ZM1920 0v1467.992h-338.741v-113.027h225.827V112.914H565.035V338.74H452.008V0H1920Z"
												fillRule="evenodd"
											/>
										</svg>
									</span>
									<span className="px-3">{options.selector}</span>
								</>
							}
							initialOpen={false}>
							<InputControl
								className="my-3"
								label=""
								help=""
								placeholder=".element-class or #element-id"
								value={options.selector}
								onChange={(value) => {
									globalStyles[index].options.selector = value;
									props.onChange(globalStyles);
								}}
							/>
							<PGStyles
								extra={{ index: index }}
								obj={item}
								onChange={onChangeStyleItem}
								onAdd={onAddStyleItem}
								onRemove={onRemoveStyleItem}
							/>
						</PGtoggle>
					);
				})}
		</div>
	);
}
class PGGlobalStyles extends Component {
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
		var { args, onChange } = this.props;
		return (
			<Html args={args} onChange={onChange} warn={this.state.showWarning} />
		);
	}
}
export default PGGlobalStyles;
