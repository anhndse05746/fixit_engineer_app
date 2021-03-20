import React, {useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {CheckBox, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {calcScale} from '../../../utils/dimension';
import PTButton from '../../commonComponent/Button';
import commonStyles from '../Styles';

const CreateRequestView = ({navigation, route}) => {
  const user = useSelector((state) => state.user);

  const data = route.params.service;

  const address = route.params.address;

  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [request, setRequest] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [issues, setIssues] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorCheckbox, setErrorCheckbox] = React.useState('');

  const constructor = () => {
    if (constructorHasRun) {
      return;
    } else {
      data.issues.map((issue, index) => {
        const checkBox = {
          id: issue.id,
          checked: false,
          title: issue.name,
          estimate_fix_duration: issue.estimate_fix_duration,
          estimate_price: issue.estimate_price,
        };
        issues.push(checkBox);
      });
      setConstructorHasRun(true);
    }
  };

  constructor();

  const toggleCheckbox = (index) => {
    const checkboxData = [...issues];
    checkboxData[index].checked = !checkboxData[index].checked;
    setIssues(checkboxData);
  };

  const getDataAndNavigateConfirm = () => {
    const issuesData = [];
    issues.map((issue, index) => {
      if (issue.checked) {
        issuesData.push(issue);
      }
    });
    const requestData = {
      service: data.name,
      address: address,
      request: request,
      description: description,
      date: date,
      issues: issuesData,
    };
    if (request === '') {
      setErrorMessage(' không được để trống');
    } else if (issuesData.length === 0) {
      setErrorCheckbox('Bạn cần bọn vấn đề gặp phải');
    } else if (date === '') {
      setErrorCheckbox(' không được để trống');
    } else {
      setErrorMessage('');
      setErrorCheckbox('');
      navigation.navigate('ConfirmRequestView', {requestData: requestData});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              if (address === null || address === undefined) {
                navigation.navigate('AddressListView', {
                  selectedId: -1,
                });
              } else {
                navigation.navigate('AddressListView', {
                  selectedId: address[0].id,
                });
              }
            }}
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: calcScale(10),
            }}>
            <View style={[styles.row, {marginTop: calcScale(20)}]}>
              <View style={{marginLeft: calcScale(20)}}>
                <Text style={{fontSize: calcScale(24), fontWeight: 'bold'}}>
                  Địa chỉ
                </Text>
                <Text
                  style={{fontSize: calcScale(18), marginTop: calcScale(5)}}>
                  {user.name} | {user.phoneNumber}
                </Text>
                <Text style={{fontSize: calcScale(18)}}>
                  {address === null || address === undefined
                    ? 'Chọn địa chỉ'
                    : address[0].address +
                      ',' +
                      address[0].district +
                      ',' +
                      address[0].city}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginRight: calcScale(20),
                }}>
                <Icon name="chevron-right" size={calcScale(22)} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.form}>
            <View style={styles.formHeader}>
              <Text
                style={{
                  fontSize: calcScale(28),
                  fontWeight: 'bold',
                }}>
                Dịch vụ: {data.name}
              </Text>
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Yêu cầu
              </Text>
              <Input
                containerStyle={styles.input}
                inputContainerStyle={{borderBottomWidth: 0}}
                placeholder=""
                onChangeText={(request) => setRequest(request)}
                value={request}
                errorMessage={
                  errorMessage !== '' && request === ''
                    ? 'Yêu cầu' + errorMessage
                    : ''
                }
              />
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Vấn đề đang gặp phải
              </Text>
              {issues.map((item, index) => {
                return (
                  <CheckBox
                    title={item.title}
                    checked={item.checked}
                    onPress={() => toggleCheckbox(index)}
                    containerStyle={styles.checkBox}
                    key={index.toString()}
                  />
                );
              })}
              {errorCheckbox !== '' ? <Text>{errorCheckbox}</Text> : null}
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Mô tả chi tiết vấn đề gặp phải
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={(description) => setDescription(description)}
                value={description}
                style={{
                  borderColor: '#000',
                  borderRadius: calcScale(10),
                  borderWidth: 1,
                  backgroundColor: '#fff',
                }}
              />
            </View>
            <View style={styles.innerFormContainer}>
              <Text
                style={{
                  fontSize: calcScale(18),
                  fontWeight: 'bold',
                  marginBottom: calcScale(10),
                }}>
                Thời gian
              </Text>
              <DatePicker
                style={{width: '100%'}}
                date={date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
              {errorMessage !== '' && date === '' ? (
                <Text>Thời gian{errorMessage}</Text>
              ) : null}
            </View>
            <View style={[styles.innerFormContainer, {alignItems: 'center'}]}>
              <PTButton
                title="Tiếp tục"
                onPress={() => getDataAndNavigateConfirm()}
                style={styles.button}
                color="#fff"
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    marginTop: calcScale(5),
    marginHorizontal: calcScale(20),
  },
  formHeader: {
    marginVertical: calcScale(10),
  },
  innerFormContainer: {
    marginVertical: calcScale(10),
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: calcScale(50),
  },
  checkBox: {
    borderWidth: 0,
    padding: 0,
  },
  button: {
    marginTop: calcScale(20),
    width: '100%',
    height: calcScale(45),
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 60)',
  },
});

export default CreateRequestView;
