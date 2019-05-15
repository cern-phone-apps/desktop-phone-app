import React from "react";
import { Header } from "semantic-ui-react";
import { translate } from "react-i18next";
import {version} from 'common/utils/appInfo'
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";



export const AppInfo = ({ t }) => {

  return (
    <div>
      <ErrorBoundary>
        <Header as={"h4"}>{t("appInfo.header")}</Header>
        <ul>
          <li>
            <strong>{t("appInfo.version")}</strong> {version}
          </li>
        </ul>
      </ErrorBoundary>
    </div>
  );
};

AppInfo.propTypes = {};

export default translate("settings")(AppInfo);
