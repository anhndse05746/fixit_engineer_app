import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { listAllRequest } from '../../store/request';
import { getNotificationList } from '../../store/notification';
import { calcScale } from '../../utils/dimension';
import AnnoucementView from '../views/AnnouncementView';
import HomeView from '../views/HomeView';
import ReceiveRequestView from '../views/HomeView/ReceiveRequestView';
import MyProfileView from '../views/MyProfileView';
import AddBillView from '../views/MyRequestView/RequestDetail/AddBillView';
import BillDetailView from '../views/MyRequestView/RequestDetail/BillDetailView';
import RequestDetailView from '../views/MyRequestView/RequestDetail/RequestDetailView';
import RequestTabs from '../views/MyRequestView/tabRoutes';
import messaging from '@react-native-firebase/messaging'

const InsideTabBottom = createBottomTabNavigator();

const InsideTabBottomNavigator = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data.requestId != 0) {
        navigation.navigate('MyRequestStackNavigator', {
          screen: remoteMessage.data.screen,
          params: { requestId: remoteMessage.data.requestId }
        });
      }

    });

    messaging().onMessage(async remoteMessage => {
      alert(`${remoteMessage.notification.title}\n${remoteMessage.notification.body}`);
    });

  }, []);

  return (
    <InsideTabBottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeStackNavigator') {
            return <Icon name="home" size={calcScale(22)} color={color} />;
          } else if (route.name === 'MyRequestStackNavigator') {
            return <Icon name="tasks" size={calcScale(22)} color={color} />;
          } else if (route.name === 'AnnouncementStackNavigator') {
            return <Icon name="bell" size={calcScale(22)} color={color} />;
          } else {
            return <Icon name="user" size={calcScale(22)} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: 'rgb(0, 0, 60)',
      }}>
      <InsideTabBottom.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Trang chủ' }}
      />
      <InsideTabBottom.Screen
        name="MyRequestStackNavigator"
        component={MyRequestStackNavigator}
        options={{ tabBarLabel: 'Yêu cầu' }}
      />
      <InsideTabBottom.Screen
        name="AnnouncementStackNavigator"
        component={AnnouncementStackNavigator}
        options={{ tabBarLabel: 'Thông báo' }}
      />
      <InsideTabBottom.Screen
        name="MyProfileView"
        component={MyProfileView}
        options={{ tabBarLabel: 'Tôi' }}
      />
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
        name="ReceiveRequestView"
        component={ReceiveRequestView}
        options={{
          title: 'Chi tiết đơn hàng',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
        }}
      />
    </HomeStack.Navigator>
  );
};

const MyRequestStack = createStackNavigator();

const MyRequestStackNavigator = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAllRequest(user.token, user.userId));
  }, []);

  return (
    <MyRequestStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
      }}>
      <MyRequestStack.Screen
        name="MyRequest"
        options={{
          title: 'Yêu cầu của tôi',
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
      <MyRequestStack.Screen
        name="RequestDetailView"
        component={RequestDetailView}
        options={({ route }) => ({
          title: 'Chi tiết yêu cầu',
          headerLeft: () => {
            return (
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={'#ccd0d5'}
                onPress={() => {
                  route.params.flag === 'announcement'
                    ? backToAnnouncement(navigation)
                    : navigation.navigate('MyRequest');
                }}
                style={styles.backButton}>
                <Icon
                  name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
                  size={calcScale(22)}
                  color="#fff"
                  light={true}
                />
              </TouchableHighlight>
            );
          },
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
        })}
      />
      <MyRequestStack.Screen
        name="AddBillView"
        component={AddBillView}
        options={{
          title: 'Tạo hóa đơn',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
        }}
      />
      <MyRequestStack.Screen
        name="BillDetailView"
        component={BillDetailView}
        options={{
          title: 'Xác nhận hóa đơn',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
        }}
      />
    </MyRequestStack.Navigator>
  );
};

const AnnouncementStack = createStackNavigator();

const AnnouncementStackNavigator = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationList(user.token, user.userId, 1));
  }, []);
  return (
    <AnnouncementStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(0, 0, 60)' },
      }}>
      <AnnouncementStack.Screen
        name="AnnoucementView"
        component={AnnoucementView}
        options={{
          title: 'Thông báo',
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
      />
    </AnnouncementStack.Navigator>
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
