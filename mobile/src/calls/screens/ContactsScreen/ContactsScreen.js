import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Text } from 'react-native-elements';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacts'
  };

  static propTypes = {
    searching: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    // getUserContacts: PropTypes.func.isRequired,
    // removeUserContact: PropTypes.func.isRequired
  };

  componentDidMount() {
    // const { getUserContacts } = this.props;
    // getUserContacts();
  }

  keyExtractor = item => item.personId.toString();

  renderItem = ({ item }) => {
    // const { getUserContacts, removeUserContact } = this.props;
    const getUserContacts = () => [];
    const removeUserContact = () => {};
    return (
      <ListItem
        title={`${item.displayName} (${item.division})`}
        leftIcon={{ name: 'user', type: 'font-awesome' }}
        rightIcon={{
          name: 'user-times',
          type: 'font-awesome',
          onPress: () =>
            removeUserContact(item.personId).then(() => getUserContacts())
        }}
        bottomDivider
      />
    );
  };

  render() {
    const { searching, contacts } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={contacts}
          renderItem={this.renderItem}
          ListEmptyComponent={() =>
            searching ? (
              <ActivityIndicator size="large" style={{ paddingTop: 100 }} />
            ) : (
              <Text
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                Currently you do not have any contacts
              </Text>
            )
          }
        />
      </View>
    );
  }
}
