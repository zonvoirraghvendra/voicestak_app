@extends('layouts.layout')

@section('title') Compaign {!! $campaignByID->name !!} @stop

@section('body_class') campaigns_list @endsection

@section('content')
    <div id='main-content' role='main'>
    	<div class="campaigns_page index">
            <div class='vt-page-header'>
                <div class='vt-page-title'>
                    <h3>
                        <i class='glyphicon glyphicon-th-large'></i>
                        {!! $campaignByID->name !!}
                    </h3>
                </div>
                <div class='vt-page-controller'>
                    <select id="compaignDropdown" class="form-control campaignSelect widgets-page-select selectpicker" data-live-search='true' @if(count($campaigns)==0) disabled @endif name="campaign_id">
                        <option value="0">All Campaigns</option>
                        @foreach($campaigns as $campaign)
                            <option class="campaign_id" @if(isset($campaign_id) && $campaign_id == $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
                        @endforeach
                    </select>

                    <span style="position:absolute;" class="simple_tooltip" data-toggle="tooltip" data-placement="top" data-original-title='Create Campaign'>
                        <a href="{{ url('/campaigns/create') }}" class="form-control btn btn-success">
                            <i class='glyphicon glyphicon-plus'></i>
                        </a>
                    </span>

                    @if( Auth::user()->assigned_campaigns == "" )
                        @if(isset($campaign_id))
                            <form action="/campaigns/{!! $campaign_id !!}/updateCampaign" method="POST" class="update-form">
                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                <input type="hidden" name="_method" value="PUT">
                                <span style="position:absolute;margin-left:50px;" class="simple_tooltip" data-toggle="tooltip" data-placement="top" data-original-title='Edit Campaign'>
                                    <a href="" class="btn btn btn-primary extra" data-target="#editCampaign{!! $campaign_id !!}" data-toggle="modal">
                                        <i class="glyphicon glyphicon-edit"></i>
                                    </a>
                                </span>
                                <div aria-hidden="true" aria-labelledby="myModalLabel" class="modal fade" id="editCampaign{!! $campaign_id !!}" role="dialog" tabindex="-1" style="display: none;">
                                    <div class="modal-dialog modal-default center">
                                        <form>
                                            <div class="modal-content">
                                                <div class="modal-body">
                                                    <div class="form-group">
                                                        <label>Campaign Name</label>
                                                        {!! Form::text('name' , $campaignByID->name , [ 'class' => 'form-control' , 'placeholder' => 'Enter Campaign Name Here...' ]) !!}
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button class="btn btn-success btn-sm" type="submit">Save</button>
                                                    <button class="btn btn-default btn-sm" data-dismiss="modal" type="button">Close</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </form>
                            <form action="/campaigns/{!! $campaign_id !!}" method="POST" class="delete-form">
                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                <input type="hidden" name="_method" value="DELETE">
                                <a style="margin-left:110px;" class='btn btn-danger' data-target='#removeModal{!! $campaign_id !!}' data-toggle='modal' href=''>
                                    <i class="glyphicon glyphicon-remove"></i>
                                    <span>Delete this Campaign</span>
                                </a>
                                <div aria-hidden='true' aria-labelledby='myModalLabel' class='modal fade' id='removeModal{!! $campaign_id !!}' role='dialog' tabindex='-1'>
                                    <div class='modal-dialog modal-sm'>
                                        <div class='modal-content'>
                                            <div class='modal-body'>
                                                Are you sure?
                                            </div>
                                            <div class='modal-footer'>
                                                <button class='btn btn-default btn-sm' data-dismiss='modal' type='button'>Cancel</button>
                                                <button class='btn btn-danger btn-sm' type='submit'>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        @endif
                    @endif
                </div>
            </div>

            <div class='vt-campaign-list-container'>
                @if (!$campaignByID->widgets->isEmpty())
                    <div class='vt-campaign-list'>
                        <div class='vt-campaign-list-controller'>
                            <div class="campaigns-tabs" data-example-id="togglable-tabs">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active">
                                        <a href="#grid" id="grid-tab" role="tab" data-toggle="tab" aria-controls="grid" aria-expanded="true">
                                            <i class='glyphicon glyphicon-th-large'></i>
                                            Grid View
                                        </a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#list" role="tab" id="list-tab" data-toggle="tab" aria-controls="list">
                                            <i class='glyphicon glyphicon-align-justify'></i>
                                            List View
                                        </a>
                                    </li>
                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div role="tabpanel" class="tab-pane fade in active" id="grid" aria-labelledby="grid-tab">
                                        @if($campaigns->isEmpty())
                                            @include('layouts.alerts.no-result')
                                        @else
                                            @include('campaigns.parts.grid')
                                        @endif
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="list" aria-labelledby="list-tab">
                                        <p class="list-style-p">
                                            @if($campaigns->isEmpty())
                                                @include('layouts.alerts.no-result')
                                            @else
                                                @include('campaigns.parts.list')
                                            @endif
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    @include('widgets.parts.no-item')
                @endif
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="/assets/js/bootstrap-toggle.js"></script>
@endsection