<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>flash_recorder</title>
    <meta name="description" content="" />
    
    <script src="/assets/flash_recorder/bin/js/swfobject.js"></script>
    <script>
        var flashvars = {
        quality : 80
        };
        var params = {
            menu: "false",
            scale: "noScale",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            bgcolor: "",
            wmode: "direct" // can cause issues with FP settings & webcam
        };
        var attributes = {
            id:"flashrecorder"
        };
        swfobject.embedSWF(
            "/assets/flash_recorder/bin/flashrecorder.swf", 
            "altContent", "400", "300", "10.0.0", 
            "/assets/flash_recorder/bin/expressInstall.swf", 
            flashvars, params, attributes);
        
        // BRIDGE STUFF
        // logs from Flash
        function log() {
            var log = Function.prototype.bind.call(console.log, console);
            log.apply(console, arguments);
        }
        
        
        function swf_events(event, data){
            //log('swf_events : ' + event);
            switch(event){
            
                case 'cam_ok':
                    log(event);
                break;
                
                
                case 'cam_muted':
                
                break;
                
                case 'cam_not_found':
                
                break;
                
                case 'video_frame_data':
                    // data.position - position of the frame (milliseconds)
                    // data.bytes - base64 string of JPEG bytes
                    log('video_frame_data : ' + data.position + ' ms, ' + data.bytes.length + " length.");
                break;
                
                case 'sound_recording_progress':
                    // data = 0..100 mic activityLevel
                    // update a mic volume bar here
                    log('sound_recording_progress [activityLevel]: ' + data);
                break;
                
                
                case 'generation_wave_complete':
                    log('generation_wave_complete');
                break;
                
                case 'mp3_encode_progress':
                    log('mp3_encode_progress : ' + data);
                break;
                
                case 'mp3_encode_complete':
                    // data - mp3_bytes
                    log('mp3_encode_complete : ' + data.length + 'bytes');
                break;
            
            }
        
            return true;
        }
        
        
        function onVideoFrameReady(position_ms, jpg_bytes_base64str){
            //log('onVideoFrameReady : ' + position_ms, jpg_bytes_base64str.length);
        }
        
        
        
        
        // HTML BUTTONS STUFF
        function onRecordClick(){
            //alert("onRecordClick")
            var swfObject = document.getElementById("flashrecorder");
            swfObject.capture();
        }
        
        function onStopClick(){
            //alert("onStopClick")
            var swfObject = document.getElementById("flashrecorder");
            swfObject.stop();
        }
    </script>
    <style>
        html, body { height:100%; overflow:hidden; }
        body { margin:0; }
    </style>
</head>
<body>
    <div id="altContent">
        <h1>flash_recorder</h1>
        <p><a href="http://www.adobe.com/go/getflashplayer">Get Adobe Flash player</a></p>
    </div>
    <button type="button" onclick="onRecordClick()">Record</button>
    <button type="button" onclick="onStopClick()">Stop</button>
</body>
</html>