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
  const [cities, setCities] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedCityIndex, setSelectedCityIndex] = React.useState(0);
  const [selectedDistrict, setSelectedDistrict] = React.useState('');
  const [selectedDistrictIndex, setSelectedDistrictIndex] = React.useState(0);
  const [selectedWard, setSelectedWard] = React.useState('');

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      setCities(cityOfVN);
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
      if (name !== data.name || email !== data.email) {
        dispatch(updateUser(data.phoneNumber, data.token, name, email));
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
          <View>
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
            <View style={{paddingTop: calcScale(20)}}>
              <Text style={[styles.textBold, {textAlign: 'center'}]}>
                {data.name}
              </Text>
              <Text style={[styles.textRegular, {textAlign: 'center'}]}>
                Thợ sửa chữa
              </Text>
            </View>
          </View>
          <Text>{updateUserMessage}</Text>
          <View style={{paddingBottom: calcScale(50)}}>
            <Text
              style={[styles.textRegular, {paddingVertical: calcScale(20)}]}>
              ID number:
            </Text>
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
                enabled={notEdit}
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCity(itemValue);
                  setSelectedCityIndex(itemIndex);
                }}>
                {cities.map((city) => {
                  return (
                    <Picker.Item
                      label={city.Name}
                      value={city.Name}
                      key={city.Id}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                enabled={notEdit}
                selectedValue={selectedDistrict}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedDistrict(itemValue);
                  setSelectedDistrictIndex(itemIndex);
                }}>
                {cities.length > 0
                  ? cities[selectedCityIndex].Districts.map((district) => {
                      return (
                        <Picker.Item
                          label={district.Name}
                          value={district.Name}
                          key={district.Id}
                        />
                      );
                    })
                  : null}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                enabled={notEdit}
                selectedValue={selectedWard}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedWard(itemValue);
                }}>
                {cities.length > 0
                  ? cities[selectedCityIndex].Districts[
                      selectedDistrictIndex
                    ].Wards.map((ward) => {
                      return (
                        <Picker.Item
                          label={ward.Name}
                          value={ward.Name}
                          key={ward.Id}
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
