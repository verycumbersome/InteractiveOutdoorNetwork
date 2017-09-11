$(document).ready(function() {

    $("html,body").animate({scrollTop: 0}, 0);

    const menuSlideSpeed = 300;

    setInterval(function(){
        $(".scrolldownarrow").stop().effect("bounce", { times:3, easing:"easeInCubic" }, 'normal');
    }, 1500);

    var page = $("html, body");

    $(".scrollbox").click(function(e) {
        page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
           page.stop();
        });

        page.stop().animate({scrollTop: $("#about-us").position().top - 50}, 1500, "easeInOutCubic", function(){
           page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        });

       return false;
    });

    $(".endcontent .glyphicon.glyphicon-leaf").click(function(e) {
            page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            page.stop();
        });

            page.stop().animate({scrollTop: $("#content").position().top - 50}, 1500, "easeInOutCubic", function(){
            page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        });

            return false;
    });
});

$(window).scroll(function(event){

    var yOffset = window.pageYOffset;
    var h = window.innerHeight;
    var navbarbreakpoint = 150;
    var geartradebreakpoint = 900;

    if (yOffset > navbarbreakpoint){
        $(".navbar").addClass('scrolldown');
        $("#content p").fadeIn(1000);
        $(".title").addClass('scrolldown');

    }else{
        $(".navbar").removeClass('scrolldown');
        $(".title").removeClass('scrolldown');
    }
});
