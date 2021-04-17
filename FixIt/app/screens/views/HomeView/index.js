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

import {listRequest} from '../../../store/request';

const HomeView = ({navigation}) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const request = useSelector((state) => state.request);
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const requestData = request.listRequest;
  let isLoading = request.isLoading;

  useEffect(() => {
    if (isEnabled) {
      dispatch(listRequest(data.token, data.userId));
    }
  }, [isEnabled]);

  const reloadData = () => {
    dispatch(listRequest(data.token, data.userId));
  };

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
        {isEnabled && requestData ? (
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
              onRefresh={() => reloadData()}
              refreshing={isLoading}
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
