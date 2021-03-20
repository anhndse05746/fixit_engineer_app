import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import {calcScale} from '../../utils/dimension';
import commonStyles from './Styles';

const MyProfileDrawer = ({navigation}) => {
  const [isHasAvatar, setIsHasAvatar] = React.useState(false);

  let data = useSelector((state) => state.user);

  const logOut = () => {
    // navigation.navigate('OutsideStack');
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.containHeader}>
          <View
            style={{
              alignItems: 'center',
            }}>
            {isHasAvatar ? (
              <Avatar rounded size={calcScale(150)} />
            ) : (
              <Avatar
                rounded
                size={calcScale(150)}
                containerStyle={{
                  borderColor: 'rgb(0, 0, 60)',
                  borderWidth: calcScale(2),
                }}
                icon={{
                  name: 'user',
                  color: 'rgb(0, 0, 60)',
                  type: 'font-awesome',
                }}
              />
            )}
            <View>
              <Text
                style={[
                  styles.textBold,
                  {paddingTop: calcScale(10), textAlign: 'center'},
                ]}>
                {data.name}
              </Text>
              <Text
                style={[
                  styles.textRegular,
                  {
                    paddingTop: calcScale(3),
                    textAlign: 'center',
                    fontSize: calcScale(20),
                  },
                ]}>
                {data.phoneNumber}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChangePasswordView')}>
            <View style={[styles.row, {paddingLeft: calcScale(20)}]}>
              <Icon name="lock" size={calcScale(24)} color="rgb(0, 0, 60)" />
              <Text
                style={[
                  styles.textMedium,
                  {paddingLeft: calcScale(20), fontSize: calcScale(20)},
                ]}>
                Đổi mật khẩu
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={[styles.row, {paddingLeft: calcScale(20)}]}>
              <Icon
                name="gratipay"
                size={calcScale(24)}
                color="rgb(0, 0, 60)"
              />
              <Text
                style={[
                  styles.textMedium,
                  {paddingLeft: calcScale(20), fontSize: calcScale(20)},
                ]}>
                Các thợ đã thích
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={[styles.row, {paddingLeft: calcScale(20)}]}>
              <Icon
                name="info-circle"
                size={calcScale(24)}
                color="rgb(0, 0, 60)"
              />
              <Text
                style={[
                  styles.textMedium,
                  {paddingLeft: calcScale(20), fontSize: calcScale(20)},
                ]}>
                Về FixIt
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => logOut()}>
            <Text style={styles.headmanText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MyProfileDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  containHeader: {
    paddingTop: calcScale(30),
    paddingBottom: calcScale(10),
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBold: {
    ...commonStyles.textBold,
    fontSize: calcScale(30),
  },
  textRegular: {
    ...commonStyles.textRegular,
  },
  headmanText: {
    ...commonStyles.textBold,
    fontSize: calcScale(20),
    color: '#fff',
  },
  button: {
    width: '100%',
    height: calcScale(60),
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: calcScale(60),
    backgroundColor: 'rgb(0, 0, 60)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
