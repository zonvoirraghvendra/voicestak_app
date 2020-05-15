@extends('layouts.layout')

@section('title') Personal Messages @stop

@section('styles')
@endsection
@section('body_class') widgets_list @endsection

@section('content')
	<div id='main-content' role='main'>
		<div aria-hidden='true' aria-labelledby='send-sms' class='modal fade' id='send-sms' role='dialog' style='display: none;' tabindex='-1'>
		    <div class='modal-dialog'>
			    <div class='modal-content'>
			    	<form action="/personal-messages/send-message" method="post">
				        <div class='modal-header'>
				          	<button aria-label='Close' class='close' data-dismiss='modal' type='button'>
				            	<span aria-hidden='false'>×</span>
				          	</button>
				          	<h4 class='modal-title'>Send New SMS</h4>
				        </div>
				        <div class='modal-body'>
				        	<div id="errors"></div>
				            <div class='choose-setting-tab option-row'>
					            <div class='option-row-title'>
					                <label>1. CHOOSE CAMPAIGN</label>
					            </div>
					            <div class='setting-tab-cont option-row-content'>
					                <select class='selectpicker campaign-select' @if(count($campaigns)==0) disabled @endif name='campaign_id'>
					                  	<option value='0'>Choose Campaign</option>
					                  	@foreach($campaigns as $campaign)
					                        <option class="campaign_id" data-live-search='true' @if(Input::has('campaign_id') && Input::get('campaign_id')== $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
					                    @endforeach
					                </select>
					            </div>
				            </div>
				            <div class='choose-setting-tab option-row'>
					            <div class='option-row-title'>
					                <label>2. CHOOSE WIDGET</label>
					            </div>
					            <div class='setting-tab-cont option-row-content'>
					                <select class='form-control widgetsSelect' name='widget_id'>
					                  	<option value='0'>Choose Widget</option>
					                </select>
					            </div>
				            </div>
				            <div class='choose-setting-tab option-row'>
					            <div class='option-row-title'>
					                <label>3. Add Message</label>
					            </div>
					            <div class='setting-tab-cont option-row-content'>
					                <textarea class='form-control messageText' name="text" maxlength='160' placeholder='add message here...'></textarea>
					                <div class='alert alert-warning'>
					                  	<p>max characters allowed should be 160</p>
					                </div>
					            </div>
				            </div>
				            <input type="hidden" name="senderPhone" class="senderPhone">
				        </div>
				        <div class='modal-footer'>
				          	<button class='btn btn-success choose-tab-success-btn sendSms'>Send Message</button>
				          	<button class='btn btn-default' data-dismiss='modal' type='button'>Close</button>
				        </div>
			        </form>
			    </div>
		    </div>
		</div>
		<div class='campaigns-page'>
		    <div class='vt-page-header'>
			    <div class='vt-page-title'>
			        <h3>
			          	<i class='glyphicon glyphicon-envelope'></i>
			          	MESSAGES
			        </h3>
			    </div>
			    <div class='vt-page-controller'>
			        <form action='/personal-messages' method='get'>
			          	<select class="form-control campaign_select selectpicker" data-live-search='true' @if(count($campaigns)==0) disabled @endif name="campaign_id" onchange="$(this).closest('form').submit()">
	                        <option value="0">All Campaigns</option>
	                        @foreach($campaigns as $campaign)
	                            <option class="campaign_id selectpicker" data-live-search='true' @if(Input::has('campaign_id') && Input::get('campaign_id')== $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
	                        @endforeach
	                    </select>
			        </form>
			        <a class='form-control btn btn-success' data-target='#send-sms' data-toggle='modal' type='button'>
			          	<i class='glyphicon glyphicon-send'></i>
			          	Send New SMS
			        </a>
			    </div>
		    </div>
		    <div class='vt-sms-list-container'>
			    <div class='vt-sms-list fluid'>
			        <div class='vt-horizontal-title'>
				        @include('layouts.alerts.messages')
				        <h5 class='new'>
				            Sent SMS Messages
				        </h5>
			        </div>
			        @if(count($personalMessages) > 0)
			        	@include('personalMessages.parts.list')
			        @else
			        	<div class="vt-inbox-list fluid">
	                        No Messages found
	                    </div>
	                @endif
			    </div>
		    </div>
		</div>
	</div>

	<footer></footer>

	<script>
		$(document).ready(function(){
		    $('.sendSms').on('click' , function() {
		        $('#errors').html('');

		        if( $('.campaign-select').val() == "0" ) {
		        	$('#errors').addClass('alert alert-danger');
		        	$('#errors').attr("tabindex",-1).focus();
		        	$('#errors').append('Choose Campaign!!!<br>');
		        	return false;
		        }

		        if( $('.widgetsSelect').val() == "0") {
		        	$('#errors').addClass('alert alert-danger');
		        	$('#errors').attr("tabindex",-1).focus();
		        	$('#errors').append('Choose Widget!!!<br>');
		        	return false;
		        }

		        if( $('.messageText').val() == "") {
		        	$('#errors').addClass('alert alert-danger');
		        	$('#errors').attr("tabindex",-1).focus();
		        	$('#errors').append('Enter Message Text!!!<br>');
		        	return false;
		        }

		        if( $('.senderPhone').val() == "") {
		        	$('#errors').addClass('alert alert-danger');
		        	$('#errors').attr("tabindex",-1).focus();
		        	$('#errors').append('Enter Phone Number!!!<br>');
		        	return false;
		        }

		        $(this).closest('form').submit;
		    })
		});
	</script>
@endsection