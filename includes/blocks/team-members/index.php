<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksTeamMembers
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/team-members/block.json',
			array(
				'render_callback' => array($this, 'theHTML'),
			)
		);
	}
	function categories_slugs($categories)
	{
		//$slug = [];
		if (!empty($categories)) {
			$user_meta = array_map(function ($a) {
				$slug = str_replace(" ", "-", strtolower($a));
				return $slug;
			}, $categories);
			return implode(" ", $user_meta);
		}
	}
	// front-end output from the gutenberg editor 
	function theHTML($attributes, $content, $block)
	{
		global $comboBlocksCss;
		global $comboBlocksScriptData;
		global $PGUserQuery;
		global $ComboBlocksPostQuery;
		$block_instance = $block->parsed_block;
		$blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
		$blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
		$parentBlock = isset($block->context['parentBlock']) ? $block->context['parentBlock'] : '';
		$galleryId = isset($block->context['combo-blocks/galleryId']) ? $block->context['combo-blocks/galleryId'] : $blockId;
		$galleryLightbox = isset($block->context['combo-blocks/lightbox']) ? $block->context['combo-blocks/lightbox'] : null;
		$lightboxOptions = isset($galleryLightbox['options']) ? $galleryLightbox['options'] : [];
		$lightboxEnable = isset($lightboxOptions['enable']) ? $lightboxOptions['enable'] : false;
		//if (has_block('team-members')) {
		if ($lightboxEnable == true) {
			wp_enqueue_script('fslightbox');
		}
		//}
		$socialLinks = isset($attributes['socialLinks']) ? $attributes['socialLinks'] : [];
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$itemsWrap = isset($attributes['itemsWrap']) ? $attributes['itemsWrap'] : [];
		$itemsWrapOptions = isset($itemsWrap['options']) ? $itemsWrap['options'] : [];
		$itemsWrapExcluded = isset($itemsWrapOptions['excludedWrapper']) ? $itemsWrapOptions['excludedWrapper'] : false;
		/*#######itemWrap######*/
		$itemWrap = isset($attributes['itemWrap']) ? $attributes['itemWrap'] : [];
		$itemWrapOptions = isset($itemWrap['options']) ? $itemWrap['options'] : [];
		$itemWrapTag = isset($itemWrapOptions['tag']) ? $itemWrapOptions['tag'] : 'div';
		$itemWrapClass = isset($itemWrapOptions['class']) ? $itemWrapOptions['class'] : 'item';
		$itemWrapCounterClass = isset($itemWrapOptions['counterClass']) ? $itemWrapOptions['counterClass'] : false;
		$itemWrapTermsClass = isset($itemWrapOptions['termsClass']) ? $itemWrapOptions['termsClass'] : false;
		$itemWrapOddEvenClass = isset($itemWrapOptions['oddEvenClass']) ? $itemWrapOptions['oddEvenClass'] : false;
		/*#########$noPostsWrap#########*/
		$noPostsWrap = isset($attributes['noPostsWrap']) ? $attributes['noPostsWrap'] : [];
		$noPostsWrapOptions = isset($noPostsWrap['options']) ? $noPostsWrap['options'] : [];
		$grid = isset($attributes['grid']) ? $attributes['grid'] : [];
		$gridOptions = isset($grid['options']) ? $grid['options'] : [];
		$gridOptionsItemCss = isset($gridOptions['itemCss']) ? $gridOptions['itemCss'] : [];
		$teamMembers = isset($attributes['teamMembers']) ? $attributes['teamMembers'] : [];
		/*#######pagination######*/
		$pagination = isset($attributes['pagination']) ? $attributes['pagination'] : [];
		$paginationOptions = isset($pagination['options']) ? $pagination['options'] : [];
		$paginationType = isset($paginationOptions['type']) ? $paginationOptions['type'] : 'none';
		$parsed_block = isset($block->parsed_block) ? $block->parsed_block : [];
		$innerBlocks = isset($parsed_block['innerBlocks']) ? $parsed_block['innerBlocks'] : [];
		$block_type = WP_Block_Type_Registry::get_instance()->get_registered($block->clientId);
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
		$posts = [];
		$responses = [];
		$blockArgs = [
			'blockId' => $blockId,
			'noPosts' => false
		];
		// //* Visible condition
		$visible = isset($attributes['visible']) ? $attributes['visible'] : [];
		if (!empty($visible['rules'])) {
			$isVisible = combo_blocks_visible_parse($visible);
			if (!$isVisible) return;
		}
		// //* Visible condition
		if (!empty($teamMembers)) {
			//return;
		}
		ob_start();
?>
		<?php
		if (!$itemsWrapExcluded) :
		?>
			<div class="loop-loading"></div>
			<div class="<?php echo esc_attr($blockId); ?> pg-team-members items-loop"
				id="items-loop-<?php echo esc_attr($blockId); ?>" data-blockargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
			<?php
		endif;
			?>
			<?php
			$counter = 1;
			if (!empty($teamMembers))
				foreach ($teamMembers as $index => $teamMember) {
					$imageId = isset($teamMember['id']) ? $teamMember['id'] : "";
					$categories = isset($teamMember['categories']) ? $teamMember['categories'] : [];
					$categories_slug = $this->categories_slugs($categories);
					//if (empty($imageId)) continue;
					if ($counter % 2 == 0) {
						$odd_even_class = 'even';
					} else {
						$odd_even_class = 'odd';
					}
					$html = '';
					$filter_block_context = static function ($context) use ($teamMember, $socialLinks, $index, $lightboxEnable, $blockId) {
						$context['teamMemberData']   = $teamMember;
						$context['loopIndex']   = $index;
						$context['galleryId']   = $blockId;
						$context['lightbox']   = $lightboxEnable;
						$context['socialLinks']   = $socialLinks;
						return $context;
					};
					add_filter('render_block_context', $filter_block_context, 1);
					foreach ($innerBlocks as $block) {
						//look to see if your block is in the post content -> if yes continue past it if no then render block as normal
						$html .= render_block($block);
					}
					remove_filter('render_block_context', $filter_block_context, 1);
			?>
				<<?php echo combo_blocks_tag_escape($itemWrapTag); ?> class=" 
            <?php echo esc_attr($itemWrapClass); ?>
            <?php ?>
            <?php if ($itemWrapCounterClass) {
							echo esc_attr("item-" . $counter);
						} ?>
            <?php if ($itemWrapOddEvenClass) {
							echo esc_attr($odd_even_class);
						} ?>
            <?php if ($itemWrapTermsClass) {
							echo esc_attr($categories_slug);
						} ?> 
 ">
					<?php echo wp_kses_post($html);
					?>
				</<?php echo combo_blocks_tag_escape($itemWrapTag); ?>>
			<?php
					$counter++;
				}
			?>
			<?php
			if (!$itemsWrapExcluded) : ?>
			</div>
		<?php
			endif; ?>
<?php
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksTeamMembers = new ComboBlocksTeamMembers();
