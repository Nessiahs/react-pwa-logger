import * as React from "react";
import { DefaultErrorPage } from "./DefaultErrorPage";

export type TErrorPageProps = {
  errorPage?: React.ReactNode;
};

export const ErrorPage: React.FunctionComponent<TErrorPageProps> = ({
  errorPage = <DefaultErrorPage />,
}) => {
  return <>{errorPage}</>;
};
