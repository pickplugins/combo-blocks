const { Component } = wp.element;
import {
	Button,
	Dropdown,
	ColorPalette,
	PanelRow,
	__experimentalInputControl as InputControl,
	Popover,
	DateTimePicker,
} from "@wordpress/components";
import { calendar } from "@wordpress/icons";
import {
	memo,
	useMemo,
	useState,
	useRef,
	useEffect,
	useCallback,
} from "@wordpress/element";
import breakPoints from "../../breakpoints";

function WarningBanner(props) {
	if (!props.warn) {
		return null;
	}

	return (
		<div>
			<Popover position="bottom right">
				<div className="p-2">
					<DateTimePicker
						currentDate={props.value.length > 0 ? props.value : new Date()}
						onChange={(newVal) => {
							props.onChange(newVal);
						}}
						is12Hour={true}
					/>
					{/* <ColorPalette
						value={props.value}
						onChange={(newVal) => {
							props.onChange(newVal);
						}}
					/> */}
				</div>
			</Popover>
		</div>
	);
}

class PGDatePicker extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { label, date, onChange } = this.props;
		function convertedDate() {
			const inputDate = new Date(date);
			const formattedDate = `${inputDate
				.getDate()
				.toString()
				.padStart(2, "0")}/${(inputDate.getMonth() + 1)
					.toString()
					.padStart(2, "0")}/${inputDate.getFullYear()} - ${inputDate
						.getHours()
						.toString()
						.padStart(2, "0")}:${inputDate
							.getMinutes()
							.toString()
							.padStart(2, "0")} ${inputDate.getHours() >= 12 ? "PM" : "AM"}`;


			return formattedDate;
		}

		return (
			<div>
				<div
					className="my-4 pg-font flex border border-solid border-slate-300 rounded-md overflow-hidden cursor-pointer  "
					onClick={this.handleToggleClick}>
					<span className="flex justify-center items-center p-2 text-base bg-slate-500">
						📅
						{/* <Icon icon={calendar} /> */}
					</span>
					<span className="p-2 text-base flex justify-start items-center text-gray-800">
						{date.length > 0 ? convertedDate() : label}
					</span>
				</div>
				<WarningBanner
					value={date}
					onChange={onChange}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}

export default PGDatePicker;




