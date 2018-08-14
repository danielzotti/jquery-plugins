(function ($) {

    $.fn.createLinkFromCaption = function (options) { //ratio
        
        var settings = $.extend({
            mainSeparator: '****',
            linkSeparator: '|',
        }, options);

        var selector = this;

        selector.each(function () {
            var caption = $(this);
            var captionText = caption.html();
            if (!captionText) {
                return this;
            }
            
            var resultArray = captionText.split(settings.mainSeparator);
            if (!resultArray || resultArray.length == 0) {
                return this;
            }

            var text = resultArray[0];
            var linkRaw = resultArray[1];
            if (!linkRaw) {
                caption.html(text);
                return this;
            }

            var linkArray = linkRaw.split(settings.linkSeparator);
            if (!linkArray || linkArray.length == 1) {
                caption.html(text);
                return this;
            }

            var url = linkArray[0];
            var urlText = linkArray[1];

            var newContent = text + " (<a href='" + window.location.origin + "/" + url + "' target='_blank'>" + (urlText ? urlText : 'Large preview') + "</a>)";
            caption.html(newContent);
        })

        return this;
    }

}(jQuery));

