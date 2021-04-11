import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { calcScale } from '../../../utils/dimension';
import commonStyles from '../Styles';
import ListEmptyComponent from './ListEmpty';

const AcceptedTabView = ({ navigation }) => {
  const request = useSelector((state) => state.request);
  const acceptedData = request.executingRequest;
  // [
  //   {
  //     id: 1,
  //     service: 'Sửa nhà',
  //     request: 'Sửa lò vi sóng',
  //     estimate_fix_duration: 100,
  //     estimate_price: 100,
  //     status: 'Đã nhận',
  //   },
  //   {
  //     id: 2,
  //     service: 'Sửa nhà',
  //     request: 'Service test',
  //     estimate_fix_duration: 200,
  //     estimate_price: 150,
  //     status: 'Đã nhận',
  //   },
  // ];

  // // Seletor redux
  // const isFetching = useSelector((state) => state.acceptedData.isFetching);
  // const currentPage = useSelector((state) => state.acceptedData.currentPage);
  // const totalPage = useSelector((state) => state.acceptedData.totalPage);
  // const isLoadingMore = useSelector((state) => state.acceptedData.isLoadingMore);
  // const acceptedData = useSelector((state) => state.acceptedData.data);

  // State
  const [isEndReach, setEndReach] = React.useState(true);

  // // Effects
  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  // //Dispatch
  // const dispatch = useDispatch();

  // const loadMore = () => {
  //   if (isEndReach && !isLoadingMore && currentPage < totalPage) {
  //     loadMoreData();
  //     setEndReach(false);
  //   }
  // };

  // const fetchData = React.useCallback(() => {
  //   const page = 1;
  // }, []);

  // const loadMoreData = React.useCallback(() => {
  //   const page = currentPage + 1;
  // }, [acceptedData]);

  const renderListRequest = ({ item }) => {
    const schedule_time = `${item.schedule_time.split('T')[1].split('.')[0].split(':')[0]}:${item.schedule_time.split('T')[1].split('.')[0].split(':')[1]}, ${item.schedule_time.split('T')[0]}`

    return (
      <TouchableOpacity
        style={styles.ticketContainer}
        onPress={() =>
          navigation.navigate('RequestDetailView', { requestData: item })
        }>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.textBold, styles.textTitle]}>
              {item.serviceName}
            </Text>
            <Text style={[styles.textBold, styles.textTitle]}>
              {schedule_time}
            </Text>
            <Text style={[styles.textBold, styles.textTitle]}>
              {`${item.address}, ${item.district}, ${item.city}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Thời gian ước tính:</Text>
            <Text style={styles.textBold}>{item.estimate_time} Phút</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Giá ước tính:</Text>
            <Text style={styles.textBold}>{item.estimate_price} VND</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Trạng thái:</Text>
            <Text style={styles.textBold}>{(item.statusName == "Đã tìm thấy thợ") ? "Đã nhận" : item.statusName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // const renderFooter = () => {
  //   if (isLoadingMore && isEndReach) {
  //     return (
  //       <ActivityIndicator
  //         size="small"
  //         color="#3368f3"
  //         style={{paddingBottom: calcScale(10)}}
  //       />
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <View style={styles.sceneContainer}>
      {/* {isFetching ? (
        <ActivityIndicator
          size="small"
          color="#3368f3"
          style={{marginTop: calcScale(10)}}
        />
      ) : ( */}
      <FlatList
        data={acceptedData}
        showsVerticalScrollIndicator={false}
        renderItem={renderListRequest}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => setEndReach(true)}
        // ListFooterComponent={renderFooter}
        bounces={false}
        ListEmptyComponent={() => <ListEmptyComponent />}
      />
      {/* )} */}
    </View>
  );
};

export default AcceptedTabView;

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: calcScale(10),
  },
  ticketContainer: {
    width: calcScale(420),
    height: calcScale(120),
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
  },
  textBold: {
    ...commonStyles.textBold,
  },
  textRegular: {
    ...commonStyles.textRegular,
    fontSize: calcScale(14),
  },
});
