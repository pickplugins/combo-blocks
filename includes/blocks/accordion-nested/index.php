<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksAccordionNested
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/accordion-nested/block.json',
      array(
        'title' => 'Accordion',
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/accordion-nested')) {
      ////wp_enqueue_script('combo_blocks_scripts');
    }





    global $comboBlocksCss;
    global $comboBlocksLdJson;
    // $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    // $post_url = get_the_permalink($post_ID);
    // $the_post = get_post($post_ID);
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $schema = isset($attributes['schema']) ? $attributes['schema'] : [];
    $schemaOptions = isset($schema['options']) ? $schema['options'] : [];
    $schemaEnable = isset($schemaOptions['enable']) ? $schemaOptions['enable'] : true;
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $textOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $accOptions = isset($attributes['accOptions']) ? $attributes['accOptions'] : [];
    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
    //$content = isset($textOptions['content']) ? $textOptions['content'] : '';
    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }
    $json = [];
    $i = 0;
    $json['@context'] = "https://schema.org";
    $json['@type'] = "FAQPage";
    foreach ($block->parsed_block['innerBlocks'] as $block) {
      $json['mainEntity'][$i]['@type'] = "Question";
      $json['mainEntity'][$i]['@id'] = isset($block['attrs']['blockId']) ? "#" . $block['attrs']['blockId'] : '';
      $json['mainEntity'][$i]['name'] = isset($block['attrs']['headerLabel']['options']['text']) ? _wp_specialchars($block['attrs']['headerLabel']['options']['text'], ENT_QUOTES)  : '';
      $json['mainEntity'][$i]['acceptedAnswer']['@type'] = "Answer";
      $json['mainEntity'][$i]['acceptedAnswer']['text'] = _wp_specialchars(render_block($block), ENT_QUOTES);
      $i++;
    }
    if ($schemaEnable) {
      $comboBlocksLdJson[$blockId] = $json;
    }
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }
    // //* Visible condition
    $accordionData = [
      "id" => $blockId,
      "activeIndex" => 999,
    ];
    ob_start();
?>
    <div id="<?php echo esc_attr($blockId); ?>" class="pg-accordion-nested <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>" data-pgaccordion="<?php echo esc_attr(json_encode($accordionData)) ?>" role="tablist">
      <?php echo wp_kses_post($content); ?>
    </div>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksAccordionNested = new ComboBlocksAccordionNested();
