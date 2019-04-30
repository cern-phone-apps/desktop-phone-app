import React from "react";
import { Header } from "semantic-ui-react";
import { translate } from "react-i18next";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import CallForwardingFormContainer from "settings/components/CallForwardingSettings/CallForwardingForm/CallForwardingFormContainer";

export class CallForwardingSettings extends React.Component {
  render = () => {
    return (
      <ErrorBoundary>
        <Header as={"h4"}>{"Call Forwarding"}</Header>
        <CallForwardingFormContainer />
      </ErrorBoundary>
    );
  };
}

export default translate("settings")(CallForwardingSettings);
