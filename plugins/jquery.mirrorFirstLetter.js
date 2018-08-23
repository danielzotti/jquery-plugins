(function ($) {

    $.fn.mirrorFirstLetter = function (options) {

        var settings = $.extend({
            class: 'first-letter',
        }, options);

        var selector = this;
        selector.each(function () {
            var $container = $(this);
            var text = $container.text();
            var firstLetter = null;
            if (text && text.length > 0) {
                text = $.trim(text);
            }
            if (text.length > 0) {
                firstLetter = text.charAt(0);
                $container.prepend("<div class='" + settings.class + "'>" + firstLetter + "</div>");
            }
        })

        return this;
    }

}(jQuery));