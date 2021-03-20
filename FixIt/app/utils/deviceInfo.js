import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const hasNotch = DeviceInfo.hasNotch();
export const isIOS = Platform.OS === 'ios';
export const isAndroid = !isIOS;
export const getReableVersion = DeviceInfo.getReableVersion();
export const getBundleId = DeviceInfo.getBundleId();
export const getDeviceModel = DeviceInfo.getModel();

export const supportSystemTheme = () => {
  const systemVersion = parseInt(DeviceInfo.getSystemVersion(), 10);
  return systemVersion >= (isIOS ? 13 : 10);
};

export const isTablet = DeviceInfo.isTablet();
