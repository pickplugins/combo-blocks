<?php
if (!defined('ABSPATH')) exit; // if direct access 

class ComboBlocksAdminNotices
{

  public function __construct()
  {
    //add_action('admin_notices', array($this, 'license_expired'));

    //add_action('admin_notices', array($this, 'layout_depricated'));

  }
}

new ComboBlocksAdminNotices();
