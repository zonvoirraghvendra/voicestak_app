package{
	import com.voicestack.JSCam;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author firsoff maxim, +79222345364, skype[maxim.firsoff.work]
	 */
	public class Main extends Sprite {
		
		private var jsCam:JSCam;
		
		public function Main() {
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
			jsCam = new JSCam(stage);
			
		}
		
	}
	
}