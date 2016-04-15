var socket = io();
var scalar = 1;
var face, confirmedurl, origimgurl, errcode;

function submitUrl() {
    $( '#container' ).html( '' );
    $( '#ontop' ).html( '' );
    $( '#text' ).html( '' );
    scalar = 1;
    origimgurl = $( 'input:first' ).val(); 
    socket.emit('origimgurl', origimgurl);
}

// TODO: Handle errors if submitted URL doesn't return proper JSON 

socket.on('face', function(response) {
    if (response == '') { 
        alert('Error! Make sure your image has at least one face and is less than 4 MB.');
        location.reload(true);
    }
    else {
        $('<img>', { src: origimgurl } ).appendTo( '#container' );
        $( 'img' ).load(function(){
            for (i = 0; i < response.length; i++) {
                face = response[i];
                console.log(face);
            
                var imgwidth = (scalar * $('img').width());
                var imgheight = (scalar * $('img').height());
                
                if ( $( '#container' ).height() >= imgheight && $( '#text' ).width() >= imgwidth ) {
                    scalar = 1;
                    }
                    
                else if ( $( '#text' ).width() < imgwidth ) {
                    scalar = ($( '#text' ).width() / imgwidth);   
                    }
                    
                else if ( ($( '#container' ).height() < imgheight) ) {
                    scalar = $( '#container' ).height() / imgheight;   
                    }
                    
                imgwidth = scalar * imgwidth;   
                imgheight = scalar * imgheight;
                $('img').css("height", imgheight + 'px');
                $('#text').css("font-size", imgwidth/10 + "px");
                $('#text').css("top", (imgheight - (imgwidth/10)) + "px");
                //$('.glasses').width = scalar * $('.glasses').width;
                
                var centerofeyes = ((face.faceLandmarks.pupilLeft.x + face.faceLandmarks.pupilRight.x) / 2);
                if (face.faceAttributes.headPose.yaw > 0) {
                    jQuery('<div>', {
                        class: 'glasses',
                        style: 'transform-origin: 50% 100%; top: 0px; transform: rotateZ(' + (face.faceAttributes.headPose.roll) + 'deg); width:' + (scalar * 1.35 * face.faceRectangle.width) + 'px; left:' + ((scalar * (centerofeyes - 0.62 * (1.35 * face.faceRectangle.width))) + parseInt($('#container').css("margin-left"), 10) + ( ($('#container').width() - imgwidth)/2 )) + 'px; height:' + scalar * (1.2 * 0.15 * face.faceRectangle.width) + 'px;'
                    }).appendTo('#ontop');
                }
                else {
                    jQuery('<div>', {
                        class: 'glasses',
                        style: 'transform-origin: 50% 0%; top: 0px; transform: rotateY(180deg) rotateZ(' + (-1 * face.faceAttributes.headPose.roll) + 'deg); width:' + (scalar * 1.35 * face.faceRectangle.width) + 'px; left:' + ((scalar * (centerofeyes - 0.35 * (1.35 * face.faceRectangle.width))) + parseInt($('#container').css("margin-left"), 10) + ( ($('#container').width() - imgwidth)/2 )) + 'px; height:' + scalar * (1.2 * 0.15 * face.faceRectangle.width) + 'px;'
                    }).appendTo('#ontop');
                }
                
                var landingspot = scalar * 
                (
                    ((face.faceLandmarks.pupilLeft.y + face.faceLandmarks.pupilRight.y) / 2) - 
                    (parseInt($(".glasses").eq(i).css('height'), 10) / 2) + 
                    $('#container').css("padding-top") 
                );
                
                $(".glasses").eq(i).animate({ top: (landingspot) }, 1800, function() {
                    if (parseInt($(".glasses").eq(-1).css('top'), 10) >= Math.trunc(landingspot)) {
                        $('#text').html('DEAL WITH IT');
                        console.log("Function happened.");
                        }
                    else {}
                });     
             }
        });
    }
});

    