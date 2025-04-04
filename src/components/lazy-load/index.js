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
import {
	RichText,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import MyLazy from "../../loading.gif";
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
import { Icon, close, linkOff, link } from "@wordpress/icons";
import PGDropdown from "../dropdown";
import PGtoggle from "../toggle";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	if (props.lazyLoad == undefined) {
		return null;
	}
	let isProFeature = applyFilters("isProFeature", true);
	const [lazyLoad, setlazyLoad] = useState(props.lazyLoad);
	useEffect(() => {
		props.onChange(lazyLoad);
	}, [lazyLoad]);
	const lazyEnable =
		lazyLoad?.enable == undefined
			? false
			: lazyLoad.enable;
	const [currentPostLazyImageId, setCurrentPostLazyImageId] = useState(
		lazyLoad.lazySrcId
	);
	const ALLOWED_MEDIA_TYPES = ["image"];
	const [linkPickerLazySrcUrl, setlinkPickerLazySrcUrl] = useState(false);
	const [postLazyImage, setPostLazyImage] = useState(null);
	return (
		<div className="relative pg-setting-input-text">
			<ToggleControl
				label={__("Enable?", "combo-blocks")}
				help={
					lazyEnable
						? __("Lazy Load Enabled.", "combo-blocks")
						: __("Lazy Load Disabled.", "combo-blocks")
				}
				checked={lazyEnable ? true : false}
				onChange={(e) => {
					var lazyLoadX = {
						...lazyLoad,
						enable: lazyEnable ? false : true,
					};
					if (isProFeature) {
						alert("This feature is only available in Pro Version.");
						return;
					}
					setlazyLoad(lazyLoadX);
				}}
			/>
			{lazyEnable && (
				<>
					<div className="pt-3">
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								{__("Placeholder Image", "combo-blocks")}
							</label>
							<SelectControl
								label=""
								value={lazyLoad.lazySrcType}
								options={[
									{ label: __("Default", "combo-blocks"), value: "" },
									{ label: __("Media", "combo-blocks"), value: "media" },
									{
										label: __("Image Source URL", "combo-blocks"),
										value: "customUrl",
									},
								]}
								onChange={(newVal) => {
									var lazyLoadX = { ...lazyLoad, lazySrcType: newVal };
									setlazyLoad(lazyLoadX);
								}}
							/>
						</PanelRow>
						{lazyLoad?.lazySrc?.length !== undefined &&
							lazyLoad.lazySrc.length > 0 && (
								<MediaUploadCheck>
									<MediaUpload
										className="bg-gray-700 hover:bg-gray-600"
										onSelect={(media) => {
											// media.id
											setCurrentPostLazyImageId(media.id);
											var lazyLoadX = {
												...lazyLoad,
												lazySrc: media.url,
												lazySrcId: media.id,
											};
											setlazyLoad(lazyLoadX);
										}}
										onClose={() => { }}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={lazyLoad.srcId}
										render={({ open }) => (
											<div
												className="flex w-full justify-center items-center bg-gray-300/30 min-h-[200px] rounded-md border border-solid border-slate-400 hover:border-black transition-all duration-300 ease-in-out cursor-pointer mt-2 "
												onClick={open}>
												<img
													// src={MyLazy}
													src={lazyLoad.lazySrc}
													alt=""
													className=" "
												/>
											</div>
										)}
									/>
								</MediaUploadCheck>
							)}
						{lazyLoad?.lazySrc?.length == 0 && (
							<MediaUploadCheck>
								<MediaUpload
									className="bg-gray-700 hover:bg-gray-600"
									onSelect={(media) => {
										// media.id
										setCurrentPostLazyImageId(media.id);
										var lazyLoadX = {
											...lazyLoad,
											lazySrc: media.url,
											lazySrcId: media.id,
										};
										setlazyLoad(lazyLoadX);
									}}
									onClose={() => { }}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={lazyLoad.lazySrcId}
									render={({ open }) => (
										<div
											className="flex w-full justify-center items-center bg-gray-300/30 min-h-[200px] rounded-md border border-solid border-slate-400 hover:border-black transition-all duration-300 ease-in-out cursor-pointer mt-2 "
											onClick={open}>
											<img src={MyLazy} alt="" className=" " />
										</div>
									)}
								/>
							</MediaUploadCheck>
						)}
						{lazyLoad.lazySrcType == "media" && (
							<>
								<div className="mt-5" for="">
									{__("Choose Image", "combo-blocks")}
								</div>
								<MediaUploadCheck>
									<MediaUpload
										className="bg-gray-700 hover:bg-gray-600"
										onSelect={(media) => {
											// media.id
											setCurrentPostLazyImageId(media.id);
											var lazyLoadX = {
												...lazyLoad,
												lazySrc: media.url,
												lazySrcId: media.id,
											};
											setlazyLoad(lazyLoad);
										}}
										onClose={() => { }}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={lazyLoad.lazySrcId}
										render={({ open }) => (
											<Button
												className="my-3 bg-gray-700 hover:bg-gray-600 text-white border border-solid border-gray-300 text-center w-full hover:text-white "
												onClick={open}>
												{__("Open Media Library", "combo-blocks")}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</>
						)}
						{lazyLoad.lazySrcType == "customUrl" && (
							<>
								<PanelRow>
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Image URL", "combo-blocks")}
									</label>
									<div className="relative">
										<Button
											className={linkPickerLazySrcUrl ? "!bg-gray-400" : ""}
											icon={link}
											onClick={(ev) => {
												setlinkPickerLazySrcUrl((prev) => !prev);
											}}></Button>
										{lazyLoad.lazySrc.length > 0 && (
											<Button
												className="!text-red-500 ml-2"
												icon={linkOff}
												onClick={(ev) => {
													var lazyLoadX = { ...lazyLoad, lazySrc: "" };
													setlazyLoad(lazyLoad);
													setlinkPickerLazySrcUrl(false);
												}}></Button>
										)}
										{linkPickerLazySrcUrl && (
											<Popover position="bottom right">
												<LinkControl
													settings={[]}
													value={lazyLoad.lazySrc}
													onChange={(newVal) => {
														var lazyLoadX = {
															...lazyLoad,
															lazySrc: newVal.url,
														};
														setlazyLoad(lazyLoadX);
														setPostLazyImage({
															...postLazyImage,
															lazySrc: newVal.url,
															media_details: { sizes: {} },
															guid: { rendered: newVal.url },
														});
													}}
												/>
												<div className="p-2">
													<span className="font-bold">
														{__("Image Source URL:", "combo-blocks")}
													</span>{" "}
													{lazyLoad.lazySrc.length != 0
														? lazyLoad.lazySrc
														: __("No link", "combo-blocks")}{" "}
												</div>
											</Popover>
										)}
									</div>
								</PanelRow>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
}
class PGLazyLoad extends Component {
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
			searchPlaceholder,
			options, //[{"label":"Select..","icon":"","value":""}]
			buttonTitle,
			onChange,
			lazyLoad,
			values,
			value,
		} = this.props;
		return (
			<div>
				<Html
					value={value}
					position={position}
					searchPlaceholder={searchPlaceholder}
					btnClass={btnClass}
					variant={variant}
					options={options}
					buttonTitle={buttonTitle}
					onChange={onChange}
					lazyLoad={lazyLoad}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGLazyLoad;
