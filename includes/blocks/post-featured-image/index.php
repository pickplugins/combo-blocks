<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksFeaturedImage
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/post-featured-image/block.json',
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
    // $wrapperTextAlign = isset($wrapperStyles['textAlign']) ? $wrapperStyles['textAlign'] : '';
    $featuredImage = isset($attributes['featuredImage']) ? $attributes['featuredImage'] : [];
    $featuredImageOptions = isset($featuredImage['options']) ? $featuredImage['options'] : [];
    $lazyLoad = isset($featuredImageOptions['lazy']) ? $featuredImageOptions['lazy'] : true;
    $lazyLoadSrc = isset($featuredImageOptions['lazySrc']) ? $featuredImageOptions['lazySrc'] : '';
    $featuredImageLinkTo = isset($featuredImageOptions['linkTo']) ? $featuredImageOptions['linkTo'] : '';
    $featuredImageLinkToMetaKey = isset($featuredImageOptions['linkToMetaKey']) ? $featuredImageOptions['linkToMetaKey'] : '';
    $featuredImageAltTextSrc = isset($featuredImageOptions['altTextSrc']) ? $featuredImageOptions['altTextSrc'] : 'imgAltText';
    $featuredImageTitleTextSrc = isset($featuredImageOptions['titleTextSrc']) ? $featuredImageOptions['titleTextSrc'] : 'imgTitle';
    $featuredImageAltTextCustom = isset($featuredImageOptions['altTextCustom']) ? $featuredImageOptions['altTextCustom'] : '';
    $featuredImageAltTextMetaKey = isset($featuredImageOptions['altTextMetaKey']) ? $featuredImageOptions['altTextMetaKey'] : '';
    $featuredImageIsLink = isset($featuredImageOptions['isLink']) ? $featuredImageOptions['isLink'] : true;
    $linkTarget = isset($featuredImageOptions['linkTarget']) ? $featuredImageOptions['linkTarget'] : '_blank';
    $customUrl = isset($featuredImageOptions['customUrl']) ? $featuredImageOptions['customUrl'] : '';
    $linkAttr = isset($featuredImageOptions['linkAttr']) ? $featuredImageOptions['linkAttr'] : [];
    $rel = isset($featuredImageOptions['rel']) ? $featuredImageOptions['rel'] : '';
    $size = isset($featuredImageOptions['size']['Desktop']) ? $featuredImageOptions['size']['Desktop'] : 'full';
    $utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
    $utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';
    $utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
    $utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
    $utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
    $utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
    $utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
    $utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = $blockCssY['items'];
    // $custom_logo_id = get_theme_mod( 'custom_logo' );
    // $logo = wp_get_attachment_image_src( $custom_logo_id , 'full' );
    if (has_block('combo-blocks/post-featured-image')) {
      if ($lazyLoad == true) {
        wp_enqueue_script('lazyLoad');
      }
    }
    $linkAttrStr = '';
    if (!empty($linkAttr))
      foreach ($linkAttr as $attr) {
        if (!empty($attr['val']))
          $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }
    $post_title = get_the_title($post_ID);
    $thumb_id = get_post_thumbnail_id($post_ID);
    $image_srcs = wp_get_attachment_image_src($thumb_id, $size);
    $image_src_url = isset($image_srcs[0]) ? $image_srcs[0] : '';
    $image_src_w = isset($image_srcs[1]) ? $image_srcs[1] : '';
    $image_src_h = isset($image_srcs[2]) ? $image_srcs[2] : '';
    $attachment_url = wp_get_attachment_url($thumb_id);
    $attachment_post = get_post($thumb_id);
    $image_srcset = wp_get_attachment_image_srcset($thumb_id);
    $attachment_metadata = wp_get_attachment_metadata($thumb_id);
    //$thumb = wp_get_attachment_image_src($thumb_id, $size);
    $linkUrl = "";
    $author_id = get_post_field('post_author', $post_ID);
    if ($featuredImageLinkTo == 'postUrl') {
      $linkUrl = get_permalink($post_ID);
    } else if ($featuredImageLinkTo == 'customField') {
      $linkUrl = get_post_meta($post_ID, $featuredImageLinkToMetaKey, true);
    } else if ($featuredImageLinkTo == 'authorMeta') {
      $linkUrl = get_user_meta($author_id, $featuredImageLinkToMetaKey, true);
    } else if ($featuredImageLinkTo == 'authorMail') {
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_email;
      $linkUrl = "mailto:$linkUrl";
    } else if ($featuredImageLinkTo == 'authorUrl') {
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_url;
    } else if ($featuredImageLinkTo == 'authorLink') {
      $linkUrl = get_the_author_link($author_id);
    } else if ($featuredImageLinkTo == 'homeUrl') {
      $linkUrl = get_bloginfo('url');
    } else if ($featuredImageLinkTo == 'custom') {
      $linkUrl = $customUrl;
    }
    $altText = '';
    if ($featuredImageAltTextSrc == 'imgAltText') {
      $altText = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
    } else if ($featuredImageAltTextSrc == 'imgCaption') {
      $altText = $attachment_post->post_excerpt;
    } else if ($featuredImageAltTextSrc == 'imgDescription') {
      $altText = $attachment_post->post_content;
    } else if ($featuredImageAltTextSrc == 'imgTitle') {
      $altText = get_the_title($thumb_id);
    } else if ($featuredImageAltTextSrc == 'imgSlug') {
      $altText = get_post_field('post_name', $post_ID);
    } else if ($featuredImageAltTextSrc == 'postTitle') {
      $altText = get_the_title($post_ID);
    } else if ($featuredImageAltTextSrc == 'excerpt') {
      $altText = get_the_excerpt($post_ID);
    } else if ($featuredImageAltTextSrc == 'postSlug') {
      $altText = get_the_excerpt($post_ID);
    } else if ($featuredImageAltTextSrc == 'customField') {
      $altText = get_post_meta($post_ID, $featuredImageAltTextMetaKey, true);
    } else if ($featuredImageAltTextSrc == 'custom') {
      $altText = $featuredImageAltTextCustom;
    }
    $titleText = '';
    if ($featuredImageTitleTextSrc == 'imgAltText') {
      $titleText = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
    } else if ($featuredImageTitleTextSrc == 'imgCaption') {
      $titleText = $attachment_post->post_excerpt;
    } else if ($featuredImageTitleTextSrc == 'imgDescription') {
      $titleText = $attachment_post->post_content;
    } else if ($featuredImageTitleTextSrc == 'imgTitle') {
      $titleText = get_the_title($thumb_id);
    } else if ($featuredImageTitleTextSrc == 'imgSlug') {
      $titleText = get_post_field('post_name', $post_ID);
    } else if ($featuredImageTitleTextSrc == 'postTitle') {
      $titleText = get_the_title($post_ID);
    } else if ($featuredImageTitleTextSrc == 'excerpt') {
      $titleText = get_the_excerpt($post_ID);
    } else if ($featuredImageTitleTextSrc == 'postSlug') {
      $titleText = get_the_excerpt($post_ID);
    } else if ($featuredImageTitleTextSrc == 'customField') {
      $titleText = get_post_meta($post_ID, $featuredImageAltTextMetaKey, true);
    } else if ($featuredImageTitleTextSrc == 'custom') {
      $titleText = $featuredImageAltTextCustom;
    }
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    if (!empty($featuredImageLinkTo)) {
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
        $utmUrl = add_query_arg($utmValue, $linkUrl);
        $linkUrl = $utmUrl;
      }
    }
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }
    // //* Visible condition
    if ($lazyLoad == true) {
      $dataSrc = $attachment_url;
      // $lazy_img_src = $lazyLoadSrc;
      $attachment_url = $lazyLoadSrc;
      $lazy = "lazy";
    } else {
      // $attachment_url_img = $attachment_url;
      // $attachment_url = $attachment_url_img;
      $lazy = "eager";
      $dataSrc = "";
    }
    ob_start();
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
                                                          <?php echo esc_attr($blockId); ?>
                                                          <?php echo esc_attr($wrapperClass); ?>">
        <?php if (!empty($featuredImageLinkTo)) : ?>
          <a href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>" <?php //echo $linkAttrStr; 
                                                                                                                                                                                  ?>>
            <img <?php //echo ($linkAttrStr); 
                  ?> srcset="<?php echo esc_attr($image_srcset); ?>" src="<?php echo esc_url($image_src_url); ?>"
              <?php if ($lazyLoad == true) : ?> data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
              width="<?php echo esc_attr($image_src_w); ?>" height="<?php echo esc_attr($image_src_h); ?>" alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
          </a>
        <?php else : ?>
          <img <?php //echo ($linkAttrStr); 
                ?> srcset="<?php echo esc_attr($image_srcset); ?>" src="<?php echo esc_url($image_src_url); ?>"
            <?php if ($lazyLoad == true) : ?> data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
            width="<?php echo esc_attr($image_src_w); ?>" height="<?php echo esc_attr($image_src_h); ?>" alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
        <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
    <?php
    endif;
    if (empty($wrapperTag)) :
    ?>
      <?php if (!empty($featuredImageLinkTo)) : ?>
        <a class="<?php echo esc_attr($blockId); ?>" href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>" rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>">
          <img <?php //echo ($linkAttrStr); 
                ?> src="<?php echo esc_url($attachment_url); ?>"
            <?php if ($lazyLoad == true) : ?> data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
            alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
        </a>
      <?php else : ?>
        <img <?php //echo ($linkAttrStr); 
              ?> src="<?php echo esc_url($attachment_url); ?>"
          <?php if ($lazyLoad == true) : ?> data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
          alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
      <?php endif; ?>
    <?php
    endif;
    ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksFeaturedImage = new ComboBlocksFeaturedImage();
