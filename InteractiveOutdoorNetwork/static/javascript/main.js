/*global $*/

function createAccount(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            console.log(user.uid)
            document.location.href = "/";
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            alert(errorMessage)
            // ...
        });
}

function createAccountForm() {
    var email = $("#email").val();
    var password = $("#password").val();
    var passwordRepeat = $("#password-rpt").val()

    console.log(password, passwordRepeat)
    if (!email) return alert("No email provided")
    if (!password) return alert("No password provided")
    if (password === passwordRepeat) createAccount(email, password);
    else alert("Passwords do not match")

    return false;
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
            alert(errorMessage)
        })
}

function loginForm() {
    var email = $("#email").val();
    var password = $("#password").val();

    if (!email) return alert("No email provided")
    if (!password) return alert("No password provided")
    if (email) signIn(email, password);

    return false;
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
    var userRef = null;

    firebase.initializeApp(config);

    var twitterProvider = new firebase.auth.TwitterAuthProvider();

    $(".btn-tw").click(function() {
        firebase.auth().signInWithPopup(twitterProvider).then(function(result) {
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
            console.log(errorCode, errorMessage, email, credential)
            // ...
        });
    });

    var googleProvider = new firebase.auth.GoogleAuthProvider();

    $(".btn-go").click(function() {
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
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
            console.log(errorCode, errorMessage, email, credential)
            // ...
        });
    });

    $(".logout").click(function() {
        firebase.auth().signOut();
    })

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userRef = firebase.database().ref('users/' + user.uid);

            userRef.child("/IopStatus").set(user.photoURL);

            $(".login").hide();
            $(".login-text").hide();

            $(".logout").show();
            $(".logout-text").show();

            $("#account-text").text("Welcome, " + user.displayName + "!");
            $(".account-image").show();
            if (!user.photoURL) {
                $(".account-image").attr("src", "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/512/User_No-Frame.png");
            }
            else {
                $(".account-image").attr("src", user.photoURL);
            }

            userRef.on('value', function(snap) {
                console.log(snap.val())
            })

            userRef.child('/lastVisit').set((new Date()).toLocaleString());
            userRef.child('/name').set(user.displayName);
            userRef.child('/photo').set(user.photoURL);
        } else {
            $(".login").show();
            $(".login-text").show();

            $(".logout").hide();
            $(".logout-text").hide();

            $(".account-image").hide();
        }
    });

    $("html,body").animate({scrollTop: 0}, 0);

    const menuSlideSpeed = 300;

    $(".header").fadeOut(0);

    $(".blogpost").fadeOut(0);

    $(".row").fadeIn(2000);

    $(".navbar").find(".active").removeClass("active");

    $(".navbar").fadeIn(1500, function() {
        $(".header").fadeIn(1500);
        $(".contentbody p").fadeIn(1000);
        $(".blogpost").fadeIn(1000);
    });

    $("#aboutusdropdown").slideUp(0);
    $("#practicesdropdown").slideUp(0);
    $("#blogdropdown").slideUp(0);
    $("#contactdropdown").slideUp(0);
    $(".dropdown-menu.login").fadeOut(menuSlideSpeed);

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

    //Rock climbing tile hover SVG
    $("#rockclimbing").hover(function() {
        $("#rockclimbingbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#rockclimbingbase").stop(false, false).fadeIn(300);
    });

    //Running tile hover SVG
    $("#running").hover(function() {
        $("#runningbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#runningbase").stop(false, false).fadeIn(300);
    });

    //Sports tile hover SVG
    $("#sports").hover(function() {
        $("#sportsbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#sportsbase").stop(false, false).fadeIn(300);
    });

    //Skiing tile hover SVG
    $("#skiing").hover(function() {
        $("#skiingbase").stop(false, false).fadeOut(300);
    }, function() {
        $("#skiingbase").stop(false, false).fadeIn(300);
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

    if (yOffset > geartradebreakpoint){
        $("#geartrade h1").addClass("animated slideInUp");
    }else{
    }

});
