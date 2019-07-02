import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, FlatList, View } from 'react-native';
import { Button, ListItem, SearchBar, Text } from 'react-native-elements';

export default class SearchUsersScreen extends React.Component {
  static navigationOptions = {
    title: 'Search users'
  };

  static propTypes = {
    searching: PropTypes.bool,
    searchUsers: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    getSelectedUsers: PropTypes.func.isRequired,
    selection: PropTypes.arrayOf(PropTypes.object),
    formatSearchResults: PropTypes.func
  };

  static defaultProps = {
    selection: [],
    searching: false,
    formatSearchResults: result => result
  };

  state = {
    searchText: null,
    searchResults: []
  };

  keyExtractor = item => item.id;

  onPress = async () => {
    const { searchText } = this.state;
    const { searchUsers } = this.props;
    if (!searchText) {
      this.setState({ searchResults: [] });
      return;
    }
    if (searchText.length < 3) {
      return;
    }

    const result = await searchUsers(searchText);
    this.setState({ searchResults: result.payload });
  };

  onChangeText = searchText => {
    const newState = { searchText };

    if (!searchText) {
      newState.searchResults = [];
    }

    this.setState(newState);
  };

  renderItem = ({ item }) => {
    return <ListItem {...item} />;
  };

  render() {
    const { searchText, searchResults } = this.state;
    const { searching, formatSearchResults } = this.props;
    const formattedSearchResults = formatSearchResults(
      searchResults,
      this.props
    );
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
            data={formattedSearchResults}
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
