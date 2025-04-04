<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksArchiveDescription
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/archive-description/block.json',
			array(
				'title' => 'Archive Description',
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
		global $comboBlocksCss;
		$post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
		$post_url = get_the_permalink($post_ID);
		$the_post = get_post($post_ID);
		$post_excerpt = '';
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
		$archiveTitle = isset($attributes['archiveTitle']) ? $attributes['archiveTitle'] : [];
		$archiveTitleOptions = isset($archiveTitle['options']) ? $archiveTitle['options'] : [];
		$archiveTitleClass = isset($archiveTitleOptions['class']) ? $archiveTitleOptions['class'] : '';
		$archiveTitleTag = isset($archiveTitleOptions['tag']) ? $archiveTitleOptions['tag'] : '';
		$archiveType = isset($archiveTitleOptions['archiveType']) ? $archiveTitleOptions['archiveType'] : 'auto';
		$customLabel = isset($archiveTitleOptions['customLabel']) ? $archiveTitleOptions['customLabel'] : 'Archive: %s';
		$archiveTitleLinkTarget = isset($archiveTitleOptions['linkTarget']) ? $archiveTitleOptions['linkTarget'] : '_blank';
		$archiveTitleCustomUrl = isset($archiveTitleOptions['customUrl']) ? $archiveTitleOptions['customUrl'] : '';
		$archiveTitleLinkAttr = isset($archiveTitleOptions['linkAttr']) ? $archiveTitleOptions['linkAttr'] : [];
		$archiveTitleRel = isset($archiveTitleOptions['rel']) ? $archiveTitleOptions['rel'] : '';
		$dateFormat = isset($archiveTitleOptions['dateFormat']) ? $archiveTitleOptions['dateFormat'] : 'y-m-d';
		$archiveTitleLinkTo = isset($archiveTitleOptions['linkTo']) ? $archiveTitleOptions['linkTo'] : '';
		$archiveTitleLinkToMetaKey = isset($archiveTitleOptions['linkToMetaKey']) ? $archiveTitleOptions['linkToMetaKey'] : '';
		$customUrl = isset($archiveTitleOptions['customUrl']) ? $archiveTitleOptions['customUrl'] : '';
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
		$archive_title = '';
		if (function_exists('is_woocommerce') && function_exists('is_shop') && is_woocommerce() && is_shop()) {
			$post_id = wc_get_page_id('shop');
			$post_title = get_the_title($post_id);
			$archive_title = $post_title;
		} else if (is_tax()) {
			$queried_object = get_queried_object();
			$term_name = $queried_object->description;
			$archive_title = $term_name;
		} else if (is_category()) {
			$queried_object = get_queried_object();
			$term_name = $queried_object->description;
			$archive_title = $term_name;
		} else if (is_tag()) {
			$current_tag_id = get_query_var('tag_id');
			$current_tag = get_tag($current_tag_id);
			$current_tag_name = $current_tag->description;
			$archive_title = $current_tag_name;
		} else if (is_author()) {
			$archive_title = get_the_author();
		} else if (is_search()) {
			$current_query = sanitize_text_field(get_query_var('s'));
			$archive_title = $current_query;
		} else if (is_year()) {
			$currentArchiveTitle = get_the_archive_description();
			$date = get_the_date($dateFormat);
			$archive_title = !empty($dateFormat) ? $date : $currentArchiveTitle;
		} else if (is_month()) {
			$currentArchiveTitle = get_the_archive_description();
			$date = get_the_date($dateFormat);
			$archive_title = !empty($dateFormat) ? $date : $currentArchiveTitle;
		} else if (is_date()) {
			$currentArchiveTitle = get_the_archive_description();
			$date = get_the_date($dateFormat);
			$archive_title = !empty($dateFormat) ? $date : $currentArchiveTitle;
		} elseif (is_404()) {
		}
		$customLabel = !empty($customLabel) ? $customLabel : '%s';
		$formatedArchiveTitle = sprintf($customLabel, $archive_title);
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
		$linkAttrStrarchiveTitle = '';
		if (!empty($archiveTitleLinkAttr))
			foreach ($archiveTitleLinkAttr as $attr) {
				if (!empty($attr['val']))
					$linkAttrStrarchiveTitle .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
			}
		$fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
		$linkUrl = '';
		if ($archiveTitleLinkTo == 'postUrl') {
			$linkUrl = get_permalink($post_ID);
		} else if ($archiveTitleLinkTo == 'customField') {
			$linkUrl = get_post_meta($post_ID, $archiveTitleLinkToMetaKey, true);
		} else if ($archiveTitleLinkTo == 'authorUrl') {
			$author_id = get_post_field('post_author', $post_ID);
			$user = get_user_by('ID', $author_id);
			$linkUrl = $user->user_url;
		} else if ($archiveTitleLinkTo == 'authorLink') {
			$author_id = get_post_field('post_author', $post_ID);
			$linkUrl = get_the_author_link($author_id);
		} else if ($archiveTitleLinkTo == 'homeUrl') {
			$linkUrl = get_bloginfo('url');
		} else if ($archiveTitleLinkTo == 'customUrl') {
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
			<<?php echo combo_blocks_tag_escape($wrapperTag); ?> class=" <?php echo esc_attr($blockId); ?>  <?php echo esc_attr($wrapperClass); ?>">
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
				<?php if (!empty($archiveTitleLinkTo)) : ?>
					<a class="<?php echo esc_attr($archiveTitleClass); ?>" <?php //echo ($linkAttrStrarchiveTitle); 
																																	?> target="<?php echo esc_attr($archiveTitleLinkTarget); ?>" rel="<?php echo esc_attr($archiveTitleRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>">
						<?php if ($iconPosition == 'beforeArchiveTitle') : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
						<?php echo wp_kses_post($formatedArchiveTitle); ?>
						<?php if ($iconPosition == 'afterArchiveTitle') : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
					</a>
				<?php else : ?>
					<span class='<?php echo esc_attr($archiveTitleClass); ?>' <?php //echo ($linkAttrStrarchiveTitle); 
																																		?>>
						<?php if ($iconPosition == 'beforeArchiveTitle') : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
						<?php echo wp_kses_post($formatedArchiveTitle);  ?>
						<?php if ($iconPosition == 'afterArchiveTitle') : ?>
							<?php echo wp_kses_post($fontIconHtml); ?>
						<?php endif; ?>
					</span>
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
			<?php if (!empty($archiveTitleLinkTo)) : ?>
				<a class='<?php echo esc_attr($blockId); ?> <?php echo esc_attr($archiveTitleClass); ?>' <?php //echo ($linkAttrStrarchiveTitle); 
																																																	?> target="<?php echo esc_attr($archiveTitleLinkTarget); ?>" rel="<?php echo esc_attr($archiveTitleRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>">
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
					<?php if ($iconPosition == 'beforeArchiveTitle') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
					<?php endif; ?>
					<?php echo wp_kses_post($formatedArchiveTitle); ?>
					<?php if ($iconPosition == 'afterArchiveTitle') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
					<?php endif; ?>
					<?php if ($iconPosition == 'afterArchiveTitle') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
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
				</a>
			<?php else : ?>
				<<?php echo combo_blocks_tag_escape($archiveTitleTag); ?> class='<?php echo esc_attr($blockId); ?> <?php echo esc_attr($archiveTitleClass); ?>'>
					<?php if ($iconPosition == 'beforePrefix') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?> <?php endif; ?>
					<?php if ($prefixText) : ?> <span class="<?php echo esc_attr($prefixClass); ?>">
							<?php echo esc_attr($prefixText); ?>
						</span>
					<?php endif; ?>
					<?php if ($iconPosition == 'afterPrefix') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
					<?php endif; ?>
					<?php if ($iconPosition == 'beforeArchiveTitle') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
					<?php endif; ?>
					<?php echo wp_kses_post($formatedArchiveTitle); ?>
					<?php if ($iconPosition == 'afterArchiveTitle') : ?>
						<?php echo wp_kses_post($fontIconHtml); ?>
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
				</<?php echo combo_blocks_tag_escape($archiveTitleTag); ?>>
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
$ComboBlocksArchiveDescription = new ComboBlocksArchiveDescription();
