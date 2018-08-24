(function ($) {

    var coffeeSvg = "<?xml version='1.0' encoding='UTF-8'?><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background='new 0 0 50 50' version='1.1' viewBox='0 0 1000 1000' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><ellipse cx='472.37' cy='812.2' rx='218.23' ry='53.727' fill='#ADA28B'/><path d='m647.59 442.57c-42.537-81.183-106.46 101.6-106.46 182.01 0 80.41 86.875 210.71 113.87 176.38 26.998-34.333 138.24-17.947 138.24-173.95 0-182-126.15-147.22-145.65-184.43zm1.413 276.69c-13.591-17.432-2.343-85.951 6-166.26 5.653-54.416 104.44-47.338 104.44 74 0 131.47-79.021 132.55-110.44 92.255z' fill='#CCC'/><path d='m655 619h-369v-192.5s21.866-34.176 184.5-34.176c151.45 0 184.5 34.176 184.5 34.176v192.5z' fill='#D1D1D1'/><path d='m643 639h-345v-192.5s20.057-34.176 172.5-34.176c141.96 0 172.5 34.176 172.5 34.176v192.5z' fill='#543A1C'/><g fill='#D4C9A5'><path d='m645.59 715c0.832 1.067 1.705 2.1 2.602 3.107-12.318-19.121-1.365-86.456 6.806-165.1 3.783-36.415 49.268-45.281 78.949-10.808-29.466-39.379-78.426-31.293-82.357 6.548-8.343 80.304-19.591 148.82-6 166.26z'/><path d='m759.58 506.29c17.745 23.336 30.253 59.145 30.253 116.45 0 156-111.24 139.61-138.24 173.95-10.712 13.622-30.85 1.326-51.246-23.485 21.533 27.621 43.346 42.126 54.654 27.745 26.998-34.333 138.24-17.947 138.24-173.95 0-60.907-14.13-97.533-33.661-120.71z'/></g><path d='m655 807.65s-31.359 43.824-184.5 43.824-184.5-43.824-184.5-43.824v-381.15s41.866 32.557 184.5 32.557 184.5-32.557 184.5-32.557v381.15z' fill='#CCC'/><g fill='#C3C3C3'><path d='m377.61 203.07c-25.395 8.346-80.709 47.844-41.081 74.058 44.527 28.808 38.123 33.269-6.917 72.483 23.679-9.33 82.718-49.811 38.063-73.173-46.679-23.616-29.188-43.162 9.935-73.368-4.319 1.42-7.176 5.541 0 0z'/><path d='m617.61 203.07c-25.398 8.347-80.704 47.841-41.081 74.058 44.526 28.807 38.123 33.269-6.916 72.483 23.678-9.33 82.718-49.811 38.063-73.173-46.681-23.614-29.189-43.165 9.934-73.368-4.319 1.42-7.176 5.541 0 0z'/><path d='m503.39 151c-29.594 10.944-101.88 60.753-51.809 93.649 11.829 7.624 49.646 13.698 44.947 34.054-5.715 25.162-36.23 45.828-54.915 60.909 28.3-12.377 103.6-63.641 48.103-92.404-61.196-30.865-38.95-58.608 13.674-96.208-5.457 2.018-9.446 6.749 0 0z'/></g><path d='m470.5 394.61c45.936 0 89.718 3.559 123.28 10.021 40.286 7.756 49.308 16.332 50.961 18.423-1.653 2.091-10.675 10.668-50.961 18.424-33.564 6.461-77.346 10.02-123.28 10.02s-89.718-3.559-123.28-10.021c-40.286-7.756-49.308-16.333-50.961-18.424 1.654-2.091 10.675-10.667 50.961-18.423 33.564-6.462 77.346-10.02 123.28-10.02m0-10c-101.9 0-184.5 17.212-184.5 38.444s82.604 38.444 184.5 38.444 184.5-17.212 184.5-38.444-82.604-38.444-184.5-38.444z' fill='#B1B1B1'/></svg>";
    var isVisible = false;
    var checkTimeIntervalId;
    var typing = "";
    var keyword;
    var $container;
    var $iconHtml;
    var messageOnShow;
    var messageOnHide;
    var coffeeHours;

    $.fn.coffeeEasterEgg = function (options) {

        var settings = $.extend({
            onTyping: false,
            onTime: false,
            onLoad: false,
            onHash: false,
            containerClass: 'coffee-time',
            content: coffeeSvg,
            keyword: 'coffee',
            customMessageOnShow: 'It\'s coffee time!',
            customMessageOnHide: 'Coffee time it\'s finished',
            coffeeHours: ['11:00-11:15', '16:00-16:15']
        }, options);

        // Init global variables
        coffeeHours = settings.coffeeHours;
        keyword = settings.keyword.toLowerCase();
        messageOnShow = settings.customMessageOnShow;
        messageOnHide = settings.customMessageOnHide;

        // Init jQuery 
        $container = this;
        $iconHtml = $("<div class='" + settings.containerClass + "'>" + settings.content + "</div>");

        $iconHtml.css({
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 50,
            height: 50,
            textAlign: 'center',
            marginRight: 0,
            marginLeft: 'auto',
            opacity: 0,
            transition: 'opacity 0.35s ease-in-out'
        });

        // Show Icon immediately
        if (settings.onLoad) {
            showIcon();
        }

        // Show Icon if url has #{keyword} (e.g. #coffee)
        if (settings.onHash) {
            checkHash();
        }

        // Check Time
        if (settings.onTime) {
            checkTimeIntervalId = setInterval(function () {
                checkTime()
            }, 3000);
        }

        // Check Typing
        if (settings.onTyping) {
            $(document).on("keyup", function (event) {
                checkTyping(event)
            });
        }

        return this;
    }

    checkHash = function () {
        if (window.location.hash.toLowerCase() == "#" + keyword) {
            showIcon(false);
        }
    }

    checkTime = function () {
        var date = new Date();

        var hours = date.getHours();
        var minutes = date.getMinutes();

        if (coffeeHours && coffeeHours.length > 0) {
            for (i = 0; i < coffeeHours.length; i++) {
                var time = coffeeHours[i];

                var start = time.split("-")[0];
                var end = time.split("-")[1];
                var startHours = parseInt(start.split(":")[0]);
                var startMinutes = parseInt(start.split(":")[1]);
                var endHours = parseInt(end.split(":")[0]);
                var endMinutes = parseInt(end.split(":")[1]);

                var startTime = new Date().setHours(startHours, startMinutes, 0);
                var endTime = new Date().setHours(endHours, endMinutes, 0);
                var currentTime = new Date().getTime();

                if (currentTime >= startTime && currentTime <= endTime) {
                    showIcon();
                    return;
                }
            }
            hideIcon();
        }
    }

    checkTyping = function (event) {
        if (
            (event.keyCode >= 48 && event.keyCode <= 57) || //number
            (event.keyCode >= 65 && event.keyCode <= 90) || //letter uppercase
            (event.keyCode >= 97 && event.keyCode <= 122) //letter lowercase
        ) {
            if (typeof typing === "undefined") {
                typing = "";
            }
            typing += String.fromCharCode(event.which).toLowerCase();

            if (typing.match(keyword)) {
                showIcon(false);
            }
        }

        if (event.keyCode == 27) { //ESC
            clearInterval(checkTimeIntervalId);
            hideIcon(false);
        }
    }

    showIcon = function (showMessage) {
        if (isVisible) {
            return;
        }

        isVisible = true;
        if (showMessage !== false) {
            console.log(messageOnShow);
        }


        $container.append($iconHtml);
        setTimeout(function () {
            $iconHtml.css('opacity', 1)
        }, 0);

        $iconHtml.on("mouseover", function () {
            clearInterval(checkTimeIntervalId);
            hideIcon(false);
        })
    }

    hideIcon = function (showMessage) {
        if (!isVisible) {
            return;
        }
        isVisible = false;

        if (showMessage !== false) {
            console.log(messageOnHide);
        }

        $iconHtml.css('opacity', 0);
        setTimeout(function () {
            $iconHtml.remove();
            typing = "";
        }, 350)
    }

}(jQuery));