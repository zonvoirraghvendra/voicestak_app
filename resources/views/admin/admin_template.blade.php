@extends('layouts.layout')

@section('title') Super Admin @stop

@section('content')
    <style>
        tr > td {
            padding-bottom: 1px !important;
        }
    </style>

    @include('admin.partials.confirm_modal')

    <div class="container" style="background-color: white !important;">

        @include('layouts.alerts.messages')

        <form id="filter_users_form" class="form-inline" action="{!!url('/su/search')!!}" method="GET">
            <div class="col-md-8" style="margin:20px 0;padding-left:0">
                <!-- By Name -->
                <div class="form-group">
                    <div class="pull-left">
                        <input name="filter_name" class="form-control" type="text" placeholder="Name" value="">
                    </div>
                </div>

                <!--  By Email -->
                <div class="form-group">
                    <div class="pull-left">
                        <input name="filter_email" class="form-control" type="text" placeholder="Email" value="">
                    </div>
                </div>
                <div class="form-group">
                    <input class="pull-left btn btn-default" class="form-control" type="submit" value="Search">
                </div>
            </div>
        </form>

        <table class="table table-striped table-bordered" cellspacing="0">
            <thead>
                <tr>
                    <th>Name / Email</th>
                    <th>Status</th>
                    <th>Permission</th>
                    <th>Notes</th>
                    <th style="padding-left:6%">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <td>
                           <p>{{ $user->name }} ({{ $user->email }})</p>
                        </td>

                        <td>{!!$user->status!!}</td>
                        <td>@if($user->is_premium)Premium @else Basic @endif</td>
                        <td style="width: 300px">
                            <table class="table">
                                <tr >
                                    <td style="border:0px"><strong>Created at</strong></td>
                                    <td style="border:0px">{{$user->created_at}}</td>
                                </tr>
                            </table>
                        </td>
                        <td style="padding-left:6%">
                            <a class="btn btn-info" href="{!! url( 'su/edit/'. $user->id ) !!}">Edit</a>
                            <a href="{!! url( 'su/login/'. $user->id ) !!}" class="btn btn-success">Log In</a>
                            @if(!$user->is_super_admin)
                                <a data-href="{{url()}}/su/destroy/{!!$user->id!!}" data-toggle="modal" data-target="#deleteModal" class="btn btn-danger destroy">Delete</a>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="container">
            <div class="row">
                <a class="btn btn-primary" href="{!!url('/su/add')!!}"><i class="user icon"></i> Add User</a>
            </div>
        </div>
        {!! $users->render() !!}
        <div class="pagination"></div>
    </div>
@stop