<?php
if (!defined('ABSPATH'))
  exit; // if direct access




function combo_blocks_parse_css_class($classStr, $obj)
{

  $matches = array();
  $t = preg_match_all('/{(.*?)\}/s', $classStr, $matches);




  $objType = $obj['type'];
  $objId = $obj['id'];

  if (empty($objType)) {
    // $active_plugins = get_option('active_plugins');

    if (is_front_page() && is_home()) {
    } elseif (is_front_page()) {
    } elseif (is_home()) {
    }
    // else if (in_array('woocommerce/woocommerce.php', (array) $active_plugins) && is_woocommerce() && is_shop()) {
    // } 
    elseif (is_singular()) {
      $objId = 'post';
    } elseif (is_tax()) {
    } else if (is_category()) {
    } else if (is_tag()) {
    } else if (is_author()) {
    } elseif (is_search()) {
    } else if (is_year()) {
    } else if (is_month()) {
    } else if (is_date()) {
    } elseif (is_404()) {
    }
  }

  $classArrIems = isset($matches[0]) ? $matches[0] : [];
  $classArr = isset($matches[1]) ? $matches[1] : [];


  $newArr = [];


  if (!empty($classArr))
    foreach ($classArr as $index => $item) {

      $index = isset($classArrIems[$index]) ? $classArrIems[$index] : $index;
      if (strpos($item, 'currentYear') !== false) {

        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = gmdate($format);
      } elseif (strpos($item, 'currentMonth') !== false) {

        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);

        $format = wp_kses_stripslashes($matches[1]);

        $newArr[$index] = gmdate($format);
      } elseif (strpos($item, 'currentDay') !== false) {

        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);


        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = gmdate($format);
      } elseif (strpos($item, 'currentDate') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);

        $format = wp_kses_stripslashes($matches[1]);

        $newArr[$index] = gmdate($format);
      } elseif (strpos($item, 'currentTime') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);

        $format = wp_kses_stripslashes($matches[1]);

        $newArr[$index] = gmdate($format);
      } elseif (strpos($item, 'postPublishDate') !== false) {

        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);

        $format = wp_kses_stripslashes($matches[1]);

        $newArr[$index] = gmdate($format);
      } elseif (strpos($item, 'postModifiedDate') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);

        $format = wp_kses_stripslashes($matches[1]);

        $newArr[$index] = gmdate($format);
      } elseif (strpos($item, 'postTagTitle') !== false) {

        $posttags = get_the_tags();
        if ($posttags != false) {
          $posttags = $posttags[0]->name;
          $newArr[$index] = str_replace('postTagTitle', $posttags, $item);
        }
      } elseif (strpos($item, 'postTagsTitle') !== false) {
        $posttags = get_the_tags();
        // $prams = str_replace(['postTagsTitle[\'', '\']'], '', $item);
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);

        // $format = wp_kses_stripslashes($matches[1]);
        $prams = explode(',', $matches[1]);
        $count = (int)wp_kses_stripslashes($prams[0]);
        $sep = wp_kses_stripslashes($prams[1]);
        if ($posttags != false) {
          $str = "";
          $i = 1;
          foreach ($posttags as $itemx) {
            $str .= $itemx->name . $sep;
            if ($i >= (int) $count)
              break;
            $i++;
          }
          $newArr[$index] = $str;
        }
      } elseif (strpos($item, 'postCategoryTitle') !== false) {
        $postcats = get_the_category();
        if ($postcats != false) {
          $postcats = $postcats[0]->name;
          $newArr[$index] = str_replace('postCategoryTitle', $postcats, $item);
        }
      } elseif (strpos($item, 'postCategoriesTitle') !== false) {
        $postcats = get_the_category();
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        // $prams = str_replace(['postCategoriesTitle[\'', '\']'], '', $item);
        $prams = explode(',', $matches[1]);
        $count = wp_kses_stripslashes($prams[0]);
        $sep = wp_kses_stripslashes($prams[1]);
        if ($postcats != false) {
          $str = '';
          $i = 1;
          foreach ($postcats as $itemx) {
            $str .= $itemx->name . $sep;
            if ($i >= (int) $count)
              break;
            $i++;
          }
          $newArr[$index] = $str;
        }
      } elseif (strpos($item, 'postTermTitle') !== false) {

        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);

        $format = wp_kses_stripslashes($matches[1]);

        $taxonomy = wp_kses_stripslashes($format);

        $postterms = get_the_terms($objId, $taxonomy);
        $newArr[$index] = $postterms[0]->name;
      } elseif (strpos($item, 'postTermsTitle') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $prams = explode(',', $matches[1]);
        $taxonomy = wp_kses_stripslashes($prams[0]);
        $count = wp_kses_stripslashes($prams[1]);
        $postterms = get_the_terms($objId, $taxonomy);
        if ($postterms != false) {
          $str = '';
          $i = 1;
          foreach ($postterms as $postterm) {
            $str .= $postterm->name . " ";
            if ($i >= (int) $count)
              break;
            $i++;
          }
          $newArr[$index] = $str;
        }
      } elseif (strpos($item, 'postSlug') !== false) {
        $postslug = get_post_field('post_name', get_post());
        $newArr[$index] = str_replace('postSlug', $postslug, $item);
      } elseif (strpos($item, 'postID') !== false) {

        $newArr[$index] = str_replace('postID', $objId, $item);
      } elseif (strpos($item, 'postStatus') !== false) {
        $poststatus = get_post_status();
        $newArr[$index] = str_replace('postStatus', $poststatus, $item);
      } elseif (strpos($item, 'authorId') !== false) {
        $postauthor = get_the_author_meta($field = 'ID');
        $newArr[$index] = str_replace('authorId', $postauthor, $item);
      } elseif (strpos($item, 'authorName') !== false) {
        $postauthor = get_the_author_meta($field = 'display_name');
        $newArr[$index] = str_replace('authorName', $postauthor, $item);
      } elseif (strpos($item, 'authorFirstName') !== false) {
        $postauthor = get_the_author_meta($field = 'first_name');
        $newArr[$index] = str_replace('authorFirstName', $postauthor, $item);
      } elseif (strpos($item, 'authorLastName') !== false) {
        $postauthor = get_the_author_meta($field = 'last_name');
        $newArr[$index] = str_replace('authorLastName', $postauthor, $item);
      } elseif (strpos($item, 'authorDescription') !== false) {
        $postauthor = get_the_author_meta($field = 'description');
        $newArr[$index] = str_replace('authorDescription', $postauthor, $item);
      } elseif (strpos($item, 'excerpt') !== false) {
        $excerpt = get_the_excerpt();
        $newArr[$index] = str_replace('expert', $excerpt, $item);
      } elseif (strpos($item, 'termId') !== false) {
        $queried_object = get_queried_object();
        $newArr[$index] = str_replace('termId', $queried_object->term_id, $item);
      } elseif (strpos($item, 'termTitle') !== false) {
        $queried_object = get_queried_object();
        $newArr[$index] = str_replace('termTitle', $queried_object->name, $item);
      } elseif (strpos($item, 'termDescription') !== false) {
        $queried_object = get_queried_object();
        $newArr[$index] = str_replace('termDescription', $queried_object->description, $item);
      } elseif (strpos($item, 'termPostCount') !== false) {
        $queried_object = get_queried_object();
        $newArr[$index] = str_replace('termPostCount', $queried_object->count, $item);
      } elseif (strpos($item, 'rankmathTitle') !== false) {


        $metaValue = get_post_meta($objId, 'rank_math_title', true);

        $newArr[$index] = str_replace('rankmathTitle', $metaValue, $item);
      } elseif (strpos($item, 'rankmathDescription') !== false) {
        $metaValue = get_post_meta($objId, 'rank_math_description', true);

        $newArr[$index] = str_replace('rankmathDescription', $metaValue, $item);
      } elseif (strpos($item, 'rankmathFocusKeyword') !== false) {
        $metaValue = get_post_meta($objId, 'rank_math_focus_keyword', true);

        $newArr[$index] = str_replace('rankmathFocusKeyword', $metaValue, $item);
      }
      // if (strpos($item, 'rankmathFocusKeywords') !== false) {
      //   $newArr[$index] = gmdate('h:i:sa');
      // }
      elseif (strpos($item, 'rankmathOrgname') !== false) {
        $data = get_option('rank-math-options-titles');
        $orgname = $data['knowledgegraph_name'];
        $newArr[$index] = str_replace('rankmathOrgname', $orgname, $item);
      } elseif (strpos($item, 'rankmathOrgurl') !== false) {
        $data = get_option('rank-math-options-titles');
        $url = $data['url'];
        $newArr[$index] = str_replace('rankmathOrgurl', $url, $item);
      } elseif (strpos($item, 'rankmathOrglogo') !== false) {
        $data = get_option('rank-math-options-titles');
        $logo = $data['knowledgegraph_logo'];
        $newArr[$index] = str_replace('rankmathOrglogo', $logo, $item);
      } elseif (strpos($item, 'siteTitle') !== false) {
        $siteinfo = get_bloginfo();
        $newArr[$index] = str_replace('siteTitle', $siteinfo, $item);
      } elseif (strpos($item, 'siteDescription') !== false) {
        $siteinfo = get_bloginfo('description');
        $newArr[$index] = str_replace('siteDescription', $siteinfo, $item);
      } elseif (strpos($item, 'postMeta') !== false) {

        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $key = wp_kses_stripslashes($matches[1]);
        $postmeta = get_post_meta($objId, $key);
        $newArr[$index] = isset($postmeta[0]) ? $postmeta[0] : '';
      } elseif (strpos($item, 'separator') !== false) {

        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = gmdate($format);
      } elseif (strpos($item, 'searchTerms') !== false) {
        $current_query = sanitize_text_field(get_query_var('s'));
        $newArr[$index] = str_replace('searchTerms', $current_query, $item);
      }
      // elseif (strpos($item, 'counter') !== false) {
      //   $newArr[$index] = gmdate('h:i:sa');

      // } 
      else {
        $newArr[$index] = $item;
      }
    }



  $str = strtr($classStr, $newArr);




  return $str;
}




add_filter('block_categories_all', 'combo_blocks_block_categories', 10, 2);


/**
 * Register custom category for blocks
 */

function combo_blocks_block_categories($categories, $context)
{

  if (!empty($categories)) {

    $inserted = array(


      array(
        'slug' => 'combo-blocks-post',
        'title' => __('Combo Blocks - Post Element', 'combo-blocks'),
      ),
      array(
        'slug' => 'combo-blocks-tools',
        'title' => __('Combo Blocks - Tools', 'combo-blocks'),
      ),
      array(
        'slug' => 'combo-blocks-woo',
        'title' => __('Combo Blocks - WooCommerce', 'combo-blocks'),
      ),
      array(
        'slug' => 'combo-blocks-archive',
        'title' => __('Combo Blocks - Archive', 'combo-blocks'),
      ),

    );

    array_splice($categories, 3, 0, $inserted); // splice in at position 3

    return $categories;

    // return array_merge(
    //     $categories,
    //     array(
    //         array(
    //             'slug'  => 'combo-blocks',
    //             'title' => __('Post Grid Combo', 'combo-blocks'),
    //         ),
    //         // array(
    //         //     'slug'  => 'combo-blocks-woo',
    //         //     'title' => __('Post Grid Combo - WooCommerce', 'combo-blocks'),
    //         // ),
    //     ),
    // );
  } else {
    return $categories;
  }
}






function combo_blocks_css_attr_parse($key)
{



  $cssProp = '';

  if ($key == 'alignContent') {
    $cssProp = 'align-content';
  } else if ($key == 'alignItems') {
    $cssProp = 'align-items';
  } else if ($key == 'alignSelf') {
    $cssProp = 'align-self';
  } else if ($key == 'aspectRatio') {
    $cssProp = 'aspect-ratio';
  } else if ($key == 'backfaceVisibility') {
    $cssProp = 'backface-visibility';
  } else if ($key == 'backgroundAttachment') {
    $cssProp = 'background-attachment';
  } else if ($key == 'backgroundBlendMode') {
    $cssProp = 'background-blend-mode';
  } else if ($key == 'backgroundClip') {
    $cssProp = 'background-clip';
  } else if ($key == 'bgColor') {
    $cssProp = 'background-color';
  } else if ($key == 'backgroundColor') {
    $cssProp = 'background-color';
  } else if ($key == 'backgroundOrigin') {
    $cssProp = 'background-origin';
  } else if ($key == 'backgroundRepeat') {
    $cssProp = 'background-repeat';
  } else if ($key == 'backgroundSize') {
    $cssProp = 'background-size';
  } else if ($key == 'backgroundPosition') {
    $cssProp = 'background-position';
  } else if ($key == 'backgroundImage') {
    $cssProp = 'background-image';
  } else if ($key == 'border') {
    $cssProp = 'border';
  } else if ($key == 'borderTop') {
    $cssProp = 'border-top';
  } else if ($key == 'borderRight') {
    $cssProp = 'border-right';
  } else if ($key == 'borderBottom') {
    $cssProp = 'border-bottom';
  } else if ($key == 'borderLeft') {
    $cssProp = 'border-left';
  } else if ($key == 'borderRadius') {
    $cssProp = 'border-radius';
  } else if ($key == 'borderCollapse') {
    $cssProp = 'border-collapse';
  } else if ($key == 'borderSpacing') {
    $cssProp = 'border-spacing';
  } else if ($key == 'borderImage') {
    $cssProp = 'border-image';
  } else if ($key == 'boxShadow') {
    $cssProp = 'box-shadow';
  } else if ($key == 'backdropFilter') {
    $cssProp = 'backdrop-filter';
  } else if ($key == 'bottom' || $key == 'top' || $key == 'left' || $key == 'right' || $key == 'clear' || $key == 'color' || $key == 'filter' || $key == 'float') {
    $cssProp = $key;
  } else if ($key == 'boxSizing') {
    $cssProp = 'box-sizing';
  } else if ($key == 'cursor') {
    $cssProp = 'cursor';
  } else if ($key == 'content') {
    $cssProp = 'content';
  } else if ($key == 'counterIncrement') {
    $cssProp = 'counter-increment';
  } else if ($key == 'counterReset') {
    $cssProp = 'counter-reset';
  } else if ($key == 'counterSet') {
    $cssProp = 'counter-set';
  } else if ($key == 'columnCount') {
    $cssProp = 'column-count';
  } else if ($key == 'columnRule') {
    $cssProp = 'column-rule';
  } else if ($key == 'direction') {
    $cssProp = 'direction';
  } else if ($key == 'fontFamily') {
    $cssProp = 'font-family';
  } else if ($key == 'fontSize') {
    $cssProp = 'font-size';
  } else if ($key == 'fontStyle') {
    $cssProp = 'font-style';
  } else if ($key == 'fontStretch') {
    $cssProp = 'font-stretch';
  } else if ($key == 'fontWeight') {
    $cssProp = 'font-weight';
  } else if ($key == 'fontVariantCaps') {
    $cssProp = 'font-variant-caps';
  } else if ($key == 'flexWrap') {
    $cssProp = 'flex-wrap';
  } else if ($key == 'flexDirection') {
    $cssProp = 'flex-direction';
  } else if ($key == 'flexGrow') {
    $cssProp = 'flex-grow';
  } else if ($key == 'flexShrink') {
    $cssProp = 'flex-shrink';
  } else if ($key == 'flexBasis') {
    $cssProp = 'flex-basis';
  } else if ($key == 'flexFlow') {
    $cssProp = 'flex-flow';
  } else if ($key == 'letterSpacing') {
    $cssProp = 'letter-spacing';
  } else if ($key == 'gridColumnEnd') {
    $cssProp = 'grid-column-end';
  } else if ($key == 'gridColumnStart') {
    $cssProp = 'grid-column-start';
  } else if ($key == 'gridRowEnd') {
    $cssProp = 'grid-row-end';
  } else if ($key == 'gridRowStart') {
    $cssProp = 'grid-row-start';
  } else if ($key == 'gridTemplateColumns') {
    $cssProp = 'grid-template-columns';
  } else if ($key == 'gridTemplateRows') {
    $cssProp = 'grid-template-rows';
  } else if ($key == 'listStyle') {
    $cssProp = 'list-style';
  } else if ($key == 'lineHeight') {
    $cssProp = 'line-height';
  } else if ($key == 'justifyContent') {
    $cssProp = 'justify-content';
  } else if ($key == 'objectFit') {
    $cssProp = 'object-fit';
  } else if ($key == 'opacity') {
    $cssProp = 'opacity';
  } else if ($key == 'outline') {
    $cssProp = 'outline';
  } else if ($key == 'order') {
    $cssProp = 'order';
  } else if ($key == 'outlineOffset') {
    $cssProp = 'outline-offset';
  } else if ($key == 'position') {
    $cssProp = 'position';
  } else if ($key == 'textIndent') {
    $cssProp = 'text-indent';
  } else if ($key == 'textJustify') {
    $cssProp = 'text-justify';
  } else if ($key == 'textTransform') {
    $cssProp = 'text-transform';
  } else if ($key == 'textDecoration') {
    $cssProp = 'text-decoration';
  } else if ($key == 'textOverflow') {
    $cssProp = 'text-overflow';
  } else if ($key == 'textShadow') {
    $cssProp = 'text-shadow';
  } else if ($key == 'textAlign') {
    $cssProp = 'text-align';
  } else if ($key == 'visibility') {
    $cssProp = 'visibility';
  } else if ($key == 'wordBreak') {
    $cssProp = 'word-break';
  } else if ($key == 'wordSpacing') {
    $cssProp = 'word-spacing';
  } else if ($key == 'zIndex') {
    $cssProp = 'z-index';
  } else if ($key == 'padding') {
    $cssProp = 'padding';
  } else if ($key == 'paddingTop') {
    $cssProp = 'padding-top';
  } else if ($key == 'paddingRight') {
    $cssProp = 'padding-right';
  } else if ($key == 'paddingBottom') {
    $cssProp = 'padding-bottom';
  } else if ($key == 'paddingLeft') {
    $cssProp = 'padding-left';
  } else if ($key == 'margin') {
    $cssProp = 'margin';
  } else if ($key == 'marginTop') {
    $cssProp = 'margin-top';
  } else if ($key == 'marginRight') {
    $cssProp = 'margin-right';
  } else if ($key == 'marginBottom') {
    $cssProp = 'margin-bottom';
  } else if ($key == 'marginLeft') {
    $cssProp = 'margin-left';
  } else if ($key == 'display') {
    $cssProp = 'display';
  } else if ($key == 'width') {
    $cssProp = 'width';
  } else if ($key == 'height') {
    $cssProp = 'height';
  } else if ($key == 'verticalAlign') {
    $cssProp = 'vertical-align';
  } else if ($key == 'overflow') {
    $cssProp = 'overflow';
  } else if ($key == 'overflowX') {
    $cssProp = 'overflow-x';
  } else if ($key == 'overflowY') {
    $cssProp = 'overflow-y';
  } else if ($key == 'writingMode') {
    $cssProp = 'writing-mode';
  } else if ($key == 'wordWrap') {
    $cssProp = 'word-wrap';
  } else if ($key == 'perspective') {
    $cssProp = 'perspective';
  } else if ($key == 'minWidth') {
    $cssProp = 'min-width';
  } else if ($key == 'minHeight') {
    $cssProp = 'min-height';
  } else if ($key == 'maxHeight') {
    $cssProp = 'max-height';
  } else if ($key == 'maxWidth') {
    $cssProp = 'max-width';
  } else if ($key == 'transition') {
    $cssProp = 'transition';
  } else if ($key == 'transform') {
    $cssProp = 'transform';
  } else if ($key == 'transformOrigin') {
    $cssProp = 'transform-origin';
  } else if ($key == 'transformStyle') {
    $cssProp = 'transform-style';
  } else if ($key == 'gap') {
    $cssProp = 'gap';
  } else if ($key == 'rowGap') {
    $cssProp = 'row-gap';
  } else if ($key == 'columnGap') {
    $cssProp = 'column-gap';
  } else if ($key == '-webkit-text-fill-color') {
    $cssProp = '-webkit-text-fill-color';
  } else {
    $cssProp = $key;
  }
  return $cssProp;
}













function combo_blocks_visible_parse($visible)
{

  $isVisible = true;
  $rules = isset($visible['rules']) ? $visible['rules'] : [];
  $GroupRelation = isset($visible['relation']) ? $visible['relation'] : 'OR';

  $conditions = [];
  //$conditions['relation'] = $GroupRelation;

  foreach ($rules as $i => $rule) {

    $relation = isset($rule['relation']) ? $rule['relation'] : 'OR';
    $args = isset($rule['args']) ? $rule['args'] : [];


    $conditions[$i]['relation'] = $relation;


    foreach ($args as $j => $arg) {

      $id = isset($arg['id']) ? $arg['id'] : '';



      $isAccess = false;

      if ($id == 'userLogged') {

        if (is_user_logged_in()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isUserLoggedIn') {

        if (is_user_logged_in()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }



      if ($id == 'userNotLogged') {

        if (!is_user_logged_in()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'userRoles') {
        $roles = isset($arg['roles']) ? $arg['roles'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';

        $user = wp_get_current_user();
        $user_role = (array) $user->roles;


        if ($compare == 'include') {
          $roleExist = !empty(array_intersect($user_role, $roles));
          if ($roleExist) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exclude') {
          $roleExist = empty(array_intersect($user_role, $roles));
          if ($roleExist) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'userIds') {
        $user = wp_get_current_user();
        $currentUserId = isset($user->ID) ? [$user->ID] : [];
        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';

        $userIds = explode(",", $value);




        $userIds = array_map(function ($a) {
          return (int)$a[0];
        }, $userIds);


        if ($compare == 'include') {
          $roleExist = !empty(array_intersect($currentUserId, $userIds));


          if ($roleExist) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exclude') {
          $roleExist = empty(array_intersect($currentUserId, $userIds));
          if ($roleExist) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }


        // if (in_array($currentUserId, $userIds)) {
        //   $isAccess = true;
        //   $conditions[$i]['args'][$j] = $isAccess;
        // } else {
        //   $conditions[$i]['args'][$j] = $isAccess;
        // }
      }
      if ($id == 'isYears') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? (int) $arg['value'] : '';

        $values = isset($arg['value']) ? explode(",", $arg['value']) : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';

        $curentYear = gmdate('Y');

        if ($compare == '=') {

          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {

          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {

          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {

          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {

          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';




          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isMonths') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? (int) $arg['value'] : '';

        $values = isset($arg['values']) ? $arg['values'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';




        // $curentYear = gmdate('m');
        $curentYear = gmdate('m');

        if ($compare == '=') {

          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {

          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {

          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {

          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {

          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';

          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'weekDays') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? (int) $arg['value'] : '';

        $values = isset($arg['values']) ? $arg['values'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';



        //$curentYear = gmdate('m');
        $curentYear = gmdate("w");



        if ($compare == '=') {

          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {

          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {

          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {

          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {

          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';

          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isHours') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? (int) $arg['value'] : '';

        $values = isset($arg['values']) ? $arg['values'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';

        $curentYear = gmdate("H");




        if ($compare == '=') {

          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {

          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {

          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {

          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {

          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';

          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isDate') {
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ?  $arg['value'] : '';

        $values = isset($arg['values']) ? $arg['values'] : [];
        $compare = isset($arg['compare']) ? $arg['compare'] : '';


        // $curentYears = gmdate('Y-m-d');
        $curentYear = gmdate("Y-m-d");





        if ($compare == '=') {

          if ($value == $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($value != $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {

          if ($value > $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {

          if ($value < $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {

          if ($value >= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {

          if ($value <= $curentYear) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'between') {
          $min = isset($values[0]) ? $values[0] : '';
          $max = isset($values[1]) ? $values[1] : '';

          if (($min <= $curentYear) && ($curentYear <= $max)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exist') {
          if (in_array($curentYear, $values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }






      if ($id == 'urlPrams') {

        $value = isset($arg['value']) ? $arg['value'] : '';
        $prams = explode(",", $value);

        $QUERY_STRING = isset($_SERVER['QUERY_STRING']) ? wp_unslash($_SERVER['QUERY_STRING']) : [];

        $queryArray = array();
        parse_str($QUERY_STRING, $queryArray);

        $pramExist = !empty(array_intersect($prams, array_keys($queryArray)));
        if ($pramExist) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'urlString') {

        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';

        $REQUEST_URI = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '';

        if ($compare == 'contain') {
          if (strpos($REQUEST_URI, $value) !== false) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'notContain') {
          if (strpos($REQUEST_URI, $value) !== false) {
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $isAccess = true;

            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }






      if ($id == 'referrerExist') {

        $value = isset($arg['value']) ? $arg['value'] : '';
        $prams = explode(",", $value);

        $referer = isset($_SERVER['HTTP_REFERER']) ? wp_unslash($_SERVER['HTTP_REFERER']) : '';



        if (in_array($referer, $prams)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isDevice') {
        $values = isset($arg['values']) ? $arg['values'] : [];

        if (!function_exists('wp_check_browser_version')) {
          include ABSPATH . "wp-admin/includes/dashboard.php";
        }



        //$ua = combo_blocks_getBrowser();
        $browesr = wp_check_browser_version();
        $name = $browesr['name'];
      }
      if ($id == 'isBrowsers') {
        $values = isset($arg['values']) ? $arg['values'] : [];

        if (!function_exists('wp_check_browser_version')) {
          include ABSPATH . "wp-admin/includes/dashboard.php";
        }



        //$ua = combo_blocks_getBrowser();
        $browesr = wp_check_browser_version();
        $name = $browesr['name'];





        if (in_array($name, $values)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isCountries') {
      }
      if ($id == 'postsIds') {

        if (is_single()) {
          $post_id = get_the_ID();
        }
      }
      if ($id == 'reviewXProducts') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $post_id = get_the_ID();

        $comments_count = wp_count_comments($post_id);
      }



      if ($id == 'termIds') {

        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_tax()) {
          $queried_object = get_queried_object();
          $term_id = $queried_object->term_id;

          if (in_array($term_id, $ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }





      if ($id == 'hasPostComments') {

        $post_id = get_the_ID();
        $args = array(
          'post_id' => $post_id,   // Use post_id, not post_ID
          'count'   => true // Return only the count
        );
        $comments_count = get_comments($args);


        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '=';

        if ($compare == '=') {
        }
        if ($compare == '!=') {
        }
        if ($compare == '>') {
        }
        if ($compare == '<') {
        }
        if ($compare == '>=') {
        }
        if ($compare == '<=') {
        }



        if ($comments_count > 0) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostTerms') {

        $post_id = get_the_ID();

        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (has_term($ids,  $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }








      if ($id == 'hasPostCategories') {

        $post_id = get_the_ID();

        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (has_category($ids,  $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostTags') {

        $post_id = get_the_ID();

        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (has_tag($ids,  $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostFormat') {

        $post_id = get_the_ID();

        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (has_post_format($ids,  $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }









      if ($id == 'authorIds') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_single()) {
          $post_id = get_the_ID();
          $post = get_post($post_id);
          $author_id = $post->post_author;


          if (in_array($author_id, $ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isHome') {


        if (is_front_page() && is_home()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isFrontPage') {

        if (is_front_page()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isBlog') {



        if (is_home()) {


          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }



      if ($id == 'is404') {
        if (is_404()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasMeta') {

        $post_id = get_the_ID();

        if (has_meta($post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasTermMeta') {

        $term_id  = get_the_ID();

        if (has_term_meta($term_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }


      if ($id == 'hasSiteIcon') {

        $blog_id = get_current_blog_id();

        if (has_site_icon($blog_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasCustomLogo') {

        $blog_id = get_current_blog_id();

        if (has_custom_logo($blog_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasHeaderImage') {


        if (has_header_image()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasHeaderVideo') {


        if (has_header_video()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasCustomHeader') {


        if (has_custom_header()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }




      if ($id == 'hasBlock') {
        $blockName = isset($arg['blockName']) ? $arg['blockName'] : '';

        $post_id = get_the_ID();

        if (has_block($blockName, $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasBlocks') {

        $post_id = get_the_ID();

        if (has_blocks($post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }


      if ($id == 'hasAction') {
        $hookName = isset($arg['hookName']) ? $arg['hookName'] : '';
        $callback = isset($arg['callback']) ? $arg['callback'] : '';

        $post_id = get_the_ID();

        if (has_action($hookName, $callback)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }

      if ($id == 'hasFilter') {
        $hookName = isset($arg['hookName']) ? $arg['hookName'] : '';
        $callback = isset($arg['callback']) ? $arg['callback'] : '';

        $post_id = get_the_ID();

        if (has_filter($hookName, $callback)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasShortcode') {
        $tag = isset($arg['tag']) ? $arg['tag'] : '';

        $post_id = get_the_ID();
        $post_content = get_the_content($post_id);

        if (has_shortcode($post_content, $tag)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'userCan' || $id == 'authorCan') {
        $capability = isset($arg['values']) ? $arg['values'] : [];
        $args = isset($arg['args']) ? $arg['args'] : '';
        $user = wp_get_current_user();
        $currentUserId = isset($user->ID) ? $user->ID : '';


        if (user_can($currentUserId, $capability[0], $args)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'authorCan') {
        $capability = isset($arg['capability']) ? $arg['capability'] : '';
        $args = isset($arg['args']) ? $arg['args'] : '';
        $user = wp_get_current_user();
        $currentUserId = isset($user->ID) ? $user->ID : '';


        if (author_can($currentUserId, $capability, $args)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }








      if ($id == 'wcisAccountPage') {

        if (function_exists('is_account_page')) {
          $account_id = wc_get_page_id('myaccount');
          $post_id = get_the_ID();

          if (is_account_page()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcShop') {

        if (function_exists('is_shop')) {
          $shop_id = wc_get_page_id('shop');
          $post_id = get_the_ID();

          if (is_shop()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcisCart') {

        if (function_exists('is_cart')) {
          $cart_id = wc_get_page_id('cart');
          $post_id = get_the_ID();

          if (is_cart()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcisCheckout') {

        if (function_exists('is_checkout')) {
          $cart_id = wc_get_page_id('cart');
          $post_id = get_the_ID();

          if (is_checkout()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcisOnSale') {
        $product_id = get_the_ID();
        $product = new WC_Product($product_id);


        if ($product->is_on_sale()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'wcisInStock') {
        //if (!is_singular('product')) return;
        $compare = isset($arg['compare']) ? $arg['compare'] : '';




        $product_id = get_the_ID();
        $product = new WC_Product($product_id);


        if ($compare == 'inStock') {
          if ($product->is_in_stock()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'outOfStock') {
          if (!$product->is_in_stock()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'onBackorder') {
          if ($product->is_on_backorder()) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'wcproductType') {
        if (!is_singular('product')) return;
        $product_id = get_the_ID();
        $product = new WC_Product($product_id);
        $value = isset($arg['value']) ? $arg['value'] : '';


        if ($product->get_type() == $value) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'wchasUpSells') {
        if (!is_singular('product')) return;

        $product_id = get_the_ID();

        if (empty($product_id)) return;
        $product = new WC_Product($product_id);
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? $arg['value'] : '';
        $values = explode(',', $value);
        $upsell_ids = $product->get_upsell_ids();


        if ($compare == "noUpsells") {
          if (empty($upsell_ids)) {

            if (!empty($upsell_ids)) {

              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
        }
        if ($compare == "hasUpsells") {

          if (!empty($upsell_ids)) {

            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }

        if (!empty($value)) {
          if ($compare == 'exist') {
            $upsellExist = !empty(array_intersect($values, $upsell_ids));

            if ($upsellExist) {

              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
          if ($compare == 'notExist') {
            $upsellExist = !empty(array_intersect($values, $upsell_ids));

            if (!$upsellExist) {
              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {


              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
        }
      }
      if ($id == 'wchasCrossSells') {
        if (!is_singular('product')) return;

        $product_id = get_the_ID();

        if (empty($product_id)) return;
        $product = new WC_Product($product_id);
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        $value = isset($arg['value']) ? $arg['value'] : '';
        $values = explode(',', $value);
        $upsell_ids = $product->get_cross_sell_ids();


        if ($compare == "noCrossSells") {
          if (empty($upsell_ids)) {

            if (!empty($upsell_ids)) {

              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
        }
        if ($compare == "hasCrossSells") {

          if (!empty($upsell_ids)) {

            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }

        if (!empty($value)) {
          if ($compare == 'exist') {
            $upsellExist = !empty(array_intersect($values, $upsell_ids));

            if ($upsellExist) {

              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {
              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
          if ($compare == 'notExist') {
            $upsellExist = !empty(array_intersect($values, $upsell_ids));

            if (!$upsellExist) {
              $isAccess = true;
              $conditions[$i]['args'][$j] = $isAccess;
            } else {


              $conditions[$i]['args'][$j] = $isAccess;
            }
          }
        }
      }


















      if ($id == 'hasPMproLevels') {

        $values = isset($arg['values']) ? $arg['values'] : [];

        if (function_exists('pmpro_hasMembershipLevel')) {
          if (pmpro_hasMembershipLevel($values)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'hasMeprMemberships') {

        $value = isset($arg['value']) ? $arg['value'] : '';
        $user_id = get_current_user_id();
        $mepr_user = new MeprUser($user_id);

        $mepr_user->is_already_subscribed_to($value); // true or false



        if ($mepr_user->is_already_subscribed_to($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }






      if ($id == 'isSearch') {


        if (is_search()) {
          $value = isset($arg['value']) ? $arg['value'] : '';
          $compare = isset($arg['compare']) ? $arg['compare'] : '';

          $query = get_search_query();

          if ($compare == '=' && $query == $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == '!=' && $query != $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == 'contain' && str_contains($query, $value)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == 'notContain' && !str_contains($query, $value)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == 'endWith' && str_ends_with($query, $value)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
          if ($compare == 'startWith' && str_starts_with($query, $value)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          }
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSingle') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (is_single($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSticky') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        //$ids = explode(',', $value);

        if (is_sticky($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPostHierarchical') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        //$ids = explode(',', $value);

        if (is_post_type_hierarchical($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPostArchive') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        //$ids = explode(',', $value);

        if (is_post_type_archive($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isCommentsOpen') {
        $post_id = get_the_ID();

        if (comments_open($post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPage') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);
        if (is_page($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPageTemplate') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        if (is_page_template($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isCategory') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (is_category($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTag') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (is_tag($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTax') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (is_tax($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isAuthor') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (is_author($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isMultiAuthor') {

        if (is_multi_author()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isDate') {

        if (is_date()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isYear') {

        if (is_year()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isMonth') {

        if (is_month()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isDay') {

        if (is_day()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTime') {

        if (is_time()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isNewDay') {

        if (is_new_day()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isArchive') {

        if (is_archive()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSearch') {

        if (is_search()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'is404') {

        if (is_404()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isAttachment') {

        if (is_attachment()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isSingular') {
        $values = isset($arg['values']) ? $arg['values'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';

        if ($compare == 'include') {
          if (is_singular($ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'exclude') {
          if (!is_singular($ids)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'hasTerm') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $ids = explode(',', $value);

        if (has_term($ids)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTaxonomyHierarchical') {
        $value = isset($arg['value']) ? $arg['value'] : '';

        if (is_taxonomy_hierarchical($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'taxonomyExists') {
        $value = isset($arg['value']) ? $arg['value'] : '';

        if (taxonomy_exists($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostParent') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $post_id = get_the_ID();

        if (has_post_parent($post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasPostFormat') {
        $format = isset($arg['format']) ? $arg['format'] : '';
        $post_id = get_the_ID();

        if (has_post_format($format, $post_id)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }





      if ($id == 'isMainQuery') {

        if (is_main_query()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isFeed') {

        if (is_feed()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isTrackback') {

        if (is_trackback()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isPreview') {

        if (is_preview()) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasExcerpt') {
        $value = isset($arg['value']) ? $arg['value'] : '';

        if (has_excerpt($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasNavMenu') {
        $value = isset($arg['value']) ? $arg['value'] : '';

        if (has_nav_menu($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }


      if ($id == 'isRtl') {
        $value = isset($arg['value']) ? $arg['value'] : '';

        if (is_rtl($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'hasCookie') {
        $cookieName = isset($arg['cookieName']) ? $arg['cookieName'] : '';
        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';


        if ($compare == '=') {
          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] == $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {

          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] != $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {
          $value = (int) $value;

          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] > $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          $value = (int) $value;

          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] < $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          $value = (int) $value;

          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] >= $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          $value = (int) $value;

          if (isset($_COOKIE[$cookieName]) && $_COOKIE[$cookieName] <= $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }










        if ($compare == 'exist') {

          if (isset($_COOKIE[$cookieName])) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }

        if ($compare == 'notExist') {

          if (!isset($_COOKIE[$cookieName])) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }



      if ($id == 'hasPostThumbnail') {
        $value = isset($arg['value']) ? $arg['value'] : '';

        if (has_post_thumbnail($value)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'isMainSite') {
        $siteId = isset($arg['siteId']) ? $arg['siteId'] : '';
        $networkId = isset($arg['networkId']) ? $arg['networkId'] : '';

        if (is_main_site($siteId, $networkId)) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
    }
  }




  $allowAccess = false;
  $allowAccessArr = [];
  $globalRelation = isset($conditions['relation']) ? $conditions['relation'] : 'OR';


  foreach ($conditions as $x => $conditionGroup) {

    $groupRelation = isset($conditionGroup['relation']) ? $conditionGroup['relation'] : 'OR';
    $args = isset($conditionGroup['args']) ? $conditionGroup['args'] : [];

    $res = array_unique($args);


    if ($groupRelation == "AND") {

      if (count($res) === 1 && $res[0]) {
        $allowAccessArr[$x] = true;
      } else {
        $allowAccessArr[$x] = false;
      }
    }

    if ($groupRelation == "OR") {
      if (in_array(true, $res)) {
        $allowAccessArr[$x] = true;
      } else {
        $allowAccessArr[$x] = false;
      }
    }
  }



  $accessRes = array_unique($allowAccessArr);

  if ($globalRelation == "AND") {

    if (count($accessRes) === 1 && $accessRes[0]) {
      $allowAccess = true;
    } else {
      $allowAccess = false;
    }
  }

  if ($globalRelation == "OR") {
    if (in_array(true, $accessRes)) {
      $allowAccess = true;
    } else {
      $allowAccess = false;
    }
  }


  return $allowAccess;
}




function combo_blocks_tag_escape($tag)
{
  $tag = strtolower(preg_replace('/[^a-zA-Z0-9-_:]/', '', $tag));


  $allowed_tags = ['section', 'strong', 'template', 'fieldset', 'figcaption', 'figure', 'blockquote', 'article', 'address', 'code', 'aside', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'a', 'button', 'table', 'tr', 'td', 'tbody', 'thead', 'tfoot', 'caption', 'br'];

  if (in_array($tag, $allowed_tags)) {
    return tag_escape($tag);
  } else {
    return 'div';
  }
}
