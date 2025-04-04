<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksFormFieldRecaptcha
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/form-field-recaptcha/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/form-field-recaptcha')) {
      $combo_blocks_settings = get_option('combo_blocks_settings');
      $apiKeys = isset($combo_blocks_settings['apiKeys']) ? $combo_blocks_settings['apiKeys'] : [];
      $recaptcha = isset($apiKeys['recaptcha']['args']) ? $apiKeys['recaptcha']['args'] : [];
      $site_key = isset($recaptcha['site_key']) ? $recaptcha['site_key'] : "";
      $secret_key = isset($recaptcha['secret_key']) ? $recaptcha['secret_key'] : "";
      $version = isset($recaptcha['version']) ? $recaptcha['version'] : "v2Checkbox";
      if ($version == 'v3') {
        if (!empty($site_key)) {
          wp_register_script('google-recaptcha', 'https://www.google.com/recaptcha/api.js?render=' . $site_key . '&ver=3.0');
        }
      } else {
        if (!empty($site_key)) {
          wp_register_script('google-recaptcha', 'https://www.google.com/recaptcha/api.js');
        }
      }
      wp_enqueue_script('google-recaptcha');
    }
    global $comboBlocksCss;
    $combo_blocks_settings = get_option('combo_blocks_settings');
    $apiKeys = isset($combo_blocks_settings['apiKeys']) ? $combo_blocks_settings['apiKeys'] : [];
    $recaptcha = isset($apiKeys['recaptcha']['args']) ? $apiKeys['recaptcha']['args'] : [];
    $site_key = isset($recaptcha['site_key']) ? $recaptcha['site_key'] : "";
    $secret_key = isset($recaptcha['secret_key']) ? $recaptcha['secret_key'] : "";
    $version = isset($recaptcha['version']) ? $recaptcha['version'] : "v2Checkbox";
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
        <?php
        if ($version == 'v3') :
        ?>
          <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
          <input type="hidden" name="action" value="validate_captcha">
          <script>
            grecaptcha.ready(function() {
              // do request for recaptcha token
              // response is promise with passed token
              grecaptcha.execute('<?php echo esc_attr($site_key); ?>', {
                  action: 'validate_captcha'
                })
                .then(function(token) {
                  // add token value to form
                  document.getElementById('g-recaptcha-response').value = token;
                });
            });
          </script>
        <?php
        endif;
        if ($version == 'v2Checkbox') :
        ?>
          <div class="g-recaptcha" data-sitekey="<?php echo esc_attr($site_key); ?>"></div>
        <?php
        endif;
        if ($version == 'v2Invisible') :
        ?>
          <div class="g-recaptcha" data-sitekey="<?php echo esc_attr($site_key); ?>" data-size="invisible"></div>
        <?php
        endif;
        ?>
      </div>
    </div>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksFormFieldRecaptcha = new ComboBlocksFormFieldRecaptcha();
