var redis         = require('redis');
var client        = redis.createClient();
var express       = require('express');
var http          = require('http');
var https         = require('https');
var child_process = require('child_process');
var qs            = require('querystring');
var urlencode     = require('urlencode');
var ffmpeg        = require('fluent-ffmpeg');
var fs            = require("fs");
var rmdir         = require('rimraf');
var useragent     = require('express-useragent');
var command       = ffmpeg();
var app           = express();
var arr           = [];
var count         = 0;
var audioCount    = 0;
var exec          = child_process.exec;

var uploadPath = '/home/voicestak/public_html/app/node/uploads/';
var publicUploadPath = '/home/voicestak/public_html/app/public/uploads/';

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Product-Session, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Referer, User-Agent');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(useragent.express());
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/images', function (req, res) {
    console.log('----- UPLOAD IMAGE -----');
    if(req.method =='POST') {
        var body = '';
        var i = 0;
        req.on('data', function (data) {
            console.log('--- RECEIVING IMAGE DATA ' + i++ + ' ---');
            body += data;
        });
        req.on('end',function(){
            console.log('----- IMAGE DATA END -----');
            var POST = qs.parse(body);
            console.log('--- body: ', body, POST);
            try {
                console.log('--- CHECK IF IMAGE DIR EXISTS ---');
                stats = fs.lstatSync(uploadPath + POST.token);
            }
            catch (e) {
                console.log('--- IMAGE DIR DOES NOT EXIST, SO CREATE IT ---');
                fs.mkdirSync(uploadPath + POST.token);
            }
            
            if(POST.bytes !== undefined){
                
                var inputs_arr = urlencode.decode(POST.bytes).split(',');
                console.log('--- POST BYTES EXIST ---');
                for(var i = 0; i < inputs_arr.length; i++) {
                    console.log('--- CREATE FILE: ', POST.token+"/img"+count+".jpg");
                    fs.writeFileSync(uploadPath + POST.token+"/img"+count+".jpg", inputs_arr[i], 'base64');
                    count++;
                }
            }
        });
    }
    console.log('----- IMAGE FUNCTION DONE -----');
    res.send("OK"); 

});

app.post('/images-complete', function (req, res) {
    if(req.method =='POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end',function(){
            var POST = qs.parse(body);
            if(POST.bytes !== undefined){
                var inputs_arr = urlencode.decode(POST.bytes).split(',');
                // var audio_arr  = urlencode.decode(POST.mp3).split(',');
                for(var i = 0; i < inputs_arr.length; i++) {
                    fs.writeFileSync(uploadPath + POST.token+"/img"+count+".jpg", inputs_arr[i], 'base64');
                    count++;
                }
            }  
        });
    }
    res.send("image_done");
});

app.post('/audio', function (req, res) {
    if(req.method =='POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end',function(){
            var POST = qs.parse(body);
            try {
                stats = fs.lstatSync(uploadPath + POST.token);
            }
            catch (e) {
                fs.mkdirSync(uploadPath + POST.token);
            }
            
            if(POST.audio_bytes !== undefined){
                
                var inputs_arr = urlencode.decode(POST.audio_bytes).split(',');
                
                for(var i = 0; i < inputs_arr.length; i++) {
                    fs.writeFileSync(uploadPath + POST.token+"/audio"+audioCount+".wav", inputs_arr[i], 'base64');
                    fs.appendFileSync(uploadPath + POST.token+"/file.txt", "file 'audio"+audioCount+".wav'\r\n");
                    audioCount++;
                }
            }
        });
    }
    
    res.send("OK"); 

});

app.post('/audio-complete', function (req, res) {
    if(req.method =='POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end',function(){
            var POST = qs.parse(body);
            if(POST.audio_bytes !== undefined){
                var inputs_arr = urlencode.decode(POST.audio_bytes).split(',');
                for(var i = 0; i < inputs_arr.length; i++) {
                    fs.writeFileSync( uploadPath + POST.token+"/audio"+audioCount+".wav", inputs_arr[i], 'base64');
                    fs.appendFileSync(uploadPath + POST.token+"/file.txt", "file 'audio"+audioCount+".wav'\r\n");
                    audioCount++;
                }

            }
        });
    } 
    res.send("audio_done");
});

app.post('/ffmpeg', function (req, res) {
    console.log('----- starting ffmpeg -----');
    res.connection.setTimeout(0);
    if(req.method == 'POST') {
        var body = '';
        var i = 0;
        req.on('data', function (data) {
            console.log('--- receiving data ' + i++ + ' ---');
            body += data;
        });

        req.on('end',function(){
            console.log('----- Data transfer ended -----');
            var POST = qs.parse(body);
            console.log('--- body: ', body);
            console.log('--- parsed body', POST);
            //if(req.useragent.browser != "Safari") {
            //    exec("ffmpeg -f concat -i "+POST.token+"/file.txt -c:a libmp3lame "+POST.token+"/audio.mp3", function(err) {
            //        exec("ffmpeg -r 60 -i "+POST.token+"/img%d.jpg -i "+POST.token+"/audio.mp3 -c:v libx264 -c:a libmp3lame -strict experimental -pix_fmt yuv420p ../public/uploads/video/"+POST.token+".mp4", function(err) {
            //            arr.length = 0;
            //            count      = 0;
            //            audioCount = 0;
            //            rmdir(POST.token, function(err) {
            //                if(err)
            //                    console.log(err);
            //            });
            //            res.send({file_name: POST.token+".mp4", file_type: 'video'});
            //        });
            //    });
            //} else {
                exec("ffmpeg -f concat -i "+ uploadPath + POST.token+"/file.txt "+ uploadPath + POST.token+"/audio.mp3", function(err) {
                    console.log('--- Audio ERR: ', err );
                    //var command = "ffmpeg -r 32.9 -i "+ uploadPath + POST.token+"/img%d.jpg -i "+ uploadPath + POST.token+"/audio.mp3 " + publicUploadPath + "video/"+POST.token+".mp4";
                    var command = "ffmpeg -r 32.9 -i "+ uploadPath + POST.token+"/img%d.jpg -i "+ uploadPath + POST.token+"/audio.mp3 -c:v libx264 -c:a aac -strict experimental -pix_fmt yuv420p " + publicUploadPath + "video/" + POST.token + ".mp4";
                    //var command = "ffmpeg -r 32.9 -i "+ uploadPath + POST.token+"/img%d.jpg -i /home/voicestak/app/public/uploads/video/"+POST.token+".mp4";

                    exec(command, function(err) {
                        console.log('--- Video ERR: ', err);
                        arr.length = 0;
                        count      = 0;
                        audioCount = 0;

                        // todo re-enable rmdir
                        //rmdir(POST.token, function(err) {
                        //    if(err)
                        //        console.log(err);
                        //});
                        res.send({file_name: POST.token+".mp4", file_type: 'video'}); 
                    });
                });
            //}

            // if(req.useragent.browser == "Safari" && req.useragent.version != "8.0.7"){
            //     exec("ffmpeg -f concat -i "+POST.token+"/file.txt -c:a copy "+POST.token+"/audio.mp3", function(err) {
            //         exec("ffmpeg -r 33 -i "+POST.token+"/img%d.jpg -i "+POST.token+"/audio.mp3 -c:v libx264 -c:a copy -strict experimental -pix_fmt yuv420p ../public/uploads/video/"+POST.token+".mp4", function(err) {
            //             res.send({file_name: POST.token+".mp4", file_type: 'video'}); 
            //             arr.length = 0;
            //             count      = 0;
            //             audioCount = 0;
                        
            //             rmdir(POST.token, function(err) {
            //                 if(err)
            //                     console.log(err);
            //             });
            //         });
            //     });
            // }
        });
    }
});

app.post('/only-audio', function (req, res) {
    if(req.method =='POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end',function(){
            var POST = qs.parse(body);
            try {
                stats = fs.lstatSync(uploadPath + POST.token);
            }
            catch (e) {
                fs.mkdirSync(uploadPath + POST.token);
            }

            if(POST.flashAudio !== undefined){
                
                var inputs_arr = urlencode.decode(POST.flashAudio).split(',');
                
                for(var i = 0; i < inputs_arr.length; i++) {
                    fs.writeFileSync(uploadPath + POST.token+"/audio"+audioCount+".wav", inputs_arr[i], 'base64');
                    fs.appendFileSync(uploadPath + POST.token+"/file.txt", "file 'audio"+audioCount+".wav'\r\n");
                    audioCount++;
                }
            }
        });
    }
    
    res.send("OK"); 

});

app.post('/only-audio-complete', function (req, res) {
    if(req.method =='POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end',function(){
            var POST = qs.parse(body);
            if(POST.flashAudio !== undefined){
                var inputs_arr = urlencode.decode(POST.flashAudio).split(',');
                for(var i = 0; i < inputs_arr.length; i++) {
                    fs.writeFileSync(uploadPath + POST.token+"/audio"+audioCount+".wav", inputs_arr[i], 'base64');
                    fs.appendFileSync(uploadPath + POST.token+"/file.txt", "file 'audio"+audioCount+".wav'\r\n");
                    audioCount++;
                }
                exec("ffmpeg -f concat -i "+ uploadPath + POST.token+"/file.txt -c:a libmp3lame " + publicUploadPath + "audio/"+POST.token+".mp3", function(err) {
                    audioCount = 0;

                    // todo re-enable rmdir
                    //rmdir(uploadPath + POST.token, function(err) {
                    //    if(err)
                    //        console.log(err);
                    //});
                    res.send({file_name: POST.token+".mp3", file_type: 'audio'}); 
                });
            }
        });
    }
});

// OLD pre https code
//var server = app.listen(4444, function () {
//    var host = server.address().address;
//    var port = server.address().port;
//
//    console.log('Example app listening at http://%s:%s', host, port);
//});

// ----------------
var privateKey = fs.readFileSync('/home/voicestak/ssl/keys/c416f_88537_622e55d355db333be394680a644334a9.key');
var certificate = fs.readFileSync('/home/voicestak/ssl/certs/app_voicestak_com_c416f_88537_1519714790_54a5d5351002eb2d1670fb8527a2ade5.crt');

var server = https.createServer({ key: privateKey, cert: certificate }, app).listen(4444, function() {
    console.log('Voicestak is listening on ' + server.address().address + ':' + server.address().port);
});

client.on('connect', function() {
    console.log('connected');
});


console.log("Server is listening");
