<div class="row progress-titles">
    <div class="col-md-4 col-sm-4 col-xs-4 text-center @if($percent==33) active-title @endif"><a href="/widgets/{{$campaign->id}}/wizard-appearance/{{$widget->id}}">Appearance</a></div>
    <div class="col-md-4 col-sm-4 col-xs-4 text-center @if($percent==66) active-title @endif"><a href="/widgets/{{$campaign->id}}/wizard-integration/{{$widget->id}}">Form Builder & Integration</a></div>
    <div class="col-md-4 col-sm-4 col-xs-4 text-center @if($percent==100) active-title @endif"><a href="/widgets/{{$campaign->id}}/wizard-embed/{{$widget->id}}">Embed Code</a></div>
</div>
<div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: {{$percent}}%">
        <span class="sr-only">{{$percent}}% Complete (success)</span>
    </div>
</div>