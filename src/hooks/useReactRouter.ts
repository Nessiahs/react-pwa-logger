import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dbLogger } from "../DbLogger";

export const useReactRouter = () => {
  let location = useLocation();

  const [path, setPath] = useState("");
  useEffect(() => {
    if (location.pathname !== path) {
      setPath(location.pathname);
      dbLogger.setPageId();
    }
  }, [location, path, setPath]);
};
