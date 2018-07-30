(function ($) {

    $.fn.resetImageDimensions = function () {
        this.each(function () {
            var $img = $(this);
            url = $img.attr('src');
            $img.attr('src', url.split('?')[0]);
            $img.css({
                height: '',
                width: ''
            })
            $img.attr('height', '');
            $img.attr('width', '');
        });
        return this;
    }

}(jQuery));