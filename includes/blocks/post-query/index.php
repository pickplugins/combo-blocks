<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksPostQuery
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/post-query/block.json',
      array(
        'title' => "Post Query",
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }




  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {


    global $comboBlocksCss;
    global $comboBlocksScriptData;
    global $postGridPrams;
    global $PGPostQuery;
    global $ComboBlocksPostQuery;
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $postGridId = isset($block->context['combo-blocks/postGridId']) ? $block->context['combo-blocks/postGridId'] : '';
    $container = isset($attributes['container']) ? $attributes['container'] : [];
    $containerOptions = isset($container['options']) ? $container['options'] : [];
    $containerClass = isset($containerOptions['class']) ? $containerOptions['class'] : '';
    $itemsWrap = isset($attributes['itemsWrap']) ? $attributes['itemsWrap'] : [];
    $itemsWrapOptions = isset($itemsWrap['options']) ? $itemsWrap['options'] : [];
    $itemsWrapExcluded = isset($itemsWrapOptions['excludedWrapper']) ? $itemsWrapOptions['excludedWrapper'] : false;
    /*#######itemWrap######*/
    $itemWrap = isset($attributes['itemWrap']) ? $attributes['itemWrap'] : [];
    $itemWrapOptions = isset($itemWrap['options']) ? $itemWrap['options'] : [];
    $itemWrapTag = isset($itemWrapOptions['tag']) ? $itemWrapOptions['tag'] : 'div';
    $itemWrapClass = isset($itemWrapOptions['class']) ? $itemWrapOptions['class'] : 'item';
    $itemWrapExcluded = isset($itemWrapOptions['excludedWrapper']) ? $itemWrapOptions['excludedWrapper'] : false;
    $itemWrapCounterClass = isset($itemWrapOptions['counterClass']) ? $itemWrapOptions['counterClass'] : false;
    $itemWrapTermsClass = isset($itemWrapOptions['termsClass']) ? $itemWrapOptions['termsClass'] : false;
    $itemWrapOddEvenClass = isset($itemWrapOptions['oddEvenClass']) ? $itemWrapOptions['oddEvenClass'] : false;
    /*#########$noPostsWrap#########*/
    $noPostsWrap = isset($attributes['noPostsWrap']) ? $attributes['noPostsWrap'] : [];
    $noPostsWrapOptions = isset($noPostsWrap['options']) ? $noPostsWrap['options'] : [];
    $grid = isset($attributes['grid']) ? $attributes['grid'] : [];
    $gridOptions = isset($grid['options']) ? $grid['options'] : [];
    $gridOptionsItemCss = isset($gridOptions['itemCss']) ? $gridOptions['itemCss'] : [];
    /*#######pagination######*/
    $pagination = isset($attributes['pagination']) ? $attributes['pagination'] : [];
    $paginationOptions = isset($pagination['options']) ? $pagination['options'] : [];
    $paginationType = isset($paginationOptions['type']) ? $paginationOptions['type'] : 'none';
    $queryArgs = isset($attributes['queryArgs']) ? $attributes['queryArgs'] : [];
    $overideGET = isset($queryArgs['overideGET']) ? $queryArgs['overideGET'] : false;
    $parsed_block = isset($block->parsed_block) ? $block->parsed_block : [];
    $innerBlocks = isset($parsed_block['innerBlocks']) ? $parsed_block['innerBlocks'] : [];
    $comboBlocksScriptData['queryArgs'] = isset($queryArgs['items']) ? $queryArgs['items'] : [];
    $comboBlocksScriptData['layout']['rawData'] = serialize_blocks($innerBlocks);
    $postGridPrams[$postGridId]['queryArgs'] = isset($queryArgs['items']) ? $queryArgs['items'] : [];
    $postGridPrams[$postGridId]['layout']['rawData'] = serialize_blocks($innerBlocks);



    $query_args = combo_blocks_parse_query_prams(isset($queryArgs['items']) ? $queryArgs['items'] : []);


    if ($overideGET) {
      if (!empty($query_args)) {
        foreach ($query_args as $query_key => $query_arg) {



          if (isset($_GET['_' . $query_key])) {

            $query_args[$query_key] = isset($_GET['_' . $query_key]) ? $_GET['_' . $query_key] : $query_arg;
          } else {
            $query_args[$query_key] = $query_arg;
          }
        }
      }
    }



    $query_args = apply_filters("combo_blocks_post_query_prams", $query_args, ["blockId" => $blockId]);
    if (array_key_exists('post_parent', $query_args)) {
      $post_parent_value = $query_args['post_parent'];
      if ($post_parent_value == '{ID}') {
        $post_id = get_the_id();
        $parent_id = wp_get_post_parent_id($post_id);
        $query_args['post_parent'] = $parent_id;
      }
    } else {
    }
    if (get_query_var('paged')) {
      $paged = get_query_var('paged');
    } elseif (get_query_var('page')) {
      $paged = get_query_var('page');
    } else {
      $paged = 1;
    }
    $posts = [];
    $responses = [];






    $PGPostQuery = new WP_Query($query_args);
    $blockArgs = [
      'blockId' => $blockId,
      'pagination' => [
        'page' => $paged,
      ],
      'noPosts' => false
    ];



    ob_start();
?>
    <?php
    if (!$itemsWrapExcluded) :
    ?>



      <div class="loop-loading"></div>
      <div class="<?php echo esc_attr($blockId); ?> pg-post-query items-loop"
        id="items-loop-<?php echo esc_attr($blockId); ?>" data-blockargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
      <?php
    endif;
      ?>
      <?php
      if ($PGPostQuery->have_posts()) :
        $counter = 1;
        while ($PGPostQuery->have_posts()) :
          $PGPostQuery->the_post();
          $post_id = get_the_id();
          $blocks = $innerBlocks;
          if ($itemWrapTermsClass) :
            $slug = combo_blocks_term_slug_list($post_id);
          endif;
          if ($counter % 2 == 0) {
            $odd_even_class = 'even';
          } else {
            $odd_even_class = 'odd';
          }
          $html = '';
          foreach ($blocks as $block) {
            //look to see if your block is in the post content -> if yes continue past it if no then render block as normal
            $html .= render_block($block);
          }



      ?>
          <?php if ($itemWrapExcluded) : ?>
          <?php else : ?>
            <<?php echo combo_blocks_tag_escape($itemWrapTag); ?> class="
            <?php echo esc_attr($itemWrapClass); ?>
            <?php if ($itemWrapTermsClass) {
              echo esc_attr($slug);
            } ?>
            <?php if ($itemWrapCounterClass) {
              echo esc_attr("item-" . $counter);
            } ?>
            <?php if ($itemWrapOddEvenClass) {
              echo esc_attr($odd_even_class);
            } ?> ">
            <?php endif; ?>
            <?php

            echo ($html);
            ?>
            <?php if ($itemWrapExcluded) : ?>
            <?php else : ?>
            </<?php echo combo_blocks_tag_escape($itemWrapTag); ?>>
          <?php endif; ?>
      <?php
          $counter++;
        endwhile;
        wp_reset_query();
        wp_reset_postdata();
      endif;
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
$BlockPostGrid = new ComboBlocksPostQuery();
