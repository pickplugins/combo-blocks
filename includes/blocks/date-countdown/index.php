<?php
if (!defined('ABSPATH'))
  exit();
class ComboBlocksDateCountdown
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
  }
  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    register_block_type(
      combo_blocks_dir . 'build/blocks/date-countdown/block.json',
      array(
        'render_callback' => array($this, 'theHTML'),
      )
    );
  }
  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {
    if (has_block('combo-blocks/date-countdown')) {
      ////wp_enqueue_script('combo_blocks_scripts');
    }
    global $comboBlocksCss;
    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';
    $post_ID = !empty($post_ID) ? $post_ID : get_the_ID();
    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];
    $wrapperClass = isset($wrapperOptions['class']) ? $wrapperOptions['class'] : '';
    $countdownWrapper = isset($attributes['countdownWrapper']) ? $attributes['countdownWrapper'] : [];
    $countdownWrapperOptions = isset($countdownWrapper['options']) ? $countdownWrapper['options'] : [];
    $inner = isset($attributes['inner']) ? $attributes['inner'] : [];
    $dateCountdown = isset($attributes['dateCountdown']) ? $attributes['dateCountdown'] : [];
    $dateCountdownOptions = isset($dateCountdown['options']) ? $dateCountdown['options'] : [];
    $innerOptions = isset($inner['options']) ? $inner['options'] : [];
    $innerEnable = isset($innerOptions['enable']) ? $innerOptions['enable'] : true;
    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';
    // date countdown 
    // $setting = isset($attributes['setting']) ? $attributes['setting'] : [];
    // $settingOptions = isset($setting['options']) ? $setting['options'] : [];
    $dateCountdownStartDate = isset($dateCountdownOptions['startDate']) ? $dateCountdownOptions['startDate'] : "";
    $dateCountdownStartDateSrc = isset($dateCountdownOptions['startDateSrc']) ? $dateCountdownOptions['startDateSrc'] : "";
    $dateCountdownEndDate = isset($dateCountdownOptions['endDate']) ? $dateCountdownOptions['endDate'] : "";
    $dateCountdownEndDateSrc = isset($dateCountdownOptions['endDateSrc']) ? $dateCountdownOptions['endDateSrc'] : "";
    $expiredArg = isset($attributes['expiredArg']) ? $attributes['expiredArg'] : [];
    $scheduleTime = isset($attributes['scheduleTime']) ? $attributes['scheduleTime'] : [];
    $expiredArg = combo_blocks_recursive_sanitize_arr($expiredArg);
    $second = isset($attributes['second']) ? $attributes['second'] : [];
    $secondOptions = isset($second['options']) ? $second['options'] : [];
    $secondEnable = isset($secondOptions['enable']) ? $secondOptions['enable'] : true;
    $secondLabel = isset($secondOptions['label']) ? $secondOptions['label'] : "";
    $secondPrefix = isset($secondOptions['prefix']) ? $secondOptions['prefix'] : "";
    $secondPostfix = isset($secondOptions['postfix']) ? $secondOptions['postfix'] : "";
    $minute = isset($attributes['minute']) ? $attributes['minute'] : [];
    $minuteOptions = isset($minute['options']) ? $minute['options'] : [];
    $minuteEnable = isset($minuteOptions['enable']) ? $minuteOptions['enable'] : true;
    $minuteLabel = isset($minuteOptions['label']) ? $minuteOptions['label'] : "";
    $minutePrefix = isset($minuteOptions['prefix']) ? $minuteOptions['prefix'] : "";
    $minutePostfix = isset($minuteOptions['postfix']) ? $minuteOptions['postfix'] : "";
    $hour = isset($attributes['hour']) ? $attributes['hour'] : [];
    $hourOptions = isset($hour['options']) ? $hour['options'] : [];
    $hourEnable = isset($hourOptions['enable']) ? $hourOptions['enable'] : true;
    $hourLabel = isset($hourOptions['label']) ? $hourOptions['label'] : "";
    $hourPrefix = isset($hourOptions['prefix']) ? $hourOptions['prefix'] : "";
    $hourPostfix = isset($hourOptions['postfix']) ? $hourOptions['postfix'] : "";
    $day = isset($attributes['day']) ? $attributes['day'] : [];
    $dayOptions = isset($day['options']) ? $day['options'] : [];
    $dayEnable = isset($dayOptions['enable']) ? $dayOptions['enable'] : true;
    $dayLabel = isset($dayOptions['label']) ? $dayOptions['label'] : "";
    $dayPrefix = isset($dayOptions['prefix']) ? $dayOptions['prefix'] : "";
    $dayPostfix = isset($dayOptions['postfix']) ? $dayOptions['postfix'] : "";
    $separator = isset($attributes['separator']) ? $attributes['separator'] : [];
    $separatorOptions = isset($separator['options']) ? $separator['options'] : [];
    $separatorEnable = isset($separatorOptions['enable']) ? $separatorOptions['enable'] : true;
    $separatorText = isset($separatorOptions['text']) ? $separatorOptions['text'] : "";
    $separatorPosition = isset($separatorOptions['position']) ? $separatorOptions['position'] : "";
    $label = isset($attributes['label']) ? $attributes['label'] : [];
    $labelOptions = isset($label['options']) ? $label['options'] : [];
    $labelEnable = isset($labelOptions['enable']) ? $labelOptions['enable'] : true;
    $labelPosition = isset($labelOptions['position']) ? $labelOptions['position'] : "";
    $_sale_price_dates_to = get_post_meta($post_ID, "_sale_price_dates_to", true);
    $_sale_price_dates_from = get_post_meta($post_ID, "_sale_price_dates_from", true);
    if (empty($dateCountdownStartDateSrc)) {
      $dateCountdownStartDate = strtotime($dateCountdownStartDate);
    } else {
      $dateCountdownStartDate = !empty($_sale_price_dates_from) ? (int) $_sale_price_dates_from : strtotime($dateCountdownStartDate);
    }
    if (empty($dateCountdownEndDateSrc)) {
      $dateCountdownEndDate = strtotime($dateCountdownEndDate);
    } else {
      $dateCountdownEndDate = !empty($_sale_price_dates_to) ? (int) $_sale_price_dates_to : strtotime($dateCountdownEndDate);
    }
    $endDate = date('Y-m-d\TH:i', $dateCountdownEndDate);
    $startDate = date('Y-m-d\TH:i', $dateCountdownStartDate);
    $gmt_offset = get_option('gmt_offset');
    $currentDate = date("Y/m/d H:i:s", strtotime('+' . $gmt_offset . ' hour'));
    $currentDate = strtotime($currentDate);
    $date1 = strtotime($startDate);
    $startDate = max($currentDate, $date1);
    $timeDifference = $dateCountdownEndDate - $startDate;
    $days = floor($timeDifference / (60 * 60 * 24));
    $hours = floor(($timeDifference % (60 * 60 * 24)) / (60 * 60));
    $minutes = floor(($timeDifference % (60 * 60)) / 60);
    $seconds = $timeDifference % 60;
    // Format values to always display as two digits.
    $formattedDays = str_pad($days, 2, '0', STR_PAD_LEFT);
    $formattedHours = str_pad($hours, 2, '0', STR_PAD_LEFT);
    $formattedMinutes = str_pad($minutes, 2, '0', STR_PAD_LEFT);
    $formattedSeconds = str_pad($seconds, 2, '0', STR_PAD_LEFT);
    // date countdown 
    $visible = isset($attributes['visible']) ? $attributes['visible'] : [];
    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconEnable = isset($iconOptions['enable']) ? $iconOptions['enable'] : true;
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';
    $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
    $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';
    $prefixEnable = isset($prefixOptions['enable']) ? $prefixOptions['enable'] : true;
    $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
    $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';
    $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
    $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';
    $postfixEnable = isset($postfixOptions['enable']) ? $postfixOptions['enable'] : true;
    $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';
    $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';
    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $comboBlocksCss[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];
    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }
    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';
    $dataAtts = [
      "startDate" => $startDate,
      "endDate" => $endDate,
      "blockId" => $blockId,
      "dateCountdown" => $dateCountdown,
      "scheduleTime" => $scheduleTime,
    ];
    $obj['id'] = $post_ID;
    $obj['type'] = 'post';
    $wrapperClass = combo_blocks_parse_css_class($wrapperClass, $obj);
    // //* Visible condition
    if (!empty($visible['rules'])) {
      $isVisible = combo_blocks_visible_parse($visible);
      if (!$isVisible) return;
    }
    // //* Visible condition
    ob_start();
    if (!empty($wrapperTag)) :
?>
      <<?php echo combo_blocks_tag_escape($wrapperTag); ?> class="ComboBlocksDateCountdown
											<?php echo esc_attr($blockId); ?>						 			<?php echo esc_attr($wrapperClass); ?>
											<?php echo esc_attr($blockAlign); ?>" date-countdown-id="<?php echo esc_attr($blockId); ?>"
        data-date-countdown="<?php echo esc_attr(json_encode($dataAtts)) ?>"
        data-countdown-expired-arg="<?php echo esc_attr(json_encode($expiredArg)) ?>">
        <?php //if ($timeDifference > 0) {
        ?>
        <div class="countdown-wrapper">
          <?php if ($iconEnable) : ?>
            <?php echo wp_kses_post($fontIconHtml); ?>
          <?php endif; ?>
          <?php
          if ($dayEnable) : ?>
            <div class="items day-wrapper">
              <?php if ($labelEnable && $labelPosition == '') : ?>
                <span class="label">
                  <?php echo wp_kses_post($dayLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'beforePrefix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($dayLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($prefixEnable) : ?>
                <span class="prefix">
                  <?php echo wp_kses_post($dayPrefix); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'afterPrefix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($dayLabel); ?>
                </span>
              <?php endif; ?>
              <span class="day-countdown">
                <?php echo wp_kses_post($formattedDays); ?>
              </span>
              <?php if ($labelEnable && $labelPosition == 'beforePostfix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($dayLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($postfixEnable) : ?>
                <span class="postfix">
                  <?php echo wp_kses_post($dayPostfix); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'afterPostfix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($dayLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($separatorEnable && $separatorPosition == 'afterPostfix') : ?>
                <span class="separator">
                  <?php echo wp_kses_post($separatorText); ?>
                </span>
              <?php endif; ?>
            </div>
          <?php endif; ?>
          <?php if ($dayEnable && $separatorEnable && $separatorPosition == 'afterEachItems') : ?>
            <span class="separator">
              <?php echo wp_kses_post($separatorText); ?>
            </span>
          <?php endif; ?>
          <?php
          if ($hourEnable) : ?>
            <div class="items hour-wrapper">
              <?php if ($labelEnable && $labelPosition == '') : ?>
                <span class="label">
                  <?php echo wp_kses_post($hourLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'beforePrefix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($hourLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($prefixEnable) : ?>
                <span class="prefix">
                  <?php echo wp_kses_post($hourPrefix); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'afterPrefix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($hourLabel); ?>
                </span>
              <?php endif; ?>
              <span class="hour-countdown">
                <?php echo wp_kses_post($formattedHours); ?>
              </span>
              <?php if ($labelEnable && $labelPosition == 'beforePostfix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($hourLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($postfixEnable) : ?>
                <span class="postfix">
                  <?php echo wp_kses_post($hourPostfix); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'afterPostfix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($hourLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($separatorEnable && $separatorPosition == 'afterPostfix') : ?>
                <span class="separator">
                  <?php echo wp_kses_post($separatorText); ?>
                </span>
              <?php endif; ?>
            </div>
          <?php endif; ?>
          <?php if ($hourEnable && $separatorEnable && $separatorPosition == 'afterEachItems') : ?>
            <span class="separator">
              <?php echo wp_kses_post($separatorText); ?>
            </span>
          <?php endif; ?>
          <?php
          if ($minuteEnable) : ?>
            <div class="items minute-wrapper">
              <?php if ($labelEnable && $labelPosition == '') : ?>
                <span class="label">
                  <?php echo wp_kses_post($minuteLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'beforePrefix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($minuteLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($prefixEnable) : ?>
                <span class="prefix">
                  <?php echo wp_kses_post($minutePrefix); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'afterPrefix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($minuteLabel); ?>
                </span>
              <?php endif; ?>
              <span class="minute-countdown">
                <?php echo wp_kses_post($formattedMinutes); ?>
              </span>
              <?php if ($labelEnable && $labelPosition == 'beforePostfix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($minuteLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($postfixEnable) : ?>
                <span class="postfix">
                  <?php echo wp_kses_post($minutePostfix); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'afterPostfix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($minuteLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($separatorEnable && $separatorPosition == 'afterPostfix') : ?>
                <span class="separator">
                  <?php echo wp_kses_post($separatorText); ?>
                </span>
              <?php endif; ?>
            </div>
          <?php endif; ?>
          <?php if ($minuteEnable && $separatorEnable && $separatorPosition == 'afterEachItems') : ?>
            <span class="separator">
              <?php echo wp_kses_post($separatorText); ?>
            </span>
          <?php endif; ?>
          <?php
          if ($secondEnable) : ?>
            <div class="items second-wrapper">
              <?php if ($labelEnable && $labelPosition == '') : ?>
                <span class="label">
                  <?php echo wp_kses_post($secondLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'beforePrefix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($secondLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($prefixEnable) : ?>
                <span class="prefix">
                  <?php echo wp_kses_post($secondPrefix); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'afterPrefix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($secondLabel); ?>
                </span>
              <?php endif; ?>
              <span class="second-countdown">
                <?php echo wp_kses_post($formattedSeconds); ?>
              </span>
              <?php if ($labelEnable && $labelPosition == 'beforePostfix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($secondLabel); ?>
                </span>
              <?php endif; ?>
              <?php if ($postfixEnable) : ?>
                <span class="postfix">
                  <?php echo wp_kses_post($secondPostfix); ?>
                </span>
              <?php endif; ?>
              <?php if ($labelEnable && $labelPosition == 'afterPostfix') : ?>
                <span class="label">
                  <?php echo wp_kses_post($secondLabel); ?>
                </span>
              <?php endif; ?>
            </div>
          <?php endif; ?>
        </div>
        <?php
        //} 
        ?>
        <?php if ($innerEnable) : ?>
          <div class="inner" id="inner">
            <?php echo wp_kses_post($content) ?>
          </div>
        <?php endif; ?>
      </<?php echo combo_blocks_tag_escape($wrapperTag); ?>>
    <?php
    endif;
    ?>
<?php
    $html = ob_get_clean();
    $cleanedHtml = combo_blocks_clean_html($html);
    return $cleanedHtml;
  }
}
$ComboBlocksDateCountdown = new ComboBlocksDateCountdown();
