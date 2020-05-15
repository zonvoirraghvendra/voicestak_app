@extends('layouts.layout')

@section('content')
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 auth">
				<div class="auth-container">
					<form role="form" method="POST" action="{{ url('/auth/register') }}">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">

						<div class="form-group">
							<label class="control-label">Name:</label>
							<input type="text" class="form-control" name="name" value="{{ old('name') }}" placeholder="Your name here...">
						</div>

						<div class="form-group">
							<label class="control-label">Email:</label>
							<input type="email" class="form-control" name="email" value="{{ old('email') }}" placeholder="Your email here...">
						</div>

						<div class="form-group">
							<label class="control-label">Password:</label>
							<input type="password" class="form-control" name="password" placeholder="Password">
						</div>

						<div class="form-group">
							<label class="control-label">Confirm Password:</label>
							<input type="password" class="form-control" name="password_confirmation" placeholder="Confirm Password">
						</div>

						<button type="submit" class="btn btn-primary auth-btn">Register</button>
					</form>
				</div>
			</div>
		</div>
	</div>
@endsection