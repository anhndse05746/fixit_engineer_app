import React, {useEffect} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {View} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import {calcScale} from '../../../utils/dimension';
import HeaderBar from './HeaderBar';
import CommonStyles from '../Styles';
import RequestItem from './RequestItem';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {loadMajors} from '../../../store/majors';

const HomeView = ({navigation}) => {
  const requestData = [
    {
      id: 1,
      request: 'Sửa khóa cửa',
      service: 'Sửa nhà',
      estimate_fix_duration: 60,
      estimate_price: 300,
      created_time: '10:00',
      accepted: 0,
    },
    {
      id: 2,
      request: 'Sửa đèn',
      service: 'Sửa nhà',
      estimate_fix_duration: 30,
      estimate_price: 100,
      created_time: '10:00',
      accepted: 1,
    },
    {
      id: 3,
      request: 'Sửa tủ',
      service: 'Sửa nhà',
      estimate_fix_duration: 60,
      estimate_price: 400,
      created_time: '10:00',
      accepted: 0,
    },
    {
      id: 4,
      request: 'Sửa khóa cửa',
      service: 'Sửa nhà',
      estimate_fix_duration: 60,
      estimate_price: 300,
      created_time: '10:00',
      accepted: 0,
    },
    {
      id: 5,
      request: 'Sửa đèn',
      service: 'Sửa nhà',
      estimate_fix_duration: 30,
      estimate_price: 100,
      created_time: '10:00',
      accepted: 1,
    },
    {
      id: 6,
      request: 'Sửa tủ',
      service: 'Sửa nhà',
      estimate_fix_duration: 60,
      estimate_price: 400,
      created_time: '10:00',
      accepted: 1,
    },
    {
      id: 7,
      request: 'Sửa khóa cửa',
      service: 'Sửa nhà',
      estimate_fix_duration: 60,
      estimate_price: 300,
      created_time: '10:00',
      accepted: 0,
    },
    {
      id: 8,
      request: 'Sửa đèn',
      service: 'Sửa nhà',
      estimate_fix_duration: 30,
      estimate_price: 100,
      created_time: '10:00',
      accepted: 1,
    },
    {
      id: 9,
      request: 'Sửa tủ',
      service: 'Sửa nhà',
      estimate_fix_duration: 60,
      estimate_price: 400,
      created_time: '10:00',
      accepted: 1,
    },
  ];
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const data = useSelector((state) => state.user);
  // const dispatch = useDispatch();
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
        <Text style={[styles.textBold, {paddingTop: calcScale(10)}]}>
          Hi, {data.name}!
        </Text>
        {isEnabled ? (
          <>
            <Text style={styles.textRegular}>
              Hãy chọn một yêu cầu để bắt đầu làm việc!
            </Text>
            <FlatList
              data={requestData}
              style={styles.serviceContainer}
              renderItem={({item, index}) => (
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
