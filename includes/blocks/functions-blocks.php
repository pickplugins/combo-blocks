<?php
if (!defined('ABSPATH'))
  exit; // if direct access



add_action('wp_print_footer_scripts', function () {

  global $comboBlocksVars;
?>
  <script>
    <?php

    $combo_blocks_blocks_vars =  wp_json_encode($comboBlocksVars);
    echo "var combo_blocks_blocks_vars=" . $combo_blocks_blocks_vars;
    ?>
  </script>
  <?php
});








register_meta('post', 'pgc_meta', [
  'type' => 'string',
  'single' => true,
  'show_in_rest' => true,
]);
function combo_blocks_parse_attributes_arr($attrArr)
{
  $linkAttrStr = "";
  if (!empty($attrArr)) {
    foreach ($attrArr as $attr) {
      $attrId = isset($attr["id"]) ? $attr["id"] : '';
      $attrVal = isset($attr["val"]) ? $attr["val"] : '';
      if (!empty($attr["val"])) {
        $linkAttrStr .= esc_attr($attrId) . '="' . esc_attr($attrVal) . '" ';
      }
    };
  }
  return $linkAttrStr;
}
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
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'currentMonth') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'currentDay') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'currentDate') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'currentTime') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'postPublishDate') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'postModifiedDate') !== false) {
        $matches = [];
        preg_match('/\["(.*?)\"]/s', $item, $matches);
        $format = wp_kses_stripslashes($matches[1]);
        $newArr[$index] = date($format);
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
      } elseif (strpos($item, 'tutorLmsTotalEnrolled') !== false) {
        $TotalEnrolled = 0;
        if (function_exists("tutor_utils")) {
          $TotalEnrolled = tutor_utils()->count_enrolled_users_by_course();
        }
        $newArr[$index] = str_replace('tutorLmsTotalEnrolled', $TotalEnrolled, $item);
      } elseif (strpos($item, 'tutorLmsCourseDuration') !== false) {
        $course_duration = 0;
        if (function_exists("get_tutor_course_duration_context")) {
          $course_duration = "";
          if (function_exists("get_tutor_course_duration_context")) {
            $course_duration = get_tutor_course_duration_context();
          }
        }
        $newArr[$index] = str_replace('tutorLmsCourseDuration', $course_duration, $item);
      } elseif (strpos($item, 'tutorLmsLastUpdated') !== false) {
        $modified_date = get_the_modified_date(get_option('date_format'));

        $newArr[$index] = str_replace('tutorLmsLastUpdated', $modified_date, $item);
      } elseif (strpos($item, 'tutorLmsCourseLevel') !== false) {
        $course_level = "";
        if (function_exists("get_tutor_course_level")) {
          $course_level = get_tutor_course_level(get_the_ID());
        }


        $newArr[$index] = str_replace('tutorLmsCourseLevel', $course_level, $item);
      } elseif (strpos($item, 'tutorLmsCourseProgressTotal') !== false) {
        $course_id           = get_the_ID();
        $course_progress = [];
        if (function_exists("tutor_utils")) {
          $course_progress     = tutor_utils()->get_course_completed_percent($course_id, 0, true);
        }

        $total_count = isset($course_progress['total_count']) ? $course_progress['total_count'] : '';
        $newArr[$index] = str_replace('tutorLmsCourseProgressTotal', $total_count, $item);
      } elseif (strpos($item, 'tutorLmsCourseProgressCompleted') !== false) {
        $course_id           = get_the_ID();

        $course_progress = [];
        if (function_exists("tutor_utils")) {
          $course_progress     = tutor_utils()->get_course_completed_percent($course_id, 0, true);
        }

        $completed_count = isset($course_progress['completed_count']) ? $course_progress['completed_count'] : '';
        $newArr[$index] = str_replace('tutorLmsCourseProgressCompleted', $completed_count, $item);
      } elseif (strpos($item, 'tutorLmsCourseLessonCount') !== false) {
        $course_id           = get_the_ID();
        $lesson_count = 0;
        if (function_exists("tutor_utils")) {
          $lesson_count     = tutor_utils()->get_lesson_count_by_course($course_id);
        }
        $newArr[$index] = str_replace('tutorLmsCourseLessonCount', $lesson_count, $item);
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
      //   $newArr[$index] = date('h:i:sa');
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
        $newArr[$index] = date($format);
      } elseif (strpos($item, 'searchTerms') !== false) {
        $current_query = sanitize_text_field(get_query_var('s'));
        $newArr[$index] = str_replace('searchTerms', $current_query, $item);
      }
      // elseif (strpos($item, 'counter') !== false) {
      //   $newArr[$index] = date('h:i:sa');
      // } 
      else {
        $newArr[$index] = $item;
      }
    }
  $str = strtr($classStr, $newArr);
  return $str;
}
function combo_blocks_parse_css_classX($classStr, $obj)
{
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
  $classArr = explode(' ', $classStr);
  $newArr = [];
  foreach ($classArr as $index => $item) {
    if (strpos($item, 'currentYear') !== false) {
      $matches = array();
      $t = preg_match('/{(.*?)\}/s', $item, $matches);
      $id = isset($matches[1]) ? $matches[1] : "";
      $prams = str_replace(['currentYear[\'', '\']'], '', $id);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      //$newArr[$index] = date($format);
      $newArr[$index] = str_replace("{" . $id . "}", date($format), $item);
    } elseif (strpos($item, 'currentMonth') !== false) {
      $params = str_replace(['currentMonth[\'', '\']'], '', $item);
      $params = explode(',', $params);
      $format = wp_kses_stripslashes($params[0]);
      $newArr[$index] = date($format);
    } elseif (strpos($item, 'currentDay') !== false) {
      $params = str_replace(['currentDay[\'', '\']'], '', $item);
      $params = explode(',', $params);
      $format = wp_kses_stripslashes($params[0]);
      $newArr[$index] = date($format);
    } elseif (strpos($item, 'currentDate') !== false) {
      $prams = str_replace(['currentDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = date($format);
    } elseif (strpos($item, 'currentTime') !== false) {
      $prams = str_replace(['currentTime[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = date($format);
    } elseif (strpos($item, 'postPublishDate') !== false) {
      $prams = str_replace(['postPublishDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = get_the_date($format, $objId);
    } elseif (strpos($item, 'postModifiedDate') !== false) {
      $prams = str_replace(['postModifiedDate[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $format = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = get_the_modified_date($format, $objId);
    } elseif (strpos($item, 'postTagTitle') !== false) {
      $posttags = get_the_tags();
      if ($posttags != false) {
        $posttags = $posttags[0]->name;
        $newArr[$index] = str_replace('postTagTitle', $posttags, $item);
      }
    } elseif (strpos($item, 'postTagsTitle') !== false) {
      $posttags = get_the_tags();
      $prams = str_replace(['postTagsTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $count = wp_kses_stripslashes($prams[0]);
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
      $prams = str_replace(['postCategoriesTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $count = wp_kses_stripslashes($prams[0]);
      if ($postcats != false) {
        $str = '';
        $i = 1;
        foreach ($postcats as $itemx) {
          $str .= $itemx->name . " ";
          if ($i >= (int) $count)
            break;
          $i++;
        }
        $newArr[$index] = $str;
      }
    } elseif (strpos($item, 'postTermTitle') !== false) {
      $prams = str_replace(['postTermTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $taxonomy = wp_kses_stripslashes($prams[0]);
      $postterms = get_the_terms($objId, $taxonomy);
      $newArr[$index] = $postterms[0]->name;
    } elseif (strpos($item, 'postTermsTitle') !== false) {
      $prams = str_replace(['postTermsTitle[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
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
    //   $newArr[$index] = date('h:i:sa');
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
      $prams = str_replace(['postMeta[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $key = wp_kses_stripslashes($prams[0]);
      $postmeta = get_post_meta($objId, $key);
      $newArr[$index] = isset($postmeta[0]) ? $postmeta[0] : '';
    } elseif (strpos($item, 'separator') !== false) {
      $prams = str_replace(['separator[\'', '\']'], '', $item);
      $prams = explode(',', $prams);
      $separator = wp_kses_stripslashes($prams[0]);
      $newArr[$index] = $separator;
    } elseif (strpos($item, 'searchTerms') !== false) {
      $current_query = sanitize_text_field(get_query_var('s'));
      $newArr[$index] = str_replace('searchTerms', $current_query, $item);
    }
    // elseif (strpos($item, 'counter') !== false) {
    //   $newArr[$index] = date('h:i:sa');
    // } 
    else {
      $newArr[$index] = $item;
    }
  }
  return join(' ', $newArr);
}
function combo_blocks_parse_query_prams($queryArgs)
{
  $query_args = [];
  foreach ($queryArgs as $item) {
    $id = isset($item['id']) ? $item['id'] : '';
    $val = isset($item['val']) ? $item['val'] : '';
    if (isset($item['val'])) {
      if ($id == 'postType') {
        $query_args['post_type'] = $val;
      } elseif ($id == 'postStatus') {
        $query_args['post_status'] = $val;
      } elseif ($id == 'order') {
        $query_args['order'] = $val;
      } elseif ($id == 'orderby') {
        $query_args['orderby'] = implode(' ', $val);
      } elseif ($id == 'metaKey') {
        $query_args['meta_key'] = $val;
      } elseif ($id == 'dateQuery') {
        $date_query = [];
        foreach ($val as $arg) {
          $id = isset($arg['id']) ? $arg['id'] : '';
          $value = isset($arg['value']) ? $arg['value'] : '';
          if ($id == 'year' || $id == 'month' || $id == 'week' || $id == 'day' || $id == 'hour' || $id == 'minute' || $id == 'second') {
            $compare = isset($arg['compare']) ? $arg['compare'] : '';
            if (!empty($value))
              $date_query[] = [$id => $value, 'compare' => $compare,];
          }
          if ($id == 'inclusive' || $id == 'compare' || $id == 'relation') {
            if (!empty($value))
              $date_query[$id] = $value;
          }
          if ($id == 'after' || $id == 'before') {
            $year = isset($arg['year']) ? $arg['year'] : '';
            $month = isset($arg['month']) ? $arg['month'] : '';
            $day = isset($arg['day']) ? $arg['day'] : '';
            if (!empty($year))
              $date_query[$id]['year'] = $year;
            if (!empty($month))
              $date_query[$id]['month'] = $month;
            if (!empty($day))
              $date_query[$id]['day'] = $day;
          }
        }
        $query_args['date_query'] = $date_query;
      } elseif ($id == 'year') {
        $query_args['year'] = $val;
      } elseif ($id == 'monthnum') {
        $query_args['monthnum'] = $val;
      } elseif ($id == 'w') {
        $query_args['w'] = $val;
      } elseif ($id == 'day') {
        $query_args['day'] = $val;
      } elseif ($id == 'hour') {
        $query_args['hour'] = $val;
      } elseif ($id == 'minute') {
        $query_args['minute'] = $val;
      } elseif ($id == 'second') {
        $query_args['second'] = $val;
      } elseif ($id == 'm') {
        $query_args['m'] = $val;
      } elseif ($id == 'author') {
        $query_args['author'] = $val;
      } elseif ($id == 'authorName') {
        $query_args['author_name'] = $val;
      } elseif ($id == 'authorIn') {

        $author_ids = explode(',', $val);
        $author_ids = array_map(function ($a) {
          return (int) $a;
        }, $author_ids);

        $query_args['author_in'] = !empty($val) ? $author_ids : [];
      } elseif ($id == 'authorNotIn') {
        $query_args['author__not_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'cat') {
        $query_args['cat'] = $val;
      } elseif ($id == 'categoryName') {


        $query_args['category_name'] = $val;
      } elseif ($id == 'categoryAnd') {

        if ($val == '{currentPostCategoryAnd}') {
          if (is_singular()) {
            $post_id = get_the_id();
            $category_ids = wp_get_post_categories($post_id, ['fields' => 'ids']);
            $query_args['category_and'] = !empty($val) ? explode(',', $val) : [];
          }
        } else {
          $query_args['category_and'] = !empty($val) ? explode(',', $val) : [];
        }
      } elseif ($id == 'categoryIn') {

        if ($val == '{currentPostCategoryIn}') {
          if (is_singular()) {
            $post_id = get_the_id();
            $category_ids = wp_get_post_categories($post_id, ['fields' => 'ids']);
            $query_args['category__in'] = !empty($category_ids) ? $category_ids : [];
          }
        } else {
          $query_args['category__in'] = !empty($val) ? explode(',', $val) : [];
        }
      } elseif ($id == 'categoryNotIn') {

        if ($val == '{currentPostCategoryNotIn}') {
          if (is_singular()) {
            $post_id = get_the_id();
            $category_ids = wp_get_post_categories($post_id, ['fields' => 'ids']);
            $query_args['category__not_in'] = !empty($val) ? explode(',', $val) : [];
          }
        } else {
          $query_args['category__not_in'] = !empty($val) ? explode(',', $val) : [];
        }
      } elseif ($id == 'tag') {
        $query_args['tag'] = $val;
      } elseif ($id == 'tagId') {
        $query_args['tag_id'] = $val;
      } elseif ($id == 'tagAnd') {
        $query_args['tag__and'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'tagIn') {
        $post_id = get_the_id();
        $tag_ids = wp_get_post_tags($post_id, array('fields' => 'ids'));
        $query_args['tag__in'] = !empty($val) ? explode(',', $val) : $tag_ids;
      } elseif ($id == 'tagNotIn') {
        $query_args['tag__not_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'tagSlugAnd') {
        $query_args['tag_slug__and'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'tagSlugIn') {
        $query_args['tag_slug__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'taxQuery') {
        $query_args['tax_query'] = isset($val[0]) ? $val[0] : $val;
      } elseif ($id == 'p') {
        $query_args['p'] = $val;
      } elseif ($id == 's') {

        //if (!empty($val))
        $query_args['s'] = $val;
      } elseif ($id == 'name') {
        $query_args['name'] = $val;
      } elseif ($id == 'pageId') {
        $query_args['page_id'] = $val;
      } elseif ($id == 'pagename') {
        $query_args['pagename'] = $val;
      } elseif ($id == 'postParent') {
        $query_args['post_parent'] = $val;
      } elseif ($id == 'postParentIn') {
        $query_args['post_parent__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'postParentNotIn') {
        $query_args['post_parent__not_in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'postIn') {
        $query_args['post__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'postNotIn') {
        $post_id = get_the_id();
        $query_args['post__not_in'] = !empty($val) ? explode(',', $val) : [$post_id];
      } elseif ($id == 'postNameIn') {
        $query_args['post_name__in'] = !empty($val) ? explode(',', $val) : [];
      } elseif ($id == 'hasPassword') {
        $query_args['has_password'] = $val;
      } elseif ($id == 'postPassword') {
        $query_args['post_password'] = $val;
      } elseif ($id == 'commentCount') {
        $query_args['comment_count'] = $val;
      } elseif ($id == 'nopaging') {
        $query_args['nopaging'] = $val;
      } elseif ($id == 'postsPerPage') {
        $query_args['posts_per_page'] = (int) $val;
      } elseif ($id == 'paged') {
        $query_args['paged'] = $val;
      } elseif ($id == 'offset') {
        $query_args['offset'] = $val;
      } elseif ($id == 'postsPerArchivePage') {
        $query_args['posts_per_archive_page'] = $val;
      } elseif ($id == 'ignoreStickyPosts') {
        $query_args['ignore_sticky_posts'] = $val;
      } elseif ($id == 'metaKey') {
        $query_args['meta_key'] = $val;
      } elseif ($id == 'metaValue') {
        $query_args['meta_value'] = $val;
      } elseif ($id == 'metaValueNum') {
        $query_args['meta_value_num'] = $val;
      } elseif ($id == 'metaCompare') {
        $query_args['meta_compare'] = $val;
      } elseif ($id == 'metaQuery') {
        $query_args['meta_query'] = $val;
      } elseif ($id == 'perm') {
        $query_args['perm'] = $val;
      } elseif ($id == 'postMimeType') {
        $query_args['post_mime_type'] = $val;
      } elseif ($id == 'cacheResults') {
        $query_args['cache_results'] = $val;
      } elseif ($id == 'updatePostMetaCache') {
        $query_args['update_post_meta_cache '] = $val;
      } elseif ($id == 'updatePostTermCache') {
        $query_args['update_post_term_cache'] = $val;
      }
    }
  }
  if (get_query_var('paged')) {
    $paged = get_query_var('paged');
  } elseif (get_query_var('page')) {
    $paged = get_query_var('page');
  } else {
    $paged = 1;
  }
  if (!empty($paged))
    $query_args['paged'] = $paged;
  return $query_args;
}
function combo_blocks_parse_query_terms($queryArgs)
{
  $query_args = [];
  foreach ($queryArgs as $item) {
    $id = isset($item['id']) ? $item['id'] : '';
    $val = isset($item['val']) ? $item['val'] : '';
    if ($id == 'taxonomy') {
      $query_args['taxonomy'] = $val;
    } elseif ($id == 'orderby') {
      $query_args['orderby'] = $val;
    } elseif ($id == 'order') {
      $query_args['order'] = $val;
    } elseif ($id == 'hide_empty') {
      $query_args['hide_empty'] = $val;
    } elseif ($id == 'include') {
      $query_args['include'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'exclude') {
      $query_args['exclude'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'exclude_tree') {
      $query_args['exclude_tree'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'number') {
      $query_args['number'] = (int)$val;
    } elseif ($id == 'count') {
      $query_args['count'] = $val;
    } elseif ($id == 'offset') {
      $query_args['offset'] = $val;
    } elseif ($id == 'name') {
      $query_args['name'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'slug') {
      $query_args['slug'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'hierarchical') {
      $query_args['hierarchical'] = $val;
    } elseif ($id == 'search') {
      $query_args['search'] = $val;
    } elseif ($id == 'name__like') {
      $query_args['name__like'] = $val;
    } elseif ($id == 'description__like') {
      $query_args['description__like'] = $val;
    } elseif ($id == 'pad_counts') {
      $query_args['pad_counts'] = $val;
    } elseif ($id == 'get') {
      $query_args['get'] = $val;
    } elseif ($id == 'parent') {
      $query_args['parent'] = $val;
    } elseif ($id == 'childless') {
      $query_args['childless'] = $val;
    } elseif ($id == 'child_of') {
      $query_args['child_of'] = $val;
    } elseif ($id == 'cache_domain') {
      $query_args['cache_domain'] = $val;
    } elseif ($id == 'update_term_meta_cache') {
      $query_args['update_term_meta_cache'] = $val;
    } elseif ($id == 'meta_key') {
      $query_args['meta_key'] = $val;
    } elseif ($id == 'meta_value') {
      $query_args['meta_value'] = $val;
    }
  }
  // if (get_query_var('paged')) {
  //   $paged = get_query_var('paged');
  // } elseif (get_query_var('page')) {
  //   $paged = get_query_var('page');
  // } else {
  //   $paged = 1;
  // }
  // if (!empty($paged))
  //   $query_args['paged'] = $paged;
  return $query_args;
}
function combo_blocks_parse_query_users($queryArgs)
{
  $query_args = [];
  foreach ($queryArgs as $item) {
    $id = isset($item['id']) ? $item['id'] : '';
    $val = isset($item['val']) ? $item['val'] : '';
    if ($id == 'orderby') {
      $query_args['orderby'] = $val;
    } elseif ($id == 'order') {
      $query_args['order'] = $val;
    } elseif ($id == 'offset') {
      $query_args['offset'] = $val;
    } elseif ($id == 'number') {
      $query_args['number'] = $val;
    } elseif ($id == 'hide_empty') {
      $query_args['hide_empty'] = $val;
    } elseif ($id == 'include') {
      $query_args['include'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'exclude') {
      $query_args['exclude'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'search') {
      $query_args['search'] = $val;
    } elseif ($id == 'search_columns') {
      $query_args['search_columns'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'paged') {
      $query_args['paged'] = $val;
    } elseif ($id == 'count_total') {
      $query_args['count_total'] = $val;
    } elseif ($id == 'blog_id') {
      $query_args['blog_id'] = $val;
    } elseif ($id == 'who') {
      $query_args['who'] = $val;
    } elseif ($id == 'meta_type') {
      $query_args['meta_type'] = $val;
    } elseif ($id == 'meta_type_key') {
      $query_args['meta_type_key'] = $val;
    } elseif ($id == 'meta_key') {

      $query_args['meta_key'] = $val;
    } elseif ($id == 'meta_value') {
      $query_args['meta_value'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'capability') {
      $query_args['capability'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'capability__in') {
      $query_args['capability__in'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'capability__not_in') {
      $query_args['capability__not_in'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'fields') {
      $query_args['fields'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'role') {
      $query_args['role'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'role__in') {
      $query_args['role__in'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'role__not_in') {
      $query_args['role__not_in'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'has_published_posts') {
      $query_args['has_published_posts'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'nicename') {
      $query_args['nicename'] = $val;
    } elseif ($id == 'nicename__in') {
      $query_args['nicename__in'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'nicename__not_in') {
      $query_args['nicename__not_in'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'login') {
      $query_args['login'] = $val;
    } elseif ($id == 'login__in') {
      $query_args['login__in'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'login__not_in') {
      $query_args['login__not_in'] =
        !empty($val) ? explode(',', $val) : [];
    } elseif ($id == 'cache_results') {
      $query_args['cache_results'] = $val;
    }
  }
  // if (get_query_var('paged')) {
  //   $paged = get_query_var('paged');
  // } elseif (get_query_var('page')) {
  //   $paged = get_query_var('page');
  // } else {
  //   $paged = 1;
  // }
  // if (!empty($paged))
  //   $query_args['paged'] = $paged;
  return $query_args;
}


function combo_blocks_global_vars()
{
  global $comboBlocksScriptData;
  global $comboBlocksVars;

  //////wp_enqueue_script('combo_blocks_scripts');

  wp_register_script('combo-blocks-global-vars', '', array(), '', true);
  wp_enqueue_script('combo-blocks-global-vars');
  wp_add_inline_script('combo-blocks-global-vars', 'var combo_blocks_blocks_vars =' . wp_json_encode($comboBlocksVars));

  wp_localize_script('combo_blocks_scripts', 'combo_blocks_vars', $comboBlocksVars);
}
//add_action('wp_enqueue_scripts', 'combo_blocks_global_vars', 999);



//add_action('wp_enqueue_scripts', 'combo_blocks_global_vars', 99999);
function combo_blocks_preloads()
{

  $combo_blocks_settings = get_option("combo_blocks_settings");
  $preloads = isset($combo_blocks_settings['preloads']) ? $combo_blocks_settings['preloads'] : [];


  if (!empty($preloads)) {
    foreach ($preloads as $preload) {

      $href = isset($preload['href']) ? $preload['href'] : '';
      $as = isset($preload['as']) ? $preload['as'] : '';
      $type = isset($preload['type']) ? $preload['type'] : '';
      $crossorigin = isset($preload['crossorigin']) ? $preload['crossorigin'] : false;
      $media = isset($preload['media']) ? $preload['media'] : '';


  ?>
      <link rel="preload" as="<?php echo esc_attr($as); ?>" href="<?php echo esc_url($href); ?>" <?php if ($crossorigin): ?>
        crossorigin <?php endif; ?> <?php if ($media): ?> as="<?php echo esc_attr($media); ?>" <?php endif; ?>
        <?php if ($type): ?> type="<?php echo esc_attr($type); ?>" <?php endif; ?>>
  <?php
    }
  }
  ?>
<?php
}
//add_action('wp_head', 'combo_blocks_preloads', 5);
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
// add_action('init', function () {
//     register_post_meta(
//         'page',
//         'combo_blocks_page_styles',
//         array(
//             'single'       => true,
//             'type'         => 'string',
//             'show_in_rest' => true,
//         )
//     );
// });
// register_meta('post', 'combo_blocks_page_styles', [
//     //'object_subtype' => 'my_article',
//     'show_in_rest' => true
// ]);
// add_filter('woocommerce_rest_check_permissions', 'my_woocommerce_rest_check_permissions', 90, 4);
// function my_woocommerce_rest_check_permissions($permission, $context, $object_id, $post_type)
// {
//     return true;
// }
//add_action('wp_footer', 'combo_blocks_page_styles', 80);


if (combo_blocks_is_fse_enabled()) {
  add_action('wp_enqueue_scripts', 'combo_blocks_page_styles');
} else {
  add_action('get_footer', 'combo_blocks_page_styles', 99);
}






function combo_blocks_page_styles()
{
  global $comboBlocksFonts;
  $reponsiveCssGroups = [];
  $reponsiveCss = '';
  $pgc_meta = get_post_meta(get_the_ID(), 'pgc_meta', true);
  $pageStyles = [];
  if (!empty($pgc_meta)) {
    foreach ($pgc_meta as $i => $items) {
      $selector = isset($items['options']['selector']) ? $items['options']['selector'] : '';
      foreach ($items as $itemIndex => $blockCss) {
        if ($itemIndex != 'options') {
          $elementSelector = '';
          if ($itemIndex == 'styles') {
            $elementSelector = $selector;
          } else if ($itemIndex == 'hover') {
            $elementSelector = $selector . ':hover';
          } else if ($itemIndex == 'after') {
            $elementSelector = $selector . '::after';
          } else if ($itemIndex == 'before') {
            $elementSelector = $selector . '::before';
          } else if ($itemIndex == 'first-child') {
            $elementSelector = $selector . ':first-child';
          } else if ($itemIndex == 'last-child') {
            $elementSelector = $selector . ':last-child';
          } else if ($itemIndex == 'visited') {
            $elementSelector = $selector . ':visited';
          } else if ($itemIndex == 'selection') {
            $elementSelector = $selector . '::selection';
          } else if ($itemIndex == 'first-letter') {
            $elementSelector = $selector . '::first-letter';
          } else if ($itemIndex == 'first-line') {
            $elementSelector = $selector . '::first-line';
          }
          $pageStyles[$i][$elementSelector] = $blockCss;
        }
      }
    }
  }
  if (is_array($pageStyles))
    foreach ($pageStyles as $index => $blockCss) {
      if (is_array($blockCss))
        foreach ($blockCss as $selector => $atts) {
          if (is_array($blockCss))
            foreach ($atts as $att => $responsiveVals) {
              if (is_array($responsiveVals))
                foreach ($responsiveVals as $device => $val) {
                  if ('fontFamily' == $att) {
                    $comboBlocksFonts[$val] = $val;
                  }
                  $cssAttr = combo_blocks_cssAttrParse($att);
                  $reponsiveCssGroups[$device][$selector][$cssAttr] = $val;
                }
            }
        }
    }
  if (!empty($reponsiveCssGroups['Desktop'])) {
    foreach ($reponsiveCssGroups['Desktop'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val)) {
            $reponsiveCss .= $attr . ':' . $val . ';';
          }
        }
      $reponsiveCss .= '}';
    }
  }
  if (!empty($reponsiveCssGroups['Tablet'])) {
    $reponsiveCss .= '@media(max-width: 991px){';
    foreach ($reponsiveCssGroups['Tablet'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }
    $reponsiveCss .= '}';
  }
  if (!empty($reponsiveCssGroups['Mobile'])) {
    $reponsiveCss .= '@media(max-width:767px){';
    foreach ($reponsiveCssGroups['Mobile'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }
    $reponsiveCss .= '}';
  }
?>
  <?php if (!empty($reponsiveCss)):
    wp_enqueue_style(
      'combo-blocks-page-styles',
      combo_blocks_url . 'assets/block-css/page-styles.css'
    );
    wp_add_inline_style('combo-blocks-page-styles', $reponsiveCss);
  endif;
}
add_action('wp_footer', 'combo_blocks_global_json_ld', 80);









function combo_blocks_global_json_ld()
{
  global $comboBlocksLdJson;
  if (!empty($comboBlocksLdJson)) {
    foreach ($comboBlocksLdJson as $json) {
      if (!empty($json)):
  ?>
        <script type="application/ld+json">
          <?php echo wp_unslash(json_encode($json)); ?>
        </script>
  <?php
      endif;
    }
  }
}
//add_action('wp_footer', 'combo_blocks_global_styles', 80);
//add_action('wp_enqueue_scripts', 'combo_blocks_global_styles');


if (combo_blocks_is_fse_enabled()) {
  add_action('wp_enqueue_scripts', 'combo_blocks_global_styles');
} else {
  add_action('get_footer', 'combo_blocks_global_styles', 99);
}







function combo_blocks_global_styles()
{
  global $comboBlocksFonts;
  $reponsiveCssGroups = [];
  $reponsiveCss = '';
  $combo_blocks_settings = get_option("combo_blocks_settings");
  $pgc_meta = isset($combo_blocks_settings['globalStyles']) ? $combo_blocks_settings['globalStyles'] : [];
  $globalStyles = [];
  if (!empty($pgc_meta)) {
    foreach ($pgc_meta as $i => $items) {
      $selector = isset($items['options']['selector']) ? $items['options']['selector'] : '';
      foreach ($items as $itemIndex => $blockCss) {
        if ($itemIndex != 'options') {
          $elementSelector = '';
          if ($itemIndex == 'styles') {
            $elementSelector = $selector;
          } else if ($itemIndex == 'hover') {
            $elementSelector = $selector . ':hover';
          } else if ($itemIndex == 'after') {
            $elementSelector = $selector . '::after';
          } else if ($itemIndex == 'before') {
            $elementSelector = $selector . '::before';
          } else if ($itemIndex == 'first-child') {
            $elementSelector = $selector . ':first-child';
          } else if ($itemIndex == 'last-child') {
            $elementSelector = $selector . ':last-child';
          } else if ($itemIndex == 'visited') {
            $elementSelector = $selector . ':visited';
          } else if ($itemIndex == 'selection') {
            $elementSelector = $selector . '::selection';
          } else if ($itemIndex == 'first-letter') {
            $elementSelector = $selector . '::first-letter';
          } else if ($itemIndex == 'first-line') {
            $elementSelector = $selector . '::first-line';
          }
          $globalStyles[$i][$elementSelector] = $blockCss;
        }
      }
    }
  }
  if (is_array($globalStyles))
    foreach ($globalStyles as $index => $blockCss) {
      if (is_array($blockCss))
        foreach ($blockCss as $selector => $atts) {
          if (is_array($blockCss))
            foreach ($atts as $att => $responsiveVals) {
              if (is_array($responsiveVals))
                foreach ($responsiveVals as $device => $val) {
                  if ('fontFamily' == $att) {
                    $comboBlocksFonts[$val] = $val;
                  }
                  $cssAttr = combo_blocks_cssAttrParse($att);
                  $reponsiveCssGroups[$device][$selector][$cssAttr] = $val;
                }
            }
        }
    }
  if (!empty($reponsiveCssGroups['Desktop'])) {
    foreach ($reponsiveCssGroups['Desktop'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val)) {
            $reponsiveCss .= $attr . ':' . $val . ';';
          }
        }
      $reponsiveCss .= '}';
    }
  }
  if (!empty($reponsiveCssGroups['Tablet'])) {
    $reponsiveCss .= '@media(max-width: 991px){';
    foreach ($reponsiveCssGroups['Tablet'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }
    $reponsiveCss .= '}';
  }
  if (!empty($reponsiveCssGroups['Mobile'])) {
    $reponsiveCss .= '@media(max-width:767px){';
    foreach ($reponsiveCssGroups['Mobile'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }
    $reponsiveCss .= '}';
  }



  ?>
  <?php if (!empty($reponsiveCss)):
    wp_enqueue_style(
      'combo-blocks-global-styles',
      combo_blocks_url . 'assets/block-css/global-styles.css'
    );
    wp_add_inline_style('combo-blocks-global-styles', $reponsiveCss);
  endif;
}
function combo_blocks_blocks_styles()
{
  $post_id = get_the_ID();
  // $combo_blocks_css_file_id = get_post_meta($post_id, 'combo_blocks_css_file_id', true);
  //$combo_blocks_generate_css = get_post_meta($post_id, 'combo_blocks_generate_css', true);

  //if (!empty($combo_blocks_css_file_id)) return;
  //if ($combo_blocks_generate_css) return;



  global $comboBlocksCss;
  global $comboBlocksFonts;
  $reponsiveCssGroups = [];
  $reponsiveCss = '';
  if (is_array($comboBlocksCss))
    foreach ($comboBlocksCss as $index => $blockCss) {
      if (is_array($blockCss))
        foreach ($blockCss as $selector => $atts) {
          if (is_array($blockCss))
            foreach ($atts as $att => $responsiveVals) {
              if (is_array($responsiveVals))
                foreach ($responsiveVals as $device => $val) {
                  if ('font-family' == $att && !empty($val)) {
                    $comboBlocksFonts[$val] = $val;
                  }


                  // $reponsiveCssGroups[$device][$selector][$att] = $val;
                  if (is_string($val)) {
                    $reponsiveCssGroups[$device][$selector][$att] = str_replace("u0022", '"', $val);
                  }
                }
            }
          // $attr = isset($arg['attr']) ? $arg['attr'] : '';
          // $id = isset($arg['id']) ? $arg['id'] : '';
          // $reponsive = isset($arg['reponsive']) ? $arg['reponsive'] : '';
          // foreach ($reponsive as $device => $value) {
          //     if (!empty($value))
          //         $reponsiveCssGroups[$device][] = ['id' => $id, 'attr' => $attr,  'val' => $value];
          // }
        }
    }
  if (!empty($reponsiveCssGroups['Desktop'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 782px){';
    foreach ($reponsiveCssGroups['Desktop'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val) && !is_array($val)) {
            $reponsiveCss .= $attr . ':' . $val . ';';
          }
        }
      $reponsiveCss .= '}';
    }
    //$reponsiveCss .= '}';
  }
  if (!empty($reponsiveCssGroups['Tablet'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 361px) and (max-width: 780px){';
    // $reponsiveCss .= '@media(max-width: 780px){';
    $reponsiveCss .= '@media(max-width: 991px){';
    foreach ($reponsiveCssGroups['Tablet'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }
    $reponsiveCss .= '}';
  }
  if (!empty($reponsiveCssGroups['Mobile'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 0px) and (max-width: 360px){';
    //$reponsiveCss .= '@media(max-width:360px){';
    $reponsiveCss .= '@media(max-width:767px){';
    foreach ($reponsiveCssGroups['Mobile'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }
    $reponsiveCss .= '}';
  }

  // $file_name = 'block-styles-' . $post_id . '.css';

  // $css_file = combo_blocks_create_custom_css_file($reponsiveCss, $file_name);
  // if ($css_file) {
  //   update_post_meta($post_id, 'combo_blocks_generate_css', 1);
  // }

  wp_enqueue_style(
    'combo-blocks-blocks-styles',
    combo_blocks_url . 'assets/block-css/block-styles.css'
  );
  if (!empty($reponsiveCss)):
    wp_add_inline_style('combo-blocks-blocks-styles', $reponsiveCss);
  endif;
}

if (combo_blocks_is_fse_enabled()) {
  add_action('wp_enqueue_scripts', 'combo_blocks_blocks_styles', 99);
} else {
  //add_action('wp_footer', 'combo_blocks_blocks_styles', 99);
  add_action('get_footer', 'combo_blocks_blocks_styles', 99);
}



add_action('elementor/editor/init', 'combo_blocks_blocks_styles');





function combo_blocks_create_custom_css_file($css_string, $filename = 'custom-style.css')
{

  // Define the directory path
  // $upload_dir = wp_upload_dir(); // Get WordPress uploads directory
  // $custom_dir = WP_CONTENT_DIR . '/custom/'; // Define custom directory path


  $upload_dir = wp_upload_dir();
  $custom_dir = $upload_dir['basedir'] . '/combo-blocks';



  // Ensure the directory exists, if not create it
  if (!file_exists($custom_dir)) {
    wp_mkdir_p($custom_dir);
  }

  // Define full file path
  $file_path = $custom_dir . '/' . $filename;

  // Write CSS string to the file
  if (file_put_contents($file_path, $css_string) !== false) {

    return $file_path; // Return the file path on success
  } else {
    return false; // Return false on failure
  }
}



function combo_blocks_is_fse_enabled()
{
  // Check if the current theme supports `block-templates` which indicates FSE compatibility
  return function_exists('wp_is_block_theme') && wp_is_block_theme();
}

function combo_blocks_blocks_styles_fonts()
{
  global $comboBlocksCss;
  global $comboBlocksFonts;
  $reponsiveCssGroups = [];
  $reponsiveCss = '';
  if (is_array($comboBlocksCss))
    foreach ($comboBlocksCss as $index => $blockCss) {
      if (is_array($blockCss))
        foreach ($blockCss as $selector => $atts) {
          if (is_array($blockCss))
            foreach ($atts as $att => $responsiveVals) {
              if (is_array($responsiveVals))
                foreach ($responsiveVals as $device => $val) {
                  if ('font-family' == $att && !empty($val)) {
                    $comboBlocksFonts[$val] = $val;
                  }
                  // $reponsiveCssGroups[$device][$selector][$att] = $val;
                  if (is_string($val)) {
                    $reponsiveCssGroups[$device][$selector][$att] = str_replace("u0022", '"', $val);
                  }
                }
            }
          // $attr = isset($arg['attr']) ? $arg['attr'] : '';
          // $id = isset($arg['id']) ? $arg['id'] : '';
          // $reponsive = isset($arg['reponsive']) ? $arg['reponsive'] : '';
          // foreach ($reponsive as $device => $value) {
          //     if (!empty($value))
          //         $reponsiveCssGroups[$device][] = ['id' => $id, 'attr' => $attr,  'val' => $value];
          // }
        }
    }
  if (!empty($reponsiveCssGroups['Desktop'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 782px){';
    foreach ($reponsiveCssGroups['Desktop'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val) && !is_array($val)) {
            $reponsiveCss .= $attr . ':' . $val . ';';
          }
        }
      $reponsiveCss .= '}';
    }
    //$reponsiveCss .= '}';
  }
  if (!empty($reponsiveCssGroups['Tablet'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 361px) and (max-width: 780px){';
    // $reponsiveCss .= '@media(max-width: 780px){';
    $reponsiveCss .= '@media(max-width: 991px){';
    foreach ($reponsiveCssGroups['Tablet'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }
    $reponsiveCss .= '}';
  }
  if (!empty($reponsiveCssGroups['Mobile'])) {
    //$reponsiveCss .= '@media only screen and (min-width: 0px) and (max-width: 360px){';
    //$reponsiveCss .= '@media(max-width:360px){';
    $reponsiveCss .= '@media(max-width:767px){';
    foreach ($reponsiveCssGroups['Mobile'] as $selector => $atts) {
      $reponsiveCss .= $selector . '{';
      if (!empty($atts))
        foreach ($atts as $attr => $val) {
          if (!empty($val))
            $reponsiveCss .= $attr . ':' . $val . ';';
        }
      $reponsiveCss .= '}';
    }
    $reponsiveCss .= '}';
  }
  $fonts = '';
  $fontsArr = [];
  if (!empty($comboBlocksFonts)) {
    //foreach ($comboBlocksFonts as $device => $itemFont) {
    //if (!empty($comboBlocksFonts)) {
    foreach ($comboBlocksFonts as $itemFon) {
      $fonts .= $itemFon . ',';
      if (!in_array($itemFon, $fontsArr)) {
        $fontsArr[] = $itemFon . ':wght@100;200;300;400;500;600;700;800;900';
      }
    }
    // }
    //}
  }
  $fontsArrStr = implode('&family=', $fontsArr);
  // $fonts = substr($fonts, 0, -1);
  //$fonts = str_replace(",", "|", $fonts);
  $fonts = str_replace(" ", "+", $fontsArrStr);
  if (!empty($fonts)) {
  ?>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts); ?>&display=swap" />
  <?php
  }
}
add_action('wp_footer', 'combo_blocks_blocks_styles_fonts', 99);
add_action('elementor/editor/init', 'combo_blocks_blocks_styles_fonts');
function combo_blocks_custom_fonts()
{
  $combo_blocks_settings = get_option('combo_blocks_settings');
  $customFonts = isset($combo_blocks_settings['customFonts']) ? $combo_blocks_settings['customFonts'] : [];
  $faceStr = '';
  foreach ($customFonts as $face) {
    $src = $fontFamily = isset($face['family']) ? $face['family'] : '';
    $src = isset($face['src'][0]['url']) ? $face['src'][0]['url'] : '';
    $fontWeight = isset($face['weight']) ? $face['weight'] : '';
    $faceStr .= "@font-face {
    font-family: '$fontFamily';
    src: url('$src');
    font-weight: $fontWeight;
  }";
  }
  wp_enqueue_style(
    'combo-blocks-custom-fonts',
    combo_blocks_url . 'assets/block-css/custom-fonts.css'
  );
  wp_add_inline_style('combo-blocks-custom-fonts', $faceStr);
}
//add_action('wp_footer', 'combo_blocks_custom_fonts', 999);
//add_action('wp_enqueue_scripts', 'combo_blocks_custom_fonts');

if (combo_blocks_is_fse_enabled()) {
  add_action('wp_enqueue_scripts', 'combo_blocks_custom_fonts');
} else {
  add_action('get_footer', 'combo_blocks_custom_fonts', 99);
}






function combo_blocks_google_fonts()
{
  $combo_blocks_settings = get_option('combo_blocks_settings');
  $googleFonts = isset($combo_blocks_settings['googleFonts']) ? $combo_blocks_settings['googleFonts'] : [];
  $fonts = '';
  $fontsArr = [];
  if (!empty($googleFonts)) {
    foreach ($googleFonts as $itemFon) {
      $val = isset($itemFon['value']) ? $itemFon['value'] : '';
      $fonts .= $val . ',';
      if (!in_array($val, $fontsArr)) {
        $fontsArr[] = $val . ':wght@100;200;300;400;500;600;700;800;900';
      }
    }
  }
  $fontsArrStr = implode('&family=', $fontsArr);
  // $fonts = substr($fonts, 0, -1);
  //$fonts = str_replace(",", "|", $fonts);
  $fonts = str_replace(" ", "+", $fontsArrStr);
  if (!empty($fonts)) {
  ?>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<?php echo esc_html($fonts); ?>&display=swap" />
    <?php
  }
}
add_action('wp_footer', 'combo_blocks_google_fonts', 999);
add_action('elementor/editor/init', 'combo_blocks_google_fonts');
function combo_blocks_cssAttrParse($key)
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
add_filter("combo_blocks_post_query_prams", "combo_blocks_post_query_prams", 99, 2);
function combo_blocks_post_query_prams($query_args, $prams)
{
  if ($_GET) {
    $keyword = isset($_GET["keyword"]) ? sanitize_text_field($_GET["keyword"]) : "";
    $orderby = isset($_GET["orderby"]) ? sanitize_text_field($_GET["orderby"]) : "";
    $order = isset($_GET["order"]) ? sanitize_text_field($_GET["order"]) : "";
    $post_status = isset($_GET["post_status"]) ? sanitize_text_field($_GET["post_status"]) : [];
    $posts_per_page = isset($_GET["posts_per_page"]) ? sanitize_text_field($_GET["posts_per_page"]) : "";
    if (!empty($keyword)) {
      $query_args["s"] = $keyword;
    }
    if (!empty($posts_per_page)) {
      $query_args["posts_per_page"] = (int) $posts_per_page;
    }
    if (!empty($orderby)) {
      $query_args["orderby"] = $orderby;
    }
    if (!empty($order)) {
      $query_args["order"] = $order;
    }
    if (!empty($post_status)) {
      $query_args["post_status"] = $post_status;
    }
  }
  return $query_args;
}
function combo_blocks_upload_file($data)
{
  $upload_dir       = wp_upload_dir();
  //HANDLE UPLOADED FILE
  if (!function_exists('wp_handle_sideload')) {
    require_once(ABSPATH . 'wp-admin/includes/file.php');
  }
  // Without that I'm getting a debug error!?
  if (!function_exists('wp_get_current_user')) {
    require_once(ABSPATH . 'wp-includes/pluggable.php');
  }
  if (empty($data['tmp_name'])) return;
  // @new
  $file             = array();
  $file['error']    = isset($data['error']) ? $data['error'] : '';
  $file['tmp_name'] = isset($data['tmp_name']) ? $data['tmp_name'] : "";
  $file['name']     = isset($data['name']) ? $data['name'] : '';
  $file['type']     = isset($data['type']) ? $data['type'] : '';
  $file['size']     = isset($data['tmp_name']) ? filesize($data['tmp_name']) : 0;
  // upload file to server
  // @new use $file instead of $image_upload
  $file_return      = wp_handle_sideload($file, array('test_form' => false));
  $filename = $file_return['file'];
  $attachment = array(
    'post_mime_type' => $file_return['type'],
    'post_title' => preg_replace('/\.[^.]+$/', '', basename($filename)),
    'post_content' => '',
    'post_status' => 'inherit',
    'guid' => esc_url($upload_dir['url']) . '/' . basename($filename)
  );
  $attach_id = wp_insert_attachment($attachment, $filename, 289);
  require_once(ABSPATH . 'wp-admin/includes/image.php');
  $attach_data = wp_generate_attachment_metadata($attach_id, $filename);
  wp_update_attachment_metadata($attach_id, $attach_data);
  $attach_url = wp_get_attachment_url($attach_id);
  $jsonReturn = array(
    'id'  =>  $attach_id,
    'url'  =>  $attach_url,
  );
  return $jsonReturn;
}
function combo_blocks_upload_file_x($data)
{
  if (!function_exists('wp_handle_upload')) {
    require_once(ABSPATH . 'wp-admin/includes/file.php');
  }
  $upload_overrides = array('test_form' => false);
  // $files = $_FILES['my_files'];
  $uploadedfile = array(
    'name'     => $data['name'],
    'type'     => $data['type'],
    'tmp_name' => $data['tmp_name'],
    'error'    => $data['error'],
    'size'     => $data['size']
  );
  $movefile = wp_handle_upload($uploadedfile, $upload_overrides);
}
function combo_blocks_generate_input_prams($inputargsSrc)
{
  $argsSrc = isset($inputargsSrc['src']) ? $inputargsSrc['src'] : "";
  $srcPrams = isset($inputargsSrc['srcPrams']) ? $inputargsSrc['srcPrams'] : "";
  $argsSrcTaxonomy = isset($srcPrams['taxonomy']) ? $srcPrams['taxonomy'] : "";

  $argsSrcField = isset($srcPrams['field']) ? $srcPrams['field'] : "";
  $argsSrcPostType = isset($srcPrams['postType']) ? $srcPrams['postType'] : "";
  $argsSrcUserRole = isset($srcPrams['role']) ? $srcPrams['role'] : "";
  $inputArgs = [];
  if ($argsSrc == "taxonomy") {
    $terms = get_terms(array(
      'taxonomy'   => $argsSrcTaxonomy,
      'hide_empty' => false,
    ));
    if (!empty($terms) && !is_wp_error($terms)) {

      $inputArgs[] = [
        'label' => __("All", "combo-blocks"),
        'value' => "",
      ];

      foreach ($terms as $term) {
        $value = ($argsSrcField == 'id') ? $term->term_id : $term->slug;
        $inputArgs[] = [
          'label' => $term->name,
          'value' => $value,
        ];
      }
    }
  }
  if ($argsSrc == "posts") {
    $args = array(
      'numberposts' => 10,
      'post_type'   => $argsSrcPostType
    );
    $posts = get_posts($args);
    if (!empty($posts) && !is_wp_error($posts)) {
      $inputArgs = [];
      foreach ($posts as $post) {
        $inputArgs[] = [
          'label' => $post->post_title,
          'value' => $post->ID,
        ];
      }
    }
  }
  if ($argsSrc == "users") {
    $users = get_users(array('role' => $argsSrcUserRole));
    if (!empty($users) && !is_wp_error($users)) {
      $inputArgs = [];
      foreach ($users as $user) {
        $inputArgs[] = [
          'label' => $user->display_name,
          'value' => $user->ID,
        ];
      }
    }
  }
  if ($argsSrc == "countryNames") {
    $countries = array(
      'AF' => __('Afghanistan', 'combo-blocks'),
      'AL' => __('Albania', 'combo-blocks'),
      'DZ' => __('Algeria', 'combo-blocks'),
      'AS' => __('American Samoa', 'combo-blocks'),
      'AD' => __('Andorra', 'combo-blocks'),
      'AO' => __('Angola', 'combo-blocks'),
      'AI' => __('Anguilla', 'combo-blocks'),
      'AQ' => __('Antarctica', 'combo-blocks'),
      'AG' => __('Antigua and Barbuda', 'combo-blocks'),
      'AR' => __('Argentina', 'combo-blocks'),
      'AM' => __('Armenia', 'combo-blocks'),
      'AW' => __('Aruba', 'combo-blocks'),
      'AU' => __('Australia', 'combo-blocks'),
      'AT' => __('Austria', 'combo-blocks'),
      'AZ' => __('Azerbaijan', 'combo-blocks'),
      'BS' => __('Bahamas', 'combo-blocks'),
      'BH' => __('Bahrain', 'combo-blocks'),
      'BD' => __('Bangladesh', 'combo-blocks'),
      'BB' => __('Barbados', 'combo-blocks'),
      'BY' => __('Belarus', 'combo-blocks'),
      'BE' => __('Belgium', 'combo-blocks'),
      'BZ' => __('Belize', 'combo-blocks'),
      'BJ' => __('Benin', 'combo-blocks'),
      'BM' => __('Bermuda', 'combo-blocks'),
      'BT' => __('Bhutan', 'combo-blocks'),
      'BO' => __('Bolivia', 'combo-blocks'),
      'BA' => __('Bosnia and Herzegovina', 'combo-blocks'),
      'BW' => __('Botswana', 'combo-blocks'),
      'BV' => __('Bouvet Island', 'combo-blocks'),
      'BR' => __('Brazil', 'combo-blocks'),
      'BQ' => __('British Antarctic Territory', 'combo-blocks'),
      'IO' => __('British Indian Ocean Territory', 'combo-blocks'),
      'VG' => __('British Virgin Islands', 'combo-blocks'),
      'BN' => __('Brunei', 'combo-blocks'),
      'BG' => __('Bulgaria', 'combo-blocks'),
      'BF' => __('Burkina Faso', 'combo-blocks'),
      'BI' => __('Burundi', 'combo-blocks'),
      'KH' => __('Cambodia', 'combo-blocks'),
      'CM' => __('Cameroon', 'combo-blocks'),
      'CA' => __('Canada', 'combo-blocks'),
      'CT' => __('Canton and Enderbury Islands', 'combo-blocks'),
      'CV' => __('Cape Verde', 'combo-blocks'),
      'KY' => __('Cayman Islands', 'combo-blocks'),
      'CF' => __('Central African Republic', 'combo-blocks'),
      'TD' => __('Chad', 'combo-blocks'),
      'CL' => __('Chile', 'combo-blocks'),
      'CN' => __('China', 'combo-blocks'),
      'CX' => __('Christmas Island', 'combo-blocks'),
      'CC' => __('Cocos [Keeling] Islands', 'combo-blocks'),
      'CO' => __('Colombia', 'combo-blocks'),
      'KM' => __('Comoros', 'combo-blocks'),
      'CG' => __('Congo - Brazzaville', 'combo-blocks'),
      'CD' => __('Congo - Kinshasa', 'combo-blocks'),
      'CK' => __('Cook Islands', 'combo-blocks'),
      'CR' => __('Costa Rica', 'combo-blocks'),
      'HR' => __('Croatia', 'combo-blocks'),
      'CU' => __('Cuba', 'combo-blocks'),
      'CY' => __('Cyprus', 'combo-blocks'),
      'CZ' => __('Czech Republic', 'combo-blocks'),
      'CI' => __('Côte d’Ivoire', 'combo-blocks'),
      'DK' => __('Denmark', 'combo-blocks'),
      'DJ' => __('Djibouti', 'combo-blocks'),
      'DM' => __('Dominica', 'combo-blocks'),
      'DO' => __('Dominican Republic', 'combo-blocks'),
      'NQ' => __('Dronning Maud Land', 'combo-blocks'),
      'DD' => __('East Germany', 'combo-blocks'),
      'EC' => __('Ecuador', 'combo-blocks'),
      'EG' => __('Egypt', 'combo-blocks'),
      'SV' => __('El Salvador', 'combo-blocks'),
      'GQ' => __('Equatorial Guinea', 'combo-blocks'),
      'ER' => __('Eritrea', 'combo-blocks'),
      'EE' => __('Estonia', 'combo-blocks'),
      'ET' => __('Ethiopia', 'combo-blocks'),
      'FK' => __('Falkland Islands', 'combo-blocks'),
      'FO' => __('Faroe Islands', 'combo-blocks'),
      'FJ' => __('Fiji', 'combo-blocks'),
      'FI' => __('Finland', 'combo-blocks'),
      'FR' => __('France', 'combo-blocks'),
      'GF' => __('French Guiana', 'combo-blocks'),
      'PF' => __('French Polynesia', 'combo-blocks'),
      'TF' => __('French Southern Territories', 'combo-blocks'),
      'FQ' => __('French Southern and Antarctic Territories', 'combo-blocks'),
      'GA' => __('Gabon', 'combo-blocks'),
      'GM' => __('Gambia', 'combo-blocks'),
      'GE' => __('Georgia', 'combo-blocks'),
      'DE' => __('Germany', 'combo-blocks'),
      'GH' => __('Ghana', 'combo-blocks'),
      'GI' => __('Gibraltar', 'combo-blocks'),
      'GR' => __('Greece', 'combo-blocks'),
      'GL' => __('Greenland', 'combo-blocks'),
      'GD' => __('Grenada', 'combo-blocks'),
      'GP' => __('Guadeloupe', 'combo-blocks'),
      'GU' => __('Guam', 'combo-blocks'),
      'GT' => __('Guatemala', 'combo-blocks'),
      'GG' => __('Guernsey', 'combo-blocks'),
      'GN' => __('Guinea', 'combo-blocks'),
      'GW' => __('Guinea-Bissau', 'combo-blocks'),
      'GY' => __('Guyana', 'combo-blocks'),
      'HT' => __('Haiti', 'combo-blocks'),
      'HM' => __('Heard Island and McDonald Islands', 'combo-blocks'),
      'HN' => __('Honduras', 'combo-blocks'),
      'HK' => __('Hong Kong SAR China', 'combo-blocks'),
      'HU' => __('Hungary', 'combo-blocks'),
      'IS' => __('Iceland', 'combo-blocks'),
      'IN' => __('India', 'combo-blocks'),
      'ID' => __('Indonesia', 'combo-blocks'),
      'IR' => __('Iran', 'combo-blocks'),
      'IQ' => __('Iraq', 'combo-blocks'),
      'IE' => __('Ireland', 'combo-blocks'),
      'IM' => __('Isle of Man', 'combo-blocks'),
      'IL' => __('Israel', 'combo-blocks'),
      'IT' => __('Italy', 'combo-blocks'),
      'JM' => __('Jamaica', 'combo-blocks'),
      'JP' => __('Japan', 'combo-blocks'),
      'JE' => __('Jersey', 'combo-blocks'),
      'JT' => __('Johnston Island', 'combo-blocks'),
      'JO' => __('Jordan', 'combo-blocks'),
      'KZ' => __('Kazakhstan', 'combo-blocks'),
      'KE' => __('Kenya', 'combo-blocks'),
      'KI' => __('Kiribati', 'combo-blocks'),
      'KW' => __('Kuwait', 'combo-blocks'),
      'KG' => __('Kyrgyzstan', 'combo-blocks'),
      'LA' => __('Laos', 'combo-blocks'),
      'LV' => __('Latvia', 'combo-blocks'),
      'LB' => __('Lebanon', 'combo-blocks'),
      'LS' => __('Lesotho', 'combo-blocks'),
      'LR' => __('Liberia', 'combo-blocks'),
      'LY' => __('Libya', 'combo-blocks'),
      'LI' => __('Liechtenstein', 'combo-blocks'),
      'LT' => __('Lithuania', 'combo-blocks'),
      'LU' => __('Luxembourg', 'combo-blocks'),
      'MO' => __('Macau SAR China', 'combo-blocks'),
      'MK' => __('Macedonia', 'combo-blocks'),
      'MG' => __('Madagascar', 'combo-blocks'),
      'MW' => __('Malawi', 'combo-blocks'),
      'MY' => __('Malaysia', 'combo-blocks'),
      'MV' => __('Maldives', 'combo-blocks'),
      'ML' => __('Mali', 'combo-blocks'),
      'MT' => __('Malta', 'combo-blocks'),
      'MH' => __('Marshall Islands', 'combo-blocks'),
      'MQ' => __('Martinique', 'combo-blocks'),
      'MR' => __('Mauritania', 'combo-blocks'),
      'MU' => __('Mauritius', 'combo-blocks'),
      'YT' => __('Mayotte', 'combo-blocks'),
      'FX' => __('Metropolitan France', 'combo-blocks'),
      'MX' => __('Mexico', 'combo-blocks'),
      'FM' => __('Micronesia', 'combo-blocks'),
      'MI' => __('Midway Islands', 'combo-blocks'),
      'MD' => __('Moldova', 'combo-blocks'),
      'MC' => __('Monaco', 'combo-blocks'),
      'MN' => __('Mongolia', 'combo-blocks'),
      'ME' => __('Montenegro', 'combo-blocks'),
      'MS' => __('Montserrat', 'combo-blocks'),
      'MA' => __('Morocco', 'combo-blocks'),
      'MZ' => __('Mozambique', 'combo-blocks'),
      'MM' => __('Myanmar [Burma]', 'combo-blocks'),
      'NA' => __('Namibia', 'combo-blocks'),
      'NR' => __('Nauru', 'combo-blocks'),
      'NP' => __('Nepal', 'combo-blocks'),
      'NL' => __('Netherlands', 'combo-blocks'),
      'AN' => __('Netherlands Antilles', 'combo-blocks'),
      'NT' => __('Neutral Zone', 'combo-blocks'),
      'NC' => __('New Caledonia', 'combo-blocks'),
      'NZ' => __('New Zealand', 'combo-blocks'),
      'NI' => __('Nicaragua', 'combo-blocks'),
      'NE' => __('Niger', 'combo-blocks'),
      'NG' => __('Nigeria', 'combo-blocks'),
      'NU' => __('Niue', 'combo-blocks'),
      'NF' => __('Norfolk Island', 'combo-blocks'),
      'KP' => __('North Korea', 'combo-blocks'),
      'VD' => __('North Vietnam', 'combo-blocks'),
      'MP' => __('Northern Mariana Islands', 'combo-blocks'),
      'NO' => __('Norway', 'combo-blocks'),
      'OM' => __('Oman', 'combo-blocks'),
      'PC' => __('Pacific Islands Trust Territory', 'combo-blocks'),
      'PK' => __('Pakistan', 'combo-blocks'),
      'PW' => __('Palau', 'combo-blocks'),
      'PS' => __('Palestinian Territories', 'combo-blocks'),
      'PA' => __('Panama', 'combo-blocks'),
      'PZ' => __('Panama Canal Zone', 'combo-blocks'),
      'PG' => __('Papua New Guinea', 'combo-blocks'),
      'PY' => __('Paraguay', 'combo-blocks'),
      'YD' => __('People\'s Democratic Republic of Yemen', 'combo-blocks'),
      'PE' => __('Peru', 'combo-blocks'),
      'PH' => __('Philippines', 'combo-blocks'),
      'PN' => __('Pitcairn Islands', 'combo-blocks'),
      'PL' => __('Poland', 'combo-blocks'),
      'PT' => __('Portugal', 'combo-blocks'),
      'PR' => __('Puerto Rico', 'combo-blocks'),
      'QA' => __('Qatar', 'combo-blocks'),
      'RO' => __('Romania', 'combo-blocks'),
      'RU' => __('Russia', 'combo-blocks'),
      'RW' => __('Rwanda', 'combo-blocks'),
      'BL' => __('Saint Barthélemy', 'combo-blocks'),
      'SH' => __('Saint Helena', 'combo-blocks'),
      'KN' => __('Saint Kitts and Nevis', 'combo-blocks'),
      'LC' => __('Saint Lucia', 'combo-blocks'),
      'MF' => __('Saint Martin', 'combo-blocks'),
      'PM' => __('Saint Pierre and Miquelon', 'combo-blocks'),
      'VC' => __('Saint Vincent and the Grenadines', 'combo-blocks'),
      'WS' => __('Samoa', 'combo-blocks'),
      'SM' => __('San Marino', 'combo-blocks'),
      'SA' => __('Saudi Arabia', 'combo-blocks'),
      'SN' => __('Senegal', 'combo-blocks'),
      'RS' => __('Serbia', 'combo-blocks'),
      'CS' => __('Serbia and Montenegro', 'combo-blocks'),
      'SC' => __('Seychelles', 'combo-blocks'),
      'SL' => __('Sierra Leone', 'combo-blocks'),
      'SG' => __('Singapore', 'combo-blocks'),
      'SK' => __('Slovakia', 'combo-blocks'),
      'SI' => __('Slovenia', 'combo-blocks'),
      'SB' => __('Solomon Islands', 'combo-blocks'),
      'SO' => __('Somalia', 'combo-blocks'),
      'ZA' => __('South Africa', 'combo-blocks'),
      'GS' => __('South Georgia and the South Sandwich Islands', 'combo-blocks'),
      'KR' => __('South Korea', 'combo-blocks'),
      'ES' => __('Spain', 'combo-blocks'),
      'LK' => __('Sri Lanka', 'combo-blocks'),
      'SD' => __('Sudan', 'combo-blocks'),
      'SR' => __('Suriname', 'combo-blocks'),
      'SJ' => __('Svalbard and Jan Mayen', 'combo-blocks'),
      'SZ' => __('Swaziland', 'combo-blocks'),
      'SE' => __('Sweden', 'combo-blocks'),
      'CH' => __('Switzerland', 'combo-blocks'),
      'SY' => __('Syria', 'combo-blocks'),
      'ST' => __('São Tomé and Príncipe', 'combo-blocks'),
      'TW' => __('Taiwan', 'combo-blocks'),
      'TJ' => __('Tajikistan', 'combo-blocks'),
      'TZ' => __('Tanzania', 'combo-blocks'),
      'TH' => __('Thailand', 'combo-blocks'),
      'TL' => __('Timor-Leste', 'combo-blocks'),
      'TG' => __('Togo', 'combo-blocks'),
      'TK' => __('Tokelau', 'combo-blocks'),
      'TO' => __('Tonga', 'combo-blocks'),
      'TT' => __('Trinidad and Tobago', 'combo-blocks'),
      'TN' => __('Tunisia', 'combo-blocks'),
      'TR' => __('Turkey', 'combo-blocks'),
      'TM' => __('Turkmenistan', 'combo-blocks'),
      'TC' => __('Turks and Caicos Islands', 'combo-blocks'),
      'TV' => __('Tuvalu', 'combo-blocks'),
      'UM' => __('U.S. Minor Outlying Islands', 'combo-blocks'),
      'PU' => __('U.S. Miscellaneous Pacific Islands', 'combo-blocks'),
      'VI' => __('U.S. Virgin Islands', 'combo-blocks'),
      'UG' => __('Uganda', 'combo-blocks'),
      'UA' => __('Ukraine', 'combo-blocks'),
      'SU' => __('Union of Soviet Socialist Republics', 'combo-blocks'),
      'AE' => __('United Arab Emirates', 'combo-blocks'),
      'GB' => __('United Kingdom', 'combo-blocks'),
      'US' => __('United States', 'combo-blocks'),
      'ZZ' => __('Unknown or Invalid Region', 'combo-blocks'),
      'UY' => __('Uruguay', 'combo-blocks'),
      'UZ' => __('Uzbekistan', 'combo-blocks'),
      'VU' => __('Vanuatu', 'combo-blocks'),
      'VA' => __('Vatican City', 'combo-blocks'),
      'VE' => __('Venezuela', 'combo-blocks'),
      'VN' => __('Vietnam', 'combo-blocks'),
      'WK' => __('Wake Island', 'combo-blocks'),
      'WF' => __('Wallis and Futuna', 'combo-blocks'),
      'EH' => __('Western Sahara', 'combo-blocks'),
      'YE' => __('Yemen', 'combo-blocks'),
      'ZM' => __('Zambia', 'combo-blocks'),
      'ZW' => __('Zimbabwe', 'combo-blocks'),
      'AX' => __('Åland Islands', 'combo-blocks'),
    );
    $inputArgs = [];
    foreach ($countries as $index => $country) {
      $inputArgs[] = [
        'label' => $country,
        'value' => $country,
      ];
    }
  }
  if ($argsSrc == "countryCodes") {
    $countries = array(
      'AF' => __('Afghanistan', 'combo-blocks'),
      'AL' => __('Albania', 'combo-blocks'),
      'DZ' => __('Algeria', 'combo-blocks'),
      'AS' => __('American Samoa', 'combo-blocks'),
      'AD' => __('Andorra', 'combo-blocks'),
      'AO' => __('Angola', 'combo-blocks'),
      'AI' => __('Anguilla', 'combo-blocks'),
      'AQ' => __('Antarctica', 'combo-blocks'),
      'AG' => __('Antigua and Barbuda', 'combo-blocks'),
      'AR' => __('Argentina', 'combo-blocks'),
      'AM' => __('Armenia', 'combo-blocks'),
      'AW' => __('Aruba', 'combo-blocks'),
      'AU' => __('Australia', 'combo-blocks'),
      'AT' => __('Austria', 'combo-blocks'),
      'AZ' => __('Azerbaijan', 'combo-blocks'),
      'BS' => __('Bahamas', 'combo-blocks'),
      'BH' => __('Bahrain', 'combo-blocks'),
      'BD' => __('Bangladesh', 'combo-blocks'),
      'BB' => __('Barbados', 'combo-blocks'),
      'BY' => __('Belarus', 'combo-blocks'),
      'BE' => __('Belgium', 'combo-blocks'),
      'BZ' => __('Belize', 'combo-blocks'),
      'BJ' => __('Benin', 'combo-blocks'),
      'BM' => __('Bermuda', 'combo-blocks'),
      'BT' => __('Bhutan', 'combo-blocks'),
      'BO' => __('Bolivia', 'combo-blocks'),
      'BA' => __('Bosnia and Herzegovina', 'combo-blocks'),
      'BW' => __('Botswana', 'combo-blocks'),
      'BV' => __('Bouvet Island', 'combo-blocks'),
      'BR' => __('Brazil', 'combo-blocks'),
      'BQ' => __('British Antarctic Territory', 'combo-blocks'),
      'IO' => __('British Indian Ocean Territory', 'combo-blocks'),
      'VG' => __('British Virgin Islands', 'combo-blocks'),
      'BN' => __('Brunei', 'combo-blocks'),
      'BG' => __('Bulgaria', 'combo-blocks'),
      'BF' => __('Burkina Faso', 'combo-blocks'),
      'BI' => __('Burundi', 'combo-blocks'),
      'KH' => __('Cambodia', 'combo-blocks'),
      'CM' => __('Cameroon', 'combo-blocks'),
      'CA' => __('Canada', 'combo-blocks'),
      'CT' => __('Canton and Enderbury Islands', 'combo-blocks'),
      'CV' => __('Cape Verde', 'combo-blocks'),
      'KY' => __('Cayman Islands', 'combo-blocks'),
      'CF' => __('Central African Republic', 'combo-blocks'),
      'TD' => __('Chad', 'combo-blocks'),
      'CL' => __('Chile', 'combo-blocks'),
      'CN' => __('China', 'combo-blocks'),
      'CX' => __('Christmas Island', 'combo-blocks'),
      'CC' => __('Cocos [Keeling] Islands', 'combo-blocks'),
      'CO' => __('Colombia', 'combo-blocks'),
      'KM' => __('Comoros', 'combo-blocks'),
      'CG' => __('Congo - Brazzaville', 'combo-blocks'),
      'CD' => __('Congo - Kinshasa', 'combo-blocks'),
      'CK' => __('Cook Islands', 'combo-blocks'),
      'CR' => __('Costa Rica', 'combo-blocks'),
      'HR' => __('Croatia', 'combo-blocks'),
      'CU' => __('Cuba', 'combo-blocks'),
      'CY' => __('Cyprus', 'combo-blocks'),
      'CZ' => __('Czech Republic', 'combo-blocks'),
      'CI' => __('Côte d’Ivoire', 'combo-blocks'),
      'DK' => __('Denmark', 'combo-blocks'),
      'DJ' => __('Djibouti', 'combo-blocks'),
      'DM' => __('Dominica', 'combo-blocks'),
      'DO' => __('Dominican Republic', 'combo-blocks'),
      'NQ' => __('Dronning Maud Land', 'combo-blocks'),
      'DD' => __('East Germany', 'combo-blocks'),
      'EC' => __('Ecuador', 'combo-blocks'),
      'EG' => __('Egypt', 'combo-blocks'),
      'SV' => __('El Salvador', 'combo-blocks'),
      'GQ' => __('Equatorial Guinea', 'combo-blocks'),
      'ER' => __('Eritrea', 'combo-blocks'),
      'EE' => __('Estonia', 'combo-blocks'),
      'ET' => __('Ethiopia', 'combo-blocks'),
      'FK' => __('Falkland Islands', 'combo-blocks'),
      'FO' => __('Faroe Islands', 'combo-blocks'),
      'FJ' => __('Fiji', 'combo-blocks'),
      'FI' => __('Finland', 'combo-blocks'),
      'FR' => __('France', 'combo-blocks'),
      'GF' => __('French Guiana', 'combo-blocks'),
      'PF' => __('French Polynesia', 'combo-blocks'),
      'TF' => __('French Southern Territories', 'combo-blocks'),
      'FQ' => __('French Southern and Antarctic Territories', 'combo-blocks'),
      'GA' => __('Gabon', 'combo-blocks'),
      'GM' => __('Gambia', 'combo-blocks'),
      'GE' => __('Georgia', 'combo-blocks'),
      'DE' => __('Germany', 'combo-blocks'),
      'GH' => __('Ghana', 'combo-blocks'),
      'GI' => __('Gibraltar', 'combo-blocks'),
      'GR' => __('Greece', 'combo-blocks'),
      'GL' => __('Greenland', 'combo-blocks'),
      'GD' => __('Grenada', 'combo-blocks'),
      'GP' => __('Guadeloupe', 'combo-blocks'),
      'GU' => __('Guam', 'combo-blocks'),
      'GT' => __('Guatemala', 'combo-blocks'),
      'GG' => __('Guernsey', 'combo-blocks'),
      'GN' => __('Guinea', 'combo-blocks'),
      'GW' => __('Guinea-Bissau', 'combo-blocks'),
      'GY' => __('Guyana', 'combo-blocks'),
      'HT' => __('Haiti', 'combo-blocks'),
      'HM' => __('Heard Island and McDonald Islands', 'combo-blocks'),
      'HN' => __('Honduras', 'combo-blocks'),
      'HK' => __('Hong Kong SAR China', 'combo-blocks'),
      'HU' => __('Hungary', 'combo-blocks'),
      'IS' => __('Iceland', 'combo-blocks'),
      'IN' => __('India', 'combo-blocks'),
      'ID' => __('Indonesia', 'combo-blocks'),
      'IR' => __('Iran', 'combo-blocks'),
      'IQ' => __('Iraq', 'combo-blocks'),
      'IE' => __('Ireland', 'combo-blocks'),
      'IM' => __('Isle of Man', 'combo-blocks'),
      'IL' => __('Israel', 'combo-blocks'),
      'IT' => __('Italy', 'combo-blocks'),
      'JM' => __('Jamaica', 'combo-blocks'),
      'JP' => __('Japan', 'combo-blocks'),
      'JE' => __('Jersey', 'combo-blocks'),
      'JT' => __('Johnston Island', 'combo-blocks'),
      'JO' => __('Jordan', 'combo-blocks'),
      'KZ' => __('Kazakhstan', 'combo-blocks'),
      'KE' => __('Kenya', 'combo-blocks'),
      'KI' => __('Kiribati', 'combo-blocks'),
      'KW' => __('Kuwait', 'combo-blocks'),
      'KG' => __('Kyrgyzstan', 'combo-blocks'),
      'LA' => __('Laos', 'combo-blocks'),
      'LV' => __('Latvia', 'combo-blocks'),
      'LB' => __('Lebanon', 'combo-blocks'),
      'LS' => __('Lesotho', 'combo-blocks'),
      'LR' => __('Liberia', 'combo-blocks'),
      'LY' => __('Libya', 'combo-blocks'),
      'LI' => __('Liechtenstein', 'combo-blocks'),
      'LT' => __('Lithuania', 'combo-blocks'),
      'LU' => __('Luxembourg', 'combo-blocks'),
      'MO' => __('Macau SAR China', 'combo-blocks'),
      'MK' => __('Macedonia', 'combo-blocks'),
      'MG' => __('Madagascar', 'combo-blocks'),
      'MW' => __('Malawi', 'combo-blocks'),
      'MY' => __('Malaysia', 'combo-blocks'),
      'MV' => __('Maldives', 'combo-blocks'),
      'ML' => __('Mali', 'combo-blocks'),
      'MT' => __('Malta', 'combo-blocks'),
      'MH' => __('Marshall Islands', 'combo-blocks'),
      'MQ' => __('Martinique', 'combo-blocks'),
      'MR' => __('Mauritania', 'combo-blocks'),
      'MU' => __('Mauritius', 'combo-blocks'),
      'YT' => __('Mayotte', 'combo-blocks'),
      'FX' => __('Metropolitan France', 'combo-blocks'),
      'MX' => __('Mexico', 'combo-blocks'),
      'FM' => __('Micronesia', 'combo-blocks'),
      'MI' => __('Midway Islands', 'combo-blocks'),
      'MD' => __('Moldova', 'combo-blocks'),
      'MC' => __('Monaco', 'combo-blocks'),
      'MN' => __('Mongolia', 'combo-blocks'),
      'ME' => __('Montenegro', 'combo-blocks'),
      'MS' => __('Montserrat', 'combo-blocks'),
      'MA' => __('Morocco', 'combo-blocks'),
      'MZ' => __('Mozambique', 'combo-blocks'),
      'MM' => __('Myanmar [Burma]', 'combo-blocks'),
      'NA' => __('Namibia', 'combo-blocks'),
      'NR' => __('Nauru', 'combo-blocks'),
      'NP' => __('Nepal', 'combo-blocks'),
      'NL' => __('Netherlands', 'combo-blocks'),
      'AN' => __('Netherlands Antilles', 'combo-blocks'),
      'NT' => __('Neutral Zone', 'combo-blocks'),
      'NC' => __('New Caledonia', 'combo-blocks'),
      'NZ' => __('New Zealand', 'combo-blocks'),
      'NI' => __('Nicaragua', 'combo-blocks'),
      'NE' => __('Niger', 'combo-blocks'),
      'NG' => __('Nigeria', 'combo-blocks'),
      'NU' => __('Niue', 'combo-blocks'),
      'NF' => __('Norfolk Island', 'combo-blocks'),
      'KP' => __('North Korea', 'combo-blocks'),
      'VD' => __('North Vietnam', 'combo-blocks'),
      'MP' => __('Northern Mariana Islands', 'combo-blocks'),
      'NO' => __('Norway', 'combo-blocks'),
      'OM' => __('Oman', 'combo-blocks'),
      'PC' => __('Pacific Islands Trust Territory', 'combo-blocks'),
      'PK' => __('Pakistan', 'combo-blocks'),
      'PW' => __('Palau', 'combo-blocks'),
      'PS' => __('Palestinian Territories', 'combo-blocks'),
      'PA' => __('Panama', 'combo-blocks'),
      'PZ' => __('Panama Canal Zone', 'combo-blocks'),
      'PG' => __('Papua New Guinea', 'combo-blocks'),
      'PY' => __('Paraguay', 'combo-blocks'),
      'YD' => __('People\'s Democratic Republic of Yemen', 'combo-blocks'),
      'PE' => __('Peru', 'combo-blocks'),
      'PH' => __('Philippines', 'combo-blocks'),
      'PN' => __('Pitcairn Islands', 'combo-blocks'),
      'PL' => __('Poland', 'combo-blocks'),
      'PT' => __('Portugal', 'combo-blocks'),
      'PR' => __('Puerto Rico', 'combo-blocks'),
      'QA' => __('Qatar', 'combo-blocks'),
      'RO' => __('Romania', 'combo-blocks'),
      'RU' => __('Russia', 'combo-blocks'),
      'RW' => __('Rwanda', 'combo-blocks'),
      'BL' => __('Saint Barthélemy', 'combo-blocks'),
      'SH' => __('Saint Helena', 'combo-blocks'),
      'KN' => __('Saint Kitts and Nevis', 'combo-blocks'),
      'LC' => __('Saint Lucia', 'combo-blocks'),
      'MF' => __('Saint Martin', 'combo-blocks'),
      'PM' => __('Saint Pierre and Miquelon', 'combo-blocks'),
      'VC' => __('Saint Vincent and the Grenadines', 'combo-blocks'),
      'WS' => __('Samoa', 'combo-blocks'),
      'SM' => __('San Marino', 'combo-blocks'),
      'SA' => __('Saudi Arabia', 'combo-blocks'),
      'SN' => __('Senegal', 'combo-blocks'),
      'RS' => __('Serbia', 'combo-blocks'),
      'CS' => __('Serbia and Montenegro', 'combo-blocks'),
      'SC' => __('Seychelles', 'combo-blocks'),
      'SL' => __('Sierra Leone', 'combo-blocks'),
      'SG' => __('Singapore', 'combo-blocks'),
      'SK' => __('Slovakia', 'combo-blocks'),
      'SI' => __('Slovenia', 'combo-blocks'),
      'SB' => __('Solomon Islands', 'combo-blocks'),
      'SO' => __('Somalia', 'combo-blocks'),
      'ZA' => __('South Africa', 'combo-blocks'),
      'GS' => __('South Georgia and the South Sandwich Islands', 'combo-blocks'),
      'KR' => __('South Korea', 'combo-blocks'),
      'ES' => __('Spain', 'combo-blocks'),
      'LK' => __('Sri Lanka', 'combo-blocks'),
      'SD' => __('Sudan', 'combo-blocks'),
      'SR' => __('Suriname', 'combo-blocks'),
      'SJ' => __('Svalbard and Jan Mayen', 'combo-blocks'),
      'SZ' => __('Swaziland', 'combo-blocks'),
      'SE' => __('Sweden', 'combo-blocks'),
      'CH' => __('Switzerland', 'combo-blocks'),
      'SY' => __('Syria', 'combo-blocks'),
      'ST' => __('São Tomé and Príncipe', 'combo-blocks'),
      'TW' => __('Taiwan', 'combo-blocks'),
      'TJ' => __('Tajikistan', 'combo-blocks'),
      'TZ' => __('Tanzania', 'combo-blocks'),
      'TH' => __('Thailand', 'combo-blocks'),
      'TL' => __('Timor-Leste', 'combo-blocks'),
      'TG' => __('Togo', 'combo-blocks'),
      'TK' => __('Tokelau', 'combo-blocks'),
      'TO' => __('Tonga', 'combo-blocks'),
      'TT' => __('Trinidad and Tobago', 'combo-blocks'),
      'TN' => __('Tunisia', 'combo-blocks'),
      'TR' => __('Turkey', 'combo-blocks'),
      'TM' => __('Turkmenistan', 'combo-blocks'),
      'TC' => __('Turks and Caicos Islands', 'combo-blocks'),
      'TV' => __('Tuvalu', 'combo-blocks'),
      'UM' => __('U.S. Minor Outlying Islands', 'combo-blocks'),
      'PU' => __('U.S. Miscellaneous Pacific Islands', 'combo-blocks'),
      'VI' => __('U.S. Virgin Islands', 'combo-blocks'),
      'UG' => __('Uganda', 'combo-blocks'),
      'UA' => __('Ukraine', 'combo-blocks'),
      'SU' => __('Union of Soviet Socialist Republics', 'combo-blocks'),
      'AE' => __('United Arab Emirates', 'combo-blocks'),
      'GB' => __('United Kingdom', 'combo-blocks'),
      'US' => __('United States', 'combo-blocks'),
      'ZZ' => __('Unknown or Invalid Region', 'combo-blocks'),
      'UY' => __('Uruguay', 'combo-blocks'),
      'UZ' => __('Uzbekistan', 'combo-blocks'),
      'VU' => __('Vanuatu', 'combo-blocks'),
      'VA' => __('Vatican City', 'combo-blocks'),
      'VE' => __('Venezuela', 'combo-blocks'),
      'VN' => __('Vietnam', 'combo-blocks'),
      'WK' => __('Wake Island', 'combo-blocks'),
      'WF' => __('Wallis and Futuna', 'combo-blocks'),
      'EH' => __('Western Sahara', 'combo-blocks'),
      'YE' => __('Yemen', 'combo-blocks'),
      'ZM' => __('Zambia', 'combo-blocks'),
      'ZW' => __('Zimbabwe', 'combo-blocks'),
      'AX' => __('Åland Islands', 'combo-blocks'),
    );
    $inputArgs = [];
    foreach ($countries as $index => $country) {
      $inputArgs[] = [
        'label' => $country,
        'value' => $index,
      ];
    }
  }
  if ($argsSrc == "ageGroupsNum") {
    $inputArgs = [];
    $ageGroups = [
      "0-16" => "Child",
      "25-64" => "Adults",
      "65-69" => "Seniors"
    ];
    foreach ($ageGroups as $index => $ageGroup) {
      $inputArgs[] = [
        'label' => $ageGroup,
        'value' => $index,
      ];
    }
  }
  if ($argsSrc == "ageGroupsKids") {
    //https://support.google.com/manufacturers/answer/7494266?hl=en#zippy=%2Csizes-that-vary-by-age-group
    $inputArgs = [];
    $ageGroups = [
      "newborn" => "Newborn",
      "infant" => "Infant",
      "toddler" => "Toddler",
      "kids" => "Kids",
      "adult" => "Adult"
    ];
    foreach ($ageGroups as $index => $ageGroup) {
      $inputArgs[] = [
        'label' => $ageGroup,
        'value' => $index,
      ];
    }
  }
  if ($argsSrc == "gender") {
    $inputArgs = [];
    $genders = [
      "female" => "Female",
      "male" => "Male",
      "others" => "Others"
    ];
    foreach ($genders as $index => $gender) {
      $inputArgs[] = [
        'label' => $gender,
        'value' => $index,
      ];
    }
  }
  return $inputArgs;
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
        // $curentYear = date('Y');
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'Y');
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
        // $curentYear = date('m');
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'm');
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
        //$curentYear = date('m');
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'w');
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
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'H');
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
        // $curentYears = date('Y-m-d');
        $curentYear = get_date_from_gmt(date("Y-m-d H:i:s"), 'Y-m-d');
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
        $queryArray = array();
        parse_str($_SERVER['QUERY_STRING'], $queryArray);
        $pramExist = !empty(array_intersect($prams, array_keys($queryArray)));
        if ($pramExist) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'urlPramsVal') {
        $value = isset($arg['value']) ? $arg['value'] : '';

        $key = isset($arg['key']) ? $arg['key'] : '';
        $prams = explode(",", $key);


        $queryArray = array();
        parse_str($_SERVER['QUERY_STRING'], $queryArray);
        $pramExist = !empty(array_intersect($prams, array_keys($queryArray)));



        if ($pramExist && $queryArray[$key] == $value) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }



      if ($id == 'urlString') {
        $value = isset($arg['value']) ? $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '';
        if ($compare == 'contain') {
          if (strpos($_SERVER['REQUEST_URI'], $value) !== false) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'notContain') {
          if (strpos($_SERVER['REQUEST_URI'], $value) !== false) {
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
        $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
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
        $value = isset($arg['value']) ? (int) $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '=';


        if ($compare == '=') {
          if ($comments_count == $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($comments_count != $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>') {
          if ($comments_count > $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          if ($comments_count < $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          if ($comments_count >= $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          if ($comments_count <= $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
      }
      if ($id == 'isPostMeta') {
        $post_id = get_the_ID();



        $metaKey = isset($arg['metaKey']) ?  $arg['metaKey'] : '';
        $metaValue = get_post_meta($post_id, $metaKey, true);



        $value = isset($arg['value']) ?  $arg['value'] : '';
        $compare = isset($arg['compare']) ? $arg['compare'] : '=';

        if ($compare == '=') {
          if ($metaValue == $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '!=') {
          if ($metaValue != $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'empty') {
          if (empty($metaValue)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == 'notEmpty') {
          if (!empty($metaValue)) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }





        if ($compare == '>') {
          if ($metaValue > $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<') {
          if ($metaValue < $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '>=') {
          if ($metaValue >= $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
        }
        if ($compare == '<=') {
          if ($metaValue <= $value) {
            $isAccess = true;
            $conditions[$i]['args'][$j] = $isAccess;
          } else {
            $conditions[$i]['args'][$j] = $isAccess;
          }
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
      if ($id == 'tutorLmsIsErolled') {
        // $value = isset($arg['value']) ? $arg['value'] : '';
        // $compare = isset($arg['compare']) ? $arg['compare'] : '=';

        global $is_enrolled;

        if ($is_enrolled) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'tutorLmsIsPublicCourse') {
        // $value = isset($arg['value']) ? $arg['value'] : '';
        // $compare = isset($arg['compare']) ? $arg['compare'] : '=';
        $is_public            = get_post_meta(get_the_ID(), '_tutor_is_public_course', true) == 'yes';


        if ($is_public) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'tutorLmsIsPrivileged') {
        // $value = isset($arg['value']) ? $arg['value'] : '';
        // $compare = isset($arg['compare']) ? $arg['compare'] : '=';
        $is_privileged_user = false;
        if (function_exists("tutor_utils")) {
          $is_privileged_user   = tutor_utils()->has_user_course_content_access();
        }

        if ($is_privileged_user) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'tutorLmsIsPurchasable') {
        // $value = isset($arg['value']) ? $arg['value'] : '';
        // $compare = isset($arg['compare']) ? $arg['compare'] : '=';
        $is_purchasable = false;
        if (function_exists("tutor_utils")) {
          $is_purchasable = tutor_utils()->is_course_purchasable();
        }

        if ($is_purchasable) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'tutorLmsIsCompletedCourse') {
        // $value = isset($arg['value']) ? $arg['value'] : '';
        // $compare = isset($arg['compare']) ? $arg['compare'] : '=';
        $is_completed_course = false;
        if (function_exists("tutor_utils")) {
          $is_completed_course = tutor_utils()->is_completed_course();
        }
        if ($is_completed_course) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'tutorLmsCanRetakeCourse') {
        // $value = isset($arg['value']) ? $arg['value'] : '';
        // $compare = isset($arg['compare']) ? $arg['compare'] : '=';
        $retake_course = false;
        if (function_exists("tutor_utils")) {
          $retake_course       = tutor_utils()->can_user_retake_course();
        }
        if ($retake_course) {
          $isAccess = true;
          $conditions[$i]['args'][$j] = $isAccess;
        } else {
          $conditions[$i]['args'][$j] = $isAccess;
        }
      }
      if ($id == 'tutorLmsIsCourseFullyBooked') {
        // $value = isset($arg['value']) ? $arg['value'] : '';
        // $compare = isset($arg['compare']) ? $arg['compare'] : '=';
        $fully_booked = false;
        if (function_exists("tutor_utils")) {
          $fully_booked       = tutor_utils()->is_course_fully_booked(null);
        }
        if ($fully_booked) {
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
add_filter('render_block', function ($block_content, $block) {
  // Make sure we have the blockName.
  if (empty($block['blockName'])) {
    return $block_content;
  }
  // If this is a pagination block, enqueue the pagination script.
  if (
    'combo-blocks/woo-product-tabs' === $block['blockName']
  ) {
    wp_enqueue_script('pg-woo-product-tabs-scripts');
  }
  // Return the block content.
  return $block_content;
}, 10, 2);
function combo_blocks_generateShortcode($params, $default)
{
  $shortcode = '[' . $default;
  foreach ($params as $key => $value) {
    if (!empty($value)) {
      $shortcode .= ' ' . $key . '="' . $value . '"';
    }
  }
  $shortcode .= ']';
  return $shortcode;
}
function combo_blocks_breadcrumb_dynamic_links()
{
  $home_url = get_bloginfo('url');
  $breadcrumb_home_text = "Home";
  $breadcrumb_display_home = "yes";
  $active_plugins = get_option('active_plugins');
  $array_list = [];
  if (is_front_page() && is_home()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $home_url,
        'label' => ($breadcrumb_home_text),
      );
  } elseif (is_front_page()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $home_url,
        'label' => ($breadcrumb_home_text),
      );
  } elseif (is_home()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => ($breadcrumb_home_text),
      );
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $home_url,
      'label' => __('Blog', 'combo-blocks'),
    );
  } else if (is_attachment()) {
    $current_attachment_id = get_query_var('attachment_id');
    $current_attachment_link = get_attachment_link($current_attachment_id);
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => ($breadcrumb_home_text),
      );
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $current_attachment_link,
      'label' => get_the_title(),
    );
  } else if (in_array('woocommerce/woocommerce.php', (array) $active_plugins) && is_woocommerce() && is_shop()) {
    $shop_page_id = wc_get_page_id('shop');
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($shop_page_id),
      'label' => get_the_title($shop_page_id),
    );
  } else if (is_page()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    global $post;
    $home = get_post(get_option('page_on_front'));
    $j = 2;
    for ($i = count($post->ancestors) - 1; $i >= 0; $i--) {
      if (($home->ID) != ($post->ancestors[$i])) {
        $array_list[] = array(
          'link' => get_permalink($post->ancestors[$i]),
          'label' => get_the_title($post->ancestors[$i]),
        );
      }
      $j++;
    }
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash :  get_permalink($post->ID),
      'label' => get_the_title($post->ID),
    );
  } else if (is_singular()) {
    if (is_preview()) {
      $array_list[] = array(
        'link' => '#',
        'label' => __('Post preview', 'combo-blocks'),
      );
      return $array_list;
    }
    $permalink_structure = get_option('permalink_structure', true);
    //        $permalink_structure = str_replace('%postname%','',$permalink_structure);
    //        $permalink_structure = str_replace('%post_id%','',$permalink_structure);
    $permalink_items = array_filter(explode('/', $permalink_structure));
    global $post;
    $author_id = $post->post_author;
    $author_posts_url = get_author_posts_url($author_id);
    $author_name = get_the_author_meta('display_name', $author_id);
    $post_date_year = get_the_time('Y');
    $post_date_month = get_the_time('m');
    $post_date_day = get_the_time('d');
    $get_month_link = get_month_link($post_date_year, $post_date_month);
    $get_year_link = get_year_link($post_date_year);
    $get_day_link = get_day_link($post_date_year, $post_date_month, $post_date_day);
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    if (!empty($permalink_structure) && get_post_type() == 'post') {
      $item_count = 2;
      foreach ($permalink_items as $item) :
        if ($item == '%year%') {
          $array_list[] = array(
            'link' => $get_year_link,
            'label' => $post_date_year,
          );
        } elseif ($item == '%monthnum%') {
          $array_list[] = array(
            'link' => $get_month_link,
            'label' => $post_date_month,
          );
        } elseif ($item == '%day%') {
          $array_list[] = array(
            'link' => $get_day_link,
            'label' => $post_date_day,
          );
        } elseif ($item == '%author%') {
          $array_list[] = array(
            'link' => $author_posts_url,
            'label' => $author_name,
          );
        } elseif ($item == '%post_id%') {
          $array_list[] = array(
            'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
            'label' => $post->ID,
          );
        } elseif ($item == '%postname%') {
          $array_list[] = array(
            'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
            'label' => get_the_title($post->ID),
          );
        } elseif ($item == 'archives') {
          $array_list[] = array(
            'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
            'label' => __('Archives', 'combo-blocks'),
          );
        } elseif ($item == '%category%') {
          $category_string = get_query_var('category_name');
          $category_arr = array();
          $taxonomy = 'category';
          if (strpos($category_string, '/')) {
            $category_arr = explode('/', $category_string);
            $category_count = count($category_arr);
            $last_cat = $category_arr[($category_count - 1)];
            $term_data = get_term_by('slug', $last_cat, $taxonomy);
            $term_id = $term_data->term_id;
            $term_name = $term_data->name;
            $term_link = get_term_link($term_id, $taxonomy);
            $parents_id  = get_ancestors($term_id, $taxonomy);
            $parents_id = array_reverse($parents_id);
            $i = $item_count + 1;
            foreach ($parents_id as $id) {
              $parent_term_link = get_term_link($id, $taxonomy);
              $paren_term_name = get_term_by('id', $id, $taxonomy);
              $array_list[] = array(
                'link' => $parent_term_link,
                'label' => $paren_term_name->name,
              );
              $i++;
            }
            $array_list[] = array(
              'link' => $term_link,
              'label' => $term_name,
            );
          } else {
            $term_data = get_term_by('slug', $category_string, $taxonomy);
            $term_id = isset($term_data->term_id) ? $term_data->term_id : '';
            $term_name = isset($term_data->name) ? $term_data->name : '';
            if (!empty($term_id)) :
              $term_link = get_term_link($term_id, $taxonomy);
              $array_list[] = array(
                'link' => $term_link,
                'label' => $term_name,
              );
            endif;
          }
        }
        $item_count++;
      endforeach;
    } elseif (get_post_type() == 'product') {
      $shop_page_id = wc_get_page_id('shop');
      $woocommerce_permalinks = get_option('woocommerce_permalinks', '');
      $product_base = $woocommerce_permalinks['product_base'];
      $permalink_items = array_filter(explode('/', $product_base));
      if (in_array('shop', $permalink_items)) {
        $array_list[] = array(
          'link' => get_permalink($shop_page_id),
          'label' => get_the_title($shop_page_id),
        );
      }
      if (in_array('%product_cat%', $permalink_items)) {
        $category_string = get_query_var('product_cat');
        //$category_string = get_query_var('category_name');
        $category_arr = array();
        $taxonomy = 'product_cat';
        if (strpos($category_string, '/')) {
          $category_arr = explode('/', $category_string);
          $category_count = count($category_arr);
          $last_cat = $category_arr[($category_count - 1)];
          $term_data = get_term_by('slug', $last_cat, $taxonomy);
          $term_id = $term_data->term_id;
          $term_name = $term_data->name;
          $term_link = get_term_link($term_id, $taxonomy);
          $parents_id  = get_ancestors($term_id, $taxonomy);
          $parents_id = array_reverse($parents_id);
          $i = 3;
          foreach ($parents_id as $id) {
            $parent_term_link = get_term_link($id, $taxonomy);
            $paren_term_name = get_term_by('id', $id, $taxonomy);
            $array_list[] = array(
              'link' => $parent_term_link,
              'label' => $paren_term_name->name,
            );
            $i++;
          }
          $array_list[] = array(
            'link' => $term_link,
            'label' => $term_name,
          );
        } else {
          $term_data = get_term_by('slug', $category_string, $taxonomy);
          $term_id = isset($term_data->term_id) ? $term_data->term_id : '';
          $term_name = isset($term_data->name) ? $term_data->name : '';
          if (!empty($term_id)) :
            $term_link = get_term_link($term_id, $taxonomy);
            $array_list[] = array(
              'link' => $term_link,
              'label' => $term_name,
            );
            $array_list[] = array(
              'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
              'label' => get_the_title($post->ID),
            );
          endif;
        }
      }
      $array_list_count = count($array_list);
      $array_list[] = array(
        'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
        'label' => get_the_title($post->ID),
      );
      //            $array_list[3] = array(
      //                'link'=>get_permalink($post->ID),
      //                'label' => get_the_title($post->ID),
      //            );
    } else {
      $postType = get_post_type();
      $pt = get_post_type_object($postType);
      $posTypeName = isset($pt->labels->singular_name) ? $pt->labels->singular_name : $postType;
      $array_list[] = array(
        'link' => '#',
        'label' => $posTypeName,
      );
      $array_list[] = array(
        'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_permalink($post->ID),
        'label' => get_the_title($post->ID),
      );
    }
  } else if (is_tax()) {
    $queried_object = get_queried_object();
    $term_name = $queried_object->name;
    $term_id = $queried_object->term_id;
    $taxonomy = $queried_object->taxonomy;
    $term_link = get_term_link($term_id, $taxonomy);
    $parents_id  = get_ancestors($term_id, $taxonomy);
    $parents_id = array_reverse($parents_id);
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $i = 2;
    foreach ($parents_id as $id) {
      $parent_term_link = get_term_link($id, $taxonomy);
      $paren_term_name = get_term_by('id', $id, $taxonomy);
      $array_list[] = array(
        'link' => $parent_term_link,
        'label' => $paren_term_name->name,
      );
      $i++;
    }
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $term_link,
      'label' => $term_name,
    );
  } else if (is_category()) {
    $current_cat_id = get_query_var('cat');
    $queried_object = get_queried_object();
    $taxonomy = $queried_object->taxonomy;
    $term_id = $queried_object->term_id;
    $term_name = $queried_object->name;
    $term_link = get_term_link($term_id, $taxonomy);
    $parents_id  = get_ancestors($term_id, $taxonomy);
    $parents_id = array_reverse($parents_id);
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => $taxonomy,
    );
    $i = 3;
    foreach ($parents_id as $id) {
      $parent_term_link = get_term_link($id, $taxonomy);
      $paren_term_name = get_term_by('id', $id, $taxonomy);
      $array_list[] = array(
        'link' => $parent_term_link,
        'label' => $paren_term_name->name,
      );
      $i++;
    }
    $array_list[] = array(
      'link' => !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $term_link,
      'label' => $term_name,
    );
  } else if (is_tag()) {
    $current_tag_id = get_query_var('tag_id');
    $current_tag = get_tag($current_tag_id);
    $current_tag_name = $current_tag->name;
    $current_tag_link = get_tag_link($current_tag_id);;
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Tag', 'combo-blocks'),
    );
    $array_list[] = array(
      'link' =>  !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : $current_tag_link,
      'label' => $current_tag_name,
    );
  } else if (is_author()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Author', 'combo-blocks'),
    );
    $array_list[] = array(
      'link' =>  !empty($breadcrumb_url_hash) ? $breadcrumb_url_hash : get_author_posts_url(get_the_author_meta("ID")),
      'label' => get_the_author(),
    );
  } else if (is_search()) {
    $current_query = sanitize_text_field(get_query_var('s'));
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' =>  '#',
      'label' => __('Search', 'combo-blocks'),
    );
    $array_list[] = array(
      'link' =>  '#',
      'label' => $current_query,
    );
  } else if (is_year()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Year', 'combo-blocks'),
    );
    $array_list[] = array(
      'link' =>  '#',
      'label' => get_the_date('Y'),
    );
  } else if (is_month()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Month', 'combo-blocks'),
    );
    $array_list[] = array(
      'link' =>  '#',
      'label' => get_the_date('F'),
    );
  } else if (is_date()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' => '#',
      'label' => __('Date', 'combo-blocks'),
    );
    $array_list[] = array(
      'link' =>  '#',
      'label' => get_the_date(),
    );
  } elseif (is_404()) {
    if ($breadcrumb_display_home == 'yes')
      $array_list[] = array(
        'link' => $home_url,
        'label' => $breadcrumb_home_text,
      );
    $array_list[] = array(
      'link' =>  '#',
      'label' => __('404', 'combo-blocks'),
    );
  }
  return $array_list;
}
function combo_blocks_tag_escape($tag)
{
  $tag = strtolower(preg_replace('/[^a-zA-Z0-9-_:]/', '', $tag));
  $allowed_tags = ['section', 'strong', 'template', 'fieldset', 'figcaption', 'figure', 'blockquote', 'article', 'address', 'code', 'aside', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'a', 'button', 'table', 'tr', 'td', 'th', 'tbody', 'thead', 'tfoot', 'caption', 'br'];
  if (in_array($tag, $allowed_tags)) {
    return $tag;
  } else {
    return 'div';
  }
}

// function combo_blocks_wpkses_post_tags($tags, $context)
// {
//   //if ('post' === $context) {
//   $tags['iframe'] = array(
//     'src'             => true,
//     'height'          => true,
//     'width'           => true,
//     'frameborder'     => true,
//     'allowfullscreen' => true,
//   );
//   //}
//   return $tags;
// }
//add_filter('wp_kses_allowed_html', 'combo_blocks_wpkses_post_tags', 10, 2);



//add_action('wp_footer', 'combo_blocks_check_sidebars', 99);
function combo_blocks_check_sidebars()
{

  //global $sidebars_widgets;
  $sidebar_widgets = wp_get_sidebars_widgets();




  if (!empty($sidebar_widgets)):
    foreach ($sidebar_widgets as $sidebars_index => $sidebars):

      foreach ($sidebars as $widget_id) {
        //$sidebar_content = get_sidebar_content(); // Your custom function to get the content

        ob_start();
        dynamic_sidebar($widget_id);
        $sidebar_html = ob_get_clean();
      }


    endforeach;


  endif;
}


function combo_blocks_clean_html($html)
{
  $cleanedHtml = preg_replace('/\s+/', ' ', $html);

  return $cleanedHtml;
}


function combo_blocks_output_format($formatPrams, $metaValue)
{

  $response = "";

  foreach ($formatPrams as $formatPram) {

    $id = isset($formatPram["id"]) ? $formatPram["id"] : "";


    if ($id == "commaSeparateToList") {

      $response = explode(",", $metaValue);
    }
    if ($id == "newLineToList") {
      if (!empty($metaValue)) {
        $response = explode("\n", $metaValue);
      }
    }
    if ($id == "postFieldById") {
      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $field = isset($args["field"]) ? $args["field"] : "";


      if (!empty($field)) {

        $response = get_post_field($field, $metaValue);
      }
    }
    if ($id == "userFieldById") {
      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $field = isset($args["field"]) ? $args["field"] : "";


      if (!empty($field)) {
        $user_obj = get_user_by('id', $metaValue);

        if (! isset($user_obj->$field)) {
          $response = '';
        }

        $response = $user_obj->$field;
      }
    }
    if ($id == "termFieldById") {

      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $field = isset($args["field"]) ? $args["field"] : "";


      if (!empty($field)) {

        $termField = get_term_field($field, $metaValue);

        if (!is_wp_error($termField)) {
          $response = $termField;
        }
      }
    }
    if ($id == "commentFieldById") {

      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $field = isset($args["field"]) ? $args["field"] : "";


      if (!empty($field)) {
        $comment_obj = get_comment($metaValue, OBJECT);

        if (! isset($comment_obj->$field)) {
          $response = '';
        }

        $response = $comment_obj->$field;
      }
    }
    if ($id == "timeDifference") {

      $response = explode("\n", $metaValue);
    }
    if ($id == "arrayElement") {
      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $index = isset($args["index"]) ? (int) $args["index"] : 0;



      if (maybe_serialize($metaValue)) {
        $data = unserialize($metaValue);


        $array_element = isset($data[$index]) ? $data[$index] : "";

        $response = $array_element;
      } else {
        if (is_array($metaValue)) {
          $array_element = isset($metaValue[$index]) ? $metaValue[$index] : "";

          $response = $array_element;
        }
      }
    }
    if ($id == "arrayMap") {

      $response = explode("\n", $metaValue);
    }
    if ($id == "applyWpautop") {

      $response = wpautop($metaValue);
    }
    if ($id == "acfToWPGallery") {

      $response = wpautop($metaValue);
    }



    if ($id == "applyFilters") {
      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $hookName = isset($args["hookName"]) ? (int) $args["hookName"] : "";
      apply_filters($hookName, $metaValue);
    }
    if ($id == "doAction") {
      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $hookName = isset($args["hookName"]) ? (int) $args["hookName"] : "";
      do_action($hookName, $metaValue);
    }


    if ($id == "doShortcode") {

      $response = do_shortcode($metaValue);
    }

    if ($id == "arrayItemCount") {

      if (maybe_serialize($metaValue)) {
        $data = unserialize($metaValue);


        $response = count($data);
      } else {
        if (is_array($metaValue)) {
          $response = count($metaValue);
        }
      }
    }
    if ($id == "formatNumber") {


      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $decimals = isset($args["decimals"]) ? $args["decimals"] : 2;
      $decimalpoint = isset($args["decimalpoint"]) ? $args["decimalpoint"] : ".";
      $separator = isset($args["separator"]) ? $args["separator"] : "";

      $formattedNumber = number_format($metaValue, $decimals, $decimalpoint, $separator);

      $response = $formattedNumber;
    }


    if ($id == "iframeUrl") {

      $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
      $title = isset($args["title"]) ? (int) $args["title"] : "";
      $name = isset($args["name"]) ? (int) $args["name"] : "";
      $height = isset($args["height"]) ? (int) $args["height"] : "";
      $width = isset($args["width"]) ? (int) $args["width"] : "";

      if (!empty($metaValue)) {
        ob_start();

    ?><iframe src="<?php echo esc_url($metaValue); ?>" height="<?php echo esc_attr($height); ?>" width="<?php echo esc_attr($width); ?>" title="<?php echo esc_attr($title); ?>" name="<?php echo esc_attr($name); ?>"></iframe><?php
                                                                                                                                                                                                                                $response = ob_get_clean();
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            if ($id == "addToUrl") {

                                                                                                                                                                                                                              $args = isset($formatPram["args"]) ? $formatPram["args"] : [];
                                                                                                                                                                                                                              $title = isset($args["title"]) ?  $args["title"] : "";
                                                                                                                                                                                                                              $name = isset($args["name"]) ?  $args["name"] : "";
                                                                                                                                                                                                                              $scheme = isset($args["scheme"]) ?  $args["scheme"] : "";
                                                                                                                                                                                                                              $target = isset($args["target"]) ?  $args["target"] : "";
                                                                                                                                                                                                                              $linkText = isset($args["linkText"]) ?  $args["linkText"] : "";
                                                                                                                                                                                                                              $linkTextSrc = isset($args["linkTextSrc"]) ? $args["linkTextSrc"] : "";

                                                                                                                                                                                                                              if (!empty($metaValue)) {
                                                                                                                                                                                                                                ob_start();                                                                                                        ?><a href="<?php echo esc_attr($scheme); ?><?php echo esc_url($metaValue); ?>" height="<?php echo esc_attr($height); ?>" target="<?php echo esc_attr($target); ?>" title="<?php echo esc_attr($title); ?>" name="<?php echo esc_attr($name); ?>"></a>
        <?php echo wp_kses_post($linkText); ?>
<?php

                                                                                                                                                                                                                                $response = ob_get_clean();
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                          }

                                                                                                                                                                                                                          return $response;
                                                                                                                                                                                                                        }


                                                                                                                                                                                                                        add_action("init", "combo_blocks_add_role");



                                                                                                                                                                                                                        function combo_blocks_add_role()
                                                                                                                                                                                                                        {

                                                                                                                                                                                                                          $combo_blocks_settings = get_option('combo_blocks_settings');

                                                                                                                                                                                                                          $roles = isset($combo_blocks_settings["roles"]) ? $combo_blocks_settings["roles"] : [];

                                                                                                                                                                                                                          if (!empty($roles))                                                                                                    foreach ($roles as $roleData) {

                                                                                                                                                                                                                            $role = isset($roleData["role"]) ? $roleData["role"] : "";
                                                                                                                                                                                                                            $display_name = isset($roleData["display_name"]) ? $roleData["display_name"] : $role;

                                                                                                                                                                                                                            $args = isset($roleData["args"]) ? $roleData["args"] : [];
                                                                                                                                                                                                                            if (!empty($role)) {
                                                                                                                                                                                                                              add_role($role, $display_name, $args);
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                        }
