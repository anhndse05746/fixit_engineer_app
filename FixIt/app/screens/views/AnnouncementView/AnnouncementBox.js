import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Avatar} from 'react-native-paper';
import {calcScale} from '../../../utils/dimension';

const AnnouncementBox = ({item, navigation}) => {
  const [checkRead, setCheckRead] = React.useState(false);
  // const requestData = {
  //   id: item.requestId,
  // };
  useEffect(() => {
    setCheckRead(item.isRead);
  }, []);

  // readNotification = async (id) => {
  //   if (checkRead !== 1) {
  //   } else {
  //   }
  // };

  return (
    <ListItem
      containerStyle={{
        backgroundColor: !checkRead ? 'rgb(255, 224, 216)' : '#fff',
        borderWidth: 1,
        borderColor: 'black',
      }}
      onPress={() => {
        navigation.navigate('MyRequestStackNavigator', {
          screen: 'RequestDetailView',
          params: {
            flag: 'myrequest',
            requestData: {id: item.request_id},
          },
        });
      }}>
      {/* <Avatar.Text size={calcScale(65)} label={item.metionUser.charAt(0)} /> */}
      <ListItem.Content>
        <ListItem.Title numberOfLines={2}>{item.title}</ListItem.Title>
        <ListItem.Subtitle style={styles.time}>
          {item.createdAt}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default AnnouncementBox;

const styles = StyleSheet.create({
  metionUser: {
    fontWeight: 'bold',
    fontSize: calcScale(18),
  },
  titleAnnoucement: {
    fontSize: calcScale(18),
  },
  titleTicket: {
    fontWeight: 'bold',
    color: '#2979f4',
    fontSize: calcScale(18),
  },
  time: {
    fontSize: calcScale(14),
  },
});
