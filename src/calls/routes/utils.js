import React from 'react';
import CallsScreenContainer from 'calls/screens/CallsScreen/CallsScreenContainer';
import { callsRoute } from 'calls/routes';

export const callsMain = () => <CallsScreenContainer />;

export const callsRoutes = t => [
  {
    ...callsRoute,
    sidebarText: t('calls'),
    sidebarIcon: 'phone',
    sidebarId: 'calls',
    main: callsMain
  }
];
