import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {calcScale} from '../../../utils/dimension';
import commonStyles from '../Styles';
import ServicesBranch from './ServicesBranch';

const ServicesTree = ({navigation, data}) => {
  return (
    <FlatList
      data={data}
      style={styles.listView}
      renderItem={(item) => (
        <ServicesBranch navigation={navigation} item={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  listView: {
    paddingHorizontal: calcScale(20),
  },
});

export default ServicesTree;
