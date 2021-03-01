"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorPage = void 0;
var React = require("react");
var _1 = require(".");
var DefaultErrorPage = function () {
    var errorCallbacks = React.useContext(_1.ErrorContext);
    var triggerOpen = function () {
        if (typeof (errorCallbacks === null || errorCallbacks === void 0 ? void 0 : errorCallbacks.triggerOpen) === "function") {
            errorCallbacks.triggerOpen();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", { onClick: function () { return triggerOpen(); } }, "Something went wrong!!!!"),
        React.createElement("a", { href: "/" }, "Mainpage")));
};
exports.DefaultErrorPage = DefaultErrorPage;
//# sourceMappingURL=DefaultErrorPage.js.map