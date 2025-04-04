<?php
if (!defined('ABSPATH')) exit;  // if direct access

add_shortcode('combo_blocks_data_update', 'combo_blocks_data_update');
//add_action('combo_blocks_data_update', 'combo_blocks_data_update');

function combo_blocks_data_update()
{

    $post_grid_block_editor = get_option("post_grid_block_editor");

    update_option('combo_blocks_settings', $post_grid_block_editor);

    global $wpdb;

    error_log('combo_blocks_data_update');

    $BlocksArr = ['accordion-nested', 'accordion-nested-item', 'archive-description', 'archive-title', 'back-to-top', 'breadcrumb', 'business-hours', 'content-slider', 'content-slider-item', 'date-countdown', 'flex-wrap', 'flex-wrap-item', 'flip-box', 'flip-box-back', 'flip-box-front', 'form-field-checkbox', 'form-field-file', 'form-field-file-multi', 'form-field-hcaptcha', 'form-field-input', 'form-field-radio', 'form-field-recaptcha', 'form-field-select', 'form-field-simple-math', 'form-field-submit', 'form-field-textarea', 'form-wrap', 'grid-wrap', 'grid-wrap-item', 'icon', 'image', 'image-accordion', 'image-gallery', 'image-gallery-item', 'images', 'info-box', 'info-box-item', 'layer', 'layers', 'list', 'list-nested', 'list-nested-item', 'masonry-wrap', 'masonry-wrap-item', 'number-counter', 'popup', 'post-author', 'post-author-fields', 'post-categories', 'post-comment-count', 'post-date', 'post-excerpt', 'post-featured-image', 'post-grid', 'filterable-grid', '', 'post-meta', 'post-query', 'post-query-pagination', 'post-tags', 'post-taxonomies', 'post-title', 'progress-bar', 'read-more', 'shortcode', 'social-share', 'star-rate', 'table', 'table-td', 'table-tr', 'tabs-nested', 'tabs-nested-item', 'team-members', 'team-members-field', 'team-showcase', 'terms-list', 'terms-query', 'terms-query-item', 'testimonials', 'testimonial-field', 'text', 'user-fields', 'user-query', 'user-query-pagination', 'woo-price', 'woo-add-to-cart', 'woo-sale', 'woo-sku', 'woo-star-rate', 'woo-stock', 'woo-stock-quantity', 'wordpress-org', 'wordpress-org-item', 'blockquote', 'chart', 'content-ticker', 'lottie', 'menu-wrap', 'menu-wrap-item', 'post-comments', 'post-reactions', 'pricing-table', 'related-posts', 'google-map', 'timeline', 'whatsapp', 'woo-quick-view'];

    if (is_multisite()) {
        $sites = get_sites(['fields' => 'ids']);

        foreach ($sites as $blog_id) {
            $posts_table = $wpdb->get_blog_prefix($blog_id) . 'posts';

            $query = "UPDATE {$posts_table} 
              SET post_content = REPLACE(post_content, %s, %s) 
              WHERE post_content LIKE %s";

            // Execute the query

            foreach ($BlocksArr as $Block) {
                error_log("replace_post_grid_layers $Block");

                $updated = $wpdb->query($wpdb->prepare($query, "wp:post-grid/$Block", "wp:combo-blocks/$Block", "%wp:post-grid/$Block%"));

                if ($updated !== false) {
                    echo "<p>Successfully updated {$updated} rows for wp:post-grid/$Block</p>";
                } else {
                    echo "<p>No updates were made or an error occurred.</p>";
                }
            }
        }
    } else {
        //Prepare the query to update post_content in wp_posts table
        $query = "UPDATE {$wpdb->posts} 
              SET post_content = REPLACE(post_content, %s, %s) 
              WHERE post_content LIKE %s";

        // Execute the query

        foreach ($BlocksArr as $Block) {
            error_log("replace_post_grid_layers $Block");

            $updated = $wpdb->query($wpdb->prepare($query, "wp:post-grid/$Block", "wp:combo-blocks/$Block", "%wp:post-grid/$Block%"));

            if ($updated !== false) {
                echo "<p>Successfully updated {$updated} rows for wp:post-grid/$Block</p>";
            } else {
                echo "<p>No updates were made or an error occurred.</p>";
            }
        }
    }



    // Output result

}

// Run the function once (Remove this after execution)
