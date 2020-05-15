package com.voicestack {
	import by.blooddy.crypto.image.JPEGEncoder;
	import flash.display.BitmapData;
	import flash.display.Stage;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.ActivityEvent;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.StatusEvent;
	import flash.external.ExternalInterface;
	import flash.media.Camera;
	import flash.media.Video;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.system.Security;
	import flash.system.System;
	import flash.utils.ByteArray;
	import flash.utils.clearInterval;
	import flash.utils.setInterval;
	/**
	 * ...
	 * @author firsoff maxim, +79222345364, skype[maxim.firsoff.work]
	 */
	public class JSCam {
		
		public static const CALLBACK_MODE:String = "callback";
		public static const STREAM_MODE:String = "stream";
		public static const SAVE_MODE:String = "save";
		public static const VERSION:String = "0.1";
		
		private var stage:Stage;
		private var camera:Camera;
		private var video:Video;
		private var mode:String = CALLBACK_MODE;
		private var buffer:BitmapData;
		private var stream:int;
		private var interval:int;
		private var quality:Number = 85;
		
		public function JSCam(stage:Stage) {
			this.stage = stage;
			
			stage.scaleMode = StageScaleMode.NO_SCALE;
            stage.align = StageAlign.TOP_LEFT;
			
			Security.allowDomain("*");
			
			// define camera
			camera = getCamera();
			
			var flashVars:Object = stage.loaderInfo.parameters;
			if (flashVars) {
				if (flashVars.mode) {
					mode = flashVars.mode;
				}
				
				if (flashVars.quality) {
					quality = flashVars.quality;
					quality = quality < 1 ? 1 : quality;
					quality = quality > 100 ? 100 : quality;
				}
			}
			
			log('mode : ' + mode);
			log('camera : ' + camera);
			log('quality : ' + quality);
			log("JSCam v" + VERSION);
			
			// handle cam
			if (camera) {
				camera.addEventListener(StatusEvent.STATUS, onCameraStatusEvent);
				camera.setQuality(0, 100);
				camera.setMode(stage.stageWidth, stage.stageHeight, 30);
				
				// create buffer
				//buffer = new BitmapData(stage.stageWidth, stage.stageHeight, false);
				
				if (jsAvailable) {
					ExternalInterface.addCallback("capture",		capture);
					ExternalInterface.addCallback("stop",			stop);
					ExternalInterface.addCallback("save", 			save);
					ExternalInterface.addCallback("setCamera", 		setCamera);
					ExternalInterface.addCallback("getCameraList", 	getCameraList);
				}
				
				video = new Video(stage.stageWidth, stage.stageHeight); 
				video.attachCamera(camera); 
				stage.addChild(video); 
			}else {
				if (jsAvailable) {
					ExternalInterface.call('webcam.debug', "error", "No camera was detected.");
				}
			}
		}
		
		public function stop():void {
			clearInterval(interval);
			log('stopped');
		}
		
		public static function log(...args):void {
			var str:String = "[FLASH] " + args.concat(",");
			if (ExternalInterface.available) { 
				//ExternalInterface.call('log', "[FLASH] JSCam v" + VERSION);
				ExternalInterface.call('log', str);
			}
			trace(str);
		}
		
		
		private function onCameraStatusEvent(e:StatusEvent):void {
			trace("onCameraStatusEvent : " + e.code);
			switch (e.code) { 
				
				case "Camera.Muted": 
					//trace("User clicked Deny."); 
					if (jsAvailable) {
						ExternalInterface.call('webcam.debug', "notify", "Camera stopped");
					}
					
					break; 
				case "Camera.Unmuted": 
					//trace("User clicked Accept."); 
					if (jsAvailable) {
						ExternalInterface.call('webcam.debug', "notify", "Camera started");
					}
					break; 
					
			} 
		}
		
		
		private function getCamera():Camera {
			var result:Camera;
			
			if (Camera.isSupported == false) return null;
			
			var id:String;
			for (var i:int = 0, l:int = Camera.names.length; i < l; i++) {
				if (Camera.names[i] == "USB Video Class Video") {
					id = Camera.names[i];
					break;
				}
			}
			if (id) {
				result = Camera.getCamera(id);
			} else {
				result = Camera.getCamera();
			}
			return result;
		}
		
		public function get jsAvailable():Boolean {
			return ExternalInterface.available;
		}
		
		
		public function capture(time:Number = undefined):Boolean {
			
			if (isNaN(time)) {
				time = 5;
				log("capture started with default time : " + time + "s ...");
			}
			
			log("camera : " + camera);
			log("mode : " + mode);
			if (camera) {

				if (buffer) {
					buffer.dispose();
				}

				buffer = new BitmapData(stage.width, stage.height);
				if (jsAvailable) {
					ExternalInterface.call('webcam.debug', "notify", "Capturing started.");
				}
				

				//if ("stream" == mode) {
				if (mode == STREAM_MODE) {
					_stream();
					return true;
				}

				if (!time) {
					time = 0;
				} else if (time > 10) {
					time = 10;
				}

				_capture(time);
				return true;
			}
			return false;
		}
		
		private  function _stream():void{
			buffer.draw(video);
			clearInterval(stream);
			for (var i:int = 0; i < 240; ++i) {
				var row:String = "";
				for (var j:int=0; j < 320; ++j) {
					row+= buffer.getPixel(j, i);
					row+= ";";
				}
				ExternalInterface.call("webcam.onSave", row);
			}

			stream = setInterval(_stream, 10);
		}
		
		
		private  function _capture(time:Number):void {
			clearInterval(interval);
			
			if (0 == time) {
				buffer.draw(video);
				if (jsAvailable) {
					ExternalInterface.call('webcam.onCapture');
					ExternalInterface.call('webcam.debug', "notify", "Capturing finished.");
				}
			} else {
				if (jsAvailable) { 
					ExternalInterface.call('webcam.onTick', time - 1);
				}
				interval = setInterval(_capture, 1000, time - 1);
			}
			log("capture progress: " + time + "s");
		}
		
		public function save(file:String):Boolean {

			//if ("stream" == mode) {
			if (mode == STREAM_MODE) {
				return true;
			} else if (buffer) {
				//if ("callback" == mode) {
				if (mode == CALLBACK_MODE) {
					for (var i:int = 0; i < 240; ++i) {
						var row:String = "";
						for (var j:int=0; j < 320; ++j) {
							row+= buffer.getPixel(j, i);
							row+= ";";
						}
						if (jsAvailable) {
							ExternalInterface.call("webcam.onSave", row);
						}
					}

				} else if (mode == SAVE_MODE) {
					if (file) {

						var byteArray:ByteArray = JPEGEncoder.encode(buffer, quality);
						var str:String = byteArray.toString();
						
						var loader:URLLoader = new URLLoader();
						loader.dataFormat = URLLoaderDataFormat.TEXT;
						
						var request:URLRequest = new URLRequest(file);
						request.contentType = "image/jpeg";
						request.data = str;
						
						loader.load(request);
						loader.addEventListener(Event.COMPLETE, onSaveComplete);
						loader.addEventListener(IOErrorEvent.IO_ERROR, onSaveError);
						
					} else {
						ExternalInterface.call('webcam.debug', "error", "No file name specified.");
						return false;
					}

				} else {
					ExternalInterface.call('webcam.debug', "error", "Unsupported storage mode.");
				}

				buffer = null;
				return true;
			}
			return false;
		}
		
		private function onSaveError(e:IOErrorEvent):void {
			disposeSaveLoader(e.target as URLLoader);
			
		}
		
		private function onSaveComplete(e:Event):void {
			disposeSaveLoader(e.target as URLLoader);
			if (jsAvailable) {
				ExternalInterface.call("webcam.onSave", "done");
			}	
		}
		
		
		private function disposeSaveLoader(loader:URLLoader):void {
			if (loader) {
				loader.removeEventListener(Event.COMPLETE, onSaveComplete);
				loader.removeEventListener(IOErrorEvent.IO_ERROR, onSaveError);
				try {
					loader.close();
				}catch (err:Error){}
			}
			
		}
		
		
		public function setCamera(id:String):Boolean {
			if (Camera.names.indexOf(id) > -1) {
				camera = Camera.getCamera(id)
				camera.setQuality(0, 100);
				camera.setMode(stage.width, stage.height, 24, false);
				return true;
			}
			return false;
		}
		
		public static function getCameraList():Array {
			return Camera.names;
		}
	}

}