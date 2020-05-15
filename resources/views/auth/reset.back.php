@extends('layouts.layout')

@section('content')
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 auth">
				<div class="auth-container">
					<div>
					    @if(Session::has('message'))
					        <div>
					            {!! Session::get('message') !!}
					        </div>
					    @endif
					    @if(Session::has('error'))
					        <div>
					            {!! Session::get('error') !!}
					        </div>
					    @endif
					    <div>
					        <div class="login-form">
					            @if(Session::has('notice'))
					                <div style="color: red;margin-bottom: 10px;">{!! Session::get('notice') !!}</div>
					            @endif
					            @if(Session::has('success'))
					                <div style="color: green;margin-bottom: 10px;">
					                    {!! Session::get('success') !!}
					                </div>
					            @endif
					            @include('auth.forms.resetForm')
					        </div>
					    </div>
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection