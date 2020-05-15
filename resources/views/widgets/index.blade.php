@extends('layouts.layout')

@section('title') Widgets @stop

@section('body_class') widgets_list @endsection

@section('content')
    <div id='main-content' role='main'>
        @if( Auth::user()->timezone == "" )
            <div class="alert alert-danger" id="attention"> <center><p><b>ATTENTION: </b> Please select time zone from My Account to have inbox messages with correct dates</p> </center> <span class="glyphicon glyphicon-remove removeAttention" style="position: absolute; right: 20px; top: 78px; cursor: pointer;"></span> </div>
    	@endif
        <div class="campaigns_page index">
            <div class='vt-page-header'>
                <div class='vt-page-title'>
                    <h3>
                        <i class='glyphicon glyphicon-th-large'></i>
                        WIDGETS
                    </h3>
                </div>
                <div class='vt-page-controller'>
                    <select class="form-control campaignSelect widgets-page-select selectpicker" data-live-search='true' @if(count($campaigns)==0) disabled @endif name="campaign_id">
                        <option value="0">All Campaigns</option>
                        @foreach($campaigns as $campaign)
                            <option class="campaign_id" @if(isset($campaign_id) && $campaign_id == $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
                        @endforeach
                    </select>
                    
                    @if( Auth::user()->create_widgets == 1 )
                    <a class=' btn btn-success' href="{{ url('/campaigns/create') }}" title='Create Campaign'>
                        <span class='glyphicon glyphicon-plus'></span>
                    </a>
                    @endif
                    
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
                    @if( Auth::user()->assigned_campaigns == "" )
                        <form method="POST" class="update-form" style="display: none;">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="_method" value="PUT">
                            <span style="position:absolute;margin-left:10px;" class="simple_tooltip" data-toggle="tooltip" data-original-title='Edit Campaign'>
                                <a href="" class="btn btn btn-primary extra edit-button" data-toggle="modal">
                                    <i class="glyphicon glyphicon-edit"></i>
                                </a>
                            </span>
                            <div aria-hidden="true" aria-labelledby="myModalLabel" class="modal fade edit-modal-div" role="dialog" tabindex="-1" style="display: none;">
                                <div class="modal-dialog modal-default center">
                                    <form>
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label>Campaign Name</label>
                                                    {!! Form::text('name' , null, [ 'class' => 'form-control campaign-name' , 'placeholder' => 'Enter Campaign Name Here...' ]) !!}
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

                        <form method="POST" class="delete-form" style="display: none;">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="_method" value="DELETE">
                            <a style="margin-left:72px;" class='btn btn-danger delete-button' data-toggle='modal' href=''>
                                <i class="glyphicon glyphicon-remove"></i>
                                <span>Delete this Campaign</span>
                            </a>
                            <div aria-hidden='true' aria-labelledby='myModalLabel' class='modal fade delete-modal-div' role='dialog' tabindex='-1'>
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
                </div>
            </div>

            <div class='vt-campaign-list-container'>
                <div class='vt-campaign-list'>

                    @include('layouts.alerts.messages')

                    <div class='vt-campaign-list-controller'>
                        <div class="campaigns-tabs" data-example-id="togglable-tabs">
                            @if($widgets->isEmpty() && count(Auth::user()->assigned_campaigns) == 0)
                                @include('widgets.parts.no-campaign')
                            @else
                                <ul class="campaign-nav-tabs" role="tablist">
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
                                <div id="myTabContent" class="tab-content campaign-list-grid-tab">
                                    <div role="tabpanel" class="tab-pane fade in active" id="grid" aria-labelledby="grid-tab">
                                        <p class="list-style-p">
                                            @if($widgets->isEmpty())
                                                @include('layouts.alerts.no-result')
                                            @else
                                                @include('widgets.parts.grid')
                                            @endif
                                        </p>
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="list" aria-labelledby="list-tab">
                                        <p class="list-style-p">
                                            @if($widgets->isEmpty())
                                                @include('layouts.alerts.no-result')
                                            @else
                                                @include('widgets.parts.list')
                                            @endif
                                        </p>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="/assets/js/bootstrap-toggle.js"></script>
@endsection