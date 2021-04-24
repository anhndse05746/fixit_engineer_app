import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {calcScale} from '../../../utils/dimension';
import CommonStyles from '../Styles';
import PTButton from '../../commonComponent/Button';
import firebase from '../../../config/firebaseConfig';

const ConfirmPhoneView = ({route, navigation}) => {
  const formatedPhoneNumber = '+84' + route.params.phone;

  //otp states
  const {auth} = firebase();
  const [confirm, setConfirm] = React.useState(null);
  const [code, setCode] = React.useState('');

  //send otp
  const signInWithPhoneNumber = async (phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  //confirm
  const confirmOTP = async () => {
    try {
      await confirm.confirm(code);
      navigation.navigate('ResetPasswordView', {phone: route.params.phone});
    } catch (error) {
      console.log(error);
      alert('Mã OTP không đúng');
    }
  };

  useEffect(() => {
    signInWithPhoneNumber(formatedPhoneNumber);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text style={[styles.textRegular, {marginTop: calcScale(30)}]}>
        Mã OTP đã được gửi đến số điện thoại của bạn.
      </Text>
      <OTPInputView
        style={{width: '80%', height: 100}}
        pinCount={6}
        // code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged={(code) => setCode(code)}
        autoFocusOnLoad
        codeInputFieldStyle={styles.styleBase}
        codeInputHighlightStyle={styles.styleHighLighted}
        onCodeFilled={(code) => setCode(code)}
        editable={true}
      />
      <TouchableOpacity
        onPress={() => signInWithPhoneNumber(formatedPhoneNumber)}>
        <Text style={[styles.textRegular, {textDecorationLine: 'underline'}]}>
          Gửi lại mã OTP.
        </Text>
      </TouchableOpacity>
      <PTButton
        title="Tiếp tục"
        onPress={() => confirmOTP()}
        style={styles.button}
        color="#fff"
      />
    </KeyboardAvoidingView>
  );
};

export default ConfirmPhoneView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  styleBase: {
    width: calcScale(50),
    height: calcScale(50),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgb(229,229,229)',
    color: '#000',
  },
  styleHighLighted: {
    borderColor: 'rgb(0, 0, 60)',
    backgroundColor: '#fff',
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
  button: {
    marginTop: calcScale(20),
    width: '90%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
    position: 'absolute',
    bottom: 0,
  },
});
