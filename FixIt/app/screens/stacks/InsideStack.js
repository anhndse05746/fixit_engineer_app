import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { calcScale } from '../../utils/dimension';
import AnnoucementView from '../views/AnnouncementView';
import HomeView from '../views/HomeView';
import AddBillView from '../views/HomeView/AddBillView';
import BillDetailView from '../views/HomeView/BillDetailView';
import RequestDetailView from '../views/HomeView/RequestDetailView';
import MyProfileView from '../views/MyProfileView';
import RequestTabs from '../views/MyRequestView/tabRoutes';

import { useDispatch, useSelector } from 'react-redux';
import { listAllRequest } from '../../store/request'

const InsideTabBottom = createBottomTabNavigator();

const InsideTabBottomNavigator = () => {
  return (
    <InsideTabBottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeStackNavigator') {
            return <Icon name="home" size={calcScale(22)} color={color} />;
          } else if (route.name === 'MyRequestStackNavigator') {
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
      <InsideTabBottom.Screen
        name="MyRequestStackNavigator"
        component={MyRequestStackNavigator}
      />
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
        options={{ headerShown: false }}
        name="HomeView"
        component={HomeView}
      />
      <HomeStack.Screen
        name="RequestDetailView"
        component={RequestDetailView}
        options={{
          title: 'Chi tiết đơn hàng',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
        }}
      />
      <HomeStack.Screen
        name="AddBillView"
        component={AddBillView}
        options={{
          title: 'Tạo hóa đơn',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
        }}
      />
      <HomeStack.Screen
        name="BillDetailView"
        component={BillDetailView}
        options={{
          title: 'Xác nhận hóa đơn',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
        }}
      />
    </HomeStack.Navigator>
  );
};

const MyRequestStack = createStackNavigator();

const MyRequestStackNavigator = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listAllRequest(user.token, user.userId))
  }, [])

  return (
    <MyRequestStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
      }}>
      <MyRequestStack.Screen
        name="MyRequest"
        options={{
          title: 'My Request',
          headerRight: () => {
            return (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={'#ccd0d5'}
                onPress={() => navigation.openDrawer()}
                style={styles.iconBox}>
                <Icon name="user" size={calcScale(22)} color="#fff" />
              </TouchableHighlight>
            );
          },
          headerTitleStyle: { color: '#fff' },
          headerLeft: null,
        }}
        component={RequestTabs}
      />
    </MyRequestStack.Navigator>
  );
};

export default InsideTabBottomNavigator;

const styles = StyleSheet.create({
  iconBox: {
    width: calcScale(40),
    height: calcScale(40),
    borderRadius: calcScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: calcScale(10),
  },
  backButton: {
    width: calcScale(50),
    height: calcScale(50),
    borderRadius: calcScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: calcScale(10),
  },
});
