<div class='vt-campaign-tab'>
    <div class='vt-campaign-box-image'>
        <div class='vt-image-main'>
            @if($widget->widget_design)
                <img src="/assets/img/popup-{{$widget->widget_design}}/popup-{{$widget->widget_design}}.png" alt="Widget Design"/>
            @endif
        </div>
    </div>

    <div class='vt-image-logos'>
        <ul>
            @if(isset($widget->email_provider) && $widget->email_provider == "" && isset($widget->sms_provider) && $widget->sms_provider == "")
                <li class="no-providers">No Providers</li>
            @else
                @if(isset($widget->email_provider) && $widget->email_provider !== "")
                    <li class="email-provider">
                        <a title='{{$widget->email_provider}}'>
                            <img src="/assets/img/{{$widget->email_provider}}.png" title="{{$widget->email_provider}}" alt="">
                        </a>
                    </li>
                @endif
                @if(isset($widget->sms_provider) && $widget->sms_provider !== "")
                    <li class="sms-provider">
                        <div title='{{$widget->sms_provider}}'>
                            <img src="/assets/img/{{$widget->sms_provider}}.png" title="{{$widget->sms_provider}}" alt="">
                        </div>
                    </li>
                @endif
            @endif
        </ul>
    </div>

    <div class='vt-content'>
        <div class='vt-campaign-title list-widget-title'>
            <h4>
                {{ $widget->widget_name }} ({{ $widget->id }})
                @if($widget->is_complete == 0)
                    <span title="Widget is not completely filled" class="glyphicon glyphicon-exclamation-sign widget-is-complete-icon"></span>
                @endif
            </h4>
          </div>
        <div class='vt-campaign-stats-container'>
            <span>
                Past 30 Days
            </span>
            <div class='vt-campaign-stats'>
                <div class='row'>
                    <div class='col-md-4 stats'>
                        <label>
                            Feedback
                        </label>
                        <span>{!! $widget->widgetFeedbacks->count() !!}</span>
                    </div>
                    <div class='col-md-4 stats'>
                        <label>
                            Optins
                        </label>
                        <span>{!! $widget->widgetOptins->count() !!}</span>
                    </div>
                    <div class='col-md-4 stats'>
                        <label>
                            Clicks
                        </label>
                        <span>{!! $widget->widgetClicks->count() !!}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class='vt-campaign-box-controller'>
            <form action='/widgets/{!! $widget->id !!}' method='post'>
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="_method" value="DELETE">
                <a class='btn btn-warning' data-target='#integration-list-modal{{ $widget->id }}' data-toggle='modal' title='Embed Code'>
                    <span class='glyphicon glyphicon-link'></span>
                </a>
                
                @if( Auth::user()->edit_widgets == 1 )
                <a href="{{ url('widgets/'.$widget->campaign->id.'/wizard-appearance/'.$widget->id) }}" class='btn btn-primary' title='Edit'>
                    <span class='glyphicon glyphicon-edit'></span>
                </a>
                @endif
                
                {{-- @if( Auth::user()->role == "user" )
                    <a href="{{ url('widgets/'.$widget->campaign->id.'/wizard-appearance/'.$widget->id) }}" class='btn btn-primary' title='Edit'>
                        <span class='glyphicon glyphicon-edit'></span>
                    </a>
                @endif
                @foreach(Auth::user()->permissions()->get() as $permission)
                    @if($permission->name == 'edit-widget')
                        <a href="{{ url('widgets/'.$widget->campaign->id.'/wizard-appearance/'.$widget->id) }}" class='btn btn-primary' title='Edit'>
                            <span class='glyphicon glyphicon-edit'></span>
                        </a>
                    @endif
                @endforeach --}}
                
                @if( Auth::user()->is_premium == 1 )
                <a class='btn btn-danger' data-target='#removeModalList{{$widget->id}}' data-toggle='modal' title='Delete'>
                    <span class='glyphicon glyphicon-trash'></span>
                </a>
                @endif
                
                <div aria-hidden='true' aria-labelledby='myModalLabel' class='modal fade' id='removeModalList{{$widget->id}}' role='dialog' tabindex='-1'>
                    <div class='modal-dialog modal-sm'>
                        <div class='modal-content'>
                            <div class='modal-body'>
                                Are you sure?
                            </div>
                            <div class='modal-footer'>
                                <button class='btn btn-default btn-sm' data-dismiss='modal' type='button'>Cancel</button>
                                <button class='btn btn-danger btn-sm' type='submit'>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
        <div class="modal fade integration-list-modal" id="integration-list-modal{{ $widget->id }}" tabindex="-1" role="dialog" aria-labelledby="integration-list-modal-label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title t" id="myModalLabel">Copy embed code</h4>
                    </div>
                    <div class="modal-body">
                        @if(isset($widget) && $widget->tab_design != '' && $widget->widget_design != '' && $widget->type != '' && $widget->embed_code != '' )
                            {!! Form::textarea('embed_code_list', htmlentities($widget->embed_code) , [ 'class' => 'form-control no-resize', 'id' => 'embed_code_list'.$widget->id, 'rows' => 12 ]) !!}
                            {!! Form::label('note', 'To use this code in your site you must have attached JQuery. If you don\'t have JQuery in your site select this checkbox!!!', ['class' => 'label label-danger jquery-label']) !!}
                            <div class="attach-jquery attach-jquery-widgets">
                                {!! Form::checkbox('add_jquery_list', 1, false, ['class' => 'add_jquery_list'.$widget->id, 'id' => 'add_jquery_list'.$widget->id, 'onchange' => 'addJQueryList('.$widget->id.')']) !!}
                                {!! Form::label('Attach JQuery') !!}
                            </div>
                        @else
                            {!! Form::label('note1', 'Please complete all steps to get embed code!', ['class' => 'label label-danger jquery-label']) !!}
                        @endif
                    </div>
                    <script type="text/javascript">
                        $("#embed-modal").focus(function() {
                            var $this = $(this);
                            $this.select();

                            // Work around Chrome's little problem
                            $this.mouseup(function() {
                                // Prevent further mouseup intervention
                                $this.unbind("mouseup");
                                return false;
                            });
                        });
                    </script>
                    <div class="modal-footer">
                        <a class="embed-copy btn btn-default button">Copy</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function(){
        $('.simple_tooltip').tooltip();
    })
</script>