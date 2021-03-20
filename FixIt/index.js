/**
 * @format
 */
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import firebase from './app/config/firebaseConfig'

if (__DEV__) {
} else {
  console.log = () => { };
  console.time = () => { };
  console.timeEnd = () => { };
  console.timeLog = () => { };
  console.warn = () => { };
  console.count = () => { };
  console.countReset = () => { };
  console.error = () => { };
  console.info = () => { };
}

AppRegistry.registerComponent(appName, () => require('./app/index').default);
