"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleReplace = void 0;
var DbLogger_1 = require("./DbLogger");
var consoleBackup = {};
var ConsoleReplace = function (toOverwrite) {
    if (typeof toOverwrite === "string") {
        toOverwrite = [toOverwrite];
    }
    var consoleKeys = Object.keys(window.console);
    for (var _i = 0, toOverwrite_1 = toOverwrite; _i < toOverwrite_1.length; _i++) {
        var item = toOverwrite_1[_i];
        if (consoleKeys.includes(item)) {
            consoleBackup[item] = console[item];
            switch (item) {
                case "log":
                    console.log = function (message) {
                        var optionalParams = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            optionalParams[_i - 1] = arguments[_i];
                        }
                        DbLogger_1.dbLogger.insert.apply(DbLogger_1.dbLogger, __spreadArray(["log", message], optionalParams));
                    };
                    break;
                case "error":
                    console.error = function (message) {
                        var optionalParams = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            optionalParams[_i - 1] = arguments[_i];
                        }
                        DbLogger_1.dbLogger.insert.apply(DbLogger_1.dbLogger, __spreadArray(["error", message], optionalParams));
                    };
                    break;
                case "warn":
                    console.warn = function (message) {
                        var optionalParams = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            optionalParams[_i - 1] = arguments[_i];
                        }
                        DbLogger_1.dbLogger.insert.apply(DbLogger_1.dbLogger, __spreadArray(["warn", message], optionalParams));
                    };
                    break;
                case "info":
                    console.info = function (message) {
                        var optionalParams = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            optionalParams[_i - 1] = arguments[_i];
                        }
                        DbLogger_1.dbLogger.insert.apply(DbLogger_1.dbLogger, __spreadArray(["info", message], optionalParams));
                    };
                    break;
                default:
                    DbLogger_1.dbLogger.insert("error", "Cant't find a console replacement for " + item);
            }
        }
    }
};
exports.ConsoleReplace = ConsoleReplace;
//# sourceMappingURL=ConsoleReplace.js.map