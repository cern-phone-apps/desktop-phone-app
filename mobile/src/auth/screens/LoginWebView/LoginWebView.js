import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import QueryStringUtils from '../../utils/queryString';

const OAUTH_REDIRECT_URL = 'https://webrtc-auth.web.cern.ch/';
const OAUTH_AUTHORIZE_URL = 'https://oauth.web.cern.ch/OAuth/Authorize';
const OAUTH_CLIENT_ID = 'webrtc_auth';

const LoginWebView = ({
  login,
  setAuthenticated,
  getMe,
  loginInProgress,
  loggedIn,
  error,
  navigation
}) => {
  let webview = null;

  const onNavigationStateChange = async ({ url, loading }) => {
    if (loginInProgress || loggedIn || error || loading) {
      return;
    }

    if (url.startsWith(OAUTH_REDIRECT_URL)) {
      const codeUrlParam = QueryStringUtils.getParameterByName('code', url);
      if (codeUrlParam) {
        console.debug('CERN OAuth code:', codeUrlParam);
        webview.stopLoading();
        navigation.goBack();
        try {
          const result = await login(codeUrlParam);
          if (!result.error) {
            setAuthenticated();
            getMe();
          } else {
            console.error('Unable to login the user');
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const url = `${OAUTH_AUTHORIZE_URL}?redirect_uri=${OAUTH_REDIRECT_URL}&client_id=${OAUTH_CLIENT_ID}&response_type=code`;
  console.debug('WebView loading:', url);
  return (
    <WebView
      ref={ref => (webview = ref)}
      source={{ uri: url }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

LoginWebView.propTypes = {
  login: PropTypes.func.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired,
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
