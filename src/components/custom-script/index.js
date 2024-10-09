const { Component } = wp.element;
import { Button, Dropdown } from "@wordpress/components";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	edit,
	pen,
} from "@wordpress/icons";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { useSelect } from "@wordpress/data";

import {
	__experimentalInputControl as InputControl,
	Popover,
	Spinner,
	PanelBody,
	ToggleControl,
	PanelRow,
	ColorPalette,
	RangeControl,
	TextareaControl,
} from "@wordpress/components";
import PGStyles from "../styles";
import PGDropdown from "../dropdown";

var myStore = wp.data.select("postgrid-shop");

const PGCustomScript = (props) => {
	const [customScript, setCustomScript] = useState(props.args);



	useEffect(() => {
		props.onChange(customScript);
	}, [customScript]);

	var RemoveVisibleGroup = function ({ title, index }) {
		return (
			<>
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white "
					onClick={(ev) => {
						const updatedCustomScript = [...customScript];
						updatedCustomScript.splice(index, 1);
						setCustomScript(updatedCustomScript);
					}}>
					<Icon icon={close} />
				</span>
				<span>{customScript[index].title.length > 0 ? <>{customScript[index].title}</> : <>{index}</>}</span>
			</>
		);
	};

	const fieldArgs = [
		{
			param: "post_type",
			operator: "==",
			value: "post",
		},
	];
	const fieldArgsValue = {
		param: "post_type",
		operator: "==",
		value: "post",
	};
	return (
		<div className="">
			{/* <PanelBody
				className="font-medium text-slate-900 "
				title="Custom Script"
				initialOpen={true}> */}
			<div
				className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-indigo-400 text-white font-medium rounded hover:bg-indigo-500 hover:text-white focus:outline-none focus:bg-gray-700"
				onClick={(ev) => {
					var visibleX = [...customScript];

					var index = Object.entries(visibleX).length;

					visibleX[index] = { relation: "OR", title: "", args: [], script: "" };

					setCustomScript(visibleX);
				}}>
				Add Group
			</div>
			<div className="my-4">
				{Object.entries(customScript).map((group, groupIndex) => {
					var groupId = group[0];
					var groupData = group[1];

					return (
						<PanelBody
							title={<RemoveVisibleGroup title={groupIndex} index={groupId} />}
							initialOpen={false}>
							<PanelRow className="my-3 justify-start gap-5">
								<div>
									<label htmlFor="">Group Title</label>
									<input type="text" value={customScript[groupIndex].title} onChange={(ev) => {
										var visibleX = [...customScript];
										visibleX[groupIndex].title = ev.target.value;
										setCustomScript(visibleX);
									}} />
								</div>
								<div
									className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-indigo-400 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
									onClick={(option, index) => {
										var visibleX = [...customScript];

										visibleX[groupId]["args"].push(fieldArgs);
										setCustomScript(visibleX);
									}}>
									Add Condition
								</div>
							</PanelRow>
							{customScript[groupId]["args"] != undefined &&
								customScript[groupId]["args"].length == 0 && (
									<p>Add Condition to show script.</p>
								)}
							{customScript[groupId]["args"] != undefined &&
								customScript[groupId]["args"].map((item, index) => {
									return (
										<>
											<div className="flex flex-col gap-3 mb-4 p-3 px-5 border border-[#e0e0e0] border-solid  rounded ">
												<div className="flex gap-4 items-start ">
													<div
														className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
														onClick={(ev) => {
															const updatedCustomScript = [...customScript];
															updatedCustomScript[groupId].args.splice(
																index,
																1
															);

															setCustomScript(updatedCustomScript);
														}}>
														<span className="text-[20px] text-white ">
															&times;
														</span>
													</div>
													<div
														className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-indigo-400 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
														onClick={(ev) => {
															var visibleX = [...customScript];

															visibleX[groupId]["args"][index].push(
																fieldArgsValue
															);
															setCustomScript(visibleX);
														}}>
														Add new
													</div>
													<div className="flex-1">
														{customScript[groupId]["args"][index] !=
															undefined &&
															customScript[groupId]["args"][index].map(
																(item, i) => {
																	return (
																		<div className="mb-5 flex gap-4 items-center">
																			<select
																				name="param"
																				value={
																					customScript[groupId].args[index][i]
																						.param
																				}
																				onChange={(event) => {
																					const value = event.target.value;
																					const updatedCustomScript = [
																						...customScript,
																					];
																					updatedCustomScript[groupId].args[
																						index
																					][i].param = value;
																					setCustomScript(updatedCustomScript);
																				}}>
																				<option
																					value="post_type"
																					selected="selected"
																					data-i="0">
																					Post Type
																				</option>
																				<option value="post_template">
																					Post Template
																				</option>
																				<option value="taxonomy">
																					Taxonomy
																				</option>
																			</select>
																			<select
																				name="operator"
																				value={
																					customScript[groupId].args[index][i]
																						.operator
																				}
																				onChange={(event) => {
																					const value = event.target.value;
																					const updatedCustomScript = [
																						...customScript,
																					];
																					updatedCustomScript[groupId].args[
																						index
																					][i].operator = value;
																					setCustomScript(updatedCustomScript);
																				}}>
																				<option value="==">is equal to</option>
																				<option value="!=">
																					is not equal to
																				</option>
																			</select>
																			<select
																				name="value"
																				value={
																					customScript[groupId].args[index][i]
																						.value
																				}
																				onChange={(event) => {
																					const value = event.target.value;
																					const updatedCustomScript = [
																						...customScript,
																					];
																					updatedCustomScript[groupId].args[
																						index
																					][i].value = value;
																					setCustomScript(updatedCustomScript);
																				}}>
																				<option
																					value="post"
																					selected="selected"
																					data-i="0">
																					Post
																				</option>
																				<option value="page">Page</option>
																				<option value="e-landing-page">
																					Landing Page
																				</option>
																				<option value="elementor_library">
																					Template
																				</option>
																				<option value="post_grid">
																					Post Grid
																				</option>
																				<option value="wfacp_checkout">
																					Checkout
																				</option>
																				<option value="product">Product</option>
																				<option value="shop_order">
																					Order
																				</option>
																				<option value="shop_coupon">
																					Coupon
																				</option>
																				<option value="wffn_landing">
																					Sales Page
																				</option>
																				<option value="wffn_ty">
																					Thank You Page
																				</option>
																				<option value="wffn_optin">
																					Optin Page
																				</option>
																				<option value="wffn_oty">
																					Optin Confirmation Page
																				</option>
																				<option value="review">Review</option>
																				<option value="post_grid_template">
																					Saved Template
																				</option>
																				<option value="post_grid_layout">
																					Saved Layout
																				</option>
																				<option value="stackable_temp_post">
																					Default Block
																				</option>
																			</select>
																			<div
																				className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
																				onClick={(ev) => {
																					const updatedCustomScript = [
																						...customScript,
																					];
																					updatedCustomScript[groupId].args[
																						index
																					].splice(i, 1);

																					setCustomScript(updatedCustomScript);
																				}}>
																				<span className="text-[20px] text-white ">
																					{/* &times; */}
																					&minus;
																				</span>
																			</div>
																		</div>
																	);
																}
															)}
													</div>
												</div>
											</div>
										</>
									);
								})}
							<label htmlFor="">Custom Script</label>
							<textarea
								name="script"
								rows="4"
								cols="50"
								onChange={(event) => {
									const value = event.target.value;
									const updatedCustomScript = [...customScript];
									updatedCustomScript[groupId].script = value;
									setCustomScript(updatedCustomScript);
								}}
							/>
						</PanelBody>
					);
				})}
			</div>
			{/* </PanelBody> */}
		</div>
	);
};

export default PGCustomScript;
