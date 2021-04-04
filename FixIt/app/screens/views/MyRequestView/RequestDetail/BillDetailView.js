import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createInvoice } from '../../../../store/request';
import { calcScale } from '../../../../utils/dimension';
import PTButton from '../../../commonComponent/Button';
import CommonStyles from '../../Styles';

const BillDetailView = ({ navigation, route }) => {
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [billData, setBillData] = React.useState([]);
  const dispatch = useDispatch()
  const request = useSelector(state => state.request)
  const user = useSelector(state => state.user)

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setBillData(route.params.billData);
      setConstructorHasRun(true);
    }
  };

  constructor();

  const createInvoiceHandle = () => {
    //dispatch(createInvoice(user.token, request_id, total_price, request_issues))
  }

  const renderColums = ({ item, index }) => {
    return (
      <>
        {index === 0 ? (
          <View style={styles.row}>
            <Text style={[styles.textBold, { flexBasis: '75%' }]}>
              {item.data.service}
            </Text>
            <Text style={styles.textBold}>{item.data.money}</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={[styles.textRegular, { flexBasis: '75%' }]}>
              {item.data.service}
            </Text>
            <Text style={styles.textRegular}>{item.data.money}</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.textRegular,
          { marginTop: calcScale(15), fontSize: calcScale(22) },
        ]}>
        Các chi phí cần thanh toán
      </Text>
      <FlatList
        data={billData}
        renderItem={renderColums}
        keyExtractor={(item) => item.id.toString()}
      />
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
});
