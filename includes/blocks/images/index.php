<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksGalleryImages
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/images/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  function categories_slugs($categories)
  {
    //$slug = [];
    if (!empty($categories)) {
      $user_meta = array_map(function ($a) {
        $slug = str_replace(" ", "-", strtolower($a));
        return $slug;
      }, $categories);
      return implode(" ", $user_meta);
    }
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    global $comboBlocksCss;
    global $comboBlocksScriptData;
    global $PGUserQuery;
    global $ComboBlocksPostQuery;
    $block_instance = $block->parsed_block;
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $parentBlock = isset($block->context['parentBlock']) ? $block->context['parentBlock'] : '';
    $galleryId = isset($block->context['combo-blocks/galleryId']) ? $block->context['combo-blocks/galleryId'] : $blockId;
    $galleryLightbox = isset($block->context['combo-blocks/lightbox']) ? $block->context['combo-blocks/lightbox'] : null;
    $lightboxOptions = isset($galleryLightbox['options']) ? $galleryLightbox['options'] : [];
    $lightboxEnable = isset($lightboxOptions['enable']) ? $lightboxOptions['enable'] : false;
    //if (has_block('images')) {
    if ($lightboxEnable == true) {
      wp_enqueue_script('fslightbox');
    }
    //}
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $wrapperSource = isset($wrapperOptions['source']) ? $wrapperOptions['source'] : '';
    $wrapperSourcePrams = isset($wrapperOptions['sourcePrams']) ? $wrapperOptions['sourcePrams'] : [];


    $itemsWrap = isset($attributes['itemsWrap']) ? $attributes['itemsWrap'] : [];
    $itemsWrapOptions = isset($itemsWrap['options']) ? $itemsWrap['options'] : [];
    $itemsWrapExcluded = isset($itemsWrapOptions['excludedWrapper']) ? $itemsWrapOptions['excludedWrapper'] : false;
    /*#######itemWrap######*/
    $itemWrap = isset($attributes['itemWrap']) ? $attributes['itemWrap'] : [];
    $itemWrapOptions = isset($itemWrap['options']) ? $itemWrap['options'] : [];
    $itemWrapTag = isset($itemWrapOptions['tag']) ? $itemWrapOptions['tag'] : 'div';
    $itemWrapClass = isset($itemWrapOptions['class']) ? $itemWrapOptions['class'] : 'item';
    $itemWrapCounterClass = isset($itemWrapOptions['counterClass']) ? $itemWrapOptions['counterClass'] : false;
    $itemWrapTermsClass = isset($itemWrapOptions['termsClass']) ? $itemWrapOptions['termsClass'] : false;
    $itemWrapOddEvenClass = isset($itemWrapOptions['oddEvenClass']) ? $itemWrapOptions['oddEvenClass'] : false;
    /*#########$noPostsWrap#########*/
    $noPostsWrap = isset($attributes['noPostsWrap']) ? $attributes['noPostsWrap'] : [];
    $noPostsWrapOptions = isset($noPostsWrap['options']) ? $noPostsWrap['options'] : [];
    $grid = isset($attributes['grid']) ? $attributes['grid'] : [];
    $gridOptions = isset($grid['options']) ? $grid['options'] : [];
    $gridOptionsItemCss = isset($gridOptions['itemCss']) ? $gridOptions['itemCss'] : [];
    $galleryItems = isset($attributes['galleryItems']) ? $attributes['galleryItems'] : [];
    /*#######pagination######*/
    $pagination = isset($attributes['pagination']) ? $attributes['pagination'] : [];
    $paginationOptions = isset($pagination['options']) ? $pagination['options'] : [];
    $paginationType = isset($paginationOptions['type']) ? $paginationOptions['type'] : 'none';
    $queryArgs = isset($attributes['queryArgs']) ? $attributes['queryArgs'] : [];
    $parsed_block = isset($block->parsed_block) ? $block->parsed_block : [];
    $innerBlocks = isset($parsed_block['innerBlocks']) ? $parsed_block['innerBlocks'] : [];
    $block_type = WP_Block_Type_Registry::get_instance()->get_registered($block->clientId);
    $posts = [];
    $responses = [];
    $blockArgs = [
      'blockId' => $blockId,
      'noPosts' => false
    ];
    // //* Visible condition
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }


    if ($wrapperSource == 'acfGallery') {
      $galleryItems = [];

      $SourceMetaKey = isset($wrapperSourcePrams['metaKey']) ? $wrapperSourcePrams['metaKey'] : "";
      $SourceMax = isset($wrapperSourcePrams['max']) ? $wrapperSourcePrams['max'] : "";
      $SourceReturnFormat = isset($wrapperSourcePrams['returnFormat']) ? $wrapperSourcePrams['returnFormat'] : "";
      $images = get_field($SourceMetaKey, get_the_id());

      if (is_array($images)) {
        foreach ($images as $image) {
          $attachment_post = get_post($image);

          $Id = isset($attachment_post->ID) ? $attachment_post->ID : '';
          $galleryItems[$Id] = [
            "id" => isset($attachment_post->ID) ? $attachment_post->ID : '',
            "title" => isset($attachment_post->post_title) ? $attachment_post->post_title : '',
            "description" => isset($attachment_post->post_excerpt) ? $attachment_post->post_excerpt : '',
            "url" => isset($attachment_post->guid) ? $attachment_post->guid : '',
            "name" => isset($attachment_post->post_name) ? $attachment_post->post_name : '',
          ];
        }
      }
    }
    if ($wrapperSource == 'imgUrls') {
      $galleryItems = [];

      $SourceContent = isset($wrapperSourcePrams['content']) ? $wrapperSourcePrams['content'] : "";
      $SourceMax = isset($wrapperSourcePrams['max']) ? $wrapperSourcePrams['max'] : "";

      $images = explode("\n", $SourceContent);

      if (is_array($images)) {
        foreach ($images as $image) {

          $imageData = explode("|", $image);

          $imageUrl = isset($imageData[0]) ? $imageData[0] : '';
          $imageTitle = isset($imageData[1]) ? $imageData[1] : '';
          $imageDescription = isset($imageData[2]) ? $imageData[2] : '';


          $galleryItems[$Id] = [
            "id" => "",
            "title" => $imageTitle,
            "description" => $imageDescription,
            "url" => $imageUrl,
          ];
        }
      }
    }




    if ($wrapperSource == 'customField') {
      $galleryItems = [];

      $SourceMetaKey = isset($wrapperSourcePrams['metaKey']) ? $wrapperSourcePrams['metaKey'] : "";
      $SourceMax = isset($wrapperSourcePrams['max']) ? $wrapperSourcePrams['max'] : "";
      $SourceType = isset($wrapperSourcePrams['type']) ? $wrapperSourcePrams['type'] : "";

      if ($SourceType == "arrayIds") {
        $images = get_post_meta(get_the_id(), $SourceMetaKey, true);
      }
      if ($SourceType == "commaSeparate") {
        $images = get_post_meta(get_the_id(), $SourceMetaKey, true);
        $images = explode(",", $images);
      }


      if (is_array($images)) {
        foreach ($images as $image) {
          $attachment_post = get_post($image);

          $Id = isset($attachment_post->ID) ? $attachment_post->ID : '';
          $galleryItems[$Id] = [
            "id" => isset($attachment_post->ID) ? $attachment_post->ID : '',
            "title" => isset($attachment_post->post_title) ? $attachment_post->post_title : '',
            "description" => isset($attachment_post->post_excerpt) ? $attachment_post->post_excerpt : '',
            "url" => isset($attachment_post->guid) ? $attachment_post->guid : '',
            "name" => isset($attachment_post->post_name) ? $attachment_post->post_name : '',
          ];
        }
      }
    }





    // //* Visible condition
    if (!empty($galleryItems)) {
      //return;
    }
    ob_start();
?>
    <?php
    if (!$itemsWrapExcluded) :
    ?>
      <div class="loop-loading"></div>
      <div class="<?php echo esc_attr($blockId); ?> pg-images items-loop" id="items-loop-<?php echo esc_attr($blockId); ?>" data-blockargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
      <?php
    endif;
      ?>
      <?php
      $counter = 1;
      if (!empty($galleryItems))
        foreach ($galleryItems as $index => $galleryItem) {
          $imageId = isset($galleryItem['id']) ? $galleryItem['id'] : "";
          $categories = isset($galleryItem['categories']) ? $galleryItem['categories'] : [];
          $categories_slug = $this->categories_slugs($categories);
          //if (empty($imageId)) continue;
          if ($counter % 2 == 0) {
            $odd_even_class = 'even';
          } else {
            $odd_even_class = 'odd';
          }
          $html = '';
          $filter_block_context = static function ($context) use ($imageId, $galleryItem, $categories, $index, $lightboxEnable, $blockId) {
            $context['imageId']   = $imageId;
            $context['imageData']   = $galleryItem;
            $context['loopIndex']   = $index;
            $context['galleryId']   = $blockId;
            $context['lightbox']   = $lightboxEnable;
            $context['categories']   = $categories;
            return $context;
          };
          add_filter('render_block_context', $filter_block_context, 1);
          foreach ($innerBlocks as $block) {
            //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
            $html .= render_block($block);
          }
          remove_filter('render_block_context', $filter_block_context, 1);
      ?>
        <<?php echo combo_blocks_tag_escape($itemWrapTag); ?> class=" 
            <?php echo esc_attr($itemWrapClass); ?>
            <?php ?>
            <?php if ($itemWrapCounterClass) {
              echo esc_attr("item-" . $counter);
            } ?>
            <?php if ($itemWrapOddEvenClass) {
              echo esc_attr($odd_even_class);
            } ?> 
            <?php if ($itemWrapTermsClass) {
              echo esc_attr($categories_slug);
            } ?> 
">
          <?php echo wp_kses_post($html);
          ?>
        </<?php echo combo_blocks_tag_escape($itemWrapTag); ?>>
      <?php
          $counter++;
        }
      ?>
      <?php
      if (!$itemsWrapExcluded) : ?>
      </div>
    <?php
      endif; ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksGalleryImages = new ComboBlocksGalleryImages();
