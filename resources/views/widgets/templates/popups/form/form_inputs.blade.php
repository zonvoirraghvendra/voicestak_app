@if(isset($widget) && !empty($widget->first_name_field_active) )
    <div class="text-field">
        @if(!empty($widget->first_name_field_value) && $widget->provider_type == 'raw-html')
            <input class='inputs' name="{!! $widget->first_name_field_value !!}" type="text" @if(isset($widget->first_name_field_key) && $widget->first_name_field_key != "") placeholder="{{$widget->first_name_field_key}}" @else placeholder="Name" @endif @if($widget->first_name_field_required) required  @endif >
        @else
            <input class='inputs' name="name" type="text" @if(isset($widget->first_name_field_key) && $widget->first_name_field_key != "") placeholder="{{$widget->first_name_field_key}}" @else placeholder="Name" @endif @if(!empty($widget->first_name_field_required)) required  @endif  >
        @endif
    </div>
@endif

@if(isset($widget) && !empty($widget->email_field_active) )
    <div class="text-field email">
        @if(!empty($widget->email_field_value) && $widget->provider_type == 'raw-html')
            <input class='inputs' name="{!! $widget->email_field_value !!}" type="email" @if(isset($widget->email_field_key) && $widget->email_field_key != "") placeholder="{{$widget->email_field_key}}" @else placeholder="Email" @endif @if($widget->email_field_required) required @endif >
        @else
            <input class='inputs' name="email" type="email" @if(isset($widget->email_field_key) && $widget->email_field_key != "") placeholder="{{$widget->email_field_key}}" @else placeholder="Email" @endif @if(!empty($widget->email_field_required)) required @endif >
        @endif
    </div>
@endif

@if(isset($widget) && !empty($widget->phone_field_active) && $widget->phone_field_active == 1 )
    <div class="text-field">
        <input class='inputs' id="txtboxToFilter" name="phone" type="text" onkeypress="return isNumber(event)" @if(isset($widget->phone_field_key) && $widget->phone_field_key != "") placeholder="{{$widget->phone_field_key}}" @else placeholder="Phone" @endif @if(!empty($widget->phone_field_required)) required @endif >
    </div>
@endif

<script type="text/javascript">
    function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode == 43) {
            return true;
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }   
</script>