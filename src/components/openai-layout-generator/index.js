const { Component } = wp.element;
import { __ } from "@wordpress/i18n";

import { Icon, styles, settings, link, linkOff, close, language } from "@wordpress/icons";
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { __experimentalInputControl as InputControl, Spinner, PanelBody, PanelRow, ColorPalette, RangeControl, TextareaControl, SelectControl, ToggleControl } from '@wordpress/components';
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
  const [isLoading, setisLoading] = useState(false);
  const [promptPrams, setpromptPrams] = useState({ promt: "", action: "", language: "", objectFoundedYear: "", objectName: "", keywords: "", lengthType: "Words", length: 20 });
  const [openAiPrams, setopenAiPrams] = useState({ promt: "", apikey: '', autoUpdate: props.autoUpdate, model: '', role: "", reponse: null });

  var apikey = window?.comboBlocksEditor?.apiKeys?.openAI?.args?.apikey


  const openai = new OpenAI({
    apiKey: apikey,
    dangerouslyAllowBrowser: true,
  });

  async function getGTP() {

    if (openAiPrams.promt.length == 0) {

      alert("Please write some instructions.");
      return;
    }
    // if (apikey.length == 0) {

    //   alert("Please enter API key first.");
    //   return;
    // }


    if (openAiPrams.promt.length > 0) {

      const format = "gutenberg";

      const formattedPrompt = `Respond only with ${format} blocks and no other text. Do not include any explanations, introductions, or concluding remarks.`;


      setisLoading(true);
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ "role": "user", "content": `${formattedPrompt} ${openAiPrams.promt}` }],
      });
      var choices = chatCompletion.choices
      var message = choices[0].message.content;




      //message = message.slice(1, -1)
      setopenAiPrams({ ...openAiPrams, reponse: message })

      setTimeout(() => {
        setisLoading(false);
      }, 1000)
    }

  }

  useEffect(() => {
    var model = window?.comboBlocksEditor?.apiKeys?.openAI?.args?.model
    var apikey = window?.comboBlocksEditor?.apiKeys?.openAI?.args?.apikey



    setopenAiPrams({ ...openAiPrams, model: "" })
    //setopenAiPrams({ ...openAiPrams, reponse: message })

  }, [window.comboBlocksEditor]);


  useEffect(() => {


    var promtStr = ""




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


    setopenAiPrams({ ...openAiPrams, promt: promtStr })


  }, [promptPrams]);


  useEffect(() => {



    var promtStr = ""




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


  }, [promptPrams.objectName]);





  var promptActions = [
    { label: "Choose Ation", value: '' },
    { label: "Write", value: 'write' },
    { label: "Re-Write", value: 'rewrite' },
    { label: "Extend", value: 'extend' },
  ]






  return (
    <div className=' mt-4'>


      {/* {openAiPrams?.apikey?.length == 0 && (

        <div className="bg-orange-200 p-3 "> Please enter openAI API key on dashboard API settings</div>

      )} */}


      <div className="flex items-center gap-2">
        {/* <SelectControl
          label=""
          value={promptPrams.action}
          options={promptActions}
          onChange={(newVal) => {
            setpromptPrams({ ...promptPrams, action: newVal })
          }}
        /> */}








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
            getGTP();
          }}>
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
        </div>


        {openAiPrams.reponse != null && (
          <div className='cursor-pointer whitespace-pre-line p-2 hover:bg-gray-200' title="Click Add." onClick={ev => {



            const { parse } = wp.blockSerializationDefaultParser;
            var blocks = openAiPrams.reponse.length > 0 ? parse(openAiPrams.reponse) : "";
            const attributes = blocks[0].attrs;

            wp.data.dispatch("core/block-editor").insertBlocks(wp.blocks.parse(openAiPrams.reponse));






          }}

          >
            {openAiPrams.reponse}
          </div>
        )}
      </div>
    </div>
  )
}
class PGAiLayoutGenerator extends Component {
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
      args,
      autoUpdate,
    } = this.props;
    return (
      <Html args={args} autoUpdate={autoUpdate} warn={this.state.showWarning} />
    )
  }
}
export default PGAiLayoutGenerator;