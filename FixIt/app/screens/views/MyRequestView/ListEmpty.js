import * as React from 'react';
import {Text} from 'react-native';
import {calcScale} from '../../../utils/dimension';

const ListEmptyComponent = () => {
  return (
    <Text
      style={{
        color: '#587ebf',
        paddingTop: calcScale(20),
        fontSize: calcScale(15),
        fontWeight: 'bold',
        marginLeft: calcScale(16),
      }}>
      No record
    </Text>
  );
};

export default ListEmptyComponent;
