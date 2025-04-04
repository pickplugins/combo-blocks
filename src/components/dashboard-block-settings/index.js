const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";

import { applyFilters } from "@wordpress/hooks";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	edit,
	copy,
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
import PGtoggle from "../toggle";
var myStore = wp.data.select("ComboBlocksStore");
const PGDashboardBlockSettings = (props) => {
	const [blockSettings, setblockSettings] = useState(props.args);
	useEffect(() => {
		props.onChange(blockSettings);
	}, [blockSettings]);
	var formWrap = blockSettings?.formWrap;
	var allowedUserMetaKeys =
		formWrap.allowedUserMetaKeys == undefined
			? []
			: formWrap.allowedUserMetaKeys;
	var allowedPostMetaKeys =
		formWrap.allowedPostMetaKeys == undefined
			? []
			: formWrap?.allowedPostMetaKeys;
	var allowedTermMetaKeys =
		formWrap.allowedTermMetaKeys == undefined
			? []
			: formWrap.allowedTermMetaKeys;
	var allowedCommentMetaKeys =
		formWrap.allowedCommentMetaKeys == undefined
			? []
			: formWrap.allowedCommentMetaKeys;
	return (
		<div className="">
			<PGtoggle
				className="font-medium text-slate-900 "
				title="Form Builder"
				initialOpen={false}>
				<div className="flex flex-col gap-2">
					<div className="border p-3 border-solid border-indigo-300 rounded-md">
						<PanelRow className="gap-4 !justify-start">
							<label htmlFor="">{__("Allowed User Meta Keys", "combo-blocks")}</label>
							<div
								className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var allowedUserMetaKeysX = [...allowedUserMetaKeys];
									allowedUserMetaKeysX.push("");
									setblockSettings({
										...blockSettings,
										formWrap: {
											...formWrap,
											allowedUserMetaKeys: allowedUserMetaKeysX,
										},
									});
								}}>
								{__("Add", "combo-blocks")}
							</div>
						</PanelRow>
						<div className="flex flex-col gap-3 justify-start">
							{allowedUserMetaKeys != undefined &&
								allowedUserMetaKeys.map((item, index) => {
									return (
										<div className="flex items-center gap-2">
											<span
												className="cursor-pointer hover:bg-red-500 bg-red-400 py-1 px-[10px] text-lg leading-normal"
												onClick={(ev) => {
													var allowedUserMetaKeysX = [...allowedUserMetaKeys];
													allowedUserMetaKeysX.splice(index, 1);
													setblockSettings({
														...blockSettings,
														formWrap: {
															...formWrap,
															allowedUserMetaKeys: allowedUserMetaKeysX,
														},
													});
												}}>
												{/* <Icon icon={close} /> */}
												&times;
											</span>
											<div>
												<InputControl
													value={item}
													className="min-w-[320px]"
													onChange={(newVal) => {
														var allowedUserMetaKeysX = [...allowedUserMetaKeys];
														allowedUserMetaKeysX[index] = newVal;
														setblockSettings({
															...blockSettings,
															formWrap: {
																...formWrap,
																allowedUserMetaKeys: allowedUserMetaKeysX,
															},
														});
													}}
												/>
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="border p-3 border-solid border-indigo-300 rounded-md">
						<PanelRow className="gap-4 !justify-start">
							<label htmlFor="">{__("Allowed Post Meta Keys", "combo-blocks")}</label>
							<div
								className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var allowedPostMetaKeysX = [...allowedPostMetaKeys];
									allowedPostMetaKeysX.push("");
									setblockSettings({
										...blockSettings,
										formWrap: {
											...formWrap,
											allowedPostMetaKeys: allowedPostMetaKeysX,
										},
									});
								}}>
								{__("Add", "combo-blocks")}
							</div>
						</PanelRow>
						<div className="flex flex-col gap-3 justify-start">
							{allowedPostMetaKeys != undefined &&
								allowedPostMetaKeys.map((item, index) => {
									return (
										<div className="flex items-center gap-2">
											<span
												className="cursor-pointer hover:bg-red-500 bg-red-400 py-1 px-[10px] text-lg leading-normal"
												onClick={(ev) => {
													var allowedPostMetaKeysX = [...allowedPostMetaKeys];
													allowedPostMetaKeysX.splice(index, 1);
													setblockSettings({
														...blockSettings,
														formWrap: {
															...formWrap,
															allowedPostMetaKeys: allowedPostMetaKeysX,
														},
													});
												}}>
												{/* <Icon icon={close} /> */}
												&times;
											</span>
											<div>
												<InputControl
													value={item}
													className="min-w-[320px]"
													onChange={(newVal) => {
														var allowedPostMetaKeysX = [...allowedPostMetaKeys];
														allowedPostMetaKeysX[index] = newVal;
														setblockSettings({
															...blockSettings,
															formWrap: {
																...formWrap,
																allowedPostMetaKeys: allowedPostMetaKeysX,
															},
														});
													}}
												/>
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="border p-3 border-solid border-indigo-300 rounded-md">
						<PanelRow className="gap-4 !justify-start">
							<label htmlFor="">{__("Allowed Term Meta Keys", "combo-blocks")}</label>
							<div
								className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var allowedTermMetaKeysX = [...allowedTermMetaKeys];
									allowedTermMetaKeysX.push("");
									setblockSettings({
										...blockSettings,
										formWrap: {
											...formWrap,
											allowedTermMetaKeys: allowedTermMetaKeysX,
										},
									});
								}}>
								{__("Add", "combo-blocks")}
							</div>
						</PanelRow>
						<div className="flex flex-col gap-3 justify-start">
							{allowedTermMetaKeys != undefined &&
								allowedTermMetaKeys.map((item, index) => {
									return (
										<div className="flex items-center gap-2">
											<span
												className="cursor-pointer hover:bg-red-500 bg-red-400 py-1 px-[10px] text-lg leading-normal"
												onClick={(ev) => {
													var allowedTermMetaKeysX = [...allowedTermMetaKeys];
													allowedTermMetaKeysX.splice(index, 1);
													setblockSettings({
														...blockSettings,
														formWrap: {
															...formWrap,
															allowedTermMetaKeys: allowedTermMetaKeysX,
														},
													});
												}}>
												{/* <Icon icon={close} /> */}
												&times;
											</span>
											<div>
												<InputControl
													value={item}
													className="min-w-[320px]"
													onChange={(newVal) => {
														var allowedTermMetaKeysX = [...allowedTermMetaKeys];
														allowedTermMetaKeysX[index] = newVal;
														setblockSettings({
															...blockSettings,
															formWrap: {
																...formWrap,
																allowedTermMetaKeys: allowedTermMetaKeysX,
															},
														});
													}}
												/>
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="border p-3 border-solid border-indigo-300 rounded-md">
						<PanelRow className="gap-4 !justify-start">
							<label htmlFor="">{__("Allowed Comment Meta Keys", "combo-blocks")}</label>
							<div
								className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var allowedCommentMetaKeysX = [...allowedCommentMetaKeys];
									allowedCommentMetaKeysX.push("");
									setblockSettings({
										...blockSettings,
										formWrap: {
											...formWrap,
											allowedCommentMetaKeys: allowedCommentMetaKeysX,
										},
									});
								}}>
								{__("Add", "combo-blocks")}
							</div>
						</PanelRow>
						<div className="flex flex-col gap-3 justify-start">
							{allowedCommentMetaKeys != undefined &&
								allowedCommentMetaKeys.map((item, index) => {
									return (
										<div className="flex items-center gap-2">
											<span
												className="cursor-pointer hover:bg-red-500 bg-red-400 py-1 px-[10px] text-lg leading-normal"
												onClick={(ev) => {
													var allowedCommentMetaKeysX = [
														...allowedCommentMetaKeys,
													];
													allowedCommentMetaKeysX.splice(index, 1);
													setblockSettings({
														...blockSettings,
														formWrap: {
															...formWrap,
															allowedCommentMetaKeys: allowedCommentMetaKeysX,
														},
													});
												}}>
												{/* <Icon icon={close} /> */}
												&times;
											</span>
											<div>
												<InputControl
													value={item}
													className="min-w-[320px]"
													onChange={(newVal) => {
														var allowedCommentMetaKeysX = [
															...allowedCommentMetaKeys,
														];
														allowedCommentMetaKeysX[index] = newVal;
														setblockSettings({
															...blockSettings,
															formWrap: {
																...formWrap,
																allowedCommentMetaKeys: allowedCommentMetaKeysX,
															},
														});
													}}
												/>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</PGtoggle>
		</div>
	);
};
export default PGDashboardBlockSettings;
