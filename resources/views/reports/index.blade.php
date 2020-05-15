@extends('layouts.layout')

@section('title') Reports @stop

@section('styles')
@endsection
@section('body_class') widgets_list @endsection

@section('content')
    <script src="/assets/js/reportsSubmit.js" type="text/javascript" charset="utf-8"></script>
    <div id='main-content' role='main'>
    	<div class='campaigns-page'>
            <div class='vt-page-header'>
                <div class='vt-page-title'>
                    <h3>
                        <i class='glyphicon glyphicon-list-alt'></i>
                        REPORTS
                    </h3>
                </div>
            </div>

            @if(isset($days))
                @foreach($days as $day)
                    <input class="stats" type="hidden" value="{{$day}}">
                @endforeach
            @endif

            <div class='vt-page'>
                <div class='vt-chart-container'>
                    <div class='vt-chart-filter-options'>
                        <div class='vt-chart-filter pull-left'>
                            <div class='vt-filter-button'>
                                <form action="/reports" method="get" id="MessagesSortByCampaign">
                                    <select class="form-control campaign_select selectpicker" data-live-search='true' @if(count($campaigns)==0) disabled @endif name="campaign_id">
                                        <option value="0">Select Campaign</option>
                                        @foreach($campaigns as $campaign)
                                            <option class="campaign_id selectpicker" data-live-search='true' @if(Input::has('campaign_id') && Input::get('campaign_id')== $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
                                        @endforeach
                                    </select>
                                </form>
                            </div>

                            <div class='vt-filter-button'>
                                @if($campaign_id)
                                    <form action="/reports" method="get" id="MessagesSortByWidget">
                                        <input type="hidden" name="campaign_id" value="{{$campaign_id}}">
                                        <select class="widget_select selectpicker" data-live-search='true' @if(count($widgets)==0) disabled @endif name="widget_id" >
                                            <option value="0">Select Widget</option>
                                            @foreach($widgets as $widget)
                                                <option class="widget_id" @if(Input::has('widget_id') && Input::get('widget_id')== $widget->id) selected @endif value="{{$widget->id}}">{{$widget->widget_name}}</option>
                                            @endforeach
                                        </select>
                                    </form>
                                @endif
                            </div>
                        </div>
                        <div class="row">
                            @if(Input::has('widget_id'))
                                <button class="btn btn-primary pull-right month" style="margin-right: 10px;">Last month</button>
                                <button class="btn btn-primary pull-right week" style="margin-right: 10px;">Last week</button>
                                <button class="btn btn-primary pull-right today" style="margin-right: 10px;">Today</button>
                            @endif
                            <div class="col-md-3 datePicker pull-right">
                                <input type="text" id="datePicker" class="form-control">
                                <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div id="chart"></div>
                </div>
            </div>
        </div>
    </div>

    <footer></footer>

    <style type="text/css">
        .datePicker { position: relative; }
        .datePicker i {
            position: absolute; bottom: 10px; right: 24px; top: auto; cursor: pointer;
        }
    </style>
@endsection

@section('scripts')
    <script src="/assets/js/bootstrap-toggle.js"></script>
    <script src="/assets/js/design/charter.js" type="text/javascript"></script>
@endsection