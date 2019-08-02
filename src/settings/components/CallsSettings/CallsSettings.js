import React from "react";
import { Header } from "semantic-ui-react";
import { translate } from "react-i18next";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import CallForwardingSettings from "settings/components/CallForwardingSettings/CallForwardingSettings";

export const CallsSettings = () => {
  return (
    <div>
      <ErrorBoundary>
        <Header as={"h4"}>{"Calls Settings"}</Header>
        <CallForwardingSettings/>
      </ErrorBoundary>
    </div>
  );
};

export default translate("settings")(CallsSettings);
