import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import Navigation from './libs/Navigation';
import DrawerInside from './screens/stacks/DrawerStack';
import OutsideStackNavigator from './screens/stacks/OutsideStack';
import {getActiveRouteName} from './utils/navigation';

const Stack = createStackNavigator();
const App = () => {
  React.useEffect(() => {
    const state = Navigation.navigationRef.current?.getRootState();
    const currentRouteName = getActiveRouteName(state);
    Navigation.routeNameRef.current = currentRouteName;
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
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
