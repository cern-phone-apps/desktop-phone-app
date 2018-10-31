import React from "react";
import CallsScreenContainer from "calls/screens/CallsScreen/index";
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
