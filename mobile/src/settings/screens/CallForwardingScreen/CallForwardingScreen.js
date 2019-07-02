import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { RadioButton, List, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { errorMessage } from '../../../common/utils/logging';

const modes = Object.freeze({
  SIMULTANEOUS: 'simultaneous',
  FORWARD_TO: 'forwardto'
});

const styles = StyleSheet.create({
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  }
});

function CallForwardingScreen(props) {
  const [callForwadingEnabled, toggleCallForwarding] = useState(false);
  const [callForwadingMode, setCallForwardingMode] = useState(modes.FORWARD_TO);
  const [isFetching, setIsFetching] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const {
    getCallForwardingStatus,
    disableCallForwarding,
    enableSimultaneousRinging,
    enableCallForwarding,
    activeNumber,
    destinationList,
    navigation
  } = props;

  const fetchData = async () => {
    setIsFetching(true);
    const forwardingData = await getCallForwardingStatus(activeNumber);
    if (forwardingData && forwardingData.payload) {
      const callForwardingStatus = forwardingData.payload['call-forwarding'];
      const simultaneousRingingStatus =
        forwardingData.payload['simultaneous-ring'];
      const forwardingEnabled =
        callForwardingStatus || simultaneousRingingStatus;
      toggleCallForwarding(forwardingEnabled);
      if (forwardingEnabled) {
        setCallForwardingMode(
          simultaneousRingingStatus ? modes.SIMULTANEOUS : modes.FORWARD_TO
        );
      }
      setIsFetching(false);
    } else if (forwardingData === undefined) {
      errorMessage('Forwarding data was not loaded');
    }
  };

  const save = (list = null) => {
    const newList = list || destinationList;
    if (!callForwadingEnabled) {
      disableCallForwarding(activeNumber);
    } else if (callForwadingMode === modes.FORWARD_TO) {
      enableCallForwarding(activeNumber, newList);
    } else {
      enableSimultaneousRinging(activeNumber, newList);
    }
  };

  useEffect(() => {
    if (dataFetched) {
      save();
    }
  }, [callForwadingEnabled, callForwadingMode]);

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
      setDataFetched(true);
    }
  }, []);

  const onChange = val => {
    toggleCallForwarding(val);
  };

  const onChangeMode = mode => {
    setCallForwardingMode(mode);
  };

  const onDeleteNumber = number => {
    const newList = destinationList.filter(n => n === number);
    save(newList);
  };

  if (isFetching) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ListItem
        title="Call Forwarding"
        switch={{ onValueChange: onChange, value: callForwadingEnabled }}
        bottomDivider
      />
      {callForwadingEnabled && (
        <RadioButton.Group
          onValueChange={onChangeMode}
          value={callForwadingMode}
        >
          <View style={styles.radioBtn}>
            <RadioButton value={modes.FORWARD_TO} />
            <Text>Forward to</Text>
          </View>
          <View style={styles.radioBtn}>
            <RadioButton value={modes.SIMULTANEOUS} />
            <Text>Simultaneous ringing</Text>
          </View>
        </RadioButton.Group>
      )}
      <List.Section>
        <List.Subheader>Destination list</List.Subheader>
        {destinationList.map(number => (
          <List.Item
            key={number}
            title={number}
            right={() => (
              <IconButton
                color="#000"
                icon="delete"
                onPress={() => onDeleteNumber(number)}
              />
            )}
          />
        ))}
        <List.Item
          key="add-number"
          title="Add number"
          onPress={() => navigation.navigate('SearchUsers')}
          left={() => <IconButton icon="add" />}
        />
      </List.Section>
    </View>
  );
}

CallForwardingScreen.propTypes = {
  getCallForwardingStatus: PropTypes.func.isRequired,
  activeNumber: PropTypes.string.isRequired,
  destinationList: PropTypes.arrayOf(PropTypes.string).isRequired,
  disableCallForwarding: PropTypes.func.isRequired,
  enableSimultaneousRinging: PropTypes.func.isRequired,
  enableCallForwarding: PropTypes.func.isRequired
};

export default withNavigation(CallForwardingScreen);
