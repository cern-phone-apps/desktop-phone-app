import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  hangupButtonContainer: {
    alignItems: 'center'
  },
  hangupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#f12121',
    borderRadius: 50,
    transform: [{ rotate: '135deg' }]
  }
});

class HangupForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.shape({
      hangUpCurrentCallAction: PropTypes.func.isRequired
    }).isRequired
  };

  hangupCall = () => {
    const { phoneService } = this.props;
    console.log(`Hanging up call`);
    phoneService.hangUpCurrentCallAction();
  };

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    return (
      <View style={styles.hangupButtonContainer}>
        <TouchableOpacity style={styles.hangupButton} onPress={this.hangupCall}>
          <Icon
            name="call"
            size={25}
            color="white"
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withPhoneService(HangupForm);
