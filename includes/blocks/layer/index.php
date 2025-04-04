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
    register_block_type(
      combo_blocks_dir . 'build/blocks/layer/block.json',
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
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
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
    // //* Visible condition
    ob_start();
    if ($wrapperTag == 'a') { ?>
      <a id="<?php echo esc_attr($wrapperID); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" href="" target="">
        <?php echo ($content) ?>
      </a>
    <?php
    } else { ?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> id="<?php echo esc_attr($wrapperID); ?>" class="
                    <?php echo esc_attr($wrapperClass); ?>
                    <?php echo esc_attr($blockId); ?>
                    <?php echo esc_attr($blockAlign); ?>">
        <?php echo ($content) ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
    }
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksLayer = new ComboBlocksLayer();
