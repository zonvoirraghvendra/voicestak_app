if(window.jQuery){if("1.2.6"===jQuery.fn.jquery){var script=document.createElement("script");script.type="text/javascript",script.src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",document.getElementsByTagName("head")[0].appendChild(script)}}else{var script=document.createElement("script");script.type="text/javascript",script.src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",document.getElementsByTagName("head")[0].appendChild(script)}!function(){var e=function(){function e(){jQuery(".frontend-widget-preview").fancybox({padding:15,loop:!1,helpers:{overlay:{css:{background:"rgba(0, 0, 0, 0.65)"}}},afterLoad:function(e,t){e&&0===e.href.indexOf("#")&&jQuery(e.href).find("a.close").off("click.fb").on("click.fb",function(e){e.preventDefault(),jQuery.fancybox.close()})}})}if(window.navigator.userAgent.match(/iPhone/i)||window.navigator.userAgent.match(/iPad/i))jQuery(".frontend-tab-container-side").hide();else{if(0===jQuery("#ifrm").length)var t=jQuery("#ifrm_button").attr("src");else var t=jQuery("#ifrm").attr("src");t=t.split("/");var n=t[t.length-1],r=t[0]+"//"+t[2];jQuery(".frontend-tab-container").on("click",function(){jQuery.post(r+"/add-click",{widget_token:n})}),jQuery(".frontend-tab-container-side").on("click",function(){jQuery.post(r+"/add-click",{widget_token:n})}),jQuery("#widget-preview").hasClass(".handle")||jQuery(function(){e()})}};window.addEventListener?window.addEventListener("load",e):window.attachEvent("onload",e)}();