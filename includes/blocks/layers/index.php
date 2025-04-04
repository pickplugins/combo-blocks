<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksLayers
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/layers/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    global $comboBlocksCss;

    //var_dump("Hello");

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $conditions = isset($attributes['conditions']) ? $attributes['conditions'] : [];
    $conditionsRules = isset($conditions['rules']) ? $conditions['rules'] : [];
    $animateOn = isset($attributes['animateOn']) ? $attributes['animateOn'] : [];
    $animateRules = isset($animateOn['rules']) ? $animateOn['rules'] : [];
    $tilt = isset($attributes['tilt']) ? $attributes['tilt'] : [];
    $tiltRules = isset($tilt['rules']) ? $tilt['rules'] : [];
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

    if (!empty($animateRules)) {
      wp_enqueue_style('pgpopup_animate');
    }

    if (!empty($tiltRules)) {
      wp_enqueue_script('vanilla-tilt.min');
    }

    // //* Visible condition
    ob_start();
    if ($wrapperTag == 'a') { ?>
      <a id="<?php echo esc_attr($blockId); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" target="<?php echo esc_attr($wrapperLinkTarget); ?>" rel="<?php echo esc_attr($wrapperRel); ?>" href="<?php echo esc_url($linkUrl); ?>">
        <?php echo ($content) ?>
      </a>
    <?php
    } else { ?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> id="<?php echo esc_attr($blockId); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>"
        <?php if (!empty($conditionsRules)): ?>
        data-conditions="<?php echo esc_attr(json_encode($conditionsRules)); ?>" <?php endif; ?>
        <?php if (!empty($animateRules)): ?> data-animateOn="<?php echo esc_attr(json_encode($animateRules)) ?>" <?php endif; ?>
        <?php if (!empty($tiltRules)): ?> data-tilt="<?php echo esc_attr(json_encode($tiltRules)) ?>" <?php endif; ?>>
        <?php echo ($content) ?> </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
    }
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksLayers = new ComboBlocksLayers();
