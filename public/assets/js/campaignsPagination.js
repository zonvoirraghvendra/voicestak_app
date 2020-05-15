/*$(document).ready(function() {
    var page = 2;
    $(window).on('scroll' , function()
    {
        var body = document.body;
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if(top + $(window).height() == $(document).height()) {
            $.get('/campaigns?page='+page, function (data) {
                $('.vt-campaign-list').append(data);
                page ++;
            });
        }
    })
})*/