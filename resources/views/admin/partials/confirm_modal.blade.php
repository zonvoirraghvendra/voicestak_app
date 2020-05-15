<div id="deleteModal" class="modal fade" role="dialog" style="margin: 10% 30%">
    <div class="modal-content">
        <div class="modal-header">
            <i class="close icon"></i>
            DELETE CONFIRM
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
            <p> Do you really want to delete user? </p>
        </div>
        <div class="modal-footer">
            <a href="#" id="deleteConfirm">
                <div class="btn btn-danger" style="float: right;margin-left: 10px;"> OK </div>
            </a>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>

<script >
    $(document).on('ready', function(){
        $('.destroy').click(function(){
            $('#deleteConfirm').attr("href", $(this).data('href') );
        });
    });
</script>