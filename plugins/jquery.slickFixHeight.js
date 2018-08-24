// It works only with Slick Slider
(function ($) {

    var $slick;
    var $track;
    var $slides;

    $.fn.slickFixHeight = function (options) {

        var settings = $.extend({
            trackClass: '.slick-track', //The parent of the list of slides
        }, options);

        // init variables

        $slick = this;
        $track = $slick.find(settings.trackClass);
        $slides = $track.children();

        //on load
        equalizeHeights();

        //on resize
        $(window).on("resize", throttle(equalizeHeights, 200))

        return this;
    }

    equalizeHeights = function () {
        $slides.css('min-height', '');
        var minSlideHeight = $track.height();
        $slides.css('min-height', minSlideHeight);
    }

    throttle = function (fn, frequency) {
        frequency = frequency || 100;
        var timeout = false;

        return function () {
            if (timeout) {
                return;
            }

            timeout = setTimeout(function () {
                timeout = false;
            }, frequency);

            //Execute function
            if (fn) {
                fn();
            }
        };
    }

}(jQuery));