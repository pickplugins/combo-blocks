<?php
if (!defined('ABSPATH'))
	exit();



class ComboBlocksGridWrap
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
		//add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
	}


	function front_scripts($attributes)
	{

		if (has_block('combo-blocks/grid-wrap')) {
		}
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{


		register_block_type(
			combo_blocks_root_dir . 'build/blocks/grid-wrap/block.json',
			array(

				'render_callback' => array($this, 'theHTML'),



			)
		);
	}




	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{



		global $ComboBlocksCssY;



		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';

		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';


		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$ComboBlocksCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





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



?>
		<div class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
			<?php echo wp_kses_post($content) ?>
		</div>
<?php

		return ob_get_clean();
	}
}

$BlockPostGrid = new ComboBlocksGridWrap();
