import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from './Styles';
import PTButton from '../commonComponent/Button';
import {calcScale} from '../../utils/dimension';
import {changePassword} from '../../store/user';
import constants from '../../utils/constants';
import {TouchableOpacity} from 'react-native';

const ChangePasswordView = ({route, navigation}) => {
  const [oldPassword, setOldPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const [oldSecure, setOldSecure] = React.useState(true);
  const [secure, setSecure] = React.useState(true);
  const [resecure, setResecure] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [matchedPassword, setMatchedPassword] = React.useState(false);

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setErrorMessage('');
      setMatchedPassword(false);
      setConstructorHasRun(true);
    }
  };
  constructor();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const {changePassMessage} = data;

  const validateThenNavigate = () => {
    if (oldPassword === '') {
      setErrorMessage(' không được để trống');
    } else if (password === '') {
      setErrorMessage(' không được để trống');
    } else if (repassword === '') {
      setErrorMessage(' không được để trống');
    } else if (
      password !== '' &&
      repassword !== '' &&
      password !== repassword
    ) {
      setMatchedPassword(true);
      setErrorMessage(' không trùng với mật khẩu');
    } else {
      setErrorMessage('');
      setMatchedPassword(false);
      console.log('dispatch');
      dispatch(
        changePassword(data.phoneNumber, data.token, oldPassword, password),
      );
    }
  };

  useEffect(() => {
    if (changePassMessage == constants.RESET_PASSWORD_SUCCESSFULLY) {
      navigation.navigate('HomeView');
    }
  }, [changePassMessage]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text
            style={[
              styles.textRegular,
              {marginTop: calcScale(15), fontSize: calcScale(22)},
            ]}>
            <TouchableOpacity
              style={{paddingRight: calcScale(20)}}
              onPress={() => navigation.navigate('HomeView')}>
              <Icon name="arrow-left" size={calcScale(22)} color="#000" />
            </TouchableOpacity>
            Đổi mật khẩu
          </Text>
          <Text>{changePassMessage}</Text>
          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Mật khẩu cũ<Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="nguyenvana123"
                onChangeText={(password) => setOldPassword(password.trim())}
                secureTextEntry={oldSecure}
                rightIcon={
                  oldPassword != '' ? (
                    <View style={styles.row}>
                      <Icon
                        name={oldSecure ? 'eye-slash' : 'eye'}
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setOldSecure(!oldSecure)}
                        style={{marginRight: calcScale(5)}}
                      />
                      <Icon
                        name="times-circle"
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setOldPassword('')}
                      />
                    </View>
                  ) : null
                }
                value={oldPassword}
                errorMessage={
                  errorMessage !== '' && oldPassword === ''
                    ? 'Mật khẩu cũ' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Mật khẩu mới<Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="nguyenvana123"
                onChangeText={(password) => setPassword(password.trim())}
                secureTextEntry={secure}
                rightIcon={
                  password != '' ? (
                    <View style={styles.row}>
                      <Icon
                        name={secure ? 'eye-slash' : 'eye'}
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setSecure(!secure)}
                        style={{marginRight: calcScale(5)}}
                      />
                      <Icon
                        name="times-circle"
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setPassword('')}
                      />
                    </View>
                  ) : null
                }
                value={password}
                errorMessage={
                  errorMessage !== '' && password === ''
                    ? 'Mật khẩu' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Nhập lại mật khẩu <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="nguyenvana123"
                onChangeText={(repassword) => setRepassword(repassword.trim())}
                secureTextEntry={resecure}
                rightIcon={
                  repassword != '' ? (
                    <View style={styles.row}>
                      <Icon
                        name={resecure ? 'eye-slash' : 'eye'}
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setResecure(!resecure)}
                        style={{marginRight: calcScale(5)}}
                      />
                      <Icon
                        name="times-circle"
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setRepassword('')}
                      />
                    </View>
                  ) : null
                }
                value={repassword}
                errorMessage={
                  (errorMessage !== '' && repassword === '') || matchedPassword
                    ? 'Nhập lại mật khẩu' + errorMessage
                    : ''
                }
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <PTButton
              title="Xác nhận"
              onPress={() => {
                validateThenNavigate();
              }}
              style={styles.button}
              color="#fff"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingHorizontal: calcScale(30),
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
  },
  input: {
    marginTop: calcScale(10),
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(30),
    color: '#000',
  },
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    padding: 0,
  },
  button: {
    marginTop: calcScale(20),
    width: '100%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
  },
  footerContainer: {
    justifyContent: 'center',
    marginHorizontal: calcScale(40),
  },
  row: {
    ...CommonStyles.row,
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    marginTop: calcScale(15),
  },
});
