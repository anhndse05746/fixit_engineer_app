import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from '../Styles';
import PTButton from '../../commonComponent/Button';
import { calcScale } from '../../../utils/dimension';
import { resetPassword, resetMessage } from '../../../store/resetPassword';

const ResetPasswordView = ({ route, navigation }) => {
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const [secure, setSecure] = React.useState(true);
  const [resecure, setResecure] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [matchedPassword, setMatchedPassword] = React.useState(false);

  //phone
  const phone = route.params.phone;

  const dispatch = useDispatch();
  const { isReset, message } = useSelector((state) => state.resetPassword);

  const validateThenNavigate = () => {
    if (password === '') {
      setErrorMessage(' không được để trống');
    } else if (repassword === '') {
      setErrorMessage(' không được để trống');
    } else if (
      password !== '' &&
      repassword !== '' &&
      password !== repassword
    ) {
      setMatchedPassword(true);
      setErrorMessage(' Không trùng với Password');
    } else {
      setErrorMessage('');
      navigation.navigate('LoginView');
    }
  };

  useEffect(() => {
    if (isReset == true) {
      alert(message);
      dispatch({ type: resetMessage.type })
      validateThenNavigate();
    }
  }, [isReset]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text
            style={[
              styles.textRegular,
              { marginTop: calcScale(15), fontSize: calcScale(22) },
            ]}>
            Vui lòng điền những thông tin sau
          </Text>
          {message != '' ? <Text>{message}</Text> : null}
          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Mật khẩu mới<Text style={{ color: 'red' }}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="nguyenvana123"
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={secure}
                rightIcon={
                  password != '' ? (
                    <View style={styles.row}>
                      <Icon
                        name={secure ? 'eye-slash' : 'eye'}
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setSecure(!secure)}
                        style={{ marginRight: calcScale(5) }}
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
                    ? 'Password' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Nhập lại mật khẩu <Text style={{ color: 'red' }}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="nguyenvana123"
                onChangeText={(repassword) => setRepassword(repassword)}
                secureTextEntry={resecure}
                rightIcon={
                  repassword != '' ? (
                    <View style={styles.row}>
                      <Icon
                        name={resecure ? 'eye-slash' : 'eye'}
                        size={calcScale(15)}
                        color="grey"
                        onPress={() => setResecure(!resecure)}
                        style={{ marginRight: calcScale(5) }}
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
                    ? 'Re-enter password' + errorMessage
                    : ''
                }
              />
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <PTButton
              title="Xác nhận"
              onPress={() => {
                dispatch(resetPassword(phone, password));
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

export default ResetPasswordView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingHorizontal: calcScale(30),
  },
  formContainer: {
    justifyContent: 'center',
    marginVertical: calcScale(30),
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
