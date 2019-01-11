import React from "react";
import { Header } from "semantic-ui-react";
import { translate } from "react-i18next";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";

export const CallsSettings = () => {
  return (
    <div>
      <ErrorBoundary>
        <Header as={"h4"}>{"Calls Settings"}</Header>
        {"Call settings will go here"}
      </ErrorBoundary>
    </div>
  );
};

export default translate("settings")(CallsSettings);
