<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksMenuWrap
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/menu-wrap/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/menu-wrap')) {
      wp_enqueue_style('combo_blocks_styles');
      ////wp_enqueue_script('combo_blocks_scripts');
    }
    global $comboBlocksCss;
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $menuWrap = isset($attributes['menuWrap']) ? $attributes['menuWrap'] : [];
    $menuWrapOptions = isset($menuWrap['options']) ? $menuWrap['options'] : [];
    $menuWrapClass = isset($menuWrapOptions['class']) ? $menuWrapOptions['class'] : '';
    $subMenuWrap = isset($attributes['subMenuWrap']) ? $attributes['subMenuWrap'] : [];
    $subMenuWrapOptions = isset($subMenuWrap['options']) ? $subMenuWrap['options'] : [];
    $subMenuWrapClass = isset($subMenuWrapOptions['class']) ? $subMenuWrapOptions['class'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    $mobileMenuToggle = isset($attributes['mobileMenuToggle']) ? $attributes['mobileMenuToggle'] : [];
    $mobileMenuToggleOptions = isset($mobileMenuToggle['options']) ? $mobileMenuToggle['options'] : [];
    $mobileMenuToggleLibrary = isset($mobileMenuToggleOptions['library']) ? $mobileMenuToggleOptions['library'] : '';
    $mobileMenuToggleSrcType = isset($mobileMenuToggleOptions['srcType']) ? $mobileMenuToggleOptions['srcType'] : '';
    $mobileMenuToggleSrc = isset($mobileMenuToggleOptions['iconSrc']) ? $mobileMenuToggleOptions['iconSrc'] : '';
    $mobileMenuTogglePosition = isset($mobileMenuToggleOptions['position']) ? $mobileMenuToggleOptions['position'] : '';
    $mobileMenuToggleClass = isset($mobileMenuToggleOptions['class']) ? $mobileMenuToggleOptions['class'] : '';
    if ($mobileMenuToggleLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($mobileMenuToggleLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($mobileMenuToggleLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }
    $mobileMenuToggleHtml = '<span class=" ' . $mobileMenuToggleSrc . '"></span>';
    $mobileMenuClose = isset($attributes['mobileMenuClose']) ? $attributes['mobileMenuClose'] : [];
    $mobileMenuCloseOptions = isset($mobileMenuClose['options']) ? $mobileMenuClose['options'] : [];
    $mobileMenuCloseLibrary = isset($mobileMenuCloseOptions['library']) ? $mobileMenuCloseOptions['library'] : '';
    $mobileMenuCloseSrcType = isset($mobileMenuCloseOptions['srcType']) ? $mobileMenuCloseOptions['srcType'] : '';
    $mobileMenuCloseSrc = isset($mobileMenuCloseOptions['iconSrc']) ? $mobileMenuCloseOptions['iconSrc'] : '';
    $mobileMenuClosePosition = isset($mobileMenuCloseOptions['position']) ? $mobileMenuCloseOptions['position'] : '';
    $mobileMenuCloseClass = isset($mobileMenuCloseOptions['class']) ? $mobileMenuCloseOptions['class'] : '';
    if ($mobileMenuCloseLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($mobileMenuCloseLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($mobileMenuCloseLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }
    $mobileMenuCloseIconHtml = '<span class=" ' .  $mobileMenuCloseSrc . '"></span>';
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
      <nav>
        <ul class="<?php echo esc_attr($menuWrapClass); ?> pg-main-menu">
          <?php echo wp_kses_post($content) ?>
        </ul>
        <div class="mobile-menu-toggle">
          <?php echo wp_kses_post($mobileMenuToggleHtml); ?>
        </div>
      </nav>
      <div class="mobile-menu-wrap hidden">
        <div class="mobile-menu-close <?php echo esc_attr($mobileMenuCloseClass); ?>">
          <?php echo wp_kses_post($mobileMenuCloseIconHtml); ?>
        </div>
        <ul class="<?php echo esc_attr($menuWrapClass); ?>">
          <?php echo wp_kses_post($content) ?>
        </ul>
      </div>
    </div>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksMenuWrap = new ComboBlocksMenuWrap();
