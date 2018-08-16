//Works with Bootstrap 3
(function ($) {

    $.fn.navbarAffix = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            topFunction: function () {
                return settings.top
            },
            top: 0,
            affixPlaceholderClass: '.affix-placeholder'
        }, options);

        var selector = this;

        selector.affix({
            offset: {
                top: function () {
                    $(settings.affixPlaceholderClass).css('height', $(selector).outerHeight(true) + 'px');
                    return settings.topFunction();
                }
            }
        });
        return this;
    }

}(jQuery));