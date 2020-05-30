$(window).on('action:ajaxify.end', function (event, data) {
    require(['translator'], function (translator) {
        var relative_path = config.relative_path
        if (data.tpl_url == 'account/profile') {
            $.post(`${relative_path}/user-level/level`, { uid: $('.avatar-wrapper').data('uid') })
                .done(function (res) {
                    var translateStr = "[[userlevel:user-account-popover]]$[[userlevel:level]]$[[userlevel:highest-level]]"
                    translator.translate(translateStr, function(translated){
                        var texts = translated.split("$")
                        var divStatLable = $('<div/>', {
                            class: 'level-description'
                        })
                        if (res['next-level']) {
                            // console.log(res)
                            // console.log(res['next-level']['min-reputation'])
                            var diff = res['next-level']['min-reputation'] - res['reputation']
                            divStatLable.text(`${diff} ${texts[0]} ${res['next-level']['level-name']}`)
                        }
                        else {
                            divStatLable.text(`${texts[2]}`)
                        }
                        var divReadNumber = $('<div/>', {
                            class: "level-index"
                        })
                        var content = $('<div/>', {
                            'data-toggle': "popover",
                            'data-content': divStatLable.get(0).outerHTML,
                            'data-html': true
                        })
                        content.text(`${texts[1]} ${res['level-index']}: ${res['level-name']}`)
                        divReadNumber.append(content)
                        divReadNumber.insertAfter('.profile .fullname')
                        $('[data-toggle="popover"]').popover();
                    })
                })

        }
    })
})