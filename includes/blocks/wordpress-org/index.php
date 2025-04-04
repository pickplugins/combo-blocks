<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksWordpressOrg
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/wordpress-org/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}
	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		global $comboBlocksCss;
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$object = isset($attributes['object']) ? $attributes['object'] : [];
		$objectOptions = isset($object['options']) ? $object['options'] : [];
		$objectType = isset($objectOptions['type']) ? $objectOptions['type'] : 'plugin';
		$objectSlug = isset($objectOptions['slug']) ? $objectOptions['slug'] : 'combo-blocks';
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'ul';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$item = isset($attributes['item']) ? $attributes['item'] : [];
		$itemOptions = isset($item['options']) ? $item['options'] : [];
		$itemTag = isset($itemOptions['tag']) ? $itemOptions['tag'] : 'li';
		$elements = isset($attributes['elements']) ? $attributes['elements'] : [];
		$elementsItems = isset($elements['items']) ? $elements['items'] : [];
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
		$transientData = get_transient($blockId . '_data');
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
		if (!empty($wrapperTag)) :
?>
			<<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
										<?php echo esc_attr($blockId); ?>
										<?php echo esc_attr($wrapperClass); ?>">
				<?php
				echo wp_kses_post($content) ?>
			</<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
			<?php
			?>
		<?php
		endif;
		?>
<?php
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksWordpressOrg = new ComboBlocksWordpressOrg();
