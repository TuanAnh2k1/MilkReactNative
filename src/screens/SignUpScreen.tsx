import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AccessToken, LoginButton} from 'react-native-fbsdk-next';
import {GoogleSignin} from 'react-native-google-signin';

const SignUpScreen = (props: {navigation: any}) => {
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleSignup = () => {
    // Gửi thông tin đăng nhập đến API
    console.log(username, password, role);
    fetch('https://milknodejs.onrender.com/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: role,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // Xử lý phản hồi từ API
        if (json.message) {
          // Tạo tài khoản thành công
          console.log(json?.message?.msgBody);
          navigation.navigate('SignIn');
        } else {
          // Tạo tài khoản thất bại
          console.log(json.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.imgLogin} source={require('../assets/milk02.jpg')} />
      <View style={styles.content}>
        <Text style={styles.textLogin}>SIGN UP</Text>
        <View style={styles.textInput}>
          <Image
            style={styles.iconInput}
            source={require('../assets/at.png')}
          />
          <TextInput
            style={styles.inputContent}
            placeholder="E-Mail"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.textInput}>
          <Image
            style={styles.iconInput}
            source={require('../assets/padlock.png')}
          />
          <TextInput
            style={styles.inputContent}
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
          <Image
            style={styles.iconInput}
            source={require('../assets/hidden.png')}
          />
        </View>
        <View style={{flexDirection: 'row', paddingTop: 32}}>
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + JSON.stringify(error));
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  setUsername(data?.userID);
                  setPassword('123');
                  setRole('user');
                  // console.log(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          />
          {/* <View style={styles.link}>
            <Pressable
              onPress={() => {
                GoogleSignin.hasPlayServices()
                  .then(hasPlayService => {
                    if (hasPlayService) {
                      GoogleSignin.signIn()
                        .then(userInfo => {
                          // setUsername(data?.userID);
                          // setPassword('123');
                          // setRole('user');
                          console.log(JSON.stringify(userInfo));
                        })
                        .catch(e => {
                          console.log(
                            'ERROR IS hasPlayService: ' + JSON.stringify(e),
                          );
                        });
                    }
                  })
                  .catch(e => {
                    console.log('ERROR IS: ' + JSON.stringify(e));
                  });
              }}>
              <Image
                style={{width: 38, height: 38}}
                source={require('../assets/google-plus.png')}
              />
            </Pressable>
          </View> */}
        </View>
        <View style={{paddingTop: 70}}>
          <Button title="SIGN UP" color={'tomato'} onPress={handleSignup} />
        </View>
        <Pressable
          style={{paddingVertical: 18, marginLeft: '42%'}}
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text>SIGN IN</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  imgLogin: {
    width: '100%',
    flex: 1,
    opacity: 0.4,
  },
  content: {
    width: '100%',
    position: 'absolute',
    marginTop: '30%',
    paddingHorizontal: 30,
  },
  textLogin: {
    fontWeight: '700',
    fontSize: 36,
    color: 'white',
    paddingBottom: 60,
  },
  textInput: {
    color: '#999',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
  },
  iconInput: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  inputContent: {
    fontSize: 18,
    paddingVertical: 20,
    flex: 1,
  },
  link: {
    flexDirection: 'row',
    marginLeft: 16,
  },
});

export default SignUpScreen;
