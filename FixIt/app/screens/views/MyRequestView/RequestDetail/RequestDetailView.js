import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestDetail, takeRequest, cancelRequest, listAllRequest } from '../../../../store/request';
import constants from '../../../../utils/constants';
import { calcScale } from '../../../../utils/dimension';
import PTButton from '../../../commonComponent/Button';
import commonStyles from '../../Styles';

const RequestDetailView = ({ navigation, route }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const requestId = route.params.requestData.id;
  const { message } = request;

  //get request detail
  useEffect(() => {
    if (message !== constants.TAKE_REQUEST_SUCCESSFULLY) {
      setAccepted(0);
      dispatch(getRequestDetail(user.token, requestId));
    }
  }, []);
  const data = request.requestDetail;

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [accepted, setAccepted] = React.useState(0);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setAccepted(data.accepted);
      setConstructorHasRun(true);
    }
  };

  constructor();

  //Take request
  const takeRequestTrigger = (token, userId, requestId) => {
    setAccepted(1);
    dispatch(takeRequest(token, requestId, userId));
  };

  const cancelRequestTrigger = (token, requestId, cancel_reason) => {
    dispatch(cancelRequest(token, requestId, cancel_reason));
  };


  useEffect(() => {
    console.log(message);
    if (message === constants.CANCEL_REQUEST_SUCCESSFULLY) {
      alert(message);
      dispatch(listAllRequest(user.token, user.userId));
      //navigate to home view
      navigation.navigate('MyRequestStackNavigator');
    }
  }, [message]);

  //Get status object of request
  let requestStatus;
  let myRequestButton
  if (data.request_statuses) {
    requestStatus = data.request_statuses[0].status_id;
    if (requestStatus == 2) {
      console.log(requestStatus + '=== 2')
      myRequestButton = <View style={[styles.innerFormContainer, { alignItems: 'center' }]}>
        <View style={styles.row}>
          <PTButton
            title="Gọi điện"
            onPress={() => { }}
            style={styles.buttonHalfWidth}
            color="#fff"
          />
          <PTButton
            title="Tạo hóa đơn"
            onPress={() => navigation.navigate('AddBillView', data)}
            style={styles.buttonHalfWidth}
            color="#fff"
          />
        </View>
        <PTButton
          title="Hủy nhận yêu cầu"
          onPress={() => cancelRequestTrigger(user.token, data.id, "Lí Do Lí chấu")}
          style={styles.button}
          color="#fff"
        />
      </View>
    } else if (requestStatus == 4) {
      myRequestButton = <View style={[styles.innerFormContainer, { alignItems: 'center' }]}>
        <PTButton
          title="Xác nhận đã thanh toán"
          onPress={() => { }}
          style={styles.button}
          color="#fff"
        />
      </View>
    } else if (requestStatus == 6) {
      myRequestButton = null
    }
  }



  return (
    <ScrollView style={styles.container}>
      {data.id ? (
        <>
          <View style={styles.form}>
            <View style={styles.formHeader}>
              <Text
                style={{
                  fontSize: calcScale(28),
                  fontWeight: 'bold',
                }}>
                Phân loại: {data.service.name}
              </Text>
            </View>
            {/* <View style={styles.innerFormContainer}>
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            Yêu cầu:
          </Text>
          <Text
            style={{
              fontSize: calcScale(16),
              marginBottom: calcScale(10),
            }}>
            {data.request}
          </Text>
        </View> */}
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Thời gian hẹn:
              </Text>
              <Text
                style={{
                  fontSize: calcScale(18),
                  marginBottom: calcScale(10),
                }}>
                {data.schedule_time.toString()}
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Vấn đề đang gặp phải:
              </Text>
              {data.request_issues.map((item, index) => {
                return (
                  <Text
                    key={index.toString()}
                    style={{
                      fontSize: calcScale(16),
                      marginBottom: calcScale(10),
                    }}>
                    + {item.issue.name}
                  </Text>
                );
              })}
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Mô tả chi tiết vấn đề gặp phải:
              </Text>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                {data.description}
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Thời gian sửa ước tính:
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                {data.estimate_time} Phút
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Tổng chi phí ước tính:
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                {data.estimate_price} VND
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Hình thức thanh toán:
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                Tiền mặt
              </Text>
            </View>
            <View
              style={{
                borderTopColor: '#ccc',
                borderTopWidth: 1,
                paddingTop: calcScale(10),
                marginBottom: calcScale(20),
              }}>
              <View style={{ marginLeft: calcScale(20) }}>
                <Text style={{ fontSize: calcScale(24), fontWeight: 'bold' }}>
                  Địa chỉ: {data.address}, {data.district}, {data.city}
                </Text>
                <Text
                  style={{
                    fontSize: calcScale(18),
                    marginTop: calcScale(5),
                  }}>
                  Tên khách hàng: {data.Customer.name}asdadadadadadas
                  {/* | {user.phoneNumber} */}
                </Text>
                {/* <Text style={{ fontSize: calcScale(18) }}>{data.address}</Text> */}
              </View>
            </View>

            {myRequestButton}
          </View>
        </>
      ) : (
        <ActivityIndicator
          size="small"
          color="#3368f3"
          style={{ marginTop: calcScale(10) }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    marginHorizontal: calcScale(20),
  },
  formHeader: {
    marginVertical: calcScale(10),
  },
  innerFormContainer: {
    marginVertical: calcScale(10),
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: calcScale(50),
  },
  checkBox: {
    borderWidth: 0,
    padding: 0,
  },
  button: {
    marginTop: calcScale(20),
    width: '100%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
  },
  buttonHalfWidth: {
    marginTop: calcScale(20),
    width: '45%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(255, 188, 0)',
    marginHorizontal: calcScale(20),
  },
});

export default RequestDetailView;
