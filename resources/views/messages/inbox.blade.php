@extends('layouts.layout')

@section('title') Inbox @stop

@section('body_class') messages_list @endsection

@section('content')
<script src="/assets/js/messagesPagination.js"></script>
<script src="/assets/js/campaignSubmit.js" type="text/javascript" charset="utf-8"></script>

<div id='main-content' role='main'>
    <div class='campaigns-page'>
        <div aria-hidden='true' aria-labelledby='export-messages' class='modal fade' id='export-messages' role='dialog' style='display: none;' tabindex='-1'>
            <div class='modal-dialog'>
                <div class='modal-content'>
                    <form id="update_user" action="{{url('/export-messages')}}" method="get">
                        <div class='modal-header'>
                            <button aria-label='Close' class='close' data-dismiss='modal' type='button'>
                                <span aria-hidden='true'>×</span>
                            </button>
                            <h4 class='modal-title'>Export Messages</h4>
                        </div>
                        <div class='modal-body'>
                            <p class="mb0">Are You Sure You Want Export All Related Data to a Message in a .csv</p>
                        </div>
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
        <div class='vt-page-controller vt-page-controller-messages'>

            <form action="/messages" method="get" class="row inbox_search_form">
                <div class="col-md-5 col-sm-4 col-xs-4">
                    <input type="hidden" name="status" value="{{$status}}" >
                    <input type="text" class="form-control pull-left" name="name" placeholder="name">
                </div>
                <div class="col-md-5 col-sm-4 col-xs-4">
                    <input type="text" class="form-control pull-right" placeholder="email" name="email">
                </div>
                <div class="col-md-2 col-sm-4 col-xs-4">
                    <button title="Search" type="submit" class="btn btn-info"><i class='glyphicon glyphicon-search'></i></button>
                </div>
            </form>

            <form action="/messages" method="get" id="MessagesSortByCampaign" class="messagesSortByCampaign" style="margin-left: 50px;">
                <select class="form-control campaign_select selectpicker" data-live-search='true' @if(count($campaigns)==0) disabled @endif name="campaign_id">
                    <option value="0">All Campaigns</option>
                    @foreach($campaigns as $campaign)
                    <option class="campaign_id selectpicker" data-live-search='true' @if(Input::has('campaign_id') && Input::get('campaign_id')== $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
                    @endforeach
                </select>
                <input type="hidden" name="status" value="1" >
            </form>
            @if($campaign_id)
            <form action="/messages" method="get" id="MessagesSortByWidget">
                <input type="hidden" name="campaign_id" value="{{$campaign_id}}">
                @if( $status )
                <input type="hidden" name="status" value="1">
                @endif
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
            <a class=' btn btn-success' href="{{ url('/campaigns/create') }}" title='Create Campaign'>
                <span class='glyphicon glyphicon-plus'></span>
            </a>
            {{-- @if( Auth::user()->role == "user" )
            <a class=' btn btn-success' href="{{ url('/campaigns/create') }}" @if(!$youtube_connected) disabled @endif title='Create Campaign'>
                <span class='glyphicon glyphicon-plus'></span>
            </a>
            @endif

            @foreach(Auth::user()->permissions()->get() as $permission)
            @if($permission->name == 'create-widget')
            <a class=' btn btn-success' href="{{ url('/campaigns/create') }}" @if(!$youtube_connected) disabled @endif title='Create Campaign'>
                <span class='glyphicon glyphicon-plus'></span>
            </a>
            @endif
            @endforeach --}}
            <a title="Export messages" class="form-control btn btn-primary extra export_messages" id=" export_messages " data-target='#export-messages' data-toggle='modal' type='button'><i class="glyphicon glyphicon-export"></i></a>

        </div>
    </div>
    <div class='vt-inbox-list-container'>
        <div class="vt-inbox-list-controller fluid">
            <button class="btn btn-danger deleteSelectedMessages" style="float: left; display: none;">Delete Selected Messages</button>
            <ul id="tabs" class="inbox-nav-tabs" data-tabs="tabs">
                <li id="archives" @if($status) class="active" @endif><a  href="/messages?status=1">Archived Messages</a></li>
                <li id="news" @if(!$status) class="active" @endif><a  href="/messages?status=0">Messages</a></li>
            </ul>
            <div class="vt-horizontal-title">
                <h5 class="new">
                    MESSAGES
                </h5>
            </div>
        </div>

        @if(count($messages) > 0)
        <div class='vt-inbox-list fluid'>
            <div id="my-tab-content" class="tab-content">
                <div class="tab-pane fade in active" id="newMessages">
                    @include('messages.parts.list', ['messagesList' => $messages])
                    @if(isset($status))
                    @if(isset($widget_id))
                    {!! $messages->appends(['campaign_id' => $campaign_id, 'widget_id' => $widget_id, 'status' => $status])->render() !!}
                    @else
                    {!! $messages->appends(['campaign_id' => $campaign_id, 'status' => $status])->render() !!}
                    @endif
                    @else
                    @if(isset($widget_id))
                    {!! $messages->appends(['campaign_id' => $campaign_id, 'widget_id' => $widget_id])->render() !!}
                    @else
                    {!! $messages->appends(['campaign_id' => $campaign_id])->render() !!}
                    @endif
                    @endif
                </div>
                <div class="tab-pane" id="archivedMessages">
                    @include('messages.parts.list', ['messagesList' => $messages])
                    @if(isset($status))
                    @if(isset($widget_id))
                    {!! $messages->appends(['campaign_id' => $campaign_id, 'widget_id' => $widget_id, 'status' => $status])->render() !!}
                    @else
                    {!! $messages->appends(['campaign_id' => $campaign_id, 'status' => $status])->render() !!}
                    @endif
                    @else
                    @if(isset($widget_id))
                    {!! $messages->appends(['campaign_id' => $campaign_id, 'widget_id' => $widget_id])->render() !!}
                    @else
                    {!! $messages->appends(['campaign_id' => $campaign_id])->render() !!}
                    @endif
                    @endif
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

<script type="text/javascript">
    jQuery(document).ready(function ($) {
        $('#tabs').tab();
        $(".tag-input-custom").on('itemAdded', function(event) {
            let items = $(this).val();
            $.post("/messages/add-tag", {
                data: {"tag":items,"message_id":$(this).attr("mid")},
            }, function(e) {
                console.log('true');
            })
        }); 
        $('.tag-input-custom').on('beforeItemRemove', function(event) {
          // event.item: contains the item
          // event.cancel: set to true to prevent the item getting removed
          console.log(event.item);
        });
    });
</script>
@endsection