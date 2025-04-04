<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksPostDate
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/post-date/block.json',
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
    $post_date = isset($the_post->post_date) ? $the_post->post_date : '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $postDate = isset($attributes['postDate']) ? $attributes['postDate'] : [];
    $postDateOptions = isset($postDate['options']) ? $postDate['options'] : [];
    $postDateLinkTarget = isset($postDateOptions['linkTarget']) ? $postDateOptions['linkTarget'] : '_blank';
    $postDateArchiveDate = isset($postDateOptions['date']) ? $postDateOptions['date'] : '01';
    $postDateArchiveMonth = isset($postDateOptions['month']) ? $postDateOptions['month'] : '01';
    $postDateArchiveYear = isset($postDateOptions['year']) ? $postDateOptions['year'] : '2024';
    $postDateCustomUrl = isset($postDateOptions['customUrl']) ? $postDateOptions['customUrl'] : '';
    $postDateTag = isset($postDateOptions['tag']) ? $postDateOptions['tag'] : '';
    $postDateLinkAttr = isset($postDateOptions['linkAttr']) ? $postDateOptions['linkAttr'] : [];
    $postDateRel = isset($postDateOptions['rel']) ? $postDateOptions['rel'] : '';
    $dateFormat = isset($postDateOptions['dateFormat']) ? $postDateOptions['dateFormat'] : 'dateFormat';
    $postDateLinkTo = isset($postDateOptions['linkTo']) ? $postDateOptions['linkTo'] : '';
    $postDateLinkToMetaKey = isset($postDateOptions['linkToMetaKey']) ? $postDateOptions['linkToMetaKey'] : '';
    $customUrl = isset($postDateOptions['customUrl']) ? $postDateOptions['customUrl'] : '';
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
    $formatedPostDate = date($dateFormat, strtotime($post_date));
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
    $linkAttrStrpostDate = '';
    if (!empty($postDateLinkAttr))
      foreach ($postDateLinkAttr as $attr) {
        if (!empty($attr['val']))
          $linkAttrStrpostDate .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    $linkUrl = '';
    if ($postDateLinkTo == 'postUrl') {
      $linkUrl = get_permalink($post_ID);
    } else if ($postDateLinkTo == 'customField') {
      $linkUrl = get_post_meta($post_ID, $postDateLinkToMetaKey, true);
    } else if ($postDateLinkTo == 'authorUrl') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_url;
    } else if ($postDateLinkTo == 'authorMail') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = "mailto:" . $user->user_email;
    } else if ($postDateLinkTo == 'archiveDate') {
      $linkUrl = get_day_link($postDateArchiveYear, $postDateArchiveMonth, $postDateArchiveDate);
    } else if ($postDateLinkTo == 'archiveMonth') {
      $linkUrl = get_month_link($postDateArchiveYear, $postDateArchiveMonth);
    } else if ($postDateLinkTo == 'archiveYear') {
      $linkUrl = get_year_link($postDateArchiveYear);
    } else if ($postDateLinkTo == 'authorLink') {
      $author_id = get_post_field('post_author', $post_ID);
      $linkUrl = get_the_author_link($author_id);
    } else if ($postDateLinkTo == 'homeUrl') {
      $linkUrl = get_bloginfo('url');
    } else if ($postDateLinkTo == 'customUrl') {
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
        <?php if (!empty($postDateLinkTo)) :
          /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
        ?>
          <a class='postdate-text' <?php //echo ($linkAttrStrpostDate); 
                                    ?> target="<?php echo esc_attr($postDateLinkTarget); ?>"
            rel="<?php echo esc_attr($postDateRel); ?>"
            href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>">
            <?php if ($iconPosition == 'beforePostDate') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo wp_kses_post($formatedPostDate); ?>
            <?php if ($iconPosition == 'afterPostDate') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>
        <?php else :
          /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
        ?>
          <<?php echo combo_blocks_tag_escape($postDateTag); ?> class='postdate-text' <?php //echo ($linkAttrStrpostDate); 
                                                                                      ?>>
            <?php if ($iconPosition == 'beforePostDate') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo wp_kses_post($formatedPostDate); ?>
            <?php if ($iconPosition == 'afterPostDate') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </<?php echo combo_blocks_tag_escape($postDateTag); ?>>
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
      <?php if (!empty($postDateLinkTo)) :
        /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
      ?>
        <a class='postdate-text' <?php //echo ($linkAttrStrpostDate); 
                                  ?> target="<?php echo esc_attr($postDateLinkTarget); ?>"
          rel="<?php echo esc_attr($postDateRel); ?>"
          href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>">
          <?php if ($iconPosition == 'beforePostDate') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php echo wp_kses_post($formatedPostDate); ?>C
          <?php if ($iconPosition == 'afterPostDate') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
        </a>
      <?php else : ?>
        <?php if ($iconPosition == 'beforePostDate') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <span class='postdate-text'>
          <?php echo wp_kses_post($formatedPostDate); ?>
        </span>
        <?php if ($iconPosition == 'afterPostDate') : ?>
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
    <?php
    endif;
    ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksPostDate = new ComboBlocksPostDate();
