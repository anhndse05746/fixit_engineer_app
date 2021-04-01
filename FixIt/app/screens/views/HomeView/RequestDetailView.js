import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { calcScale } from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';
import {
  getRequestDetail,
  takeRequest,
  clearMessage,
} from '../../../store/request';
import constants from '../../../utils/constants';

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

  useEffect(() => {
    console.log(message);
    if (message === constants.TAKE_REQUEST_SUCCESSFULLY) {
      alert(message);
      //navigate to home view 
      navigation.navigate('HomeView')
    }
  }, [message]);

  //Get status object of request
  let requestStatus
  if (data.request_statuses) {
    requestStatus = data.request_statuses;
  }

  return (
    <ScrollView style={styles.container}>
      {data.id ? (
        <>
          {requestStatus ? (
            requestStatus[0].status_id != 1 ?
              (<View
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                  paddingBottom: calcScale(10),
                  marginTop: calcScale(20),
                }}>
                <View style={{ marginLeft: calcScale(20) }}>
                  <Text style={{ fontSize: calcScale(24), fontWeight: 'bold' }}>
                    Địa chỉ: {data.address}, {data.district}, {data.city}
                  </Text>
                  <Text
                    style={{ fontSize: calcScale(18), marginTop: calcScale(5) }}>
                    {data.Customer.name}
                    {/* | {user.phoneNumber} */}
                  </Text>
                  <Text style={{ fontSize: calcScale(18) }}>{data.address}</Text>
                </View>
              </View>
              ) : null
          ) : null}
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
                    key={item.id}
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
                {data.estimate_time}
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Tổng chi phí:
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                {data.estimate_price}
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
            <View style={[styles.innerFormContainer, { alignItems: 'center' }]}>
              {requestStatus ?
                (requestStatus[0].status_id != 1 ?
                  (<>
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
                      onPress={() => setAccepted(0)}
                      style={styles.button}
                      color="#fff"
                    />
                  </>
                  ) : (
                    <PTButton
                      title="Nhận yêu cầu"
                      onPress={() =>
                        takeRequestTrigger(user.token, user.userId, requestId)
                      }
                      style={styles.button}
                      color="#fff"
                    />
                  )
                ) : (
                  <PTButton
                    title="Nhận yêu cầu"
                    onPress={() =>
                      takeRequestTrigger(user.token, user.userId, requestId)
                    }
                    style={styles.button}
                    color="#fff"
                  />
                )}
            </View>
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
    marginTop: calcScale(20),
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
