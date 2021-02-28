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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ErrorContext = void 0;
var React = require("react");
var ConsoleReplace_1 = require("./ConsoleReplace");
var DbLogger_1 = require("./DbLogger");
var DebugConsole_1 = require("./DebugConsole");
var ErrorPage_1 = require("./ErrorPage");
var Portal_1 = require("./Portal");
exports.ErrorContext = React.createContext({});
var defaultConfig = {
    projectName: "js-logger default",
    mailTo: "support@example.com",
    emailSubject: "Error report for js-logger!!",
    consoleText: "An error was detected at the page. To help your developer, download the file and send it to:",
};
var Logger = (function (_super) {
    __extends(Logger, _super);
    function Logger(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        _this.openCount = 10;
        _this.timer = 0;
        _this.logLevel = "warn";
        _this.state = { hasError: false, openCount: 0, isOpen: false };
        _this.config = __assign(__assign({}, defaultConfig), props.config);
        if (props.errorPage) {
            _this.errorPage = props.errorPage;
        }
        if (typeof props.openCount === "number") {
            _this.openCount = props.openCount;
        }
        DbLogger_1.dbLogger.setLogLevel((_a = props.logLevel) !== null && _a !== void 0 ? _a : _this.logLevel);
        if (props.console) {
            ConsoleReplace_1.ConsoleReplace(props.console);
        }
        return _this;
    }
    Logger.prototype.componentDidCatch = function (error, info) {
        this.setState({ hasError: true });
        DbLogger_1.dbLogger.insertError(error.message, error.stack, info);
    };
    Logger.prototype.countOpen = function () {
        var _this = this;
        window.clearTimeout(this.timer);
        this.setState({ openCount: this.state.openCount + 1 });
        if (this.openCount === this.state.openCount) {
            this.setState({ isOpen: true });
            return;
        }
        this.timer = window.setTimeout(function () {
            _this.setState({ openCount: 0 });
        }, 1000);
    };
    Logger.prototype.closeConsole = function () {
        this.setState({ isOpen: false, openCount: 0 });
    };
    Logger.prototype.render = function () {
        var _this = this;
        return (React.createElement(exports.ErrorContext.Provider, { value: __assign({ triggerOpen: function () { return _this.countOpen(); }, closeConsole: function () { return _this.closeConsole(); } }, this.config) },
            this.state.hasError === true ? (React.createElement(ErrorPage_1.ErrorPage, { errorPage: this.errorPage })) : (this.props.children),
            React.createElement(Portal_1.Portal, { isOpen: this.state.isOpen },
                React.createElement(DebugConsole_1.DebugConsole, null))));
    };
    return Logger;
}(React.Component));
exports.Logger = Logger;
//# sourceMappingURL=index.js.map