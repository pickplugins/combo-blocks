<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksPostText
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    // 
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/text/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/text')) {
      ////wp_enqueue_script('combo_blocks_scripts');
    }
    // global $wp_query;
    // $taxterm = get_queried_object();
    global $comboBlocksCss;
    if (has_block('combo-blocks/text')) {
      $other = isset($attributes['other']) ? $attributes['other'] : [];
      $otherOptions = isset($other['options']) ? $other['options'] : [];
      $otherCopyObj = isset($otherOptions['copyObj']) ? $otherOptions['copyObj'] : false;
      $otherCopyContent = isset($otherOptions['copyContent']) ? $otherOptions['copyContent'] : "";
      if ($otherCopyObj) {
        wp_enqueue_style('combo_blocks_styles');
      }
    }
    $text = '';
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : get_the_ID();
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $other = isset($attributes['other']) ? $attributes['other'] : [];
    $otherOptions = isset($other['options']) ? $other['options'] : [];
    $otherCopyObj = isset($otherOptions['copyObj']) ? $otherOptions['copyObj'] : false;
    $otherCopyContent = isset($otherOptions['copyContent']) ? $otherOptions['copyContent'] : "";
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    $rules = isset($visible['rules']) ? $visible['rules'] : [];
    $animateOn = isset($attributes['animateOn']) ? $attributes['animateOn'] : [];
    $animateRules = isset($animateOn['rules']) ? $animateOn['rules'] : [];
    $tooltip = isset($attributes['tooltip']) ? $attributes['tooltip'] : [];
    $tooltipRules = isset($tooltip['rules']) ? $tooltip['rules'] : [];
    $tilt = isset($attributes['tilt']) ? $attributes['tilt'] : [];
    $tiltRules = isset($tilt['rules']) ? $tilt['rules'] : [];
    $typingText = isset($attributes['typingText']) ? $attributes['typingText'] : [];
    $typingTextRules = isset($typingText['rules']) ? $typingText['rules'] : [];

    $wrapper = isset($attributes["wrapper"]) ? $attributes["wrapper"] : [];
    $wrapperOptions = isset($wrapper["options"]) ? $wrapper["options"] : [];
    $wrapperClass = isset($wrapperOptions["class"])
      ? $wrapperOptions["class"]
      : "";
    $wrapperTag = isset($wrapperOptions["tag"])
      ? $wrapperOptions["tag"]
      : "div";

    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];
    $textClass = isset($textOptions['class']) ? $textOptions['class'] : '';
    $textId = !empty($textOptions['id']) ? $textOptions['id'] : $blockId;
    $textTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
    $content = isset($textOptions['content']) ? $textOptions['content'] : '';
    $limitBy = isset($textOptions['limitBy']) ? $textOptions['limitBy'] : '';
    $limitCount = !empty($textOptions['limitCount']) ? $textOptions['limitCount'] : 999;

    $prefix = isset($attributes["prefix"]) ? $attributes["prefix"] : "";
    $prefixOptions = isset($prefix["options"]) ? $prefix["options"] : "";
    $prefixText = isset($prefixOptions["text"])
      ? _wp_specialchars($prefixOptions["text"])
      : "";
    $prefixClass = isset($prefixOptions["class"])
      ? $prefixOptions["class"]
      : "";
    $prefixPosition = isset($prefixOptions["position"])
      ? $prefixOptions["position"]
      : "";
    $postfix = isset($attributes["postfix"]) ? $attributes["postfix"] : "";
    $postfixOptions = isset($postfix["options"]) ? $postfix["options"] : "";
    $postfixText = isset($postfixOptions["text"])
      ? _wp_specialchars($postfixOptions["text"])
      : "";
    $postfixClass = isset($postfixOptions["class"])
      ? $postfixOptions["class"]
      : "";
    $postfixPosition = isset($postfixOptions["position"])
      ? $postfixOptions["position"]
      : "";
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    if (!empty($animateRules)) {
      wp_enqueue_style('pgpopup_animate');
    }
    if (!empty($tooltipRules)) {
      wp_enqueue_script('popper.min');
      wp_enqueue_script('tippy-bundle.min');
    }
    if (!empty($tiltRules)) {
      wp_enqueue_script('vanilla-tilt.min');
    }
    if (!empty($typingTextRules)) {
      wp_enqueue_script('typed.umd');
    }


    if ($limitBy == 'character') {
      $content = wp_strip_all_tags($content);
      $content = substr($content, 0, (int) $limitCount);
    } elseif ($limitBy == 'word') {
      $content = wp_trim_words($content, (int) $limitCount, '');
    }
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $textClass = combo_blocks_parse_css_class($textClass, $obj);
    $content = combo_blocks_parse_css_class($content, $obj);

    $prefixText = combo_blocks_parse_css_class($prefixText, $obj);
    $postfixText = combo_blocks_parse_css_class($postfixText, $obj);
    //$textClass = combo_blocks_parse_css_class($textClass, $obj);
    // //* Visible condition
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }
    // //* Visible condition
    ob_start();
    if (empty($wrapperTag)) :
      echo wp_kses_post($content);
    endif;
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?>
        class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>" id="<?php echo esc_attr($textId); ?>"
        <?php if (!empty($animateRules)): ?> data-animateOn="<?php echo esc_attr(json_encode($animateRules)) ?>"
        <?php endif; ?> <?php if (!empty($tooltipRules)): ?> data-tooltip="<?php echo esc_attr(json_encode($tooltipRules)) ?>"
        <?php endif; ?> <?php if (!empty($tiltRules)): ?> data-tilt="<?php echo esc_attr(json_encode($tiltRules)) ?>"
        <?php endif; ?> <?php if (!empty($typingTextRules)): ?>
        data-typed="<?php echo esc_attr(json_encode($typingTextRules)) ?>" <?php endif; ?> <?php if ($otherCopyObj) : ?>
        clickToCopy="<?php echo esc_attr($otherCopyObj); ?>" data-copyContent="<?php echo esc_attr($otherCopyContent); ?>"
        <?php endif; ?>>
        <?php if (!empty($prefixText)) : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>
        <<?php echo combo_blocks_tag_escape($textTag) ?> class="<?php echo esc_attr($textClass); ?>">
          <?php echo wp_kses_post($content); ?>
        </<?php echo combo_blocks_tag_escape($textTag); ?>>
        <?php if (!empty($postfixText)) : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
    endif;
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksPostText = new ComboBlocksPostText();
