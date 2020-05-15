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
                <div class="view-steps-img-container" style="background: url('/assets/img/tabs-2/video/{!! $i !!}.png') right top no-repeat; background-size: auto 100%;"></div>
                @else
                <div class="view-steps-img-container" style="background: url('/assets/img/tabs-2/video/{!! $i !!}.png') right top no-repeat; background-size: 100% auto;"></div>
                @endif

            </label>
            <a class="btn btn-xs btn-success tab-customize" data-toggle="modal" data-target="#tabs-customize">Customize</a>
        </div>
        @endfor
    </div>
</div>

<div class="row footer-tab-designs hidden">
<!-- <div class="col-md-12 col-sm-12 col-xs-12 choose-widget-design">
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
</div> -->
</div>