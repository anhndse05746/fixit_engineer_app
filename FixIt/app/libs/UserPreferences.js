import AsyncStorage from '@react-native-async-storage/async-storage';
import Encryption from '../libs/encryption';
// import helper from '../utils/helper';

class UserPreferences {
  constructor() {}

  setEncryptData = async (key, data, encryptKey) => {
    try {
      const _data = Encryption._encrypt(encryptKey, data);
      await AsyncStorage.setItem(key, _data);
    } catch (error) {
      console.log(`[UserPrefernces] Error when storing encrypt data: ${error}`);
    }
  };

  getEncryptData = async (key, encryptKey) => {
    try {
      const _data = await AsyncStorage.getItem(key);
      return Encryption._decrypt(encryptKey, _data);
    } catch (error) {
      console.log(
        `[UserPrefernces] Error while reading encrypt data: ${error}`,
      );
    }
  };

  setStringAsync = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log(`[UserPrefernces] Error while storing string data: ${error}`);
    }
  };

  getStringAsync = async (key) => {
    try {
      await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(`[UserPrefernces] Error while reading string data: ${error}`);
    }
  };

  setObjectAsync = async (key, data) => {
    try {
      const _data = JSON.stringify(data);
      const value = await AsyncStorage.setItem(key, _data);
      if (value !== null) {
        console.log('[UserPrefernces] Value previously stored');
      }
    } catch (error) {
      console.log(`[UserPrefernces] Error while storing object data: ${error}`);
    }
  };

  getObjectAsync = async (key) => {
    try {
      const _data = await AsyncStorage.getItem(key);
      return JSON.parse(_data);
    } catch (error) {
      console.log(`[UserPrefernces] Error while reading object data: ${error}`);
    }
  };

  removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(`[UserPrefernces] Error while removing data: ${error}`);
    }
  };
}

const userPreferences = new UserPreferences();
export default userPreferences;
