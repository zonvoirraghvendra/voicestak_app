<div class="col-md-12">
	@if ($errors->has())
		<div class="error_message alert alert-danger alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			@foreach ($errors->all() as $key => $error)
		 		<li>{{ $error }}</li>
		 	@endforeach
		</div>
	@endif
	@if (Session::has('error'))
		<div class="error_message alert alert-danger alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		 	<p>{{ Session::get('error') }}</p>
		</div>
	@endif
	@if (Session::has('success'))
		<div class="error_message alert alert-success alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		 	<p>{{ Session::get('success') }}</p>
		</div>
	@endif
	@if (Session::has('warning'))
		<div class="error_message alert alert-warning alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		 	<p>{{ Session::get('warning') }}</p>
		</div>
	@endif
	@if (Session::has('notice'))
		<div class="error_message alert alert-info alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		 	<p>{{ Session::get('notice') }}</p>
		</div>
	@endif
</div>