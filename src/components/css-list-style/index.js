

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, PanelRow } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';



function Html(props) {

  if (!props.warn) {
    return null;
  }



  var valParts = (props.val != undefined) ? props.val.split(" ") : ['square', 'inside', 'url("")'];

  var type = (valParts[0] != undefined) ? valParts[0] : 'square';
  var position = (valParts[1] != undefined) ? valParts[1] : 'inside';
  var image = (valParts[2] != undefined) ? valParts[2] : 'url("")';

  var imageVal = image.replace('url("', '');
  imageVal = imageVal.replace('")', '');

  var typeArgs = [
    { label: 'Select..', value: '' },
    { label: 'disc', value: 'disc' },
    { label: 'armenian', value: 'armenian' },
    { label: 'circle', value: 'circle' },
    { label: 'cjk-ideographic', value: 'cjk-ideographic' },
    { label: 'decimal', value: 'decimal' },
    { label: 'decimal-leading-zero', value: 'decimal-leading-zero' },
    { label: 'georgian', value: 'georgian' },
    { label: 'hebrew', value: 'hebrew' },
    { label: 'hiragana', value: 'hiragana' },
    { label: 'hiragana-iroha', value: 'hiragana-iroha' },
    { label: 'katakana', value: 'katakana' },
    { label: 'katakana-iroha', value: 'katakana-iroha' },
    { label: 'lower-alpha', value: 'lower-alpha' },
    { label: 'lower-greek', value: 'lower-greek' },
    { label: 'lower-latin', value: 'lower-latin' },
    { label: 'lower-roman', value: 'lower-roman' },
    { label: 'square', value: 'square' },
    { label: 'upper-alpha', value: 'upper-alpha' },
    { label: 'upper-greek', value: 'upper-greek' },
    { label: 'upper-latin', value: 'upper-latin' },
    { label: 'upper-roman', value: 'upper-roman' },
    { label: 'none', value: 'none' },

  ];

  const ALLOWED_MEDIA_TYPES = ['image'];

  return (

    <div>

      <PanelRow>
        <label htmlFor="">Type</label>
        <PGDropdown position="bottom right" variant="secondary" options={typeArgs} buttonTitle={type} onChange={(option, index) => {

          props.onChange(option.value + ' ' + position + ' ' + image, 'listStyle');


        }} ></PGDropdown>

      </PanelRow>


      <PanelRow>
        <label htmlFor="">Position</label>
        <PGDropdown position="bottom right" variant="secondary" options={[{ label: 'inside', value: 'inside' }, { label: 'outside', value: 'outside' }]} buttonTitle={position} onChange={(option, index) => {

          props.onChange(type + ' ' + option.value + ' ' + image, 'listStyle');


        }} ></PGDropdown>

      </PanelRow>



      <div className='my-3'>
        <img src={imageVal} alt="" />
      </div>



      <MediaUploadCheck>
        <MediaUpload
          className="bg-indigo-300 hover:bg-indigo-500"
          onSelect={(media) => {
            // media.id

            props.onChange(type + ' ' + position + ' url("' + media.url + '")', 'listStyle');

          }


          }
          onClose={() => {
          }


          }

          allowedTypes={ALLOWED_MEDIA_TYPES}
          render={({ open }) => (
            <Button className='my-3 bg-indigo-300 hover:bg-indigo-500 text-white border border-solid border-gray-300 text-center w-full' onClick={open}>Open Media Library</Button>
          )}
        />
      </MediaUploadCheck>




    </div>

  )


}




class PGcssListStyle extends Component {

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


export default PGcssListStyle;