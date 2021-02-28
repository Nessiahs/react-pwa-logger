import * as React from "react";
import { createPortal } from "react-dom";

export type TPortalProps = {
  isOpen: boolean;
};

export const Portal: React.FunctionComponent<TPortalProps> = ({
  isOpen,
  children,
}) => {
  const portalRoot = document.documentElement;
  const el = document.createElement("div");
  el.classList.add("js-debug-console");

  React.useEffect(() => {
    if (isOpen === false) {
      return;
    }
    if (children) {
      portalRoot.appendChild(el);
    }

    return () => {
      portalRoot.removeChild(el);
    };
  }, [children, isOpen, portalRoot, el]);

  return createPortal(children, el);
};
