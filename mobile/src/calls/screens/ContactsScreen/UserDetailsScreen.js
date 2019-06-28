import React from 'react';
import { Text, Icon } from 'react-native-elements';
import { View } from 'react-native';

export default class UserDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'UserDetails'
  };

  componentDidMount() {
    const { details } = this.props.navigation.state.params;
    this.props.findUserById(details.personId);
  }

  renderDetails(iconName, value) {
    return (
      <View style={{ flexDirection: 'row', width: '100%', height: 30, marginTop: 50 }}>
      <View style={{ left: 0, width: '25%', height: 30 }}>
        <Icon name={iconName} type="entypo" size={30} />
      </View>
      <View style={{ right: 0, width: '75%', height: 30 }}>
        <Text h5>{value}</Text>
      </View>
    </View>
    );
  }

  render() {
    const { details } = this.props.navigation.state.params;
    const { profile } = this.props;
    const { physicalDeliveryOfficeName, phones, mail } = profile;
    return (
      <View>
        <View style={{ flexDirection: 'row', width: '100%', height: 100 }}>
          <View style={{ left: 0, width: '25%', height: 100 }}>
              <Icon name="ios-contact" type="ionicon" size={100} />
          </View>
          <View style={{ right: 0, width: '75%', height: 100 }}>
          <Text h3>{details.displayName}</Text>
            <Text h5>
              {details.division}-{details.cernGroup}-{details.cernSection}
            </Text>
          </View>
        </View>
        {this.renderDetails("mail", mail)}
        {this.renderDetails("location-pin", physicalDeliveryOfficeName)}
        {this.renderDetails("phone", (phones) ? phones[phones.length-1].number : "not found")}
        {this.renderDetails("mobile", (phones) ? (phones[phones.length-1].number).substr(phones[phones.length-1].number.length-5, 5) : "not found")}
      </View>
    );
  }
}
