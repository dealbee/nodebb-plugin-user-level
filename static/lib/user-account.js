$(window).on('action:ajaxify.end', function (event, data) {
    var relative_path = config.relative_path
    if (data.tpl_url == 'account/profile') {
        $.post(`${relative_path}/user-level/level`, { uid: $('.avatar-wrapper').data('uid') })
            .done(function (res) {
                var divStatLable = $('<div/>', {
                    class: 'level-description'
                })
                if (res['next-level']) {
                    // console.log(res)
                    // console.log(res['next-level']['min-reputation'])
                    var diff = res['next-level']['min-reputation'] - res['reputation']
                    divStatLable.text(`${diff} more reputation points to reach level ${res['next-level']['level-name']}`)
                }
                else {
                    divStatLable.text(`Highest level`)
                }
                var divReadNumber = $('<div/>', {
                    class: "level-index"
                })
                var content = $('<div/>', {
                    'data-toggle': "popover",
                    'data-content': divStatLable.get(0).outerHTML,
                    'data-html': true
                })
                content.text(`Level ${res['level-index']}: ${res['level-name']}`)
                divReadNumber.append(content)
                divReadNumber.insertAfter('.profile .fullname')
                $('[data-toggle="popover"]').popover();
            })

    }
})