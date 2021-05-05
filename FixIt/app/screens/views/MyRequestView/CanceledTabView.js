import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listAllRequest } from '../../../store/request';
import { cityOfVN } from '../../../utils/cityOfVietNam';
import { calcScale } from '../../../utils/dimension';
import commonStyles from '../Styles';
import ListEmptyComponent from './ListEmpty';

const CanceledTabview = ({ navigation }) => {
  const request = useSelector((state) => state.request);
  const user = useSelector((state) => state.user);

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [cities, setCities] = React.useState(cityOfVN);

  const canceledData = request.canceledRequest;
  let isLoading = request.isLoading;

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setConstructorHasRun(true);
    }
  };

  constructor();

  //Dispatch
  const dispatch = useDispatch();

  const reloadData = () => {
    dispatch(listAllRequest(user.token, user.userId));
  };

  const renderListRequest = ({ item }) => {
    let schedule_time = item.schedule_time;
    // if (item.schedule_time) {
    //   schedule_time = `${
    //     item.schedule_time.split('T')[1].split('.')[0].split(':')[0]
    //   }:${item.schedule_time.split('T')[1].split('.')[0].split(':')[1]}, ${
    //     item.schedule_time.split('T')[0]
    //   }`;
    // }

    const city = cities.find((x) => x.Id == item.city);
    const district = city.Districts.find((x) => x.Id == item.district);

    return (
      <TouchableOpacity
        style={styles.ticketContainer}
        onPress={() =>
          navigation.navigate('RequestDetailView', {
            flag: 'myrequest',
            requestData: item,
          })
        }>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.textBold, styles.textTitle]}>
              {schedule_time} - {item.serviceName}
            </Text>
            <Text style={[styles.textBold, styles.textTitle]}>
              {`${item.address}, ${district.Name}, ${city.Name}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Thời gian:</Text>
            <Text style={styles.textBold}>{item.estimate_time} Phút</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Giá:</Text>
            <Text style={styles.textBold}>
              {item.estimate_price.split('.')[0]}0 VND
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Trạng thái:</Text>
            <Text style={styles.textBold}>{item.statusName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sceneContainer}>
      <FlatList
        data={canceledData}
        showsVerticalScrollIndicator={false}
        renderItem={renderListRequest}
        keyExtractor={(item) => item.id.toString()}
        bounces={false}
        ListEmptyComponent={() => <ListEmptyComponent />}
        onRefresh={() => reloadData()}
        refreshing={isLoading}
      />
    </View>
  );
};

export default CanceledTabview;

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: calcScale(10),
  },
  ticketContainer: {
    width: calcScale(420),
    height: calcScale(140),
    backgroundColor: 'rgb(255, 224, 216)',
    padding: calcScale(20),
    margin: calcScale(10),
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcScale(15),
  },
  column: {
    flexDirection: 'column',
  },
  textTitle: {
    fontSize: calcScale(16),
    paddingBottom: calcScale(10),
  },
  textBold: {
    ...commonStyles.textBold,
  },
  textRegular: {
    ...commonStyles.textRegular,
    fontSize: calcScale(14),
  },
});
