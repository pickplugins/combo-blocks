<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksFormFieldCheckbox
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/form-field-checkbox/block.json',
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
    $text = '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $conditions = isset($attributes['conditions']) ? $attributes['conditions'] : [];
    $conditionsRules = isset($conditions['rules']) ? $conditions['rules'] : [];
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $labelWrap = isset($attributes['labelWrap']) ? $attributes['labelWrap'] : [];
    $labelWrapOptions = isset($labelWrap['options']) ? $labelWrap['options'] : [];
    $input = isset($attributes['input']) ? $attributes['input'] : [];
    $inputOptions = isset($input['options']) ? $input['options'] : [];
    $inputType = isset($inputOptions['type']) ? $inputOptions['type'] : 'text';
    $inputPlaceholder = isset($inputOptions['placeholder']) ? $inputOptions['placeholder'] : '';
    $inputValue = isset($inputOptions['value']) ? $inputOptions['value'] : [];
    $inputName = !empty($inputOptions['name']) ? $inputOptions['name'] : $blockId;
    $inputRequired = isset($inputOptions['required']) ? $inputOptions['required'] : false;
    $inputDisabled = isset($inputOptions['disabled']) ? $inputOptions['disabled'] : false;
    $inputReadonly = isset($inputOptions['readonly']) ? $inputOptions['readonly'] : false;
    $inputlabelSrc = isset($inputOptions['labelSrc']) ? $inputOptions['labelSrc'] : "";

    $inputObjMap = isset($inputOptions['objMap']) ? $inputOptions['objMap'] : "";
    $inputArgs = isset($inputOptions['args']) ? $inputOptions['args'] : [];
    $inputargsSrc = isset($inputOptions['argsSrc']) ? $inputOptions['argsSrc'] : [];
    $argsSrc = isset($inputargsSrc['src']) ? $inputargsSrc['src'] : "";
    $argsSrcPrams = isset($inputargsSrc['srcPrams']) ? $inputargsSrc['srcPrams'] : [];
    //comment
    $inputWrap = isset($attributes['inputWrap']) ? $attributes['inputWrap'] : [];
    $inputWrapOptions = isset($inputWrap['options']) ? $inputWrap['options'] : [];
    $label = isset($attributes['label']) ? $attributes['label'] : [];
    $labelOptions = isset($label['options']) ? $label['options'] : [];
    $labelEnable = isset($labelOptions['enable']) ? $labelOptions['enable'] : true;
    $labelText = isset($labelOptions['text']) ? $labelOptions['text'] : '';
    $errorWrap = isset($attributes['errorWrap']) ? $attributes['errorWrap'] : [];
    $errorWrapOptions = isset($errorWrap['options']) ? $errorWrap['options'] : [];
    $errorWrapPosition = isset($errorWrapOptions['position']) ? $errorWrapOptions['position'] : '';
    $errorWrapText = isset($errorWrapOptions['text']) ? $errorWrapOptions['text'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    if (!empty($argsSrc)) {
      $inputArgs = combo_blocks_generate_input_prams($inputargsSrc);
    }
    $inputName = combo_blocks_form_wrap_input_name($inputOptions, ["blockId" => $blockId]);
    $inputValue = combo_blocks_form_wrap_input_default_value($inputOptions, ["post_ID" => $post_ID, "blockId" => $blockId]);
    $inputValue = is_array($inputValue) ? $inputValue : [$inputValue];
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    ob_start();
?>
    <div class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>" <?php if (!empty($conditionsRules)): ?>
      data-conditions="<?php echo esc_attr(json_encode($conditionsRules)); ?>"
      <?php endif; ?>>
      <div class='label-wrap'>
        <?php if ($labelEnable) : ?>
          <label for="" class="font-medium text-slate-900 ">
            <?php echo wp_kses_post($labelText); ?>
          </label>
        <?php endif; ?>
        <?php if ($errorWrapPosition == 'afterlabel') : ?>
          <div class='error-wrap'>
            <?php echo wp_kses_post($errorWrapText); ?>
          </div>
        <?php endif; ?>
      </div>
      <div class='input-wrap'>
        <?php
        if (!empty($inputArgs)) :
          foreach ($inputArgs as $index => $inputArg) :

            $img = isset($inputArg['img']) ? $inputArg['img'] : [];
            $imgSrc = isset($img['src']) ? $img['src'] : "";
            $imgAlt = isset($img['alt']) ? $img['alt'] : "";
        ?>
            <div class='item'>
              <input id="<?php echo esc_attr($blockId . '-' . $index) ?>" class="<?php echo !empty($inputlabelSrc) ? "hidden" : ""; ?>" type="checkbox" placeholder="<?php echo esc_attr($inputPlaceholder); ?>" value="<?php echo esc_attr($inputArg['value']); ?>" name="<?php echo esc_attr($inputName); ?>" <?php if ($inputRequired) : ?> required <?php endif; ?> <?php if ($inputDisabled) : ?> disabled <?php endif; ?> <?php if ($inputReadonly) : ?> readonly <?php endif; ?> <?php if (in_array($inputArg['value'], $inputValue)) : ?> checked <?php endif; ?> />
              <label for="<?php echo esc_attr($blockId . '-' . $index) ?>">
                <?php
                if ($inputlabelSrc == 'img'):

                ?>
                  <img src="<?php echo esc_url($imgSrc); ?>" alt="<?php echo esc_attr($imgAlt); ?>">
                <?php

                elseif ($inputlabelSrc == 'icon'):
                else:
                  echo isset($inputArg['label']) ? wp_kses_post($inputArg['label']) : "";
                endif;


                ?>
              </label>
            </div>
        <?php
          endforeach;
        endif;
        ?>
        <?php if ($errorWrapPosition == 'afterInput') : ?>
          <div class='error-wrap'>
            <?php echo wp_kses_post($errorWrapText); ?>
          </div>
        <?php endif; ?>
      </div>
    </div>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksFormFieldCheckbox = new ComboBlocksFormFieldCheckbox();
