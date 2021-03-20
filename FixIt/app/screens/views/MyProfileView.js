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

const MyProfileView = () => {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {updateUserMessage} = data;

  const [notEdit, setNotEdit] = React.useState(true);
  const [headerText, setHeaderText] = React.useState('Sửa');
  const [isHasAvatar, setIsHasAvatar] = React.useState(false);
  const [name, setName] = React.useState(data.name);
  const [phone, setPhone] = React.useState(data.phoneNumber);
  const [email, setEmail] = React.useState(data.email);

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
              Khách hàng
            </Text>
          </View>
        </View>
        <Text>{updateUserMessage}</Text>
        <View>
          <Input
            containerStyle={[styles.input, {width: calcScale(width)}]}
            inputContainerStyle={{borderBottomWidth: 0}}
            placeholder="Name"
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
            placeholder="Phone"
            onChangeText={(phone) => setPhone(phone)}
            value={phone}
            disabled={notEdit}
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
        </View>
      </View>
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
    paddingLeft: calcScale(10),
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: calcScale(50),
  },
});
