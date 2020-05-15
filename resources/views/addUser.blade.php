@extends('layouts.layout')
@section('content')
    <div class="row" style="margin-top:45px">
        <div class="col-md-8 col-md-offset-2 col-sm-6 col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading clearfix">
                    <i class="icon-calendar"></i>
                    <h3 class="panel-title">Add User</h3>
                </div>
                <div style="overflow: hidden">
                    <br>
                    @include('layouts.alerts.messages')
                </div>
                <div class="panel-body">
                    <form class="form-horizontal row-border" action="{{url('users/add-user')}}" method="post">
                        <div class="form-group">
                            <label class="col-md-2 control-label">Name</label>
                            <div class="col-md-10">
                                {!! Form::text('name' , null, [ 'class' => 'form-control' ]) !!}
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">Email</label>
                            <div class="col-md-10">
                                {!! Form::text('email' , null, [ 'class' => 'form-control' ]) !!}
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">Password</label>
                            <div class="col-md-10">
                                <input class="form-control" type="password" name="password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">Assign Campaign</label>
                            <div class="col-md-10">
                                {!! Form::select('assigned_campaigns[]' , $campaigns , null, ['class' => 'form-control selectpicker' , 'title' => 'Select Campaigns to Assign' , 'data-live-search' => 'true' , 'multiple' => 'multiple']) !!}
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-10 col-md-offset-2">
                                <button class="btn btn-success pull-right" type="submit">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection