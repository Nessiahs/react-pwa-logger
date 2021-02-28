"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReactRouter = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var DbLogger_1 = require("../DbLogger");
var useReactRouter = function () {
    var location = react_router_dom_1.useLocation();
    var _a = react_1.useState(""), path = _a[0], setPath = _a[1];
    react_1.useEffect(function () {
        if (location.pathname !== path) {
            setPath(location.pathname);
            DbLogger_1.dbLogger.setPageId();
        }
    }, [location, path, setPath]);
};
exports.useReactRouter = useReactRouter;
//# sourceMappingURL=useReactRouter.js.map