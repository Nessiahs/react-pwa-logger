import { dbLogger } from "./DbLogger";

export type TConsoleOverwrite = "log" | "warn" | "error" | "info";

const consoleBackup: {
  [key: string]: (message?: any, ...optionalParams: any[]) => void;
} = {};

export const ConsoleReplace = (
  toOverwrite: TConsoleOverwrite[] | TConsoleOverwrite
) => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  if (typeof toOverwrite === "string") {
    toOverwrite = [toOverwrite];
  }

  const consoleKeys = Object.keys(window.console);

  for (const item of toOverwrite) {
    if (consoleKeys.includes(item)) {
      consoleBackup[item] = console[item];

      switch (item) {
        case "log":
          console.log = (message?: any, ...optionalParams: any[]) => {
            dbLogger.insert("log", message, ...optionalParams);
          };
          break;

        case "error":
          console.error = (message?: any, ...optionalParams: any[]) => {
            dbLogger.insert("error", message, ...optionalParams);
          };

          break;
        case "warn":
          console.warn = (message?: any, ...optionalParams: any[]) => {
            dbLogger.insert("warn", message, ...optionalParams);
          };
          break;
        case "info":
          console.info = (message?: any, ...optionalParams: any[]) => {
            dbLogger.insert("info", message, ...optionalParams);
          };
          break;
        default:
          dbLogger.insert(
            "error",
            `Cant't find a console replacement for ${item}`
          );
      }
    }
  }
};
