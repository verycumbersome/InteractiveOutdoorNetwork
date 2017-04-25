/*global $*/
$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDzYuYf0cuMhvhsNx2pssoTi97c9R1vrXk",
        authDomain: "interactive-outdoors.firebaseapp.com",
        databaseURL: "https://interactive-outdoors.firebaseio.com",
        projectId: "interactive-outdoors",
        storageBucket: "interactive-outdoors.appspot.com",
        messagingSenderId: "434825884803"
    };
    firebase.initializeApp(config);
    
    $("html,body").animate({scrollTop: 0}, 100);
    
    const menuSlideSpeed = 300;
    
    // $(".navbar").fadeOut(0);
    
    $(".header").fadeOut(0);
    
    // $(".contentbody").animate({
    //     "width" : "100%"
    // }, 2000);
    
    $("#content p").fadeOut(0);
    $("#content h2").fadeOut(0);
    
    $(".navbar").find(".active").removeClass("active");
    
    $(".navbar").fadeIn(1500, function() {
        $(".header").fadeIn(1500);
        $(".contentbody p").fadeIn(1000);
        $("#content h2").fadeIn(1000);
    });
    
    $("#aboutusdropdown").slideUp(0);
    $("#practicesdropdown").slideUp(0);
    $("#blogdropdown").slideUp(0);
    $("#contactdropdown").slideUp(0);
    
    $(".navbar a").on("click", function(){
        $(".navbar").find(".active").removeClass("active");
    });

    
    setInterval(function(){
        $("#scrolldownarrow").stop().effect("bounce", { times:3, easing:"easeInCubic" }, 'normal');
    }, 1500);
    
    var page = $("html, body");

    $("#scrolldown").click(function(e) {
        
        page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
           page.stop();
        });
    
        page.stop().animate({scrollTop: $("footer").position().top}, 'slow', function(){
           page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        });
    
       return false; 
    });

    $(".dropdown.people").hover(function() {
        $(".dropdown-menu.people").stop(false, false).slideDown(menuSlideSpeed);
    }, function() {
        $(".dropdown-menu").stop().slideUp(menuSlideSpeed);
    });

    $(".practices").hover(function() {
        $(".practices").stop().slideDown(menuSlideSpeed);
    }, function() {
        $(".dropdown-menu").stop().slideUp(menuSlideSpeed);
    });

    $(function() {
      adjustStyle($(this).width());
      $(window).resize(function() {
        adjustStyle($(this).width());
      });
    });
});

$(window).scroll(function(event){

    var yOffset = window.pageYOffset;
    var h = window.innerHeight;
    var breakpoint = 50;
    
    if (yOffset > breakpoint){
        $(".navbar").addClass('scrolldown');
        $("#content p").fadeIn(1000);
        
    }else{
        $(".navbar").removeClass('scrolldown');
        
    }
    
});