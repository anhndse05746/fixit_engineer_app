import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from '../Styles';
import PTButton from '../../commonComponent/Button';
import {calcScale} from '../../../utils/dimension';
import ConfirmPhoneView from './ConfirmPhoneView';
import {checkRegisteredUser} from '../../../store/resetPassword';

const ForgetPasswordView = ({navigation}) => {
  const [phone, setPhone] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {isRegistered, message} = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();

  const checkRegistered = (phone) => {
    dispatch(checkRegisteredUser(phone));
  };

  useEffect(() => {
    if (isRegistered == true) {
      navigateOtpScreen();
    }
  }, [isRegistered]);

  const navigateOtpScreen = () => {
    if (phone === '') {
      setErrorMessage(' không được để trống');
    } else if (!/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/.test(phone)) {
      setErrorMessage(' không đúng định dạng');
    } else {
      setErrorMessage('');
      navigation.navigate('ConfirmPhoneView', {phone: phone});
    }
  };

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
            Vui lòng điền số điện thoại đã đăng kí
          </Text>
          <Text
            style={[
              styles.textRegular,
              {marginTop: calcScale(15), fontSize: calcScale(22)},
            ]}>
            {message}
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Số điện thoại <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                placeholder="0123456789"
                onChangeText={(phone) => setPhone(phone)}
                rightIcon={
                  phone != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setPhone('')}
                    />
                  ) : null
                }
                value={phone}
                keyboardType="number-pad"
                errorMessage={
                  errorMessage !== '' && phone === ''
                    ? 'Số điện thoại' + errorMessage
                    : ''
                }
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <PTButton
              title="Tiếp tục"
              onPress={() => {
                checkRegistered(phone);
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

export default ForgetPasswordView;

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
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
  },
  button: {
    marginTop: calcScale(20),
    width: '100%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
  },
  column: {
    flexDirection: 'column',
    marginTop: calcScale(15),
  },
});
