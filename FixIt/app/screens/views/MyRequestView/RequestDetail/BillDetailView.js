import * as React from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { createInvoice, listAllRequest } from '../../../../store/request';
import constants from '../../../../utils/constants';
import { calcScale } from '../../../../utils/dimension';
import PTButton from '../../../commonComponent/Button';
import CommonStyles from '../../Styles';

const BillDetailView = ({ navigation, route }) => {
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [billData, setBillData] = React.useState([]);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const user = useSelector((state) => state.user);
  const requestData = route.params.requestData;
  const { message } = request;

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setBillData(route.params.billData);
      setConstructorHasRun(true);
    }
  };

  constructor();

  const getRequestIssues = (requestId, billData) => {
    const a = [];
    for (let i = 1; i < billData.length; i++) {
      if (billData[i].data.issueId > 0) {
        a.push({
          request_id: requestId,
          issues_id: billData[i].data.issueId,
        });
      }
    }
    return a;
  };

  let other_cost = 0;
  let cost_of_supplies = 0;
  const CalculateTotalPrice = (billData) => {
    let total = 0;
    for (let i = 1; i < billData.length; i++) {
      total += parseInt(billData[i].data.price);
      if (billData[i].data.issueId == -1) {
        other_cost = billData[i].data.price;
      } else if (billData[i].data.issueId == -2) {
        cost_of_supplies = billData[i].data.price;
      }
    }
    return total;
  };

  const totalPrice = CalculateTotalPrice(billData);
  const request_issues = getRequestIssues(requestData.id, billData);

  console.log(
    `User Token: ${user.token} - request Id: ${requestData.id
    } - Total Price ${totalPrice} - request Issue: ${JSON.stringify(
      request_issues,
    )}`,
  );

  const [realPrice, setRealPrice] = React.useState(totalPrice);
  const [realPriceError, setRealPriceError] = React.useState('');

  const createInvoiceHandle = () => {
    if (realPrice === '') {
      setRealPriceError('không được để trống');
    } else if (parseInt(realPrice) < 30000) {
      setRealPriceError('không được nhỏ hơn tiền công tối thiếu - 30000 VND');
    } else if (parseInt(realPrice) > totalPrice) {
      setRealPriceError('không được lớn hơn tổng tiền');
    } else {
      setRealPriceError('');
      dispatch(
        createInvoice(
          user.token,
          requestData.id,
          other_cost,
          cost_of_supplies,
          totalPrice,
          realPrice,
          request_issues,
        ),
      );
      //other_cost, cost_of_supplies, total_price, actual_proceeds
    }
  };

  React.useEffect(() => {
    if (message === constants.CREATE_INVOICE_SUCCESSFULLY) {
      dispatch(listAllRequest(user.token, user.userId));
      navigation.navigate('Accecpted');
    }
  }, [message]);

  const renderColums = ({ item, index }) => {
    return (
      <>
        {index === 0 ? (
          <View style={styles.row}>
            <Text
              style={[
                styles.textBold,
                { flexBasis: '70%', fontSize: calcScale(24) },
              ]}>
              {item.data.issue}
            </Text>
            <Text style={[styles.textBold, { fontSize: calcScale(24) }]}>
              {item.data.price}
            </Text>
          </View>
        ) : item.data.issueId < 0 ? (
          <View style={styles.row}>
            <Text style={[styles.textBold, { flexBasis: '70%' }]}>
              {item.data.issue}
            </Text>
            <Text style={styles.textRegular}>{item.data.price} VND</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={[styles.textRegular, { flexBasis: '70%' }]}>
              {item.data.issue}
            </Text>
            <Text style={styles.textRegular}>{item.data.price} VND</Text>
          </View>
        )}
      </>
    );
  };

  React.useEffect(() => {
    if (totalPrice) {
      setRealPrice(totalPrice);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={[styles.textBold, { marginTop: calcScale(15) }]}>
            Các chi phí cần thanh toán
          </Text>
          <FlatList
            data={billData}
            renderItem={renderColums}
            keyExtractor={(item) => item.id.toString()}
          />
          <View
            style={{
              borderTopColor: '#ccc',
              borderTopWidth: 1,
              marginTop: calcScale(15),
              marginBottom: calcScale(10),
            }}
          />
          <View style={styles.row}>
            <Text
              style={[
                styles.textBold,
                { flexBasis: '70%', fontSize: calcScale(20) },
              ]}>
              Tổng tiền
            </Text>
            <Text style={styles.textRegular}>{totalPrice} VND</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.textBold,
                { flexBasis: '50%', fontSize: calcScale(20) },
              ]}>
              Tiền thu thực tế
            </Text>
            <Input
              containerStyle={[styles.input, { width: '30%' }]}
              onChangeText={(realPrice) => setRealPrice(realPrice)}
              value={realPrice.toString()}
              errorMessage={
                realPriceError !== ''
                  ? 'Tiền thu thực tế ' + realPriceError
                  : ''
              }
              keyboardType="number-pad"
            />
            <Text style={styles.textRegular}> VND</Text>
          </View>
          <PTButton
            title="Xác nhận"
            onPress={() => createInvoiceHandle()}
            style={[
              styles.button,
              { width: '100%', backgroundColor: 'rgb(255, 188, 0)' },
            ]}
            color="#fff"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BillDetailView;

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
    width: '45%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
  },
  row: {
    ...CommonStyles.row,
    marginTop: calcScale(10),
  },
  input: {
    marginTop: calcScale(10),
  },
});
