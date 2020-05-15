<div class='vt-sms-tab'>
    <div class='vt-content'>
        <div class='vt-sms-title'>
            <div class='vt-user-details'>
                <label>
                    <i class='glyphicon glyphicon-send'></i>
                    <small>
                        Sent to {{$personalMessage->users_count}} users
                    </small>
                </label>
            </div>
        </div>
        <div class='vt-sms-stats-container'>
            <div class='vt-sms-stats'>
                <div class='row'>
                    <div class='col-md-4 stats'>
                        <label>
                            <i class='glyphicon glyphicon-calendar'></i>
                            <small>{{$personalMessage->created_at}}</small>
                        </label>
                    </div>
                    <div class='col-md-4 stats'>
                        <label>
                            <small>
                                campaign:
                                <b>{{$personalMessage->campaign->name}}</b>
                            </small>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class='vt-sms-box-controller'>
    	    <form action="/personal-messages/{!! $personalMessage->id !!}" method="POST">
    	        <input type="hidden" name="_token" value="{{ csrf_token() }}">
    	        <input type="hidden" name="_method" value="DELETE">
    	        <a class='btn btn-danger' data-target='#removeModal{!! $personalMessage->id !!}' data-toggle='modal' href=''>
    	        	<span class='glyphicon glyphicon-trash'></span>
    	        </a>

    		    <div aria-hidden='true' aria-labelledby='myModalLabel' class='modal fade' id='removeModal{!! $personalMessage->id !!}' role='dialog' tabindex='-1'>
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
        <div class='vt-sms-message'>
            <div class='row'>
                <div class='col-md-12'>
                    <label>
                        <small>
                            <i class='glyphicon glyphicon-envelope'></i>
                            {{$personalMessage->text}}
                        </small>
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>