// It works only with Slick Slider
(function ($) {

    $.fn.slickFixHeight = function (options) {

        var settings = $.extend({
            trackClass: '.slick-track', //The parent of the list of slides
        }, options);

        // init variables

        var $slick = this;
        var $track = $slick.find(settings.trackClass);
        var $slides = $track.children();

        //on load
        equalizeHeights($track, $slides);

        //on resize
        $(window).on("resize", throttle(function () {
            equalizeHeights($track, $slides)
        }, 200))
        //$(window).on("resize", function () {
        //    equalizeHeights();
        //})


        return this;
    }

    equalizeHeights = function ($track, $slides) {
        $slides.css('min-height', '');
        setTimeout(function () {
            $slides.css('min-height', function () {
                return $track.height();
            });
        }, 0)
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