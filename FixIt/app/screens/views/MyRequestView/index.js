import React from 'react';
import {SafeAreaView} from 'react-native';
import RequestTabs from './tabRoutes';

function MyRequestView() {
  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={{backgroundColor: '#e9f7fc'}}>
        <RequestTabs />
      </SafeAreaView>
    </>
  );
}

export default MyRequestView;
