<?php
if (!defined('ABSPATH'))
  exit();
add_filter('combo_blocks_form_wrap_process_postSubmitForm', 'combo_blocks_form_wrap_process_postSubmitForm', 99, 3);
function combo_blocks_form_wrap_process_postSubmitForm($formFields, $onprocessargs, $request)
{
  $response = [];
  $entryData = [];
  $post_title = isset($formFields['post_title']) ? sanitize_text_field($formFields['post_title']) : '';
  $post_content = isset($formFields['post_content']) ? wp_kses_post($formFields['post_content']) : '';
  $post_excerpt = isset($formFields['post_excerpt']) ? wp_kses_post($formFields['post_excerpt']) : '';
  // $post_thumbnail = isset($formFields['post_thumbnail']) ? wp_kses_post($formFields['post_thumbnail']) : '';
  $to_ping = isset($formFields['to_ping']) ? wp_kses_post($formFields['to_ping']) : '';
  $post_parent = isset($formFields['post_parent']) ? wp_kses_post($formFields['post_parent']) : '';
  $menu_order = isset($formFields['menu_order']) ? wp_kses_post($formFields['menu_order']) : '';
  $post_password = isset($formFields['post_password']) ? sanitize_text_field($formFields['post_password']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  if (empty($post_title)) {
    $response['errors']['postTitleEmpty'] = __('Post title should not empty', 'combo-blocks');
  }
  if (empty($post_content)) {
    $response['errors']['postContentEmpty'] = __('Post content should not empty', 'combo-blocks');
  }
  if (!empty($response['errors'])) {
    return $response;
  }
  $user = get_user_by('email', $email);
  if (empty($user))
    $user = get_user_by('login', $email);
  $currentUser = wp_get_current_user();
  // Collect entry data
  $entryData['id'] = 'postSubmit';
  $entryData['formFields'] = $formFields;
  $entryData['user_id'] = isset($user->ID) ? $user->ID : 0;
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'postSubmit') {
        $postType = isset($arg->postType) ? $arg->postType : 'post';
        $pingStatus = isset($arg->pingStatus) ? $arg->pingStatus : '';
        $commentStatus = isset($arg->commentStatus) ? $arg->commentStatus : '';
        $postStatus = isset($arg->postStatus) ? $arg->postStatus : '';
        $postParent = isset($arg->postParent) ? $arg->postParent : '';
        $menuOrder = isset($arg->menuOrder) ? $arg->menuOrder : '';
        $postPassword = isset($arg->postPassword) ? $arg->postPassword : '';
        $authorByEmail = isset($arg->authorByEmail) ? $arg->authorByEmail : false;



        $post_thumbnail = isset($request->get_file_params()['post_thumbnail']) ? $request->get_file_params()['post_thumbnail'] : '';
        $post_term = $request->get_param('post_term');
        $post_meta = $request->get_param('post_meta');


        //$metaFields = isset($arg->metaFields) ? $arg->metaFields :  ['email'];
        $postParent = (!empty($post_parent)) ? $post_parent : $postParent;
        $menuOrder = (!empty($menu_order)) ? $menu_order : $menuOrder;
        $postPassword = (!empty($post_password)) ? $post_password : $postPassword;
        $createUserByEmail = '';
        if ($authorByEmail) {
          $createUserByEmail = combo_blocks_form_wrap_create_post_author_by_email($email);
        }
        $authorId = ($currentUser->ID) ? $currentUser->ID : $createUserByEmail;
        $postData = [];
        $postData['post_title'] = $post_title;
        $postData['post_content'] = $post_content;
        $postData['post_author'] = $authorId;
        $postData['post_excerpt'] = $post_excerpt;
        $postData['post_status'] = $postStatus;
        $postData['post_type'] = $postType;
        $postData['comment_status'] = $commentStatus;
        $postData['ping_status'] = $pingStatus;
        $postData['post_password'] = $postPassword;
        //$postData['post_name'] = $post_content;
        $postData['to_ping'] = $to_ping;
        $postData['post_parent'] = $postParent;
        $postData['menu_order'] = $menuOrder;
        $new_post_id = wp_insert_post($postData);
        if (is_wp_error($new_post_id)) {
          $error_string = $new_post_id->get_error_message();
          $response['errors']['postSubmitFailed'] = $error_string;
        } else {
          $response['success']['postSubmitted'] = __('Post Submitted', 'combo-blocks');
          if (!empty($post_meta)) {
            foreach ($post_meta as $key => $metaValue) {
              if (!empty($metaValue))
                update_post_meta($new_post_id, $key, $metaValue);
            }
          }
          ////////################///////////////
          $post_meta_files = isset($request->get_file_params()['post_meta']) ? $request->get_file_params()['post_meta'] : [];
          $files = [];
          if (!empty($post_meta_files)) {
            $i = 0;
            foreach ($post_meta_files as $index => $data) {
              foreach ($data as $metaKey => $fileInfo) {
                $files[$metaKey][$index] = $fileInfo;
              }
            }
          }
          if (!empty($files)) {
            foreach ($files as $metaKey => $metavalue) {
              $file_response = combo_blocks_upload_file($metavalue);
              if ($file_response['id']) {
                update_post_meta($new_post_id, $metaKey, $file_response['id']);
              }
            }
          }
          ///////////##################//////////
          if (!empty($post_term)) {
            foreach ($post_term as $taxonomy => $taxIds) {



              wp_set_post_terms($new_post_id, $taxIds, $taxonomy, true);
            }
          }
          $file_response = combo_blocks_upload_file($post_thumbnail);
          if (isset($file_response['id'])) {
            set_post_thumbnail($new_post_id, $file_response['id']);
          }
        }
      }
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        // $status = combo_blocks_form_wrap_process_create_entry($entryData);
        // if ($status) {
        //   $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        // } else {
        //   $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        // }
      }
    }
  return $response;
}
function combo_blocks_form_wrap_create_post_author_by_email($email)
{
  $user = get_user_by('email', $email);
  if ($user) {
    $userId = $user->ID;
  } else {
    $emailArr = explode(',', $email);
    $username = isset($emailArr[0]) ? $emailArr[0] : '';
    $username = combo_blocks_form_wrap_process_regenerate_username($username);
    $password = wp_generate_password();
    $user_id = wp_create_user($username, $password, $email);
    return $user_id;
  }
  return $userId;
}
add_filter('combo_blocks_form_wrap_process_termSubmitForm', 'combo_blocks_form_wrap_process_termSubmitForm', 99, 3);
function combo_blocks_form_wrap_process_termSubmitForm($formFields, $onprocessargs, $request)
{
  $response = [];
  $entryData = [];
  $term_title = isset($formFields['term_title']) ? sanitize_text_field($formFields['term_title']) : '';
  $term_slug = isset($formFields['term_slug']) ? sanitize_text_field($formFields['term_slug']) : '';
  $term_description = isset($formFields['term_description']) ? wp_kses_post($formFields['term_description']) : '';
  $term_parent = isset($formFields['term_parent']) ? wp_kses_post($formFields['term_parent']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  if (empty($term_title)) {
    $response['errors']['termTitleEmpty'] = __('Term title should not empty', 'combo-blocks');
  }
  $user = get_user_by('email', $email);
  if (empty($user))
    $user = get_user_by('login', $email);
  $currentUser = wp_get_current_user();
  // Collect entry data
  $entryData['id'] = 'termSubmitForm';
  $entryData['formFields'] = $formFields;
  $entryData['user_id'] = isset($user->ID) ? $user->ID : 0;
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'termSubmit') {
        $taxonomy = isset($arg->taxonomy) ? $arg->taxonomy : '';
        $showOnResponse = $arg->showOnResponse;
        $successMessage = $arg->successMessage;
        $errorMessage = $arg->errorMessage;
        $termData = [];
        $termData['slug'] = $term_slug;
        //$termData['parent'] = $term_parent;
        $termData['description'] = $term_description;
        $new_term = wp_insert_term($term_title, $taxonomy, $termData);
        if (is_wp_error($new_term)) {
          $error_string = $new_term->get_error_message();
          $response['errors']['termSubmitFailed'] = !empty($errorMessage) ? $errorMessage : $error_string;
          return $response;
        }
        $new_term_id = isset($new_term['term_id']) ? $new_term['term_id'] : '';
        $thumbnail_id = isset($request->get_file_params()['thumbnail_id']) ? $request->get_file_params()['thumbnail_id'] : "";
        if ($thumbnail_id) {
          $file_response = combo_blocks_upload_file($thumbnail_id);
          if ($file_response['id']) {
            update_term_meta($new_term_id, 'thumbnail_id', $file_response['id']);
          }
        }
        $term_meta = $request->get_param('term_meta');
        if (!empty($term_meta)) {
          foreach ($term_meta as $metaKey => $metavalue) {
            update_term_meta($new_term_id, $metaKey, $metavalue);
          }
        }
        ///////////##############///////////////////
        $term_meta_files = isset($request->get_file_params()['term_meta']) ? $request->get_file_params()['term_meta'] : [];
        $files = [];
        if (!empty($term_meta_files)) {
          $i = 0;
          foreach ($term_meta_files as $index => $data) {
            foreach ($data as $metaKey => $fileInfo) {
              $files[$metaKey][$index] = $fileInfo;
            }
          }
        }
        if (!empty($files)) {
          foreach ($files as $metaKey => $metavalue) {
            $file_response = combo_blocks_upload_file($metavalue);
            if ($file_response['id']) {
              update_term_meta($new_term_id, $metaKey, $file_response['id']);
            }
          }
        }
        ///////////##############///////////////////
        if ($showOnResponse) {
          if (is_wp_error($new_term_id)) {
            $error_string = $new_term_id->get_error_message();
            $response['errors']['termSubmitFailed'] = !empty($errorMessage) ? $errorMessage : $error_string;
          } else {
            $response['success']['termSubmitted'] = !empty($successMessage) ? $successMessage :  __('Term Submitted', 'combo-blocks');
          }
        }
      }
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        $status = combo_blocks_form_wrap_process_create_entry($entryData);
        if ($status) {
          $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        } else {
          $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        }
      }
    }
  return $response;
}
add_filter('combo_blocks_form_wrap_process_optInForm', 'combo_blocks_form_wrap_process_optInForm', 99, 3);
function combo_blocks_form_wrap_process_optInForm($formFields, $onprocessargs, $request)
{
  $response = [];
  $entryData = [];
  $first_name = isset($formFields['first_name']) ? sanitize_text_field($formFields['first_name']) : '';
  $last_name = isset($formFields['last_name']) ? sanitize_text_field($formFields['last_name']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  $message = isset($formFields['message']) ? wp_kses_post($formFields['message']) : '';
  $full_name = isset($formFields['full_name']) ? sanitize_text_field($formFields['full_name']) : '';
  // $country = isset($formFields['country']) ? sanitize_text_field($formFields['country']) : '';
  // $countryCode = isset($formFields['countryCode']) ? sanitize_text_field($formFields['countryCode']) : '';
  // $state = isset($formFields['state']) ? sanitize_text_field($formFields['state']) : '';
  // $city = isset($formFields['city']) ? sanitize_text_field($formFields['city']) : '';
  // $gender = isset($formFields['gender']) ? sanitize_text_field($formFields['gender']) : '';


  $combo_blocks_settings = get_option("combo_blocks_settings");
  $apiKeys = isset($combo_blocks_settings['apiKeys']) ? $combo_blocks_settings['apiKeys'] : [];
  $user = get_user_by('email', $email);
  if (empty($user))
    $user = get_user_by('login', $email);
  $currentUser = wp_get_current_user();
  // Collect entry data
  $entryData['id'] = 'optInForm';
  $entryData['formFields'] = $formFields;
  $entryData['user_id'] = isset($user->ID) ? $user->ID : 0;
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = isset($arg->id) ? $arg->id : "";
      if ($id == 'sendMail') {
        $fromEmail = $email;
        $fromName = $full_name;
        $replyTo = $email;
        $replyToName = $full_name;
        $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
        $bcc = isset($arg->bcc) ? $arg->bcc : '';
        $footer = isset($arg->footer) ? $arg->footer : '';
        $subject = isset($arg->subject) ? $arg->subject : '';
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Send mail success', 'combo-blocks');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Send mail failed', 'combo-blocks');
        $email_data['email_to'] = $mailTo;
        $email_data['email_bcc'] = $bcc;
        $email_data['email_from'] = $email;
        $email_data['email_from_name'] = $full_name;
        $email_data['subject'] = $subject;
        $email_data['html'] = $message . $footer;
        $email_data['attachments'] = [];
        $status = combo_blocks_form_wrap_process_send_email($email_data);
        if ($showOnResponse) {
          if ($status) {
            $response['success']['sendMail'] = $successMessage;
          } else {
            $response['errors']['sendMail'] = $errorMessage;
          }
        }
      }
      if ($id == 'createWCOrder') {
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Send mail success', 'combo-blocks');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Send mail failed', 'combo-blocks');
        $status = combo_blocks_form_wrap_process_create_wc_order($arg, $request);
        if ($showOnResponse) {
          if ($status) {
            $response['success']['createWCOrder'] = $successMessage;
          } else {
            $response['errors']['createWCOrder'] = $errorMessage;
          }
        }
      }
      if ($id == 'emailCopyUser') {
        $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
        $fromName = isset($arg->fromName) ? $arg->fromName : '';
        $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
        $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
        $footer = isset($arg->footer) ? $arg->footer : '';
        $subject = isset($arg->subject) ? $arg->subject : '';
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Email copy user success', 'combo-blocks');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Email copy user failed', 'combo-blocks');
        $email_data['email_to'] = $email;
        $email_data['email_bcc'] = $bcc;
        $email_data['email_from'] = $fromEmail;
        $email_data['email_from_name'] = $fromName;
        $email_data['reply_to'] = $replyTo;
        $email_data['reply_to_name'] = $replyToName;
        $email_data['subject'] = $subject;
        $email_data['html'] = $message . $footer;
        $email_data['attachments'] = [];
        $status = combo_blocks_form_wrap_process_send_email($email_data);
        if ($showOnResponse) {
          if ($status) {
            $response['success']['emailCopyUser'] = $successMessage;
          } else {
            $response['errors']['emailCopyUser'] = $errorMessage;
          }
        }
      }
      if ($id == 'emailBcc') {
        $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
        $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
        $fromName = isset($arg->fromName) ? $arg->fromName : '';
        $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
        $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
        $footer = isset($arg->footer) ? $arg->footer : '';
        $subject = isset($arg->subject) ? $arg->subject : '';
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Email Bcc success', 'combo-blocks');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Email Bcc failed', 'combo-blocks');
        $email_data['email_to'] = $mailTo;
        $email_data['email_bcc'] = $bcc;
        $email_data['email_from'] = $fromEmail;
        $email_data['email_from_name'] = $fromName;
        $email_data['reply_to'] = $replyTo;
        $email_data['reply_to_name'] = $replyToName;
        $email_data['subject'] = $subject;
        $email_data['html'] = $message . $footer;
        $email_data['attachments'] = [];
        $status = combo_blocks_form_wrap_process_send_email($email_data);
        if ($showOnResponse) {
          if ($status) {
            $response['success']['emailBcc'] = $successMessage;
          } else {
            $response['errors']['emailBcc'] = $errorMessage;
          }
        }
      }
      if ($id == 'autoReply') {
        $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
        $fromName = isset($arg->fromName) ? $arg->fromName : '';
        $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
        $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
        $footer = isset($arg->footer) ? $arg->footer : '';
        $subject = isset($arg->subject) ? $arg->subject : '';
        $message = isset($arg->message) ? $arg->message : '';
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Auto Reply success', 'combo-blocks');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Auto Reply failed', 'combo-blocks');
        $email_data['email_to'] = $email;
        $email_data['email_bcc'] = $bcc;
        $email_data['email_from'] = $fromEmail;
        $email_data['email_from_name'] = $fromName;
        $email_data['reply_to'] = $replyTo;
        $email_data['reply_to_name'] = $replyToName;
        $email_data['subject'] = $subject;
        $email_data['html'] = $message . $footer;
        $email_data['attachments'] = [];
        $status = combo_blocks_form_wrap_process_send_email($email_data);
        if ($showOnResponse) {
          if ($status) {
            $response['success']['autoReply'] = $successMessage;
          } else {
            $response['errors']['autoReply'] = $errorMessage;
          }
        }
      }
      if ($id == 'fluentcrmAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : [];
        $tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $subscriber = FluentCrm\App\Models\Subscriber::create([
          'first_name' => $first_name,
          'last_name' => $last_name,
          'email' => $email,
          'status' => 'subscribed',
        ]);
        $status = $subscriber->save();
        if (!empty($lists)) {
          $listIds = [];
          foreach ($lists as $list) {
            $id = $list->id;
            $listIds[] = $id;
          }
          $subscriber->attachLists($listIds);
        }
        if (!empty($tags)) {
          $tagIds = [];
          foreach ($tags as $tag) {
            $id = $tag->id;
            $tagIds[] = $id;
          }
          $subscriber->attachTags($tagIds);
        }
        // $status = true;
        if ($showOnResponse) {
          if (is_wp_error($status)) {
            //$error_string = $status->get_error_message();
            $response['errors']['fluentcrmAddContactFailed'] = $errorMessage;
          } else {
            $response['success']['fluentcrmAddContactSuccess'] = $successMessage;
          }
        }
      }
      if ($id == 'mailpickerAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : [];
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        if (!class_exists("Mailpicker_Subscribers")) {
          $response['errors']['mailpickerAddContactFailed'] = __("Mail Picker plugin not active", "");
          continue;
        }
        $Mailpicker_Subscribers = new Mailpicker_Subscribers();
        $listIds = "";
        if (!empty($lists)) {
          foreach ($lists as $list) {
            $id = $list->id;
            $listIds .= $id . ",";
          }
        }
        $mpResponse = $Mailpicker_Subscribers->add_subscriber(
          [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'status' => 'active',
            'subscriber_list' => $listIds,
          ]
        );
        if ($showOnResponse) {
          if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
            $response['errors']['mailpickerAddContactExist'] = $existMessage;
          }
          if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
            $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
          }
          if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
            $response['success']['mailpickerAddContactSuccess'] = $successMessage;
          }
        }
      }
      if ($id == 'brevoAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        $lists = array_map('intval', $lists);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $brevoApiKeys = isset($apiKeys['brevo']['args']['apikey']) ? $apiKeys['brevo']['args']['apikey'] : "";
        $url = 'https://api.brevo.com/v3/contacts';
        $headers = array(
          'accept: application/json',
          "api-key: $brevoApiKeys",
          'content-type: application/json'
        );
        $data = array(
          "email" => $email,
          "ext_id" => "",
          "attributes" => array(
            "FNAME" => $first_name,
            "LNAME" => $last_name
          ),
          "emailBlacklisted" => false,
          "smsBlacklisted" => false,
          "listIds" => $lists,
          "updateEnabled" => false,
          "smtpBlacklistSender" => array()
        );
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['brevoAddContactErrorCurl'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
            $response['errors']['brevoAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          }
          if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {
            $response['errors']['brevoAddContactError'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
          }
          if (isset($curl_response->code) && $curl_response->code == 'invalid_parameter') {
            $response['errors']['brevoAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $errorMessage;
          }
          if (isset($curl_response->id)) {
            $response['success']['brevoAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'acumbamailAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        // $lists = explode(',', $lists);
        //$lists = array_map('intval', $lists);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $acumbamailApiKeys = isset($apiKeys['acumbamail']['args']['apikey']) ? $apiKeys['acumbamail']['args']['apikey'] : "";



        $subscribers_data = array(
          array("email" => $email),
        );

        $subscribers_data = json_encode($subscribers_data);

        $data = array(
          "list_id" => $lists,
          "subscribers_data" => $subscribers_data
        );

        $url = "https://acumbamail.com/api/1/batchAddSubscribers/";

        $fields = array(
          //'customer_id' => $this->customer_id,
          'auth_token' => $acumbamailApiKeys,
          'response_type' => 'json',
        );

        if (count($data) != 0) {
          $fields = array_merge($fields, $data);
        }

        $postdata = http_build_query($fields);

        $opts = array('http' => array(
          'method' => 'POST',
          'header' => 'Content-type: application/x-www-form-urlencoded',
          'content' => $postdata
        ));

        $response = @file_get_contents(
          $url,
          false,
          stream_context_create($opts)
        );

        $json = json_decode($response, true);




        // if (curl_errno($ch)) {
        //   $response['errors']['acumbamailAddContactErrorCurl'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
        // } else {
        //   $curl_response = json_decode($curl_response);


        //   if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
        //     $response['errors']['acumbamailAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
        //   }
        //   if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {
        //     $response['errors']['acumbamailAddContactError'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
        //   }
        //   if (isset($curl_response->code) && $curl_response->code == 'invalid_parameter') {
        //     $response['errors']['acumbamailAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $errorMessage;
        //   }
        //   if (isset($curl_response->id)) {
        //     $response['success']['acumbamailAddContactSuccess'] = $successMessage;
        //   }
        // }
        // curl_close($ch);
      }






      if ($id == 'omnisendAddContact') {
        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $omnisendApiKeys = isset($apiKeys['omnisend']['args']['apikey']) ? $apiKeys['omnisend']['args']['apikey'] : "";


        $ch = curl_init();

        curl_setopt_array($ch, array(
          CURLOPT_URL => 'https://api.omnisend.com/v3/contacts',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => json_encode([
            "firstName" => $first_name,
            "lastName" => $last_name,
            "tags" => $tags,
            "identifiers" => [
              [
                "type" => "email",
                "id" => $email,
                "channels" => [
                  "email" => [
                    "status" => "subscribed",
                  ]
                ]
              ],

            ],
            // "country" => "United Kingdom",
            // "countryCode" => "GB",
            // "state" => "",
            // "city" => "London",
            // "address" => "Westminster",
            // "postalCode" => "SW1A 1AA",
            // "gender" => "f",
            // "birthdate" => "1997-05-02",
            // "customProperties" => [
            //   "age" => 33,
            //   "hair_color" => "brown",
            //   "married" => true,
            //   "marriageDate" => "2018-07-07",
            //   "loyaltyPoints" => 125.8,
            //   "pets" => [
            //     "dog",
            //     "cat"
            //   ]
            // ]
          ]),
          CURLOPT_HTTPHEADER => array(
            'X-API-KEY: ' . $omnisendApiKeys,
            'accept: application/json',
            'content-type: application/json'
          ),
        ));


        $curl_response = curl_exec($ch);



        if ($curl_response === false) {
          $response['errors']['omnisendAddContactErrorCurl'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);


          if (isset($curl_response->error)) {

            $response['errors']['omnisendAddContactError'] = $curl_response->error;
          }
          if (isset($curl_response->contactID)) {
            $response['success']['omnisendAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }



      if ($id == 'mailjetAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        $lists = array_map('intval', $lists);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKeyPublic = isset($apiKeys['mailjet']['args']['apikeyPublic']) ? $apiKeys['mailjet']['args']['apikeyPublic'] : "";
        $apiKeyPrivate = isset($apiKeys['mailjet']['args']['apikeyPrivate']) ? $apiKeys['mailjet']['args']['apikeyPrivate'] : "";
        $url = 'https://api.mailjet.com/v3/REST/contact';
        $data = array(
          'Name' => $first_name,
          'Email' => $email
        );
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_USERPWD, "$apiKeyPublic:$apiKeyPrivate");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailjetAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
          //   $response['errors']['mailjetAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {
          //   $response['errors']['mailjetAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
          // }
          if (isset($curl_response->ErrorInfo)) {
            $response['errors']['mailjetAddContactExist'] = empty($errorMessage) ? $curl_response->ErrorMessage : $errorMessage;
          }
          if (isset($curl_response->Data)) {
            $response['success']['mailjetAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'mailchimpAddContact') {
        $status = isset($arg->status) ? $arg->status : 'subscribed';
        $lists = isset($arg->lists) ? $arg->lists : '';
        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKey = isset($apiKeys['mailchimp']['args']['apikey']) ? $apiKeys['mailchimp']['args']['apikey'] : "";
        $dc = isset($apiKeys['mailchimp']['args']['dc']) ? $apiKeys['mailchimp']['args']['dc'] : "";
        // Initialize a cURL session
        $ch = curl_init();
        // Set the URL for the cURL request
        $url = 'https://' . $dc . '.api.mailchimp.com/3.0/lists/' . $lists . '/members?skip_merge_validation=1';
        // Create the data array
        $data = [
          "email_address" => $email,
          "status" => $status,
          "tags" => $tags
        ];
        // Convert the data array to JSON format
        $jsonData = json_encode($data);
        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_USERPWD, 'key:' . $apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailchimpAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
          //   $response['errors']['mailchimpAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {
          //   $response['errors']['mailchimpAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
          // }
          if (isset($curl_response->status) && $curl_response->status == '404') {
            $response['errors']['mailchimpAddContactError'] = empty($errorMessage) ? $curl_response->detail : $errorMessage;
          }
          if (isset($curl_response->status) && $curl_response->status == '400') {
            $response['errors']['mailchimpAddContactExist'] = empty($errorMessage) ? $curl_response->detail : $existMessage;
          }
          if (isset($curl_response->id)) {
            $response['success']['mailchimpAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'mailmodoAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        // $lists = explode(',', $lists);
        // $lists = array_map('intval', $lists);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKey = isset($apiKeys['mailmodo']['args']['apikey']) ? $apiKeys['mailmodo']['args']['apikey'] : "";
        //https://www.mailmodo.com/developers/f1669952fdba0-add-contact-to-a-list/
        $url = "https://api.mailmodo.com/api/v1/addToList";
        $data = [
          "email" => $email,
          "data" => [
            "first_name" => $first_name,
            "last_name" => $last_name,
          ],
          "listName" => $lists,
        ];
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          "Accept: application/json, application/xml",
          "Content-Type: application/json",
          "mmApiKey: $apiKey"
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $error = curl_error($ch);
          $response['errors']['mailmodoAddContactError'] = empty($errorMessage) ? $errorMessage : $error;
          curl_close($ch);
          die('Curl error: ' . $error);
        } else {
          $curl_response = json_decode($curl_response);
          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
          //   $response['errors']['mailmodoAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          if (isset($curl_response->error) && $curl_response->error == 'ValidationError') {
            $response['errors']['mailmodoAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          }
          // if (isset($curl_response->ErrorInfo)) {
          //   $response['errors']['mailmodoAddContactExist'] = empty($errorMessage) ? $curl_response->ErrorMessage : $errorMessage;
          // }
          if (isset($curl_response->success)) {
            $response['success']['mailmodoAddContactSuccess'] = empty($errorMessage) ? $curl_response->message : $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'dripAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        $lists = array_map('intval', $lists);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKey = isset($apiKeys['drip']['args']['apikey']) ? $apiKeys['drip']['args']['apikey'] : "";
        $accountId = isset($apiKeys['drip']['args']['accountId']) ? $apiKeys['drip']['args']['accountId'] : "";
        $url = "https://api.getdrip.com/v2/{$accountId}/subscribers";
        $data = array(
          "subscribers" => array(
            array(
              "email" => $email,
              "first_name" => $first_name,
              "last_name" => $last_name,
            )
          )
        );
        $data_string = json_encode($data);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'User-Agent: Your App Name (www.yourapp.com)',
          'Content-Type: application/json',
          'Authorization: Basic ' . base64_encode($apiKey . ":")
        ));
        //$result = curl_exec($ch);
        if (curl_errno($ch)) {
          echo 'Error:' . curl_error($ch);
        }
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['dripAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
          //   $response['errors']['dripAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          if (isset($curl_response->errors) && $curl_response->errors[0]->code == 'authentication_error') {
            $response['errors']['dripAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->errors[0]->message;
          }
          if (isset($curl_response->errors) && $curl_response->errors[0]->code == 'email_error') {
            $response['errors']['dripAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->errors[0]->message;
          }
          if (isset($curl_response->subscribers)) {
            $response['success']['dripAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
        // if ($showOnResponse) {
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
        //         $response['errors']['mailpickerAddContactExist'] = $existMessage;
        //     }
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
        //         $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
        //     }
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
        //         $response['success']['mailpickerAddContactSuccess'] = $successMessage;
        //     }
        // }
      }
      if ($id == 'klaviyoAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        // $lists = explode(',', $lists);
        // $lists = array_map('intval', $lists);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $klaviyoApiKeys = isset($apiKeys['klaviyo']['args']['apikey']) ? $apiKeys['klaviyo']['args']['apikey'] : "";
        $url = "https://a.klaviyo.com/api/v2/list/" . $lists . "/members?api_key=" . $klaviyoApiKeys;
        $headers = array(
          'accept: application/json',
          'content-type: application/json'
        );
        //https://developers.klaviyo.com/en/v1-2/reference/get-profile
        $data = array(
          "profiles" => [
            "email" => $email,
            "first_name" => $first_name,
            "last_name" => $last_name,
          ],
        );
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['klaviyoAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
          //   $response['errors']['klaviyoAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          if (isset($curl_response->errors)) {
            $response['errors']['klaviyoAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
          }
          // if (isset($curl_response->errors)) {
          //   $response['errors']['klaviyoAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $errorMessage;
          // }
          if (($curl_response[0]->email == $email)) {
            $response['success']['klaviyoAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
        // if ($showOnResponse) {
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
        //         $response['errors']['mailpickerAddContactExist'] = $existMessage;
        //     }
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
        //         $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
        //     }
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
        //         $response['success']['mailpickerAddContactSuccess'] = $successMessage;
        //     }
        // }
      }
      if ($id == 'mailerliteAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        $lists = array_map('intval', $lists);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $mailerliteApiKeys = isset($apiKeys['mailerlite']['args']['apikey']) ? $apiKeys['mailerlite']['args']['apikey'] : "";
        // curl -v https://api.mailerlite.com/api/v2/subscribers \
        // -H "X-MailerLite-ApiKey: fc7b8c5b32067bcd47cafb5f475d2fe9"
        $url = 'https://connect.mailerlite.com/api/subscribers';
        $headers = array(
          'accept: application/json',
          'Authorization: Bearer ' . $mailerliteApiKeys,
          'content-type: application/json'
        );
        $data = array(
          "email" => $email,
          "ext_id" => "",
          "fields" => array(
            "name" => $first_name,
            "last_name" => $last_name
          ),
          "groups" => $lists,
        );
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {
          //   $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          // }
          if (isset($curl_response->errors)) {
            $response['errors']['mailerliteAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $curl_response->message;
          }
          if (isset($curl_response->data->email) && $curl_response->data->email == $email) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
        // if ($showOnResponse) {
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
        //         $response['errors']['mailpickerAddContactExist'] = $existMessage;
        //     }
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
        //         $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
        //     }
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
        //         $response['success']['mailpickerAddContactSuccess'] = $successMessage;
        //     }
        // }
      }
      if ($id == 'sendgridAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        //$lists = array_map('intval', $lists);
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $sendgridApiKeys = isset($apiKeys['sendgrid']['args']['apikey']) ? $apiKeys['sendgrid']['args']['apikey'] : "";
        // Initialize a cURL session
        $ch = curl_init();
        // Set the URL for the cURL request
        $url = "https://api.sendgrid.com/v3/marketing/contacts";
        // Create the data array
        $contacts = [
          [
            "email" => $email,
            "first_name" => $first_name,
            "last_name" => $last_name
          ],
        ];
        $data = array('contacts' => $contacts, 'list_ids' => $lists);
        // Convert the data array to JSON format
        $jsonData = json_encode($data);
        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Authorization: Bearer ' . $sendgridApiKeys // Replace with your SendGrid API key
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {
          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {
          //   $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          // }
          if (isset($curl_response->errors)) {
            $response['errors']['mailerliteAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $curl_response->errors[0]->message;
          }
          if (isset($curl_response->data->email) && $curl_response->data->email == $email) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
        // if ($showOnResponse) {
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
        //         $response['errors']['mailpickerAddContactExist'] = $existMessage;
        //     }
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
        //         $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
        //     }
        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
        //         $response['success']['mailpickerAddContactSuccess'] = $successMessage;
        //     }
        // }
      }
      if ($id == 'emailoctopusAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        //$lists = explode(',', $lists);
        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKey = isset($apiKeys['emailoctopus']['args']['apikey']) ? $apiKeys['emailoctopus']['args']['apikey'] : "";
        // Initialize a cURL session
        $ch = curl_init();
        // Set the URL for the cURL request
        $url = "https://emailoctopus.com/api/1.6/lists/" . $lists . "/contacts";
        // Create the data array
        $data = [
          "api_key" => $apiKey,
          "email_address" => $email,
          "fields" => [
            "FirstName" => $first_name,
            "LastName" => $last_name,
          ],
          "tags" => $tags,
        ];
        // Convert the data array to JSON format
        $jsonData = json_encode($data);
        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {
          //   $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          // }
          if (isset($curl_response->error)) {
            if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
              $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
            }
          }
          if (isset($curl_response->id) && $curl_response->email_address == $email) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'senderAddContact') {
        $groups  = isset($arg->groups) ? $arg->groups  : '';
        $groups  = explode(',', $groups);
        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKey = isset($apiKeys['sender']['args']['apikey']) ? $apiKeys['sender']['args']['apikey'] : "";
        // Initialize a cURL session
        $ch = curl_init();
        // Set the URL for the cURL request
        $url = "https://api.sender.net/v2/subscribers";
        // Create the data array
        $data = [
          "email" => $email,
          "firstname" => $first_name,
          "lastname" => $last_name,
          "groups" => $groups
        ];
        // Convert the data array to JSON format
        $jsonData = json_encode($data);
        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Authorization: Bearer ' . $apiKey
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          if (isset($curl_response->message) && $curl_response->message == 'Unauthenticated.') {
            $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          }
          //if (isset($curl_response->error)) {
          // if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
          // }
          // }
          if (isset($curl_response->success) && $curl_response->data->email == $email) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'moosendAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKey = isset($apiKeys['moosend']['args']['apikey']) ? $apiKeys['moosend']['args']['apikey'] : "";
        // Initialize a cURL session
        $ch = curl_init();
        // Set the URL for the cURL request
        $url = "https://api.moosend.com/v3/subscribers/" . $lists . "/subscribe.json?apikey=" . $apiKey;
        // Create the data array
        $data = [
          "Name" => $first_name,
          "Email" => $email,
          "Tags" => $tags
        ];
        // Convert the data array to JSON format
        $jsonData = json_encode($data);
        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          if (isset($curl_response->Error) && $curl_response->Error != null) {
            $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->Error;
          }
          //if (isset($curl_response->error)) {
          // if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
          // }
          // }
          if (isset($curl_response->Code) && $curl_response->Code == null) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'getresponseAddContact') {
        $lists = isset($arg->lists) ? $arg->lists : '';
        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKey = isset($apiKeys['getresponse']['args']['apikey']) ? $apiKeys['getresponse']['args']['apikey'] : "";
        // Initialize a cURL session
        $ch = curl_init();
        // Set the URL for the cURL request
        $url = "https://api.getresponse.com/v3/contacts/" . $lists . "/subscribe.json?apikey=" . $apiKey;
        // Create the data array
        $data = [
          "Name" => $first_name,
          "Email" => $email,
          "Tags" => $tags
        ];
        // Convert the data array to JSON format
        $jsonData = json_encode($data);
        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          if (isset($curl_response->Error) && $curl_response->Error != null) {
            $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->Error;
          }
          //if (isset($curl_response->error)) {
          // if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
          // }
          // }
          if (isset($curl_response->Code) && $curl_response->Code == null) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'activecampaignAddContact') {
        // $lists = isset($arg->lists) ? $arg->lists : '';
        // $tags = isset($arg->tags) ? $arg->tags : '';
        // $tags = explode(',', $tags);
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";
        $apiKey = isset($apiKeys['activecampaign']['args']['apikey']) ? $apiKeys['activecampaign']['args']['apikey'] : "";
        $accountName = isset($apiKeys['activecampaign']['args']['accountName']) ? $apiKeys['activecampaign']['args']['accountName'] : "";
        // Initialize a cURL session
        $ch = curl_init();
        // Set the URL for the cURL request
        $url = "https://" . $accountName . ".api-us1.com/api/3/contacts";
        // Create the data array
        $data = [
          "contact" => [
            "email" => "johndoe@example.com",
            "firstName" => "John",
            "lastName" => "Doe",
            "phone" => "7223224241",
            "fieldValues" => [
              [
                "field" => "1",
                "value" => "The Value for First Field"
              ],
              [
                "field" => "6",
                "value" => "2008-01-20"
              ]
            ]
          ]
        ];
        // Convert the data array to JSON format
        $jsonData = json_encode($data);
        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Api-Token: ' . $apiKey,
          'Accept: application/json',
          'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Execute the cURL request and get the response
        $curl_response = curl_exec($ch);
        if ($curl_response === false) {
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {
          $curl_response = json_decode($curl_response);
          if (isset($curl_response->Error) && $curl_response->Error != null) {
            $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->Error;
          }
          //if (isset($curl_response->error)) {
          // if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
          // }
          // }
          if (isset($curl_response->Code) && $curl_response->Code == null) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }
        }
        curl_close($ch);
      }
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        $status = combo_blocks_form_wrap_process_create_entry($entryData);
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        if ($showOnResponse) {
          if ($status) {
            $response['success']['createEntry'] = $successMessage;
          } else {
            $response['errors']['createEntry'] = $errorMessage;
          }
        }
      }
    }
  return $response;
}
add_filter('combo_blocks_form_wrap_process_commentSubmit', 'combo_blocks_form_wrap_process_commentSubmit', 99, 3);
function combo_blocks_form_wrap_process_commentSubmit($formFields, $onprocessargs, $request)
{
  $response = [];
  $entryData = [];
  $name = isset($formFields['name']) ? sanitize_text_field($formFields['name']) : '';
  $url = isset($formFields['url']) ? esc_url($formFields['url']) : '';
  $comment = isset($formFields['comment']) ? wp_kses_post($formFields['comment']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  $post_id = isset($formFields['post_id']) ? sanitize_text_field($formFields['post_id']) : '';
  $rate = isset($formFields['rate']) ? sanitize_text_field($formFields['rate']) : '';
  if (empty($post_id)) {
    $response['errors']['commentPostIdMissing'] = __('Post Id missing', 'combo-blocks');
    return $response;
  }
  $email_data = [];
  $user = get_user_by('email', $email);
  if (empty($user))
    $user = get_user_by('login', $email);
  $currentUser = wp_get_current_user();
  // Collect entry data
  $entryData['id'] = 'commentSubmit';
  $entryData['formFields'] = $formFields;
  $entryData['user_id'] = isset($user->ID) ? $user->ID : 0;
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'commentSubmit') {
        $loginRequired = isset($arg->loginRequired) ? $arg->loginRequired : false;
        $status = isset($arg->status) ? $arg->status : 1;
        $type = isset($arg->type) ? $arg->type : 'comment';
        $metaFields = isset($arg->metaFields) ? $arg->metaFields : [];
        if ($loginRequired) {
          if (!$currentUser) {
            $response['errors']['loginNotLogin'] = __('User not logged in', 'combo-blocks');
            $entryData['errors']['loginNotLogin'] = __('User not logged in', 'combo-blocks');
            continue;
          }
          //return $response;
        }
        $commentData = [];
        $userId = isset($currentUser->ID) ? $currentUser->ID : 0;
        $user_login = !empty($currentUser->user_login) ? $currentUser->user_login : $name;
        $commentData['comment_post_ID'] = $post_id;
        $commentData['comment_author'] = $user_login;
        $commentData['comment_author_email'] = $email;
        $commentData['comment_content'] = $comment;
        $commentData['comment_author_url'] = $url;
        $commentData['comment_date'] = current_time('mysql');
        $commentData['comment_approved'] = $status;
        $commentData['user_id'] = $userId;
        $commentData['comment_type'] = $type;
        //$status = combo_blocks_form_wrap_process_comment_submit($commentData);
        $status = wp_insert_comment($commentData);
        if ($status) {
          $comment_meta = $request->get_param('comment_meta');
          if (!empty($comment_meta))
            foreach ($comment_meta as $metaKey => $fieldValue) {
              update_comment_meta($status, $metaKey, $fieldValue);
            }
          ////////################///////////////
          $comment_meta_files = isset($request->get_file_params()['comment_meta']) ? $request->get_file_params()['comment_meta'] : [];
          $files = [];
          if (!empty($comment_meta_files)) {
            $i = 0;
            foreach ($comment_meta_files as $index => $data) {
              foreach ($data as $metaKey => $fileInfo) {
                $files[$metaKey][$index] = $fileInfo;
              }
            }
          }
          if (!empty($files)) {
            foreach ($files as $metaKey => $metavalue) {
              if (!empty($metavalue['name'])) {
                $file_response = combo_blocks_upload_file($metavalue);
                if ($file_response['id']) {
                  update_comment_meta($status, $metaKey, $file_response['id']);
                }
              }
            }
          }
          ///////////##################//////////
          $response['success']['loggedInUser'] = __('Comment Submitted', 'combo-blocks');
        } else {
          $response['errors']['loggedInUser'] = __('Comment Submission Failed', 'combo-blocks');
        }
      }
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        $status = combo_blocks_form_wrap_process_create_entry($entryData);
        if ($status) {
          $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        } else {
          $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        }
      }
    }
  return $response;
}
function combo_blocks_form_wrap_process_comment_submit($commentData)
{
  $new_comment_ID = wp_insert_comment($commentData);
  if ($new_comment_ID) {
    return true;
  } else {
    return false;
  }
}
add_filter('combo_blocks_form_wrap_process_loginForm', 'combo_blocks_form_wrap_process_loginForm', 99, 3);
function combo_blocks_form_wrap_process_loginForm($formFields, $onprocessargs, $request)
{
  $response = [];
  $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';
  $password = isset($formFields['password']) ? sanitize_text_field($formFields['password']) : '';
  $remember = isset($formFields['remember']) ? sanitize_text_field($formFields['remember']) : '';
  $email_data = [];
  $user = get_user_by('email', $username);
  if (empty($user)) {
    $user = get_user_by('login', $username);
  }
  if (!$user) {
    // $response['loginUsernotExist'] = 'User not exist';
    $response['errors']['loginUsernotExist'] = __('User not exist', 'combo-blocks');
    return $response;
  }
  $email = isset($user->user_email) ? $user->user_email : '';
  $full_name = isset($user->display_name) ? $user->display_name : '';
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'loggedInUser') {
        $credentials = [];
        $credentials['user_login'] = $user->user_login;
        $credentials['password'] = $password;
        $credentials['remember'] = $remember;
        $status = combo_blocks_form_wrap_process_logged_user($credentials);
        if ($status) {
          //$response['loggedInUser'] = 'loggedInUser Success';
          $response['success']['loggedInUser'] = __('User Login success', 'combo-blocks');
        } else {
          //$response['loggedInUser'] = 'loggedInUser Failed';
          $response['errors']['loggedInUser'] = __('User Login failed', 'combo-blocks');
          return $response;
        }
      }
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        $status = combo_blocks_form_wrap_process_create_entry($email_data);
        if ($status) {
          //$response['createEntry'] = 'createEntry Success';
          $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        } else {
          //$response['createEntry'] = 'createEntry Failed';
          $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        }
      }
    }
  return $response;
}
function combo_blocks_form_wrap_process_logged_user($credentials)
{
  $user = get_user_by('login', $credentials['user_login']);
  $user_id = $user->ID;
  $user = wp_authenticate($credentials['user_login'], $credentials['password']);
  if (!is_wp_error($user)) {
    wp_set_current_user($user_id, $user->user_login);
    wp_set_auth_cookie($user_id);
    do_action('wp_login', $user->user_login, $user);
    return true;
  } else {
    return false;
  }
}
add_filter('combo_blocks_form_wrap_process_passwordResetFrom', 'combo_blocks_form_wrap_process_passwordResetFrom', 99, 3);
function combo_blocks_form_wrap_process_passwordResetFrom($formFields, $onprocessargs, $request)
{
  $response = [];
  $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';
  $email_data = [];
  $user = get_user_by('email', $username);
  if (empty($user)) {
    $user = get_user_by('login', $username);
  }
  if (!$user) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'combo-blocks');
    return $response;
  }
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'resetPassword') {
        $status = retrieve_password($user->user_login);
        if ($status) {
          //$response['loggedInUser'] = 'loggedInUser Success';
          $response['success']['loggedInUser'] = __('Password reset successful', 'combo-blocks');
        } else {
          //$response['loggedInUser'] = 'loggedInUser Failed';
          $response['errors']['loggedInUser'] = __('Password reset failed', 'combo-blocks');
          return $response;
        }
      }
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        $status = combo_blocks_form_wrap_process_create_entry($email_data);
        if ($status) {
          //$response['createEntry'] = 'createEntry Success';
          $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        } else {
          //$response['createEntry'] = 'createEntry Failed';
          $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        }
      }
    }
  return $response;
}
add_filter('combo_blocks_form_wrap_process_passwordUpdateFrom', 'combo_blocks_form_wrap_process_passwordUpdateFrom', 99, 3);
function combo_blocks_form_wrap_process_passwordUpdateFrom($formFields, $onprocessargs, $request)
{
  $response = [];
  $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';
  $email_data = [];
  $user = get_user_by('email', $username);
  if (empty($user)) {
    $user = get_user_by('login', $username);
  }
  if (!$user) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'combo-blocks');
    return $response;
  }
  if (isset($GET['action'])) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'combo-blocks');
    return $response;
  }
  if (isset($GET['key'])) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'combo-blocks');
    return $response;
  }
  if (isset($GET['login'])) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'combo-blocks');
    return $response;
  }
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'resetPassword') {
        $status = retrieve_password($user->user_login);
        if ($status) {
          //$response['loggedInUser'] = 'loggedInUser Success';
          $response['success']['loggedInUser'] = __('Password reset successful', 'combo-blocks');
        } else {
          //$response['loggedInUser'] = 'loggedInUser Failed';
          $response['errors']['loggedInUser'] = __('Password reset failed', 'combo-blocks');
          return $response;
        }
      }
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        $status = combo_blocks_form_wrap_process_create_entry($email_data);
        if ($status) {
          //$response['createEntry'] = 'createEntry Success';
          $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        } else {
          //$response['createEntry'] = 'createEntry Failed';
          $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        }
      }
    }
  return $response;
}
add_filter('combo_blocks_form_wrap_process_userProfileUpdate', 'combo_blocks_form_wrap_process_userProfileUpdate', 99, 3);
function combo_blocks_form_wrap_process_userProfileUpdate($formFields, $onprocessargs, $request)
{
  $response = [];
  $first_name = $request->get_param('first_name');
  $last_name = $request->get_param('last_name');
  $display_name = $request->get_param('display_name');
  $user_url = $request->get_param('user_url');
  $description = $request->get_param('description');
  $nickname = $request->get_param('nickname');
  $locale = $request->get_param('locale');
  $rich_editing = $request->get_param('rich_editing');
  $syntax_highlighting = $request->get_param('syntax_highlighting');
  $admin_color = $request->get_param('admin_color');
  $admin_bar_front = $request->get_param('admin_bar_front');
  $user_login = $request->get_param('user_login');
  $user_email = $request->get_param('user_email');
  $pass1 = $request->get_param('pass1');
  $pass2 = $request->get_param('pass2');
  $combo_blocks_settings = get_option("combo_blocks_settings");
  $blockSettings = isset($combo_blocks_settings['blockSettings']) ? $combo_blocks_settings['blockSettings'] : [];
  $formWrap = isset($blockSettings['formWrap']) ? $blockSettings['formWrap'] : [];
  $allowedUserMetaKeys = isset($formWrap['allowedUserMetaKeys']) ? $formWrap['allowedUserMetaKeys'] : [];
  $currentUser = wp_get_current_user();
  $currentUserId = ($currentUser->ID) ? $currentUser->ID : 0;
  if (!$currentUserId) {
    $response['errors']['userProfileUpdateConfirm'] = __('Please login first', 'combo-blocks');
    return $response;
  }
  $email_data = [];
  foreach ($onprocessargs as $arg) {
    $id = $arg->id;
    if ($id == 'updateUserProfile') {
      $user_new_data = [];
      $user_new_data["ID"] = $currentUserId;
      if (!empty($first_name)) {
        $user_new_data["first_name"] = $first_name;
      }
      if (!empty($last_name)) {
        $user_new_data["last_name"] = $last_name;
      }
      if (!empty($display_name)) {
        $user_new_data["display_name"] = $display_name;
      }
      if (!empty($user_url)) {
        $user_new_data["user_url"] = $user_url;
      }
      if (!empty($description)) {
        $user_new_data["description"] = $description;
      }
      if (!empty($nickname)) {
        $user_new_data["nickname"] = $nickname;
      }
      if (!empty($locale)) {
        $user_new_data["locale"] = $locale;
      }
      if (!empty($rich_editing)) {
        $user_new_data["rich_editing"] = $rich_editing;
      }
      if (!empty($syntax_highlighting)) {
        $user_new_data["syntax_highlighting"] = $syntax_highlighting;
      }
      if (!empty($admin_color)) {
        $user_new_data["admin_color"] = $admin_color;
      }
      if (!empty($admin_bar_front)) {
        $user_new_data["admin_bar_front"] = $admin_bar_front;
      }
      if (!empty($user_email)) {
        $currentUserEmail = ($currentUser->user_email) ? $currentUser->user_email : 0;
        if ($user_email != $currentUserEmail) {
          $user = get_user_by('email', $user_email);
          if ($user) {
            $response['errors']['userEmailExist'] = __('User email exist, Please try another.', 'combo-blocks');
            return $response;
          } else {
            $user_new_data["user_email"] = $user_email;
            $response['success']['userEmailUpdateSuccess'] = __('Email update request sent.', 'combo-blocks');
          }
        }
      }
      // if (!empty($pass1)) {
      //   $user_new_data["pass1"] = $pass1;
      // }
      $user_meta = $request->get_param('user_meta');
      if (!empty($user_meta)) {
        foreach ($user_meta as $metaKey => $metavalue) {
          if (in_array($metaKey, $allowedUserMetaKeys)) {
            update_user_meta($currentUserId, $metaKey, $metavalue);
          } else {
            $response['errors']['profileUpdateFailed'] = __("You dont\'t have access to update this field({$metaKey})", 'combo-blocks');
          }
        }
      }
      if (isset($request->get_file_params()['user_meta'])) {
        $user_meta_files = $request->get_file_params()['user_meta'];
        $files = [];
        if (!empty($user_meta_files)) {
          $i = 0;
          foreach ($user_meta_files as $index => $data) {
            foreach ($data as $metaKey => $fileInfo) {
              $files[$metaKey][$index] = $fileInfo;
            }
          }
        }
        if (!empty($files)) {
          foreach ($files as $metaKey => $metavalue) {
            $file_response = combo_blocks_upload_file($metavalue);
            if ($file_response['id']) {
              if (in_array($metaKey, $allowedUserMetaKeys)) {
                update_user_meta($currentUserId, $metaKey, $file_response['id']);
              } else {
                $response['errors']['profileUpdateFailed'] = __("You dont\'t have access to update this field({$metaKey})", 'combo-blocks');
              }
            }
          }
        }
      }
      if (isset($response['errors'])) {
        return $response;
      }
      $user_update = wp_update_user($user_new_data);
      if (!is_wp_error($user_update)) {
        $response['success']['profileUpdateSuccess'] = __('User profile update success', 'combo-blocks');
      } else {
        $response['errors']['profileUpdateFailed'] = __('User profile update failed', 'combo-blocks');
      }
    }
    if ($id == 'doAction') {
      $actionName = isset($arg->actionName) ? $arg->actionName : '';
      do_action($actionName, $request);
    }
    if ($id == 'webhookRequest') {
      $url = isset($arg->url) ? $arg->url : '';
      $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
      $method = isset($arg->method) ? $arg->method : 'POST';
      $format = isset($arg->format) ? $arg->format : '';
      $fields = isset($arg->fields) ? $arg->fields : [];
      $requestPrams =  $request->get_params();
      unset($requestPrams['onprocessargs']);
      unset($requestPrams['formFieldNames']);
      // Encode the data as JSON
      $payload = json_encode($requestPrams);
      // Prepare headers
      $headers = [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
      ];
      // Initialize curl session
      $ch = curl_init($url);
      // Set curl options
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      // Execute curl session
      $response = curl_exec($ch);
      // Check for errors
      if (curl_errno($ch)) {
        echo 'Webhook delivery failed: ' . curl_error($ch);
      } else {
        echo 'Webhook sent successfully. Response: ' . $response;
      }
      // Close curl session
      curl_close($ch);
    }
    if ($id == 'createEntry') {
      $status = combo_blocks_form_wrap_process_create_entry($email_data);
      if ($status) {
        //$response['createEntry'] = 'createEntry Success';
        $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
      } else {
        //$response['createEntry'] = 'createEntry Failed';
        $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
      }
    }
  }
  return $response;
}
add_filter('combo_blocks_form_wrap_process_registerForm', 'combo_blocks_form_wrap_process_registerForm', 99, 3);
function combo_blocks_form_wrap_process_registerForm($formFields, $onprocessargs, $request)
{



  $response = [];
  $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';
  $email = isset($formFields['email']) ? sanitize_text_field($formFields['email']) : '';
  $password = isset($formFields['password']) ? sanitize_text_field($formFields['password']) : '';
  $password_confirm = isset($formFields['password_confirm']) ? sanitize_text_field($formFields['password_confirm']) : '';
  //$allowedUserMeta = isset($formFields['allowedUserMeta']) ? sanitize_text_field($formFields['allowedUserMeta']) : [];

  $combo_blocks_settings = get_option("combo_blocks_settings");
  $blockSettings = isset($combo_blocks_settings['blockSettings']) ? $combo_blocks_settings['blockSettings'] : [];
  $formWrap = isset($blockSettings['formWrap']) ? $blockSettings['formWrap'] : [];
  $allowedUserMetaKeys = isset($formWrap['allowedUserMetaKeys']) ? $formWrap['allowedUserMetaKeys'] : [];


  if ($password !== $password_confirm) {
    //$response['registerUserConfirm'] = 'Password Missmatch';
    $response['errors']['registerUserConfirm'] = __('Password Missmatch', 'combo-blocks');
    return $response;
  }
  $user = get_user_by('email', $email);
  if ($user) {
    //$response['registerUserExist'] = 'User already exist';
    $response['errors']['registerUserExist'] = __('User already exist', 'combo-blocks');
    return $response;
  }
  if (empty($username)) {
    $emailArr = explode(',', $email);
    $username = isset($emailArr[0]) ? $emailArr[0] : '';
  }
  $username = combo_blocks_form_wrap_process_regenerate_username($username);
  $email_data = [];

  if (!empty($onprocessargs)) {
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'registerUser') {
        $credentials = [];
        $credentials['email'] = $email;
        $credentials['password'] = $password;
        $credentials['username'] = $username;
        $new_user_id = combo_blocks_form_wrap_process_register_user($credentials);
        $user_meta = $request->get_param('user_meta');


        if (!empty($user_meta)) {
          foreach ($user_meta as $metaKey => $metavalue) {
            // if (in_array($metaKey, $allowedUserMeta)) {
            //   update_user_meta($new_user_id, $metaKey, $metavalue);
            // }

            if (in_array($metaKey, $allowedUserMetaKeys)) {

              update_user_meta($new_user_id, $metaKey, $metavalue);
            } else {
              $response['errors']['profileUpdateFailed'] = __("You dont\'t have access to update this field({$metaKey})", 'combo-blocks');
            }
          }
        }



        $user_meta_files = isset($request->get_file_params()['user_meta']) ? $request->get_file_params()['user_meta'] : [];


        $files = [];
        if (!empty($user_meta_files)) {
          $i = 0;
          foreach ($user_meta_files as $index => $data) {




            foreach ($data as $metaKey => $fileInfo) {
              $files[$metaKey][$index] = $fileInfo;
            }
          }
        }
        if (!empty($files)) {
          foreach ($files as $metaKey => $metavalue) {
            $file_response = combo_blocks_upload_file($metavalue);
            if ($file_response['id']) {
              update_user_meta($new_user_id, $metaKey, $file_response['id']);
            }
          }
        }
        if ($new_user_id) {
          $response['success']['registerUserExist'] = __('User register Success', 'combo-blocks');
        } else {
          $response['errors']['registerUserExist'] = __('User register Failed', 'combo-blocks');
        }
      }









      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        $status = combo_blocks_form_wrap_process_create_entry($email_data);
        if ($status) {
          //$response['createEntry'] = 'createEntry Success';
          $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        } else {
          //$response['createEntry'] = 'createEntry Failed';
          $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        }
      }
    }
  }


  return $response;
}
function combo_blocks_form_wrap_process_register_user($credentials)
{
  $user_login = isset($credentials['user_login']) ? $credentials['user_login'] : '';
  $user = get_user_by('login', $user_login);
  $user_id = isset($user->ID) ? $user->ID : '';
  $user_id = wp_create_user($credentials['username'], $credentials['password'], $credentials['email']);
  if ($user_id) {
    return $user_id;
  } else {
    return false;
  }
}
function combo_blocks_form_wrap_process_regenerate_username($username)
{
  if (username_exists($username)) {
    $x = 1;
    while (username_exists($username)) {
      $username = $username . $x;
      $x++;
    }
  }
  return $username;
}
add_filter('combo_blocks_form_wrap_process_appointmentForm', 'combo_blocks_form_wrap_process_appointmentForm', 99, 3);
function combo_blocks_form_wrap_process_appointmentForm($formFields, $onprocessargs, $request)
{
  $response = [];
  $full_name = isset($formFields['full_name']) ? sanitize_text_field($formFields['full_name']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  $message = isset($formFields['message']) ? wp_kses_post($formFields['message']) : '';
  $extraFields = $formFields;
  unset($extraFields['full_name']);
  unset($extraFields['email']);
  unset($extraFields['message']);
  $email_data = [];
  foreach ($onprocessargs as $arg) {
    $id = $arg->id;
    if ($id == 'sendMail') {
      $fromEmail = $email;
      $fromName = $full_name;
      $replyTo = $email;
      $replyToName = $full_name;
      $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
      $bcc = isset($arg->bcc) ? $arg->bcc : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $subject = isset($arg->subject) ? $arg->subject : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Send mail success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Send mail failed', 'combo-blocks');
      $email_data['email_to'] = $mailTo;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $email;
      $email_data['email_from_name'] = $full_name;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];
      $status = combo_blocks_form_wrap_process_send_email($email_data);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['sendMail'] = $successMessage;
        } else {
          $response['errors']['sendMail'] = $errorMessage;
        }
      }
    }
    if ($id == 'emailCopyUser') {
      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $subject = isset($arg->subject) ? $arg->subject : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Email copy user success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Email copy user failed', 'combo-blocks');
      $email_data['email_to'] = $email;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];
      $status = combo_blocks_form_wrap_process_send_email($email_data);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['emailCopyUser'] = $successMessage;
        } else {
          $response['errors']['emailCopyUser'] = $errorMessage;
        }
      }
    }
    if ($id == 'emailBcc') {
      $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $subject = isset($arg->subject) ? $arg->subject : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Email Bcc success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Email Bcc failed', 'combo-blocks');
      $email_data['email_to'] = $mailTo;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];
      $status = combo_blocks_form_wrap_process_send_email($email_data);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['emailBcc'] = $successMessage;
        } else {
          $response['errors']['emailBcc'] = $errorMessage;
        }
      }
    }
    if ($id == 'autoReply') {
      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $subject = isset($arg->subject) ? $arg->subject : '';
      $message = isset($arg->message) ? $arg->message : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Auto Reply success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Auto Reply failed', 'combo-blocks');
      $email_data['email_to'] = $email;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];
      $status = combo_blocks_form_wrap_process_send_email($email_data);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['autoReply'] = $successMessage;
        } else {
          $response['errors']['autoReply'] = $errorMessage;
        }
      }
    }
    if ($id == 'doAction') {
      $actionName = isset($arg->actionName) ? $arg->actionName : '';
      do_action($actionName, $request);
    }
    if ($id == 'webhookRequest') {
      $url = isset($arg->url) ? $arg->url : '';
      $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
      $method = isset($arg->method) ? $arg->method : 'POST';
      $format = isset($arg->format) ? $arg->format : '';
      $fields = isset($arg->fields) ? $arg->fields : [];
      $requestPrams =  $request->get_params();
      unset($requestPrams['onprocessargs']);
      unset($requestPrams['formFieldNames']);
      // Encode the data as JSON
      $payload = json_encode($requestPrams);
      // Prepare headers
      $headers = [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
      ];
      // Initialize curl session
      $ch = curl_init($url);
      // Set curl options
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      // Execute curl session
      $response = curl_exec($ch);
      // Check for errors
      if (curl_errno($ch)) {
        echo 'Webhook delivery failed: ' . curl_error($ch);
      } else {
        echo 'Webhook sent successfully. Response: ' . $response;
      }
      // Close curl session
      curl_close($ch);
    }
    if ($id == 'createEntry') {
      $status = combo_blocks_form_wrap_process_create_entry($email_data);
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Create entry success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Create entry failed', 'combo-blocks');
      if ($showOnResponse) {
        if ($status) {
          $response['success']['createEntry'] = $successMessage;
        } else {
          $response['errors']['createEntry'] = $errorMessage;
        }
      }
    }
  }
  return $response;
}
add_filter('combo_blocks_form_wrap_process_postsFilter', 'combo_blocks_form_wrap_process_postsFilter', 99, 3);
function combo_blocks_form_wrap_process_postsFilter($formFields, $onprocessargs, $request)
{
  $response = [];
  $entryData = [];
  //$post_title = isset($formFields['post_title']) ? sanitize_text_field($formFields['post_title']) : '';
  if (!empty($response['errors'])) {
    return $response;
  }
  // Collect entry data
  $entryData['id'] = 'postSubmit';
  $entryData['formFields'] = $formFields;
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'queryPosts') {
      }
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);
        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // Execute curl session
        $curl_response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $curl_response;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createEntry') {
        $status = combo_blocks_form_wrap_process_create_entry($entryData);
        if ($status) {
          $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        } else {
          $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        }
      }
    }
  return $response;
}
add_filter('combo_blocks_form_wrap_process_customForm', 'combo_blocks_form_wrap_process_customForm', 99, 3);
function combo_blocks_form_wrap_process_customForm($formFields, $onprocessargs, $request)
{
  $response = [];
  $entryData = [];
  $combo_blocks_settings = get_option("combo_blocks_settings");
  $apiKeys = isset($combo_blocks_settings['apiKeys']) ? $combo_blocks_settings['apiKeys'] : [];
  // if (!empty($response['errors'])) {
  //   return $response;
  // }
  // Collect entry data
  $entryData['id'] = 'customForm';
  $entryData['formFields'] = $formFields;
  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {
      $id = $arg->id;
      if ($id == 'doAction') {
        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }
      if ($id == 'droboxUpload') {
        $accessToken = isset($apiKeys['dropbox']['args']['accessToken']) ? $apiKeys['dropbox']['args']['accessToken'] : "";
        if (empty($accessToken)) {
          $response['errors']['dropboxUpload'] = __("Access token is empty.");
          return $response;
        }
        $path = isset($arg->path) ? $arg->path : '';
        $successMessage = isset($arg->successMessage) ? $arg->successMessage : '';
        $failedMessage = isset($arg->failedMessage) ? $arg->failedMessage : '';
        $files = $request->get_file_params();
        $file_response = [];
        foreach ($files as $fileIndex => $file) {
          $file_temp_name = isset($file['tmp_name']) ? $file['tmp_name'] : '';
          $file_name = isset($file['name']) ? $file['name'] : '';
          $dropboxPath = $path . '/' . $file_name;
          $localFilePath = $file_temp_name;
          $headers = [
            'Authorization: Bearer ' . $accessToken,
            'Dropbox-API-Arg: {"path": "' . $dropboxPath . '","mode": "add","autorename": true,"mute": false,"strict_conflict": false}',
            'Content-Type: application/octet-stream',
          ];
          $ch = curl_init('https://content.dropboxapi.com/2/files/upload');
          curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
          curl_setopt($ch, CURLOPT_POST, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents($localFilePath));
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          $curl_response = curl_exec($ch);
          $curl_response_obj = json_decode($curl_response);
          if (!isset($curl_response_obj->id)) {
            $file_response['errors'][$fileIndex] = __("File Upload failed", 'combo-blocks');
          }
        }
        if (isset($file_response['errors'])) {
          $response['errors']['dropboxUploadFailed'] = empty($errorMessage) ? $failedMessage : curl_error($ch);
        } else {
          $response['success']['dropboxUploadSuccess'] = $successMessage;
        }
        curl_close($ch);
      }
      if ($id == 'googleDriveUpload') {
        $accessToken = isset($apiKeys['googleDrive']['args']['accessToken']) ? $apiKeys['googleDrive']['args']['accessToken'] : "";
        if (empty($accessToken)) {
          $response['errors']['googleDriveUpload'] = __("Access token is empty.");
          return $response;
        }
        $path = isset($arg->path) ? $arg->path : '';
        $successMessage = isset($arg->successMessage) ? $arg->successMessage : '';
        $failedMessage = isset($arg->failedMessage) ? $arg->failedMessage : '';
        $files = $request->get_file_params();
        $file_response = [];
        foreach ($files as $fileIndex => $file) {
          $file_temp_name = isset($file['tmp_name']) ? $file['tmp_name'] : '';
          $file_name = isset($file['name']) ? $file['name'] : '';
          if (empty($file_name)) continue;
          $dropboxPath = $path . '/' . $file_name;
          //$localFilePath = $file_temp_name;
          // $fileName = 'example.txt'; // Desired file name in Google Drive
          $localFilePath = $file_temp_name; // Local file path
          //$mimeType = 'text/plain'; // MIME type of the file
          $mimeType = mime_content_type($file_temp_name); // MIME type of the file
          $metadata = [
            'name' => $file_name
          ];
          $boundary = uniqid();
          $delimiter = '-------------' . $boundary;
          $postData = "--{$delimiter}\r\n" .
            "Content-Type: application/json; charset=UTF-8\r\n\r\n" .
            json_encode($metadata) . "\r\n" .
            "--{$delimiter}\r\n" .
            "Content-Type: {$mimeType}\r\n\r\n" .
            file_get_contents($localFilePath) . "\r\n" .
            "--{$delimiter}--";
          $headers = [
            "Authorization: Bearer $accessToken",
            "Content-Type: multipart/related; boundary={$delimiter}",
            "Content-Length: " . strlen($postData)
          ];
          $ch = curl_init('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
          curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
          curl_setopt($ch, CURLOPT_POST, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          $curl_response = curl_exec($ch);
          $curl_response_obj = json_decode($curl_response);
          if (!isset($curl_response_obj->id)) {
            $file_response['errors'][$fileIndex] = __("File Upload failed", 'combo-blocks');
          }
        }
        if (isset($file_response['errors'])) {
          $response['errors']['dropboxUpload'] = empty($errorMessage) ? $failedMessage : curl_error($ch);
        } else {
          $response['success']['dropboxUpload'] = $successMessage;
        }
        curl_close($ch);
      }
      if ($id == 'applyFilters') {
        $filterName = isset($arg->filterName) ? $arg->filterName : '';
        $successMessage = isset($arg->successMessage) ? $arg->successMessage : '';
        $failedMessage = isset($arg->failedMessage) ? $arg->failedMessage : '';
        $return = false;
        $filter = apply_filters($filterName, $return, $request);


        if ($filter) {
          $response['success']['createEntry'] = $successMessage;
        } else {
          $response['errors']['createEntry'] = $failedMessage;
        }
      }
      if ($id == 'webhookRequest') {
        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];
        $requestPrams =  $request->get_params();
        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);
        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];
        // Initialize curl session
        $ch = curl_init($url);
        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        // Execute curl session
        $curl_response = curl_exec($ch);
        // Check for errors
        if (curl_errno($ch)) {
          $failedMessage = 'Webhook delivery failed: ' . curl_error($ch);
          $response['errors']['WebhookFailed'] = $failedMessage;
        } else {
          $successMessage =  'Webhook sent successfully. Response: ' . ($curl_response);
          $response['success']['WebhookSuccess'] = $successMessage;
        }
        // Close curl session
        curl_close($ch);
      }
      if ($id == 'createWCOrder') {
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Send mail success', 'combo-blocks');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Send mail failed', 'combo-blocks');
        $status = combo_blocks_form_wrap_process_create_wc_order($arg, $request);
        if ($showOnResponse) {
          if ($status) {
            $response['success']['createWCOrder'] = $successMessage;
          } else {
            $response['errors']['createWCOrder'] = $errorMessage;
          }
        }
      }
      if ($id == 'createEntry') {
        // $status = combo_blocks_form_wrap_process_create_entry($entryData);
        // if ($status) {
        //   $response['success']['createEntry'] = __('Create entry success', 'combo-blocks');
        // } else {
        //   $response['errors']['createEntry'] = __('Create entry failed', 'combo-blocks');
        // }
      }
    }
  return $response;
}
add_filter('combo_blocks_form_wrap_process_contactForm', 'combo_blocks_form_wrap_process_contactForm', 99, 3);
function combo_blocks_form_wrap_process_contactForm($formFields, $onprocessargs, $request)
{
  $response = [];
  $full_name = isset($formFields['full_name']) ? sanitize_text_field($formFields['full_name']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  $mail_message = isset($formFields['message']) ? wp_kses_post($formFields['message']) : '';
  $subject = isset($formFields['subject']) ? wp_kses_post($formFields['subject']) : '';
  $recaptchaResponse = isset($formFields['g-recaptcha-response']) ? wp_kses_post($formFields['g-recaptcha-response']) : '';
  $extraFields = $formFields;
  unset($extraFields['full_name']);
  unset($extraFields['email']);
  unset($extraFields['message']);
  unset($extraFields['subject']);
  $email_data = [];
  foreach ($onprocessargs as $arg) {
    $id = $arg->id;
    if ($id == 'sendMail') {
      $fromEmail = $email;
      $fromName = $full_name;
      $replyTo = $email;
      $replyToName = $full_name;
      $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
      $bcc = isset($arg->bcc) ? $arg->bcc : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Send mail success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Send mail failed', 'combo-blocks');
      $email_data['email_to'] = $mailTo;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $email;
      $email_data['email_from_name'] = $full_name;
      $email_data['subject'] = $subject;
      $email_data['html'] = $mail_message . $footer;
      $email_data['attachments'] = [];
      $status = combo_blocks_form_wrap_process_send_email($email_data);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['sendMail'] = $successMessage;
        } else {
          $response['errors']['sendMail'] = $errorMessage;
        }
      }
    }
    if ($id == 'emailCopyUser') {
      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Email copy user success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Email copy user failed', 'combo-blocks');
      $email_data['email_to'] = $email;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $mail_message . $footer;
      $email_data['attachments'] = [];
      $status = combo_blocks_form_wrap_process_send_email($email_data);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['emailCopyUser'] = $successMessage;
        } else {
          $response['errors']['emailCopyUser'] = $errorMessage;
        }
      }
    }
    if ($id == 'emailBcc') {
      $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Email Bcc success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Email Bcc failed', 'combo-blocks');
      $email_data['email_to'] = $mailTo;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $mail_message . $footer;
      $email_data['attachments'] = [];
      $status = combo_blocks_form_wrap_process_send_email($email_data);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['emailBcc'] = $successMessage;
        } else {
          $response['errors']['emailBcc'] = $errorMessage;
        }
      }
    }
    if ($id == 'autoReply') {
      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $message = isset($arg->message) ? $arg->message : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Auto Reply success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Auto Reply failed', 'combo-blocks');
      $email_data['email_to'] = $email;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $mail_message . $footer;
      $email_data['attachments'] = [];
      $status = combo_blocks_form_wrap_process_send_email($email_data);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['autoReply'] = $successMessage;
        } else {
          $response['errors']['autoReply'] = $errorMessage;
        }
      }
    }
    if ($id == 'validatedField') {
      $conditions = isset($arg->conditions) ? $arg->conditions : [];
      $field = isset($arg->field) ? $arg->field : "";
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : '';
      $fieldValue = $request->get_param($field);
      $valid = true;
      if (!empty($conditions)) {
        foreach ($conditions as $index => $condition) {
          $compare = isset($condition->compare) ? $condition->compare : '';
          $relation = isset($condition->relation) ? $condition->relation : 'OR';
          $value = isset($condition->value) ? $condition->value : '';
          $values = isset($condition->values) ? $condition->values : '';
          $message = isset($condition->message) ? $condition->message : '';
          if ($compare == "equal") {
            if ($fieldValue != $value) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "notEqual") {
            if ($fieldValue == $value) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "greaterThan") {
            $isGreater = ((int)$fieldValue > (int) $value) ? true : false;
            if (!$isGreater) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "GreaterThanEqual") {
            $isGreater = ((int)$fieldValue >= (int) $value) ? true : false;
            if (!$isGreater) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "lessThan") {
            $isLess = ((int)$fieldValue < (int) $value) ? true : false;
            if (!$isLess) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "lessThanEqual") {
            $isLess = ((int)$fieldValue <= (int) $value) ? true : false;
            if (!$isLess) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "empty") {
            if (!empty($fieldValue)) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "notEmpty") {
            if (empty($fieldValue)) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "contains") {
            if (!empty($values)) {
              foreach ($values as $valueX) {
                $status = preg_match("/$valueX/", $fieldValue);
                if ($status == 0) {
                  $response['errors']['validFailed' . $index] = $message;
                  return $response;
                }
              }
            }
          }
          if ($compare == "notContains") {
            if (!empty($values)) {
              foreach ($values as $valueX) {
                $status = preg_match("/$valueX/", $fieldValue);
                if ($status == 1) {
                  $response['errors']['validFailed' . $index] = $message;
                  return $response;
                }
              }
            }
          }
          if ($compare == "startsWith") {
            if (!empty($values)) {
              foreach ($values as $valueX) {
                $status = preg_match("/^$valueX/", $fieldValue);
                if ($status == 0) {
                  $response['errors']['validFailed' . $index] = $message;
                  return $response;
                }
              }
            }
          }
          if ($compare == "endsWith") {
            if (!empty($values)) {
              foreach ($values as $valueX) {
                $status = preg_match("/$valueX$/", $fieldValue);
                if ($status == 0) {
                  $response['errors']['validFailed' . $index] = $message;
                  return $response;
                }
              }
            }
          }
          if ($compare == "regex") {
            if (!empty($values)) {
              if ($relation == "AND") {
                $regexValid = true;
                foreach ($values as $valueX) {
                  $status = preg_match("/$valueX/", $fieldValue);
                  if ($status == 0) {
                    $regexValid = false;
                    $response['errors']['validFailed' . $index] = $message;
                    break;
                  }
                }
                if (!$regexValid) return $response;
              } else {
                $regexValid = false;
                foreach ($values as $valueX) {
                  $status = preg_match("/$valueX/", $fieldValue);
                  if ($status == 1) {
                    $regexValid = true;
                    break;
                  }
                }
                if (!$regexValid) {
                  $response['errors']['validFailed'] = $message;
                  return $response;
                }
              }
            }
          }
          if ($compare == "between") {
            $min = isset($values[0]) ? $values[0] : '';
            $max = isset($values[1]) ? $values[1] : '';
            $isBetween = ($min <= $fieldValue) && ($fieldValue <= $max) ? true : false;
            if (!$isBetween) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
          if ($compare == "exist") {
            if (!in_array($fieldValue, $values)) {
              $response['errors']['validFailed' . $index] = $message;
              return $response;
            }
          }
        }
      }
    }
    if ($id == 'createWCOrder') {
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Send mail success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Send mail failed', 'combo-blocks');
      $status = combo_blocks_form_wrap_process_create_wc_order($arg, $request);
      if ($showOnResponse) {
        if ($status) {
          $response['success']['createWCOrder'] = $successMessage;
        } else {
          $response['errors']['createWCOrder'] = $errorMessage;
        }
      }
    }


    if ($id == 'createZendeskTicket') {
      $combo_blocks_settings = get_option("combo_blocks_settings");
      $apiKeys = isset($combo_blocks_settings['apiKeys']) ? $combo_blocks_settings['apiKeys'] : [];

      $priority = isset($formFields['priority']) ? wp_kses_post($formFields['priority']) : '';

      //$tags = isset($arg->tags) ? $arg->tags : [];
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
      $zendeskapiToken = isset($apiKeys['zendesk']['args']['apiToken']) ? $apiKeys['zendesk']['args']['apiToken'] : "";
      $zendeskSubdomain = isset($apiKeys['zendesk']['args']['subdomain']) ? $apiKeys['zendesk']['args']['subdomain'] : "";
      $zendeskSmail = isset($apiKeys['zendesk']['args']['email']) ? $apiKeys['zendesk']['args']['email'] : "";


      $subdomain = $zendeskSubdomain; // Replace with your subdomain
      $email_token = $zendeskSmail . '/token'; // Use your email and append '/token'
      $api_token = $zendeskapiToken; // Replace with your API token

      // Ticket data
      $data = [
        'ticket' => [
          'subject' => $subject,
          'description' => $mail_message,
          'priority' => $priority, // Options: low, normal, high, urgent
          'requester' => [
            'name' => $full_name,
            'email' => $email // Email of the requester
          ]
        ]
      ];

      // Initialize cURL
      $ch = curl_init('https://' . $subdomain . '.zendesk.com/api/v2/tickets.json');

      // Set cURL options
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
      curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Basic ' . base64_encode($email_token . ':' . $api_token)
      ]);

      // Execute cURL and get the response
      $curl_response = curl_exec($ch);



      if ($curl_response === false) {
        $response['errors']['zendeskErrorCurl'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
      } else {
        $curl_response = json_decode($curl_response);

        if (!isset($curl_response->ticket)) {
          $response['errors']['zendeskError'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
        }

        if (isset($curl_response->ticket)) {
          $response['success']['zendeskSuccess'] = $successMessage;
        }
      }
      curl_close($ch);
    }

    if ($id == 'sendSlackWebhook') {


      $text = isset($arg->text) ? $arg->text : "";
      $webhookUrl = isset($arg->webhookUrl) ? $arg->webhookUrl : "";
      $channel = isset($arg->channel) ? $arg->channel : "";
      $username = isset($arg->username) ? $arg->username : "";
      $iconEmoji = isset($arg->iconEmoji) ? $arg->iconEmoji : "";



      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";

      $webhook_url = $webhookUrl;
      $text = !empty($mail_message) ? $mail_message : $text;

      // The message payload
      $data = [
        'text' =>  $text,
        'channel' => $channel,  // Channel where the message will be sent
        'username' => $username, // Name of the bot
        'icon_emoji' => $iconEmoji  // Emoji icon for the bot
      ];

      // Initialize curl
      $ch = curl_init($webhook_url);

      // Set curl options
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));  // Send JSON payload
      curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);  // Set content type to JSON
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      // Execute cURL and get the response
      $curl_response = curl_exec($ch);



      if ($curl_response == "ok") {
        $response['success']['slackSuccess'] = $successMessage;
      } else {
        $response['errors']['slackErrorCurl'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
      }
      curl_close($ch);
    }
    if ($id == 'twilioSendMessage') {
      $combo_blocks_settings = get_option("combo_blocks_settings");
      $apiKeys = isset($combo_blocks_settings['apiKeys']) ? $combo_blocks_settings['apiKeys'] : [];

      $phone_number = isset($formFields['phone_number']) ? wp_kses_post($formFields['phone_number']) : '';

      $phoneNumber = isset($arg->phoneNumber) ? $arg->phoneNumber : "";
      $text = isset($arg->text) ? $arg->text : "";

      $twilioAuthToken = isset($apiKeys['twilio']['args']['authToken']) ? $apiKeys['twilio']['args']['authToken'] : "";
      $twilioAccountSid = isset($apiKeys['twilio']['args']['accountSid']) ? $apiKeys['twilio']['args']['accountSid'] : "";
      $twilioPhoneNumber = !empty($phoneNumber) ?  $phoneNumber : $apiKeys['twilio']['args']['phoneNumber'];





      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";


      $account_sid = $twilioAccountSid;
      $auth_token = $twilioAuthToken;

      // Twilio API URL for sending messages
      $url = 'https://api.twilio.com/2010-04-01/Accounts/' . $twilioAccountSid . '/Messages.json';
      $text = !empty($mail_message) ? $mail_message : $text;

      // The data to be sent in the POST request
      $data = [
        'Body' => $text,
        'From' => $twilioPhoneNumber,   // Your Twilio phone number
        'To' => $phone_number  // Recipient's phone number
      ];

      // Initialize curl
      $ch = curl_init($url);

      // Set curl options
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));  // URL-encode the data
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Return response instead of printing
      curl_setopt($ch, CURLOPT_USERPWD, "$account_sid:$auth_token");  // Twilio authentication

      // Execute curl and get the response

      // Execute cURL and get the response
      $curl_response = curl_exec($ch);


      if ($curl_response === false) {
        $curl_response = json_decode($curl_response);

        $response['errors']['twilioError'] = !empty($errorMessage) ? $errorMessage : $curl_response->message;
      } else {
        $curl_response = json_decode($curl_response);
        $response['success']['twilioSuccess'] = !empty($successMessage) ? $successMessage : $curl_response->message;
      }
      curl_close($ch);
    }




    if ($id == 'doAction') {
      $actionName = isset($arg->actionName) ? $arg->actionName : '';
      do_action($actionName, $request);
    }
    if ($id == 'webhookRequest') {
      $url = isset($arg->url) ? $arg->url : '';
      $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
      $method = isset($arg->method) ? $arg->method : 'POST';
      $format = isset($arg->format) ? $arg->format : '';
      $fields = isset($arg->fields) ? $arg->fields : [];
      $requestPrams =  $request->get_params();
      unset($requestPrams['onprocessargs']);
      unset($requestPrams['formFieldNames']);
      // Encode the data as JSON
      $payload = json_encode($requestPrams);
      // Prepare headers
      $headers = [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
      ];
      // Initialize curl session
      $ch = curl_init($url);
      // Set curl options
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      // Execute curl session
      $response = curl_exec($ch);
      // Check for errors
      if (curl_errno($ch)) {
        echo 'Webhook delivery failed: ' . curl_error($ch);
      } else {
        echo 'Webhook sent successfully. Response: ' . $response;
      }
      // Close curl session
      curl_close($ch);
    }
    if ($id == 'createEntry') {

      $saveTo = isset($arg->saveTo) ? $arg->saveTo : "post";
      $saveToPrams = isset($arg->saveToPrams) ? $arg->saveToPrams : [];


      $status = combo_blocks_form_wrap_process_create_entry($email_data, $saveTo, $saveToPrams);
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Create entry success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Create entry failed', 'combo-blocks');
      if ($showOnResponse) {
        if ($status) {
          $response['success']['createEntry'] = $successMessage;
        } else {
          $response['errors']['createEntry'] = $errorMessage;
        }
      }
    }
    if ($id == 'recaptchaValidation') {
      $status = '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Create entry success', 'combo-blocks');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Create entry failed', 'combo-blocks');
      if ($showOnResponse) {
        if (!empty($recaptchaResponse)) {
          $response['success']['createEntry'] = $successMessage;
        } else {
          $response['errors']['createEntry'] = $errorMessage;
        }
      }
    }
  }
  return $response;
}
function combo_blocks_form_wrap_process_create_entry($entryData, $saveTo, $saveToPrams)
{


  //return;
  //$entryData = json_encode($entryData);

  if ($saveTo == "post") {

    $postType = isset($saveToPrams->postType) ? $saveToPrams->postType : "";


    $entry_ID = wp_insert_post(
      array(
        'post_title'    => "",
        'post_content'  => "",
        'post_status'   => 'publish',
        'post_type'       => $postType,
      )
    );


    update_post_meta($entry_ID, "entry_data", $entryData);
  }

  if ($saveTo == "airtable") {

    $combo_blocks_settings = get_option("combo_blocks_settings");
    $apiKeys = isset($combo_blocks_settings['apiKeys']) ? $combo_blocks_settings['apiKeys'] : [];
    $airtableaccessToken = isset($apiKeys['airtable']['args']['accessToken']) ? $apiKeys['airtable']['args']['accessToken'] : "";


    $baseId = isset($saveToPrams->baseId) ? $saveToPrams->baseId : "";
    $tableIdOrName = isset($saveToPrams->tableIdOrName) ? $saveToPrams->tableIdOrName : "";

    if (empty($baseId) || empty($tableIdOrName) || empty($airtableaccessToken)) {
      return false;
    }



    $access_token = $airtableaccessToken;

    // Set up the API endpoint URL
    $url = "https://api.airtable.com/v0/{$baseId}/{$tableIdOrName}";

    // Set up headers with the access token
    $headers = array(
      'Authorization' => 'Bearer ' . $access_token,
      'Content-Type'  => 'application/json'
    );

    //$data = [];




    // Prepare data payload in Airtable's expected format
    $body = json_encode(array(
      'fields' => $entryData
    ));

    // Send the request to Airtable
    $response = wp_remote_post($url, array(
      'headers' => $headers,
      'body'    => $body
    ));

    // Check for errors and return response
    if (is_wp_error($response)) {
      //return 'Error: ' . $response->get_error_message();
      return false;
    } else {
      $response_body = wp_remote_retrieve_body($response);
      return true;
      //return json_decode($response_body);
    }
  }









  if ($saveTo == "ninjaTable") {

    $table_id = isset($saveToPrams->id) ? $saveToPrams->id : "";

    global $wpdb;

    // Define the table where Ninja Tables stores its data
    $table_name = $wpdb->prefix . 'ninja_table_items';

    // Prepare the data to be inserted
    $data = array(
      'table_id' => $table_id,              // The ID of the Ninja Table
      'value'    => wp_json_encode($entryData),  // JSON-encoded row data
      'created_at' => current_time('mysql'), // Current timestamp
      'updated_at' => current_time('mysql')
    );

    // Insert the row data into the Ninja Tables database table
    $inserted = $wpdb->insert($table_name, $data);


    if ($inserted) {
      return true;
    } else {
      return false;
    }
  }
  if ($saveTo == "wpCustomTable") {

    $tableName = isset($saveToPrams->tableName) ? $saveToPrams->tableName : "";

    global $wpdb;

    // Define table name
    $table_name = $wpdb->prefix . $tableName;


    $types = [];

    foreach ($entryData as $entry) {
      $types[] = "%s";
    }


    // Insert data
    $inserted = $wpdb->insert(
      $table_name,
      $entryData,
      $types
    );

    if ($inserted) {
      return true;
    } else {
      return false;
    }
  }









  return true;
}
function combo_blocks_form_wrap_process_create_wc_order($arg, $request)
{
  // $orderStatus = isset($arg->orderStatus) ? $arg->orderStatus : '';
  // $orderStatus = !empty($orderStatus) ? $orderStatus : 'pending';
  $orderStatus = 'pending';

  $orderNote = isset($arg->orderNote) ? $arg->orderNote : '';
  $paymentMethod = isset($arg->paymentMethod) ? $arg->paymentMethod : 'ComboBlockForm';
  $paymentMethodTitle = isset($arg->paymentMethodTitle) ? $arg->paymentMethodTitle : 'ComboBlockForm';
  $order = wc_create_order();
  $product_id = (int) $request->get_param("product_id");
  $first_name = $request->get_param("first_name");
  $last_name = $request->get_param("last_name");
  $company = $request->get_param("company");
  $email = $request->get_param("email");
  $phone = $request->get_param("phone");
  $address_1 = $request->get_param("address_1");
  $address_2 = $request->get_param("address_2");
  $city = $request->get_param("city");
  $state = $request->get_param("state");
  $postcode = $request->get_param("postcode");
  $country = $request->get_param("country");
  $coupon_code = $request->get_param("coupon_code");
  $user_id =  email_exists($email);
  $product = wc_get_product($product_id);
  $downloads = $product->get_downloads();
  $product->set_downloads($downloads);
  $order->add_product($product);
  $order->calculate_totals();
  $order->apply_coupon($coupon_code);
  $address = array(
    'first_name' => $first_name,
    'last_name'  => $last_name,
    'company'    => $company,
    'email'      => $email,
    'phone'      => $phone,
    'address_1'  => $address_1,
    'address_2'  => $address_2,
    'city'       => $city,
    'state'      => $state,
    'postcode'   => $postcode,
    'country'    => $country
  );
  $order->set_address($address, 'billing');
  $order->set_customer_id($user_id);
  $order->set_payment_method($paymentMethod);
  $order->set_payment_method_title($paymentMethodTitle);
  $order->add_order_note($orderNote);
  $order->update_status($orderStatus);
  $order->save();
  $order_id = $order->get_id();
  return $order_id;
}




function combo_blocks_form_wrap_process_send_email($email_data)
{
  $email_to = isset($email_data['email_to']) ? $email_data['email_to'] : '';
  $email_bcc = isset($email_data['email_bcc']) ? $email_data['email_bcc'] : '';
  $email_from = !empty($email_data['email_from']) ? $email_data['email_from'] : get_option('admin_email');
  $email_from_name = !empty($email_data['email_from_name']) ? $email_data['email_from_name'] : get_bloginfo('name');
  $subject = isset($email_data['subject']) ? $email_data['subject'] : '';
  $email_body = isset($email_data['html']) ? $email_data['html'] : '';
  $attachments = isset($email_data['attachments']) ? $email_data['attachments'] : '';
  $headers = array();
  $headers[] = "From: " . $email_from_name . " <" . $email_from . ">";
  $headers[] = "Reply-To: " . $email_from_name . " <" . $email_from . ">";
  $headers[] = "MIME-Version: 1.0";
  $headers[] = "Content-Type: text/html; charset=UTF-8";
  if (!empty($email_bcc)) {
    $headers[] = "Bcc: " . $email_bcc;
  }
  $headers = apply_filters('combo_blocks_mail_headers', $headers);
  $status = wp_mail($email_to, $subject, $email_body, $headers, $attachments);
  return $status;
}
function combo_blocks_form_wrap_input_name($inputOptions, $args)
{
  $blockId = isset($args['blockId']) ? $args['blockId'] : '';
  $inputObjMap = isset($inputOptions['objMap']) ? $inputOptions['objMap'] : "";
  $inputName = !empty($inputOptions['name']) ? $inputOptions['name'] : $blockId;
  $inputMultiple = isset($inputOptions['multiple']) ? $inputOptions['multiple'] : false;
  $inputName = ($inputMultiple) ? $inputName . '[]' : $inputName;
  if ($inputObjMap == 'postTerm') {
    $inputName =  'post_term[' . $inputName . ']';
  }
  if ($inputObjMap == 'postMeta') {
    $inputName =  'post_meta[' . $inputName . ']';
  }
  if ($inputObjMap == 'commentMeta') {
    $inputName =  'comment_meta[' . $inputName . ']';
  }
  if ($inputObjMap == 'termMeta') {
    $inputName =  'term_meta[' . $inputName . ']';
  }
  if ($inputObjMap == 'userMeta') {
    $inputName =  'user_meta[' . $inputName . ']';
  }
  return $inputName;
}
function combo_blocks_form_wrap_input_default_value($inputOptions, $args)
{



  $post_ID = isset($args['post_ID']) ? $args['post_ID'] : '';
  $blockId = isset($args['blockId']) ? $args['blockId'] : '';
  $currentUser = wp_get_current_user();
  $global_post = get_post($post_ID);
  $inputType = !empty($inputOptions['type']) ? $inputOptions['type'] : "";
  $inputName = !empty($inputOptions['name']) ? $inputOptions['name'] : $blockId;
  $inputValueSource = isset($inputOptions['valueSource']) ? $inputOptions['valueSource'] : '';

  $GETValue = isset($_GET[$inputName]) ? sanitize_text_field($_GET[$inputName]) : "";



  $inputValue = isset($inputOptions['value']) ? $inputOptions['value'] : '';

  $inputValue = !empty($GETValue) ? $GETValue : $inputValue;


  if (!empty($inputValueSource)) {
    if ($inputValueSource == 'postID') {
      $inputValue = $post_ID;
    } else if ($inputValueSource == 'postSlug') {
      $inputValue = isset($global_post->post_name) ? $global_post->post_name : "";
    } else if ($inputValueSource == 'postTitle') {
      $inputValue = isset($global_post->post_title) ? $global_post->post_title : "";
    } else if ($inputValueSource == 'postContent') {
      $inputValue = isset($global_post->post_content) ? $global_post->post_content : "";
    } else if ($inputValueSource == 'postExcerpt') {
      $inputValue = isset($global_post->post_excerpt) ? $global_post->post_excerpt : "";
    } else if ($inputValueSource == 'postDate') {
      $inputValue = isset($global_post->post_date) ? $global_post->post_date : "";
    } else if ($inputValueSource == 'postAuthorID') {
      $inputValue = isset($global_post->post_author) ? $global_post->post_author : 0;
    } else if ($inputValueSource == 'postTags') {
      $inputValue = '';
    } else if ($inputValueSource == 'postTagsIds') {
      $inputValue = '';
    } else if ($inputValueSource == 'postCategoryIds') {
      $inputValue = '';
    } else if ($inputValueSource == 'postCategorySlugs') {
      $inputValue = '';
    } else if ($inputValueSource == 'userId') {
      $inputValue = isset($currentUser->ID) ? $currentUser->ID : 0;
    } else if ($inputValueSource == 'userEmail') {
      $inputValue = isset($currentUser->user_email) ? $currentUser->user_email : '';
    } else if ($inputValueSource == 'userDisplayName') {
      $inputValue = isset($currentUser->display_name) ? $currentUser->display_name : '';
    } else if ($inputValueSource == 'userFirstName') {
      $inputValue = isset($currentUser->first_name) ? $currentUser->first_name : '';
    } else if ($inputValueSource == 'userLastName') {
      $inputValue = isset($currentUser->last_name) ? $currentUser->last_name : '';
    } else if ($inputValueSource == 'userDescription') {
      $inputValue = isset($currentUser->description) ? $currentUser->description : '';
    } else if ($inputValueSource == 'userUrl') {
      $inputValue = isset($currentUser->user_url) ? $currentUser->user_url : '';
    } else if ($inputValueSource == 'userLogin') {
      $inputValue = isset($currentUser->user_login) ? $currentUser->user_login : '';
    } else if ($inputValueSource == 'userNicename') {
      $inputValue = isset($currentUser->user_nicename) ? $currentUser->user_nicename : '';
    } else if ($inputValueSource == 'GET') {
      $inputValue = (isset($_GET[$inputName]) && !empty($_GET[$inputName])) ? sanitize_text_field($_GET[$inputName]) : $inputValue;
    } else if ($inputValueSource == 'postMeta') {
      $inputValue = get_post_meta($post_ID, $inputName, true);
    } else if ($inputValueSource == 'termMeta') {
      $currentUserId = isset($currentUser->ID) ? $currentUser->ID : 0;
      $inputValue = get_term_meta($currentUserId, $inputName, true);
      $inputValue = isset($_GET[$inputName]) ? sanitize_text_field($_GET[$inputName]) : "";
    } else if ($inputValueSource == 'userMeta') {
      $currentUserId = isset($currentUser->ID) ? $currentUser->ID : 0;
      $inputValue = get_user_meta($currentUserId, $inputName, true);
    } else {
      $inputValue = $inputValue;
    }
  }
  return $inputValue;
}
