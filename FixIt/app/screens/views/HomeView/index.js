import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { calcScale } from '../../../utils/dimension';
import HeaderBar from './HeaderBar';
import CommonStyles from '../Styles';
import RequestItem from './RequestItem';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { listRequest } from '../../../store/request';

const HomeView = ({ navigation }) => {
  // const requestData = [
  //   {
  //     id: 24,
  //     customer_id: 44,
  //     service_id: 5,
  //     estimate_time: 40,
  //     estimate_price: 80.00,
  //     schedule_time: "28-3-2021",
  //     currentStatus: 1,
  //     statusName: "Đang tìm thợ",
  //     serviceName: "Sửa máy giặt"
  //   },
  //   {
  //     id: 25,
  //     customer_id: 44,
  //     service_id: 5,
  //     estimate_time: 40,
  //     estimate_price: 80.00,
  //     schedule_time: "28-3-2021",
  //     currentStatus: 1,
  //     statusName: "Đang tìm thợ",
  //     serviceName: "Sửa máy giặt"
  //   },
  //   {
  //     id: 26,
  //     customer_id: 44,
  //     service_id: 5,
  //     estimate_time: 40,
  //     estimate_price: 80.00,
  //     schedule_time: "28-3-2021",
  //     currentStatus: 1,
  //     statusName: "Đang tìm thợ",
  //     serviceName: "Sửa máy giặt"
  //   },
  //   {
  //     id: 35,
  //     customer_id: 43,
  //     service_id: 5,
  //     estimate_time: 40,
  //     estimate_price: 80.00,
  //     schedule_time: "28-3-2021",
  //     currentStatus: 1,
  //     statusName: "Đang tìm thợ",
  //     serviceName: "Sửa máy giặt"
  //   },
  //   {
  //     id: 73,
  //     customer_id: 31,
  //     service_id: 6,
  //     estimate_time: 10,
  //     estimate_price: 100.00,
  //     schedule_time: "28-3-2021",
  //     currentStatus: 1,
  //     statusName: "Đang tìm thợ",
  //     serviceName: "Sửa máy nước nóng"
  //   }
  // ]

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const request = useSelector((state) => state.request);
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const requestData = request.listRequest;

  useEffect(() => {
    if (isEnabled) {
      console.log(data.token, data.userId)
      dispatch(listRequest(data.token, data.userId));
    }
  }, [isEnabled]);

  // const navigation = useNavigation();

  //select user's token
  // const {token} = data;

  //select majorList
  // const {majorsList} = useSelector((state) => state.majors);

  // useEffect(() => {
  //   if (majorsList.length == 0) dispatch(loadMajors(token));
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        navigation={navigation}
        isEnabled={isEnabled}
        toggleSwitch={toggleSwitch}
      />
      <View style={styles.innerContainer}>
        <Text style={[styles.textBold, { paddingTop: calcScale(10) }]}>
          Hi, {data.name}!
        </Text>
        {isEnabled && requestData ? (
          <>
            <Text style={styles.textRegular}>
              Hãy chọn một yêu cầu để bắt đầu làm việc!
            </Text>
            <FlatList
              data={requestData}
              style={styles.serviceContainer}
              renderItem={({ item, index }) => (
                <RequestItem
                  navigation={navigation}
                  item={item}
                  index={index}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        ) : (
          <>
            <Text style={styles.textRegular}>Bạn đang ở chế độ nghỉ.</Text>
            <Text style={styles.textRegular}>
              Hãy bật chế độ làm việc để nhận yêu cầu.
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    justifyContent: 'flex-start',
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(30),
    color: '#000',
    textAlign: 'left',
    paddingLeft: calcScale(10),
  },
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
    textAlign: 'left',
    paddingLeft: calcScale(10),
  },
  serviceContainer: {
    marginVertical: calcScale(10),
  },
});
