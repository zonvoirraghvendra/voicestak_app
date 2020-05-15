$( document ).ready(function() {
    if($('.side-widget > div').hasClass('rotate')) {
        var right = ( ($('.side-widget > div').innerWidth() - $('.side-widget > div').innerHeight())/2 )  + 'px';
        var bottom = ( parseInt(right) + 8 ) + 'px';

        if ($('.side-widget > div').hasClass('widget-side-1')) {
            right   =   144 + 'px';
            bottom  =   161 + 'px';
            /*right = ( parseInt(right) -10 ) + 'px';
            bottom = ( parseInt(right) + 17 ) + 'px';*/
        } else if ($('.side-widget > div').hasClass('widget-side-2')) {
            right   =   164 + 'px';
            bottom  =   165 + 'px';
        } else if ($('.side-widget > div').hasClass('widget-side-3')) {
            right   =   106 + 'px';
            bottom  =   131 + 'px';
        } else if ($('.side-widget > div').hasClass('widget-side-4')) {
            right   =   150 + 'px';
            bottom  =   165 + 'px';
        } else if ($('.side-widget > div').hasClass('widget-side-5')) {
            right   =   119 + 'px';
            bottom  =   153 + 'px';
        } else if ($('.side-widget > div').hasClass('widget-side-7')) {
            right   =   162 + 'px';
            bottom  =   164 + 'px';
        }

        $('.side-widget').css({'left': 0});
        $('.side-widget').css({'right': 'initial'});
        $('.side-widget > div').css({'left': '-'+right});
        $('.side-widget > div').css({'bottom': bottom});
    } else {
        $('.side-widget > div').css({'right': 0});
        $('.side-widget > div').css({'bottom': 0});
        $('.side-widget').css({'left': 'initial'});
        $('.side-widget').css({'right': 0});
    }
});

function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);
    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}