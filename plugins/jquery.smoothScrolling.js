(function ($) {

    $.fn.smoothScrolling = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            selector: 'a[href*="#"]'
        }, options);

        $(settings.selector).on("click", function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var hash = this.hash;
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: (target.offset().top - 62)
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        //var $target = $(target);
                        //$target.focus();
                        //if ($target.is(":focus")) { // Checking if the target was focused
                        //    return false;
                        //} else {
                        //    $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        //    $target.focus(); // Set focus again
                        //};
                    });
                }
            }
        });
        return this;
    }

}(jQuery));