(function ($) {

    $.fn.scrollSpy = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            linkSelector: 'a[href*="#"]',
            //per aggiustare il punto in cui viene triggerato l'active (es: se la navbar è alta 50px imposto a 50)
            adjustment: function () {
                return 0
            }
        }, options);

        var $element = $(this);

        $(window).on("load resize", function () {
            var sections = {};
            var $hrefs = $element.find(settings.linkSelector);

            if ($hrefs.length > 0) {
                $hrefs.each(function (index, el) {
                    var id = el.href.split('#')[1];
                    var content = $('#' + id)
                    if (content.length > 0) {
                        sections[id] = content.offset().top;
                    }
                });

                $(window).on("scroll", function () {
                    var scrollPosition = $(document).scrollTop();

                    for (i in sections) {
                        if (sections[i] <= (scrollPosition + settings.adjustment())) {
                            $element.find('.active').removeClass('active');
                            $element.find('a[href*=' + i + ']').parent().addClass('active');
                        }
                    }
                })
            }
        });

        return this;
    }

}(jQuery));