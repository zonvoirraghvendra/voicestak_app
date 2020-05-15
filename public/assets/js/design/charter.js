// /* Author:

// */



// $('.show-tooltip').tooltip();

// $('#toggle-one').bootstrapToggle();

// // WIZARD - CHOOSE POSITION - JS

// var activeEl = 2;
// $(function() {
//     var items = $('.btn-nav');
//     $( items[activeEl] ).addClass('active');
//     $( ".btn-nav" ).click(function() {
//         $( items ).removeClass('active');
//         $( this ).addClass('active');
//         activeEl = $( ".btn-nav" ).index( this );
//     });
// });



// function generatechartData() {
//     var chartData = [];
//     //var firstDate = new Date();
//     var a = timefirst.setDate(timelast.getDate()-diffDays);
//     for (var i = 0; i <= diffDays; i++) {
//         // we create date objects here. In your data, you can have date strings
//         // and then set format of your dates using chart.dataDateFormat property,
//         // however when possible, use date objects, as this will speed up chart rendering.
//         var newDate = new Date(timefirst);
//         newDate.setDate(newDate.getDate() + i);
//         console.log(newDate);
//         var visits = Math.round(Math.random() * 100 - 50);

//         chartData.push({
//             date: newDate,
//             visits: visits
//         });
//     }
//     return chartData;
// }

// var chart = AmCharts.makeChart("chart-data-1", {
//     "theme": "light",
//     "type": "serial",
//     "marginRight": 30,
//     "autoMarginOffset": 10,
//     "marginTop":20,
//     "dataProvider": chartData,
//     "valueAxes": [{
//         "id": "v1",
//         "axisAlpha": 0.1
//     }],
//     "graphs": [{
//         "useNegativeColorIfDown": true,
//         "balloonText": "[[category]]<br><b>value: [[value]]</b>",
//         "bullet": "round",
//         "bulletBorderAlpha": 1,
//         "bulletBorderColor": "#FFFFFF",
//         "hideBulletsCount": 50,
//         "lineThickness": 2,
//         "lineColor": "#fdd400",
//         "negativeLineColor": "#67b7dc",
//         "valueField": "visits"
//     }],
//     "chartScrollbar": {
//         "scrollbarHeight": 5,
//         "backgroundAlpha": 0.1,
//         "backgroundColor": "#868686",
//         "selectedBackgroundColor": "#67b7dc",
//         "selectedBackgroundAlpha": 1
//     },
//     "chartCursor": {
//         "valueLineEnabled": true,
//         "valueLineBalloonEnabled": true
//     },
//     "categoryField": "date",
//     "categoryAxis": {
//         "parseDates": true,
//         "axisAlpha": 0,
//         "minHorizontalGap": 60
//     },
//     "export": {
//         "enabled": true
//     }
// });

// chart.addListener("dataUpdated", zoomChart);
// //zoomChart();

// function zoomChart() {
//     if (chart.zoomToIndexes) {
//         chart.zoomToIndexes(130, chartData.length - 1);
//     }
// }

// $('#date-filter-1').daterangepicker({
//   "timePickerIncrement": 1,
//   "ranges": {
//       "Last 7 Days": [
//           "2015-07-10T11:48:18.616Z",
//           "2015-07-16T11:48:18.617Z"
//       ],
//       "Last 30 Days": [
//           "2015-06-17T11:48:18.617Z",
//           "2015-07-16T11:48:18.617Z"
//       ],
//       "This Month": [
//           "2015-06-30T16:00:00.000Z",
//           "2015-07-31T15:59:59.999Z"
//       ],
//       "Last Month": [
//           "2015-05-31T16:00:00.000Z",
//           "2015-06-30T15:59:59.999Z"
//       ]
//   },
//   "startDate": "07/01/2015",
//   "endDate": "07/15/2015",
//   "opens": "left",
//   "drops": "down",
//   "buttonClasses": "btn btn-sm",
//   "applyClass": "btn-success",
//   "cancelClass": "btn-default"
// });
// var firstDate = Date.parse(arr[0].value);
// var lastDate  = Date.parse(arr[arr.length - 1].value);
// var oneDay    = 24*60*60*1000;
// var timefirst = new Date(firstDate);
// var timelast  = new Date(lastDate);
// var diffDays  = Math.round(Math.abs((timefirst.getTime() - timelast.getTime())/(oneDay)));
function yyyymmdd(dateIn) {
   var a = dateIn;
   var b = a.getFullYear();
   var c = a.getMonth();
   (++c < 10)? c = "0" + c : c;
   var d = a.getDate();
   (d < 10)? d = "0" + d : d;
   var final = b + "-" + c + "-" + d; 
   return final;
}

var arr = $('.stats');
var days = [];
for(var i = 0; i < arr.length; i++){
    days.push(arr[i].value);
}
var uniqueDays = [];
$.each(days, function(i, el){
    if($.inArray(el, uniqueDays) === -1) uniqueDays.push(el);
});
var clicks = [];
var count = 0;
for(var j = 0; j < uniqueDays.length; j++){
    for(var k = 0; k < days.length; k++){
        if(uniqueDays[j] == days[k]){
            count++;
        }
    }
    clicks.push(count);
    count = 0;
}

var date = ['x'];
var data = ['widget'];
data = data.concat( clicks );
date = date.concat( uniqueDays );

$('#config').keyup(function() {
    eval($(this).val());
});

$('.configurator input').change(function() {
    updateConfig();
});

$('.datePicker i').click(function() {
    $(this).parent().find('input').click();
});


var options = {};

options.opens = 'left';


$('#datePicker').daterangepicker(options, function(start, end, label) {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var first = start._d;
    var second = end._d;
    var diffDays = Math.round(Math.abs((first.getTime() - second.getTime())/(oneDay)));

    days = [];
    for(var i = 0; i < diffDays; i++){
        
        var d = new Date(first.setDate(first.getDate()+i));
        d = yyyymmdd(d);

        days.push(d);
        first.setDate(start._d.getDate()-i);
    }

    var new_date = [];
    var new_data = [];
    $.each(date ,function(i,el){
        for( day in days ){
            if( el == days[day]){
                new_date.push(el);
                new_data.push(data[i]);
            }
        }
    })

    var filtered_date = ['x'];
    var filtered_data = ['widget'];
    new_data = filtered_data.concat( new_data );
    new_date = filtered_date.concat( new_date );
    var chart = c3.generate({
        data: {
            x: 'x',
            columns: [
                new_date,
                new_data
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        }
    });
});

$('.month').on('click', function() {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var first = new Date();
    var second = new Date();
    first.setMonth(first.getMonth() - 1);
    second.setTime(second.getTime() + 24 * 60 * 60 * 1000);
    var diffDays = Math.round(Math.abs((first.getTime() - second.getTime())/(oneDay)));

    days = [];
    for(var i = 0; i < diffDays; i++){
        
        var d = new Date(first.setDate(first.getDate()+i));
        d = yyyymmdd(d);

        days.push(d);
        first.setDate(first.getDate()-i);
    }

    var new_date = [];
    var new_data = [];
    $.each(date ,function(i,el){
        for( day in days ){
            if( el == days[day]){
                new_date.push(el);
                new_data.push(data[i]);
            }
        }
    })

    var filtered_date = ['x'];
    var filtered_data = ['widget'];
    new_data = filtered_data.concat( new_data );
    new_date = filtered_date.concat( new_date );
    var chart = c3.generate({
        data: {
            x: 'x',
            columns: [
                new_date,
                new_data
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        }
    });
});

$('.week').on('click', function() {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var first = new Date();
    var second = new Date();
    first.setTime(first.getTime() - 7 * 24 * 60 * 60 * 1000);
    second.setTime(second.getTime() + 24 * 60 * 60 * 1000);
    var diffDays = Math.round(Math.abs((first.getTime() - second.getTime())/(oneDay)));

    days = [];
    for(var i = 0; i < diffDays; i++){
        
        var d = new Date(first.setDate(first.getDate()+i));
        d = yyyymmdd(d);

        days.push(d);
        first.setDate(first.getDate()-i);
    }

    var new_date = [];
    var new_data = [];
    $.each(date ,function(i,el){
        for( day in days ){
            if( el == days[day]){
                new_date.push(el);
                new_data.push(data[i]);
            }
        }
    })

    var filtered_date = ['x'];
    var filtered_data = ['widget'];
    new_data = filtered_data.concat( new_data );
    new_date = filtered_date.concat( new_date );
    var chart = c3.generate({
        data: {
            x: 'x',
            columns: [
                new_date,
                new_data
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        }
    });
});

$('.today').on('click', function() {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var first = new Date();
    var second = new Date();
    // first.setTime(first.getTime() - 24 * 60 * 60 * 1000);
    second.setTime(second.getTime() + 24 * 60 * 60 * 1000);
    var diffDays = Math.round(Math.abs((first.getTime() - second.getTime())/(oneDay)));

    days = [];
    for(var i = 0; i < diffDays; i++){
        
        var d = new Date(first.setDate(first.getDate()+i));
        d = yyyymmdd(d);

        days.push(d);
        first.setDate(first.getDate()-i);
    }

    var new_date = [];
    var new_data = [];
    $.each(date ,function(i,el){
        for( day in days ){
            if( el == days[day]){
                new_date.push(el);
                new_data.push(data[i]);
            }
        }
    })

    var filtered_date = ['x'];
    var filtered_data = ['widget'];
    new_data = filtered_data.concat( new_data );
    new_date = filtered_date.concat( new_date );
    var chart = c3.generate({
        data: {
            x: 'x',
            columns: [
                new_date,
                new_data
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        }
    });
});

var chart = c3.generate({
    data: {
        x: 'x',
        columns: [
            date,
            data
        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    }
});



