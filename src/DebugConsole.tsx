import * as React from "react";
import { dump } from "./dump";
import { ErrorContext } from "./PwaLogger";

export const DebugConsole: React.FunctionComponent = () => {
  const context = React.useContext(ErrorContext);

  let customDump = () => null;

  if (context.dumper && typeof context.dumper === "function") {
    customDump = context.dumper;
  }
  return (
    <>
      <div className="js-logger-header">
        <div>js-logger console for {context.projectName}</div>
        <div className="js-logger-close" onClick={context.closeConsole}>
          X
        </div>
      </div>
      <div>
        {context.consoleText}
        <a
          href={`mailto:${context.mailTo}?subject=${escape(
            context.emailSubject ?? ""
          )}`}>
          {context.mailTo}
        </a>
        <p>
          <button onClick={() => dump(customDump)}>Download</button>
        </p>
      </div>
    </>
  );
};
