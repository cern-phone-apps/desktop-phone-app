import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { FlatList, View } from 'react-native';
import moment from 'moment';

export class RecentCallsScreen extends React.Component {
  static navigationOptions = {
    title: 'Recent Calls'
  };

  static propTypes = {
    recentCalls: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    const { navigation } = this.props;

    const printableDate = moment(item.endTime).calendar();
    const duration = moment.duration(
      moment(item.endTime).diff(moment(item.startTime))
    );
    return (
      <ListItem
        title={`${item.name} (${item.phoneNumber})`}
        subtitle={printableDate}
        leftIcon={
          item.incoming
            ? {
                name: 'arrow-downward',
                type: 'ionicons',
                color: item.missed ? 'red' : 'green'
              }
            : {
                name: 'arrow-upward',
                type: 'ionicons',
                color: item.missed ? 'red' : 'green'
              }
        }
        rightIcon={{ name: 'phone', type: 'font-awesome' }}
        rightSubtitle={item.missed ? 'missed' : duration.humanize()}
        bottomDivider
        onPress={() => {
          navigation.navigate('RecentCallDetails', {
            phoneNumber: item.phoneNumber,
            recentCall: item
          });
        }}
      />
    );
  };

  render() {
    const { recentCalls } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* other code from before here */}
        <FlatList
          keyExtractor={this.keyExtractor}
          data={recentCalls}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default RecentCallsScreen;
