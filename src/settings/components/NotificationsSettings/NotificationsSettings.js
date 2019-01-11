import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";

class NotificationsSettings extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired
  };

  state = {
    permission: "default"
  };

  componentDidMount() {
    this.setState({ permission: Notification.permission });
  }

  requestPermission = () => {
    Notification.requestPermission().then(result => {
      this.setState({ permission: result });
    });
  };

  testNotification = () => {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      new Notification("Hi there!");
    }
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <ErrorBoundary>
          <Header as={"h4"}>{t("notifications.header")}</Header>
          <Form>
            <Form.Field>
              {this.state.permission !== "default" ? (
                <p>
                  You can change the notification settings in your browser
                  preferences.
                </p>
              ) : (
                ""
              )}
              <Button
                disabled={this.state.permission !== "default"}
                color={"blue"}
                onClick={this.requestPermission}
              >
                Request Permission
              </Button>
              <Button
                disabled={this.state.permission !== "granted"}
                onClick={this.testNotification}
              >
                Test Notifications
              </Button>
            </Form.Field>
          </Form>
        </ErrorBoundary>
      </div>
    );
  }
}

export default translate("settings")(NotificationsSettings);
