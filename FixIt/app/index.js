import {Provider as PaperProvider} from 'react-native-paper';
import React, {useEffect} from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {Provider, useDispatch} from 'react-redux';
import RNScreens from 'react-native-screens';
import store from './store/configureStore';
import AppContainer from './AppContainer';

import RNBootSplash from 'react-native-bootsplash';

RNScreens.enableScreens();

const Root = () => {
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      RNBootSplash.show({fade: true});
      setConstructorHasRun(true);
    }
  };

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  constructor();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default Root;
