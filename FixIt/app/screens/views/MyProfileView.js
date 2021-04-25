import React, {useEffect} from 'react';
import {KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {View} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Header, Input} from 'react-native-elements';

import {width, calcScale} from '../../utils/dimension';
import CommonStyles from './Styles';
import {updateUser} from '../../store/user';
import {Picker} from '@react-native-picker/picker';
import {cityOfVN} from '../../utils/cityOfVietNam';
import {ScrollView} from 'react-native';

const MyProfileView = () => {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setConstructorHasRun(true);
    }
  };

  constructor();

  useEffect(() => {
    const cityIndex = cities.findIndex((x) => x.Id == data.city);
    const city = cities.find((x) => x.Id == data.city);
    const district = city.Districts.find((x) => x.Id == data.district);
    setSelectedCity(city.Id);
    setSelectedCityIndex(cityIndex);
    setSelectedDistrict(district.Id);
  });

  const edit = () => {
    setNotEdit(!notEdit);
    if (notEdit === true) {
      setHeaderText('Lưu');
    } else {
      setHeaderText('Sửa');
      if (name !== data.name || email !== data.email) {
        console.log(
          data.userId,
          data.phoneNumber,
          data.token,
          name,
          email,
          parseInt(selectedDistrict),
          parseInt(selectedCity),
          address,
        );
        dispatch(
          updateUser(
            data.userId,
            data.phoneNumber,
            data.token,
            name,
            email,
            parseInt(selectedDistrict),
            parseInt(selectedCity),
            address,
          ),
        );
      }
    }
  };

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
          <View style={{paddingTop: calcScale(20)}}>
            <Text style={[styles.textBold, {textAlign: 'center'}]}>
              {data.name}
            </Text>
            <Text style={[styles.textRegular, {textAlign: 'center'}]}>
              Thợ sửa chữa
            </Text>
            <Text style={[styles.textRegular, {textAlign: 'center'}]}>
              Số dư: 0 VND
            </Text>
          </View>
          <Text>{updateUserMessage}</Text>
          <View style={{paddingBottom: calcScale(50)}}>
            <Input
              containerStyle={[styles.input, {width: calcScale(width)}]}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Họ và Tên"
              onChangeText={(name) => setName(name)}
              value={name}
              disabled={notEdit}
            />
            <Input
              containerStyle={[
                styles.input,
                {width: calcScale(width), marginTop: calcScale(15)},
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
                {width: calcScale(width), marginTop: calcScale(15)},
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
