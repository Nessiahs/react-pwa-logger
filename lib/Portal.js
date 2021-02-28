"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = void 0;
var React = require("react");
var react_dom_1 = require("react-dom");
var Portal = function (_a) {
    var isOpen = _a.isOpen, children = _a.children;
    var portalRoot = document.documentElement;
    var el = document.createElement("div");
    el.classList.add("js-debug-console");
    React.useEffect(function () {
        if (isOpen === false) {
            return;
        }
        if (children) {
            portalRoot.appendChild(el);
        }
        return function () {
            portalRoot.removeChild(el);
        };
    }, [children, isOpen, portalRoot, el]);
    return react_dom_1.createPortal(children, el);
};
exports.Portal = Portal;
//# sourceMappingURL=Portal.js.map