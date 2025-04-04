<?php
if (!defined('ABSPATH')) exit;  // if direct access
wp_enqueue_style('combo-blocks-output', combo_blocks_url . 'dist/output.css', [], time(), 'all');
wp_enqueue_style('font-awesome-5');
$admin_email = get_option('admin_email');
$combo_blocks_license = get_option('combo_blocks_license');
$license_status = isset($combo_blocks_license['license_status']) ? $combo_blocks_license['license_status'] : '';
?>
<div class="wrap pg-overview font-lato text-color bg-[linear-gradient(101deg,_rgba(238,_255,_251,_0.83)_0%,_rgba(235,_235,_235,_0.44)_50%,_rgb(255,_253,_238)_100%)] w-full
   ">
  <div class="text-center w-full">
    <h2 class=" text-color font-lato lg:!text-5xl md:!text-4xl !text-3xl !font-bold tracking-[2.5px] text-center w-full max-w-[900px] !mx-auto !py-6 md:!py-10 lg:!py-12  ">
      50+ Blocks Available to Create Next Level Landing Pages</h2>
  </div>
  <div class=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 w-full max-w-[1200px] mx-auto ">
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group " href="https://comboblocks.com/blocks/post-grid/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-combo-blocks-150x150.png" alt="Post Grid">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Post Grid</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/content-slider/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-content-slider-1-150x150.png" alt="Content Slider">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Content Slider</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/form-maker/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-form-wrap.png" alt="Form Maker">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Form Maker</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/popup-maker/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-pop-up.png" alt="Popup Maker">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Popup Maker</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/breadcrumb/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-breadcrumb-1.png" alt="Breadcrumb">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Breadcrumb</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/masonry-grid/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-mesonry-wrap.png" alt="Masonry Grid">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Masonry Grid</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/progressbar/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-progressbar.png" alt="Progress Bar">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Progress Bar</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/accordion/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/11/Accordion-150x106.png" alt="Accordion">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Accordion</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/image-gallery/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/11/Image-Gallery-150x138.png" alt="Image Gallery">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Image Gallery</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/woo-product-price/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-product-price-150x138.png" alt="Product Price">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Product Price</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/woo-product-info/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-product-info-150x138.png" alt="Product Info">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Product Info</div>
    </a>
    <a class="flex flex-col gap-1 p-5 items-center  bg-white shadow-[0px_0px_4px_1px_#8db3ff66] rounded-md no-underline group" href="https://comboblocks.com/blocks/woo-star-rate/?utm_source=overview&utm_medium=heroBlockList&utm_id=comboBlocksUser" target="_blank">
      <span class=" w-12 mx-auto ">
        <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-icon-product-rating-150x138.png" alt="Product Rate">
      </span>
      <div class=" text-xl md:text-2xl lg:text-3xl font-bold tracking-[1.2px] inline-block group-hover:text-[#fe8e52] transition-all duration-300 ease ">
        Product Rate</div>
    </a>
  </div>
  <div class="pt-7 md:pt-14 lg:pt-20 pb-10 w-full text-center">
    <a class=" !text-white text-2xl font-lato font-bold tracking-[1.2px] px-8 py-[10px] rounded-md inline-block bg-[linear-gradient(90deg,_rgb(252,_127,_100)_0%,_rgb(255,_157,_66)_100%)] no-underline " href="https://comboblocks.com/blocks/?utm_source=overview&utm_medium=SeeAllBlocks&utm_id=comboBlocksUser"><span class="!text-white">See All Blocks</span></a>
  </div>
  <div class="bg-[#eef8ffd4] py-8 md:py-14 lg:py-20">
    <div class="w-full text-center">
      <h2 class="text-color my-[10px] text-3xl md:text-4xl lg:text-5xl font-lato font-black tracking-[2.5px] ">Ready
        Design Library</h2>
      <p class="text-color font-lato text-lg md:text-xl max-w-[600px] mx-auto">Design library will save your time and
        increase
        productivity up to 200% and deliver quick result.</p>
    </div>
    <div class="mt-8 md:mt-14 lg:mt-20">
      <div class="flex flex-col gap-12 ">
        <div class="flex items-center flex-col-reverse md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden ">
          <div class="flex-1 pl-5 flex flex-col gap-5 pb-7 ">
            <h4 class=" !my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px] ">Post Layouts
              Library</h4>
            <p class="text-lg md:text-xl  ">Our post layouts library is now the master of creating any type of archive
              pages and
              post grid.</p>
            <a href="https://comboblocks.com/server/post-layouts/?utm_source=overview&utm_medium=library&utm_id=comboBlocksUser" class="text-white text-lg font-lato font-bold px-5 py-3 bg-[linear-gradient(90deg,_rgb(118,_137,_248)_0%,_rgb(22,_12,_133)_100%)] inline-block tracking-[1.2px] rounded-md  ">
              <i class="fas fa-external-link-alt text-white"></i> <span class="ml-2 text-white">See Post
                Layouts</span></a>
          </div>
          <div class="w-full md:w-[60%] p-5 bg-white ">
            <img src="https://comboblocks.com/wp-content/uploads/2023/11/post-layouts.png" alt="Post Layouts Library" srcset="">
          </div>
        </div>
        <div class="flex items-center flex-col md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden  ">
          <div class="w-full md:w-[60%] p-5 bg-white ">
            <img src="https://comboblocks.com/wp-content/uploads/2023/12/css-library.png" alt="CSS Library" srcset="">
          </div>
          <div class="flex-1 pr-5 flex flex-col gap-5 pl-5 pb-7 md:pl-0 ">
            <h4 class=" !my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px] ">CSS Library</h4>
            <p class="text-lg md:text-xl  ">We have created a vast library of CSS that can be applied to any element
              with just
              one click using our
              blocks.</p>
            <a href="https://comboblocks.com/server/css-library/?utm_source=overview&utm_medium=library&utm_id=comboBlocksUser" class="text-white text-lg font-lato font-bold px-5 py-3 bg-[linear-gradient(90deg,_rgb(118,_137,_248)_0%,_rgb(22,_12,_133)_100%)] inline-block tracking-[1.2px] rounded-md  "><i class="fas fa-external-link-alt text-white"></i> <span class="ml-2 text-white">See CSS
                Layouts</span></a>
          </div>
        </div>
        <div class="flex items-center flex-col-reverse md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden  ">
          <div class="flex-1 pl-5 flex flex-col gap-5 pb-7 ">
            <h4 class=" !my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px]  ">Page Sections
            </h4>
            <p class="text-lg md:text-xl  ">Page sections can help you build a landing page without needing PSD or Figma
              files.
              Simply select the
              sections you want
              to use.</p>
            <a href="https://comboblocks.com/server/sections-templates/?utm_source=overview&utm_medium=library&utm_id=comboBlocksUser" class="text-white text-lg font-lato font-bold px-5 py-3 bg-[linear-gradient(90deg,_rgb(118,_137,_248)_0%,_rgb(22,_12,_133)_100%)] inline-block tracking-[1.2px] rounded-md  "><i class="fas fa-external-link-alt text-white"></i> <span class="ml-2 text-white">See Page
                Sections</span></a>
          </div>
          <div class="w-full md:w-[60%] p-5 bg-white ">
            <img src="https://comboblocks.com/wp-content/uploads/2023/11/page-sections.png" alt="Page Sections Library" srcset="">
          </div>
        </div>
        <div class="flex items-center flex-col md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden  ">
          <div class="w-full md:w-[60%] p-5 bg-white ">
            <img src="https://comboblocks.com/wp-content/uploads/2023/12/full-page-library.png" alt="Full page Library" srcset="">
          </div>
          <div class="flex-1 pr-5 flex flex-col gap-5 pl-5 pb-7 md:pl-0 ">
            <h4 class="!my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px]">Full Page Library
            </h4>
            <p class="text-lg md:text-xl ">Our full-page library is an all-in-one solution for creating customized
              landing
              pages, pricing pages,
              about us pages,
              and more.</p>
            <a href="https://comboblocks.com/server/full-page-templates/?utm_source=overview&utm_medium=library&utm_id=comboBlocksUser" class="text-white text-lg font-lato font-bold px-5 py-3 bg-[linear-gradient(90deg,_rgb(118,_137,_248)_0%,_rgb(22,_12,_133)_100%)] inline-block tracking-[1.2px] rounded-md  "><i class="fas fa-external-link-alt text-white"></i> <span class="ml-2 text-white">See Full Pages</span></a>
          </div>
        </div>
        <div class="flex items-center flex-col-reverse md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden ">
          <div class="flex-1 pl-5 flex flex-col gap-5 pb-7">
            <h4 class="!my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px]">Block Variations
            </h4>
            <p class="text-lg md:text-xl  ">We offer a wide range of pre-designed blocks for faster production. Simply
              import and
              customize as
              needed.</p>
            <a href="https://comboblocks.com/server/block-variations/?utm_source=overview&utm_medium=library&utm_id=comboBlocksUser" class="text-white text-lg font-lato font-bold px-5 py-3 bg-[linear-gradient(90deg,_rgb(118,_137,_248)_0%,_rgb(22,_12,_133)_100%)] inline-block tracking-[1.2px] rounded-md  "><i class="fas fa-external-link-alt text-white"></i> <span class="ml-2 text-white">See Full Pages</span></a>
          </div>
          <div class="w-full md:w-[60%] p-5 bg-white ">
            <img src="https://comboblocks.com/wp-content/uploads/2023/12/block-variations-library.png" alt="Full Pages Library" srcset="">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pt-6 md:pt-10 lg:pt-16">
    <div class="w-full text-center">
      <h2 class="text-color !my-[10px] text-3xl md:text-4xl lg:text-5xl font-lato font-black tracking-[2.5px] ">Style
        Component</h2>
      <p class="text-color font-lato text-lg md:text-xl max-w-[600px] mx-auto">The most powerful feature for styling
        with
        responsive support, advanced pseudo selectors, and almost all the CSS
        properties supported by a browser.</p>
    </div>
    <div class="grid md:grid-cols-2 max-w-[1200px] mx-auto gap-4 md:gap-6 lg:gap-12  mt-12">
      <div class="bg-[#51557E] rounded-lg overflow-hidden">
        <div class=" flex gap-2 h-8 px-3 items-center  ">
          <span class="w-[12px] h-[12px] bg-[#e13d3d] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#f2840e] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#43c426] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span>
        </div>
        <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-pseudo-selector.png" alt="Pseudo Selectors" srcset="">
        <h5 class="!my-0 pt-3 text-xl text-center mt-4 font-bold text-white ">Pseudo Selectors</h5>
        <p class="text-white text-base text-center p-3 pb-4 ">Pseudo CSS selectors are special keywords to target
          specific states of elements beyond their basic HTML tag or class.</p>
      </div>
      <div class="bg-[#51557E] rounded-lg overflow-hidden">
        <div class=" flex gap-2 h-8 px-3 items-center  ">
          <span class="w-[12px] h-[12px] bg-[#e13d3d] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#f2840e] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#43c426] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span>
        </div>
        <!-- <a href="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-css-properties-150x150.png"> -->
        <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-css-properties.png" alt="CSS Properties" srcset="">
        <h5 class="!my-0 pt-3 text-xl text-center mt-4 font-bold text-white ">CSS Properties</h5>
        <p class="text-white text-base text-center p-3 pb-4 ">No code experience. Search, click, and fine-tune any
          property to achieve your unique style.</p>
      </div>
      <div class="bg-[#51557E] rounded-lg overflow-hidden">
        <div class=" flex gap-2 h-8 px-3 items-center  ">
          <span class="w-[12px] h-[12px] bg-[#e13d3d] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#f2840e] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#43c426] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span>
        </div>
        <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-responsive-picker.png" alt="Responsiveness" srcset="">
        <h5 class="!my-0 pt-3 text-xl text-center mt-4 font-bold text-white ">Responsiveness</h5>
        <p class="text-white text-base text-center p-3 pb-4 ">Apply device specific styles with ease, achieving
          pixel-perfect responsiveness that adapt to any screen size.</p>
      </div>
      <div class="bg-[#51557E] rounded-lg overflow-hidden">
        <div class=" flex gap-2 h-8 px-3 items-center  ">
          <span class="w-[12px] h-[12px] bg-[#e13d3d] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#f2840e] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#43c426] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span>
        </div>
        <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-copy-paste.png" alt="Copy Paste" srcset="">
        <h5 class="!my-0 pt-3 text-xl text-center mt-4 font-bold text-white ">Copy Paste</h5>
        <p class="text-white text-base text-center p-3 pb-4 ">Save time by copying and pasting styles, or inject your
          own raw CSS code directly into our powerful style component.</p>
      </div>
    </div>
  </div>
  <div class=" pt-8 md:pt-14 lg:pt-20">
    <div class="w-full text-center">
      <h2 class="text-color my-[10px] text-3xl md:text-4xl lg:text-5xl font-lato font-black tracking-[2.5px] ">Fonts
      </h2>
      <!-- <p class="text-color font-lato text-xl max-w-[600px] mx-auto">The most powerful feature for styling with responsive support, advanced pseudo selectors, and almost all the CSS
      properties supported by a browser.</p> -->
    </div>
    <div class="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-12 mx-auto max-w-[1100px] mt-12">
      <div class="rounded-3xl overflow-hidden bg-[#ffebd8]">
        <div class="p-5 bg-white lg:h-[400px] overflow-hidden "><img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-google-fonts.png" alt="" srcset="">
        </div>
        <div class=" px-6 pt-4 pb-7 text-center flex flex-col gap-5 ">
          <h5 class="font-lato text-color !my-0 text-2xl md:text-3xl lg:text-4xl font-bold tracking-[2.5px] ">Google
            Fonts</h5>
          <p class="text-lg md:text-xl ">We have incorporated almost all of the popular fonts offered by Google. You
            don’t need
            to add a CDN, just
            search for the font you want and click to add it.</p>
        </div>
      </div>
      <div class="rounded-3xl overflow-hidden bg-[#ffebd8]">
        <div class="p-5 bg-white lg:h-[400px] overflow-hidden "><img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-custom-fonts.png" alt="" srcset="">
        </div>
        <div class=" px-6 pt-4 pb-7 text-center flex flex-col gap-5 ">
          <h5 class="font-lato text-color !my-0 text-2xl md:text-3xl lg:text-4xl font-bold tracking-[2.5px] ">Custom
            Fonts</h5>
          <p class="text-lg md:text-xl ">Sometimes you may want to use a custom font. For this, we have added the Font
            URL’s
            option. You can host
            your custom
            font and use the URL under Font Family CSS.</p>
        </div>
      </div>
    </div>
  </div>
  <div class=" py-8 md:py-14 lg:py-20">
    <div class="w-full text-center">
      <h2 class="text-color !my-[10px] text-3xl md:text-4xl lg:text-5xl font-lato font-black tracking-[2.5px] ">Custom
        CSS</h2>
      <p class="text-color font-lato text-lg md:text-xl max-w-[600px] mx-auto">Effortlessly manage your styles with
        “Combo
        Blocks”! Global styles for consistency, page styles for unique touches, and
        block styles for ultimate control. All without writing a single line of CSS code.</p>
    </div>
    <div class="grid md:grid-cols-3 max-w-[1200px] mx-auto gap-4 md:gap-5  mt-12">
      <div class="bg-[#51557E] rounded-lg overflow-hidden">
        <div class=" flex gap-2 h-8 px-3 items-center  ">
          <span class="w-[12px] h-[12px] bg-[#e13d3d] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#f2840e] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#43c426] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span>
        </div>
        <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-global-styles.png" alt="Global Styles" srcset="">
        <h5 class="!my-0 pt-3 text-xl text-center mt-4 font-bold text-white ">Global Styles</h5>
        <p class="text-white text-base text-center p-3 pb-4 ">For example you might want to set a universal look for
          all links with our intuitive global style option.</p>
      </div>
      <div class="bg-[#51557E] rounded-lg overflow-hidden">
        <div class=" flex gap-2 h-8 px-3 items-center  ">
          <span class="w-[12px] h-[12px] bg-[#e13d3d] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#f2840e] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#43c426] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span>
        </div>
        <!-- <a href="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-css-properties-150x150.png"> -->
        <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-page-styles.png" alt="Page Styles" srcset="">
        <h5 class="!my-0 pt-3 text-xl text-center mt-4 font-bold text-white ">Page Styles</h5>
        <p class="text-white text-base text-center p-3 pb-4 ">Beyond global styles? Page Styles offers unique design
          control for each page, all without code.</p>
      </div>
      <div class="bg-[#51557E] rounded-lg overflow-hidden">
        <div class=" flex gap-2 h-8 px-3 items-center  ">
          <span class="w-[12px] h-[12px] bg-[#e13d3d] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#f2840e] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span><span class="w-[12px] h-[12px] bg-[#43c426] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] "></span>
        </div>
        <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-block-styles.png" alt="Block Styles" srcset="">
        <h5 class="!my-0 pt-3 text-xl text-center mt-4 font-bold text-white ">Block Styles</h5>
        <p class="text-white text-base text-center p-3 pb-4 ">Block Style unlocks unique CSS for each Gutenberg block,
          fine-tuning every detail for pixel-perfect content.</p>
      </div>
    </div>
  </div>
  <div class="bg-[#eef8ffd4] pb-20">
    <div class="">
      <div class="flex flex-col gap-12 ">
        <div class="flex items-center flex-col-reverse md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden ">
          <div class="flex-1 pl-5 flex flex-col gap-5 pb-7">
            <h4 class=" !my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px] ">Custom Colors</h4>
            <p class="text-lg md:text-xl">Simplify your design workflow by setting a pre-defined color palette in our
              plugin
              settings. This saves
              you time and
              ensures brand consistency without the need to pick colors every time.</p>
          </div>
          <div class="w-full md:w-[60%] p-5 bg-white ">
            <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-custom-colors.png" alt="Custom Colors" srcset="">
          </div>
        </div>
        <div class="flex items-center flex-col md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden  ">
          <div class="w-full md:w-[60%] p-5 bg-white ">
            <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-dynamic-calss.png" alt="Dynamic Class" srcset="">
          </div>
          <div class="flex-1 pr-5 flex flex-col gap-5 pl-5 pb-7 md:pl-0 ">
            <h4 class="!my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px]">Dynamic Class</h4>
            <p class="text-lg md:text-xl">Set dynamic class names that adapt to changing data (like year/month). CSS
              automatically adjusts, saving
              you time and
              ensuring dynamic design elements.</p>
          </div>
        </div>
        <div class="flex items-center flex-col-reverse md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden">
          <div class="flex-1 pl-5 flex flex-col gap-5 pb-7">
            <h4 class=" !my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px]">Terms Query Builder
            </h4>
            <p class="text-lg md:text-xl">Search across different terms (e.g., posts, pages, products) and refine your
              results
              by
              filtering based
              on categories,
              tags, or custom taxonomies.</p>
          </div>
          <div class="w-full md:w-[60%] p-5 bg-white">
            <img src="https://comboblocks.com/wp-content/uploads/2024/04/terms-query-args.png" alt="Terms Query Builder" srcset="">
          </div>
        </div>
        <div class="flex items-center flex-col md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden">
          <div class="w-full md:w-[60%] p-5 bg-white">
            <img src="https://comboblocks.com/wp-content/uploads/2024/04/post-query-block-query-args.png" alt="Post Query Builder" srcset="">
          </div>
          <div class="flex-1 pr-5 flex flex-col gap-5 pl-5 pb-7 md:pl-0 ">
            <h4 class="!my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px]">Post Query Builder
            </h4>
            <p class="text-lg md:text-xl">Search across different post types (e.g., posts, pages, products) and refine
              your
              results by filtering
              based on
              categories, tags, or custom taxonomies.</p>
          </div>
        </div>
        <div class="flex items-center flex-col-reverse md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden">
          <div class="flex-1 pl-5 flex flex-col gap-5 pb-7">
            <h4 class="!my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px]">Third Party
              Integration</h4>
            <p class="text-lg md:text-xl ">We have added some well-known WordPress plugins such as WooCommerce and ACF
              to
              our
              blocks to enhance
              their capabilities.
              This allows you to create more intricate and dynamic layouts. We only choose plugins that are
              well-maintained and
              compatible with your WordPress version and other plugins, as there is a vast selection of third-party
              plugins available.</p>
          </div>
          <div class="w-full md:w-[60%] p-5 bg-white">
            <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-dynamic-calss.png" alt="Third Party Integration" srcset="">
          </div>
        </div>
        <!-- <div class="flex items-center flex-col md:flex-row bg-[#f5ffd9f0]  max-w-[1100px] mx-auto gap-5 rounded-3xl overflow-hidden">
          <div class="w-full md:w-[60%] p-5 bg-white">
            <img src="https://comboblocks.com/wp-content/uploads/2024/02/all-featurs-dynamic-calss.png" alt="CSS Animations" srcset="">
          </div>
          <div class="flex-1 pr-5 flex flex-col gap-5 pl-5 pb-7 md:pl-0">
            <h4 class=" !my-0 text-2xl md:text-3xl lg:text-4xl font-lato font-bold tracking-[2.5px] ">CSS Animations
            </h4>
            <p class="text-lg md:text-xl  ">You can create personalized keyframe animations with custom names and
              styles, which
              can
              later be used with any Gutenberg
              blocks.</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center  w-full bg-[#c4dcc2] text-white">
    <div class="px-5 py-24">
      <div class="w-full text-center mb-8">
        <h2 class="text-color !my-[10px] text-3xl md:text-4xl lg:text-5xl font-lato font-black tracking-[2.5px] ">3rd
          Party Plugins Support</h2>
        <p class="text-color font-lato text-lg md:text-xl max-w-[600px] mx-auto">We have added some well-known WordPress
          plugins such as WooCommerce and ACF to our blocks to enhance their capabilities. This allows you to create
          more
          intricate and dynamic layouts.</p>
      </div>
      <div class="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 text-black">
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md grid place-items-center ">
          WooCommerce</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          Advanced Custom Fields(ACF)</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          Easy Digital Download(EDD)</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          CMB2</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          Custom Field Suite</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          Rank Math</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          Yoast SEO</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          AIO SEO</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          SEOPress</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          WP Meta SEO</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          The SEO Framework</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          SEO SIMPLE PACK</h4>
        <h4 class="!m-0 text-[#393b41] text-2xl font-lato font-bold tracking-[1.2px] text-center bg-white shadow-[0_0_4px_1px_#8db3ff66] p-5 rounded-md  ">
          FluentCRM</h4>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center p-6 w-full bg-[#4c5eea] text-white">
    <div class="px-5 py-24 bg-[url(https://comboblocks.com/wp-content/uploads/2023/12/get-started-bg.png)] max-w-[800px] bg-cover rounded-none  ">
      <div class=" text-center w-full  flex flex-col justify-center items-center gap-8 py-6 ">
        <h2 class="!my-0 text-2xl md:text-3xl lg:text-[40px] !leading-[50px] font-lato font-bold !text-white tracking-[2.5px]">
          Get
          Started
          Building
          Fantastic Blogs, News Magazine Websites, and More!</h2>
        <p class="text-lg md:text-xl block font-lato">Using The Combo Blocks Gutenberg Plugin, You May Create The
          Websites Of Your
          Dreams.</p>
        <a class="pg-bg-color px-10 py-3 text-lg md:text-xl inline-block rounded-md font-lato no-underline" target="_blank" href="https://comboblocks.com/pricing/?utm_source=overview&utm_medium=buttonGetIt&utm_id=comboBlocksUser">Get It Now</a>
      </div>
    </div>
  </div>
</div>