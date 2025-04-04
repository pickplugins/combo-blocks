<?php
if (!defined('ABSPATH')) exit;  // if direct access
wp_enqueue_style('combo-blocks-output', combo_blocks_url . 'dist/output.css', [], time(), 'all');

wp_enqueue_style('wp-components');
$combo_blocks_settings = get_option('combo_blocks_settings');
$disable_blocks = isset($combo_blocks_settings['disable_blocks']) ? $combo_blocks_settings['disable_blocks'] : [];
wp_localize_script('combo-blocks-blocks', 'comboBlocksDisabledBlocks', $disable_blocks);
wp_enqueue_script(
  'combo-blocks-blocks',
  combo_blocks_url . 'build/index.js',
  [
    'wp-blocks',
    'wp-editor',
    'wp-i18n',
    'wp-element',
    'wp-components',
    'wp-data',
    'wp-plugins',
    'wp-edit-post',
  ],
  time()
);
if (defined("combo_blocks_pro_plugin_url")) {
  wp_enqueue_script(
    'combo-blocks-pro-blocks-build',
    combo_blocks_pro_plugin_url . 'build/index.js',
    [
      'wp-blocks',
      'wp-editor',
      'wp-i18n',
      'wp-element',
      'wp-components',
      'wp-data'
    ],
    time()
  );
}
$admin_email = get_option('admin_email');
$combo_blocks_settings = get_option('combo_blocks_settings');
$post_types = isset($combo_blocks_settings['postTypes']) ? $combo_blocks_settings['postTypes'] : [];
$combo_blocks_license = get_option('combo_blocks_license');
$license_status = isset($combo_blocks_license['license_status']) ? $combo_blocks_license['license_status'] : '';
?>
<div class="wrap">
  <div id="cb-dashboard" class=""></div>
</div>