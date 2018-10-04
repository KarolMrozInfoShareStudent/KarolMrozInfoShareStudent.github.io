$('html').addClass('js');

$(window).load(function () {
    setTimeout(
        function () {
            $("#loader-wrapper").fadeOut();
        },1200000);
});
