import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {getLastUpdateTime} from 'react-native-device-info';

import {calcScale, width} from '../../../utils/dimension';
import CommonStyles from '../Styles';

const useComponentSize = () => {
  const [size, setSize] = React.useState({width: 0, height: 0});

  const onLayout = React.useCallback((event) => {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }, []);

  return [size, onLayout];
};

const ServiceItem = ({navigation, item}) => {
  const [size, onLayout] = useComponentSize();

  const data = item.item;

  const colorPicker = () => {
    let color = 'rgb(0, 0, 60)';
    if (data.id === 1) {
      return (color = '#f2552c');
    } else if (data.id === 2) {
      return (color = '#ffd15c');
    } else if (data.id === 3) {
      return (color = '#00a66f');
    } else if (data.id === 4) {
      return (color = '#098eb3');
    }
  };

  return (
    <TouchableOpacity
      key={data.id.toString()}
      style={{
        ...styles.serviceBox,
        backgroundColor: colorPicker(),
      }}
      onLayout={onLayout}
      onPress={() =>
        navigation.navigate('ServiceListView', {
          data: data.services,
          serviceName: data.name,
        })
      }>
      <Image
        source={{
          uri: data.image,
        }}
        style={{
          height: calcScale(size.width / 2),
          width: calcScale(size.width / 2),
          ...styles.serviceThumbnail,
        }}
      />
      <Text style={styles.serviceName}>{data.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceBox: {
    marginBottom: calcScale(15),
    borderRadius: calcScale(15),
    width: calcScale(width / 2),
    height: calcScale(width / 2),
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  serviceThumbnail: {
    marginTop: calcScale(15),
    marginBottom: calcScale(10),
    borderRadius: calcScale(15),
  },
  serviceName: {
    ...CommonStyles.textBold,
    fontSize: calcScale(20),
    marginBottom: calcScale(10),
    color: '#000',
  },
});

export default ServiceItem;
