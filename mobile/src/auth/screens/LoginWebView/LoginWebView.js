import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import {
  OAUTH_REDIRECT_URL,
  OAUTH_AUTHORIZE_URL,
  OAUTH_CLIENT_ID
} from 'react-native-dotenv';

import QueryStringUtils from '../../utils/queryString';

const LoginWebView = ({
  login,
  loginInProgress,
  loggedIn,
  error,
  navigation
}) => {
  const onNavigationStateChange = ({ url }) => {
    if (loginInProgress || loggedIn || error) {
      return;
    }

    if (url.startsWith(OAUTH_REDIRECT_URL)) {
      const codeUrlParam = QueryStringUtils.getParameterByName('code', url);
      if (codeUrlParam) {
        console.debug('CERN OAuth code:', codeUrlParam);
        login(codeUrlParam);
      }
      navigation.goBack();
    }
  };

  const url = `${OAUTH_AUTHORIZE_URL}?redirect_uri=${OAUTH_REDIRECT_URL}&client_id=${OAUTH_CLIENT_ID}&response_type=code`;
  console.debug('WebView loading:', url);
  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

LoginWebView.propTypes = {
  login: PropTypes.func.isRequired,
  loginInProgress: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string
  })
};

LoginWebView.defaultProps = {
  error: null
};

export default LoginWebView;
