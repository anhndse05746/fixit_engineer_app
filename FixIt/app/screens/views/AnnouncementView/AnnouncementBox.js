import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Avatar} from 'react-native-paper';
import {calcScale} from '../../../utils/dimension';

const AnnouncementTitle = ({metionUser, title, ticket}) => {
  return (
    <>
      <Text style={styles.metionUser}>{metionUser}</Text>
      <Text style={styles.titleAnnoucement}> {title}</Text>
      <Text style={styles.titleTicket}>{ticket}</Text>
    </>
  );
};

const AnnouncementBox = ({item, navigation}) => {
  const [checkRead, setCheckRead] = React.useState(0);

  useEffect(() => {
    setCheckRead(item.checkRead);
  }, []);

  readNotification = async (id) => {
    if (checkRead !== 1) {
    } else {
    }
  };

  return (
    <ListItem
      containerStyle={{
        backgroundColor: checkRead === 0 ? '#e9f7fc' : '#fff',
      }}
      onPress={() => readNotification(item.id)}>
      <Avatar.Text size={calcScale(65)} label={item.metionUser.charAt(0)} />
      <ListItem.Content>
        <ListItem.Title numberOfLines={2}>
          <AnnouncementTitle
            metionUser={item.metionUser}
            title={item.tit}
            ticket={item.titleTicket}
          />
        </ListItem.Title>
        <ListItem.Subtitle style={styles.time}>
          {item.recordedTime}
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
