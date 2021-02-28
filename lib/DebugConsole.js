"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugConsole = void 0;
var React = require("react");
var _1 = require(".");
var dump_1 = require("./dump");
var DebugConsole = function () {
    var _a;
    var context = React.useContext(_1.ErrorContext);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "js-logger-header" },
            React.createElement("div", null,
                "js-logger console for ",
                context.projectName),
            React.createElement("div", { className: "js-logger-close", onClick: context.closeConsole }, "X")),
        React.createElement("div", null,
            context.consoleText,
            React.createElement("a", { href: "mailto:" + context.mailTo + "?subject=" + escape((_a = context.emailSubject) !== null && _a !== void 0 ? _a : "") }, context.mailTo),
            React.createElement("p", null,
                React.createElement("button", { onClick: function () { return dump_1.dump(); } }, "Download")))));
};
exports.DebugConsole = DebugConsole;
//# sourceMappingURL=DebugConsole.js.map