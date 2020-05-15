<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="csrf_token" content="{{ csrf_token() }}" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>

        .main-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .recorder-wrapper {
            display: flex;
            flex-direction: column;
            /*justify-content: center;*/
            align-items: center;
            width: 320px;
        }

        .main-wrapper h3 {
            margin-bottom: 30px;
        }

        .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        .inputfile + label {
            font-size: 1.25em;
            font-weight: 700;
            color: white;
            background-color: #a07cb2;
            display: flex;
            justify-content: center;
            cursor: pointer;
            width: 140px;
            padding: 20px;
            border-radius: 5px;
        }

        .inputfile:focus + label,
        .inputfile + label:hover {
            background-color: #675073;
        }



    </style>

</head>
<body>

<div class="main-wrapper">
    <h3>IOS Video Record Demo</h3>

    <div id="vs-start" class="recorder-wrapper" >
        <input type="file" name="vs-recorder" accept="video/*" capture="user" id="vs-recorder" class="inputfile">
        <label for="vs-recorder" id="vs-recorder-label">Record video</label>
    </div>

    <div id="vs-busy" class="recorder-wrapper" style="display: none;">
        <h3 id="uploading-text">Uploading video...</h3>
    </div>

    <div id="vs-done" class="recorder-wrapper" style="display: none;">
        <video id="player" width="320" controls playsinline ></video>

        <p>Showing video preview.</p>
        <p>And will also show "Play", "Next" and "Record" buttons.</p>
    </div>
</div>





<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>

    var token = document.querySelector("meta[name=csrf_token]").getAttribute('content');
    console.log(token);
    var recorder = document.getElementById('vs-recorder');
    var player = document.getElementById('player');

    var start = document.getElementById('vs-start');
    var busy = document.getElementById('vs-busy');
    var done = document.getElementById('vs-done');


    recorder.addEventListener('change', function(e) {
        var file = e.target.files[0];
        // Do something with the video file.
//        player.src = URL.createObjectURL(file);

        start.style.display = 'none';
        busy.style.display = 'block';

        var formData = new FormData();
        formData.append('vsfile',file);
        var config = {
            headers: {
                'content-type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest',
                'CSRF-Token': token,
            }
        };

        axios.defaults.headers = {
            'content-type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'CSRF-Token': token,
        };

        axios.post('videoupload', formData, config)
                .then(function (response) {

                    setTimeout(function() {
                        busy.style.display = 'none';
                        done.style.display = 'block';
                        player.src = URL.createObjectURL(file);
                    }, 5000);

                })
                .catch(function (error) {
                    console.log(error);
                });

    });
</script>
</body>
</html>