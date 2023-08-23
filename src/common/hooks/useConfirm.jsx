import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";

const useConfirm = (Component) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const resolve = useRef();

  const show = useCallback((text) => {
    return new Promise((ok) => {
      resolve.current = ok;
      setText(text);
      setOpen(true);
    });
  });

  const componentWrap = () => {
    return (
      <Component
        open={open}
        onCancel={() => {
          resolve.current(false);
          setOpen(false);
        }}
        onConfirm={() => {
          resolve.current(true);
          setOpen(false);
        }}
        text={text}
      ></Component>
    );
  };

  return [componentWrap, show];
};

export default useConfirm;
