
import browser from "browser-detect";
import { dbLogger } from "./DbLogger";

export const dump = async (dumper: () => any) => {
  const blob = await dbLogger.exportDB();
   const data = {
    browser: browser(),
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    dexie: JSON.parse(await blob.text()),
    custom: dumper(),
  };

  const content = "data:text/json;charset=utf-8,"+ encodeURIComponent(JSON.stringify(data));
  const anker = document.createElement("a");
  anker.setAttribute("href", content);
  anker.setAttribute("download", "debug.json");
  anker.click();
};
