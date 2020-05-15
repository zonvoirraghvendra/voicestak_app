if (!window.jQuery) {
    var script  = document.createElement('script');
    script.type = "text/javascript";
    script.src  = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);

    var loadHandlerAlreadyRun = false;
    script.onload = function() {
        if (!loadHandlerAlreadyRun) {
            loadHandlerAlreadyRun = true;
            onLoadHandler();
        }
    };
    script.onreadystatechange = function() {
        if (!loadHandlerAlreadyRun && (this.readyState === "loaded" || this.readyState === "complete")) {
            loadHandlerAlreadyRun = true;
            onLoadHandler();
        }
    }
}

function onLoadHandler() {
    $(document).ready(function () {
        /*do some jquery $.ajax({}); stuff*/
    });
}