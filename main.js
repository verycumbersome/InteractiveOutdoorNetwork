/*global $*/

function createAccount(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            console.log(user.uid)
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            // ...
        });
}

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            console.log(user.uid)
            console.log(firebase.User.uidth)
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        })
}
    
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
    
    var provider = new firebase.auth.TwitterAuthProvider();
    
    $(".btn-tw").click(function() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // The signed-in user info.
            var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });
    
    console.log(firebase.User.uid);
    firebase.database().ref('/').on('value', function(all) {
        console.log(all.val());
        // firebase.database().ref('/blah').set(Math.random());
    })
    
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user)
    })
    
    $("html,body").animate({scrollTop: 0}, 100);
    
    const menuSlideSpeed = 300;
    
    $(".header").fadeOut(0);
    
    $(".row").fadeOut(0);
    
    $("#content p").fadeOut(0);
    $("#content h2").fadeOut(0);
    
    $(".row").fadeIn(2000);
    
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
    
        page.stop().animate({scrollTop: $("#activities").position().top - 50}, 1500, "easeInOutCubic", function(){
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
    
    $(".dropdown.login").hover(function() {
        $(".dropdown-menu.login").stop(false, false).slideDown(menuSlideSpeed);
    }, function() {
        $(".dropdown-menu.login").stop().slideUp(menuSlideSpeed);
    });
    
    //Hiking tile hover SVG
    $("#hiking").hover(function() {
        $("#hikingbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#hikingbase").stop(false, false).fadeIn(300);
    });
    
    //Swimming tile hover SVG
    $("#swimming").hover(function() {
        $("#swimmingbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#swimmingbase").stop(false, false).fadeIn(300);
    });
    
    $("#rockclimbing").hover(function() {
        $("#rockclimbingbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#rockclimbingbase").stop(false, false).fadeIn(300);
    });
    
    $("#running").hover(function() {
        $("#runningbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#runningbase").stop(false, false).fadeIn(300);
    });

    $("#sports").hover(function() {
        $("#sportsbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#sportsbase").stop(false, false).fadeIn(300);
    });
    
    $("#skiing").hover(function() {
        $("#skiingbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#skiingbase").stop(false, false).fadeIn(300);
    });
    
    
    
});

$(window).scroll(function(event){

    var yOffset = window.pageYOffset;
    var h = window.innerHeight;
    var breakpoint = 100;
    
    if (yOffset > breakpoint){
        $(".navbar").addClass('scrolldown');
        $("#content p").fadeIn(1000);
        $(".title").addClass('scrolldown');
        
    }else{
        $(".navbar").removeClass('scrolldown');
        $(".title").removeClass('scrolldown');
        
    }
    
});