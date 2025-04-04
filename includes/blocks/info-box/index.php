<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksInfoBox
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/info-box/block.json',
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
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperID = isset($wrapperOptions['id']) ? $wrapperOptions['id'] : '';
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperLinkTo = isset($wrapperOptions['linkTo']) ? $wrapperOptions['linkTo'] : '';
    //$content = isset($wrapperOptions['content']) ? $wrapperOptions['content'] : '';
    $wrapperLinkTo = isset($wrapperOptions['linkTo']) ? $wrapperOptions['linkTo'] : '';
    $wrapperLinkTarget = isset($wrapperOptions['linkTarget']) ? $wrapperOptions['linkTarget'] : '_blank';
    $wrapperCustomUrl = isset($wrapperOptions['customUrl']) ? $wrapperOptions['customUrl'] : '';
    $wrapperLinkAttr = isset($wrapperOptions['linkAttr']) ? $wrapperOptions['linkAttr'] : [];
    $wrapperRel = isset($wrapperOptions['rel']) ? $wrapperOptions['rel'] : '';
    $wrapperLinkToMetaKey = isset($wrapperOptions['linkToMetaKey']) ? $wrapperOptions['linkToMetaKey'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    $linkUrl = '';
    if ($wrapperLinkTo == 'postUrl') {
      $linkUrl = get_permalink($post_ID);
    } else if ($wrapperLinkTo == 'customField') {
      $linkUrl = get_post_meta($post_ID, $wrapperLinkToMetaKey, true);
    } else if ($wrapperLinkTo == 'authorUrl') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_url;
    } else if ($wrapperLinkTo == 'authorLink') {
      $author_id = get_post_field('post_author', $post_ID);
      $linkUrl = get_author_posts_url($author_id);
    } else if ($wrapperLinkTo == 'homeUrl') {
      $linkUrl = get_bloginfo('url');
    } else if ($wrapperLinkTo == 'customUrl') {
      $linkUrl = $wrapperCustomUrl;
    }
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

    if (empty($wrapperTag)):
      echo wp_kses_post($content);
    endif;


    if (!empty($wrapperTag)):

      if ($wrapperTag == 'a') { ?>
        <a id="<?php echo esc_attr($wrapperID); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" target="<?php echo esc_attr($wrapperLinkTarget); ?>" rel="<?php echo esc_attr($wrapperRel); ?>" href="<?php echo esc_url($linkUrl); ?>">
          <?php echo wp_kses_post($content); ?>
        </a>
      <?php
      } else { ?>
        <<?php echo combo_blocks_tag_escape($wrapperTag); ?> id="<?php echo esc_attr($wrapperID); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
          <?php echo wp_kses_post($content) ?> </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
      }

    endif;




    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksInfoBox = new ComboBlocksInfoBox();
