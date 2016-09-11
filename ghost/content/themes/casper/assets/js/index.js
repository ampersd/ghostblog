/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };

    // based on : 'Reading Position Indicator' article
    // http://css-tricks.com/reading-position-indicator/
    var positionIndicator = function () {
        if ($('.js-post-reading-time').is(':visible')) {
            imagesLoaded('.post-content', function () {
                var getMax = function() {
                    return $('.post-content').height();
                };
                var getValue = function() {
                    return $(window).scrollTop();
                };
                var progressBar, max, value, width, percent;
                if('max' in document.createElement('progress')){
                    // Browser supports progress element
                    progressBar = $('progress');
                    // Set the Max attr for the first time
                    progressBar.attr({ max: getMax() });
                    $(document).on('scroll', function(){
                        // On scroll only Value attr needs to be calculated
                        progressBar.attr({ value: getValue() });
                        percent = Math.floor((getValue() / getMax()) * 100) - 5;
                        if (percent < 0) {
                            percent = 0;
                            $('.js-post-sticky-header').removeClass('visible');
                        } else if (percent > 100) {
                            percent = 100;
                            $('.js-post-sticky-header').removeClass('visible');
                        } else {
                            $('.js-post-sticky-header').addClass('visible');
                        }
                        $('.js-percent-count').text(percent + '%');
                    });
                    $(window).resize(function(){
                        // On resize, both Max/Value attr needs to be calculated
                        progressBar.attr({ max: getMax(), value: getValue() });
                    });
                }
                else {
                    progressBar = $('.progress-bar'),
                        max = getMax(),
                        value, width;
                    var getWidth = function(){
                        // Calculate width in percentage
                        value = getValue();
                        width = (value/max) * 100;
                        width = width + '%';
                        return width;
                    };
                    var setWidth = function(){
                        progressBar.css({ width: getWidth() });
                        $('.js-percent-count').text(getWidth());
                    };
                    $(document).on('scroll', setWidth);
                    $(window).on('resize', function(){
                        // Need to reset the Max attr
                        max = getMax();
                        setWidth();
                    });
                }
            });
        }
    };

    var readingTime = function () {
        var $postArticleContent = $('.post-content');
        if ($postArticleContent.length) {
            $postArticleContent.readingTime({
                wordCountTarget: $('.js-post-reading-time').find('.js-word-count')
            });
        }
    };

    readingTime();
    positionIndicator();
})(jQuery);
