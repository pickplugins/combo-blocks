<?php
if (!defined('ABSPATH'))
  exit();


class ComboBlocksUserFields
{
  function __construct()
  {

    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/user-fields/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {

    global $comboBlocksCss;
    $userId = isset($block->context['userId']) ? $block->context['userId'] : '';
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'h2';
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $metaKey = isset($attributes['metaKey']) ? $attributes['metaKey'] : '';
    $frontText = isset($attributes['frontText']) ? $attributes['frontText'] : [];
    $frontTextOptions = isset($frontText['options']) ? $frontText['options'] : [];
    $frontTextText = isset($frontTextOptions['text']) ? $frontTextOptions['text'] : '';
    $frontTextClass = isset($frontTextOptions['class']) ? $frontTextOptions['class'] : '';
    $field = isset($attributes['field']) ? $attributes['field'] : [];
    $fieldOptions = isset($field['options']) ? $field['options'] : [];
    $limitBy = isset($fieldOptions['limitBy']) ? $fieldOptions['limitBy'] : 'word';
    $limitCount = isset($fieldOptions['limitCount']) ? (int) $fieldOptions['limitCount'] : 999;
    $customField = isset($fieldOptions['customField']) ? $fieldOptions['customField'] : "";
    $customFieldType = isset($fieldOptions['customFieldType']) ? $fieldOptions['customFieldType'] : "";
    $customFieldSize = isset($fieldOptions['customFieldSize']) ? $fieldOptions['customFieldSize'] : "full";
    $fieldIsLink = isset($fieldOptions['isLink']) ? $fieldOptions['isLink'] : false;
    $fieldLinkTo = isset($fieldOptions['linkTo']) ? $fieldOptions['linkTo'] : '';
    $fieldLinkToMeta = isset($fieldOptions['linkToMeta']) ? $fieldOptions['linkToMeta'] : '';
    $fieldLinkTarget = isset($fieldOptions['linkTarget']) ? $fieldOptions['linkTarget'] : '';
    $fieldAvatarSize = isset($fieldOptions['avatarSize']) ? $fieldOptions['avatarSize'] : '';
    $fieldDefaultAvatar = isset($fieldOptions['defaultAvatar']) ? $fieldOptions['defaultAvatar'] : '';
    $fieldAvatarRating = isset($fieldOptions['avatarRating']) ? $fieldOptions['avatarRating'] : '';
    $fieldDateFormat = isset($fieldOptions['dateFormat']) ? $fieldOptions['dateFormat'] : '';
    $fieldCustomUrl = isset($fieldOptions['customUrl']) ? $fieldOptions['customUrl'] : '';
    $fieldPrefix = isset($fieldOptions['prefix']) ? $fieldOptions['prefix'] : '';
    $fieldPrefix = isset($fieldOptions['prefix']) ? $fieldOptions['prefix'] : '';
    $fieldlinkAttr = isset($fieldOptions['linkAttr']) ? $fieldOptions['linkAttr'] : '';
    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
    $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
    $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';
    $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
    $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : '';
    $prefixPosition = isset($prefixOptions['position']) ? $prefixOptions['position'] : '';
    $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
    $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';
    $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';
    $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : '';
    $postfixPosition = isset($postfixOptions['position']) ? $postfixOptions['position'] : '';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    //
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    $fieldLink = '';
    if ($fieldLinkTo == 'postUrl') {
      //$fieldLink = get_permalink($post_ID);
    } else if ($fieldLinkTo == 'homeUrl') {
      $fieldLink = get_home_url();
    } else if ($fieldLinkTo == 'authorUrl') {
      $user = get_user_by('ID', $userId);
      $fieldLink = $user->user_url;
    } else if ($fieldLinkTo == 'authorMail') {
      $user = get_user_by('ID', $userId);
      $fieldLink = $user->user_email;
    } else if ($fieldLinkTo == 'authorLink') {
      $fieldLink = get_author_posts_url($userId);
    } else if ($fieldLinkTo == 'customUrl') {
      $fieldLink = $fieldCustomUrl;
    } else if ($fieldLinkTo == 'authorMeta') {
      $fieldLink = get_user_meta($userId, $fieldLinkToMeta, true);
    }
    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    $linkAttrStr = '';
    if (!empty($fieldlinkAttr))
      foreach ($fieldlinkAttr as $attr) {
        if (!empty($attr['val']))
          $linkAttrStr .= esc_attr($attr['id']) . '=' . esc_attr($attr['val']) . ' ';
      }
    $obj['id'] = $userId;
    $obj['type'] = 'user';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
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
    <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="
          <?php echo esc_attr($blockId); ?>
          <?php echo esc_attr($wrapperClass); ?>">
      <?php if (!empty($prefixText) && $prefixPosition == 'beforeFrontText') : ?>
        <span class="<?php echo esc_attr($prefixClass); ?>">
          <?php echo wp_kses_post($prefixText); ?>
        </span>
      <?php endif; ?>
      <?php if ($iconPosition == 'beforeFronttext') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>
      <?php if (!empty($frontTextText)) : ?>
        <span class='frontText'>
          <?php echo wp_kses_post($frontTextText); ?>
        </span>
      <?php endif; ?>
      <?php if ($iconPosition == 'afterFronttext') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>
      <?php if (!empty($prefixText) && $prefixPosition == 'afterFrontText') : ?>
        <span class="<?php echo esc_attr($prefixClass); ?>">
          <?php echo wp_kses_post($prefixText); ?>
        </span>
      <?php endif; ?>
      <?php if ($iconPosition == 'beforeField') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>
      <?php if (!empty($fieldLink)) : ?>
        <a <?php if ($fieldLinkTo == 'authorMail') : ?> href="<?php echo esc_url('mailto:' . $fieldLink); ?>" <?php else : ?>
          href="<?php echo esc_url($fieldLink); ?>" <?php endif; ?> target="<?php echo esc_attr($fieldLinkTarget); ?>"
          <?php //echo $linkAttrStr; 
          ?>>
        <?php endif; ?>
        <?php if (!empty($prefixText) && $prefixPosition == 'beforeField') : ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>
        <?php


        if ($metaKey == 'ID' || $metaKey == 'login' || $metaKey == 'nickname' || $metaKey == 'url' || $metaKey == 'registered' || $metaKey == 'display_name' || $metaKey == 'first_name' || $metaKey == 'last_name' || $metaKey == 'display_name') :
        ?>
          <span class="fieldVal">
            <?php echo wp_kses_post(get_the_author_meta($metaKey, $userId)) ?>
          </span>
        <?php
        elseif ($metaKey == 'description') :
          $metaValue = get_the_author_meta($metaKey, $userId);
          if ($limitBy == 'character') {
            $metaValue = substr($metaValue, 0, $limitCount);
          } else {
            $metaValue = wp_trim_words($metaValue, $limitCount, '');
          } ?>
          <span class="fieldVal">
            <?php echo wp_kses_post($metaValue) ?>
          </span>


          <?php
        elseif ($metaKey == 'roles') :

          $metaValue = get_the_author_meta('roles', $userId);
          if (is_array($metaValue)):
          ?>
            <span class="fieldVal">
              <?php echo wp_kses_post(implode(', ', $metaValue)); ?>
            </span>
          <?php
          endif;

        elseif ($metaKey == 'tutorInstructorCourseCount') :
          $course_count  = 0;

          ?>
          <span class="fieldVal">
            <?php echo wp_kses_post($course_count); ?>
          </span>
        <?php
        elseif ($metaKey == 'tutorInstructorStudentCount') :
          $student_count = 0;
          if (function_exists("tutor_utils")) {
            $student_count = tutor_utils()->get_total_students_by_instructor($userId);
          }


        ?>
          <span class="fieldVal">
            <?php echo wp_kses_post($student_count); ?>
          </span>
        <?php


        elseif ($metaKey == 'tutorCompleteCourseCount') :

          $complete_count = 0;
          if (function_exists("tutor_utils")) {
            $complete_count = tutor_utils()->get_completed_courses_ids_by_user($userId);
          }

          $complete_count = $complete_count ? count($complete_count) : 0;

        ?>
          <span class="fieldVal">
            <?php echo wp_kses_post($complete_count);
            ?>
          </span>
        <?php
        elseif ($metaKey == 'tutorEnrolledCourseCount') :

          $enrolled_course = 0;
          if (function_exists("tutor_utils")) {
            $enrolled_course = tutor_utils()->get_enrolled_courses_by_user($userId);
          }


          $enrol_count     = is_object($enrolled_course) ? $enrolled_course->found_posts : 0;


        ?>
          <span class="fieldVal">
            <?php echo wp_kses_post($enrol_count);
            ?>
          </span>
        <?php



        elseif ($metaKey == 'avatar') :
        ?>
          <img class="fieldVal"
            src="<?php echo esc_url(get_avatar_url($userId, ['size' => $fieldAvatarSize, 'default' => $fieldDefaultAvatar, 'rating' => $fieldAvatarRating])) ?>"
            alt=" <?php echo esc_attr(get_the_author_meta('display_name', $userId)) ?> " />
          <?php
        elseif ($metaKey == 'custom') :
          if ($customFieldType == 'imageId') {
            $thumb_id = get_user_meta($userId, $customField, true);
            $attachment_metadata = wp_get_attachment_metadata($thumb_id);
            $width = isset($attachment_metadata['width']) ? $attachment_metadata['width'] : '';
            $height = isset($attachment_metadata['height']) ? $attachment_metadata['height'] : '';
            $attachment_url = wp_get_attachment_image_url($thumb_id, $customFieldSize);
          ?>
            <img class="fieldVal" width="<?php echo esc_attr($width); ?>" height="<?php echo esc_attr($height); ?>"
              src="<?php echo esc_url($attachment_url) ?>"
              alt="<?php echo esc_attr(get_the_author_meta('display_name', $userId)) ?> " />
            <?php
          } else {



            if (!empty($customField)) {
              $metaValue = get_user_meta($userId, $customField, true);

            ?>
              <span class="fieldVal">
                <?php echo wp_kses_post($metaValue)
                ?>
              </span>
        <?php
            }
          }
        endif;
        ?>
        <?php if (!empty($postfixText) && $postfixPosition == 'afterField') : ?>
          <span class="<?php echo esc_attr($postfixClass); ?>">
            <?php echo wp_kses_post($postfixText); ?>
          </span>
        <?php endif; ?>
        <?php if (!empty($fieldLink)) : ?>
        </a>
      <?php endif; ?>
      <?php if ($iconPosition == 'afterField') : ?>
        <?php echo wp_kses_post($fontIconHtml); ?>
      <?php endif; ?>
      <?php if (!empty($postfixText) && $postfixPosition == 'atTheEnd') : ?>
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
$ComboBlocksUserFields = new ComboBlocksUserFields();
