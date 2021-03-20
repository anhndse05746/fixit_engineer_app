import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import InsideTabBottomNavigator from './InsideStack';
import MyProfileDrawer from '../views/MyProfileDrawer';
import ChangePasswordView from '../views/ChangePasswordView';

const Drawer = createDrawerNavigator();

const DrawerInside = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <MyProfileDrawer {...props} />}>
      <Drawer.Screen name="InsideApp" component={InsideTabBottomNavigator} />
      <Drawer.Screen name="ChangePasswordView" component={ChangePasswordView} />
    </Drawer.Navigator>
  );
};

export default DrawerInside;
