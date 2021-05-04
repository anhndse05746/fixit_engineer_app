import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Image, StyleSheet, View, TouchableOpacity, Switch} from 'react-native';
import {calcScale} from '../../../utils/dimension';

const SearchView = ({navigation, isEnabled, toggleSwitch, isDisabled}) => {
  return (
    <View style={styles.headerSafeArea}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <TouchableOpacity
            activeOpacity={1}
            underlayColor={'rgb(242, 85, 30)'}
            onPress={() => navigation.openDrawer()}
            style={styles.iconBox}>
            <Icon name="bars" size={calcScale(22)} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Image
              source={require('../../../assets/images/fixit-appCustomer.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Switch
            trackColor={{false: '#767577', true: 'rgb(255, 188, 0)'}}
            thumbColor={'#fff'}
            onValueChange={() => toggleSwitch()}
            value={isEnabled}
            disabled={isDisabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSafeArea: {
    zIndex: 1000,
    backgroundColor: 'rgb(0, 0, 60)',
  },
  header: {
    height: calcScale(60),
    paddingHorizontal: calcScale(10),
  },
  headerInner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  iconBox: {
    width: calcScale(40),
    height: calcScale(40),
    borderRadius: calcScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: calcScale(110),
  },
  headerTitle: {
    flexDirection: 'row',
  },
});

export default SearchView;
