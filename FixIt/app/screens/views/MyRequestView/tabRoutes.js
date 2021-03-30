import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AccecptedTabview from './AcceptedTabView';
import DoneTabView from './DoneTabView';
import CanceledTabview from './CanceledTabView';

const Tab = createMaterialTopTabNavigator();

const RequestTabs = () => {
  return (
    <Tab.Navigator lazy={true}>
      <Tab.Screen
        name="Accecpted"
        component={AccecptedTabview}
        options={{tabBarLabel: 'Đã nhận'}}
      />
      <Tab.Screen
        name="Done"
        component={DoneTabView}
        options={{tabBarLabel: 'Hoàn thành'}}
      />
      <Tab.Screen
        name="Canceled"
        component={CanceledTabview}
        options={{tabBarLabel: 'Đã hủy'}}
      />
    </Tab.Navigator>
  );
};

export default RequestTabs;
