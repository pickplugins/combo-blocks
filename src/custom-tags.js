
import { __ } from "@wordpress/i18n";
var customTags = {
	separator: {
		label: __("Separator", "combo-blocks"),
		id: '{separator[" - "]}',
		value: "-",
	},
	currentYear: {
		label: __("Current Year", "combo-blocks"),
		id: '{currentYear["y"]}',
		value: "2023",
	},
	currentMonth: {
		label: __("Current Month", "combo-blocks"),
		id: '{currentMonth["m"]}',
		value: "07",
	},
	currentDay: {
		label: __("Current Day", "combo-blocks"),
		id: '{currentDay["d"]}',
		value: "01",
	},
	currentTime: {
		label: __("Current Time", "combo-blocks"),
		id: '{currentTime["h: i:sa"]}',
		value: "06:00:00:am",
	},
	postPublishDate: {
		label: __("Post Publish Date", "combo-blocks"),
		id: '{postPublishDate["d-m-Y"]}',
		value: "01-01-2023",
	},

	postTitle: {
		label: __("Post Title", "combo-blocks"),
		id: "{postTitle}",
		value: "Post Title",
	},
	postContent: {
		label: __("Post Title", "combo-blocks"),
		id: "{postContent}",
		value: "Post Content",
	},

	postTagsTitle: {
		label: __("Post Tags Title", "combo-blocks"),
		id: '{postTagsTitle["3, -"]}',
		value: "football , cricket",
	},
	postCategoriesTitle: {
		label: __("Post Categories Title", "combo-blocks"),
		id: '{postCategoriesTitle["3, -"]}',
		value: "football , cricket",
	},
	postId: { label: __("Post ID", "combo-blocks"), id: "{postID}", value: "123" },
	excerpt: {
		label: __("Post Excerpt", "combo-blocks"),
		id: "{excerpt}",
		value: "hello excerpt",
	},

	postModifiedDate: {
		label: __("Post Modified Date", "combo-blocks"),
		id: '{postModifiedDate["d - m - Y"]}',
		value: "01-01-2023",
		isPro: true,
	},

	postTagTitle: {
		label: __("Post Tag Title", "combo-blocks"),
		id: "{postTagTitle}",
		value: "sports",
		isPro: true,
	},
	postCategoryTitle: {
		label: __("Post Category Title", "combo-blocks"),
		id: "{postCategoryTitle}",
		value: "sports",
		isPro: true,
	},
	postTermTitle: {
		label: __("Post Term Title", "combo-blocks"),
		id: '{postTermTitle["taxonomy"]}',
		value: "sports",
		isPro: true,
	},
	postTermsTitle: {
		label: __("Post Terms Title", "combo-blocks"),
		id: '{postTermsTitle["taxonomy, 3"]}',
		value: "football , cricket",
		isPro: true,
	},
	postSlug: {
		label: __("Post Slug", "combo-blocks"),
		id: "{postSlug}",
		value: "post-slug",
		isPro: true,
	},
	postType: {
		label: __("Post Type", "combo-blocks"),
		id: "{postType}",
		value: "post",
		isPro: true,
	},
	postStatus: {
		label: __("Post Status", "combo-blocks"),
		id: "{postStatus}",
		value: "published",
		isPro: true,
	},
	postMeta: {
		label: __("Post Meta", "combo-blocks"),
		id: '{postMeta["metaKey"]}',
		value: "meta value",
		isPro: true,
	},
	authorDescription: {
		label: __("Author Description", "combo-blocks"),
		id: "{authorDescription}",
		value: "Hello author description",
	},
	authorId: {
		label: __("Author Id", "combo-blocks"),
		id: "{authorId}",
		value: "123",
	},

	authorName: {
		label: __("Author Name", "combo-blocks"),
		id: "{authorName}",
		value: "hello author",
		isPro: true,
	},
	authorFirstName: {
		label: __("Author FirstName", "combo-blocks"),
		id: "{authorFirstName}",
		value: "first name",
		isPro: true,
	},
	authorLastName: {
		label: __("Author Last Name", "combo-blocks"),
		id: "{authorLastName}",
		value: "last name",
		isPro: true,
	},

	siteTitle: {
		label: __("Site Title", "combo-blocks"),
		id: "{siteTitle}",
		value: "WordPress",
	},
	siteDescription: {
		label: __("Site Description", "combo-blocks"),
		id: "{siteDescription}",
		value: "Hello site description",
	},

	termDescription: {
		label: __("Term Description", "combo-blocks"),
		id: "{termDescription}",
		value: "Hello term description",
	},
	termId: { label: __("Term Id", "combo-blocks"), id: "{termId}", value: "123" },

	termTitle: {
		label: __("Term Title", "combo-blocks"),
		id: "{termTitle}",
		value: "Hello Term Title",
		isPro: true,
	},
	termSlug: {
		label: __("Term Slug", "combo-blocks"),
		id: "{termSlug}",
		value: "term-slug",
		isPro: true,
	},


	termPostCount: {
		label: __("Term Post Count", "combo-blocks"),
		id: "{termPostCount}",
		value: "123",
		isPro: true,
	},

	termParentDescription: {
		label: __("Term Parent Description", "combo-blocks"),
		id: "{termParentDescription}",
		value: "Hello term description",
	},
	termParentId: { label: __("Term Parent Id", "combo-blocks"), id: "{termId}", value: "123" },

	termParentTitle: {
		label: __("Term Parent Title", "combo-blocks"),
		id: "{termParentTitle}",
		value: "Hello Term Title",
		isPro: true,
	},
	termParentPostCount: {
		label: __("Term Parent Post Count", "combo-blocks"),
		id: "{termParentPostCount}",
		value: "123",
		isPro: true,
	},




	currentDate: {
		label: __("Current Date", "combo-blocks"),
		id: '{currentDate["d- m - Y"]}',
		value: "01-01-2023",
		isPro: true,
	},

	rankmathTitle: {
		label: __("Rankmath Title", "combo-blocks"),
		id: "{rankmathTitle}",
		value: "Rank Math Title",
		isPro: true,
	},
	rankmathDescription: {
		label: __("Rankmath Description", "combo-blocks"),
		id: "{rankmathDescription}",
		value: "Rank Math Description",
		isPro: true,
	},
	rankmathFocusKeyword: {
		label: __("Rankmath Focus Keyword", "combo-blocks"),
		id: "{rankmathFocusKeyword}",
		value: "Rank Math Focus Keyword",
		isPro: true,
	},
	rankmathOrgname: {
		label: __("Rankmath Org name", "combo-blocks"),
		id: "{rankmathOrgname}",
		value: "Rank Math Org Name",
		isPro: true,
	},
	rankmathOrgurl: {
		label: __("Rankmath Org URL", "combo-blocks"),
		id: "{rankmathOrgurl}",
		value: "https://hello.world",
		isPro: true,
	},
	rankmathOrglogo: {
		label: __("Rankmath Org logo", "combo-blocks"),
		id: "{rankmathOrglogo}",
		value: "",
		isPro: true,
	},

	searchTerms: {
		label: __("Search Terms", "combo-blocks"),
		id: "{searchTerms}",
		value: "hello search terms",
		isPro: true,
	},


	userDescription: {
		label: __("User Description", "combo-blocks"),
		id: "{userDescription}",
		value: "Hello user description",
	},
	userId: {
		label: __("User Id", "combo-blocks"),
		id: "{userId}",
		value: "123",
	},

	userLogin: {
		label: __("User Login", "combo-blocks"),
		id: "{userLogin}",
		value: "hello user",
		isPro: true,
	},
	userNickname: {
		label: __("User Nickname", "combo-blocks"),
		id: "{userNickname}",
		value: "hello user",
		isPro: true,
	},
	userDisplayname: {
		label: __("User Displayname", "combo-blocks"),
		id: "{userDisplayname}",
		value: "hello user",
		isPro: true,
	},
	userRegisterDate: {
		label: __("User RegisterDate", "combo-blocks"),
		id: '{userRegisterDate["d-m-Y"]}',

		value: "hello user",
		isPro: true,
	},


	userFirstName: {
		label: __("User FirstName", "combo-blocks"),
		id: "{userFirstName}",
		value: "first name",
		isPro: true,
	},
	userLastName: {
		label: __("User Last Name", "combo-blocks"),
		id: "{userLastName}",
		value: "last name",
		isPro: true,
	},











	tutorLmsTotalEnrolled: {
		label: __("Tutor LMS Total Enrolled", "combo-blocks"),
		id: "{tutorLmsTotalEnrolled}",
		value: "123",
		isPro: true,
	},
	tutorLmsCourseDuration: {
		label: __("Tutor LMS - Course Duration", "combo-blocks"),
		id: "{tutorLmsCourseDuration}",
		value: "123",
		isPro: true,
	},
	tutorLmsLastUpdated: {
		label: __("Tutor LMS - Last Updated", "combo-blocks"),
		id: "{tutorLmsLastUpdated}",
		value: "123",
		isPro: true,
	},
	tutorLmsCourseLevel: {
		label: __("Tutor LMS - Course Level", "combo-blocks"),
		id: "{tutorLmsCourseLevel}",
		value: "123",
		isPro: true,
	},
	tutorLmsCourseProgressTotal: {
		label: __("Tutor LMS - Course Progress Total", "combo-blocks"),
		id: "{tutorLmsCourseProgressTotal}",
		value: "123",
		isPro: true,
	},
	tutorLmsCourseProgressCompleted: {
		label: __("Tutor LMS - Course Progress Completed", "combo-blocks"),
		id: "{tutorLmsCourseProgressCompleted}",
		value: "123",
		isPro: true,
	},
	tutorLmsCourseLessonCount: {
		label: __("Tutor LMS - Course lesson count", "combo-blocks"),
		id: "{tutorLmsCourseLessonCount}",
		value: "123",
		isPro: true,
	},
	// tutorLmsInstructorCourseCount: {
	// 	label: __("Tutor LMS - Instructor Course Count", "combo-blocks"),
	// 	id: "{tutorLmsInstructorCourseCount}",
	// 	value: "123",
	// 	isPro: true,
	// },
	// tutorLmsInstructorStudentCount: {
	// 	label: __("Tutor LMS - Instructor Student Count", "combo-blocks"),
	// 	id: "{tutorLmsInstructorStudentCount}",
	// 	value: "123",
	// 	isPro: true,
	// },
	// tutorLmsEnrolledCourseCount: {
	// 	label: __("Tutor LMS - Enrolled Course Count", "combo-blocks"),
	// 	id: "{tutorLmsEnrolledCourseCount}",
	// 	value: "123",
	// 	isPro: true,
	// },
	// tutorLmsCompleteCourseCount: {
	// 	label: __("Tutor LMS - Complete Course Count", "combo-blocks"),
	// 	id: "{tutorLmsCompleteCourseCount}",
	// 	value: "123",
	// 	isPro: true,
	// },



	// rankmathPermalink: {
	// 	label: "Rankmath Permalink",
	// 	id: '{rankmathPermalink}',
	// 	value: "",
	// },
	// rankmathFocusKeywords: {
	// 	label: "Rankmath Focus Keywords",
	// 	id: '{rankmathFocusKeywords[", "]}',
	// 	value: "",
	// },
	// siteTagline: { label: "Site Tagline", id: '{siteTagline}', value: "" },
	// counter: { label: "Counter", id: '{counter}', value: "" },
};
export default customTags;
