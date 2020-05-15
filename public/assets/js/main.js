var arr = [];
var stat = 0;
$( document ).ready(function() {

    $('.removeAttention').on('click', function() {
        document.getElementById('attention').style.display = 'none';
    })

    $('.deleteSelectedMessages').on('click', function() {
        $.post('/messages/delete-collection', {data: arr, status: stat}, function(data) {
            location.reload();
        });
    })

    $('.messageCheckbox').on('change', function() {
        $('.deleteSelectedMessages').show();
    })

    $('.widgetsSelect').on('change', function(){
        $.get('/personal-messages?widget_id='+$('.widgetsSelect option:selected').val(),
            function( data ){
                $('.senderPhone').val(data);
            }
        );
    })

    function removeNew( message ) {
        alert(message);
        $(message).html('');
    }

    $.get('/unread-messages-count', function( data ) {
        if(data == 0 ) {
            $('#unreadMessages').addClass('zero');
            $('#unreadMessages').html('0');
        } else {
            $('#unreadMessages').html( data );
        }
    });

    $('.campaign-select').on('change', function() {
        $.get('/widgets/get-widgets-by-campaign?campaign_id='+$('.campaign-select option:selected').val(),
            function( data ) {
                $('.widgetsSelect').find('option').remove().end();
                $('.widgetsSelect').append('<option value="0" selected="selected">Choose Widget</option>');
                $.each(data, function (i, item) {
                    $('.widgetsSelect').append($('<option>', {
                        text : item.widget_name,
                        value: item.id
                    }));
                });
            }
        );
    })

    markMessageAsRead = function( message , id ) {
        $(message).parents('.message_cont').find(' .messageCircle ').css('background-color', 'transparent');
        
        $.post('/messages/mark-message-as-read',{ message_id:id });
        setTimeout( function() {
            $.get('/unread-messages-count', function( data ){
                $('#unreadMessages').html( data );
            })
        },500 );
    };

    if(!$('.create_ticket').prop("checked")) {
        $('.helpdesk_email').prop('disabled', true);
    }

    $('.create_ticket').on('change', function() {
        if ( $(this).prop("checked") ) {
            $('.helpdesk').show();
            $('.helpdesk_email').prop('disabled', false);
        } else {
            $('.helpdesk').hide();
            $('.helpdesk_email').prop('disabled', true);
            $('.helpdesk_email').val('');
        }
    });

    if(!$('.notification').prop("checked")) {
        $('.hideSMS').hide();
    }

    $('.notification').on('change', function() {
        if ( $(this).prop("checked") ) {
            $('.hideSMS').show(1);
        } else {
            $('.hideSMS').hide(1);
        }
    });

    if($('#first_name_field_active').prop("checked")) {
        $('#first_name_field_key').prop('disabled', false);
        $('#email_field_key').prop('disabled', false);
    }

    $('.first_name_field_active').on('change', function() {
        var checkBox = document.getElementById('first_name_field_active');

        if (checkBox.checked) {
            $('#first_name_field_key').prop('disabled', false);
            $('#email_field_key').prop('disabled', false);
            $('.email_field_active').prop('checked', true);
        } else {
            $('#first_name_field_key').prop('disabled', true);
            $('#email_field_key').prop('disabled', true);
            $('.email_field_active').prop('checked', false);
        }
    })

    if($('#first_name_field_active').prop("checked")) {
        $('#phone_field_key').prop('disabled', false);
    }

    $('.phone_field_active').on('change', function() {
        var checkBox = document.getElementById('phone_field_active');

        if (checkBox.checked) {
            $('#phone_field_key').prop('disabled', false);
        } else {
            $('#phone_field_key').prop('disabled', true);
        }
    })

    $(".send_email").on("change", function() {
        var checkBox = document.getElementById('send_email');
        var div      = document.getElementById('email_input');

        if (checkBox.checked) {
            $('.mail_fields').show();
            $('.mail_hr').show();
            $('#add_field_for_email').show();
        } else {
            $('.mail_fields').hide();
            $('.mail_hr').hide();
            $('#add_field_for_email').hide();
        }

    })

    $('#listen-back').on('click', function() {
        /*console.log($('#message_length').text());*/
    })

    $('.add_jquery').on('change', function() {
        var checkBox = document.getElementById('add_jquery');
        var jQueryLink = "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>";
        if (checkBox.checked)
            $('.embed_code').val(jQueryLink+$('.embed_code').val());
        else
            $('.embed_code').val($('.embed_code').val().replace(jQueryLink, ""));
    })

    $('.embed_code').on('click', function() {
        $('.embed_code').select();
    })

    var client = new ZeroClipboard( $(".copy_embed") );
    client.on( "beforecopy", function( event ) {
        var getClientText = function( event ,  func ) {
            text = $( '#embed-modal' ).val();
            return func( text );
        };
        getClientText( event ,function( text ) {
            client.setText( text );
        });
    } );

    $('.embed-copy').click(function() {
        $(this).parents('.modal-footer').siblings('.modal-body').children('textarea').select();
    });

    $('.wizard-embed-copy').click(function() {
        $(this).parents('.setting-tab-scheme-cont').siblings('.embed_code').select();
    });

    if( null!== document.getElementById('send_email') ) {
        if(!document.getElementById('send_email').checked) {
            $('.mail_fields').hide();
            $('.mail_hr').hide();
        }
    };

    $(".send_email").on("change", function() {

        var checkBox = document.getElementById('send_email');
        var div      = document.getElementById('email_input');

        if (checkBox.checked) {
            $('.mail_fields').show();
            $('.mail_hr').show();
            $('#add_field_for_email').show();
        } else {
            $('.mail_fields').hide();
            $('.mail_hr').hide();
            $('#add_field_for_email').hide();
        }

    })

    var sendTypeRequest = function( type ) {

        $.get('/widgets/get-widgets-by-campaign?campaign_id='+$('.campaignSelect option:selected').val()+"&type="+type,
            function( data ) {
                if( $('#list-tab').attr('aria-expanded') == 'true' ) {
                    $('#list').html(" ");
                    $('#list').append(data);
                } else if( $('#grid-tab').attr('aria-expanded') ) {
                    $('#grid').html(" ");
                    $('#grid').append(data);
                }

                if($('.campaignSelect option:selected').val() != 0) {
                    $('.update-form').show();
                    $('.delete-form').show();
                    $('.campaign-name').val($('.campaignSelect option:selected').html());
                    $('.delete-form').attr('action', "/campaigns/"+$('.campaignSelect option:selected').val());
                    $('.delete-button').attr('data-target', "#removeModal"+$('.campaignSelect option:selected').val());
                    $('.delete-modal-div').attr('id', "removeModal"+$('.campaignSelect option:selected').val());
                    $('.edit-modal-div').attr('id', "editCampaign"+$('.campaignSelect option:selected').val());
                    $('.edit-button').attr('data-target', "#editCampaign"+$('.campaignSelect option:selected').val());
                    $('.update-form').attr('action', "/campaigns/"+$('.campaignSelect option:selected').val()+"/updateCampaign");
                } else {
                    $('.update-form').hide();
                    $('.delete-form').hide();
                }
            }
        );
    }

    $(".campaignSelect").on("change", function () {

        var campaign_id = $(".campaignSelect").val();
        var type;

        if( $('#list-tab').attr('aria-expanded') == 'true' ) {
            type = "list";
        } else if( $('#grid-tab').attr('aria-expanded') ) {
            type = "grid";
        }

        sendTypeRequest( type );
    });


    $('#list-tab').on('click', function() {
        sendTypeRequest("list");
    });

    $('#grid-tab').on('click', function() {
        sendTypeRequest("grid");
    });

    /* //////////////////// ToolTips //////////////////////////////// */

    $(document).ready(function(){
        $('.simple_tooltip').tooltip();
    });

    /* ////////////////////// END Tooltip ////////////////// */
    $('#branding').on('change', function() {
        var powered = window.frames['widget-preview'].contentDocument;
        var checkBox = document.getElementById('branding');
        var div      = document.getElementById('imageDiv');
        $(powered).find('.powered-by').html('asd');
        if (checkBox.checked)
            div.style.display = "block";
        else
            div.style.display = "none";
    })

    $('.choose-provider').on('change', function() {
        if($('.choose-provider option:selected').val()) {
            $(document).ajaxStart(function() {
                $("#spanimg").css("display", "inline-block");
            });

            $.get('/widgets/get-email-service-list?serviceName='+$('.choose-provider option:selected').text(),
                function( data ) {
                    $('.choose-list').find('option').remove().end();
                    $('.choose-list').append('<option value="0" selected="selected">Choose List</option>');
                    $.each(data, function (i, item) {
                        $('.choose-list').append($('<option>', {
                            text : item,
                            value: i
                        }));
                    });
                }
            );

            $(document).ajaxComplete(function() {
                $("#spanimg").css("display", "none");
            });
        } else {
            $(document).ajaxStart(function() {
                $("#spanimg").css("display", "inline-block");
            });

            $('.choose-list').find('option').remove().end();

            $('.choose-list').append($('<option>', {
                text : "Choose List",
                value: ""
            }));

            $(document).ajaxComplete(function() {
                $("#spanimg").css("display", "none");
            });
        }
    })

    /*Input type colors*/
    $.each( $('input[type=color]') , function( index, value ) {
        $(value).val($(value).siblings('input[type=text]').val());
    });

    $('input[type=color]').change(function() {
        var new_color = $(this).val();
        $(this).siblings('input[type=text]').val(new_color);
    });
    /*///*/


    /*Widget Preview*/
    var widgetsPreview = function(design) {
        var widget_data_arr = {};
        widget_data_arr['widget_bg_color']                  =  $('input[name=widget_bg_color]').val();
        widget_data_arr['widget_main_headline_color']       =  $('input[name=widget_main_headline_color]').val();
        widget_data_arr['widget_text_color']                =  $('input[name=widget_text_color]').val();
        widget_data_arr['widget_main_headline']             =  $('input[name=widget_main_headline]').val();
        widget_data_arr['widget_main_headline_bg_color']    =  $('input[name=widget_main_headline_bg_color]').val();
        widget_data_arr['widget_buttons_bg_color']          =  $('input[name=widget_buttons_bg_color]').val();
        widget_data_arr['widget_buttons_text_color']        =  $('input[name=widget_buttons_text_color]').val();
        widget_data_arr['privacy_policy_url']               =  $('input[name=privacy_policy_url]').val();

        $('.widget-iframe-cont').children('iframe').fadeOut(500, function(){
            $('.widget-iframe-cont').html('<iframe style="height: 475px; visibility: visible" onload="removeScripts(this.id)" id="widget-preview" class="widgets-iframe" src="/widgets/'+design+'/popup-widget-preview/1?widget='+encodeURIComponent(JSON.stringify(widget_data_arr))+'"></iframe>');
        });
        $('.widget-type-hidden').val(design);
    };

    if($('.widget-type-hidden').length !== 0) {
        var this_val = $('.widget-type-hidden').val();
        widgetsPreview(this_val);
    }

    $.each( $('.widget_design') , function( key, value ) {
        if($(value).prop('checked')) {
            $(this).parents('.view-steps-img').siblings('.btn-success.btn').css({'display': 'inline-block'});
        }
    });

    $('.widget_design').on('change',function () {
        var this_val = $(this).val();
        widgetsPreview(this_val);
        $('.appearance_small_images_cont .view-steps-img').siblings('.btn-success.btn').css({'display': 'none'});
        $(this).parents('.view-steps-img').siblings('.btn-success.btn').css({'display': 'inline-block'});
    });
    /*///*/

    /* Tab Preview */
    var tabsPreview = function(type , design) {
        var iframe_tab_height = '';

        if(type === "side") {
            iframe_tab_height = '451px';
        }

        if(type === "footer") {
            iframe_tab_height = '155px';
        }

        $('.tab-type-hidden').val(type + '-lock');
        $('.tab-design-hidden').val(design);

        var tab_id = $('.tab-design-hidden').val();

        /*Live Preview*/
        var tab_data_arr = {};
        tab_data_arr['tab_bg_color']        =   $('input[name=tab_bg_color]').val();
        tab_data_arr['tab_bg_color_2']      =   $('input[name=tab_bg_color_2]').val();
        tab_data_arr['tab_bg_color_3']      =   $('input[name=tab_bg_color_3]').val();
        tab_data_arr['tab_text_color']      =   $('input[name=tab_text_color]').val();
        tab_data_arr['tab_text_color_2']    =   $('input[name=tab_text_color_2]').val();
        /************************ raghvendra  ***************************/
       // tab_data_arr['tab_design_text']    =   $('input[name=tab_text_color_2]').val();


        $('.tab-iframe-cont').html('');
        $('.tab-iframe-cont').html('<iframe style="height: '+iframe_tab_height+'; visibility: hidden" id="ifrm" class="tabs-iframe" onload="setIframeHeight(this.id)" src="/widgets/'+type+'-widget-preview/'+design+'?widget='+encodeURIComponent(JSON.stringify(tab_data_arr))+'"></iframe>');
    }

    if($('.tab-design-hidden').length !== 0 && $('.position-type-label').children('input[type="radio"]').length !== 0) {
        var default_tab_design_id = $('.tab-design-hidden').val();
        var default_iframe_tab_type = $('.position-type-label').children('input[type="radio"]:checked').val();

        tabsPreview(default_iframe_tab_type , default_tab_design_id);
    }

    $.each( $('.tab_design') , function( key, value ) {
        if($(value).prop('checked')) {
            $(this).parents('.view-steps-img').siblings('.tab-customize').css({'display': 'inline-block'});
        }
    });

    $('.tab_design').on('change' , function() {
        var tab_design_id = $(this).val();
        var iframe_tab_type = $('.position-type-label').children('.btn-nav.active').siblings('input[name="position-type"]').val();

        tabsPreview(iframe_tab_type , tab_design_id);

        $('.tab-customize').css({'display': 'none'});
        $(this).parents('.view-steps-img').siblings('.tab-customize').css({'display': 'inline-block'});
    });


    /*appearance_page*/
    $.each( $('.appearance_page').find('.position-type-label').children('input[type="radio"]') , function( key, value ) {
        if($(value).prop('checked') && $('.tab-design-hidden').val() !== '') {
            $(value).siblings('.btn-nav').addClass('active');

            if($('.choosed-tab-img').children('img').length === 0) {
                if($('.tab-type-hidden').val() === 'side-lock') {
                    $('#modal-designs').find('.nav-tabs').children('li:first-child').addClass('active');
                    $('#modal-designs').find('.tab-content').children('.tab-pane:first-child').addClass('active in');

                    var active_radio = '#side-tab-'+ $('.tab-design-hidden').val();
                    $(active_radio).prop('checked', true);
                }

                if($('.tab-type-hidden').val() === 'footer-lock') {
                    $('#modal-designs').find('.nav-tabs').children('li:last-child').addClass('active');
                    $('#modal-designs').find('.tab-content').children('.tab-pane:last-child').addClass('active in');

                    var active_radio = '#footer-tab-'+ $('.tab-design-hidden').val();
                    $(active_radio).prop('checked', true);
                }
            }
        }

        else if($(value).prop('checked') && $('.tab-design-hidden').val() === '') {
            $(value).siblings('.btn-nav').addClass('active');
        }
    });

    if($('.custom_button_code').length === 1) {
        if($('.custom_button_code').val() !== '') {
            $('.choose_button_tabs_div .btn-group-justified').children('.btn-group').children('label').children('a').removeClass('active');
            $('.choose_button_tabs_div .btn-group-justified').children('.btn-group:last-child').children('label').children('a').addClass('active');

            $('.tab-preview').hide();

            $('.choose_tab_design_div').hide();
            $('.choose_position_div').hide();
            $('.custom_button_div').show();
        } else {
            $('.choose_button_tabs_div .btn-group-justified').children('.btn-group').children('label').children('a').removeClass('active');
            $('.choose_button_tabs_div .btn-group-justified').children('.btn-group:first-child').children('label').children('a').addClass('active');

            $('.custom_button_div').hide();
            $('.choose_tab_design_div').show();
            $('.choose_position_div').show();
        }


        $('.appearance_page').find('.choose_button_tabs_div').find('.btn-group-justified').children('.btn-group:last-child').click(function() {
            $('.position-type-label2').children('a').removeClass('active');
            $(this).find('a').addClass('active');

            $('.tab-preview').hide();
            $('#open-as-light').prop('checked',true);

            $('.choose_tab_design_div').hide();
            $('.choose_position_div').hide();
            $('.custom_button_div').show();
        });

        $('.appearance_page').find('.choose_button_tabs_div').find('.btn-group-justified').children('.btn-group:first-child').click(function() {
            $('.position-type-label2').children('a').removeClass('active');
            $(this).find('a').addClass('active');

            $('.tab-preview').show();

            setIframeHeight('ifrm');

            $('.custom_button_div').hide();
            $('.choose_tab_design_div').show();
            $('.choose_position_div').show();
        });
    }

    $('.appearance_page').find('.position-type-label').click(function() {
        if($(this).children('input[type="radio"]').val() === 'side') {
            $('.side-tab-designs').removeClass('hidden');
            $('.footer-tab-designs').addClass('hidden');
        } else if($(this).children('input[type="radio"]').val() === 'footer') {
            $('.footer-tab-designs').removeClass('hidden');
            $('.side-tab-designs').addClass('hidden');
        }

        $(this).children('input[type="radio"]').parents('.choose-type').find('.position-type-label a').removeClass('active');
        $(this).children('input[type="radio"]').siblings('a').addClass('active');
    });

    var chacked_position_type = $('.position-type-label').children('input[type="radio"]:checked').val();

    if(chacked_position_type === 'side') {
        $('.side-tab-designs').removeClass('hidden');
        $('.footer-tab-designs').addClass('hidden');
    } else if(chacked_position_type === 'footer') {
        $('.footer-tab-designs').removeClass('hidden');
        $('.side-tab-designs').addClass('hidden');
    }

    $('#modal-designs').on('show.bs.modal', function () {
        var checked_type = '';
        $.each( $('.choose-type').find('input'), function( key, value ) {
            if($(value).prop('checked')) {
                checked_type = $(this).val();
            }
        });

        $('#modal-designs').find('.nav-tabs').children('li').removeClass('active');
        $('#modal-designs').find('.tab-content').children('.tab-pane').removeClass('active in');

        if(checked_type === "side") {
            $('#modal-designs').find('.nav-tabs').children('li:first-child').addClass('active');
            $('#modal-designs').find('.tab-content').children('.tab-pane:first-child').addClass('active in');
        } else {
            $('#modal-designs').find('.nav-tabs').children('li:last-child').addClass('active');
            $('#modal-designs').find('.tab-content').children('.tab-pane:last-child').addClass('active in');
        }
    })

    $('.choose-tab-success-btn').click(function() {
        var inputs = $('#modal-designs').find('.tab-content').children('.active.in').find('input[type="radio"]');
        var active_id = $('#modal-designs').find('.tab-content').children('.active.in').prop('id');
        var img_src = '';
        var img_id = '';
        var iframe_tab_type='';
        var iframe_tab_height = '';

        $.each( inputs, function( key, value ) {
            if($(value).prop('checked')) {
                img_src = $(value).siblings('label').children('img').prop('src');
                img_id = $(value).val();
            }
        });

        if($('.choosed-tab-img').children('img').length === 0) {
            $('.choosed-tab-img').append('<img>');
        }

        $('.choosed-tab-img').children('img').prop('src', img_src);

        if(active_id === "side-lock") {
            iframe_tab_type= 'side';
            iframe_tab_height = '451px';
            $('.choose-type').find('input[value="side"]').click();
        }

        if(active_id === "footer-lock") {
            iframe_tab_type= 'footer';
            iframe_tab_height = '155px';
            $('.choose-type').find('input[value="footer"]').click();
        }

        $('.tab-type-hidden').val(active_id);
        $('.tab-design-hidden').val(img_id);

        var tab_id = $('.tab-design-hidden').val();

        if(tab_id == 1) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(tab_id == 2) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(tab_id == 3) {
            $('.tab-bg-color-2-cont').fadeOut();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(tab_id == 4) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(tab_id == 5) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(tab_id == 6) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeIn();
            $('.tab-text-color-2-cont').fadeIn();
        } else if(tab_id == 7) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeIn();
        } else if(tab_id == 8) {
            $('.tab-bg-color-2-cont').fadeOut();
            $('.tab-bg-color-3-cont').fadeIn();
            $('.tab-text-color-2-cont').fadeIn();
        } else if(tab_id == 9) {
            $('.tab-bg-color-2-cont').fadeOut();
            $('.tab-bg-color-3-cont').fadeIn();
            $('.tab-text-color-2-cont').fadeIn();
        } else if(tab_id == 10) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeIn();
            $('.tab-text-color-2-cont').fadeIn();
        }

        /*Live Preview*/
        var tab_data_arr = {};
        tab_data_arr['tab_bg_color']  = $('input[name=tab_bg_color]').val();
        tab_data_arr['tab_bg_color_2']  = $('input[name=tab_bg_color_2]').val();
        tab_data_arr['tab_bg_color_3']  = $('input[name=tab_bg_color_3]').val();
        tab_data_arr['tab_text_color']  = $('input[name=tab_text_color]').val();
        tab_data_arr['tab_text_color_2']  = $('input[name=tab_text_color_2]').val();

        $('.tab-iframe-cont').html('');
        $('.tab-iframe-cont').html('<iframe style="height: '+iframe_tab_height+'; visibility: hidden" id="ifrm" class="tabs-iframe" onload="setIframeHeight(this.id)" src="/widgets/'+iframe_tab_type+'-widget-preview/'+img_id+'?widget='+encodeURIComponent(JSON.stringify(tab_data_arr))+'"></iframe>');
        /*///*/

        $('.choosed-tab-img').css({'border': '4px solid #cccccc'});
        $('#modal-designs').modal('hide');
    });

    var tab_id = $('.tab-design-hidden').val();

    if(tab_id == 1) {
        $('.tab-bg-color-2-cont').fadeIn();
        $('.tab-bg-color-3-cont').fadeOut();
        $('.tab-text-color-2-cont').fadeOut();
    } else if(tab_id == 2) {
        $('.tab-bg-color-2-cont').fadeIn();
        $('.tab-bg-color-3-cont').fadeOut();
        $('.tab-text-color-2-cont').fadeOut();
    } else if(tab_id == 3) {
        $('.tab-bg-color-2-cont').fadeOut();
        $('.tab-bg-color-3-cont').fadeOut();
        $('.tab-text-color-2-cont').fadeOut();
    } else if(tab_id == 4) {
        $('.tab-bg-color-2-cont').fadeIn();
        $('.tab-bg-color-3-cont').fadeOut();
        $('.tab-text-color-2-cont').fadeOut();
    } else if(tab_id == 5) {
        $('.tab-bg-color-2-cont').fadeIn();
        $('.tab-bg-color-3-cont').fadeOut();
        $('.tab-text-color-2-cont').fadeOut();
    } else if(tab_id == 6) {
        $('.tab-bg-color-2-cont').fadeIn();
        $('.tab-bg-color-3-cont').fadeIn();
        $('.tab-text-color-2-cont').fadeIn();
    } else if(tab_id == 7) {
        $('.tab-bg-color-2-cont').fadeIn();
        $('.tab-bg-color-3-cont').fadeOut();
        $('.tab-text-color-2-cont').fadeIn();
    } else if(tab_id == 8) {
        $('.tab-bg-color-2-cont').fadeOut();
        $('.tab-bg-color-3-cont').fadeIn();
        $('.tab-text-color-2-cont').fadeIn();
    } else if(tab_id == 9) {
        $('.tab-bg-color-2-cont').fadeOut();
        $('.tab-bg-color-3-cont').fadeIn();
        $('.tab-text-color-2-cont').fadeIn();
    } else if(tab_id == 10) {
        $('.tab-bg-color-2-cont').fadeIn();
        $('.tab-bg-color-3-cont').fadeIn();
        $('.tab-text-color-2-cont').fadeIn();
    }

    $('.tab-color, .tab-color-input').change(function() {
        var that                =   $(this);
        var iframe_tab_type     =   $('.tab-type-hidden').val();
        var img_id              =   $('.tab-design-hidden').val();
        var customize_tab_id    =   $('.tabs-customize input[name="customize_tab_id"]').val();
        var customize_tab_type  =   $('.tabs-customize input[name="customize_tab_type"]').val();
        var iframe_tab_height   =   '';

        if(iframe_tab_type === "side-lock") {
            iframe_tab_type     = 'side';
            iframe_tab_height   = '451px';
        }
        if(iframe_tab_type === "footer-lock") {
            iframe_tab_type     = 'footer';
            iframe_tab_height   = '155px';
        }

        var tab_data_arr = {};

        tab_data_arr['tab_bg_color']        = that.parents('.modal').find('input[name=tab_bg_color]').val();
        tab_data_arr['tab_bg_color_2']      = that.parents('.modal').find('input[name=tab_bg_color_2]').val();
        tab_data_arr['tab_bg_color_3']      = that.parents('.modal').find('input[name=tab_bg_color_3]').val();
        tab_data_arr['tab_text_color']      = that.parents('.modal').find('input[name=tab_text_color]').val();
        tab_data_arr['tab_text_color_2']    = that.parents('.modal').find('input[name=tab_text_color_2]').val();
       // alert("i am here sushant");

        $('input[name=tab_bg_color]').val(that.parents('.modal').find('input[name=tab_bg_color]').val());
        $('input[name=tab_bg_color]').siblings('.tab-color').val(that.parents('.modal').find('input[name=tab_bg_color]').val());

        $('input[name=tab_bg_color_2]').val(that.parents('.modal').find('input[name=tab_bg_color_2]').val());
        $('input[name=tab_bg_color_2]').siblings('.tab-color').val(that.parents('.modal').find('input[name=tab_bg_color_2]').val());

        $('input[name=tab_bg_color_3]').val(that.parents('.modal').find('input[name=tab_bg_color_3]').val());
        $('input[name=tab_bg_color_3]').siblings('.tab-color').val(that.parents('.modal').find('input[name=tab_bg_color_3]').val());

        $('input[name=tab_text_color]').val(that.parents('.modal').find('input[name=tab_text_color]').val());
        $('input[name=tab_text_color]').siblings('.tab-color').val(that.parents('.modal').find('input[name=tab_text_color]').val());

        $('input[name=tab_text_color_2]').val(that.parents('.modal').find('input[name=tab_text_color_2]').val());
        $('input[name=tab_text_color_2]').siblings('.tab-color').val(that.parents('.modal').find('input[name=tab_text_color_2]').val());

        $('.tab-iframe-cont').children('iframe').fadeOut(500, function(){
            $('.tab-iframe-cont').html('<iframe style="height: '+iframe_tab_height+'; visibility: hidden" id="ifrm" class="tabs-iframe" onload="setIframeHeight(this.id)" src="/widgets/'+iframe_tab_type+'-widget-preview/'+img_id+'?widget='+encodeURIComponent(JSON.stringify(tab_data_arr))+'"></iframe>');
        });

        $('.tab-customize-content').children('iframe').fadeOut(500, function(){
            $('.tab-customize-content').html('<iframe style="height: '+iframe_tab_height+'; visibility: hidden ; width:100%;" id="tab-iframe" class="tabs-iframe" onload="setIframeHeight(this.id)" src="/widgets/'+customize_tab_type+'-widget-preview/'+customize_tab_id+'?widget='+encodeURIComponent(JSON.stringify(tab_data_arr))+'"></iframe>');
        });
    });

    /* Tabs Colors in popups */
    $('input[name=tab_bg_color]').val($('#color-scheme-tab-bg-color').siblings('input[name=tab_bg_color]').val());
    $('input[name=tab_bg_color]').siblings('.tab-color').val($('#color-scheme-tab-bg-color').siblings('input[name=tab_bg_color]').val());

    $('input[name=tab_bg_color_2]').val($('#color-scheme-tab-bg-color2').siblings('input[name=tab_bg_color_2]').val());
    $('input[name=tab_bg_color_2]').siblings('.tab-color').val($('#color-scheme-tab-bg-color2').siblings('input[name=tab_bg_color_2]').val());

    $('input[name=tab_bg_color_3]').val($('#color-scheme-tab-bg-color3').siblings('input[name=tab_bg_color_3]').val());
    $('input[name=tab_bg_color_3]').siblings('.tab-color').val($('#color-scheme-tab-bg-color3').siblings('input[name=tab_bg_color_3]').val());

    $('input[name=tab_text_color]').val($('#color-scheme-tab-text-color').siblings('input[name=tab_text_color]').val());
    $('input[name=tab_text_color]').siblings('.tab-color').val($('#color-scheme-tab-text-color').siblings('input[name=tab_text_color]').val());

    $('input[name=tab_text_color_2]').val($('#color-scheme-tab-text-color2').siblings('input[name=tab_text_color_2]').val());
    $('input[name=tab_text_color_2]').siblings('.tab-color').val($('#color-scheme-tab-text-color2').siblings('input[name=tab_text_color_2]').val());

    /*Colors in popups*/
    $('input[name=widget_bg_color]').val($('#color-scheme-bg').siblings('input[name=widget_bg_color]').val());
    $('input[name=widget_bg_color]').siblings('.widget-color').val($('#color-scheme-bg').siblings('input[name=widget_bg_color]').val());

    $('input[name=widget_main_headline_color]').val($('#color-scheme-headline').siblings('input[name=widget_main_headline_color]').val());
    $('input[name=widget_main_headline_color]').siblings('.widget-color').val($('#color-scheme-headline').siblings('input[name=widget_main_headline_color]').val());

    $('input[name=widget_main_headline_bg_color]').val($('#color-scheme-headline-bg').siblings('input[name=widget_main_headline_bg_color]').val());
    $('input[name=widget_main_headline_bg_color]').siblings('.widget-color').val($('#color-scheme-headline-bg').siblings('input[name=widget_main_headline_bg_color]').val());

    $('input[name=widget_text_color]').val($('#color-scheme-text').siblings('input[name=widget_text_color]').val());
    $('input[name=widget_text_color]').siblings('.widget-color').val($('#color-scheme-text').siblings('input[name=widget_text_color]').val());

    $('input[name=widget_buttons_bg_color]').val($('#color-scheme-buttons-bg').siblings('input[name=widget_buttons_bg_color]').val());
    $('input[name=widget_buttons_bg_color]').siblings('.widget-color').val($('#color-scheme-buttons-bg').siblings('input[name=widget_buttons_bg_color]').val());

    $('input[name=widget_buttons_text_color]').val($('#color-scheme-buttons-text').siblings('input[name=widget_buttons_text_color]').val());
    $('input[name=widget_buttons_text_color]').siblings('.widget-color').val($('#color-scheme-buttons-text').siblings('input[name=widget_buttons_text_color]').val());

    $('input[name=widget_main_headline]').val($('#widget_main_headline').val());
    /* ////// */

    $('.widget-color, .widget-color-input, .widget_main_headline').change(function() {
        var that = $(this);
        var iframe_widget_type = $('.widget-type-hidden').val();
        var step_id = 1;
        var widget_data_arr = {};

        widget_data_arr['widget_bg_color']                  =  that.parents('.modal').find('input[name=widget_bg_color]').val();
        widget_data_arr['widget_main_headline_color']       =  that.parents('.modal').find('input[name=widget_main_headline_color]').val();
        widget_data_arr['widget_text_color']                =  that.parents('.modal').find('input[name=widget_text_color]').val();
        widget_data_arr['widget_main_headline']             =  that.parents('.modal').find('input[name=widget_main_headline]').val();
        widget_data_arr['widget_main_headline_bg_color']    =  that.parents('.modal').find('input[name=widget_main_headline_bg_color]').val();
        widget_data_arr['widget_buttons_bg_color']          =  that.parents('.modal').find('input[name=widget_buttons_bg_color]').val();
        widget_data_arr['widget_buttons_text_color']        =  that.parents('.modal').find('input[name=widget_buttons_text_color]').val();
        widget_data_arr['privacy_policy_url']               =  $('input[name=privacy_policy_url]').val();

        if(iframe_widget_type !== '') {
            $('.widget-preview .widget-iframe-cont').children('iframe').fadeOut(500, function(){
                $('.widget-preview .widget-iframe-cont').html('<iframe onload="removeScripts(this.id)" style="height: 475px; visibility: visible" id="widget-preview" class="widgets-iframe" src="/widgets/'+iframe_widget_type+'/popup-widget-preview/'+step_id+'?widget='+encodeURIComponent(JSON.stringify(widget_data_arr))+'"></iframe>');
            });
        }

        $('input[name=widget_bg_color]').val(that.parents('.modal').find('input[name=widget_bg_color]').val());
        $('input[name=widget_bg_color]').siblings('.widget-color').val(that.parents('.modal').find('input[name=widget_bg_color]').val());

        $('input[name=widget_main_headline_color]').val(that.parents('.modal').find('input[name=widget_main_headline_color]').val());
        $('input[name=widget_main_headline_color]').siblings('.widget-color').val(that.parents('.modal').find('input[name=widget_main_headline_color]').val());

        $('input[name=widget_main_headline_bg_color]').val(that.parents('.modal').find('input[name=widget_main_headline_bg_color]').val());
        $('input[name=widget_main_headline_bg_color]').siblings('.widget-color').val(that.parents('.modal').find('input[name=widget_main_headline_bg_color]').val());

        $('input[name=widget_text_color]').val(that.parents('.modal').find('input[name=widget_text_color]').val());
        $('input[name=widget_text_color]').siblings('.widget-color').val(that.parents('.modal').find('input[name=widget_text_color]').val());

        $('input[name=widget_buttons_bg_color]').val(that.parents('.modal').find('input[name=widget_buttons_bg_color]').val());
        $('input[name=widget_buttons_bg_color]').siblings('.widget-color').val(that.parents('.modal').find('input[name=widget_buttons_bg_color]').val());

        $('input[name=widget_buttons_text_color]').val(that.parents('.modal').find('input[name=widget_buttons_text_color]').val());
        $('input[name=widget_buttons_text_color]').siblings('.widget-color').val(that.parents('.modal').find('input[name=widget_buttons_text_color]').val());

        $('input[name=widget_main_headline]').val(that.parents('.modal').find('input[name=widget_main_headline]').val());

        $('#view-steps-1').find('.popup-iframe-cont').children('iframe').fadeOut(250, function(){
            $('#view-steps-1').find('.popup-iframe-cont').html('<iframe onload="removeScripts(this.id)" style="visibility: hidden" id="widget-preview-popup1" class="widgets-iframe" src="/widgets/1/popup-widget-preview/'+step_id+'?widget='+encodeURIComponent(JSON.stringify(widget_data_arr))+'"></iframe>');
        });

        $('#view-steps-2').find('.popup-iframe-cont').children('iframe').fadeOut(250, function(){
            $('#view-steps-2').find('.popup-iframe-cont').html('<iframe onload="removeScripts(this.id)" style="visibility: hidden" id="widget-preview-popup2" class="widgets-iframe" src="/widgets/2/popup-widget-preview/'+step_id+'?widget='+encodeURIComponent(JSON.stringify(widget_data_arr))+'"></iframe>');
        });

        $('#view-steps-3').find('.popup-iframe-cont').children('iframe').fadeOut(250, function(){
            $('#view-steps-3').find('.popup-iframe-cont').html('<iframe onload="removeScripts(this.id)" style="visibility: hidden" id="widget-preview-popup3" class="widgets-iframe" src="/widgets/3/popup-widget-preview/'+step_id+'?widget='+encodeURIComponent(JSON.stringify(widget_data_arr))+'"></iframe>');
        });
    });
    /*///*/


    /* Tabs Customize Modal */
    $('.tab-customize').on('click' , function() {
        var customize_id = $(this).siblings('label.view-steps-img').children('input[type="radio"]').val();
        var customize_type = $('.select-type input[name="position-type"]:checked').val();

        $('.tabs-customize input[name="customize_tab_id"]').val(customize_id);
        $('.tabs-customize input[name="customize_tab_type"]').val(customize_type);

        var iframe_tab_height = '';

        if(customize_type === "side") {
            iframe_tab_height = '451px';
        }

        if(customize_type === "footer") {
            iframe_tab_height = '155px';
        }

        if(customize_id == 1) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(customize_id == 2) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(customize_id == 3) {
            $('.tab-bg-color-2-cont').fadeOut();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(customize_id == 4) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(customize_id == 5) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeOut();
        } else if(customize_id == 6) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeIn();
            $('.tab-text-color-2-cont').fadeIn();
        } else if(customize_id == 7) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeOut();
            $('.tab-text-color-2-cont').fadeIn();
        } else if(customize_id == 8) {
            $('.tab-bg-color-2-cont').fadeOut();
            $('.tab-bg-color-3-cont').fadeIn();
            $('.tab-text-color-2-cont').fadeIn();
        } else if(customize_id == 9) {
            $('.tab-bg-color-2-cont').fadeOut();
            $('.tab-bg-color-3-cont').fadeIn();
            $('.tab-text-color-2-cont').fadeIn();
        } else if(customize_id == 10) {
            $('.tab-bg-color-2-cont').fadeIn();
            $('.tab-bg-color-3-cont').fadeIn();
            $('.tab-text-color-2-cont').fadeIn();
        }

        var tab_data_arr = {};
        tab_data_arr['tab_bg_color']  = $('input[name=tab_bg_color]').val();
        tab_data_arr['tab_bg_color_2']  = $('input[name=tab_bg_color_2]').val();
        tab_data_arr['tab_bg_color_3']  = $('input[name=tab_bg_color_3]').val();
        tab_data_arr['tab_text_color']  = $('input[name=tab_text_color]').val();
        tab_data_arr['tab_text_color_2']  = $('input[name=tab_text_color_2]').val();
         /************************ raghvendra  ***************************/
       // tab_data_arr['tab_design_text']    =   "raghvendra";

        $('.tab-customize-content').html('<iframe style="height: '+iframe_tab_height+'; visibility: hidden ; width:100%;" id="tab-iframe" class="tabs-iframe" onload="setCustomizeIframeHeight(this.id)" src="/widgets/'+customize_type+'-widget-preview/'+customize_id+'?widget='+encodeURIComponent(JSON.stringify(tab_data_arr))+'"></iframe>');

        if($('.tab-customize-content').find('iframe').length === 0) {
            $('.tab-customize-content').html('<iframe style="height: '+iframe_tab_height+'; visibility: hidden ; width:100%;" id="tab-iframe" class="tabs-iframe" onload="setIframeHeight(this.id)" src="/widgets/'+customize_type+'-widget-preview/'+customize_id+'?widget='+encodeURIComponent(JSON.stringify(tab_data_arr))+'"></iframe>');
        } else {
            $('.tab-customize-content').children('iframe').fadeOut(500, function(){
                $('.tab-customize-content').html('<iframe style="height: '+iframe_tab_height+'; visibility: hidden ; width:100%;" id="tab-iframe" class="tabs-iframe" onload="setIframeHeight(this.id)" src="/widgets/'+customize_type+'-widget-preview/'+customize_id+'?widget='+encodeURIComponent(JSON.stringify(tab_data_arr))+'"></iframe>');
            });
        }
    });

    /* //// */

    $('.choose-list').on('change', function() {
        $('.option-row-content').css('display','block');
        $('.map-fields').css('display','none');
    });

    if($('.choose-list').val() != '') {
        $('.option-row-content').css('display','block');
        $('.map-fields').css('display','none');
    }

    /*Message Moment*/
    var message_times = $(".message_time");

    $.each( message_times , function( index, value ) {
        var now         =   moment.unix( parseInt($(this).attr('data-time-now')) );
        var created     =   moment.unix(  parseInt($(this).attr('data-time-created')) );
        var mmoment     =   moment(created).from(now);
        $(this).next('p').html(mmoment);
    });



    $('.raw_html_provider').on('click',function() {
        $('.autoresponder_block').hide(500);
        $('.raw_html_block').toggle(500);
        $('.autoresponder_provider').removeClass('active');
        $('.choose-provider').val('');
        $('.choose-list').val('');

        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('#provider_type').val('');
            $('#raw_html_textarea').val('');
            $('#rawhtml_form_action').val('');
        } else {
            $(this).addClass('active');
            $('#provider_type').val('raw-html');
        }
    });

    $('.autoresponder_provider').on('click',function() {
        $('.map-fields').hide(500);
        $('.autoresponder_block').toggle(500);
        $('.raw_html_block').hide(500);
        $('.raw_html_provider').removeClass('active');

        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('#provider_type').val('');
            $('.choose-provider').val('');
            $('.choose-list').val('');
        } else {
            $(this).addClass('active');
            $('#provider_type').val('autoresponder');
        }
    });


    $('#rawhtmlbtn').click(function() {
        var textarea        =   $('#raw_html_textarea').val();
        var action          =   $('<div>' + textarea + '</div>').find('form').attr('action');
        var arrInputsNames  =   new Array();
        var arrHiddenInputs =   {};

        $(textarea).find('input').each(function(index, data) {
            if($(data).attr('type') === 'hidden' || $(data).attr('type') === 'button' || $(data).attr('type') === 'submit') {
                if($(data).attr('type') === 'hidden') {
                    arrHiddenInputs[$(data).attr('name')] = $(data).attr('value');
                }
            } else {
                arrInputsNames.push($(data).attr('name'))
            }
        });

        arrHiddenInputs = JSON.stringify(arrHiddenInputs);

        var textData = '';

        if(typeof arrInputsNames !== 'undefined' && arrInputsNames.length > 0) {
           $.each(arrInputsNames,function( i, val) {
               textData = textData + '<option value="' + val + '">'+val+'</option>';
           });

           $('#rawhtml_form_action').val(action);
           $('#first_name_field_value, #email_field_value, #phone_field_value' ).empty();
           $('#first_name_field_value, #email_field_value, #phone_field_value').append(textData);
           $('#rawhtml_form_hidden_inputs').val(arrHiddenInputs);
           $('.map-fields').show(500);
           $('.option-row-content').css('display','block');

           var form     =   $('<div>' + textarea + '</div>').find('form');
           var wrapper  =   $('<div></div>');
           wrapper.html(form);
           $('#raw_html_textarea').val(wrapper.html());
        }

    });

    if($('#raw_html_textarea').val()) {
        var textarea        =   $('#raw_html_textarea').val();
        var action          =   $('<div>' + textarea + '</div>').find('form').attr('action');
        var arrInputsNames  =   new Array();
        var arrHiddenInputs =   {};

        $(textarea).find('input').each(function(index, data) {
            if($(data).attr('type') === 'hidden' || $(data).attr('type') === 'button' || $(data).attr('type') === 'submit') {
                if($(data).attr('type') === 'hidden') {
                    arrHiddenInputs[$(data).attr('name')] = $(data).attr('value');
                }
            } else {
                arrInputsNames.push($(data).attr('name'))
            }
        });

        arrHiddenInputs = JSON.stringify(arrHiddenInputs);
        var textData = '';
        if(typeof arrInputsNames !== 'undefined' && arrInputsNames.length > 0) {
            $.each(arrInputsNames,function(i, val) {
                textData = textData + '<option value="' + val + '">'+val+'</option>';
            });

            $('#rawhtml_form_action').val(action);
            $('#first_name_field_value, #email_field_value, #phone_field_value').append(textData);
            $('#rawhtml_form_hidden_inputs').val(arrHiddenInputs);

            var form      =   $('<div>' + textarea + '</div>').find('form');
            var wrapper   =   $('<div></div>');
            wrapper.html(form);

            $('#raw_html_textarea').val(wrapper.html());
            $('.map-fields').css('display','block');
            $('.option-row-content').css('display','block');
        }
    }

    $('.change_tab_color_btn').click(function() {
        $(this).parents('.buttons').siblings('.title').children('.tab-color').click();
        $(this).parents('.buttons').siblings('.title').children('.widget-color').click();
    });
})


/* /////////////// Copy Button Appearance //////////////// */
$(window).load(function() {
    $('.copy_embed').show();
});

/* /////////////// Copy-Button Appearance //////////////// */
function getDocHeight(doc) {
    doc = doc || document;
    var body = doc.body, html = doc.documentElement;

    if($(body).children('.tabs-container').length != 0) {
        $(body).children('.footer-widget').css({'right': '15px'});
        var height = $(body).children('.tabs-container')[0].clientHeight;
        var width = $(body).children('.tabs-container')[0].clientWidth;
    }

    if($(body).children('.popup-widget').length != 0) {
        var height = $(body).children('.popup-widget')[0].clientHeight;
        var width = $(body).children('.popup-widget')[0].clientWidth;
    }

    /*if($(body).children('.custom-button-container').length != 0) {
        if ($(body).children('.custom-button-container').children('.tabs-container').find('img').length === 1) {
            var height = $(body).children('.custom-button-container').children('.tabs-container').children('img')[0].naturalHeight;
            var width = $(body).children('.custom-button-container').children('.tabs-container').children('img')[0].naturalWidth;
        } else {
            var height = $(body).children('.custom-button-container').children('.tabs-container')[0].scrollHeight;
            var width = $(body).children('.custom-button-container').children('.tabs-container')[0].scrollWidth;
        }
    }*/
    var size = {};
    size['height'] = height;
    /*size['height'] = 470;*/
    size['width'] = width;
    return size;
}

function setIframeHeight(id) {
    var ifrm = document.getElementById(id);
    var doc = ifrm.contentDocument? ifrm.contentDocument:
        ifrm.contentWindow.document;
        getDocHeight(doc);
        var new_height = getDocHeight( doc )['height'] + 4 + "px";
        var new_width = getDocHeight( doc )['width'] + 5 + "px";

        if($('#embed-modal').length !== 0) {
            var embed_modal = $($('#embed-modal').val());

            if($('#lightbox_hidden').val() === '0') {
                if(id === 'widget-preview') {
                    new_height = '474px';
                    var new_iframe = $(embed_modal[1]).children('iframe').css({'height': new_height, 'width': new_width})[0].outerHTML;
                    $(embed_modal[1]).children('iframe:last-child').remove();
                    $(embed_modal[1]).append($(new_iframe)[0]);
                    removeScripts(id);
                } else if (id === 'ifrm') {
                    if ($(ifrm).prop('src').indexOf("side-widget-preview/1?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/2?") >= 0 ||
                        $(ifrm).prop('src').indexOf("side-widget-preview/3?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/4?") >= 0 ||
                        $(ifrm).prop('src').indexOf("side-widget-preview/5?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/7?") >= 0) {

                        var new_right = -(500 - getDocHeight( doc )['height']) + 'px';
                        var new_right2 = - getDocHeight( doc )['height'] + 'px';
                        var new_iframe = $(embed_modal[1]).children('.frontend-tab-container-side').css({'z-index': '-2'}).children('iframe').css({'height': new_width, 'width': '500px'})[0].outerHTML;

                        $(embed_modal[1]).children('.frontend-tab-container-side').children('iframe:first-child').remove();
                        $(embed_modal[1]).children('.frontend-tab-container-side').prepend($(new_iframe)[0]);
                        $(embed_modal[1]).children('.frontend-tab-container-side').append('<style>.frontend-tab-container-side {left: '+new_right2+'!important;}</style>');
                    } else if ($(ifrm).prop('src').indexOf("side-widget-preview/6?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/8?") >= 0 ||
                               $(ifrm).prop('src').indexOf("side-widget-preview/9?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/10?") >= 0 ) {
                                    var new_iframe = $(embed_modal[1]).children('.frontend-tab-container-side').children('iframe').css({'height': new_height, 'width': new_width})[0].outerHTML;
                                    $(embed_modal[1]).children('.frontend-tab-container-side').children('iframe:first-child').remove();
                                    $(embed_modal[1]).children('.frontend-tab-container-side').prepend($(new_iframe)[0]);
                    } else {
                        var new_iframe = $(embed_modal[1]).children('.frontend-tab-container-side').children('iframe').css({'position': 'relative', 'bottom': '-3px', 'z-index': '-2', 'height': new_height, 'width': new_width})[0].outerHTML;
                        $(embed_modal[1]).children('.frontend-tab-container-side').children('iframe:first-child').remove();
                        $(embed_modal[1]).children('.frontend-tab-container-side').prepend($(new_iframe)[0]);
                    }

                }

                var new_str = '';
                $.each( embed_modal , function( index, value ) {
                    new_str += value.outerHTML;
                });
                $('#embed-modal').val(new_str);
            } else if($('#lightbox_hidden').val() === '1') {
                if(id === 'ifrm_button') {
                    /*var new_width_button = getDocHeight( doc )['width'] + 15 + "px";

                    var new_iframe = $(embed_modal[1]).children('iframe').css({'height': new_height, 'width': new_width_button})[0].outerHTML;
                    var container = '<div class="frontend-button-container"><a class="frontend-widget-preview" href="#widget-preview">&nbsp;</a></div>';*/
                } else if(id === 'widget-preview') {
                    new_height = '474px';
                    var new_iframe = $(embed_modal[2]).css({'height': new_height})[0].outerHTML;
                    embed_modal[2] = $(new_iframe)[0];
                    removeScripts(id);
                } else if (id === 'ifrm') {
                    if ($(ifrm).prop('src').indexOf("side-widget-preview/1?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/2?") >= 0 ||
                        $(ifrm).prop('src').indexOf("side-widget-preview/3?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/4?") >= 0 ||
                        $(ifrm).prop('src').indexOf("side-widget-preview/5?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/7?") >= 0) {
                        var new_right = -(500 - getDocHeight( doc )['height']) + 'px';
                        var new_iframe = $(embed_modal[1]).children('iframe').css({'height': new_width, 'width': '500px'})[0].outerHTML;
                        var container = '<div class="frontend-tab-container-side" style="right: ' + new_right + '"><a class="frontend-widget-preview" href="#widget-preview">&nbsp;</a></div>';
                    } else if ($(ifrm).prop('src').indexOf("side-widget-preview/6?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/8?") >= 0 ||
                               $(ifrm).prop('src').indexOf("side-widget-preview/9?") >= 0 || $(ifrm).prop('src').indexOf("side-widget-preview/10?") >= 0 ) {
                                    var new_iframe = $(embed_modal[1]).children('iframe').css({'height': new_height, 'width': new_width})[0].outerHTML;
                                    var container = '<div class="frontend-tab-container-side"><a class="frontend-widget-preview" href="#widget-preview">&nbsp;</a></div>';
                    } else {
                        var new_iframe = $(embed_modal[1]).children('iframe').css({'height': new_height, 'width': new_width})[0].outerHTML;
                        var container = '<div class="frontend-tab-container"><a class="frontend-widget-preview" href="#widget-preview">&nbsp;</a></div>';
                    }

                    new_iframe = $(container).prepend($(new_iframe));
                    embed_modal[1] = $(new_iframe)[0];
                }

                var new_str = '';
                $.each( embed_modal , function( index, value ) {
                    new_str += value.outerHTML;
                });
                $('#embed-modal').val(new_str);
            }
        }


        doc2 = doc || document;
        var body2 = doc2.body, html2 = doc2.documentElement;
        var side_widget_div = $(doc2.body).find('.side-widget>div');
        var side_widget = $(doc2.body).find('.side-widget');


        if(side_widget_div.hasClass('rotate')) {
            var right = ( (side_widget_div.innerWidth() - side_widget_div.innerHeight())/2 ) + 'px';
            var bottom = ( parseInt(right) + 15 ) + 'px';
            side_widget_div.css({'right': '-'+right});
            side_widget_div.css({'left': 'initial'});
            side_widget_div.css({'bottom': bottom});
        } else {
            side_widget_div.css({'right': 0});
            side_widget_div.css({'left': 'initial'});
            side_widget_div.css({'bottom': '15px'});
        }

        side_widget.css({'left': 'initial'});
        side_widget.css({'right': 0});

        ifrm.style.visibility = 'visible';
}

function setCustomizeIframeHeight(id) {
    var ifrm = document.getElementById(id);
    var doc = ifrm.contentDocument? ifrm.contentDocument:
        ifrm.contentWindow.document;
        getDocHeight(doc);
        var new_height = getDocHeight( doc )['height'] + 4 + "px";
        var new_width = getDocHeight( doc )['width'] + 5 + "px";

        doc2 = doc || document;
        var body2 = doc2.body, html2 = doc2.documentElement;
        var side_widget_div = $(doc2.body).find('.side-widget>div');
        var side_widget = $(doc2.body).find('.side-widget');

        if(side_widget_div.hasClass('rotate')) {
            var right = ( (side_widget_div.innerWidth() - side_widget_div.innerHeight())/2 ) + 'px';
            var bottom = ( parseInt(right) + 15 ) + 'px';
            side_widget_div.css({'right': '-'+right});
            side_widget_div.css({'left': 'initial'});
            side_widget_div.css({'bottom': bottom});
        } else {
            side_widget_div.css({'right': 0});
            side_widget_div.css({'left': 'initial'});
            side_widget_div.css({'bottom': '15px'});
        }

        side_widget.css({'left': 'initial'});
        side_widget.css({'right': 0});
}

function removeScripts(id) {
    var ifrm = document.getElementById(id);
    var doc = ifrm.contentDocument? ifrm.contentDocument:
        ifrm.contentWindow.document;
    doc = doc || document;
    var body = doc.body;
    $(body).find('.check_domain').val('false');

    if(id === 'widget-preview-popup1' || id === 'widget-preview-popup2' || id === 'widget-preview-popup3') {
        $(body).css({'background': '#ffffff'});
        $(body).find('.popup-widget>div').css({'display': 'block','float':'left', 'margin-bottom': '20px', 'margin': '18px'});
        $(body).find('.popup-widget>div>div').css({'height':'470px', 'border': '1px solid #cdcdcd', 'overflow':'hidden'});
        $(body).find('.popup-widget>div>form>div').css({'height':'470px', 'border': '1px solid #cdcdcd', 'overflow':'hidden'});
        $(body).find('.popup-widget>div:nth-child(3)').css({'display': 'none'});
        $(body).find('.popup-widget>div:nth-child(8)').css({'display': 'none'});
        $(body).find('.popup-widget>div:nth-child(12)').css({'display': 'none'});

        $(ifrm).css({'visibility': 'visible'});
    }
}

function addJQueryGrid(id) {
    var checkBox = document.getElementById('add_jquery'+id);
    var jQueryLink = "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>";
    if (checkBox.checked){
        document.getElementById('embed_code'+id).value = document.getElementById('embed_code'+id).value.replace(jQueryLink, "");
        document.getElementById('embed_code'+id).value = jQueryLink+document.getElementById('embed_code'+id).value;
    } else {
        document.getElementById('embed_code'+id).value = document.getElementById('embed_code'+id).value.replace(jQueryLink, "");
    }
}

function addJQueryList(id) {
    var checkBox = document.getElementById('add_jquery_list'+id);
    var jQueryLink = "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>";
    if (checkBox.checked){
        document.getElementById('embed_code_list'+id).value = document.getElementById('embed_code_list'+id).value.replace(jQueryLink, "");
        document.getElementById('embed_code_list'+id).value = jQueryLink+document.getElementById('embed_code_list'+id).value;
    } else {
        document.getElementById('embed_code_list'+id).value = document.getElementById('embed_code_list'+id).value.replace(jQueryLink, "");
    }
}

// var uniqueNames = [];
function collectIds(id, message, status) {
    stat = status;
    if(message.checked){
        arr.push(id);
    } else {
        delete arr[arr.indexOf(id)];
    }
}













