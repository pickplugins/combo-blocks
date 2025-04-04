<?php
if (!defined("ABSPATH")) {
  exit();
}
class ComboBlocksPostTitle
{
  function __construct()
  {
    add_action("init", [$this, "register_scripts"]);
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . "build/blocks/post-title/block.json",
      [
        "title" => "Post Title",
        "render_callback" => [$this, "theHTML"],
      ]
    );
  }
  // front-end output from the gutenberg editor
  function theHTML($attributes, $content, $block)
  {
    global $comboBlocksCss;
    $post_ID = isset($block->context["postId"])      ? $block->context["postId"]      : "";
    $post_url = get_the_permalink($post_ID);
    $the_post = get_post($post_ID);
    $post_author_id = isset($the_post->post_author) ? $the_post->post_author : '';
    $blockId = isset($attributes["blockId"]) ? $attributes["blockId"] : "";
    $blockAlign = isset($attributes["align"])      ? "align" . $attributes["align"]      : "";
    $wrapper = isset($attributes["wrapper"]) ? $attributes["wrapper"] : [];
    $wrapperOptions = isset($wrapper["options"]) ? $wrapper["options"] : [];
    $wrapperClass = isset($wrapperOptions["class"])      ? $wrapperOptions["class"]      : "";
    $wrapperTag = isset($wrapperOptions["tag"])      ? $wrapperOptions["tag"]      : "div";
    $postTitle = isset($attributes["postTitle"])      ? $attributes["postTitle"]      : [];
    $postTitleOptions = isset($postTitle["options"])      ? $postTitle["options"]      : [];
    $postTitleClass = isset($postTitleOptions["class"])      ? $postTitleOptions["class"]      : "";
    $postTitleTag = isset($postTitleOptions["tag"])      ? $postTitleOptions["tag"]      : "span";
    $postTitleLinkTo = isset($postTitleOptions['linkTo']) ? $postTitleOptions['linkTo'] : false;
    $postTitleLinkAttr = isset($postTitleOptions['linkAttr']) ? $postTitleOptions['linkAttr'] : [];
    $postTitleLinkToAuthorMeta = isset($postTitleOptions['linkToAuthorMeta']) ? $postTitleOptions['linkToAuthorMeta'] : '';
    $postTitleLinkToCustomMeta = isset($postTitleOptions['linkToCustomMeta']) ? $postTitleOptions['linkToCustomMeta'] : '';
    $linkTarget = isset($postTitleOptions["linkTarget"])      ? $postTitleOptions["linkTarget"]      : "_blank";
    $customUrl = isset($postTitleOptions["customUrl"])      ? $postTitleOptions["customUrl"]      : "";
    $limitBy = isset($postTitleOptions["limitBy"])      ? $postTitleOptions["limitBy"]      : "";
    $limitCount = !empty($postTitleOptions["limitCount"])      ? $postTitleOptions["limitCount"]      : 999;
    $linkAttr = isset($postTitleOptions["linkAttr"])      ? $postTitleOptions["linkAttr"]      : [];
    $rel = isset($postTitleOptions["rel"]) ? $postTitleOptions["rel"] : "";
    $prefix = isset($attributes["prefix"]) ? $attributes["prefix"] : "";
    $prefixOptions = isset($prefix["options"]) ? $prefix["options"] : "";
    $prefixText = isset($prefixOptions["text"])      ? _wp_specialchars($prefixOptions["text"])      : "";
    $prefixClass = isset($prefixOptions["class"])      ? $prefixOptions["class"]      : "";
    $prefixPosition = isset($prefixOptions["position"])      ? $prefixOptions["position"]      : "";
    $postfix = isset($attributes["postfix"]) ? $attributes["postfix"] : "";
    $postfixOptions = isset($postfix["options"]) ? $postfix["options"] : "";
    $abTest = isset($attributes["abTest"]) ? $attributes["abTest"] : [];
    $utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
    $utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';
    $utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
    $utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
    $utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
    $utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
    $utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
    $utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';
    $postfixText = isset($postfixOptions["text"])      ? _wp_specialchars($postfixOptions["text"])      : "";
    $postfixClass = isset($postfixOptions["class"])      ? $postfixOptions["class"]      : "";
    $postfixPosition = isset($postfixOptions["position"])      ? $postfixOptions["position"]      : "";
    $blockCssY = isset($attributes["blockCssY"])      ? $attributes["blockCssY"]      : [];
    $comboBlocksCss[] = isset($blockCssY["items"]) ? $blockCssY["items"] : [];
    if ($postTitleLinkTo == 'postUrl') {
      $post_url = get_permalink($post_ID);
    } else if ($postTitleLinkTo == 'homeUrl') {
      $post_url = get_home_url();
    } else if ($postTitleLinkTo == 'authorUrl') {
      $user = get_user_by('ID', $post_author_id);
      $post_url = $user->user_url;
    } else if ($postTitleLinkTo == 'authorMail') {
      $user = get_user_by('ID', $post_author_id);
      $post_url = $user->user_email;
    } else if ($postTitleLinkTo == 'authorLink') {
      $post_url = get_author_posts_url($post_author_id);
    } else if ($postTitleLinkTo == 'customUrl') {
      $post_url = $customUrl;
    } else if ($postTitleLinkTo == 'authorMeta') {
      $post_url = get_the_author_meta($postTitleLinkToAuthorMeta, $post_author_id);
    } else if ($postTitleLinkTo == 'customField') {
      $post_url = get_post_meta($post_ID, $postTitleLinkToAuthorMeta, true);
    }
    //$linkAttrStr = combo_blocks_parse_attributes_arr($linkAttr);
    $linkAttrStr = "";
    if (!empty($linkAttr)) {
      foreach ($linkAttr as $attr) {
        if (!empty($attr["val"])) {
          $linkAttrStr .=
            esc_html($attr["id"]) .
            '="' .
            esc_attr($attr["val"]) .
            '" ';
        }
      };
    }
    $post_title = get_the_title($post_ID);
    if (!empty($abTest)) {
      $abTest[] = ["content" => $post_title];
      $abTestLength = count($abTest) - 1;
      $post_title = $abTest[rand(0, $abTestLength)]["content"];
    }
    if ($limitBy == "character") {
      $post_title = substr($post_title, 0, $limitCount);
    } else {
      $post_title = wp_trim_words($post_title, $limitCount, "");
    }
    if ($utmTrackingEnable == true) {
      $utmValue = [];
      if (!empty($utmTrackingID))
        $utmValue['utm_id'] = $utmTrackingID;
      if (!empty($utmTrackingSource))
        $utmValue['utm_source'] = $utmTrackingSource;
      if (!empty($utmTrackingMedium))
        $utmValue['utm_medium'] = $utmTrackingMedium;
      if (!empty($utmTrackingCampaign))
        $utmValue['utm_campaign'] = $utmTrackingCampaign;
      if (!empty($utmTrackingTerm))
        $utmValue['utm_term'] = $utmTrackingTerm;
      if (!empty($utmTrackingContent))
        $utmValue['utm_content'] = $utmTrackingContent;
      $utmUrl = add_query_arg($utmValue, $post_url);
      $post_url = $utmUrl;
    }
    $obj["id"] = $post_ID;
    $obj["type"] = "post";
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    $postTitleClass = combo_blocks_parse_css_class($postTitleClass, $obj);
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
?>
    <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="<?php echo esc_attr($blockId); ?> <?php
                                                                                                  echo esc_attr($wrapperClass); ?>">

      <?php if (!empty($prefixText)  && ($prefixPosition == "afterbegin")) : ?>
        <span class="<?php echo esc_attr($prefixClass); ?>">
          <?php echo wp_kses_post($prefixText); ?>
        </span>
      <?php endif; ?>
      <?php if (!empty($postTitleLinkTo)) : ?>
        <a class="<?php echo esc_attr($postTitleClass); ?>" href="<?php echo esc_url($post_url); ?>"
          rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php //echo $linkAttrStr; 
                                                                                            ?>>

          <?php if (!empty($prefixText)  && ($prefixPosition == "beforebegin")) : ?>
            <span class="<?php echo esc_attr($prefixClass); ?>">
              <?php echo wp_kses_post($prefixText); ?>
            </span>
          <?php endif; ?>
          <?php echo wp_kses_post($post_title); ?>
          <?php if (!empty($postfixText) && ($postfixPosition == "afterend")) : ?>
            <span class="<?php echo esc_attr($postfixClass); ?>">
              <?php echo wp_kses_post($postfixText); ?>
            </span>
          <?php endif; ?>
        </a>
      <?php else : ?>
        <<?php echo combo_blocks_tag_escape($postTitleTag); ?> class="<?php echo esc_attr($postTitleClass); ?>">
          <?php if (!empty($prefixText)  && ($prefixPosition == "beforebegin")) : ?>
            <span class="<?php echo esc_attr($prefixClass); ?>">
              <?php echo wp_kses_post($prefixText); ?>
            </span>
          <?php endif; ?>
          <?php echo wp_kses_post($post_title); ?>
          <?php if (!empty($postfixText) && ($postfixPosition == "afterend")) : ?>
            <span class="<?php echo esc_attr($postfixClass); ?>">
              <?php echo wp_kses_post($postfixText); ?>
            </span>
          <?php endif; ?>
        </<?php echo combo_blocks_tag_escape($postTitleTag); ?>>
      <?php endif; ?>
      <?php if (!empty($postfixText) && ($postfixPosition == "beforeend")) : ?>
        <span class="<?php echo esc_attr($postfixClass); ?>">
          <?php echo wp_kses_post($postfixText); ?>
        </span>
      <?php endif; ?>
    </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksPostTitle = new ComboBlocksPostTitle();
