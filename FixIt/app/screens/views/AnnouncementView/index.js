import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {getNotificationList} from '../../../store/notification';
import {calcScale} from '../../../utils/dimension';
import commonStyles from '../Styles';
import AnnouncementBox from './AnnouncementBox';

const AnnouncementView = ({navigation}) => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [listNotification, setListNotification] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isEndReach, setIsEndReach] = React.useState(false);

  const isLoading = notification.loading;

  //Dispatch
  const dispatch = useDispatch();

  const getNotification = () => {
    dispatch(getNotificationList(user.token, user.userId, currentPage));
  };

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      getNotification();
      setConstructorHasRun(true);
    }
  };

  constructor();

  useEffect(() => {
    setListNotification(notification.notificationList);
  });

  const loadMoreData = () => {
    if (isEndReach) {
      const page = currentPage + 1;
      setIsEndReach(false);
      setCurrentPage(page);
      dispatch(getNotificationList(user.token, user.userId, currentPage));
    }
  };

  const reloadData = () => {
    setCurrentPage(1);
    dispatch(getNotificationList(user.token, user.userId, currentPage));
  };

  const renderFooter = () => {
    if (isLoading && !isEndReach) {
      return (
        <ActivityIndicator
          size="small"
          color="#3368f3"
          style={{marginBottom: calcScale(10)}}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listNotification}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <AnnouncementBox item={item} navigation={navigation} />
        )}
        onEndReached={() => loadMoreData()}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => setEndReach(true)}
        ListFooterComponent={renderFooter()}
        onRefresh={() => reloadData()}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
};

export default AnnouncementView;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: '#fff',
  },
});
