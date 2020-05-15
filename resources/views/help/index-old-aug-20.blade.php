@extends('layouts.layout')

@section('content')
<div class="center">
	<div class="col-md-3 pull-left" id="videoMenu">
		<div class="row">  
			<div class="span8 menu-customization"> 
				<h3 class="description">VIDEO MENU</h3>
				<ul id="Menu">  
					<a href="#1"><li>SMS Integrations</li></a>
					<a href="#2"><li>Video2</li></a>
					<a href="#3"><li>Video3</li></a>
					<a href="#4"><li>Video4</li></a>
					<a href="#5"><li>Video5</li></a>
				</ul>
			</div>
		</div>
	</div>

	<div id="1" class="col-md-8 pull-right video-cont">
		<h4 class="text-info">SMS Integrations</h4>
		<iframe width="100%" height="400px" src="https://www.youtube.com/embed/8I7ixcdWOIQ" frameborder="0" allowfullscreen></iframe>
	</div>

	<div id="2" class="col-md-8 pull-right video-cont">
		<h4 class="text-info">Video 2</h4>
		<video class="pull-right" width="100%" height="auto" controls>
		  <source src="mov_bbb.mp4" type="video/mp4">
		  <source src="mov_bbb.ogg" type="video/ogg">
		  Your browser does not support HTML5 video.
		</video>
	</div>

	<div id="3" class="col-md-8 pull-right video-cont">
		<h4 class="text-info">Video 3</h4>
		<video class="pull-right" width="100%" height="auto" controls>
		  <source src="mov_bbb.mp4" type="video/mp4">
		  <source src="mov_bbb.ogg" type="video/ogg">
		  Your browser does not support HTML5 video.
		</video>
	</div>

	<div id="4" class="col-md-8 pull-right video-cont">
		<h4 class="text-info">Video 4</h4>
		<video class="pull-right" width="100%" height="auto" controls>
		  <source src="mov_bbb.mp4" type="video/mp4">
		  <source src="mov_bbb.ogg" type="video/ogg">
		  Your browser does not support HTML5 video.
		</video>
	</div>

	<div id="5" class="col-md-8 pull-right video-cont">
		<h4 class="text-info">Video 5</h4>
		<video class="pull-right" width="100%" height="auto" controls>
		  <source src="mov_bbb.mp4" type="video/mp4">
		  <source src="mov_bbb.ogg" type="video/ogg">
		  Your browser does not support HTML5 video.
		</video>
	</div>
</div>

@stop