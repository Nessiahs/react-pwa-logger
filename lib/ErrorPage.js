"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorPage = void 0;
var React = require("react");
var DefaultErrorPage_1 = require("./DefaultErrorPage");
var ErrorPage = function (_a) {
    var _b = _a.errorPage, errorPage = _b === void 0 ? React.createElement(DefaultErrorPage_1.DefaultErrorPage, null) : _b;
    return React.createElement(React.Fragment, null, errorPage);
};
exports.ErrorPage = ErrorPage;
//# sourceMappingURL=ErrorPage.js.map