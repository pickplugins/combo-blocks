<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksPostQueryPagination
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/post-query-pagination/block.json',
      array(
        'title' => "Post Query - Pagination",
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/post-query-pagination')) {
      wp_enqueue_style('font-awesome-5');
    }
    global $comboBlocksCss;
    global $comboBlocksScriptData;
    global $PGPostQuery;
    global $postGridPrams;

    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $postGridId = isset($block->context['combo-blocks/postGridId']) ? $block->context['combo-blocks/postGridId'] : '';
    /*#######pagination######*/
    $pagination = isset($attributes['pagination']) ? $attributes['pagination'] : [];
    $paginationOptions = isset($pagination['options']) ? $pagination['options'] : [];
    $paginationType = isset($paginationOptions['type']) ? $paginationOptions['type'] : 'none';
    $loadMoreText = isset($paginationOptions['loadMoreText']) ? $paginationOptions['loadMoreText'] : __('Load More', 'combo-blocks');
    $loadingText = isset($paginationOptions['loadingText']) ? $paginationOptions['loadingText'] : __('Loading...', 'combo-blocks');
    $noMorePosts = isset($paginationOptions['noMorePosts']) ? $paginationOptions['noMorePosts'] : __('No More Posts', 'combo-blocks');
    $loadingIcon = isset($paginationOptions['loadingIcon']) ? $paginationOptions['loadingIcon'] : [];
    $loadingPosition = isset($loadingIcon['loadingPosition']) ? $loadingIcon['loadingPosition'] : "";
    $loadingIconLibrary = isset($loadingIcon['library']) ? $loadingIcon['library'] : "fontAwesome";
    $loadingIconSrc = isset($loadingIcon['iconSrc']) ? $loadingIcon['iconSrc'] : "fas fa-spinner";
    $loadingIconSrcType = isset($loadingIcon['srcType']) ? $loadingIcon['srcType'] : "class";
    $loadingIconClass = isset($loadingIcon['class']) ? $loadingIcon['class'] : '';
    $loadMoreIcon = isset($paginationOptions['loadMoreIcon']) ? $paginationOptions['loadMoreIcon'] : [];
    $loadMorePosition = isset($loadMoreIcon['position']) ? $loadMoreIcon['position'] : "";
    $loadMoreIconLibrary = isset($loadMoreIcon['library']) ? $loadMoreIcon['library'] : "fontAwesome";
    $loadMoreIconSrc = isset($loadMoreIcon['iconSrc']) ? $loadMoreIcon['iconSrc'] : "fas fa-spinner";
    $loadMoreIconSrcType = isset($loadMoreIcon['srcType']) ? $loadMoreIcon['srcType'] : "class";
    $loadMoreIconClass = isset($loadMoreIcon['class']) ? $loadMoreIcon['class'] : '';
    $prevText = isset($paginationOptions['prevText']) ? $paginationOptions['prevText'] : __('Previous', 'combo-blocks');
    $nextText = isset($paginationOptions['nextText']) ? $paginationOptions['nextText'] : __('Previous', 'combo-blocks');
    $maxPageNum = isset($paginationOptions['maxPageNum']) ? $paginationOptions['maxPageNum'] : 0;
    $previous = isset($attributes['previous']) ? $attributes['previous'] : '';
    $previousOptions = isset($previous['options']) ? $previous['options'] : [];
    $previousLibrary = isset($previousOptions['library']) ? $previousOptions['library'] : '';
    $previousSrcType = isset($previousOptions['srcType']) ? $previousOptions['srcType'] : '';
    $previousSrc = isset($previousOptions['iconSrc']) ? $previousOptions['iconSrc'] : '';
    $previousPosition = isset($previousOptions['position']) ? $previousOptions['position'] : '';
    $previousClass = isset($previousOptions['class']) ? $previousOptions['class'] : '';
    $next = isset($attributes['next']) ? $attributes['next'] : '';
    $nextOptions = isset($next['options']) ? $next['options'] : [];
    $nextLibrary = isset($nextOptions['library']) ? $nextOptions['library'] : '';
    $nextSrcType = isset($nextOptions['srcType']) ? $nextOptions['srcType'] : '';
    $nextSrc = isset($nextOptions['iconSrc']) ? $nextOptions['iconSrc'] : '';
    $nextPosition = isset($nextOptions['position']) ? $nextOptions['position'] : '';
    $nextClass = isset($nextOptions['class']) ? $nextOptions['class'] : '';
    $start = isset($attributes['start']) ? $attributes['start'] : '';
    $startOptions = isset($start['options']) ? $start['options'] : [];
    $startLibrary = isset($startOptions['library']) ? $startOptions['library'] : '';
    $startSrcType = isset($startOptions['srcType']) ? $startOptions['srcType'] : '';
    $startSrc = isset($startOptions['iconSrc']) ? $startOptions['iconSrc'] : '';
    $startPosition = isset($startOptions['position']) ? $startOptions['position'] : '';
    $startClass = isset($startOptions['class']) ? $startOptions['class'] : '';
    $end = isset($attributes['end']) ? $attributes['end'] : '';
    $endOptions = isset($end['options']) ? $end['options'] : [];
    $endLibrary = isset($endOptions['library']) ? $endOptions['library'] : '';
    $endSrcType = isset($endOptions['srcType']) ? $endOptions['srcType'] : '';
    $endSrc = isset($endOptions['iconSrc']) ? $endOptions['iconSrc'] : '';
    $endPosition = isset($endOptions['position']) ? $endOptions['position'] : '';
    $endClass = isset($endOptions['class']) ? $endOptions['class'] : '';
    if (
      $previousLibrary == 'fontAwesome' ||
      $nextLibrary == 'fontAwesome' ||
      $startLibrary == 'fontAwesome'
      || $endLibrary == 'fontAwesome'
      || $loadingIconLibrary == 'fontAwesome'
    ) {
      wp_enqueue_style('fontawesome-icons');
    } else if (
      $previousLibrary == 'iconFont' ||
      $nextLibrary == 'iconFont' ||
      $startLibrary == 'iconFont'
      || $endLibrary == 'iconFont'
      || $loadingIconLibrary == 'iconFont'
    ) {
      wp_enqueue_style('icofont-icons');
    } else if (
      $previousLibrary == 'bootstrap' ||
      $nextLibrary == 'bootstrap' ||
      $startLibrary == 'bootstrap'
      || $endLibrary == 'bootstrap'
      || $loadingIconLibrary == 'bootstrap'
    ) {
      wp_enqueue_style('bootstrap-icons');
    }
    $fontPreviousHtml = '<span class="' . $previousClass . ' ' . $previousSrc . '"></span>';
    $fontNextHtml = '<span class="' . $nextClass . ' ' . $nextSrc . '"></span>';
    $fontStartHtml = '<span class="' . $startClass . ' ' . $startSrc . '"></span>';
    $fontEndHtml = '<span class="' . $endClass . ' ' . $endSrc . '"></span>';
    $fontLoadingIconHtml = '<span class="' . $loadingIconClass . ' ' . $loadingIconSrc . '"></span>';
    $fontLoadMoreIconHtml = '<span class="' . $loadMoreIconClass . ' ' . $loadMoreIconSrc . '"></span>';
    $layout = isset($attributes['layout']) ? $attributes['layout'] : [];
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : ['items' => []];
    $comboBlocksCss[] = isset($blockCssY["items"]) ? $blockCssY["items"] : [];
    ob_start();
    if (get_query_var('paged')) {
      $paged = get_query_var('paged');
    } elseif (get_query_var('page')) {
      $paged = get_query_var('page');
    } else {
      $paged = 1;
    }
    $postGridPrams[$postGridId]['pagination']['type'] = $paginationType;
    $postGridPrams[$postGridId]['pagination']['prevText'] = $prevText;
    $postGridPrams[$postGridId]['pagination']['nextText'] = $nextText;
    $postGridPrams[$postGridId]['pagination']['maxPageNum'] = $maxPageNum;
    $postGridPrams[$postGridId]['pagination']['noMorePosts'] = $noMorePosts;
    $postGridPrams[$postGridId]['pagination']['loadMoreText'] = $loadMoreText;
    $postGridPrams[$postGridId]['pagination']['loadingText'] = $loadingText;
    $postGridPrams[$postGridId]['pagination']['loadingPosition'] = $loadingPosition;
    $postGridPrams[$postGridId]['pagination']['loadMorePosition'] = $loadMorePosition;

    $postGridPrams[$postGridId]['pagination']['page'] = $paged;
    $postGridPrams[$postGridId]['pagination']['loadingIcon'] = '<i class="loademore-icon ' . $loadingIconSrc . '"></i>';
    $postGridPrams[$postGridId]['pagination']['loadMoreIcon'] = '<i class="loademore-icon ' . $loadMoreIconSrc . '"></i>';


    $blockArgs = [
      'blockId' => $postGridId,

    ];
    $max_num_pages = isset($PGPostQuery->max_num_pages) ? $PGPostQuery->max_num_pages : 0;;
    if ($previousPosition == "beforeText") {
      $prevText = $fontPreviousHtml . $prevText;
    } elseif ($previousPosition == "afterText") {
      $prevText = $prevText . $fontPreviousHtml;
    } else {
      $prevText;
    }
    if ($nextPosition == "beforeText") {
      $nextText = $fontNextHtml . $nextText;
    } elseif ($nextPosition == "afterText") {
      $nextText = $nextText . $fontNextHtml;
    } else {
      $nextText;
    }
?>
    <?php if ($paginationType == 'normal') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <?php
        $big = 999999999; // need an unlikely integer
        $pages = paginate_links(
          array(
            'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format' => '?paged=%#%',
            'current' => max(1, $paged),
            'total' => $max_num_pages,
            'prev_text' => $prevText,
            'next_text' => $nextText,
            'type' => 'array',
          )
        );
        if (!empty($pages)) :
          foreach ($pages as $page) {
            echo wp_kses_post($page);
          }
        endif;
        ?>
      </div>
    <?php endif; ?>
    <?php if ($paginationType == 'ajax') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <?php
        $big = 999999999; // need an unlikely integer
        $pages = paginate_links(
          array(
            'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format' => '?paged=%#%',
            'current' => max(1, $paged),
            'total' => $max_num_pages,
            'prev_text' => $prevText,
            'next_text' => $nextText,
            'type' => 'array',
          )
        );
        if (!empty($pages)) :
          foreach ($pages as $page) {
            echo wp_kses_post($page);
          }
        endif;
        ?>
      </div>
    <?php endif; ?>
    <?php if ($paginationType == 'filterable') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="<?php echo esc_attr($blockId); ?>  pagination ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?> pager-list mixitup-page-list pager-list-<?php echo esc_attr($postGridId); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
      </div>
    <?php endif; ?>
    <?php if ($paginationType == 'next_previous') :
      if ($max_num_pages) {
    ?>
        <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
          <a class="page-numbers" href="<?php echo esc_url(get_previous_posts_page_link()); ?>">
            <?php echo wp_kses_post($prevText); ?>
          </a>
          <a class="page-numbers" href="<?php echo esc_url(get_next_posts_page_link()); ?>">
            <?php echo wp_kses_post($nextText); ?>
          </a>
        </div>
      <?php
      }
      ?>
    <?php endif; ?>
    <?php if ($paginationType == 'loadmore') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <div class="page-numbers">
          <?php if ($loadMorePosition == 'beforeText') : ?>
            <?php echo wp_kses_post($fontLoadMoreIconHtml); ?>
          <?php endif; ?>
          <?php echo wp_kses_post($loadMoreText); ?>
          <?php if ($loadMorePosition == 'afterText') : ?>
            <?php echo wp_kses_post($fontLoadMoreIconHtml); ?>
          <?php endif; ?>
        </div>
      </div>
    <?php endif; ?>
    <?php if ($paginationType == 'infinite') : ?>
      <div id="pagination-<?php echo esc_attr($blockId); ?>" class="pagination <?php echo esc_attr($blockId); ?> ComboBlocksPostGrid-pagination <?php echo esc_attr($paginationType); ?>" data-postqueryargs="<?php echo esc_attr(json_encode($blockArgs)); ?>">
        <div class="infinite-loader box">
          <?php echo __('Loading...', 'combo-blocks'); ?>
        </div>
      </div>
    <?php endif; ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksPostQueryPagination = new ComboBlocksPostQueryPagination();
