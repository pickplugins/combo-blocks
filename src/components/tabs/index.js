const { Component, RawHTML, useState } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";
import { Icon, chevronDown, chevronLeft, chevronRight } from "@wordpress/icons";
function MyFunction(props) {
	if (!props.warn) {
		return null;
	}
	var orientation = props.orientation; // vertical, horizontal
	var contentClass = (props.contentClass == undefined) ? "py-3" : props.contentClass;
	var navItemClass = (props.navItemClass == undefined) ? "bg-gray-500 last:border-r-0 border-0 border-r border-solid border-gray-500" : props.navItemClass;
	var navItemSelectedClass = (props.navItemSelectedClass == undefined) ? "!bg-gray-700 " : props.navItemSelectedClass;
	const [selected, setSelected] = useState(props.activeTab);
	const [scrollTo, setscrollTo] = useState(200);
	var content;
	// useEffect(() => {
	// }, [keyword]);
	props.children.map((child) => {
		if (selected == child.props.name) {
			content = child.props.children;
		}
	});
	function scrollPrev() {
		const tabsNavs = document.querySelector(".tabsNavs");
		if (tabsNavs == null) return;
		tabsNavs.scrollBy({
			left: -scrollTo,
			behavior: "smooth",
		});
	}
	function scrollNext() {
		const tabsNavs = document.querySelector(".tabsNavs");
		if (tabsNavs == null) return;
		tabsNavs.scrollBy({
			left: scrollTo,
			behavior: "smooth",
		});
	}
	function onWheel(ev) {
		// ev.preventDefault();
		ev.stopPropagation();
		const tabsNavs = document.querySelector(".tabsNavs");
		tabsNavs?.scrollBy({
			left: ev.deltaY,
			behavior: "smooth",
		});
	}
	return (
		<div className={
			orientation == "vertical"
				? "flex tabsWrapper"
				: "relative tabsWrapper"
		}>
			<div
				className="relative"
			>
				<div
					className={
						orientation == "vertical"
							? "block w-[200px] "
							: "flex overflow-hidden  tabsNavs cursor-move "
					}
					onWheel={onWheel}>
					{props.tabs.map((tab) => {
						return (
							<div
								className={`${navItemClass} ${tab.hidden != null && tab.hidden ? "hidden" : ""}  text-white flex justify-between flex-none    items-center grow     p-2 cursor-pointer hover:bg-gray-600 ${tab.name == selected ? navItemSelectedClass : navItemClass
									} ${orientation == "vertical" ? "       " : "flex-col"}`}
								onClick={(ev) => {
									props.onSelect(tab);
									setSelected(tab.name);
								}}>
								<div
									className={`flex ${orientation == "vertical" ? "" : "flex-col"
										} justify-center items-center`}>
									<Icon
										fill="#fff"
										icon={tab.icon}
										size={24}
										// className="mr-2 w-[20px] text-green-500"
										className=" text-green-500"
									/>
									<span className="text-sm	">{tab.title}</span>
								</div>
								{tab.isPro != null && tab.isPro && (
									<span
										className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
										onClick={(ev) => {
											window.open("https://comboblocks.com/pricing/", "_blank");
										}}>
										{__("Pro", "combo-blocks")}
									</span>
								)}
							</div>
						);
					})}
				</div>
				{orientation != "vertical" && (
					<></>
					// <div className="navs absolute w-full top-1/2 -translate-y-1/2 ">
					// 	<div
					// 		className="navPrev cursor-pointer absolute top-[50%] left-0 -translate-y-2/4  bg-[#ffffff6b]"
					// 		onClick={scrollPrev}>
					// 		<Icon fill="#333" icon={chevronLeft} />
					// 	</div>
					// 	<div
					// 		className="navNext cursor-pointer absolute top-[50%] -translate-y-2/4 right-[-4px]  bg-[#ffffff6b]"
					// 		onClick={scrollNext}>
					// 		<Icon fill="#333" icon={chevronRight} />
					// 	</div>
					// </div>
				)}
			</div>
			<div className={`tabContent  ${contentClass}`}>{content}</div>
		</div>
	);
}
class PGtabs extends Component {
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
			activeTab,
			orientation,
			activeClass,
			contentClass,
			navItemClass,
			navItemSelectedClass,
			onSelect,
			tabs,
			children,
		} = this.props;
		return (
			<div>
				<MyFunction
					children={children}
					tabs={tabs}
					orientation={orientation}
					contentClass={contentClass}
					navItemClass={navItemClass}
					navItemSelectedClass={navItemSelectedClass}
					onSelect={onSelect}
					activeTab={activeTab}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGtabs;
