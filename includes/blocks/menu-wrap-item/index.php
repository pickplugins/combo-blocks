<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksMenuWrapItem
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/menu-wrap-item/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    global $comboBlocksCss;
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_ID = !empty($post_ID) ? $post_ID : get_the_ID();
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $isMainMenuItem = isset($wrapperOptions['isMainMenuItem']) ? $wrapperOptions['isMainMenuItem'] : 0;


    $menuWrap = isset($attributes['menuWrap']) ? $attributes['menuWrap'] : [];
    $subMenuWrap = isset($attributes['subMenuWrap']) ? $attributes['subMenuWrap'] : [];
    $subMenuWrapOptions = isset($subMenuWrap['options']) ? $subMenuWrap['options'] : [];
    $subMenuWrapClass = isset($subMenuWrapOptions['class']) ? $subMenuWrapOptions['class'] : '';
    $icon = isset($attributes['icon']) ? $attributes['icon'] : [];
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
    $link = isset($attributes['link']) ? $attributes['link'] : [];
    $linkOptions = isset($link['options']) ? $link['options'] : [];
    $linkClass = isset($linkOptions['class']) ? $linkOptions['class'] : '';
    $linktext = isset($linkOptions['text']) ? $linkOptions['text'] : '';
    $linkurl = isset($linkOptions['url']) ? $linkOptions['url'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
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
    <li class="<?php echo esc_attr($wrapperClass);
                ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>
<?php echo ($isMainMenuItem) ? "pg-main-menu-item" : ""; ?>

">
      <?php if (!empty($linktext)) : ?>
        <?php if ($iconPosition == 'beforeLink') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <a class="<?php echo esc_attr($linkClass); ?>" href="<?php echo esc_url($linkurl); ?>">
          <?php if ($iconPosition == 'beforeLabel') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <span><?php echo esc_html($linktext) ?></span>
          <?php if ($iconPosition == 'afterLabel') : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php if (!empty($content)) : ?>
            <span class="has-child-menu">↓</span>
          <?php endif; ?>
        </a>
        <?php if ($iconPosition == 'afterLink') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
      <?php endif; ?>
      <?php if (!empty($content)) : ?>
        <ul class="<?php echo esc_attr($subMenuWrapClass); ?> ">
          <?php echo wp_kses_post($content) ?>
        </ul>
      <?php endif; ?>
    </li>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksMenuWrapItem = new ComboBlocksMenuWrapItem();
