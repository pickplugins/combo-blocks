<?php
if (!defined('ABSPATH'))
	exit();
class ComboBlocksWordpressOrgItem
{
	function __construct()
	{
		add_action('init', array($this, 'register_scripts'));
	}
	// loading src files in the gutenberg editor screen
	function register_scripts()
	{
		register_block_type(
			combo_blocks_dir . 'build/blocks/wordpress-org-item/block.json',
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
		$wpObject = isset($block->context['combo-blocks/WPObject']) ? $block->context['combo-blocks/WPObject'] : 'category';
		$wpObjectData = isset($wpObject['data']) ? $wpObject['data'] : array();
		$object = isset($attributes['object']) ? $attributes['object'] : [];
		$objectOptions = isset($object['options']) ? $object['options'] : [];
		$objectType = isset($objectOptions['type']) ? $objectOptions['type'] : 'plugin';
		$objectSlug = isset($objectOptions['slug']) ? $objectOptions['slug'] : 'combo-blocks';
		$objectData = isset($objectOptions['data']) ? $objectOptions['data'] : array();
		$wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
		$wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
		$wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'ul';
		$wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
		$wrapperField = isset($wrapperOptions['field']) ? $wrapperOptions['field'] : 'name';
		$wrapperPrefix = isset($wrapperOptions['prefix']) ? $wrapperOptions['prefix'] : '';
		$wrapperThumbSize = isset($wrapperOptions['thumbSize']) ? $wrapperOptions['thumbSize'] : 'low';
		$wrapperDateFormat = isset($wrapperOptions['dateFormat']) ? $wrapperOptions['dateFormat'] : 'low';
		$wrapperIsLink = isset($wrapperOptions['isLink']) ? $wrapperOptions['isLink'] : true;
		$wrapperLinkText = isset($wrapperOptions['linkText']) ? $wrapperOptions['linkText'] : '';
		$wrapperLinkToPlug = isset($wrapperOptions['linkToPlug']) ? $wrapperOptions['linkToPlug'] : '';
		$wrapperUrlPrefix = isset($wrapperOptions['urlPrefix']) ? $wrapperOptions['urlPrefix'] : '';
		$icon = isset($attributes['icon']) ? $attributes['icon'] : '';
		$iconOptions = isset($icon['options']) ? $icon['options'] : [];
		$iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
		$iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
		$iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
		$iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
		$iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
		$blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
		$comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
		$lastUpdate = isset($objectData['last_updated']) ? $objectData['last_updated'] : "";
		$formattedLastUpdateDate = date($wrapperDateFormat, strtotime($lastUpdate));
		$creationDate = isset($objectData['creation_time']) ? $objectData['creation_time'] : "";
		$formattedCreationDate = date($wrapperDateFormat, strtotime($creationDate));
		if ($iconLibrary == 'fontAwesome') {
			wp_enqueue_style('fontawesome-icons');
		} else if ($iconLibrary == 'iconFont') {
			wp_enqueue_style('icofont-icons');
		} else if ($iconLibrary == 'bootstrap') {
			wp_enqueue_style('bootstrap-icons');
		}
		$fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
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
?>
		<<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="	<?php echo esc_attr($blockId); ?>	<?php echo esc_attr($wrapperClass); ?>">
			<?php if ($iconPosition == 'beforePrefix') : ?>
				<?php echo wp_kses_post($fontIconHtml); ?>
			<?php endif; ?>
			<span> <?php echo esc_attr($wrapperPrefix) ?> </span>
			<?php if ($iconPosition == 'afterPrefix') : ?>
				<?php echo wp_kses_post($fontIconHtml); ?>
			<?php endif; ?>
			<span>
				<?php if ($objectType == 'theme') : ?>
					<?php if ($wrapperField == 'name') {
						if ($wrapperLinkToPlug) {
					?>
							<a href="<?php echo esc_url($objectData['theme_url']); ?>">
								<?php echo isset($objectData['name']) ?
									esc_html($objectData['name']) : ''; ?></a>
					<?php
						} else
							echo isset($objectData['name']) ? esc_html($objectData['name']) : '';
					} ?>
					<?php if ($wrapperField == 'version') {
						echo isset($objectData['version']) ? esc_html($objectData['version']) : '';
					} ?>
					<?php if ($wrapperField == 'is_commercial') {
						if ($objectData['is_commercial']) {
							echo "Yes";
						} else {
							echo "No";
						}
					} ?>
					<?php if ($wrapperField == 'preview_url') {
						if ($wrapperIsLink) { ?>
							<a href="<?php echo isset($objectData['preview_url']) ? esc_url($objectData['preview_url'] . '?' . $wrapperUrlPrefix) : ''; ?>">
								<?php echo esc_html($wrapperLinkText); ?>
							</a>
					<?php } else {
							echo isset($objectData['preview_url']) ? esc_html($objectData['preview_url']) : '';
						}
					}
					?>
					<?php if ($wrapperField == 'author') {
						echo isset($objectData['author']) ? esc_html($objectData['author']) : '';
					} ?>
					<?php if ($wrapperField == 'screenshot_url') {
						if ($wrapperLinkToPlug) {
					?>
							<a href="<?php echo esc_url($objectData['theme_url']); ?>">
								<img src="<?php echo esc_url($objectData['screenshot_url']); ?>" alt="<?php echo esc_attr($objectData['name']) ?>" /></a>
						<?php
						} else { ?>
							<img src="<?php echo esc_url($objectData['screenshot_url']); ?>" alt="<?php echo esc_attr($objectData['name']) ?>" />
					<?php }
					} ?>
					<?php if ($wrapperField == 'rating') {
						echo isset($objectData['rating']) ? esc_html($objectData['rating']) : '';
					} ?>
					<?php if ($wrapperField == 'num_ratings') {
						echo isset($objectData['num_ratings']) ? esc_html($objectData['num_ratings']) : '';
					} ?>
					<?php if ($wrapperField == 'ratings') { ?>
						<ul><?php
								if (isset($objectData['ratings'])) {
									foreach ($objectData['ratings'] as $x => $value) { ?>
									<li><?php echo esc_attr($x); ?>: <?php echo esc_attr($value); ?></li>
								<?php } ?>
						</ul><?php }
							} ?>
				<?php if ($wrapperField == 'reviews_url') {
						if ($wrapperIsLink) { ?>
						<a href="<?php echo isset($objectData['reviews_url']) ? esc_url($objectData['reviews_url']) : ''; ?>">
							<?php echo esc_html($wrapperLinkText) ?>
						</a> <?php } else {
									echo isset($objectData['reviews_url']) ? esc_html($objectData['reviews_url']) : '';
								}
							} ?>
				<?php //if ($wrapperField == 'last_updated') {
					//echo $formattedLastUpdateDate;
					//} 
				?>
				<?php if ($wrapperField == 'creation_time') {
						//echo isset($objectData['creation_time']) ? esc_html($objectData['creation_time']) : '';
						echo esc_attr($formattedCreationDate);
					} ?>
				<?php if ($wrapperField == 'homepage') {
						if ($wrapperIsLink) { ?>
						<a href="<?php echo esc_url($objectData['homepage']); ?>">
							<?php //echo esc_html($wrapperLinkText) 
							?>
							<?php echo $wrapperLinkText ? esc_html($wrapperLinkText) : esc_html($objectData['homepage']); ?>
						</a> <?php } else {
									echo esc_html($objectData['homepage']);
								}
							} ?>
				<?php if ($wrapperField == 'tags') { ?>
					<ul><?php
							if (isset($objectData['tags'])) {
								foreach ($objectData['tags'] as $x => $value) { ?>
								<li><?php echo esc_html($value); ?></li>
							<?php } ?>
					</ul><?php }
						} ?>
			<?php if ($wrapperField == 'download_link') {
						if ($wrapperIsLink) { ?>
					<a href="<?php echo esc_url($objectData['download_link'] . '?' . $wrapperUrlPrefix); ?>">
						<?php echo esc_html($wrapperLinkText) ?>
					</a> <?php } else {
								echo esc_html($objectData['download_link']);
							}
						} ?>
			<?php if ($wrapperField == 'requires') {
						echo esc_html($objectData['requires']);
					} ?>
			<?php if ($wrapperField == 'requires_php') {
						echo esc_html($objectData['requires_php']);
					} ?>
			<?php if ($wrapperField == 'external_support_url') {
						if ($wrapperIsLink) { ?>
					<a href="<?php echo esc_url($objectData['external_support_url']); ?>">
						<?php echo esc_html($wrapperLinkText) ?>
					</a> <?php } else {
								echo esc_html($objectData['external_support_url']);
							}
						} ?>
			<?php if ($wrapperField == 'external_repository_url') {
						if ($wrapperIsLink) { ?>
					<a href="<?php echo esc_url($objectData['external_repository_url']); ?>">
						<?php echo esc_html($wrapperLinkText) ?>
					</a> <?php } else {
								echo esc_html($objectData['external_repository_url']);
							}
						} ?>
		<?php endif; ?>
		<?php if ($objectType == 'plugin') : ?>
			<?php if ($wrapperField == 'name') {
				if ($wrapperLinkToPlug) {
			?>
					<a href="<?php echo isset($objectData['homepage']) ? esc_url($objectData['homepage']) : ''; ?>">
						<?php echo isset($objectData['name']) ?
							esc_html($objectData['name']) : ''; ?></a>
			<?php
				} else
					echo isset($objectData['name']) ? esc_html($objectData['name']) : '';
			} ?>
			<?php if ($wrapperField == 'version') {
				echo isset($objectData['version']) ? esc_html($objectData['version']) : '';
			} ?>
			<?php if ($wrapperField == 'author') {
				echo isset($objectData['author']) ? wp_kses_post($objectData['author']) : '';
			} ?>
			<?php if ($wrapperField == 'author_profile') {
				echo isset($objectData['author_profile']) ? esc_html($objectData['author_profile']) : '';
			} ?>
			<?php if ($wrapperField == 'contributors') { ?>
				<ul><?php
						if (isset($objectData['contributors'])) {
							foreach ($objectData['contributors'] as $x => $value) { ?>
							<li><?php echo esc_html($value); ?></li>
					<?php }
						} ?>
				</ul><?php } ?>
			<?php if ($wrapperField == 'tested') {
				echo isset($objectData['tested']) ? esc_html($objectData['tested']) : '';
			} ?>
			<?php if ($wrapperField == 'requires') {
				echo isset($objectData['requires']) ? esc_html($objectData['requires']) : '';
			} ?>
			<?php if ($wrapperField == 'requires_php') {
				echo isset($objectData['requires_php']) ? esc_html($objectData['requires_php']) : '';
			} ?>
			<?php if ($wrapperField == 'requires_plugins') {
				echo isset($objectData['requires_plugins']) ? esc_html($objectData['requires_plugins']) : '';
			} ?>
			<?php if ($wrapperField == 'rating') {
				echo isset($objectData['rating']) ? esc_html($objectData['rating']) : '';
			} ?>
			<?php if ($wrapperField == 'num_ratings') {
				echo isset($objectData['num_ratings']) ? esc_html($objectData['num_ratings']) : '';
			} ?>
			<?php if ($wrapperField == 'support_threads') {
				echo isset($objectData['support_threads']) ? esc_html($objectData['support_threads']) : '';
			} ?>
			<?php if ($wrapperField == 'support_threads_resolved') {
				echo isset($objectData['support_threads_resolved']) ? esc_html($objectData['support_threads_resolved']) : '';
			} ?>
			<?php if ($wrapperField == 'active_installs') {
				echo isset($objectData['active_installs']) ? esc_html($objectData['active_installs']) : '';
			} ?>
			<?php if ($wrapperField == 'last_updated') {
				// echo isset($objectData['last_updated']) ? esc_html($objectData['last_updated']) : '';
				echo $formattedLastUpdateDate;
			} ?>
			<?php if ($wrapperField == 'added') {
				echo isset($objectData['added']) ? esc_html($objectData['added']) : '';
			} ?>
			<?php if ($wrapperField == 'ratings') { ?>
				<ul><?php
						if (isset($objectData['ratings'])) {
							foreach ($objectData['ratings'] as $x => $value) { ?>
							<li><?php echo esc_html($x); ?>: <?php echo esc_html($value); ?></li>
						<?php } ?>
				</ul><?php }
					} ?>
		<?php if ($wrapperField == 'homepage') {
				if ($wrapperIsLink) { ?>
				<a href="<?php echo isset($objectData['homepage']) ? esc_url($objectData['homepage'] . '?' . $wrapperUrlPrefix) : ''; ?>">
					<?php //echo esc_html($wrapperLinkText);
					?>
					<?php echo $wrapperLinkText ? esc_html($wrapperLinkText) : esc_html($objectData['homepage']); ?>
				</a> <?php } else {
							echo isset($objectData['homepage']) ? esc_html($objectData['homepage']) : '';
						}
					} ?>
		<?php if ($wrapperField == 'download_link') {
				if ($wrapperIsLink) { ?>
				<a href="<?php echo esc_url($objectData['download_link'] . '?' . $wrapperUrlPrefix); ?>">
					<?php echo esc_html($wrapperLinkText) ?>
				</a> <?php } else {
							echo isset($objectData['download_link']) ? esc_html($objectData['download_link']) : '';
						}
					} ?>
		<?php if ($wrapperField == 'banners') {
				if ($wrapperLinkToPlug) {
		?>
				<a href="<?php echo esc_url($objectData['homepage']); ?>">
					<img src="<?php echo isset($objectData['banners'][$wrapperThumbSize]) ? esc_url($objectData['banners'][$wrapperThumbSize]) : ''; ?>" alt="<?php echo isset($objectData['name']) ? esc_attr($objectData['name']) : ''; ?>" />
				</a>
			<?php
				} else { ?>
				<img src="<?php echo isset($objectData['banners'][$wrapperThumbSize]) ? esc_url($objectData['banners'][$wrapperThumbSize]) : ''; ?>" alt="<?php echo isset($objectData['name']) ? esc_attr($objectData['name']) : ''; ?>" />
		<?php }
			} ?>
		<?php if ($wrapperField == 'tags') { ?>
			<ul><?php
					if (isset($objectData['tags'])) {
						foreach ($objectData['tags'] as $x => $value) { ?>
						<li><?php echo esc_html($value); ?></li>
					<?php } ?>
			</ul><?php }
				} ?>
<?php endif; ?>
			</span>
		</<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
		$html = ob_get_clean();
		$cleanedHtml = combo_blocks_clean_html($html);
		return $cleanedHtml;
	}
}
$ComboBlocksWordpressOrgItem = new ComboBlocksWordpressOrgItem();
