import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  Text,
} from 'react-native';
import {NavBar} from '../../components';
import GetColors from '../../utils/CommonColors';
import ShirtItem from '../../components/ShirtItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';

const Shirt = (props: {navigation: any}) => {
  const {navigation} = props;
  const [dataUser, setDataUser] = useState('');
  const [dataUserId, setDataUserId] = useState('');
  const [listShirt, setListShirt] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(Boolean);

  const getDataUser = async () => {
    try {
      const value = await AsyncStorage.getItem('role');
      if (value !== null) {
        setDataUser(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDataUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setDataUserId(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleLogin = async () => {
      console.log('listShirt');
      setLoading(true);
      setListShirt([]);
      await fetch('https://musicfivestar.onrender.com/shirt/getAllShirt', {
        method: 'GET',
      })
        .then((response: any) => response.json())
        .then((data: any) => {
          // Xử lý phản hồi từ API
          if (data.success) {
            // Đăng nhập thành công
            console.log('listShirt', data.result);
            setListShirt(data.result);
            setLoading(false);
          } else {
            // Đăng nhập thất bại
            console.log(data.error);
            setLoading(false);
          }
        })
        .catch((error: any) => {
          console.error(error);
          setLoading(false);
        });
    };
    handleLogin();
    getDataUser();
    getDataUserId();
  }, [props]);

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      setListShirt([]);
      await fetch(
        'https://musicfivestar.onrender.com/shirt/getAllShirt/search',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            search: search,
          }),
        },
      )
        .then((response: any) => response.json())
        .then((data: any) => {
          // Xử lý phản hồi từ API
          if (data.success) {
            // Đăng nhập thành công
            console.log('listShirtSearch', data.result);
            setListShirt(data.result);
            setLoading(false);
          } else {
            // Đăng nhập thất bại
            console.log(data.error);
            setLoading(false);
          }
        })
        .catch((error: any) => {
          console.error(error);
          setLoading(false);
        });
    };
    handleSearch();
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <NavBar
          title={'List Shirt'}
          style={{backgroundColor: GetColors().MAIN}}
          titleStyle={{color: GetColors().WHITE}}
        />
        <View style={styles.textInput}>
          <TextInput
            style={styles.inputContent}
            placeholder="search"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setSearch(text)}
          />
          <Image
            style={styles.iconInput}
            source={require('../../assets/search.png')}
          />
        </View>
        <View style={styles.content}>
          {dataUser === 'admin' && (
            <Pressable
              style={styles.shirt}
              onPress={() => {
                navigation.navigate('AddShirt');
              }}>
              <Text style={styles.addShirt}>+Add shirt</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              navigation.navigate('Single', {
                dataUserId: dataUserId,
              });
            }}>
            <Text style={styles.single}>Đơn hàng của tôi</Text>
          </Pressable>
        </View>
        {/* <Pressable
          style={{paddingHorizontal: 8}}
          onPress={() => {
            navigation.navigate('Card');
          }}>
          <Text style={styles.addCard}>Tính phí du lịch qua thẻ</Text>
        </Pressable> */}
        {loading ? (
          <Loading />
        ) : (
          <ScrollView style={styles.listOptions}>
            {listShirt?.map(item => {
              return (
                <>
                  <ShirtItem
                    key={`item${item}`}
                    name={item.name}
                    describe={item.describe}
                    price={item.price}
                    arrowRight={require('../../assets/arrow-right.png')}
                    image={item.image}
                    onPress={() => {
                      navigation.navigate('ShirtDetail', {
                        data: item,
                      });
                    }}
                  />
                </>
              );
            })}
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
  shirt: {
    flex: 1,
  },
  textInput: {
    color: '#999',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  iconInput: {
    width: 18,
    height: 18,
    right: 8,
  },
  inputContent: {
    fontSize: 18,
    flex: 1,
  },
  addShirt: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '700',
    color: GetColors().MAIN,
    paddingBottom: 8,
  },
  addCard: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '700',
    color: GetColors().BLACK400,
  },
  single: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '700',
    color: GetColors().REDNOTI,
    paddingBottom: 8,
  },
});

export default Shirt;
