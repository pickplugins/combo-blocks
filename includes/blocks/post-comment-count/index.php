<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksCommentCount
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/post-comment-count/block.json',
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
    $commentCount = isset($attributes['commentCount']) ? $attributes['commentCount'] : [];
    $commentCountOptions = isset($commentCount['options']) ? $commentCount['options'] : [];
    $status = isset($commentCountOptions['status']) ? $commentCountOptions['status'] : 'approved';
    $customLabel = isset($commentCountOptions['customLabel']) ? $commentCountOptions['customLabel'] : 'Count: %s';
    $commentCountLinkTarget = isset($commentCountOptions['linkTarget']) ? $commentCountOptions['linkTarget'] : '_blank';
    $commentCountCustomUrl = isset($commentCountOptions['customUrl']) ? $commentCountOptions['customUrl'] : '';
    $commentCountLinkAttr = isset($commentCountOptions['linkAttr']) ? $commentCountOptions['linkAttr'] : [];
    $commentCountRel = isset($commentCountOptions['rel']) ? $commentCountOptions['rel'] : '';
    $dateFormat = isset($commentCountOptions['dateFormat']) ? $commentCountOptions['dateFormat'] : 'dateFormat';
    $commentCountLinkTo = isset($commentCountOptions['linkTo']) ? $commentCountOptions['linkTo'] : '';
    $commentCountLinkToMetaKey = isset($commentCountOptions['linkToMetaKey']) ? $commentCountOptions['linkToMetaKey'] : '';
    $customUrl = isset($commentCountOptions['customUrl']) ? $commentCountOptions['customUrl'] : '';
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
    $counts = wp_count_comments($post_ID);
    $countbyStatus = isset($counts->$status) ? $counts->$status : 0;
    $formatedcommentCount = sprintf($customLabel, $countbyStatus);
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
    $linkAttrStrcommentCount = '';
    if (!empty($commentCountLinkAttr))
      foreach ($commentCountLinkAttr as $attr) {
        if (!empty($attr['val']))
          $linkAttrStrcommentCount .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    $linkUrl = '';
    if ($commentCountLinkTo == 'postUrl') {
      $linkUrl = get_permalink($post_ID);
    } else if ($commentCountLinkTo == 'customField') {
      $linkUrl = get_post_meta($post_ID, $commentCountLinkToMetaKey, true);
    } else if ($commentCountLinkTo == 'authorUrl') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_url;
    } else if ($commentCountLinkTo == 'authorLink') {
      $author_id = get_post_field('post_author', $post_ID);
      $linkUrl = get_the_author_link($author_id);
    } else if ($commentCountLinkTo == 'homeUrl') {
      $linkUrl = get_bloginfo('url');
    } else if ($commentCountLinkTo == 'customUrl') {
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
        <?php if (!empty($commentCountLinkTo)) : ?>
          <a class='commentCount' <?php //echo ($linkAttrStrcommentCount); 
                                  ?> target="<?php echo esc_attr($commentCountLinkTarget); ?>" rel="<?php echo esc_attr($commentCountRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>">
            <?php if ($iconPosition == 'beforeCommentCount') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo wp_kses_post($formatedcommentCount); ?>
            <?php if ($iconPosition == 'afterCommentCount') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>
        <?php else : ?>
          <?php if ($iconPosition == 'beforeCommentCount') :  ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif;  ?>
          <span class='commentCount' <?php //echo ($linkAttrStrcommentCount); 
                                      ?>>
            <?php echo wp_kses_post($formatedcommentCount); ?>
            <?php if ($iconPosition == 'afterCommentCount') : ?>
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
      <?php if (!empty($commentCountLinkTo)) : ?>
        <a class='commentCount' <?php /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/ echo ($linkAttrStrcommentCount); ?> target="<?php echo esc_attr($commentCountLinkTarget); ?>" rel="<?php echo esc_attr($commentCountRel); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>">
          <?php if ($iconPosition == 'beforeCommentCount') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php echo wp_kses_post($formatedcommentCount); ?>C
          <?php if ($iconPosition == 'afterCommentCount') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
        </a>
      <?php else : ?>
        <?php if ($iconPosition == 'beforeCommentCount') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>HELOO
        <?php endif; ?>
        <span class='commentCount'>
          <?php echo wp_kses_post($formatedcommentCount); ?>
        </span>
        <?php if ($iconPosition == 'afterCommentCount') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
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
    <?php endif;
    ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksCommentCount = new ComboBlocksCommentCount();
