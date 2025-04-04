const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
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
	SelectControl,
} from "@wordpress/components";
import PGDropdown from "../../components/dropdown";
import { Icon, close } from "@wordpress/icons";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var valParts = props.val != undefined ? props.val.split(") ") : [];
	const [valArgs, setvalArgs] = useState([]);
	var propertyArgs = {
		translateX: { label: "TranslateX", id: "translateX", val: "0px" },
		translateY: { label: "TranslateY", id: "translateY", val: "0px" },
		translateZ: { label: "TranslateZ", id: "translateZ", val: "0px" },
		translate: { label: "Translate", id: "translate", val: "5px,6px" },
		translate3d: {
			label: "Translate3d",
			id: "translate3d",
			val: "0px,0px,0px",
		},
		scale: { label: "Scale", id: "scale", val: "2,3" },
		scale3d: { label: "Scale3d", id: "scale3d", val: "1,1,1" },
		scaleX: { label: "ScaleX", id: "scaleX", val: "1" },
		scaleY: { label: "ScaleY", id: "scaleY", val: "1" },
		scaleZ: { label: "ScaleZ", id: "scaleZ", val: "1" },
		rotate: { label: "Rotate", id: "rotate", val: "0deg" },
		rotate3d: { label: "Rotate3d", id: "rotate3d", val: "1,1,1,0deg" },
		rotateX: { label: "RotateX", id: "rotateX", val: "0deg" },
		rotateY: { label: "RotateY", id: "rotateY", val: "0deg" },
		rotateZ: { label: "RotateZ", id: "rotateZ", val: "0deg" },
		skew: { label: "Skew", id: "skew", val: "2deg,3deg" },
		skewX: { label: "SkewX", id: "skewX", val: "0deg" },
		skewY: { label: "SkewY", id: "skewY", val: "0deg" },
		perspective: { label: "Perspective", id: "perspective", val: "0px" },
		matrix: { label: "Matrix", id: "matrix", val: "1,1,1,1,1,1" },
		matrix3d: { label: "Matrix3d", id: "matrix3d", val: "1,1" },
	};
	useEffect(() => {
		var filtered = valParts.filter(Boolean);
		var res = filtered.map((x) => {
			if (x.length != 0) {
				var proptyParts = x != undefined ? x.split("(") : [];
				var proptyId = proptyParts[0];
				var proptyVal = proptyParts[1];
				var obj = { id: proptyId, val: proptyVal };
				return obj;
			}
		});
		setvalArgs(res);
	}, [props.val]);
	function RemoveProty({ title, index }) {
		return (
			<div className="flex  items-center ">
				<span
					className="hover:bg-red-500 hover:text-white mr-1 inline-block p-1 cursor-pointer"
					onClick={(ev) => {
						var hellox = valArgs.splice(index, 1);
						setvalArgs(valArgs);
						var str = "";
						valArgs.map((x) => {
							str += x.id + "(" + x.val + ") ";
						});
						props.onChange(str, "transform");
					}}>
					<Icon icon={close} />
				</span>
				<span>{title}</span>
			</div>
		);
	}
	return (
		<div className="mt-4">
			<div className="flex mb-3">
				<PGDropdown
					position="bottom right"
					variant="secondary"
					options={propertyArgs}
					buttonTitle={__("Choose", "combo-blocks")}
					onChange={(option, index) => {
						valArgs.push(option);
						var str = "";
						valArgs.map((x, i) => {
							str += x.id + "(" + x.val + ") ";
						});
						props.onChange(str, "transform");
					}}></PGDropdown>
			</div>
			{valArgs != undefined &&
				valArgs.map((arg, i) => {
					return (
						<PanelBody
							title={
								<RemoveProty
									title={
										arg.id != null && propertyArgs[arg.id] != undefined
											? propertyArgs[arg.id].label
											: "property"
									}
									index={i}
								/>
							}
							initialOpen={false}>
							{(arg.id == "translateX" ||
								arg.id == "translateY" ||
								arg.id == "translateZ" ||
								arg.id == "scaleX" ||
								arg.id == "scaleY" ||
								arg.id == "scaleZ" ||
								arg.id == "rotate" ||
								arg.id == "rotateX" ||
								arg.id == "rotateY" ||
								arg.id == "rotateZ" ||
								arg.id == "skewX" ||
								arg.id == "skewY" ||
								arg.id == "perspective") && (
									<>
										<label htmlFor="">{__("Value", "combo-blocks")}</label>
										<PanelRow>
											<InputControl
												value={
													arg.val.match(/-?\d+/g) == null
														? 0
														: arg.val.match(/-?\d+/g)[0]
												}
												type="number"
												onChange={(newVal) => {
													//var argVal = arg.val != undefined ? arg.val.match(/-?\d+/g)[0] : 1;
													if (parseInt(newVal) == NaN) {
														return;
													}
													var str = "";
													valArgs.map((x, j) => {
														if (arg.id == x.id) {
															if (
																arg.id == "scaleX" ||
																arg.id == "scaleY" ||
																arg.id == "scaleZ"
															) {
																str += x.id + "(" + newVal + ") ";
															}
															if (
																arg.id == "translateX" ||
																arg.id == "translateY" ||
																arg.id == "translateZ" ||
																arg.id == "perspective"
															) {
																var argUnit =
																	arg.val != undefined
																		? arg.val.match(/[%a-zA-Z]+/g)[0]
																		: "";
																str += x.id + "(" + newVal + argUnit + ") ";
															}
															if (
																arg.id == "rotate" ||
																arg.id == "rotateX" ||
																arg.id == "rotateY" ||
																arg.id == "rotateZ" ||
																arg.id == "skewX" ||
																arg.id == "skewY"
															) {
																str += x.id + "(" + newVal + "deg) ";
															}
														} else {
															str += x.id + "(" + x.val + ") ";
														}
													});
													props.onChange(str, "transform");
												}}
											/>
											<span className="w-2/6">
												{(arg.id == "translateX" ||
													arg.id == "translateY" ||
													arg.id == "translateZ" ||
													arg.id == "perspective") && (
														<SelectControl
															label=""
															value={arg.val.match(/[%a-zA-Z]+/g)[0]}
															options={[
																{ label: "PX", value: "px" },
																{ label: "EM", value: "em" },
																{ label: "REM", value: "rem" },
																{ label: "%", value: "%" },
															]}
															onChange={(newVal) => {
																var str = "";
																valArgs.map((x, j) => {
																	if (arg.id == x.id) {
																		if (
																			arg.id == "translateX" ||
																			arg.id == "translateY" ||
																			arg.id == "translateZ" ||
																			arg.id == "perspective"
																		) {
																			var argVal =
																				arg.val != undefined
																					? arg.val.match(/-?\d+/g)[0]
																					: 1;
																			str += x.id + "(" + argVal + newVal + ") ";
																		}
																	} else {
																		str += x.id + "(" + x.val + ") ";
																	}
																});
																props.onChange(str, "transform");
															}}
														/>
													)}
												{(arg.id == "rotateX" ||
													arg.id == "rotate" ||
													arg.id == "rotateY" ||
													arg.id == "rotateZ" ||
													arg.id == "skewX" ||
													arg.id == "skewY") &&
													"deg"}
											</span>
										</PanelRow>
									</>
								)}
							{(arg.id == "translate" ||
								arg.id == "scale" ||
								arg.id == "skew") && (
									<>
										<div className="mt-2">
											<label htmlFor="">{__("X Value", "combo-blocks")}</label>
											<PanelRow>
												<InputControl
													value={
														arg.val.split(",")[0].match(/-?\d+/g) == undefined
															? 0
															: arg.val.split(",")[0].match(/-?\d+/g)[0]
													}
													type="number"
													onChange={(newVal) => {
														//var argVal = arg.val != undefined ? arg.val.match(/-?\d+/g)[0] : 1;
														if (parseInt(newVal) == NaN) {
															return;
														}
														var valPartsX =
															arg.val.split(",")[0].match(/-?\d+/g) == null
																? 0
																: arg.val.split(",")[0].match(/-?\d+/g)[0];
														var valPartsXUnit =
															arg.val.split(",")[0].match(/[%a-zA-Z]+/g) == null
																? "px"
																: arg.val.split(",")[0].match(/[%a-zA-Z]+/g)[0];
														var valPartsY =
															arg.val.split(",")[1].match(/-?\d+/g) == null
																? 0
																: arg.val.split(",")[1].match(/-?\d+/g)[0];
														var valPartsYUnit =
															arg.val.split(",")[1].match(/[%a-zA-Z]+/g) == null
																? "px"
																: arg.val.split(",")[1].match(/[%a-zA-Z]+/g)[0];
														var str = "";
														valArgs.map((x, j) => {
															if (arg.id == x.id) {
																if (arg.id == "scale") {
																	str +=
																		x.id + "(" + newVal + "," + valPartsY + ") ";
																}
																if (arg.id == "translate") {
																	str +=
																		x.id +
																		"(" +
																		newVal +
																		valPartsXUnit +
																		"," +
																		valPartsY +
																		valPartsYUnit +
																		") ";
																}
																if (arg.id == "skew") {
																	str +=
																		x.id +
																		"(" +
																		newVal +
																		"deg," +
																		valPartsY +
																		"deg) ";
																}
															} else {
																str += x.id + "(" + x.val + ") ";
															}
														});
														props.onChange(str, "transform");
													}}
												/>
												<span className="w-2/6">
													{arg.id == "translate" && (
														<>
															<SelectControl
																label=""
																value={
																	arg.val.split(",")[0].match(/[%a-zA-Z]+/g)[0]
																}
																options={[
																	{ label: "PX", value: "px" },
																	{ label: "EM", value: "em" },
																	{ label: "REM", value: "rem" },
																	{ label: "%", value: "%" },
																]}
																onChange={(newVal) => {
																	var str = "";
																	valArgs.map((x, j) => {
																		if (arg.id == x.id) {
																			if (arg.id == "translate") {
																				var argValX =
																					arg.val.split(",")[0].match(/-?\d+/g) ==
																						null
																						? 1
																						: arg.val
																							.split(",")[0]
																							.match(/-?\d+/g)[0];
																				var argValXUnit =
																					arg.val
																						.split(",")[0]
																						.match(/[%a-zA-Z]+/g) == null
																						? "px"
																						: arg.val
																							.split(",")[0]
																							.match(/[%a-zA-Z]+/g)[0];
																				var argValY =
																					arg.val.split(",")[1].match(/-?\d+/g) ==
																						null
																						? 1
																						: arg.val
																							.split(",")[1]
																							.match(/-?\d+/g)[0];
																				var argValYUnit =
																					arg.val
																						.split(",")[1]
																						.match(/[%a-zA-Z]+/g) == null
																						? "px"
																						: arg.val
																							.split(",")[1]
																							.match(/[%a-zA-Z]+/g)[0];
																				str +=
																					x.id +
																					"(" +
																					argValX +
																					newVal +
																					"," +
																					argValY +
																					argValYUnit +
																					") ";
																				//str += x.id + '(' + argVal + newVal + ') ';
																			}
																		} else {
																			str += x.id + "(" + x.val + ") ";
																		}
																	});
																	props.onChange(str, "transform");
																}}
															/>
														</>
													)}
													{arg.id == "skew" && "deg"}
												</span>
											</PanelRow>
										</div>
										<div className="mt-2">
											<label htmlFor="">{__("Y Value", "combo-blocks")}</label>
											<PanelRow>
												<InputControl
													value={
														arg.val.split(",")[1].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[1].match(/-?\d+/g)[0]
													}
													type="number"
													onChange={(newVal) => {
														if (parseInt(newVal) == NaN) {
															return;
														}
														var valPartsX =
															arg.val.split(",")[0].match(/-?\d+/g) == null
																? 0
																: arg.val.split(",")[0].match(/-?\d+/g)[0];
														var valPartsXUnit =
															arg.val.split(",")[0].match(/[%a-zA-Z]+/g) == null
																? "px"
																: arg.val.split(",")[0].match(/[%a-zA-Z]+/g)[0];
														var valPartsY =
															arg.val.split(",")[1].match(/-?\d+/g) == null
																? 0
																: arg.val.split(",")[1].match(/-?\d+/g)[0];
														var argValYUnit =
															arg.val.split(",")[1].match(/[%a-zA-Z]+/g) == null
																? "px"
																: arg.val.split(",")[1].match(/[%a-zA-Z]+/g)[0];
														var str = "";
														valArgs.map((x, j) => {
															if (arg.id == x.id) {
																if (arg.id == "scale") {
																	str +=
																		x.id + "(" + valPartsX + "," + newVal + ") ";
																}
																if (arg.id == "translate") {
																	str +=
																		x.id +
																		"(" +
																		valPartsX +
																		valPartsXUnit +
																		"," +
																		newVal +
																		argValYUnit +
																		") ";
																}
																if (arg.id == "skew") {
																	str +=
																		x.id +
																		"(" +
																		valPartsX +
																		"deg," +
																		newVal +
																		"deg) ";
																}
															} else {
																str += x.id + "(" + x.val + ") ";
															}
														});
														props.onChange(str, "transform");
													}}
												/>
												<span className="w-2/6">
													{arg.id == "translate" && (
														<>
															<SelectControl
																label=""
																value={
																	arg.val.split(",")[1].match(/[%a-zA-Z]+/g) ==
																		null
																		? 0
																		: arg.val
																			.split(",")[1]
																			.match(/[%a-zA-Z]+/g)[0]
																}
																options={[
																	{ label: "PX", value: "px" },
																	{ label: "EM", value: "em" },
																	{ label: "REM", value: "rem" },
																	{ label: "%", value: "%" },
																]}
																onChange={(newVal) => {
																	var str = "";
																	valArgs.map((x, j) => {
																		if (arg.id == x.id) {
																			if (arg.id == "translate") {
																				var argValX =
																					arg.val.split(",")[0].match(/-?\d+/g) ==
																						null
																						? 1
																						: arg.val
																							.split(",")[0]
																							.match(/-?\d+/g)[0];
																				var argValXUnit =
																					arg.val
																						.split(",")[0]
																						.match(/[%a-zA-Z]+/g) == null
																						? "px"
																						: arg.val
																							.split(",")[0]
																							.match(/[%a-zA-Z]+/g)[0];
																				var argValY =
																					arg.val.split(",")[1].match(/-?\d+/g) ==
																						null
																						? 1
																						: arg.val
																							.split(",")[1]
																							.match(/-?\d+/g)[0];
																				var argValYUnit =
																					arg.val
																						.split(",")[1]
																						.match(/[%a-zA-Z]+/g) == null
																						? "px"
																						: arg.val
																							.split(",")[1]
																							.match(/[%a-zA-Z]+/g)[0];
																				str +=
																					x.id +
																					"(" +
																					argValX +
																					argValXUnit +
																					"," +
																					argValY +
																					newVal +
																					") ";
																				//str += x.id + '(' + argVal + newVal + ') ';
																			}
																		} else {
																			str += x.id + "(" + x.val + ") ";
																		}
																	});
																	props.onChange(str, "transform");
																}}
															/>
														</>
													)}
													{arg.id == "skew" && "deg"}
												</span>
											</PanelRow>
										</div>
									</>
								)}
							{(arg.id == "translate3d" ||
								arg.id == "scale3d" ||
								arg.id == "rotate3d") && (
									<>
										<PanelRow>
											<label htmlFor="">{__("X Value", "combo-blocks")}</label>
											<InputControl
												value={
													arg.val.split(",")[0].match(/-?\d+/g) == null
														? 0
														: arg.val.split(",")[0].match(/-?\d+/g)[0]
												}
												type="number"
												onChange={(newVal) => {
													//var argVal = arg.val != undefined ? arg.val.match(/-?\d+/g)[0] : 1;
													//var argUnit = arg.val != undefined ? arg.val.match(/[a-zA-Z]+/g)[0] : '';
													if (parseInt(newVal) == NaN) {
														return;
													}
													// var valPartsX = arg.val.split(",")[0].match(/-?\d+/g)[0];
													// var valPartsXUnit = arg.val.split(",")[0].match(/[a-zA-Z]+/g)[0];
													// var valPartsY = arg.val.split(",")[1].match(/-?\d+/g)[0];
													// var valPartsYUnit = arg.val.split(",")[1].match(/[a-zA-Z]+/g)[0];
													// var valPartsZ = arg.val.split(",")[2].match(/-?\d+/g)[0];
													// var valPartsZUnit = arg.val.split(",")[2].match(/[a-zA-Z]+/g)[0];
													var valPartsX =
														arg.val.split(",")[0].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[0].match(/-?\d+/g)[0];
													var valPartsXUnit =
														arg.val.split(",")[0].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[0].match(/[a-zA-Z]+/g)[0];
													var valPartsY =
														arg.val.split(",")[1].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[1].match(/-?\d+/g)[0];
													var valPartsYUnit =
														arg.val.split(",")[1].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[1].match(/[a-zA-Z]+/g)[0];
													var valPartsZ =
														arg.val.split(",")[2].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[2].match(/-?\d+/g)[0];
													var valPartsZUnit =
														arg.val.split(",")[2].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[2].match(/[a-zA-Z]+/g)[0];
													var str = "";
													valArgs.map((x, j) => {
														if (arg.id == x.id) {
															if (arg.id == "scale3d") {
																str +=
																	x.id +
																	"(" +
																	newVal +
																	"," +
																	valPartsY +
																	"," +
																	valPartsZ +
																	") ";
															}
															if (arg.id == "translate3d") {
																str +=
																	x.id +
																	"(" +
																	newVal +
																	valPartsXUnit +
																	"," +
																	valPartsY +
																	valPartsYUnit +
																	"," +
																	valPartsZ +
																	valPartsZUnit +
																	") ";
															}
															if (arg.id == "rotate3d") {
																var valPartsA = arg.val
																	.split(",")[2]
																	.match(/-?\d+/g)[0];
																str +=
																	x.id +
																	"(" +
																	newVal +
																	"," +
																	valPartsY +
																	"," +
																	valPartsZ +
																	"," +
																	valPartsA +
																	"deg) ";
															}
														} else {
															str += x.id + "(" + x.val + ") ";
														}
													});
													props.onChange(str, "transform");
												}}
											/>
											<span>
												{arg.id == "translate3d" && (
													<>
														<SelectControl
															label=""
															value={
																arg.val.split(",")[0].match(/[%a-zA-Z]+/g)[0]
															}
															options={[
																{ label: "PX", value: "px" },
																{ label: "EM", value: "em" },
																{ label: "REM", value: "rem" },
																{ label: "%", value: "%" },
															]}
															onChange={(newVal) => {
																var str = "";
																valArgs.map((x, j) => {
																	if (arg.id == x.id) {
																		if (arg.id == "translate3d") {
																			// var valPartsX = arg.val.split(",")[0].match(/-?\d+/g)[0];
																			// var valPartsXUnit = arg.val.split(",")[0].match(/[a-zA-Z]+/g)[0];
																			// var valPartsY = arg.val.split(",")[1].match(/-?\d+/g)[0];
																			// var valPartsYUnit = arg.val.split(",")[1].match(/[a-zA-Z]+/g)[0];
																			// var valPartsZ = arg.val.split(",")[2].match(/-?\d+/g)[0];
																			// var valPartsZUnit = arg.val.split(",")[2].match(/[a-zA-Z]+/g)[0];
																			var valPartsX =
																				arg.val.split(",")[0].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[0]
																						.match(/-?\d+/g)[0];
																			var valPartsXUnit =
																				arg.val
																					.split(",")[0]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[0]
																						.match(/[a-zA-Z]+/g)[0];
																			var valPartsY =
																				arg.val.split(",")[1].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[1]
																						.match(/-?\d+/g)[0];
																			var valPartsYUnit =
																				arg.val
																					.split(",")[1]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[1]
																						.match(/[a-zA-Z]+/g)[0];
																			var valPartsZ =
																				arg.val.split(",")[2].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[2]
																						.match(/-?\d+/g)[0];
																			var valPartsZUnit =
																				arg.val
																					.split(",")[2]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[2]
																						.match(/[a-zA-Z]+/g)[0];
																			str +=
																				x.id +
																				"(" +
																				valPartsX +
																				newVal +
																				"," +
																				valPartsY +
																				valPartsYUnit +
																				"," +
																				valPartsZ +
																				valPartsZUnit +
																				") ";
																		}
																	} else {
																		str += x.id + "(" + x.val + ") ";
																	}
																});
																props.onChange(str, "transform");
															}}
														/>
													</>
												)}
											</span>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">{__("Y Value", "combo-blocks")}</label>
											<InputControl
												value={
													arg.val.split(",")[1].match(/-?\d+/g) == null
														? 0
														: arg.val.split(",")[1].match(/-?\d+/g)[0]
												}
												type="number"
												onChange={(newVal) => {
													if (parseInt(newVal) == NaN) {
														return;
													}
													var valPartsX =
														arg.val.split(",")[0].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[0].match(/-?\d+/g)[0];
													var valPartsXUnit =
														arg.val.split(",")[0].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[0].match(/[a-zA-Z]+/g)[0];
													var valPartsY =
														arg.val.split(",")[1].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[1].match(/-?\d+/g)[0];
													var valPartsYUnit =
														arg.val.split(",")[1].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[1].match(/[a-zA-Z]+/g)[0];
													var valPartsZ =
														arg.val.split(",")[2].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[2].match(/-?\d+/g)[0];
													var valPartsZUnit =
														arg.val.split(",")[2].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[2].match(/[a-zA-Z]+/g)[0];
													var str = "";
													valArgs.map((x, j) => {
														if (arg.id == x.id) {
															if (arg.id == "scale3d") {
																str +=
																	x.id +
																	"(" +
																	valPartsX +
																	"," +
																	newVal +
																	"," +
																	valPartsZ +
																	") ";
															}
															if (arg.id == "translate3d") {
																str +=
																	x.id +
																	"(" +
																	valPartsX +
																	valPartsXUnit +
																	"," +
																	newVal +
																	valPartsYUnit +
																	"," +
																	valPartsZ +
																	valPartsZUnit +
																	") ";
															}
															if (arg.id == "rotate3d") {
																var valPartsA = arg.val
																	.split(",")[3]
																	.match(/-?\d+/g)[0];
																str +=
																	x.id +
																	"(" +
																	valPartsX +
																	"," +
																	newVal +
																	"," +
																	valPartsZ +
																	"," +
																	valPartsA +
																	"deg) ";
															}
														} else {
															str += x.id + "(" + x.val + ") ";
														}
													});
													props.onChange(str, "transform");
												}}
											/>
											<span>
												{arg.id == "translate3d" && (
													<>
														<SelectControl
															label=""
															value={
																arg.val.split(",")[1].match(/[%a-zA-Z]+/g)[0]
															}
															options={[
																{ label: "PX", value: "px" },
																{ label: "EM", value: "em" },
																{ label: "REM", value: "rem" },
																{ label: "%", value: "%" },
															]}
															onChange={(newVal) => {
																var str = "";
																valArgs.map((x, j) => {
																	if (arg.id == x.id) {
																		if (arg.id == "translate3d") {
																			var valPartsX =
																				arg.val.split(",")[0].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[0]
																						.match(/-?\d+/g)[0];
																			var valPartsXUnit =
																				arg.val
																					.split(",")[0]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[0]
																						.match(/[a-zA-Z]+/g)[0];
																			var valPartsY =
																				arg.val.split(",")[1].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[1]
																						.match(/-?\d+/g)[0];
																			var valPartsYUnit =
																				arg.val
																					.split(",")[1]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[1]
																						.match(/[a-zA-Z]+/g)[0];
																			var valPartsZ =
																				arg.val.split(",")[2].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[2]
																						.match(/-?\d+/g)[0];
																			var valPartsZUnit =
																				arg.val
																					.split(",")[2]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[2]
																						.match(/[a-zA-Z]+/g)[0];
																			str +=
																				x.id +
																				"(" +
																				valPartsX +
																				valPartsXUnit +
																				"," +
																				valPartsY +
																				newVal +
																				"," +
																				valPartsZ +
																				valPartsZUnit +
																				") ";
																		}
																	} else {
																		str += x.id + "(" + x.val + ") ";
																	}
																});
																props.onChange(str, "transform");
															}}
														/>
													</>
												)}
												{arg.id == "skew" && "deg"}
											</span>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">{__("Z Value", "combo-blocks")}</label>
											<InputControl
												value={
													arg.val.split(",")[2].match(/-?\d+/g) == null
														? 0
														: arg.val.split(",")[2].match(/-?\d+/g)[0]
												}
												type="number"
												onChange={(newVal) => {
													if (parseInt(newVal) == NaN) {
														return;
													}
													// var valPartsX = arg.val.split(",")[0].match(/-?\d+/g)[0];
													// var valPartsY = arg.val.split(",")[1].match(/-?\d+/g)[0];
													// var valPartsZ = arg.val.split(",")[2].match(/-?\d+/g)[0];
													var valPartsX =
														arg.val.split(",")[0].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[0].match(/-?\d+/g)[0];
													var valPartsXUnit =
														arg.val.split(",")[0].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[0].match(/[a-zA-Z]+/g)[0];
													var valPartsY =
														arg.val.split(",")[1].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[1].match(/-?\d+/g)[0];
													var valPartsYUnit =
														arg.val.split(",")[1].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[1].match(/[a-zA-Z]+/g)[0];
													var valPartsZ =
														arg.val.split(",")[2].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[2].match(/-?\d+/g)[0];
													var valPartsZUnit =
														arg.val.split(",")[2].match(/[a-zA-Z]+/g) == null
															? "px"
															: arg.val.split(",")[2].match(/[a-zA-Z]+/g)[0];
													// var valPartsX = arg.val.split(",")[0].match(/-?\d+/g)[0];
													// var valPartsXUnit = arg.val.split(",")[0].match(/[a-zA-Z]+/g)[0];
													// var valPartsY = arg.val.split(",")[1].match(/-?\d+/g)[0];
													// var valPartsYUnit = arg.val.split(",")[1].match(/[a-zA-Z]+/g)[0];
													// var valPartsZ = arg.val.split(",")[2].match(/-?\d+/g)[0];
													// var valPartsZUnit = arg.val.split(",")[2].match(/[a-zA-Z]+/g)[0];
													var str = "";
													valArgs.map((x, j) => {
														if (arg.id == x.id) {
															if (arg.id == "scale3d") {
																str +=
																	x.id +
																	"(" +
																	valPartsX +
																	"," +
																	valPartsY +
																	"," +
																	newVal +
																	") ";
															}
															if (arg.id == "translate3d") {
																str +=
																	x.id +
																	"(" +
																	valPartsX +
																	valPartsXUnit +
																	"," +
																	valPartsY +
																	valPartsYUnit +
																	"," +
																	newVal +
																	valPartsZUnit +
																	") ";
															}
															if (arg.id == "rotate3d") {
																var valPartsA = arg.val
																	.split(",")[3]
																	.match(/-?\d+/g)[0];
																str +=
																	x.id +
																	"(" +
																	valPartsX +
																	"," +
																	valPartsY +
																	"," +
																	newVal +
																	"," +
																	valPartsA +
																	"deg) ";
															}
														} else {
															str += x.id + "(" + x.val + ") ";
														}
													});
													props.onChange(str, "transform");
												}}
											/>
											<span>
												{arg.id == "translate3d" && (
													<>
														<SelectControl
															label=""
															value={
																arg.val.split(",")[2].match(/[%a-zA-Z]+/g)[0]
															}
															options={[
																{ label: "PX", value: "px" },
																{ label: "EM", value: "em" },
																{ label: "REM", value: "rem" },
																{ label: "%", value: "%" },
															]}
															onChange={(newVal) => {
																var str = "";
																valArgs.map((x, j) => {
																	if (arg.id == x.id) {
																		if (arg.id == "translate3d") {
																			var valPartsX =
																				arg.val.split(",")[0].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[0]
																						.match(/-?\d+/g)[0];
																			var valPartsXUnit =
																				arg.val
																					.split(",")[0]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[0]
																						.match(/[a-zA-Z]+/g)[0];
																			var valPartsY =
																				arg.val.split(",")[1].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[1]
																						.match(/-?\d+/g)[0];
																			var valPartsYUnit =
																				arg.val
																					.split(",")[1]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[1]
																						.match(/[a-zA-Z]+/g)[0];
																			var valPartsZ =
																				arg.val.split(",")[2].match(/-?\d+/g) ==
																					null
																					? 0
																					: arg.val
																						.split(",")[2]
																						.match(/-?\d+/g)[0];
																			var valPartsZUnit =
																				arg.val
																					.split(",")[2]
																					.match(/[a-zA-Z]+/g) == null
																					? "px"
																					: arg.val
																						.split(",")[2]
																						.match(/[a-zA-Z]+/g)[0];
																			// var valPartsX = arg.val.split(",")[0].match(/-?\d+/g)[0];
																			// var valPartsXUnit = arg.val.split(",")[0].match(/[a-zA-Z]+/g)[0];
																			// var valPartsY = arg.val.split(",")[1].match(/-?\d+/g)[0];
																			// var valPartsYUnit = arg.val.split(",")[1].match(/[a-zA-Z]+/g)[0];
																			// var valPartsZ = arg.val.split(",")[2].match(/-?\d+/g)[0];
																			// var valPartsZUnit = arg.val.split(",")[2].match(/[a-zA-Z]+/g)[0];
																			str +=
																				x.id +
																				"(" +
																				valPartsX +
																				valPartsXUnit +
																				"," +
																				valPartsY +
																				valPartsYUnit +
																				"," +
																				valPartsZ +
																				newVal +
																				") ";
																		}
																	} else {
																		str += x.id + "(" + x.val + ") ";
																	}
																});
																props.onChange(str, "transform");
															}}
														/>
													</>
												)}
												{arg.id == "skew" && "deg"}
											</span>
										</PanelRow>
										{arg.id == "rotate3d" && (
											<PanelRow>
												<label htmlFor="">{__("Angle", "combo-blocks")}</label>
												<InputControl
													value={
														arg.val.split(",")[3].match(/-?\d+/g) == null
															? 0
															: arg.val.split(",")[3].match(/-?\d+/g)[0]
													}
													type="number"
													onChange={(newVal) => {
														if (parseInt(newVal) == NaN) {
															return;
														}
														var valPartsX =
															arg.val.split(",")[0].match(/-?\d+/g) == null
																? 0
																: arg.val.split(",")[0].match(/-?\d+/g)[0];
														var valPartsY =
															arg.val.split(",")[1].match(/-?\d+/g) == null
																? 0
																: arg.val.split(",")[1].match(/-?\d+/g)[0];
														var valPartsZ =
															arg.val.split(",")[2].match(/-?\d+/g) == null
																? 0
																: arg.val.split(",")[2].match(/-?\d+/g)[0];
														var str = "";
														valArgs.map((x, j) => {
															if (arg.id == x.id) {
																if (arg.id == "scale3d") {
																	str +=
																		x.id +
																		"(" +
																		valPartsX +
																		"," +
																		valPartsY +
																		"," +
																		valPartsZ +
																		") ";
																}
																if (arg.id == "translate3d") {
																	str +=
																		x.id +
																		"(" +
																		valPartsX +
																		"px," +
																		valPartsY +
																		"px," +
																		valPartsZ +
																		"px) ";
																}
																if (arg.id == "rotate3d") {
																	str +=
																		x.id +
																		"(" +
																		valPartsX +
																		"," +
																		valPartsY +
																		"," +
																		valPartsZ +
																		"," +
																		newVal +
																		"deg) ";
																}
															} else {
																str += x.id + "(" + x.val + ") ";
															}
														});
														props.onChange(str, "transform");
													}}
												/>
												<span>{arg.id == "rotate3d" && "deg"}</span>
											</PanelRow>
										)}
									</>
								)}
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
