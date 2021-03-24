import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';

const RequestDetailView = ({navigation, route}) => {
  const user = useSelector((state) => state.user);

  const data = route.params.requestData;

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [accepted, setAccepted] = React.useState(0);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      console.log(data);
      setAccepted(data.accepted);
      setConstructorHasRun(true);
    }
  };

  constructor();

  return (
    <ScrollView style={styles.container}>
      {accepted ? (
        <View
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: calcScale(10),
            marginTop: calcScale(20),
          }}>
          <View style={{marginLeft: calcScale(20)}}>
            <Text style={{fontSize: calcScale(24), fontWeight: 'bold'}}>
              Địa chỉ:
            </Text>
            <Text style={{fontSize: calcScale(18), marginTop: calcScale(5)}}>
              {user.name} | {user.phoneNumber}
            </Text>
            <Text style={{fontSize: calcScale(18)}}>{data.address}</Text>
          </View>
        </View>
      ) : null}
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text
            style={{
              fontSize: calcScale(28),
              fontWeight: 'bold',
            }}>
            Phân loại: {data.service}
          </Text>
        </View>
        <View style={styles.innerFormContainer}>
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
            {/* {data.date.toString()} */}
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
          {/* {data.issues.map((item, index) => {
            return (
              <Text
                key={item.id.toString()}
                style={{
                  fontSize: calcScale(16),
                  marginBottom: calcScale(10),
                }}>
                + {item.title}
              </Text>
            );
          })} */}
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
            {/* {data.description} */}
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
            {data.estimate_fix_duration}
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
        <View style={[styles.innerFormContainer, {alignItems: 'center'}]}>
          {accepted ? (
            <>
              <View style={styles.row}>
                <PTButton
                  title="Gọi điện"
                  onPress={() => {}}
                  style={styles.buttonHalfWidth}
                  color="#fff"
                />
                <PTButton
                  title="Tạo hóa đơn"
                  onPress={() => {}}
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
              onPress={() => setAccepted(1)}
              style={styles.button}
              color="#fff"
            />
          )}
        </View>
      </View>
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
