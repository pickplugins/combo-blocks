<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksFormFieldTextarea
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/form-field-textarea/block.json',
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
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $labelWrap = isset($attributes['labelWrap']) ? $attributes['labelWrap'] : [];
    $labelWrapOptions = isset($labelWrap['options']) ? $labelWrap['options'] : [];
    $input = isset($attributes['input']) ? $attributes['input'] : [];
    $inputOptions = isset($input['options']) ? $input['options'] : [];
    $inputType = isset($inputOptions['type']) ? $inputOptions['type'] : 'text';
    $inputPlaceholder = isset($inputOptions['placeholder']) ? $inputOptions['placeholder'] : '';
    $inputValue = isset($inputOptions['value']) ? $inputOptions['value'] : '';
    $inputName = !empty($inputOptions['name']) ? $inputOptions['name'] : $blockId;
    $inputRequired = isset($inputOptions['required']) ? $inputOptions['required'] : false;
    $inputDisabled = isset($inputOptions['disabled']) ? $inputOptions['disabled'] : false;
    $inputReadonly = isset($inputOptions['readonly']) ? $inputOptions['readonly'] : false;
    $inputReadonly = isset($inputOptions['readonly']) ? $inputOptions['readonly'] : false;
    $inputAutocomplete = isset($inputOptions['autocomplete']) ? $inputOptions['autocomplete'] : false;
    $inputSpellcheck = isset($inputOptions['spellcheck']) ? $inputOptions['spellcheck'] : false;
    $inputAutocorrect = isset($inputOptions['autocorrect']) ? $inputOptions['autocorrect'] : false;
    $inputObjMap = isset($inputOptions['objMap']) ? $inputOptions['objMap'] : "";
    $inputMinLength = isset($inputOptions['minLength']) ? $inputOptions['minLength'] : null;
    $inputMaxLength = isset($inputOptions['maxLength']) ? $inputOptions['maxLength'] : null;
    $inputCols = isset($inputOptions['cols']) ? $inputOptions['cols'] : null;
    $inputRows = isset($inputOptions['rows']) ? $inputOptions['rows'] : null;
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
    $inputName = combo_blocks_form_wrap_input_name($inputOptions, ["blockId" => $blockId]);
    $inputValue = combo_blocks_form_wrap_input_default_value($inputOptions, ["post_ID" => $post_ID, "blockId" => $blockId]);
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    ob_start();
?>
    <div class="<?php echo esc_attr($blockId); ?> <?php echo esc_attr($wrapperClass); ?>" id="<?php echo esc_attr($blockId); ?>">
      <div class='label-wrap'>
        <?php if ($labelEnable) : ?>
          <label for="" class="font-medium text-slate-900 "><?php echo wp_kses_post($labelText); ?></label>
        <?php endif; ?>
        <?php if ($errorWrapPosition == 'afterlabel') : ?>
          <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>
        <?php endif; ?>
      </div>
      <div class='input-wrap'>
        <textarea type="<?php echo esc_attr($inputType); ?>" placeholder="<?php echo esc_attr($inputPlaceholder); ?>" value="" name="<?php echo esc_attr($inputName); ?>" <?php if ($inputRequired) : ?> required <?php endif; ?> <?php if ($inputDisabled) : ?> disabled <?php endif; ?> <?php if ($inputReadonly) : ?> readonly <?php endif; ?> <?php if ($inputAutocomplete) : ?> autocomplete="on" <?php endif; ?> <?php if (!$inputAutocomplete) : ?> autocomplete="off" <?php endif; ?> <?php if ($inputAutocorrect) : ?> autocorrect="on" <?php endif; ?> <?php if (!$inputAutocorrect) : ?> autocorrect="off" <?php endif; ?> <?php if ($inputCols) : ?> cols="<?php echo esc_attr($inputCols); ?>" <?php endif; ?> <?php if ($inputRows) : ?> rows="<?php echo esc_attr($inputRows); ?>" <?php endif; ?> <?php if ($inputMinLength) : ?> minLength="<?php echo esc_attr($inputMinLength); ?>" <?php endif; ?> <?php if ($inputMaxLength) : ?> maxLength="<?php echo esc_attr($inputMaxLength); ?>" <?php endif; ?>><?php echo esc_textarea($inputValue); ?></textarea>
        <?php if ($errorWrapPosition == 'afterInput') : ?>
          <div class='error-wrap'><?php echo wp_kses_post($errorWrapText); ?></div>
        <?php endif; ?>
      </div>
    </div>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksFormFieldTextarea = new ComboBlocksFormFieldTextarea();
