import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';

const styles = StyleSheet.create({
  indicator: {
    padding: 16,
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PortalActivityIndicator = ({theme, absolute, ...props}) => (
  <ActivityIndicator
    style={[styles.indicator, absolute && styles.absolute]}
    color="#9ca2a8"
    {...props}
  />
);

PortalActivityIndicator.propTypes = {
  theme: PropTypes.string,
  absolute: PropTypes.bool,
  props: PropTypes.object,
};

PortalActivityIndicator.defaultProps = {
  theme: 'light',
};

export default PortalActivityIndicator;
