<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksUserQuery
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/user-query/block.json',
      array(
        'title' => "User Query",
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    wp_enqueue_style('font-awesome-5');
    global $comboBlocksCss;
    global $comboBlocksScriptData;
    global $PGUserQuery;
    global $ComboBlocksPostQuery;
    $block_instance = $block->parsed_block;
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $postGridId = isset($block->context['combo-blocks/postGridId']) ? $block->context['combo-blocks/postGridId'] : '';
    // $term_ID = isset($block->context['term_id']) ? $block->context['term_id'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $itemsWrap = isset($attributes['itemsWrap']) ? $attributes['itemsWrap'] : [];
    $itemsWrapOptions = isset($itemsWrap['options']) ? $itemsWrap['options'] : [];
    $itemsWrapExcluded = isset($itemsWrapOptions['excludedWrapper']) ? $itemsWrapOptions['excludedWrapper'] : false;
    /*#######itemWrap######*/
    $itemWrap = isset($attributes['itemWrap']) ? $attributes['itemWrap'] : [];
    $itemWrapOptions = isset($itemWrap['options']) ? $itemWrap['options'] : [];
    $itemWrapTag = isset($itemWrapOptions['tag']) ? $itemWrapOptions['tag'] : 'div';
    $itemWrapClass = isset($itemWrapOptions['class']) ? $itemWrapOptions['class'] : 'item';
    $itemWrapCounterClass = isset($itemWrapOptions['counterClass']) ? $itemWrapOptions['counterClass'] : false;
    $itemWrapOddEvenClass = isset($itemWrapOptions['oddEvenClass']) ? $itemWrapOptions['oddEvenClass'] : false;
    $itemWrapRoleClass = isset($itemWrapOptions['roleClass']) ? $itemWrapOptions['roleClass'] : false;
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
    $parsed_block = isset($block->parsed_block) ? $block->parsed_block : [];
    $innerBlocks = isset($parsed_block['innerBlocks']) ? $parsed_block['innerBlocks'] : [];
    $comboBlocksScriptData[$postGridId]['queryArgs'] = isset($queryArgs['items']) ? $queryArgs['items'] : [];
    $comboBlocksScriptData[$postGridId]['layout']['rawData'] = serialize_blocks($innerBlocks);
    $query_args = combo_blocks_parse_query_users(isset($queryArgs['items']) ? $queryArgs['items'] : []);
    // $query_args = apply_filters("combo_blocks_post_query_prams", $query_args, ["blockId" => $blockId]);


    $posts = [];
    $responses = [];
    $PGUserQuery = new WP_Query($query_args);
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
    // //* Visible condition
    ob_start();
?>
    <?php
    if (!$itemsWrapExcluded) :
    ?>
      <div class="loop-loading"></div>
      <div class="<?php echo esc_attr($blockId); ?> pg-user-query items-loop" id="items-loop-<?php echo esc_attr($blockId); ?>" data-blockargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
      <?php
    endif;
      ?>
      <?php
      $counter = 1;
      $get_users = get_users($query_args);
      foreach ($get_users as $index => $term) {
        $userId = isset($term->ID) ? $term->ID : "";
        $userRoles = isset($term->roles) ? $term->roles : [];
        $user_roles_class = implode(' ', $userRoles);


        $blocks = $innerBlocks;
        if ($counter % 2 == 0) {
          $odd_even_class = 'even';
        } else {
          $odd_even_class = 'odd';
        }
        $html = '';
        $filter_block_context = static function ($context) use ($userId, $term, $index, $blockId) {
          $context['userId']   = $userId;
          $context['queryId']   = $blockId;
          $context['loopIndex']   = $index;
          //$context['userData']   = $term;
          return $context;
        };
        add_filter('render_block_context', $filter_block_context, 1);
        foreach ($blocks as $block) {
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
            <?php if ($itemWrapRoleClass) {
              echo esc_attr($user_roles_class);
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
$ComboBlocksUserQuery = new ComboBlocksUserQuery();
