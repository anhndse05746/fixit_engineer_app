import React, {useEffect} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {CheckBox, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';

const AddressListView = ({navigation, route}) => {
  let selectedId = route.params.selectedId;
  const data = [
    {
      id: 0,
      address: '3417 Gaston Avenue',
      district: 'Suite 195',
      city: 'Dallas',
    },

    {
      id: 1,
      address: '5236 West University Drive',
      district: 'Suite 1900',
      city: 'MCKINNEY',
    },
    {
      id: 2,
      address: '3800 Gaylord Parkway',
      district: 'Ste 110',
      city: 'FRISCO',
    },
  ];

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [addressSelected, setAddressSelected] = React.useState([]);
  const [select, setSelect] = React.useState(-1);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setSelect(selectedId);
      setConstructorHasRun(true);
    }
  };

  constructor();

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelect(item.id);
        }}
        style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          paddingBottom: calcScale(10),
        }}>
        <View style={[styles.row, {marginTop: calcScale(20)}]}>
          <View style={{marginLeft: calcScale(20)}}>
            <Text style={{fontSize: calcScale(24), fontWeight: 'bold'}}>
              Địa chỉ
            </Text>
            <Text style={{fontSize: calcScale(18)}}>
              {item.address}, {item.district}, {item.city}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginRight: calcScale(20),
            }}>
            {select === item.id ? (
              <Icon name="check" size={calcScale(22)} color="rgb(0, 0, 60)" />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getDataAndNavigate = () => {
    data.map((item, index) => {
      if (item.id === select) {
        addressSelected.push(item);
      }
    });
    navigation.navigate('CreateRequestView', {address: addressSelected});
  };

  const renderFooter = () => {
    return (
      <View style={{alignItems: 'center', marginTop: calcScale(20)}}>
        <PTButton
          title="Thêm địa chỉ"
          onPress={() => navigation.navigate('CreateAddressView')}
          style={styles.button}
          color="#fff"
        />
        <PTButton
          title="Xác nhận"
          onPress={() => getDataAndNavigate()}
          style={styles.button}
          color="#fff"
        />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={renderFooter}
    />
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
    marginTop: calcScale(5),
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
    width: '90%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
  },
});

export default AddressListView;
