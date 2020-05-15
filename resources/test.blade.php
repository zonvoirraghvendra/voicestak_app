@extends('layouts.layout')

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
                                        <div class="tab-preview col-md-12 col-sm-6 col-xs-6">
                                            <h5><strong>Tab Preview</strong></h5>
                                            <div class="tab-iframe-cont">
                                                @if(isset($widget) && $widget->tab_design != '' && $widget->type == 'side-lock' )
                                                    <iframe id="ifrm" style="height: 451px; visibility: visible" class="tabs-iframe" src="/widgets/side-widget-preview/{!! $widget->tab_design !!}?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                                @elseif(isset($widget) && $widget->tab_design != '' && $widget->type == 'footer-lock' )
                                                    <iframe id="ifrm" style="height: 155px; visibility: visible" class="tabs-iframe" src="/widgets/footer-widget-preview/{!! $widget->tab_design !!}?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                                @endif
                                            </div>
                                        </div>
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
                                        @endif
                                        <p>Copy the following script and insert it into your website's HTML source code between the &lt;body&gt; tags. This code must be inserted into every page on which you wish to display the Zopim Chat Widget.</p>

                                        <?php //dd($widget);  ?>

                                        @if(isset($widget) && $widget->custom_button_code != '')
                                            {!! Form::textarea('embed_code', '<link rel="stylesheet" href="'.Request::root().'/assets/css/voice-stack.css"><div class="frontend-tab-container"><iframe id="ifrm" src="'.Request::root().'/widgets/custom-button/'.$widget->token_field .'" class="tabs-iframe front-tabs-iframe"></iframe><a class="frontend-widget-preview" href="#widget-preview"></a></div><iframe id="widget-preview" src="'.Request::root().'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: visible; width: 460px;"></iframe><script type="text/javascript" src="'.Request::root().'/assets/js/fancybox.js"></script><script type="text/javascript" src="'.Request::root().'/assets/js/voice-stack.js"></script>' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                        @elseif(isset($widget) && $widget->tab_design && $widget->type == 'side-lock' )
                                            @if($widget->lightbox  == 1)
                                                {!! Form::textarea('embed_code', '<link rel="stylesheet" href="'.Request::root().'/assets/css/voice-stack.css"><div class="frontend-tab-container-side"><iframe id="ifrm" src="'.Request::root().'/widgets/side-widget/'.$widget->token_field.'" class="tabs-iframe front-tabs-iframe"></iframe><a class="frontend-widget-preview" href="#widget-preview"></a></div><iframe id="widget-preview" src="'.Request::root().'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: visible; width: 460px;"></iframe><script type="text/javascript" src="'.Request::root().'/assets/js/fancybox.js"></script><script type="text/javascript" src="'.Request::root().'/assets/js/voice-stack.js"></script>' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                            @else
                                                {!! Form::textarea('embed_code', '<script type="text/javascript" src="'.Request::root().'/assets/js/jquery.slidein.js"></script><div class="slide-out-div slide-out-div-new"><div class="frontend-tab-container-side handle"><iframe id="ifrm" src="'.Request::root().'/widgets/side-widget/'.$widget->token_field.'" class="tabs-iframe front-tabs-iframe" style="visibility: hidden;" onload="VoiceStackIframe(this.id)"></iframe><a class="frontend-widget-preview"></a></div><iframe id="widget-preview" src="'.Request::root().'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: hidden; width: 460px;"  onload="VoiceStackIframe(this.id)"></iframe></div>' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                            @endif
                                        @elseif(isset($widget) && $widget->tab_design != '' && $widget->type == 'footer-lock' )
                                            @if($widget->lightbox  == 1)
                                                {!! Form::textarea('embed_code', '<link rel="stylesheet" href="'.Request::root().'/assets/css/voice-stack.css"><div class="frontend-tab-container"><iframe id="ifrm" src="'.Request::root().'/widgets/footer-widget/'.$widget->token_field .'" class="tabs-iframe front-tabs-iframe"></iframe><a class="frontend-widget-preview" href="#widget-preview"></a></div><iframe id="widget-preview" src="'.Request::root().'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: visible; width: 460px;"></iframe><script type="text/javascript" src="'.Request::root().'/assets/js/fancybox.js"></script><script type="text/javascript" src="'.Request::root().'/assets/js/voice-stack.js"></script>' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                            @else
                                                {!! Form::textarea('embed_code', '<script type="text/javascript" src="'.Request::root().'/assets/js/jquery.slidein.js"></script><div class="slide-out-div slide-out-div-new"><div class="frontend-tab-container-side handle"><iframe id="ifrm" src="'.Request::root().'/widgets/footer-widget/'.$widget->token_field.'" class="tabs-iframe front-tabs-iframe" style="visibility: hidden;" onload="VoiceStackIframe(this.id)"></iframe><a class="frontend-widget-preview"></a></div><iframe id="widget-preview" src="'.Request::root().'/widgets/popup-widget-preview/'.$widget->token_field.'" class="widgets-iframe not-show" style="visibility: hidden; width: 460px;" onload="VoiceStackIframe(this.id)"></iframe></div>' , [ 'id' => 'embed-modal' , 'class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                            @endif

                                        @endif
                                        <div class='alert alert-danger'>
                                            <p>
                                                To use the widget on your website you must have JQuery on your site. If you do not have JQuery please change the toggle below to
                                                <b>Yes</b>
                                            </p>
                                        </div>
                                        <hr>
                                        <div class='setting-tab-scheme-cont'>
                                            <div class='vt-option-setting-container'>
                                                <a class='title'>
                                                    Attach jQuery
                                                </a>
                                                <div class='buttons'>
                                                    {!! Form::button('Copy', ['class' => 'copy_embed wizard-embed-copy btn btn-success', 'style' => 'float: right']) !!}
                                                </div>
                                                <div class='buttons'>
                                                    {!! Form::checkbox('add_jquery', 1, false, ['class' => 'add_jquery', 'id' => 'add_jquery', 'data-off' => 'No', 'data-on' => 'Yes', 'data-size' => 'medium', 'data-toggle' => 'toggle']) !!}
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class='alert alert-warning'>
                                            <p>This is the new script. If you are using the classic widget, remove the old script first.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class='option-row'>
                                    <div class='option-row-title'>
                                        <label>10. Check Your Website</label>
                                    </div>
                                    <div class='option-row-content'>
                                        <p>Check in the VoiceStak Widget is correctly installed on your website.</p>
                                        <div class='setting-tab-scheme-cont'>
                                            <div class='vt-option-setting-container'>
                                                <a class='title'>
                                                    URL
                                                </a>
                                                <div class='buttons'>
                                                    <button class='copy_embed wizard-embed-copy btn btn-primary' style='float: right' type='button'>Check</button>
                                                </div>
                                                <div class='buttons'>
                                                    <input class='form-control mr0' id='check-website-url' type='text'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                @if(isset($widget->lightbox) && $widget->lightbox == '1')
                                    <div class='option-row'>
                                        <div class='option-row-title'>
                                            <label>11. Custom Button Code</label>
                                        </div>
                                        <div class='option-row-content'>
                                            <div class='alert alert-info mt0'>
                                                <p>
                                                    Provide code to allow user to place a button of their creation on the site. Will pop up the lightbox option.
                                                </p>
                                            </div>
                                            <hr>
                                            <div class='setting-tab-scheme-cont'>
                                                <div class='vt-option-setting-container'>
                                                    <a class='title'>
                                                        Custom Button Code 
                                                    </a>
                                                   {!! Form::textarea('custom_button_code', $widget->custom_button_code, ['class' => 'embed_code form-control no-resize', 'rows' => 8 ]) !!}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
