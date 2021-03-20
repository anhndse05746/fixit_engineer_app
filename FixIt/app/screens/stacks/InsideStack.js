import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {calcScale} from '../../utils/dimension';
import AnnoucementView from '../views/AnnouncementView';
import AddressListView from '../views/CreateRequestView/AddressListView';
import ConfirmRequestView from '../views/CreateRequestView/ConfirmRequestView';
import CreateAddressView from '../views/CreateRequestView/CreateAddressView';
import CreateRequestView from '../views/CreateRequestView/CreateRequestView';
import HomeView from '../views/HomeView';
import MyProfileView from '../views/MyProfileView';
import MyRequestView from '../views/MyRequestView';
import ServiceListView from '../views/ServiceView/ServiceListView';

const InsideTabBottom = createBottomTabNavigator();

const InsideTabBottomNavigator = () => {
  return (
    <InsideTabBottom.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'HomeStackNavigator') {
            return <Icon name="home" size={calcScale(22)} color={color} />;
          } else if (route.name === 'MyRequestView') {
            return <Icon name="tasks" size={calcScale(22)} color={color} />;
          } else if (route.name === 'AnnoucementView') {
            return <Icon name="bell" size={calcScale(22)} color={color} />;
          } else {
            return <Icon name="user" size={calcScale(22)} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: 'rgb(0, 0, 60)',
      }}>
      <InsideTabBottom.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
      />
      <InsideTabBottom.Screen name="MyRequestView" component={MyRequestView} />
      <InsideTabBottom.Screen
        name="AnnoucementView"
        component={AnnoucementView}
      />
      <InsideTabBottom.Screen name="MyProfileView" component={MyProfileView} />
    </InsideTabBottom.Navigator>
  );
};

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{headerShown: false}}
        name="HomeView"
        component={HomeView}
      />
      <HomeStack.Screen
        name="ServiceListView"
        component={ServiceListView}
        options={({route}) => ({
          title: route.params.serviceName,
          headerTitleStyle: {color: '#fff'},
          headerStyle: {backgroundColor: 'rgb(0, 0, 60)'},
        })}
      />
      <HomeStack.Screen
        name="CreateRequestView"
        component={CreateRequestView}
        options={{
          title: 'Tạo yêu cầu',
          headerTitleStyle: {color: '#fff'},
          headerStyle: {backgroundColor: 'rgb(0, 0, 60)'},
        }}
      />
      <HomeStack.Screen
        name="ConfirmRequestView"
        component={ConfirmRequestView}
        options={{
          title: 'Xác nhận yêu cầu',
          headerTitleStyle: {color: '#fff'},
          headerStyle: {backgroundColor: 'rgb(0, 0, 60)'},
        }}
      />
      <HomeStack.Screen
        name="AddressListView"
        component={AddressListView}
        options={{
          title: 'Chọn địa chỉ',
          headerTitleStyle: {color: '#fff'},
          headerStyle: {backgroundColor: 'rgb(0, 0, 60)'},
        }}
      />
      <HomeStack.Screen
        name="CreateAddressView"
        component={CreateAddressView}
        options={{
          title: 'Thêm địa chỉ',
          headerTitleStyle: {color: '#fff'},
          headerStyle: {backgroundColor: 'rgb(0, 0, 60)'},
        }}
      />
    </HomeStack.Navigator>
  );
};

export default InsideTabBottomNavigator;
