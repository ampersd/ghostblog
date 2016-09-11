$(document).ready(function() {
    var txt = $('.content')[0].textContent;
    wordCount = txt.split( /\s+/ ).length;
    var readingTimeInMinutes = Math.floor(wordCount / 200) + 1;
    var readingTimeAsString = readingTimeInMinutes + " min";
    $('article .reading-time').html(readingTimeAsString);
});