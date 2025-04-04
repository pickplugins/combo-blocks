<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksStarRate
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/star-rate/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    global $comboBlocksCss;
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : get_the_id();
    $userId = isset($block->context['userId']) ? $block->context['userId'] : '';
    $userData = isset($block->context['userData']) ? $block->context['userData'] : [];


    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $post_author_id = isset($the_post->post_author) ? $the_post->post_author : '';
    $post_excerpt = '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperAttr = isset($wrapperOptions['attr']) ? $wrapperOptions['attr'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $starRate = isset($attributes['starRate']) ? $attributes['starRate'] : [];
    $starRateOptions = isset($starRate['options']) ? $starRate['options'] : [];
    $maxCount = isset($starRateOptions['maxCount']) ? $starRateOptions['maxCount'] : 5;
    $count = isset($starRateOptions['count']) ? $starRateOptions['count'] : 3;
    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $starRateOptions = isset($text['options']) ? $text['options'] : [];
    $textText = isset($starRateOptions['text']) ? $starRateOptions['text'] : 'Custom Text';
    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconLinkTo = isset($iconOptions['linkTo']) ? $iconOptions['linkTo'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    // $iconText = isset($iconOptions['rating']) ?(float) $iconOptions['rating'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
    $customUrl = isset($iconOptions["customUrl"])
      ? $iconOptions["customUrl"]
      : "";
    $postTitleLinkToAuthorMeta = isset($iconOptions['linkToAuthorMeta']) ? $iconOptions['linkToAuthorMeta'] : '';
    $textIsLink = isset($iconOptions['isLink']) ? $iconOptions['isLink'] : true;
    $textLinkTarget = isset($iconOptions['linkTarget']) ? $iconOptions['linkTarget'] : '_blank';
    $textCustomUrl = isset($iconOptions['customUrl']) ? $iconOptions['customUrl'] : '';
    $textLinkAttr = isset($iconOptions['linkAttr']) ? $iconOptions['linkAttr'] : [];
    $textRel = isset($iconOptions['rel']) ? $iconOptions['rel'] : '';
    $iconsIdle = isset($attributes['iconsIdle']) ? $attributes['iconsIdle'] : '';
    $iconsIdleOptions = isset($iconsIdle['options']) ? $iconsIdle['options'] : '';
    $iconsFilled = isset($attributes['iconsFilled']) ? $attributes['iconsFilled'] : '';
    $iconsFilledOptions = isset($iconsFilled['options']) ? $iconsFilled['options'] : '';
    $summary = isset($attributes['summary']) ? $attributes['summary'] : '';
    $summaryOptions = isset($summary['options']) ? $summary['options'] : '';
    $summaryType = isset($summaryOptions['type']) ? $summaryOptions['type'] : '';
    $summarySource = isset($summaryOptions['source']) ? $summaryOptions['source'] : '';
    $customFieldKey = isset($summaryOptions['customFieldKey']) ? $summaryOptions['customFieldKey'] : '';




    $summarytypeCustom = isset($summaryOptions['typeCustom']) ? $summaryOptions['typeCustom'] : '';
    $summaryRatingCount = isset($summaryOptions['rating_count']) ? $summaryOptions['rating_count'] : '';
    $summaryAvgRating = isset($summaryOptions['avg_rating']) ? (float)$summaryOptions['avg_rating'] : '';

    if ($summarySource == "wooProductRate") {
      $product_id = get_the_id();
      $product = wc_get_product($product_id);
      $summaryAvgRating  = $product->get_average_rating();
      $summaryRatingCount   = $product->get_rating_count();
    }
    if ($summarySource == "tutorInstructorRate") {

      if (function_exists("tutor_utils")) {
        $instructor_rating = tutor_utils()->get_instructor_ratings($userId);

        $summaryAvgRating  = number_format($instructor_rating->rating_avg, 2);
        $summaryRatingCount   = number_format($instructor_rating->rating_count, 2);
      }
    }
    if ($summarySource == "customFields") {
      $post_id = get_the_id();
      $metaValue = get_post_meta($post_id, $customFieldKey, true);
      $summaryAvgRating  = $metaValue;
    }


    $summaryVars = array(
      '{rating_count}' => $summaryRatingCount,
      '{average_rating}' => $summaryAvgRating,
    );
    $filled_width = (!empty($summaryAvgRating)) ? ($summaryAvgRating * 20) : 0;
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
    if ($iconLinkTo == 'postUrl') {
      $post_url = get_permalink($post_ID);
    } else if ($iconLinkTo == 'homeUrl') {
      $post_url = get_home_url();
    } else if ($iconLinkTo == 'authorUrl') {
      $user = get_user_by('ID', $post_author_id);
      $post_url = $user->user_url;
    } else if ($iconLinkTo == 'authorMail') {
      $user = get_user_by('ID', $post_author_id);
      $post_url = $user->user_email;
    } else if ($iconLinkTo == 'authorLink') {
      $post_url = get_author_posts_url($post_author_id);
    } else if ($iconLinkTo == 'customUrl') {
      $post_url = $customUrl;
    } else if ($iconLinkTo == 'authorMeta') {
      $post_url = get_the_author_meta($postTitleLinkToAuthorMeta, $post_author_id);
    } else if ($iconLinkTo == 'customField') {
      $post_url = get_post_meta($post_ID, $postTitleLinkToAuthorMeta, true);
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
    $fontIconHtml = '<span class="'  . ' ' . $iconSrc . '"></span>';
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
    ob_start();
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>"
        <?php echo esc_attr($wrapperAttrText); ?>>
        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>
        <?php if ($textIsLink) : ?>
          <a class='text-icon' target="<?php echo esc_attr($textLinkTarget); ?>"
            rel="<?php echo esc_attr($textRel); ?>"
            href="<?php echo (!empty($textCustomUrl)) ? esc_url($textCustomUrl) : esc_url($post_url); ?>">
            <div class="icons-idle">
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <div class="icons-filled" style="width:<?php echo esc_attr($filled_width) . '%'; ?>">
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
              </div>
            </div>
          </a>
          <?php if (!empty($summarytypeCustom)) : ?>
            <div class="summary">
              <?php
              echo wp_kses_post(strtr($summarytypeCustom, $summaryVars));
              ?>
            </div>
          <?php endif; ?>
          <?php if (empty($summarytypeCustom)) : ?>
            <?php if (!empty($summaryType)) : ?>
              <div class="summary">
                <?php
                echo wp_kses_post(strtr($summaryType, $summaryVars));
                ?>
              </div>
            <?php endif; ?>
          <?php endif; ?>
        <?php else : ?>
          <div class="text-icon">
            <div class="icons-idle">
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
              <div class="icons-filled" style="width:<?php echo esc_attr($filled_width) . '%'; ?>">
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
                <?php echo wp_kses_post($fontIconHtml); ?>
              </div>
            </div>
          </div>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
    <?php
    endif;
    if (empty($wrapperTag)) :
    ?>
      <?php if (!$textIsLink) : ?>
        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
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
        <a class='text' <?php //echo ($linkAttrStrText);   
                        ?> target="<?php echo esc_attr($textLinkTarget); ?>"
          rel="<?php echo esc_attr($textRel); ?>"
          href="<?php echo (!empty($textCustomUrl)) ? esc_url($textCustomUrl) : esc_url($post_url); ?>">
          <?php echo wp_kses_post($fontIconHtml); ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        </a>
        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
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
$ComboBlocksStarRate = new ComboBlocksStarRate();
