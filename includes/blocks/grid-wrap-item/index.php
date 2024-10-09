<?php
if (!defined('ABSPATH'))
  exit();



class ComboBlocksGridWrapItem
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
      combo_blocks_root_dir . 'build/blocks/grid-wrap-item/block.json',
      array(
        //'editor_script' => 'editor_script',
        //'editor_style' => 'editor_style',
        //'script' => 'front_script',

        //'style' => 'front_style',
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



    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $ComboBlocksCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





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

?>
    <div class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
      <?php echo wp_kses_post($content) ?>
    </div>
<?php
    return ob_get_clean();
  }
}

$BlockPostGrid = new ComboBlocksGridWrapItem();
