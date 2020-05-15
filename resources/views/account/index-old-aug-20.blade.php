@extends('layouts.layout')

@section('content')
<form action="{!!url('/account/update')!!}" method="POST" role="form" style="margin: 2% 30% 10%" enctype="multipart/form-data">
@include('layouts.alerts.messages')
  <input type="hidden" name="_method" value="PUT">
  <input type="hidden" name="_token" value="{{ csrf_token() }}">
  <legend>My Account</legend>

  <div class="form-group">
    <label for="">Name</label>
    <input name="name" type="text" class="form-control" id="" placeholder="Enter your name" value="{!!$user->name!!}">
  </div>
  <div class="form-group">
    <label for="">Email</label>
    <input name="email" type="text" class="form-control" id="" placeholder="Enter your email" value="{!!$user->email!!}">
  </div>
  <div class="form-group">
    <label for="">New Password</label>
    <input name="password" type="password" class="form-control" id="" placeholder="New Password">
  </div>
  <div class="form-group">
    <label for="">Confirm Password</label>
    <input name="password_confirmation" type="password" class="form-control" id="" placeholder="Confirm your new password">
  </div>

  <div class="row">
    <div class="col-md-10">
      <label for="">Avatar</label>
      <div class="input-group">
          <span class="input-group-btn">
              <span class="btn btn-primary btn-file">
                  Browse&hellip; <input type="file" name="image" >
              </span>
          </span>
          <input id="avatarImgName" type="text" class="form-control" readonly>
          <span style="{{ Auth::user()->image ? '' : 'display: none' }}" id="removeAvatarImg" class="input-group-addon btn btn-default">x</span>
      </div>
    </div>
    <div class="col-md-2 img-avatar">
      <img id="avatarImg" src="{{ Auth::user()->image ? '/assets/img/'.Auth::user()->image : 'assets/img/default_avatar.jpg' }}" class="img-responsive img-circle" >
    </div>
  </div>

  <button type="submit" style="margin-top: 21px;" class="btn btn-success">Update</button>

</form>

@stop


@section('scripts')
<script type="text/javascript">
//--------- avatar scripts ---------//
  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, ''),
        path  = input.val();
        input.trigger('fileselect', [ label, path ]);
        readURL(this);
        $('#removeAvatarImg').show();
  });

  $(document).ready( function() {
      $('.btn-file :file').on('fileselect', function( event, label, path ) {
          var input = $(this).parents('.input-group').find(':text').val( label );
          $('#avatarImg').attr('src', path );
      });

      $('#removeAvatarImg').click(function(event) {
        $('#avatarImg').attr('src', '/assets/img/default_avatar.jpg' );
        $('.btn-file :file').val('');
        $('#avatarImgName').val('');
        $('#removeAvatarImg').hide();
      });
  });

  function readURL(input) {
       if (input.files && input.files[0]) {
           var reader = new FileReader();
           
           reader.onload = function (e) {
               $('#avatarImg').attr('src', e.target.result);
           }
           
           reader.readAsDataURL(input.files[0]);
       }
   }
   

</script>
@stop