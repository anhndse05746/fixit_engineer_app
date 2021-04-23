import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { calcScale } from '../../../../utils/dimension';
import PTButton from '../../../commonComponent/Button';
import CommonStyles from '../../Styles';

const AddBillView = ({ navigation, route }) => {
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [billData, setBillData] = React.useState([
    {
      id: 0,
      data: { issueId: 0, issue: 'Công việc thực hiện', price: 'Đơn giá' },
      isRemove: false,
    },
  ]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [navigateFail, setNavigateFail] = React.useState('');
  const [selectedIssue, setSelectedIssue] = React.useState('');
  const [selectedIssueIndex, setSelectedIssueIndex] = React.useState(0);

  //detail request
  const requestData = route.params;
  //get issue list of this service
  let issueList = [{ estimate_price: '0', id: -3, name: '' }];
  for (let i = 0; i < requestData.service.issues.length; i++) {
    issueList.push(requestData.service.issues[i]);
  }
  issueList.push({ estimate_price: '0', id: -1, name: 'Công việc khác' });
  issueList.push({ estimate_price: '0', id: -2, name: 'Chi phí vật tư' });
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
    if (billData.find((x) => x.id === id).data.issue === '') {
      setErrorMessage(' không được để trống');
    } else if (billData.find((x) => x.id === id).data.price === '') {
      setErrorMessage(' không được để trống');
    } else {
      const object = {
        id: id + 1,
        data: { issue: '', price: '' },
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
    setBillData(bills);
  };

  const setIssue = (index, issue) => {
    const bills = [...billData];
    const issueId = issueList.find((i) => i.name == issue).id;
    bills[index].data.issue = issue;
    bills[index].data.issueId = issueId;
    setPrice(index, issueList.find((i) => i.name == issue).estimate_price.split('.')[0]);
    setBillData(bills);
  };

  const setPrice = (index, price) => {
    const bills = [...billData];
    bills[index].data.price = price;
    setBillData(bills);
  };

  const renderColums = ({ item, index }) => {
    return (
      <>
        {!item.isRemove ? (
          <>
            <View
              style={[
                styles.row,
                {
                  justifyContent: 'space-between',
                  marginTop: calcScale(20),
                },
              ]}>
              <Text style={[styles.textBold, { fontSize: calcScale(24) }]}>
                {item.data.issue}
              </Text>
              <Text style={[styles.textBold, { fontSize: calcScale(24) }]}>
                {item.data.price}
              </Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.row} key={item.id.toString()}>
              <View style={[styles.column, { width: '65%' }]}>
                <Picker
                  selectedValue={item.data.issue}
                  onValueChange={(itemValue) => {
                    setIssue(index, itemValue);
                  }}>
                  {issueList.map((issue) => {
                    return (
                      <Picker.Item
                        label={issue.name}
                        value={issue.name}
                        key={issue.id}
                      />
                    );
                  })}
                </Picker>
                {errorMessage !== '' && billData[index].data.issue === '' ? (
                  <Text style={{ color: 'red' }}>Công việc{errorMessage}</Text>
                ) : null}
              </View>

              {item.data.issueId && item.data.issueId > 0 ? (
                <View>
                  <Text>
                    {
                      issueList.find((i) => i.id == item.data.issueId)
                        .estimate_price.split('.')[0]
                    }{' '}
                    VND
                  </Text>
                </View>
              ) : (
                <Input
                  containerStyle={[styles.input, { width: '30%' }]}
                  onChangeText={(price) => setPrice(index, price)}
                  value={item.data.price}
                  errorMessage={
                    errorMessage !== '' && item.data.price === ''
                      ? 'Đơn giá' + errorMessage
                      : ''
                  }
                  keyboardType="number-pad"
                />
              )}
              {/* <Input
                containerStyle={[styles.input, { width: '30%' }]}
                onChangeText={(price) => setPrice(index, price)}
                value={item.data.price}
                errorMessage={
                  errorMessage !== '' && item.data.price === ''
                    ? 'Đơn giá' + errorMessage
                    : ''
                }
              /> */}
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
    console.log(billData);
    if (billData.length > 1) {
      billData.map((item, index) => {
        console.log(item.data.issue);
        if (item.data.issue === '') {
          checkData = false;
          setErrorMessage(' không được để trống');
          // } else if (item.data.price === '') {
          //   checkData = false;
          //   setErrorMessage(' không được để trống');
        }
      });
      if (checkData) {
        console.log(billData);
        navigation.navigate('BillDetailView', {
          requestData: requestData,
          billData: billData,
        });
      }
    } else {
      setNavigateFail('Bạn phải nhập ít nhất một dịch vụ và giá tiền');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textBold, { marginTop: calcScale(15) }]}>
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
        <Text style={{ color: 'red' }}>{navigateFail}</Text>
      ) : null}
      <PTButton
        title="Tạo"
        onPress={() => navigateConfirmBill()}
        style={[styles.button, { backgroundColor: 'rgb(255, 188, 0)' }]}
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
