import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, Linking } from 'react-native';
import { Card, Button, Icon, Overlay } from 'react-native-elements';
import RegisterForm from '../../components/RegisterForm/RegisterFormContainer';

export default class RegisterScreen extends React.Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    numbers: PropTypes.arrayOf(PropTypes.object),
    getUserPhoneNumbers: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  static defaultProps = {
    token: '',
    numbers: []
  };

  static navigationOptions = {
    title: 'Select a phone number'
  };

  state = {
    overlayVisible: false
  };

  componentDidMount = () => {
    const { getUserPhoneNumbers } = this.props;
    getUserPhoneNumbers();
  };

  componentDidUpdate = () => {
    const { connected, navigation } = this.props;

    if (connected) {
      navigation.navigate('AppRegistered');
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    const { token } = this.props;
    return <RegisterForm phoneNumber={item.phoneNumber} token={token} />;
  };

  render = () => {
    const { numbers } = this.props;
    const { overlayVisible } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={() => this.setState({ overlayVisible: false })}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 34 }}>About Certificates</Text>
            <Text
              style={{
                textAlign: 'justify'
              }}
            >
              This application requires CERN Certificates to work. Please,
              follow the steps to install them from the following link and come
              back to the application. You may need to restart the application
              afterwards.
            </Text>
            <Button
              title="https://cafiles.cern.ch/cafiles/certificates/Grid.aspx"
              type="clear"
              onPress={() => {
                Linking.openURL(
                  'https://cafiles.cern.ch/cafiles/certificates/Grid.aspx'
                );
              }}
            />
            <Button
              title="Close"
              onPress={() => this.setState({ overlayVisible: false })}
            />
          </View>
        </Overlay>

        <FlatList
          keyExtractor={this.keyExtractor}
          data={numbers}
          renderItem={this.renderItem}
        />
        <View style={{ flex: 1, backgroundColor: '000' }}>
          <Card
            title={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#d4d4d4',
                  borderBottomWidth: 1
                }}
              >
                <Icon name="info-circle" type="font-awesome" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}
                >
                  {' '}
                  About Certificates
                </Text>
              </View>
            }
          >
            <Text style={{ marginTop: 5 }}>
              Please, install the CERN certificates and come back to this screen
              if you haven&apos;t done it yet.
            </Text>
            <Button
              title="More info"
              onPress={() => this.setState({ overlayVisible: true })}
              type="clear"
            />
          </Card>
        </View>
      </View>
    );
  };
}
