import {
	Button,
	PanelRow,
	PanelBody,
	ToggleControl,
	Dropdown,
	Popover,
	SelectControl,
	RangeControl,
	Panel,
	DropdownMenu,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Spinner,
	Tooltip,
	DateTimePicker,
	DatePicker,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import {
	useState,
	useEffect,
	Component,
	RawHTML,
	////
	useRef,
	////
} from "@wordpress/element";
import { Icon, close } from "@wordpress/icons";
import PGDropdown from "../dropdown";
import PGtoggle from "../toggle";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	let isProFeature = applyFilters("isProFeature", true);
	const [globalImageSizes, setGlobalImageSizes] = useState({
		full: {
			label: "Full",
			value: "full",
			height: "",
			width: "",
			crop: false,
		},
		thumbnail: {
			label: "thumbnail(150*150)",
			value: "thumbnail",
			height: 150,
			width: 150,
		},
		medium: {
			label: "medium(300*300)",
			value: "medium",
			height: 300,
			width: 300,
		},
		medium_large: {
			label: "medium large(768*0)",
			value: "medium_large",
			height: 0,
			width: 768,
		},
		large: {
			label: "large(1024*1024)",
			value: "large",
			height: 1024,
			width: 1024,
		},
		"1536x1536": {
			label: "1536x1536(1536*1536)",
			value: "1536x1536",
			height: 1536,
			width: 1536,
		},
		"2048x2048": {
			label: "2048x2048(2048*2048)",
			value: "2048x2048",
			height: 2048,
			width: 2048,
		},
		woocommerce_archive_thumbnail: {
			label: "woocommerce archive thumbnail(500*500)",
			value: "woocommerce_archive_thumbnail",
			height: 500,
			width: 500,
		},
		woocommerce_thumbnail: {
			label: "woocommerce thumbnail(300*300)",
			value: "woocommerce_thumbnail",
			height: 300,
			width: 300,
		},
		woocommerce_single: {
			label: "woocommerce single(600*0)",
			value: "woocommerce_single",
			height: 0,
			width: 600,
		},
		woocommerce_gallery_thumbnail: {
			label: "woocommerce gallery thumbnail(100*100)",
			value: "woocommerce_gallery_thumbnail",
			height: 100,
			width: 100,
		},
	});

	const [lightboxZ, setlightboxZ] = useState(props.lightbox);
	var lightboxEnable = lightboxZ?.options?.enable
	useEffect(() => {
		props.onChange(lightboxZ);
	}, [lightboxZ]);



	useEffect(() => {
		setTimeout(() => {
			if (window.comboBlocksImgSizes != null) {
				setGlobalImageSizes(window.comboBlocksImgSizes);
			}
		}, 3000);
	}, []);




	return (
		<div className="relative pg-setting-input-text">
			<ToggleControl
				label={__("Enable?", "combo-blocks")}
				help={
					lightboxEnable
						? __("Lightbox Enabled", "combo-blocks")
						: __("Lightbox Disabled.", "combo-blocks")
				}
				checked={lightboxEnable ? true : false}
				onChange={(e) => {
					var optionsX = {
						...lightboxZ.options,
						enable: lightboxEnable ? false : true,
					};
					if (isProFeature) {
						alert("This feature is only available in Pro Version.");
						return;
					}
					setlightboxZ({
						...lightboxZ,
						options: optionsX,
					});
				}}
			/>
			<div className="mb-4">
				<label
					for=""
					className="font-medium text-slate-900 block pb-2 ">
					{__("Thumbnail Size", "combo-blocks")}
				</label>
				<PGDropdown
					position="bottom right"
					btnClass="flex w-full gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
					options={globalImageSizes}
					buttonTitle={
						lightboxZ.options.thumbSize == undefined
							? __("Choose", "combo-blocks")
							: globalImageSizes[lightboxZ.options.thumbSize] ==
								undefined
								? __("Choose", "combo-blocks")
								: globalImageSizes[lightboxZ.options.thumbSize]
									.label
					}
					onChange={(option, index) => {
						var optionsX = { ...lightboxZ.options, thumbSize: option.value, };
						setlightboxZ({
							...lightboxZ, options: optionsX,
						});
					}}
					values={lightboxZ.options.thumbSize}></PGDropdown>
			</div>
		</div>
	);
}
class PGLightbox extends Component {
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
		const {
			position,
			variant,
			btnClass,
			options, //[{"label":"Select..","icon":"","value":""}]
			globalImageSizes,
			onChange,
			lightbox,
			values,
			value,
		} = this.props;
		return (
			<div>
				<Html
					value={value}
					position={position}
					btnClass={btnClass}
					variant={variant}
					options={options}
					globalImageSizes={globalImageSizes}
					onChange={onChange}
					lightbox={lightbox}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGLightbox;
