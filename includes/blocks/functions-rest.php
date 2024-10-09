<?php
if (!defined('ABSPATH'))
	exit();



class ComboBlocksRest
{
	function __construct()
	{
		add_action('rest_api_init', array($this, 'register_routes'));
	}


	public function register_routes()
	{


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
	 * Return update_options
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $post_data Post data.
	 */
	public function update_options($request)
	{
		$response = [];


		$name = isset($request['name']) ? sanitize_text_field($request['name']) : '';
		$value = isset($request['value']) ? combo_blocks_sanitize_arr($request['value']) : '';
		$message = "";
		if (!empty($value)) {
			$status = update_option($name, $value);
			$message = esc_html(__("Options updated", "combo-blocks"));
		} else {
			$status = false;
			$message = esc_html(__("Value should not empty", "combo-blocks"));
		}


		$response['status'] = $status;
		$response['message'] = $message;

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
		$value = isset($request['value']) ? combo_blocks_sanitize_arr($request['value']) : '';

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

		$domain = site_url();


		//$license_key = "3410E9CF-6362-4A36-AF6E-1D01BB2AEE02";


		// API query parameters
		$api_params = array(
			'license_key' => $license_key,
			'instance_name' => $domain,
		);

		// Send query to the license manager server
		$response = wp_remote_post(add_query_arg($api_params, "https://api.lemonsqueezy.com/v1/licenses/activate"), array('timeout' => 20, 'sslverify' => false));

		// Check for error in the response
		if (is_wp_error($response)) {
			echo esc_html(__("Unexpected Error! The query returned with an error.", 'combo-blocks'));
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
	public function deactivate_license($request)
	{
		$response = [];
		$license_key = isset($request['license_key']) ? sanitize_text_field($request['license_key']) : '';
		$instance_id = isset($request['instance_id']) ? sanitize_text_field($request['instance_id']) : '';

		$domain = site_url();


		//$license_key = "3410E9CF-6362-4A36-AF6E-1D01BB2AEE02";


		// API query parameters
		$api_params = array(
			'license_key' => $license_key,
			'instance_id' => $instance_id,
		);

		// Send query to the license manager server
		$response = wp_remote_post(add_query_arg($api_params, "https://api.lemonsqueezy.com/v1/licenses/deactivate"), array('timeout' => 20, 'sslverify' => false));

		// Check for error in the response
		if (is_wp_error($response)) {
			echo esc_html(__("Unexpected Error! The query returned with an error.", 'combo-blocks'));
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

		$domain = site_url();


		//$license_key = "3410E9CF-6362-4A36-AF6E-1D01BB2AEE02";


		// API query parameters
		$api_params = array(
			'license_key' => $license_key,
			//'instance_id' => $domain,
		);

		// Send query to the license manager server
		$response = wp_remote_post(add_query_arg($api_params, "https://api.lemonsqueezy.com/v1/licenses/validate"), array('timeout' => 20, 'sslverify' => false));

		// Check for error in the response
		if (is_wp_error($response)) {
			echo esc_html(__("Unexpected Error! The query returned with an error.", 'combo-blocks'));
		} else {

			// License data.
			$license_data = json_decode(wp_remote_retrieve_body($response));


			//$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';
			//$response['status'] = $status;

		}

		die(wp_json_encode($response));
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
	public function get_plugin_data($post_data)
	{

		$response = new stdClass();


		if (!current_user_can('manage_options')) {
			die(wp_json_encode($response));
		}



		$siteAdminurl = admin_url();

		//$postId      = isset($post_data['postId']) ? $post_data['postId'] : '';


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
		$response->websiteUrl = 'https://pickplugins.com/';
		$response->demoUrl = 'http://comboblocks.com/';
		$response->siteAdminurl = $siteAdminurl;


		$response->renewLicense = 'https://pickplugins.com/renew-license/?licenseKey=';
		$response->utm = ['utm_source' => '', 'utm_medium' => '', 'utm_campaign' => '', 'utm_content' => '', 'utm_term' => '', 'utm_id' => ''];




		die(wp_json_encode($response));
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


		$combo_blocks_settings = get_option('combo_blocks_settings');
		$subscribe_status = isset($combo_blocks_settings['subscribe_status']) ? $combo_blocks_settings['subscribe_status'] : 'not_subscribed'; /*subscribed, not_interested, not_subscribed*/

		$response['subscribe_status'] = $subscribe_status;

		//delete_option('combo_blocks_settings');

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

		$combo_blocks_settings = get_option('combo_blocks_settings');


		if (!$interested) {
			$combo_blocks_settings['subscribe_status'] = 'not_interested';
			$response['subscribe_status'] = 'not_interested';
		}

		if (!empty($email)) {
			$combo_blocks_settings['subscribe_status'] = 'subscribed';
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
			echo esc_html(__("Unexpected Error! The query returned with an error.", 'combo-blocks'));
		} else {

			// License data.
			$response_data = json_decode(wp_remote_retrieve_body($response));



			//$license_key = isset($license_data->license_key) ? sanitize_text_field($license_data->license_key) : '';
			//$date_created = isset($license_data->date_created) ? sanitize_text_field($license_data->date_created) : '';

		}


		update_option('combo_blocks_settings', $combo_blocks_settings);

		//delete_option('combo_blocks_settings');

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
}

$BlockPostGrid = new ComboBlocksRest();
