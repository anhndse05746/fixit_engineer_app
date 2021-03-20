import {AppState} from 'react-native';
import {APP_STATE} from '../actions/actionTypes';

export default () => (createStore) => (...args) => {
  const store = createStore(...args);

  let currentState = '';

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState != 'inactive') {
      if (currentState !== nextAppState) {
        let type;
        if (nextAppState === 'active') {
          type = APP_STATE.FOREGROUND;
        } else if (nextAppState === 'background') {
          typr = APP_STATE.BACKGROUND;
        }
        if (type) {
          store.dispatch({
            type,
          });
        }
      }
      currentState = nextAppState;
    }
  };

  AppState.addEventListener('change', handleAppStateChange);

  setTimeout(() => handleAppStateChange(AppState.currentState));
  return store;
};
