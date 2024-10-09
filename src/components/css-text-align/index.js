const { Component, RawHTML } = wp.element;
import {
  Panel,
  PanelRow,
  PanelItem,
  Button,
  Dropdown,
  SelectControl,
  Popover,
  Spinner,
  ToggleControl,
} from "@wordpress/components";
import {
  createElement,
  useCallback,
  memo,
  useMemo,
  useState,
  useEffect,
} from "@wordpress/element";

import { __experimentalInputControl as InputControl } from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";
import apiFetch from "@wordpress/api-fetch";

function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    left: { label: "left", value: "left" },
    center: { label: "center", value: "center" },
    right: { label: "right", value: "right" },
    justify: { label: "justify", value: "justify" },
  };
  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [align, setalign] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState(
    valArgs[1] == undefined ? false : true
  );

  return (
    <div className="flex justify-between items-center">
      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button title="Clear" onClick={onToggle} aria-expanded={isOpen}>
            {/* <div className=" ">{val ? args[val].label : 'Select...'}</div> */}
            <div className=" ">
              {args[align] == undefined ? "Select..." : args[align].label}
            </div>
          </Button>
        )}
        renderContent={() => (
          <div className="w-32 pg-font">
            {Object.entries(args).map((args) => {
              var index = args[0];
              var x = args[1];
              return (
                <div
                  className={
                    "px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer"
                  }
                  onClick={(ev) => {
                    // onChange(x.value, 'textAlign');
                    setalign(x.value);

                    if (isImportant) {
                      props.onChange(x.value + " !important", "textAlign");
                    } else {
                      props.onChange(x.value, "textAlign");
                    }
                  }}
                >
                  {!x.value && <div>Reset</div>}

                  {x.value && <>{x.label}</>}
                </div>
              );
            })}
          </div>
        )}
      />

      <ToggleControl
        help={isImportant ? "Important (Enabled)" : "Important?"}
        checked={isImportant}
        onChange={(arg) => {
          setImportant((isImportant) => !isImportant);

          if (isImportant) {
            props.onChange(align, "textAlign");
          } else {
            props.onChange(align + " !important", "textAlign");
          }
        }}
      />
    </div>
  );
}

class PGcssTextAlign extends Component {
  // var { onChange } = this.props;
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }
  render() {
    const { val, onChange } = this.props;
    // function Html(prop) {
    //   var args = {
    //     left: { label: "left", value: "left" },
    //     center: { label: "center", value: "center" },
    //     right: { label: "right", value: "right" },
    //     justify: { label: "justify", value: "justify" },
    //   };
    //   const [isImportant, setImportant] = useState(
    //     valArgs[1] == undefined ? false : true
    //   );

    //   return (
    //     <>
    //       <div>
    //         <div
    //           className={[
    //             val == "left"
    //               ? "bg-indigo-300 hover:bg-indigo-500 text-white inline-block px-2 py-1 border cursor-pointer"
    //               : "inline-block px-2 py-1 border cursor-pointer",
    //           ]}
    //           onClick={(ev) => {
    //             onChange("left", "textAlign");
    //           }}
    //         >
    //           <svg
    //             width="24"
    //             height="24"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             aria-hidden="true"
    //             focusable="false"
    //           >
    //             <path d="M4 19.8h8.9v-1.5H4v1.5zm8.9-15.6H4v1.5h8.9V4.2zm-8.9 7v1.5h16v-1.5H4z"></path>
    //           </svg>
    //         </div>
    //         <div
    //           className={[
    //             val == "center"
    //               ? "bg-indigo-300 hover:bg-indigo-500 text-white inline-block px-2 py-1 border cursor-pointer"
    //               : "inline-block px-2 py-1 border cursor-pointer",
    //           ]}
    //           onClick={(ev) => {
    //             onChange("center", "textAlign");
    //           }}
    //         >
    //           <svg
    //             width="24"
    //             height="24"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             aria-hidden="true"
    //             focusable="false"
    //           >
    //             <path d="M16.4 4.2H7.6v1.5h8.9V4.2zM4 11.2v1.5h16v-1.5H4zm3.6 8.6h8.9v-1.5H7.6v1.5z"></path>
    //           </svg>
    //         </div>
    //         <div
    //           className={[
    //             val == "right"
    //               ? "bg-indigo-300 hover:bg-indigo-500 text-white inline-block px-2 py-1 border cursor-pointer"
    //               : "inline-block px-2 py-1 border cursor-pointer",
    //           ]}
    //           onClick={(ev) => {
    //             onChange("right", "textAlign");
    //           }}
    //         >
    //           <svg
    //             width="24"
    //             height="24"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             aria-hidden="true"
    //             focusable="false"
    //           >
    //             <path d="M11.1 19.8H20v-1.5h-8.9v1.5zm0-15.6v1.5H20V4.2h-8.9zM4 12.8h16v-1.5H4v1.5z"></path>
    //           </svg>
    //         </div>

    //         <div
    //           className={[
    //             val == "justify"
    //               ? "bg-indigo-300 hover:bg-indigo-500 text-white inline-block px-2 py-1 border cursor-pointer"
    //               : "inline-block px-2 py-1 border cursor-pointer",
    //           ]}
    //           onClick={(ev) => {
    //             onChange("justify", "textAlign");
    //           }}
    //         >
    //           <svg
    //             width="20"
    //             height="20"
    //             viewBox="0 0 24 24"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <rect width="20" height="2.35838" fill="black" />
    //             <rect y="10.8208" width="20" height="2.35838" fill="black" />
    //             <rect y="21.6416" width="20" height="2.35838" fill="black" />
    //           </svg>
    //         </div>
    //       </div>
    //       {/* <ToggleControl
    //         help={isImportant ? "Important (Enabled)" : "Important?"}
    //         checked={isImportant}
    //         onChange={(arg) => {
    //           setImportant((isImportant) => !isImportant);

    //           if (isImportant) {
    //             props.onChange(align, "textAlign");
    //           } else {
    //             props.onChange(align + " !important", "textAlign");
    //           }
    //         }}
    //       /> */}
    //     </>
    //   );
    // }

    return <Html val={val} onChange={onChange} warn={this.state.showWarning} />;
  }
}

export default PGcssTextAlign;
