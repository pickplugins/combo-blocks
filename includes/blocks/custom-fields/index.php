<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksCustomFields
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/custom-fields/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}



	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		global $comboBlocksCss;
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		if (!is_admin()) {
		}
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$post_url = get_the_permalink($post_ID);
		$template = isset($attributes['template']) ? $attributes['template'] : '';
		$templateLoop = isset($attributes['templateLoop']) ? $attributes['templateLoop'] : '<div></div>';
		$outputPrams = isset($attributes['outputPrams']) ? $attributes['outputPrams'] : [];
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$meta = isset($attributes['meta']) ? $attributes['meta'] : [];
		$metaOptions = isset($meta['options']) ? $meta['options'] : [];
		$metaKey = isset($metaOptions['meta_key']) ? $metaOptions['meta_key'] : '';
		$metaKeyType = isset($metaOptions['type']) ? $metaOptions['type'] : '';
		$blockCssY = isset($attributes["blockCssY"])			? $attributes["blockCssY"]			: [];
		$comboBlocksCss[] = isset($blockCssY["items"]) ? $blockCssY["items"] : [];
		$metaValue = get_post_meta($post_ID, $metaKey, true);

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
		ob_start();


		$formatedValue = combo_blocks_output_format($outputPrams, $metaValue);

		//echo strtr($templateFront, $vars);
		if (!empty($wrapperTag)) :
?>

			<pre>
				<?php

				//array_map("combo_blocks_output_format", $outputPrams)
				?>
			</pre>


			<<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
                <?php echo esc_attr($blockId); ?>
                <?php echo esc_attr($wrapperClass); ?>">
				<?php
				//echo $metaValue;
				?>
			</<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
		endif;
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksCustomFields = new ComboBlocksCustomFields();
