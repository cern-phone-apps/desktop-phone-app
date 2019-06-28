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

  DisplayName(name) {
    if (name.length > 20)
      return (<Text h4 style={{height: 50}}>{name}</Text>);
    else
      return (<Text h3 style={{height: 50}}>{name}</Text>);
  }

  render() {
    const { details } = this.props.navigation.state.params;
    const { profile } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
        <View style={{ left: 0, width: '25%' }}>
          <Icon name="ios-contact" type="ionicon" size={100} />
          <Icon name="mail" type="entypo" size={30} />
          <Icon name="location-pin" type="entypo" size={30} />
        </View>
        <View style={{ right: 0, width: '75%' }}>
          {this.DisplayName(details.displayName)}
          <Text h5>
            {details.division}-{details.cernGroup}-{details.cernSection}
          </Text>
          <Text h5 style={{ marginTop: 50 }}>{profile.mail}</Text>
          </View>
      </View>
    );
  }
}
