import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import sharedStyles from '../views/Styles';
import { getReadableVersion } from '../../utils/deviceInfo';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    ...sharedStyles.textRegular,
    fontSize: 13,
  },
  bold: {
    ...sharedStyles.textSemibold,
  },
});

const AppVersion = React.memo(({ }) => (
  <View style={styles.container}>
    <Text style={[styles.text, { color: '#9ca2a8' }]}>
      Version
      <Text style={styles.bold}>{getReadableVersion}</Text>
    </Text>
  </View>
));

AppVersion.propTypes = {
  theme: PropTypes.string,
};

export default AppVersion;
