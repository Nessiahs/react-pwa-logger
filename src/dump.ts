import browser from "browser-detect";
import { dbLogger } from "./DbLogger";

export const dump = async () => {
  const data = {
    browser: browser(),
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    history: await dbLogger.getHistoryDump(),
    errors: await dbLogger.getErrorDump(),
    console: await dbLogger.getConsoleDump(),
  };
  const content = `data:text/json;charset=utf-8,${JSON.stringify(data)}`;
  const anker = document.createElement("a");
  anker.setAttribute("href", content);
  anker.setAttribute("download", "debug.json");
  anker.click();
};
