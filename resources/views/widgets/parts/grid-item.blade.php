<div class='vt-campaign-box'>
    <div class='vt-campaign-box-image'>
        <div class='vt-image-main'>
            @if($widget->widget_design)
                <img src="/assets/img/popup-{{$widget->widget_design}}/popup-{{$widget->widget_design}}.png" alt="Widget Design"/>
            @endif
        </div>
    </div>
    <div class='vt-image-logos'>
        <ul class="grid-providers-ul">
            @if(isset($widget->email_provider) && $widget->email_provider !== "")
                <li>
                    <a class='show-tooltip' data-placement='top' data-toggle='tooltip' title='{{$widget->email_provider}}'>
                        <img src="/assets/img/{{$widget->email_provider}}.png" title="{{$widget->email_provider}}" alt="">
                    </a>
                </li>
            @endif
            @if(isset($widget->sms_provider) && $widget->sms_provider !== "")
                <li>
                    <a class='show-tooltip' data-placement='top' data-toggle='tooltip' title='{{$widget->sms_provider}}'>
                        <img src="/assets/img/{{$widget->sms_provider}}.png" title="{{$widget->sms_provider}}" alt="">
                    </a>
                </li>
            @endif
        </ul>
    </div>
    <div class='vt-content'>
        <div class='vt-campaign-title grid-widget-title'>
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
                <a class='btn btn-warning' data-toggle="modal" data-target="#integration-modal{{ $widget->id }}" title='Embed'>
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
                

                <a class='btn btn-danger' data-target='#removeModal{{$widget->id}}' data-toggle='modal' href='' title='Delete'>
                    <span class='glyphicon glyphicon-trash'></span>
                </a>
                
                <div class="modal fade" id="removeModal{{$widget->id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                          <div class="modal-body">
                            Are you sure?
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                          </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal fade integration-modal" id="integration-modal{{ $widget->id }}" tabindex="-1" role="dialog" aria-labelledby="integration-modal-label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title t" id="myModalLabel">Copy embed code</h4>
                    </div>
                    <div class="modal-body">
                        @if(isset($widget) && $widget->tab_design != '' && $widget->widget_design != '' && $widget->type != '' && $widget->embed_code != '' )
                            {!! Form::textarea('embed_code', htmlentities($widget->embed_code) , [ 'class' => 'form-control no-resize embed-modal', 'id' => 'embed_code'.$widget->id, 'rows' => 12 ]) !!}
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