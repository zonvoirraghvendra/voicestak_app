$(document).ready(function() {

    var client = new ZeroClipboard( $(".embed-copy") );
    client.on( "beforecopy", function( event ) {
        var getClientText = function( event ,  func ) {
            text = $( event.target ).parents('.modal').find('.embed-modal').val();
            return func( text );
        };
        getClientText( event ,function( text ) {
            client.setText( text );
        });
    });

});