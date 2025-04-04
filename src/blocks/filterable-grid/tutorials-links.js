var tutorialsLinks = [];
fetch("https://comboblocks.com/wp-json/wp/v2/docs", {
    method: "GET",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
})
    .then((response) => {
        if (response.ok && response.status < 400) {
            response.json().then((data) => {
                data.map(x => {
                    tutorialsLinks.push({ label: x.title.rendered, url: x.link, isVideo: false, })
                })
            });
        }
    })
    .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
    });
// const tutorialsLinks = [
//     { label: 'How to add columns?', url: '', isVideo: false, },
//     { label: 'How to disable pagination?', url: '', isVideo: false, },
//     { label: 'How to customize pagination style?', url: '', isVideo: false, },
//     { label: 'How to display normal pagination?', url: '', isVideo: false, },
//     { label: 'How to display next-previous pagination?', url: '', isVideo: false, },
//     { label: 'How to display ajax pagination?', url: '', isVideo: false, },
//     { label: 'How to enable infinte loading?', url: '', isVideo: false, },
//     { label: 'How to query post by post status?', url: '', isVideo: false, },
//     { label: 'How to add rows?', url: '', isVideo: false, },
//     { label: 'How to enable load more?', url: '', isVideo: false, },
//     { label: 'How to enable lazy loading?', url: '', isVideo: true, },
//     { label: 'How to custoize post grid container', url: '', isVideo: false, },
//     { label: 'How to customize post grid loop wrapper?', url: '', isVideo: false, },
//     { label: 'How to query post by post types?', url: '', isVideo: false, },
//     { label: 'How to query posts by custom post types?', url: '', isVideo: false, },
//     { label: 'How to query post by categories?', url: '', isVideo: false, },
//     { label: 'How to query post by tags?', url: '', isVideo: false, },
//     { label: 'How to query post by custom taxonomies & terms?', url: '', isVideo: false, },
//     { label: 'How to query post by custom meta fields?', url: '', isVideo: false, },
//     { label: 'How to query post by search parameter?', url: '', isVideo: false, },
//     { label: 'How to query post by order & orderby?', url: '', isVideo: false, },
//     { label: 'How to query post by date?', url: '', isVideo: false, },
//     { label: 'How to query post by author?', url: '', isVideo: false, },
//     { label: 'How to query post by post ids?', url: '', isVideo: false, },
//     { label: 'How to query post by post parents?', url: '', isVideo: false, },
//     { label: 'How to query post by post passwords?', url: '', isVideo: false, },
//     { label: 'How to customize layouts?', url: '', isVideo: false, },
//     { label: 'How to customize grid layout?', url: '', isVideo: false, },
//     { label: 'How to create complex grid layout?', url: '', isVideo: false, },
// ];
export default tutorialsLinks;