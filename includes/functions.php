<?php
if (!defined('ABSPATH')) exit;  // if direct access



function combo_blocks_recursive_sanitize_arr($array)
{
    foreach ($array as $key => &$value) {
        if (is_array($value)) {
            $value = combo_blocks_recursive_sanitize_arr($value);
        } else {
            if ($key == 'url') {
                $value = wp_kses_post($value);
            } else {
                $value = wp_kses_post($value);
            }
        }
    }
    return $array;
}


function combo_blocks_term_slug_list($post_id)
{
    $term_slug_list = '';
    $post_taxonomies = get_post_taxonomies($post_id);
    foreach ($post_taxonomies as $taxonomy) {
        $term_list[] = wp_get_post_terms($post_id, $taxonomy, array("fields" => "all"));
    }
    if (!empty($term_list)) {
        foreach ($term_list as $term_key => $term) {
            foreach ($term as $term_id => $term) {
                $term_slug_list .= $term->slug . ' ';
            }
        }
    }
    return $term_slug_list;
}
