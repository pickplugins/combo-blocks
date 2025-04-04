<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksPostAuthor
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/post-author/block.json',
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
    $post_data = get_post($post_ID);
    $post_url = get_the_permalink($post_ID);
    $post_author_id = isset($post_data->post_author) ? $post_data->post_author : '';
    //$author_data = get_user_by('ID', $post_author_id);
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $elements = isset($attributes['elements']) ? $attributes['elements'] : [];
    $elementsItems = isset($elements['items']) ? $elements['items'] : [];
    $name = isset($attributes['name']) ? $attributes['name'] : [];
    $nameOptions = isset($name['options']) ? $name['options'] : [];
    $nameClass = isset($nameOptions['class']) ? $nameOptions['class'] : '';
    $namePrefix = isset($nameOptions['prefix']) ? $nameOptions['prefix'] : '';
    $namePostfix = isset($nameOptions['postfix']) ? $nameOptions['postfix'] : '';
    $nameLinkTo = isset($nameOptions['linkTo']) ? $nameOptions['linkTo'] : '';
    $nameLinkToMeta = isset($nameOptions['linkToMeta']) ? $nameOptions['linkToMeta'] : '';
    $nameCustomUrl = isset($nameOptions['customUrl']) ? $nameOptions['customUrl'] : '';
    $description = isset($attributes['description']) ? $attributes['description'] : [];
    $descriptionOptions = isset($description['options']) ? $description['options'] : [];
    $descriptionClass = isset($descriptionOptions['class']) ? $descriptionOptions['class'] : 'description';
    $descriptionPrefix = isset($descriptionOptions['prefix']) ? $descriptionOptions['prefix'] : '';
    $descriptionPostfix = isset($descriptionOptions['postfix']) ? $descriptionOptions['postfix'] : '';
    $avatar = isset($attributes['avatar']) ? $attributes['avatar'] : [];
    $avatarOptions = isset($avatar['options']) ? $avatar['options'] : [];
    $avatarSize = isset($avatarOptions['size']) ? $avatarOptions['size'] : '48';
    $avatarDefault = isset($avatarOptions['default']) ? $avatarOptions['default'] : '';
    $avatarClass = isset($avatarOptions['class']) ? $avatarOptions['class'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    //
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    // $nameLink = '';
    // if ($nameLinkTo == 'postUrl') {
    //   $nameLink = get_permalink($post_ID);
    // } else if ($nameLinkTo == 'authorUrl') {
    //   $user = get_user_by('ID', $post_author_id);
    //   $nameLink = $user->user_url;
    // } else if ($nameLinkTo == 'authorLink') {
    //   $nameLink = get_author_posts_url($post_author_id);
    // } else if ($nameLinkTo == 'customUrl') {
    //   $nameLink = $nameCustomUrl;
    // } else if ($nameLinkTo == 'authorMeta') {
    //   $nameLink = !empty($nameLinkToMeta) ? get_user_meta($post_author_id, $nameLinkToMeta, true) : '';
    // } else if ($nameLinkTo == 'authorMail') {
    //   $user = get_user_by('ID', $post_author_id);
    //   $nameLink = $user->user_email;
    //   $nameLink = "mailto:$nameLink";
    // } else if ($nameLinkTo == 'homeUrl') {
    //   $nameLink = get_home_url();
    // } else if ($nameLinkTo == 'customURL') {
    //   $nameLink = $nameCustomUrl;
    // } else if ($nameLinkTo == 'customField') {
    //   $nameLink = get_post_meta($post_ID, $nameLinkToMeta, true);
    // }
    $htmlGroups = [];
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
    <?php
    $htmlGroups['name'] = ob_get_clean();
    ob_start();
    ?>
    <div class="<?php echo esc_attr($descriptionClass); ?>">
      <?php echo wp_kses_post(get_the_author_meta('description', $post_author_id)); ?>
    </div>
    <?php
    $htmlGroups['description'] = ob_get_clean();
    ob_start();
    ?>
    <div class="<?php echo esc_attr($avatarClass); ?>">
      <img src="<?php echo esc_url(get_avatar_url($post_author_id, ['size' => $avatarSize])) ?>" alt=" <?php echo esc_attr(get_the_author_meta('display_name', $post_author_id)) ?> " />
    </div>
    <?php
    $htmlGroups['avatar'] = ob_get_clean();
    $linkAttrStr = '';
    if (!empty($itemsLinkAttr))
      foreach ($itemsLinkAttr as $attr) {
        if (!empty($attr['val']))
          $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }
    ob_start();
    ?>
    <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
          <?php echo esc_attr($wrapperClass); ?>
          <?php echo esc_attr($blockId); ?>">
      <?php
      echo wp_kses_post($content) ?>
    </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksPostAuthor = new ComboBlocksPostAuthor();
