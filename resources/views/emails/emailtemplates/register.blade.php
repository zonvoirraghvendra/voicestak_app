extends('layouts.main')
@include('email.partial.header')

@section('content')

    Hi {{$name}}, welcome to HeatMapTracker. Below is your login information


    Username: {{$username}}
    Password: {{$password}}

    http://heatmaptracker.com/login/members
@endsection