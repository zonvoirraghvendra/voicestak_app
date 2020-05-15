jQuery(document).ready(function ($) {
    //range slider initializer
    $('.input--range-slider').each(function () {
        var slider_options = $(this).data('options');
        slider_options['onChange'] = function (obj) {
            obj.input.change();
        };
        $(this).ionRangeSlider(slider_options);
    });

    //initialize imagepicker
    jQuery("select.image-picker").imagepicker({
        hide_select: true
    });

    //semantic ui initializer
    $('.ui.dropdown')
        .dropdown();
    $('.ui.checkbox')
        .checkbox();

    //initialize datepicker
    $('#date-start').on('change',function(){
        var $input = $('#date-end').pickadate()

        // Use the picker object directly.
        var picker = $input.pickadate('picker');
        picker.set('enable', true);
        picker.set('disable',[{ from: -10000 ,to: [moment($('#date-start').val()).get('year'),moment($('#date-start').val()).get('month'),moment($('#date-start').val()).get('date')] }]);

    });
    $('#date-end').on('change',function(){
        var $input1 = $('#date-start').pickadate()

        // Use the picker object directly.
        var picker1 = $input1.pickadate('picker');
        picker1.set('enable', true)
        picker1.set('disable',[{ from: [moment($('#date-end').val()).get('year'),moment($('#date-end').val()).get('month'),moment($('#date-end').val()).get('date')], to:10000}])
    });

    pickerstart = $('#date-start').pickadate({
        format: 'd mmmm yyyy',
        /*disable: [
            { from: [moment($('#date-end').val()).get('year'),moment($('#date-end').val()).get('month'),moment($('#date-end').val()).get('day')] , to:15}
        ]*/
    });
    pickerend = $('#date-end').pickadate({
        format: 'd mmmm yyyy',
        /*disable: [
            { from: -1000 ,to: [moment($('#date-start').val()).get('year'),moment($('#date-start').val()).get('month'),moment($('#date-start').val()).get('day')] }
        ]*/
    });

    //colorpicker initialize
    $('input[type=color]').each(function (index, element) {
        $(element).spectrum({
            color: $(element).attr('value'),
            showInput: true,
            move: function (tinycolor) {
                if ($(this).attr('name') &&
                    typeof project_preview_context().EditorObserver[$(this).attr('name')] !== 'undefined') {
                    project_preview_context().EditorObserver[$(this).attr('name')]($(this), tinycolor.toString());
                }
            },
            hide: function (tinycolor) {
                if ($(this).attr('name') &&
                    typeof project_preview_context().EditorObserver[$(this).attr('name')] !== 'undefined') {
                    project_preview_context().EditorObserver[$(this).attr('name')]($(this));
                }
            }
        });
    });

    $('.sidebar-toggle').click(function (event) {
        event.preventDefault();
        $('#sidebar').sidebar('toggle');
    });
    setTimeout(function () {
        $('#sidebar').sidebar('show');
    }, 1000);

    function previewImageOptionRefresh() {
        $('.preview-image-option').smoothZoom({
            // Options go here
        });
    }

    previewImageOptionRefresh();

    $('#form--campaign-create').submit(function (event) {
        event.preventDefault();

        $.post($(this).attr('action'), $(this).serializeArray(), function (response) {
            if (response.status == 1) {
                window.location.href = response.redirect_url;
            }
        }, 'json');
    });

    $('.js--campaign-create-submit').click(function () {
        $('#form--campaign-create').submit();
    });

    $('.js--confirm-project-deletion').click(function () {
        if (!confirm('Are you sure you want to delete this project?'))
            return false;
    });

    function get_field_index($field) {
        return $('[name="' + escape_selector_name($field.attr('name')) + '"]').index($field);
    }

    function escape_selector_name(selector_name) {
        return selector_name.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
    }

    //file upload
    $('#project-options').on('change', '.option__image :file', function () {
        if (!$(this).val())
            return;

        var file = this.files[0];
        var that = this;
        var name = file.name;
        var size = file.size;
        var type = file.type;

        var real_input = $(this).closest('.option__image').find('.option--image:input');
        var index = get_field_index(real_input);

        var formData = new FormData();
        formData.append('option_name', $(this).data('name'));
        formData.append('option_index', index);
        formData.append('file', file);
        $('#project-options').dimmer('show');
        $.ajax({
            url: site_url + '/project/save-image/' + project_id,  //Server script to process data
            type: 'POST',
            xhr: function () {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Check if upload property exists
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            $('progress').attr({value: e.loaded, max: e.total});
                        }
                    }, false); // For handling the progress of the upload
                }
                return myXhr;
            },
            //Ajax events
            //beforeSend: beforeSendHandler,
            success: function (result) {
                if (result && result.status == 'OK') {
                    real_input.val(result.message).trigger('change');
                }
            },
            complete: function () {
                $(that).val('');
            },
            //error: errorHandler,
            // Form data
            data: formData,
            cache: false,
            contentType: false,
            dataType: 'json',
            processData: false
        }).always(function () {
            $('.js--save-project-settings').click();
            $('#project-options').dimmer('hide');
        });
    });

    // update image preview for images
    $('.option--image').change(function () {
        $context = $(this).closest('.option');
        if ($(this).val()) {
            $context.find('.preview-image-option, .option--image_delete').show();
        } else {
            $context.find('.preview-image-option, .option--image_delete').hide();
        }
        $context.find('.preview-image-option').attr('href', updateQueryStringParameter($(this).val(), 'random', Math.random())).smoothZoom();
    });

    $(document).on('click', '.js--option-image-delete', function () {
        var that = this;
        var $project_options = $('#project-options');
        if (confirm('Are you sure you want to delete this image?')) {
            $project_options.dimmer('show');
            $.post(site_url + '/project/delete-image/' + project_id, {
                option_id: $(this).data('id')
            }, function (data) {
                $project_options
                    .dimmer('hide');
                $(that).parent().parent()
                    .find('[name="' + $(that).data('id') + '"]')
                    .val('')
                    .trigger('change');
            }, 'json');
        }
    });

    $('.js--media-select').click(function (event) {
        event.preventDefault();
        $('.sidebar-toggle').click();
        var $mml = $('.sidebar--media-library');
        $('#media-library-field-name').val($(this).data('name'));
        $('#mediaContainer').addClass('active');
        $('#videoContainer, #salesContainer').removeClass('active');
        /*
         $mml.sidebar({
         exclusive: false, overlay: false, onHide: function () {
         $('.sidebar-toggle').click();
         }
         }).sidebar('show');*/
        $.post(site_url + '/project/media-library', function (data) {
            $mml.find('.fetched-content').html(data);
        });
    });


    $('body').on('click', '.option--image-selection', function (event) {
        event.preventDefault();
        $.post(site_url + '/project/media-library-set/' + project_id, {
            category: $(this).data('category'),
            img: $(this).data('img'),
            option_name: $('#media-library-field-name').val()
        }, function (result) {
            $('#project-options').find('[name="' + $('#media-library-field-name').val() + '"]').val(result.message).trigger('change');
            $('body').removeClass('active-sidebar');
            $('#mediaLibrary, .boxscroll, .nicescroll-rails').removeClass('active');
        }, 'json');
    });

    $('.js--media-library-cancel').click(function () {
        $('body').removeClass('active-sidebar');
        $('#mediaLibrary').removeClass('active');
        $('.boxscroll').removeClass('active');
        $('.nicescroll-rails').removeClass('active');
    });

});

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

$(document).ready(function () {

    $('.js--delete-campaign').click(function (event) {
        event.stopPropagation();

        if (confirm('Are you sure you want to delete this project?' + "\n\n" + 'WARNING: This will remove all existing pages/videos under this project. This is a permanent operation.')) {
            $.post(site_url + '/campaign/delete/' + $(this).data('id'), {}, function (data) {
                if (data.status == 1)
                    window.location.reload();
                else
                    alert(data.message);
            }, 'json');
        }
    });

    $('.js--campaign-create').click(function () {
        $('.addNewProjectModal').modal('show');
        return false;
    });

    $(document).on("click", ".addNewEITab", function () {
        $('.addNewEITabModal').modal('show');

        return false;
    });

    $(document).on("click", ".addNewConversion", function () {
        $('.addNewConversionModal').modal('show');
        return false;
    });

    $(document).ready(function () {
        $('.ei-list .projectTitle').click(function (event) {
            event.stopPropagation();
            return false;
        });
        $('.video-list .projectTitle').click(function (event) {
            event.stopPropagation();
            $(this).parent().parent().toggleClass("active");
            $(this).parent().find('.projectContent').slideToggle("fast");
        });
    });

    $(document).ready(function () {
        $('.secondary.menu > li').click(function (event) {
            event.stopPropagation();
            $(this).toggleClass("open-nav");
        });
        $(".secondary.menu").on("click", function (event) {
            event.stopPropagation();
        });
    });

    $(document).on("click", function () {
        $(".secondary.menu > li").removeClass("open-nav");
    });

    $('.pp--header--projectName').on('keyup', function (event) {
        var valProjectName = $(this).text();
        console.log(valProjectName);
        $('#project-name').val(valProjectName);
    });

});