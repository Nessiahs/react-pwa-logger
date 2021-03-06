import * as React from "react";
import { ConsoleReplace, TConsoleOverwrite } from "./ConsoleReplace";
import { dbLogger, TLogLevel } from "./DbLogger";
import { DebugConsole } from "./DebugConsole";
import { dump } from "./dump";
import { ErrorPage } from "./ErrorPage";
import { useReactRouter as _useReactRouter } from "./hooks/useReactRouter";
import { Portal } from "./Portal";

export const useReactRouter = _useReactRouter;

export type TLoggerState = {
  hasError: boolean;
  openCount: number;
  isOpen: boolean;
};

export type TLoggerConfig = {
  projectName: string;
  mailTo: string;
  emailSubject: string;
  consoleText: string | React.ReactNode;
};

export type TErrorContextProps = {
  triggerOpen: () => void;
  closeConsole: () => void;
  dumper: () => any;
  isOpen: boolean;
} & TLoggerConfig;

export type TLoggerProps = {
  console?: TConsoleOverwrite[];
  errorPage?: React.ReactNode;
  openCount?: number;
  config?: TLoggerConfig;
  logLevel?: TLogLevel;
  dumper?: TErrorContextProps["dumper"];
  debugConsole?: React.ReactNode;
};

export const ErrorContext = React.createContext<Partial<TErrorContextProps>>(
  {}
);

const defaultConfig: TLoggerConfig = {
  projectName: "js-logger default",
  mailTo: "support@example.com",
  emailSubject: `Error report for js-logger!!`,
  consoleText:
    "An error was detected at the page. To help your developer, download the file and send it to:",
};

export class PwaLogger extends React.Component<TLoggerProps, TLoggerState> {
  state: TLoggerState;
  private openCount = 10;
  private timer = 0;
  private readonly debugConsole;
  private readonly config: TLoggerConfig;
  private readonly logLevel: TLogLevel = "warn";
  private readonly dumper: TErrorContextProps["dumper"];

  private readonly errorPage: React.ReactNode | undefined;

  constructor(props: TLoggerProps) {
    super(props);

    this.state = { hasError: false, openCount: 0, isOpen: false };

    this.config = {
      ...defaultConfig,
      ...props.config,
    };

    if (props.errorPage) {
      this.errorPage = props.errorPage;
    }

    if (props.dumper && typeof props.dumper === "function") {
      this.dumper = props.dumper;
    } else {
      this.dumper = () => null;
    }

    if (typeof props.openCount === "number") {
      this.openCount = props.openCount;
    }

    if (props.debugConsole) {
      this.debugConsole = props.debugConsole;
    } else {
      this.debugConsole = <DebugConsole />;
    }

    dbLogger.setLogLevel(props.logLevel ?? this.logLevel);

    if (props.console) {
      ConsoleReplace(props.console);
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true });
    dbLogger.insertError(error.message, error.stack, info);
  }

  private countOpen() {
    window.clearTimeout(this.timer);

    this.setState({ openCount: this.state.openCount + 1 });

    if (this.openCount === this.state.openCount) {
      this.setState({ isOpen: true, openCount: 0 });
      return;
    } else if (this.state.isOpen === true) {
      return;
    }

    this.timer = window.setTimeout(() => {
      this.setState({ openCount: 0 });
    }, 1000);
  }

  private closeConsole() {
    this.setState({ isOpen: false, openCount: 0 });
  }

  render() {
    return (
      <ErrorContext.Provider
        value={{
          triggerOpen: () => this.countOpen(),
          closeConsole: () => this.closeConsole(),
          dumper: () => dump(this.dumper),
          isOpen: this.state.isOpen,
          ...this.config,
        }}>
        {this.state.hasError === true ? (
          <ErrorPage errorPage={this.errorPage} />
        ) : (
          this.props.children
        )}
        <Portal isOpen={this.state.isOpen}>{this.debugConsole}</Portal>
      </ErrorContext.Provider>
    );
  }
}
