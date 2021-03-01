import * as React from "react";
import { ErrorContext } from "./PwaLogger";

export const DefaultErrorPage = () => {
  const errorCallbacks = React.useContext(ErrorContext);

  const triggerOpen = () => {
    if (typeof errorCallbacks?.triggerOpen === "function") {
      errorCallbacks.triggerOpen();
    }
  };

  return (
    <>
      <h1 onClick={() => triggerOpen()}>Something went wrong!!!!</h1>
      <a href="/">Mainpage</a>
    </>
  );
};
