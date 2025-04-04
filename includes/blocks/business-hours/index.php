<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksBusinessHours
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/business-hours/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  function formatTime($time)
  {
    list($hours, $minutes) = explode(":", $time);
    $formattedHours = intval($hours);
    $period = $formattedHours >= 12 ? "PM" : "AM";
    $formattedHours = $formattedHours % 12;
    if ($formattedHours == 0) {
      $formattedHours = 12;
    }
    return sprintf("%02d:%02d %s", $formattedHours, $minutes, $period);
  }
  function TimeDisplay($time)
  {
    return "<div>" . $this->formatTime($time) . "</div>";
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    global $comboBlocksCss;
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $wrapperID = isset($wrapperOptions['id']) ? $wrapperOptions['id'] : '';
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    // $wrapperLinkTo = isset($wrapperOptions['linkTo']) ? $wrapperOptions['linkTo'] : '';
    // $wrapperLinkTarget = isset($wrapperOptions['linkTarget']) ? $wrapperOptions['linkTarget'] : '_blank';
    // $wrapperCustomUrl = isset($wrapperOptions['customUrl']) ? $wrapperOptions['customUrl'] : '';
    // $wrapperLinkAttr = isset($wrapperOptions['linkAttr']) ? $wrapperOptions['linkAttr'] : [];
    // $wrapperRel = isset($wrapperOptions['rel']) ? $wrapperOptions['rel'] : '';
    // $wrapperLinkToMetaKey = isset($wrapperOptions['linkToMetaKey']) ? $wrapperOptions['linkToMetaKey'] : '';
    // *label
    $label = isset($attributes['label']) ? $attributes['label'] : [];
    $labelOptions = isset($label['options']) ? $label['options'] : [];
    $labelClass = isset($labelOptions['class']) ? $labelOptions['class'] : '';
    // *timesWrap
    $timesWrap = isset($attributes['timesWrap']) ? $attributes['timesWrap'] : [];
    $timesWrapOptions = isset($timesWrap['options']) ? $timesWrap['options'] : [];
    $timesWrapClass = isset($timesWrapOptions['class']) ? $timesWrapOptions['class'] : '';
    // *startTime
    $startTime = isset($attributes['startTime']) ? $attributes['startTime'] : [];
    $startTimeOptions = isset($startTime['options']) ? $startTime['options'] : [];
    $startTimeClass = isset($startTimeOptions['class']) ? $startTimeOptions['class'] : '';
    $startTimeStart = isset($startTimeOptions['start']) ? $startTimeOptions['start'] : '';
    // *endTime
    $endTime = isset($attributes['endTime']) ? $attributes['endTime'] : [];
    $endTimeOptions = isset($endTime['options']) ? $endTime['options'] : [];
    $endTimeClass = isset($endTimeOptions['class']) ? $endTimeOptions['class'] : '';
    $endTimeEnd = isset($endTimeOptions['end']) ? $endTimeOptions['end'] : '';
    // *separator
    $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
    $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
    $separatorClass = isset($separatorOptions['class']) ? $separatorOptions['class'] : '';
    $separatorSeparator = isset($separatorOptions['separator']) ? $separatorOptions['separator'] : '';
    // *closed
    $closed = isset($attributes['closed']) ? $attributes['closed'] : [];
    $closedOptions = isset($closed['options']) ? $closed['options'] : [];
    $closedClass = isset($closedOptions['class']) ? $closedOptions['class'] : '';
    $closedCloseText = isset($closedOptions['closeText']) ? $closedOptions['closeText'] : '';
    // *elements
    $elements = isset($attributes['elements']) ? $attributes['elements'] : [];
    $elementsOptions = isset($elements['options']) ? $elements['options'] : [];
    $elementsItems = isset($elements['items']) ? $elements['items'] : [];
    $elementsClass = isset($elementsOptions['class']) ? $elementsOptions['class'] : "";
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    // $linkUrl = '';
    // if ($wrapperLinkTo == 'postUrl') {
    //   $linkUrl = get_permalink($post_ID);
    // } else if ($wrapperLinkTo == 'customField') {
    //   $linkUrl = get_post_meta($post_ID, $wrapperLinkToMetaKey, true);
    // } else if ($wrapperLinkTo == 'authorUrl') {
    //   $author_id = get_post_field('post_author', $post_ID);
    //   $user = get_user_by('ID', $author_id);
    //   $linkUrl = $user->user_url;
    // } else if ($wrapperLinkTo == 'authorLink') {
    //   $author_id = get_post_field('post_author', $post_ID);
    //   $linkUrl = get_author_posts_url($author_id);
    // } else if ($wrapperLinkTo == 'homeUrl') {
    //   $linkUrl = get_bloginfo('url');
    // } else if ($wrapperLinkTo == 'customUrl') {
    //   $linkUrl = $wrapperCustomUrl;
    // }
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
    <<?php echo combo_blocks_tag_escape($wrapperTag); ?> id="<?php echo esc_attr($wrapperID); ?>" class="<?php echo esc_attr($wrapperClass); ?> <?php echo esc_attr($blockId); ?> <?php echo esc_attr($blockAlign); ?>">
      <?php
      $i = 1;
      if (!empty($elementsItems))
        foreach ($elementsItems as $index => $item) {
          $itemLabel = isset($item['label']) ? $item['label'] : '';
          $itemStatus = isset($item['status']) ? $item['status'] : true;
          $itemStart = isset($item['start']) ? $item['start'] : "";
          $itemEnd = isset($item['end']) ? $item['end'] : "";
          $itemCloseText = isset($item['closeText']) ? $item['closeText'] : "";
          $itemClass = " item-" . $index;
      ?>
        <div class="<?php
                    echo esc_attr($elementsClass); ?><?php
                                                      echo esc_attr($itemClass); ?>">
          <div class="<?php echo esc_attr($labelClass); ?>"><?php echo wp_kses_post($itemLabel); ?></div>
          <div class="<?php echo esc_attr($timesWrapClass); ?>">
            <?php if ($itemStatus) {
            ?>
              <span class="<?php echo esc_attr($closedClass) ?>">
                <?php if ($itemCloseText) {
                  echo wp_kses_post($itemCloseText);
                } else {
                  echo wp_kses_post($closedCloseText);
                }
                ?>
              </span>
            <?php
            } else {
            ?>
              <span class="<?php echo esc_attr($startTimeClass) ?>">
                <?php
                if ($itemStart) {
                  echo wp_kses_post($this->TimeDisplay($itemStart));
                } else {
                  echo wp_kses_post($this->TimeDisplay($startTimeStart));
                }
                ?>
              </span>
              <span class="<?php echo esc_attr($separatorClass) ?>">
                <?php echo esc_attr($separatorSeparator); ?>
              </span>
              <span class="<?php echo esc_attr($endTimeClass) ?>">
                <?php
                if ($itemEnd) {
                  echo wp_kses_post($this->TimeDisplay($itemEnd));
                } else {
                  echo wp_kses_post($this->TimeDisplay($endTimeEnd));
                }
                ?>
              </span>
            <?php
            } ?>
          </div>
        </div>
      <?php
          $i++;
        }
      ?>
    </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksBusinessHours = new ComboBlocksBusinessHours();
