

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, PanelBody, PanelRow } from '@wordpress/components';
import PGDropdown from '../dropdown'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Icon, close, arrowRight } from '@wordpress/icons';
import { GradientPicker } from '@wordpress/components';



function Html(props) {

  if (!props.warn) {
    return null;
  }

  var typeArgs = {
    url: { label: 'Image URL', id: 'url' },
    //conicGradient: { label: 'Conic Gradient', id: 'conicGradient' },
    linearGradient: { label: 'Linear Gradient', id: 'linearGradient' },
    radialGradient: { label: 'Radial Gradient', id: 'radialGradient' },
    // repeatingConicGradient: { label: 'Repeating Conic Gradient', id: 'repeatingConicGradient' },
    // repeatingLinearGradient: { label: 'Repeating Linear Gradient', id: 'repeatingLinearGradient' },
    // repeatingRadialGradient: { label: 'Repeating Radial Gradient', id: 'repeatingRadialGradient' },



  }

  var valX = (props.val == undefined || props.val == null || props.val.length == 0) ? '' : props.val;





  const [valArgs, setValArgs] = useState(valX.split(",  ").filter(n => n));



  var RemoveQueryPram = function ({ index, arg }) {
    var typeName = '';

    if (arg.includes("url")) {
      typeName = 'URL';
    }
    else if (arg.includes("conic-gradient")) {
      typeName = 'Conic Gradient';
    }
    else if (arg.includes("linear-gradient")) {
      typeName = 'Linear Gradient';
    }
    else if (arg.includes("radial-gradient")) {
      typeName = 'Radial Gradient';
    }
    else if (arg.includes("repeating-conic-gradient")) {
      typeName = 'R Conic Gradient';
    }
    else if (arg.includes("repeating-linear-gradient")) {
      typeName = 'R Linear Gradient';
    }
    else if (arg.includes("repeating-radial-gradient")) {
      typeName = 'R Radial Gradient';
    }



    return (

      <>
        <span className='cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {


          valArgs.splice(index, 1);
          var ssdsd = valArgs.concat([]);

          setValArgs(ssdsd);

          var valString = ssdsd.join(',  ');
          props.onChange(valString, 'maskImage');

        }}><Icon icon={close} /></span>
        <span className='mx-2'>{typeName.length == 0 ? '#' + index : typeName}</span>
      </>




    )

  }





  const ALLOWED_MEDIA_TYPES = ['image'];

  return (

    <div>


      <div className="my-4">

        <PGDropdown position="bottom right" variant="secondary" options={typeArgs} buttonTitle="Add" onChange={(option, index) => {


          if (option.id == 'url') {
            var dsdsf = valArgs.concat('url()')
          }
          else if (option.id == 'linearGradient') {
            var dsdsf = valArgs.concat("linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)")

          } else if (option.id == 'radialGradient') {
            var dsdsf = valArgs.concat("radial-gradient(#12c2e9 0%,#c471ed 50%,#f64f59 100%)")

          }
          else if (option.id == 'conicGradient') {
            var dsdsf = valArgs.concat("conic-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)")

          }



          setValArgs(dsdsf);

          var valString = valArgs.join(',  ');
          props.onChange(valString, 'maskImage');


        }} values=""></PGDropdown>
      </div>


      {valArgs.length != 0 && valArgs.map((x, index) => {



        return (
          <div className="pg-setting-input-gradient">
            <PanelBody
              initialOpen={false}
              title={<RemoveQueryPram index={index} arg={x} />}>
              {x.includes("url") && (
                <div>
                  <div className="my-3">
                    <img src={x.replace("url(", "").replace(")", "")} alt="" />
                  </div>

                  <InputControl
                    className="mr-2"
                    value={x.replace("url(", "").replace(")", "")}
                    placeholder="Image URL"
                    onChange={(newVal) => {
                      valArgs[index] = "url(" + newVal + ")";
                      setValArgs(valArgs);
                      var valString = valArgs.join(",  ");

                      props.onChange(valString, "maskImage");
                    }}
                  />

                  <MediaUploadCheck>
                    <MediaUpload
                      className="bg-indigo-300 hover:bg-indigo-500"
                      onSelect={(media) => {
                        // media.id

                        valArgs[index] = "url(" + media.url + ")";

                        setValArgs(valArgs);
                        var valString = valArgs.join(",  ");

                        props.onChange(valString, "maskImage");
                      }}
                      onClose={() => { }}
                      allowedTypes={ALLOWED_MEDIA_TYPES}
                      render={({ open }) => (
                        <Button
                          className="my-3 bg-indigo-300 hover:bg-indigo-500 text-white border border-solid border-gray-300 text-center w-full"
                          onClick={open}>
                          Open Media Library
                        </Button>
                      )}
                    />
                  </MediaUploadCheck>
                </div>
              )}

              {!x.includes("url") && (
                <GradientPicker
                  value={x == null || x == undefined ? null : x}
                  onChange={(currentGradient) => {

                    if (currentGradient == undefined) {
                      valArgs.splice(index, 1);
                      var ssdsd = valArgs.concat([]);
                      setValArgs(ssdsd);
                      var valString = ssdsd.join(",  ");
                    } else {
                      valArgs[index] = currentGradient;
                      setValArgs(valArgs);
                      var valString = valArgs.join(",  ");
                    }


                    props.onChange(valString, "maskImage");
                  }}
                  gradients={[
                    {
                      name: "JShine",
                      gradient:
                        "linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)",
                      slug: "jshine",
                    },
                    {
                      name: "Moonlit Asteroid",
                      gradient:
                        "linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)",
                      slug: "moonlit-asteroid",
                    },
                    {
                      name: "Rastafarie",
                      gradient:
                        "linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)",
                      slug: "rastafari",
                    },
                  ]}
                />
              )}
            </PanelBody>
          </div>
        );





      })}





    </div>

  )


}




class PGcssMaskImage extends Component {

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


    const {
      val,
      onChange,



    } = this.props;






    return (
      <div>

        <Html val={val} onChange={onChange} warn={this.state.showWarning} />
      </div>

    )
  }
}



export default PGcssMaskImage;