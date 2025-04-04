<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksBackToTop
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/back-to-top/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/back-to-top')) {
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
    $show_after = isset($wrapperOptions['showAfter']) ? $wrapperOptions['showAfter'] : '';
    $offset_top = isset($wrapperOptions['offsetTop']) ? $wrapperOptions['offsetTop'] : '';
    $wrapperAttr = isset($wrapperOptions['attr']) ? $wrapperOptions['attr'] : [];
    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];
    $textClass = isset($textOptions['class']) ? $textOptions['class'] : 'back-to-top-text';
    $textText = isset($textOptions['text']) ? $textOptions['text'] : 'Custom Text';
    $textEnable = isset($textOptions['enable']) ? $textOptions['enable'] : true;
    $textLinkTo = isset($textOptions['linkTo']) ? $textOptions['linkTo'] : '';
    $textLinkTarget = isset($textOptions['linkTarget']) ? $textOptions['linkTarget'] : '_blank';
    $textLinkToAuthorMeta = isset($textOptions['linkToAuthorMeta']) ? $textOptions['linkToAuthorMeta'] : '';
    $textLinkToCustomMeta = isset($textOptions['linkToCustomMeta']) ? $textOptions['linkToCustomMeta'] : '';
    $textCustomUrl = isset($textOptions['customUrl']) ? $textOptions['customUrl'] : '';
    $textLinkAttr = isset($textOptions['linkAttr']) ? $textOptions['linkAttr'] : [];
    $textRel = isset($textOptions['rel']) ? $textOptions['rel'] : '';
    $image = isset($attributes['image']) ? $attributes['image'] : '';
    $imageOptions = isset($image['options']) ? $image['options'] : [];
    $imageUrl = isset($imageOptions['srcUrl']) ? $imageOptions['srcUrl'] : '';
    $imageEnable = isset($imageOptions['enable']) ? $imageOptions['enable'] : '';
    $imageClass = isset($imageOptions['class']) ? $imageOptions['class'] : '';
    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
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
    $settings = [
      'offset_top' => $offset_top,
      'show_after' => $show_after,
      'show_scroll' => true,
    ];
    $dataSettings = json_encode($settings);
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    $textText = combo_blocks_parse_css_class($textText, $obj);
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }
    // //* Visible condition
    $dataAtts = [
      "blockId" => $blockId,
    ];
    ob_start();
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="pg-back-to-top  
                                  <?php echo esc_attr($blockId); ?>
                                  <?php echo esc_attr($wrapperClass); ?>"
        data-settings='<?php echo esc_attr($dataSettings); ?>'
        <?php //echo esc_attr($wrapperAttrText); 
        ?><?php  //echo $linkAttrStr; 
          ?>>
        <?php if ($iconPosition == 'beforeText') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($imageEnable) : ?>
          <img class="<?php echo wp_kses_post($imageClass); ?>" src="<?php echo esc_url($imageUrl); ?>" />
        <?php endif; ?>
        <?php if ($textEnable) : ?>
          <span class="<?php echo esc_attr($textClass); ?>">
            <?php echo wp_kses_post($textText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'afterText') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
      <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
      <?php
      if (empty($wrapperTag)) :
      ?>
        <?php if ($iconPosition == 'beforeText') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($textEnable) : ?>
          <span class="<?php echo esc_attr($textClass); ?>">
            <?php echo wp_kses_post($textText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'afterText') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php //endif; 
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
$ComboBlocksBackToTop = new ComboBlocksBackToTop();
