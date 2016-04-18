var socket = io();
var scalar = 1;
var face, confirmedurl, origimgurl, errcode;
var clearit;

if (getQueryVariable('link')) {
    $('#container').html('');
    $('#ontop').html('');
    $('#text').html('');
    scalar = 1;
    $('form').replaceWith('<form action="http://aifunclub.azurewebsites.net/"><input type="submit" id="redirect" value="Wanna make another?"> <input type="button" id="twitter" value="Share on twitter">');
    origimgurl = getQueryVariable('link');
    socket.emit('origimgurl', origimgurl);
}

socket.on('face', function (response) {
    if (response == '') {
        alert('Error! Make sure your image has at least one face and is less than 4 MB.');
        location.reload(true);
    }
    else {
        facestored = response;
        dealSuccess(response);
    }
});


$(window).resize(function () {
    // newglassesoffset = [];
    // newimgoffset = $('img').offset();
    // $(".glasses").each(function (i) {
    //     newglassesoffset.push(parseInt(newimgoffset.left, 10) + offsetdiff[i]);
    //     $('.glasses').eq(i).css('left', newglassesoffset[i] + 'px');
    // });
    // $('#container').html('');
    // $('#ontop').html('');
    // $('#text').html('');
    // scalar = 1;
    // dealSuccess(facestored);
    $( '#ontop' ).hide(); 
    clearTimeout(clearit);
    clearit = setTimeout(resizewait, 500);
});

function resizewait(){
    $( '#ontop' ).show();
    location.reload();
}

$('body').on('click', "#twitter", function () {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('Deal with it... ' + encodeURI('http://aifunclub.azurewebsites.net/index.html?link=') + encodeURI(origimgurl)) + '&hashtags=aifunclub');
    console.log('Button pressed');
});

function dealSuccess(response) {
        $('<img>', { src: origimgurl, style: 'opacity:0' }).appendTo('#container');
        $('img').load(function () {
            $( "body" ).scrollTop(0);
            imgwidth = (scalar * $('img').width());
            imgheight = (scalar * $('img').height());
            if (($('#text').width() < imgwidth) && ($('#container').height() < imgheight)) {
                if ($('#text').width() / imgwidth <= $('#container').height() / imgheight) {
                    scalar = ($('#text').width() / imgwidth);
                }
                else { scalar = $('#container').height() / imgheight }
            }
            else if (($('#text').width() < imgwidth) && ($('#container').height() >= imgheight)) {
                scalar = ($('#text').width() / imgwidth);
            }
            else if (($('#container').height() < imgheight) && ($('#text').width() >= imgwidth)) {
                scalar = $('#container').height() / imgheight;
            }
            else { }
            imgwidth = scalar * imgwidth;
            imgheight = scalar * imgheight;
            $('img').css("height", imgheight + 'px');
            $('#text').css("font-size", imgwidth / 10 + "px");
            $('#text').css("top", (imgheight - (imgwidth / 10)) + "px");
            $('img').animate({ opacity: 1 }, 500);
            for (i = 0; i < response.length; i++) {
                face = response[i];
                imgMath(face);
            }
            // imgoffset = $('img').offset();
            // glassesoffset = [];
            // offsetdiff = [];
            // $(".glasses").each(function (i) {
            //     glassesoffset.push($('.glasses').eq(i).offset());
            //     offsetdiff.push(parseInt(glassesoffset[i].left, 10) - parseInt(imgoffset.left, 10));
            // });
            history.pushState({}, "new url", "?link=" + origimgurl);
            $('form').replaceWith('<form action="http://aifunclub.azurewebsites.net/"><input type="submit" id="redirect" value="Wanna make another?"> <input type="button" id="twitter" value="Share on twitter">');
        });
}

function imgMath(face) {
    var centerofeyes = ((face.faceLandmarks.pupilLeft.x + face.faceLandmarks.pupilRight.x) / 2);
    if (face.faceAttributes.headPose.yaw > 0) {
        $('<div>', {
            class: 'glasses',
            style: 'transform-origin: 50% 100%; top: 0px; transform: rotateZ(' + (face.faceAttributes.headPose.roll) + 'deg); width:' + (scalar * 1.35 * face.faceRectangle.width) + 'px; left:' + ((scalar * (centerofeyes - 0.62 * (1.35 * face.faceRectangle.width))) + parseInt($('#container').css("margin-left"), 10) + (($('#container').width() - imgwidth) / 2)) + 'px; height:' + scalar * (1.2 * 0.15 * face.faceRectangle.width) + 'px;'
        }).appendTo('#ontop');
    }
    else {
        $('<div>', {
            class: 'glasses',
            style: 'transform-origin: 50% 0%; top: 0px; transform: rotateY(180deg) rotateZ(' + (-1 * face.faceAttributes.headPose.roll) + 'deg); width:' + (scalar * 1.35 * face.faceRectangle.width) + 'px; left:' + ((scalar * (centerofeyes - 0.35 * (1.35 * face.faceRectangle.width))) + parseInt($('#container').css("margin-left"), 10) + (($('#container').width() - imgwidth) / 2)) + 'px; height:' + scalar * (1.2 * 0.15 * face.faceRectangle.width) + 'px;'
        }).appendTo('#ontop');
    }
    var landingspot = (scalar * (((face.faceLandmarks.pupilLeft.y + face.faceLandmarks.pupilRight.y) / 2) - (parseInt($(".glasses").eq(i).css('height'), 10) / 2))) + parseInt($('#container').css("padding-top"));
    console.log(scalar + ', ' + landingspot);
    $(".glasses").eq(i).animate({ top: (landingspot) }, 1800, function () {
        if (parseInt($(".glasses").eq(-1).css('top'), 10) >= Math.trunc(landingspot)) {
            $('#text').html('DEAL WITH IT');
            console.log("Function happened.");
        }
        else { }
    });
}

function submitUrl() {
    $('#container').html('');
    $('#ontop').html('');
    $('#text').html('');
    scalar = 1;
    origimgurl = $('input:first').val();
    socket.emit('origimgurl', origimgurl);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}