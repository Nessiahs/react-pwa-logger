import Dexie from "dexie";

export interface IConsoleLog {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  extras: string;
}

export interface IConsoleError {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  callstack: string;
}

export interface IConsoleInfo {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  extras: string;
}

export interface IConsoleWarning {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  extras: string;
}

export interface IScriptError {
  id?: number;
  page_id: number;
  time: string;
  message: string;
  stacktrace: string;
  react_info: string;
}

export interface IPagestart {
  id?: number;
  time: string;
  url: string;
}

export type TLogLevel = keyof typeof logIncludes;

export type TInsertTypes = "log" | "error" | "warn" | "info";

const logIncludes = {
  all: ["log", "info", "warn", "error"],
  info: ["info", "warn", "error"],
  warn: ["warn", "error"],
  error: ["error"],
};

class DbLogger extends Dexie {
  private log: Dexie.Table<IConsoleLog, number>;
  private error: Dexie.Table<IConsoleError, number>;
  private warning: Dexie.Table<IConsoleWarning, number>;
  private info: Dexie.Table<IConsoleInfo, number>;
  private history: Dexie.Table<IPagestart, number>;
  private scriptError: Dexie.Table<IScriptError, number>;
  private pageId = 0;

  private logLevel: TLogLevel = "info";

  constructor() {
    super("DbLogger");
    this.version(1).stores({
      log: "++id, page_id, time, message, extras",
      info: "++id, page_id, time, message, extras",
      error: "++id,page_id, time, message, callstack",
      warning: "++id, page_id, time, message, extras",
      history: "++id, time, url",
      scriptError: "++id, page_id, time, message, stacktrace, react_info",
    });

    this.history = this.table("history");
    this.log = this.table("log");
    this.error = this.table("error");
    this.warning = this.table("warning");
    this.info = this.table("info");
    this.scriptError = this.table("scriptError");
    this.setPageId();
  }

  public setLogLevel(level: TLogLevel) {
    if (logIncludes.hasOwnProperty(level)) {
      this.logLevel = level;
    }
  }

  private getDate() {
    const date = new Date();
    let month = `${date.getMonth() + 1}`; //js month starts with 0 for January
    let day = `${date.getDate()}`;
    let hours = `${date.getHours()}`;
    let minutes = `${date.getMinutes()}`;
    let seconds = `${date.getSeconds()}`;

    if (month.length === 1) {
      month = `0${month}`;
    }

    if (day.length === 1) {
      day = `0${day}`;
    }

    if (hours.length === 1) {
      hours = `0${hours}`;
    }

    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }

    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }

    return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  async setPageId() {
    this.pageId = await this.history.add({
      time: this.getDate(),
      url: window.location.href,
    });
  }

  async insert(type: TInsertTypes, message: any, ...optionalParams: any[]) {
    if (
      process.env.NODE_ENV !== "production" ||
      logIncludes[this.logLevel].includes(type) === false
    ) {
      return;
    }
    switch (type) {
      case "error":
        await this.error.add({
          page_id: this.pageId,
          time: this.getDate(),
          message: JSON.stringify(message),
          callstack: JSON.stringify(optionalParams),
        });
        break;
      case "log":
        this.log.add({
          page_id: this.pageId,
          time: this.getDate(),
          message: JSON.stringify(message),
          extras: JSON.stringify(optionalParams),
        });
        break;
      case "warn":
        this.warning.add({
          page_id: this.pageId,
          time: this.getDate(),
          message: JSON.stringify(message),
          extras: JSON.stringify(optionalParams),
        });
        break;
      case "info":
        this.info.add({
          page_id: this.pageId,
          time: this.getDate(),
          message: JSON.stringify(message),
          extras: JSON.stringify(optionalParams),
        });
        break;
      default:
        throw new Error(`Can't find a db for ${type}`);
    }
  }

  async insertError(
    error: string,
    stack: Error["stack"],
    info: React.ErrorInfo
  ) {
    if (process.env.NODE_ENV === "development") {
      return;
    }
    await this.scriptError.add({
      page_id: this.pageId,
      time: this.getDate(),
      message: error,
      stacktrace: JSON.stringify(stack),
      react_info: JSON.stringify(info),
    });
  }

  getHistoryDump() {
    return this.history.toArray();
  }

  getErrorDump() {
    return this.scriptError.toArray();
  }

  async getConsoleDump() {
    return {
      log: await this.log.toArray(),
      error: await this.error.toArray(),
      warning: await this.warning.toArray(),
      info: await this.info.toArray(),
    };
  }
}

export const dbLogger = new DbLogger();
