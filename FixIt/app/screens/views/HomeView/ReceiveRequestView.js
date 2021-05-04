import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';
import {
  getRequestDetail,
  takeRequest,
  clearMessage,
  listAllRequest,
} from '../../../store/request';
import constants from '../../../utils/constants';
import {cityOfVN} from '../../../utils/cityOfVietNam';

const ReceiveRequestView = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const requestId = route.params.requestData.id;
  const {message} = request;

  //get request detail
  useEffect(() => {
    if (message !== constants.TAKE_REQUEST_SUCCESSFULLY) {
      setAccepted(0);
      dispatch(getRequestDetail(user.token, requestId));
    }
  }, []);
  const data = request.requestDetail;

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [cities, setCities] = React.useState(cityOfVN);
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

  let city =
    data && data.city ? cities.find((x) => x.Id == data.city).Name : '';
  let district =
    data && data.city && data.district
      ? cities
          .find((x) => x.Id == data.city)
          .Districts.find((x) => x.Id == data.district).Name
      : '';

  //Take request
  const takeRequestTrigger = (token, userId, requestId) => {
    setAccepted(1);
    dispatch(takeRequest(token, requestId, userId));
  };

  useEffect(() => {
    console.log(message);
    if (message === constants.TAKE_REQUEST_SUCCESSFULLY) {
      alert(message);
      dispatch(listAllRequest(user.token, user.userId));
      //navigate to home view
      navigation.popToTop();
      navigation.navigate('MyRequestStackNavigator');
    }
  }, [message]);

  //Get status object of request
  let requestStatus;
  if (data.request_statuses) {
    requestStatus = data.request_statuses;
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
                {`${
                  data.schedule_time.split('T')[1].split('.')[0].split(':')[0]
                }:${
                  data.schedule_time.split('T')[1].split('.')[0].split(':')[1]
                }, ${data.schedule_time.split('T')[0]}`}
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
                {data.estimate_time} phút
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
                {data.estimate_price.split('.')[0]} VND
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
              <View style={{marginLeft: calcScale(20)}}>
                <Text style={{fontSize: calcScale(24), fontWeight: 'bold'}}>
                  Địa chỉ: {district}, {city}
                </Text>
                {requestStatus ? (
                  requestStatus[0].status_id != 1 ? (
                    <>
                      <Text
                        style={{
                          fontSize: calcScale(18),
                          marginTop: calcScale(5),
                        }}>
                        {data.Customer.name}
                        {/* | {user.phoneNumber} */}
                      </Text>
                      <Text style={{fontSize: calcScale(18)}}>
                        {data.address}
                      </Text>
                    </>
                  ) : null
                ) : null}
              </View>
            </View>
            <View style={[styles.innerFormContainer, {alignItems: 'center'}]}>
              <PTButton
                title="Nhận yêu cầu"
                onPress={() =>
                  takeRequestTrigger(user.token, user.userId, requestId)
                }
                style={styles.button}
                color="#fff"
              />
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator
          size="small"
          color="#3368f3"
          style={{marginTop: calcScale(10)}}
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

export default ReceiveRequestView;
