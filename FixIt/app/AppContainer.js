import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Navigation from './libs/Navigation';
import DrawerInside from './screens/stacks/DrawerStack';
import OutsideStackNavigator from './screens/stacks/OutsideStack';
import { getActiveRouteName } from './utils/navigation';

import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();
const App = () => {

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    //navigation.navigate(remoteMessage.data.screen, { requestData: { id: remoteMessage.data.requestId } });

  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.screen);
  });

  React.useEffect(() => {
    const state = Navigation.navigationRef.current?.getRootState();
    const currentRouteName = getActiveRouteName(state);
    Navigation.routeNameRef.current = currentRouteName;
  }, []);

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer
      ref={Navigation.navigationRef}
      onStateChange={(state) => {
        const previousRouteName = Navigation.routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          // TO DO
        }
        Navigation.routeNameRef.current = currentRouteName;
      }}>
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="OutsideStack" component={OutsideStackNavigator} />
          <Stack.Screen name="DrawerInside" component={DrawerInside} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  root: state.app.root,
});

App.propTypes = {
  root: PropTypes.string,
};

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;
