(function ($) {

    $.fn.openImageInNewTab = function (options) {

        var settings = $.extend({
            elCssInitial: {
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease-in-out'
            },
            elCssMouseOver: {
                boxShadow: '1px 1px 3px rgba(0,0,0,0.5)'
            },
            elCssMouseOut: {
                boxShadow: 'none'
            },
            resetUrlParams: false,
            callack: null,
        }, options);

        var selector = this;
        selector.each(function () {
            var $el = $(this);

            $el.css(settings.elCssInitial);

            $el.on('mouseover', function () {
                $el.css(settings.elCssMouseOver);
            })
            $el.on('mouseout', function () {
                $el.css(settings.elCssMouseOut);
            })

            $el.on("click", function () {
                url = $el.attr('src');
                if (settings.resetUrlParams) {
                    window.open(window.location.origin + '/' + url.split('?')[0], 'Image ' + url);
                } else {
                    window.open(window.location.origin + '/' + url, 'Image ' + url);
                }
            });

            if (settings.callback) {
                settings.callback();
            }
        });

        return this;
    }

}(jQuery));