/* NB: This script is run only if the widget will pop up (not slide out)
 * 
 */

if (!window.jQuery) {
    var script  = document.createElement('script');
    script.type = "text/javascript";
    script.src  = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
} else if (jQuery.fn.jquery === '1.2.6') {
    var script  = document.createElement('script');
    script.type = "text/javascript";
    script.src  = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}


(function() {
    var load = function() {
        
        // var iOS = /Mac|iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        var iOS = false;
        try {
            if (typeof MediaRecorder === 'undefined') {
                console.log('MediaRecorder is not supported.', MediaRecorder);

                if (/iPhone/.test(navigator.userAgent) && !window.MSStream) {
                    // Use native recorder on iphone.
                    iOS = false;
                }
                else if (/Mac|iPad|iPod/.test(navigator.userAgent) && !window.MSStream) {
                    // If media recorder is not supported and the device is a Mac, iphone etc. Then the user can download the app.
                    iOS = true;
                } else {
                    $('.slide-out-div').hide();
                }
            }
        } catch (e) {
            if (/iPhone/.test(navigator.userAgent) && !window.MSStream) {
                // Use native recorder on iphone.
                iOS = false;
            }
            else if (/Mac|iPad|iPod/.test(navigator.userAgent) && !window.MSStream) {
                // If media recorder is not supported and the device is a Mac, iphone etc. Then the user can download the app.
                iOS = true;
            } else {
                $('.slide-out-div').hide();
            }
        }
        
        if( !iOS ) {

            if(jQuery('#ifrm').length === 0) {
                var src = jQuery('#widget-preview').attr('src');
            } else {
                var src = jQuery('#ifrm').attr('src');
            }

            src = src.split('/');
            var token = src[src.length-1];
            var url = src[0]+'//'+src[2];

            jQuery('.frontend-tab-container').on('click',function() {
                jQuery.post( url+'/add-click' , { widget_token: token });
            });

            jQuery('.frontend-tab-container-side').on('click',function() {
                jQuery.post( url+'/add-click' , { widget_token:token });
            });

            jQuery('.vs-frontend-button-container').on('click',function() {
                jQuery.post( url+'/add-click' , { widget_token:token });
            });

            function initLightbox() {
                jQuery('.frontend-widget-preview').fancybox({
                    padding: 15,
                    loop: false,
                    helpers: {
                        overlay: {
                            css: {
                                background: 'rgba(0, 0, 0, 0.65)'
                            }
                        }
                    },
                    afterLoad: function(current, previous) {
                        if(current) {
                            if(current.href.indexOf('#') === 0) {
                                jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e){
                                    e.preventDefault();
                                    jQuery.fancybox.close();
                                });
                            }
                        }
                    }
                });
            }

            if(!jQuery('#widget-preview').hasClass('.handle')) {
                jQuery(function(){
                    initLightbox();
                });
            }

        } else {
            
            if(jQuery('#ifrm').length === 0) {
                var src = jQuery('#widget-preview').attr('src');
            } else {
                var src = jQuery('#ifrm').attr('src');
            }

            src = src.split('/');
            var token = src[src.length-1];
            var url = src[0]+'//'+src[2];
            
            
            jQuery('.frontend-widget-preview').on('click' , function(){

                try {
                    jQuery('#popup-ios').show();
                    jQuery('#vs-ios-close').click(function(e) {
                        jQuery('#popup-ios').hide();
                    });
                } catch(e) {
                    jQuery('#popup-ios').modal('show');
                }
                
                // setTimeout(function() {
                //     // window.location = "http://itunes.com/apps/yourappname";
                //     window.location = "http://itunes.com";
                // }, 500);
                // App URL Scheme is "VoiceStakk://"
                // VoiceStakk://?campainid=123abct&apikey=1
                // jQuery.ajax({
                //     type    : "GET",
                //     dataType: 'jsonp',
                //     url     : "//app.voicestak.com/api/widgets/get-widget-by-token/"+token+"?key=WLCasgGMr3E16llAvH4uf2Ymy3jaM33A",
                //     success : function(data){
                //         window.location = "VoiceStakk://?campainid="+data.data.widget.id+"&apikey=WLCasgGMr3E16llAvH4uf2Ymy3jaM33A";
                //     }
                // })
            });
            
        }
    };


    if(window.addEventListener) {
        window.addEventListener('load',load);
    } else {
        window.attachEvent('onload',load);
    }

}());