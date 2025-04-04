<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksPostTableOfContents
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      'combo-blocks/table-of-contents',
      array(
        //'editor_script' => 'editor_script',
        //'editor_style' => 'editor_style',
        //'script' => 'front_script',
        'uses_context' => ["postId", "loopIndex", "postType", "queryId"],
        //'style' => 'front_style',
        'render_callback' => array($this, 'theHTML'),
        'attributes' => [
          "text" => [
            "type" => "object",
            "default" => [
              "options" => [
                "content" => "",
                "tag" => "div",
                "class" => "pg-text"
              ],
              "styles" => [
                "color" => [],
                "padding" => [],
                "margin" => [],
                "display" => [],
                "fontSize" => [],
                "lineHeight" => [],
                "letterSpacing" => [],

                "fontWeight" => [],
                "textDecoration" => [],
                "textTransform" => []
              ]
            ]
          ],
          "blockId" => [
            "type" => "string",
            "default" => ""
          ],
          "blockCssY" => [
            "type" => "object",
            "default" => [
              "items" => []
            ]
          ]
        ]
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
    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $text = isset($attributes['text']) ? $attributes['text'] : [];
    $textOptions = isset($text['options']) ? $text['options'] : [];
    $wrapperTag = isset($textOptions['tag']) ? $textOptions['tag'] : 'div';
    $content = isset($textOptions['content']) ? $textOptions['content'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    ob_start();
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
              <?php echo esc_attr($blockId); ?>">
        <?php echo wp_kses_post($content); ?>
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
$ComboBlocksPostTableOfContents = new ComboBlocksPostTableOfContents();
