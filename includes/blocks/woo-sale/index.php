<?php
if (!defined('ABSPATH'))
    exit();
class ComboBlocksWooSale
{
    function __construct()
    {
        add_action('init', array($this, 'register_scripts'));
    }
    // loading src files in the gutenberg editor screen
    function register_scripts()
    {
        register_block_type(
            combo_blocks_dir . 'build/blocks/woo-sale/block.json',
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
        $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
        $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
        $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
        $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
        $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
        $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
        $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
        $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : [];
        $sale = isset($attributes['sale']) ? $attributes['sale'] : [];
        $saleOptions = isset($sale['options']) ? $sale['options'] : [];
        $saleText = isset($saleOptions['text']) ? $saleOptions['text'] : [];
        $saleNoSale = isset($saleOptions['noSale']) ? $saleOptions['noSale'] : [];
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
        if ($iconLibrary == 'fontAwesome') {
            wp_enqueue_style('fontawesome-icons');
        } else if ($iconLibrary == 'iconFont') {
            wp_enqueue_style('icofont-icons');
        } else if ($iconLibrary == 'bootstrap') {
            wp_enqueue_style('bootstrap-icons');
        }
        $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
        $product_type = ($product != null) ? $product->get_type() : '';
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
                if ($product_type != 'variable') :
                    $onSale = ($product != null) ? $product->is_on_sale() : '';
                ?>
                    <span class='sale'>
                        <?php
                        if ($onSale) {
                            echo wp_kses_post($saleText);
                        } else {
                            echo wp_kses_post($saleNoSale);
                        }
                        ?>
                    </span>
                <?php
                endif;
                if ($product_type == 'variable') :
                    $onSale = ($product != null) ? $product->is_on_sale() : '';
                ?>
                    <span class='sale'>
                        <?php
                        if ($onSale) {
                            echo wp_kses_post($saleText);
                        } else {
                            echo wp_kses_post($saleNoSale);
                        }
                        ?>
                    </span>
                <?php
                endif;
                ?>
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
$ComboBlocksWooSale = new ComboBlocksWooSale();
