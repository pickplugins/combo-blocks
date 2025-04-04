<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksIcon
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/icon/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/icon')) {
      ////wp_enqueue_script('combo_blocks_scripts');
    }
    global $comboBlocksCss;
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $post_author_id = isset($the_post->post_author) ? $the_post->post_author : '';
    $post_excerpt = '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $wrapperAttr = isset($wrapperOptions['attr']) ? $wrapperOptions['attr'] : [];
    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];
    $textText = isset($textOptions['text']) ? $textOptions['text'] : 'Custom Text';
    $textEnable = isset($textOptions['enable']) ? $textOptions['enable'] : true;
    $textLinkTo = isset($textOptions['linkTo']) ? $textOptions['linkTo'] : '';
    $textLinkTarget = isset($textOptions['linkTarget']) ? $textOptions['linkTarget'] : '_blank';
    $textLinkToAuthorMeta = isset($textOptions['linkToAuthorMeta']) ? $textOptions['linkToAuthorMeta'] : '';
    $textLinkToCustomMeta = isset($textOptions['linkToCustomMeta']) ? $textOptions['linkToCustomMeta'] : '';
    $textCustomUrl = isset($textOptions['customUrl']) ? $textOptions['customUrl'] : '';
    $textLinkAttr = isset($textOptions['linkAttr']) ? $textOptions['linkAttr'] : [];
    $textLinkAppend = isset($textOptions['linkAppend']) ? $textOptions['linkAppend'] : [];
    $textAppendURLPrams = isset($textOptions['appendURLPrams']) ? $textOptions['appendURLPrams'] : false;
    $textRel = isset($textOptions['rel']) ? $textOptions['rel'] : '';
    $triggerName = isset($textOptions['triggerName']) ? $textOptions['triggerName'] : '';
    $triggerType = isset($textOptions['triggerType']) ? $textOptions['triggerType'] : '';
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
    $linkAttrStrText = '';
    if (!empty($textLinkAttr))
      foreach ($textLinkAttr as $attr) {
        if (!empty($attr['val']))
          $linkAttrStrText .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }
    $wrapperAttrText = '';
    if (!empty($wrapperAttr))
      foreach ($wrapperAttr as $attr) {
        if (!empty($attr['val']))
          $wrapperAttrText .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }
    // $utmGeneratedText = "utm_medium=".$utmTrackingMedium. "&utm_source=". $utmTrackingSource . "&utm_content=" . $utmTrackingContent . "&utm_term=" . $utmTrackingTerm;
    if ($textLinkTo == 'postUrl') {
      $post_url = get_permalink($post_ID);
    } else if ($textLinkTo == 'nextPostUrl') {
      $post_url = get_next_post_link();
    } else if ($textLinkTo == 'previousPostUrl') {
      $post_url = get_previous_post_link();
    } else if ($textLinkTo == 'homeUrl') {
      $post_url = get_home_url();
    } else if ($textLinkTo == 'authorUrl') {
      $user = get_user_by('ID', $post_author_id);
      $post_url = $user->user_url;
    } else if ($textLinkTo == 'authorMail') {
      $user = get_user_by('ID', $post_author_id);
      $post_url = $user->user_email;
      $post_url = "mailto:$post_url";
    } else if ($textLinkTo == 'authorLink') {
      $post_url = get_author_posts_url($post_author_id);
    } else if (
      $textLinkTo == 'customUrl'
    ) {
      $post_url = $textCustomUrl;
    } else if ($textLinkTo == 'authorMeta') {
      $post_url = get_the_author_meta($textLinkToAuthorMeta, $post_author_id);
    } else if ($textLinkTo == 'customField') {
      $post_url = get_post_meta($post_ID, $textLinkToAuthorMeta, true);
    }
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
      $utmUrl = add_query_arg($utmValue, $post_url);
      $textCustomUrl = $utmUrl;
    }
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    $textText = combo_blocks_parse_css_class($textText, $obj);
    $prefixText = combo_blocks_parse_css_class($prefixText, $obj);
    $postfixText = combo_blocks_parse_css_class($postfixText, $obj);
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }
    // //* Visible condition
    $dataTrigger = [
      "triggerName" => $triggerName,
      "triggerType" => $triggerType,
      "blockId" => $blockId,
    ];

    if ($textAppendURLPrams) {
      $url_prams = $_SERVER['QUERY_STRING'];
      parse_str($url_prams, $params_array);

      $textCustomUrl = add_query_arg($params_array, $textCustomUrl);
    }

    if (!empty($textLinkAppend)) {

      $textLinkAppendArgs = [];
      foreach ($textLinkAppend as $append) {

        $appendId = isset($append['id']) ? $append['id'] : '';
        //$appendValGET = isset($_GET[$appendId]) ? sanitize_text_field($_GET[$appendId]) : '';
        $appendVal = !empty($append['val']) ? $append['val'] : "";
        $textLinkAppendArgs[$appendId] = $appendVal;
      }


      $textCustomUrl = add_query_arg($textLinkAppendArgs, $textCustomUrl);
    }








    ob_start();
    if (!empty($wrapperTag)) :
?>


      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>"
        <?php if (!empty($triggerName)): ?>
        data-trigger="<?php echo esc_attr(json_encode($dataTrigger)) ?>"
        <?php endif; ?>
        <?php if (!empty($wrapperAttrText)): ?>
        <?php echo esc_attr($wrapperAttrText); ?>
        <?php endif; ?>>
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
        <?php if (!empty($textLinkTo)) : ?>
          <?php if ($iconPosition == 'beforeLink') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <a class='text' <?php //echo ($linkAttrStrText); 
                          ?> target="<?php echo esc_attr($textLinkTarget); ?>" rel="<?php echo esc_attr($textRel); ?>" href="<?php echo (!empty($textCustomUrl)) ? esc_url($textCustomUrl) : esc_url($post_url); ?>">
            <?php if ($iconPosition == 'beforeText') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php if ($textEnable) : ?>
              <span>
                <?php echo wp_kses_post($textText); ?>
              </span>
            <?php endif; ?>
            <?php if ($iconPosition == 'afterText') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>
          <?php if ($iconPosition == 'afterLink') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
        <?php else : ?>
          <?php if ($iconPosition == 'beforeText') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php if ($textEnable) : ?>
            <span class="text">
              <?php echo wp_kses_post($textText); ?>
            </span>
          <?php endif; ?>
          <?php if ($iconPosition == 'afterText') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
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
    ?>
      <?php if (empty($textLinkTo)) : ?>
        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'beforeText') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($textEnable) : ?>
          <span class="text">
            <?php echo wp_kses_post($textText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'afterText') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
      <?php else : ?>
        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'beforeLink') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <a class="<?php echo esc_attr($blockId); ?>" <?php //echo ($linkAttrStrText); 
                                                      ?> target="<?php echo esc_attr($textLinkTarget); ?>" rel="<?php echo esc_attr($textRel); ?>" href="<?php echo (!empty($textCustomUrl)) ? esc_url($textCustomUrl) : esc_url($post_url); ?>">
          <?php if ($iconPosition == 'beforeText') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php if ($textEnable) : ?>
            <span class='text'>
              <?php echo wp_kses_post($textText); ?>
            </span>
          <?php endif; ?>
          <?php if ($iconPosition == 'afterText') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
        </a>
        <?php if ($iconPosition == 'afterLink') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
      <?php endif; ?>
    <?php endif; ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksIcon = new ComboBlocksIcon();
