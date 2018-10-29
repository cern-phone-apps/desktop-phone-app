import React from "react";
import CallsScreenContainer from "calls/containers/screens/CallsScreen/CallsScreenContainer";
import { callsRoute } from "calls/routes";

export const callsMain = () => {
  return <CallsScreenContainer />;
};

export const callsRoutes = t => {
  return [
    {
      ...callsRoute,
      sidebarText: t("calls"),
      sidebarIcon: "phone",
      sidebarId: "calls",
      main: callsMain
    }
  ];
};
