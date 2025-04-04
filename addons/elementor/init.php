<?php
defined('ABSPATH') || exit;


function combo_blocks_elementor_saved_template($widgets_manager)
{

	$combo_blocks_settings = get_option('combo_blocks_settings');
	$addons = isset($combo_blocks_settings['addons']) ? $combo_blocks_settings['addons'] : [];
	$enabled = isset($addons['enabled']) ? $addons['enabled'] : [];

	if (in_array('elementor', $enabled)) {
		return;
	}

	require_once(combo_blocks_dir . '/addons/elementor/saved-template.php');

	$widgets_manager->register(new \Elementor_Combo_Blocks_Saved_Template());
}
add_action('elementor/widgets/register', 'combo_blocks_elementor_saved_template');
