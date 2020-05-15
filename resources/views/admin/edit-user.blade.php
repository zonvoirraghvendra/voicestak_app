@extends('layouts.layout')

@section('title') Super Admin | Edit  @stop

@section('content')
    <div>
        <form action="{!!url('su/update')!!}" method="POST" role="form" style="margin: 2% 30% 10%" enctype="multipart/form-data">
            @include('layouts.alerts.messages')

            <input type="hidden" name="_token" value="{!!csrf_token()!!}">
            <input type="hidden" name="id" value="{!!$user->id!!}">
            <h3>Edit User {!! $user->name !!}</h3>

            <div class="form-group">
                <label for="">First Name</label>
                <input name="name" type="text" class="form-control" id="" placeholder="Enter your name" value="{!!$user->name!!}">
            </div>
            <div class="form-group">
                <label for="">Last Name</label>
                <input type="text" class="form-control" value="{!! $user->last_name !!}" name="last_name" placeholder="Enter your last name">
            </div>
            <div class="form-group">
                <label for="">Email</label>
                <input name="email" placeholder="Email" type="email" class="form-control" value="{!!$user->email!!}">
            </div>
            <div class="form-group">
                <label for="">New Password</label>
                <input name="password" class="form-control" placeholder="New Password. Leave blank if don't want to change" type="password">
            </div>
            <div class="form-group">
                <label for="">Permission Level</label>
                {!! Form::select('is_premium', ['1' => 'Premium Account', '0' => 'Basic Account'], $user->is_premium, ['class' => "form-control"]) !!}
            </div>
            <div class="form-group">
                <label for="">Choose Your Timezone</label>
                <select name="timezone" class="form-control selectpicker" data-live-search='true'>
                    @foreach( $zones_arrays as $zones_array )
                        <option @if( $user->timezone == $zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone'] ) selected @endif  value="{!! $zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone'] !!}">{!!$zones_array['diff_from_GMT'] . ' - ' . $zones_array['zone']!!}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="">Status</label>
                {!! Form::select('status', ['active' => 'Active', 'inactive' => 'Inactive'], $user->status, ['class' => "form-control"]) !!}
            </div>
            <button type="submit" class="btn btn-danger">Save Changes</button>
            <button type="button" class="btn btn-success" onclick="window.location.href='/su'">Cancel</button>
        </form>
    </div>
@endsection