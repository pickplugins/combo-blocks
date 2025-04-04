<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksMasonryWrap
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/masonry-wrap/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}
	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		if (has_block('combo-blocks/masonry-wrap')) {
			wp_enqueue_script('jquery');
			wp_enqueue_script('imagesloaded');
			wp_enqueue_script('masonry');
			wp_enqueue_script('masonry.min');
			////wp_enqueue_script('combo_blocks_scripts');
		}
		global $comboBlocksCss;
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$masonryOpt = isset($attributes['masonryOpt']) ? $attributes['masonryOpt'] : [];
		$masonryOptOptions = isset($masonryOpt['options']) ? $masonryOpt['options'] : [];
		$masonryOptItemSelector = isset($masonryOpt['itemSelector']) ? $masonryOpt['itemSelector'] : ".pg-masonryOpt-wrap-item";
		$masonryOptColumnWidth = isset($masonryOpt['columnWidth']) ? $masonryOpt['columnWidth'] : "";
		$masonryOptGutter = isset($masonryOpt['gutter']) ? $masonryOpt['gutter'] : "";
		$masonryOptHorizontalOrder = isset($masonryOpt['horizontalOrder']) ? $masonryOpt['horizontalOrder'] : true;
		$masonryOPtpercentPosition = isset($masonryOpt['percentPosition']) ? $masonryOpt['percentPosition'] : true;
		$masonryOptStamp = isset($masonryOpt['stamp']) ? $masonryOpt['stamp'] : ".stamp";
		$masonryOptFitWidth = isset($masonryOpt['fitWidth']) ? $masonryOpt['fitWidth'] : true;
		$masonryOptOriginLeft = isset($masonryOpt['originLeft']) ? $masonryOpt['originLeft'] : true;
		$masonryOptOriginTop = isset($masonryOpt['originTop']) ? $masonryOpt['originTop'] : true;
		$masonryOptStagger = isset($masonryOpt['stagger']) ? $masonryOpt['stagger'] : 30;
		$masonryOptResize = isset($masonryOpt['resize']) ? $masonryOpt['resize'] : true;
		$masonryOptions = isset($attributes['masonryOptions']) ? $attributes['masonryOptions'] : [];
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
		$dataBlockId = [
			"blockId" => $blockId,
		];
		// $dataAtts = [
		// 	// "itemSelector" => $masonryOptItemSelector,
		// 	// "columnWidth" => $masonryOptColumnWidth,
		// 	// "gutter" => $masonryOptGutter,
		// 	// "horizontalOrder" => $masonryOptHorizontalOrder,
		// 	// "percentPosition" => $masonryOPtpercentPosition,
		// 	// "stamp" => $masonryOptStamp,
		// 	// "fitWidth" => $masonryOptFitWidth,
		// 	// "originLeft" => $masonryOptOriginLeft,
		// 	// "originTop" => $masonryOptOriginTop,
		// 	// "stagger" => $masonryOptStagger,
		// 	// "resize" => $masonryOptResize,
		// 	"masonryOptions" => $masonryOptions
		// ];
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
		<div id="<?php echo esc_attr($blockId); ?>"
			class="ComboBlocksMasonryWrap <?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?>	<?php echo esc_attr($blockAlign); ?>"
			data-masonry="<?php echo esc_attr(json_encode($masonryOptions)) ?>"
			data-block-id="<?php echo esc_attr(json_encode($dataBlockId)) ?>">
			<?php echo wp_kses_post($content) ?>
		</div>
<?php
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksMasonryWrap = new ComboBlocksMasonryWrap();
