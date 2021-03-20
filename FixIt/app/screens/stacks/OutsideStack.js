import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {calcScale} from '../../utils/dimension';
import ConfirmPhoneView from '../views/ForgetPasswordView/ConfirmPhoneView';
import ForgetPasswordView from '../views/ForgetPasswordView/ForgetPasswordView';
import ResetPasswordView from '../views/ForgetPasswordView/ResetPasswordView';
import LoginView from '../views/LoginView';
import OTPView from '../views/RegisterView/OTPView';
import RegisterView from '../views/RegisterView/RegisterView';

const OutsideStack = createStackNavigator();
const OutsideStackNavigator = () => {
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
