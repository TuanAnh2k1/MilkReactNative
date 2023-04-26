import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {NavBar} from '../../components';
import GetColors from '../../utils/CommonColors';
import Loading from '../../components/Loading';

const UpdateProfile = (props: {navigation: any}) => {
  const {navigation} = props;
  const profile = props.route.params.profile;
  const dataUserId = props.route.params.dataUserId;
  const idProfile = props.route.params.profile._id;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [sdt, setSdt] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(Boolean);

  useEffect(() => {
    setName(profile.name);
    setAddress(profile.address);
    setSdt(profile.sdt);
    setBirthday(profile.birthday);
    setEmail(profile.email);
    setGender(profile.gender);
    setLoading(profile.gender);
    setLoading(false);
  }, [
    profile.address,
    profile.birthday,
    profile.email,
    profile.gender,
    profile.name,
    profile.sdt,
  ]);

  const handleUpdateProfile = async () => {
    if (
      name === '' ||
      address === '' ||
      sdt === '' ||
      birthday === '' ||
      email === '' ||
      gender === ''
    ) {
      Alert.alert('Error', 'Vui lòng nhập đủ các thông tin!');
    } else {
      // Gửi thông tin đăng nhập đến API
      console.log('profile--------', name, dataUserId);
      setLoading(true);
      await fetch('https://musicfivestar.onrender.com/profile/updateProfile', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          address: address,
          sdt: sdt,
          birthday: birthday,
          email: email,
          gender: gender,
          account: dataUserId,
          _id: idProfile,
        }),
      })
        .then(response => response.json())
        .then(json => {
          // Xử lý phản hồi từ API
          if (json.message) {
            //Update profile thành công
            setLoading(false);
            navigation.navigate('Profile', {user: dataUserId});
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
      <View style={styles.container}>
        <NavBar
          title={'Update Profile'}
          style={{backgroundColor: GetColors().MAIN}}
          titleStyle={{color: GetColors().WHITE}}
          onPressLeft={() => {
            navigation.navigate('Home');
          }}
        />
        {loading ? (
          <Loading />
        ) : (
          <ScrollView style={styles.content}>
            <View style={styles.contentProfile}>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputContent}
                  placeholder="name"
                  placeholderTextColor="#000"
                  onChangeText={(text: string) => setName(text)}
                  value={name}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputContent}
                  placeholder="email"
                  placeholderTextColor="#000"
                  onChangeText={(text: string) => setEmail(text)}
                  value={email}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputContent}
                  placeholder="address"
                  placeholderTextColor="#000"
                  onChangeText={(text: string) => setAddress(text)}
                  value={address}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputContent}
                  placeholder="sdt"
                  placeholderTextColor="#000"
                  onChangeText={(text: string) => setSdt(text)}
                  value={sdt}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputContent}
                  placeholder="birthday"
                  placeholderTextColor="#000"
                  onChangeText={(text: string) => setBirthday(text)}
                  value={birthday}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputContent}
                  placeholder="gender"
                  placeholderTextColor="#000"
                  onChangeText={(text: string) => setGender(text)}
                  value={gender}
                />
              </View>
            </View>
            <View style={styles.btn}>
              <Button
                title="Lưu profile"
                color={'tomato'}
                onPress={handleUpdateProfile}
              />
            </View>
          </ScrollView>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
  },
  contentProfile: {
    flex: 1,
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

export default UpdateProfile;
