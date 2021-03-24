import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {getLastUpdateTime} from 'react-native-device-info';
import {ListItem} from 'react-native-elements';
import {Avatar} from 'react-native-paper';

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

const RequestItem = ({navigation, item, index}) => {
  const [size, onLayout] = useComponentSize();

  const data = item;

  return (
    <ListItem
      containerStyle={{
        backgroundColor: index % 2 === 0 ? 'rgba(255, 188, 0, .9)' : '#fff',
      }}
      onPress={() =>
        navigation.navigate('RequestDetailView', {requestData: data})
      }>
      <Avatar.Text size={calcScale(65)} label="R" />
      <ListItem.Content style={styles.row}>
        <ListItem.Content style={{flexBasis: '85%'}}>
          <ListItem.Title numberOfLines={1}>
            <Text style={styles.textBold}>{data.request}</Text>
          </ListItem.Title>
          <ListItem.Content style={styles.column}>
            <Text>Phân loại: {data.service}</Text>
            <Text>
              {data.estimate_fix_duration} - {data.estimate_price}
            </Text>
          </ListItem.Content>
        </ListItem.Content>
        <ListItem.Content style={{flexBasis: '15%'}}>
          <Text>{data.created_time}</Text>
        </ListItem.Content>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(20),
    color: '#000',
    textAlign: 'left',
  },
});

export default RequestItem;
