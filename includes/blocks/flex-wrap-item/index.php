<?php
if (!defined('ABSPATH'))
  exit();



class ComboBlocksFlexWrapItem
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', combo_blocks_root_url . 'includes/blocks/layer/index.css');
    //wp_register_script('editor_script', combo_blocks_root_url . 'includes/blocks/layer/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      combo_blocks_root_dir . 'build/blocks/flex-wrap-item/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }

  function front_script($attributes) {}
  function front_style($attributes) {}

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {



    global $ComboBlocksCssY;


    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';


    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';


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



    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $ComboBlocksCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];



    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);


      if (!$isVisible) return;
    }

    // //* Visible condition



    ob_start();

    if ($wrapperTag == 'a') { ?>
      <a id="<?php echo esc_attr($wrapperID); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" target="<?php echo esc_attr($wrapperLinkTarget); ?>" rel="<?php echo esc_attr($wrapperRel); ?>" href="<?php echo esc_url($linkUrl); ?>">
        <?php echo wp_kses_post($content) ?>
      </a>
    <?php

    } else { ?>
      <<?php echo tag_escape(combo_blocks_tag_escape($wrapperTag)); ?> id="
              <?php echo esc_attr($wrapperID); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
        <?php echo wp_kses_post($content) ?>
      </<?php echo tag_escape(combo_blocks_tag_escape($wrapperTag)); ?>>
<?php
    }
    return ob_get_clean();
  }
}

$BlockPostGrid = new ComboBlocksFlexWrapItem();
