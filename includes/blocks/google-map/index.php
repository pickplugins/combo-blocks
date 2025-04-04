<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksGoogleMap
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/google-map/block.json',
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
    $wrapperID = isset($wrapperOptions['id']) ? $wrapperOptions['id'] : '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $layers = isset($attributes['layers']) ? $attributes['layers'] : [];
    $mapSettings = isset($attributes['mapSettings']) ? $attributes['mapSettings'] : [];
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
    //$content = isset($textOptions['content']) ? $textOptions['content'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }


    if (has_block('combo-blocks/google-map')) {
      ////wp_enqueue_script('combo_blocks_scripts');

      wp_register_script('combo_blocks_google_map',  'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsboSnlb7yu3mhMy8KEVqM7HupBN8DstE', [], '', ['in_footer' => false, 'strategy' => 'defer']);


      wp_enqueue_script('combo_blocks_google_map');
    }



    // //* Visible condition
    ob_start();
?>
    <div id="<?php echo esc_attr($wrapperID);
              ?> " data-map-layers="<?php echo esc_attr(json_encode($layers)) ?>" data-map-settings="<?php echo esc_attr(json_encode($mapSettings)) ?>" data-g-map="" class="
                    <?php echo esc_attr($wrapperClass); ?>
                    <?php echo esc_attr($blockId); ?>
                    <?php echo esc_attr($blockAlign); ?>">
      <div id="map"></div>

    </div>
    <style>
      #map {
        height: 400px;
        /* Set map height to fill the container */
        width: 900px
      }
    </style>
<?php

    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksGoogleMap = new ComboBlocksGoogleMap();
