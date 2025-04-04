<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksBreadcrumb
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/breadcrumb/block.json',
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
		$post_data = get_post($post_ID);
		$post_url = get_the_permalink($post_ID);
		$post_title = get_the_title($post_ID);
		$post_thumb_url = get_the_post_thumbnail_url($post_ID, 'full');
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$schema = isset($attributes['schema']) ? $attributes['schema'] : [];
		$schemaOptions = isset($schema['options']) ? $schema['options'] : [];
		$schemaEnable = isset($schemaOptions['enable']) ? $schemaOptions['enable'] : true;
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$elements = isset($attributes['elements']) ? $attributes['elements'] : [];
		$elementsOptions = isset($elements['options']) ? $elements['options'] : [];
		$elementsItems = isset($elements['items']) ? $elements['items'] : [];
		$showLabel = isset($elementsOptions['showLabel']) ? $elementsOptions['showLabel'] : false;
		$showIcon = isset($elementsOptions['showIcon']) ? $elementsOptions['showIcon'] : true;
		$showSeparator = isset($elementsOptions['showSeparator']) ? $elementsOptions['showSeparator'] : false;
		$elementSource = isset($elementsOptions['elementSource']) ? $elementsOptions['elementSource'] : '';
		$utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
		$utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';
		$utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
		$utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
		$utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
		$utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
		$utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
		$utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';
		$icon = isset($attributes['icon']) ? $attributes['icon'] : [];
		$iconOptions = isset($icon['options']) ? $icon['options'] : [];
		$iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : 'icon';
		$label = isset($attributes['label']) ? $attributes['label'] : [];
		$labelOptions = isset($label['options']) ? $label['options'] : [];
		$separator = isset($attributes['separator']) ? $attributes['separator'] : [];
		$separatorOptions = isset($separator['options']) ? $separator['options'] : [];
		$separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : '';
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		//
		$comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
?>
		<?php
		$links = [];
		if ($elementSource == 'dynamic') {
			$links = combo_blocks_breadcrumb_dynamic_links();
		} else {
			$i = 1;
			if (!empty($elementsItems))
				foreach ($elementsItems as $index => $item) {
					$id = isset($item['id']) ? $item['id'] : '';
					$label = isset($item['label']) ? $item['label'] : '';
					$customText = isset($item['customText']) ? $item['customText'] : '%s';
					$separator = isset($item['separator']) ? $item['separator'] : '»';
					$custom_url = isset($item['url']) ? $item['url'] : '#';
					$siteIcon = isset($item['siteIcon']) ? $item['siteIcon'] : '';
					$iconLibrary = isset($siteIcon['library']) ? $siteIcon['library'] : '';
					$iconSrcType = isset($siteIcon['srcType']) ? $siteIcon['srcType'] : '';
					$iconSrc = isset($siteIcon['iconSrc']) ? $siteIcon['iconSrc'] : '';
					$linkData = [];
					if ($id == 'text') :
						$links[] = [
							'label' => (!empty($customText)) ? $customText : __('You are here: ', 'combo-blocks'),
							'link' => $custom_url
						];
					elseif ($id == 'homePage') :
						$home_url = get_bloginfo('url');
						$links[] = [
							'label' => !empty($customText) ? $customText : __('Home', 'combo-blocks'),
							'link' => !empty($custom_url) ? $custom_url : $home_url
						];
					elseif ($id == 'frontPage') :
						$post_id = get_option('page_on_front');
						$post_url = get_permalink($post_id);
						$post_title = get_the_title($post_id);
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $post_title),
							'link' => !empty($custom_url) ? $custom_url : $post_url
						];
					elseif ($id == 'postsPage') :
						$post_id = get_option('page_for_posts');
						$post_url = get_permalink($post_id);
						$post_title = get_the_title($post_id);
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $post_title),
							'link' => !empty($custom_url) ? $custom_url : $post_url
						];
					elseif ($id == 'postTitle') :
						$post_id = get_the_ID();
						$post_url = get_permalink($post_id);
						$post_title = get_the_title($post_id);
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $post_title),
							'link' => !empty($custom_url) ? $custom_url : $post_url
						];
					elseif ($id == 'postAuthor') :
						$post_id = get_the_ID();
						$post = get_post($post_id);
						$author_id = $post->post_author;
						$author_posts_url = get_author_posts_url($author_id);
						$author_name = get_the_author_meta('display_name', $author_id);
						$links[] = [
							'label' => !empty($customText) ? $customText : $author_name,
							'link' => !empty($custom_url) ? $custom_url : $author_posts_url
						];
					elseif ($id == 'postDate') :
						$format = !empty($item['options']['format']) ? $item['options']['format'] : 'Y-m-d';
						$post_date = get_the_time($format);
						$post_date_year = get_the_time('Y');
						$post_date_month = get_the_time('m');
						$post_date_day = get_the_time('d');
						$get_month_link = get_month_link($post_date_year, $post_date_month);
						$get_year_link = get_year_link($post_date_year);
						$get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);
						$links[] = [
							'label' => sprintf($customText, $post_date),
							'link' => !empty($custom_url) ? $custom_url : $get_day_link
						];
					elseif ($id == 'postDay') :
						$post_date_year = get_the_time('Y');
						$post_date_month = get_the_time('m');
						$post_date_day = get_the_time('d');
						$get_month_link = get_month_link($post_date_year, $post_date_month);
						$get_year_link = get_year_link($post_date_year);
						$get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);
						$links[] = [
							'label' => sprintf($customText, $post_date_day),
							'link' => !empty($custom_url) ? $custom_url : $get_day_link
						];
					elseif ($id == 'postMonth') :
						$post_date_year = get_the_time('Y');
						$post_date_month = get_the_time('m');
						$post_date_day = get_the_time('d');
						$get_month_link = get_month_link($post_date_year, $post_date_month);
						$get_year_link = get_year_link($post_date_year);
						$get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);
						$links[] = [
							'label' => sprintf($customText, $post_date_month),
							'link' => !empty($custom_url) ? $custom_url : $get_month_link
						];
					elseif ($id == 'postYear') :
						$post_date_year = get_the_time('Y');
						$post_date_month = get_the_time('m');
						$post_date_day = get_the_time('d');
						$get_month_link = get_month_link($post_date_year, $post_date_month);
						$get_year_link = get_year_link($post_date_year);
						$get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);
						$links[] = [
							'label' => sprintf($customText, $post_date_year),
							'link' => !empty($custom_url) ? $custom_url : $get_year_link
						];
					elseif ($id == 'postAncestors') :
						$count = !empty($item['options']['count']) ? (int) $item['options']['count'] : 0;
						$post_id = get_the_ID();
						$front_page_id = get_option('page_on_front');
						$post = get_post($post_id);
						$ancestors = isset($post->ancestors) ? $post->ancestors : [];
						$ancestors = array_reverse($ancestors);
						if ($count > 0) {
							$ancestors = array_slice($ancestors, 0, $count);
						} else {
							$ancestors = array_slice($ancestors, $count);
						}
						foreach ($ancestors as $ancestor) {
							$links[] = [
								'label' => sprintf($customText, get_the_title($ancestor)),
								'link' => !empty($custom_url) ? $custom_url : get_permalink($ancestor)
							];
						}
					elseif ($id == 'postId') :
						$post_id = get_the_ID();
						$post_url = get_permalink($post_id);
						$links[] = [
							'label' => sprintf($customText, $post_id),
							'link' => !empty($custom_url) ? $custom_url : $post_url
						];
					elseif ($id == 'postCategory') :
						$taxonomy = 'category';
						$post_id = get_the_ID();
						$term_obj_list = get_the_terms($post_id, $taxonomy);
						if ($term_obj_list == false)
							continue;
						$term_id = isset($term_obj_list[0]->term_id) ? $term_obj_list[0]->term_id : '';
						$term_title = isset($term_obj_list[0]->name) ? $term_obj_list[0]->name : '';
						$term_link = get_term_link($term_id, $taxonomy);
						$customText = !empty($customText) ? $customText : '%s';
						$linkData['label'] = sprintf($customText, $term_title);
						$linkData['link'] = $term_link;
						$links[] = [
							'label' => sprintf($customText, $term_title),
							'link' => !empty($custom_url) ? $custom_url : $term_link
						];
					elseif ($id == 'postTag') :
						$taxonomy = 'post_tag';
						$post_id = get_the_ID();
						$term_obj_list = get_the_terms($post_id, $taxonomy);
						if ($term_obj_list == false)
							continue;
						$term_id = isset($term_obj_list[0]->term_id) ? $term_obj_list[0]->term_id : '';
						$term_title = isset($term_obj_list[0]->name) ? $term_obj_list[0]->name : '';
						$term_link = get_term_link($term_id, $taxonomy);
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $term_title),
							'link' => !empty($custom_url) ? $custom_url : $term_link
						];
					elseif ($id == 'postCategories') :
						$taxonomy = 'category';
						$post_id = get_the_ID();
						$term_obj_list = get_the_terms($post_id, $taxonomy);
						if ($term_obj_list == false)
							continue;
						if (!empty($term_obj_list)) :
							foreach ($term_obj_list as $term) {
								$term_id = isset($term->term_id) ? $term->term_id : '';
								$term_title = isset($term->name) ? $term->name : '';
								$term_link = get_term_link($term_id, $taxonomy);
								$customText = !empty($customText) ? $customText : '%s';
								$linkData['label'] = sprintf($customText, $term_title);
								$linkData['link'] = $term_link;
								$links[] = [
									'label' => sprintf($customText, $term_title),
									'link' => !empty($custom_url) ? $custom_url : $term_link
								];
							}
						endif;
					elseif ($id == 'postTags') :
						$taxonomy = 'post_tag';
						$post_id = get_the_ID();
						$term_obj_list = get_the_terms($post_id, $taxonomy);
						if ($term_obj_list == false)
							continue;
						if (!empty($term_obj_list)) :
							foreach ($term_obj_list as $term) {
								$term_id = isset($term->term_id) ? $term->term_id : '';
								$term_title = isset($term->name) ? $term->name : '';
								$term_link = get_term_link($term_id, $taxonomy);
								$customText = !empty($customText) ? $customText : '%s';
								$linkData['label'] = sprintf($customText, $term_title);
								$linkData['link'] = !empty($custom_url) ? $custom_url : $term_link;
								$links[] = [
									'label' => sprintf($customText, $term_title),
									'link' => !empty($custom_url) ? $custom_url : $term_link
								];
							}
						endif;
					elseif ($id == 'postTerm') :
						$taxonomy = !empty($item['options']['taxonomy']) ? $item['options']['taxonomy'] : '';
						$post_id = get_the_ID();
						$term_obj_list = get_the_terms($post_id, $taxonomy);
						if ($term_obj_list == false)
							continue;
						if (!empty($term_obj_list)) :
							foreach ($term_obj_list as $term) {
								$term_id = isset($term->term_id) ? $term->term_id : '';
								$term_title = isset($term->name) ? $term->name : '';
								$term_link = get_term_link($term_id, $taxonomy);
								$customText = !empty($customText) ? $customText : '%s';
								$linkData['label'] = sprintf($customText, $term_title);
								$linkData['link'] = !empty($custom_url) ? $custom_url : $term_link;
								$links[] = [
									'label' => sprintf($customText, $term_title),
									'link' => !empty($custom_url) ? $custom_url : $term_link
								];
							}
						endif;
					elseif ($id == 'postTerms') :
						$taxonomy = !empty($item['options']['taxonomy']) ? $item['options']['taxonomy'] : '';
						if (empty($taxonomy))
							continue;
						//$taxonomy = 'post_tag';
						$post_id = get_the_ID();
						$term_obj_list = get_the_terms($post_id, $taxonomy);
						if ($term_obj_list == false)
							continue;
						if (!empty($term_obj_list)) :
							foreach ($term_obj_list as $term) {
								$term_id = isset($term->term_id) ? $term->term_id : '';
								$term_title = isset($term->name) ? $term->name : '';
								$term_link = get_term_link($term_id, $taxonomy);
								$customText = !empty($customText) ? $customText : '%s';
								$linkData['label'] = sprintf($customText, $term_title);
								$linkData['link'] = $term_link;
								$links[] = [
									'label' => sprintf($customText, $term_title),
									'link' => !empty($custom_url) ? $custom_url : $term_link
								];
							}
						endif;
					elseif ($id == 'termParents') :
						$count = !empty($item['options']['count']) ? (int) $item['options']['count'] : 0;
						$queried_object = get_queried_object();
						$term_name = $queried_object->name;
						$term_id = $queried_object->term_id;
						$taxonomy = $queried_object->taxonomy;
						$term_link = get_term_link($term_id, $taxonomy);
						$parent_terms = get_ancestors($term_id, $taxonomy);
						$parent_terms = array_reverse($parent_terms);
						if ($count > 0) {
							$parent_terms = array_slice($parent_terms, 0, $count);
						} else {
							$parent_terms = array_slice($parent_terms, $count);
						}
						foreach ($parent_terms as $id) {
							$parent_term_link = get_term_link($id, $taxonomy);
							$paren_term_name = get_term_by('id', $id, $taxonomy);
							$links[] = [
								'label' => sprintf($customText, $paren_term_name->name),
								'link' => !empty($custom_url) ? $custom_url : $parent_term_link
							];
						}
					elseif ($id == 'termTitle') :
						$queried_object = get_queried_object();
						$term_name = $queried_object->name;
						$term_id = $queried_object->term_id;
						$taxonomy = $queried_object->taxonomy;
						$term_link = get_term_link($term_id, $taxonomy);
						$archive_title = $term_name;
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $archive_title),
							'link' => !empty($custom_url) ? $custom_url : $term_link
						];
					elseif ($id == 'termAncestors') :
					elseif ($id == 'wcShop') :
						if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) :
							$post_id = wc_get_page_id('shop');
							$post_url = get_permalink($post_id);
							$post_title = get_the_title($post_id);
							$customText = !empty($customText) ? $customText : '%s';
							$links[] = [
								'label' => sprintf($customText, $post_title),
								'link' => !empty($custom_url) ? $custom_url : $post_url
							];
						endif;
					elseif ($id == 'wcAccount') :
						if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) :
							$post_id = wc_get_page_id('myaccount');
							$post_url = get_permalink($post_id);
							$post_title = get_the_title($post_id);
							$customText = !empty($customText) ? $customText : '%s';
							$links[] = [
								'label' => sprintf($customText, $post_title),
								'link' => !empty($custom_url) ? $custom_url : $post_url
							];
						endif;
					elseif ($id == 'wcCart') :
						if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) :
							$post_id = wc_get_page_id('cart');
							$post_url = get_permalink($post_id);
							$post_title = get_the_title($post_id);
							$customText = !empty($customText) ? $customText : '%s';
							$links[] = [
								'label' => sprintf($customText, $post_title),
								'link' => !empty($custom_url) ? $custom_url : $post_url
							];
						endif;
					elseif ($id == 'wcCheckout') :
						if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) :
							$post_url = wc_get_checkout_url();
							$post_title = 'Checkout';
							$customText = !empty($customText) ? $customText : '%s';
							$links[] = [
								'label' => sprintf($customText, $post_title),
								'link' => !empty($custom_url) ? $custom_url : $post_url
							];
						endif;
					elseif ($id == 'searchText') :
						$current_query = sanitize_text_field(get_query_var('s'));
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $current_query),
							'link' => !empty($custom_url) ? $custom_url : '#'
						];
					elseif ($id == 'archiveTitle') :
						$archive_title = get_the_archive_title();
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $archive_title),
							'link' => !empty($custom_url) ? $custom_url : '#'
						];
					elseif ($id == '404Text') :
						$archive_title = get_the_archive_title();
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $archive_title),
							'link' => !empty($custom_url) ? $custom_url : '#'
						];
					elseif ($id == 'dateText') :
						$format = !empty($item['options']['format']) ? $item['options']['format'] : '';
						$date = get_the_date($format);
						$archive_title = !empty($format) ? $date : get_the_archive_title();
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $archive_title),
							'link' => !empty($custom_url) ? $custom_url : '#'
						];
					elseif ($id == 'monthText') :
						$format = !empty($item['options']['format']) ? $item['options']['format'] : '';
						$date = get_the_date($format);
						$archive_title = !empty($format) ? $date : get_the_archive_title();
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $archive_title),
							'link' => !empty($custom_url) ? $custom_url : '#'
						];
					elseif ($id == 'yearText') :
						$format = !empty($item['options']['format']) ? $item['options']['format'] : '';
						$date = get_the_date($format);
						$archive_title = !empty($format) ? $date : get_the_archive_title();
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $archive_title),
							'link' => !empty($custom_url) ? $custom_url : '#'
						];
					elseif ($id == 'authorName') :
						$archive_title = get_the_author();
						$customText = !empty($customText) ? $customText : '%s';
						$links[] = [
							'label' => sprintf($customText, $archive_title),
							'link' => !empty($custom_url) ? $custom_url : get_author_posts_url(get_the_author_meta("ID")),
						];
					endif;
					if ($iconLibrary == 'fontAwesome') {
						wp_enqueue_style('fontawesome-icons');
					} else if ($iconLibrary == 'iconFont') {
						wp_enqueue_style('icofont-icons');
					} else if ($iconLibrary == 'bootstrap') {
						wp_enqueue_style('bootstrap-icons');
					}
					$fontIconHtml = '<span class="icon ' . $iconClass . ' ' . $iconSrc . '"></span>';
					$pramsArr = ['{URL}' => $post_url, '{TITLE}' => $post_title, '{IMAGE}' => $post_thumb_url,];
					$url = strtr($custom_url, (array) $pramsArr);
					$i++;
				}
		}
		$total = count($links);
		$json = [];
		$json['@context'] = "https://schema.org";
		$json['@type'] = "BreadcrumbList";
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
			<!-- <<?php //echo combo_blocks_tag_escape($wrapperTag); 
						?> class="
				<?php //echo esc_attr($blockId); 
				?>
				<?php //echo esc_attr($wrapperClass); 
				?>"> -->
			<ol class="
				<?php echo esc_attr($blockId); ?>
				<?php echo esc_attr($wrapperClass); ?>">
				<?php
				$i = 1;
				$j = 0;
				if (!empty($links))
					foreach ($links as $index => $item) {
						$item_link = isset($item['link']) ? $item['link'] : '';
						$json['itemListElement'][$j]['@type'] = "ListItem";
						$json['itemListElement'][$j]['position'] = $j + 1;
						$json['itemListElement'][$j]['item'] = !empty($item_link) ? $item_link : '#';
						$json['itemListElement'][$j]['name'] = !empty($item['label']) ? wp_kses_post($item['label']) : 'Page Title';
						$j++;
				?>
					<li class="<?php echo esc_attr('item item-' . $index); ?>">
						<?php if (!empty($item_link)) : ?>
							<a href="<?php echo esc_url($item_link); ?>">
								<?php if ($showIcon) : ?>
									<?php //echo wp_kses_post($item['icon']);	
									?>
								<?php endif; ?>
								<?php if ($showLabel) : ?>
									<span class='label'>
										<?php echo wp_kses_post($item['label']); ?>
									</span>
								<?php endif; ?>
							</a>
							<?php if ($showSeparator && $total > $i) : ?>
								<span class="separator">
									<?php echo esc_html($separatorText); ?>
								</span>
							<?php endif; ?>
						<?php else : ?>
							<span>
								<?php if ($showIcon) : ?>
									<?php //echo wp_kses_post($item['icon']); 	
									?>
								<?php endif; ?>
								<?php if ($showLabel) : ?>
									<span class='label'>
										<?php echo wp_kses_post($item['label']); ?>
									</span>
								<?php endif; ?>
								<?php if ($showSeparator && $total > $i) : ?>
									<span class="separator">
										<?php echo esc_html($separatorText); ?>
									</span>
								<?php endif; ?>
							</span>
						<?php endif; ?>
					</li>
				<?php
						$i++;
					}
				?>
			</ol>
			<!-- </<?php //echo combo_blocks_tag_escape($wrapperTag); 
							?>> -->
			<?php
			if ($schemaEnable) :
			?>
				<script type="application/ld+json">
					<?php echo wp_unslash(json_encode($json)); ?>
				</script>
			<?php
			endif;
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
$ComboBlocksBreadcrumb = new ComboBlocksBreadcrumb();
