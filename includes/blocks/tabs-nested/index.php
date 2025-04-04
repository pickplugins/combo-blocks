<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksTabs
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/tabs-nested/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    //wp_register_script('combo_blocks_scripts_tabs', combo_blocks_url . 'includes/blocks/tabs-nested/front-scripts.js', [], '', ['in_footer' => true, 'strategy' => 'defer']);
    if (has_block('combo-blocks/tabs-nested')) {
      ////wp_enqueue_script('combo_blocks_scripts');
      wp_enqueue_style('combo_blocks_styles');
    }
    global $comboBlocksCss;
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $wrapper = '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $activeTab = isset($attributes['activeTab']) ? $attributes['activeTab'] : 0;
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $tabs = isset($attributes['tabs']) ? $attributes['tabs'] : [];
    $tabsWrap = isset($attributes['tabsWrap']) ? $attributes['tabsWrap'] : [];
    $tabsWrapOptions = isset($tabsWrap['options']) ? $tabsWrap['options'] : [];
    $navsWrap = isset($attributes['navsWrap']) ? $attributes['navsWrap'] : [];
    $navsWrapOptions = isset($navsWrap['options']) ? $navsWrap['options'] : [];
    $navItem = isset($attributes['navItem']) ? $attributes['navItem'] : [];
    $navItemOptions = isset($navItem['options']) ? $navItem['options'] : [];
    $activeNavItem = isset($attributes['activeNavItem']) ? $attributes['activeNavItem'] : [];
    $activeNavItemOptions = isset($activeNavItem['options']) ? $activeNavItem['options'] : [];
    $labelCounter = isset($attributes['labelCounter']) ? $attributes['labelCounter'] : [];
    $labelCounterOptions = isset($labelCounter['options']) ? $labelCounter['options'] : [];
    $labelCounterEnable = isset($labelCounterOptions['enable']) ? $labelCounterOptions['enable'] : false;
    $navLabel = isset($attributes['navLabel']) ? $attributes['navLabel'] : [];
    $navLabelOptions = isset($navLabel['options']) ? $navLabel['options'] : [];
    $contentWrap = isset($attributes['contentWrap']) ? $attributes['contentWrap'] : [];
    $contentWrapOptions = isset($contentWrap['options']) ? $contentWrap['options'] : [];
    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
    $iconHtml = !empty($iconSrc) ? '<span class=" ' . $iconClass . ' ' . $iconSrc . '"></span>' : '';
    $iconToggle = isset($attributes['iconToggle']) ? $attributes['iconToggle'] : '';
    $iconToggleOptions = isset($iconToggle['options']) ? $iconToggle['options'] : [];
    $iconToggleLibrary = isset($iconToggleOptions['library']) ? $iconToggleOptions['library'] : '';
    $iconToggleSrcType = isset($iconToggleOptions['srcType']) ? $iconToggleOptions['srcType'] : '';
    $iconToggleSrc = isset($iconToggleOptions['iconSrc']) ? $iconToggleOptions['iconSrc'] : '';
    $iconTogglePosition = isset($iconToggleOptions['position']) ? $iconToggleOptions['position'] : '';
    $iconToggleClass = isset($iconToggleOptions['class']) ? $iconToggleOptions['class'] : '';
    $iconToggleHtml = !empty($iconToggleSrc) ? '<span class=" ' . $iconToggleClass . ' ' . $iconToggleSrc . '"></span>' : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $navsIndex = [];
    if (!empty($tabs))
      foreach ($tabs as $i => $tab) {
        $navsIndex[$i] = $tab["uid"];
      }
    $tabData = [
      "id" => $blockId,
      "activeTab" => $activeTab,
      "navsIndex" => $navsIndex,
    ];
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
    <div id="<?php echo esc_attr($blockId); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" data-pgTabs="<?php echo esc_attr(json_encode($tabData)); ?>">
      <div class="navs-wrapper" role="tablist">
        <?php
        foreach ($tabs as $index => $tab) {
          $uid = isset($tab['uid']) ? $tab['uid'] : '';
          $tablink = strtolower($tab['title']);
          $tablink = str_replace(" ", "-", $tablink);
        ?>
          <div id="<?php echo esc_attr($uid); ?>" data-tab-id="<?php echo esc_attr($uid); ?>" class="<?php echo ($uid == $activeTab) ? ' nav-item  ' : 'nav-item ' ?>" role="tab" tabIndex="<?php echo ($uid == $activeTab) ? '0' : '-1' ?>" aria-controls="tabs-<?php echo esc_attr($index); ?>" aria-selected="false" aria-expanded="false" index="<?php echo esc_attr($index); ?>">
            <?php if ($iconPosition == 'before') : ?>
              <?php echo wp_kses_post($iconHtml); ?>
              <?php echo wp_kses_post($iconToggleHtml); ?>
            <?php endif; ?>
            <a href="#<?php echo  esc_attr($tablink) ?>" class="nav-label" index="<?php echo esc_attr($index); ?>">
              <?php if ($labelCounterEnable): ?>
                <span class="label-counter"><?php echo esc_html($index + 1); ?></span>
              <?php endif; ?>
              <?php echo isset($tab['title']) ? wp_kses_post($tab['title']) : ""; ?>
            </a>
            <?php if ($iconPosition == 'after') : ?>
              <div class='nav-icon'>
                <?php echo wp_kses_post($iconHtml); ?>
              </div>
            <?php endif; ?>
          </div>
        <?php
        }
        ?>
      </div>
      <div class='panels-wrap'>
        <?php echo ($content); ?>
      </div>
      <div class="progress">
        <div class="progress-fill"></div>
      </div>
    </div>
    <?php
    ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksTabs = new ComboBlocksTabs();
