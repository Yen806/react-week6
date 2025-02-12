$(function () {

    // show hide subnav depending on scroll direction
    var position = $(window).scrollTop();

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll > position) {

            //only piece that matters
            $('header')
                .stop(true, false)
                .removeClass('up')
                .addClass('down');


            // scrolling downwards, only here for dev purposes
            console.log('moving DOWN the page');
            $('input').val('down');

        } else {
            //only piece that matters
            $('header')
                .stop(true, false)
                .removeClass('down')
                .addClass('up');


            // scrolling upwards 
            console.log('moving UP the page');
            $('input').val('up');
        }

        position = scroll;
    });

});