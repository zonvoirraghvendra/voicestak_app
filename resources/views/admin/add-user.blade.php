@extends('layouts.layout')

@section('title') Super Admin | Add User @stop

@section('content')
    <div>
       <form action="{!!url('su/register')!!}" method="POST" role="form" style="margin: 2% 30% 10%" enctype="multipart/form-data">
            @include('layouts.alerts.messages')
            <input type="hidden" name="_token" value="{!!csrf_token()!!}">
            <h3>Add User</h3>

            <div class="form-group">
                <label for="">First Name</label>
                <input name="name" type="text" class="form-control" id="" placeholder="Enter your name" value="{!! old('name') !!}">
            </div>
            <div class="form-group">
                <label for="">Last Name</label>
                <input type="text" class="form-control" value="{!! old('last_name')!!}" name="last_name" placeholder="Enter your last name">
            </div>
            <div class="form-group">
                <label for="">Email</label>
                <input name="email" placeholder="Email" type="email" class="form-control" value="{!! old('email') !!}">
            </div>
            <div class="form-group">
                <label for="">New Password</label>
                <input name="password" class="form-control" placeholder="New Password. Leave blank if don't want to change" type="password">
            </div>
            <div class="form-group">
                <label for="">Confirm Password</label>
                <input name="password_confirmation" class="form-control" placeholder="Enter Your Password Again" type="password">
            </div>
            <div class="form-group">
            <label for="">Choose Your Timezone</label>
                <select name="timezone" class="form-control selectpicker" data-live-search='true'>
                    <option value="">Choose Your Timezone</option>
                    @foreach( $zones_arrays as $zones_array )
                        <option value="{!! $zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone'] !!}">{!!$zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone']!!}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="">Permission Level</label>
                <select name="is_premium" class="form-control" id="">
                    <option value="1">Premium Account</option>
                    <option value="0">Basic Account</option>
                    <option value="2">Enterprise Account</option>
                </select>
            </div>
            <div class="form-group">
                <label for="">Status</label>
                <select name="status" class="form-control" id="">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <button type="submit" class="btn btn-danger">Add</button>
            <button type="button" class="btn btn-success" onclick="window.location.href='/su'">Cancel</button>
        </form>
    </div>

    <script type="text/javascript">
        $(document).ready(function() {
            $('.ui.dropdown')
                .dropdown();
            setTimeout(function() {
                $('.ui.message.success').remove();
            }, 5000);
        });
    </script>
@stop