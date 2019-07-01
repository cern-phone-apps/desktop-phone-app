import React from 'react';
import { Text, Icon } from 'react-native-elements';
import { View } from 'react-native';
import MakeCallButton from '../../components/MakeCallButton/MakeCallButton';
import { ActivityIndicator } from 'react-native-paper';

export default class UserDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'UserDetails'
  };

  componentDidMount() {
    const { details } = this.props.navigation.state.params;
    this.props.findUserById(details.personId);
  }

  renderDetails(iconName, value, add_props=null) {
    return (
      <View style={{ flexDirection: 'row', width: '100%', height: 30, marginTop: 20 }}>
      <View style={{ left: 0, width: '30%', height: 30 }}>
        <Icon name={iconName} type="entypo" size={30} />
      </View>
      <View style={{ right: 0, width: '70%', height: 30 }}>
        <Text h5 {...add_props}>{value}</Text>
      </View>
    </View>
    );
  }

  waitingForData(details, profile, physicalDeliveryOfficeName, phones, mail) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%'}}>
        <View style={{ flexDirection: 'row', width: '100%', height: 100 }}>
          <View style={{ left: 0, width: '30%', height: 100 }}>
              <Icon name="ios-contact" type="ionicon" size={100} />
          </View>
          <View style={{ right: 0, width: '70%', height: 100 }}>
          <Text h4 style="textAlign: 'center', width: '100%', backgroundColor: 'rgba(0,0,0,0.1)'">{details.displayName}</Text>
            <Text h5>
              {details.division}-{details.cernGroup}-{details.cernSection}
            </Text>
          </View>
        </View>
        {this.renderDetails("mail", mail)}
        {this.renderDetails("location-pin", physicalDeliveryOfficeName)}
        {(phones && phones[0] && phones[1].number) ? this.renderDetails("phone", phones[1].number) : null}
        {(phones) ? <View style={{ marginTop: 20, width: '95%' }}><MakeCallButton phoneNumber={phones[1].number} /></View> : null}
        {(phones && phones[0] && phones[0].number) ? this.renderDetails("mobile", phones[0].number) : null}
      </View>
    );
  }

  render() {
    const { details } = this.props.navigation.state.params;
    const { profile } = this.props;
    const { physicalDeliveryOfficeName, phones, mail } = profile;

    if (phones && phones[0] && phones[1].number)
      return (this.waitingForData(details, profile, physicalDeliveryOfficeName, phones, mail));
    else
      return (<View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%'}}>
                <ActivityIndicator size='large'/>
              </View>);
  }
}
