import React, {useEffect} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {View} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import {calcScale} from '../../../utils/dimension';
import HeaderBar from './HeaderBar';
import CommonStyles from '../Styles';
import ServiceItem from './ServiceItem';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {loadMajors} from '../../../store/majors';

const HomeView = () => {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //select user's token
  const {token} = data;

  //select majorList
  const {majorsList} = useSelector((state) => state.majors);

  useEffect(() => {
    if (majorsList.length == 0) dispatch(loadMajors(token));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={[styles.textBold, {paddingTop: calcScale(80)}]}>
          Hi, {data.name}!
        </Text>
        <Text style={styles.textRegular}>
          Hôm nay bạn cần sửa chữa gì không?
        </Text>
        <FlatList
          data={majorsList}
          style={styles.serviceContainer}
          renderItem={(item) => (
            <ServiceItem navigation={navigation} item={item} />
          )}
          numColumns={2}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          keyExtractor={(item) => item.id}
        />
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
    justifyContent: 'center',
    paddingHorizontal: calcScale(20),
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
    marginTop: calcScale(20),
  },
});
