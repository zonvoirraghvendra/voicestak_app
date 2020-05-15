$(document).ready(function() {

    $(".campaign_select").on('change' , function() {
        var campaign_id = $(this).val();

        $.get('/reports?campaign_id='+campaign_id, function (data) {
            $('#MessagesSortByCampaign').submit();
        });
    })

    $(".widget_select").on('change' , function() {
        var campaign_id = $('.campaign_select').val();
        var widget_id = $(this).val();

        $.get('/reports?campaign_id=' + campaign_id + '&widget_id=' + widget_id, function (data) {
            $('#MessagesSortByWidget').submit();
        });
    })

})