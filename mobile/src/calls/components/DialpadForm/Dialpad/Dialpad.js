import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  mainText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center'
  },
  subText: {
    fontSize: 10,
    textAlign: 'center'
  },
  disabled: {
    opacity: 0.3
  }
});

const Dialpad = ({ updatePhoneNumber, disabled }) => {
  const pad = [
    {
      key: '123',
      columns: [
        { text: 1, subText: '' },
        { text: 2, subText: 'ABC' },
        { text: 3, subText: 'DEF' }
      ]
    },
    {
      key: '456',
      columns: [
        { text: 4, subText: 'GHI' },
        { text: 5, subText: 'JKL' },
        { text: 6, subText: 'MNO' }
      ]
    },
    {
      key: '789',
      columns: [
        { text: 7, subText: 'PQRS' },
        { text: 8, subText: 'TUV' },
        { text: 9, subText: 'VWXYZ' }
      ]
    },
    {
      key: '*0#',
      columns: [
        { text: '*', subText: '' },
        {
          text: 0,
          subText: '+',
          onLongPress: () => updatePhoneNumber('+')
        },
        { text: '#', subText: '' }
      ]
    }
  ];

  return (
    <View style={{ height: 250 }}>
      <Grid>
        {pad.map(row => (
          <Row key={row.key}>
            {row.columns.map(column => (
              <Col key={column.text}>
                <TouchableOpacity
                  activeOpacity={disabled ? 1 : 0.7}
                  onPress={() => !disabled && updatePhoneNumber(column.text)}
                  onLongPress={column.onLongPress}
                >
                  <View>
                    <Text
                      style={[
                        styles.mainText,
                        disabled ? styles.disabled : null
                      ]}
                    >
                      {column.text}
                    </Text>
                    <Text
                      style={[
                        styles.subText,
                        disabled ? styles.disabled : null
                      ]}
                    >
                      {column.subText}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    </View>
  );
};

Dialpad.propTypes = {
  updatePhoneNumber: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Dialpad.defaultProps = {
  disabled: false
};

export default Dialpad;
