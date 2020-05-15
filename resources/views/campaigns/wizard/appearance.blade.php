
@extends('layouts.layout')

@section('title') Campaign Appearance @stop

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
                                    if( $('.appearance_page').find('.choose_button_tabs_div').find('.btn-group-justified').children('.btn-group:last-child').children('label').children('a').hasClass('active') ) {
                                        $('.tab-type-hidden').val('side-lock');
                                        $('.tab-design-hidden').val('1');
                                        $('input[name="tab_bg_color"]').val('');
                                        $('input[name="tab_bg_color_2"]').val('');
                                        $('input[name="tab_bg_color_3"]').val('');
                                        $('input[name="tab_text_color"]').val('');
                                        $('input[name="tab_text_color_2"]').val('');

                                        jQuery('form#appearance').submit();
                                    } else if( $('.appearance_page').find('.choose_button_tabs_div').find('.btn-group-justified').children('.btn-group:first-child').children('label').children('a').hasClass('active') ) {
                                        $('.custom_button_code').val('');

                                        jQuery('form#appearance').submit();
                                    }
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
                                            @else
                                            <iframe id="ifrm" class="tabs-iframe" style="height: 451px; visibility: hidden" src="" onload="removeScripts(this.id)"></iframe>
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


                        <div class='choose-type option-row choose_button_tabs_div'>
                            <div class='option-row-title'>
                                <label>1. Choose Tabs or Custom Image</label>
                            </div>
                            <div class='select-type option-row-content'>
                                <div class='btn-group btn-group-justified'>
                                    <div class='btn-group'>
                                        <label class="position-type-label2">
                                            <a class='btn btn-nav' type='button'>
                                                <h4>Tabs</h4>
                                            </a>
                                            @if(isset($widget) && ($widget->type == "side-lock" || $widget->type == ""))
                                            {!! Form::radio('position-type', 'side', true ) !!}
                                            @else
                                            {!! Form::radio('position-type', 'side', false ) !!}
                                            @endif
                                        </label>
                                    </div>
                                    <div class='btn-group'>
                                        <label class="position-type-label2">
                                            <a class='btn btn-nav' type='button'>
                                                <h4>Custom Image</h4>
                                            </a>
                                            @if(isset($widget) && $widget->type == "footer-lock")
                                            {!! Form::radio('position-type', 'footer', true ) !!}
                                            @else
                                            {!! Form::radio('position-type', 'footer', false ) !!}
                                            @endif
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='choose-type option-row choose_position_div'>
                            <div class='option-row-title'>
                                <label>2. Choose Position</label>
                            </div>
                            <div class='select-type option-row-content'>
                                <div class='btn-group btn-group-justified'>
                                    <div class='btn-group'>
                                        <label class="position-type-label">
                                            <a class='btn btn-nav' type='button'>
                                                <span class='glyphicon glyphicon-arrow-right'></span>
                                                <p>Side Lock</p>
                                            </a>
                                            @if(isset($widget) && ($widget->type == "side-lock" || $widget->type == ""))
                                            {!! Form::radio('position-type', 'side', true ) !!}
                                            @else
                                            {!! Form::radio('position-type', 'side', false ) !!}
                                            @endif
                                        </label>
                                    </div>
                                    <div class='btn-group'>
                                        <label class="position-type-label">
                                            <a class='btn btn-nav' type='button'>
                                                <span class='glyphicon glyphicon-arrow-down'></span>
                                                <p>Bottom Lock</p>
                                            </a>
                                            @if(isset($widget) && $widget->type == "footer-lock")
                                            {!! Form::radio('position-type', 'footer', true ) !!}
                                            @else
                                            {!! Form::radio('position-type', 'footer', false ) !!}
                                            @endif
                                        </label>
                                    </div>
                                    @if(isset($widget) && $widget->type != "")
                                    {!! Form::hidden('type', null, array('class' => 'tab-type-hidden')) !!}
                                    @else
                                    {!! Form::hidden('type', 'side-lock' , array('class' => 'tab-type-hidden')) !!}
                                    @endif

                                    @if(isset($widget) && $widget->tab_design != "")
                                    {!! Form::hidden('tab_design', null, array('class' => 'tab-design-hidden')) !!}
                                    @else
                                    {!! Form::hidden('tab_design', 1, array('class' => 'tab-design-hidden')) !!}
                                    @endif
                                </div>
                            </div>
                        </div>

                        <div class='option-row custom_button_div'>
                            <div class='option-row-title'>
                                <label>2. Custom Button Code</label>
                            </div>
                            <div class='option-row-content'>
                                <div class='alert alert-info mt0'>
                                    <p>
                                        If you would like to use your own button graphic instead of the provided, VoiceStak tab, please enter the button code below. For example, <q><</q>img src="path to your image" <q>/></q>
                                    </p>
                                </div>
                                <hr>
                                <div class='setting-tab-scheme-cont'>
                                    <div class='vt-option-setting-container'>
                                        <a class='title'>
                                            Custom Button Code
                                        </a>
                                        {!! Form::textarea('custom_button_code', $widget->custom_button_code, ['class' => 'form-control no-resize custom_button_code', 'rows' => 8 ]) !!}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='choose-design option-row choose_tab_design_div'>
                            <div class='option-row-title'>
                                <label>2.1 Choose Tab Design
                                    <span title='Click on a design you would like to use, then click the "Customize" button to edit the color scheme'><i class="glyphicon glyphicon-question-sign" ></i></span>
                                </label>
                                <div class="pull-right">
                                    <select class="form-control" id="sel-tab-design-type" widgetid="{{isset($widget) && $widget->id != ''?$widget->id:''}}">
                                        <option value="both" {{$widget->tab_type=="both"?"selected":""}}>Both(Voice & Video)</option>
                                        <option value="voice" {{$widget->tab_type=="voice"?"selected":""}}>Voice Only</option>
                                        <option value="video" {{$widget->tab_type=="video"?"selected":""}}>Video Only</option>
                                    </select>
                                </div>
                            </div>
                            <div class='option-row-content'>
                                <div class="tab-designs">
                                    <div class="row side-tab-designs">
                                        <div class="col-md-12 col-sm-12 col-xs-12 choose-widget-design" id="side-lock-ajax">
                                            @for ($i = 1; $i <= 10; $i++)
                                            <div class="side-lock-item">
                                                <label class="view-steps-img">
                                                    @if(isset($widget) && $widget->tab_design != '' && $i == $widget->tab_design && $widget->type == 'side-lock')
                                                    <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}" class="tab_design" checked="">
                                                    @elseif(isset($widget) && $widget->type == 'footer-lock' && $i == 1)
                                                    <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}" class="tab_design">
                                                    @elseif(!isset($widget) && $i == 1)
                                                    <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}" checked="" class="tab_design">
                                                    @elseif(isset($widget) && $widget->tab_design == '' && $i == 1)
                                                    <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}" checked="" class="tab_design">
                                                    @else
                                                    <input type="radio" value="{!! $i !!}" name="side-tab" id="side-tab-{!! $i !!}" class="tab_design">
                                                    @endif

                                                    @if($i != 10)
                                                    <div class="view-steps-img-container" style="background: url('/assets/img/tabs-2/{{$widget->tab_type=='video'?'video/':($widget->tab_type=='voice'?'voice/':'')}}{!! $i !!}.png') right top no-repeat; background-size: auto 100%;"></div>
                                                    @else
                                                    <div class="view-steps-img-container" style="background: url('/assets/img/tabs-2/{{$widget->tab_type=='video'?'video/':($widget->tab_type=='voice'?'voice/':'')}}{!! $i !!}.png') right top no-repeat; background-size: 100% auto;"></div>
                                                    @endif

                                                </label>
                                                <a class="btn btn-xs btn-success tab-customize" data-toggle="modal" data-target="#tabs-customize">Customize</a>
                                            </div>
                                            @endfor
                                        </div>
                                    </div>

                                    <div class="row footer-tab-designs hidden">
                                        <div class="col-md-12 col-sm-12 col-xs-12 choose-widget-design">
                                            @for ($j = 1; $j <= 10; $j++)
                                            <div class="footer-lock-item">
                                                <label class="view-steps-img">
                                                    @if(isset($widget) && $widget->tab_design != '' && $j == $widget->tab_design && $widget->type == 'footer-lock')
                                                    <input type="radio" value="{!! $j !!}" name="side-tab" id="footer-tab-{!! $j !!}"  class="tab_design" checked="">
                                                    @elseif(isset($widget) && $widget->type == 'side-lock' && $j == 1)
                                                    <input type="radio" value="{!! $j !!}" name="side-tab" id="footer-tab-{!! $j !!}"  class="tab_design">
                                                    @elseif(!isset($widget) && $j == 1)
                                                    <input type="radio" value="{!! $j !!}" name="side-tab" id="footer-tab-{!! $j !!}"  class="tab_design">
                                                    @elseif(isset($widget) && $widget->tab_design == '' && $j == 1)
                                                    <input type="radio" value="{!! $j !!}" name="side-tab" id="footer-tab-{!! $j !!}"  class="tab_design">
                                                    @else
                                                    <input type="radio" value="{!! $j !!}" name="side-tab" id="footer-tab-{!! $j !!}" class="tab_design">
                                                    @endif
                                                    {{-- <div class="view-steps-img-container">
                                                        <section class="view-steps-img-inner">
                                                            {!! HTML::image('assets/img/tabs-1/'.$j.'.png') !!}
                                                        </section>
                                                    </div> --}}

                                                    @if($j != 10)
                                                    <div class="view-steps-img-container" style="background: url('/assets/img/tabs-1/{!! $j !!}.png') right bottom no-repeat; background-size: 100% auto;"></div>
                                                    @else
                                                    <div class="view-steps-img-container" style="background: url('/assets/img/tabs-1/{!! $j !!}.png') left bottom no-repeat; background-size: auto 100%;"></div>
                                                    @endif

                                                </label>
                                                <a class="btn btn-xs btn-success tab-customize" data-toggle="modal" data-target="#tabs-customize">Customize</a>
                                            </div>
                                            @endfor
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='choose-widget-design option-row'>
                            <div class='option-row-title'>
                                <label>3. Choose Widget Design
                                    <span title='Click on a design you would like to use, then click the "Customize" button to edit the color scheme'><i class="glyphicon glyphicon-question-sign" ></i></span>
                                </label>
                            </div>
                            <div class='option-row-content'>
                                <div class='alert alert-info mt0'>
                                    <p>
                                        You can choose to have the widget pop up in a lightbox overlay by selecting the checkbox below. By default the widget will function as a slide in.
                                        <hr>
                                        {!! Form::label('open-as-light','Open in Lightbox:') !!}
                                        {!! Form::checkbox('lightbox' , 1 , null , ['id' => 'open-as-light']) !!}
                                    </p>
                                </div>
                                <div class='appearance_small_images_cont'>
                                    <div class="col-md-3 col-sm-4 col-xs-4">
                                        <label class="view-steps-img">
                                            {!! Form::radio('widget_design', '1', false,['class' => 'widget_design', 'checked']) !!}
                                            <div class="view-steps-img-container" style="background: url('/assets/img/popup-1/popup-1.png'); width: 140px; height: 145px; background-size: 100% 100%;"></div>
                                        </label>
                                        <a class="btn btn-xs btn-success" data-toggle="modal" data-target="#view-steps-1">Customize</a>
                                    </div>
                                    <div class="col-md-3 col-sm-4 col-xs-4">
                                        <label class="view-steps-img">
                                            {!! Form::radio('widget_design', '2', false,['class' => 'widget_design']) !!}
                                            <div class="view-steps-img-container" style="background: url('/assets/img/popup-2/popup-2.png'); width: 140px; height: 145px; background-size: 100% 100%;"></div>
                                        </label>
                                        <a class="btn btn-xs btn-success" data-toggle="modal" data-target="#view-steps-2">Customize</a>
                                    </div>
                                    <div class="col-md-3 col-sm-4 col-xs-4">
                                        <label class="view-steps-img">
                                            {!! Form::radio('widget_design', '3', false ,['class' => 'widget_design']) !!}
                                            <div class="view-steps-img-container" style="background: url('/assets/img/popup-3/popup-3.png'); width: 140px; height: 145px; background-size: 100% 100%;"></div>
                                        </label>
                                        <a class="btn btn-xs btn-success" data-toggle="modal" data-target="#view-steps-3">Customize</a>


                                        @if(isset($widget) && $widget->widget_design != "")
                                        {!! Form::hidden('widget_design', null, array('class' => 'widget-type-hidden')) !!}
                                        @else
                                        {!! Form::hidden('widget_design', 1, array('class' => 'widget-type-hidden')) !!}
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='branding option-row'>
                            <div class='option-row-title'>
                                <label>4. Branding
                                    <span title="You can choose to have the 'Powered By' branding removed from the widget"><i class="glyphicon glyphicon-question-sign" ></i></span>
                                </label>
                            </div>
                            <div class='option-row-content'>
                                <div class='vt-option-setting-container @if($user->is_premium == 1 || (isset($parent) && $parent->is_premium == 1)) @else grey-bg @endif'>
                                    <a class='title'>
                                        Remove Powered by ___
                                    </a>
                                    <div class='buttons'>
                                        @if($user->is_premium == 1 || (isset($parent) && $parent->is_premium == 1))

                                        {!! Form::checkbox('remove_powered_by' , '1', false, ['id' => 'branding', 'data-size' => 'small', 'data-toggle' => 'toggle']) !!}
                                        <br>

                                        @else
                                        {!! Form::checkbox('remove_powered_by' , '1', false, ['id' => 'branding', 'data-size' => 'small', 'data-toggle' => 'toggle', 'disabled']) !!}
                                        <br>
                                        @endif
                                    </div>
                                </div>
                                @if(!($user->is_premium == 1 || (isset($parent) && $parent->is_premium == 1)))
                                <div class='alert alert-info mt0'>
                                    <p>
                                        premium customers only
                                        <a class='btn btn-xs btn-primary pull-right' href='http://voicestak.com/oto-1/' target="_blank">upgrade</a>
                                    </p>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class='url option-row'>
                            <div class='option-row-title'>
                                <label>5. Privacy Policy URL
                                    <span title="You may enter your Privacy Policy url here. This will display under the optin form fields if you choose to use a form. For legal reasons we STRONGLY suggest providing one."><i class="glyphicon glyphicon-question-sign" ></i></span>
                                </label>
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
                            {{-- For widgets --}}
                            <div class="hidden">
                                {!! Form::text('widget_voice_headline', null, array('class' => 'form-control' ,'value'=>isset($widget) && isset($widget->widget_voice_headline) ? $widget->widget_voice_headline : '' ) ) !!}
                                {!! Form::text('widget_video_headline', null, array('class' => 'form-control' ,'value'=>isset($widget) && isset($widget->widget_video_headline) ? $widget->widget_video_headline : '' ) ) !!}
                                {!! Form::text('one1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->one1) ? $widget->one1 : '' ) ) !!}
                                {!! Form::text('one2', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->one2) ? $widget->one2 : '') ) !!}
                                {!! Form::text('one3', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->one3) ? $widget->one3 : '') ) !!}
                                {!! Form::text('one4', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->one4) ? $widget->one4 : '') ) !!}
                                {!! Form::text('one5', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->one5) ? $widget->one5 : '') ) !!}
                                {!! Form::text('one6', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->one6) ? $widget->one6 : '') ) !!}
                                {!! Form::text('two1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->two1) ? $widget->two1 : '') ) !!}
                                {!! Form::text('two2', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->two2) ? $widget->two2 : '') ) !!}
                                {!! Form::text('two3', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->two3) ? $widget->two3 : '') ) !!}
                                {!! Form::text('two4', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->two4) ? $widget->two4 : '') ) !!}
                                {!! Form::text('two5', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->two5) ? $widget->two5 : '') ) !!}
                                {!! Form::text('three1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->three1) ? $widget->three1 : '') ) !!}
                                {!! Form::text('three2', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->three2) ? $widget->three2 : '') ) !!}
                                {!! Form::text('three3', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->three3) ? $widget->three3 : '') ) !!}
                                {!! Form::text('three4', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->three4) ? $widget->three4 : '') ) !!}
                                {!! Form::text('four1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->four1) ? $widget->four1 : '') ) !!}
                                {!! Form::text('five1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->five1) ? $widget->five1 : '') ) !!}
                                {!! Form::text('five2', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->five2) ? $widget->five2 : '') ) !!}
                                {!! Form::text('five3', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->five3) ? $widget->five3 : '') ) !!}
                                {!! Form::text('five4', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->five4) ? $widget->five4 : '') ) !!}
                                {!! Form::text('six1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->six1) ? $widget->six1 : '') ) !!}
                                {!! Form::text('six2', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->six2) ? $widget->six2 : '') ) !!}
                                {!! Form::text('six3', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->six3) ? $widget->six3 : '') ) !!}
                                {!! Form::text('six4', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->six4) ? $widget->six4 : '') ) !!}
                                {!! Form::text('six5', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->six5) ? $widget->six5 : '') ) !!}
                                {!! Form::text('six6', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->six6) ? $widget->six6 : '') ) !!}
                                {!! Form::text('seven1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->seven1) ? $widget->seven1 : '') ) !!}
                                {!! Form::text('eight1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->eight1) ? $widget->eight1 : '') ) !!}
                                {!! Form::text('none1', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->none1) ? $widget->none1 : '') ) !!}
                                {!! Form::text('none2', null, array('class' => 'form-control','value'=>isset($widget) && isset($widget->none2) ? $widget->none2 : '') ) !!}   
                                {!! Form::text('ty_msg', null, array('class' => 'form-control' ,'value'=>isset($widget) && isset($widget->ty_msg) ? $widget->ty_msg : '' ) ) !!}
                                {!! Form::text('tab_type', null, array('class' => 'form-control' ,'value'=>isset($widget) && isset($widget->tab_type) ? $widget->tab_type : 'both' ) ) !!}
                            </div>
                        </div>

                        <div class="color-scheme-cont hidden">
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

                            {{-- For Tabs --}}

                            <div>
                                {!! Form::input('color', null, null, array('id' => 'color-scheme-tab-bg-color', 'class' => 'tab-color') ) !!}
                                {!! Form::text('tab_bg_color', null, array('class' => 'form-control tab-color-input') ) !!}
                                Main Background Color
                            </div>
                            <div>
                                {!! Form::input('color', null, null, array('id' => 'color-scheme-tab-bg-color2', 'class' => 'tab-color') ) !!}
                                {!! Form::text('tab_bg_color_2', null, array('class' => 'form-control tab-color-input') ) !!}
                                Icons Background Color
                            </div>
                            <div>
                                {!! Form::input('color', null, null, array('id' => 'color-scheme-tab-bg-color3', 'class' => 'tab-color') ) !!}
                                {!! Form::text('tab_bg_color_3', null, array('class' => 'form-control tab-color-input') ) !!}
                                Secondary Background Color
                            </div>
                            <div>
                                {!! Form::input('color', null, null, array('id' => 'color-scheme-tab-text-color', 'class' => 'tab-color') ) !!}
                                {!! Form::text('tab_text_color', null, array('class' => 'form-control tab-color-input') ) !!}
                                Main Text Color
                            </div>
                            <div>
                                {!! Form::input('color', null, null, array('id' => 'color-scheme-tab-text-color2', 'class' => 'tab-color') ) !!}
                                {!! Form::text('tab_text_color_2', null, array('class' => 'form-control tab-color-input') ) !!}
                                Seconday Text Color
                            </div>
                            <div>

                                {!! Form::text('tab_title_one', null, array('class' => 'form-control') ) !!}
                                One Text 
                            </div>
                            <div>

                                {!! Form::text('tab_title_two', null, array('class' => 'form-control') ) !!}
                                twp Text 
                            </div>
                            <div>

                                {!! Form::text('tab_title_three', null, array('class' => 'form-control') ) !!}
                                three Text Color
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

<!-- Tabs Customize Modal -->
<div class="modal fade tabs-customize" id="tabs-customize" tabindex="-1" role="dialog" aria-labelledby="tabs-customize-label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header choose-color-scheme">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Choose Color Scheme</h4>
            </div>

            <div class="modal-body campaign-wizard">
                <div class="tab-customize-content">

                </div>
                <div class='setting-tab-cont'>
                    {!! Form::hidden('customize_tab_id', null ) !!}
                    {!! Form::hidden('customize_tab_type', null ) !!}
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
                    <div class='vt-option-setting-container'>
                        
                        <div class="row form__nhse">
                           <div class="col-md-3 form-group">
                             <input type="text" class="form-control"  name="tab_title_one" placeholder="Send a" value="Send a">
                           </div>
                            <div class="col-md-3 form-group">
                             <input type="text" class="form-control" name="tab_title_two" placeholder="Video Or" value="Video Or">
                           </div>
                            <div class="col-md-3 form-group">
                             <input type="text" class="form-control" name="tab_title_three" placeholder="Voice Message" value="Voice Message">
                           </div>
                            <div class="col-md-3 form-group">
                             <div class='buttons'>
                            <a class='btn btn-primary change_tab_text_btn' role='button'>Change text</a>
                            </div>
                           </div>
                        </div>
                        
                       
                       
                       
                       
                    </div>
                </div>
            </div>

            <div class="modal-footer">
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
                            
                            
                            
                            
                            <div class="wizard">
                                <!---1--->
                                <div data-title="Template" class="wizardPanel">   
                                   <div class="wrpa_form_cl">
                              <div class="row">
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Main Headline Text</label>
                                    {!! Form::text('widget_main_headline', null , [ 'class' => 'form-control widget_main_headline custom-control' , 'placeholder' => 'Enter Your Headline Text Here...' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Voice Headline Text</label>
                                    {!! Form::text('widget_voice_headline', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Voice Headline Text Here...' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Video Headline Text</label>
                                    {!! Form::text('widget_video_headline', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Video Headline Text Here...' ]) !!}
                                </div>
                            </div>
                                <hr>
                                       <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div> 
                                </div> 
                                <!---2--->
                                <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template One</h5>
                                 <div class="row">
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    {!! Form::text('one1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record Your' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                             
                                  {!! Form::text('one2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Voice Message' ]) !!}
                              </div>
                              <div class="col-md-4 col-sm-12 col-xs-12">
                           
                                {!! Form::text('one3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                            </div>
                          </div>
                                
                        <div class="row">
                                      
                            <div class="col-md-4 col-sm-12 col-xs-12">
                           
                                {!! Form::text('one4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record Your' ]) !!}
                            </div>
                            <div class="col-md-4 col-sm-12 col-xs-12">
                         
                              {!! Form::text('one5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Video Message' ]) !!}
                          </div>
                          <div class="col-md-4 col-sm-12 col-xs-12">
                       
                            {!! Form::text('one6', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                        </div>   
                        </div>  
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                          </div> 
                                </div>
                                <!---3--->
                                  <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template Two</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Sub Heading ...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Is Your Microphone On?' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Listen' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>   
                                  </div>
                                <!---4--->
                                <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                <h5>Template Three</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Speak into your microphone!' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Recording' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Max recording duration' ]) !!}
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Begin Recording' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>
                                </div>
                                <!---5--->
                                <div data-title="Template" class="wizardPanel">
                                     <div class="wrpa_form_cl">
                                <h5>Template Four</h5>
                          <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                            {!! Form::text('four1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                        </div>
                    </div>
                                 <hr>
                                          <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---6--->
                                 <div data-title="Template" class="wizardPanel">
                                   <div class="wrpa_form_cl">
                                <h5>Template Five</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                        <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div> 
                                </div>
                                <!---7--->
                                 <div data-title="Template" class="wizardPanel">
                                        <div class="wrpa_form_cl">
                                <h5>Template Six</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Is Your Microphone And Webcam On?' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Preview' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six6', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>
                                </div>
                             <hr>
                                             <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---8--->
                                 <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                <h5>Template Seven</h5>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                        {!! Form::text('seven1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                </div>
                                <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---9--->
                                 <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                          <h5>Template Eight</h5>
                                          <div class="row">
                                              <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                                  {!! Form::text('eight1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                              </div>
                                          </div>
                                          <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                                      </div>
                                </div>
                                <!---10--->
                                 <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template Nine</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('nine1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                       
                                        {!! Form::text('nine2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---11--->
                                <div data-title="Template" class="wizardPanel">
                                     <div class="wrpa_form_cl">
                                <h5>Template Nine</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('nine1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                       
                                        {!! Form::text('nine2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                          <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---12--->
                                <div data-title="Complete" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Success Message</h5>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                        {!! Form::text('ty_msg', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Your Message has been sent!' ]) !!}
                                    </div>

                                </div>
                                
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                                 <hr>
                            </div>
                              
                                </div>
                            </div>


                            
                            
                  
                  
                         
                      </div> 
                     
                    
                     <!--BTN-->        
                           
                            
                            
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
        <iframe id="widget-preview-popup1" style="visibility: hidden;" class="widgets-iframe widgets-iframe-in-popup" src="/widgets/{!! $widget->widget_design !!}/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}" onload="removeScripts(this.id)"></iframe>
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
                            
                                   
                            <div class="wizard">
                                <!---1--->
                                <div data-title="Template" class="wizardPanel">   
                                   <div class="wrpa_form_cl">
                              <div class="row">
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Main Headline Text</label>
                                    {!! Form::text('widget_main_headline', null , [ 'class' => 'form-control widget_main_headline custom-control' , 'placeholder' => 'Enter Your Headline Text Here...' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Voice Headline Text</label>
                                    {!! Form::text('widget_voice_headline', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Voice Headline Text Here...' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Video Headline Text</label>
                                    {!! Form::text('widget_video_headline', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Video Headline Text Here...' ]) !!}
                                </div>
                            </div>
                                <hr>
                                       <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div> 
                                </div> 
                                <!---2--->
                                <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template One</h5>
                                 <div class="row">
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    {!! Form::text('one1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record Your' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                             
                                  {!! Form::text('one2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Voice Message' ]) !!}
                              </div>
                              <div class="col-md-4 col-sm-12 col-xs-12">
                           
                                {!! Form::text('one3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                            </div>
                          </div>
                                
                        <div class="row">
                                      
                            <div class="col-md-4 col-sm-12 col-xs-12">
                           
                                {!! Form::text('one4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record Your' ]) !!}
                            </div>
                            <div class="col-md-4 col-sm-12 col-xs-12">
                         
                              {!! Form::text('one5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Video Message' ]) !!}
                          </div>
                          <div class="col-md-4 col-sm-12 col-xs-12">
                       
                            {!! Form::text('one6', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                        </div>   
                        </div>  
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                          </div> 
                                </div>
                                <!---3--->
                                  <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template Two</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Sub Heading ...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Is Your Microphone On?' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Listen' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>   
                                  </div>
                                <!---4--->
                                <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                <h5>Template Three</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Speak into your microphone!' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Recording' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Max recording duration' ]) !!}
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Begin Recording' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>
                                </div>
                                <!---5--->
                                <div data-title="Template" class="wizardPanel">
                                     <div class="wrpa_form_cl">
                                <h5>Template Four</h5>
                          <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                            {!! Form::text('four1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                        </div>
                    </div>
                                 <hr>
                                          <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---6--->
                                 <div data-title="Template" class="wizardPanel">
                                   <div class="wrpa_form_cl">
                                <h5>Template Five</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                        <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div> 
                                </div>
                                <!---7--->
                                 <div data-title="Template" class="wizardPanel">
                                        <div class="wrpa_form_cl">
                                <h5>Template Six</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Is Your Microphone And Webcam On?' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Preview' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six6', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>
                                </div>
                             <hr>
                                             <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---8--->
                                 <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                <h5>Template Seven</h5>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                        {!! Form::text('seven1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                </div>
                                <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---9--->
                                 <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                          <h5>Template Eight</h5>
                                          <div class="row">
                                              <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                                  {!! Form::text('eight1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                              </div>
                                          </div>
                                          <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                                      </div>
                                </div>
                                <!---10--->
                                 <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template Nine</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('nine1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                       
                                        {!! Form::text('nine2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---11--->
                                <div data-title="Template" class="wizardPanel">
                                     <div class="wrpa_form_cl">
                                <h5>Template Nine</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('nine1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                       
                                        {!! Form::text('nine2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                          <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---12--->
                                <div data-title="Complete" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Success Message</h5>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                        {!! Form::text('ty_msg', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Your Message has been sent!' ]) !!}
                                    </div>

                                </div>
                                
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                                 <hr>
                            </div>
                              
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
                                  
                            <div class="wizard">
                                <!---1--->
                                <div data-title="Template" class="wizardPanel">   
                                   <div class="wrpa_form_cl">
                              <div class="row">
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Main Headline Text</label>
                                    {!! Form::text('widget_main_headline', null , [ 'class' => 'form-control widget_main_headline custom-control' , 'placeholder' => 'Enter Your Headline Text Here...' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Voice Headline Text</label>
                                    {!! Form::text('widget_voice_headline', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Voice Headline Text Here...' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    <label>Video Headline Text</label>
                                    {!! Form::text('widget_video_headline', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Video Headline Text Here...' ]) !!}
                                </div>
                            </div>
                                <hr>
                                       <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div> 
                                </div> 
                                <!---2--->
                                <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template One</h5>
                                 <div class="row">
                                <div class="col-md-4 col-sm-12 col-xs-12">
                                    {!! Form::text('one1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record Your' ]) !!}
                                </div>
                                <div class="col-md-4 col-sm-12 col-xs-12">
                             
                                  {!! Form::text('one2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Voice Message' ]) !!}
                              </div>
                              <div class="col-md-4 col-sm-12 col-xs-12">
                           
                                {!! Form::text('one3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                            </div>
                          </div>
                                
                        <div class="row">
                                      
                            <div class="col-md-4 col-sm-12 col-xs-12">
                           
                                {!! Form::text('one4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record Your' ]) !!}
                            </div>
                            <div class="col-md-4 col-sm-12 col-xs-12">
                         
                              {!! Form::text('one5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Video Message' ]) !!}
                          </div>
                          <div class="col-md-4 col-sm-12 col-xs-12">
                       
                            {!! Form::text('one6', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                        </div>   
                        </div>  
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                          </div> 
                                </div>
                                <!---3--->
                                  <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template Two</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Sub Heading ...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Is Your Microphone On?' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Listen' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('two5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>   
                                  </div>
                                <!---4--->
                                <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                <h5>Template Three</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Speak into your microphone!' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Recording' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Max recording duration' ]) !!}
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('three4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Begin Recording' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>
                                </div>
                                <!---5--->
                                <div data-title="Template" class="wizardPanel">
                                     <div class="wrpa_form_cl">
                                <h5>Template Four</h5>
                          <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                            {!! Form::text('four1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                        </div>
                    </div>
                                 <hr>
                                          <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---6--->
                                 <div data-title="Template" class="wizardPanel">
                                   <div class="wrpa_form_cl">
                                <h5>Template Five</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('five4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                        <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div> 
                                </div>
                                <!---7--->
                                 <div data-title="Template" class="wizardPanel">
                                        <div class="wrpa_form_cl">
                                <h5>Template Six</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Is Your Microphone And Webcam On?' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six3', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Start Recording' ]) !!}
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six4', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six5', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Preview' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                        {!! Form::text('six6', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Send' ]) !!}
                                    </div>
                                </div>
                             <hr>
                                             <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---8--->
                                 <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                <h5>Template Seven</h5>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                        {!! Form::text('seven1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Record' ]) !!}
                                    </div>
                                </div>
                                <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---9--->
                                 <div data-title="Template" class="wizardPanel">
                                      <div class="wrpa_form_cl">
                                          <h5>Template Eight</h5>
                                          <div class="row">
                                              <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                                  {!! Form::text('eight1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                              </div>
                                          </div>
                                          <hr>
                                           <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                                      </div>
                                </div>
                                <!---10--->
                                 <div data-title="Template" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Template Nine</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('nine1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                       
                                        {!! Form::text('nine2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                         <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---11--->
                                <div data-title="Template" class="wizardPanel">
                                     <div class="wrpa_form_cl">
                                <h5>Template Nine</h5>
                                <div class="row">
                                    <div class="col-md-4 col-sm-12 col-xs-12">

                                        {!! Form::text('nine1', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Sub Headline Text Here...' ]) !!}
                                    </div>
                                    <div class="col-md-4 col-sm-12 col-xs-12">
                                       
                                        {!! Form::text('nine2', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Enter Your Term Text Here...' ]) !!}
                                    </div>
                                </div>
                                 <hr>
                                          <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                            </div>  
                                </div>
                                <!---12--->
                                <div data-title="Complete" class="wizardPanel">
                                    <div class="wrpa_form_cl">
                                <h5>Success Message</h5>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                        {!! Form::text('ty_msg', null , [ 'class' => 'form-control custom-control' , 'placeholder' => 'Your Message has been sent!' ]) !!}
                                    </div>

                                </div>
                                
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0 15px !important;">
                                       <div class="here__button">
                                        <button class="btn btn-primary save-template-text">Save</button>
                                    </div>
                                    </div>    
                                </div>
                                 <hr>
                            </div>
                              
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

<script src='/assets/js/spectrum.js'></script>
<link rel='stylesheet' href='/assets/css/spectrum.css' />
<style type="text/css">
    .live_preview .tabs-iframe, .live_preview .widgets-iframe { width:178%\9; }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        .live_preview .tabs-iframe, .live_preview .widgets-iframe { width:178%; }
    }
</style>

<script>
 $(".wizard").each(function() {
  var index = 0;
  var wizard = $(this);

  $(wizard).prepend('<div class="wizardProgress"></div>');
  $(wizard).prepend('<div class="header"></div>');
  $(wizard).addClass("loadingparent");
  $(wizard).prepend('<div class="loading center"></div>');
  $(wizard)
    .find(".wizardPanel")
    .each(function() {
      $(wizard)
        .find(".wizardProgress")
        .append("<div>" + $(this).data("title") + "</div>");
    });

  $(wizard)
    .find(".wizardProgress div")
    .click(function() {
      selectPanel($(this).index());
    });

  $(wizard).append(
    '<div class="footer"><button id="btnPrev" class="btn btn-default">Prev</button><button id="btnNext" class="btn btn-primary">Next</button></div>'
  );

  $(wizard)
    .find("#btnPrev")
    .click(function() {
      selectPanel($(".wizardProgress .selected").index() - 1);
    });
  $(wizard)
    .find("#btnNext")
    .click(function() {
      selectPanel($(".wizardProgress .selected").index() + 1);
    });

  selectPanel(0);

  function selectPanel(index) {
    $(wizard)
      .find(".loading")
      .fadeIn();
    setTimeout(function() {
      $(wizard)
        .find(".loading")
        .fadeOut();

      if (index == 0) {
        $(wizard)
          .find("#btnPrev")
          .fadeOut();
      } else {
        $(wizard)
          .find("#btnPrev")
          .fadeIn();
      }

      if (index == $(".wizardProgress div").length - 1) {
        $(wizard)
          .find("#btnNext")
          .fadeOut();
      } else {
        $(wizard)
          .find("#btnNext")
          .fadeIn();
      }

      $(".wizardProgress .selected").removeClass("selected");
      var selectedTab = $(".wizardProgress div").get(index);
      $(selectedTab).addClass("selected");

      $(".wizardPanel").slideUp();
      var selectedPanel = $(wizard)
        .find(".wizardPanel")
        .get(index);
      $(selectedPanel).slideDown();
    }, 2000);
  }
});
</script>    
    




@endsection