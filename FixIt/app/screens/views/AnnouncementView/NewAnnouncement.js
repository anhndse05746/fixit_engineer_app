import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {calcScale} from '../../../utils/dimension';
import commonStyles from '../Styles';
import AnnouncementBox from './AnnouncementBox';

const NewAnnouncement = ({data, navigation}) => {
  return (
    <View>
      {data && data.length > 0 ? (
        <View style={styles.titleGroup}>
          <Text style={styles.title}>New</Text>
        </View>
      ) : null}
      {data &&
        data.map((item, index) => {
          return (
            <AnnouncementBox
              item={item}
              key={item.id}
              navigation={navigation}
            />
          );
        })}
      <View style={styles.titleGroup}>
        <Text style={styles.title}>Earlier</Text>
      </View>
    </View>
  );
};

export default NewAnnouncement;

const styles = StyleSheet.create({
  titleGroup: {
    marginVertical: calcScale(15),
    marginLeft: calcScale(20),
  },
  title: {
    ...commonStyles.textBold,
    fontSize: calcScale(18),
  },
});
