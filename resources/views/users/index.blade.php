@extends('layouts.layout')

@section('title') Users @stop

@section('content')
    <div id='main-content' role='main'>
        <div aria-hidden='true' aria-labelledby='create-user' class='modal fade' id='create-user' role='dialog' style='display: none;' tabindex='-1'>
            <div class='modal-dialog'>
                <div class='modal-content'>
                    <div class='modal-header'>
                      <button aria-label='Close' class='close' data-dismiss='modal' type='button'>
                        <span aria-hidden='true'>×</span>
                      </button>
                      <h4 class='modal-title'>Create New User</h4>
                    </div>
                    <div class='modal-body'>
                        <div id="errors"></div>
                        <form id="add_user" action="{{url('users/add-user')}}" method="post" enctype="multipart/form-data">
                            <div class='choose-setting-tab option-row'>
                                <div class='option-row-title'>
                                    <label>1. ADD DETAILS</label>
                                </div>
                                <div class='setting-tab-cont option-row-content'>
                                    <input type="hidden" name="parent_id" value="{{ Auth::user()->id }}">
                                    <div class='label-group'>
                                        <label class='small'>
                                            First Name
                                        </label>
                                        {!! Form::text('name' , null, [ 'id' => 'form_name' ,'class' => 'form-control' , 'placeholder' => '.....']) !!}
                                    </div>
                                    <div class='label-group'>
                                        <label class='small'>
                                            Last Name
                                        </label>
                                        {!! Form::text('last_name' , null, [ 'id' => 'form_last_name' ,'class' => 'form-control' , 'placeholder' => '.....']) !!}
                                    </div>
                                    <div class='label-group'>
                                        <label class='small'>
                                            Email Address
                                        </label>
                                        {!! Form::text('email' , null, [ 'id' => 'form_email' ,'class' => 'form-control' ]) !!}
                                    </div>
                                    <div class='label-group'>
                                        <label class='small'>
                                            Password
                                        </label>
                                        <input id="form_password" class='form-control' placeholder='.....' type='password' name="password">
                                    </div>
                                    <div class='label-group'>
                                        <label class='small'>
                                            Confirm Password
                                        </label>
                                        <input id="form_password_confirm" class='form-control' name="confirm_password" placeholder='.....' type='password'>
                                    </div>
                                    @if (Auth::user()->is_premium == 1)
                                        <div class='label-group'>
                                            <label class='small'>
                                                Choose Your Timezone
                                            </label>
                                            <select name="timezone" id="form_timezone" class="form-control selectpicker" data-live-search='true'>
                                                <option value="">Choose Your Timezone</option>
                                                @foreach( $zones_arrays as $zones_array )
                                                    <option value="{!! $zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone'] !!}">{!!$zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone']!!}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    @endif
                                        
                                        @if (Auth::user()->is_enterprise == 1)
                                            <div class='choose-setting-tab option-row'>
                                                <div class='option-row-title'>
                                                    <label>Account Status</label>
                                                </div>
                                                <div class='setting-tab-cont option-row-content'>
                                                
                                                        <select name="status" id="status" class="form-control">
                                                            
                                                          <option value="active">Active</option>                                                            
                                                          <option value="inactive">InActive</option>

                                                        </select> 
                                                  
                                                
                                                </div>
                                            </div>
                                        
                                            <div class='choose-setting-tab option-row'>
                                                <div class='option-row-title'>
                                                    <label>Account Type</label>
                                                </div>
                                                <div class='setting-tab-cont option-row-content'>
                                                
                                                        <select name="is_premium" id="status" class="form-control">
                                                          <option value="1">Premium</option>
                                                          <option value="0">Basic</option>
                                                        </select> 
                                                  
                                                
                                                </div>
                                            </div>
                                        @endif                                     
                                </div>
                            </div>
                            
                            @if (Auth::user()->is_premium == 1)
                                <div class='choose-setting-tab option-row'>
                                    <div class='option-row-title'>
                                        <label>2. Select 1 or more campaign for this User</label>
                                    </div>
                                    <div class='setting-tab-cont option-row-content'>
                                        {!! Form::select('assigned_campaigns[]' , $campaignslist , null, [ 'id' => 'assigned_campaigns', 'class' => 'form-control selectpicker' , 'title' => 'Select Campaigns to Assign' , 'data-live-search' => 'true' , 'multiple' => 'multiple']) !!}
                                    </div>
                                </div>


                                <div class='choose-setting-tab option-row'>
                                    <div class='option-row-title'>
                                        <label>3. Permissions</label>
                                    </div>
                                    <div class='setting-tab-cont option-row-content'>
                                        <select id="permissions" class="form-control selectpicker" title="Select Permissions" data-live-search="true" multiple="multiple" name="permissions[]">

                                            @foreach ($permissions_list as $permission)
                                            <option name='{{ $permission }}' value="{{ $permission }}">{{ $permission }}</option>
                                            @endforeach

                                        </select> 
                                    </div>
                                </div>
                            
                            
                            <div class='label-group'>
                                <div class="row">
                                    <div class="col-md-10">
                                        <label for="">Avatar</label>
                                        <div class="input-group">
                                            <span class="input-group-btn">
                                                <span class="btn btn-primary btn-file">
                                                    Browse&hellip; <input type="file" name="image">
                                                </span>
                                            </span>
                                            <input id="avatarImgName" type="text" class="form-control" name="imagecreateurl">
                                            <span style="{{ Auth::user()->image ? '' : 'display: none' }}" id="removeAvatarImg" class="input-group-addon btn btn-default">x</span>
                                        </div>
                                    </div>
                                    <div class="col-md-2 img-avatar">
                                        <img id="avatarImg" src="/assets/img/default_avatar.jpg" class="img-responsive img-circle" >
                                    </div>
                                </div>
                            </div>
                        @endif    
                        </form>
                        <div class='modal-footer'>
                            <button id="submit" class='btn btn-success choose-tab-success-btn'>Create</button>
                            <button class='btn btn-default' data-dismiss='modal' type='button'>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class='campaigns-page'>
            <div class='vt-page-header'>
                <div class='vt-page-title'>
                    <h3>
                        <i class='glyphicon glyphicon-user'></i>
                        USERS
                    </h3>
                </div>
                <div class='vt-page-controller'>
                    <form action="/users" method="get" id="UsersSortByCampaign">
                        <select id="users_select" class="form-control campaign_select selectpicker" data-live-search='true' @if(count($campaigns)==0) disabled @endif name="campaign_id">
                            <option value="0">All Campaigns</option>
                            @foreach($campaigns as $campaign)
                                <option class="campaign_id selectpicker" data-live-search='true' @if(Input::has('campaign_id') && Input::get('campaign_id')== $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
                            @endforeach
                        </select>
                    </form>
                    
                    @if (Auth::user()->add_users == 1)
                    <a class='form-control btn btn-success' data-target='#create-user' data-toggle='modal' type='button'>
                        <i class='glyphicon glyphicon-plus'></i>
                        Create New User
                    </a>
                    @endif
                    
                </div>
            </div>
            <div class='vt-user-list-container'>
                <div class='vt-user-list fluid'>
                    <div class='vt-horizontal-title'>
                        <h5 class='new'>
                            User
                        </h5>
                    </div>
                    @include('layouts.alerts.messages')
                    @foreach( $users as $user )
                        <div aria-hidden='true' aria-labelledby='edit-user{{$user->id}}' class='modal fade' id='edit-user{{$user->id}}' role='dialog' style='display: none;' tabindex='-1'>
                            <div class='modal-dialog'>
                                <div class='modal-content'>
                                    <div class='modal-header'>
                                      <button aria-label='Close' class='close' data-dismiss='modal' type='button'>
                                        <span aria-hidden='true'>×</span>
                                      </button>
                                      <h4 class='modal-title'>Edit {!! $user->name !!}</h4>
                                    </div>
                                    <div class='modal-body'>
                                        <div class="update_errors"></div>
                                        {!! Form::model($user, ['url' => url('users/update-user'), 'files' => true, 'id' => 'update_user']) !!}    
                                            <div class='choose-setting-tab option-row'>
                                                <div class='option-row-title'>
                                                    <label>1. EDIT DETAILS</label>
                                                </div>
                                                <input class="user_id" type="hidden" name="user_id" value="{{ $user->id }}">
                                                <div class='setting-tab-cont option-row-content'>
                                                    <div class='label-group'>
                                                        <label class='small'>
                                                            First Name
                                                        </label>
                                                        {!! Form::text('name' ,$user->name, [ 'class' => 'form-control update_form_name' , 'placeholder' => '.....']) !!}
                                                    </div>
                                                    <div class='label-group'>
                                                        <label class='small'>
                                                            Last Name
                                                        </label>
                                                        {!! Form::text('last_name' ,$user->last_name, [ 'class' => 'update_form_last_name form-control' , 'placeholder' => '.....']) !!}
                                                    </div>
                                                    <div class='label-group'>
                                                        <label class='small'>
                                                            Email Address
                                                        </label>
                                                        {!! Form::text('email' , $user->email, [ 'class' => 'update_form_email form-control' ]) !!}
                                                    </div>
                                                    <div class='label-group'>
                                                        <label class='small'>
                                                            New Password
                                                        </label>
                                                        <input class='update_form_password form-control' placeholder='.....' type='password' name="password">
                                                    </div>
                                                    <div class='label-group'>
                                                        <label class='small'>
                                                            Confirm Password
                                                        </label>
                                                        <input name="confirm_password" class='update_form_password_confirm form-control' placeholder='.....' type='password'>
                                                    </div>
                                                    @if (Auth::user()->is_premium == 1)
                                                        <div class='label-group'>
                                                            <label class='small'>
                                                                Choose Your Timezone
                                                            </label>
                                                            <select name="timezone" id="form_timezone" class="form-control selectpicker" data-live-search='true'>
                                                                @foreach( $zones_arrays as $zones_array )
                                                                    <option @if( $user->timezone == $zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone'] ) selected @endif  value="{!! $zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone'] !!}">{!!$zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone']!!}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    @endif 
                                                </div>
                                            </div>
                                        @if (Auth::user()->is_premium == 1)
                                            <div class='choose-setting-tab option-row'>
                                                <div class='option-row-title'>
                                                    <label>2. Select 1 or more campaign for this User</label>
                                                </div>
                                                <div class='setting-tab-cont option-row-content'>
                                                   {!! Form::select('assigned_campaigns[]' , $campaignslist , json_decode($user->assigned_campaigns), [ 'class' => 'update_assigned_campaigns form-control selectpicker' , 'title' => 'Select Campaigns to Assign' , 'data-live-search' => 'true' , 'multiple' => 'multiple']) !!}
                                                </div>
                                            </div>
                                        @endif 
                                        @if (Auth::user()->is_premium == 1)
                                            <div class='choose-setting-tab option-row'>
                                                <div class='option-row-title'>
                                                    <label>3. Permissions</label>
                                                </div>
                                                <div class='setting-tab-cont option-row-content'>
                                                    
                                                    <select id="permissions" class="form-control selectpicker" title="Select Permissions" data-live-search="true" multiple="multiple" name="permissions[]">

                                                        @foreach ($permissions_list as $permission)
                                                        <option name='{{ $permission }}' value="{{ $permission }}" {{ $user->$permission ? 'selected' : '' }}>{{ $permission }}</option>
                                                        @endforeach

                                                    </select>   
                                                
                                                </div>
                                            </div>
                                                                              
                                            <div class='label-group'>
                                                <div class="row">
                                                    <div class="col-md-10">
                                                        <label for="">Avatar</label>
                                                        <div class="input-group">
                                                            <span class="input-group-btn">
                                                                <span class="btn btn-primary btn-file">
                                                                    Browse&hellip; <input type="file" name="image">
                                                                </span>
                                                            </span>
                                                            <input type="text" name="updateimageurl" class="avatarImgNameUpdate form-control">
                                                            <span style="{{ $user->image ? '' : 'display: none' }}" id="" class="removeAvatarImgupdate input-group-addon btn btn-default">x</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 img-avatar">
                                                        <img src="{{ $user->image ? $user->image : '/assets/img/default_avatar.jpg' }}" class="img-responsive img-circle avatarImgUpdate" >
                                                        <input type="hidden" name="emptyimage" class="emptyimage" id="">
                                                    </div>
                                                </div>
                                            </div>
                                        @endif 
                                        
                                        @if (Auth::user()->is_enterprise == 1)
                                            <div class='choose-setting-tab option-row'>
                                                <div class='option-row-title'>
                                                    <label>Account Status</label>
                                                </div>
                                                <div class='setting-tab-cont option-row-content'>
                                                
                                                        <select name="status" id="status" class="form-control">
                                                          <option value="inactive" {{ $user->status == 'inactive' ? 'selected' : ''}}>InActive</option>
                                                          <option value="active" {{ $user->status == 'active' ? 'selected' : ''}}>Active</option>
                                                        </select> 
                                                                                                  
                                                </div>
                                            </div>
                                        
                                            <div class='choose-setting-tab option-row'>
                                                <div class='option-row-title'>
                                                    <label>Account Type</label>
                                                </div>
                                                <div class='setting-tab-cont option-row-content'>
                                                
                                                        <select name="is_premium" id="status" class="form-control">
                                                          <option value="1" {{ $user->is_premium == '1' ? 'selected' : ''}}>Premium</option>
                                                          <option value="0" {{ $user->is_premium == '0' ? 'selected' : ''}}>Basic</option>
                                                        </select> 
                                                  
                                                
                                                </div>
                                            </div>
                                        @endif                                         
                                        {!! Form::close() !!}
                                    </div>
                                    <div class='modal-footer'>
                                        <button id="update" class='update btn btn-success choose-tab-success-btn'>Save</button>
                                        <button class='btn btn-default' data-dismiss='modal' type='button'>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div aria-hidden='true' aria-labelledby='delete-user{{$user->id}}' class='modal fade' id='delete-user{{$user->id}}' role='dialog' style='display: none;' tabindex='-1'>
                            <div class='modal-dialog'>
                                <div class='modal-content'>
                                    <div class='modal-header'>
                                        <button aria-label='Close' class='close' data-dismiss='modal' type='button'>
                                            <span aria-hidden='true'>×</span>
                                        </button>
                                        <h4 class='modal-title'>Delete {!! $user->name !!}</h4>
                                    </div>
                                    <div class='modal-body'>
                                        <div id="update_errors"></div>
                                        <form id="update_user" action="{{url('users/delete-user')}}" method="post">
                                            <h4>Are You Sure You Want to Delete This User?</h4>
                                            <input type="hidden" name="id" value="{{$user->id}}" >
                                            <div class='modal-footer'>
                                                <button type="submit" class="btn btn-danger">Delete</button>
                                                <button aria-label='Close' class='btn btn-default' data-dismiss='modal' type="button">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='vt-user-tab'>
                            <div class='vt-content'>
                                <div class='vt-user-gavatar'>
                                    <div class='vt-image-main'>
                                        @if($user->image)
                                            <img src="{{$user->image}}" style="height:70px"/>
                                        @else
                                            <div class="hide">
                                                {!! $path = "http://www.gravatar.com/avatar/".md5( strtolower( trim( $user->email ) ) );
                                                    $d = urlencode(url()."/assets/img/default_avatar.jpg");
                                                !!}
                                            </div>
                                            <img src="{!! $path.'?d='.$d !!}" style="height:70px"/>
                                        @endif
                                    </div>
                                </div>
                                <div class='vt-user-title'>
                                    <div class='vt-user-details'>
                                        <label>
                                            <small>
                                                {!! $user->name !!} {!! $user->last_name !!}
                                            </small>
                                        </label>
                                    </div>
                                </div>
                                <div class='vt-user-stats-container'>
                                    <div class='vt-user-stats'>
                                        <div class='row'>
                                            <div class='col-md-4 stats'>
                                                <label>
                                                    <i class='glyphicon glyphicon-envelope'></i>
                                                    <small>{!! $user->email !!}</small>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                @if (Auth::user()->is_premium == 1)
                                <div class='vt-user-stats-container'>
                                    <div class='vt-user-stats'>
                                        <div class='row'>
                                            <div class='col-md-4 stats'>
                                                <label>
                                                    <small>Campaigns Assigned To:@foreach( $user->user_assigned_campaigns as $campaign) @if($first) <b>{!!$campaign->name!!}</b> {{$first = false}} @else <b>, {!!$campaign->name!!}</b> @endif @endforeach</small>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                @endif
                                
                                <div class='vt-user-box-controller'>
                                    @if (Auth::user()->is_premium == 1 || Auth::user()->is_enterprise == 1)
                                    <form action='/widgets/2' method='post'>
                                        <input name='_token' type='hidden' value='lxPfAObBwPdaQl1IHExnbzIvbgcrhRunHGCzKSvh'>
                                        <input name='_method' type='hidden' value='DELETE'>
                                        <a class='btn btn-primary' data-target='#edit-user{{$user->id}}' data-toggle='modal' type='button'>
                                            <span class='glyphicon glyphicon-edit'></span>
                                        </a>
                                        <a class='btn btn-danger' data-target='#delete-user{{$user->id}}' data-toggle='modal'>
                                            <span class='glyphicon glyphicon-trash'></span>
                                        </a>
                                    </form>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $('#users_select').on('change' , function() {
                $('#UsersSortByCampaign').attr('action', '/users?campaign_id='+$(this).val());
                $('#UsersSortByCampaign').submit();
            })

            var email = $('#form_email').val();

            $('#submit').on('click' , function() {
                $('#errors').html('');

                if( $('#form_email').val() == "") {
                    $('#errors').append('Email Required<br>')
                } else {
                    $.post( '/users/email-exists' , { email: $('#form_email').val()},function( data ) {
                        if( data !== "" ) {
                            $('#errors').append('Email Has Already Been Registered<br>')
                        }
                    })
                }

                if( $('#form_name').val() == "" ) {
                    $('#errors').append('Name Required<br>')
                }

                if( $('#form_timezone').val() == "" ) {
                    $('#errors').append('Timezone Required<br>')
                }

                if( $('#form_last_name').val() == "") {
                    $('#errors').append('Last Name Required<br>')
                }

                if( $('#form_password').val() == "") {
                    $('#errors').append('Password Required<br>')
                }

                if( $('#form_password_confirm').val() !== $('#form_password').val() ) {
                    $('#errors').append("Passwords don't match<br>");
                }

                if( $('#assigned_campaigns').length && $('#assigned_campaigns').val() == null ) {
                    $('#errors').append("Select One or More Campaigns<br>");
                }

                setTimeout( function() {
                    if( $('#errors').html() == "" ) {
                        $('#add_user').submit();
                    }
                },1000 )

                if( $('#errors').html() !== "" ) {
                    $('#errors').addClass('alert alert-danger');
                    $('#errors').attr("tabindex",-1).focus();
                }
            })

            $('.update').on('click' , function() {
                var form    =   $(this).parent().prev().find('form') ;
                var errors  =   form.prev();

                errors.html('');

                if( form.find('.update_form_name').val() == "" ) {
                    errors.append('Name Required<br>')
                }

                if( form.find('.update_form_last_name').val() == "") {
                    errors.append('Last Name Required<br>')
                }

                if( form.find('.update_form_email').val() == "") {
                    errors.append('Email Required<br>')
                } else {
                    if ( form.find('.update_form_email').val() !== email ) {
                        $.post( '/users/email-exists' , { email: form.find('.update_form_email').val() , user_id : form.find('.user_id').val()},function( data ){
                            if( data !== "" ) {
                                errors.append('Email Has Already Been Registered')
                            }
                        })
                    };
                }

                if( form.find('.update_form_password_confirm').val() !== form.find('.update_form_password').val() ) {
                    errors.append("Passwords don't match<br>");
                }

                if( form.find('.update_assigned_campaigns').length && form.find('.update_assigned_campaigns').val() == null ) {
                    errors.append("Select One or More Campaigns");
                }

                setTimeout( function() {
                    if( errors.html() == "" ) {
                      form.submit();
                    }
                },1000 )

                if( errors.html() !== "" ) {
                    errors.addClass( 'alert alert-danger');
                    errors.attr("tabindex",-1).focus();
                }
            })

            /*Image*/
            $(document).on('change', '.btn-file :file', function() {
                var input = $(this),
                    label = input.val().replace(/\\/g, '/').replace(/.*\//, ''),
                    path  = input.val();
                    input.trigger('fileselect', [ label, path ]);
                    readURL(this);
                    $('#removeAvatarImgupdate').show();
            });

            $('.btn-file :file').on('fileselect', function( event, label, path ) {
                $('#avatarImg').attr('src', path );
                $('#avatarImgName').val('');
                $('.avatarImgUpdate').attr('src', path );
                $('.avatarImgNameUpdate').val('');
            });

            $('#removeAvatarImg').on('click', function(event) {
                $('#avatarImg').attr('src', '/assets/img/default_avatar.jpg' );
                $('.btn-file :file').val('');
                $('#avatarImgName').val('');
                $('#removeAvatarImg').hide();
            });

            $('.removeAvatarImgupdate').on('click', function(event) {
                $('.avatarImgUpdate').attr('src', '/assets/img/default_avatar.jpg' );
                $('.btn-file :file').val('');
                $('.removeAvatarImgupdate').hide();
                $('.emptyimage').val('true');
                $('.avatarImgNameUpdate').val('');
            });

            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('#avatarImg').attr('src', e.target.result);
                        $('.avatarImgUpdate').attr('src', e.target.result);
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }
        })
    </script>
@endsection