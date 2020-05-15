@extends('layouts.layout')

@section('content')

	<div id="wrapper">
    	<div class="side-pannel">

            <!-- <a href="#" class="send-message one">Send a Video Or Voice Message</a> -->
            <!--<a href="#" class="send-message two">
                Send a
                <span class="video">Video Or</span>
                <span class="voice">Voice Message</span>
            </a>
            <a href="#" class="send-message three">Send a Video Or Voice Message</a>
            <a href="#" class="send-message4">Send a Video Or Voice Message</a>
            <a href="#" class="send-message5">Send a Video Or Voice Message</a>
            <div class="send-message6">
                <strong class="title">Send a </strong>
                <a href="#">
                    <span class="voice">Voice<br> Message</span>
                    <span class="divider"></span>
                    <span class="video">Video<br> Message</span>
                </a>
            </div>
            <div class="send-message7">
                <strong class="title">Send a</strong>
                <a href="#" class="video">Video Message</a>
                <a href="#" class="voice">Voice Message</a>
            </div>
            <div class="send-message8">
                <strong class="title">Send a </strong>
                <a href="#">
                    <span class="voice">Voice<br> Message</span>
                    <span class="video">Video<br> Message</span>
                </a>
            </div>
            <div class="send-message9">
                <strong class="title"><span>Send a </span></strong>
                <div class="holder">
                    <span class="or">or</span>
                    <a href="#" class="video">
                        <span class="ico"></span>
                        Video<br> Message
                    </a>
                    <a href="#" class="voice">
                        <span class="ico"></span>
                        Voice<br> Message
                    </a>
                </div>
            </div>
            <div class="send-message10">
                <strong class="title"><em>Send us a</em></strong>
                <a href="#popup1" class="lightbox">
                    <span class="voice">Voice<br> Message</span>
                    <span class="video">Video<br> Message</span>
                    <span class="divider">OR</span>
                </a>
            </div>
            -->
           <div class="send-message10">
                <strong class="title"><em>Send us a</em></strong>
                <a href="#popup32" class="lightbox">
                    <span class="voice">Voice<br> Message</span>
                    <span class="divider">OR</span>
                    <span class="video">Video<br> Message</span>
                </a>
            </div>
        </div>
        <div class="bottom-pannel">
        	<div class="holder">
            	<!--
        		<a href="#" class="send-message one">Send a Video Or Voice Message</a>
                <a href="#" class="send-message two">
                	Send a
                    <span class="video">Video Or</span>
                    <span class="voice">Voice Message</span>
                </a>
                <a href="#" class="send-message three">Send a Video Or Voice Message</a>
                <a href="#" class="send-message4">Send a Video Or Voice Message</a>
                <a href="#" class="send-message5">Send a Video Or Voice Message</a>
                <div class="send-message6">
                	<strong class="title">Send a </strong>
                    <a href="#">
                    	<span class="voice">Voice<br> Message</span>
                    	<span class="video">Video<br> Message</span>
                        <span class="divider"></span>
                    </a>
                </div>
                <div class="send-message7">
                	<strong class="title">Send a</strong>
                    <a href="#" class="video">Video Message</a>
                    <a href="#" class="voice">Voice Message</a>
                </div>
                <div class="send-message8">
                	<strong class="title">Send a </strong>
                    <a href="#">
                    	<span class="voice">Voice<br> Message</span>
                    	<span class="video">Video<br> Message</span>
                    </a>
                </div>
                <div class="send-message9">
                	<strong class="title"><span>Send a </span></strong>
                    <div class="holder">
                    	<span class="or">or</span>
                    	<a href="#" class="video">
                        	<span class="ico"></span>
                            Video<br> Message
                        </a>
                        <a href="#" class="voice">
                        	<span class="ico"></span>
                        	Voice<br> Message
                        </a>
                    </div>
                </div> -->
                <!-- <div class="send-message10">
                	<strong class="title"><em>Send a</em></strong>
                    <a href="#popup1" class="lightbox">
                    	<span class="voice">Voice<br> Message</span>
                    	<span class="video">Video<br> Message</span>
                        <span class="divider">OR</span>
                    </a>
                </div> -->

        	</div>
        </div>
    </div>
    <div class="popup-holder">
    	<div id="popup1" class="lightbox">
        	<section class="popup popup-one">
            	<h2>We want to hear from you!<br> Leave us a voice or video message.</h2>
                <div class="box-holder">
                	<div class="box">
                    	<div class="align-left"><img src="assets/img/img3.png" alt="image description"></div>
                        <div class="text">
                        	<strong class="title">Record Your</strong>
                            <h3>Voice Message</h3>
                            <a href="#" class="btn-popup">Start Recording</a>
                        </div>
                    </div>
                    <div class="box">
                    	<div class="align-left"><img src="assets/img/img4.png" alt="image description"></div>
                        <div class="text">
                        	<strong class="title">Record Your</strong>
                            <h3>Video Message</h3>
                            <a href="#" class="btn-popup">Start Recording</a>
                        </div>
                    </div>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup2" class="lightbox">
        	<section class="popup popup-two">
            	<h2 class="voice">Send Us a Voice Message</h2>
                <h3>We would love to hear from you!<br> Please record your message.</h3>
            	<strong class="sub-title">Is Your Microphone On?</strong>
                <a href="#" class="btn-popup">Start Recording</a>
                <ol>
                	<li>Record</li>
                    <li>Listen</li>
                    <li>Send</li>
                </ol>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup3" class="lightbox">
        	<section class="popup popup-three">
            	<h2 class="voice">Send Us a Voice Message</h2>
            	<ol>
                	<li>Adjust your microphone volume </li>
                    <li>Click Allow to enable your microphone</li>
                </ol>
                <div class="flash-box"><img src="assets/img/img-flash.jpg" alt=""></div>
                <h3>Press Here To Start Recording</h3>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup4" class="lightbox">
        	<section class="popup popup-four">
            	<h2 class="voice">Send Us a Voice Message</h2>
                <strong class="title">Speak into your microphone!</strong>
                <h3>Recording: <span>01:05</span></h3>
                <strong class="sub-title">Max recording duration: <span>5</span> minutes</strong>
                <div class="slider"><span class="handle"></span></div>
                <div class="btn-holder">
                	<a href="#" class="btn-pause">Pause</a>
                    <a href="#" class="btn-stop">Stop</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup5" class="lightbox">
        	<section class="popup popup-five">
            	<h2 class="voice">Send Us a Voice Message</h2>
                <strong class="title">Press “Play” to listen to your recording Press “Re-record” to record a new message Press “Send” to send your voice message</strong>
                <h3>Playing <span>04:05</span></h3>
                <div class="progress">
                	<div class="progress-bar" style="width:20%;">
                    	<span class="handle"></span>
                    </div>
                </div>
                <div class="btn-holder">
                	<a href="#" class="btn-play">Play</a>
                    <a href="#" class="btn-stop">Re-record</a>
                	<a href="#" class="btn-send">Send</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup6" class="lightbox">
        	<section class="popup popup-six">
            	<h2 class="voice">Send Us a Voice Message</h2>
                <strong class="sub-title">Enter your information below to ensure<br> we receive your message</strong>
            	<div class="popup-frame">
                	<form action="#">
                    	<fieldset>
                        	<div class="input-field">
                                <div class="text-field"><input type="text" placeholder="Enter Your Name"></div>
                                <div class="text-field email"><input type="email" placeholder="Enter Your Email"></div>
                            </div>
                            <p>By sending this message, I give permission to view, reply to,<br> download and share my message</p>
                            <div class="btn-holder">
                            	<button type="submit" class="btn-send"><span>Send</span></button>
                                <button type="submit"><span>Restart</span></button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <!-- video popup -->
        <div id="popup7" class="lightbox">
        	<section class="popup popup-two popup7">
            	<h2 class="video">Send Us a Video Message</h2>
                <h3>We would love to hear from you!<br> Please record your message.</h3>
            	<strong class="sub-title">Is Your Microphone And Webcam On?</strong>
                <a href="#" class="btn-popup">Start Recording</a>
                <ol>
                	<li>Record</li>
                    <li>Preview</li>
                    <li>Send</li>
                </ol>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup8" class="lightbox">
        	<section class="popup popup-three popup8">
            	<h2 class="video">Send Us a Video Message</h2>
            	<ol>
                	<li>Adjust your microphone volume </li>
                    <li>Click Allow to enable your mic. and camera</li>
                </ol>
                <div class="flash-box"><img src="assets/img/img-flash.jpg" alt=""></div>
                <h3>Press Here To Start Recording</h3>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup9" class="lightbox">
        	<section class="popup popup-five popup9">
            	<h2 class="video add">Send Us a Video Message</h2>
                <div class="recording-box"><img src="assets/img/img-record.jpg" alt=""></div>
                <div class="row">
                	<a href="#" class="settings">Settings</a>
                    <a href="#" class="btn-record">Record</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup10" class="lightbox">
        	<section class="popup popup-five popup10">
            	<h2 class="video add">Send Us a Video Message</h2>
                <div class="recording-box"><img src="assets/img/img5.jpg" alt=""></div>
                <div class="btn-holder">
                	<a href="#" class="btn-play">Play</a>
                    <a href="#" class="btn-stop">Re-record</a>
                	<a href="#" class="btn-send">Send</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup11" class="lightbox">
        	<section class="popup popup-six">
            	<h2 class="video">Send Us a Video Message</h2>
                <strong class="sub-title">Enter your information below to ensure<br> we receive your message</strong>
            	<div class="popup-frame">
                	<form action="#">
                    	<fieldset>
                        	<div class="input-field">
                                <div class="text-field"><input type="text" placeholder="Enter Your Name"></div>
                                <div class="text-field email"><input type="email" placeholder="Enter Your Email"></div>
                            </div>
                            <p>By sending this message, I give permission to view, reply to,<br> download and share my message</p>
                            <div class="btn-holder">
                            	<button type="submit" class="btn-send"><span>Send</span></button>
                                <button type="submit"><span>Restart</span></button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <!-- widget popup2 -->
        <div id="popup12" class="lightbox">
        	<section class="popup popup-voice">
            	<h2>We want to hear from you!<br> Leave us a voice or video message.</h2>
            	<div class="popup-frame">
                	<div class="box">
                    	<div class="img-holder add"><img src="assets/img/img1.png" alt=""></div>
                        <strong class="sub-title">Record Your</strong>
                        <h3>Voice Message</h3>
                        <a href="#" class="btn-start">Start Recording</a>
                    </div>
                    <div class="box">
                    	<div class="img-holder"><img src="assets/img/img2.png" alt=""></div>
                        <strong class="sub-title">Record Your</strong>
                        <h3>Video Message</h3>
                        <a href="#" class="btn-start">Start Recording</a>
                    </div>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup13" class="lightbox">
        	<section class="popup popup-two design2">
            	<h2 class="video">Send Us a Video Message</h2>
                <h3>We would love to hear from you!<br> Please record your message.</h3>
            	<strong class="sub-title">Is Your Microphone And Webcam On?</strong>
                <div class="start-recording">
                    <a href="#" class="btn-popup">Start Recording</a>
                    <ol>
                        <li class="active"><span>Record Your Message</span></li>
                        <li><span>Listen Your Message</span></li>
                        <li class="last"><span>Send Your Message</span></li>
                    </ol>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup14" class="lightbox">
        	<section class="popup popup-three popup8 design2">
            	<h2 class="border">Send Us a Video Message</h2>
            	<ol>
                	<li>Adjust your microphone volume </li>
                    <li>Click Allow to enable your mic. and camera</li>
                </ol>
                <div class="flash-box"><img src="assets/img/img-flash.jpg" alt=""></div>
                <h3>Press Here To Start Recording</h3>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup15" class="lightbox">
        	<section class="popup popup-five popup9">
            	<h2 class="border">Send Us a Video Message</h2>
                <div class="recording-box"><img src="assets/img/img-record.jpg" alt=""></div>
                <div class="row">
                	<a href="#" class="settings">Settings</a>
                    <a href="#" class="btn-record">Record</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup16" class="lightbox">
        	<section class="popup popup-five popup16">
            	<h2 class="border">Send Us a Video Message</h2>
                <div class="recording-box"><img src="assets/img/img5.jpg" alt=""></div>
                <div class="btn-holder">
                	<a href="#" class="btn-play">Play</a>
                    <a href="#" class="btn-stop">Re-record</a>
                	<a href="#" class="btn-send">Send</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup17" class="lightbox">
        	<section class="popup popup-six popup-video popup17">
            	<h2 class="border">Send Us a Video Message</h2>
                <strong class="sub-title">Enter your information below to ensure<br> we receive your message</strong>
            	<div class="popup-frame">
                	<form action="#">
                    	<fieldset>
                        	<div class="input-field">
                                <div class="text-field"><input type="text" placeholder="Enter Your Name"></div>
                                <div class="text-field email"><input type="email" placeholder="Enter Your Email"></div>
                            </div>
                            <p>By sending this message, I give permission to view, reply to,<br> download and share my message</p>
                            <div class="btn-holder">
                            	<button type="submit" class="btn-send"><span>Send</span></button>
                                <button type="submit"><span>Restart</span></button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <!-- widget popup2 -->
        <div id="popup18" class="lightbox">
            <section class="popup popup-two popup18">
                <h2 class="border audio">Send Us a Voice Message</h2>
                <h3>We would love to hear from you!<br> Please record your message.</h3>
                <strong class="sub-title">Is Your Microphone On?</strong>
                <div class="start-recording">
                    <a href="#" class="btn-popup">Start Recording</a>
                    <ol>
                        <li class="active"><span>Record Your Message</span></li>
                        <li><span>Listen Your Message</span></li>
                        <li class="last"><span>Send Your Message</span></li>
                    </ol>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup19" class="lightbox">
        	<section class="popup popup-three popup19">
            	<h2 class="border audio">Send Us a Voice Message</h2>
            	<ol>
                	<li>Adjust your microphone volume </li>
                    <li>Click Allow to enable your microphone</li>
                </ol>
                <div class="flash-box"><img src="assets/img/img-flash.jpg" alt=""></div>
                <h3>Press Here To Start Recording</h3>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup20" class="lightbox">
        	<section class="popup popup-four popup20">
            	<h2 class="border audio">Send Us a Voice Message</h2>
                <strong class="title">Speak into your microphone!</strong>
                <div class="border">
                    <h3>Recording: <span>01:05</span></h3>
                    <strong class="sub-title">Max recording duration: <span>5</span> minutes</strong>
                    <div class="slider"><span class="handle"></span></div>
                    <div class="btn-holder">
                    	<a href="#" class="btn-pause">Pause</a>
                        <a href="#" class="btn-stop">Stop</a>
                    </div>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup21" class="lightbox">
        	<section class="popup popup-five popup21">
            	<h2 class="border audio">Send Us a Voice Message</h2>
                <strong class="title">Press “Play” to listen to your recording Press “Re-record” to record a new message Press “Send” to send your voice message</strong>
                <div class="border">
                    <h3>Playing <span>04:05</span></h3>
                    <div class="progress">
                    	<div class="progress-bar" style="width:20%;">
                        	<span class="handle"></span>
                        </div>
                    </div>
                    <div class="btn-holder">
                    	<a href="#" class="btn-play">Play</a>
                        <a href="#" class="btn-stop">Re-record</a>
                    	<a href="#" class="btn-send">Send</a>
                    </div>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup22" class="lightbox">
        	<section class="popup popup-six popup-video popup17">
            	<h2 class="border audio">Send Us a Voice Message</h2>
                <strong class="sub-title">Enter your information below to ensure<br> we receive your message</strong>
            	<div class="popup-frame">
                	<form action="#">
                    	<fieldset>
                        	<div class="input-field">
                                <div class="text-field"><input type="text" placeholder="Enter Your Name"></div>
                                <div class="text-field email"><input type="email" placeholder="Enter Your Email"></div>
                            </div>
                            <p>By sending this message, I give permission to view, reply to,<br> download and share my message</p>
                            <div class="btn-holder">
                            	<button type="submit" class="btn-send"><span>Send</span></button>
                                <button type="submit"><span>Restart</span></button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <!-- widget popup3 -->
        <div id="popup23" class="lightbox">
        	<section class="popup popup-seven popup23">
            	<h2>We want to hear from you!<br> Leave us a voice or video message.</h2>
            	<div class="popup-frame">
                	<div class="box">
                    	<div class="img-holder add">
                        	<div class="img-box"><img src="assets/img/img6.png" alt=""></div>
                        </div>
                        <strong class="sub-title">Record Your</strong>
                        <h3>Voice Message</h3>
                        <a href="#" class="btn-start">Start Recording</a>
                    </div>
                    <strong class="or">Or</strong>
                    <div class="box">
                    	<div class="img-holder">
                        	<div class="img-box"><img src="assets/img/img7.png" alt=""></div>
                        </div>
                        <strong class="sub-title">Record Your</strong>
                        <h3>Video Message</h3>
                        <a href="#" class="btn-start">Start Recording</a>
                    </div>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        {{-- <div id="popup24" class="lightbox">
        	<section class="popup popup-two">
            	<h2 class="video">Send Us a Video Message</h2>
                <h3>We would love to hear from you!<br> Please record your message.</h3>
            	<strong class="sub-title">Is Your Microphone And Webcam On?</strong>
                <a href="#" class="btn-popup video">Start Recording</a>
                <ol>
                	<li>Record</li>
                    <li>Review</li>
                    <li>Send</li>
                </ol>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div> --}}
        <div id="popup25" class="lightbox">
        	<section class="popup popup-two popup25">
            	<h2 class="video">Send Us a Video Message</h2>
                <h3>We would love to hear from you!<br> Please record your message.</h3>
            	<strong class="sub-title">Is Your Microphone And Webcam On?</strong>
                <div class="start-video">
                	<div class="start-box">
                    	<img src="assets/img/img8.png" alt="">
                        <strong class="title">Start</strong>
                    </div>
                </div>
                <ol class="add">
                	<li>Record</li>
                    <li>Listen</li>
                    <li>Send</li>
                </ol>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup26" class="lightbox">
        	<section class="popup popup-three popup26">
            	<h2 class="video">Send Us a Video Message</h2>
            	<ol>
                	<li>Adjust your microphone volume </li>
                    <li>Click Allow to enable your mic. and camera</li>
                </ol>
                <div class="flash-box"><img src="assets/img/img-flash.jpg" alt=""></div>
                <h3>Press Here To Start Recording</h3>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup27" class="lightbox">
        	<section class="popup popup-five popup27">
            	<h2 class="video add">Send Us a Video Message</h2>
                <div class="recording-box"><img src="assets/img/img-record.jpg" alt=""></div>
                <div class="row">
                	<a href="#" class="settings">Settings</a>
                    <a href="#" class="btn-record">Record</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup28" class="lightbox">
        	<section class="popup popup-five popup28">
            	<h2 class="video">Send Us a Video Message</h2>
                <div class="recording-box"><img src="assets/img/img5.jpg" alt=""></div>
                <div class="btn-holder">
                	<a href="#" class="btn-play">Play</a>
                    <a href="#" class="btn-stop">Re-record</a>
                	<a href="#" class="btn-send">Send</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup29" class="lightbox">
        	<section class="popup popup-six">
            	<h2 class="video">Send Us a Video Message</h2>
                <strong class="sub-title">Enter your information below to ensure<br> we receive your message</strong>
            	<div class="popup-frame">
                	<form action="#">
                    	<fieldset>
                        	<div class="input-field">
                                <div class="text-field"><input type="text" placeholder="Enter Your Name"></div>
                                <div class="text-field email"><input type="email" placeholder="Enter Your Email"></div>
                            </div>
                            <p>By sending this message, I give permission to view, reply to,<br> download and share my message</p>
                            <div class="btn-holder">
                            	<button type="submit" class="btn-send"><span>Send</span></button>
                                <button type="submit"><span>Restart</span></button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <!-- widget popup3 -->
        <div id="popup30" class="lightbox">
        	<section class="popup popup-two popup25 popup30">
            	<h2 class="voice">Send Us a Voice Message</h2>
                <h3>We would love to hear from you!<br> Please record your message.</h3>
            	<strong class="sub-title">Is Your Microphone On?</strong>
                <div class="start-video">
                	<div class="start-box">
                    	<img src="assets/img/img9.png" alt="">
                        <strong class="title">Start</strong>
                    </div>
                </div>
                <ol class="add">
                	<li>Record</li>
                    <li>Listen</li>
                    <li>Send</li>
                </ol>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup31" class="lightbox">
        	<section class="popup popup-three popup26">
            	<h2 class="voice">Send Us a Voice Message</h2>
            	<ol>
                	<li>Adjust your microphone volume </li>
                    <li>Click Allow to enable your microphone</li>
                </ol>
                <div class="flash-box"><img src="assets/img/img-flash.jpg" alt=""></div>
                <h3>Press Here To Start Recording</h3>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup32" class="lightbox popup32">
        	<section class="popup popup-four">
            	<h2 class="voice">Send Us a Voice Message</h2>
                <strong class="title">Speak into your microphone!</strong>
                <h3>Recording: <span>01:05</span></h3>
                <strong class="sub-title">Max recording duration: <span>5</span> minutes</strong>
                <div class="slider"><span class="handle"></span></div>
                <div class="btn-holder-r">
                	<a href="#" class="btn-pause-r"><span></span>Pause</a>
                    <a href="#" class="btn-stop-r"><span></span>Stop</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup33" class="lightbox">
        	<section class="popup popup-five popup33">
            	<h2 class="voice">Send Us a Voice Message</h2>
                <strong class="title">Press “Play” to listen to your recording Press “Re-record” to record a new message Press “Send” to send your voice message</strong>
                <h3>Playing <span>04:05</span></h3>
                <div class="progress">
                	<div class="progress-bar" style="width:20%;">
                    	<span class="handle"></span>
                    </div>
                </div>
                <div class="btn-holder-r">
                	<a href="#" class="btn-play-r"><span></span> Play</a>
                    <a href="#" class="btn-stop-r"><span></span> Re-record</a>
                	<a href="#" class="btn-send-r"><span></span> Send</a>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
        <div id="popup34" class="lightbox">
            <section class="popup popup-six">
                <h2 class="voice">Send Us a Voice Message</h2>
                <strong class="sub-title">Enter your information below to ensure<br> we receive your message</strong>
                <div class="popup-frame">
                    <form action="#">
                        <fieldset>
                            <div class="input-field">
                                <div class="text-field"><input type="text" placeholder="Enter Your Name"></div>
                                <div class="text-field email"><input type="email" placeholder="Enter Your Email"></div>
                            </div>
                            <p>By sending this message, I give permission to view, reply to,<br> download and share my message</p>
                            <div class="btn-holder">
                                <button type="submit" class="btn-send"><span>Send</span></button>
                                <button type="submit"><span>Restart</span></button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <strong class="powered-by">Powered by <a href="#">VoiceStakk</a></strong>
            </section>
        </div>
    </div>


    <script type="text/javascript" src="assets/js/fancybox.js"></script>
    <script>
        // page init
        jQuery(function(){
            initLightbox();
        });

        // fancybox modal popup init
        function initLightbox() {
            jQuery('a.lightbox, a[rel*="lightbox"]').fancybox({
                padding: 15,
                loop: false,
                helpers: {
                    overlay: {
                        css: {
                            background: 'rgba(0, 0, 0, 0.65)'
                        }
                    }
                },
                afterLoad: function(current, previous) {
                    // handle custom close button in inline modal
                    if(current.href.indexOf('#') === 0) {
                        jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e){
                            e.preventDefault();
                            jQuery.fancybox.close();
                        });
                    }
                }
            });
        }
    </script>
	

@endsection