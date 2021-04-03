import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import CommonStyles from '../Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AddBillView = ({navigation, route}) => {
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [billData, setBillData] = React.useState([
    {id: 0, data: {service: 'Tên dịch vụ', money: 'Đơn giá'}, isRemove: false},
  ]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [navigateFail, setNavigateFail] = React.useState('');

  const requestData = route.params;

  //setBillData(requestData.request_issues)

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setConstructorHasRun(true);
    }
  };

  constructor();

  const addRow = (id) => {
    console.log(id);
    if (billData.find((x) => x.id === id).data.service === '') {
      setErrorMessage(' không được để trống');
    } else if (billData.find((x) => x.id === id).data.money === '') {
      setErrorMessage(' không được để trống');
    } else {
      const object = {
        id: id + 1,
        data: {service: '', money: ''},
        isRemove: true,
      };
      setErrorMessage('');
      setBillData([...billData, object]);
    }
  };

  const removeRow = (id) => {
    let bills = [];
    billData.map((item, index) => {
      if (item.id !== id) {
        bills.push(item);
      }
    });
    console.log(JSON.stringify(bills));
    setBillData(bills);
  };

  const setService = (index, service) => {
    const bills = [...billData];
    bills[index].data.service = service;
    setBillData(bills);
  };

  const setMoney = (index, money) => {
    const bills = [...billData];
    bills[index].data.money = money;
    setBillData(bills);
  };

  const renderColums = ({item, index}) => {
    return (
      <>
        {!item.isRemove ? (
          <>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-around', marginVertical: calcScale(20)},
              ]}>
              <Text style={styles.textBold}>{item.data.service}</Text>
              <Text style={styles.textBold}>{item.data.money}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.row} key={item.id.toString()}>
              <Input
                containerStyle={[styles.input, {width: '65%'}]}
                onChangeText={(service) => setService(index, service)}
                value={item.data.service}
                errorMessage={
                  errorMessage !== '' && item.data.service === ''
                    ? 'Tên dịch vụ' + errorMessage
                    : ''
                }
              />
              <Input
                containerStyle={[styles.input, {width: '30%'}]}
                onChangeText={(money) => setMoney(index, money)}
                value={item.data.money}
                errorMessage={
                  errorMessage !== '' && item.data.money === ''
                    ? 'Đơn giá' + errorMessage
                    : ''
                }
              />
              <TouchableOpacity>
                <Icon
                  name="times-circle"
                  size={calcScale(20)}
                  color="grey"
                  onPress={() => {
                    removeRow(item.id);
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </>
    );
  };

  const navigateConfirmBill = () => {
    let checkData = true;
    if (billData.length > 1) {
      billData.map((item, index) => {
        if (item.data.service === '') {
          checkData = false;
          setErrorMessage(' không được để trống');
        } else if (item.data.money === '') {
          checkData = false;
          setErrorMessage(' không được để trống');
        }
      });
      if (checkData) {
        navigation.navigate('BillDetailView', {billData: billData});
      }
    } else {
      setNavigateFail('Bạn phải nhập ít nhất một dịch vụ và giá tiền');
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.textRegular,
          {marginTop: calcScale(15), fontSize: calcScale(22)},
        ]}>
        Các chi phí cần thanh toán
      </Text>
      <FlatList
        data={billData}
        renderItem={renderColums}
        ListFooterComponent={
          <PTButton
            title="Thêm hàng"
            onPress={() => {
              console.log(billData[billData.length - 1].id);
              addRow(billData[billData.length - 1].id);
            }}
            style={styles.button}
            color="#fff"
          />
        }
        keyExtractor={(item) => item.id.toString()}
      />
      {navigateFail !== '' ? (
        <Text style={{color: 'red'}}>{navigateFail}</Text>
      ) : null}
      <PTButton
        title="Tạo"
        onPress={() => navigateConfirmBill()}
        style={[styles.button, {backgroundColor: 'rgb(255, 188, 0)'}]}
        color="#fff"
      />
    </View>
  );
};

export default AddBillView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: calcScale(20),
  },
  input: {
    marginTop: calcScale(10),
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(30),
    color: '#000',
  },
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
  },
  button: {
    marginTop: calcScale(10),
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
  },
  row: {
    ...CommonStyles.row,
    justifyContent: 'space-between',
    marginTop: calcScale(10),
  },
});
