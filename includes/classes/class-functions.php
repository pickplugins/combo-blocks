<?php

/*
* @Author 		pickplugins

*/

if (!defined('ABSPATH')) exit;  // if direct access

class ComboBlocksFunctions
{

    public function __construct() {}


    function get_posts_list($args)
    {


        $posts = [];
        $posts[''] = __("- Select -", 'combo-blocks');

        //$args = array('post_type' => 'combo_blocks_template');
        $the_query = new \WP_Query($args);
        if ($the_query->have_posts()) {
            while ($the_query->have_posts()) {
                $the_query->the_post();

                $post_id = get_the_ID();
                $post_title = get_the_title();

                $posts[$post_id] = $post_title;
            }
            wp_reset_postdata();
        }


        return $posts;
    }





    function get_query_orderby()
    {

        $args['ID'] = __('ID', 'combo-blocks');
        $args['author'] = __('Author', 'combo-blocks');
        $args['title'] = __('Title', 'combo-blocks');
        $args['name'] = __('Name', 'combo-blocks');
        $args['type'] = __('Type', 'combo-blocks');
        $args['date'] = __('Date', 'combo-blocks');
        $args['post_date'] = __('post_date', 'combo-blocks');
        $args['modified'] = __('modified', 'combo-blocks');
        $args['parent'] = __('Parent', 'combo-blocks');
        $args['rand'] = __('Random', 'combo-blocks');
        $args['comment_count'] = __('Comment count', 'combo-blocks');
        $args['menu_order'] = __('Menu order', 'combo-blocks');
        $args['meta_value'] = __('Meta value', 'combo-blocks');
        $args['meta_value_num'] = __('Meta Value(number)', 'combo-blocks');
        $args['post__in'] = __('post__in', 'combo-blocks');
        $args['post_name__in'] = __('post_name__in', 'combo-blocks');
        // $args['tec_event_start_date'] = __('tec_event_start_date', 'combo-blocks');

        return apply_filters('combo_blocks_orderby', $args);
    }

    function get_post_status()
    {

        $args['publish'] = __('Publish', 'combo-blocks');
        $args['pending'] = __('Pending', 'combo-blocks');
        $args['draft'] = __('Draft', 'combo-blocks');
        $args['auto-draft'] = __('Auto draft', 'combo-blocks');
        $args['future'] = __('Future', 'combo-blocks');
        $args['private'] = __('Private', 'combo-blocks');
        $args['inherit'] = __('Inherit', 'combo-blocks');
        $args['trash'] = __('Trash', 'combo-blocks');
        $args['any'] = __('Any', 'combo-blocks');
        // $args['tribe-ea-success'] = __('tribe-ea-success', 'combo-blocks');
        // $args['tribe-ea-failed'] = __('tribe-ea-failed', 'combo-blocks');
        // $args['tribe-ea-schedule'] = __('tribe-ea-schedule', 'combo-blocks');
        // $args['tribe-ea-pending'] = __('tribe-ea-pending', 'combo-blocks');
        // $args['tribe-ea-draft'] = __('tribe-ea-draft', 'combo-blocks');





        return apply_filters('combo_blocks_post_status', $args);
    }



    public function media_source()
    {

        $media_source = array(

            'featured_image' => array('id' => 'featured_image', 'title' => __('Featured Image', 'combo-blocks'), 'checked' => 'yes'),
            'first_image' => array('id' => 'first_image', 'title' => __('First images from content', 'combo-blocks'), 'checked' => 'yes'),
            'empty_thumb' => array('id' => 'empty_thumb', 'title' => __('Empty thumbnail', 'combo-blocks'), 'checked' => 'yes'),


        );

        $media_source = apply_filters('combo_blocks_filter_media_source', $media_source);

        return $media_source;
    }


    public function layout_items()
    {



        $layout_items['general'] = array(

            'name' => 'General',
            'description' => 'Default WordPress items for post.',
            'items' => array(

                'title' => array(
                    'name' => 'Title',
                    'dummy_html' => 'Lorem Ipsum is simply.',
                    'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),

                'title_link' => array(
                    'name' => 'Title with Link',
                    'dummy_html' => '<a href="#">Lorem Ipsum is simply</a>',
                    'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'content' => array(
                    'name' => 'Content',
                    'dummy_html' => 'Lorem',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'read_more' => array(
                    'name' => 'Read more',
                    'dummy_html' => '<a href="#">Read more</a>',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'thumb' => array(
                    'name' => 'Thumbnail',
                    'dummy_html' => '<img style="width:100%;" src="' . combo_blocks_root_url . 'assets/images/placeholder.png" />',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'thumb_link' => array(
                    'name' => 'Thumbnail with Link',
                    'dummy_html' => '<a href="#"><img style="width:100%;" src="' . combo_blocks_root_url . 'assets/images/placeholder.png" /></a>',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'excerpt' => array(
                    'name' => 'Excerpt',
                    'dummy_html' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'excerpt_read_more' => array(
                    'name' => 'Excerpt with Read more',
                    'dummy_html' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text <a href="#">Read more</a>',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'post_date' => array(
                    'name' => 'Post date',
                    'dummy_html' => '18/06/2015',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'author' => array(
                    'name' => 'Author',
                    'dummy_html' => 'PickPlugins',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'author_link' => array(
                    'name' => 'Author with Link',
                    'dummy_html' => 'Lorem',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'categories' => array(
                    'name' => 'Categories',
                    'dummy_html' => '<a hidden="#">Category 1</a> <a hidden="#">Category 2</a>',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'tags' => array(
                    'name' => 'Tags',
                    'dummy_html' => '<a hidden="#">Tags 1</a> <a hidden="#">Tags 2</a>',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'comments_count' => array(
                    'name' => 'Comments Count',
                    'dummy_html' => '3 Comments',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'comments' => array(
                    'name' => 'Comments',
                    'dummy_html' => 'Lorem',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'rating_widget' => array(
                    'name' => 'Rating-Widget: Star Review System',
                    'dummy_html' => 'Lorem',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),
                'share_button' => array(
                    'name' => 'Share button',
                    'dummy_html' => '<i class="fa fa-facebook-square"></i> <i class="fa fa-twitter-square"></i> <i class="fa fa-google-plus-square"></i>',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),

                'hr' => array(
                    'name' => 'Horizontal line',
                    'dummy_html' => '<hr />',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),

                'five_star' => array(
                    'name' => 'Five star',
                    'dummy_html' => 'Star',
                    'css' => 'display: block;font-size: 13px;line-height: normal;padding: 5px 10px;text-align: left;',
                ),


            ),

        );


        $layout_items = apply_filters('combo_blocks_filter_layout_items', $layout_items);

        return $layout_items;
    }


    public function layout_content_list()
    {

        $layout_content_list = array(

            'flat' => array(

                '0' => array(
                    'key' => 'media',
                    'custom_class' => '',
                    'media_source' =>
                    array(
                        'featured_image' =>
                        array(
                            'enable' => 'yes',
                            'image_size' => 'large',
                            'link_to' => 'post_link',
                            'link_target' => '_self',
                        ),
                        'first_image' =>
                        array(
                            'enable' => 'no',
                            'link_to' => 'post_link',
                            'link_target' => '_self',
                        ),
                        'empty_thumb' =>
                        array(
                            'enable' => 'no',
                            'link_to' => 'post_link',
                            'link_target' => '_self',
                            'default_thumb_src' => '',
                        ),
                        'siteorigin_first_image' =>
                        array(
                            'enable' => 'no',
                            'link_to' => 'none',
                            'link_target' => '_self',
                        ),
                    ),
                    'media_height' =>
                    array(
                        'large_type' => 'auto_height',
                        'large' => '',
                        'medium_type' => 'auto_height',
                        'medium' => '',
                        'small_type' => 'auto_height',
                        'small' => '',
                    ),
                    'margin' => '',
                    'padding' => '',
                    'css' => 'max-width:100%;height:auto;',
                    'css_hover' => '',


                    'name' => 'Title with linked',
                    'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: left; text-decoration: none;',
                    'css_hover' => '',
                ),

                '1' => array('key' => 'title_link', 'char_limit' => '20', 'name' => 'Title with linked', 'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: left; text-decoration: none;', 'css_hover' => '',),
                '2' => array('key' => 'excerpt', 'char_limit' => '20', 'name' => 'Excerpt', 'css' => 'display: block;font-size: 14px;padding: 5px 10px;text-align: left;', 'css_hover' => ''),
                '3' => array('key' => 'read_more', 'name' => 'Read more', 'css' => 'display: block;font-size: 12px;font-weight: bold;padding: 0 10px;text-align: left;text-decoration: none;', 'css_hover' => ''),

            ),

            'flat-center' => array(
                '0' => array('key' => 'title_link', 'char_limit' => '20', 'name' => 'Title with linked', 'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: center;text-decoration: none;', 'css_hover' => ''),
                '1' => array('key' => 'excerpt', 'char_limit' => '20', 'name' => 'Excerpt', 'css' => 'display: block;font-size: 14px;padding: 5px 10px;text-align: center;', 'css_hover' => ''),
                '2' => array('key' => 'read_more', 'name' => 'Read more', 'css' => 'display: block;font-size: 12px;font-weight: bold;padding: 0 10px;text-align: center;', 'css_hover' => ''),

            ),

            'flat-right' => array(
                '0' => array('key' => 'title_link', 'char_limit' => '20', 'name' => 'Title with linked', 'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: right;text-decoration: none;', 'css_hover' => ''),
                '1' => array('key' => 'excerpt', 'char_limit' => '20', 'name' => 'Excerpt', 'css' => 'display: block;font-size: 14px;padding: 5px 10px;text-align: right;', 'css_hover' => ''),
                '2' => array('key' => 'read_more', 'name' => 'Read more', 'css' => 'display: block;font-size: 12px;font-weight: bold;padding: 0 10px;text-align: right;', 'css_hover' => ''),
            ),

            'flat-left' => array(
                '0' => array('key' => 'title_link', 'char_limit' => '20', 'name' => 'Title with linked', 'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: left;text-decoration: none;', 'css_hover' => ''),

                '1' => array('key' => 'excerpt', 'char_limit' => '20', 'name' => 'Excerpt', 'css' => 'display: block;font-size: 14px;padding: 5px 10px;text-align: left;', 'css_hover' => ''),
                '2' => array('key' => 'read_more', 'name' => 'Read more', 'css' => 'display: block;font-size: 12px;font-weight: bold;padding: 0 10px;text-align: left;', 'css_hover' => '')
            ),

            'wc-center-price' => array(
                '0' => array('key' => 'title_link', 'char_limit' => '20', 'name' => 'Title with linked', 'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: center;text-decoration: none;', 'css_hover' => ''),
                '1' => array('key' => 'wc_full_price', 'name' => 'Price', 'css' => 'background:#f9b013;color:#fff;display: inline-block;font-size: 20px;line-height:normal;padding: 0 17px;text-align: center;', 'css_hover' => ''),
                '2' => array('key' => 'excerpt', 'char_limit' => '20', 'name' => 'Excerpt', 'css' => 'display: block;font-size: 14px;padding: 5px 10px;text-align: center;', 'css_hover' => ''),
            ),

            'wc-center-cart' => array(
                '0' => array('key' => 'title_link', 'char_limit' => '20', 'name' => 'Title with linked', 'css' => 'display: block;font-size: 21px;line-height: normal;padding: 5px 10px;text-align: center;text-decoration: none;', 'css_hover' => ''),
                '1' => array('key' => 'wc_gallery', 'name' => 'Add to Cart', 'css' => 'color:#555;display: inline-block;font-size: 13px;line-height:normal;padding: 0 17px;text-align: center;', 'css_hover' => ''),

                '2' => array('key' => 'excerpt', 'char_limit' => '20', 'name' => 'Excerpt', 'css' => 'display: block;font-size: 14px;padding: 5px 10px;text-align: center;', 'css_hover' => ''),
            ),

        );

        $layout_content_list = apply_filters('combo_blocks_filter_layout_content_list', $layout_content_list);


        return $layout_content_list;
    }



    public function layout_content($layout)
    {

        $layout_content = $this->layout_content_list();

        return $layout_content[$layout];
    }


    public function skins()
    {

        $skins = array(



            'flat' => array(
                'slug' => 'flat',
                'name' => 'Flat',
                'thumb_url' => '',
            ),
            'flip-x' => array(
                'slug' => 'flip-x',
                'name' => 'Flip-x',
                'thumb_url' => '',
            ),
            'spinright' => array(
                'slug' => 'spinright',
                'name' => 'SpinRight',
                'thumb_url' => '',
            ),
            'thumbgoleft' => array(
                'slug' => 'thumbgoleft',
                'name' => 'ThumbGoLeft',
                'thumb_url' => '',
            ),
            'thumbrounded' => array(
                'slug' => 'thumbrounded',
                'name' => 'ThumbRounded',
                'thumb_url' => '',
            ),
            'contentbottom' => array(
                'slug' => 'contentbottom',
                'name' => 'ContentBottom',
                'thumb_url' => '',
            ),





        );

        $skins = apply_filters('combo_blocks_filter_skins', $skins);

        return $skins;
    }
}
