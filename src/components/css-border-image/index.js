const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from "@wordpress/components";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import colorsPresets from "../../colors-presets";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
} from "@wordpress/components";
import PGDropdown from "../../components/dropdown";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import PGColorPicker from "../../components/input-color-picker";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { GradientPicker } from "@wordpress/components";
import { Icon, close, arrowRight } from "@wordpress/icons";

function Html(props) {
	if (!props.warn) {
		return null;
	}





	const ALLOWED_MEDIA_TYPES = ["image"];

	var valZ =
		props.val == undefined || props.val == null || props.val.length == 0
			? "url(border.png)  1 1 1 1/  10px 10px 10px 10px /  0px 0px 0px 0px  round"
			: props.val;

	var source = valZ == undefined ? "" : valZ.split("  ")[0];
	var slice = valZ == undefined ? 10 : valZ.split("  ")[1].replace("/", "");
	var width = valZ == undefined ? 10 : valZ.split("  ")[2].replace("/", "");
	var outset = valZ == undefined ? 10 : valZ.split("  ")[3];
	var repeat = valZ == undefined ? "" : valZ.split("  ")[4];

	slice = slice.replaceAll(" ", "px ");
	slice = slice + "px";

	var imageVal = source.replace('url("', "");
	imageVal = imageVal.replace('")', "");

	const [type, setType] = useState("linear");
	const [linearGradientValue, setLinearGradientValue] = useState(
		"linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)"
	);

	return (
		<div>
			<PanelRow>
				<label htmlFor="">Source</label>
			</PanelRow>

			<div className="my-4">
				<label htmlFor="" className="font-medium text-slate-900 pg-font ">
					Select Source
				</label>
				<SelectControl
					options={[
						{ label: "Linear Gradient", value: "linear" },
						{ label: "Image", value: "image" },
					]}
					values=""
					onChange={(newVal) => {
						setType(newVal);
					}}
				/>
			</div>
			{type === "linear" && (
				<GradientPicker
					value={linearGradientValue}
					onChange={(currentGradient) => {

						setLinearGradientValue(currentGradient);
						var sliceX = slice.replaceAll("px", "");
						props.onChange(
							currentGradient +
							sliceX +
							"/  " +
							width +
							"/  " +
							outset +
							"  " +
							repeat,
							"borderImage"
						);
					}}
					gradients={[
						{
							name: "JShine",
							gradient:
								"linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)",
							slug: "jshine",
						},
						{
							name: "Moonlit Asteroid",
							gradient:
								"linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)",
							slug: "moonlit-asteroid",
						},
						{
							name: "Rastafarie",
							gradient:
								"linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)",
							slug: "rastafari",
						},
					]}
				/>
			)}

			{/* gradient end  */}
			{type === "image" && (
				<>
					<div className="my-3">
						<img src={imageVal} alt="" />
					</div>

					<InputControl
						className="mr-2"
						value={imageVal.replace("url(", "").replace(")", "")}
						placeholder="Image URL"
						onChange={(newVal) => {
							var sliceX = slice.replaceAll("px", "");

							props.onChange(
								"url(" +
								newVal +
								")  " +
								sliceX +
								"/  " +
								width +
								"/  " +
								outset +
								"  " +
								repeat,
								"borderImage"
							);
						}}
					/>

					<MediaUploadCheck>
						<MediaUpload
							className="bg-indigo-300 hover:bg-indigo-500"
							onSelect={(media) => {
								// media.id

								var sliceX = slice.replaceAll("px", "");

								props.onChange(
									"url(" +
									media.url +
									")  " +
									sliceX +
									"/  " +
									width +
									"/  " +
									outset +
									"  " +
									repeat,
									"borderImage"
								);
							}}
							onClose={() => { }}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							render={({ open }) => (
								<Button
									className="my-3 bg-indigo-300 hover:bg-indigo-500 text-white border border-solid border-gray-300 text-center w-full"
									onClick={open}>
									Open Media Library
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</>
			)}

			{/* <GradientPicker
				value={x == null || x == undefined ? null : x}
				onChange={(currentGradient) => {
					

					if (currentGradient == undefined) {
						valArgs.splice(index, 1);
						var ssdsd = valArgs.concat([]);
						setValArgs(ssdsd);
						var valString = ssdsd.join(",  ");
					} else {
						valArgs[index] = currentGradient;
						setValArgs(valArgs);
						var valString = valArgs.join(",  ");
					}

					

					props.onChange(valString, "backgroundImage");
				}}
				gradients={[
					{
						name: "JShine",
						gradient:
							"linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)",
						slug: "jshine",
					},
					{
						name: "Moonlit Asteroid",
						gradient:
							"linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)",
						slug: "moonlit-asteroid",
					},
					{
						name: "Rastafarie",
						gradient:
							"linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)",
						slug: "rastafari",
					},
				]}
			/> */}

			<PanelRow>
				<label htmlFor="">Slice</label>
			</PanelRow>

			<BoxControl
				label=""
				values={{
					top: slice.split(" ")[0],
					right: slice.split(" ")[1],
					bottom: slice.split(" ")[2],
					left: slice.split(" ")[3],
				}}
				onChange={(nextValues) => {
					var top = parseInt(nextValues.top);
					var right = parseInt(nextValues.right);
					var bottom = parseInt(nextValues.bottom);
					var left = parseInt(nextValues.left);

					var sliceX = top + " " + right + " " + bottom + " " + left;

					props.onChange(
						source +
						"  " +
						sliceX +
						"/  " +
						width +
						"/  " +
						outset +
						"  " +
						repeat,
						"borderImage"
					);
				}}
			/>

			<PanelRow>
				<label htmlFor="">Width</label>
			</PanelRow>

			<BoxControl
				label=""
				values={{
					top: width.split(" ")[0],
					right: width.split(" ")[1],
					bottom: width.split(" ")[2],
					left: width.split(" ")[3],
				}}
				onChange={(nextValues) => {
					var sliceX = slice.replaceAll("px", "");

					var top = nextValues.top;
					var right = nextValues.right;
					var bottom = nextValues.bottom;
					var left = nextValues.left;

					var widthX = top + " " + right + " " + bottom + " " + left;

					props.onChange(
						source +
						"  " +
						sliceX +
						"/  " +
						widthX +
						"/  " +
						outset +
						"  " +
						repeat,
						"borderImage"
					);
				}}
			/>
			<PanelRow>
				<label htmlFor="">Outset</label>
			</PanelRow>

			<BoxControl
				label=""
				values={{
					top: outset.split(" ")[0],
					right: outset.split(" ")[1],
					bottom: outset.split(" ")[2],
					left: outset.split(" ")[3],
				}}
				onChange={(nextValues) => {
					var sliceX = slice.replaceAll("px", "");

					var top = nextValues.top;
					var right = nextValues.right;
					var bottom = nextValues.bottom;
					var left = nextValues.left;

					var outsetX = top + " " + right + " " + bottom + " " + left;

					props.onChange(
						source +
						"  " +
						sliceX +
						"/  " +
						width +
						"/  " +
						outsetX +
						"  " +
						repeat,
						"borderImage"
					);
				}}
			/>

			<PanelRow>
				<label htmlFor="">Repeat</label>

				<SelectControl
					label=""
					value={repeat}
					options={[
						{ label: "Stretch", value: "stretch" },
						{ label: "Repeat", value: "repeat" },
						{ label: "Round", value: "round" },
						{ label: "Space", value: "space" },
						{ label: "Fill", value: "fill" },
					]}
					onChange={(newVal) => {
						var sliceX = slice.replaceAll("px", "");

						props.onChange(
							source +
							"  " +
							sliceX +
							"/  " +
							width +
							"/  " +
							outset +
							"  " +
							newVal,
							"borderImage"
						);
					}}
				/>
			</PanelRow>
		</div>
	);
}
class PGcssBorderImage extends Component {
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

export default PGcssBorderImage;
