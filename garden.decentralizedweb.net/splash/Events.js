Events = {};

Events.interestedN = 0;

Events.randPastelPair = function() {
    var difference = 0.4;  // 0 ~ 1; 0 = same, 1 = different colors
    var spread = 0.3; // 0 ~ 1: 0 = always same/different, 1 = total randomness

    var hue1 = _.random(0, 360);
    var hue2 = (hue1 + _.random((180 * difference) - (180 * spread), (180 * difference) + (180 * spread))) % 360;
    var lightness = _.random(70, 90);
    var pastel1 = 'hsl(' + hue1 + ', 100%, ' + lightness + '%)';
    var pastel2 = 'hsl(' + hue2 + ', 100%, ' + lightness + '%)';
    return [pastel1, pastel2];
}

Events.transitionGradients = function() {
//    console.log("transitionGradeitns");
    var thisgradient = Events.randPastelPair();

    // make Under the same as Over, make Under opacity 1, OVer opacity 0
    // set Over as new gradient
    // transition over to op 1

    if($(".backgrounds").hasClass("transitioning") == false) {
        $(".backgrounds").addClass("transitioning");
        $("#background-under").attr("style", $("#background-over").attr("style")).fadeTo(0, 1.0);
        $("#background-over").fadeTo(0, 0.0).gradientGenerator({
            direction: _.random(0, 360, false) + "deg",
            colors: [{color: thisgradient[0], percent: 0}, {color: thisgradient[1], percent: 100}]
        }).fadeTo(1000, 1.0, function() {
            $(".backgrounds").removeClass("transitioning");
        });
    }
}


Events.fadeTextIn = function() {
    if(!$(".text").hasClass("fadingIn")) {
        $(".text").removeClass("fadingOut").stop(true, false).addClass("fadingIn").fadeIn(500, function() { $(this).removeClass("fadingIn"); });
    }
} 

Events.fadeTextOut = function() {
    if(!$(".text").hasClass("fadingIn")) {
        if(!$(".text").hasClass("fadingOut")) {
            $(".text").stop(true, false).addClass("fadingOut").fadeOut(1000, function() { $(this).removeClass("fadingOut"); });
        }
    }
}


Events.termFade = function(selector, term) {
    $(".term").fadeIn();
    $(".term").fadeOut(200, function() { $(this).remove(); });
    var thisTerm = $("<div class='term'>" + term + "</div>").hide().appendTo(selector).fadeIn(100);//.fadeOut(3000, function() { $(this).remove(); });
}


Events.incrementInterested = function() {
//    console.log("incrementInterested");
    Events.interestedN = (Events.interestedN || 0) + 1;
    Events.interestedN %= (Vars.interested_in.length - 1);
    Events.termFade("#interested_in", Vars.interested_in[Events.interestedN] + Vars.interested_in_post);
}


Events.init = function() {
    Events.incrementInterested();
}
