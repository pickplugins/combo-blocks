<?php
defined('ABSPATH') || exit;

class Elementor_Combo_Blocks_Saved_Template extends \Elementor\Widget_Base
{

    public function get_name()
    {
        return 'combo_blocks_saved_template';
    }

    public function get_title()
    {
        return esc_html__('ComboBlocks Template', 'elementor-addon');
    }

    public function get_icon()
    {
        return 'eicon-code';
    }

    public function get_categories()
    {
        return ['basic'];
    }

    public function get_keywords()
    {
        return ['combo blocks', 'block'];
    }

    protected function register_controls()
    {

        // Content Tab Start

        $this->start_controls_section(
            'section_title',
            [
                'label' => esc_html__('ComboBlocks Templates', 'elementor-addon'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $class_combo_blocks_functions = new class_combo_blocks_functions();

        $posts = $class_combo_blocks_functions->get_posts_list(['post_type' => 'combo_blocks_template']);


        $this->add_control(
            'saved_template',
            [
                'label' => __('Saved Template', 'combo-blocks'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'options' => $posts,
            ]
        );




        $this->end_controls_section();

        // Content Tab End


        // Style Tab Start

        $this->start_controls_section(
            'section_title_style',
            [
                'label' => esc_html__('Title', 'elementor-addon'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        // $this->add_control(
        //     'title_color',
        //     [
        //         'label' => esc_html__('Text Color', 'elementor-addon'),
        //         'type' => \Elementor\Controls_Manager::COLOR,
        //         'selectors' => [
        //             '{{WRAPPER}} .hello-world' => 'color: {{VALUE}};',
        //         ],
        //     ]
        // );

        $this->end_controls_section();

        // Style Tab End

    }


    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $body_class = get_body_class();
        $id = $settings['saved_template'];


        if ($id) {
            echo '<div class="saved-template" data-postid="' . esc_attr($id) . '">';
            $args = array('p' => $id, 'post_type' => 'combo_blocks_template');
            $the_query = new \WP_Query($args);
            if ($the_query->have_posts()) {
                while ($the_query->have_posts()) {
                    $the_query->the_post();
                    the_content();
                }
                wp_reset_postdata();
            }
            echo '</div>';
        } else {
            if (isset($_GET['action']) && $_GET['action'] == 'elementor') { // phpcs:ignore WordPress.Security.NonceVerification.Missing,WordPress.Security.NonceVerification.Recommended	
                echo '<p style="text-align:center;">' . sprintf(esc_html__('Pick a Template from your saved ones. Or create a template from: %s.', 'combo-blocks') . ' ', '<strong><i>' . esc_html('Combo Blocks > All Saved Templates', 'combo-blocks') . '</i></strong>') . '</p>';
            }
        }
    }



    protected function content_template()
    {
?>
        <# if ( ''===settings.saved_template ) { return; } #>
            <div class="saved-template">
                Combo Blocks Saved Template: Live Preview Not Available.
            </div>
    <?php
    }
}
