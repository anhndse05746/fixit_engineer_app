import React from 'react';
import {StyleSheet} from 'react-native';
import commonStyles from '../Styles';
import {SafeAreaView} from 'react-native';
import ServicesTree from './ServicesTree';

const ServiceListView = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ServicesTree navigation={navigation} data={route.params.data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
});

export default ServiceListView;
