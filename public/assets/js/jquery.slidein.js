/*!
 * VoiceStack SlideIn
 *
 */

if (!window.jQuery) {
    var script 	= document.createElement('script');
    script.type = "text/javascript";
    script.src 	= "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
} else if (jQuery.fn.jquery === '1.2.6') {
 	var script 	= document.createElement('script');
 	script.type = "text/javascript";
 	script.src 	= "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
 	document.getElementsByTagName('head')[0].appendChild(script);
}

document.write('<style> .frontend-widget-preview { position:absolute; top:0; right:0; display:inline-block; width:100%; height:100%; z-index:100; border-color: transparent!important; } #ifrm, #widget-preview { border: none; margin-bottom: 0!important; } .slide-out-div-new p { margin-bottom: 0!important; } .slide-out-div-new, #widget-preview { max-width: 100%; } .frontend-tab-container-side { max-width: inherit; } #widget-preview { z-index: 1000; position: relative; } #ifrm { z-index: 100; } </style>');

function VoiceStackIframe(id) {
	if(id === 'ifrm') {
		var str = document.getElementById(id).src;
		var PopupVoiceStackSlideOut = [];

		PopupVoiceStackSlideOut["tabwidth"] 	="460";
		PopupVoiceStackSlideOut["mainPosition"] ="fixed";

		if( str.indexOf("side-widget") >= 0 ) {
			PopupVoiceStackSlideOut["position"] = "right";
		} else if( str.indexOf("footer-widget") >= 0 ) {
			PopupVoiceStackSlideOut["position"] = "bottom_right";
		}

		function SlideOutPopupWithVoiceStack(){
			(function() {
			    var load = function() {
					jQuery('.frontend-tab-container-side').css('cursor', 'pointer');
			    	jQuery.voiceStackPopupSlideOut(PopupVoiceStackSlideOut);
			    	if( window.navigator.userAgent.match(/iPhone/i) && window.navigator.userAgent.match(/iPad/i) ) {
                                    console.log('this is ios ....line 39');
			    		jQuery('.frontend-tab-container').css('display: none;');
			    		jQuery('.frontend-tab-container-side').css('display: none;');
					}
			    };

			    if(window.addEventListener) {
			       	window.addEventListener('load',load);
			    } else {
			       	window.attachEvent('onload',load);
			    }
			}());
		};

		SlideOutPopupWithVoiceStack();

	}
}

(function() {
	var load = function() {

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


			if(jQuery('#ifrm').length === 0) {
			  	var src = jQuery('#ifrm_button').attr('src');
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

			function func(window, document, $, undefined) {
				"use strict";
				var H = $("html"),
					W = $(window),
					D = $(document),
					F = $.voiceStackPopup = function (text , timeOut , livePreview , floatingWidget) {
						timeOut = timeOut || 0;

						livePreview = livePreview || 0;
						window.livePreview = livePreview;

						floatingWidget = floatingWidget || 0;
						window.floatingWidget = floatingWidget;

						F.open.apply( this, arguments );
						if(timeOut != 0) {
							setTimeout( F.close , timeOut);
						}
					},
					S = $.voiceStackPopupSlideOut = function (slideOut) {
						var mainPosition ;
						if(slideOut.mainPosition === "fixed") {
							mainPosition = true;
						}
						else {
							mainPosition = false;
						}

					    var settings = {
					        tabHandle: '.handle',
					        speed: 300,
					        tabWidth: slideOut.tabwidth,
					        action: 'click',
					        tabLocation: slideOut.position,
					        topPos: '120px',
					        leftPos: '20px',
					        fixedPosition: mainPosition,
					        positioning: 'absolute',
					        pathToTabImage: slideOut.image,
					        imageHeight: '100px',
					        imageWidth: '50px',
					        textColor: slideOut.textColor,
					        imgRepeat: slideOut.repeat,
					        tabBgColor: slideOut.tabBgColor,
					        onLoadSlideOut: false
					    };

					    settings.tabHandle = $(settings.tabHandle);

					    var obj = $('.slide-out-div');

					    if (settings.fixedPosition === true) {
					        settings.positioning = 'fixed';
					    } else {
					        settings.positioning = 'absolute';
					    }

					    /*ie6 doesn't do well with the fixed option*/
					    if (document.all && !window.opera && !window.XMLHttpRequest) {
					        settings.positioning = 'absolute';
					    }

					    /*set initial tabHandle css*/

					    if (settings.pathToTabImage != null) {
					    	var backgroundImageRepeat = 0;

					    	if(settings.imgRepeat === 0) {  backgroundImageRepeat = 'no-repeat'; }
					    	else if(settings.imgRepeat === 1) { backgroundImageRepeat = 'repeat'; }

					    	if(settings.pathToTabImage !== '0'){
			    		        settings.tabHandle.css({
			    			        'background-image'  : 'url('+settings.pathToTabImage+')',
			    			        'background-repeat' : backgroundImageRepeat,
			    			        'background-size'   : '100%',
			    			        'padding' 		  	: '5px',
			    			        'font-weight'	  	: 'bold',
			    			        'font-size'		  	: '16px',
			    			        'text-decoration' 	: 'none',
			    			        'border'  		  	: 'none',
			    			        'min-width' 		: settings.imageWidth,
						        'min-height'		: settings.imageHeight
			    		        });
					    	}

					    	else {
			    		        settings.tabHandle.css({
			    		        	'border'  		  : 'none',
			    		        	'padding' 		  : '10px',
			    			        'width'   		  : 'auto',
			    			        'height'  		  : 'auto',
			    			        'font-weight'	  : 'bold',
			    			        'font-size'		  : '16px',
			    			        'text-decoration' : 'none'
			    		        });
					    	}
					    }

					    settings.tabHandle.css({
					        'display': 'block',
					        'color' : 	settings.textColor,
					        'background-color'  : settings.tabBgColor,
					        'outline' : 'none',
					        'position' : 'absolute'
					    });

					    obj.css({
					        'line-height' : '1',
					        'z-index' : 9999,
					        'position' : settings.positioning
					    });

					    var properties = {
			                containerWidth: parseInt(obj.outerWidth() +1, 10) + 'px',
			                containerHeight: parseInt(obj.outerHeight() +1, 10) + 'px',
			                tabWidth: parseInt(settings.tabHandle.outerWidth() +1, 10) + 'px',
			                tabHeight: parseInt(settings.tabHandle.outerHeight() +1, 10) + 'px'
			            };

			            if(settings.tabWidth && settings.tabWidth != 0) {

			            	if(settings.positioning === 'absolute') {
			            		properties.containerWidth = parseInt(settings.tabWidth * 0.5 , 10) + 'px';
			            		properties.containerWidthZoom = parseInt(settings.tabWidth * 0.25 , 10) + 'px';
			            		properties.containerWidthRightZoom = parseInt(settings.tabWidth * 0.25 , 10) + 'px';
			            	} else {
			            		if($(window).width() > parseInt(settings.tabWidth , 10)) {
			            			properties.containerWidth = parseInt(settings.tabWidth , 10) + 'px';
			            		} else {
			            			properties.containerWidth = $(window).width() + 'px';
			            		}
			            		properties.containerWidthZoom = parseInt(settings.tabWidth , 10) + 'px';
			            		properties.containerWidthRightZoom = 0;
			            	}
			            }

			            /*$( window ).resize(function() {
							if($(window).width() > parseInt(settings.tabWidth , 10)) {
								properties.containerWidth = parseInt(settings.tabWidth , 10) + 'px';
							} else {
								properties.containerWidth = $(window).width() + 'px';
							}
						});*/

			            obj.css({'width' : properties.containerWidth });

				    	$('.slide-out-div iframe').on( "load" , function() {
				    		if(settings.positioning === 'absolute' && obj.find('iframe').outerHeight() > 600 ) {
					    		obj.find('iframe').css({
					    		    'height' : '600px',
					    		    'overflow-y' : 'scroll'
					    		});
					    	}
			    	    });

					    if(settings.tabLocation === 'bottom_left') {
					    	$('.slide-out-div iframe').on( "load" , function() {
					    		if(settings.positioning === 'fixed' && obj.find('iframe').outerHeight() > 700 ) {
						    		obj.find('iframe').css({
						    		    'height' : '700px',
						    		    'overflow-y' : 'scroll'
						    		});
						    	}

						    	obj.css({
						    		'bottom' : '-' + parseInt(obj.outerHeight() , 10 )+ 'px',
						    		'position' : settings.positioning,
						    		'left' : 0
						    	});

						    	settings.tabHandle.css({
						    		'top' : '-' + properties.tabHeight,
						    		'left' : 0
						    	});
						    });
					    }

					    if(settings.tabLocation === 'bottom_middle') {
					    	var bottom_middle_left ;

					    	if(settings.positioning === "fixed") {
					    		bottom_middle_left = (parseInt(D.width(), 10) - parseInt(settings.tabHandle.outerWidth(), 10))/2
					    	}

					    	else if (settings.positioning === "absolute") {
					    		bottom_middle_left = (parseInt($('#ipsw-preview-content').width() , 10) - parseInt(settings.tabHandle.outerWidth(), 10))/2
					    	}

					    	$('.slide-out-div iframe').on( "load" , function() {
					    		if(settings.positioning === 'fixed' && obj.find('iframe').outerHeight() > 700 ) {
						    		obj.find('iframe').css({
						    		    'height' : '700px',
						    		    'overflow-y' : 'scroll'
						    		});
						    	}

				    	        obj.css({
				    	        	'bottom' : '-' + parseInt(obj.outerHeight() , 10 )+ 'px',
				    	        	'position' : settings.positioning,
				    	        	'left' : parseInt(bottom_middle_left, 10) + 'px'
				    	        });

				    	        settings.tabHandle.css({
				    	        	'top' : '-' + properties.tabHeight,
				    	        	'left' : 0
				    	        });
				    	    });
					    }

					    if(settings.tabLocation === 'bottom_right') {
				    		if(settings.positioning === 'fixed' && obj.find('iframe').outerHeight() > 700 ) {
					    		obj.find('iframe').css({
					    		    'height' : '700px',
					    		    'overflow-y' : 'scroll'
					    		});
					    	}

					    	obj.css({
					    		'bottom' : '-' + parseInt(obj.outerHeight() , 10 )+ 'px',
					    		'position' : settings.positioning,
					    		'right' : '50px'
					    	});

					    	settings.tabHandle.css({
					    		'top' : '-' + properties.tabHeight,
					    		'right' : 0
					    	});

					    	$('#ifrm').css({'visibility': 'visible'});
					    	$('#widget-preview').css({'visibility': 'visible'});

					    	$('body').append('<style>@media only screen and (max-width:459px) { .slide-out-div-new { right: 0px!important; } } </style>');
					    }

					    var left_px = settings.tabHandle.outerWidth();

					    if(settings.tabLocation === 'left') {
					    	$('.slide-out-div iframe').on( "load" , function() {
					    		if(settings.positioning === 'absolute' && obj.find('iframe').outerHeight() > 600 ) {
						    		obj.find('iframe').css({
						    		    'height' : '600px',
						    		    'overflow-y' : 'scroll'
						    		});
						    	}
						        obj.css({ 'left': '-' + properties.containerWidthZoom});
						        settings.tabHandle.css({
						        	'right' : '-' + left_px + 'px'
						        });

						    });
					    }

					    if(settings.tabLocation === 'right') {
				    		if(settings.positioning === 'absolute' && obj.find('iframe').outerHeight() > 600 ) {
					    		obj.find('iframe').css({
					    		    'height' : '600px',
					    		    'overflow-y' : 'scroll'
					    		});
					    	}

			    	        obj.css({
			    	        	'right': '-' + properties.containerWidth,
			    	            'height' : 'auto',
			    	            'top' : 'initial',
			    	            'bottom' : '50px'
			    	        });

			    			settings.tabHandle.css({
			    				'left' : '-' + left_px + 'px',
			    	        	'bottom' : "0px"
			    	        });

					        $('html').css('overflow-x', 'hidden');
					        $('#ifrm').css({'visibility': 'visible'});
					        $('#widget-preview').css({'visibility': 'visible'});
					    }

					    /*$(window).resize(function() {
				    	    if(settings.tabLocation === 'right') {
			    	    		if(settings.positioning === 'absolute' && obj.find('iframe').outerHeight() > 600 ) {
			    		    		obj.find('iframe').css({
			    		    		    'height' : '600px',
			    		    		    'overflow-y' : 'scroll'
			    		    		});
			    		    	}

	    		                obj.css({
	    		                	'right': '-' + properties.containerWidth,
	    		                    'height' : 'auto',
	    		                    'top' : 'initial',
	    		                    'bottom' : '50px'
	    		                });

	    		        		settings.tabHandle.css({
	    		        			'left' : '-' + left_px + 'px',
	    		                	'bottom' : "0px"
	    		                });

			    		    	obj.css({ 'width':  properties.containerWidth});

			    		        $('html').css('overflow-x', 'hidden');
				    	        $('#ifrm').css({'visibility': 'visible'});
				    	        $('#widget-preview').css({'visibility': 'visible'});
				    	    }

			    	        if(settings.tabLocation === 'bottom_right') {
		    	        		if(settings.positioning === 'fixed' && obj.find('iframe').outerHeight() > 700 ) {
		    	    	    		obj.find('iframe').css({
		    	    	    		    'height' : '700px',
		    	    	    		    'overflow-y' : 'scroll'
		    	    	    		});
		    	    	    	}

		    	    	    	obj.css({
		    	    	    		'bottom' : '-' + parseInt(obj.outerHeight() , 10 )+ 'px',
		    	    	    		'position' : settings.positioning,
		    	    	    		'right' : '50px'
		    	    	    	});

		    	    	    	obj.css({ 'width':  properties.containerWidth});

		    	    	    	settings.tabHandle.css({
		    	    	    		'top' : '-' + properties.tabHeight,
		    	    	    		'right' : 0
		    	    	    	});

		    	    	    	$('#ifrm').css({'visibility': 'visible'});
		    	    	    	$('#widget-preview').css({'visibility': 'visible'});
			    	        }
					    });*/

					    /*functions for animation events*/

					    settings.tabHandle.click(function(event){
					        event.preventDefault();
					    });

					    var slideIn = function() {

					        if (settings.tabLocation === 'top') {
					            obj.animate({top:'-' + properties.containerHeight}, settings.speed).removeClass('open');
					        } else if (settings.tabLocation === 'left') {
					            obj.animate({left: '-' + properties.containerWidthZoom}, settings.speed).removeClass('open');
					        } else if (settings.tabLocation === 'right') {
					            obj.animate({right: '-' + properties.containerWidth}, settings.speed).removeClass('open');
					        } else if (settings.tabLocation === 'bottom_left') {
					            obj.animate({bottom: '-' + parseInt(obj.outerHeight() , 10 )+ 'px'}, settings.speed).removeClass('open');
					        } else if (settings.tabLocation === 'bottom_middle') {
					            obj.animate({bottom: '-' + parseInt(obj.outerHeight() , 10 )+ 'px'}, settings.speed).removeClass('open');
					        } else if (settings.tabLocation === 'bottom_right') {
					            obj.animate({bottom: '-' + parseInt(obj.outerHeight() , 10 )+ 'px'}, settings.speed).removeClass('open');
					        }

					    };

					    var slideOut = function() {

					    	if(settings.positioning === 'absolute') {
					    		properties.containerWidthBottomZoom =  parseInt(obj.outerHeight() * 0.5 , 10 )+ 'px';
					    	}
					    	else {
					    		properties.containerWidthBottomZoom = '3px';
					    	}

					        if (settings.tabLocation == 'top') {
					            obj.animate({top:'-3px'},  settings.speed).addClass('open');
					        } else if (settings.tabLocation == 'left') {
					            obj.animate({left:'0'},  settings.speed).addClass('open');
					        } else if (settings.tabLocation == 'right') {
					            obj.animate({right:'-' + properties.containerWidthRightZoom },  settings.speed).addClass('open');
					        } else if (settings.tabLocation == 'bottom_left') {
					            obj.animate({bottom:'-' + properties.containerWidthBottomZoom },  settings.speed).addClass('open');
					        } else if (settings.tabLocation == 'bottom_middle') {
					            obj.animate({bottom:'-' + properties.containerWidthBottomZoom  },  settings.speed).addClass('open');
					        } else if (settings.tabLocation == 'bottom_right') {
					            obj.animate({bottom:'-' + properties.containerWidthBottomZoom },  settings.speed).addClass('open');
					        }

					    };

					    var clickScreenToClose = function() {
					        obj.click(function(event){
					            event.stopPropagation();
					        });

					        $(document).click(function(){
					            slideIn();
					        });
					    };

					    var clickAction = function(){

							settings.tabHandle.click(function(event){

								if(iOS) {
									try {
										jQuery('#popup-ios').show();
										jQuery('#vs-ios-close').click(function(e) {
											jQuery('#popup-ios').hide();
										});
									} catch(e) {
										jQuery('#popup-ios').modal('show');
									}

									return;
								}

								if (obj.hasClass('open')) slideIn();
								else slideOut();
							});

							clickScreenToClose();
					    };

					    var hoverAction = function(){
					        obj.hover(
					            function(){
					                slideOut();
					            },

					            function(){
					                slideIn();
					            }
					        );

				            settings.tabHandle.click(function(event){
				                if (obj.hasClass('open')) {
				                    slideIn();
				                }
				            });
				            clickScreenToClose();
					    };

					    var slideOutOnLoad = function(){
					        slideIn();
					        setTimeout(slideOut, 500);
					    };

					    /*choose which type of action to bind*/
					    if (settings.action === 'click') {
					        clickAction();
					    }

					    if (settings.action === 'hover') {
					        hoverAction();
					    }

					    if (settings.onLoadSlideOut) {
					        slideOutOnLoad();
					    };

					},


					isQuery	= function(obj) {
						return obj && obj.hasOwnProperty && obj instanceof $;
					},
					isString = function(str) {
						return str && $.type(str) === "string";
					},
					isPercentage = function(str) {
						return isString(str) && str.indexOf('%') > 0;
					},
					isScrollable = function(el) {
						return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
					},
					getScalar = function(orig, dim) {
						var value = parseInt(orig, 10) || 0;

						if (dim && isPercentage(orig)) {
							value = F.getViewport()[ dim ] / 100 * value;
						}

						return Math.ceil(value);
					},
					getValue = function(value, dim) {
						return getScalar(value, dim) + 'px';
					};
			};

			func(window, document, jQuery);

	};

    if(window.addEventListener) {
       	window.addEventListener('load',load);
    } else {
       	window.attachEvent('onload',load);
    }
}());