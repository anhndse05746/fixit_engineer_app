import React, {useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import CommonStyles from '../Styles';

const CreateAddressView = ({navigation}) => {
  const [city, setCity] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {}, []);

  const validateThenNavigate = () => {
    if (city === '') {
      setErrorMessage(' không được để trống');
    } else if (district === '') {
      setErrorMessage(' không được để trống');
    } else if (address === '') {
      setErrorMessage(' không được để trống');
    } else {
      setErrorMessage('');
      navigation.navigate('AddressListView', {
        selectedId: -1,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.innerContainer}>
          <Text
            style={[
              styles.textRegular,
              {marginTop: calcScale(15), fontSize: calcScale(22)},
            ]}>
            Vui lòng điền những thông tin sau
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Thành phố <Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                onChangeText={(city) => setCity(city)}
                rightIcon={
                  city != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setCity('')}
                    />
                  ) : null
                }
                value={city}
                errorMessage={
                  errorMessage !== '' && city === ''
                    ? 'Thành phố' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Quận/Huyện<Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                onChangeText={(district) => setDistrict(district)}
                rightIcon={
                  district != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setDistrict('')}
                    />
                  ) : null
                }
                value={district}
                errorMessage={
                  errorMessage !== '' && district === ''
                    ? 'Quận/Huyện' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.textRegular}>
                Địa chỉ<Text style={{color: 'red'}}>*</Text>
              </Text>
              <Input
                containerStyle={styles.input}
                onChangeText={(address) => setAddress(address)}
                rightIcon={
                  address != '' ? (
                    <Icon
                      name="times-circle"
                      size={calcScale(15)}
                      color="grey"
                      onPress={() => setAddress('')}
                    />
                  ) : null
                }
                value={address}
                errorMessage={
                  errorMessage !== '' && address === ''
                    ? 'Phone number' + errorMessage
                    : ''
                }
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <PTButton
              title="Xác nhận"
              onPress={() => validateThenNavigate()}
              style={styles.button}
              color="#fff"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateAddressView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  innerContainer: {
    paddingHorizontal: calcScale(30),
  },
  formContainer: {
    justifyContent: 'center',
    marginVertical: calcScale(30),
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
  checkBox: {
    backgroundColor: '#fff',
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
  footerContainer: {
    justifyContent: 'center',
    marginHorizontal: calcScale(40),
  },
  row: {
    ...CommonStyles.row,
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    marginTop: calcScale(15),
  },
});
