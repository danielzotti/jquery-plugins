(function ($) {

    $.fn.internalMenuAffix = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            topFunction: function () { return settings.top },
            top: 0,
            containerClass: null
        }, options);

        var selector = this;
        selector.affix({
            offset: {
                top: function () {
                    return settings.topFunction();
                }
            }
        });

        selector.on("affix.bs.affix", function () {
            selector.css(getCss(selector, settings));
        })

        $(window).on("load resize scroll", function () {
            selector.css(getCss(selector, settings));
        })
        return this;
    }

    function getCss(selector, settings) {
        return {
            top: ($('.navbar').outerHeight(true)), // + 10
            width: (settings.containerClass != null ? $(settings.containerClass).outerWidth() : selector.outerWidth()),
            maxHeight: ($(window).outerHeight() - $('.navbar').outerHeight(true)),
            overflow: 'auto'
        }
    }

}(jQuery));

