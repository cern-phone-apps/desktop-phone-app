import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Text } from 'react-native-elements';
import { FlatList, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacts'
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    getUserContacts: PropTypes.func.isRequired,
    removeUserContact: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getUserContacts } = this.props;
    getUserContacts();
  }

  keyExtractor = item => item.personId.toString();

  renderItem = ({ item }) => {
    const { getUserContacts, removeUserContact, navigation } = this.props;
    // const getUserContacts = () => [];
    // const removeUserContact = () => {};
    return (
      <ListItem
        onPress={() => navigation.navigate('UserDetails', { details: item })}
        title={`${item.displayName} (${item.division})`}
        leftAvatar={{ title: item.displayName[0] }}
        rightIcon={
          <IconButton
            icon="clear"
            onPress={async () => {
              await removeUserContact(item.personId);
              getUserContacts();
            }}
          />
        }
        bottomDivider
      />
    );
  };

  render() {
    const { contacts } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={contacts}
          renderItem={this.renderItem}
          ListEmptyComponent={
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
          }
        />
      </View>
    );
  }
}
