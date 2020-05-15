




function getParentUrl() {
    var isInIframe = (parent !== window),
        parentUrl = null;

    if (isInIframe) {
        parentUrl = document.referrer;
    }

    return parentUrl;
}

var parent_url = getParentUrl();

var isFirefox = !!navigator.mozGetUserMedia;
var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
var isChrome = !isOpera && !isEdge && !!navigator.webkitGetUserMedia;


if(isFirefox) {
    
    console.log('this is FF');

        // Last time updated at Thursday, October 22nd, 2015, 8:20:55 PM 

        // links:
        // Open-Sourced: https://github.com/muaz-khan/RecordRTC
        // https://cdn.WebRTC-Experiment.com/RecordRTC.js
        // https://www.WebRTC-Experiment.com/RecordRTC.js
        // npm install recordrtc
        // http://recordrtc.org/

        // updates?
        /*
        -. Added support for MediaRecorder API in Chrome. Currently requires: RecordRTC(stream, {recorderType: MediaStreamRecorder})
        -. mimeType, bitsPerSecond, audioBitsPerSecond, videoBitsPerSecond added.
        -. CanvasRecorder.js updated to support Firefox. (experimental)
        -. Now you can reuse single RecordRTC object i.e. stop/start/stop/start/ and so on.
        -. GifRecorder.js can now record HTMLCanvasElement|CanvasRenderingContext2D as well.
        -. added: frameInterval:20 for WhammyRecorder.js
        -. chrome issue  audio plus 720p-video recording can be fixed by setting bufferSize:16384
        -. fixed Firefox save-as dialog i.e. recordRTC.save('filen-name')
        -. "indexedDB" bug fixed for Firefox.
        -. numberOfAudioChannels:1 can be passed to reduce WAV size in Chrome.
        -. StereoRecorder.js is removed. It was redundant. Now RecordRTC is directly using: StereoAudioRecorder.js
        -. mergeProps is removed. It was redundant.
        -. reformatProps is removed. Now plz pass exact frameRate/sampleRate instead of frame-rate/sample-rate
        -. Firefox supports remote-audio-recording since v28 - RecordRTC(remoteStream, { recorderType: StereoAudioRecorder });
        -. added 3 methods: initRecorder, setRecordingDuration and clearRecordedData
        -. Microsoft Edge support added (only-audio-yet).
        -. You can pass "recorderType" - RecordRTC(stream, { recorderType: StereoAudioRecorder });
        -. If MediaStream is suddenly stopped in Firefox.
        -. Added "disableLogs"         - RecordRTC(stream, { disableLogs: true });
        -. You can pass "bufferSize:0" - RecordRTC(stream, { bufferSize: 0 });
        -. You can set "leftChannel"   - RecordRTC(stream, { leftChannel: true });
        -. Added functionality for analyse black frames and cut them - pull#293
        -. if you're recording GIF, you must link: https://cdn.webrtc-experiment.com/gif-recorder.js
        -. You can set "frameInterval" for video - RecordRTC(stream, { type: 'video', frameInterval: 100 });
        */

        //------------------------------------

        // Browsers Support::
        // Chrome (all versions) [ audio/video separately ]
        // Firefox ( >= 29 ) [ audio/video in single webm/mp4 container or only audio in ogg ]
        // Opera (all versions) [ same as chrome ]
        // Android (Chrome) [ only video ]
        // Android (Opera) [ only video ]
        // Android (Firefox) [ only video ]
        // Microsoft Edge (Only Audio & Gif)

        //------------------------------------
        // Muaz Khan     - www.MuazKhan.com
        // MIT License   - www.WebRTC-Experiment.com/licence
        //------------------------------------
        // Note: RecordRTC.js is using 3 other libraries; you need to accept their licences as well.
        //------------------------------------
        // 1. RecordRTC.js
        // 2. MRecordRTC.js
        // 3. Cross-Browser-Declarations.js
        // 4. Storage.js
        // 5. MediaStreamRecorder.js
        // 6. StereoAudioRecorder.js
        // 7. CanvasRecorder.js
        // 8. WhammyRecorder.js
        // 9. Whammy.js
        // 10. DiskStorage.js
        // 11. GifRecorder.js
        //------------------------------------

        'use strict';

        // ____________
        // RecordRTC.js

        /**
         * {@link https://github.com/muaz-khan/RecordRTC|RecordRTC} is a JavaScript-based media-recording library for modern web-browsers (supporting WebRTC getUserMedia API). It is optimized for different devices and browsers to bring all client-side (pluginfree) recording solutions in single place.
         * @summary JavaScript audio/video recording library runs top over WebRTC getUserMedia API.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef RecordRTC
         * @class
         * @example
         * var recordRTC = RecordRTC(mediaStream, {
         *     type: 'video' // audio or video or gif or canvas
         * });
         *
         * // or, you can even use keyword "new"
         * var recordRTC = new RecordRTC(mediaStream[, config]);
         * @see For further information:
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
         * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
         */

        function RecordRTC(mediaStream, config) {
            if (!mediaStream) {
                throw 'MediaStream is mandatory.';
            }

            config = new RecordRTCConfiguration(mediaStream, config);

            // a reference to user's recordRTC object
            var self = this;

            function startRecording() {
                if (!config.disableLogs) {
                    console.debug('started recording ' + config.type + ' stream.');
                }

                if (mediaRecorder) {
                    mediaRecorder.clearRecordedData();
                    mediaRecorder.resume();

                    if (self.recordingDuration) {
                        handleRecordingDuration();
                    }
                    return self;
                }

                initRecorder(function() {
                    if (self.recordingDuration) {
                        handleRecordingDuration();
                    }
                });

                return self;
            }

            function initRecorder(initCallback) {
                if (!config.disableLogs) {
                    console.debug('initializing ' + config.type + ' stream recorder.');
                }

                if (initCallback) {
                    config.initCallback = function() {
                        initCallback();
                        initCallback = config.initCallback = null; // recordRTC.initRecorder should be call-backed once.
                    };
                }

                var Recorder = new GetRecorderType(mediaStream, config);

                mediaRecorder = new Recorder(mediaStream, config);
                mediaRecorder.record();
            }

            function stopRecording(callback) {
                if (!mediaRecorder) {
                    return console.warn(WARNING);
                }

                /*jshint validthis:true */
                var recordRTC = this;

                if (!config.disableLogs) {
                    console.warn('Stopped recording ' + config.type + ' stream.');
                }

                if (config.type !== 'gif') {
                    mediaRecorder.stop(_callback);
                } else {
                    mediaRecorder.stop();
                    _callback();
                }

                function _callback() {
                    for (var item in mediaRecorder) {
                        if (self) {
                            self[item] = mediaRecorder[item];
                        }

                        if (recordRTC) {
                            recordRTC[item] = mediaRecorder[item];
                        }
                    }

                    var blob = mediaRecorder.blob;
                    if (callback) {
                        var url = URL.createObjectURL(blob);
                        callback(url);
                    }

                    if (blob && !config.disableLogs) {
                        console.debug(blob.type, '->', bytesToSize(blob.size));
                    }

                    if (!config.autoWriteToDisk) {
                        return;
                    }

                    getDataURL(function(dataURL) {
                        var parameter = {};
                        parameter[config.type + 'Blob'] = dataURL;
                        DiskStorage.Store(parameter);
                    });
                }
            }

            function pauseRecording() {
                if (!mediaRecorder) {
                    return console.warn(WARNING);
                }

                mediaRecorder.pause();

                if (!config.disableLogs) {
                    console.debug('Paused recording.');
                }
            }

            function resumeRecording() {
                if (!mediaRecorder) {
                    return console.warn(WARNING);
                }

                // not all libs yet having  this method
                mediaRecorder.resume();

                if (!config.disableLogs) {
                    console.debug('Resumed recording.');
                }
            }

            function getDataURL(callback, _mediaRecorder) {
                if (!callback) {
                    throw 'Pass a callback function over getDataURL.';
                }

                var blob = _mediaRecorder ? _mediaRecorder.blob : mediaRecorder.blob;

                if (!blob) {
                    if (!config.disableLogs) {
                        console.warn('Blob encoder did not yet finished its job.');
                    }

                    setTimeout(function() {
                        getDataURL(callback, _mediaRecorder);
                    }, 1000);
                    return;
                }

                if (typeof Worker !== 'undefined') {
                    var webWorker = processInWebWorker(function readFile(_blob) {
                        postMessage(new FileReaderSync().readAsDataURL(_blob));
                    });

                    webWorker.onmessage = function(event) {
                        callback(event.data);
                    };

                    webWorker.postMessage(blob);
                } else {
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = function(event) {
                        callback(event.target.result);
                    };
                }

                function processInWebWorker(_function) {
                    var blob = URL.createObjectURL(new Blob([_function.toString(),
                        'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
                    ], {
                        type: 'application/javascript'
                    }));

                    var worker = new Worker(blob);
                    URL.revokeObjectURL(blob);
                    return worker;
                }
            }

            function handleRecordingDuration() {
                setTimeout(function() {
                    stopRecording(self.onRecordingStopped);
                }, self.recordingDuration);
            }

            var WARNING = 'It seems that "startRecording" is not invoked for ' + config.type + ' recorder.';

            var mediaRecorder;

            var returnObject = {
                /**
                 * This method starts recording. It doesn't take any argument.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.startRecording();
                 */
                startRecording: startRecording,

                /**
                 * This method stops recording. It takes single "callback" argument. It is suggested to get blob or URI in the callback to make sure all encoders finished their jobs.
                 * @param {function} callback - This callback function is invoked after completion of all encoding jobs.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function(videoURL) {
                 *     video.src = videoURL;
                 *     recordRTC.blob; recordRTC.buffer;
                 * });
                 */
                stopRecording: stopRecording,

                /**
                 * This method pauses the recording process.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.pauseRecording();
                 */
                pauseRecording: pauseRecording,

                /**
                 * This method resumes the recording process.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.resumeRecording();
                 */
                resumeRecording: resumeRecording,

                /**
                 * This method initializes the recording process.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.initRecorder();
                 */
                initRecorder: initRecorder,

                /**
                 * This method initializes the recording process.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.initRecorder();
                 */
                setRecordingDuration: function(milliseconds, callback) {
                    if (typeof milliseconds === 'undefined') {
                        throw 'milliseconds is required.';
                    }

                    if (typeof milliseconds !== 'number') {
                        throw 'milliseconds must be a number.';
                    }

                    self.recordingDuration = milliseconds;
                    self.onRecordingStopped = callback || function() {};

                    return {
                        onRecordingStopped: function(callback) {
                            self.onRecordingStopped = callback;
                        }
                    };
                },

                /**
                 * This method can be used to clear/reset all the recorded data.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.clearRecordedData();
                 */
                clearRecordedData: function() {
                    if (!mediaRecorder) {
                        return console.warn(WARNING);
                    }

                    mediaRecorder.clearRecordedData();

                    if (!config.disableLogs) {
                        console.debug('Cleared old recorded data.');
                    }
                },

                /**
                 * It is equivalent to <code class="str">"recordRTC.blob"</code> property.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     var blob = recordRTC.getBlob();
                 *
                 *     // equivalent to: recordRTC.blob property
                 *     var blob = recordRTC.blob;
                 * });
                 */
                getBlob: function() {
                    if (!mediaRecorder) {
                        return console.warn(WARNING);
                    }

                    return mediaRecorder.blob;
                },

                /**
                 * This method returns DataURL. It takes single "callback" argument.
                 * @param {function} callback - DataURL is passed back over this callback.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     recordRTC.getDataURL(function(dataURL) {
                 *         video.src = dataURL;
                 *     });
                 * });
                 */
                getDataURL: getDataURL,

                /**
                 * This method returns Virutal/Blob URL. It doesn't take any argument.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     video.src = recordRTC.toURL();
                 * });
                 */
                toURL: function() {
                    if (!mediaRecorder) {
                        return console.warn(WARNING);
                    }

                    return URL.createObjectURL(mediaRecorder.blob);
                },

                /**
                 * This method saves blob/file into disk (by inovking save-as dialog). It takes single (optional) argument i.e. FileName
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     recordRTC.save('file-name');
                 * });
                 */
                save: function(fileName) {
                    if (!mediaRecorder) {
                        return console.warn(WARNING);
                    }

                    invokeSaveAsDialog(mediaRecorder.blob, fileName);
                },

                /**
                 * This method gets blob from indexed-DB storage. It takes single "callback" argument.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.getFromDisk(function(dataURL) {
                 *     video.src = dataURL;
                 * });
                 */
                getFromDisk: function(callback) {
                    if (!mediaRecorder) {
                        return console.warn(WARNING);
                    }

                    RecordRTC.getFromDisk(config.type, callback);
                },

                /**
                 * This method appends prepends array of webp images to the recorded video-blob. It takes an "array" object.
                 * @type {Array.<Array>}
                 * @param {Array} arrayOfWebPImages - Array of webp images.
                 * @method
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * var arrayOfWebPImages = [];
                 * arrayOfWebPImages.push({
                 *     duration: index,
                 *     image: 'data:image/webp;base64,...'
                 * });
                 * recordRTC.setAdvertisementArray(arrayOfWebPImages);
                 */
                setAdvertisementArray: function(arrayOfWebPImages) {
                    config.advertisement = [];

                    var length = arrayOfWebPImages.length;
                    for (var i = 0; i < length; i++) {
                        config.advertisement.push({
                            duration: i,
                            image: arrayOfWebPImages[i]
                        });
                    }
                },

                /**
                 * It is equivalent to <code class="str">"recordRTC.getBlob()"</code> method.
                 * @property {Blob} blob - Recorded Blob can be accessed using this property.
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     var blob = recordRTC.blob;
                 *
                 *     // equivalent to: recordRTC.getBlob() method
                 *     var blob = recordRTC.getBlob();
                 * });
                 */
                blob: null,

                /**
                 * @todo Add descriptions.
                 * @property {number} bufferSize - Either audio device's default buffer-size, or your custom value.
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     var bufferSize = recordRTC.bufferSize;
                 * });
                 */
                bufferSize: 0,

                /**
                 * @todo Add descriptions.
                 * @property {number} sampleRate - Audio device's default sample rates.
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     var sampleRate = recordRTC.sampleRate;
                 * });
                 */
                sampleRate: 0,

                /**
                 * @todo Add descriptions.
                 * @property {ArrayBuffer} buffer - Audio ArrayBuffer, supported only in Chrome.
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     var buffer = recordRTC.buffer;
                 * });
                 */
                buffer: null,

                /**
                 * @todo Add descriptions.
                 * @property {DataView} view - Audio DataView, supported only in Chrome.
                 * @memberof RecordRTC
                 * @instance
                 * @example
                 * recordRTC.stopRecording(function() {
                 *     var dataView = recordRTC.view;
                 * });
                 */
                view: null
            };

            if (!this) {
                self = returnObject;
                return returnObject;
            }

            // if someone wanna use RecordRTC with "new" keyword.
            for (var prop in returnObject) {
                this[prop] = returnObject[prop];
            }

            self = this;

            return returnObject;
        }

        /**
         * This method can be used to get all recorded blobs from IndexedDB storage.
         * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
         * @param {function} callback - Callback function to get all stored blobs.
         * @method
         * @memberof RecordRTC
         * @example
         * RecordRTC.getFromDisk('all', function(dataURL, type){
         *     if(type === 'audio') { }
         *     if(type === 'video') { }
         *     if(type === 'gif')   { }
         * });
         */
        RecordRTC.getFromDisk = function(type, callback) {
            if (!callback) {
                throw 'callback is mandatory.';
            }

            console.log('Getting recorded ' + (type === 'all' ? 'blobs' : type + ' blob ') + ' from disk!');
            DiskStorage.Fetch(function(dataURL, _type) {
                if (type !== 'all' && _type === type + 'Blob' && callback) {
                    callback(dataURL);
                }

                if (type === 'all' && callback) {
                    callback(dataURL, _type.replace('Blob', ''));
                }
            });
        };

        /**
         * This method can be used to store recorded blobs into IndexedDB storage.
         * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
         * @method
         * @memberof RecordRTC
         * @example
         * RecordRTC.writeToDisk({
         *     audio: audioBlob,
         *     video: videoBlob,
         *     gif  : gifBlob
         * });
         */
        RecordRTC.writeToDisk = function(options) {
            console.log('Writing recorded blob(s) to disk!');
            options = options || {};
            if (options.audio && options.video && options.gif) {
                options.audio.getDataURL(function(audioDataURL) {
                    options.video.getDataURL(function(videoDataURL) {
                        options.gif.getDataURL(function(gifDataURL) {
                            DiskStorage.Store({
                                audioBlob: audioDataURL,
                                videoBlob: videoDataURL,
                                gifBlob: gifDataURL
                            });
                        });
                    });
                });
            } else if (options.audio && options.video) {
                options.audio.getDataURL(function(audioDataURL) {
                    options.video.getDataURL(function(videoDataURL) {
                        DiskStorage.Store({
                            audioBlob: audioDataURL,
                            videoBlob: videoDataURL
                        });
                    });
                });
            } else if (options.audio && options.gif) {
                options.audio.getDataURL(function(audioDataURL) {
                    options.gif.getDataURL(function(gifDataURL) {
                        DiskStorage.Store({
                            audioBlob: audioDataURL,
                            gifBlob: gifDataURL
                        });
                    });
                });
            } else if (options.video && options.gif) {
                options.video.getDataURL(function(videoDataURL) {
                    options.gif.getDataURL(function(gifDataURL) {
                        DiskStorage.Store({
                            videoBlob: videoDataURL,
                            gifBlob: gifDataURL
                        });
                    });
                });
            } else if (options.audio) {
                options.audio.getDataURL(function(audioDataURL) {
                    DiskStorage.Store({
                        audioBlob: audioDataURL
                    });
                });
            } else if (options.video) {
                options.video.getDataURL(function(videoDataURL) {
                    DiskStorage.Store({
                        videoBlob: videoDataURL
                    });
                });
            } else if (options.gif) {
                options.gif.getDataURL(function(gifDataURL) {
                    DiskStorage.Store({
                        gifBlob: gifDataURL
                    });
                });
            }
        };

        if (typeof module !== 'undefined' /* && !!module.exports*/ ) {
            module.exports = RecordRTC;
        }

        if (typeof define === 'function' && define.amd) {
            define('RecordRTC', [], function() {
                return RecordRTC;
            });
        }

        // __________________________
        // RecordRTC-Configuration.js

        /**
         * {@link RecordRTCConfiguration} is an inner/private helper for {@link RecordRTC}.
         * @summary It configures the 2nd parameter passed over {@link RecordRTC} and returns a valid "config" object.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef RecordRTCConfiguration
         * @class
         * @example
         * var options = RecordRTCConfiguration(mediaStream, options);
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
         * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
         */

        function RecordRTCConfiguration(mediaStream, config) {
            if (config.recorderType && !config.type) {
                if (config.recorderType === WhammyRecorder || config.recorderType === CanvasRecorder) {
                    config.type = 'video';
                } else if (config.recorderType === GifRecorder) {
                    config.type = 'gif';
                } else if (config.recorderType === StereoAudioRecorder) {
                    config.type = 'audio';
                } else if (config.recorderType === MediaStreamRecorder) {
                    if (mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
                        config.type = 'video';
                    } else if (mediaStream.getAudioTracks().length && !mediaStream.getVideoTracks().length) {
                        config.type = 'audio';
                    } else if (!mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
                        config.type = 'audio';
                    } else {
                        // config.type = 'UnKnown';
                    }
                }
            }

            if (typeof MediaStreamRecorder !== 'undefined' && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
                if (!config.mimeType) {
                    config.mimeType = 'video/webm';
                }

                if (!config.type) {
                    config.type = config.mimeType.split('/')[0];
                }

                if (!config.bitsPerSecond) {
                    config.bitsPerSecond = 128000;
                }
            }

            // consider default type=audio
            if (!config.type) {
                if (config.mimeType) {
                    config.type = config.mimeType.split('/')[0];
                }
                if (!config.type) {
                    config.type = 'audio';
                }
            }

            return config;
        }

        // __________________
        // GetRecorderType.js

        /**
         * {@link GetRecorderType} is an inner/private helper for {@link RecordRTC}.
         * @summary It returns best recorder-type available for your browser.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef GetRecorderType
         * @class
         * @example
         * var RecorderType = GetRecorderType(options);
         * var recorder = new RecorderType(options);
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
         * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
         */

        function GetRecorderType(mediaStream, config) {
            var recorder;

            // StereoAudioRecorder can work with all three: Edge, Firefox and Chrome
            // todo: detect if it is Edge, then auto use: StereoAudioRecorder
            if (isChrome || isEdge || isOpera) {
                // Media Stream Recording API has not been implemented in chrome yet;
                // That's why using WebAudio API to record stereo audio in WAV format
                recorder = StereoAudioRecorder;
            }

            if (typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype && !isChrome) {
                recorder = MediaStreamRecorder;
            }

            // video recorder (in WebM format)
            if (config.type === 'video' && (isChrome || isOpera)) {
                recorder = WhammyRecorder;
            }

            // video recorder (in Gif format)
            if (config.type === 'gif') {
                recorder = GifRecorder;
            }

            // html2canvas recording!
            if (config.type === 'canvas') {
                recorder = CanvasRecorder;
            }

            // todo: enable below block when MediaRecorder in Chrome gets out of flags; and it also supports audio recording.
            if (false && isChrome && recorder === WhammyRecorder && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
                if (mediaStream.getVideoTracks().length) {
                    recorder = MediaStreamRecorder;
                    if (!config.disableLogs) {
                        console.debug('Using MediaRecorder API in chrome!');
                    }
                }
            }

            if (config.recorderType) {
                recorder = config.recorderType;
            }

            return recorder;
        }

        // _____________
        // MRecordRTC.js

        /**
         * MRecordRTC runs top over {@link RecordRTC} to bring multiple recordings in single place, by providing simple API.
         * @summary MRecordRTC stands for "Multiple-RecordRTC".
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef MRecordRTC
         * @class
         * @example
         * var recorder = new MRecordRTC();
         * recorder.addStream(MediaStream);
         * recorder.mediaType = {
         *     audio: true,
         *     video: true,
         *     gif: true
         * };
         * recorder.startRecording();
         * @see For further information:
         * @see {@link https://github.com/muaz-khan/RecordRTC/tree/master/MRecordRTC|MRecordRTC Source Code}
         * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
         */

        function MRecordRTC(mediaStream) {

            /**
             * This method attaches MediaStream object to {@link MRecordRTC}.
             * @param {MediaStream} mediaStream - A MediaStream object, either fetched using getUserMedia API, or generated using captureStreamUntilEnded or WebAudio API.
             * @method
             * @memberof MRecordRTC
             * @example
             * recorder.addStream(MediaStream);
             */
            this.addStream = function(_mediaStream) {
                if (_mediaStream) {
                    mediaStream = _mediaStream;
                }
            };

            /**
             * This property can be used to set recording type e.g. audio, or video, or gif, or canvas.
             * @property {object} mediaType - {audio: true, video: true, gif: true}
             * @memberof MRecordRTC
             * @example
             * var recorder = new MRecordRTC();
             * recorder.mediaType = {
             *     audio: true,
             *     video: true,
             *     gif  : true
             * };
             */
            this.mediaType = {
                audio: true,
                video: true
            };

            /**
             * This method starts recording.
             * @method
             * @memberof MRecordRTC
             * @example
             * recorder.startRecording();
             */
            this.startRecording = function() {
                if (!isChrome && mediaStream && mediaStream.getAudioTracks && mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
                    // Firefox is supporting both audio/video in single blob
                    this.mediaType.audio = false;
                }

                if (this.mediaType.audio) {
                    this.audioRecorder = new RecordRTC(mediaStream, {
                        type: 'audio',
                        bufferSize: this.bufferSize,
                        sampleRate: this.sampleRate
                    });
                    this.audioRecorder.startRecording();
                }

                if (this.mediaType.video) {
                    this.videoRecorder = new RecordRTC(mediaStream, {
                        type: 'video',
                        video: this.video,
                        canvas: this.canvas
                    });
                    this.videoRecorder.startRecording();
                }

                if (this.mediaType.gif) {
                    this.gifRecorder = new RecordRTC(mediaStream, {
                        type: 'gif',
                        frameRate: this.frameRate || 200,
                        quality: this.quality || 10
                    });
                    this.gifRecorder.startRecording();
                }
            };

            /**
             * This method stop recording.
             * @param {function} callback - Callback function is invoked when all encoders finish their jobs.
             * @method
             * @memberof MRecordRTC
             * @example
             * recorder.stopRecording(function(recording){
             *     var audioBlob = recording.audio;
             *     var videoBlob = recording.video;
             *     var gifBlob   = recording.gif;
             * });
             */
            this.stopRecording = function(callback) {
                callback = callback || function() {};

                if (this.audioRecorder) {
                    this.audioRecorder.stopRecording(function(blobURL) {
                        callback(blobURL, 'audio');
                    });
                }

                if (this.videoRecorder) {
                    this.videoRecorder.stopRecording(function(blobURL) {
                        callback(blobURL, 'video');
                    });
                }

                if (this.gifRecorder) {
                    this.gifRecorder.stopRecording(function(blobURL) {
                        callback(blobURL, 'gif');
                    });
                }
            };

            /**
             * This method can be used to manually get all recorded blobs.
             * @param {function} callback - All recorded blobs are passed back to "callback" function.
             * @method
             * @memberof MRecordRTC
             * @example
             * recorder.getBlob(function(recording){
             *     var audioBlob = recording.audio;
             *     var videoBlob = recording.video;
             *     var gifBlob   = recording.gif;
             * });
             * // or
             * var audioBlob = recorder.getBlob().audio;
             * var videoBlob = recorder.getBlob().video;
             */
            this.getBlob = function(callback) {
                var output = {};

                if (this.audioRecorder) {
                    output.audio = this.audioRecorder.getBlob();
                }

                if (this.videoRecorder) {
                    output.video = this.videoRecorder.getBlob();
                }

                if (this.gifRecorder) {
                    output.gif = this.gifRecorder.getBlob();
                }

                if (callback) {
                    callback(output);
                }

                return output;
            };

            /**
             * This method can be used to manually get all recorded blobs' DataURLs.
             * @param {function} callback - All recorded blobs' DataURLs are passed back to "callback" function.
             * @method
             * @memberof MRecordRTC
             * @example
             * recorder.getDataURL(function(recording){
             *     var audioDataURL = recording.audio;
             *     var videoDataURL = recording.video;
             *     var gifDataURL   = recording.gif;
             * });
             */
            this.getDataURL = function(callback) {
                this.getBlob(function(blob) {
                    getDataURL(blob.audio, function(_audioDataURL) {
                        getDataURL(blob.video, function(_videoDataURL) {
                            callback({
                                audio: _audioDataURL,
                                video: _videoDataURL
                            });
                        });
                    });
                });

                function getDataURL(blob, callback00) {
                    if (typeof Worker !== 'undefined') {
                        var webWorker = processInWebWorker(function readFile(_blob) {
                            postMessage(new FileReaderSync().readAsDataURL(_blob));
                        });

                        webWorker.onmessage = function(event) {
                            callback00(event.data);
                        };

                        webWorker.postMessage(blob);
                    } else {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = function(event) {
                            callback00(event.target.result);
                        };
                    }
                }

                function processInWebWorker(_function) {
                    var blob = URL.createObjectURL(new Blob([_function.toString(),
                        'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
                    ], {
                        type: 'application/javascript'
                    }));

                    var worker = new Worker(blob);
                    var url;
                    if (typeof URL !== 'undefined') {
                        url = URL;
                    } else if (typeof webkitURL !== 'undefined') {
                        url = webkitURL;
                    } else {
                        throw 'Neither URL nor webkitURL detected.';
                    }
                    url.revokeObjectURL(blob);
                    return worker;
                }
            };

            /**
             * This method can be used to ask {@link MRecordRTC} to write all recorded blobs into IndexedDB storage.
             * @method
             * @memberof MRecordRTC
             * @example
             * recorder.writeToDisk();
             */
            this.writeToDisk = function() {
                RecordRTC.writeToDisk({
                    audio: this.audioRecorder,
                    video: this.videoRecorder,
                    gif: this.gifRecorder
                });
            };

            /**
             * This method can be used to invoke save-as dialog for all recorded blobs.
             * @param {object} args - {audio: 'audio-name', video: 'video-name', gif: 'gif-name'}
             * @method
             * @memberof MRecordRTC
             * @example
             * recorder.save({
             *     audio: 'audio-file-name',
             *     video: 'video-file-name',
             *     gif  : 'gif-file-name'
             * });
             */
            this.save = function(args) {
                args = args || {
                    audio: true,
                    video: true,
                    gif: true
                };

                if (!!args.audio && this.audioRecorder) {
                    this.audioRecorder.save(typeof args.audio === 'string' ? args.audio : '');
                }

                if (!!args.video && this.videoRecorder) {
                    this.videoRecorder.save(typeof args.video === 'string' ? args.video : '');
                }
                if (!!args.gif && this.gifRecorder) {
                    this.gifRecorder.save(typeof args.gif === 'string' ? args.gif : '');
                }
            };
        }

        /**
         * This method can be used to get all recorded blobs from IndexedDB storage.
         * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
         * @param {function} callback - Callback function to get all stored blobs.
         * @method
         * @memberof MRecordRTC
         * @example
         * MRecordRTC.getFromDisk('all', function(dataURL, type){
         *     if(type === 'audio') { }
         *     if(type === 'video') { }
         *     if(type === 'gif')   { }
         * });
         */
        MRecordRTC.getFromDisk = RecordRTC.getFromDisk;

        /**
         * This method can be used to store recorded blobs into IndexedDB storage.
         * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
         * @method
         * @memberof MRecordRTC
         * @example
         * MRecordRTC.writeToDisk({
         *     audio: audioBlob,
         *     video: videoBlob,
         *     gif  : gifBlob
         * });
         */
        MRecordRTC.writeToDisk = RecordRTC.writeToDisk;

        // _____________________________
        // Cross-Browser-Declarations.js

        // animation-frame used in WebM recording

        /*jshint -W079 */
        var requestAnimationFrame = window.requestAnimationFrame;
        if (typeof requestAnimationFrame === 'undefined') {
            if (typeof webkitRequestAnimationFrame !== 'undefined') {
                /*global requestAnimationFrame:true */
                requestAnimationFrame = webkitRequestAnimationFrame;
            }

            if (typeof mozRequestAnimationFrame !== 'undefined') {
                /*global requestAnimationFrame:true */
                requestAnimationFrame = mozRequestAnimationFrame;
            }
        }

        /*jshint -W079 */
        var cancelAnimationFrame = window.cancelAnimationFrame;
        if (typeof cancelAnimationFrame === 'undefined') {
            if (typeof webkitCancelAnimationFrame !== 'undefined') {
                /*global cancelAnimationFrame:true */
                cancelAnimationFrame = webkitCancelAnimationFrame;
            }

            if (typeof mozCancelAnimationFrame !== 'undefined') {
                /*global cancelAnimationFrame:true */
                cancelAnimationFrame = mozCancelAnimationFrame;
            }
        }

        // WebAudio API representer
        var AudioContext = window.AudioContext;

        if (typeof AudioContext === 'undefined') {
            if (typeof webkitAudioContext !== 'undefined') {
                /*global AudioContext:true */
                AudioContext = webkitAudioContext;
            }

            if (typeof mozAudioContext !== 'undefined') {
                /*global AudioContext:true */
                AudioContext = mozAudioContext;
            }
        }

        /*jshint -W079 */
        var URL = window.URL;

        if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
            /*global URL:true */
            URL = webkitURL;
        }

        /*global navigator:true */
        var navigator = window.navigator;

        if (typeof navigator !== 'undefined') {
            if (typeof navigator.webkitGetUserMedia !== 'undefined') {
                navigator.getUserMedia = navigator.webkitGetUserMedia;
            }

            if (typeof navigator.mozGetUserMedia !== 'undefined') {
                navigator.getUserMedia = navigator.mozGetUserMedia;
            }
        } else {
            navigator = {
                getUserMedia: function() {}
            };
        }

        var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);
        var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
        var isChrome = !isOpera && !isEdge && !!navigator.webkitGetUserMedia;

        var MediaStream = window.MediaStream;

        if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
            MediaStream = webkitMediaStream;
        }

        /*global MediaStream:true */
        if (!('stop' in MediaStream.prototype)) {
            MediaStream.prototype.stop = function() {
                this.getAudioTracks().forEach(function(track) {
                    track.stop();
                });

                this.getVideoTracks().forEach(function(track) {
                    track.stop();
                });
            };
        }

        if (typeof location !== 'undefined') {
            if (location.href.indexOf('file:') === 0) {
                console.error('Please load this HTML file on HTTP or HTTPS.');
            }
        }

        // below function via: http://goo.gl/B3ae8c
        /**
         * @param {number} bytes - Pass bytes and get formafted string.
         * @returns {string} - formafted string
         * @example
         * bytesToSize(1024*1024*5) === '5 GB'
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         */
        function bytesToSize(bytes) {
            var k = 1000;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) {
                return '0 Bytes';
            }
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        }

        /**
         * @param {Blob} file - File or Blob object. This parameter is required.
         * @param {string} fileName - Optional file name e.g. "Recorded-Video.webm"
         * @example
         * invokeSaveAsDialog(blob or file, [optional] fileName);
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         */
        function invokeSaveAsDialog(file, fileName) {
            if (!file) {
                throw 'Blob object is required.';
            }

            if (!file.type) {
                file.type = 'video/webm';
            }

            var fileExtension = file.type.split('/')[1];

            if (fileName && fileName.indexOf('.') !== -1) {
                var splitted = fileName.split('.');
                fileName = splitted[0];
                fileExtension = splitted[1];
            }

            var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

            if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
                return navigator.msSaveOrOpenBlob(file, fileFullName);
            } else if (typeof navigator.msSaveBlob !== 'undefined') {
                return navigator.msSaveBlob(file, fileFullName);
            }

            var hyperlink = document.createElement('a');
            hyperlink.href = URL.createObjectURL(file);
            hyperlink.target = '_blank';
            hyperlink.download = fileFullName;

            if (!!navigator.mozGetUserMedia) {
                hyperlink.onclick = function() {
                    (document.body || document.documentElement).removeChild(hyperlink);
                };
                (document.body || document.documentElement).appendChild(hyperlink);
            }

            var evt = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            hyperlink.dispatchEvent(evt);

            if (!navigator.mozGetUserMedia) {
                URL.revokeObjectURL(hyperlink.href);
            }
        }

        // __________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
        // Storage.js

        /**
         * Storage is a standalone object used by {@link RecordRTC} to store reusable objects e.g. "new AudioContext".
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @example
         * Storage.AudioContext === webkitAudioContext
         * @property {webkitAudioContext} AudioContext - Keeps a reference to AudioContext object.
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         */

        var Storage = {};

        if (typeof AudioContext !== 'undefined') {
            Storage.AudioContext = AudioContext;
        } else if (typeof webkitAudioContext !== 'undefined') {
            Storage.AudioContext = webkitAudioContext;
        }

        // ______________________
        // MediaStreamRecorder.js

        // todo: need to show alert boxes for incompatible cases
        // encoder only supports 48k/16k mono audio channel

        /*
         * Implementation of https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html
         * The MediaRecorder accepts a mediaStream as input source passed from UA. When recorder starts,
         * a MediaEncoder will be created and accept the mediaStream as input source.
         * Encoder will get the raw data by track data changes, encode it by selected MIME Type, then store the encoded in EncodedBufferCache object.
         * The encoded data will be extracted on every timeslice passed from Start function call or by RequestData function.
         * Thread model:
         * When the recorder starts, it creates a "Media Encoder" thread to read data from MediaEncoder object and store buffer in EncodedBufferCache object.
         * Also extract the encoded data and create blobs on every timeslice passed from start function or RequestData function called by UA.
         */

        /**
         * MediaStreamRecorder is an abstraction layer for "MediaRecorder API". It is used by {@link RecordRTC} to record MediaStream(s) in Firefox.
         * @summary Runs top over MediaRecorder API.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef MediaStreamRecorder
         * @class
         * @example
         * var options = {
         *     mimeType: 'video/mp4', // audio/ogg or video/webm
         *     audioBitsPerSecond : 128000,
         *     videoBitsPerSecond : 2500000,
         *     bitsPerSecond: 2500000  // if this is provided, skip above two
         * }
         * var recorder = new MediaStreamRecorder(MediaStream, options);
         * recorder.record();
         * recorder.stop(function(blob) {
         *     video.src = URL.createObjectURL(blob);
         *
         *     // or
         *     var blob = recorder.blob;
         * });
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
         * @param {object} config - {disableLogs:true, initCallback: function, mimeType: "video/webm", onAudioProcessStarted: function}
         */

        function MediaStreamRecorder(mediaStream, config) {
            config = config || {
                bitsPerSecond: 128000,
                mimeType: 'video/webm'
            };

            // if user chosen only audio option; and he tried to pass MediaStream with
            // both audio and video tracks;
            // using a dirty workaround to generate audio-only stream so that we can get audio/ogg output.
            if (!isChrome && config.type && config.type === 'audio') {
                if (mediaStream.getVideoTracks && mediaStream.getVideoTracks().length) {
                    var context = new AudioContext();
                    var mediaStreamSource = context.createMediaStreamSource(mediaStream);

                    var destination = context.createMediaStreamDestination();
                    mediaStreamSource.connect(destination);

                    mediaStream = destination.stream;
                }

                if (!config.mimeType || config.mimeType.indexOf('audio') === -1) {
                    config.mimeType = 'audio/ogg';
                }
            }

            var recordedBuffers = [];

            /**
             * This method records MediaStream.
             * @method
             * @memberof MediaStreamRecorder
             * @example
             * recorder.record();
             */
            this.record = function() {
                var recorderHints = config;

                if (isChrome) {
                    if (!recorderHints || typeof recorderHints !== 'string') {
                        recorderHints = 'video/vp8';

                        // chrome currently supports only video recording
                        mediaStream = new MediaStream(mediaStream.getVideoTracks());
                    }
                }

                if (!config.disableLogs) {
                    console.log('Passing following config over MediaRecorder API.', recorderHints);
                }

                if (mediaRecorder) {
                    // mandatory to make sure Firefox doesn't fails to record streams 3-4 times without reloading the page.
                    mediaRecorder = null;
                }

                // http://dxr.mozilla.org/mozilla-central/source/content/media/MediaRecorder.cpp
                // https://wiki.mozilla.org/Gecko:MediaRecorder
                // https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html

                // starting a recording session; which will initiate "Reading Thread"
                // "Reading Thread" are used to prevent main-thread blocking scenarios
                mediaRecorder = new MediaRecorder(mediaStream, recorderHints);

                if ('canRecordMimeType' in mediaRecorder && mediaRecorder.canRecordMimeType(config.mimeType) === false) {
                    if (!config.disableLogs) {
                        console.warn('MediaRecorder API seems unable to record mimeType:', config.mimeType);
                    }
                }

                // i.e. stop recording when <video> is paused by the user; and auto restart recording 
                // when video is resumed. E.g. yourStream.getVideoTracks()[0].muted = true; // it will auto-stop recording.
                mediaRecorder.ignoreMutedMedia = config.ignoreMutedMedia || false;

                // Dispatching OnDataAvailable Handler
                mediaRecorder.ondataavailable = function(e) {
                    if (this.dontFireOnDataAvailableEvent) {
                        return;
                    }

                    if (isChrome && e.data && !('size' in e.data)) {
                        e.data.size = e.data.length || e.data.byteLength || 0;
                    }

                    if (e.data && e.data.size) {
                        recordedBuffers.push(e.data);
                    }
                };

                mediaRecorder.onerror = function(error) {
                    if (!config.disableLogs) {
                        if (error.name === 'InvalidState') {
                            console.error('The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.');
                        } else if (error.name === 'OutOfMemory') {
                            console.error('The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.');
                        } else if (error.name === 'IllegalStreamModification') {
                            console.error('A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.');
                        } else if (error.name === 'OtherRecordingError') {
                            console.error('Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.');
                        } else if (error.name === 'GenericError') {
                            console.error('The UA cannot provide the codec or recording option that has been requested.', error);
                        } else {
                            console.error('MediaRecorder Error', error);
                        }
                    }

                    // When the stream is "ended" set recording to 'inactive' 
                    // and stop gathering data. Callers should not rely on 
                    // exactness of the timeSlice value, especially 
                    // if the timeSlice value is small. Callers should 
                    // consider timeSlice as a minimum value

                    if (mediaRecorder.state !== 'inactive' && mediaRecorder.state !== 'stopped') {
                        mediaRecorder.stop();
                    }
                    // self.record(0);
                };

                // void start(optional long mTimeSlice)
                // The interval of passing encoded data from EncodedBufferCache to onDataAvailable
                // handler. "mTimeSlice < 0" means Session object does not push encoded data to
                // onDataAvailable, instead, it passive wait the client side pull encoded data
                // by calling requestData API.
                mediaRecorder.start(1);

                // Start recording. If timeSlice has been provided, mediaRecorder will
                // raise a dataavailable event containing the Blob of collected data on every timeSlice milliseconds.
                // If timeSlice isn't provided, UA should call the RequestData to obtain the Blob data, also set the mTimeSlice to zero.

                if (config.onAudioProcessStarted) {
                    config.onAudioProcessStarted();
                }

                if (config.initCallback) {
                    config.initCallback();
                }
            };

            /**
             * This method stops recording MediaStream.
             * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
             * @method
             * @memberof MediaStreamRecorder
             * @example
             * recorder.stop(function(blob) {
             *     video.src = URL.createObjectURL(blob);
             * });
             */
            this.stop = function(callback) {
                if (!mediaRecorder) {
                    return;
                }

                this.recordingCallback = callback || function() {};

                // mediaRecorder.state === 'recording' means that media recorder is associated with "session"
                // mediaRecorder.state === 'stopped' means that media recorder is detached from the "session" ... in this case; "session" will also be deleted.

                if (mediaRecorder.state === 'recording') {
                    // "stop" method auto invokes "requestData"!
                    mediaRecorder.requestData();
                    mediaRecorder.stop();
                }

                if (recordedBuffers.length) {
                    this.onRecordingFinished();
                }
            };

            this.onRecordingFinished = function() {
                /**
                 * @property {Blob} blob - Recorded frames in video/webm blob.
                 * @memberof MediaStreamRecorder
                 * @example
                 * recorder.stop(function() {
                 *     var blob = recorder.blob;
                 * });
                 */
                this.blob = new Blob(recordedBuffers, {
                    type: config.mimeType || 'video/webm'
                });

                this.recordingCallback();

                recordedBuffers = [];
            };

            /**
             * This method pauses the recording process.
             * @method
             * @memberof MediaStreamRecorder
             * @example
             * recorder.pause();
             */
            this.pause = function() {
                if (!mediaRecorder) {
                    return;
                }

                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.pause();
                }
            };

            /**
             * This method resumes the recording process.
             * @method
             * @memberof MediaStreamRecorder
             * @example
             * recorder.resume();
             */
            this.resume = function() {
                if (this.dontFireOnDataAvailableEvent) {
                    this.dontFireOnDataAvailableEvent = false;
                    this.record();
                    return;
                }

                if (!mediaRecorder) {
                    return;
                }

                if (mediaRecorder.state === 'paused') {
                    mediaRecorder.resume();
                }
            };

            /**
             * This method resets currently recorded data.
             * @method
             * @memberof MediaStreamRecorder
             * @example
             * recorder.clearRecordedData();
             */
            this.clearRecordedData = function() {
                if (!mediaRecorder) {
                    return;
                }

                this.pause();

                this.dontFireOnDataAvailableEvent = true;
                this.stop();
            };

            // Reference to "MediaRecorder" object
            var mediaRecorder;

            function isMediaStreamActive() {
                if ('active' in mediaStream) {
                    if (!mediaStream.active) {
                        return false;
                    }
                } else if ('ended' in mediaStream) { // old hack
                    if (mediaStream.ended) {
                        return false;
                    }
                }
            }

            var self = this;

            // this method checks if media stream is stopped
            // or any track is ended.
            (function looper() {
                if (!mediaRecorder) {
                    return;
                }

                if (isMediaStreamActive() === false) {
                    self.stop();
                    return;
                }

                setTimeout(looper, 1000); // check every second
            })();
        }

        // source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js
        // https://github.com/mattdiamond/Recorderjs#license-mit
        // ______________________
        // StereoAudioRecorder.js

        /**
         * StereoAudioRecorder is a standalone class used by {@link RecordRTC} to bring "stereo" audio-recording in chrome.
         * @summary JavaScript standalone object for stereo audio recording.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef StereoAudioRecorder
         * @class
         * @example
         * var recorder = new StereoAudioRecorder(MediaStream, {
         *     sampleRate: 44100,
         *     bufferSize: 4096
         * });
         * recorder.record();
         * recorder.stop(function(blob) {
         *     video.src = URL.createObjectURL(blob);
         * });
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
         * @param {object} config - {sampleRate: 44100, bufferSize: 4096, numberOfAudioChannels: 1, etc.}
         */

        function StereoAudioRecorder(mediaStream, config) {
            if (!mediaStream.getAudioTracks().length) {
                throw 'Your stream has no audio tracks.';
            }

            config = config || {};

            var self = this;

            // variables
            var leftchannel = [];
            var rightchannel = [];
            var recording = false;
            var recordingLength = 0;
            var jsAudioNode;

            var numberOfAudioChannels = 2;

            // backward compatibility
            if (config.leftChannel === true) {
                numberOfAudioChannels = 1;
            }

            if (config.numberOfAudioChannels === 1) {
                numberOfAudioChannels = 1;
            }

            if (!config.disableLogs) {
                console.debug('StereoAudioRecorder is set to record number of channels: ', numberOfAudioChannels);
            }

            function isMediaStreamActive() {
                if ('active' in mediaStream) {
                    if (!mediaStream.active) {
                        return false;
                    }
                } else if ('ended' in mediaStream) { // old hack
                    if (mediaStream.ended) {
                        return false;
                    }
                }
            }

            /**
             * This method records MediaStream.
             * @method
             * @memberof StereoAudioRecorder
             * @example
             * recorder.record();
             */
            this.record = function() {
                if (isMediaStreamActive() === false) {
                    throw 'Please make sure MediaStream is active.';
                }

                // reset the buffers for the new recording
                leftchannel.length = rightchannel.length = 0;
                recordingLength = 0;

                if (audioInput) {
                    audioInput.connect(jsAudioNode);
                }

                // to prevent self audio to be connected with speakers
                // jsAudioNode.connect(context.destination);

                isAudioProcessStarted = isPaused = false;
                recording = true;
            };

            function mergeLeftRightBuffers(config, callback) {
                function mergeAudioBuffers(config, cb) {
                    var numberOfAudioChannels = config.numberOfAudioChannels;

                    // todo: "slice(0)" --- is it causes loop? Should be removed?
                    var leftBuffers = config.leftBuffers.slice(0);
                    var rightBuffers = config.rightBuffers.slice(0);
                    var sampleRate = config.sampleRate;
                    var internalInterleavedLength = config.internalInterleavedLength;

                    if (numberOfAudioChannels === 2) {
                        leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
                        rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);
                    }

                    if (numberOfAudioChannels === 1) {
                        leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
                    }

                    function mergeBuffers(channelBuffer, rLength) {
                        var result = new Float64Array(rLength);
                        var offset = 0;
                        var lng = channelBuffer.length;

                        for (var i = 0; i < lng; i++) {
                            var buffer = channelBuffer[i];
                            result.set(buffer, offset);
                            offset += buffer.length;
                        }

                        return result;
                    }

                    function interleave(leftChannel, rightChannel) {
                        var length = leftChannel.length + rightChannel.length;

                        var result = new Float64Array(length);

                        var inputIndex = 0;

                        for (var index = 0; index < length;) {
                            result[index++] = leftChannel[inputIndex];
                            result[index++] = rightChannel[inputIndex];
                            inputIndex++;
                        }
                        return result;
                    }

                    function writeUTFBytes(view, offset, string) {
                        var lng = string.length;
                        for (var i = 0; i < lng; i++) {
                            view.setUint8(offset + i, string.charCodeAt(i));
                        }
                    }

                    // interleave both channels together
                    var interleaved;

                    if (numberOfAudioChannels === 2) {
                        interleaved = interleave(leftBuffers, rightBuffers);
                    }

                    if (numberOfAudioChannels === 1) {
                        interleaved = leftBuffers;
                    }

                    var interleavedLength = interleaved.length;

                    // create wav file
                    var resultingBufferLength = 44 + interleavedLength * 2;

                    var buffer = new ArrayBuffer(resultingBufferLength);

                    var view = new DataView(buffer);

                    // RIFF chunk descriptor/identifier 
                    writeUTFBytes(view, 0, 'RIFF');

                    // RIFF chunk length
                    view.setUint32(4, 44 + interleavedLength * 2, true);

                    // RIFF type 
                    writeUTFBytes(view, 8, 'WAVE');

                    // format chunk identifier 
                    // FMT sub-chunk
                    writeUTFBytes(view, 12, 'fmt ');

                    // format chunk length 
                    view.setUint32(16, 16, true);

                    // sample format (raw)
                    view.setUint16(20, 1, true);

                    // stereo (2 channels)
                    view.setUint16(22, numberOfAudioChannels, true);

                    // sample rate 
                    view.setUint32(24, sampleRate, true);

                    // byte rate (sample rate * block align)
                    view.setUint32(28, sampleRate * 4, true);

                    // block align (channel count * bytes per sample) 
                    view.setUint16(32, numberOfAudioChannels * 2, true);

                    // bits per sample 
                    view.setUint16(34, 16, true);

                    // data sub-chunk
                    // data chunk identifier 
                    writeUTFBytes(view, 36, 'data');

                    // data chunk length 
                    view.setUint32(40, interleavedLength * 2, true);

                    // write the PCM samples
                    var lng = interleavedLength;
                    var index = 44;
                    var volume = 1;
                    for (var i = 0; i < lng; i++) {
                        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
                        index += 2;
                    }

                    if (cb) {
                        return cb({
                            buffer: buffer,
                            view: view
                        });
                    }

                    postMessage({
                        buffer: buffer,
                        view: view
                    });
                }

                if (!isChrome) {
                    // its Microsoft Edge
                    mergeAudioBuffers(config, function(data) {
                        callback(data.buffer, data.view);
                    });
                    return;
                }


                var webWorker = processInWebWorker(mergeAudioBuffers);

                webWorker.onmessage = function(event) {
                    callback(event.data.buffer, event.data.view);

                    // release memory
                    URL.revokeObjectURL(webWorker.workerURL);
                };

                webWorker.postMessage(config);
            }

            function processInWebWorker(_function) {
                var workerURL = URL.createObjectURL(new Blob([_function.toString(),
                    ';this.onmessage =  function (e) {' + _function.name + '(e.data);}'
                ], {
                    type: 'application/javascript'
                }));

                var worker = new Worker(workerURL);
                worker.workerURL = workerURL;
                return worker;
            }

            /**
             * This method stops recording MediaStream.
             * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
             * @method
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(blob) {
             *     video.src = URL.createObjectURL(blob);
             * });
             */
            this.stop = function(callback) {
                // stop recording
                recording = false;

                // to make sure onaudioprocess stops firing
                // audioInput.disconnect();

                mergeLeftRightBuffers({
                    sampleRate: sampleRate,
                    numberOfAudioChannels: numberOfAudioChannels,
                    internalInterleavedLength: recordingLength,
                    leftBuffers: leftchannel,
                    rightBuffers: numberOfAudioChannels === 1 ? [] : rightchannel
                }, function(buffer, view) {
                    /**
                     * @property {Blob} blob - The recorded blob object.
                     * @memberof StereoAudioRecorder
                     * @example
                     * recorder.stop(function(){
                     *     var blob = recorder.blob;
                     * });
                     */
                    self.blob = new Blob([view], {
                        type: 'audio/wav'
                    });

                    /**
                     * @property {ArrayBuffer} buffer - The recorded buffer object.
                     * @memberof StereoAudioRecorder
                     * @example
                     * recorder.stop(function(){
                     *     var buffer = recorder.buffer;
                     * });
                     */
                    self.buffer = new ArrayBuffer(view);

                    /**
                     * @property {DataView} view - The recorded data-view object.
                     * @memberof StereoAudioRecorder
                     * @example
                     * recorder.stop(function(){
                     *     var view = recorder.view;
                     * });
                     */
                    self.view = view;

                    self.sampleRate = sampleRate;
                    self.bufferSize = bufferSize;

                    // recorded audio length
                    self.length = recordingLength;

                    if (callback) {
                        callback();
                    }

                    isAudioProcessStarted = false;
                });
            };

            if (!Storage.AudioContextConstructor) {
                Storage.AudioContextConstructor = new Storage.AudioContext();
            }

            var context = Storage.AudioContextConstructor;

            // creates an audio node from the microphone incoming stream
            var audioInput = context.createMediaStreamSource(mediaStream);

            var legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];

            /**
             * From the spec: This value controls how frequently the audioprocess event is
             * dispatched and how many sample-frames need to be processed each call.
             * Lower values for buffer size will result in a lower (better) latency.
             * Higher values will be necessary to avoid audio breakup and glitches
             * The size of the buffer (in sample-frames) which needs to
             * be processed each time onprocessaudio is called.
             * Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
             * @property {number} bufferSize - Buffer-size for how frequently the audioprocess event is dispatched.
             * @memberof StereoAudioRecorder
             * @example
             * recorder = new StereoAudioRecorder(mediaStream, {
             *     bufferSize: 4096
             * });
             */

            // "0" means, let chrome decide the most accurate buffer-size for current platform.
            var bufferSize = typeof config.bufferSize === 'undefined' ? 4096 : config.bufferSize;

            if (legalBufferValues.indexOf(bufferSize) === -1) {
                if (!config.disableLogs) {
                    console.warn('Legal values for buffer-size are ' + JSON.stringify(legalBufferValues, null, '\t'));
                }
            }

            if (context.createJavaScriptNode) {
                jsAudioNode = context.createJavaScriptNode(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
            } else if (context.createScriptProcessor) {
                jsAudioNode = context.createScriptProcessor(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
            } else {
                throw 'WebAudio API has no support on this browser.';
            }

            // connect the stream to the gain node
            audioInput.connect(jsAudioNode);

            if (!config.bufferSize) {
                bufferSize = jsAudioNode.bufferSize; // device buffer-size
            }

            /**
             * The sample rate (in sample-frames per second) at which the
             * AudioContext handles audio. It is assumed that all AudioNodes
             * in the context run at this rate. In making this assumption,
             * sample-rate converters or "varispeed" processors are not supported
             * in real-time processing.
             * The sampleRate parameter describes the sample-rate of the
             * linear PCM audio data in the buffer in sample-frames per second.
             * An implementation must support sample-rates in at least
             * the range 22050 to 96000.
             * @property {number} sampleRate - Buffer-size for how frequently the audioprocess event is dispatched.
             * @memberof StereoAudioRecorder
             * @example
             * recorder = new StereoAudioRecorder(mediaStream, {
             *     sampleRate: 44100
             * });
             */
            var sampleRate = typeof config.sampleRate !== 'undefined' ? config.sampleRate : context.sampleRate || 44100;

            if (sampleRate < 22050 || sampleRate > 96000) {
                // Ref: http://stackoverflow.com/a/26303918/552182
                if (!config.disableLogs) {
                    console.warn('sample-rate must be under range 22050 and 96000.');
                }
            }

            if (!config.disableLogs) {
                console.log('sample-rate', sampleRate);
                console.log('buffer-size', bufferSize);
            }

            var isPaused = false;
            /**
             * This method pauses the recording process.
             * @method
             * @memberof StereoAudioRecorder
             * @example
             * recorder.pause();
             */
            this.pause = function() {
                isPaused = true;
            };

            /**
             * This method resumes the recording process.
             * @method
             * @memberof StereoAudioRecorder
             * @example
             * recorder.resume();
             */
            this.resume = function() {
                if (isMediaStreamActive() === false) {
                    throw 'Please make sure MediaStream is active.';
                }

                if (!recording) {
                    if (!config.disableLogs) {
                        console.info('Seems recording has been restarted.');
                    }
                    this.record();
                    return;
                }

                isPaused = false;
            };

            /**
             * This method resets currently recorded data.
             * @method
             * @memberof StereoAudioRecorder
             * @example
             * recorder.clearRecordedData();
             */
            this.clearRecordedData = function() {
                this.pause();

                leftchannel.length = rightchannel.length = 0;
                recordingLength = 0;
            };

            var isAudioProcessStarted = false;

            function onAudioProcessDataAvailable(e) {
                if (isPaused) {
                    return;
                }

                if (isMediaStreamActive() === false) {
                    if (!config.disableLogs) {
                        console.error('MediaStream seems stopped.');
                    }
                    jsAudioNode.disconnect();
                    recording = false;
                }

                if (!recording) {
                    audioInput.disconnect();
                    return;
                }

                /**
                 * This method is called on "onaudioprocess" event's first invocation.
                 * @method {function} onAudioProcessStarted
                 * @memberof StereoAudioRecorder
                 * @example
                 * recorder.onAudioProcessStarted: function() { };
                 */
                if (!isAudioProcessStarted) {
                    isAudioProcessStarted = true;
                    if (config.onAudioProcessStarted) {
                        config.onAudioProcessStarted();
                    }

                    if (config.initCallback) {
                        config.initCallback();
                    }
                }

                var left = e.inputBuffer.getChannelData(0);

                // we clone the samples
                leftchannel.push(new Float32Array(left));

                if (numberOfAudioChannels === 2) {
                    var right = e.inputBuffer.getChannelData(1);
                    rightchannel.push(new Float32Array(right));
                }

                recordingLength += bufferSize;
            }

            jsAudioNode.onaudioprocess = onAudioProcessDataAvailable;

            // to prevent self audio to be connected with speakers
            jsAudioNode.connect(context.destination);
        }

        // _________________
        // CanvasRecorder.js

        /**
         * CanvasRecorder is a standalone class used by {@link RecordRTC} to bring HTML5-Canvas recording into video WebM. It uses HTML2Canvas library and runs top over {@link Whammy}.
         * @summary HTML2Canvas recording into video WebM.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef CanvasRecorder
         * @class
         * @example
         * var recorder = new CanvasRecorder(htmlElement, { disableLogs: true });
         * recorder.record();
         * recorder.stop(function(blob) {
         *     video.src = URL.createObjectURL(blob);
         * });
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         * @param {HTMLElement} htmlElement - querySelector/getElementById/getElementsByTagName[0]/etc.
         * @param {object} config - {disableLogs:true, initCallback: function}
         */

        function CanvasRecorder(htmlElement, config) {
            if (typeof html2canvas === 'undefined') {
                throw 'Please link: //cdn.webrtc-experiment.com/screenshot.js';
            }

            config = config || {};

            // via DetectRTC.js
            var isCanvasSupportsStreamCapturing = false;
            ['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function(item) {
                if (item in document.createElement('canvas')) {
                    isCanvasSupportsStreamCapturing = true;
                }
            });

            var globalCanvas, globalContext, mediaStreamRecorder;

            if (isCanvasSupportsStreamCapturing) {
                if (!config.disableLogs) {
                    console.debug('Your browser supports both MediRecorder API and canvas.captureStream!');
                }

                globalCanvas = document.createElement('canvas');

                globalCanvas.width = htmlElement.clientWidth || window.innerWidth;
                globalCanvas.height = htmlElement.clientHeight || window.innerHeight;

                globalCanvas.style = 'top: -9999999; left: -99999999; visibility:hidden; position:absoluted; display: none;';
                (document.body || document.documentElement).appendChild(globalCanvas);

                globalContext = globalCanvas.getContext('2d');
            } else if (!!navigator.mozGetUserMedia) {
                if (!config.disableLogs) {
                    alert('Canvas recording is NOT supported in Firefox.');
                }
            }

            var isRecording;

            /**
             * This method records Canvas.
             * @method
             * @memberof CanvasRecorder
             * @example
             * recorder.record();
             */
            this.record = function() {
                if (isCanvasSupportsStreamCapturing) {
                    // CanvasCaptureMediaStream
                    var canvasMediaStream;
                    if ('captureStream' in globalCanvas) {
                        canvasMediaStream = globalCanvas.captureStream(25); // 25 FPS
                    } else if ('mozCaptureStream' in globalCanvas) {
                        canvasMediaStream = globalCanvas.captureStream(25);
                    } else if ('webkitCaptureStream' in globalCanvas) {
                        canvasMediaStream = globalCanvas.captureStream(25);
                    }

                    if (!canvasMediaStream) {
                        throw 'captureStream API are NOT available.';
                    }

                    // Note: Sep, 2015 status is that, MediaRecorder API can't record CanvasCaptureMediaStream object.
                    mediaStreamRecorder = new MediaStreamRecorder(canvasMediaStream, {
                        mimeType: 'video/webm'
                    });
                    mediaStreamRecorder.record();
                }

                isRecording = true;
                whammy.frames = [];
                drawCanvasFrame();

                if (config.initCallback) {
                    config.initCallback();
                }
            };

            /**
             * This method stops recording Canvas.
             * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
             * @method
             * @memberof CanvasRecorder
             * @example
             * recorder.stop(function(blob) {
             *     video.src = URL.createObjectURL(blob);
             * });
             */
            this.stop = function(callback) {
                isRecording = false;

                if (isCanvasSupportsStreamCapturing && mediaStreamRecorder) {
                    var slef = this;
                    mediaStreamRecorder.stop(function() {
                        for (var prop in mediaStreamRecorder) {
                            self[prop] = mediaStreamRecorder[prop];
                        }
                        if (callback) {
                            callback(that.blob);
                        }
                    });
                    return;
                }

                var that = this;

                /**
                 * @property {Blob} blob - Recorded frames in video/webm blob.
                 * @memberof CanvasRecorder
                 * @example
                 * recorder.stop(function() {
                 *     var blob = recorder.blob;
                 * });
                 */
                whammy.compile(function(blob) {
                    that.blob = blob;

                    if (that.blob.forEach) {
                        that.blob = new Blob([], {
                            type: 'video/webm'
                        });
                    }

                    if (callback) {
                        callback(that.blob);
                    }

                    whammy.frames = [];
                });
            };

            var isPausedRecording = false;

            /**
             * This method pauses the recording process.
             * @method
             * @memberof CanvasRecorder
             * @example
             * recorder.pause();
             */
            this.pause = function() {
                isPausedRecording = true;
            };

            /**
             * This method resumes the recording process.
             * @method
             * @memberof CanvasRecorder
             * @example
             * recorder.resume();
             */
            this.resume = function() {
                isPausedRecording = false;
            };

            /**
             * This method resets currently recorded data.
             * @method
             * @memberof CanvasRecorder
             * @example
             * recorder.clearRecordedData();
             */
            this.clearRecordedData = function() {
                this.pause();
                whammy.frames = [];
            };

            function drawCanvasFrame() {
                if (isPausedRecording) {
                    lastTime = new Date().getTime();
                    return setTimeout(drawCanvasFrame, 100);
                }

                html2canvas(htmlElement, {
                    onrendered: function(canvas) {
                        if (isCanvasSupportsStreamCapturing) {
                            var image = document.createElement('img');
                            image.src = canvas.toDataURL('image/png');
                            image.onload = function() {
                                globalContext.drawImage(image, 0, 0, image.clientWidth, image.clientHeight);
                                (document.body || document.documentElement).removeChild(image);
                            };
                            image.style.opacity = 0;
                            (document.body || document.documentElement).appendChild(image);
                        } else {
                            var duration = new Date().getTime() - lastTime;
                            if (!duration) {
                                return drawCanvasFrame();
                            }

                            // via #206, by Jack i.e. @Seymourr
                            lastTime = new Date().getTime();

                            whammy.frames.push({
                                duration: duration,
                                image: canvas.toDataURL('image/webp')
                            });
                        }

                        if (isRecording) {
                            setTimeout(drawCanvasFrame, 0);
                        }
                    }
                });
            }

            var lastTime = new Date().getTime();

            var whammy = new Whammy.Video(100);
        }

        // _________________
        // WhammyRecorder.js

        /**
         * WhammyRecorder is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It runs top over {@link Whammy}.
         * @summary Video recording feature in Chrome.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef WhammyRecorder
         * @class
         * @example
         * var recorder = new WhammyRecorder(mediaStream);
         * recorder.record();
         * recorder.stop(function(blob) {
         *     video.src = URL.createObjectURL(blob);
         * });
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
         * @param {object} config - {disableLogs: true, initCallback: function, video: HTMLVideoElement, etc.}
         */

        function WhammyRecorder(mediaStream, config) {

            config = config || {};

            if (!config.frameInterval) {
                config.frameInterval = 10;
            }

            if (!config.disableLogs) {
                console.log('Using frames-interval:', config.frameInterval);
            }

            /**
             * This method records video.
             * @method
             * @memberof WhammyRecorder
             * @example
             * recorder.record();
             */
            this.record = function() {
                if (!config.width) {
                    config.width = 320;
                }

                if (!config.height) {
                    config.height = 240;
                }

                if (!config.video) {
                    config.video = {
                        width: config.width,
                        height: config.height
                    };
                }

                if (!config.canvas) {
                    config.canvas = {
                        width: config.width,
                        height: config.height
                    };
                }

                canvas.width = config.canvas.width;
                canvas.height = config.canvas.height;

                context = canvas.getContext('2d');

                // setting defaults
                if (config.video && config.video instanceof HTMLVideoElement) {
                    video = config.video.cloneNode();

                    if (config.initCallback) {
                        config.initCallback();
                    }
                } else {
                    video = document.createElement('video');

                    if (typeof video.srcObject !== 'undefined') {
                        video.srcObject = mediaStream;
                    } else {
                        video.src = URL.createObjectURL(mediaStream);
                    }

                    video.onloadedmetadata = function() { // "onloadedmetadata" may NOT work in FF?
                        if (config.initCallback) {
                            config.initCallback();
                        }
                    };

                    video.width = config.video.width;
                    video.height = config.video.height;
                }

                video.muted = true;
                video.play();

                lastTime = new Date().getTime();
                whammy = new Whammy.Video();

                if (!config.disableLogs) {
                    console.log('canvas resolutions', canvas.width, '*', canvas.height);
                    console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);
                }

                drawFrames(config.frameInterval);
            };

            /**
             * Draw and push frames to Whammy
             * @param {integer} frameInterval - set minimum interval (in milliseconds) between each time we push a frame to Whammy
             */
            function drawFrames(frameInterval) {
                frameInterval = typeof frameInterval !== 'undefined' ? frameInterval : 10;

                var duration = new Date().getTime() - lastTime;
                if (!duration) {
                    return setTimeout(drawFrames, frameInterval, frameInterval);
                }

                if (isPausedRecording) {
                    lastTime = new Date().getTime();
                    return setTimeout(drawFrames, 100);
                }

                // via #206, by Jack i.e. @Seymourr
                lastTime = new Date().getTime();

                if (video.paused) {
                    // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
                    // Tweak for Android Chrome
                    video.play();
                }

                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                whammy.frames.push({
                    duration: duration,
                    image: canvas.toDataURL('image/webp')
                });

                if (!isStopDrawing) {
                    setTimeout(drawFrames, frameInterval, frameInterval);
                }
            }

            /**
             * remove black frames from the beginning to the specified frame
             * @param {Array} _frames - array of frames to be checked
             * @param {number} _framesToCheck - number of frame until check will be executed (-1 - will drop all frames until frame not matched will be found)
             * @param {number} _pixTolerance - 0 - very strict (only black pixel color) ; 1 - all
             * @param {number} _frameTolerance - 0 - very strict (only black frame color) ; 1 - all
             * @returns {Array} - array of frames
             */
            // pull#293 by @volodalexey
            function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance) {
                var localCanvas = document.createElement('canvas');
                localCanvas.width = canvas.width;
                localCanvas.height = canvas.height;
                var context2d = localCanvas.getContext('2d');
                var resultFrames = [];

                var checkUntilNotBlack = _framesToCheck === -1;
                var endCheckFrame = (_framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length) ?
                    _framesToCheck : _frames.length;
                var sampleColor = {
                    r: 0,
                    g: 0,
                    b: 0
                };
                var maxColorDifference = Math.sqrt(
                    Math.pow(255, 2) +
                    Math.pow(255, 2) +
                    Math.pow(255, 2)
                );
                var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
                var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
                var doNotCheckNext = false;

                for (var f = 0; f < endCheckFrame; f++) {
                    var matchPixCount, endPixCheck, maxPixCount;

                    if (!doNotCheckNext) {
                        var image = new Image();
                        image.src = _frames[f].image;
                        context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
                        var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
                        matchPixCount = 0;
                        endPixCheck = imageData.data.length;
                        maxPixCount = imageData.data.length / 4;

                        for (var pix = 0; pix < endPixCheck; pix += 4) {
                            var currentColor = {
                                r: imageData.data[pix],
                                g: imageData.data[pix + 1],
                                b: imageData.data[pix + 2]
                            };
                            var colorDifference = Math.sqrt(
                                Math.pow(currentColor.r - sampleColor.r, 2) +
                                Math.pow(currentColor.g - sampleColor.g, 2) +
                                Math.pow(currentColor.b - sampleColor.b, 2)
                            );
                            // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
                            if (colorDifference <= maxColorDifference * pixTolerance) {
                                matchPixCount++;
                            }
                        }
                    }

                    if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
                        // console.log('removed black frame : ' + f + ' ; frame duration ' + _frames[f].duration);
                    } else {
                        // console.log('frame is passed : ' + f);
                        if (checkUntilNotBlack) {
                            doNotCheckNext = true;
                        }
                        resultFrames.push(_frames[f]);
                    }
                }

                resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

                if (resultFrames.length <= 0) {
                    // at least one last frame should be available for next manipulation
                    // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
                    resultFrames.push(_frames[_frames.length - 1]);
                }

                return resultFrames;
            }

            var isStopDrawing = false;

            /**
             * This method stops recording video.
             * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
             * @method
             * @memberof WhammyRecorder
             * @example
             * recorder.stop(function(blob) {
             *     video.src = URL.createObjectURL(blob);
             * });
             */
            this.stop = function(callback) {
                isStopDrawing = true;

                var _this = this;
                // analyse of all frames takes some time!
                setTimeout(function() {
                    // e.g. dropBlackFrames(frames, 10, 1, 1) - will cut all 10 frames
                    // e.g. dropBlackFrames(frames, 10, 0.5, 0.5) - will analyse 10 frames
                    // e.g. dropBlackFrames(frames, 10) === dropBlackFrames(frames, 10, 0, 0) - will analyse 10 frames with strict black color
                    whammy.frames = dropBlackFrames(whammy.frames, -1);

                    // to display advertisement images!
                    if (config.advertisement && config.advertisement.length) {
                        whammy.frames = config.advertisement.concat(whammy.frames);
                    }

                    /**
                     * @property {Blob} blob - Recorded frames in video/webm blob.
                     * @memberof WhammyRecorder
                     * @example
                     * recorder.stop(function() {
                     *     var blob = recorder.blob;
                     * });
                     */
                    whammy.compile(function(blob) {
                        _this.blob = blob;

                        if (_this.blob.forEach) {
                            _this.blob = new Blob([], {
                                type: 'video/webm'
                            });
                        }

                        if (callback) {
                            callback(_this.blob);
                        }
                    });
                }, 10);
            };

            var isPausedRecording = false;

            /**
             * This method pauses the recording process.
             * @method
             * @memberof WhammyRecorder
             * @example
             * recorder.pause();
             */
            this.pause = function() {
                isPausedRecording = true;
            };

            /**
             * This method resumes the recording process.
             * @method
             * @memberof WhammyRecorder
             * @example
             * recorder.resume();
             */
            this.resume = function() {
                isPausedRecording = false;
            };

            /**
             * This method resets currently recorded data.
             * @method
             * @memberof WhammyRecorder
             * @example
             * recorder.clearRecordedData();
             */
            this.clearRecordedData = function() {
                this.pause();
                whammy.frames = [];
            };

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            var video;
            var lastTime;
            var whammy;
        }

        // https://github.com/antimatter15/whammy/blob/master/LICENSE
        // _________
        // Whammy.js

        // todo: Firefox now supports webp for webm containers!
        // their MediaRecorder implementation works well!
        // should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

        /**
         * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
         * @summary A real time javascript webm encoder based on a canvas hack.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef Whammy
         * @class
         * @example
         * var recorder = new Whammy().Video(15);
         * recorder.add(context || canvas || dataURL);
         * var output = recorder.compile();
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         */

        var Whammy = (function() {
            // a more abstract-ish API

            function WhammyVideo(duration) {
                this.frames = [];
                this.duration = duration || 1;
                this.quality = 0.8;
            }

            /**
             * Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
             * @method
             * @memberof Whammy
             * @example
             * recorder = new Whammy().Video(0.8, 100);
             * recorder.add(canvas || context || 'image/webp');
             * @param {string} frame - Canvas || Context || image/webp
             * @param {number} duration - Stick a duration (in milliseconds)
             */
            WhammyVideo.prototype.add = function(frame, duration) {
                if ('canvas' in frame) { //CanvasRenderingContext2D
                    frame = frame.canvas;
                }

                if ('toDataURL' in frame) {
                    frame = frame.toDataURL('image/webp', this.quality);
                }

                if (!(/^data:image\/webp;base64,/ig).test(frame)) {
                    throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
                }
                this.frames.push({
                    image: frame,
                    duration: duration || this.duration
                });
            };

            function processInWebWorker(_function) {
                var blob = URL.createObjectURL(new Blob([_function.toString(),
                    'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
                ], {
                    type: 'application/javascript'
                }));

                var worker = new Worker(blob);
                URL.revokeObjectURL(blob);
                return worker;
            }

            function whammyInWebWorker(frames) {
                function ArrayToWebM(frames) {
                    var info = checkFrames(frames);
                    if (!info) {
                        return [];
                    }

                    var clusterMaxDuration = 30000;

                    var EBML = [{
                        'id': 0x1a45dfa3, // EBML
                        'data': [{
                            'data': 1,
                            'id': 0x4286 // EBMLVersion
                        }, {
                            'data': 1,
                            'id': 0x42f7 // EBMLReadVersion
                        }, {
                            'data': 4,
                            'id': 0x42f2 // EBMLMaxIDLength
                        }, {
                            'data': 8,
                            'id': 0x42f3 // EBMLMaxSizeLength
                        }, {
                            'data': 'webm',
                            'id': 0x4282 // DocType
                        }, {
                            'data': 2,
                            'id': 0x4287 // DocTypeVersion
                        }, {
                            'data': 2,
                            'id': 0x4285 // DocTypeReadVersion
                        }]
                    }, {
                        'id': 0x18538067, // Segment
                        'data': [{
                            'id': 0x1549a966, // Info
                            'data': [{
                                'data': 1e6, //do things in millisecs (num of nanosecs for duration scale)
                                'id': 0x2ad7b1 // TimecodeScale
                            }, {
                                'data': 'whammy',
                                'id': 0x4d80 // MuxingApp
                            }, {
                                'data': 'whammy',
                                'id': 0x5741 // WritingApp
                            }, {
                                'data': doubleToString(info.duration),
                                'id': 0x4489 // Duration
                            }]
                        }, {
                            'id': 0x1654ae6b, // Tracks
                            'data': [{
                                'id': 0xae, // TrackEntry
                                'data': [{
                                    'data': 1,
                                    'id': 0xd7 // TrackNumber
                                }, {
                                    'data': 1,
                                    'id': 0x73c5 // TrackUID
                                }, {
                                    'data': 0,
                                    'id': 0x9c // FlagLacing
                                }, {
                                    'data': 'und',
                                    'id': 0x22b59c // Language
                                }, {
                                    'data': 'V_VP8',
                                    'id': 0x86 // CodecID
                                }, {
                                    'data': 'VP8',
                                    'id': 0x258688 // CodecName
                                }, {
                                    'data': 1,
                                    'id': 0x83 // TrackType
                                }, {
                                    'id': 0xe0, // Video
                                    'data': [{
                                        'data': info.width,
                                        'id': 0xb0 // PixelWidth
                                    }, {
                                        'data': info.height,
                                        'id': 0xba // PixelHeight
                                    }]
                                }]
                            }]
                        }]
                    }];

                    //Generate clusters (max duration)
                    var frameNumber = 0;
                    var clusterTimecode = 0;
                    while (frameNumber < frames.length) {

                        var clusterFrames = [];
                        var clusterDuration = 0;
                        do {
                            clusterFrames.push(frames[frameNumber]);
                            clusterDuration += frames[frameNumber].duration;
                            frameNumber++;
                        } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

                        var clusterCounter = 0;
                        var cluster = {
                            'id': 0x1f43b675, // Cluster
                            'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
                        }; //Add cluster to segment
                        EBML[1].data.push(cluster);
                        clusterTimecode += clusterDuration;
                    }

                    return generateEBML(EBML);
                }

                function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
                    return [{
                        'data': clusterTimecode,
                        'id': 0xe7 // Timecode
                    }].concat(clusterFrames.map(function(webp) {
                        var block = makeSimpleBlock({
                            discardable: 0,
                            frame: webp.data.slice(4),
                            invisible: 0,
                            keyframe: 1,
                            lacing: 0,
                            trackNum: 1,
                            timecode: Math.round(clusterCounter)
                        });
                        clusterCounter += webp.duration;
                        return {
                            data: block,
                            id: 0xa3
                        };
                    }));
                }

                // sums the lengths of all the frames and gets the duration

                function checkFrames(frames) {
                    if (!frames[0]) {
                        postMessage({
                            error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
                        });
                        return;
                    }

                    var width = frames[0].width,
                        height = frames[0].height,
                        duration = frames[0].duration;

                    for (var i = 1; i < frames.length; i++) {
                        duration += frames[i].duration;
                    }
                    return {
                        duration: duration,
                        width: width,
                        height: height
                    };
                }

                function numToBuffer(num) {
                    var parts = [];
                    while (num > 0) {
                        parts.push(num & 0xff);
                        num = num >> 8;
                    }
                    return new Uint8Array(parts.reverse());
                }

                function strToBuffer(str) {
                    return new Uint8Array(str.split('').map(function(e) {
                        return e.charCodeAt(0);
                    }));
                }

                function bitsToBuffer(bits) {
                    var data = [];
                    var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
                    bits = pad + bits;
                    for (var i = 0; i < bits.length; i += 8) {
                        data.push(parseInt(bits.substr(i, 8), 2));
                    }
                    return new Uint8Array(data);
                }

                function generateEBML(json) {
                    var ebml = [];
                    for (var i = 0; i < json.length; i++) {
                        var data = json[i].data;

                        if (typeof data === 'object') {
                            data = generateEBML(data);
                        }

                        if (typeof data === 'number') {
                            data = bitsToBuffer(data.toString(2));
                        }

                        if (typeof data === 'string') {
                            data = strToBuffer(data);
                        }

                        var len = data.size || data.byteLength || data.length;
                        var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
                        var sizeToString = len.toString(2);
                        var padded = (new Array((zeroes * 7 + 7 + 1) - sizeToString.length)).join('0') + sizeToString;
                        var size = (new Array(zeroes)).join('0') + '1' + padded;

                        ebml.push(numToBuffer(json[i].id));
                        ebml.push(bitsToBuffer(size));
                        ebml.push(data);
                    }

                    return new Blob(ebml, {
                        type: 'video/webm'
                    });
                }

                function toBinStrOld(bits) {
                    var data = '';
                    var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
                    bits = pad + bits;
                    for (var i = 0; i < bits.length; i += 8) {
                        data += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
                    }
                    return data;
                }

                function makeSimpleBlock(data) {
                    var flags = 0;

                    if (data.keyframe) {
                        flags |= 128;
                    }

                    if (data.invisible) {
                        flags |= 8;
                    }

                    if (data.lacing) {
                        flags |= (data.lacing << 1);
                    }

                    if (data.discardable) {
                        flags |= 1;
                    }

                    if (data.trackNum > 127) {
                        throw 'TrackNumber > 127 not supported';
                    }

                    var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e) {
                        return String.fromCharCode(e);
                    }).join('') + data.frame;

                    return out;
                }

                function parseWebP(riff) {
                    var VP8 = riff.RIFF[0].WEBP[0];

                    var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header
                    for (var i = 0, c = []; i < 4; i++) {
                        c[i] = VP8.charCodeAt(frameStart + 3 + i);
                    }

                    var width, height, tmp;

                    //the code below is literally copied verbatim from the bitstream spec
                    tmp = (c[1] << 8) | c[0];
                    width = tmp & 0x3FFF;
                    tmp = (c[3] << 8) | c[2];
                    height = tmp & 0x3FFF;
                    return {
                        width: width,
                        height: height,
                        data: VP8,
                        riff: riff
                    };
                }

                function getStrLength(string, offset) {
                    return parseInt(string.substr(offset + 4, 4).split('').map(function(i) {
                        var unpadded = i.charCodeAt(0).toString(2);
                        return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
                    }).join(''), 2);
                }

                function parseRIFF(string) {
                    var offset = 0;
                    var chunks = {};

                    while (offset < string.length) {
                        var id = string.substr(offset, 4);
                        var len = getStrLength(string, offset);
                        var data = string.substr(offset + 4 + 4, len);
                        offset += 4 + 4 + len;
                        chunks[id] = chunks[id] || [];

                        if (id === 'RIFF' || id === 'LIST') {
                            chunks[id].push(parseRIFF(data));
                        } else {
                            chunks[id].push(data);
                        }
                    }
                    return chunks;
                }

                function doubleToString(num) {
                    return [].slice.call(
                        new Uint8Array((new Float64Array([num])).buffer), 0).map(function(e) {
                        return String.fromCharCode(e);
                    }).reverse().join('');
                }

                var webm = new ArrayToWebM(frames.map(function(frame) {
                    var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
                    webp.duration = frame.duration;
                    return webp;
                }));

                if (!!navigator.mozGetUserMedia) {
                    return webm;
                }

                postMessage(webm);
            }

            /**
             * Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
             * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
             * @method
             * @memberof Whammy
             * @example
             * recorder = new Whammy().Video(0.8, 100);
             * recorder.compile(function(blob) {
             *    // blob.size - blob.type
             * });
             */
            WhammyVideo.prototype.compile = function(callback) {
                if (!!navigator.mozGetUserMedia) {
                    callback(whammyInWebWorker(this.frames));
                    return;
                }
                var webWorker = processInWebWorker(whammyInWebWorker);

                webWorker.onmessage = function(event) {
                    if (event.data.error) {
                        console.error(event.data.error);
                        return;
                    }
                    callback(event.data);
                };

                webWorker.postMessage(this.frames);
            };

            return {
                /**
                 * A more abstract-ish API.
                 * @method
                 * @memberof Whammy
                 * @example
                 * recorder = new Whammy().Video(0.8, 100);
                 * @param {?number} speed - 0.8
                 * @param {?number} quality - 100
                 */
                Video: WhammyVideo
            };
        })();

        // ______________ (indexed-db)
        // DiskStorage.js

        /**
         * DiskStorage is a standalone object used by {@link RecordRTC} to store recorded blobs in IndexedDB storage.
         * @summary Writing blobs into IndexedDB.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @example
         * DiskStorage.Store({
         *     audioBlob: yourAudioBlob,
         *     videoBlob: yourVideoBlob,
         *     gifBlob  : yourGifBlob
         * });
         * DiskStorage.Fetch(function(dataURL, type) {
         *     if(type === 'audioBlob') { }
         *     if(type === 'videoBlob') { }
         *     if(type === 'gifBlob')   { }
         * });
         * // DiskStorage.dataStoreName = 'recordRTC';
         * // DiskStorage.onError = function(error) { };
         * @property {function} init - This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
         * @property {function} Fetch - This method fetches stored blobs from IndexedDB.
         * @property {function} Store - This method stores blobs in IndexedDB.
         * @property {function} onError - This function is invoked for any known/unknown error.
         * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         */


        var DiskStorage = {
            /**
             * This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
             * @method
             * @memberof DiskStorage
             * @internal
             * @example
             * DiskStorage.init();
             */
            init: function() {
                var self = this;

                if (typeof indexedDB === 'undefined' || typeof indexedDB.open === 'undefined') {
                    console.error('IndexedDB API are not available in this browser.');
                    return;
                }

                if (typeof webkitIndexedDB !== 'undefined') {
                    indexedDB = webkitIndexedDB;
                }

                if (typeof mozIndexedDB !== 'undefined') {
                    indexedDB = mozIndexedDB;
                }

                if (typeof OIndexedDB !== 'undefined') {
                    indexedDB = OIndexedDB;
                }

                if (typeof msIndexedDB !== 'undefined') {
                    indexedDB = msIndexedDB;
                }

                var dbVersion = 1;
                var dbName = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ''),
                    db;
                var request = indexedDB.open(dbName, dbVersion);

                function createObjectStore(dataBase) {
                    dataBase.createObjectStore(self.dataStoreName);
                }

                function putInDB() {
                    var transaction = db.transaction([self.dataStoreName], 'readwrite');

                    if (self.videoBlob) {
                        transaction.objectStore(self.dataStoreName).put(self.videoBlob, 'videoBlob');
                    }

                    if (self.gifBlob) {
                        transaction.objectStore(self.dataStoreName).put(self.gifBlob, 'gifBlob');
                    }

                    if (self.audioBlob) {
                        transaction.objectStore(self.dataStoreName).put(self.audioBlob, 'audioBlob');
                    }

                    function getFromStore(portionName) {
                        transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function(event) {
                            if (self.callback) {
                                self.callback(event.target.result, portionName);
                            }
                        };
                    }

                    getFromStore('audioBlob');
                    getFromStore('videoBlob');
                    getFromStore('gifBlob');
                }

                request.onerror = self.onError;

                request.onsuccess = function() {
                    db = request.result;
                    db.onerror = self.onError;

                    if (db.setVersion) {
                        if (db.version !== dbVersion) {
                            var setVersion = db.setVersion(dbVersion);
                            setVersion.onsuccess = function() {
                                createObjectStore(db);
                                putInDB();
                            };
                        } else {
                            putInDB();
                        }
                    } else {
                        putInDB();
                    }
                };
                request.onupgradeneeded = function(event) {
                    createObjectStore(event.target.result);
                };
            },
            /**
             * This method fetches stored blobs from IndexedDB.
             * @method
             * @memberof DiskStorage
             * @internal
             * @example
             * DiskStorage.Fetch(function(dataURL, type) {
             *     if(type === 'audioBlob') { }
             *     if(type === 'videoBlob') { }
             *     if(type === 'gifBlob')   { }
             * });
             */
            Fetch: function(callback) {
                this.callback = callback;
                this.init();

                return this;
            },
            /**
             * This method stores blobs in IndexedDB.
             * @method
             * @memberof DiskStorage
             * @internal
             * @example
             * DiskStorage.Store({
             *     audioBlob: yourAudioBlob,
             *     videoBlob: yourVideoBlob,
             *     gifBlob  : yourGifBlob
             * });
             */
            Store: function(config) {
                this.audioBlob = config.audioBlob;
                this.videoBlob = config.videoBlob;
                this.gifBlob = config.gifBlob;

                this.init();

                return this;
            },
            /**
             * This function is invoked for any known/unknown error.
             * @method
             * @memberof DiskStorage
             * @internal
             * @example
             * DiskStorage.onError = function(error){
             *     alerot( JSON.stringify(error) );
             * };
             */
            onError: function(error) {
                console.error(JSON.stringify(error, null, '\t'));
            },

            /**
             * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
             * @memberof DiskStorage
             * @internal
             * @example
             * DiskStorage.dataStoreName = 'recordRTC';
             */
            dataStoreName: 'recordRTC',
            dbName: null
        };

        // ______________
        // GifRecorder.js

        /**
         * GifRecorder is standalone calss used by {@link RecordRTC} to record video or canvas into animated gif.
         * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
         * @author {@link http://www.MuazKhan.com|Muaz Khan}
         * @typedef GifRecorder
         * @class
         * @example
         * var recorder = new GifRecorder(mediaStream || canvas || context, { width: 1280, height: 720, frameRate: 200, quality: 10 });
         * recorder.record();
         * recorder.stop(function(blob) {
         *     img.src = URL.createObjectURL(blob);
         * });
         * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
         * @param {MediaStream} mediaStream - MediaStream object or HTMLCanvasElement or CanvasRenderingContext2D.
         * @param {object} config - {disableLogs:true, initCallback: function, width: 320, height: 240, frameRate: 200, quality: 10}
         */

        function GifRecorder(mediaStream, config) {
            if (typeof GIFEncoder === 'undefined') {
                throw 'Please link: https://cdn.webrtc-experiment.com/gif-recorder.js';
            }

            config = config || {};

            var isHTMLObject = mediaStream instanceof CanvasRenderingContext2D || mediaStream instanceof HTMLCanvasElement;

            /**
             * This method records MediaStream.
             * @method
             * @memberof GifRecorder
             * @example
             * recorder.record();
             */
            this.record = function() {
                if (!isHTMLObject) {
                    if (!config.width) {
                        config.width = video.offsetWidth || 320;
                    }

                    if (!this.height) {
                        config.height = video.offsetHeight || 240;
                    }

                    if (!config.video) {
                        config.video = {
                            width: config.width,
                            height: config.height
                        };
                    }

                    if (!config.canvas) {
                        config.canvas = {
                            width: config.width,
                            height: config.height
                        };
                    }

                    canvas.width = config.canvas.width;
                    canvas.height = config.canvas.height;

                    video.width = config.video.width;
                    video.height = config.video.height;
                }

                // external library to record as GIF images
                gifEncoder = new GIFEncoder();

                // void setRepeat(int iter) 
                // Sets the number of times the set of GIF frames should be played. 
                // Default is 1; 0 means play indefinitely.
                gifEncoder.setRepeat(0);

                // void setFrameRate(Number fps) 
                // Sets frame rate in frames per second. 
                // Equivalent to setDelay(1000/fps).
                // Using "setDelay" instead of "setFrameRate"
                gifEncoder.setDelay(config.frameRate || 200);

                // void setQuality(int quality) 
                // Sets quality of color quantization (conversion of images to the 
                // maximum 256 colors allowed by the GIF specification). 
                // Lower values (minimum = 1) produce better colors, 
                // but slow processing significantly. 10 is the default, 
                // and produces good color mapping at reasonable speeds. 
                // Values greater than 20 do not yield significant improvements in speed.
                gifEncoder.setQuality(config.quality || 10);

                // Boolean start() 
                // This writes the GIF Header and returns false if it fails.
                gifEncoder.start();

                startTime = Date.now();

                var self = this;

                function drawVideoFrame(time) {
                    if (isPausedRecording) {
                        return setTimeout(function() {
                            drawVideoFrame(time);
                        }, 100);
                    }

                    lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

                    if (typeof lastFrameTime === undefined) {
                        lastFrameTime = time;
                    }

                    // ~10 fps
                    if (time - lastFrameTime < 90) {
                        return;
                    }

                    if (!isHTMLObject && video.paused) {
                        // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
                        // Tweak for Android Chrome
                        video.play();
                    }

                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    if (config.onGifPreview) {
                        config.onGifPreview(canvas.toDataURL('image/png'));
                    }

                    gifEncoder.addFrame(context);
                    lastFrameTime = time;
                }

                lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

                if (config.initCallback) {
                    config.initCallback();
                }
            };

            /**
             * This method stops recording MediaStream.
             * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
             * @method
             * @memberof GifRecorder
             * @example
             * recorder.stop(function(blob) {
             *     img.src = URL.createObjectURL(blob);
             * });
             */
            this.stop = function() {
                if (lastAnimationFrame) {
                    cancelAnimationFrame(lastAnimationFrame);
                }

                endTime = Date.now();

                /**
                 * @property {Blob} blob - The recorded blob object.
                 * @memberof GifRecorder
                 * @example
                 * recorder.stop(function(){
                 *     var blob = recorder.blob;
                 * });
                 */
                this.blob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
                    type: 'image/gif'
                });

                // bug: find a way to clear old recorded blobs
                gifEncoder.stream().bin = [];
            };

            var isPausedRecording = false;

            /**
             * This method pauses the recording process.
             * @method
             * @memberof GifRecorder
             * @example
             * recorder.pause();
             */
            this.pause = function() {
                isPausedRecording = true;
            };

            /**
             * This method resumes the recording process.
             * @method
             * @memberof GifRecorder
             * @example
             * recorder.resume();
             */
            this.resume = function() {
                isPausedRecording = false;
            };

            /**
             * This method resets currently recorded data.
             * @method
             * @memberof GifRecorder
             * @example
             * recorder.clearRecordedData();
             */
            this.clearRecordedData = function() {
                if (!gifEncoder) {
                    return;
                }

                this.pause();

                gifEncoder.stream().bin = [];
            };

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            if (isHTMLObject) {
                if (mediaStream instanceof CanvasRenderingContext2D) {
                    context = mediaStream;
                } else if (mediaStream instanceof HTMLCanvasElement) {
                    context = mediaStream.getContext('2d');
                }
            }

            if (!isHTMLObject) {
                var video = document.createElement('video');
                video.muted = true;
                video.autoplay = true;

                if (typeof video.srcObject !== 'undefined') {
                    video.srcObject = mediaStream;
                } else {
                    video.src = URL.createObjectURL(mediaStream);
                }

                video.play();
            }

            var lastAnimationFrame = null;
            var startTime, endTime, lastFrameTime;

            var gifEncoder;
        } //End of RTC script

    }//End of FF if check

if((isChrome || isOpera) && parent_url.indexOf('https') > -1) {

console.log('This is chrome ssl');
    // Last time updated at September 19, 2015

    // links:
    // Open-Sourced: https://github.com/streamproc/MediaStreamRecorder
    // https://cdn.WebRTC-Experiment.com/MediaStreamRecorder.js
    // https://www.WebRTC-Experiment.com/MediaStreamRecorder.js
    // npm install msr

    // updates?
    /*
    -. this.recorderType = StereoAudioRecorder;
    */

    //------------------------------------

    // Browsers Support::
    // Chrome (all versions) [ audio/video separately ]
    // Firefox ( >= 29 ) [ audio/video in single webm/mp4 container or only audio in ogg ]
    // Opera (all versions) [ same as chrome ]
    // Android (Chrome) [ only video ]
    // Android (Opera) [ only video ]
    // Android (Firefox) [ only video ]
    // Microsoft Edge (Only Audio & Gif)

    //------------------------------------
    // Muaz Khan     - www.MuazKhan.com
    // MIT License   - www.WebRTC-Experiment.com/licence
    //------------------------------------

    'use strict';

    // ______________________
    // MediaStreamRecorder.js

    function MediaStreamRecorder(mediaStream) {
        if (!mediaStream) {
            throw 'MediaStream is mandatory.';
        }

        // void start(optional long timeSlice)
        // timestamp to fire "ondataavailable"
        this.start = function(timeSlice) {
            // Media Stream Recording API has not been implemented in chrome yet;
            // That's why using WebAudio API to record stereo audio in WAV format
            var Recorder = IsChrome || IsEdge || IsOpera ? window.StereoAudioRecorder || IsEdge || IsOpera : window.MediaRecorderWrapper;

            // video recorder (in WebM format)
            if (this.mimeType.indexOf('video') !== -1) {
                Recorder = IsChrome || IsEdge || IsOpera ? window.WhammyRecorder : window.MediaRecorderWrapper;
            }

            // video recorder (in GIF format)
            if (this.mimeType === 'image/gif') {
                Recorder = window.GifRecorder;
            }

            // allows forcing StereoAudioRecorder.js on Edge/Firefox
            if (this.recorderType) {
                Recorder = this.recorderType;
            }

            mediaRecorder = new Recorder(mediaStream);
            mediaRecorder.blobs = [];

            var self = this;
            mediaRecorder.ondataavailable = function(data) {
                mediaRecorder.blobs.push(data);
                self.ondataavailable(data);
            };
            mediaRecorder.onstop = this.onstop;
            mediaRecorder.onStartedDrawingNonBlankFrames = this.onStartedDrawingNonBlankFrames;

            // Merge all data-types except "function"
            mediaRecorder = mergeProps(mediaRecorder, this);

            mediaRecorder.start(timeSlice);
        };

        this.onStartedDrawingNonBlankFrames = function() {};
        this.clearOldRecordedFrames = function() {
            if (!mediaRecorder) {
                return;
            }

            mediaRecorder.clearOldRecordedFrames();
        };

        this.stop = function() {
            if (mediaRecorder) {
                mediaRecorder.stop();
            }
        };

        this.ondataavailable = function(blob) {
            console.log('ondataavailable..', blob);
        };

        this.onstop = function(error) {
            console.warn('stopped..', error);
        };

        this.save = function(file, fileName) {
            if (!file) {
                if (!mediaRecorder) {
                    return;
                }

                var bigBlob = new Blob(mediaRecorder.blobs, {
                    type: mediaRecorder.blobs[0].type || this.mimeType
                });

                invokeSaveAsDialog(bigBlob);
                return;
            }
            invokeSaveAsDialog(file, fileName);
        };

        this.pause = function() {
            if (!mediaRecorder) {
                return;
            }
            mediaRecorder.pause();
            console.log('Paused recording.', this.mimeType || mediaRecorder.mimeType);
        };

        this.resume = function() {
            if (!mediaRecorder) {
                return;
            }
            mediaRecorder.resume();
            console.log('Resumed recording.', this.mimeType || mediaRecorder.mimeType);
        };

        this.recorderType = null; // StereoAudioRecorder || WhammyRecorder || MediaRecorderWrapper || GifRecorder

        // Reference to "MediaRecorder.js"
        var mediaRecorder;
    }

    // ______________________
    // MultiStreamRecorder.js

    function MultiStreamRecorder(mediaStream) {
        if (!mediaStream) {
            throw 'MediaStream is mandatory.';
        }

        var self = this;
        var isFirefox = !!navigator.mozGetUserMedia;

        this.stream = mediaStream;

        // void start(optional long timeSlice)
        // timestamp to fire "ondataavailable"
        this.start = function(timeSlice) {
            audioRecorder = new MediaStreamRecorder(mediaStream);
            videoRecorder = new MediaStreamRecorder(mediaStream);

            audioRecorder.mimeType = 'audio/ogg';
            videoRecorder.mimeType = 'video/webm';

            for (var prop in this) {
                if (typeof this[prop] !== 'function') {
                    audioRecorder[prop] = videoRecorder[prop] = this[prop];
                }
            }

            audioRecorder.ondataavailable = function(blob) {
                if (!audioVideoBlobs[recordingInterval]) {
                    audioVideoBlobs[recordingInterval] = {};
                }

                audioVideoBlobs[recordingInterval].audio = blob;

                if (audioVideoBlobs[recordingInterval].video && !audioVideoBlobs[recordingInterval].onDataAvailableEventFired) {
                    audioVideoBlobs[recordingInterval].onDataAvailableEventFired = true;
                    fireOnDataAvailableEvent(audioVideoBlobs[recordingInterval]);
                }
            };

            videoRecorder.ondataavailable = function(blob) {
                if (isFirefox) {
                    return self.ondataavailable({
                        video: blob,
                        audio: blob
                    });
                }

                if (!audioVideoBlobs[recordingInterval]) {
                    audioVideoBlobs[recordingInterval] = {};
                }

                audioVideoBlobs[recordingInterval].video = blob;

                if (audioVideoBlobs[recordingInterval].audio && !audioVideoBlobs[recordingInterval].onDataAvailableEventFired) {
                    audioVideoBlobs[recordingInterval].onDataAvailableEventFired = true;
                    fireOnDataAvailableEvent(audioVideoBlobs[recordingInterval]);
                }
            };

            function fireOnDataAvailableEvent(blobs) {
                recordingInterval++;
                self.ondataavailable(blobs);
            }

            videoRecorder.onstop = audioRecorder.onstop = function(error) {
                self.onstop(error);
            };

            if (!isFirefox) {
                // to make sure both audio/video are synced.
                videoRecorder.onStartedDrawingNonBlankFrames = function() {
                    videoRecorder.clearOldRecordedFrames();
                    audioRecorder.start(timeSlice);
                };
                videoRecorder.start(timeSlice);
            } else {
                videoRecorder.start(timeSlice);
            }
        };

        this.stop = function() {
            if (audioRecorder) {
                audioRecorder.stop();
            }
            if (videoRecorder) {
                videoRecorder.stop();
            }
        };

        this.ondataavailable = function(blob) {
            console.log('ondataavailable..', blob);
        };

        this.onstop = function(error) {
            console.warn('stopped..', error);
        };

        this.pause = function() {
            if (audioRecorder) {
                audioRecorder.pause();
            }
            if (videoRecorder) {
                videoRecorder.pause();
            }
        };

        this.resume = function() {
            if (audioRecorder) {
                audioRecorder.resume();
            }
            if (videoRecorder) {
                videoRecorder.resume();
            }
        };

        var audioRecorder;
        var videoRecorder;

        var audioVideoBlobs = {};
        var recordingInterval = 0;
    }

    // _____________________________
    // Cross-Browser-Declarations.js

    // WebAudio API representer
    if (typeof AudioContext !== 'undefined') {
        if (typeof webkitAudioContext !== 'undefined') {
            /*global AudioContext:true*/
            var AudioContext = webkitAudioContext;
        }

        if (typeof mozAudioContext !== 'undefined') {
            /*global AudioContext:true*/
            var AudioContext = mozAudioContext;
        }
    }

    if (typeof URL !== 'undefined' && typeof webkitURL !== 'undefined') {
        /*global URL:true*/
        var URL = webkitURL;
    }

    var IsEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);
    var IsOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
    var IsChrome = !IsEdge && !IsEdge && !!navigator.webkitGetUserMedia;

    if (typeof navigator !== 'undefined') {
        if (typeof navigator.webkitGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.webkitGetUserMedia;
        }

        if (typeof navigator.mozGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.mozGetUserMedia;
        }
    } else {
        /*global navigator:true */
        var navigator = {
            getUserMedia: {}
        };
    }

    if (typeof webkitMediaStream !== 'undefined') {
        var MediaStream = webkitMediaStream;
    }

    // Merge all other data-types except "function"

    function mergeProps(mergein, mergeto) {
        mergeto = reformatProps(mergeto);
        for (var t in mergeto) {
            if (typeof mergeto[t] !== 'function') {
                mergein[t] = mergeto[t];
            }
        }
        return mergein;
    }

    function reformatProps(obj) {
        var output = {};
        for (var o in obj) {
            if (o.indexOf('-') !== -1) {
                var splitted = o.split('-');
                var name = splitted[0] + splitted[1].split('')[0].toUpperCase() + splitted[1].substr(1);
                output[name] = obj[o];
            } else {
                output[o] = obj[o];
            }
        }
        return output;
    }

    // "dropFirstFrame" has been added by Graham Roth
    // https://github.com/gsroth

    function dropFirstFrame(arr) {
        arr.shift();
        return arr;
    }

    function invokeSaveAsDialog(file, fileName) {
        if (!file) {
            throw 'Blob object is required.';
        }

        if (!file.type) {
            file.type = 'video/webm';
        }

        var fileExtension = file.type.split('/')[1];

        if (fileName && fileName.indexOf('.') !== -1) {
            var splitted = fileName.split('.');
            fileName = splitted[0];
            fileExtension = splitted[1];
        }

        var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

        if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
            return navigator.msSaveOrOpenBlob(file, fileFullName);
        } else if (typeof navigator.msSaveBlob !== 'undefined') {
            return navigator.msSaveBlob(file, fileFullName);
        }

        var hyperlink = document.createElement('a');
        hyperlink.href = URL.createObjectURL(file);
        hyperlink.target = '_blank';
        hyperlink.download = fileFullName;

        if (!!navigator.mozGetUserMedia) {
            hyperlink.onclick = function() {
                (document.body || document.documentElement).removeChild(hyperlink);
            };
            (document.body || document.documentElement).appendChild(hyperlink);
        }

        var evt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });

        hyperlink.dispatchEvent(evt);

        if (!navigator.mozGetUserMedia) {
            URL.revokeObjectURL(hyperlink.href);
        }
    }

    function bytesToSize(bytes) {
        var k = 1000;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) {
            return '0 Bytes';
        }
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }

    // ______________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
    // ObjectStore.js
    var ObjectStore = {
        AudioContext: window.AudioContext || window.webkitAudioContext
    };

    // ______________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
    // ObjectStore.js
    var ObjectStore = {
        AudioContext: window.AudioContext || window.webkitAudioContext
    };

    // ==================
    // MediaRecorder.js

    /**
     * Implementation of https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html
     * The MediaRecorder accepts a mediaStream as input source passed from UA. When recorder starts,
     * a MediaEncoder will be created and accept the mediaStream as input source.
     * Encoder will get the raw data by track data changes, encode it by selected MIME Type, then store the encoded in EncodedBufferCache object.
     * The encoded data will be extracted on every timeslice passed from Start function call or by RequestData function.
     * Thread model:
     * When the recorder starts, it creates a "Media Encoder" thread to read data from MediaEncoder object and store buffer in EncodedBufferCache object.
     * Also extract the encoded data and create blobs on every timeslice passed from start function or RequestData function called by UA.
     */

    function MediaRecorderWrapper(mediaStream) {
        // if user chosen only audio option; and he tried to pass MediaStream with
        // both audio and video tracks;
        // using a dirty workaround to generate audio-only stream so that we can get audio/ogg output.
        if (this.type === 'audio' && mediaStream.getVideoTracks && mediaStream.getVideoTracks().length && !navigator.mozGetUserMedia) {
            var context = new AudioContext();
            var mediaStreamSource = context.createMediaStreamSource(mediaStream);

            var destination = context.createMediaStreamDestination();
            mediaStreamSource.connect(destination);

            mediaStream = destination.stream;
        }

        // void start(optional long timeSlice)
        // timestamp to fire "ondataavailable"

        // starting a recording session; which will initiate "Reading Thread"
        // "Reading Thread" are used to prevent main-thread blocking scenarios
        this.start = function(mTimeSlice) {
            mTimeSlice = mTimeSlice || 1000;
            isStopRecording = false;

            function startRecording() {
                if (isStopRecording) {
                    return;
                }

                if (isPaused) {
                    setTimeout(startRecording, 500);
                    return;
                }

                mediaRecorder = new MediaRecorder(mediaStream);

                mediaRecorder.ondataavailable = function(e) {
                    console.log('ondataavailable', e.data.type, e.data.size, e.data);
                    // mediaRecorder.state === 'recording' means that media recorder is associated with "session"
                    // mediaRecorder.state === 'stopped' means that media recorder is detached from the "session" ... in this case; "session" will also be deleted.

                    if (!e.data.size) {
                        console.warn('Recording of', e.data.type, 'failed.');
                        return;
                    }

                    // at this stage, Firefox MediaRecorder API doesn't allow to choose the output mimeType format!
                    var blob = new window.Blob([e.data], {
                        type: e.data.type || self.mimeType || 'audio/ogg' // It specifies the container format as well as the audio and video capture formats.
                    });

                    // Dispatching OnDataAvailable Handler
                    self.ondataavailable(blob);
                };

                mediaRecorder.onstop = function(error) {
                    // for video recording on Firefox, it will be fired quickly.
                    // because work on VideoFrameContainer is still in progress
                    // https://wiki.mozilla.org/Gecko:MediaRecorder

                    // self.onstop(error);
                };

                // http://www.w3.org/TR/2012/WD-dom-20121206/#error-names-table
                // showBrowserSpecificIndicator: got neither video nor audio access
                // "VideoFrameContainer" can't be accessed directly; unable to find any wrapper using it.
                // that's why there is no video recording support on firefox

                // video recording fails because there is no encoder available there
                // http://dxr.mozilla.org/mozilla-central/source/content/media/MediaRecorder.cpp#317

                // Maybe "Read Thread" doesn't fire video-track read notification;
                // that's why shutdown notification is received; and "Read Thread" is stopped.

                // https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html#error-handling
                mediaRecorder.onerror = function(error) {
                    console.error(error);
                    self.start(mTimeSlice);
                };

                mediaRecorder.onwarning = function(warning) {
                    console.warn(warning);
                };

                // void start(optional long mTimeSlice)
                // The interval of passing encoded data from EncodedBufferCache to onDataAvailable
                // handler. "mTimeSlice < 0" means Session object does not push encoded data to
                // onDataAvailable, instead, it passive wait the client side pull encoded data
                // by calling requestData API.
                mediaRecorder.start(0);

                // Start recording. If timeSlice has been provided, mediaRecorder will
                // raise a dataavailable event containing the Blob of collected data on every timeSlice milliseconds.
                // If timeSlice isn't provided, UA should call the RequestData to obtain the Blob data, also set the mTimeSlice to zero.

                setTimeout(function() {
                    mediaRecorder.stop();
                    startRecording();
                }, mTimeSlice);
            }

            // dirty workaround to fix Firefox 2nd+ intervals
            startRecording();
        };

        var isStopRecording = false;

        this.stop = function() {
            isStopRecording = true;

            if (self.onstop) {
                self.onstop({});
            }
        };

        var isPaused = false;

        this.pause = function() {
            if (!mediaRecorder) {
                return;
            }

            isPaused = true;

            if (mediaRecorder.state === 'recording') {
                mediaRecorder.pause();
            }
        };

        this.resume = function() {
            if (!mediaRecorder) {
                return;
            }

            isPaused = false;

            if (mediaRecorder.state === 'paused') {
                mediaRecorder.resume();
            }
        };

        this.ondataavailable = this.onstop = function() {};

        // Reference to itself
        var self = this;

        if (!self.mimeType && !!mediaStream.getAudioTracks) {
            self.mimeType = mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length ? 'video/webm' : 'audio/ogg';
        }

        // Reference to "MediaRecorderWrapper" object
        var mediaRecorder;
    }

    // ======================
    // StereoAudioRecorder.js

    function StereoAudioRecorder(mediaStream) {
        // void start(optional long timeSlice)
        // timestamp to fire "ondataavailable"
        this.start = function(timeSlice) {
            timeSlice = timeSlice || 1000;

            mediaRecorder = new StereoAudioRecorderHelper(mediaStream, this);

            mediaRecorder.record();

            timeout = setInterval(function() {
                mediaRecorder.requestData();
            }, timeSlice);
        };

        this.stop = function() {
            if (mediaRecorder) {
                mediaRecorder.stop();
                clearTimeout(timeout);
            }
        };

        this.pause = function() {
            if (!mediaRecorder) {
                return;
            }

            mediaRecorder.pause();
        };

        this.resume = function() {
            if (!mediaRecorder) {
                return;
            }

            mediaRecorder.resume();
        };

        this.ondataavailable = function() {};

        // Reference to "StereoAudioRecorder" object
        var mediaRecorder;
        var timeout;
    }

    // ============================
    // StereoAudioRecorderHelper.js

    // source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js

    function StereoAudioRecorderHelper(mediaStream, root) {

        // variables    
        var deviceSampleRate = 44100; // range: 22050 to 96000

        if (!ObjectStore.AudioContextConstructor) {
            ObjectStore.AudioContextConstructor = new ObjectStore.AudioContext();
        }

        // check device sample rate
        deviceSampleRate = ObjectStore.AudioContextConstructor.sampleRate;

        var leftchannel = [];
        var rightchannel = [];
        var scriptprocessornode;
        var recording = false;
        var recordingLength = 0;
        var volume;
        var audioInput;
        var sampleRate = root.sampleRate || deviceSampleRate;
        var context;

        var numChannels = root.audioChannels || 2;

        this.record = function() {
            recording = true;
            // reset the buffers for the new recording
            leftchannel.length = rightchannel.length = 0;
            recordingLength = 0;
        };

        this.requestData = function() {
            if (isPaused) {
                return;
            }

            if (recordingLength === 0) {
                requestDataInvoked = false;
                return;
            }

            requestDataInvoked = true;
            // clone stuff
            var internalLeftChannel = leftchannel.slice(0);
            var internalRightChannel = rightchannel.slice(0);
            var internalRecordingLength = recordingLength;

            // reset the buffers for the new recording
            leftchannel.length = rightchannel.length = [];
            recordingLength = 0;
            requestDataInvoked = false;

            // we flat the left and right channels down
            var leftBuffer = mergeBuffers(internalLeftChannel, internalRecordingLength);
            var rightBuffer = mergeBuffers(internalLeftChannel, internalRecordingLength);

            // we interleave both channels together
            if (numChannels === 2) {
                var interleaved = interleave(leftBuffer, rightBuffer);
            } else {
                var interleaved = leftBuffer;
            }

            // we create our wav file
            var buffer = new ArrayBuffer(44 + interleaved.length * 2);
            var view = new DataView(buffer);

            // RIFF chunk descriptor
            writeUTFBytes(view, 0, 'RIFF');
            view.setUint32(4, 44 + interleaved.length * 2, true);
            writeUTFBytes(view, 8, 'WAVE');
            // FMT sub-chunk
            writeUTFBytes(view, 12, 'fmt ');
            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            // stereo (2 channels)
            view.setUint16(22, numChannels, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * 4, true);
            view.setUint16(32, numChannels * 2, true);
            view.setUint16(34, 16, true);
            // data sub-chunk
            writeUTFBytes(view, 36, 'data');
            view.setUint32(40, interleaved.length * 2, true);

            // write the PCM samples
            var lng = interleaved.length;
            var index = 44;
            var volume = 1;
            for (var i = 0; i < lng; i++) {
                view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
                index += 2;
            }

            // our final binary blob
            var blob = new Blob([view], {
                type: 'audio/wav'
            });

            console.debug('audio recorded blob size:', bytesToSize(blob.size));

            root.ondataavailable(blob);
        };

        this.stop = function() {
            // we stop recording
            recording = false;
            this.requestData();

            audioInput.disconnect();
        };

        function interleave(leftChannel, rightChannel) {
            var length = leftChannel.length + rightChannel.length;
            var result = new Float32Array(length);

            var inputIndex = 0;

            for (var index = 0; index < length;) {
                result[index++] = leftChannel[inputIndex];
                result[index++] = rightChannel[inputIndex];
                inputIndex++;
            }
            return result;
        }

        function mergeBuffers(channelBuffer, recordingLength) {
            var result = new Float32Array(recordingLength);
            var offset = 0;
            var lng = channelBuffer.length;
            for (var i = 0; i < lng; i++) {
                var buffer = channelBuffer[i];
                result.set(buffer, offset);
                offset += buffer.length;
            }
            return result;
        }

        function writeUTFBytes(view, offset, string) {
            var lng = string.length;
            for (var i = 0; i < lng; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }

        // creates the audio context
        var context = ObjectStore.AudioContextConstructor;

        // creates a gain node
        ObjectStore.VolumeGainNode = context.createGain();

        var volume = ObjectStore.VolumeGainNode;

        // creates an audio node from the microphone incoming stream
        ObjectStore.AudioInput = context.createMediaStreamSource(mediaStream);

        // creates an audio node from the microphone incoming stream
        var audioInput = ObjectStore.AudioInput;

        // connect the stream to the gain node
        audioInput.connect(volume);

        /* From the spec: This value controls how frequently the audioprocess event is
        dispatched and how many sample-frames need to be processed each call.
        Lower values for buffer size will result in a lower (better) latency.
        Higher values will be necessary to avoid audio breakup and glitches 
        Legal values are 256, 512, 1024, 2048, 4096, 8192, and 16384.*/
        var bufferSize = root.bufferSize || 2048;
        if (root.bufferSize === 0) {
            bufferSize = 0;
        }

        if (context.createJavaScriptNode) {
            scriptprocessornode = context.createJavaScriptNode(bufferSize, numChannels, numChannels);
        } else if (context.createScriptProcessor) {
            scriptprocessornode = context.createScriptProcessor(bufferSize, numChannels, numChannels);
        } else {
            throw 'WebAudio API has no support on this browser.';
        }

        bufferSize = scriptprocessornode.bufferSize;

        console.debug('using audio buffer-size:', bufferSize);

        var requestDataInvoked = false;

        // sometimes "scriptprocessornode" disconnects from he destination-node
        // and there is no exception thrown in this case.
        // and obviously no further "ondataavailable" events will be emitted.
        // below global-scope variable is added to debug such unexpected but "rare" cases.
        window.scriptprocessornode = scriptprocessornode;

        if (numChannels === 1) {
            console.debug('All right-channels are skipped.');
        }

        var isPaused = false;

        this.pause = function() {
            isPaused = true;
        };

        this.resume = function() {
            isPaused = false;
        };

        // http://webaudio.github.io/web-audio-api/#the-scriptprocessornode-interface
        scriptprocessornode.onaudioprocess = function(e) {
            if (!recording || requestDataInvoked || isPaused) {
                return;
            }

            var left = e.inputBuffer.getChannelData(0);
            leftchannel.push(new Float32Array(left));

            if (numChannels === 2) {
                var right = e.inputBuffer.getChannelData(1);
                rightchannel.push(new Float32Array(right));
            }
            recordingLength += bufferSize;
        };

        volume.connect(scriptprocessornode);
        scriptprocessornode.connect(context.destination);
    }

    // ===================
    // WhammyRecorder.js

    function WhammyRecorder(mediaStream) {
        // void start(optional long timeSlice)
        // timestamp to fire "ondataavailable"
        this.start = function(timeSlice) {
            timeSlice = timeSlice || 1000;

            mediaRecorder = new WhammyRecorderHelper(mediaStream, this);

            for (var prop in this) {
                if (typeof this[prop] !== 'function') {
                    mediaRecorder[prop] = this[prop];
                }
            }

            mediaRecorder.record();

            timeout = setInterval(function() {
                mediaRecorder.requestData();
            }, timeSlice);
        };

        this.stop = function() {
            if (mediaRecorder) {
                mediaRecorder.stop();
                clearTimeout(timeout);
            }
        };

        this.clearOldRecordedFrames = function() {
            if (mediaRecorder) {
                mediaRecorder.clearOldRecordedFrames();
            }
        };

        this.pause = function() {
            if (!mediaRecorder) {
                return;
            }

            mediaRecorder.pause();
        };

        this.resume = function() {
            if (!mediaRecorder) {
                return;
            }

            mediaRecorder.resume();
        };

        this.ondataavailable = function() {};

        // Reference to "WhammyRecorder" object
        var mediaRecorder;
        var timeout;
    }

    // ==========================
    // WhammyRecorderHelper.js

    function WhammyRecorderHelper(mediaStream, root) {
        this.record = function(timeSlice) {
            if (!this.width) {
                this.width = 320;
            }
            if (!this.height) {
                this.height = 240;
            }

            if (this.video && this.video instanceof HTMLVideoElement) {
                if (!this.width) {
                    this.width = video.videoWidth || video.clientWidth || 320;
                }
                if (!this.height) {
                    this.height = video.videoHeight || video.clientHeight || 240;
                }
            }

            if (!this.video) {
                this.video = {
                    width: this.width,
                    height: this.height
                };
            }

            if (!this.canvas || !this.canvas.width || !this.canvas.height) {
                this.canvas = {
                    width: this.width,
                    height: this.height
                };
            }

            canvas.width = this.canvas.width;
            canvas.height = this.canvas.height;

            // setting defaults
            if (this.video && this.video instanceof HTMLVideoElement) {
                this.isHTMLObject = true;
                video = this.video.cloneNode();
            } else {
                video = document.createElement('video');
                video.src = URL.createObjectURL(mediaStream);

                video.width = this.video.width;
                video.height = this.video.height;
            }

            video.muted = true;
            video.play();

            lastTime = new Date().getTime();
            whammy = new Whammy.Video();

            console.log('canvas resolutions', canvas.width, '*', canvas.height);
            console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);

            drawFrames();
        };

        this.clearOldRecordedFrames = function() {
            whammy.frames = [];
        };

        var requestDataInvoked = false;
        this.requestData = function() {
            if (isPaused) {
                return;
            }

            if (!whammy.frames.length) {
                requestDataInvoked = false;
                return;
            }

            requestDataInvoked = true;
            // clone stuff
            var internalFrames = whammy.frames.slice(0);

            // reset the frames for the new recording

            whammy.frames = dropBlackFrames(internalFrames, -1);

            whammy.compile(function(whammyBlob) {
                root.ondataavailable(whammyBlob);
                console.debug('video recorded blob size:', bytesToSize(whammyBlob.size));
            });

            whammy.frames = [];

            requestDataInvoked = false;
        };

        var isOnStartedDrawingNonBlankFramesInvoked = false;

        function drawFrames() {
            if (isPaused) {
                lastTime = new Date().getTime();
                setTimeout(drawFrames, 500);
                return;
            }

            if (isStopDrawing) {
                return;
            }

            if (requestDataInvoked) {
                return setTimeout(drawFrames, 100);
            }

            var duration = new Date().getTime() - lastTime;
            if (!duration) {
                return drawFrames();
            }

            // via webrtc-experiment#206, by Jack i.e. @Seymourr
            lastTime = new Date().getTime();

            if (!self.isHTMLObject && video.paused) {
                video.play(); // Android
            }

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (!isStopDrawing) {
                whammy.frames.push({
                    duration: duration,
                    image: canvas.toDataURL('image/webp')
                });
            }

            if (!isOnStartedDrawingNonBlankFramesInvoked && !isBlankFrame(whammy.frames[whammy.frames.length - 1])) {
                isOnStartedDrawingNonBlankFramesInvoked = true;
                root.onStartedDrawingNonBlankFrames();
            }

            setTimeout(drawFrames, 10);
        }

        var isStopDrawing = false;

        this.stop = function() {
            isStopDrawing = true;
            this.requestData();
        };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        var video;
        var lastTime;
        var whammy;

        var self = this;

        function isBlankFrame(frame, _pixTolerance, _frameTolerance) {
            var localCanvas = document.createElement('canvas');
            localCanvas.width = canvas.width;
            localCanvas.height = canvas.height;
            var context2d = localCanvas.getContext('2d');

            var sampleColor = {
                r: 0,
                g: 0,
                b: 0
            };
            var maxColorDifference = Math.sqrt(
                Math.pow(255, 2) +
                Math.pow(255, 2) +
                Math.pow(255, 2)
            );
            var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
            var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;

            var matchPixCount, endPixCheck, maxPixCount;

            var image = new Image();
            image.src = frame.image;
            context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
            var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
            matchPixCount = 0;
            endPixCheck = imageData.data.length;
            maxPixCount = imageData.data.length / 4;

            for (var pix = 0; pix < endPixCheck; pix += 4) {
                var currentColor = {
                    r: imageData.data[pix],
                    g: imageData.data[pix + 1],
                    b: imageData.data[pix + 2]
                };
                var colorDifference = Math.sqrt(
                    Math.pow(currentColor.r - sampleColor.r, 2) +
                    Math.pow(currentColor.g - sampleColor.g, 2) +
                    Math.pow(currentColor.b - sampleColor.b, 2)
                );
                // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
                if (colorDifference <= maxColorDifference * pixTolerance) {
                    matchPixCount++;
                }
            }

            if (maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
                return false;
            } else {
                return true;
            }
        }

        function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance) {
            var localCanvas = document.createElement('canvas');
            localCanvas.width = canvas.width;
            localCanvas.height = canvas.height;
            var context2d = localCanvas.getContext('2d');
            var resultFrames = [];

            var checkUntilNotBlack = _framesToCheck === -1;
            var endCheckFrame = (_framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length) ?
                _framesToCheck : _frames.length;
            var sampleColor = {
                r: 0,
                g: 0,
                b: 0
            };
            var maxColorDifference = Math.sqrt(
                Math.pow(255, 2) +
                Math.pow(255, 2) +
                Math.pow(255, 2)
            );
            var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
            var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
            var doNotCheckNext = false;

            for (var f = 0; f < endCheckFrame; f++) {
                var matchPixCount, endPixCheck, maxPixCount;

                if (!doNotCheckNext) {
                    var image = new Image();
                    image.src = _frames[f].image;
                    context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
                    var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
                    matchPixCount = 0;
                    endPixCheck = imageData.data.length;
                    maxPixCount = imageData.data.length / 4;

                    for (var pix = 0; pix < endPixCheck; pix += 4) {
                        var currentColor = {
                            r: imageData.data[pix],
                            g: imageData.data[pix + 1],
                            b: imageData.data[pix + 2]
                        };
                        var colorDifference = Math.sqrt(
                            Math.pow(currentColor.r - sampleColor.r, 2) +
                            Math.pow(currentColor.g - sampleColor.g, 2) +
                            Math.pow(currentColor.b - sampleColor.b, 2)
                        );
                        // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
                        if (colorDifference <= maxColorDifference * pixTolerance) {
                            matchPixCount++;
                        }
                    }
                }

                if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
                    // console.log('removed black frame : ' + f + ' ; frame duration ' + _frames[f].duration);
                } else {
                    // console.log('frame is passed : ' + f);
                    if (checkUntilNotBlack) {
                        doNotCheckNext = true;
                    }
                    resultFrames.push(_frames[f]);
                }
            }

            resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

            if (resultFrames.length <= 0) {
                // at least one last frame should be available for next manipulation
                // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
                resultFrames.push(_frames[_frames.length - 1]);
            }

            return resultFrames;
        }

        var isPaused = false;

        this.pause = function() {
            isPaused = true;
        };

        this.resume = function() {
            isPaused = false;
        };
    }

    // --------------
    // GifRecorder.js

    function GifRecorder(mediaStream) {
        if (typeof GIFEncoder === 'undefined') {
            throw 'Please link: https://cdn.webrtc-experiment.com/gif-recorder.js';
        }

        // void start(optional long timeSlice)
        // timestamp to fire "ondataavailable"
        this.start = function(timeSlice) {
            timeSlice = timeSlice || 1000;

            var imageWidth = this.videoWidth || 320;
            var imageHeight = this.videoHeight || 240;

            canvas.width = video.width = imageWidth;
            canvas.height = video.height = imageHeight;

            // external library to record as GIF images
            gifEncoder = new GIFEncoder();

            // void setRepeat(int iter)
            // Sets the number of times the set of GIF frames should be played.
            // Default is 1; 0 means play indefinitely.
            gifEncoder.setRepeat(0);

            // void setFrameRate(Number fps)
            // Sets frame rate in frames per second.
            // Equivalent to setDelay(1000/fps).
            // Using "setDelay" instead of "setFrameRate"
            gifEncoder.setDelay(this.frameRate || 200);

            // void setQuality(int quality)
            // Sets quality of color quantization (conversion of images to the
            // maximum 256 colors allowed by the GIF specification).
            // Lower values (minimum = 1) produce better colors,
            // but slow processing significantly. 10 is the default,
            // and produces good color mapping at reasonable speeds.
            // Values greater than 20 do not yield significant improvements in speed.
            gifEncoder.setQuality(this.quality || 1);

            // Boolean start()
            // This writes the GIF Header and returns false if it fails.
            gifEncoder.start();

            startTime = Date.now();

            function drawVideoFrame(time) {
                if (isPaused) {
                    setTimeout(drawVideoFrame, 500, time);
                    return;
                }

                lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

                if (typeof lastFrameTime === undefined) {
                    lastFrameTime = time;
                }

                // ~10 fps
                if (time - lastFrameTime < 90) {
                    return;
                }

                if (video.paused) {
                    video.play(); // Android
                }

                context.drawImage(video, 0, 0, imageWidth, imageHeight);

                gifEncoder.addFrame(context);

                // console.log('Recording...' + Math.round((Date.now() - startTime) / 1000) + 's');
                // console.log("fps: ", 1000 / (time - lastFrameTime));

                lastFrameTime = time;
            }

            lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

            timeout = setTimeout(doneRecording, timeSlice);
        };

        function doneRecording() {
            endTime = Date.now();

            var gifBlob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
                type: 'image/gif'
            });
            self.ondataavailable(gifBlob);

            // todo: find a way to clear old recorded blobs
            gifEncoder.stream().bin = [];
        }

        this.stop = function() {
            if (lastAnimationFrame) {
                cancelAnimationFrame(lastAnimationFrame);
                clearTimeout(timeout);
                doneRecording();
            }
        };

        var isPaused = false;

        this.pause = function() {
            isPaused = true;
        };

        this.resume = function() {
            isPaused = false;
        };

        this.ondataavailable = function() {};
        this.onstop = function() {};

        // Reference to itself
        var self = this;

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        var video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;
        video.src = URL.createObjectURL(mediaStream);
        video.play();

        var lastAnimationFrame = null;
        var startTime, endTime, lastFrameTime;

        var gifEncoder;
        var timeout;
    }

    // https://github.com/antimatter15/whammy/blob/master/LICENSE
    // _________
    // Whammy.js

    // todo: Firefox now supports webp for webm containers!
    // their MediaRecorder implementation works well!
    // should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

    /**
     * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
     * @summary A real time javascript webm encoder based on a canvas hack.
     * @typedef Whammy
     * @class
     * @example
     * var recorder = new Whammy().Video(15);
     * recorder.add(context || canvas || dataURL);
     * var output = recorder.compile();
     */

    var Whammy = (function() {
        // a more abstract-ish API

        function WhammyVideo(duration) {
            this.frames = [];
            this.duration = duration || 1;
            this.quality = 0.8;
        }

        /**
         * Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
         * @method
         * @memberof Whammy
         * @example
         * recorder = new Whammy().Video(0.8, 100);
         * recorder.add(canvas || context || 'image/webp');
         * @param {string} frame - Canvas || Context || image/webp
         * @param {number} duration - Stick a duration (in milliseconds)
         */
        WhammyVideo.prototype.add = function(frame, duration) {
            if ('canvas' in frame) { //CanvasRenderingContext2D
                frame = frame.canvas;
            }

            if ('toDataURL' in frame) {
                frame = frame.toDataURL('image/webp', this.quality);
            }

            if (!(/^data:image\/webp;base64,/ig).test(frame)) {
                throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
            }
            this.frames.push({
                image: frame,
                duration: duration || this.duration
            });
        };

        function processInWebWorker(_function) {
            var blob = URL.createObjectURL(new Blob([_function.toString(),
                'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
            ], {
                type: 'application/javascript'
            }));

            var worker = new Worker(blob);
            URL.revokeObjectURL(blob);
            return worker;
        }

        function whammyInWebWorker(frames) {
            function ArrayToWebM(frames) {
                var info = checkFrames(frames);
                if (!info) {
                    return [];
                }

                var clusterMaxDuration = 30000;

                var EBML = [{
                    'id': 0x1a45dfa3, // EBML
                    'data': [{
                        'data': 1,
                        'id': 0x4286 // EBMLVersion
                    }, {
                        'data': 1,
                        'id': 0x42f7 // EBMLReadVersion
                    }, {
                        'data': 4,
                        'id': 0x42f2 // EBMLMaxIDLength
                    }, {
                        'data': 8,
                        'id': 0x42f3 // EBMLMaxSizeLength
                    }, {
                        'data': 'webm',
                        'id': 0x4282 // DocType
                    }, {
                        'data': 2,
                        'id': 0x4287 // DocTypeVersion
                    }, {
                        'data': 2,
                        'id': 0x4285 // DocTypeReadVersion
                    }]
                }, {
                    'id': 0x18538067, // Segment
                    'data': [{
                        'id': 0x1549a966, // Info
                        'data': [{
                            'data': 1e6, //do things in millisecs (num of nanosecs for duration scale)
                            'id': 0x2ad7b1 // TimecodeScale
                        }, {
                            'data': 'whammy',
                            'id': 0x4d80 // MuxingApp
                        }, {
                            'data': 'whammy',
                            'id': 0x5741 // WritingApp
                        }, {
                            'data': doubleToString(info.duration),
                            'id': 0x4489 // Duration
                        }]
                    }, {
                        'id': 0x1654ae6b, // Tracks
                        'data': [{
                            'id': 0xae, // TrackEntry
                            'data': [{
                                'data': 1,
                                'id': 0xd7 // TrackNumber
                            }, {
                                'data': 1,
                                'id': 0x73c5 // TrackUID
                            }, {
                                'data': 0,
                                'id': 0x9c // FlagLacing
                            }, {
                                'data': 'und',
                                'id': 0x22b59c // Language
                            }, {
                                'data': 'V_VP8',
                                'id': 0x86 // CodecID
                            }, {
                                'data': 'VP8',
                                'id': 0x258688 // CodecName
                            }, {
                                'data': 1,
                                'id': 0x83 // TrackType
                            }, {
                                'id': 0xe0, // Video
                                'data': [{
                                    'data': info.width,
                                    'id': 0xb0 // PixelWidth
                                }, {
                                    'data': info.height,
                                    'id': 0xba // PixelHeight
                                }]
                            }]
                        }]
                    }]
                }];

                //Generate clusters (max duration)
                var frameNumber = 0;
                var clusterTimecode = 0;
                while (frameNumber < frames.length) {

                    var clusterFrames = [];
                    var clusterDuration = 0;
                    do {
                        clusterFrames.push(frames[frameNumber]);
                        clusterDuration += frames[frameNumber].duration;
                        frameNumber++;
                    } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

                    var clusterCounter = 0;
                    var cluster = {
                        'id': 0x1f43b675, // Cluster
                        'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
                    }; //Add cluster to segment
                    EBML[1].data.push(cluster);
                    clusterTimecode += clusterDuration;
                }

                return generateEBML(EBML);
            }

            function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
                return [{
                    'data': clusterTimecode,
                    'id': 0xe7 // Timecode
                }].concat(clusterFrames.map(function(webp) {
                    var block = makeSimpleBlock({
                        discardable: 0,
                        frame: webp.data.slice(4),
                        invisible: 0,
                        keyframe: 1,
                        lacing: 0,
                        trackNum: 1,
                        timecode: Math.round(clusterCounter)
                    });
                    clusterCounter += webp.duration;
                    return {
                        data: block,
                        id: 0xa3
                    };
                }));
            }

            // sums the lengths of all the frames and gets the duration

            function checkFrames(frames) {
                if (!frames[0]) {
                    postMessage({
                        error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
                    });
                    return;
                }

                var width = frames[0].width,
                    height = frames[0].height,
                    duration = frames[0].duration;

                for (var i = 1; i < frames.length; i++) {
                    duration += frames[i].duration;
                }
                return {
                    duration: duration,
                    width: width,
                    height: height
                };
            }

            function numToBuffer(num) {
                var parts = [];
                while (num > 0) {
                    parts.push(num & 0xff);
                    num = num >> 8;
                }
                return new Uint8Array(parts.reverse());
            }

            function strToBuffer(str) {
                return new Uint8Array(str.split('').map(function(e) {
                    return e.charCodeAt(0);
                }));
            }

            function bitsToBuffer(bits) {
                var data = [];
                var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
                bits = pad + bits;
                for (var i = 0; i < bits.length; i += 8) {
                    data.push(parseInt(bits.substr(i, 8), 2));
                }
                return new Uint8Array(data);
            }

            function generateEBML(json) {
                var ebml = [];
                for (var i = 0; i < json.length; i++) {
                    var data = json[i].data;

                    if (typeof data === 'object') {
                        data = generateEBML(data);
                    }

                    if (typeof data === 'number') {
                        data = bitsToBuffer(data.toString(2));
                    }

                    if (typeof data === 'string') {
                        data = strToBuffer(data);
                    }

                    var len = data.size || data.byteLength || data.length;
                    var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
                    var sizeToString = len.toString(2);
                    var padded = (new Array((zeroes * 7 + 7 + 1) - sizeToString.length)).join('0') + sizeToString;
                    var size = (new Array(zeroes)).join('0') + '1' + padded;

                    ebml.push(numToBuffer(json[i].id));
                    ebml.push(bitsToBuffer(size));
                    ebml.push(data);
                }

                return new Blob(ebml, {
                    type: 'video/webm'
                });
            }

            function toBinStrOld(bits) {
                var data = '';
                var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
                bits = pad + bits;
                for (var i = 0; i < bits.length; i += 8) {
                    data += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
                }
                return data;
            }

            function makeSimpleBlock(data) {
                var flags = 0;

                if (data.keyframe) {
                    flags |= 128;
                }

                if (data.invisible) {
                    flags |= 8;
                }

                if (data.lacing) {
                    flags |= (data.lacing << 1);
                }

                if (data.discardable) {
                    flags |= 1;
                }

                if (data.trackNum > 127) {
                    throw 'TrackNumber > 127 not supported';
                }

                var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e) {
                    return String.fromCharCode(e);
                }).join('') + data.frame;

                return out;
            }

            function parseWebP(riff) {
                var VP8 = riff.RIFF[0].WEBP[0];

                var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header
                for (var i = 0, c = []; i < 4; i++) {
                    c[i] = VP8.charCodeAt(frameStart + 3 + i);
                }

                var width, height, tmp;

                //the code below is literally copied verbatim from the bitstream spec
                tmp = (c[1] << 8) | c[0];
                width = tmp & 0x3FFF;
                tmp = (c[3] << 8) | c[2];
                height = tmp & 0x3FFF;
                return {
                    width: width,
                    height: height,
                    data: VP8,
                    riff: riff
                };
            }

            function getStrLength(string, offset) {
                return parseInt(string.substr(offset + 4, 4).split('').map(function(i) {
                    var unpadded = i.charCodeAt(0).toString(2);
                    return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
                }).join(''), 2);
            }

            function parseRIFF(string) {
                var offset = 0;
                var chunks = {};

                while (offset < string.length) {
                    var id = string.substr(offset, 4);
                    var len = getStrLength(string, offset);
                    var data = string.substr(offset + 4 + 4, len);
                    offset += 4 + 4 + len;
                    chunks[id] = chunks[id] || [];

                    if (id === 'RIFF' || id === 'LIST') {
                        chunks[id].push(parseRIFF(data));
                    } else {
                        chunks[id].push(data);
                    }
                }
                return chunks;
            }

            function doubleToString(num) {
                return [].slice.call(
                    new Uint8Array((new Float64Array([num])).buffer), 0).map(function(e) {
                    return String.fromCharCode(e);
                }).reverse().join('');
            }

            var webm = new ArrayToWebM(frames.map(function(frame) {
                var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
                webp.duration = frame.duration;
                return webp;
            }));

            postMessage(webm);
        }

        /**
         * Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
         * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
         * @method
         * @memberof Whammy
         * @example
         * recorder = new Whammy().Video(0.8, 100);
         * recorder.compile(function(blob) {
         *    // blob.size - blob.type
         * });
         */
        WhammyVideo.prototype.compile = function(callback) {
            var webWorker = processInWebWorker(whammyInWebWorker);

            webWorker.onmessage = function(event) {
                if (event.data.error) {
                    console.error(event.data.error);
                    return;
                }
                callback(event.data);
            };

            webWorker.postMessage(this.frames);
        };

        return {
            /**
             * A more abstract-ish API.
             * @method
             * @memberof Whammy
             * @example
             * recorder = new Whammy().Video(0.8, 100);
             * @param {?number} speed - 0.8
             * @param {?number} quality - 100
             */
            Video: WhammyVideo
        };
    })();

}//End of isChrome check  

if( isFirefox || ((isChrome || isOpera)  && parent_url.indexOf('https') > -1)) {

//Voicemessage.js
var leftchannel = [];
var rightchannel = [];
var recorder = null;
var recording = false;
var recordingLength = 0;
var volume = null;
var audioInput = null;
var sampleRate = null;
var audioContext = null;
var context = null;
var outputElement = document.getElementById('output');
var outputString;
var audioMessage;
var audiostorage = "/uploads/audio/";
var isFirefox = !!navigator.mozGetUserMedia;
var first = true;
$('#popup18 .btn-popup,#popup2 .btn-popup,#popup30 .start-video').click(function(){
    if($('.check_domain').val() === 'true') {
        $('#popup20 #play').hide();
        $('#popup4 #play').hide();
        $('#popup32 #play').hide();

        // var mediaConstraints = {
        //     audio: true
        // };

        // if (!navigator.getUserMedia){
        //     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        // }

        // navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (navigator.getUserMedia){
            navigator.getUserMedia({audio:true}, success , function(e) {
                alert('Error capturing audio.');
            });
        } else alert('getUserMedia not supported in this browser.');
    }
});

function onMediaSuccess(stream) {
    // if(!isFirefox){

    //     mediaRecorder = new MediaStreamRecorder(stream);
    //     mediaRecorder.mimeType = 'audio/wav';
    //     mediaRecorder.audioChannels = 1;
    //     mediaRecorder.ondataavailable = function (blob) {
    //         audioMessage = blob;
    //     };
        mediaRecorder = new MultiStreamRecorder(stream);
        mediaRecorder.video = video;
        mediaRecorder.ondataavailable = function (blobs) {
            audioMessage = blobs.audio;
            videoMessage = blobs.video;
        };
    // } else {
    //     recordRTC = RecordRTC(stream);   
    // }

    $('#popup20 #play').show();
    $('#popup4 #play').show();
    $('#popup32 #play').show();
}

function onMediaError(e) {
    alert('Oops!!! You have a problem with Your camera or You don\'t have permissions to use it!!!');
}

var isPaused = false;
var seconds1 = 0;
var seconds2 = 0;
var minutes = 0;
var message_length = '0:00';
if($('#record_length').length !== 0) {
    document.getElementById("record_length").innerHTML = message_length;
}

function func() {
    seconds2++;
    if(seconds2 == 10){
        seconds2 = 0;
        seconds1++;
    }
    if(seconds1 == 6){
        seconds1 = 0;
        minutes++;
    }
    message_length = minutes+":"+seconds1+seconds2;
    document.getElementById("record_length").innerHTML = message_length;
}
if (typeof $.timer != 'undefined'){
    var timer = $.timer(func, 1000, true);
    timer.stop();
}
$(".play").on('click', function(){
    if($('.check_domain').val() === 'true') {
        document.getElementById('play').style.display = 'none';
        document.getElementById('stop').style.display = 'inline-block';

        timer.play();
        recording = true;
        if($('.is_premium').val() == false){
            if(first)
                setTimeout(getAudio, 300000);
            first = true;
        } else {
            if(first)
                setTimeout(getAudio, 600000);
            first = true;
        }
    }
});
// $(".pause").on('click', function(){
//     if($('.check_domain').val() === 'true') {
//         document.getElementById('pause').style.display = 'none';
//         document.getElementById('play').style.display = 'inline-block';
//         timer.pause();
//         /*isPaused = true;*/
//         recording = false;
//     }
// });


function getAudio(){
    first = false;
    if($('.check_domain').val() === 'true') {
        $('.display_div').hide();
        $('.display_div:nth-child(5)').show();
    }
    // if(!isFirefox)
    //     mediaRecorder.stop();
    // else{
    //     recordRTC.stopRecording(function(videoURL) { 
    //         audioMessage = recordRTC.getBlob();
    //     });
    // }
    timer.stop();
    // document.getElementById('pause').style.display = 'none';
    document.getElementById('play').style.display = 'inline-block';
    recording = false;

    var leftBuffer = mergeBuffers ( leftchannel, recordingLength );
    var rightBuffer = mergeBuffers ( rightchannel, recordingLength );
    var interleaved = interleave ( leftBuffer, rightBuffer );

    var buffer = new ArrayBuffer(44 + interleaved.length * 2);
    var view = new DataView(buffer);

    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 2, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    var lng = interleaved.length;
    var index = 44;
    var volume = 1;
    for (var i = 0; i < lng; i++){
        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
        index += 2;
    }

    var blob = new Blob ( [ view ], { type : 'audio/wav' } );

    var xhr=new XMLHttpRequest();

    var fd = new FormData();

    fd.append("file",blob);

    xhr.open("POST","/messages/upload-file");

    $("#spanimg").css("display", "inline-block");

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert("An Error Occured.");
        } else {
            $("#spanimg").css("display", "none");
            $('#playing').show();
            $('.hidden_div').show();

            localStorage.message_length = message_length;
            localStorage.fileName = JSON.parse(xhr.responseText).file_name;
            localStorage.id = JSON.parse(xhr.responseText).id;
            localStorage.file = audiostorage + JSON.parse(xhr.responseText).file_name;
            $('#music').prop('src', localStorage.file);
            document.getElementById('message_length').innerHTML = localStorage.message_length;

            document.getElementById("file_name").value = localStorage.fileName;
            document.getElementById("duration").value = localStorage.message_length;
            document.getElementById('token').value = localStorage.token;
            seconds1 = 0;
            seconds2 = 0;
            minutes = 0;
            message_length = '0:00';
            leftchannel.length = rightchannel.length = 0;
            recordingLength = 0;

        }
    }

    xhr.send(fd);
}

$(".stop").on('click', function(){
    if($('.check_domain').val() === 'true') {
        getAudio();
    }
});

function interleave(leftChannel, rightChannel){
    var length = leftChannel.length + rightChannel.length;
    var result = new Float32Array(length);
    var inputIndex = 0;
    for (var index = 0; index < length; ){
        result[index++] = leftChannel[inputIndex];
        result[index++] = rightChannel[inputIndex];
        inputIndex++;
    }
    return result;
}

function mergeBuffers(channelBuffer, recordingLength){
    var result = new Float32Array(recordingLength);
    var offset = 0;
    var lng = channelBuffer.length;
    for (var i = 0; i < lng; i++){
        var buffer = channelBuffer[i];
        result.set(buffer, offset);
        offset += buffer.length;
    }
    return result;
}

function writeUTFBytes(view, offset, string){
    var lng = string.length;
    for (var i = 0; i < lng; i++){
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function success(e){
    audioContext = window.AudioContext || window.webkitAudioContext;
    context = new audioContext();
    sampleRate = context.sampleRate;

    volume = context.createGain();
    audioInput = context.createMediaStreamSource(e);
    audioInput.connect(volume);
    var bufferSize = 2048;
    recorder = context.createScriptProcessor(bufferSize, 2, 2);

    recorder.onaudioprocess = function(e){
        if (!recording) return;
        var left = e.inputBuffer.getChannelData (0);
        var right = e.inputBuffer.getChannelData (1);
        leftchannel.push (new Float32Array (left));
        rightchannel.push (new Float32Array (right));
        recordingLength += bufferSize;
    }
    volume.connect (recorder);
    recorder.connect (context.destination);

    $('#popup20 #play').show();
    $('#popup4 #play').show();
    $('#popup32 #play').show();
}

//Videomessage.js
var videostorage = "/uploads/video/";
var mediaRecorder;
var recordRTC;
var audioMessage = "";
var videoMessage = "";
var video;
var first = true;
var isFirefox = !!navigator.mozGetUserMedia;

$('#popup7 .btn-popup,#popup13 .btn-popup,#popup25 .start-video').click(function() {
    if($('.check_domain').val() === 'true') {
        $('#popup9 #capture').hide();
        $('#popup15 #capture').hide();
        $('#popup27 #capture').hide();

        var mediaConstraints = {
            audio: true,
            video: true
        };

        if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        }
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    }
});

function onMediaSuccess(stream) {
    if(stream.getVideoTracks().length == 0) {
        alert('Error Capturing Video!!! Please check is camera connected or Have You a permission to use it!!!');
        return false;
    }
    video = document.querySelector('video');
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    video.src = window.URL.createObjectURL(stream);
    var options = {};

    if(!isFirefox) {
        mediaRecorder = new MultiStreamRecorder(stream);
        mediaRecorder.video = video;
        mediaRecorder.audioChannels = 1;
        mediaRecorder.ondataavailable = function (blobs) {
            if(first){
                audioMessage = blobs.audio;
                videoMessage = blobs.video;
                getVideo();
            } else {
                audioMessage = blobs.audio;
                videoMessage = blobs.video;
            }
            first = true;
        };
    } else {
        recordRTC = RecordRTC(stream, options);
    }

    $('#popup9 #capture').show();
    $('#popup15 #capture').show();
    $('#popup27 #capture').show();
}

function onMediaError(e) {
    alert('Error Capturing Video!!! Please check is camera connected or Have You a permission to use it!!!');
}

var isPaused = false;
var seconds1 = 0;
var seconds2 = 0;
var minutes = 0;
var message_length = '0:00';

if($('#record_length').length !== 0) {
    document.getElementById("record_length").innerHTML = message_length;
}

function func() {
    seconds2++;
    if(seconds2 == 10){
        seconds2 = 0;
        seconds1++;
    }

    if(seconds1 == 6){
        seconds1 = 0;
        minutes++;
    }

    message_length = minutes+":"+seconds1+seconds2;
    document.getElementById("record_length").innerHTML = message_length;
}

if (typeof $.timer != 'undefined') {
    var timer = $.timer(func, 1000, true);
    timer.stop();
}

$("#capture").on('click', function() {
    if($('.check_domain').val() === 'true') {
        document.getElementById('capture').style.display        =   'none';
        document.getElementById('video-stop').style.display     =   'inline-block';
        if(!isFirefox) {
            mediaRecorder.start(6000000);
            if($('.is_premium').val() == false) {
                setTimeout(getVideo, 300000);
            } else {
                setTimeout(getVideo, 600000);
            }
        } else {
            recordRTC.startRecording();
            if($('.is_premium').val() == false) {
                if(first)
                    setTimeout(getVideo, 300000);
                first = true;
            } else {
                if(first)
                    setTimeout(getVideo, 600000);
                first = true;
            }
        }
        timer.play();
    }
});

$("#video-stop").on('click', function() {
    if($('.check_domain').val() === 'true') {
        getVideo();
    }
});

$('#play_back').on('click', function() {
    if($('.check_domain').val() === 'true') {
        $('#play_back').hide();
        $('#video-pause').show();
        var video = document.getElementById('video_watch');
        video.play();
    }
});
$('#video-pause').on('click', function() {
    if($('.check_domain').val() === 'true') {
        $('#play_back').show();
        $('#video-pause').hide();
        var video = document.getElementById('video_watch');
        video.pause();
    }
})
function getVideo() {
    first = false;

    if($('.check_domain').val() === 'true') {
        $('.display_div').hide();
        $('.display_div:nth-child(10)').show();
    }

    if(!isFirefox) {
        mediaRecorder.stop();
    } else {
        recordRTC.stopRecording(function(videoURL) {
            videoMessage = recordRTC.getBlob();
        });
    }

    timer.stop();

    document.getElementById('video-pause').style.display    =   'none';
    document.getElementById('video-stop').style.display     =   'none';
    document.getElementById('capture').style.display        =   'inline-block';

    var fileType = 'video';
    var xhr = new XMLHttpRequest();
    var formData = new FormData();

    if(!isFirefox) {
        $("#videospanimg").css("display", "inline-block");
        setTimeout(function(){
            formData.append('audiofile', audioMessage);
            formData.append('videofile', videoMessage);
            formData.append('length', message_length);

            xhr.open("POST","/messages/upload-file",true);

            xhr.send(formData);
        }, 5000);

    } else {
        $("#videospanimg").css("display", "inline-block");
        // setTimeout(function() {
            formData.append('videofile', videoMessage);
            formData.append('length', message_length);
            xhr.open("POST","/messages/upload-file",true);
            xhr.send(formData);
        // },3000);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            $("#videospanimg").css("display", "none");
            $('.btn-holder').show();

            localStorage.message_length =   message_length;
            localStorage.fileName       =   JSON.parse(xhr.responseText).file_name;
            localStorage.file           =   videostorage + JSON.parse(xhr.responseText).file_name;
            localStorage.id             =   JSON.parse(xhr.responseText).id;
            $('#video_watch').prop('src', localStorage.file);

            document.getElementById('message_length').innerHTML =   localStorage.message_length;
            document.getElementById("video_file_name").value    =   localStorage.fileName;
            document.getElementById("video_duration").value     =   localStorage.message_length;
            document.getElementById('video_token').value        =   localStorage.token;

            seconds1        =   0;
            seconds2        =   0;
            minutes         =   0;
            message_length  =   '0:00';
        }
    };
}
} else {
    
    console.log('load flash');

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
            
    console.log('line 5937');
            
                            $('.videoFlash').on('click' , function() {
                    $.each( $('script'), function( key, value ) {
                            if($(value).attr('src') == '/assets/js/flash-recorder.js') {
                                    $(this).remove();
                            }

                            if($(value).attr('src') == '/assets/js/flash_audioRecorder.js') {
                                    $(this).remove();
                            }
                    });

                    var script_flash  = document.createElement('script');
                    script_flash.type = "text/javascript";
                    script_flash.src  = "/assets/js/flash-recorder.js";
                    document.getElementsByTagName('body')[0].appendChild(script_flash);
            });

            $('.audioFlash').on('click' , function() {
                    $.each( $('script'), function( key, value ) {
                            if($(value).attr('src') == '/assets/js/flash-recorder.js') {
                                    $(this).remove();
                            }

                            if($(value).attr('src') == '/assets/js/flash_audioRecorder.js') {
                                    $(this).remove();
                            }
                    });

                    var script_audio  = document.createElement('script');
                    script_audio.type = "text/javascript";
                    script_audio.src  = "/assets/js/flash_audioRecorder.js";
                    document.getElementsByTagName('body')[0].appendChild(script_audio);
            });

}


                
            // Credit to Ludwig: http://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript                 
            (function (window) {
                {
                    var unknown = ' ';

                    // screen
                    var screenSize = '';
                    if (screen.width) {
                        width = (screen.width) ? screen.width : '';
                        height = (screen.height) ? screen.height : '';
                        screenSize += '' + width + " x " + height;
                    }

                    // browser
                    var nVer = navigator.appVersion;
                    var nAgt = navigator.userAgent;
                    var browser = navigator.appName;
                    var version = '' + parseFloat(navigator.appVersion);
                    var majorVersion = parseInt(navigator.appVersion, 10);
                    var nameOffset, verOffset, ix;

                    // Opera
                    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                        browser = 'Opera';
                        version = nAgt.substring(verOffset + 6);
                        if ((verOffset = nAgt.indexOf('Version')) != -1) {
                            version = nAgt.substring(verOffset + 8);
                        }
                    }
                    // Opera Next
                    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
                        browser = 'Opera';
                        version = nAgt.substring(verOffset + 4);
                    }
                    // MSIE
                    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                        browser = 'Microsoft Internet Explorer';
                        version = nAgt.substring(verOffset + 5);
                    }
                    // Chrome
                    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                        browser = 'Chrome';
                        version = nAgt.substring(verOffset + 7);
                    }
                    // Safari
                    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                        browser = 'Safari';
                        version = nAgt.substring(verOffset + 7);
                        if ((verOffset = nAgt.indexOf('Version')) != -1) {
                            version = nAgt.substring(verOffset + 8);
                        }
                    }
                    // Firefox
                    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                        browser = 'Firefox';
                        version = nAgt.substring(verOffset + 8);
                    }
                    // MSIE 11+
                    else if (nAgt.indexOf('Trident/') != -1) {
                        browser = 'Microsoft Internet Explorer';
                        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                    }
                    // Other browsers
                    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                        browser = nAgt.substring(nameOffset, verOffset);
                        version = nAgt.substring(verOffset + 1);
                        if (browser.toLowerCase() == browser.toUpperCase()) {
                            browser = navigator.appName;
                        }
                    }
                    // trim the version string
                    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
                    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
                    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

                    majorVersion = parseInt('' + version, 10);
                    if (isNaN(majorVersion)) {
                        version = '' + parseFloat(navigator.appVersion);
                        majorVersion = parseInt(navigator.appVersion, 10);
                    }

                    // mobile version
                    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

                    // cookie
                    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

                    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                        document.cookie = 'testcookie';
                        cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
                    }

                    // system
                    var os = unknown;
                    var clientStrings = [
                        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
                        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
                        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
                        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
                        {s:'Windows Vista', r:/Windows NT 6.0/},
                        {s:'Windows Server 2003', r:/Windows NT 5.2/},
                        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
                        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
                        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
                        {s:'Windows 98', r:/(Windows 98|Win98)/},
                        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
                        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
                        {s:'Windows CE', r:/Windows CE/},
                        {s:'Windows 3.11', r:/Win16/},
                        {s:'Android', r:/Android/},
                        {s:'Open BSD', r:/OpenBSD/},
                        {s:'Sun OS', r:/SunOS/},
                        {s:'Linux', r:/(Linux|X11)/},
                        {s:'iOS', r:/(iPhone|iPad|iPod)/},
                        {s:'Mac OS X', r:/Mac OS X/},
                        {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
                        {s:'QNX', r:/QNX/},
                        {s:'UNIX', r:/UNIX/},
                        {s:'BeOS', r:/BeOS/},
                        {s:'OS/2', r:/OS\/2/},
                        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
                    ];
                    for (var id in clientStrings) {
                        var cs = clientStrings[id];
                        if (cs.r.test(nAgt)) {
                            os = cs.s;
                            break;
                        }
                    }

                    var osVersion = unknown;

                    if (/Windows/.test(os)) {
                        osVersion = /Windows (.*)/.exec(os)[1];
                        os = 'Windows';
                    }

                    switch (os) {
                        case 'Mac OS X':
                            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                            break;

                        case 'Android':
                            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                            break;

                        case 'iOS':
                            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                            break;
                    }

                    // flash (you'll need to include swfobject)
                    /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
                    var flashVersion = 'no check';
                    if (typeof swfobject != 'undefined') {
                        var fv = swfobject.getFlashPlayerVersion();
                        if (fv.major > 0) {
                            flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
                        }
                        else  {
                            flashVersion = unknown;
                        }
                    }
                }

                window.jscd = {
                    screen: screenSize,
                    browser: browser,
                    browserVersion: version,
                    browserMajorVersion: majorVersion,
                    mobile: mobile,
                    os: os,
                    osVersion: osVersion,
                    cookies: cookieEnabled,
                    flashVersion: flashVersion
                };
            }(this));