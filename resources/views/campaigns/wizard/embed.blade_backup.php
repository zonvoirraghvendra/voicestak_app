@extends('layouts.layout')

@section('title') Campaign Embed Code @stop

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
                                @if(Request::is('campaigns*'))
                                    <a href="{{ url('/campaigns/'.$campaign->id.'/wizard-integration/'.$widget->id) }}" type="button" class="form-control btn btn-primary">
                                        <i class='glyphicon glyphicon-arrow-left'></i>
                                        Previous
                                    </a>
                                @endif
                                @if(Request::is('widgets*'))
                                    <a href="{{ url('/widgets/'.$campaign->id.'/wizard-integration/'.$widget->id) }}" type="button" class="form-control btn btn-primary">
                                        <i class='glyphicon glyphicon-arrow-left'></i>
                                        Previous
                                    </a>
                                @endif
                            </div>
                            <div class='next-button'>
                                <a class='next form-control btn btn-success'>
                                    <i class='glyphicon glyphicon-check'></i>
                                    Complete
                                </a>
                                <script type="text/javascript">
                                    jQuery('.next').click(function() {
                                        jQuery('form#embed').submit();
                                        return false;
                                    })
                                </script>
                            </div>
                        </div>
                        @if(Request::is('campaigns*'))
                            @include('campaigns.wizard.progress-bars.4-steps', ['percent' => 100])
                        @endif
                        @if(Request::is('widgets*'))
                            @include('campaigns.wizard.progress-bars.3-steps', ['percent' => 100])
                        @endif
                    </div>

                    <div style="overflow: hidden">
                        <br>
                        @include('layouts.alerts.messages')
                    </div>

                    <div class='step-page fields-integration'>
                        <div class='row'>
                            <div class='col-md-5 col-sm-12 col-xs-12 col-md-push-7'>
                                <div class="live_preview">
                                    <div class="row">
                                        @if(isset($widget) && $widget->custom_button_code == '' )
                                            <div class="tab-preview col-md-12 col-sm-6 col-xs-6">
                                                <h5><strong>Tab Preview</strong></h5>
                                                <div class="tab-iframe-cont">
                                                    @if(isset($widget) && $widget->tab_design != '' && $widget->type == 'side-lock' )
                                                        <iframe id="ifrm" style="height: 475px; visibility: visible" class="tabs-iframe" src="/widgets/side-widget-preview/{!! $widget->tab_design !!}?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                                    @elseif(isset($widget) && $widget->tab_design != '' && $widget->type == 'footer-lock' )
                                                        <iframe id="ifrm" style="height: 155px; visibility: visible" class="tabs-iframe" src="/widgets/footer-widget-preview/{!! $widget->tab_design !!}?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                                    @endif
                                                </div>
                                            </div>
                                        @else
                                            <iframe id="ifrm_button" src="/widgets/custom-button/{!! $widget->token_field !!}" class="tabs-iframe front-tabs-iframe hide" onload="setIframeHeight(this.id)"></iframe>
                                        @endif
                                        <div class="widget-preview col-md-12 col-sm-6 col-xs-6">
                                            <h5><strong>Widget Preview</strong></h5>
                                            @if(isset($widget) && $widget->widget_design !='')
                                                <iframe id="widget-preview" style="height: 475px; visibility: visible;" class="widgets-iframe" src="/widgets/{!! $widget->widget_design !!}/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                            @else
                                                <iframe id="widget-preview" class="widgets-iframe" style="height: 475px; visibility: hidden" src="" onload="setIframeHeight(this.id)"></iframe>
                                            @endif
                                        </div>

                                    </div>
                                </div>
                            </div>

                            @if(Request::is('campaigns*'))
                                {!! Form::open(['url' => '/campaigns/'.$campaign->id.'/wizard-embed/'.$widget->id, 'method' => 'post' , 'id' => 'embed', 'class' => 'col-md-7 col-sm-12 col-xs-12 col-md-pull-5']) !!}
                            @endif
                            @if(Request::is('widgets*'))
                                {!! Form::open(['url' => '/widgets/'.$campaign->id.'/wizard-embed/'.$widget->id, 'method' => 'post' , 'id' => 'embed', 'class' => 'col-md-7 col-sm-12 col-xs-12 col-md-pull-5']) !!}
                            @endif
                                <div class='option-row'>
                                    <div class='option-row-title'>
                                        <label>9. Embed the Live Chat Widget</label>
                                    </div>
                                    <div class='option-row-content'>
                                        @if(isset($widget))
                                            <input type="hidden" id="lightbox_hidden" value="{!! $widget->lightbox !!}">
                                            <input type="hidden" id="cunsom_button_hidden" value="{!! strlen( $widget->custom_button_code ) !!}">
                                        @endif
                                        <p>Copy the following script and insert it into your website's HTML source code between the &lt;body&gt; tags. This code must be inserted into every page on which you wish to display the VoiceStak Chat Widget.</p>

                                        @if(isset($widget) && $widget->custom_button_code != '')
                                        {!! Form::textarea('embed_code', '<link rel="stylesheet" href="https://'.$_SERVER['SERVER_NAME'].'/assets/css/voice-stack.css"><div class="vs-frontend-button-container"><div id="vs_custom_button_code">'.$widget->custom_button_code.'</div><a class="frontend-widget-preview" href="#widget-preview">&nbsp;</a></div><iframe id="widget-preview" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: visible; width: 460px;"></iframe><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/fancybox.js"></script><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/voice-stack.js"></script><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link href="https://'.$_SERVER['SERVER_NAME'].'/assets/css/ios_styles.css" rel="stylesheet" type="text/css" /><div class="modal fade" id="popup-ios" role="dialog" tabindex="-1"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">×</span></button><h3 class="modal-title">There\'s A VoiceStak App for iOS!</h3></div><div class="modal-body"><a href="Voicestak://?token='.$widget->token_field.'&first_name_field_active='.$widget->first_name_field_active.'&first_name_field_required='.$widget->first_name_field_required.'&email_field_required='.$widget->email_field_required.'&phone_field_active='.$widget->phone_field_active.'&phone_field_required='.$widget->phone_field_required.'" id="launch_voicestak_button"><button type="button" class="btn btn-primary">I Have The App</button></a><a href="http://itunes.com/apps/voicestak"><img src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/12003484042/original/app-store-icon.png?1459527095"></a><p class="note"><b>NOTE:</b>After you have installed the app, return to this page and tap on the launch button.</p></div><div class="modal-footer"><button class="btn btn-default" data-dismiss="modal" type="button">Close</button></div></div></div></div><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/bootstrap_plugins.js">' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                        @else
                                            @if(isset($widget) && $widget->tab_design && $widget->type == 'side-lock' )
                                                @if($widget->lightbox  == 1)
                                                    {!! Form::textarea('embed_code', '<link rel="stylesheet" href="https://'.$_SERVER['SERVER_NAME'].'/assets/css/voice-stack.css"><div class="frontend-tab-container-side"><iframe id="ifrm" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/side-widget/'.$widget->token_field.'" class="tabs-iframe front-tabs-iframe"></iframe><a class="frontend-widget-preview" href="#widget-preview">&nbsp;</a></div><iframe id="widget-preview" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: visible; width: 460px;"></iframe><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/fancybox.js"></script><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/voice-stack.js"></script><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link href="https://'.$_SERVER['SERVER_NAME'].'/assets/css/ios_styles.css" rel="stylesheet" type="text/css" /><div class="modal fade" id="popup-ios" role="dialog" tabindex="-1"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">×</span></button><h3 class="modal-title">There\'s A VoiceStak App for iOS!</h3></div><div class="modal-body"><a href="Voicestak://?token='.$widget->token_field.'&first_name_field_active='.$widget->first_name_field_active.'&first_name_field_required='.$widget->first_name_field_required.'&email_field_required='.$widget->email_field_required.'&phone_field_active='.$widget->phone_field_active.'&phone_field_required='.$widget->phone_field_required.'" id="launch_voicestak_button"><button type="button" class="btn btn-primary">I Have The App</button></a><a href="http://itunes.com/apps/voicestak"><img src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/12003484042/original/app-store-icon.png?1459527095"></a><p class="note"><b>NOTE:</b>After you have installed the app, return to this page and tap on the launch button.</p></div><div class="modal-footer"><button class="btn btn-default" data-dismiss="modal" type="button">Close</button></div></div></div></div><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/bootstrap_plugins.js">' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                                @else
                                                    {!! Form::textarea('embed_code', '<script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/jquery.slidein.js"></script><div class="slide-out-div slide-out-div-new"><div class="frontend-tab-container-side handle"><iframe id="ifrm" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/side-widget/'.$widget->token_field.'" class="tabs-iframe front-tabs-iframe" style="visibility: hidden;" onload="VoiceStackIframe(this.id)"></iframe><a class="frontend-widget-preview">&nbsp;</a></div><iframe id="widget-preview" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: hidden; width: 460px;"  onload="VoiceStackIframe(this.id)"></iframe></div><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link href="https://'.$_SERVER['SERVER_NAME'].'/assets/css/ios_styles.css" rel="stylesheet" type="text/css" /><div class="modal fade" id="popup-ios" role="dialog" tabindex="-1"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">×</span></button><h3 class="modal-title">There\'s A VoiceStak App for iOS!</h3></div><div class="modal-body"><a href="Voicestak://?token='.$widget->token_field.'&first_name_field_active='.$widget->first_name_field_active.'&first_name_field_required='.$widget->first_name_field_required.'&email_field_required='.$widget->email_field_required.'&phone_field_active='.$widget->phone_field_active.'&phone_field_required='.$widget->phone_field_required.'" id="launch_voicestak_button"><button type="button" class="btn btn-primary">I Have The App</button></a><a href="http://itunes.com/apps/voicestak"><img src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/12003484042/original/app-store-icon.png?1459527095"></a><p class="note"><b>NOTE:</b>After you have installed the app, return to this page and tap on the launch button.</p></div><div class="modal-footer"><button class="btn btn-default" data-dismiss="modal" type="button">Close</button></div></div></div></div><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/bootstrap_plugins.js">' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                                @endif
                                            @elseif(isset($widget) && $widget->tab_design != '' && $widget->type == 'footer-lock' )
                                                @if($widget->lightbox  == 1)
                                                    {!! Form::textarea('embed_code', '<link rel="stylesheet" href="https://'.$_SERVER['SERVER_NAME'].'/assets/css/voice-stack.css"><div class="frontend-tab-container"><iframe id="ifrm" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/footer-widget/'.$widget->token_field .'" class="tabs-iframe front-tabs-iframe"></iframe><a class="frontend-widget-preview" href="#widget-preview">&nbsp;</a></div><iframe id="widget-preview" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: visible; width: 460px;"></iframe><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/fancybox.js"></script><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/voice-stack.js"></script><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link href="https://'.$_SERVER['SERVER_NAME'].'/assets/css/ios_styles.css" rel="stylesheet" type="text/css" /><div class="modal fade" id="popup-ios" role="dialog" tabindex="-1"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">×</span></button><h3 class="modal-title">There\'s A VoiceStak App for iOS!</h3></div><div class="modal-body"><a href="Voicestak://?token='.$widget->token_field.'&first_name_field_active='.$widget->first_name_field_active.'&first_name_field_required='.$widget->first_name_field_required.'&email_field_required='.$widget->email_field_required.'&phone_field_active='.$widget->phone_field_active.'&phone_field_required='.$widget->phone_field_required.'" id="launch_voicestak_button"><button type="button" class="btn btn-primary">I Have The App</button></a><a href="http://itunes.com/apps/voicestak"><img src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/12003484042/original/app-store-icon.png?1459527095"></a><p class="note"><b>NOTE:</b>After you have installed the app, return to this page and tap on the launch button.</p></div><div class="modal-footer"><button class="btn btn-default" data-dismiss="modal" type="button">Close</button></div></div></div></div><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/bootstrap_plugins.js">' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                                @else
                                                    {!! Form::textarea('embed_code', '<script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/jquery.slidein.js"></script><div class="slide-out-div slide-out-div-new"><div class="frontend-tab-container-side handle"><iframe id="ifrm" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/footer-widget/'.$widget->token_field.'" class="tabs-iframe front-tabs-iframe" style="visibility: hidden;" onload="VoiceStackIframe(this.id)"></iframe><a class="frontend-widget-preview">&nbsp;</a></div><iframe id="widget-preview" src="https://'.$_SERVER['SERVER_NAME'].'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: hidden; width: 460px;" onload="VoiceStackIframe(this.id)"></iframe></div><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link href="https://'.$_SERVER['SERVER_NAME'].'/assets/css/ios_styles.css" rel="stylesheet" type="text/css" /><div class="modal fade" id="popup-ios" role="dialog" tabindex="-1"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">×</span></button><h3 class="modal-title">There\'s A VoiceStak App for iOS!</h3></div><div class="modal-body"><a href="Voicestak://?token='.$widget->token_field.'&first_name_field_active='.$widget->first_name_field_active.'&first_name_field_required='.$widget->first_name_field_required.'&email_field_required='.$widget->email_field_required.'&phone_field_active='.$widget->phone_field_active.'&phone_field_required='.$widget->phone_field_required.'" id="launch_voicestak_button"><button type="button" class="btn btn-primary">I Have The App</button></a><a href="http://itunes.com/apps/voicestak"><img src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/12003484042/original/app-store-icon.png?1459527095"></a><p class="note"><b>NOTE:</b>After you have installed the app, return to this page and tap on the launch button.</p></div><div class="modal-footer"><button class="btn btn-default" data-dismiss="modal" type="button">Close</button></div></div></div></div><script type="text/javascript" src="https://'.$_SERVER['SERVER_NAME'].'/assets/js/bootstrap_plugins.js">' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                                @endif
                                            @endif
                                        @endif

                                        <div class='setting-tab-scheme-cont'>
                                            <div class='vt-option-setting-container'>
                                                <div class='buttons'>
                                                    {!! Form::button('Copy', ['class' => 'copy_embed wizard-embed-copy btn btn-success', 'style' => 'display: none; float: right']) !!}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection