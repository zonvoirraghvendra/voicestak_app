<!DOCTYPE html>
<html>
	<head>
		@include('admin.partials.head')
	</head>
	<body>
		<div class="container-fluid">
			{{-- <header> --}}
				@include('admin.partials.header')
			{{-- </header> --}}

			<div id="content">
				@yield('content')
			</div>

			<footer>
				@include('admin.partials.footer')
			</footer>
		</div>
	</body>
</html>