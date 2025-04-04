<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksImage
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/image/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }



  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    global $comboBlocksCss;
    $galleryLightbox = isset($block->context['combo-blocks/lightbox']) ? $block->context['combo-blocks/lightbox'] : null;
    $lightbox = ($galleryLightbox == null) ? $attributes['lightbox'] : $galleryLightbox;
    $lightboxOptions = isset($lightbox['options']) ? $lightbox['options'] : [];
    $lightboxEnable = isset($lightboxOptions['enable']) ? $lightboxOptions['enable'] : false;
    $lightboxThumbSize = isset($lightboxOptions['thumbSize']) ? $lightboxOptions['thumbSize'] : 'full';
    $featuredImage = isset($attributes['image']) ? $attributes['image'] : [];
    $featuredImageOptions = isset($featuredImage['options']) ? $featuredImage['options'] : [];
    //$lazyLoad = isset($featuredImageOptions['lazy']) ? $featuredImageOptions['lazy'] : false;

    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_url = get_the_permalink($post_ID);
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $galleryId = isset($block->context['combo-blocks/galleryId']) ? $block->context['combo-blocks/galleryId'] : $blockId;
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    $featuredImage = isset($attributes['image']) ? $attributes['image'] : [];
    $featuredImageOptions = isset($featuredImage['options']) ? $featuredImage['options'] : [];
    $featuredImageSrcType = isset($featuredImageOptions['imgSrcType']) ? $featuredImageOptions['imgSrcType'] : '';
    $featuredImageSrcMetaKey = isset($featuredImageOptions['imgSrcMetaKey']) ? $featuredImageOptions['imgSrcMetaKey'] : '';
    $featuredImageSrcMetaKeyType = isset($featuredImageOptions['imgSrcMetaKeyType']) ? $featuredImageOptions['imgSrcMetaKeyType'] : '';
    $featuredImagesrcUrl = isset($featuredImageOptions['srcUrl']) ? $featuredImageOptions['srcUrl'] : '';
    $featuredImagesrcId = isset($featuredImageOptions['srcId']) ? $featuredImageOptions['srcId'] : '';
    $featuredImageLinkTo = isset($featuredImageOptions['linkTo']) ? $featuredImageOptions['linkTo'] : '';
    $featuredImageLinkToMetaKey = isset($featuredImageOptions['linkToMetaKey']) ? $featuredImageOptions['linkToMetaKey'] : '';
    $featuredImageAltTextSrc = isset($featuredImageOptions['altTextSrc']) ? $featuredImageOptions['altTextSrc'] : 'imgAltText';
    $featuredImageTitleTextSrc = isset($featuredImageOptions['titleTextSrc']) ? $featuredImageOptions['titleTextSrc'] : 'imgTitle';
    $featuredImageAltTextCustom = isset($featuredImageOptions['altTextCustom']) ? $featuredImageOptions['altTextCustom'] : '';
    $featuredImageAltTextMetaKey = isset($featuredImageOptions['altTextMetaKey']) ? $featuredImageOptions['altTextMetaKey'] : '';
    $featuredImageIsLink = isset($featuredImageOptions['isLink']) ? $featuredImageOptions['isLink'] : true;
    $linkTarget = isset($featuredImageOptions['linkTarget']) ? $featuredImageOptions['linkTarget'] : '_blank';
    $customUrl = isset($featuredImageOptions['customUrl']) ? $featuredImageOptions['customUrl'] : '';
    $linkTocustomUrl = isset($featuredImageOptions['linkTocustomUrl']) ? $featuredImageOptions['linkTocustomUrl'] : '';
    $linkAttr = isset($featuredImageOptions['linkAttr']) ? $featuredImageOptions['linkAttr'] : [];
    $rel = isset($featuredImageOptions['rel']) ? $featuredImageOptions['rel'] : '';
    $sizes = isset($featuredImageOptions['size']) ? $featuredImageOptions['size'] : [];
    $size = isset($sizes['Desktop']) ? $sizes['Desktop'] : '';
    $utmTracking = isset($attributes['utmTracking']) ? $attributes['utmTracking'] : '';
    $utmTrackingEnable = isset($utmTracking['enable']) ? $utmTracking['enable'] : '';
    $utmTrackingID = isset($utmTracking['id']) ? $utmTracking['id'] : '';
    $utmTrackingSource = isset($utmTracking['source']) ? $utmTracking['source'] : '';
    $utmTrackingMedium = isset($utmTracking['medium']) ? $utmTracking['medium'] : '';
    $utmTrackingCampaign = isset($utmTracking['campaign']) ? $utmTracking['campaign'] : '';
    $utmTrackingTerm = isset($utmTracking['term']) ? $utmTracking['term'] : '';
    $utmTrackingContent = isset($utmTracking['content']) ? $utmTracking['content'] : '';
    $srcsetEnable = isset($featuredImageOptions['srcsetEnable']) ? $featuredImageOptions['srcsetEnable'] : true;

    $lazyLoad = isset($attributes['lazyLoad']) ? $attributes['lazyLoad'] : [];
    $lazyLoadEnable = isset($lazyLoad['enable']) ? $lazyLoad['enable'] : false;
    $lazyLoadSrc = isset($lazyLoad['lazySrcId']) ? $lazyLoad['lazySrcId'] : '';
    $lazyLoadSrcType = isset($lazyLoad['lazySrcType']) ? $lazyLoad['lazySrcType'] : '';



    if (has_block('combo-blocks/image')) {
      if ($lazyLoadEnable == true) {
        wp_enqueue_script('lazyLoad');
      }
      if ($lightboxEnable == true) {
        wp_enqueue_script('fslightbox');
      }
    }






    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = $blockCssY['items'];

    $post_title = get_the_title($post_ID);
    //$thumb_id = get_post_thumbnail_id($post_ID);
    $thumb_id = $featuredImagesrcId;
    $attachment_url = wp_get_attachment_image_url($thumb_id, $size);
    $attachment_post = get_post($thumb_id);
    $image_srcset = wp_get_attachment_image_srcset($thumb_id);
    $attachment_metadata = wp_get_attachment_metadata($thumb_id);
    $sizes = isset($attachment_metadata['sizes']) ? $attachment_metadata['sizes'] : [];
    $mt_width = isset($attachment_metadata['width']) ? $attachment_metadata['width'] : '';
    $mt_height = isset($attachment_metadata['height']) ? $attachment_metadata['height'] : '';
    $width = isset($sizes[$size]['width']) ? $sizes[$size]['width'] : $mt_width;
    $height = isset($sizes[$size]['height']) ?  $sizes[$size]['height'] : $mt_height;
    if ($featuredImageSrcType == 'customField') {
      if ($featuredImageSrcMetaKeyType == 'ID') {
        $thumb_id = get_post_meta($post_ID, $featuredImageSrcMetaKey, true);
        $attachment_metadata = wp_get_attachment_metadata($thumb_id);
        $width = isset($attachment_metadata['width']) ? $attachment_metadata['width'] : '';
        $height = isset($attachment_metadata['height']) ? $attachment_metadata['height'] : '';

        $linkAttr['width'] = $width;
        $linkAttr['height'] = $height;

        $attachment_url = wp_get_attachment_image_url($thumb_id, $size);
        $attachment_post = get_post($thumb_id);
        $image_srcset = wp_get_attachment_image_srcset($thumb_id);
      } else {
        $attachment_url = get_post_meta($post_ID, $featuredImageSrcMetaKey, true);
        //$imagesize = getimagesize($attachment_url);
        //$imagesize = $attachment_url;
        $width =  '';
        $height =  '';
      }
    } elseif ($featuredImageSrcType == 'customUrl') {
      //$imagesize = getimagesize($featuredImagesrcUrl);
      //$imagesize = $featuredImagesrcUrl;
      $width =  '';
      $height =  '';
      // $width =  '';
      // $height =  '';


      $attachment_url = $featuredImagesrcUrl;
    } elseif ($featuredImageSrcType == 'imgId') {
      $attachment_metadata = wp_get_attachment_metadata($featuredImagesrcId);
      $width = isset($attachment_metadata['width']) ? $attachment_metadata['width'] : '';
      $height = isset($attachment_metadata['height']) ? $attachment_metadata['height'] : '';
      $attachment_url = wp_get_attachment_image_url($featuredImagesrcId, $size);
      $linkAttr['width'] = $width;
      $linkAttr['height'] = $height;
    }
    $linkUrl = "";
    if ($featuredImageLinkTo == 'postUrl') {
      $linkUrl = get_permalink($post_ID);
    } else if ($featuredImageLinkTo == 'customField') {
      $linkUrl = get_post_meta($post_ID, $featuredImageLinkToMetaKey, true);
    } else if ($featuredImageLinkTo == 'authorUrl') {
      $author_id = get_post_field('post_author', $post_ID);
      $user = get_user_by('ID', $author_id);
      $linkUrl = $user->user_url;
    } else if ($featuredImageLinkTo == 'authorLink') {
      $author_id = get_post_field('post_author', $post_ID);
      $linkUrl = get_the_author_link($author_id);
    } else if ($featuredImageLinkTo == 'homeUrl') {
      $linkUrl = get_bloginfo('url');
    } else if ($featuredImageLinkTo == 'customUrl') {
      $linkUrl = $linkTocustomUrl;
    }
    // else if ($featuredImageLinkTo == 'authorMeta') {
    //   $author_id = get_post_field('post_author', $post_ID);
    //   $post_url = get_user_meta($author_id, $featuredImageLinkToMetaKey, true);
    // }
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
    if ($lightboxEnable == true) {
      $linkUrl = $attachment_url;
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
    if (strlen($lazyLoadSrc) === 0) {
      $lazyLoadSrc = combo_blocks_url . "assets/images/loading.gif";
    }
    if ($lazyLoadEnable == true) {
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
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }



    $linkAttrStr = '';
    if (!empty($linkAttr))
      foreach ($linkAttr as $attr) {
        if (!empty($attr['val'])) {
          if ($attr["id"] == "width" || $attr["id"] == "height") {
            $linkAttrStr .= esc_attr("data-" . $attr['id']) . '="' . esc_attr($attr['val']) . '" ';
          }
        }
      }



    //echo "<pre>" . var_export($linkAttr, true) . "</pre>";
    //echo "<pre>" . var_export($linkAttrStr, true) . "</pre>";


    // //* Visible condition
    ob_start();
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
                    <?php echo esc_attr($blockId); ?>
                    <?php echo esc_attr($wrapperClass); ?>">
        <?php if (!empty($featuredImageLinkTo)) : ?>
          <a <?php if ($lightboxEnable == true) : ?> data-fslightbox="<?php echo esc_attr($galleryId); ?>" <?php endif; ?>
            href=" <?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>"
            rel="<?php echo esc_attr($rel); ?>" target="<?php echo esc_attr($linkTarget); ?>"
            <?php echo ($linkAttrStr);
            ?>>
            <img <?php echo ($linkAttrStr);
                  ?> src="<?php echo esc_url($attachment_url); ?>" <?php if ($lazyLoadEnable == true) : ?>
              data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
              <?php if ($lazyLoadEnable == false) : ?> <?php if ($srcsetEnable == true) : ?>
              srcset=" <?php echo esc_attr($image_srcset); ?>" <?php endif; ?> <?php endif; ?>
              alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
          </a>
        <?php else : ?>
          <?php if ($lightboxEnable == true) : ?>
            <a href="<?php if ($lazyLoadEnable == true) : ?><?php echo esc_url($dataSrc); ?><?php endif; ?><?php if ($lazyLoadEnable == false) : ?><?php echo esc_url($attachment_url); ?><?php endif; ?>"
              data-fslightbox="<?php echo esc_attr($galleryId); ?>">
              <img <?php echo ($linkAttrStr);
                    ?> src="<?php echo esc_url($attachment_url); ?>" <?php if ($lazyLoadEnable == true) : ?>
                data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
                <?php if ($lazyLoadEnable == false) : ?> <?php if ($srcsetEnable == true) : ?>
                srcset=" <?php echo esc_attr($image_srcset); ?>" <?php endif; ?> <?php endif; ?>
                alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
            </a>
          <?php else : ?>
            <img <?php echo ($linkAttrStr);
                  ?> src="<?php echo esc_url($attachment_url); ?>" <?php if ($lazyLoadEnable == true) : ?>
              data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
              <?php if ($lazyLoadEnable == false) : ?> <?php if ($srcsetEnable == true) : ?>
              srcset=" <?php echo esc_attr($image_srcset); ?>" <?php endif; ?> <?php endif; ?>
              alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
          <?php endif; ?>
        <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
    <?php
    endif;
    if (empty($wrapperTag)) :
    ?>
      <?php if (!empty($featuredImageLinkTo)) : ?>
        <a class=" <?php echo esc_attr($blockId); ?>"
          href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>" rel=" <?php echo esc_attr($rel); ?>"
          target="<?php echo esc_attr($linkTarget); ?>" <?php if ($lightboxEnable == true) : ?>
          data-fslightbox="<?php echo esc_attr($galleryId); ?>" <?php endif; ?>>
          <img <?php echo ($linkAttrStr);
                ?> src="<?php echo esc_url($attachment_url); ?>" <?php if ($lazyLoadEnable == true) : ?>
            data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
            <?php if ($lazyLoadEnable == false) : ?> <?php if ($srcsetEnable == true) : ?>
            srcset=" <?php echo esc_attr($image_srcset); ?>" <?php endif; ?> <?php endif; ?>
            alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
        </a>
      <?php else : ?>
        <?php if ($lightboxEnable == true) : ?>
          <a class=" <?php echo esc_attr($blockId); ?>"
            href="<?php echo (!empty($linkUrl)) ? esc_url($linkUrl) : esc_url($post_url); ?>"
            data-fslightbox=" <?php echo esc_attr($galleryId); ?>"> <img
              <?php echo ($linkAttrStr);
              ?>
              src="<?php echo esc_url($attachment_url); ?>" srcset="<?php echo esc_attr($image_srcset); ?>"
              alt="<?php echo esc_attr($altText); ?>" title=" <?php echo esc_attr($titleText); ?>" /> </a>
        <?php else : ?>
          <img <?php echo ($linkAttrStr);
                ?> src="<?php echo esc_url($attachment_url); ?>" <?php if ($lazyLoadEnable == true) : ?>
            data-src="<?php echo esc_url($dataSrc); ?>" loading="<?php echo esc_attr($lazy) ?>" <?php endif; ?>
            <?php if ($lazyLoadEnable == false) : ?> <?php if ($srcsetEnable == true) : ?>
            srcset=" <?php echo esc_attr($image_srcset); ?>" <?php endif; ?> <?php endif; ?>
            alt="<?php echo esc_attr($altText); ?>" title="<?php echo esc_attr($titleText); ?>" />
        <?php endif; ?>
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
$ComboBlocksImage = new ComboBlocksImage();
