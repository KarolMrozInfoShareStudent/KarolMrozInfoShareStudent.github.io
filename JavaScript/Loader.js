$('html').addClass('js');

$(window).load(function () {
    setTimeout(
        function () {
            $("#loader-wrapper").fadeOut();
        },2000);
});
