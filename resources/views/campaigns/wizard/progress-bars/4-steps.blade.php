<div class="row progress-titles">
    <div class="col-md-3 col-sm-3 col-xs-3 text-center @if($percent==25) active-title @endif">Campaign Details</div>
    <div class="col-md-3 col-sm-3 col-xs-3 text-center @if($percent==50) active-title @endif">Appearance</div>
    <div class="col-md-3 col-sm-3 col-xs-3 text-center @if($percent==75) active-title @endif">Form Builder & Integration</div>
    <div class="col-md-3 col-sm-3 col-xs-3 text-center @if($percent==100) active-title @endif">Embed Code</div>
</div>
<div class="progress">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: {{$percent}}%">
        <span class="sr-only">{{$percent}}% Complete (success)</span>
    </div>
</div>