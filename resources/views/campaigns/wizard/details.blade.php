@extends('layouts.layout')

@section('title') Campaign Details @stop

@section('content')
    <div id='main-content' role='main'>
        <div class='campaigns-page'>
            <div class='vt-page-header'>
                <div class='vt-page-title'>
                    <h3>
                        <i class='glyphicon glyphicon-th-large'></i>
                        CAMPAIGN WIZARD
                    </h3>
                </div>
            </div>
            <div class='vt-steps-container'>
                <div class='container campaign-wizard'>
                    <div class='step-progress-container'>
                        <div class='step-navs'>
                            <div class='back-button'>
                                <a class='form-control btn btn-danger' href='/widgets'>
                                    <i class='glyphicon glyphicon-remove'></i>
                                    Cancel
                                </a>
                            </div>
                            <div class='next-button'>
                                <a class='next form-control btn btn-primary'>
                                    <i class='glyphicon glyphicon-arrow-right'></i>
                                    Next
                                </a>
                            </div>
                        </div>

                        @include('campaigns.wizard.progress-bars.4-steps', ['percent' => 25])

                    </div>

                    <div style="overflow: hidden">
                        <br>
                        @include('layouts.alerts.messages')
                    </div>

                    <div class='step-page'>
                        @if(isset($campaign))
                            @if(isset($widget))
                                {!! Form::model( $campaign , ['url' => 'campaigns/'.$campaign->id.'/update/'.$widget->id, 'method' => 'put' , 'id' => 'campaign_details']) !!}
                            @else
                                {!! Form::model( $campaign , ['url' => 'campaigns/'.$campaign->id, 'method' => 'put' , 'id' => 'campaign_details']) !!}
                            @endif
                        @else
                            {!! Form::open(['route' => 'campaigns.store', 'method' => 'post' , 'id' => 'campaign_details']) !!}
                        @endif

                        <div class='create-container'>
                            <h4>Choose an Existing Campaign</h4>
                            @if(!empty( $campaigns))
                                {!! Form::select('campaign_id' , ['' => 'Choose a Campaign' ]+$campaigns , isset($campaign)?$campaign->id:null , [  'class' => 'form-control' ] ) !!}
                            @endif
                        </div>

                        @if( Auth::user()->assigned_campaigns == "" )
                            <div class='create-container open create-new-campaign-form' id="hidingSection">
                                <div class='input-container'>
                                    {!! Form::label('name' , 'Create a New Campaign') !!}
                                    {!! Form::text('name' , null , [ 'class' => 'form-control' , 'placeholder' => 'Enter Campaign Name Here...' ]) !!}
                                </div>
                            </div>
                        @endif

                        <div class='create-container open create-new-campaign-form'>
                            <div class='input-container'>
                                {!! Form::label('tab-bg-color','Widget Name') !!}
                                {!! Form::text('widget_name',  null, array('class' => 'form-control' , 'placeholder' => 'Enter Widget Name Here...')) !!}
                            </div>
                        </div>
                        {!! Form::close() !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script type="text/javascript">
        /*Hide Widget Name when dropdown option is selected*/
        jQuery(document).ready(function(){
            var errorDiv = jQuery('.error_message.alert.alert-danger.alert-dismissible');
            if( errorDiv.length ) {
                jQuery("#hidingSection").attr('style', 'display: none !important;');
            }
            jQuery("select").change(function() {
                if( $("select option:selected").text() != "Choose a Campaign" ) {
                    jQuery("#hidingSection").attr('style', 'display: none !important;');
                } else {
                    jQuery("#hidingSection").attr('style', 'display: block !important;');
                }
            });
        });

        jQuery('.next').click(function() {
            jQuery('form#campaign_details').submit();
            return false;
        });

        jQuery("input[name='name']").on('keyup' , function() {
            jQuery("select[name='campaign_id']").val('');
        });

        jQuery("select[name='campaign_id']").on('change' , function() {
            jQuery("input[name='name']").val('');
        });
    </script>
@endsection