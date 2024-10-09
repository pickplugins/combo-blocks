

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";




class CustomTag extends Component {







  render() {

    var {
      tag,


    } = this.props;


    const Tag = `${tag}`;


    return (
      <Tag>

      </Tag>

    )
  }
}


export default CustomTag;