import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {NavBar} from '../../../components';
import GetColors from '../../../utils/CommonColors';
import Loading from '../../../components/Loading';

const Card = (props: {navigation: any}) => {
  const {navigation} = props;
  const [tenchuthe, setTenchuthe] = useState('');
  const [kieuthe, setKieuthe] = useState('');
  const [sothe, setSothe] = useState('');
  const [socvd, setSocvd] = useState('');
  const [ngayhethan, setNgayhethan] = useState('');
  const [tinhphi, setTinhphi] = useState(0);
  const [loading, setLoading] = useState(Boolean);

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
      setLoading(true);
      await fetch('https://musicfivestar.onrender.com/card/getCard', {
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
        }),
      })
        .then(response => response.json())
        .then(json => {
          // Xử lý phản hồi từ API
          if (json.message) {
            // Tạo tài khoản thành công
            console.log(json?.result[0]?.sotienphaitra);
            setTinhphi(-1);
            let phi = json?.result[0]?.sotienphaitra;
            setTinhphi(phi);
            setLoading(false);
          } else {
            // Tạo tài khoản thất bại
            console.log(json.error);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <NavBar
            title={'Card'}
            style={{backgroundColor: GetColors().MAIN}}
            titleStyle={{color: GetColors().WHITE}}
            onPressLeft={() => {
              navigation.navigate('Shirt');
            }}
          />

          <ScrollView style={styles.content}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputContent}
                placeholder="tenchuthe"
                placeholderTextColor="#000"
                onChangeText={(text: string) => setTenchuthe(text)}
                value={tenchuthe}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputContent}
                placeholder="kieuthe"
                placeholderTextColor="#000"
                onChangeText={(text: string) => setKieuthe(text)}
                value={kieuthe}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputContent}
                placeholder="sothe"
                placeholderTextColor="#000"
                onChangeText={(text: string) => setSothe(text)}
                value={sothe}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputContent}
                placeholder="socvd"
                placeholderTextColor="#000"
                onChangeText={(text: string) => setSocvd(text)}
                value={socvd}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputContent}
                placeholder="ngayhethan"
                placeholderTextColor="#000"
                onChangeText={(text: string) => setNgayhethan(text)}
                value={ngayhethan}
              />
            </View>
          </ScrollView>
          <View style={styles.tinhphi}>
            {tinhphi >= 0 ? (
              <Text style={styles.phi}>
                Số tiền phải trả cho chuyến du lịch là:{' '}
                {tinhphi.toLocaleString()} vnđ
              </Text>
            ) : (
              <Text style={styles.phi}>Không có thông tin về chuyến đi</Text>
            )}
          </View>
          <View style={styles.btn}>
            <Button title="Tính phí" color={'tomato'} onPress={handleCard} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GetColors().BORDER,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    paddingVertical: 8,
    borderColor: GetColors().BG_MODAL,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
  },
  inputContent: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  tinhphi: {
    paddingHorizontal: 16,
  },
  phi: {
    fontWeight: '700',
    fontSize: 16,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
});

export default Card;
