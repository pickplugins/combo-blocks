<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksWooTotalSales
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/woo-total-sales/block.json',
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
		$post_url = get_the_permalink($post_ID);
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$sku = isset($attributes['saleCount']) ? $attributes['saleCount'] : [];
		$skuOptions = isset($sku['options']) ? $sku['options'] : [];
		$skuTag = isset($skuOptions['tag']) ? $skuOptions['tag'] : 'span';
		$skuLinkTarget = isset($skuOptions['linkTarget']) ? $skuOptions['linkTarget'] : '_blank';
		$skuCustomUrl = isset($skuOptions['customUrl']) ? $skuOptions['customUrl'] : '';
		$skuLinkAttr = isset($skuOptions['linkAttr']) ? $skuOptions['linkAttr'] : [];
		$skuRel = isset($skuOptions['rel']) ? $skuOptions['rel'] : '';
		$skuLinkTo = isset($skuOptions['linkTo']) ? $skuOptions['linkTo'] : '';
		$skuLinkToMetaKey = isset($skuOptions['linkToMetaKey']) ? $skuOptions['linkToMetaKey'] : '';
		$customUrl = isset($skuOptions['customUrl']) ? $skuOptions['customUrl'] : '';
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
		global $product;
		$productSaleCount = ($product == null) ? '' : $product->get_total_sales();
		if ($iconLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($iconLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($iconLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}
		$linkAttrStr = '';
		if (!empty($postExcerptlinkAttr))
			foreach ($postExcerptlinkAttr as $attr) {
				if (!empty($attr['val']))
					$linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
			}
		$linkAttrStrsku = '';
		if (!empty($skuLinkAttr))
			foreach ($skuLinkAttr as $attr) {
				if (!empty($attr['val']))
					$linkAttrStrsku .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
			}
		$fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
		$linkUrl = '';
		if ($skuLinkTo == 'postUrl') {
			$linkUrl = get_permalink($post_ID);
		} else if ($skuLinkTo == 'customField') {
			$linkUrl = get_post_meta($post_ID, $skuLinkToMetaKey, true);
		} else if ($skuLinkTo == 'authorUrl') {
			$author_id = get_post_field('post_author', $post_ID);
			$user = get_user_by('ID', $author_id);
			$linkUrl = $user->user_url;
		} else if ($skuLinkTo == 'authorLink') {
			$author_id = get_post_field('post_author', $post_ID);
			$linkUrl = get_the_author_link($author_id);
		} else if ($skuLinkTo == 'homeUrl') {
			$linkUrl = get_bloginfo('url');
		} else if ($skuLinkTo == 'customUrl') {
			$linkUrl = $customUrl;
		}
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
			<<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
                                        <?php echo esc_attr($blockId); ?>
                                        <?php echo esc_attr($wrapperClass); ?>">
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
				<?php if (!empty($skuLinkTo)) :
					/* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
				?>
					<<?php echo combo_blocks_tag_escape($skuTag); ?> class='saleCount' <?php //echo ($linkAttrStrsku); 
																																							?> target="<?php echo esc_attr($skuLinkTarget); ?>" rel="<?php echo esc_attr($skuRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>">
						<?php if ($iconPosition == 'beforeSaleCount') : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
						<?php echo wp_kses_post($productSaleCount); ?>
						<?php if ($iconPosition == 'afterSaleCount') : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
					</<?php echo combo_blocks_tag_escape($skuTag); ?>>
				<?php else :
					/* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
				?>
					<<?php echo combo_blocks_tag_escape($skuTag); ?> class='saleCount' <?php //echo ($linkAttrStrsku); 
																																							?>>
						<?php if ($iconPosition == 'beforeSaleCount') : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
						<?php echo wp_kses_post($productSaleCount); ?>
						<?php if ($iconPosition == 'afterSaleCount') : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
					</<?php echo combo_blocks_tag_escape($skuTag); ?>>
				<?php endif; ?>
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
		if (empty($wrapperTag)) :
		?>
			<?php if ($iconPosition == 'beforePrefix') : ?>
				<?php echo wp_kses_post($fontIconHtml); ?>
			<?php endif; ?>
			<?php if ($prefixText) : ?>
				<span class="<?php echo esc_attr($prefixClass); ?>">
					<?php echo esc_attr($prefixText); ?>
				</span>
			<?php endif; ?>
			<?php if ($iconPosition == 'afterPrefix') : ?>
				<?php echo wp_kses_post($fontIconHtml); ?>
			<?php endif; ?>
			<?php if (!empty($skuLinkTo)) :
				/* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
			?>
				<<?php echo combo_blocks_tag_escape($skuTag); ?> class='saleCount' <?php //echo ($linkAttrStrsku); 
																																						?> target="<?php echo esc_attr($skuLinkTarget); ?>" rel="<?php echo esc_attr($skuRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>">
					<?php if ($iconPosition == 'beforeSaleCount') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
					<?php endif; ?>
					<?php echo wp_kses_post($productSaleCount); ?>C
					<?php if ($iconPosition == 'afterSaleCount') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
					<?php endif; ?>
				</<?php echo combo_blocks_tag_escape($skuTag); ?>>
			<?php else : ?>
				<<?php echo combo_blocks_tag_escape($skuTag); ?> class='saleCount'>
					<?php if ($iconPosition == 'beforeSaleCount') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
					<?php endif; ?>
					<?php echo wp_kses_post($productSaleCount); ?>
					<?php if ($iconPosition == 'afterSaleCount') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
					<?php endif; ?>
				</<?php echo combo_blocks_tag_escape($skuTag); ?>>
			<?php endif; ?>
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
		<?php
		endif;
		?>
<?php
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksWooTotalSales = new ComboBlocksWooTotalSales();
