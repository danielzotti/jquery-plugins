(function ($) {

    $.fn.internalMenuAffix = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            containerSelector: null,
            //decide da quale larghezza di finestra il plugin è attivo
            fromWidth: 0,
            //decide dove posizionarsi quando è affix
            positionTopFunction: function () {
                return settings.positionTop
            },
            positionTop: 0,
            //decide quando eseguire l'affix top
            triggerTopFunction: function () {
                return settings.triggerTop
            },
            triggerTop: 0,
            //adatta l'altezza del menu in base a quando arriva l'elemento sotto (solitamente footer)
            bottomElementHeightFunction: function () {
                return settings.bottomElementHeight
            },
            bottomElementHeight: 0,
            //adatta l'altezza del menu in base alla dimensione della finestra
            bottomElementPositionFunction: function () {
                return settings.bottomElementPosition
            },
            bottomElementPosition: 0
        }, options);

        var element = this;

        var offsetSettings = {
            top: function () {
                return settings.triggerTopFunction();
            }
        };
        if (isActive(settings)) {
            element.affix({
                offset: offsetSettings
            });
        }

        element.on("affixed-top.bs.affix", function () {
            if (isActive(settings)) {
                element.css(getAffixTopCss(element, settings));
            }
        });

        element.on("affixed.bs.affix", function () {
            if (isActive(settings)) {
                element.css(getAffixCss(element, settings));
            }
        });

        $(window).on("load resize scroll", function () {
            if (isActive(settings)) {
                element.affix({
                    offset: offsetSettings
                });
                //element.affix('checkPosition');

                if (element.hasClass('affix-top')) {
                    element.css(getAffixTopCss(element, settings));
                }

                if (element.hasClass('affix')) {
                    element.css(getAffixCss(element, settings));
                }
            } else {
                element.css(getResettedCss());
            }

        })
        return this;
    }

    function getAffixTopCss(element, settings) {
        return {
            top: 'auto',
            width: 'auto',
            height: 'initial',
            position: 'relative',
            overflow: 'auto'
        }
    }

    function getAffixCss(element, settings) {
        return {
            top: settings.positionTopFunction(),
            width: getMenuWidth(element, settings),
            height: getMenuHeight(element, settings),
            position: 'fixed',
            overflow: 'auto'
        }
    }

    function getResettedCss() {
        return {
            top: 'initial',
            width: 'initial',
            overflow: 'hidden',
            position: 'relative',
            height: 'initial'
        }
    }

    function getMenuWidth(element, settings) {
        return (settings.containerSelector != null ? $(settings.containerSelector).outerWidth() : element.parent().outerWidth())
    }

    function getMenuHeight(element, settings) {
        if (isFooterInWindow(element, settings)) {
            return ($(document).height() - $(document).scrollTop() - settings.positionTopFunction() - settings.bottomElementHeightFunction())
        }
        return ($(window).height() - settings.positionTopFunction());
    }

    function getMenuRealHeight(element) {
        return element.outerHeight(true);
    }

    function isFooterInWindow(element, settings) {
        return ($(document).scrollTop() + $(window).height() > settings.bottomElementPositionFunction());
    }

    function isActive(settings) {
        return ($(window).outerWidth() >= settings.fromWidth);
    }

}(jQuery));


// $('#internal-menu-content').internalMenuAffix({
//     containerSelector: '.internal-menu-container',
//     //decide da quale larghezza di finestra il plugin è attivo
//     fromWidth: 768,
//     //decide dove posizionarsi quando è affix
//     positionTopFunction: function () {
//         return $('.navbar').outerHeight(true);
//     },
//     //decide quando eseguire l'affix
//     triggerTopFunction: function () {
//         return $('.esfri-menu').outerHeight(true) + $('.section-header').outerHeight(true); // - 10
//     },
//     //adatta l'altezza del menu in base a quando arriva l'elemento sotto (solitamente footer)
//     bottomElementHeightFunction: function () {
//         return $('.footer').outerHeight(true);
//     },
//     //adatta l'altezza del menu in base alla dimensione della finestra
//     bottomElementPositionFunction: function () {
//         return $('.footer').position().top;
//     },
// });
// $("#internal-menu-content").mCustomScrollbar({
//     theme: "dark",
//     //autoHideScrollbar: true
// });