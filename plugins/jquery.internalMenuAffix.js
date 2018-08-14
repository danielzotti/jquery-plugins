(function ($) {

    $.fn.internalMenuAffix = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            containerClass: null,
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

        var selector = this;

        var offsetSettings = {
            top: function () {
                return settings.triggerTopFunction();
            }
        };
        if (isActive(settings)) {
            selector.affix({
                offset: offsetSettings
            });
        }

        selector.on("affixed-top.bs.affix", function () {
            if (isActive(settings)) {
                selector.css(getAffixTopCss(selector, settings));
            }
        });

        selector.on("affixed.bs.affix", function () {
            if (isActive(settings)) {
                selector.css(getAffixCss(selector, settings));
            }
        });

        $(window).on("load resize scroll", function () {
            if (isActive(settings)) {
                selector.affix({
                    offset: offsetSettings
                });
                //selector.affix('checkPosition');

                if (selector.hasClass('affix-top')) {
                    selector.css(getAffixTopCss(selector, settings));
                }

                if (selector.hasClass('affix')) {
                    selector.css(getAffixCss(selector, settings));
                }
            } else {
                selector.css(getResettedCss());
            }

        })
        return this;
    }

    function getAffixTopCss(selector, settings) {
        return {
            top: 'auto',
            width: 'auto',
            height: 'initial',
            position: 'relative',
            overflow: 'auto'
        }
    }

    function getAffixCss(selector, settings) {
        return {
            top: settings.positionTopFunction(),
            width: getMenuWidth(selector, settings),
            height: getMenuHeight(selector, settings),
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

    function getMenuWidth(selector, settings) {
        return (settings.containerClass != null ? $(settings.containerClass).outerWidth() : selector.outerWidth())
    }

    function getMenuHeight(selector, settings) {
        if (isFooterInWindow(selector, settings)) {
            return ($(document).height() - $(document).scrollTop() - settings.positionTopFunction() - settings.bottomElementHeightFunction())
        }
        return ($(window).height() - settings.positionTopFunction());
    }

    function getMenuRealHeight(selector) {
        return selector.outerHeight(true);
    }

    function isFooterInWindow(selector, settings) {
        return ($(document).scrollTop() + $(window).height() > settings.bottomElementPositionFunction());
    }

    function isActive(settings) {
        return ($(window).outerWidth() >= settings.fromWidth);
    }

}(jQuery));