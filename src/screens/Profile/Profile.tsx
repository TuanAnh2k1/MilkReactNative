import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, Button} from 'react-native';
import {NavBar} from '../../components';
import GetColors from '../../utils/CommonColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';

const Profile = (props: {navigation: any}) => {
  const {navigation} = props;
  const dataUserId = props.route.params.user;
  const [profile, setProfile] = useState([]);
  const [checkProfile, setCheckProfile] = useState(Boolean);
  const [loading, setLoading] = useState(Boolean);

  useEffect(() => {
    const handleProfile = async () => {
      setLoading(true);
      setCheckProfile(false);
      await fetch('https://musicfivestar.onrender.com/profile/getProfile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: dataUserId,
        }),
      })
        .then((response: any) => response.json())
        .then((data: any) => {
          // Xử lý phản hồi từ API
          if (data.success) {
            // Đăng nhập thành công
            console.log('profile', data.result);
            setLoading(false);
            setProfile(data.result);
          } else {
            // Tài khoản không có sẵn
            console.log(data.error);
            setCheckProfile(true);
            setLoading(false);
          }
        })
        .catch((error: any) => {
          console.error(error);
          setLoading(false);
        });
    };
    handleProfile();
  }, [props]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <NavBar
          title={'Profile'}
          style={{backgroundColor: GetColors().MAIN}}
          titleStyle={{color: GetColors().WHITE}}
        />
        {loading ? (
          <Loading />
        ) : (
          <ScrollView style={styles.listOptions}>
            {checkProfile === false ? (
              <View>
                <View>
                  <Text style={styles.textInputName}>Name: {profile.name}</Text>
                  <Text style={styles.textInput}>Email: {profile.email}</Text>
                  <Text style={styles.textInput}>
                    Address: {profile.address}
                  </Text>
                  <Text style={styles.textInput}>Phone: {profile.sdt}</Text>
                  <Text style={styles.textInput}>Gender: {profile.gender}</Text>
                </View>
                <View>
                  <Button
                    title="Sửa thông tin cá nhân"
                    onPress={() => {
                      navigation.navigate('UpdateProfile', {
                        profile: profile,
                        dataUserId: dataUserId,
                      });
                    }}
                  />
                </View>
              </View>
            ) : (
              <View>
                <View>
                  <Text style={styles.textInput}>Vui lòng tạo profile</Text>
                </View>
                <View>
                  <Button
                    title="Thêm mới thông tin cá nhân"
                    onPress={() => {
                      navigation.navigate('CreateProfile', {
                        profile: profile,
                        dataUserId: dataUserId,
                      });
                    }}
                  />
                </View>
              </View>
            )}
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
  listOptions: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 38,
  },
  content: {
    flexDirection: 'row',
  },
  textInput: {
    marginVertical: 16,
    marginHorizontal: 16,
    color: GetColors().BLACK400,
    fontSize: 16,
    fontWeight: '500',
  },
  textInputName: {
    marginVertical: 16,
    marginHorizontal: 16,
    fontSize: 20,
    fontWeight: '700',
    color: GetColors().RED500,
  },
});

export default Profile;
