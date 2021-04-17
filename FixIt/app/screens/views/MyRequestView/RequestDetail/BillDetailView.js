import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {createInvoice, listAllRequest} from '../../../../store/request';
import constants from '../../../../utils/constants';
import {calcScale} from '../../../../utils/dimension';
import PTButton from '../../../commonComponent/Button';
import CommonStyles from '../../Styles';

const BillDetailView = ({navigation, route}) => {
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [billData, setBillData] = React.useState([]);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const user = useSelector((state) => state.user);
  const requestData = route.params.requestData;
  const {message} = request;

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
      a.push({
        request_id: requestId,
        issues_id: billData[i].data.issueId,
      });
    }
    return a;
  };

  const CalculateTotalPrice = (billData) => {
    let total = 0;
    for (let i = 1; i < billData.length; i++) {
      total += parseInt(billData[i].data.price);
    }
    return total;
  };

  const totalPrice = CalculateTotalPrice(billData);
  const request_issues = getRequestIssues(requestData.id, billData);

  const [realPrice, setRealPrice] = React.useState(totalPrice);
  const [realPriceError, setRealPriceError] = React.useState('');

  console.log(
    `User Token: ${user.token} - request Id: ${
      requestData.id
    } - Total Price ${totalPrice} - request Issue: ${JSON.stringify(
      request_issues,
    )}`,
  );

  const createInvoiceHandle = () => {
    if (!realPrice) {
      setRealPriceError('không được để trống');
    } else if (realPrice > totalPrice) {
      setRealPriceError('không được lớn hơn tổng tiền');
    } else {
      dispatch(
        createInvoice(user.token, requestData.id, realPrice, request_issues),
      );
    }
  };

  React.useEffect(() => {
    if (message === constants.CREATE_INVOICE_SUCCESSFULLY) {
      alert(constants.CREATE_INVOICE_SUCCESSFULLY);
      dispatch(listAllRequest(user.token, user.userId));
      navigation.navigate('Accecpted');
    }
  }, [message]);

  const renderColums = ({item, index}) => {
    console.log(item);
    return (
      <>
        {index === 0 ? (
          <View style={styles.row}>
            <Text style={[styles.textBold, {flexBasis: '70%'}]}>
              {item.data.issue}
            </Text>
            <Text style={styles.textBold}>{item.data.price}</Text>
          </View>
        ) : item.data.issueId < 0 ? (
          <View style={styles.row}>
            <Text style={[styles.textBold, {flexBasis: '70%'}]}>
              {item.data.issue}
            </Text>
            <Text style={styles.textRegular}>{item.data.price}0 VND</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={[styles.textRegular, {flexBasis: '70%'}]}>
              {item.data.issue}
            </Text>
            <Text style={styles.textRegular}>{item.data.price}0 VND</Text>
          </View>
        )}
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <View
          style={{
            borderTopColor: '#ccc',
            borderTopWidth: 1,
            marginTop: calcScale(15),
            marginBottom: calcScale(10),
          }}
        />
        <View style={styles.row}>
          <Text style={[styles.textBold, {flexBasis: '70%'}]}>Tổng tiền</Text>
          <Text style={styles.textRegular}>{totalPrice}.000 VND</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.textBold, {flexBasis: '70%'}]}>
            Tổng tiền thực tế
          </Text>
          <Input
            containerStyle={[styles.input, {width: '30%'}]}
            onChangeText={(realPrice) => setRealPrice(realPrice)}
            value={realPrice}
            errorMessage={
              realPriceError !== '' && realPrice === ''
                ? 'Tổng tiền thực tế ' + realPriceError
                : ''
            }
            keyboardType="number-pad"
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.textRegular,
          {marginTop: calcScale(15), fontSize: calcScale(22)},
          styles.textBold,
        ]}>
        Các chi phí cần thanh toán
      </Text>
      <FlatList
        data={billData}
        renderItem={renderColums}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
      />
      <PTButton
        title="Xác nhận"
        onPress={() => createInvoiceHandle()}
        style={[
          styles.button,
          {width: '100%', backgroundColor: 'rgb(255, 188, 0)'},
        ]}
        color="#fff"
      />
    </View>
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
