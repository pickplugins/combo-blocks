jQuery(document).ready(function ($) {

    var debounce = null;

    $(document).on('submit change', '.combo-blocks .combo-blocks-search.ajax form', function (e) {

        e.preventDefault();



        //var keyword = $(this).val();
        var grid_id = $(this).attr('grid_id');
        //var key = e.which;
        $('#combo-blocks-' + grid_id + ' .search-loading').addClass('active');

        formData = $(this).serialize();

        var postGridWrap = document.querySelector('#combo-blocks-' + grid_id);

        var postgridargs = postGridWrap.getAttribute("data-options");

        postgridAttsObj = JSON.parse(postgridargs);

        var view_type = postgridAttsObj.view_type;




        var is_reset = 'no';
        //if(keyword.length>3){
        //$('#combo-blocks-'+grid_id+' .search-icon').html('<i class="fas fa-spin fa-spinner"></i>');

        //$('.pagination').fadeOut();

        $.ajax({
            type: 'POST',
            context: this,
            url: combo_blocks_ajax.combo_blocks_ajaxurl,
            data: { "action": "combo_blocks_ajax_search_free", "_wpnonce": combo_blocks_ajax._wpnonce, "grid_id": grid_id, "is_reset": is_reset, "formData": formData, },
            success: function (response) {

                var datas = JSON.parse(response);
                pagination = datas['pagination'];
                html = datas['html'];



                $('#combo-blocks-' + grid_id + ' .grid-items').html(html);
                //$('#combo-blocks-'+grid_id+' .search-icon').html('<i class="fas fa-search"></i>');
                $('#combo-blocks-' + grid_id + ' .pagination').html(pagination);
                $('#combo-blocks-' + grid_id + ' .search-loading').removeClass('active');

                if (view_type == "masonry") {



                    var $container = $('#combo-blocks-' + grid_id + ' .grid-items');



                    $container.masonry({
                        itemSelector: '.item',
                        columnWidth: '.item', //as you wish , you can use numeric
                        isAnimated: true,
                        isFitWidth: true,
                        horizontalOrder: true,
                        gutter: 20,
                        percentPosition: true,
                    });
                    $container.imagesLoaded().done(function () {
                        $container.masonry('layout');
                    });



                }

            }
        });
        //}

    })





    $(document).on('click', '.combo-blocks .paginate-ajax a.page-numbers', function (event) {
        event.preventDefault();

        $('.combo-blocks .paginate-ajax .page-numbers').removeClass('current');
        formData = $('.combo-blocks-search form').serialize();



        $(this).addClass('current');

        var current_page = parseInt($(this).text());
        var paged = parseInt($(this).attr('paged'));
        var grid_id = parseInt($(this).parent().attr('grid-id'));





        combo_blocks_masonry_enable = 'no';
        $.ajax(
            {
                type: 'POST',
                context: this,
                url: combo_blocks_ajax.combo_blocks_ajaxurl,
                data: { "action": "combo_blocks_paginate_ajax_free", "_wpnonce": combo_blocks_ajax._wpnonce, "grid_id": grid_id, "current_page": current_page, "formData": formData, },
                success: function (data) {

                    var response = JSON.parse(data)
                    var data = response['html'];
                    var pagination = response['pagination'];

                    if (combo_blocks_masonry_enable == 'yes') {

                        var $grid = $('#combo-blocks-' + grid_id + ' .grid-items').masonry({});
                        $grid.masonry('destroy');
                        $grid.html(data).masonry();

                        $grid.masonry('reloadItems');
                        $grid.masonry('layout');

                        $('#combo-blocks-' + grid_id + ' .grid-items').masonry({ "isFitWidth": true });
                        $('#paginate-ajax-' + grid_id).html(pagination);

                    }
                    else {
                        $('#combo-blocks-' + grid_id + ' .grid-items').html(data);
                        $('#paginate-ajax-' + grid_id).html(pagination);

                    }


                    $("#combo-blocks-" + grid_id).ScrollTo({
                        duration: 1000,
                        easing: 'linear'
                    });





                }
            });

    })




});






