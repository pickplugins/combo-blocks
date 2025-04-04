<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksReadmore
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/read-more/block.json',
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
    $the_post = get_post($post_ID);
    $post_excerpt = '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $readMore = isset($attributes['readMore']) ? $attributes['readMore'] : [];
    $readMoreOptions = isset($readMore['options']) ? $readMore['options'] : [];
    $readMoreText = isset($readMoreOptions['text']) ? $readMoreOptions['text'] : __('Read More', 'combo-blocks');
    $readMoreLinkTo = isset($readMoreOptions['linkTo']) ? $readMoreOptions['linkTo'] : '';
    $readMoreLinkTarget = isset($readMoreOptions['linkTarget']) ? $readMoreOptions['linkTarget'] : '_blank';
    $readMoreCustomUrl = isset($readMoreOptions['customUrl']) ? $readMoreOptions['customUrl'] : '';
    $readMoreLinkAttr = isset($readMoreOptions['linkAttr']) ? $readMoreOptions['linkAttr'] : [];
    $readMoreRel = isset($readMoreOptions['rel']) ? $readMoreOptions['rel'] : '';
    $readMoreLinkToMetaKey = isset($readMoreOptions['linkToMetaKey']) ? $readMoreOptions['linkToMetaKey'] : '';
    $utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
    $utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';
    $utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
    $utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
    $utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
    $utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
    $utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
    $utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';
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
    $linkUrl = '';
    if ($readMoreLinkTo == 'postUrl') {
      $linkUrl = get_permalink($post_ID);
    } else if ($readMoreLinkTo == 'customField') {
      if (!empty($readMoreLinkToMetaKey)) {
        $linkUrl = get_post_meta($post_ID, $readMoreLinkToMetaKey, true);
      }
    } else if ($readMoreLinkTo == 'authorUrl') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_url;
    } else if ($readMoreLinkTo == 'authorMail') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = "mailto:" . $user->user_email;
    } else if ($readMoreLinkTo == 'authorLink') {
      $author_id = get_post_field('post_author', $post_ID);
      $linkUrl = get_author_posts_url($author_id);
    } else if ($readMoreLinkTo == 'homeUrl') {
      $linkUrl = get_bloginfo('url');
    } else if ($readMoreLinkTo == 'customUrl') {
      $linkUrl = $readMoreCustomUrl;
    }
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
    $linkAttrStrReadmore = '';
    if (!empty($readMoreLinkAttr))
      foreach ($readMoreLinkAttr as $attr) {
        if (!empty($attr['val']))
          $linkAttrStrReadmore .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }
    if (!empty($readMoreLinkTo)) {
      if ($utmTrackingEnable == true) {
        $utmValue = [];
        if (!empty($utmTrackingID))
          $utmValue['utm_id'] = $utmTrackingID;
        if (!empty($utmTrackingSource))
          $utmValue['utm_source'] = $utmTrackingSource;
        if (!empty($utmTrackingMedium))
          $utmValue['utm_medium'] = $utmTrackingMedium;
        if (!empty($utmTrackingCampaign))
          $utmValue['utm_campaign'] = $utmTrackingCampaign;
        if (!empty($utmTrackingTerm))
          $utmValue['utm_term'] = $utmTrackingTerm;
        if (!empty($utmTrackingContent))
          $utmValue['utm_content'] = $utmTrackingContent;
        $utmUrl = add_query_arg($utmValue, $linkUrl);
        $linkUrl = $utmUrl;
      }
    }
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
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
        <?php if (!empty($readMoreLinkTo)) : ?>
          <a class='readmore' <?php //echo ($linkAttrStrReadmore); 
                              ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>"
            rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo esc_url($linkUrl); ?>">
            <?php if ($iconPosition == 'beforeReadmore') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo esc_attr($readMoreText); ?>
            <?php if ($iconPosition == 'afterReadmore') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>
        <?php else : ?>
          <div class='readmore' <?php //echo ($linkAttrStrReadmore); 
                                ?>>
            <?php if ($iconPosition == 'beforeReadmore') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo esc_attr($readMoreText); ?>
            <?php if ($iconPosition == 'afterReadmore') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </div>
        <?php endif; ?>
        <?php if ($iconPosition == 'beforePostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'afterPostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
    <?php
    endif;
    if (empty($wrapperTag)) :
      /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
    ?>
      <?php if (!empty($readMoreLinkTo)) : ?>
        <a class="<?php echo esc_attr($blockId); ?>" <?php //echo ($linkAttrStrReadmore); 
                                                      ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>"
          rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo esc_url($linkUrl); ?>">
          <?php if ($prefixText) : ?>
            <span class="<?php echo esc_attr($prefixClass); ?>">
              <?php echo wp_kses_post($prefixText); ?>
            </span>
          <?php endif; ?>
          <?php echo wp_kses_post($readMoreText); ?>
          <?php if ($postfixText) : ?>
            <span class="<?php echo esc_attr($postfixClass); ?>">
              <?php echo wp_kses_post($postfixText); ?>
            </span>
          <?php endif; ?>
        </a>
      <?php else : ?>
        <div class="<?php echo esc_attr($blockId); ?>">
          <?php if ($prefixText) : ?>
            <span class="<?php echo esc_attr($prefixClass); ?>">
              <?php echo wp_kses_post($prefixText); ?>
            </span>
          <?php endif; ?>
          <?php echo wp_kses_post($readMoreText); ?>
          <?php if ($postfixText) : ?>
            <span class="<?php echo esc_attr($postfixClass); ?>">
              <?php echo wp_kses_post($postfixText); ?>
            </span>
          <?php endif; ?>
        </div>
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
$ComboBlocksReadmore = new ComboBlocksReadmore();
