'use strict';

/* globals document, $ */

$(document).ready(function () {
});
$(window).on('action:ajaxify.end', function (event, data) {
	var relative_path = config.relative_path
	if (data.tpl_url == 'topic') {
		// $('[component="post"]:nth-child(1)').find('.post-header .pull-left strong:nth-child(1)').append('haha')
		var topics = $('[component="post"]');
		var uids = [];
		for (var i = 1; i <= topics.length; i++) {
			var topic = $('[component="post"]:nth-child(' + i + ')')
			var uid = topic.data('uid');
			uids.push(uid);
		}
		$.post(`${relative_path}/user-level/level-list`, { uid: uids })
			.done(function (res) {
				for (var i = 1; i <= res.length; i++) {
					var topic = $('[component="post"]:nth-child(' + i + ')')
					var description;
					var popoverContent = $('<div/>',{
					})
					if (res[i - 1]['next-level']) {
						description = $('<div/>', {
							class: "small"
						})
						popoverContent.html(`REPUTATION: ${res[i - 1]['reputation']} / ${res[i - 1]['next-level']['min-reputation']}`)
						description.text(`Next level: ${res[i - 1]['next-level']['level-name']}`)
					}
					else {
						description = $('<div/>', {
							class: "small"
						})
						popoverContent.html(`REPUTATION: ${res[i - 1]['reputation']}`)
						description.text(`Highest level`)
					}
					popoverContent.append(description)
					var div = $('<a/>', {
						class: "user-level-topic",
						title: `Level ${res[i - 1]['level-index']}: ${res[i - 1]['level-name']}`,
						'data-toggle': "popover",
						'data-placement': "top",
						'data-content': popoverContent.get(0).outerHTML,
						'data-html': true
					});
					div.html(res[i - 1]['level-name'])
					topic.find('.post-header .pull-left strong:nth-child(1)').prepend(div)
				}
				$('[data-toggle="popover"]').popover();
			})
	}
})

