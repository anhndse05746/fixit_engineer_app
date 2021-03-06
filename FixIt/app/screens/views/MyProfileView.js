import React, {useEffect} from 'react';
import {KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {View} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Header, Input} from 'react-native-elements';
import {width, calcScale} from '../../utils/dimension';
import CommonStyles from './Styles';
import {updateUser} from '../../store/user';
import {Picker} from '@react-native-picker/picker';
import {cityOfVN} from '../../utils/cityOfVietNam';
import {ScrollView} from 'react-native';
import userPreferences from '../../libs/UserPreferences';
import {
  EncryptionKey_TOKEN_KEY,
  TOKEN_KEY,
  USER_KEY,
} from '../../utils/constants';

const MyProfileView = () => {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {updateUserMessage} = data;

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [notEdit, setNotEdit] = React.useState(true);
  const [headerText, setHeaderText] = React.useState('Sửa');
  const [isHasAvatar, setIsHasAvatar] = React.useState(false);
  const [name, setName] = React.useState(data.name);
  const [phone, setPhone] = React.useState(data.phoneNumber);
  const [email, setEmail] = React.useState(data.email);
  const [address, setAddress] = React.useState(data.address);
  const [cities, setCities] = React.useState(cityOfVN);
  const [selectedCity, setSelectedCity] = React.useState(0);
  const [selectedCityIndex, setSelectedCityIndex] = React.useState(0);
  const [selectedDistrict, setSelectedDistrict] = React.useState(0);
  const [nationId, setNationId] = React.useState(data.identity_card_number);
  const [errorMessage, setErrorMessage] = React.useState('');

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      const cityIndex = cities.findIndex((x) => x.Id == data.city);
      const city = cities.find((x) => x.Id == data.city);
      const district = city.Districts.find((x) => x.Id == data.district);
      setSelectedCity(city.Id);
      setSelectedCityIndex(cityIndex);
      setSelectedDistrict(district.Id);
      setConstructorHasRun(true);
    }
  };

  constructor();

  const edit = () => {
    setNotEdit(!notEdit);
    if (notEdit === true) {
      setHeaderText('Lưu');
    } else {
      setHeaderText('Sửa');
      if (
        name !== data.name ||
        email !== data.email ||
        selectedCity != data.city ||
        selectedDistrict != data.selectedDistrict ||
        address != data.address
      ) {
        console.log(
          data.userId,
          data.phoneNumber,
          data.token,
          name,
          email,
          parseInt(selectedDistrict),
          parseInt(selectedCity),
          address,
          nationId,
        );
        if (name.trim() === '') {
          setErrorMessage(' không được để trống');
        } else if (nationId.trim() === '') {
          setErrorMessage(' không được để trống');
        } else if (selectedCity === 0) {
          setErrorMessage(' không được để trống');
        } else if (selectedDistrict === 0) {
          setErrorMessage(' không được để trống');
        } else if (address.trim() === '') {
          setErrorMessage(' không được để trống');
        } else {
          setErrorMessage('');
          dispatch(
            updateUser(
              data.userId,
              data.phoneNumber,
              data.token,
              name.trim(),
              email.trim(),
              parseInt(selectedDistrict),
              parseInt(selectedCity),
              address.trim(),
              nationId.trim(),
            ),
          );
        }
      }
    }
  };

  useEffect(() => {
    console.log(updateUserMessage);
    if (updateUserMessage) {
      if (data) {
        userPreferences.setEncryptData(
          TOKEN_KEY,
          data.token,
          EncryptionKey_TOKEN_KEY,
        );
        // console.log('login data: ' + JSON.stringify(data));
        const userData = {
          id: data.userId,
          phone: data.phoneNumber,
          name: data.name,
          roleId: data.roleId,
          email: data.email,
          token: data.token,
          city: selectedDistrict,
          district: selectedCity,
          is_verify: data.is_verify,
          address: address,
          major_id: data.major,
          identity_card_number: nationId,
          is_active: data.is_active,
        };
        // console.log('user data: ' + JSON.stringify(userData));
        userPreferences.setObjectAsync(USER_KEY, userData);
      }
      alert(updateUserMessage);
    }
  }, [updateUserMessage]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header
        rightComponent={{
          text: headerText,
          style: {color: '#fff'},
          onPress: () => edit(),
        }}
        backgroundColor="rgb(0, 0, 60)"
      />
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={{paddingTop: calcScale(10)}}>
            {isHasAvatar ? (
              <Avatar rounded size={calcScale(130)} />
            ) : (
              <Avatar
                rounded
                size={calcScale(130)}
                containerStyle={{
                  borderColor: 'rgb(0, 0, 60)',
                  borderWidth: calcScale(2),
                  backgroundColor: '#fff',
                }}
                icon={{
                  name: 'user',
                  color: 'rgb(0, 0, 60)',
                  type: 'font-awesome',
                }}
              />
            )}
          </View>
          <View style={{paddingVertical: calcScale(20)}}>
            <Text style={[styles.textBold, {textAlign: 'center'}]}>
              {data.name}
            </Text>
            <Text style={[styles.textRegular, {textAlign: 'center'}]}>
              Thợ sửa chữa
            </Text>
          </View>
          <View style={{paddingBottom: calcScale(50)}}>
            <Input
              containerStyle={[styles.input, {width: calcScale(width)}]}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Họ và Tên"
              onChangeText={(name) => setName(name)}
              value={name}
              disabled={notEdit}
              errorMessage={
                errorMessage !== '' && name === ''
                  ? 'Họ và tên' + errorMessage
                  : ''
              }
            />
            <Input
              containerStyle={[
                styles.input,
                {width: calcScale(width), marginTop: calcScale(20)},
              ]}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="CMT/CCCD"
              onChangeText={(nationId) => setNationId(nationId.trim())}
              value={nationId}
              disabled={notEdit}
              errorMessage={
                errorMessage !== '' && nationId === ''
                  ? 'Số CMT/CCCD' + errorMessage
                  : ''
              }
            />
            <Input
              containerStyle={[
                styles.input,
                {width: calcScale(width), marginTop: calcScale(20)},
              ]}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Điện thoại"
              onChangeText={(phone) => setPhone(phone)}
              value={phone}
              disabled
              keyboardType="number-pad"
            />
            <Input
              containerStyle={[
                styles.input,
                {width: calcScale(width), marginTop: calcScale(20)},
              ]}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              value={email}
              disabled={notEdit}
              keyboardType="email-address"
            />
            <View style={styles.picker}>
              <Picker
                enabled={!notEdit}
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCity(itemValue);
                  setSelectedCityIndex(itemIndex);
                  setSelectedDistrict(cities[itemIndex].Districts[0].Id);
                }}>
                {cities.map((city) => {
                  return (
                    <Picker.Item
                      label={city.Name}
                      value={city.Id}
                      key={city.Id}
                    />
                  );
                })}
              </Picker>
              {errorMessage !== '' && selectedCity === 0 ? (
                <Text style={{color: 'red'}}>Thành phố {errorMessage}</Text>
              ) : null}
            </View>
            <View style={styles.picker}>
              <Picker
                enabled={!notEdit}
                selectedValue={selectedDistrict}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedDistrict(itemValue);
                }}>
                {cities.length > 0
                  ? cities[selectedCityIndex].Districts.map((district) => {
                      return (
                        <Picker.Item
                          label={district.Name}
                          value={district.Id}
                          key={district.Id}
                        />
                      );
                    })
                  : null}
              </Picker>
              {errorMessage !== '' && selectedDistrict === 0 ? (
                <Text style={{color: 'red'}}>Quận/Huyện {errorMessage}</Text>
              ) : null}
            </View>
            <Input
              containerStyle={[
                styles.input,
                {width: calcScale(width), marginTop: calcScale(15)},
              ]}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Địa chỉ"
              onChangeText={(address) => setAddress(address)}
              value={address}
              disabled={notEdit}
              errorMessage={
                errorMessage !== '' && address === ''
                  ? 'Địa chỉ' + errorMessage
                  : ''
              }
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MyProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcScale(20),
    flex: 1,
  },
  textBold: {
    ...CommonStyles.textBold,
    fontSize: calcScale(30),
    color: '#000',
    textAlign: 'left',
    paddingLeft: calcScale(10),
  },
  textRegular: {
    ...CommonStyles.textRegular,
    fontSize: calcScale(20),
    color: '#000',
    textAlign: 'left',
    // paddingLeft: calcScale(10),
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: calcScale(60),
  },
  picker: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: calcScale(10),
    height: calcScale(60),
  },
});
