(function ($) {

    $.fn.svgResize = function (options) {

        var settings = $.extend({
            ratio: 1,
        }, options);

        var selector = this;
        var ratio = settings.ratio;

        selector.each(function () {
            var container = $(this)

            var svg = container.find('svg');
            var svgViewbox = svg.attr("viewBox");
            if (typeof (svgViewbox) !== "undefined") {
                var svgViewBoxWidth = svgViewbox.split(" ")[2];
                var svgViewBoxHeight = svgViewbox.split(" ")[3];

                if (typeof (svgViewBoxWidth) !== "undefined" && typeof (svgViewBoxHeight) !== "undefined")
                    ratio = svgViewBoxWidth / svgViewBoxHeight;
            }

            if (container && container.length > 0 && svg && svg.length > 0) {
                svg.width(container.width() + 'px');
                var svgHeight = (container.width() / ratio);
                svg.height(svgHeight + 'px');
            }
        })

        return this;
    }

}(jQuery));