// $(document).ready(function() {
//     var page = 2;

    // if( $('#news').hasClass('active') ) {
    //     getMessages(0, page);
    // }

    // $('#news').on('click', function(){
    //     $('#news').prop('aria-expanded', true);
    // });

    // $('#archives').on('click', function(){
    //     $('#archives').prop('aria-expanded', true);
    // });

//     $('#archives').on('click', function(){
//         if( $('#archives').prop('aria-expanded', true) ) {
//             if ( $('.vt-inbox-list.fluid').find( $('.new') ) ) {
//                 $('.vt-inbox-list.fluid').html("");                
//                 page = 1;
//                 getMessages(1, page);
//             }                
//         }
//     });

//     var isFirstRequest = 1;

//     function getMessages(status, page1){
        
//         if(window.location.search.indexOf('campaign_id')>-1)
//         {
//             var campaign_id = window.location.search.substring(13,window.location.search.length);
//             $.get('/messages?campaign_id='+campaign_id+'&page='+page1+'&status='+status, function (data) {
//                 // console.log( data );
//                 if ( isFirstRequest && !data ) {
//                     $('.vt-inbox-list.fluid').append("No Messages found");
//                     isFirstRequest = 0;
//                 } else {
//                     $('.vt-inbox-list.fluid').append(data);
//                     page ++; 
//                     isFirstRequest = 0;                
//                 } 
//             });
//         }
//         else
//         {
//             $.get('/messages?page='+page1+'&status='+status, function (data) {
//                 if ( isFirstRequest && !data ) {
//                     $('.vt-inbox-list.fluid').append("No Messages found");
//                     isFirstRequest = 0;
//                 } else {
//                     $('.vt-inbox-list.fluid').append(data);
//                     page ++;
//                     isFirstRequest = 0;
//                 } 
//             });
//         }
//     }
    

//     $(window).on('scroll' , function()
//     {
//         var body = document.body;
//         var doc = document.documentElement;
//         var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
//         if(top + $(window).height() == $(document).height()) {
//             if( $('#news').hasClass('active') ) {
//                 //console.log('news');
//                 getMessages(0, page);
//             }
//             if( $('#archives').hasClass('active') ) {
//                 getMessages('1', page);
//             }
//             // if(window.location.search.indexOf('campaign_id')>-1)
//             // {
//             //     var campaign_id = window.location.search.substring(13,window.location.search.length);
//             //     $.get('/messages?campaign_id='+campaign_id+'&page='+page, function (data) {
//             //         $('.vt-inbox-list.fluid').append(data);
//             //         page ++;
//             //     });
//             // }
//             // else
//             // {
//             //     $.get('/messages?page='+page, function (data) {
//             //         $('.vt-inbox-list.fluid').append(data);
//             //         page ++;
//             //     });
//             // }
//         }
//         var message_times = $(".message_time");

//         $.each( message_times , function( index, value ) {
//             var now = moment.unix( parseInt($(this).attr('data-time-now')) );
//             var created = moment.unix(  parseInt($(this).attr('data-time-created')) );
//             var mmoment = moment(created).from(now);
//             $(this).next('p').html(mmoment);
//         });
//     })

// })
