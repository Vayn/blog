$(document).ready(function() {
    $('#content-wrap').stop(true).fadeTo(500, 1.0);

    // Wrap Liquid Tags
    $('.liquid-tag').prepend("{{").append("}}");
    
    $('#liquid-ie').append('$(\'.liquid-tag\').prepend("{{").append("}}");');
});
