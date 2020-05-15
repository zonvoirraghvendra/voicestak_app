@extends('layouts.layout')

@section('title') VoiceStak Members Login @stop

@section('content')
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 auth">
				<div class="auth-container">
					<form role="form" method="POST" action="{{ url('/auth/login') }}">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">

						<div class="form-group">
							<label class="control-label">Email:</label>
							<input type="email" class="form-control" name="email" value="{{ old('email') }}" placeholder="Your email here...">
						</div>

						<div class="form-group">
							<label class="control-label">Password:</label>
							<input type="password" class="form-control" name="password" placeholder="Password">
						</div>

						<div class="row">
							<label class="col-sm-6 col-xs-6 remember">
								<input type="checkbox" name="remember"> Remember me.
							</label>

							<a class="col-sm-6 col-xs-6 text-right forgot" href="{{ url('/password/email') }}">Forgot password?</a>
						</div>

						<button type="submit" class="btn btn-primary auth-btn">Login To Your Account</button>
					</form>
				</div>
			</div>
		</div>
	</div>
@endsection