<?php
if (!defined('ABSPATH')) exit; // if direct access 
class class_combo_blocks_notices
{
  public function __construct()
  {
    add_action('admin_notices', array($this, 'data_upgrade'));

    //add_action('admin_notices', array($this, 'license_expired'));
    // add_action('admin_notices', array($this, 'rebrand'));
    //add_action('admin_notices', array($this, 'layout_depricated'));
    //add_action('admin_notices', array( $this, 'import_layouts' ));
  }



  public function data_upgrade()
  {
    $combo_blocks_notices = get_option('combo_blocks_notices', []);
    $data_update_1_0_5 = isset($combo_blocks_notices['data_update_1_0_5']) ? $combo_blocks_notices['data_update_1_0_5'] : '';

    ob_start();


    if ($data_update_1_0_5 != 'hidden') :
      $actionurl = esc_url($_SERVER['REQUEST_URI']);
      $actionurl = wp_nonce_url($actionurl,  'data_update_1_0_5');
      $nonce = isset($_REQUEST['_wpnonce']) ? sanitize_text_field($_REQUEST['_wpnonce']) : '';
      if (wp_verify_nonce($nonce, 'data_update_1_0_5')) {
        $combo_blocks_notices['data_update_1_0_5'] = 'hidden';
        update_option('combo_blocks_notices', $combo_blocks_notices);
        return;
      }
?>
      <div class="notice notice-error is-dismissible">
        <p class="text-lg flex justify-between">
          <span>
            <span class="dashicons dashicons-warning align-middle text-red-600"></span> Need to migrate blocks data to new ComboBlocks? <a target="_blank" class="bg-blue-600 rounded-sm inline-block text-white hover:text-white hover:bg-blue-700 px-5 py-1" href="https://comboblocks.com/docs/how-to-migrate-post-grid-blocks-to-comboblocks/">Read the guide</a>

          </span>
          <a href="<?php echo esc_url_raw($actionurl); ?>" class="bg-red-600 inline-block cursor-pointer  rounded-sm text-white hover:text-white hover:bg-red-400 px-2  py-1"><span class="align-middle dashicons dashicons-no"></span> Hide this</a>
        </p>
      </div>
<?php
    endif;

    echo ob_get_clean();
  }
}
new class_combo_blocks_notices();
