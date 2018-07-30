(function ($) {

    $.fn.openInModal = function (options) {

        var settings = $.extend({
            internalSelector: 'img',
            internalCss: {
                maxHeight: '95vh',
                maxWidth: '95vw',
                margin: '0 auto'
            },
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
            bodyCssOnOpen: {
                position: 'absolute',
                overflow: 'hidden',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            bodyCssOnClose: {
                position: '',
                overflow: '',
                top: '',
                left: '',
                right: '',
                bottom: '',
            },
            modalContainerClass: 'dz-automatic-modal',
            modalContentClass: 'dz-automatic-modal-inner',
            modalContainerCss: {

            },
            callack: null,
            fullScreenImage: true
        }, options);

        var selector = this;
        selector.each(function () {
            var $el = $(this);
            var $clonedEl = $(this).clone();

            $el.css(settings.elCssInitial);
            $el.on('mouseover', function () {
                $(this).css(settings.elCssMouseOver);
            })
            $el.on('mouseout', function () {
                $(this).css(settings.elCssMouseOut);
            })

            $el.on("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                $('body').css(settings.bodyCssOnOpen);

                $('body').append(
                    "<div class='" + settings.modalContainerClass + "' style=\"position:fixed;top:0;left:0;right:0;bottom:0;overflow:auto;z-index:1000;display:block;background:rgba(0,0,0,0.7);cursor:pointer;text-align:center;\">" +
                    "<div class='" + settings.modalContentClass + "' style=\"position:relative;margin:10px auto;\">" +
                    $clonedEl[0].outerHTML +
                    "</div>" +
                    "</div>"
                );

                if (settings.fullScreenImage) {
                    $('.' + settings.modalContentClass + ' img').each(function () {
                        var $img = $(this);
                        $img.css({
                            height: '',
                            width: ''
                        })
                        $img.attr('height', '');
                        $img.attr('width', '');
                    });
                }
                if (settings.internalSelector) {
                    $('.' + settings.modalContentClass).find(settings.internalSelector).css(settings.internalCss);
                }

                if (settings.callback) {
                    settings.callback();
                }


                $('.' + settings.modalContainerClass).on("click", function (event) {
                    $(this).remove();
                    $('body').css(settings.bodyCssOnClose);

                });
            });
        });
        return this;
    }
}(jQuery));