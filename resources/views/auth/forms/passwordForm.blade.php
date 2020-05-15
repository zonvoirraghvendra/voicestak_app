{!! Form::open(array('password/email' => 'PasswordController@postEmail', 'class'=>'form-group')) !!}
	<div class="form-group">
		{!! Form::label('email', 'Email', array('class'=>'control-label')) !!}
		<div class='text'>
		{!! Form::email('email', null, array('placeholder' => 'Email', 'id' => 'email', 'class'=>'form-control')) !!}
		</div>
	</div>
	{!! Form::submit('Send Reset Password Link', array('class' => 'btn btn-primary auth-btn reset-link')) !!}
{!! Form::close() !!}