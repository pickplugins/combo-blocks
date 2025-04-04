const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";
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
var myStore = wp.data.select("ComboBlocksStore");
const PGroleMaker = (props) => {
	const [roles, setTaxonomies] = useState(props.args);
	useEffect(() => {
		props.onChange(roles);
	}, [roles]);

	function duplicate(index) {
		let duplicatedArray = roles.concat();
		let duplicateObject = JSON.parse(JSON.stringify(duplicatedArray[index]));
		duplicatedArray.push(duplicateObject);
		setTaxonomies(duplicatedArray);
	}
	return (
		<div className="">
			<div
				// className="bg-gray-700 hover:bg-gray-600 my-3 cursor-pointer rounded-sm inline-block text-white px-3 py-1"
				className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
				onClick={(ev) => {
					var sdsd = roles.concat({
						role: "",
						display_name: "",
						description: "This is where you can create and manage %s.",
						public: false,
						args: {}

					});
					setTaxonomies(sdsd);
				}}>
				{__("Add", "combo-blocks")}
			</div>
			{roles != undefined &&
				roles.map((item, index) => {
					//var itemIndex = item[0];
					//var itemArgs = item[1];
					var options = item;
					return (
						<PanelBody
							title={
								<>
									<span
										className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
										onClick={() => {
											var postTypesX = [...roles];
											var sdsd = postTypesX.splice(index, 1);
											setTaxonomies(postTypesX);
										}}>
										<span className="text-[20px] text-white ">&times;</span>
									</span>
									<span
										className="w-[30] h-[30px]  text-lime-500 flex justify-center items-center cursor-pointer "
										onClick={(ev) => {
											ev.preventDefault();
											ev.stopPropagation();
											duplicate(index);
										}}>
										<Icon fill={"#fff"} icon={copy} />
									</span>
									<span className="px-3">{item.display_name}({item.role})</span>
								</>
							}
							initialOpen={false}>
							{/* <InputControl
								className="my-3"
								label=""
								help=""
								placeholder=".element-class or #element-id"
								value={options.name}
								onChange={(value) => {
									// setopenAi({ ...openAi, promt: value })
									//item.options.selector = value
									// globalStyles[index].options.selector = value
									roles[index].options.name = value;
									props.onChange(roles);
								}}
							/> */}

							<div className="grid grid-cols-4 gap-5">

								<div className="flex flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Role", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="student"
										value={options.role}
										onChange={(value) => {
											roles[index].role = value;
											props.onChange(roles);
										}}
									/>
								</div>
								<div className="  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Display name", "combo-blocks")}</label>
									<textarea
										className="my-3 w-full"
										label=""
										help=""
										placeholder="Student"
										value={options.display_name}
										onChange={(event) => {
											const { value } = event.target;
											const updatedPostTypes = [...roles];
											updatedPostTypes[index].display_name = value;
											props.onChange(updatedPostTypes);
										}}
									/>
								</div>
							</div>



							<div className="">






								<div>Super Admin + Administrator + Editor + Author + Contributor + Subscriber
								</div>

								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Read", "combo-blocks")}</label>
									<ToggleControl
										checked={roles[index]?.args?.read ? true : false}
										onChange={(e) => {
											var rolesX = [...roles]
											var args = rolesX[index].args;
											args.read = roles[index]?.args?.read ? false : true

											rolesX[index].args = args;
											props.onChange(rolesX);
										}}
									/>
								</div>




							</div>
							{/* </div> */}
						</PanelBody>
					);
				})}
		</div>
	);
};
export default PGroleMaker;
