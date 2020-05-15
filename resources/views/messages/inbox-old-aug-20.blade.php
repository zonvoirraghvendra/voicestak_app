@extends('layouts.layout')

@section('body_class') messages_list @endsection

@section('content')
    <script src="/assets/js/messagesPagination.js"></script>
    <script src="/assets/js/campaignSubmit.js" type="text/javascript" charset="utf-8"></script>

    <div id='main-content' role='main'>
        <div class='campaigns-page'>
        
            <div aria-hidden='true' aria-labelledby='export-messages' class='modal fade' id='export-messages' role='dialog' style='display: none;' tabindex='-1'>
              <div class='modal-dialog'>
                <div class='modal-content'>
                  <div class='modal-header'>
                    <button aria-label='Close' class='close' data-dismiss='modal' type='button'>
                      <span aria-hidden='true'>×</span>
                    </button>
                    <h4 class='modal-title'>Export Messages</h4>
                  </div>
                  <div class='modal-body'>                    
                    <form id="update_user" action="{{url('/export-messages')}}" method="get">
                        <h4>Are You Sure You Want Export All Related Data to a Message in a .csv</h4>
                        <div class='modal-footer'>
                          <button type="submit" onclick="$('#export-messages').modal('hide')" class="btn btn-danger">Export</button>
                          <button aria-label='Close' class='btn btn-default' data-dismiss='modal' type="button">Cancel</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class='vt-page-header'>
                <div class='vt-page-title'>
                    <h3>
                        <i class='glyphicon glyphicon-envelope'></i>
                        INBOX
                    </h3>
                </div>
                <div class='vt-page-controller'>
                    <form action="/messages" method="get" id="MessagesSortByCampaign">
                        <select class="form-control campaign_select selectpicker" data-live-search='true' @if(count($campaigns)==0) disabled @endif name="campaign_id">
                            <option value="0">All Campaigns</option>
                            @foreach($campaigns as $campaign)
                                <option class="campaign_id selectpicker" data-live-search='true' @if(Input::has('campaign_id') && Input::get('campaign_id')== $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
                            @endforeach
                        </select>
                    </form>
                    @if($campaign_id)
                        <form action="/messages" method="get" id="MessagesSortByWidget">
                            <input type="hidden" name="campaign_id" value="{{$campaign_id}}">
                            <select class="form-control widget_select selectpicker" data-live-search='true' @if(count($widgets)==0) disabled @endif name="widget_id" >
                                <option value="0">All Widgets</option>
                                @foreach($widgets as $widget)
                                    @if($widget->campaign_id == $campaign_id)
                                        <option class="widget_id" @if(Input::has('widget_id') && Input::get('widget_id')== $widget->id) selected @endif value="{{$widget->id}}">{{$widget->widget_name}}</option>
                                    @endif
                                @endforeach
                            </select>
                        </form>
                    @endif

                    <a href="{{ url('/campaigns/create') }}" class="form-control btn btn-success" data-toggle="tooltip" data-placement="top" title="Create Campaign">
                        <i class='glyphicon glyphicon-plus'></i>
                    </a>
                </div>
            </div>
            <div class='vt-inbox-list-container'>
                <a class="btn btn-success" id=" export_messages " data-target='#export-messages' data-toggle='modal' type='button' style="margin-top:5px">Export Messages</a>
                <ul id="tabs" class="nav nav-tabs col-md-8 col-md-offset-1" data-tabs="tabs">
                    <li id="news" class="active"><a  href="#newMessages" data-toggle="tab">New Messages</a></li>
                    <li id="archives"><a  href="#archivedMessages" data-toggle="tab">Archived Messages</a></li>
                </ul>
                @if(count($messages) > 0)
                    <div class='vt-inbox-list fluid'>
                        <div id="my-tab-content" class="tab-content">
                            <div class="tab-pane fade in active" id="newMessages">
                                @include('messages.parts.list', ['messagesList' => $messages])
                            </div>
                            <div class="tab-pane" id="archivedMessages">
                                @include('messages.parts.list', ['messagesList' => $messages])
                            </div>
                        </div>
                    </div>
                @else
                    <div class="vt-inbox-list fluid">
                        
                                No Messages found
                            
                    </div>
                @endif
            </div>
        </div>
    </div>


	{{-- <div class="container">
        <div class="row top">
            <div class="col-sm-9 col-xs-6">
                <h4>Received Messages<a href="/messages"><span class="glyphicon glyphicon-transfer"></span></a></h4>
            </div>
            <div class="col-sm-3 col-xs-6">
                <form action="/messages" method="get" id="MessagesSortByCampaign">
                        <select class="form-control campaign_select" @if(count($campaigns)==0) disabled @endif name="campaign_id">
                            <option value="0">All Campaigns</option>
                            @foreach($campaigns as $campaign)
                                <option class="campaign_id" @if(Input::has('campaign_id') && Input::get('campaign_id')== $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
                            @endforeach
                        </select>
                </form><br>
                <form action="/messages" method="get" id="MessagesSortByWidget">
                        @if($campaign_id)
                            <input type="hidden" name="campaign_id" value="{{$campaign_id}}">
                            <select class="form-control widget_select" @if(count($widgets)==0) disabled @endif name="widget_id" >
                                <option value="0">All Widgets</option>
                                @foreach($widgets as $widget)
                                    @if($widget->campaign_id == $campaign_id)
                                        <option class="widget_id" @if(Input::has('widget_id') && Input::get('widget_id')== $widget->id) selected @endif value="{{$widget->id}}">{{$widget->widget_name}}</option>
                                    @endif
                                @endforeach
                            </select>
                        @endif
                </form><br>
            </div>
        </div>
        <div class="row content">
            <div class="col-sm-12 inbox">
                @if(count($messages) > 0)
                    @include('messages.parts.list')
                @else
                    @include('layouts.alerts.no-result')
                @endif
            </div>

        </div>
    </div> --}}
    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            $('#tabs').tab();
        });
    </script>    
@endsection