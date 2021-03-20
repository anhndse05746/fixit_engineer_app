import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';

const ConfirmRequestView = ({navigation, route}) => {
  const user = useSelector((state) => state.user);

  const data = route.params.requestData;

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [estimate_fix_duration, setEstimate_fix_duration] = React.useState(0);
  const [estimate_price, setEstimate_price] = React.useState(0);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      console.log(data);
      let price = 0;
      let time = 0;
      data.issues.map((issue, index) => {
        price += parseFloat(issue.estimate_price);
        time += issue.estimate_fix_duration;
      });
      setEstimate_price(price);
      setEstimate_fix_duration(time);
      setConstructorHasRun(true);
    }
  };

  constructor();

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          paddingBottom: calcScale(10),
          marginTop: calcScale(20),
        }}>
        <View style={{marginLeft: calcScale(20)}}>
          <Text style={{fontSize: calcScale(24), fontWeight: 'bold'}}>
            Địa chỉ
          </Text>
          <Text style={{fontSize: calcScale(18), marginTop: calcScale(5)}}>
            {user.name} | {user.phoneNumber}
          </Text>
          <Text style={{fontSize: calcScale(18)}}>{data.address}</Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text
            style={{
              fontSize: calcScale(28),
              fontWeight: 'bold',
            }}>
            Dịch vụ: {data.service}
          </Text>
        </View>
        <View style={styles.innerFormContainer}>
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            Yêu cầu
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
            Vấn đề đang gặp phải
          </Text>
          {data.issues.map((item, index) => {
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
          })}
        </View>
        <View style={styles.innerFormContainer}>
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            Mô tả chi tiết vấn đề gặp phải
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
            Thời gian sửa ước tính
          </Text>
          <Text
            style={{
              fontSize: calcScale(16),
              marginBottom: calcScale(10),
            }}>
            {estimate_fix_duration}
          </Text>
        </View>
        <View style={styles.innerFormContainer}>
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            Tiền sửa ước tính
          </Text>
          <Text
            style={{
              fontSize: calcScale(16),
              marginBottom: calcScale(10),
            }}>
            {estimate_price}
          </Text>
        </View>
        <View style={styles.innerFormContainer}>
          <Text
            style={{
              fontSize: calcScale(18),
              fontWeight: 'bold',
              marginBottom: calcScale(10),
            }}>
            Thời gian
          </Text>
          <Text
            style={{
              fontSize: calcScale(18),
              marginBottom: calcScale(10),
            }}>
            {data.date.toLocaleDateString()}
          </Text>
        </View>
        <View style={[styles.innerFormContainer, {alignItems: 'center'}]}>
          <PTButton
            title="Xác nhận"
            onPress={() => {}}
            style={styles.button}
            color="#fff"
          />
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
});

export default ConfirmRequestView;
