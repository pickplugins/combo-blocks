<?php
if (!defined('ABSPATH'))	exit();



class ComboBlocksRest
{
	function __construct()
	{
		add_action('rest_api_init', array($this, 'register_routes'));
	}
	public function register_routes()
	{
		register_rest_field(
			'page',
			'pgc_meta',
			array(
				'get_callback' => function () {
					$metaValue = get_post_meta(get_the_ID(), 'pgc_meta', true);
					return $metaValue;
				},
				'update_callback' => function ($value, $object, $field_name) {
					return update_post_meta($object->ID, 'pgc_meta', $value);
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/generate_css_file',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'generate_css_file'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/update_reactions',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'update_reactions'),
				'permission_callback' => '__return_true',

			)
		);



		register_rest_route(
			'combo-blocks/v2',
			'/update_options',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'update_options'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/pmpro_membership_levels',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'pmpro_membership_levels'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/mepr_memberships',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'mepr_memberships'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/block_categories',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'block_categories'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/activate_license',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'activate_license'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/deactivate_license',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'deactivate_license'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/check_icense',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'check_icense'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_options',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_options'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/fluentcrm_lists',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'fluentcrm_lists'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/fluentcrm_tags',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'fluentcrm_tags'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/mailpicker_lists',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'mailpicker_lists'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/wordpress_org_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'wordpress_org_data'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/user_roles_list',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'user_roles_list'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/process_form_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'process_form_data'),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/loggedout_current_user',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'loggedout_current_user'),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_user_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_user_data'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_user_meta',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_user_meta'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_comment_count',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_comment_count'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_plugin_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_plugin_data'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_image_sizes',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_image_sizes'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_site_details',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_site_details'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_site_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_site_data'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/email_subscribe',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'email_subscribe'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_license',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_license'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_pro_info',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_pro_info'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_post_meta',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_post_meta'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_shortcode',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_shortcode'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_all_terms',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_all_terms'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/post_types',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_post_types'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_post_statuses',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_post_statuses'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/post_type_objects',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_post_type_objects'),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_posts',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_posts'),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_terms',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_terms'),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_users',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_users'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_post_data',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_post_data'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_posts_layout',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_posts_layout'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/import_combo_blocks_template',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'import_combo_blocks_template'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/get_tax_terms',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'get_tax_terms'),
				'permission_callback' => function () {
					return current_user_can('edit_posts');
				},
			)
		);
		register_rest_route(
			'combo-blocks/v2',
			'/send_mail',
			array(
				'methods' => 'POST',
				'callback' => array($this, 'send_mail'),
				'permission_callback' => function () {
					return current_user_can('manage_options');
				},
			)
		);
	}
	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_posts_layout($post_data)
	{
		$query_args = [];
		$nonce = isset($post_data['_wpnonce']) ? $post_data['_wpnonce'] : "";
		if (!wp_verify_nonce($nonce, 'wp_rest')) return $query_args;
		$category = isset($post_data['category']) ? $post_data['category'] : '';
		$keyword = isset($post_data['keyword']) ? $post_data['keyword'] : '';
		$response = [];
		$tax_query = [];
		$query_args['post_type'] = 'combo_blocks_template';
		if (!empty($keyword)) {
			$query_args['s'] = $keyword;
		}
		if (!empty($category)) {
			$tax_query[] = array(
				'taxonomy' => 'template_cat',
				'field' => 'term_id',
				'terms' => $category,
			);
			$query_args['tax_query'] = $tax_query;
		}
		$posts = [];
		$wp_query = new WP_Query($query_args);
		if ($wp_query->have_posts()) :
			while ($wp_query->have_posts()) :
				$wp_query->the_post();
				$post = get_post(get_the_id());
				$post_id = $post->ID;
				$post->post_id = $post->ID;
				$post->post_title = $post->post_title;
				//$post->post_content = $post->post_content;
				$thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
				$thumb_url = isset($thumb[0]) ? $thumb[0] : '';
				$post->thumb_url = !empty($thumb_url) ? $thumb_url : combo_blocks_url . 'assets/images/placeholder.png';
				$post->is_pro = false;
				$price = get_post_meta($post_id, 'price', true);
				$post->price = !empty($price) ? $price : 5;
				$sale_price = get_post_meta($post_id, 'sale_price', true);
				$post->sale_price = !empty($sale_price) ? $sale_price : 0;
				$post->buy_link = '#';
				$posts[] = $post;
			endwhile;
			wp_reset_query();
			wp_reset_postdata();
		endif;
		$response['posts'] = $posts;
		$terms = get_terms(
			array(
				'taxonomy' => 'template_cat',
				'hide_empty' => true,
				'post_type' => 'combo_blocks_layout',
			)
		);
		$termsList = [];
		foreach ($terms as $term) {
			$termsList[] = ['label' => $term->name, 'value' => $term->term_id];
		}
		$response['terms'] = $termsList;
		die(wp_json_encode($response));
	}
	/**
	 * Return wordpress_org_data
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function wordpress_org_data($request)
	{
		$response = [];
		if (!current_user_can('manage_options')) {
			die(wp_json_encode($response));
		}
		$objSlug = isset($request['slug']) ? $request['slug'] : '';
		$objType = isset($request['type']) ? $request['type'] : '';
		$blockId = isset($request['blockId']) ? $request['blockId'] : '';
		$transient_args = serialize(array('slug' => $objSlug, 'type' => $objType));
		$transient = unserialize(get_transient($blockId . '_args'));
		$transientData = get_transient($blockId . '_data');
		// if(!isset($transient['slug'])) return [];
		$saved_slug = isset($transient['slug']) ? $transient['slug'] : '';
		if ($objSlug == $saved_slug) {
			if (!empty($transientData)) {
				$response['data'] = $transientData;
			}
		} else {
			if (!empty($objSlug)) {
				if ($objType == 'plugin') {
					$fields = array(
						'active_installs' => true,
						// rounded int
						'added' => true,
						// date
						'author' => true,
						// a href html
						'author_block_count' => true,
						// int
						'author_block_rating' => true,
						// int
						'author_profile' => true,
						// url
						'banners' => true,
						// array( [low], [high] )
						'compatibility' => false,
						// empty array?
						'contributors' => true,
						// array( array( [profile], [avatar], [display_name] )
						'description' => false,
						// string
						'donate_link' => true,
						// url
						'download_link' => true,
						// url
						'downloaded' => false,
						// int
						// 'group' => false,                 // n/a 
						'homepage' => true,
						// url
						'icons' => false,
						// array( [1x] url, [2x] url )
						'last_updated' => true,
						// datetime
						'name' => true,
						// string
						'num_ratings' => true,
						// int
						'rating' => true,
						// int
						'ratings' => true,
						// array( [5..0] )
						'requires' => true,
						// version string
						'requires_php' => true,
						// version string
						'reviews' => false,
						// n/a, part of 'sections'
						'screenshots' => false,
						// array( array( [src], [caption] ) )
						'sections' => false,
						// array( [description], [installation], [changelog], [reviews], ...)
						'short_description' => false,
						// string
						//'slug' => true,                      // string
						'support_threads' => true,
						// int
						'support_threads_resolved' => true,
						// int
						'tags' => true,
						// array( )
						'tested' => true,
						// version string
						'version' => true,
						// version string
						'versions' => false,
						// array( [version] url )
					);
					require_once(ABSPATH . 'wp-admin/includes/plugin-install.php');
					$bodyObj = plugins_api('plugin_information', array('slug' => $objSlug, 'fields' => $fields));
				}
				if ($objType == 'theme') {
					$fields = array(
						'description' => true,
						// rounded int
						'sections' => false,
						// array( [description], [installation], [changelog], [reviews], ...)
						'rating' => true,
						// int
						'ratings' => true,
						// array( [5..0] )
						'downloadlink' => true,
						// url
						'downloaded' => true,
						// int
						'last_updated' => true,
						// datetime
						'tags' => true,
						// array( )
						'homepage' => true,
						// url
						'screenshots' => true,
						// array( array( [src], [caption] ) )
						'screenshot_count' => false,
						// array( array( [src], [caption] ) )
						'screenshot_url' => true,
						// array( array( [src], [caption] ) )
						'photon_screenshots' => false,
						// array( array( [src], [caption] ) )
						'template' => true,
						// array( array( [src], [caption] ) )
						'parent' => true,
						// parent 
						'versions' => false,
						// array( [version] url )
						'theme_url' => true,
						// array( [version] url )
						'extended_author' => false,
						// array( [version] url )
					);
					require_once(ABSPATH . 'wp-admin/includes/theme.php');
					$bodyObj = themes_api('theme_information', array('slug' => $objSlug, 'fields' => $fields));
				}
				$response['data'] = $bodyObj;
			}
		}
		//
		die(wp_json_encode($response));
	}
	/**
	 * Return update_options
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function update_options($request)
	{
		$response = [];
		$name = isset($request['name']) ? sanitize_text_field($request['name']) : '';
		$value = isset($request['value']) ? combo_blocks_recursive_sanitize_arr($request['value']) : '';
		$message = "";
		if (!empty($value)) {
			$status = update_option($name, $value);
			$message = __("Options updated", "combo-blocks");
		} else {
			$status = false;
			$message = __("Value should not empty", "combo-blocks");
		}
		$response['status'] = $status;
		$response['message'] = $message;
		die(wp_json_encode($response));
	}


	/**
	 * Return generate_css_file
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function generate_css_file($request)
	{
		$response = [];
		$css = isset($request['css']) ? sanitize_text_field($request['css']) : '';
		$name = isset($request['name']) ? sanitize_text_field($request['name']) : '';
		$view = isset($request['view']) ? combo_blocks_recursive_sanitize_arr($request['view']) : [];
		$viewType = isset($view['type']) ? sanitize_text_field($view['type']) : 'post';
		$viewId = isset($view['id']) ? sanitize_text_field($view['id']) : '';
		if ($viewType != 'post') return;

		update_post_meta($viewId, 'combo_blocks_generate_css', 0);

		die();


		$response['status'] = '';
		$file_name = $name . '-' . $viewId . '.css';
		$custom_data = $css;
		// Step 1: Define the directory where the file will be created
		$upload_dir = wp_upload_dir();
		$custom_dir = $upload_dir['basedir'] . '/combo-blocks';
		// Create the directory if it doesn't exist
		if (!file_exists($custom_dir)) {
			wp_mkdir_p($custom_dir);
		}
		// Step 2: Define the file path
		$file_path = $custom_dir . '/' . sanitize_file_name($file_name);
		// Step 3: Create the file and write the custom data
		if ($file_handle = fopen($file_path, 'w')) {
			// Open the file for writing (w)
			fwrite($file_handle, $custom_data); // Write the custom data to the file
			fclose($file_handle); // Close the file after writing
			// Optionally, add the file to the WordPress media library

			$file_path = $upload_dir['baseurl'] . '/combo-blocks/' . $file_name;

			$attachment = array(
				'guid'           => $file_path,
				'post_mime_type' => 'text/css', // Adjust the MIME type based on the file type
				'post_title'     => sanitize_file_name($file_name),
				'post_content'   => '',
				'post_status'    => 'hidden'
			);




			if ($viewType == 'post') {


				$combo_blocks_css_file_id = get_post_meta($viewId, "combo_blocks_css_file_id", true);

				//if (empty($combo_blocks_css_file_id)) {
				error_log("combo_blocks_css_file_id" . $combo_blocks_css_file_id);

				wp_delete_attachment($combo_blocks_css_file_id);

				if (file_exists($file_path)) {
					unlink($file_path); // Deletes the old file
				}

				$attach_id = wp_insert_attachment($attachment, $file_path);
				require_once(ABSPATH . 'wp-admin/includes/image.php');
				$attach_data = wp_generate_attachment_metadata($attach_id, $file_path);
				wp_update_attachment_metadata($attach_id, $attach_data);
				update_post_meta($viewId, 'combo_blocks_css_file_id', $attach_id);
				//}
			}
			//return $attach_id; // Return attachment ID
		} else {
			//return false; // Failed to create the file
		}
		die(wp_json_encode($response));
	}










	/**
	 * Return pmpro_membership_levels
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function pmpro_membership_levels($request)
	{
		$response = [];
		if (function_exists('pmpro_getAllLevels')) {
			$levels = pmpro_getAllLevels(false, true);
			foreach ($levels as $level) {
				$response[] = ["id" => $level->id, "name" => $level->name];
			}
		}
		//$response['status'] = $status;
		//$response['message'] = $message;
		die(wp_json_encode($response));
	}
	/**
	 * Return mepr_memberships
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function mepr_memberships($request)
	{
		$response = [];
		$name = isset($request['name']) ? sanitize_text_field($request['name']) : '';
		$value = isset($request['value']) ? combo_blocks_recursive_sanitize_arr($request['value']) : '';
		//$levels = pmpro_getAllLevels(false, true);
		$args = array(
			'numberposts' => -1,
			'post_type'   => 'memberpressproduct'
		);
		$latest_books = get_posts($args);
		foreach ($latest_books as $level) {
			$response[] = ["value" => $level->ID, "label" => $level->post_title];
		}
		//$response['status'] = $status;
		//$response['message'] = $message;
		die(wp_json_encode($response));
	}
	/**
	 * Return update_options
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function block_categories($request)
	{
		$response = [];
		$name = isset($request['name']) ? sanitize_text_field($request['name']) : '';
		$response = get_default_block_categories();
		//$response['status'] = $status;
		die(wp_json_encode($response));
	}
	/**
	 * Return activate_license
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function activate_license($request)
	{
		$response = [];
		$license_key = isset($request['license_key']) ? sanitize_text_field($request['license_key']) : '';
		if (is_multisite()) {
			$domain = site_url();
		} else {
			$domain = $_SERVER['SERVER_NAME'];
		}
		//$license_key = "3410E9CF-6362-4A36-AF6E-1D01BB2AEE02";
		// API query parameters
		$api_params = array(
			'license_manager_action' => "license_data",
			'registered_domain' => $domain,
			'license_key' => $license_key,
		);
		// Send query to the license manager server
		$response = wp_remote_post(add_query_arg($api_params, "https://www.pickplugins.com"), array('timeout' => 20, 'sslverify' => false));
		// Check for error in the response
		if (is_wp_error($response)) {
			echo __("Unexpected Error! The query returned with an error.", 'combo-blocks');
		} else {
			// License data.
			$license_data = json_decode(wp_remote_retrieve_body($response));


			$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
			$date_expiry = isset($license_data->date_expiry) ? sanitize_text_field($license_data->date_expiry) : '';
			$date_renewed = isset($license_data->date_renewed) ? sanitize_text_field($license_data->date_renewed) : '';

			$license_status = isset($license_data->license_status) ? sanitize_text_field($license_data->license_status) : '';
			$license_found = isset($license_data->license_found) ? sanitize_text_field($license_data->license_found) : '';
			$mgs = isset($license_data->mgs) ? sanitize_text_field($license_data->mgs) : '';
			$days_remaining = isset($license_data->days_remaining) ? sanitize_text_field($license_data->days_remaining) : '';

			$combo_blocks_license = array(
				'license_key' => $license_key,
				'date_created' => $date_created,
				'date_expiry' => $date_expiry,
				'date_renewed' => $date_renewed,

				'license_status' => $license_status,
				'license_found' => $license_found,
				'mgs' => $mgs,
				'days_remaining' => $days_remaining,
			);

			update_option('combo_blocks_license', $combo_blocks_license);

			//$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
			//$response['status'] = $status;
		}
		die(wp_json_encode($combo_blocks_license));
	}
	/**
	 * Return activate_license
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function deactivate_license($request)
	{
		$response = [];
		$license_key = isset($request['license_key']) ? sanitize_text_field($request['license_key']) : '';
		$instance_id = isset($request['instance_id']) ? sanitize_text_field($request['instance_id']) : '';
		if (is_multisite()) {
			$domain = site_url();
		} else {
			$domain = $_SERVER['SERVER_NAME'];
		}
		//$license_key = "3410E9CF-6362-4A36-AF6E-1D01BB2AEE02";
		// API query parameters
		$api_params = array(
			'license_manager_action' => "license_data",
			'registered_domain' => $domain,
			'license_key' => $license_key,
		);
		// Send query to the license manager server
		$response = wp_remote_post(add_query_arg($api_params, "https://www.pickplugins.com"), array('timeout' => 20, 'sslverify' => false));
		// Check for error in the response
		if (is_wp_error($response)) {
			echo __("Unexpected Error! The query returned with an error.", 'combo-blocks');
		} else {
			// License data.
			$license_data = json_decode(wp_remote_retrieve_body($response));
			//$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
			//$response['status'] = $status;
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return activate_license
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function check_icense($request)
	{
		$response = [];
		$license_key = isset($request['license_key']) ? sanitize_text_field($request['license_key']) : '';
		if (is_multisite()) {
			$domain = site_url();
		} else {
			$domain = $_SERVER['SERVER_NAME'];
		}
		//$license_key = "3410E9CF-6362-4A36-AF6E-1D01BB2AEE02";
		// API query parameters
		$api_params = array(
			'license_manager_action' => "license_data",
			'registered_domain' => $domain,
			'license_key' => $license_key,
		);
		// Send query to the license manager server
		$response = wp_remote_post(add_query_arg($api_params, "https://www.pickplugins.com"), array('timeout' => 20, 'sslverify' => false));
		// Check for error in the response
		if (is_wp_error($response)) {
			echo __("Unexpected Error! The query returned with an error.", 'combo-blocks');
		} else {
			// License data.
			$license_data = json_decode(wp_remote_retrieve_body($response));

			//$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
			//$response['status'] = $status;
		}
		die(wp_json_encode($license_data));
	}
	/**
	 * Return get_options
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_options($request)
	{
		$response = [];
		$option = isset($request['option']) ? $request['option'] : '';
		$response = get_option($option);
		// $response['customFonts'] = [];
		// $response['googleFonts'] = [];
		// $response['container']['width'] = '1155px';
		// $response['breakpoints'] = [];
		// $response['colors'] = ['#fff'];
		// $response['editor']['width'] = '1155px';
		// $response['blocks']['disabled'] = [];
		// $response['license']['key'] = '';
		// $response['license']['status'] = '';
		// $response['license']['created'] = '';
		// $response['license']['renewed'] = '';
		// $response['license']['expire'] = '';
		die(wp_json_encode($response));
	}
	/**
	 * Return mailpicker_lists
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function mailpicker_lists($request)
	{
		$response = [];
		//$formdata      = isset($request['formdata']) ? $request['formdata'] : 'no data';
		$terms = get_terms(
			array(
				'taxonomy' => 'subscriber_list',
				'hide_empty' => 0,
				'post_type' => 'subscriber',
			)
		);
		foreach ($terms as $term) {
			$title = isset($term->name) ? $term->name : '';
			$id = isset($term->term_id) ? $term->term_id : '';
			$slug = isset($term->slug) ? $term->slug : '';
			$response[$id]['title'] = $title;
			$response[$id]['id'] = $id;
			$response[$id]['slug'] = $slug;
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return fluentcrm_lists
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function fluentcrm_lists($request)
	{
		$response = [];
		//$formdata      = isset($request['formdata']) ? $request['formdata'] : 'no data';
		if (!function_exists("FluentCrmApi")) {
			die(wp_json_encode($response));
			exit(0);
		}
		$listApi = FluentCrmApi('lists');
		$lists = $listApi->get();
		foreach ($lists as $list) {
			$title = $list->title;;
			$id = $list->id;;
			$slug = $list->slug;;
			$response[$id]['title'] = $title;
			$response[$id]['id'] = $id;
			$response[$id]['slug'] = $slug;
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return fluentcrm_tags
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function fluentcrm_tags($request)
	{
		$response = [];
		//$formdata      = isset($request['formdata']) ? $request['formdata'] : 'no data';
		if (!function_exists("FluentCrmApi")) {
			die(wp_json_encode($response));
			exit(0);
		}
		$listApi = FluentCrmApi('tags');
		$tags = $listApi->get();
		foreach ($tags as $tag) {
			$title = $tag->title;;
			$id = $tag->id;;
			$slug = $tag->slug;;
			$response[$id]['title'] = $title;
			$response[$id]['id'] = $id;
			$response[$id]['slug'] = $slug;
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return process_form_data
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $request Post data.
	 */
	public function process_form_data($request)
	{
		$response = [];
		$data = $request->get_body();
		$formFieldNames = $request->get_param('formFieldNames');
		$_wpnonce = $request->get_param('_wpnonce');
		$_wp_http_referer = $request->get_param('_wp_http_referer');
		$formType = $request->get_param('formType');
		$onprocessargs = $request->get_param('onprocessargs');
		$onprocessargs = json_decode($onprocessargs);
		if (!wp_verify_nonce($_wpnonce, 'wp_rest')) {
			$response['errors']['nonce_check_failed'] = __('Security Check Failed', 'combo-blocks');
			return $response;
		}
		$formFieldArr = explode(',', $formFieldNames);
		$formFields = [];
		foreach ($formFieldArr as $formField) {
			if ($formField == 'formType' || $formField == 'onprocessargs' || $formField == '_wp_http_referer' || $formField == '_wpnonce') {
				continue;
			}
			$formFieldValue = $request->get_param($formField);
			$formFields[$formField] = $formFieldValue;
		}
		if (empty($errors)) {
			$process_form = apply_filters('combo_blocks_form_wrap_process_' . $formType, $formFields, $onprocessargs, $request);
			$response = $process_form;
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return update_reactions
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $request Post data.
	 */
	public function update_reactions($request)
	{
		$response = [];
		$_wpnonce = $request->get_param('_wpnonce');
		$objId = (int)$request->get_param('objId');
		$objType = $request->get_param('objType');
		$reaction = $request->get_param('reaction');
		$objAction = $request->get_param('action');


		$meta_key = "combo_blocks_reactions";

		$_wp_http_referer = $request->get_param('_wp_http_referer');
		if (!wp_verify_nonce($_wpnonce, 'wp_rest')) {
			$response['errors']['nonce_check_failed'] = __('Security Check Failed', 'combo-blocks');
			return $response;
		}
		$combo_blocks_reactions = [];

		if ($objAction == 'add') {


			if ($objType == 'post') {
				$combo_blocks_reactions = get_post_meta($objId, $meta_key, true);


				$combo_blocks_reactions = empty($combo_blocks_reactions) ?  [] : $combo_blocks_reactions;

				if (!isset($combo_blocks_reactions[$reaction])) {
					$combo_blocks_reactions[$reaction] = 0;
				}

				$combo_blocks_reactions[$reaction] += 1;


				update_post_meta($objId, $meta_key, $combo_blocks_reactions);
			}
		}
		if ($objAction == 'update') {


			if ($objType == 'post') {
				$combo_blocks_reactions = get_post_meta($objId, $meta_key, true);


				$combo_blocks_reactions = empty($combo_blocks_reactions) ?  [] : $combo_blocks_reactions;

				if (!isset($combo_blocks_reactions[$reaction])) {
					$combo_blocks_reactions[$reaction] = 0;
				}

				$combo_blocks_reactions[$reaction] += 1;


				update_post_meta($objId, $meta_key, $combo_blocks_reactions);
			}
		}




		if (empty($errors)) {
		}
		die(wp_json_encode($combo_blocks_reactions));
	}










	/**
	 * Return user_roles_list
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function user_roles_list($request)
	{
		$response = [];
		$formdata = isset($request['formdata']) ? $request['formdata'] : 'no data';
		global $wp_roles;
		$roles = [];
		if ($wp_roles && property_exists($wp_roles, 'roles')) {
			$rolesAll = isset($wp_roles->roles) ? $wp_roles->roles : [];
			foreach ($rolesAll as $roleIndex => $role) {
				$roles[$roleIndex] = $role['name'];
			}
		}
		$response['roles'] = $roles;
		die(wp_json_encode($response));
	}
	/**
	 * Return loggedout_current_user
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function loggedout_current_user($request)
	{
		$response = [];
		$formdata = isset($request['formdata']) ? $request['formdata'] : 'no data';
		$_wpnonce = $request->get_param('_wpnonce');
		if (!wp_verify_nonce($_wpnonce, 'wp_rest')) {
			$response['errors']['nonce_check_failed'] = __('Security Check Failed', 'combo-blocks');
			return $response;
		}
		wp_destroy_current_session();
		wp_clear_auth_cookie();
		wp_set_current_user(0);
		die(wp_json_encode($response));
	}
	/**
	 * Return import_combo_blocks_template
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function import_combo_blocks_template($post_data)
	{
		$response = [];
		if (!current_user_can('manage_options')) {
			die(wp_json_encode($response));
		}
		$postData = isset($post_data['postData']) ? $post_data['postData'] : '';
		$post_content = isset($postData['post_content']) ? $postData['post_content'] : '';
		$post_title = isset($postData['post_title']) ? $postData['post_title'] : '';
		if (empty($post_content))
			die(wp_json_encode($response));
		$newPostId = wp_insert_post(
			array(
				'post_title' => $post_title,
				'post_content' => $post_content,
				'post_status' => 'publish',
				'post_type' => 'combo_blocks_template',
			)
		);
		die(wp_json_encode($response));
	}
	/**
	 * Return get_user_data
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_user_data($post_data)
	{
		$id = isset($post_data['id']) ? $post_data['id'] : '';
		$fields = isset($post_data['fields']) ? $post_data['fields'] : '';
		$response = [];
		if (empty($id))
			die(wp_json_encode($response));
		$user = get_user_by('ID', $id);
		$response['id'] = $id;
		// $response['login'] = $user->user_login;
		//$response['nicename'] = $user->user_nicename;
		//$response['email'] = $user->user_email;
		$response['url'] = isset($user->user_url) ? $user->user_url : '';
		$response['registered'] = isset($user->user_registered) ? $user->user_registered : '';
		$response['display_name'] = isset($user->display_name) ? $user->display_name : '';
		$response['first_name'] = isset($user->first_name) ? $user->first_name : '';
		$response['last_name'] = isset($user->last_name) ? $user->last_name : '';
		$response['description'] = isset($user->description) ? $user->description : '';
		$response['avatar_url'] = get_avatar_url($id);
		$response['posts_url'] = get_author_posts_url($id);
		if (!empty($fields))
			foreach ($fields as $field) {
				$meta = get_user_meta($id, $field, true);
				$response[$field] = $meta;
			}
		die(wp_json_encode($response));
	}
	/**
	 * Return get_user_meta
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_user_meta($post_data)
	{
		$id = isset($post_data['id']) ? $post_data['id'] : '';
		$meta_key = isset($post_data['meta_key']) ? $post_data['meta_key'] : '';
		$response = [];
		if (empty($meta_key))
			die(wp_json_encode($response));
		$user = get_user_by('ID', $id);
		if ($meta_key == 'id') {
			$response['id'] = $id;
		} else if ($meta_key == 'login') {
			$response['login'] = $user->user_login;
		} else if ($meta_key == 'nicename') {
			$response['nicename'] = $user->user_nicename;
		} else if ($meta_key == 'email') {
			$response['email'] = $user->user_email;
		} else if ($meta_key == 'url') {
			$response['url'] = $user->user_url;
		} else if ($meta_key == 'registered') {
			$response['registered'] = $user->user_registered;
		} else if ($meta_key == 'display_name') {
			$response['display_name'] = $user->display_name;
		} else if ($meta_key == 'first_name') {
			$response['first_name'] = $user->first_name;
		} else if ($meta_key == 'last_name') {
			$response['last_name'] = $user->last_name;
		} else if ($meta_key == 'description') {
			$response['description'] = $user->description;
		} else if ($meta_key == 'avatar_url') {
			$response['avatar_url'] = get_avatar_url($id);
		} else {
			$meta = get_user_meta($id, $meta_key, true);
			$response[$meta_key] = $meta;
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return get_comment_count
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_comment_count($post_data)
	{
		$post_id = isset($post_data['id']) ? $post_data['id'] : '';
		//$status    = isset($post_data['status']) ? $post_data['status'] : '';
		$response = [];
		if (empty($post_id))
			die(wp_json_encode($response));
		$counts = wp_count_comments($post_id);
		$response = $counts;
		die(wp_json_encode($response));
	}
	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_post_data($post_data)
	{
		$postId = isset($post_data['postId']) ? $post_data['postId'] : '';
		$fields = isset($post_data['fields']) ? $post_data['fields'] : [];
		$response = new stdClass();
		$post = get_post($postId);
		$response->ID = $post->ID;
		$response->post_title = $post->post_title;
		$response->post_content = $post->post_content;
		$taxonomies = get_object_taxonomies(get_post_type($postId));
		if (!empty($taxonomies))
			foreach ($taxonomies as $taxonomy) {
				$terms = get_the_terms($postId, $taxonomy);
				$termsData = [];
				if (!empty($terms))
					foreach ($terms as $index => $term) {
						$termsData[$index]['term_id'] = $term->term_id;
						$termsData[$index]['name'] = $term->name;
						$termsData[$index]['slug'] = $term->slug;
						$termsData[$index]['count'] = $term->count;
						$termsData[$index]['url'] = get_term_link($term->term_id);
					}
				if (!empty($termsData))
					$response->$taxonomy = $termsData;
			}
		// $post_id = $post->ID;
		// $post->post_id = $post->ID;
		// $post->post_title = $post->post_title;
		// $post->post_content = $post->post_content;
		// $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
		// $thumb_url = isset($thumb[0]) ? $thumb[0] : '';
		// $post->thumb_url = !empty($thumb_url) ? $thumb_url : combo_blocks_url . 'assets/images/placeholder.png';
		if ($post->post_type == 'product') {
			$product = wc_get_product($post->ID);
			$response->total_sales = $product->get_total_sales();
			$response->type = $product->get_type();
			$response->sku = $product->get_sku();
			$response->manage_stock = $product->get_manage_stock();
			$response->stock_quantity = $product->get_stock_quantity();
			$response->stock_status = $product->get_stock_status();
			$response->backorders = $product->get_backorders();
			$response->weight = $product->get_weight();
			$response->length = $product->get_length();
			$response->width = $product->get_width();
			$response->height = $product->get_height();
			$response->dimensions = $product->get_dimensions();
			$response->rating_count = $product->get_rating_count();
			$response->review_count = $product->get_review_count();
			$response->average_rating = $product->get_average_rating();
			$response->on_sale = $product->is_on_sale();
			$response->gallery_image_ids = $product->get_gallery_image_ids();
			$response->image = $product->get_image();
			// $response->date_on_sale_to = $product->get_date_on_sale_to();
			$response->currency = get_woocommerce_currency();
			$response->currency_symbol = get_woocommerce_currency_symbol();
			$response->currency_pos = get_option('woocommerce_currency_pos');
			$formatted_attributes = array();
			$attributes = $product->get_attributes();
			foreach ($attributes as $attr => $attr_deets) {
				$attribute_label = wc_attribute_label($attr);
				if (isset($attributes[$attr]) || isset($attributes['pa_' . $attr])) {
					$attribute = isset($attributes[$attr]) ? $attributes[$attr] : $attributes['pa_' . $attr];
					if ($attribute['is_taxonomy']) {
						$formatted_attributes[$attr] = ['label' => $attribute_label, 'values' => implode(', ', wc_get_product_terms($product->id, $attribute['name'], array('fields' => 'names')))];
					} else {
						$formatted_attributes[$attr] = ['label' => $attribute_label, 'values' => $attribute['value']];
					}
				}
			}
			$response->attributes = $formatted_attributes;
			$productType = $product->get_type();
			if ($productType == 'variable') {
				$response->variation_prices = $product->get_variation_prices();
				$response->min_price = $product->get_variation_price();
				$response->max_price = $product->get_variation_price('max');
			}
			if ($productType != 'variable') {
				$response->regular_price = $product->get_regular_price();
				$response->sale_price = $product->get_sale_price();
				$response->date_on_sale_from = $product->get_date_on_sale_from();
				$response->date_on_sale_to = $product->get_date_on_sale_to();
				$response->price = $product->get_price();
			}
		}
		die(wp_json_encode($response));
	}
	function nestedToSingle($array, $slug = '')
	{
		$singleDimArray = [];
		if (is_array($array))
			foreach ($array as $index => $item) {
				if (is_array($item)) {
					$singleDimArray = array_merge($singleDimArray, $this->nestedToSingle((array) $item, $index));
				} else if (is_object($item)) {
					$singleDimArray = array_merge($singleDimArray, $this->nestedToSingle((array) $item, $index));
				} else {
					$index1 = !empty($slug) ? $slug . '-' . $index : $index;
					$singleDimArray['{' . $index1 . '}'] = $item;
				}
			}
		return $singleDimArray;
	}
	/**
	 * Return _post_meta
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_post_meta($post_data)
	{
		$postId = isset($post_data['postId']) ? $post_data['postId'] : '';
		$meta_key = isset($post_data['meta_key']) ? $post_data['meta_key'] : '';
		$meta_type = isset($post_data['type']) ? $post_data['type'] : 'string';
		$template = isset($post_data['template']) ? $post_data['template'] : '';
		$response = new stdClass();
		$response->meta_key = $meta_key;
		if (empty($meta_key)) {
			die(wp_json_encode($response));
		}
		if ($meta_type == 'mbTaxonomy' || $meta_type == 'mbSelect') {
			$mb_Value = rwmb_meta($meta_key, [], $postId);
			if (gettype($mb_Value) == 'object') {
			}
			if (gettype($mb_Value) == 'array') {
				$singleArray = $this->nestedToSingle($mb_Value);
				$response->html = strtr($template, (array) $singleArray);
				$response->args = $singleArray;
			} else if (gettype($mb_Value) == 'object') {
				$arrayValue = (array)$mb_Value;
				// Process the array
				$singleArray = $this->nestedToSingle($arrayValue);
				// Assuming $template is defined elsewhere
				$response->html = strtr($template, $singleArray);
				// Set $singleArray as args
				$response->args = $singleArray;
				// $singleArray = $this->nestedToSingle($mb_Value);
				// $response->html = strtr($template, (array) $singleArray);
				// $response->args = $singleArray;
			} else {
				$singleArray = ['{metaValue}' => $mb_Value];
				$response->args = $singleArray;
				$response->html = strtr($template, (array) $singleArray);
				$response->meta_value = $mb_Value;
				$response->meta_key = $meta_key;
			}
		} else if ($meta_type == 'mbButton') {
			$mb_Value = rwmb_meta($meta_key, [], $postId);
			$singleArray = ['{metaValue}' => $mb_Value];
			$response->args = $singleArray;
			$response->html = strtr($template, (array) $singleArray);
			$response->meta_value = $mb_Value;
			$response->meta_key = $meta_key;
		} else if ($meta_type == 'acfImage' || $meta_type == 'acfFile' || $meta_type == 'acfButtonGroup') {
			$acf_value = get_field($meta_key, $postId);
			if (is_array($acf_value)) {
				$singleArray = $this->nestedToSingle($acf_value);
				$response->html = strtr($template, (array) $singleArray);
				$response->args = $singleArray;
			} else {
				$singleArray = ['{metaValue}' => $acf_value];
				$response->args = $singleArray;
				$response->html = strtr($template, (array) $singleArray);
				$response->meta_value = $acf_value;
				$response->meta_key = $meta_key;
			}
		} else if ($meta_type == 'acfTaxonomy' || $meta_type == 'acfPostObject' || $meta_type == 'acfPageLink' || $meta_type == 'acfUser' || $meta_type == 'acfLink') {
			$acf_value = get_field($meta_key, $postId);
			if (gettype($acf_value) == 'array') {
				$singleArray = $this->nestedToSingle($acf_value);
				$response->html = strtr($template, (array) $singleArray);
				$response->args = $singleArray;
			} else if (gettype($acf_value) == 'object') {
			} else {
				$singleArray = ['{metaValue}' => $acf_value];
				$response->args = $singleArray;
				$response->html = strtr($template, (array) $singleArray);
				$response->meta_value = $acf_value;
				$response->meta_key = $meta_key;
			}
		} else if ($meta_type == 'podsImage' || $meta_type == 'podsFile' || $meta_type == 'podsSelect' || $meta_type == 'podsCheckbox' || $meta_type == 'podsRadio' || $meta_type == 'podsButtonGroup' || $meta_type == 'podsLink' || $meta_type == 'podsTaxonomy' || $meta_type == 'podsUser' || $meta_type == 'podsPostObject' || $meta_type == 'podsRelationship' || $meta_type == 'podsTrueFalse') {
			$post_type = get_post_type($postId);
			$pods_value = pods_field($post_type, $postId, $meta_key, true);
			if (gettype($pods_value) == 'array') {
				$singleArray = $this->nestedToSingle($pods_value);
				$response->html = strtr($template, (array) $singleArray);
				$response->args = $singleArray;
			} else if (gettype($pods_value) == 'object') {
			} else {
				$singleArray = ['{metaValue}' => $pods_value];
				$response->args = $singleArray;
				$response->html = strtr($template, (array) $singleArray);
				$response->meta_value = $pods_value;
				$response->meta_key = $meta_key;
			}
		} else {
			$post_meta = get_post_meta($postId, $meta_key, true);
			if (is_array($post_meta)) {
				$singleArray = $this->nestedToSingle($post_meta);
				$response->html = strtr($template, (array) $singleArray);
				$response->args = $singleArray;
			} else {
				$singleArray = ['{metaValue}' => $post_meta];
				$response->args = $singleArray;
				$response->html = strtr($template, (array) $singleArray);
				$response->meta_value = $post_meta;
				$response->meta_key = $meta_key;
			}
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return get_shortcode
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_shortcode($post_data)
	{
		$postId = isset($post_data['postId']) ? $post_data['postId'] : '';
		$key = isset($post_data['meta_key']) ? $post_data['meta_key'] : '';
		$prams = isset($post_data['prams']) ? $post_data['prams'] : '';
		$response = new stdClass();
		$response->key = $key;
		if (empty($key)) {
			die(wp_json_encode($response));
		}
		$response->html = do_shortcode('[' . $key . ' id="' . $postId . '"]');
		//$response->html = '[' . $key . ']';
		die(wp_json_encode($response));
	}
	/**
	 * Return _post_meta
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_plugin_data($post_data)
	{
		$response = new stdClass();
		if (!current_user_can('manage_options')) {
			die(wp_json_encode($response));
		}
		$siteAdminurl = admin_url();
		//$postId      = isset($post_data['postId']) ? $post_data['postId'] : '';
		$combo_blocks_settings = get_option('combo_blocks_settings');
		$combo_blocks_license = get_option('combo_blocks_license');
		$license_key = isset($combo_blocks_license['license_key']) ? $combo_blocks_license['license_key'] : '';
		$license_status = isset($combo_blocks_license['license_status']) ? $combo_blocks_license['license_status'] : '';
		$days_remaining = isset($combo_blocks_license['days_remaining']) ? $combo_blocks_license['days_remaining'] : '';
		$date_expiry = isset($combo_blocks_license['date_expiry']) ? $combo_blocks_license['date_expiry'] : '';
		$response->license_key = $license_key;
		$response->license_status = $license_status;
		$response->days_remaining = $days_remaining;
		$response->date_expiry = $date_expiry;
		$response->freeUrl = 'https://wordpress.org/plugins/combo-blocks/';
		$response->proUrl = 'https://comboblocks.com/pricing/';
		$response->websiteUrl = 'http://comboblocks.com/';
		$response->demoUrl = 'http://comboblocks.com/';
		$response->siteAdminurl = $siteAdminurl;
		$response->wpVersion = get_bloginfo('version');
		$response->renewLicense = 'https://pickplugins.com/renew-license/?licenseKey=';
		$response->utm = ['utm_source' => '', 'utm_medium' => '', 'utm_campaign' => '', 'utm_content' => '', 'utm_term' => '', 'utm_id' => ''];
		die(wp_json_encode($response));
	}
	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_posts($post_data)
	{
		$query_args = [];
		$nonce = isset($post_data['_wpnonce']) ? $post_data['_wpnonce'] : "";
		if (!wp_verify_nonce($nonce, 'wp_rest')) return $query_args;
		$returnObj = isset($post_data['returnObj']) ? $post_data['returnObj'] : 'postObject'; // postObject, html
		$queryArgs = isset($post_data['queryArgs']) ? $post_data['queryArgs'] : [];
		$rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
		$rawData = !empty($post_data['rawData']) ? $post_data['rawData'] : $rawData;
		$prevText = !empty($post_data['prevText']) ? $post_data['prevText'] : "";
		$nextText = !empty($post_data['nextText']) ? $post_data['nextText'] : "";
		$maxPageNum = !empty($post_data['maxPageNum']) ? $post_data['maxPageNum'] : 0;
		$paged = 1;
		if (is_array($queryArgs))
			foreach ($queryArgs as $item) {
				$id = isset($item['id']) ? $item['id'] : '';
				$val = isset($item['val']) ? $item['val'] : '';
				if ($val) {
					if ($id == 'postType') {
						$query_args['post_type'] = $val;
					} elseif ($id == 'postStatus') {
						if (($key = array_search("draft", $val)) !== false) {
							unset($val[$key]);
						}
						if (($key = array_search("auto-draft", $val)) !== false) {
							unset($val[$key]);
						}
						if (($key = array_search("future", $val)) !== false) {
							unset($val[$key]);
						}
						$status =  $val;
						$query_args['post_status'] = $status;
						// $query_args['post_status'] = $val;
					} elseif ($id == 'order') {
						$query_args['order'] = $val;
					} elseif ($id == 'orderby') {
						$query_args['orderby'] = implode(' ', $val);
					} elseif ($id == 'metaKey') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'dateQuery') {
						$date_query = [];
						foreach ($val as $arg) {
							$id = isset($arg['id']) ? $arg['id'] : '';
							$value = isset($arg['value']) ? $arg['value'] : '';
							if ($id == 'year' || $id == 'month' || $id == 'week' || $id == 'day' || $id == 'hour' || $id == 'minute' || $id == 'second') {
								$compare = isset($arg['compare']) ? $arg['compare'] : '';
								if (!empty($value))
									$date_query[] = [$id => $value, 'compare' => $compare,];
							}
							if ($id == 'inclusive' || $id == 'compare' || $id == 'relation') {
								if (!empty($value))
									$date_query[$id] = $value;
							}
							if ($id == 'after' || $id == 'before') {
								$year = isset($arg['year']) ? $arg['year'] : '';
								$month = isset($arg['month']) ? $arg['month'] : '';
								$day = isset($arg['day']) ? $arg['day'] : '';
								if (!empty($year))
									$date_query[$id]['year'] = $year;
								if (!empty($month))
									$date_query[$id]['month'] = $month;
								if (!empty($day))
									$date_query[$id]['day'] = $day;
							}
						}
						$query_args['date_query'] = $date_query;
					} elseif ($id == 'year') {
						$query_args['year'] = $val;
					} elseif ($id == 'monthnum') {
						$query_args['monthnum'] = $val;
					} elseif ($id == 'w') {
						$query_args['w'] = $val;
					} elseif ($id == 'day') {
						$query_args['day'] = $val;
					} elseif ($id == 'hour') {
						$query_args['hour'] = $val;
					} elseif ($id == 'minute') {
						$query_args['minute'] = $val;
					} elseif ($id == 'second') {
						$query_args['second'] = $val;
					} elseif ($id == 'm') {
						$query_args['m'] = $val;
					} elseif ($id == 'author') {
						$query_args['author'] = $val;
					} elseif ($id == 'authorName') {
						$query_args['author_name'] = $val;
					} elseif ($id == 'authorIn') {
						$query_args['author_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'authorNotIn') {
						$query_args['author__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'cat') {
						$query_args['cat'] = $val;
					} elseif ($id == 'categoryName') {
						$query_args['category_name'] = $val;
					} elseif ($id == 'categoryAnd') {
						$query_args['category_and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'categoryIn') {
						$query_args['category__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'categoryNotIn') {
						$query_args['category__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tag') {
						$query_args['tag'] = $val;
					} elseif ($id == 'tagId') {
						$query_args['tag_id'] = $val;
					} elseif ($id == 'tagAnd') {
						$query_args['tag__and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagIn') {
						$query_args['tag__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagNotIn') {
						$query_args['tag__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagSlugAnd') {
						$query_args['tag_slug__and'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'tagSlugIn') {
						$query_args['tag_slug__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'taxQuery') {
						$query_args['tax_query'] = $val[0];
					} elseif ($id == 'p') {
						$query_args['p'] = $val;
					} elseif ($id == 'name') {
						$query_args['name'] = $val;
					} elseif ($id == 'pageId') {
						$query_args['page_id'] = $val;
					} elseif ($id == 'pagename') {
						$query_args['pagename'] = $val;
					} elseif ($id == 'postParent') {
						$query_args['post_parent'] = $val;
					} elseif ($id == 'postParentIn') {
						$query_args['post_parent__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postParentNotIn') {
						$query_args['post_parent__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postIn') {
						$query_args['post__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postNotIn') {
						$query_args['post__not_in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'postNameIn') {
						$query_args['post_name__in'] = !empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'hasPassword') {
						$query_args['has_password'] = ($val === 'true') ? true : false;;
					} elseif ($id == 'postPassword') {
						$query_args['post_password'] = $val;
					} elseif ($id == 'commentCount') {
						$query_args['comment_count'] = $val;
					} elseif ($id == 'nopaging') {
						$query_args['nopaging'] = $val;
					} elseif ($id == 'postsPerPage') {
						$per_page = (int) $val;
						$per_page = ($val > 10) ? 10 : $val;
						$query_args['posts_per_page'] = $per_page;
						// $query_args['posts_per_page'] = $val;
					} elseif ($id == 'paged') {
						$paged = $val;
						$query_args['paged'] = $val;
					} elseif ($id == 'offset') {
						$query_args['offset'] = $val;
					} elseif ($id == 'postsPerArchivePage') {
						$query_args['posts_per_archive_page'] = $val;
					} elseif ($id == 'ignoreStickyPosts') {
						$query_args['ignore_sticky_posts'] = $val;
					} elseif ($id == 'metaKey') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'metaValue') {
						$query_args['meta_value'] = $val;
					} elseif ($id == 'metaValueNum') {
						$query_args['meta_value_num'] = (int) $val;
					} elseif ($id == 'metaCompare') {
						$query_args['meta_compare'] = $val;
					} elseif ($id == 'metaQuery') {
						$query_args['meta_query'] = $val;
					} elseif ($id == 'perm') {
						$query_args['perm'] = $val;
					} elseif ($id == 'postMimeType') {
						$query_args['post_mime_type'] = $val;
					} elseif ($id == 'cacheResults') {
						$query_args['cache_results'] = $val;
					} elseif ($id == 'updatePostMetaCache') {
						$query_args['update_post_meta_cache '] = $val;
					} elseif ($id == 'updatePostTermCache') {
						$query_args['update_post_term_cache'] = $val;
					}
				}
			}
		$posts = [];
		$responses = [];
		$combo_blocks_wp_query = new WP_Query($query_args);
		if ($combo_blocks_wp_query->have_posts()) :
			$responses['noPosts'] = false;
			while ($combo_blocks_wp_query->have_posts()) :
				$combo_blocks_wp_query->the_post();
				//global $post;
				$post_id = get_the_id();
				$post = get_post($post_id);
				$postData = new stdClass();
				$postData->post_id = $post->ID;
				$postData->post_title = $post->post_title;
				$postData->post_type = $post->post_type;
				//$post->post_excerpt = wp_kses_post($post->post_excerpt);
				//$post->post_content = $post->post_content;
				$thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post_id));
				$thumb_url = isset($thumb[0]) ? $thumb[0] : '';
				$postData->thumb_url = !empty($thumb_url) ? $thumb_url : combo_blocks_url . 'assets/images/placeholder.png';
				//$post->is_pro = ($post_id % 2 == 0) ? true : false;
				$blocks = parse_blocks($rawData);
				$html = '';
				foreach ($blocks as $block) {
					//look to see if your block is in the post content -> if yes continue past it if no then render block as normal
					$html .= render_block($block);
				}
				if ($returnObj == 'html') {
					$postData->html = $html;
				}
				$posts[] = $postData;
			endwhile;
			$big = 999999999; // need an unlikely integer
			$maxPageNum = (!empty($maxPageNum)) ? $maxPageNum : $combo_blocks_wp_query->max_num_pages;
			$pages = paginate_links(
				array(
					'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
					'format' => '?paged=%#%',
					'current' => max(1, $paged),
					'total' => $maxPageNum,
					'prev_text' => $prevText,
					'next_text' => $nextText,
					'type' => 'array',
				)
			);
			$responses['posts'] = $posts;
			$responses['pagination'] = $pages;
			wp_reset_query();
			wp_reset_postdata();
		else :
			$responses['noPosts'] = true;
		endif;
		die(wp_json_encode($responses));
	}
	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_terms($post_data)
	{
		$queryArgs = isset($post_data['queryArgs']) ? $post_data['queryArgs'] : [];
		$rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
		$rawData = !empty($post_data['rawData']) ? $post_data['rawData'] : $rawData;
		$prevText = !empty($post_data['prevText']) ? $post_data['prevText'] : "";
		$nextText = !empty($post_data['nextText']) ? $post_data['nextText'] : "";
		$maxPageNum = !empty($post_data['maxPageNum']) ? $post_data['maxPageNum'] : 0;
		$paged = 1;
		$query_args = [];
		if (is_array($queryArgs))
			foreach ($queryArgs as $item) {
				$id = isset($item['id']) ? $item['id'] : '';
				$val = isset($item['val']) ? $item['val'] : '';
				if ($val) {
					if ($id == 'taxonomy') {
						$query_args['taxonomy'] = $val;
					} elseif ($id == 'orderby') {
						$query_args['orderby'] = $val;
					} elseif ($id == 'order') {
						$query_args['order'] = $val;
					} elseif ($id == 'hide_empty') {
						$query_args['hide_empty'] = $val;
					} elseif ($id == 'include') {
						$query_args['include'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'exclude') {
						$query_args['exclude'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'exclude_tree') {
						$query_args['exclude_tree'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'number') {
						$query_args['number'] = $val;
					} elseif ($id == 'count') {
						$query_args['count'] = $val;
					} elseif ($id == 'offset') {
						$query_args['offset'] = $val;
					} elseif ($id == 'name') {
						$query_args['name'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'slug') {
						$query_args['slug'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'hierarchical') {
						$query_args['hierarchical'] = $val;
					} elseif ($id == 'search') {
						$query_args['search'] = $val;
					} elseif ($id == 'name__like') {
						$query_args['name__like'] = $val;
					} elseif ($id == 'description__like') {
						$query_args['description__like'] = $val;
					} elseif ($id == 'pad_counts') {
						$query_args['pad_counts'] = $val;
					} elseif ($id == 'get') {
						$query_args['get'] = $val;
					} elseif ($id == 'parent') {
						$query_args['parent'] = $val;
					} elseif ($id == 'childless') {
						$query_args['childless'] = $val;
					} elseif ($id == 'child_of') {
						$query_args['child_of'] = $val;
					} elseif ($id == 'cache_domain') {
						$query_args['cache_domain'] = $val;
					} elseif ($id == 'update_term_meta_cache') {
						$query_args['update_term_meta_cache'] = $val;
					} elseif ($id == 'meta_key') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'meta_value') {
						$query_args['meta_value'] = $val;
					}
				}
			}
		$posts = [];
		$responses = [];
		$terms = get_terms($query_args);
		if ($terms) :
			$responses['noPosts'] = false;
			foreach ($terms as  $term) :
				$term_id = $term->term_id;
				$term_taxonomy = $term->taxonomy;
				$term->link = get_term_link($term_id, $term_taxonomy);
				// $blocks = parse_blocks($rawData);
				// $html = '';
				// foreach ($blocks as $block) {
				// 	//look to see if your block is in the post content -> if yes continue past it if no then render block as normal
				// 	$html .= render_block($block);
				// }
				// $term->html = $html;
				$posts[] = $term;
			endforeach;
			$responses['posts'] = $posts;
		else :
			$responses['noPosts'] = true;
		endif;
		die(wp_json_encode($responses));
	}
	/**
	 * Return Posts
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function get_users($post_data)
	{
		$queryArgs = isset($post_data['queryArgs']) ? $post_data['queryArgs'] : [];
		$rawData = '<!-- wp:post-featured-image /--><!-- wp:post-title /--><!-- wp:post-excerpt /-->';
		$rawData = !empty($post_data['rawData']) ? $post_data['rawData'] : $rawData;
		$prevText = !empty($post_data['prevText']) ? $post_data['prevText'] : "";
		$nextText = !empty($post_data['nextText']) ? $post_data['nextText'] : "";
		$maxPageNum = !empty($post_data['maxPageNum']) ? $post_data['maxPageNum'] : 0;
		$paged = 1;
		$query_args = [];
		if (is_array($queryArgs))
			foreach ($queryArgs as $item) {
				$id = isset($item['id']) ? $item['id'] : '';
				$val = isset($item['val']) ? $item['val'] : '';
				if ($val) {
					if ($id == 'orderby') {
						$query_args['orderby'] = $val;
					} elseif ($id == 'order') {
						$query_args['order'] = $val;
					} elseif ($id == 'hide_empty') {
						$query_args['hide_empty'] = $val;
					} elseif ($id == 'include') {
						$query_args['include'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'exclude') {
						$query_args['exclude'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'exclude_tree') {
						$query_args['exclude_tree'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'number') {
						$query_args['number'] = $val;
					} elseif ($id == 'count') {
						$query_args['count'] = $val;
					} elseif ($id == 'offset') {
						$query_args['offset'] = $val;
					} elseif ($id == 'name') {
						$query_args['name'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'slug') {
						$query_args['slug'] =
							!empty($val) ? explode(',', $val) : [];
					} elseif ($id == 'hierarchical') {
						$query_args['hierarchical'] = $val;
					} elseif ($id == 'search') {
						$query_args['search'] = $val;
					} elseif ($id == 'name__like') {
						$query_args['name__like'] = $val;
					} elseif ($id == 'description__like') {
						$query_args['description__like'] = $val;
					} elseif ($id == 'pad_counts') {
						$query_args['pad_counts'] = $val;
					} elseif ($id == 'get') {
						$query_args['get'] = $val;
					} elseif ($id == 'parent') {
						$query_args['parent'] = $val;
					} elseif ($id == 'childless') {
						$query_args['childless'] = $val;
					} elseif ($id == 'child_of') {
						$query_args['child_of'] = $val;
					} elseif ($id == 'cache_domain') {
						$query_args['cache_domain'] = $val;
					} elseif ($id == 'update_term_meta_cache') {
						$query_args['update_term_meta_cache'] = $val;
					} elseif ($id == 'meta_key') {
						$query_args['meta_key'] = $val;
					} elseif ($id == 'meta_value') {
						$query_args['meta_value'] = $val;
					}
				}
			}
		$posts = [];
		$responses = [];
		$terms = get_users($query_args);
		if ($terms) :
			$responses['noPosts'] = false;
			foreach ($terms as  $term) :
				$user_data = new stdClass();
				$user_data->ID = $term->ID;
				$user_data->user_login = $term->user_login;
				$user_data->user_nicename = $term->user_nicename;
				//$user_data->user_email = $term->user_email;
				//$user_data->registered = $term->user_registered;
				//$user_data->user_status = $term->user_status;
				$user_data->description = $term->description;
				$user_data->display_name = $term->display_name;
				$user_data->first_name = $term->first_name;
				$user_data->last_name = $term->last_name;
				//$user_data->roles = $term->roles;
				//$user_data->caps = $term->caps;
				$user_data->url = $term->user_url;
				$user_data->avatar = get_avatar_url($term->ID);
				//$user_data->ID = $term->ID;
				// $term_id = $term->term_id;
				// $term_taxonomy = $term->taxonomy;
				// $term->link = get_term_link($term_id, $term_taxonomy);
				// $blocks = parse_blocks($rawData);
				// $html = '';
				// foreach ($blocks as $block) {
				// 	//look to see if your block is in the post content -> if yes continue past it if no then render block as normal
				// 	$html .= render_block($block);
				// }
				// $term->html = $html;
				$posts[] = $user_data;
			endforeach;
			$responses['posts'] = $posts;
		else :
			$responses['noPosts'] = true;
		endif;
		die(wp_json_encode($responses));
	}
	/**
	 * Return terms for taxonomy.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data Theget_image_sizes tax data.
	 */
	public function get_image_sizes($request)
	{
		//$post_types  = isset($request['postTypes']) ? $request['postTypes'] : ['post'];
		$image_sizes = [];
		global $_wp_additional_image_sizes;
		$default_image_sizes = get_intermediate_image_sizes();
		foreach ($default_image_sizes as $size) {
			$image_sizes[$size]['width'] = intval(get_option("{$size}_size_w"));
			$image_sizes[$size]['height'] = intval(get_option("{$size}_size_h"));
			$image_sizes[$size]['crop'] = get_option("{$size}_crop") ? get_option("{$size}_crop") : false;
		}
		if (isset($_wp_additional_image_sizes) && count($_wp_additional_image_sizes)) {
			$image_sizes = array_merge($image_sizes, $_wp_additional_image_sizes);
		}
		die(wp_json_encode($image_sizes));
	}
	/**
	 * Return terms for taxonomy.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_post_type_objects($request)
	{
		global $wp_post_types;
		$postTypes = [];
		$post_types_all = get_post_types('', 'names');
		foreach ($post_types_all as $post_type) {
			$obj = $wp_post_types[$post_type];
			$postTypes[] = $post_type;
		}
		$post_types =  (!empty($request['postTypes'])) ? $request['postTypes'] : $postTypes;
		$search = isset($request['search']) ? $request['search'] : '';
		$taxonomies = get_object_taxonomies($post_types);
		$terms = [];
		$taxonomiesArr = [];
		foreach ($taxonomies as $taxonomy) {
			$taxDetails = get_taxonomy($taxonomy);
			$taxonomiesArr[] = ['label' => $taxDetails->label, 'id' => $taxonomy];
		}
		die(wp_json_encode($taxonomiesArr));
	}
	/**
	 * Return license info.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_site_details($request)
	{
		$response = [];
		if (!current_user_can('manage_options')) {
			die(wp_json_encode($response));
		}
		$admin_email = get_option('admin_email');
		$siteurl = get_option('siteurl');
		$siteAdminurl = admin_url();
		$adminData = get_user_by('email', $admin_email);
		$response['email'] = $admin_email;
		$response['name'] = isset($adminData->display_name) ? $adminData->display_name : '';
		$response['siteurl'] = $siteurl;
		$response['siteAdminurl'] = $siteAdminurl;
		$combo_blocks_info = get_option('combo_blocks_info');
		$subscribe_status = isset($combo_blocks_info['subscribe_status']) ? $combo_blocks_info['subscribe_status'] : 'not_subscribed'; /*subscribed, not_interested, not_subscribed*/
		$response['subscribe_status'] = $subscribe_status;
		//delete_option('combo_blocks_info');
		die(wp_json_encode($response));
	}
	/**
	 * Return get_site_data.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_site_data($request)
	{
		$response = [];
		// if (!current_user_can('manage_options')) {
		// 	die(wp_json_encode($response));
		// }
		$admin_email = get_option('admin_email');
		$siteurl = get_option('siteurl');
		$siteAdminurl = admin_url();
		$adminData = get_user_by('email', $admin_email);
		$response['admin_email'] = $admin_email;
		$response['admin_name'] = isset($adminData->display_name) ? $adminData->display_name : '';
		$response['siteurl'] = $siteurl;
		$response['siteAdminurl'] = $siteAdminurl;
		global $wp_roles;
		$roles = [];
		if ($wp_roles && property_exists($wp_roles, 'roles')) {
			$rolesAll = isset($wp_roles->roles) ? $wp_roles->roles : [];
			foreach ($rolesAll as $roleIndex => $role) {
				$roles[$roleIndex] = $role['name'];
			}
		}
		$response['roles'] = $roles;
		global $wp_post_types;
		$post_types = [];
		$post_types_all = get_post_types('', 'names');
		foreach ($post_types_all as $post_type) {
			$obj = $wp_post_types[$post_type];
			$post_types[$post_type] = $obj->labels->singular_name;
		}
		$response['post_types'] = $post_types;
		$postTypes = [];
		$post_types_all = get_post_types('', 'names');
		foreach ($post_types_all as $post_type) {
			$obj = $wp_post_types[$post_type];
			$postTypes[] = $post_type;
		}
		$taxonomies = get_object_taxonomies($postTypes);
		$taxonomiesArr = [];
		foreach ($taxonomies as $taxonomy) {
			$taxDetails = get_taxonomy($taxonomy);
			$taxonomiesArr[] = ['label' => $taxDetails->label, 'id' => $taxonomy];
		}
		$response['taxonomies'] = $taxonomiesArr;
		$response['post_statuses'] = get_post_statuses();
		die(wp_json_encode($response));
	}
	public function email_subscribe($request)
	{
		$response = [];
		if (!current_user_can('manage_options')) {
			die(wp_json_encode($response));
		}
		$email = isset($request['email']) ? sanitize_email($request['email']) : '';
		$first_name = isset($request['first_name']) ? sanitize_text_field($request['first_name']) : '';
		$last_name = isset($request['last_name']) ? sanitize_text_field($request['last_name']) : '';
		$subscriber_list = isset($request['subscriber_list']) ? $request['subscriber_list'] : '';
		$interested = isset($request['interested']) ? $request['interested'] : '';
		$combo_blocks_info = get_option('combo_blocks_info');
		if (!$interested) {
			$combo_blocks_info['subscribe_status'] = 'not_interested';
			$response['subscribe_status'] = 'not_interested';
		}
		if (!empty($email)) {
			$combo_blocks_info['subscribe_status'] = 'subscribed';
			$response['subscribe_status'] = 'subscribed';
		}
		// API query parameters
		$api_params = array(
			'add_subscriber' => '',
			'email' => $email,
			'first_name' => $first_name,
			'last_name' => $last_name,
			'subscriber_list' => $subscriber_list,
		);
		// Send query to the license manager server
		$response = wp_remote_get(add_query_arg($api_params, 'https://comboblocks.com/'), array('timeout' => 20, 'sslverify' => false));
		// Check for error in the response
		if (is_wp_error($response)) {
			echo __("Unexpected Error! The query returned with an error.", 'combo-blocks');
		} else {
			// License data.
			$response_data = json_decode(wp_remote_retrieve_body($response));
			//$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';
			//$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
		}
		update_option('combo_blocks_info', $combo_blocks_info);
		//delete_option('combo_blocks_info');
		die(wp_json_encode($response));
	}
	/**
	 * Return license info.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_license($request)
	{
		$response = [];
		if (!current_user_can('manage_options')) {
			die(wp_json_encode($response));
		}
		$combo_blocks_license = get_option('combo_blocks_license');
		$response['license_key'] = isset($combo_blocks_license['license_key']) ? $combo_blocks_license['license_key'] : '';
		$response['license_status'] = isset($combo_blocks_license['license_status']) ? $combo_blocks_license['license_status'] : '';
		die(wp_json_encode($response));
	}
	/**
	 * Return get_pro_info.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_pro_info($request)
	{
		$response = [];
		$combo_blocks_license = get_option('combo_blocks_license');
		$response['proInstalled'] = false;
		$response['status'] = (isset($combo_blocks_license['license_status']) && !empty($combo_blocks_license['license_status'])) ? $combo_blocks_license['license_status'] : 'inactive';
		if (is_plugin_active('combo-blocks-pro/combo-blocks-pro.php')) {
			$response['proInstalled'] = true;
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return terms for taxonomy.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_post_types($request)
	{

		$args = array(
			'public'   => false,
		);

		global $wp_post_types;
		$post_types = [];
		$post_types_all = get_post_types($args, 'names');


		foreach ($post_types_all as $post_type) {


			$obj = $wp_post_types[$post_type];
			$post_types[$post_type] = $obj->labels->singular_name;
		}
		die(wp_json_encode($post_types));
	}
	/**
	 * Return terms for taxonomy.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_post_statuses($request)
	{
		$statuses = get_post_statuses();
		die(wp_json_encode($statuses));
	}
	/**
	 * Return terms for taxonomy.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_all_terms($tax_data)
	{
		$taxonomy = $tax_data['taxonomy'];
		$post_type = $tax_data['post_type'];
		add_filter('terms_clauses', array($this, 'terms_clauses'), 10, 3);
		$terms = get_terms(
			array(
				'taxonomy' => $taxonomy,
				'hide_empty' => true,
				'post_type' => $post_type,
			)
		);
		remove_filter('terms_clauses', array($this, 'terms_clauses'), 10, 3);
		if (is_wp_error($terms)) {
			die(wp_json_encode(array()));
		} else {
			die(wp_json_encode($terms));
		}
	}
	/**
	 * Return send_mail.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function send_mail($request)
	{
		$response = [];
		if (!current_user_can('manage_options')) {
			die(wp_json_encode($response));
		}
		$subject = isset($request['subject']) ? $request['subject'] : '';
		$email_body = isset($request['body']) ? $request['body'] : '';
		$email_to = isset($request['email_to']) ? $request['email_to'] : '';
		$email_from = isset($request['email_from']) ? $request['email_from'] : '';
		$email_from_name = isset($request['email_from_name']) ? $request['email_from_name'] : '';
		$reply_to = isset($request['reply_to']) ? $request['reply_to'] : '';
		$reply_to_name = isset($request['reply_to_name']) ? $request['reply_to_name'] : '';
		$attachments = isset($email_data['attachments']) ? $email_data['attachments'] : '';
		$headers = array();
		$headers[] = "From: " . $email_from_name . " <" . $email_from . ">";
		if (!empty($reply_to)) {
			$headers[] = "Reply-To: " . $reply_to_name . " <" . $reply_to . ">";
		}
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-Type: text/html; charset=UTF-8";
		$status = wp_mail($email_to, $subject, $email_body, $headers, $attachments);
		if ($status) {
			$response['mail_sent'] = true;
		} else {
			$response['mail_sent'] = false;
		}
		die(wp_json_encode($response));
	}
	/**
	 * Return terms for taxonomy.
	 *
	 * @since 4.0.0
	 *
	 * @param WP_REST_Request $tax_data The tax data.
	 */
	public function get_tax_terms($tax_data)
	{
		$taxonomy = $tax_data['taxonomy'];
		$search = $tax_data['search'];
		$terms = get_terms(
			array(
				'taxonomy' => $taxonomy,
				'search' => $search,
				'hide_empty' => false,
			)
		);
		if (is_wp_error($terms)) {
			die(wp_json_encode(array()));
		} else {
			die(wp_json_encode($terms));
		}
	}
	/**
	 * Extend get terms with post type parameter.
	 *
	 * @global $wpdb
	 * @param string $clauses Term clauses.
	 * @param string $taxonomy Taxonomy.
	 * @param array  $args Aaaarghhhhs.
	 * @return string
	 */
	public function terms_clauses($clauses, $taxonomy, $args)
	{
		if (isset($args['post_type']) && !empty($args['post_type']) && 'count' === $args['fields']) {
			global $wpdb;
			$post_types = array();
			if (is_array($args['post_type'])) {
				foreach ($args['post_type'] as $cpt) {
					$post_types[] = "'" . $cpt . "'";
				}
			} else {
				$post_types[] = "'" . $args['post_type'] . "'";
			}
			if (!empty($post_types)) {
				$clauses['fields'] = 'DISTINCT ' . str_replace('tt.*', 'tt.term_taxonomy_id, tt.taxonomy, tt.description, tt.parent', $clauses['fields']) . ', COUNT(p.post_type) AS count';
				$clauses['join'] .= ' LEFT JOIN ' . $wpdb->term_relationships . ' AS r ON r.term_taxonomy_id = tt.term_taxonomy_id LEFT JOIN ' . $wpdb->posts . ' AS p ON p.ID = r.object_id';
				$clauses['where'] .= ' AND (p.post_type IN (' . implode(',', $post_types) . ') OR p.post_type IS NULL)';
				$clauses['orderby'] = 'GROUP BY t.term_id ' . $clauses['orderby'];
			}
		}
		return $clauses;
	}
}


$ComboBlocksRest = new ComboBlocksRest();
