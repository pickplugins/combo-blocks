<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksWooAddToCart
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/woo-add-to-cart/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/woo-add-to-cart')) {
      ////wp_enqueue_script('combo_blocks_scripts');
    }
    global $comboBlocksCss;
    $post_ID = get_the_id();
    $post_url = get_the_permalink($post_ID);
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $cartBtn = isset($attributes['cartBtn']) ? $attributes['cartBtn'] : [];
    $cartBtnOptions = isset($cartBtn['options']) ? $cartBtn['options'] : [];
    $cartBtnRel = isset($cartBtnOptions['rel']) ? $cartBtnOptions['rel'] : '';
    $cartBtnText = isset($cartBtnOptions['text']) ? $cartBtnOptions['text'] : '';
    $cartBtnAjax = isset($cartBtnOptions['ajax']) ? $cartBtnOptions['ajax'] : true;
    $quantityWrap = isset($attributes['quantityWrap']) ? $attributes['quantityWrap'] : [];
    $quantityWrapOptions = isset($quantityWrap['options']) ? $quantityWrap['options'] : [];
    $quantityWrapEnable = isset($quantityWrapOptions['enable']) ? $quantityWrapOptions['enable'] : true;
    $quantityInput = isset($attributes['quantityInput']) ? $attributes['quantityInput'] : [];
    $quantityInputOptions = isset($quantityInput['options']) ? $quantityInput['options'] : [];
    $quantityInputQuantity = isset($quantityInputOptions['quantity']) ? $quantityInputOptions['quantity'] : 1;
    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
    $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
    $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';
    $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
    $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';
    $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
    $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';
    $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';
    $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    global $product;
    $productSku = ($product == null) ? '' : $product->get_sku();
    $productType = ($product == null) ? '' : $product->get_type();
    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    if ($productType == 'simple') {
      $cartUrl = ($cartBtnAjax) ? '?add-to-cart=' . esc_attr($post_ID) : '?add-to-cart=' . $post_ID . '&quantity=' . esc_attr($quantityInputQuantity);
    } else {
      $cartUrl = get_permalink($post_ID);
      $cartBtnText = __("View Product", 'combo-blocks');
    }
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    $prefixText = combo_blocks_parse_css_class($prefixText, $obj);
    $postfixText = combo_blocks_parse_css_class($postfixText, $obj);
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }
    // //* Visible condition
    ob_start();
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
                                              <?php echo esc_attr($blockId); ?>
                                              <?php echo esc_attr($wrapperClass); ?>">
        <?php if ($iconPosition == 'beforePrefix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($prefixText) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'afterPrefix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php
        if ($productType == 'simple') :
        ?>
          <?php if ($quantityWrapEnable) : ?>
            <div class='quantity-wrap' data-blockid="<?php echo esc_attr($blockId); ?>">
              <span class='quantity-decrease'>-</span>
              <input class='quantity-input' size="3" type="text" inputmode="numeric"
                value="<?php echo esc_attr($quantityInputQuantity); ?>" />
              <span class='quantity-increase'>+</span>
            </div>
          <?php endif; ?>
          <a class='<?php echo ($cartBtnAjax) ? 'ajax_add_to_cart' : ''; ?> cartBtn'
            data-quantity="<?php echo esc_attr($quantityInputQuantity); ?>" data-product_id="<?php echo esc_attr($post_ID); ?>"
            data-product_sku="<?php echo esc_attr($productSku); ?>" aria-label="<?php echo esc_attr($cartBtnRel); ?>"
            aria-describedby="<?php echo esc_attr($cartBtnRel); ?>" rel="<?php echo esc_attr($cartBtnRel); ?>"
            <?php if ($cartBtnAjax):
              //wp_enqueue_script("wc-add-to-cart");

            ?>
            <?php else: ?>
            href="<?php echo esc_attr($cartUrl); ?>"
            <?php endif; ?>>
            <?php if ($iconPosition == 'beforeCartText') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo wp_kses_post($cartBtnText); ?>
            <?php if ($iconPosition == 'afterCartText') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>
        <?php else : ?>
          <a class='cartBtn' aria-label="<?php echo esc_attr($cartBtnRel); ?>"
            aria-describedby="<?php echo esc_attr($cartBtnRel); ?>" rel="<?php echo esc_attr($cartBtnRel); ?>"
            href="<?php echo esc_attr($cartUrl); ?>">
            <?php if ($iconPosition == 'beforeCartText') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
            <?php echo wp_kses_post($cartBtnText); ?>
            <?php if ($iconPosition == 'afterCartText') : ?>
              <?php echo wp_kses_post($fontIconHtml); ?>
            <?php endif; ?>
          </a>
        <?php endif; ?>
        <?php if ($iconPosition == 'beforePostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo esc_attr($postfixText); ?>
          </span>
        <?php endif; ?>
        <?php if ($iconPosition == 'afterPostfix') : ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
    <?php
    endif;
    ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksWooAddToCart = new ComboBlocksWooAddToCart();
