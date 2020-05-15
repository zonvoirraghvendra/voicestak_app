<div class="vt-campaign-list fluid">
    <div class="vt-horizontal-title">
        <h5 class="new">
            No widgets found on this Campaign
        </h5>
        <div class="buttons">
            <a href="{{ url('/widgets/'.$campaign_id.'/wizard-appearance') }}" class="btn btn-success btn-sm">
                <i class="glyphicon glyphicon-plus"></i>
                ADD WIDGET
            </a>
            <small>
                or
            </small>
            <form action="/campaigns/{!! $campaign_id !!}" method="POST" class="delete-form-in-page">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="_method" value="DELETE">
                <a class='btn btn-danger btn-sm' data-target='#removeModal{!! $campaign_id !!}' data-toggle='modal' href=''>
                    <i class="glyphicon glyphicon-remove"></i>
                    <span>DELETE CAMPAIGN</span>
                </a>
                <div aria-hidden='true' aria-labelledby='myModalLabel' class='modal fade' id='removeModal{!! $campaign_id !!}' role='dialog' tabindex='-1'>
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
            <div aria-hidden="true" aria-labelledby="myModalLabel" class="modal fade" id="removeCampaign1" role="dialog" tabindex="-1">
                <div class="modal-dialog modal-default center">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p class="warning alert alert-warning">
                                <i class="glyphicon glyphicon-warning-sign"></i>
                                Are you sure you want to delete this Campaign?
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-danger btn-sm" type="submit">Delete</button>
                            <button class="btn btn-default btn-sm" data-dismiss="modal" type="button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>