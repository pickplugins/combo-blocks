<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksNumberCounter
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/number-counter/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}
	function front_style($attributes)
	{
		$icon = isset($attributes['icon']) ? $attributes['icon'] : '';
		$iconOptions = isset($icon['options']) ? $icon['options'] : [];
		$iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
	}
	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		if (has_block('combo-blocks/number-counter')) {
			////wp_enqueue_script('combo_blocks_scripts');
		}
		global $comboBlocksCss;
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$numberCount = isset($attributes['numberCount']) ? $attributes['numberCount'] : [];
		$numberCountOptions = isset($numberCount['options']) ? $numberCount['options'] : [];
		$start = isset($numberCountOptions['start']) ? $numberCountOptions['start'] : 0;
		$metaKey = isset($numberCountOptions['key']) ? $numberCountOptions['key'] : 0;
		$end = isset($numberCountOptions['end']) ? $numberCountOptions['end'] : 500;
		$duration = isset($numberCountOptions['duration']) ? (int) $numberCountOptions['duration'] : 1000;
		$source = isset($numberCountOptions['source']) ? $numberCountOptions['source'] : "";
		$onScroll = isset($numberCountOptions['onScroll']) ? $numberCountOptions['onScroll'] : false;
		$icon = isset($attributes['icon']) ? $attributes['icon'] : '';
		$iconOptions = isset($icon['options']) ? $icon['options'] : [];
		$iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
		$iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
		$iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
		$iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
		$iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
		$prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
		$prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';
		$prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
		$prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';
		$postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
		$postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';
		$postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';
		$postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];


		if ($source == 'wooTotalSale') {
			global $product;
			$end = ($product == null) ? '' : $product->get_total_sales();
		}
		if ($source == 'tutorTotalInstructors') {
			$end = (int) tutor_utils()->get_total_instructors();
		}
		if ($source == 'tutorTotalStudents') {
			$end =  (int)tutor_utils()->get_total_students();
		}
		if ($source == 'tutorTotalAssignments') {
			$end =  (int)tutor_utils()->get_total_assignments();
		}
		if ($source == 'tutorTotalEnrolments') {
			$end =  (int)tutor_utils()->get_total_enrolments("completed");
		}
		if ($source == 'tutorTotalCourse') {
			$end = (int) tutor_utils()->get_total_course();
		}
		if ($source == 'tutorTotalEnrolledCourse') {
			$end =  (int)tutor_utils()->get_total_enrolled_course();
		}
		if ($source == 'tutorTotalQuestion') {
			$end =  (int)tutor_utils()->get_total_question();
		}
		if ($source == 'tutorTotalReview') {
			$end =  (int)tutor_utils()->get_total_review();
		}


		if ($source == 'post_meta') {
			$end = get_post_meta($post_ID, $metaKey, true);
		}





		if ($iconLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($iconLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($iconLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}
		$fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
		$dataAtts = [
			"start" => (int)$start,
			"end" => (int)$end,
			"duration" => (int)$duration,
			"blockId" => $blockId,
			"onScroll" => $onScroll,
			// "source" => $source,
			// "saleCount" => $productSaleCount,
			// "metaValue" => $metaValue,
		];
		$obj['id'] = $post_ID;
		$obj['type'] = 'post';
		$wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
		$prefixText = combo_blocks_parse_css_class($prefixText, $obj);
		$postfixText = combo_blocks_parse_css_class($postfixText, $obj);
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
			<<?php echo combo_blocks_tag_escape($wrapperTag); ?> class=" ComboBlocksNumberCount 
                            <?php echo esc_attr($wrapperClass); ?>
                            <?php echo esc_attr($blockId); ?>
                            <?php echo esc_attr($blockAlign); ?>"
				data-number-counter="<?php echo esc_attr(json_encode($dataAtts)) ?>">
				<?php if ($iconPosition == 'beforePrefix') : ?>
					<?php echo wp_kses_post($fontIconHtml); ?>
				<?php endif; ?>
				<?php if ($prefixText) : ?>
					<span class="<?php echo esc_attr($prefixClass); ?>">
						<?php echo wp_kses_post($prefixText); ?>
					</span>
				<?php endif; ?>
				<?php if ($iconPosition == 'afterPrefix') : ?>
					<?php echo wp_kses_post($fontIconHtml); ?>
				<?php endif; ?>
				<span class='number-count'>
					<?php
					// if ($source == 'total_sale') {
					// 	echo wp_kses_post($productSaleCount);
					// } else {
					echo wp_kses_post($start);
					// }
					?>
				</span>
				<?php if ($iconPosition == 'beforePostfix') : ?>
					<?php echo wp_kses_post($fontIconHtml); ?>
				<?php endif; ?>
				<?php if ($postfixText) : ?>
					<span class="<?php echo esc_attr($postfixClass); ?>">
						<?php echo esc_attr($postfixText); ?>
					</span>
				<?php endif; ?>
				<?php if ($iconPosition == 'afterPostfix') : ?>
					<?php echo wp_kses_post($fontIconHtml); ?>
				<?php endif; ?>
			</<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
		<?php
		endif;
		?>
<?php
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksNumberCounter = new ComboBlocksNumberCounter();
