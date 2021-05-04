import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch, useSelector} from 'react-redux';
import firebase from '../../../config/firebaseConfig';

import {calcScale} from '../../../utils/dimension';
import CommonStyles from '../Styles';
import PTButton from '../../commonComponent/Button';
import {registerUser} from '../../../store/register';
import constants from '../../../utils/constants';

const OTPView = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {message} = useSelector((state) => state.register);
  //user
  const user = {
    phone: route.params.phone,
    name: route.params.name,
    email: route.params.email,
    password: route.params.password,
    district: route.params.district,
    city: route.params.city,
    address: route.params.address,
    identity_card_number: route.params.identity_card_number,
    major_id: route.params.major_id,
  };
  const formatedPhoneNumber = '+84' + user.phone.slice(1);

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
      console.log(
        user.phone,
        user.password,
        user.name,
        user.email,
        user.city,
        user.district,
        user.address,
        user.identity_card_number,
        user.major_id,
      );
      dispatch(
        registerUser(
          user.phone,
          user.password,
          user.name,
          user.email,
          user.city,
          user.district,
          user.address,
          user.identity_card_number,
          user.major_id,
        ),
      );
    } catch (error) {
      console.log(error);
      alert('Mã OTP không đúng');
    }
  };
  //dispatch(registerUser(user.phone, user.password, user.name, user.email))

  useEffect(() => {
    signInWithPhoneNumber(formatedPhoneNumber);
  }, []);

  useEffect(() => {
    if (message === constants.REGISTER_SUCCESSFULLY) {
      alert(constants.REGISTER_SUCCESSFULLY);
      navigation.navigate('LoginView');
    } else if (message !== '') {
      alert(message);
    }
  }, [message]);

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
        onCodeChanged={(code) => setCode(code)}
        autoFocusOnLoad
        codeInputFieldStyle={styles.styleBase}
        codeInputHighlightStyle={styles.styleHighLighted}
        onCodeFilled={(code) => setCode(code)}
      />
      <TouchableOpacity
        onPress={() => signInWithPhoneNumber(formatedPhoneNumber)}>
        <Text style={[styles.textRegular, {textDecorationLine: 'underline'}]}>
          Gửi lại mã OTP.
        </Text>
      </TouchableOpacity>
      <PTButton
        title="Xác nhận"
        onPress={() => confirmOTP()}
        style={styles.button}
        color="#fff"
      />
    </KeyboardAvoidingView>
  );
};

export default OTPView;

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
