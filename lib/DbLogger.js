"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbLogger = void 0;
var dexie_1 = require("dexie");
var dexie_export_import_1 = require("dexie-export-import");
var logIncludes = {
    all: ["log", "info", "warn", "error"],
    info: ["info", "warn", "error"],
    warn: ["warn", "error"],
    error: ["error"],
};
var DbLogger = (function (_super) {
    __extends(DbLogger, _super);
    function DbLogger() {
        var _this = _super.call(this, "DbLogger") || this;
        _this.pageId = 0;
        _this.logLevel = "info";
        _this.version(1).stores({
            log: "++id, page_id, time, message, extras",
            info: "++id, page_id, time, message, extras",
            error: "++id,page_id, time, message, callstack",
            warning: "++id, page_id, time, message, extras",
            history: "++id, time, url",
            scriptError: "++id, page_id, time, message, stacktrace, react_info",
        });
        _this.history = _this.table("history");
        _this.log = _this.table("log");
        _this.error = _this.table("error");
        _this.warning = _this.table("warning");
        _this.info = _this.table("info");
        _this.scriptError = _this.table("scriptError");
        _this.setPageId();
        return _this;
    }
    DbLogger.prototype.setLogLevel = function (level) {
        if (logIncludes.hasOwnProperty(level)) {
            this.logLevel = level;
        }
    };
    DbLogger.prototype.getDate = function () {
        var date = new Date();
        var month = "" + (date.getMonth() + 1);
        var day = "" + date.getDate();
        var hours = "" + date.getHours();
        var minutes = "" + date.getMinutes();
        var seconds = "" + date.getSeconds();
        if (month.length === 1) {
            month = "0" + month;
        }
        if (day.length === 1) {
            day = "0" + day;
        }
        if (hours.length === 1) {
            hours = "0" + hours;
        }
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }
        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    };
    DbLogger.prototype.setPageId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4, this.history.add({
                                time: this.getDate(),
                                url: window.location.href,
                            })];
                    case 1:
                        _a.pageId = _b.sent();
                        return [2];
                }
            });
        });
    };
    DbLogger.prototype.insert = function (type, message) {
        var optionalParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            optionalParams[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (logIncludes[this.logLevel].includes(type) === false) {
                            return [2];
                        }
                        _a = type;
                        switch (_a) {
                            case "error": return [3, 1];
                            case "log": return [3, 3];
                            case "warn": return [3, 4];
                            case "info": return [3, 5];
                        }
                        return [3, 6];
                    case 1: return [4, this.error.add({
                            page_id: this.pageId,
                            time: this.getDate(),
                            message: JSON.stringify(message),
                            callstack: JSON.stringify(optionalParams),
                        })];
                    case 2:
                        _b.sent();
                        return [3, 7];
                    case 3:
                        this.log.add({
                            page_id: this.pageId,
                            time: this.getDate(),
                            message: JSON.stringify(message),
                            extras: JSON.stringify(optionalParams),
                        });
                        return [3, 7];
                    case 4:
                        this.warning.add({
                            page_id: this.pageId,
                            time: this.getDate(),
                            message: JSON.stringify(message),
                            extras: JSON.stringify(optionalParams),
                        });
                        return [3, 7];
                    case 5:
                        this.info.add({
                            page_id: this.pageId,
                            time: this.getDate(),
                            message: JSON.stringify(message),
                            extras: JSON.stringify(optionalParams),
                        });
                        return [3, 7];
                    case 6: throw new Error("Can't find a db for " + type);
                    case 7: return [2];
                }
            });
        });
    };
    DbLogger.prototype.insertError = function (error, stack, info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.scriptError.add({
                            page_id: this.pageId,
                            time: this.getDate(),
                            message: error,
                            stacktrace: JSON.stringify(stack),
                            react_info: JSON.stringify(info),
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DbLogger.prototype.getHistoryDump = function () {
        return this.history.toArray();
    };
    DbLogger.prototype.getErrorDump = function () {
        return this.scriptError.toArray();
    };
    DbLogger.prototype.getConsoleDump = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4, this.log.toArray()];
                    case 1:
                        _a.log = _b.sent();
                        return [4, this.error.toArray()];
                    case 2:
                        _a.error = _b.sent();
                        return [4, this.warning.toArray()];
                    case 3:
                        _a.warning = _b.sent();
                        return [4, this.info.toArray()];
                    case 4: return [2, (_a.info = _b.sent(),
                            _a)];
                }
            });
        });
    };
    DbLogger.prototype.exportDB = function () {
        return dexie_export_import_1.exportDB(this);
    };
    return DbLogger;
}(dexie_1.default));
exports.dbLogger = new DbLogger();
//# sourceMappingURL=DbLogger.js.map