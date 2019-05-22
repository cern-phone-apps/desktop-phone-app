import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, FlatList, View } from 'react-native';
import { Button, Icon, ListItem, SearchBar, Text } from 'react-native-elements';

export default class SearchUsersScreen extends React.Component {
  static navigationOptions = {
    title: 'Search users'
  };

  static propTypes = {
    searching: PropTypes.bool,
    searchUsers: PropTypes.func.isRequired,
    addUserContact: PropTypes.func.isRequired,
    getUserContacts: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    contacts: [],
    searching: false
  };

  state = {
    searchText: null,
    searchResults: []
  };

  keyExtractor = item => item.personId;

  onPress = () => {
    const { searchText } = this.state;

    if (!searchText) {
      this.setState({ searchResults: [] });
      return;
    }
    if (searchText.length < 3) {
      return;
    }

    const { searchUsers } = this.props;
    searchUsers(searchText).then(result => {
      this.setState({ searchResults: result.payload });
    });
  };

  onChangeText = searchText => {
    const newState = { searchText };

    if (!searchText) {
      newState.searchResults = [];
    }

    this.setState(newState);
  };

  renderItem = ({ item }) => {
    const { addUserContact, getUserContacts, contacts } = this.props;
    const isAlreadyInUserContacts = !!contacts.find(
      contact => parseInt(contact.personId, 10) === parseInt(item.personId, 10)
    );

    const rightIcon = isAlreadyInUserContacts ? (
      <Icon type="font-awesome" name="check-square" color="green" />
    ) : (
      <Icon
        type="font-awesome"
        name="plus"
        onPress={() => addUserContact(item).then(() => getUserContacts())}
      />
    );

    return (
      <ListItem
        title={`${item.displayName} (${item.division})`}
        leftIcon={{ name: 'user', type: 'font-awesome' }}
        rightIcon={rightIcon}
        bottomDivider
      />
    );
  };

  render() {
    const { searchText, searchResults } = this.state;
    const { searching } = this.props;
    console.log(searchResults);
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <View style={{ flex: 3, justifyContent: 'space-around' }}>
            <SearchBar
              placeholder="Search for users"
              onChangeText={this.onChangeText}
              value={searchText}
              style={{ backgroundColor: 'none' }}
              onClear={() =>
                this.setState({ searchText: '', searchResults: [] })
              }
              lightTheme
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#E1E8EE',
              paddingRight: 10
            }}
          >
            <Button
              title="Search"
              onPress={this.onPress}
              loading={searching}
              disabled={!searchText || searchText.length < 3}
            />
          </View>
        </View>
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={searchResults}
            renderItem={this.renderItem}
            refreshing={searching}
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
                  There are no users matching your search criterion
                </Text>
              )
            }
          />
        </View>
      </View>
    );
  }
}
