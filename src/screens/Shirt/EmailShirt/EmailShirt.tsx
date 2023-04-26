import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import {NavBar} from '../../../components';
import GetColors from '../../../utils/CommonColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isValidEmail = checkEmail => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(checkEmail);
};

const EmailShirt = (props: {navigation: any}) => {
  const {navigation} = props;
  const data = props.route.params.data;
  const quantity = props.route.params.quantity;
  const [emailPush, setEmailPush] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dataUser, setDataUser] = useState('');

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          setDataUser(value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDataUser();
  }, [props]);

  const handlePress = async () => {
    if (isValidEmail(emailPush)) {
      await fetch('https://musicfivestar.onrender.com/single/createSingle', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idShirt: data._id,
          idUser: dataUser,
          name: data.name,
          describe: data.describe,
          image: data.image,
          price: data.price,
          quantity: quantity,
          supplier: data.supplier,
          email: emailPush,
          phone: phone,
          address: address,
          status: 0,
        }),
      })
        .then(response => response.json())
        .then(json => {
          // Xử lý phản hồi từ API
          if (json.message) {
            // Tạo đơn hàng thành công
            navigation.navigate('Shirt');
          } else {
            // Tạo đơn hàng thất bại
            console.log(json.error);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      Alert.alert('Error', 'Invalid email!');
    }
  };

  return (
    <View style={styles.container}>
      <NavBar
        title={'Xác Nhận'}
        onPressLeft={() => navigation.navigate('ShirtDetail', {data: data})}
        style={{backgroundColor: GetColors().MAIN}}
        titleStyle={{color: GetColors().WHITE}}
      />
      <ScrollView style={styles.content}>
        <View style={styles.contentImage}>
          {data.image === '1' ? (
            <Image
              source={require('../../../assets/ao_phong.jpg')}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../../assets/ao_somi.jpg')}
              style={styles.image}
            />
          )}
          <View style={styles.contentShirt}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.supplier}>{data.supplier}</Text>
            <Text style={styles.price}>Đơn giá: {data.price} vnđ/chiếc</Text>
          </View>
        </View>
        <Text style={styles.quantity}>Số lượng: {quantity} chiếc</Text>
        <Text style={styles.quantityPrice}>
          Thành tiền: {quantity * data.price} vnđ
        </Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="email"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setEmailPush(text)}
            value={emailPush}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="sdt"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setPhone(text)}
            value={phone}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="địa chỉ"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setAddress(text)}
            value={address}
          />
        </View>
      </ScrollView>
      <View style={styles.btnContent}>
        <Button
          title="Đặt hàng"
          color={GetColors().MAIN}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GetColors().BORDER,
  },
  content: {
    flex: 1,
  },
  contentImage: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    width: '40%',
    height: 200,
  },
  contentShirt: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: GetColors().BLACK900,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  supplier: {
    fontSize: 16,
    color: GetColors().REDNOTI,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  price: {
    fontSize: 16,
    color: GetColors().BLACK400,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  describe: {
    fontSize: 14,
    color: GetColors().BLACK,
    marginHorizontal: 16,
    paddingVertical: 8,
    borderColor: GetColors().BG_MODAL,
    borderTopWidth: 1,
  },
  quantity: {
    fontSize: 20,
    color: GetColors().BLACK900,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityPrice: {
    fontSize: 20,
    color: GetColors().MAIN,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    paddingVertical: 8,
    marginHorizontal: 8,
    borderColor: GetColors().BG_MODAL,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
  },
  inputContent: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  btnContent: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});

export default EmailShirt;
