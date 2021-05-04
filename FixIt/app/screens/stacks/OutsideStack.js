import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {calcScale} from '../../utils/dimension';
import ConfirmPhoneView from '../views/ForgetPasswordView/ConfirmPhoneView';
import ForgetPasswordView from '../views/ForgetPasswordView/ForgetPasswordView';
import ResetPasswordView from '../views/ForgetPasswordView/ResetPasswordView';
import LoginView from '../views/LoginView';
import OTPView from '../views/RegisterView/OTPView';
import RegisterView from '../views/RegisterView/RegisterView';
import {
  EncryptionKey_TOKEN_KEY,
  TOKEN_KEY,
  USER_KEY,
} from '../../utils/constants';
import userPreferences from '../../libs/UserPreferences';
import {useDispatch} from 'react-redux';
import {usersLoggedIn} from '../../store/user';
import jwt_decode from 'jwt-decode';

const OutsideStack = createStackNavigator();
const OutsideStackNavigator = () => {
  const dispatch = useDispatch();

  const checkToken = async () => {
    const token = await userPreferences.getEncryptData(
      TOKEN_KEY,
      EncryptionKey_TOKEN_KEY,
    );

    if (!token) {
      console.log('DONT HAVE TOKEN');
    } else {
      console.log('HAVE TOKEN');
      const decode = jwt_decode(token);
      const date = new Date();
      if (decode.exp * 1000 - 60000 > date.getTime()) {
        console.log('OK TOKEN');
        const user = await userPreferences.getObjectAsync(USER_KEY);
        dispatch({type: usersLoggedIn.type, payload: user});
        navigation.navigate('DrawerInside');
      } else {
        console.log('TOKEN EXPIRED');
        userPreferences.removeItem(TOKEN_KEY);
      }
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <OutsideStack.Navigator mode="card">
      <OutsideStack.Screen
        name="LoginView"
        component={LoginView}
        options={{headerShown: false}}
      />
      <OutsideStack.Screen
        name="RegisterView"
        component={RegisterView}
        options={{
          title: 'Đăng ký',
          headerTitleStyle: {fontSize: calcScale(30)},
        }}
      />
      <OutsideStack.Screen
        name="OTPView"
        component={OTPView}
        options={{
          title: 'Nhập mã OTP',
          headerTitleStyle: {fontSize: calcScale(30)},
        }}
      />
      <OutsideStack.Screen
        name="ForgetPasswordView"
        component={ForgetPasswordView}
        options={{
          title: 'Quên mật khẩu',
          headerTitleStyle: {fontSize: calcScale(30)},
        }}
      />
      <OutsideStack.Screen
        name="ConfirmPhoneView"
        component={ConfirmPhoneView}
        options={{
          title: 'Nhập mã OTP',
          headerTitleStyle: {fontSize: calcScale(30)},
        }}
      />
      <OutsideStack.Screen
        name="ResetPasswordView"
        component={ResetPasswordView}
        options={{
          title: 'Đặt lại mật khẩu',
          headerTitleStyle: {fontSize: calcScale(30)},
        }}
      />
    </OutsideStack.Navigator>
  );
};

export default OutsideStackNavigator;
