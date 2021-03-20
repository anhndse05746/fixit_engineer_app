import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {List} from 'react-native-paper';
import {calcScale} from '../../../utils/dimension';

const ServicesBranch = ({navigation, item}) => {
  const data = item.item;

  return (
    <>
      <List.Item
        title={data.name}
        id={data.id}
        style={styles.itemList}
        titleStyle={styles.titleStyle}
        onPress={() => {
          navigation.navigate('CreateRequestView', {service: data});
        }}
        key={data.id.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: '#d8360e',
    borderRadius: 15,
    marginTop: calcScale(10),
  },
  itemLink: {
    backgroundColor: '#f68a6f',
    borderRadius: 15,
    marginTop: calcScale(10),
    marginHorizontal: calcScale(20),
  },
  titleStyle: {
    color: '#fff',
  },
});

export default ServicesBranch;
