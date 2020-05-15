{!! Form::open(array('password/reset' => 'PasswordController@postReset', 'class'=>'form-group')) !!}
	<input type="hidden" name="_token" value="{{ csrf_token() }}">
	<input type="hidden" name="token" value="{{ $token }}">

	<div class="form-group">
		{!! Form::label('email', 'Email', array('class'=>'control-label')) !!}
		<div class='text'>
			{!! Form::email('email', null, array('placeholder' => 'Email', 'id' => 'email', 'class'=>'form-control')) !!}
		</div>
	</div>
	<div class="form-group">
		{!! Form::label('pass', 'Password', array('class'=>'control-label')) !!}
		<div class='text'>
			{!! Form::password('password', array('placeholder' => 'Password', 'id' => 'pass', 'class'=>'form-control')) !!}
		</div>
	</div>
	<div class="form-group">
		{!! Form::label('pass', 'Password', array('class'=>'control-label')) !!}
		<div class='text'>
			{!! Form::password('password_confirmation', array('placeholder' => 'Password confirmation', 'id' => 'pass', 'class'=>'form-control')) !!}
		</div>
	</div>
	{!! Form::submit('Reset Password', array('class' => 'btn btn-primary auth-btn')) !!}
{!! Form::close() !!}