const { Component } = wp.element;
import { __ } from "@wordpress/i18n";

import { Icon, styles, settings, link, linkOff, close, language } from "@wordpress/icons";
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { __experimentalInputControl as InputControl, Spinner, PanelBody, PanelRow, ColorPalette, RangeControl, TextareaControl, SelectControl, ToggleControl } from '@wordpress/components';
import { applyFilters } from "@wordpress/hooks";

import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  RichText,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import OpenAI from 'openai';

//
function Html(props) {
  if (!props.warn) {
    return null;
  }

  var promptsAgs = props?.promptsAgs;
  var action = promptsAgs?.action ?? "write";
  var aiModel = promptsAgs?.aiModel ?? "gpt-4-turbo";
  var objective = promptsAgs?.objective ?? "";

  let isProFeature = applyFilters("isProFeature", true);

  const [isLoading, setisLoading] = useState(false);
  const [promptPrams, setpromptPrams] = useState({ aiModel: aiModel, promt: "", action: action, language: "", objectFoundedYear: "", objective: objective, objectName: "", keywords: "", services: "", lengthType: "", length: 20, imageCount: 1, imageSize: '512x512' });
  const [openAiPrams, setopenAiPrams] = useState({ promt: "", apikey: '', autoUpdate: props.autoUpdate, model: '', role: "", reponse: null });

  var apikey = window?.comboBlocksEditor?.apiKeys?.openAI?.args?.apikey




  async function getGTP() {

    if (openAiPrams.promt.length == 0) {

      alert("Please write some instructions.");
      return;
    }
    if (apikey.length == 0) {

      alert("Please enter API key first.");
      return;
    }



    if (openAiPrams.promt.length > 0) {

      const openai = new OpenAI({
        apiKey: apikey,
        dangerouslyAllowBrowser: true,
      });


      const formattedPrompt = props.formattedPrompt;


      setisLoading(true);

      if (promptPrams.action == 'generateImage') {
        const imageResponse = await openai.images.generate({
          prompt: `${formattedPrompt} ${openAiPrams.promt}`,
          n: promptPrams?.imageCount,
          size: promptPrams.imageSize,
        });

        const imageUrl = imageResponse.data[0].url; // Extract the image URL
        setopenAiPrams({ ...openAiPrams, reponse: imageUrl })

      } else {
        const chatCompletion = await openai.chat.completions.create({
          model: promptPrams?.aiModel ?? "gpt-4-turbo",
          messages: [{ "role": "user", "content": `${formattedPrompt} ${openAiPrams.promt}` }],
        });



        var choices = chatCompletion.choices
        var message = choices[0].message.content;
        setopenAiPrams({ ...openAiPrams, reponse: message })

      }




      //message = message.slice(1, -1)

      props.onResponseLoaded(message, openAiPrams.autoUpdate);
      setTimeout(() => {
        setisLoading(false);
      }, 1000)
    }

  }

  useEffect(() => {
    var model = window?.comboBlocksEditor?.apiKeys?.openAI?.args?.model
    var apikey = window?.comboBlocksEditor?.apiKeys?.openAI?.args?.apikey


    setopenAiPrams({ ...openAiPrams, apikey: apikey })

  }, [window.comboBlocksEditor]);


  useEffect(() => {


    var promtStr = ""

    if (promptPrams?.action == "write") {

      //promtStr += promptPrams.promt
      //if (promptPrams?.objectName.length > 0) {
      promtStr = promptPrams.promt.replaceAll('{objectName}', "<strong>" + promptPrams?.objectName + "</strong>")


      //}
      promtStr = promtStr.replaceAll('{current_text}', "<strong>" + promtStr + "</strong>")

    }
    if (promptPrams?.action == "rewrite" || promptPrams?.action == "extend") {
      if (promptPrams?.promt.length > 0) {

        promtStr += promptPrams.promt.replaceAll('{current_text}', "<strong>" + props.value + "</strong>")
      }
    }

    if (promptPrams?.action == "generateImage") {
      if (promptPrams?.promt.length > 0) {
        //promtStr += promptPrams.promt
        promtStr = promptPrams.promt.replaceAll('{objectName}', "<strong>" + promptPrams?.objectName + "</strong>")
        promtStr = promtStr.replaceAll('{current_text}', "<strong>" + promtStr + "</strong>")
      }
    }



    if (promptPrams?.audience?.length > 0) {
      promtStr += "\n<strong>Target Audience:</strong> <u>" + promptPrams?.audience + "</u>"
    }
    if (promptPrams?.keywords?.length > 0) {
      promtStr += "\n<strong>Keywords to Include:</strong> <u>" + promptPrams?.keywords + "</u>"
    }
    if (promptPrams?.objectName?.length > 0) {
      promtStr += "\n<strong>Object Name:</strong> <u>" + promptPrams?.objectName + "</u>"
    }
    if (promptPrams?.objectFoundedYear?.length > 0) {
      promtStr += "\n<strong>Founded Year:</strong> <u>" + promptPrams?.objectFoundedYear + "</u>"
    }
    if (promptPrams?.language?.length > 0) {
      promtStr += "\n<strong>Language:</strong> <u>" + promptPrams?.language + "</u>"
    }
    if (promptPrams?.format?.length > 0) {
      promtStr += "\n<strong>Format:</strong> <u>" + promptPrams?.format + "</u>"
    }
    if (promptPrams?.format?.length > 0) {
      promtStr += "\n<strong>Length:</strong> <u>" + promptPrams?.length + " " + promptPrams?.lengthType + "</u>"
    }
    if (promptPrams?.tone?.length > 0) {
      promtStr += "\n<strong>Tone:</strong> <u>" + promptPrams?.tone + "</u>"
    }
    if (promptPrams?.services?.length > 0) {
      promtStr += "\n<strong>Services:</strong> <u>" + promptPrams?.services + "</u>"
    }
    if (promptPrams?.lengthType?.length > 0) {
      promtStr += "\n<strong>" + promptPrams?.lengthType + ":</strong> <u>" + promptPrams?.length + "</u>"
    }




    setopenAiPrams({ ...openAiPrams, promt: promtStr })


  }, [promptPrams]);






  var promptModels = [
    { label: "Choose Model", value: '' },
    {
      "label": "GPT-4",
      "value": "gpt-4"
    },
    {
      "label": "GPT-4 Turbo",
      "value": "gpt-4-turbo"
    },
    {
      "label": "GPT-3.5 Turbo",
      "value": "gpt-3.5-turbo"
    },
    {
      "label": "DALL-E",
      "value": "dall-e"
    },
    {
      "label": "DALL-E 2",
      "value": "dall-e-2"
    },
    {
      "label": "DALL-E 3",
      "value": "dall-e-3"
    }


  ]
  var promptActions = [
    { label: "Choose Ation", value: '' },
    { label: "Write", value: 'write' },
    { label: "Re-Write", value: 'rewrite' },
    { label: "Extend", value: 'extend' },
    { label: "Generate Image", value: 'generateImage' },
    // { label: "Modify Image", value: 'modifyImage' },
  ]


  var promptImageSizes = [
    { label: "Choose Size", value: '' },
    { label: "256x256", value: '256x256' },
    { label: "512x512", value: '512x512' },
    { label: "1024x1024", value: '1024x1024' },
  ]

  var promptFormats = [
    { label: "Choose Format", value: '' },

    { "label": "Plain Text", "value": "Plain Text" },
    { "label": "Structured Text (Markdown)", "value": "Markdown" },
    { "label": "Code Blocks", "value": "Code Blocks" },
    { "label": "Python Code Execution", "value": "Python Code Execution" },
    { "label": "Code Outputs", "value": "Code Outputs" },
    { "label": "Generated Images", "value": "Generated Images" },
    { "label": "Image Editing", "value": "Image Editing" },
    { "label": "Mathematics (LaTeX)", "value": "Mathematics (LaTeX)" },
    { "label": "Data Tables", "value": "Data Tables" },
    { "label": "Bullet Points / Numbered Lists", "value": "Bullet Points / Numbered Lists" },
    { "label": "Links", "value": "Links" },
    { "label": "File Outputs", "value": "File Outputs" }


  ]


  var promptObjectives = [
    { label: "Choose Objective", value: '' },
    { label: "Introduction", value: 'introduction' },
    { label: "Conslusion", value: 'conslusion' },
    { label: "Social Media", value: 'socialMedia' },
    { label: "Blog Heading", value: 'blogHeading' },
    { label: "Call to action", value: 'callToAction' },
    { label: "Generate Team Members", value: 'generateTeamMembers' },
    { label: "Generate Testimonials", value: 'generateTestimonials' },
    { label: "Generate FAQ", value: 'generateFAQ' },
    { label: "Generate List Items", value: 'generateListItems' },
    { label: "Find Lat Long", value: 'findLatLong' },

  ]
  var promptLengthTypes = [
    { label: "Choose Limit by", value: '' },
    { label: "Paragraphs", value: 'Paragraphs' },
    { label: "Words", value: 'Words' },
    { label: "Characters", value: 'Characters' },
    { label: "Numbers", value: 'Numbers' },
    { label: "Max Limit", value: 'Max Limit' },
    { label: "Minimum", value: 'Minimum' },
  ]
  var promptSocialSites = [
    { label: "Choose Social Media", value: '' },
    { "label": "Facebook", "value": "Facebook" },
    { "label": "YouTube", "value": "YouTube" },
    { "label": "WhatsApp", "value": "WhatsApp" },
    { "label": "Instagram", "value": "Instagram" },
    { "label": "TikTok", "value": "TikTok" },
    { "label": "Snapchat", "value": "Snapchat" },
    { "label": "Twitter", "value": "Twitter" },
    { "label": "Pinterest", "value": "Pinterest" },
    { "label": "Reddit", "value": "Reddit" },
    { "label": "LinkedIn", "value": "LinkedIn" }
  ]




  var promptSocialFacebook = [
    { label: "Choose Prompt", value: '' },
    {
      "label": "Motivational Monday",
      "value": "Kick off the week with some motivation! What's a goal you’re excited to tackle this week? #MotivationalMonday"
    },
    {
      "label": "Product Spotlight",
      "value": "Spotlight on [Product Name]! Discover what makes it special and why our customers love it. Check it out! #ProductSpotlight"
    },
    {
      "label": "Fill-in-the-Blank",
      "value": "Let's have some fun! Fill in the blank: 'My favorite way to relax on a weekend is ______.' #WeekendVibes"
    },
    {
      "label": "Throwback Thursday",
      "value": "Throwing it back! Here’s a look at [Event/Memory] from our past. #TBT #ThrowbackThursday"
    },
    {
      "label": "Community Poll",
      "value": "Quick poll! Do you prefer [Option 1] or [Option 2]? Tell us your choice in the comments! #CommunityPoll"
    },
    {
      "label": "Fun Fact Friday",
      "value": "Did you know? [Interesting Fact Related to Your Brand/Industry] #FunFactFriday"
    },
    {
      "label": "Customer Shoutout",
      "value": "We’re grateful for amazing customers like [Customer Name]! Here’s what they had to say about [Product/Service]. #CustomerLove"
    },
    {
      "label": "Sneak Peek",
      "value": "Here's a sneak peek at something exciting coming soon! Any guesses? #SneakPeek"
    },
    {
      "label": "Weekend Plans",
      "value": "It's Friday! What’s everyone up to this weekend? Let us know your plans in the comments. #WeekendPlans"
    },
    {
      "label": "Holiday Celebration",
      "value": "Happy [Holiday Name] from our team to you! Wishing you all a joyful day. #HolidayVibes"
    }
  ]






  var promptAudiences = [
    { label: "Choose Audience", value: '' },
    { label: "Developers", value: "Developers" },
    { label: "Educators", value: "Educators" },
    { label: "Students", value: "Students" },
    { label: "Researchers", value: "Researchers" },
    { label: "Data Scientists", value: "Data Scientists" },
    { label: "Writers", value: "Writers" },
    { label: "Marketers", value: "Marketers" },
    { label: "Healthcare Professionals", value: "Healthcare Professionals" },
    { label: "Business Analysts", value: "Business Analysts" },
    { label: "Designers", value: "Designers" },
    { label: "Engineers", value: "Engineers" },
    { label: "Entrepreneurs", value: "Entrepreneurs" },
    { label: "Lawyers", value: "Lawyers" },
    { label: "Project Managers", value: "Project Managers" },
    { label: "Consultants", value: "Consultants" },
    { label: "Sales Professionals", value: "Sales Professionals" },
    { label: "Non-Profit Workers", value: "Non-Profit Workers" },
    { label: "Public Speakers", value: "Public Speakers" }

  ]


  var promptGenerateTeamMembers = [
    { label: "Choose Prompt", value: '' },
    { label: "Team member data", value: "We have 4 team members, their information as follows,\n Name: Emma Carter, Role: Marketing Manager, Website: emmarketingpro.com, Phone: 01234056789\n Name: Liam Walker, Role: UI/UX Designer, Website: liamdesignhub.com, Phone: 01345067891\n Name: Olivia Bennett, Role: Content Strategist, Website: oliviastrategy.com, Phone: 01456078912\n Name: Ethan Davis, Role: Software Engineer, Website: ethancodebase.com, Phone: 01567089023" },
  ]
  var promptFindMapLatLang = [
    { label: "Choose Prompt", value: '' },

    {
      "label": "Libraries in Boston",
      "value": "Find libraries in Boston."
    },
    {
      "label": "Malls in LA",
      "value": "List shopping malls in Los Angeles."
    },
    {
      "label": "Beaches in Miami",
      "value": "Provide the locations of beaches in Miami."
    },
    {
      "label": "Museums in Rome",
      "value": "Find museums in Rome."
    },
    {
      "label": "Coffee Shops Seattle",
      "value": "Identify top-rated coffee shops in Seattle."
    },
    {
      "label": "Parks in Sydney",
      "value": "Locate popular parks in Sydney."
    },
    {
      "label": "Schools in Chicago",
      "value": "Find schools in Chicago."
    },
    {
      "label": "Gyms in Houston",
      "value": "Provide details of gyms in Houston."
    },
    {
      "label": "Hospitals in Tokyo",
      "value": "List hospitals in Tokyo."
    },
    {
      "label": "Stations in Berlin",
      "value": "Find train stations in Berlin."
    }


  ]





  var promptGenerateTestimonial = [
    { label: "Choose Prompt", value: '' },
    { label: "Create 5 testimonials", value: "Create 5 testimonials where each item has the person's name, their job role, a short message praising the efficiency of the service, and their website link." },
    { label: "Write  4 testimonials", value: "Write  4 testimonials, Include the name, role, an inspiring message about how the product improved their workflow, and their website." },
    { label: "Generate  6 testimonial", value: "Generate  6 testimonial entries with the following structure: name, role, a message about the exceptional customer service, and a website." },
  ]
  var promptGenerateListItems = [
    { label: "Choose Prompt", value: '' },
    { label: "Best smartphones 2024", value: "Generate list items for 5 best smartphones." },
    { label: "Best Black Friday deals", value: "Generate list items for 5 Black Friday deals about ." },
    { label: "Best Christmas gifts", value: "Generate list items for 5 Christmas gifts." },
    { label: "Best vacuum for pet hair", value: "Generate list items for 5 vacuum for pet hair." },
    { label: "Best running shoes", value: "Generate list items for 5 running shoes brands." },
    { label: "Best  coffee maker", value: "Generate list items for 5  coffee maker brands." },
    { label: "Best  mobile games", value: "Generate list items for 5  mobile games brands." },




  ]
  var promptGenerateFaqsItems = [
    { label: "Choose Prompt", value: '' },

    { "label": "COVID-19 Vaccines FAQs", "value": "FAQs about COVID-19 vaccines" },
    { "label": "Passport Renewal FAQs", "value": "FAQs about passport renewal" },
    { "label": "Student Loans FAQs", "value": "FAQs about student loans" },
    { "label": "Windows 11 Upgrade FAQs", "value": "FAQs about Windows 11 upgrade" },
    { "label": "Cloud Storage FAQs", "value": "FAQs about cloud storage" },
    { "label": "Small Business Tax Deductions FAQs", "value": "FAQs about small business tax deductions" },
    { "label": "Starting an LLC FAQs", "value": "FAQs about starting an LLC" },
    { "label": "Travel Insurance FAQs", "value": "FAQs about travel insurance" },
    { "label": "Fitness Trackers FAQs", "value": "FAQs about fitness trackers" },
    { "label": "Online Dating FAQs", "value": "FAQs about online dating" }
  ]
  var promptGenerateImages = [
    { label: "Choose Prompt", value: '' },


    {
      label: "Futuristic Office",
      value: "A futuristic representation of digital marketing services in a sleek, high-tech office environment. Large holographic screens display vibrant visuals of analytics dashboards, SEO graphs, social media networks, and ad performance metrics. The scene includes advanced devices, glowing neon lights in blue and white tones, and a holographic globe symbolizing global connectivity. Professionals are engaged in a collaborative discussion, surrounded by an atmosphere of innovation and cutting-edge technology."
    },
    {
      label: "Digital Collage",
      value: "An artistic digital collage representing digital marketing services. The image features floating holographic elements such as email icons, social media logos, SEO gears, and pay-per-click buttons interconnected by glowing circuits. In the background, a dark yet dynamic gradient of blues and purples gives a futuristic vibe. The central focus is on a 3D holographic Earth radiating light, symbolizing global outreach and the power of technology in marketing."
    },
    {
      label: "Tech Network",
      value: "A visually captivating concept of digital marketing as a futuristic network. The scene shows glowing lines forming a web of interconnected data points, with keywords like 'SEO,' 'Content,' 'PPC,' and 'Analytics' illuminated within the network. The background features a glowing cityscape with high-tech elements and a professional marketer using augmented reality glasses to interact with holographic dashboards. The colors are rich and vibrant, highlighting the sophistication of advanced digital services."
    }


  ]











  var promptTones = [
    { label: "Choose Tone", value: '' },
    { label: "Professional", value: "Use a professional tone that is formal, polished, and suitable for business or academic audiences." },
    { label: "Conversational", value: "Use a conversational tone that feels friendly and approachable, as if talking to a friend." },
    { label: "Enthusiastic", value: "Use an enthusiastic tone that is lively and energetic, conveying excitement and passion." },
    { label: "Inspirational", value: "Use an inspirational tone that motivates and encourages readers with positive language." },
    { label: "Humorous", value: "Use a humorous tone that is light-hearted and funny, adding a playful touch to the text." },
    { label: "Empathetic", value: "Use an empathetic tone that is compassionate and understanding, showing care for the reader's feelings." },
    { label: "Authoritative", value: "Use an authoritative tone that is confident and knowledgeable, establishing expertise on the topic." },
    { label: "Persuasive", value: "Use a persuasive tone that encourages the reader to take action or agree with a particular viewpoint." },
    { label: "Poetic", value: "Use a poetic tone that is creative and expressive, using figurative language and flow for a lyrical effect." },
    { label: "Informal", value: "Use an informal tone that is casual and relaxed, suitable for friendly or relatable content." }

  ]



  var promptLangs = [
    { label: "Language", value: '' },
    { label: "English", value: "English" },
    { label: "Spanish", value: "Spanish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
    { label: "Italian", value: "Italian" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Dutch", value: "Dutch" },
    { label: "Russian", value: "Russian" },
    { label: "Chinese", value: "Chinese" },
    { label: "Japanese", value: "Japanese" },
    { label: "Korean", value: "Korean" },
    { label: "Arabic", value: "Arabic" },
    { label: "Hindi", value: "Hindi" },
    { label: "Bengali", value: "Bengali" },
    { label: "Urdu", value: "Urdu" },
    { label: "Turkish", value: "Turkish" },
    { label: "Persian", value: "Persian" },
    { label: "Swedish", value: "Swedish" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Danish", value: "Danish" },
    { label: "Polish", value: "Polish" },
    { label: "Greek", value: "Greek" },
    { label: "Hebrew", value: "Hebrew" },
    { label: "Finnish", value: "Finnish" },
    { label: "Czech", value: "Czech" },
    { label: "Hungarian", value: "Hungarian" },
    { label: "Romanian", value: "Romanian" },
    { label: "Indonesian", value: "Indonesian" },
    { label: "Thai", value: "Thai" },
    { label: "Vietnamese", value: "Vietnamese" },
    { label: "Filipino", value: "Filipino" },
    { label: "Malay", value: "Malay" },
    { label: "Ukrainian", value: "Ukrainian" },
    { label: "Serbian", value: "Serbian" },
    { label: "Croatian", value: "Croatian" },
    { label: "Bulgarian", value: "Bulgarian" },
    { label: "Slovak", value: "Slovak" },
    { label: "Catalan", value: "Catalan" },
    { label: "Estonian", value: "Estonian" },
    { label: "Latvian", value: "Latvian" },
    { label: "Lithuanian", value: "Lithuanian" },
    { label: "Slovenian", value: "Slovenian" }

  ]


  var promptBlogheadings = [
    { label: "Choose Prompt", value: '' },
    { label: "Introduction to the Topic", value: "Write a blog section heading that introduces the topic and captures readers' attention." },
    { label: "Background Information", value: "Write a blog section heading for providing background information and setting context." },
    { label: "Main Benefits or Advantages", value: "Write a blog section heading that highlights the main benefits or advantages of the topic." },
    { label: "Common Challenges or Issues", value: "Write a blog section heading that addresses common challenges or issues related to the topic." },
    { label: "Step-by-Step Guide or Instructions", value: "Write a blog section heading for a step-by-step guide or instructions on how to achieve something." },
    { label: "Case Study or Real-Life Example", value: "Write a blog section heading introducing a case study or real-life example." },
    { label: "Expert Tips and Best Practices", value: "Write a blog section heading for sharing expert tips and best practices on the topic." },
    { label: "FAQs or Frequently Asked Questions", value: "Write a blog section heading that introduces a frequently asked questions (FAQs) section." },
    { label: "Future Trends or Predictions", value: "Write a blog section heading that discusses future trends or predictions related to the topic." },
    { label: "Conclusion and Key Takeaways", value: "Write a blog section heading that summarizes the key points and concludes the blog." }

  ]

  var promptIntroductions = [
    { label: "Choose Prompt", value: '' },
    { label: "Introduction for {objectName} beginners", value: "Write an engaging introduction for a blog post about {objectName} for beginners" },
    { label: "{objectName} benefits in business", value: "Generate an introductory paragraph for a blog post explaining the benefits of {objectName} in business" },
    { label: "{objectName}'s impact on daily life", value: "Create a catchy blog introduction about the impact of {objectName} on daily life" },
    { label: "{objectName} transforming healthcare", value: "Write a friendly introduction for a blog post on how {objectName} is transforming healthcare" },
    { label: "{objectName} ethics introduction", value: "Generate a professional and informative introduction for a blog post on {objectName} ethics" },
    { label: "Basics of {objectName}", value: "Write a compelling blog introduction explaining the basics of {objectName} to a general audience" },
    { label: "{objectName} in education for teachers", value: "Generate a blog intro for a post about {objectName} in education, aimed at teachers" },
    { label: "{objectName} tools for marketers", value: "Create a blog introduction for an article on {objectName} tools that marketers can use" },
    { label: "Future of {objectName} potential", value: "Write an inspiring introduction for a blog post on the future potential of {objectName}" },
    { label: "{objectName} development challenges", value: "Generate a blog introduction that highlights the challenges and opportunities in {objectName} development" }



  ]

  var promptConclusions = [
    { label: "Choose Prompt", value: '' },

    { "label": "Conclusion for Beginners", "value": "Write a thoughtful conclusion for a blog post about {objectName} for beginners" },
    { "label": "Business Benefits Conclusion", "value": "Generate a compelling conclusion for a blog post on the benefits of {objectName} in business" },
    { "label": "Daily Life Impact Conclusion", "value": "Create a motivating conclusion for a blog post on the impact of {objectName} on daily life" },
    { "label": "Healthcare Transformation", "value": "Write a hopeful conclusion for a blog post about {objectName} transforming healthcare" },
    { "label": "Ethics Conclusion", "value": "Generate a thought-provoking conclusion on a blog post about {objectName} ethics" },
    { "label": "Machine Learning Basics", "value": "Write a clear and encouraging conclusion for a blog post on the basics of machine learning" },
    { "label": "Education Call to Action", "value": "Generate a conclusion for a blog post about {objectName} in education, with a call to action for teachers" },
    { "label": "Marketing Tools Conclusion", "value": "Create a persuasive conclusion for a blog post about {objectName} tools for marketers" },
    { "label": "Future Potential", "value": "Write an inspiring conclusion that summarizes the future potential of {objectName}" },
    { "label": "Challenges and Opportunities", "value": "Generate a reflective conclusion for a blog post discussing challenges and opportunities in {objectName} development" }


  ]
  var promptCallToActions = [
    { label: "Choose Prompt", value: '' },

    { "label": "Explore for Beginners", "value": "Write a call-to-action encouraging readers to explore {objectName} resources for beginners" },
    { "label": "Learn More in Business", "value": "Generate a call-to-action for a blog post on the benefits of {objectName} in business, prompting readers to learn more" },
    { "label": "Share Impact Stories", "value": "Create a call-to-action that invites readers to share how {objectName} impacts their daily lives" },
    { "label": "Healthcare Consideration", "value": "Write a call-to-action encouraging healthcare professionals to consider {objectName} solutions" },
    { "label": "Discuss Ethics", "value": "Generate a call-to-action for a blog post on {objectName} ethics, prompting readers to join the discussion" },
    { "label": "Try ML Project", "value": "Write a call-to-action encouraging readers to try a beginner-friendly machine learning project" },
    { "label": "Teachers Try Tools", "value": "Generate a call-to-action for a blog post on {objectName} in education, inviting teachers to implement {objectName} tools" },
    { "label": "Marketers Explore Tools", "value": "Create a call-to-action encouraging marketers to explore {objectName} tools" },
    { "label": "Learn Future Potential", "value": "Write a call-to-action inviting readers to explore the future potential of {objectName}" },
    { "label": "Discuss Challenges", "value": "Generate a call-to-action for a blog post discussing challenges and opportunities in {objectName} development" }



  ]













  var promptSocialMediaArgs = [
    { label: "Choose Prompt", value: '' },
    { label: "Announce a New Product", value: "Create a social media post announcing our {objectName}, emphasizing its unique features and the value it brings to our customers. Make it exciting and visually engaging." },
    { label: "Share a Customer Success Story", value: "Write a social media post sharing a success story from one of our customers, showcasing how our {objectName} made a positive impact on their life. Keep it heartfelt and inspiring." },
    { label: "Promote an Upcoming Event", value: "Draft a social media post inviting followers to our upcoming event. Highlight the main attractions, date, and time, and encourage users to RSVP or register. Make it sound exclusive and exciting!" },
    { label: "Provide a Quick Tip or How-To", value: "Create a social media post sharing a quick tip or 'how-to' related to our {objectName}. Make it useful, easy to follow, and engaging, so users feel compelled to try it themselves." },
    { label: "Share a Fun Fact or Trivia", value: "Write a social media post that shares a fun fact or trivia about our industry or product. Keep it short, surprising, and engaging to encourage followers to like and share." },
    { label: "Ask an Engaging Question", value: "Create a social media post that asks an open-ended question to engage our followers, related to our industry or product. Make it lighthearted and encourage comments." },
    { label: "Offer a Behind-the-Scenes Look", value: "Write a social media post that offers a behind-the-scenes look at our team or process. Keep it friendly and authentic, helping followers feel more connected to our brand." },
    { label: "Highlight a Limited-Time Offer", value: "Draft a social media post promoting a limited-time offer or discount. Create a sense of urgency, and emphasize the savings and value, encouraging quick action." },
    { label: "Share a Positive Customer Review", value: "Create a social media post featuring a glowing customer review or testimonial. Highlight key phrases from the review and express gratitude for the customer’s support." },
    { label: "Celebrate a Milestone or Achievement", value: "Write a social media post celebrating a company milestone or achievement, such as an anniversary or sales goal. Keep it positive and thank followers for their support." }


  ]

  var promptRewriteArgs = [
    { label: "Choose Prompt", value: '' },
    { label: "Rewrite in a Formal Tone", value: "Rewrite the following text in a formal tone: '{current_text}'" },
    { label: "Simplify Language for Clarity", value: "Rewrite the following text in simpler language, making it easy to understand: '{current_text}'" },
    { label: "Make it Sound Enthusiastic", value: "Rewrite the following text to sound more enthusiastic and engaging: '{current_text}'" },
    { label: "Rewrite for Conciseness", value: "Rewrite the following text to make it more concise and to the point: '{current_text}'" },
    { label: "Rephrase in a Storytelling Style", value: "Rewrite the following text in a storytelling style, making it more narrative: '{current_text}'" },
    { label: "Add Humor to the Text", value: "Rewrite the following text to add a touch of humor while keeping the main message: '{current_text}'" },
    { label: "Adjust for a Persuasive Tone", value: "Rewrite the following text to make it more persuasive and compelling: '{current_text}'" },
    { label: "Transform into a Question Format", value: "Rewrite the following text as a series of questions to engage the reader: '{current_text}'" },
    { label: "Rewrite in Third-Person Perspective", value: "Rewrite the following text in the third-person perspective, as if describing someone else's experience: '{current_text}'" },
    { label: "Use Poetic Language", value: "Rewrite the following text in a poetic or lyrical style, adding figurative language and flow: '{current_text}'" }

  ]
  var promptExtendArgs = [
    { label: "Choose Prompt", value: '' },

    { label: "Add Descriptive Details", value: "Extend the following text by adding descriptive details and imagery: '{current_text}'. Make it more vivid and engaging." },
    { label: "Provide Background Context", value: "Extend the following text by adding relevant background information and context: '{current_text}'. Explain the background, so readers understand its origins or reasons behind it." },
    { label: "Add Examples and Analogies", value: "Extend the following text by including examples and analogies to clarify the main points: '{current_text}'. Help the reader relate to it with clear examples." },
    { label: "Explain Implications and Applications", value: "Extend the following text by discussing its implications and potential applications: '{current_text}'. Explain how this can be applied in different scenarios and its significance." },
    { label: "Add Historical or Cultural Significance", value: "Extend the following text by adding historical or cultural significance to enrich the topic: '{current_text}'. Provide details on how this has evolved or been influenced by history or culture." },
    { label: "Include Future Prospects or Predictions", value: "Extend the following text by speculating on future prospects or predictions related to this topic: '{current_text}'. Describe potential future developments or changes that might arise." },
    { label: "Incorporate Related Statistics or Data", value: "Extend the following text by adding relevant statistics or data to support the main ideas: '{current_text}'. Include any numbers or data that provide evidence." },
    { label: "Expand on Possible Challenges or Drawbacks", value: "Extend the following text by discussing possible challenges or drawbacks of the topic: '{current_text}'. Consider what potential issues or limitations exist." },
    { label: "Describe Benefits and Advantages", value: "Extend the following text by adding the benefits and advantages it offers: '{current_text}'. Explain what makes this beneficial and appealing." },
    { label: "Suggest Practical Tips or Steps for Implementation", value: "Extend the following text by suggesting practical tips or steps for implementing this concept: '{current_text}'. Include actionable advice on how to achieve it." }

  ]







  return (
    <div className=' mt-4'>


      {/* {openAiPrams?.apikey?.length == 0 && (

        <div className="bg-orange-200 p-3 "> Please enter openAI API key on dashboard API settings</div>

      )} */}


      <div className="flex items-center gap-2">


        <SelectControl
          label=""
          value={promptPrams.action}
          options={promptActions}
          onChange={(newVal) => {
            setpromptPrams({ ...promptPrams, action: newVal })
          }}
        />


        {promptPrams.action == "generateImage" && (
          <SelectControl
            label=""
            value={""}
            options={promptGenerateImages}
            onChange={(newVal) => {

              setpromptPrams({ ...promptPrams, promt: newVal })


            }}
          />
        )}


        {promptPrams.action == "write" && (




          <>
            <SelectControl
              label=""
              value={promptPrams.objective}
              options={promptObjectives}
              onChange={(newVal) => {
                setpromptPrams({ ...promptPrams, objective: newVal })
              }}
            />

            {promptPrams.objective == "introduction" && (
              <SelectControl
                label=""
                value={""}
                options={promptIntroductions}
                onChange={(newVal) => {
                  //setpromptPrams({ ...promptPrams, rewrite: newVal })
                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}



            {promptPrams.objective == "blogHeading" && (
              <SelectControl
                label=""
                value={""}
                options={promptBlogheadings}
                onChange={(newVal) => {
                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}
            {promptPrams.objective == "generateTeamMembers" && (
              <SelectControl
                label=""
                value={""}
                options={promptGenerateTeamMembers}
                onChange={(newVal) => {

                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}
            {promptPrams.objective == "findLatLong" && (
              <SelectControl
                label=""
                value={""}
                options={promptFindMapLatLang}
                onChange={(newVal) => {

                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}



            {promptPrams.objective == "generateTestimonials" && (
              <SelectControl
                label=""
                value={""}
                options={promptGenerateTestimonial}
                onChange={(newVal) => {

                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}




            {promptPrams.objective == "generateFAQ" && (
              <SelectControl
                label=""
                value={""}
                options={promptGenerateFaqsItems}
                onChange={(newVal) => {

                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}
            {promptPrams.objective == "generateListItems" && (
              <SelectControl
                label=""
                value={""}
                options={promptGenerateListItems}
                onChange={(newVal) => {

                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}






            {promptPrams.objective == "socialMedia" && (


              <>

                <SelectControl
                  label=""
                  value={""}
                  options={promptSocialSites}
                  onChange={(newVal) => {
                    //setpromptPrams({ ...promptPrams, rewrite: newVal })
                    setpromptPrams({ ...promptPrams, socialSite: newVal })


                  }}
                />


                {promptPrams.socialSite == "" && (

                  <>
                    <SelectControl
                      label=""
                      value={""}
                      options={promptSocialMediaArgs}
                      onChange={(newVal) => {
                        //setpromptPrams({ ...promptPrams, rewrite: newVal })
                        setpromptPrams({ ...promptPrams, promt: newVal })

                      }}
                    />
                  </>
                )}

                {promptPrams.socialSite == "Facebook" && (

                  <>
                    <SelectControl
                      label=""
                      value={""}
                      options={promptSocialFacebook}
                      onChange={(newVal) => {
                        //setpromptPrams({ ...promptPrams, rewrite: newVal })
                        setpromptPrams({ ...promptPrams, promt: newVal })

                      }}
                    />
                  </>
                )}



              </>
            )}












            {promptPrams.objective == "conslusion" && (
              <SelectControl
                label=""
                value={""}
                options={promptConclusions}
                onChange={(newVal) => {
                  //setpromptPrams({ ...promptPrams, rewrite: newVal })
                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}
            {promptPrams.objective == "callToAction" && (
              <SelectControl
                label=""
                value={""}
                options={promptCallToActions}
                onChange={(newVal) => {
                  //setpromptPrams({ ...promptPrams, rewrite: newVal })
                  setpromptPrams({ ...promptPrams, promt: newVal })


                }}
              />
            )}



          </>



        )}
        {promptPrams.action == "rewrite" && (
          <SelectControl
            label=""
            value={""}
            options={promptRewriteArgs}
            onChange={(newVal) => {
              setpromptPrams({ ...promptPrams, promt: newVal })
            }}
          />
        )}



        {promptPrams.action == "extend" && (
          <SelectControl
            label=""
            value={""}
            options={promptExtendArgs}
            onChange={(newVal) => {
              setpromptPrams({ ...promptPrams, promt: newVal })
            }}
          />
        )}






      </div>





      {(
        promptPrams.objective == "generateTeamMembers" ||
        promptPrams.objective == "generateTestimonials" ||
        promptPrams.objective == "generateFAQ" ||
        promptPrams.objective == "generateListItems"


      ) && (

          <>
            <label for="">Keywords</label>
            <InputControl
              className="w-full"
              value={promptPrams.keywords}
              onChange={(newVal) => {
                setpromptPrams({ ...promptPrams, keywords: newVal })
              }}
            />
            <label for="">Services</label>
            <InputControl
              className="w-full"
              value={promptPrams.services}
              onChange={(newVal) => {
                setpromptPrams({ ...promptPrams, services: newVal })
              }}
            />
          </>

        )}



      {(promptPrams.objective == "blogHeading"
        || promptPrams.objective == "socialMedia"
        || promptPrams.objective == "introduction"
        || promptPrams.objective == "conslusion"
        || promptPrams.objective == "callToAction"
      ) && (
          <div>
            <label for="">Keywords</label>
            <InputControl
              className="w-full"
              value={promptPrams.keywords}
              onChange={(newVal) => {
                setpromptPrams({ ...promptPrams, keywords: newVal })
              }}
            />
            <label for="">Services</label>
            <InputControl
              className="w-full"
              value={promptPrams.services}
              onChange={(newVal) => {
                setpromptPrams({ ...promptPrams, services: newVal })
              }}
            />



            <label for="">Object Name</label>

            <InputControl
              className="w-full"
              value={promptPrams.objectName}
              onChange={(newVal) => {
                setpromptPrams({ ...promptPrams, objectName: newVal })
              }}
            />
            <label for="">Object Founded Year</label>

            <InputControl
              className="w-full"
              value={promptPrams.objectFoundedYear}
              onChange={(newVal) => {
                setpromptPrams({ ...promptPrams, objectFoundedYear: newVal })
              }}
            />



          </div>
        )}



      <div className="flex items-center gap-2 my-3">




        <SelectControl
          label=""
          value={promptPrams.aiModel}
          options={promptModels}
          onChange={(newVal) => {
            setpromptPrams({ ...promptPrams, aiModel: newVal })

          }}
        />

        {(
          promptPrams.action == 'write' ||
          promptPrams.action == 'rewrite' ||
          promptPrams.action == 'extend'
        ) && (
            <>

              <SelectControl
                label=""
                value={promptPrams.tone}
                options={promptTones}
                onChange={(newVal) => {
                  setpromptPrams({ ...promptPrams, tone: newVal })

                }}
              />
              <SelectControl
                label=""
                value={promptPrams.audience}
                options={promptAudiences}
                onChange={(newVal) => {
                  setpromptPrams({ ...promptPrams, audience: newVal })

                }}
              />



              <SelectControl
                label=""
                value={promptPrams.language}
                options={promptLangs}
                onChange={(newVal) => {
                  setpromptPrams({ ...promptPrams, language: newVal })

                }}
              />

            </>

          )}


        {(
          promptPrams.action == 'generateImage'
        ) && (
            <>
              <SelectControl
                label=""
                value={promptPrams.imageSize}
                options={promptImageSizes}
                onChange={(newVal) => {
                  setpromptPrams({ ...promptPrams, imageSize: newVal })

                }}
              />

              <InputControl
                className="w-32 mb-2"
                value={promptPrams.imageCount}
                onChange={(newVal) => {
                  setpromptPrams({ ...promptPrams, imageCount: newVal })
                }}
              />
            </>
          )}




        {/* <SelectControl
          label=""
          value={promptPrams.format}
          options={promptFormats}
          onChange={(newVal) => {
            setpromptPrams({ ...promptPrams, format: newVal })

          }}
        /> */}

        {(
          promptPrams.action == 'write' ||
          promptPrams.action == 'rewrite' ||
          promptPrams.action == 'extend'
        ) && (
            <>
              <SelectControl
                label=""
                value={promptPrams.lengthType}
                options={promptLengthTypes}
                onChange={(newVal) => {
                  setpromptPrams({ ...promptPrams, lengthType: newVal })

                }}
              />

              {promptPrams?.lengthType.length > 0 && (
                <InputControl
                  className="w-32 mb-2"
                  value={promptPrams.length}
                  onChange={(newVal) => {
                    setpromptPrams({ ...promptPrams, length: newVal })
                  }}
                />
              )}
            </>
          )


        }




      </div>




      <div className=''>

        <RichText
          tagName={"div"}
          className={"h-[150px] bg-slate-400 p-2 overflow-y-scroll"}

          value={openAiPrams.promt}
          allowedFormats={["core/bold", "core/italic", "core/link"]}
          onChange={(value) => {
            setopenAiPrams({ ...openAiPrams, promt: value })
          }}
          placeholder={__("Start Writing...")}
        />

        <div className="flex items-center gap-3 my-3">
          <div className='cursor-pointer text-center my-3 bg-gray-700 hover:bg-gray-600 rounded-sm text-white px-3 py-2' onClick={ev => {
            if (isProFeature) {
              alert("This feature is only available in Pro Version.");
              return;
            }
            getGTP();
          }}>



            {isProFeature && (
              <span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
                Pro
              </span>
            )}

            {isLoading && (
              <span> {__("Please wait...", "combo-blocks")}</span>
            )}
            {!isLoading && (
              <span> {__("Get Response", "combo-blocks")}</span>
            )}
            {isLoading && (
              <Spinner />
            )}
          </div>

          {
            (
              promptPrams.action == 'write' ||
              promptPrams.action == 'rewrite' ||
              promptPrams.action == 'extend'
            )
            && (
              <div>

                <ToggleControl
                  label={__("Auto Update?", "combo-blocks")}
                  className="mt-3"

                  checked={openAiPrams.autoUpdate ? true : false}
                  onChange={(e) => {

                    setopenAiPrams({ ...openAiPrams, autoUpdate: !openAiPrams.autoUpdate })


                  }}
                />
              </div>
            )}


        </div>


        {openAiPrams.reponse != null && (

          <div>

            {promptPrams.action == 'generateImage' && (

              <div>
                <div>
                  <img src={openAiPrams.reponse} alt="" />
                </div>
                <div className="flex items-center gap-2">

                  {/* <div className='cursor-pointer text-center my-3 bg-gray-700 hover:bg-gray-600 rounded-sm text-white px-3 py-2' onClick={ev => {
                    //var options = { ...text.options, content: openAiPrams.reponse };
                    //setAttributes({ text: { ...text, options: options } });
                    props.clickHandle(openAiPrams.reponse, "upload");

                  }}>Upload To Media</div>
                  <div className='cursor-pointer text-center my-3 bg-gray-700 hover:bg-gray-600 rounded-sm text-white px-3 py-2' onClick={ev => {
                    //var options = { ...text.options, content: openAiPrams.reponse };
                    //setAttributes({ text: { ...text, options: options } });
                    props.clickHandle(openAiPrams.reponse, "uploadSet");

                  }}>Upload & Set</div> */}
                  <div className='cursor-pointer text-center my-3 bg-gray-700 hover:bg-gray-600 rounded-sm text-white px-3 py-2' onClick={ev => {
                    //var options = { ...text.options, content: openAiPrams.reponse };
                    //setAttributes({ text: { ...text, options: options } });
                    props.clickHandle(openAiPrams.reponse, "setAsUrl");

                  }}>Set as URL</div>




                </div>
              </div>
            )}


            {
              (
                promptPrams.action == 'write' ||
                promptPrams.action == 'rewrite' ||
                promptPrams.action == 'extend'
              )
              && (
                <div>
                  <div className='cursor-pointer whitespace-pre-line p-2 hover:bg-gray-200' title="Click to replace text."

                  >
                    {openAiPrams.reponse}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className='cursor-pointer text-center my-3 bg-gray-700 hover:bg-gray-600 rounded-sm text-white px-3 py-2' onClick={ev => {
                      //var options = { ...text.options, content: openAiPrams.reponse };
                      //setAttributes({ text: { ...text, options: options } });
                      props.clickHandle(openAiPrams.reponse, "prepend");

                    }}>Prepend</div><div className='cursor-pointer text-center my-3 bg-gray-700 hover:bg-gray-600 rounded-sm text-white px-3 py-2'
                      onClick={ev => {
                        //var options = { ...text.options, content: openAiPrams.reponse };
                        //setAttributes({ text: { ...text, options: options } });
                        props.clickHandle(openAiPrams.reponse, "append");

                      }}
                    >Append</div> <div className='cursor-pointer text-center my-3 bg-gray-700 hover:bg-gray-600 rounded-sm text-white px-3 py-2' onClick={ev => {
                      //var options = { ...text.options, content: openAiPrams.reponse };
                      //setAttributes({ text: { ...text, options: options } });
                      props.clickHandle(openAiPrams.reponse, "replace");

                    }}>Repalce</div>
                  </div>
                </div>
              )}


          </div>



        )}
      </div>
    </div>
  )
}
class PGcssOpenaiPrompts extends Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }
  render() {
    var {
      onResponseLoaded,
      clickHandle,
      value,
      autoUpdate,
      formattedPrompt,
      isImage,
      promptsAgs,
    } = this.props;
    return (
      <Html promptsAgs={promptsAgs} isImage={isImage} formattedPrompt={formattedPrompt} autoUpdate={autoUpdate} value={value} onResponseLoaded={onResponseLoaded} clickHandle={clickHandle} warn={this.state.showWarning} />
    )
  }
}
export default PGcssOpenaiPrompts;