import React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './libs/Navigation';
import {getActiveRouteName} from './utils/navigation';
import {connect} from 'react-redux';
import {
  ROOT_BACKGROUND,
  ROOT_INSIDE,
  ROOT_LOADING,
  ROOT_OUTSIDE,
} from './store/appState';
import AuthLoadingView from './screens/views/AuthLoadingView';
import DrawerInside from './screens/stacks/DrawerStack';
import OutsideStackNavigator from './screens/stacks/OutsideStack';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();
const App = React.memo(({root}) => {
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
          {root === ROOT_LOADING || root === ROOT_BACKGROUND ? (
            <Stack.Screen name="AuthLoading" component={AuthLoadingView} />
          ) : null}
          {/* {root === ROOT_OUTSIDE ? ( */}
          <Stack.Screen name="OutsideStack" component={OutsideStackNavigator} />
          {/* ) : null} */}
          <Stack.Screen name="DrawerInside" component={DrawerInside} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const mapStateToProps = (state) => ({
  root: state.app.root,
});

App.propTypes = {
  root: PropTypes.string,
};

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;
