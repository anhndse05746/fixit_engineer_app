import {encrypt, decrypt} from 'react-native-simple-encryption';

class Encryption {
  constructor() {}

  _encrypt(key, data) {
    return encrypt(key, data);
  }

  _decrypt(key, data) {
    return decrypt(key, data);
  }
}

const encryption = new Encryption();
export default encryption;
