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
  Linking,
} from 'react-native';
import {NavBar} from '../../../components';
import GetColors from '../../../utils/CommonColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isValidEmail = checkEmail => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(checkEmail);
};

const EmailMilk = (props: {navigation: any}) => {
  const {navigation} = props;
  const data = props.route.params.data;
  const quantity = props.route.params.quantity;
  const [emailPush, setEmailPush] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dataUser, setDataUser] = useState('');
  const [tenchuthe, setTenChuThe] = useState('NGUYEN VAN A');
  const [kieuthe, setkieuthe] = useState('NCB');
  const [sothe, setsothe] = useState('9704198526191432198');
  const [socvd, setsocvd] = useState('NGUYEN VAN A');
  const [ngayhethan, setngayhethan] = useState('07/15');
  const [payment, setPayment] = useState('100000');
  const [checkPayment, setCheckPayment] = useState(Boolean);

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
      await fetch('https://milknodejs.onrender.com/single/createSingle', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idMilk: data._id,
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
            navigation.navigate('Milk');
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

  const VNPAY_ACCESS_KEY = 'your-access-key';
  const VNPAY_BASE_URL = 'https://sandbox.vnpayment.vn';
  const VNPAY_RETURN_URL = 'your-return-url';
  const VNPAY_NOTIFY_URL = 'your-notify-url';

  // Hàm tạo chuỗi checksum
  function createChecksum(data) {
    // TODO: Tạo chuỗi checksum theo định dạng của VNPAY
  }

  // Hàm tạo đối tượng yêu cầu thanh toán
  function createPaymentRequest(orderInfo) {
    const amount = orderInfo.amount;
    const orderDescription = orderInfo.description;
    const orderType = orderInfo.orderType;
    const orderId = orderInfo.orderId;

    const paymentUrl = `${VNPAY_BASE_URL}/paymentv2/vpcpay.html`;
    const returnUrl = VNPAY_RETURN_URL;
    const notifyUrl = VNPAY_NOTIFY_URL;
    const tmnCode = VNPAY_ACCESS_KEY;

    // Tạo chuỗi checksum
    const checksum = createChecksum({
      amount,
      orderDescription,
      orderType,
      orderId,
      paymentUrl,
      returnUrl,
      tmnCode,
      notifyUrl,
    });

    // Tạo đối tượng yêu cầu thanh toán
    const paymentRequest = {
      vnp_Amount: amount,
      vnp_Command: 'pay',
      vnp_CreateDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      vnp_CurrCode: 'VND',
      vnp_IpAddr: '',
      vnp_Locale: 'vn',
      vnp_OrderInfo: orderDescription,
      vnp_OrderType: orderType,
      vnp_ReturnUrl: returnUrl,
      vnp_TmnCode: tmnCode,
      vnp_TxnRef: orderId,
      vnp_Version: '2.0.0',
      vnp_SecureHashType: 'SHA256',
      vnp_SecureHash: checksum,
      vnp_Url: paymentUrl,
    };

    return paymentRequest;
  }

  // Hàm gửi yêu cầu thanh toán đến VNPAY
  async function sendPaymentRequest(paymentRequest) {
    const response = await axios.post(
      `${VNPAY_BASE_URL}/paymentv2/vpcpay.html`,
      paymentRequest,
    );
    return response.data;
  }

  const handleCard = async () => {
    if (
      tenchuthe === '' ||
      kieuthe === '' ||
      sothe === '' ||
      socvd === '' ||
      ngayhethan === ''
    ) {
      Alert.alert('Error', 'Vui lòng nhập đủ các thông tin!');
    } else {
      // Gửi thông tin đăng nhập đến API
      await fetch('https://milknodejs.onrender.com/card/createCard', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenchuthe: tenchuthe,
          kieuthe: kieuthe,
          sothe: sothe,
          socvd: socvd,
          ngayhethan: ngayhethan,
          sotienphaitra: payment,
        }),
      })
        .then(response => response.json())
        .then(json => {
          // Xử lý phản hồi từ API
          if (json.message) {
            // Tạo tài khoản thành công
          } else {
            // Tạo tài khoản thất bại
            console.log(json.error);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handlePressVnPay = () => {
    Linking.openURL('https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder');
    handleCard();
    setTimeout(() => setCheckPayment(true), 4000);
  };

  return (
    <View style={styles.container}>
      <NavBar
        title={'Xác Nhận'}
        onPressLeft={() => navigation.navigate('MilkDetail', {data: data})}
        style={{backgroundColor: GetColors().MAIN}}
        titleStyle={{color: GetColors().WHITE}}
      />
      <ScrollView style={styles.content}>
        <View style={styles.contentImage}>
          {data.image === '1' ? (
            <Image
              source={require('../../../assets/sua1.jpg')}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../../assets/sua2.jpg')}
              style={styles.image}
            />
          )}
          <View style={styles.contentMilk}>
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
        {checkPayment === true && (
          <Text style={styles.quantityPrice}>
            Số tiền phải thanh toán khi nhận hàng: 0vnđ
          </Text>
        )}
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.btnContent}>
          <Button
            title="Thanh toán VnPay"
            color={'blue'}
            onPress={handlePressVnPay}
          />
        </View>
        <View style={styles.btnContent}>
          <Button
            title="Đặt hàng"
            color={GetColors().MAIN}
            onPress={handlePress}
          />
        </View>
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
  contentMilk: {
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
    flex: 1,
  },
});

export default EmailMilk;
