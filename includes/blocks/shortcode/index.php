<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksShortcode
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/shortcode/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}
	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		if (!is_admin()) {
		}
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$post_url = get_the_permalink($post_ID);
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$shortcode = isset($attributes['shortcode']) ? $attributes['shortcode'] : [];
		$shortcodeOptions = isset($shortcode['options']) ? $shortcode['options'] : [];
		$shortcodeKey = isset($shortcodeOptions['key']) ? $shortcodeOptions['key'] : '';
		$shortcodePrams = isset($shortcodeOptions['prams']) ? $shortcodeOptions['prams'] : [];
		$user = wp_get_current_user();
		$currentUserId = isset($user->ID) ? (int) $user->ID : 0;
		$term = get_queried_object();
		$termParentId = isset($term->parent) ? (int) $term->parent : 0;
		$currentTermId = isset($term->ID) ? (int) $term->ID : 0;
		$post_Type = get_post_type();
		$postType = isset($post_Type) ? $post_Type : 'post';
		$post = get_post($post_ID);
		$postParentId = isset($post->post_parent) ? (int) $post->post_parent : 0;
		$obj['id'] = $post_ID;
		$obj['type'] = 'post';
		$wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
		// //* Visible condition
		$visible = isset($attributes['visible']) ? $attributes['visible'] : [];
		if (!empty($visible['rules'])) {
			$isVisible = combo_blocks_visible_parse($visible);
			if (!$isVisible) return;
		}
		// //* Visible condition


		//var_dump($post_ID);

		ob_start();
		$shortcodeAtts = '';
		if (!empty($shortcodePrams))
			foreach ($shortcodePrams as $item) {
				$val = isset($item['val']) ? $item['val'] : '';
				$singleArray = [
					'{currentPostId}' => $post_ID,
					'{currentUserId}' => $currentUserId,
					'{termParentId}' => $termParentId,
					'{currentTermId}' => $currentTermId,
					'{postType}' => $postType,
					'{postParentId}' => $postParentId,
				];
				$val = strtr($val, (array) $singleArray);
				$shortcodeAtts .= $item['id'] . '="' . $val . '" ';
			}
		if (!empty($wrapperTag)) :
			if (!empty($shortcodeKey)) {
				echo do_shortcode('[' . $shortcodeKey . ' ' . $shortcodeAtts . ']');
			}
		endif;
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksShortcode = new ComboBlocksShortcode();
