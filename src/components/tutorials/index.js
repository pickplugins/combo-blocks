const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import {
	Panel,
	PanelRow,
	PanelItem,
	Button,
	Dropdown,
	SelectControl,
	Popover,
} from "@wordpress/components";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";
import apiFetch from "@wordpress/api-fetch";
class PGTutorials extends Component {
	render() {
		var { slug } = this.props;
		function Html(props) {
			const [filteredLinks, setfilteredLinks] = useState([]);
			const [keyword, setKeyword] = useState("");
			const [docsData, setDocsData] = useState("");
			const [loading, setloading] = useState(false);
			const [links, setLinks] = useState([]);
			useEffect(() => {
				if (keyword.length > 3) {

					fetch(
						`https://comboblocks.com/server/wp-json/combo-blocks/v2/get_post_docs?category=${slug}&keyword=${keyword}`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json;charset=utf-8",
							},
						}
					)
						.then((response) => {
							if (response.ok && response.status < 400) {
								response.json().then((data) => {
									var tutorialsLinks = [];
									data.posts.map((x) => {
										tutorialsLinks.push({
											label: x.post_title,
											url: x.url,
											isVideo: false,
										});
									});
								});
								setLinks(tutorialsLinks);
							}
						})
						.catch((_error) => {
							//this.saveAsStatus = 'error';
							// handle the error
						});
				}
			}, [keyword]);
			return (
				<div className="my-2">
					<div>
						<InputControl
							type="text"
							className="w-full rounded-none px-3 py-3"
							placeholder="Search Tutorials"
							value={keyword}
							onChange={(newVal) => {

								setKeyword(newVal);
								setfilteredLinks([]);
								var newLinks = [];
								var xLink = links.map((x, index) => {
									var linkObj = {};
									let position = x.label
										.toLowerCase()
										.search(newVal.toLowerCase());
									if (position < 0) {
										linkObj.exclude = true;
									} else {
										linkObj.exclude = false;
									}
									if (newVal.length > 0) {
										let label = x.label.replace(
											newVal,
											"<span className='bg-amber-500'>" + newVal + "</span>"
										);
										linkObj.label = label;
									} else {
										linkObj.label = x.label;
									}
									linkObj = {
										...x,
										exclude: linkObj.exclude,
										label: linkObj.label,
									};
									return linkObj;
									//newLinks.push(x);
								});
								setfilteredLinks(xLink);
							}}
						/>
					</div>
					<div className="my-5">
						{keyword.length == 0 &&
							links.map((link) => {
								return (
									<>
										{link.url.length > 0 && (
											<a
												className="block my-1 text-[14px] hover:underline"
												href={link.url}
												target="_blank">
												<span className="dashicons dashicons-editor-help"></span>{" "}
												{link.label}
											</a>
										)}
									</>
								);
							})}
						{keyword.length > 0 &&
							filteredLinks.map((link) => {
								if (link.exclude === false) {
									return (
										<>
											{link.url.length > 0 && (
												<a
													className="block my-1 text-[14px] hover:underline"
													href={link.url}
													target="_blank">
													<span className="dashicons dashicons-editor-help"></span>{" "}
													{link.label}
												</a>
											)}
										</>
									);
								}
							})}
					</div>
				</div>
			);
		}
		return (
			<>
				<Html />
			</>
		);
	}
}
export default PGTutorials;
