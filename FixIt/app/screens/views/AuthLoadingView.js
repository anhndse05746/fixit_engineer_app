import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// import StatusBar from '../containers/StatusBar';
import {themes} from '../../config/themes';

import sharedStyles from './Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    paddingTop: 10,
    ...sharedStyles.textRegular,
    ...sharedStyles.textAlignCenter,
  },
});

const AuthLoadingView = React.memo(({text}) => (
  <View
    style={[styles.container, {backgroundColor: themes.light.backgroundColor}]}>
    {/* <StatusBar /> */}
    {/* {text && ( */}
    <>
      <ActivityIndicator color={themes.light.auxiliaryText} size="large" />
      <Text
        style={[
          styles.text,
          {color: themes.light.bodyText},
        ]}>{`${text}\nPlease wait`}</Text>
    </>
    {/* )} */}
  </View>
));

const mapStateToProps = (state) => ({
  text: state.app.text,
});

AuthLoadingView.propTypes = {
  text: PropTypes.string,
};

export default connect(mapStateToProps)(AuthLoadingView);
