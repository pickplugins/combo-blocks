<?php
if (!defined('ABSPATH'))
  exit();



class ComboBlocksLayer
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
      combo_blocks_root_dir . 'build/blocks/layer/block.json',
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
    $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
    //$content = isset($textOptions['content']) ? $textOptions['content'] : '';



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
      <a class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" href="" target="">
        <?php echo wp_kses_post($content) ?>
      </a>
    <?php

    } else { ?>
      <<?php echo tag_escape(combo_blocks_tag_escape($wrapperTag)); ?> class="
                    <?php echo esc_attr($wrapperClass); ?>
                    <?php echo esc_attr($blockId); ?>
                    <?php echo esc_attr($blockAlign); ?>">
        <?php echo wp_kses_post($content) ?>
      </<?php echo tag_escape(combo_blocks_tag_escape($wrapperTag)); ?>>
<?php
    }

    return ob_get_clean();
  }
}

$BlockPostGrid = new ComboBlocksLayer();
