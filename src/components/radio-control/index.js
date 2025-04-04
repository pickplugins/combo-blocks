import { Button, PanelRow, Dropdown, Popover } from "@wordpress/components";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
	Component,
	RawHTML,
} from "@wordpress/element";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var selected = props.selected;
	var label = props.label;
	var name = props.name;
	var options = props.options;
	var onChange = props.onChange;
	return (
		<div>
			<span className="mb-3 font-bold ">{label}</span>
			{Object.entries(options).map((args) => {
				var index = args[0];
				var x = args[1];
				return (
					<div className="flex items-center w-full my-1 combo-blocks ">
						<input
							type="radio"
							id={index}
							className={`!h-4 !w-4 ${x.isPro ? "!border-gray-300 " : "!border-gray-500"
								}  focus:ring-2 focus:ring-blue-300`}
							name={props.name}
							value={x.value}
							disabled={x.isPro ? true : false}
							checked={x.value == selected ? true : false}
							onClick={(ev) => {
								if (x.isPro == true) {
									alert("Sorry this feature only available in pro");
								} else {
									onChange(x, index);
								}
							}}
						/>
						<label
							for={index}
							className="flex justify-between items-center w-full cursor-default ">
							<span className="max-w-[calc(100%_-_50px)]">{x.label}</span>
							{x.isPro && (
								<span
									className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white cursor-pointer"
									onClick={(ev) => {
										window.open("https://comboblocks.com/pricing/", "_blank");
									}}>
									{__("Pro", "combo-blocks")}
								</span>
							)}
						</label>
					</div>
				);
			})}
		</div>
	);
}
class PGRadioControl extends Component {
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
			// position,
			// variant,
			// btnClass,
			// searchPlaceholder,
			options, //[{"label":"Select..","icon":"","value":""}]
			label,
			name,
			onChange,
			selected,
			// value,
		} = this.props;
		return (
			<div>
				<Html
					selected={selected}
					label={label}
					name={name}
					options={options}
					onChange={onChange}
					// buttonTitle={buttonTitle}
					// searchPlaceholder={searchPlaceholder}
					// btnClass={btnClass}
					// variant={variant}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGRadioControl;