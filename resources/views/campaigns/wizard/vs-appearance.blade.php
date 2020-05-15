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
                                <script type="text/javascript">
                                    jQuery('.next').click(function() {
                                        jQuery('form#appearance').submit();
                                        return false;
                                    })
                                </script>
                            </div>
                        </div>
                        @if(Request::is('campaigns*'))
                            @include('campaigns.wizard.progress-bars.4-steps', ['percent' => 50])
                        @endif
                        @if(Request::is('widgets*'))
                            @include('campaigns.wizard.progress-bars.3-steps', ['percent' => 33])
                        @endif
                    </div>

                    <div style="overflow: hidden">
                        <br>
                        @include('layouts.alerts.messages')
                    </div>

                    <div class='step-page appearance_page'>
                        <div class='row'>
                            <div class='col-md-5 col-sm-12 col-xs-12 col-md-push-7'>
                                <div class='live_preview'>
                                    <div class='row'>
                                        <div class='tab-preview col-md-12 col-sm-6 col-xs-6'>
                                            <h5>
                                                <strong>Tab Preview</strong>
                                            </h5>
                                            <div class="tab-iframe-cont">
                                                @if(isset($widget) && $widget->tab_design != '' && $widget->type == 'side-lock' )
                                                    <iframe id="ifrm" style="height: 451px; visibility: visible" class="tabs-iframe" src="/widgets/side-widget-preview/{!! $widget->tab_design !!}?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                                @elseif(isset($widget) && $widget->tab_design != '' && $widget->type == 'footer-lock' )
                                                    <iframe id="ifrm" style="height: 155px; visibility: visible" class="tabs-iframe" src="/widgets/footer-widget-preview/{!! $widget->tab_design !!}?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                                @endif
                                            </div>
                                        </div>
                                        <div class='widget-preview col-md-12 col-sm-6 col-xs-6'>
                                            <h5>
                                                <strong>Widget Preview</strong>
                                            </h5>
                                            <div class="widget-iframe-cont">
                                                @if(isset($widget) && $widget->widget_design !='')
                                                    <iframe id="widget-preview" style="height: 475px; visibility: visible;" class="widgets-iframe" src="/widgets/{!! $widget->widget_design !!}/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}" onload="removeScripts(this.id)"></iframe>
                                                @else
                                                    <iframe id="widget-preview" class="widgets-iframe" style="height: 475px; visibility: hidden" src="" onload="removeScripts(this.id)"></iframe>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            @if(Request::is('campaigns*'))
                                @if(isset($widget))
                                    {!! Form::model( $widget , ['url' => 'campaigns/'.$campaign->id.'/wizard-appearance/'.$widget->id, 'method' => 'post' , "class" => "col-md-7 col-sm-12 col-xs-12 col-md-pull-5" , "id" => "appearance", 'files' => true]) !!}
                                @else
                                    {!! Form::open( ['url' => 'campaigns/'.$campaign->id.'/wizard-appearance', 'method' => 'post' , "class" => "col-md-7 col-sm-12 col-xs-12 col-md-pull-5" , "id" => "appearance", 'files' => true]) !!}
                                @endif
                            @endif
                            @if(Request::is('widgets*'))
                                @if(isset($widget))
                                    {!! Form::model( $widget , ['url' => 'widgets/'.$campaign->id.'/wizard-appearance/'.$widget->id, 'method' => 'post' , "class" => "col-md-7 col-sm-12 col-xs-12 col-md-pull-5" , "id" => "appearance", 'files' => true]) !!}
                                @else
                                    {!! Form::open( ['url' => 'widgets/'.$campaign->id.'/wizard-appearance', 'method' => 'post' , "class" => "col-md-7 col-sm-12 col-xs-12 col-md-pull-5" , "id" => "appearance", 'files' => true]) !!}
                                @endif
                            @endif

                                <div class='choose-type option-row'>
                                    <div class='option-row-title'>
                                        <label>1. Choose Position</label>
                                    </div>
                                    <div class='select-type option-row-content'>
                                        <div class='btn-group btn-group-justified'>
                                            <div class='btn-group'>
                                                <label class="position-type-label">
                                                    <a class='btn btn-nav' type='button'>
                                                        <span class='glyphicon glyphicon-arrow-down'></span>
                                                        <p>Side Lock</p>
                                                    </a>
                                                    @if(isset($widget) && $widget->type == "side-lock")
                                                        {!! Form::radio('position-type', 'side', true ) !!}
                                                    @else
                                                        {!! Form::radio('position-type', 'side', false ) !!}
                                                    @endif
                                                </label>
                                            </div>
                                            <div class='btn-group'>
                                                <label class="position-type-label">
                                                    <a class='btn btn-nav' type='button'>
                                                        <span class='glyphicon glyphicon-arrow-right'></span>
                                                        <p>Bottom Lock</p>
                                                    </a>
                                                    @if(isset($widget) && $widget->type == "footer-lock")
                                                        {!! Form::radio('position-type', 'footer', true ) !!}
                                                    @else
                                                        {!! Form::radio('position-type', 'footer', false ) !!}
                                                    @endif
                                                </label>
                                            </div>
                                            {!! Form::hidden('type', null, array('class' => 'tab-type-hidden')) !!}
                                            {!! Form::hidden('tab_design', null, array('class' => 'tab-design-hidden')) !!}
                                        </div>
                                    </div>
                                </div>

                                <div class='choose-design option-row'>
                                    <div class='option-row-title'>
                                        <label>2. Choose Tab Design</label>
                                    </div>
                                    <div class='option-row-content'>
                                        <button class='btn btn-success choose-tab-design-btn' data-target='#modal-designs' data-toggle='modal' disabled='disabled' type='button'>
                                            Choose Design
                                        </button>
                                        <hr>
                                        <div class='setting-tab-cont'>
                                            <div class='vt-option-setting-container'>
                                                <a class='title'>
                                                    {!! Form::input('color', null, null, array('id' => 'tab-bg-color', 'class' => 'tab-color') ) !!}
                                                    {!! Form::text('tab_bg_color', null, array('class' => 'form-control tab-color-input hide') ) !!}
                                                    Main Background Color
                                                </a>
                                                <div class='buttons'>
                                                    <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                                </div>
                                            </div>
                                            <div class='vt-option-setting-container tab-bg-color-2-cont'>
                                                <a class='title'>
                                                    {!! Form::input('color', null, null, array('id' => 'tab-bg-color2', 'class' => 'tab-color') ) !!}
                                                    {!! Form::text('tab_bg_color_2', null, array('class' => 'form-control tab-color-input hide') ) !!}
                                                    Icons Background Color
                                                </a>
                                                <div class='buttons'>
                                                    <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                                </div>
                                            </div>
                                            <div class='vt-option-setting-container tab-bg-color-3-cont'>
                                                <a class='title'>
                                                    {!! Form::input('color', null, null, array('id' => 'tab-bg-color3', 'class' => 'tab-color') ) !!}
                                                    {!! Form::text('tab_bg_color_3', null, array('class' => 'form-control tab-color-input hide') ) !!}
                                                    Secondary Background Color
                                                </a>
                                                <div class='buttons'>
                                                    <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                                </div>
                                            </div>
                                            <div class='vt-option-setting-container'>
                                                <a class='title'>
                                                    {!! Form::input('color', null, null, array('id' => 'tab-text-color', 'class' => 'tab-color') ) !!}
                                                    {!! Form::text('tab_text_color', null, array('class' => 'form-control tab-color-input hide') ) !!}
                                                    Main Text Color
                                                </a>
                                                <div class='buttons'>
                                                    <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                                </div>
                                            </div>
                                            <div class='vt-option-setting-container tab-text-color-2-cont'>
                                                <a class='title'>
                                                    {!! Form::input('color', null, null, array('id' => 'tab-text-color2', 'class' => 'tab-color') ) !!}
                                                    {!! Form::text('tab_text_color_2', null, array('class' => 'form-control tab-color-input hide') ) !!}
                                                    Seconday Text Color
                                                </a>
                                                <div class='buttons'>
                                                    <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class='choose-widget-design option-row'>
                                    <div class='option-row-title'>
                                        <label>3. Choose Widget Design</label>
                                    </div>
                                    <div class='option-row-content'>
                                        <div class='alert alert-info mt0'>
                                            <p>
                                                You can choose to have the widget pop up in a lightbox overlay by selecting the checkbox below. By default the widget will function as a slide in.
                                                <hr>
                                                {!! Form::label('open-as-light','Open as light:') !!}
                                                {!! Form::checkbox('lightbox' , 1, false, ['id' => 'open-as-light']) !!}
                                            </p>
                                        </div>
                                        <div class='appearance_small_images_cont'>
                                            <div class="col-md-3 col-sm-4 col-xs-4">
                                                <label class="view-steps-img">
                                                    {!! Form::radio('widget_design', '1', false,['class' => 'widget_design']) !!}
                                                    <div class="view-steps-img-container">
                                                        {!! HTML::image('assets/img/popup-1/popup-1.png') !!}
                                                    </div>
                                                </label>
                                                <a class="btn btn-xs btn-success" data-toggle="modal" data-target="#view-steps-1">Customize</a>
                                            </div>
                                            <div class="col-md-3 col-sm-4 col-xs-4">
                                                <label class="view-steps-img">
                                                    {!! Form::radio('widget_design', '2', false,['class' => 'widget_design']) !!}
                                                    <div class="view-steps-img-container">
                                                        {!! HTML::image('assets/img/popup-2/popup-2.png') !!}
                                                    </div>
                                                </label>
                                                <a class="btn btn-xs btn-success" data-toggle="modal" data-target="#view-steps-2">Customize</a>
                                            </div>
                                            <div class="col-md-3 col-sm-4 col-xs-4">
                                                <label class="view-steps-img">
                                                    {!! Form::radio('widget_design', '3', false ,['class' => 'widget_design']) !!}
                                                    <div class="view-steps-img-container">
                                                        {!! HTML::image('assets/img/popup-3/popup-3.png') !!}
                                                    </div>
                                                </label>
                                                <a class="btn btn-xs btn-success" data-toggle="modal" data-target="#view-steps-3">Customize</a>

                                                {!! Form::hidden('widget_design', null, array('class' => 'widget-type-hidden')) !!}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class='branding option-row'>
                                    <div class='option-row-title'>
                                        <label>4. Branding</label>
                                    </div>
                                    <div class='option-row-content'>
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                Remove powered by ___
                                            </a>
                                            <div class='buttons'>
                                                @if(Auth::user()->is_premium == '0')
                                                    {!! Form::checkbox('remove_powered_by' , '1', false, ['id' => 'branding', 'data-size' => 'small', 'data-toggle' => 'toggle', 'disabled']) !!}
                                                    <br>
                                                @else
                                                    {!! Form::checkbox('remove_powered_by' , '1', false, ['id' => 'branding', 'data-size' => 'small', 'data-toggle' => 'toggle']) !!}
                                                    <br>
                                                @endif
                                            </div>
                                        </div>
                                        <div class='alert alert-info mt0'>
                                            <p>
                                                premium customers only
                                                <a class='btn btn-xs btn-primary pull-right' href='#'>upgrade</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class='url option-row'>
                                    <div class='option-row-title'>
                                        <label>5. Privacy Policy URL</label>
                                    </div>
                                    <div class='option-row-content'>
                                        {!! Form::text('privacy_policy_url', null, ['class' => 'form-control', 'placeholder' => 'Enter your URL']) !!}
                                    </div>
                                </div>

                                <div class="content hide">
                                    {!! Form::label('widget_main_headline','Main Healdine') !!}
                                    {!! Form::text('widget_main_headline', null , [ 'class' => 'form-control' , 'placeholder' => 'Enter Your Headline Here...', 'id' => "widget_main_headline" ]) !!}
                                    <br>

                                    <div class="row appearance_small_images_cont" id="imageDiv" @if(isset($widget) && $widget->remove_powered_by) style="display: block;" @else style="display: none;" @endif>
                                        @if(isset($widget))
                                            @if($widget->image)
                                                <div class="col-md-3 col-sm-3 col-xs-12">
                                                    <div class="appearance_small_images"><img src="/{{ $widget->image }}"></div>
                                                </div>
                                            @endif
                                                <div class="col-md-3 col-sm-3 col-xs-12 content-buttons">
                                                    {!! Form::file('image',  ['accept' => 'image/*']) !!}
                                                    <br>
                                                    @if($widget->image)
                                                        <input type="hidden" class="image_path" name="image_path" value="{{$widget->image}}" >

                                                        <button type="button" class="btn btn-danger" id="image_delete" onclick="document.deleteForm.submit()">Remove</button>
                                                    @endif
                                                </div>

                                        @else
                                            <div class="col-md-3 col-sm-3 col-xs-12 content-buttons">
                                                {!! Form::file('image',  ['accept' => 'image/*']) !!}
                                            </div>
                                        @endif
                                    </div>
                                </div>

                                <div class="color-scheme-cont hide">
                                    <div>
                                        {!! Form::input('color', null, null, array('id' => 'color-scheme-bg', 'class' => 'widget-color') ) !!}
                                        {!! Form::text('widget_bg_color', null, array('class' => 'form-control color-input widget-color-input') ) !!}
                                        {!! Form::label('color-scheme-bg','Background Color') !!}
                                    </div>
                                    <div>
                                        {!! Form::input('color', null, null, array('id' => 'color-scheme-headline', 'class' => 'widget-color') ) !!}
                                        {!! Form::text('widget_main_headline_color', null, array('class' => 'form-control color-input widget-color-input') ) !!}
                                        {!! Form::label('color-scheme-headline','Main Headline Color') !!}
                                    </div>

                                    <div>
                                        {!! Form::input('color', null, null, array('id' => 'color-scheme-headline-bg', 'class' => 'widget-color') ) !!}
                                        {!! Form::text('widget_main_headline_bg_color', null, array('class' => 'form-control color-input widget-color-input') ) !!}
                                        {!! Form::label('color-scheme-headline-bg','Headline Background Color') !!}
                                    </div>
                                    <div>
                                        {!! Form::input('color', null, null, array('id' => 'color-scheme-text', 'class' => 'widget-color') ) !!}
                                        {!! Form::text('widget_text_color', null, array('class' => 'form-control color-input widget-color-input') ) !!}
                                        {!! Form::label('color-scheme-text','Text Color') !!}
                                    </div>

                                    <div>
                                        {!! Form::input('color', null, null, array('id' => 'color-scheme-buttons-bg', 'class' => 'widget-color') ) !!}
                                        {!! Form::text('widget_buttons_bg_color', null, array('class' => 'form-control color-input widget-color-input') ) !!}
                                        {!! Form::label('color-scheme-buttons-bg','Buttons Background Color') !!}
                                    </div>

                                    <div>
                                        {!! Form::input('color', null, null, array('id' => 'color-scheme-buttons-text', 'class' => 'widget-color') ) !!}
                                        {!! Form::text('widget_buttons_text_color', null, array('class' => 'form-control color-input widget-color-input') ) !!}
                                        {!! Form::label('color-scheme-buttons-text','Buttons Text Color') !!}
                                    </div>
                                </div>
                            {!! Form::close() !!}
                            @if(isset($widget))
                                <form action='/widgets/imageDelete' method="post" name="deleteForm">
                                    <input type="hidden" name="_method" value="PUT">
                                    <input type="hidden" name="imageDelete" value="{{$widget->image}}">
                                    <input type="hidden" name="campaign_id" value="{{$campaign->id}}">
                                    <input type="hidden" name="widget_id" value="{{$widget->id}}">
                                </form>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Choose Tab Design Modal -->
    <div class="modal fade view-steps-1" id="view-steps-1" tabindex="-1" role="dialog" aria-labelledby="view-steps-1-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header choose-color-scheme">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Choose Color Scheme</h4>
                </div>

                <div class="modal-body campaign-wizard">
                    <div class="choose-color-scheme">
                        <div class='choose-design option-row'>
                            <div class='option-row-content'>
                                <div class="row">
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <label>Headline Text</label>
                                        {!! Form::text('widget_main_headline', null , [ 'class' => 'form-control widget_main_headline' , 'placeholder' => 'Enter Your Headline Text Here...' ]) !!}
                                    </div>
                                </div>
                                <br/>
                                <div class='setting-tab-cont row'>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Main Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_text_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_main_headline_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Headline Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_main_headline_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Headline Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_buttons_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Buttons Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_buttons_text_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Buttons Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="popup-iframe-cont popup-iframe-cont1">
                        @if(isset($widget) && $widget->widget_design !='')
                            <iframe id="widget-preview-popup1" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/1/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}" onload="removeScripts(this.id)"></iframe>
                        @else
                            <iframe id="widget-preview-popup1" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/1/popup-widget-preview/1" onload="removeScripts(this.id)"></iframe>
                        @endif
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


    <!-- Tabs Modal -->
    <div class="modal fade" id="modal-designs" tabindex="-1" role="dialog" aria-labelledby="modal-designs-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class='modal-header'>
                    <button aria-label='Close' class='close' data-dismiss='modal' type='button'>
                        <span aria-hidden='true'>×</span>
                    </button>
                    <h4 class='modal-title'>Choose your design</h4>
                </div>
                <div class="modal-body">
                    <div role="tabpanel" data-example-id="togglable-tabs">
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active"><a href="#side-lock" id="side-lock-tab" role="tab" data-toggle="tab" aria-controls="side-lock" aria-expanded="true">Side Lock</a></li>
                            <li role="presentation" class=""><a href="#footer-lock" role="tab" id="footer-lock-tab" data-toggle="tab" aria-controls="footer-lock" aria-expanded="false">Footer Lock</a></li>
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane fade active in" id="side-lock" aria-labelledby="side-lock-tab">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        @for ($i = 1; $i <= 10; $i++)
                                            @if ($i != 10)
                                                <div class="col-md-2 col-sm-3 col-xs-4">
                                            @else
                                                <div class="col-md-3 col-sm-4 col-xs-6">
                                            @endif
                                                    @if(isset($widget) && $widget->tab_design != '' && $i == $widget->tab_design && $widget->type == 'side-lock')
                                                        <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}" checked="">
                                                    @elseif(isset($widget) && $widget->type == 'footer-lock' && $i == 1)
                                                        <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}" checked="">
                                                    @elseif(!isset($widget) && $i == 1)
                                                        <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}" checked="">
                                                    @else
                                                        <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}">
                                                    @endif

                                                    <label for="side-tab-{!! $i !!}">
                                                        {!! HTML::image('assets/img/tabs-2/'.$i.'.png') !!}
                                                    </label>
                                                </div>
                                        @endfor
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" class="tab-pane fade" id="footer-lock" aria-labelledby="footer-lock-tab">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        @for ($j = 1; $j <= 10; $j++)
                                            <div class="col-md-4 col-sm-6 col-xs-6">
                                                @if(isset($widget) && $widget->tab_design != '' && $j == $widget->tab_design && $widget->type == 'footer-lock')
                                                    <input type="radio" value="{!! $j !!}" name="footer-tab" id="footer-tab-{!! $j !!}" checked="">
                                                @elseif(isset($widget) && $widget->type == 'side-lock' && $j == 1)
                                                    <input type="radio" value="{!! $j !!}" name="footer-tab" id="footer-tab-{!! $j !!}" checked="">
                                                @elseif(!isset($widget) && $j == 1)
                                                    <input type="radio" value="{!! $j !!}" name="footer-tab" id="footer-tab-{!! $j !!}" checked="">
                                                @else
                                                    <input type="radio" value="{!! $j !!}" name="footer-tab" id="footer-tab-{!! $j !!}">
                                                @endif

                                                <label for="footer-tab-{!! $j !!}">
                                                    {!! HTML::image('assets/img/tabs-1/'.$j.'.png') !!}
                                                </label>
                                            </div>
                                        @endfor
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success choose-tab-success-btn">Choose Tab Design</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- View Steps 1 Modal -->
    <div class="modal fade view-steps-1" id="view-steps-1" tabindex="-1" role="dialog" aria-labelledby="view-steps-1-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header choose-color-scheme">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Choose Color Scheme</h4>
                </div>

                <div class="modal-body campaign-wizard">
                    <div class="choose-color-scheme">
                        <div class='choose-design option-row'>
                            <div class='option-row-content'>
                                <div class="row">
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <label>Headline Text</label>
                                        {!! Form::text('widget_main_headline', null , [ 'class' => 'form-control widget_main_headline' , 'placeholder' => 'Enter Your Headline Text Here...' ]) !!}
                                    </div>
                                </div>
                                <br/>
                                <div class='setting-tab-cont row'>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Main Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_text_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_main_headline_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Headline Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_main_headline_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Headline Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_buttons_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Buttons Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_buttons_text_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Buttons Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="popup-iframe-cont popup-iframe-cont1">
                        @if(isset($widget) && $widget->widget_design !='')
                            <iframe id="widget-preview-popup1" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/1/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}" onload="removeScripts(this.id)"></iframe>
                        @else
                            <iframe id="widget-preview-popup1" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/1/popup-widget-preview/1" onload="removeScripts(this.id)"></iframe>
                        @endif
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- View Steps 2 Modal -->
    <div class="modal fade view-steps-1" id="view-steps-2" tabindex="-1" role="dialog" aria-labelledby="view-steps-2-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header choose-color-scheme">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Choose Color Scheme</h4>
                </div>

                <div class="modal-body campaign-wizard">
                    <div class="choose-color-scheme">
                        <div class='choose-design option-row'>
                            <div class='option-row-content'>
                                <div class="row">
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <label>Headline Text</label>
                                        {!! Form::text('widget_main_headline', null , [ 'class' => 'form-control widget_main_headline' , 'placeholder' => 'Enter Your Headline Text Here...' ]) !!}
                                    </div>
                                </div>
                                <br/>
                                <div class='setting-tab-cont row'>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Main Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_text_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_main_headline_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Headline Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_main_headline_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Headline Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_buttons_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Buttons Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_buttons_text_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Buttons Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="popup-iframe-cont popup-iframe-cont2">
                        @if(isset($widget) && $widget->widget_design !='')
                            <iframe id="widget-preview-popup2" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/2/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}" onload="removeScripts(this.id)"></iframe>
                        @else
                            <iframe id="widget-preview-popup2" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/2/popup-widget-preview/1" onload="removeScripts(this.id)"></iframe>
                        @endif
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- View Steps 3 Modal -->
    <div class="modal fade view-steps-1" id="view-steps-3" tabindex="-1" role="dialog" aria-labelledby="view-steps-3-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header choose-color-scheme">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Choose Color Scheme</h4>
                </div>

                <div class="modal-body campaign-wizard">
                    <div class="choose-color-scheme">
                        <div class='choose-design option-row'>
                            <div class='option-row-content'>
                                <div class="row">
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <label>Headline Text</label>
                                        {!! Form::text('widget_main_headline', null , [ 'class' => 'form-control widget_main_headline' , 'placeholder' => 'Enter Your Headline Text Here...' ]) !!}
                                    </div>
                                </div>
                                <br/>
                                <div class='setting-tab-cont row'>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Main Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_text_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_main_headline_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Headline Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_main_headline_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Headline Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_buttons_bg_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Buttons Background Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <div class='vt-option-setting-container'>
                                            <a class='title'>
                                                {!! Form::input('color', null, null, array('class' => 'widget-color') ) !!}
                                                {!! Form::text('widget_buttons_text_color', null, array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                                Buttons Text Color
                                            </a>
                                            <div class='buttons'>
                                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="popup-iframe-cont popup-iframe-cont3">
                        @if(isset($widget) && $widget->widget_design !='')
                            <iframe id="widget-preview-popup3" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/3/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}" onload="removeScripts(this.id)"></iframe>
                        @else
                            <iframe id="widget-preview-popup3" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/3/popup-widget-preview/1" onload="removeScripts(this.id)"></iframe>
                        @endif
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
@endsection