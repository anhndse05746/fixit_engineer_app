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

const CanceledTabview = ({ navigation }) => {
  const request = useSelector((state) => state.request);
  const canceledData = request.canceledRequest;
  // [
  //   {
  //     id: 1,
  //     service: 'Sửa nhà',
  //     request: 'Sửa lò vi sóng',
  //     estimate_fix_duration: 100,
  //     estimate_price: 100,
  //     status: 'Đã hủy',
  //   },
  //   {
  //     id: 2,
  //     service: 'Sửa nhà',
  //     request: 'Service test',
  //     estimate_fix_duration: 200,
  //     estimate_price: 150,
  //     status: 'Đã hủy',
  //   },
  // ];

  // // Seletor redux
  // const isFetching = useSelector((state) => state.canceledData.isFetching);
  // const currentPage = useSelector((state) => state.canceledData.currentPage);
  // const isLoadingMore = useSelector((state) => state.canceledData.isLoadingMore);
  // const totalPage = useSelector((state) => state.canceledData.totalPage);
  // const canceledData = useSelector((state) => state.canceledData.data);

  // State
  const [isEndReach, setEndReach] = React.useState(false);

  // //Effects
  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  // //Dispatch
  // const dispatch = useDispatch();

  // const fetchData = React.useCallback(() => {
  //   const request = {
  //     pageNum: 1,
  //     pageSize: 5,
  //   };
  // }, []);

  // const loadMore = () => {
  //   if (isEndReach && !isLoadingMore && currentPage < totalPage) {
  //     loadMoreData();
  //     setEndReach(false);
  //   }
  // };

  // const loadMoreData = React.useCallback(() => {
  //   const page = currentPage + 1;
  //   const request = {
  //     pageNum: page,
  //     pageSize: 5,
  //   };
  // }, [canceledData]);

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
            <Text style={styles.textRegular}>Thời gian:</Text>
            <Text style={styles.textBold}>{item.estimate_time} Phút</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Giá:</Text>
            <Text style={styles.textBold}>{item.estimate_price} VND</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textRegular}>Trạng thái:</Text>
            <Text style={styles.textBold}>{item.statusName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // const renderFooter = () => {
  //   console.log(isLoadingMore, isEndReach);
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
        data={canceledData}
        showsVerticalScrollIndicator={false}
        renderItem={renderListRequest}
        initialNumToRender={5}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={loadMore}
        bounces={false}
        // ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => setEndReach(true)}
        ListEmptyComponent={() => <ListEmptyComponent />}
      />
      {/* )} */}
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
