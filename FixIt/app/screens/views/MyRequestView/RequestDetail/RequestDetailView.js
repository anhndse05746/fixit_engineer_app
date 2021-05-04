import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelRequest,
  getRequestDetail,
  listAllRequest,
  paidConfirmation,
  takeRequest,
} from '../../../../store/request';
import { cityOfVN } from '../../../../utils/cityOfVietNam';
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
  const [modalVisible, setModalVisible] = React.useState(false);
  const [cancelReason, setCancelReason] = React.useState('');

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

  const cancelRequestTrigger = (token, requestId, cancelReason) => {
    if (cancelReason !== '') {
      dispatch(cancelRequest(token, requestId, cancelReason));
      setModalVisible(false);
    }
  };

  useEffect(() => {
    console.log(message);
    if (message === constants.CANCEL_REQUEST_SUCCESSFULLY) {
      alert(message);
      dispatch(listAllRequest(user.token, user.userId));
      //navigate to home view
      navigation.navigate('Accecpted');
    } else if (message === constants.PAID_CONFIRMATION_SUCCESSFULLY) {
      alert(message);
      dispatch(listAllRequest(user.token, user.userId));
      //navigate to home view
      navigation.navigate('Done');
    }
  }, [message]);

  //Get status object of request
  let requestStatus;
  let myRequestButton;
  let price;
  if (data.request_statuses) {
    requestStatus = data.request_statuses[0].status_id;
    //Request button
    if (requestStatus == 2) {
      myRequestButton = (
        <View style={[styles.innerFormContainer, { alignItems: 'center' }]}>
          <View style={styles.row}>
            <PTButton
              title="Gọi điện"
              onPress={() => Linking.openURL(`tel:${data.Customer.phone_number}`)}
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
            onPress={() => setModalVisible(true)}
            style={styles.button}
            color="#fff"
          />
        </View>
      );
    } else if (requestStatus == 4) {
      myRequestButton = (
        <View style={[styles.innerFormContainer, { alignItems: 'center' }]}>
          <PTButton
            title="Xác nhận đã thanh toán"
            onPress={() => dispatch(paidConfirmation(user.token, data.id))}
            style={styles.button}
            color="#fff"
          />
        </View>
      );
    } else if (requestStatus == 6) {
      myRequestButton = null;
    }

    //Price
    if (requestStatus == 4 || requestStatus == 5) {
      console.log('data.invoice: ' + JSON.stringify(data.invoice));
      //Show price
      price = (
        <>
          <View style={styles.innerFormContainer}>
            <Text
              style={{
                fontSize: calcScale(18),
                fontWeight: 'bold',
                marginBottom: calcScale(10),
              }}>
              Tiền thu thực tế:
            </Text>
            <Text
              style={{
                fontSize: calcScale(16),
                marginBottom: calcScale(10),
              }}>
              {data.invoice.actual_proceeds} VND
            </Text>
          </View>
          {data.invoice.cost_of_supplies != 0 ? (
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Chi phí vật tư:
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                {data.invoice.cost_of_supplies} VND
              </Text>
            </View>
          ) : null}
          {data.invoice.other_cost != 0 ? (
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Chi phí khác:
              </Text>
              <Text
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                {data.invoice.other_cost} VND
              </Text>
            </View>
          ) : null}
        </>
      );
    } else {
      //Show price
      price = (
        <View style={styles.innerFormContainer}>
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            Tiền công ước tính:
          </Text>
          <Text
            style={{
              fontSize: calcScale(16),
              marginBottom: calcScale(10),
            }}>
            {data.estimate_price.split('.')[0]} VND
          </Text>
          <Text
            style={{
              fontSize: calcScale(16),
              marginBottom: calcScale(10),
            }}>
            (Chi phí chưa bao gồm phí đi lại)
          </Text>
        </View>
      );
    }
  }

  return (
    <ScrollView
      style={[
        styles.container,
        modalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : '',
      ]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Lí do:
              </Text>
              <TextInput
                multiline={true}
                onChangeText={(cancelReason) => setCancelReason(cancelReason)}
                value={cancelReason}
                style={{
                  borderColor: '#000',
                  borderRadius: calcScale(10),
                  borderWidth: 1,
                  backgroundColor: '#fff',
                  width: calcScale(340),
                }}
              />
            </View>
            <View style={styles.row}>
              <PTButton
                title="Không hủy"
                color="#fff"
                style={[styles.button, { backgroundColor: '#ccc', width: '45%' }]}
                onPress={() => {
                  setModalVisible(false);
                  setCancelReason('');
                }}
              />
              <PTButton
                title="Xác nhận hủy"
                color="#fff"
                style={[
                  styles.button,
                  { width: '45%', marginLeft: calcScale(20) },
                ]}
                onPress={() =>
                  cancelRequestTrigger(user.token, data.id, cancelReason)
                }
              />
            </View>
          </View>
        </View>
      </Modal>
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
                Trạng thái:{' '}
                {data.request_statuses[0].status.name == 'Đã tìm thấy thợ'
                  ? 'Đã nhận'
                  : data.request_statuses[0].status.name}
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
                {`${data.schedule_time.split('T')[1].split('.')[0].split(':')[0]
                  }:${data.schedule_time.split('T')[1].split('.')[0].split(':')[1]
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
                    + {item.issue.name} -{' '}
                    {item.issue.estimate_price.split('.')[0]} VND
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
            {requestStatus && requestStatus < 4 ? (
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
            ) : null}
            {
              //price
              price
            }
            {requestStatus && requestStatus >= 4 ? (
              <View style={styles.innerFormContainer}>
                <Text
                  style={{
                    fontSize: calcScale(18),
                    fontWeight: 'bold',
                    marginBottom: calcScale(10),
                  }}>
                  Tiền công tối thiểu
                </Text>
                <Text
                  style={{
                    fontSize: calcScale(16),
                    marginBottom: calcScale(10),
                  }}>
                  30.000 VND
                </Text>
              </View>
            ) : null}
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
                  Địa chỉ: {data.address}, {district}, {city}
                </Text>
                <Text
                  style={{
                    fontSize: calcScale(18),
                    marginTop: calcScale(5),
                  }}>
                  Tên khách hàng: {data.Customer.name}
                </Text>
                <Text
                  style={{
                    fontSize: calcScale(18),
                    marginTop: calcScale(5),
                  }}>
                  Số điện thoại: {data.Customer.phone_number}
                </Text>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default RequestDetailView;
