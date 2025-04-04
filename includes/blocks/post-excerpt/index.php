<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksPostExcerpt
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/post-excerpt/block.json',
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
    $post_author_id = isset($the_post->post_author) ? $the_post->post_author : '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    // $wrapperTextAlign = isset($wrapperStyles['textAlign']) ? $wrapperStyles['textAlign'] : [];
    $postExcerpt = isset($attributes['postExcerpt']) ? $attributes['postExcerpt'] : [];
    $postExcerptOptions = isset($postExcerpt['options']) ? $postExcerpt['options'] : [];
    $limitBy = isset($postExcerptOptions['limitBy']) ? $postExcerptOptions['limitBy'] : 'word';
    $limitCount = !empty($postExcerptOptions['limitCount']) ? (int) $postExcerptOptions['limitCount'] : 999;
    $excerptSource = isset($postExcerptOptions['excerptSource']) ? $postExcerptOptions['excerptSource'] : 'auto';
    $excerptSourceMeta = isset($postExcerptOptions['excerptSourceMeta']) ? $postExcerptOptions['excerptSourceMeta'] : '';
    $postExcerptTag = isset($postExcerptOptions['tag']) ? $postExcerptOptions['tag'] : '';
    $postExcerptIsLink = isset($postExcerptOptions['isLink']) ? $postExcerptOptions['isLink'] : false;
    $postExcerptLinkTo = isset($postExcerptOptions['linkTo']) ? $postExcerptOptions['linkTo'] : false;
    $postExcerptlinkAttr = isset($postExcerptOptions['linkAttr']) ? $postExcerptOptions['linkAttr'] : [];
    $postExcerptclass = isset($postExcerptOptions['class']) ? $postExcerptOptions['class'] : '';
    $postExcerptRel = isset($postExcerptOptions['rel']) ? $postExcerptOptions['rel'] : '';
    $postExcerptLinkToAuthorMeta = isset($postExcerptOptions['linkToAuthorMeta']) ? $postExcerptOptions['linkToAuthorMeta'] : '';
    $postExcerptLinkToCustomMeta = isset($postExcerptOptions['linkToCustomMeta']) ? $postExcerptOptions['linkToCustomMeta'] : '';
    $postExcerptLinkTarget = isset($postExcerptOptions['linkTarget']) ? $postExcerptOptions['linkTarget'] : '';
    $postExcerptCustomUrl = isset($postExcerptOptions['customUrl']) ? $postExcerptOptions['customUrl'] : '';
    $removeBlocks = isset($postExcerptOptions['removeBlocks']) ? $postExcerptOptions['removeBlocks'] : true;
    $removeShortcodes = isset($postExcerptOptions['removeShortcodes']) ? $postExcerptOptions['removeShortcodes'] : true;
    $keepHtml = isset($postExcerptOptions['keepHtml']) ? $postExcerptOptions['keepHtml'] : true;
    $removeEmbeds = isset($postExcerptOptions['removeEmbeds']) ? $postExcerptOptions['removeEmbeds'] : true;
    $autoP = isset($postExcerptOptions['autoP']) ? $postExcerptOptions['autoP'] : false;
    $readMore = isset($attributes['readMore']) ? $attributes['readMore'] : [];
    $readMoreOptions = isset($readMore['options']) ? $readMore['options'] : [];
    $readMoreText = isset($readMoreOptions['text']) ? $readMoreOptions['text'] : __('Read More', 'combo-blocks');
    $readMoreClass = isset($readMoreOptions['class']) ? $readMoreOptions['class'] : '';
    $readMoreEnable = isset($readMoreOptions['enable']) ? $readMoreOptions['enable'] : true;
    $readMoreIsLink = isset($readMoreOptions['isLink']) ? $readMoreOptions['isLink'] : true;
    $readMoreLinkToAuthorMeta = isset($readMoreOptions['linkToAuthorMeta']) ? $readMoreOptions['linkToAuthorMeta'] : '';
    $readMoreLinkToCustomMeta = isset($readMoreOptions['linkToCustomMeta']) ? $readMoreOptions['linkToCustomMeta'] : '';
    $readMoreLinkTo = isset($readMoreOptions['linkTo']) ? $readMoreOptions['linkTo'] : true;
    $readMoreLinkTarget = isset($readMoreOptions['linkTarget']) ? $readMoreOptions['linkTarget'] : '_blank';
    $readMoreCustomUrl = isset($readMoreOptions['customUrl']) ? $readMoreOptions['customUrl'] : '';
    $readMoreLinkAttr = isset($readMoreOptions['linkAttr']) ? $readMoreOptions['linkAttr'] : [];
    $readMoreRel = isset($readMoreOptions['rel']) ? $readMoreOptions['rel'] : '';
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
    if ($postExcerptLinkTo == 'postUrl') {
      $post_url = get_permalink($post_ID);
    } else if ($postExcerptLinkTo == 'homeUrl') {
      $post_url = get_home_url();
    } else if ($postExcerptLinkTo == 'authorUrl') {
      $user = get_user_by('ID', $post_author_id);
      $post_url = $user->user_url;
    } else if ($postExcerptLinkTo == 'authorMail') {
      $user = get_user_by('ID', $post_author_id);
      $post_url = $user->user_email;
    } else if ($postExcerptLinkTo == 'authorLink') {
      $post_url = get_author_posts_url($post_author_id);
    } else if ($postExcerptLinkTo == 'customUrl') {
      $post_url = $postExcerptCustomUrl;
    } else if ($postExcerptLinkTo == 'authorMeta') {
      $post_url = get_user_meta($post_author_id, $postExcerptLinkToAuthorMeta, true);
    } else if ($postExcerptLinkTo == 'customField') {
      $post_url = get_post_meta($post_author_id, $postExcerptLinkToCustomMeta, true);
    }
    if ($readMoreLinkTo == 'postUrl') {
      $read_more_url = get_permalink($post_ID);
    } else if ($readMoreLinkTo == 'homeUrl') {
      $read_more_url = get_home_url();
    } else if ($readMoreLinkTo == 'authorUrl') {
      $user = get_user_by('ID', $post_author_id);
      $read_more_url = $user->user_url;
    } else if ($readMoreLinkTo == 'authorMail') {
      $user = get_user_by('ID', $post_author_id);
      $read_more_url = $user->user_email;
    } else if ($readMoreLinkTo == 'authorLink') {
      $read_more_url = get_author_posts_url($post_author_id);
    } else if ($readMoreLinkTo == 'customUrl') {
      $read_more_url = $readMoreCustomUrl;
    } else if ($readMoreLinkTo == 'authorMeta') {
      $read_more_url = get_user_meta($post_author_id, $readMoreLinkToAuthorMeta, true);
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
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    $postExcerptclass = combo_blocks_parse_css_class($postExcerptclass, $obj);
    $readMoreClass = combo_blocks_parse_css_class($readMoreClass, $obj);
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
    if ($excerptSource == 'auto') {
      $post_excerpt = !empty($the_post->post_excerpt) ? $the_post->post_excerpt : '';
      $post_content = !empty($the_post->post_content) ? $the_post->post_content : '';
      $post_excerpt = !empty($post_excerpt) ? $post_excerpt : $post_content;
    } else if ($excerptSource == 'excerpt') {
      $post_excerpt = !empty($the_post->post_excerpt) ? $the_post->post_excerpt : '';
    } else if ($excerptSource == 'content') {
      $post_excerpt = !empty($the_post->post_content) ? $the_post->post_content : '';
    } else if ($excerptSource == 'meta') {
      $metaValue = get_post_meta($post_ID, $excerptSourceMeta, true);
      $post_excerpt = !empty($metaValue) ? $metaValue : $the_post->post_excerpt;
    }
    if ($removeBlocks) {
      if (function_exists('excerpt_remove_blocks')) {
        $post_excerpt = excerpt_remove_blocks($post_excerpt);
      }
    }
    if ($removeShortcodes) {
      if (function_exists('strip_shortcodes')) {
        $post_excerpt = strip_shortcodes($post_excerpt);
      }
    }
    if ($autoP) {
      if (function_exists('wpautop')) {
        $post_excerpt = wpautop($post_excerpt);
      }
    }
    if ($limitBy == 'character') {
      if (!$keepHtml) {
        if (function_exists('wp_strip_all_tags')) {
          $post_excerpt = substr($post_excerpt, 0, $limitCount);
        }
      } else {
        $post_excerpt = force_balance_tags(html_entity_decode(wp_trim_words(htmlentities(($post_excerpt)), $limitCount, '')));
      }
    } else {
      if (!$keepHtml) {
        if (function_exists('wp_trim_words')) {
          $post_excerpt = wp_trim_words($post_excerpt, $limitCount, '');
        }
      } else {
        $post_excerpt = force_balance_tags(html_entity_decode(wp_trim_words(htmlentities(($post_excerpt)), $limitCount, '')));
      }
      //$post_excerpt = wp_trim_words($post_excerpt, $limitCount, '');
    }
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
        <?php echo esc_attr($blockId); ?>
        <?php echo esc_attr($wrapperClass); ?>">
        <?php if ($postExcerptLinkTo) : ?>
          <a class="
          <?php echo esc_attr($postExcerptclass); ?>
          " href="<?php echo //(!empty($postExcerptCustomUrl)) ? esc_url($postExcerptCustomUrl) : 
                  esc_url($post_url); ?>" rel="<?php echo esc_attr($postExcerptRel); ?>" target="<?php echo esc_attr($postExcerptLinkTarget); ?>" <?php
                                                                                                                                                  /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                                                                                                                                  //echo ($linkAttrStr); 
                                                                                                                                                  ?>>
            <?php if ($prefixText) : ?>
              <span class="<?php echo esc_attr($prefixClass); ?>">
                <?php echo esc_attr($prefixText); ?>
              </span>
            <?php endif; ?>
            <?php echo wp_kses_post($post_excerpt); ?>
            <?php if ($postfixText) : ?>
              <span class="<?php echo esc_attr($postfixClass); ?>">
                <?php echo wp_kses_post($postfixText); ?>
              </span>
            <?php endif; ?>
          </a>
        <?php else : ?>
          <?php if (!empty($postExcerptTag)) : ?>
            <<?php echo combo_blocks_tag_escape($postExcerptTag); ?> class="
              <?php echo esc_attr($postExcerptclass); ?>
              ">
              <?php if ($postfixText) : ?>
                <span class="<?php echo esc_attr($prefixClass); ?>">
                  <?php echo wp_kses_post($prefixText); ?>
                </span>
              <?php endif; ?>
              <?php echo wp_kses_post($post_excerpt); ?>
              <?php if ($postfixText) : ?>
                <span class="<?php echo esc_attr($postfixClass); ?>">
                  <?php echo wp_kses_post($postfixText); ?>
                </span>
              <?php endif; ?>
            </<?php echo combo_blocks_tag_escape($postExcerptTag); ?>>
          <?php else : ?>
            <?php if ($postfixText) : ?>
              <span class="<?php echo esc_attr($prefixClass); ?>">
                <?php echo wp_kses_post($prefixText); ?>
              </span>
            <?php endif; ?>
            <?php echo wp_kses_post($post_excerpt); ?>
            <?php if ($postfixText) : ?>
              <span class="<?php echo esc_attr($postfixClass); ?>">
                <?php echo wp_kses_post($postfixText); ?>
              </span>
            <?php endif; ?>
          <?php endif; ?>
        <?php endif; ?>
        <?php if ($readMoreEnable) :
          /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
        ?>
          <?php if (!empty($readMoreText)) : ?>
            <a class='
            <?php echo esc_attr($readMoreClass); ?>
            ' <?php //echo ($linkAttrStrReadmore); 
              ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>" rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo //(!empty($readMoreCustomUrl)) ? esc_url($readMoreCustomUrl) : 
                                                                                                                          esc_url($read_more_url); ?>">
              <?php echo wp_kses_post($readMoreText); ?>
            </a>
          <?php endif; ?>
        <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
    <?php
    endif;
    if (empty($wrapperTag)) :
    ?>
      <?php if ($postExcerptLinkTo) : ?>
        <a class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($postExcerptclass); ?>" href="<?php echo //(!empty($postExcerptCustomUrl)) ? esc_url($postExcerptCustomUrl) : 
                                                                                                      esc_url($post_url); ?>" rel="<?php echo esc_attr($postExcerptRel); ?>" target="<?php echo esc_attr($postExcerptLinkTarget); ?>" <?php
                                                                                                                                                                                                                                      /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
                                                                                                                                                                                                                                      //echo ($linkAttrStr); 
                                                                                                                                                                                                                                      ?>>
          <?php if ($postfixText) : ?>
            <span class="<?php echo esc_attr($prefixClass); ?>">
              <?php echo wp_kses_post($prefixText); ?>
            </span>
          <?php endif; ?>
          <?php echo wp_kses_post($post_excerpt); ?>
          <?php if ($postfixText) : ?>
            <span class="<?php echo esc_attr($postfixClass); ?>">
              <?php echo wp_kses_post($postfixText); ?>
            </span>
          <?php endif; ?>
        </a>
      <?php else : ?>
        <div class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($postExcerptclass); ?>">
          <?php if (!empty($postExcerptTag)) : ?>
            <<?php echo combo_blocks_tag_escape($postExcerptTag); ?> class="excerpt-text">
              <?php if ($postfixText) : ?>
                <span class="<?php echo esc_attr($prefixClass); ?>">
                  <?php echo wp_kses_post($prefixText); ?>
                </span>
              <?php endif; ?>
              <?php echo wp_kses_post($post_excerpt); ?>
              <?php if ($postfixText) : ?>
                <span class="<?php echo esc_attr($postfixClass); ?>">
                  <?php echo wp_kses_post($postfixText); ?>
                </span>
              <?php endif; ?>
            </<?php echo combo_blocks_tag_escape($postExcerptTag); ?>>
          <?php else : ?>
            <?php if ($postfixText) : ?>
              <span class="<?php echo esc_attr($prefixClass); ?>">
                <?php echo wp_kses_post($prefixText); ?>
              </span>
            <?php endif; ?>
            <?php echo wp_kses_post($post_excerpt); ?>
            <?php if ($postfixText) : ?>
              <span class="<?php echo esc_attr($postfixClass); ?>">
                <?php echo wp_kses_post($postfixText); ?>
              </span>
            <?php endif; ?>
          <?php endif; ?>
          <?php if ($readMoreEnable) :
            /* TO code reviewers, $linkAttrStr escaped correctly before, No need here.*/
          ?>
            <?php if (!empty($readMoreText)) : ?>
              <a class='
              <?php echo esc_attr($readMoreClass); ?>
              ' <?php //echo ($linkAttrStrReadmore); 
                ?> target="<?php echo esc_attr($readMoreLinkTarget); ?>" rel="<?php echo esc_attr($readMoreRel); ?>" href="<?php echo (!empty($readMoreCustomUrl)) ? esc_url($readMoreCustomUrl) : esc_url($read_more_url); ?>">
                <?php echo wp_kses_post($readMoreText); ?>
              </a>
            <?php endif; ?>
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
$ComboBlocksPostExcerpt = new ComboBlocksPostExcerpt();
