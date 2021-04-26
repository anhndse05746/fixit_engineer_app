import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { calcScale } from '../../../utils/dimension';
import commonStyles from '../Styles';
import AnnouncementBox from './AnnouncementBox';
import NewAnnouncement from './NewAnnouncement';

const AnnouncementView = ({ navigation }) => {
  const [newNotification, setNewNotification] = React.useState([]);
  const [earlierNotification, setEarlierNotification] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [isEndReach, setIsEndReach] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  let sampleData = [
    {
      id: 12,
      user_id: 47,
      title: "Yêu cầu Sửa máy giặt đã bị huỷ bởi khách",
      type: 1,
      request_id: 117,
      isRead: false,
      createdAt: "2021-04-26T01:46:16.000Z",
      updatedAt: "2021-04-26T01:46:16.000Z"
    },
    {
      id: 10,
      user_id: 47,
      title: "Bạn đã nhận một yêu cầu Sửa máy giặt",
      type: 1,
      request_id: 117,
      isRead: false,
      createdAt: "2021-04-26T01:34:42.000Z",
      updatedAt: "2021-04-26T01:34:42.000Z"
    }
  ]

  useEffect(() => {
    getNewNotification();
    getEarlierNotification(currentPage);
  }, []);

  const getNewNotification = () => {
    setIsLoading(true);

    setNewNotification();
    setIsLoading(false);
  };

  const getEarlierNotification = (currentPage) => {
    setIsLoading(true);
    setEarlierNotification();
    setIsLoading(false);
    setTotalPage();
  };

  const loadMoreData = () => {
    if (currentPage < totalPage && !isLoading) {
      const page = this.state.currentPage + 1;
      setCurrentPage(page);
      getEarlierNotification(page);
    }
    if (currentPage === totalPage) {
      setIsEndReach(true);
    }
  };

  const renderFooter = () => {
    if (isLoading && !isEndReach) {
      return (
        <ActivityIndicator
          size="small"
          color="#3368f3"
          style={{ marginBottom: calcScale(10) }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={earlierNotification}
        keyExtractor={(item, index) => index.toString()}
        //Header to show above listview
        ListHeaderComponent={
          <NewAnnouncement data={newNotification} navigation={navigation} />
        }
        renderItem={({ item }) => (
          <AnnouncementBox item={item} navigation={navigation} />
        )}
        onEndReached={() => loadMoreData()}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter()}
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
