import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';
import { logMessage } from '../../../common/utils/logging';
import Dialpad from './Dialpad/Dialpad';

const styles = StyleSheet.create({
  phoneNumberRow: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width
  },
  phoneNumberSideColumn: {
    width: Dimensions.get('screen').width / 7,
    alignSelf: 'center'
  },
  phoneNumberCenterColumn: {
    width: (Dimensions.get('screen').width / 7) * 5
  },
  phoneNumberInput: {
    textAlign: 'center',
    color: 'black',
    fontSize: 30
  },
  callButtonContainer: {
    alignItems: 'center'
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#0fd859',
    borderRadius: 50
  },
  disabled: {
    opacity: 0.3
  }
});

class DialpadForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.shape({
      makeCall: PropTypes.func.isRequired
    }).isRequired,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    disabled: false
  };

  state = {
    phoneNumber: ''
  };

  updatePhoneNumber = newValue => {
    this.setState(state => ({
      phoneNumber: state.phoneNumber + newValue
    }));
  };

  deleteOneNumber = () => {
    this.setState(state => ({
      phoneNumber: state.phoneNumber.slice(0, state.phoneNumber.length - 1)
    }));
  };

  deleteWholeNumber = () => {
    this.setState({
      phoneNumber: ''
    });
  };

  /**
   * Register the user in the Telephony Backend
   */
  makeCall = () => {
    const { phoneNumber } = this.state;
    const { phoneService, navigation } = this.props;
    logMessage(`Calling user ${phoneNumber}`);
    phoneService.makeCall(undefined, phoneNumber);
    navigation.navigate('Calling');
  };

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    const { phoneNumber } = this.state;
    const { disabled } = this.props;
    return (
      <View>
        <View style={styles.phoneNumberRow}>
          <View style={styles.phoneNumberSideColumn} />
          <View style={styles.phoneNumberCenterColumn}>
            <TextInput
              style={styles.phoneNumberInput}
              value={phoneNumber}
              editable={false}
            />
          </View>
          <View style={styles.phoneNumberSideColumn}>
            <TouchableOpacity
              activeOpacity={disabled ? 1 : 0.3}
              onPress={() => !disabled && this.deleteOneNumber()}
              onLongPress={() => !disabled && this.deleteWholeNumber()}
            >
              <Icon name="backspace" />
            </TouchableOpacity>
          </View>
        </View>
        <Dialpad
          updatePhoneNumber={this.updatePhoneNumber}
          disabled={disabled}
        />
        <View style={styles.callButtonContainer}>
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.5}
            style={[styles.callButton, disabled ? styles.disabled : null]}
            onPress={() => !disabled && phoneNumber && this.makeCall()}
          >
            <Icon name="phone" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(withPhoneService(DialpadForm));
