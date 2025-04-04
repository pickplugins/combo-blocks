<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksContentSlider
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/content-slider/block.json',
			array(
				'title' => 'Content Slider',
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}
	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		if (has_block('combo-blocks/content-slider')) {
			wp_enqueue_style('pgcontent_slider_splide_core');
			wp_enqueue_script('splide.min');
			////wp_enqueue_script('combo_blocks_scripts');
		}
		global $comboBlocksCss;
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$sliderOptions = isset($attributes['sliderOptions']) ? $attributes['sliderOptions'] : [];
		$sliderOptionsRes = isset($attributes['sliderOptionsRes']) ? $attributes['sliderOptionsRes'] : [];
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$prev = isset($attributes['prev']) ? $attributes['prev'] : [];
		$prevOptions = isset($prev['options']) ? $prev['options'] : [];
		$prevText = isset($prevOptions['text']) ? $prevOptions['text'] : '';
		$next = isset($attributes['next']) ? $attributes['next'] : [];
		$nextOptions = isset($next['options']) ? $next['options'] : [];
		$nextText = isset($nextOptions['text']) ? $nextOptions['text'] : '';
		$prevIcon = isset($attributes['prevIcon']) ? $attributes['prevIcon'] : [];
		$prevIconOptions = isset($prevIcon['options']) ? $prevIcon['options'] : [];
		$prevIconLibrary = isset($prevIconOptions['library']) ? $prevIconOptions['library'] : '';
		$prevIconSrcType = isset($prevIconOptions['srcType']) ? $prevIconOptions['srcType'] : '';
		$prevIconSrc = isset($prevIconOptions['iconSrc']) ? $prevIconOptions['iconSrc'] : '';
		$prevIconClass = isset($prevIconOptions['class']) ? $prevIconOptions['class'] : '';
		$prevIconPosition = isset($prevIconOptions['position']) ? $prevIconOptions['position'] : '';
		$nextIcon = isset($attributes['nextIcon']) ? $attributes['nextIcon'] : [];
		$nextIconOptions = isset($nextIcon['options']) ? $nextIcon['options'] : [];
		$nextIconLibrary = isset($nextIconOptions['library']) ? $nextIconOptions['library'] : '';
		$nextIconSrcType = isset($nextIconOptions['srcType']) ? $nextIconOptions['srcType'] : '';
		$nextIconSrc = isset($nextIconOptions['iconSrc']) ? $nextIconOptions['iconSrc'] : '';
		$nextIconClass = isset($nextIconOptions['class']) ? $nextIconOptions['class'] : '';
		$nextIconPosition = isset($nextIconOptions['position']) ? $nextIconOptions['position'] : '';
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
		if ($prevIconLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($prevIconLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($prevIconLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}
		if ($nextIconLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($nextIconLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($nextIconLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}
		$prevIconHtml = '<span class="' . $prevIconClass . ' ' . $prevIconSrc . '"></span>';
		$nextIconHtml = '<span class="' . $nextIconClass . ' ' . $nextIconSrc . '"></span>';
		$sliderOptionsResNew = [];
		foreach ($sliderOptionsRes as $id => $arg) {
			foreach ($arg as $view => $value) {
				if ($view == 'Desktop') {
					$viewNum = '1280';
				}
				if ($view == 'Tablet') {
					$viewNum = '991';
				}
				if ($view == 'Mobile') {
					$viewNum = '767';
				}
				$sliderOptionsResNew[$viewNum][$id] = $value;
			}
		}
		$sliderOptions['breakpoints'] = $sliderOptionsResNew;
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
		<div
			class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
			<div class="splide" id="splide-<?php echo esc_attr($blockId); ?>"
				data-splide="<?php echo esc_attr(json_encode($sliderOptions)) ?>">
				<div class="splide__arrows">
					<div class='prev splide__arrow splide__arrow--prev'>
						<?php if ($prevIconPosition == 'before') : ?>
							<span class='icon'>
								<?php echo wp_kses_post($prevIconHtml); ?>
							</span>
						<?php endif; ?>
						<?php if (!empty($prevText)) : ?>
							<span>
								<?php echo esc_attr($prevText); ?>
							</span>
						<?php endif; ?>
						<?php if ($prevIconPosition == 'after') : ?>
							<span class='icon'>
								<?php echo wp_kses_post($prevIconHtml); ?>
							</span>
						<?php endif; ?>
					</div>
					<div class='next splide__arrow splide__arrow--next'>
						<?php if ($nextIconPosition == 'before') : ?>
							<span class='icon'>
								<?php echo wp_kses_post($nextIconHtml); ?>
							</span>
						<?php endif; ?>
						<?php if (!empty($nextText)) : ?>
							<span>
								<?php echo esc_attr($nextText); ?>
							</span>
						<?php endif; ?>
						<?php if ($nextIconPosition == 'after') : ?>
							<span class='icon'>
								<?php echo wp_kses_post($nextIconHtml); ?>
							</span>
						<?php endif; ?>
					</div>
				</div>
				<div class="splide__track">
					<ul class="splide__list">
						<?php echo ($content) ?>
					</ul>
				</div>
				<ul class="splide__pagination "></ul>
			</div>
		</div>
<?php
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksContentSlider = new ComboBlocksContentSlider();
