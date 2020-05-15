@extends('layouts.layout')

@section('content')
	<div class="container campaign-wizard">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h4>Campaign Details</h4>
                <br>
            </div>

            {!! Form::model( $campaign , ['url' => 'campaigns/'.$campaign->id.'/updateCampaign', 'method' => 'put' , 'id' => 'campaign_details']) !!}
                <div class="col-md-offset-4 col-md-4 col-sm-4 col-xs-12">
                    {!! Form::label('name' , 'Edit Campaign') !!}
                    {!! Form::text('name' , null , [ 'class' => 'form-control' , 'placeholder' => 'Enter Campaign Name Here...' ]) !!}
                    <br>
                    <a href="/campaigns/{!! $campaign->id !!}" class="btn btn-danger">Cancel</a>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection