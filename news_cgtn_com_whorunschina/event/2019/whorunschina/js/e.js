/*
 * @Author: @jdk137 
 * @Date: 2019-03-21 16:22:42 
 * @Last Modified by:   Mr.B 
 * @Last Modified time: 2019-03-21 16:22:42 
 */


scaleToWindow(document.getElementById('scaleContainer'));
scaleToWindow(document.getElementById('personalWrap'));

if (!isMobile.any) {
    window.addEventListener('resize', function () {
        scaleToWindow(document.getElementById('scaleContainer'));
        scaleToWindow(document.getElementById('personalWrap'));
    }, false);
} else {
    // https://stackoverflow.com/questions/32963400/android-keyboard-shrinking-the-viewport-and-elements-using-unit-vh-in-css
    // prevent keyboard shrink vh
    setTimeout(function () {
        let viewheight = $(window).height();
        let viewwidth = $(window).width();
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0, maximum-scale=1, user-scalable=no");
    }, 300);
}

// 防止刷新自动滚动
$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});

$(window).on('scroll', function(e) {
    $('#mrb_tooltip').css('display', 'none');
})

// document.body.scrollTop = document.documentElement.scrollTop = 0;
// $('body').on('click', '#myCanvas', function (event) {
//   if (typeof event.region === 'undefined') {
//     console.log(event.region);
//   }
// });

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

layout(function () {
    init();
    fsm.trans('svgWordShake');
    $('.logo, .arrow-red').show();
    setTimeout(function () {
        $('body').addClass('canscroll');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#scroll').show();
        startScroll();

        // select
        (function () {
            var html = '<option value="null"></option>';
            html += originOrderData.map(function (d, i) {
                return '<option value="' + d.index + '">' + d["姓名"] + ', ' + d["Name"] + ', ' + d.Name.split(' ').join('').toUpperCase() + '</option>';
            }).join('');
            $(".chosen-select").html(html);
            $(".chosen-select").chosen({
                allow_single_deselect: true,
                max_shown_results: 8,
                search_contains: true,
                width: "95%"
            }).on('change', function (evt, params) {
                console.log(evt, params);
                if (!params) {
                    recentDeputy = null;
                } else {
                    recentDeputy = +params.selected;
                }
                fsm.endTrans();
                $('#searchButtons .closeButton').trigger('click');
            });

            $('#searchButtons .searchButton').click(function () {
                $('#searchButtons').addClass('active');
                $('#searchPanel').show();
                setTimeout(function () {
                    $('#searchPanel .chosen-single span').trigger('mousedown');
                }, 10);
            });
            $('#searchButtons .closeButton').click(function () {
                $('#searchButtons').removeClass('active');
                $('#searchPanel').hide();
            });

        }());
    }, 1500);

});
