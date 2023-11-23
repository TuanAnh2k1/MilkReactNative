import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Image, Text, Button} from 'react-native';
import {NavBar} from '../../components';
import GetColors from '../../utils/CommonColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';
import {Rating, AirbnbRating} from 'react-native-ratings';

const Single = (props: {navigation: any}) => {
  const {navigation} = props;
  const [dataSingle, setDataSingle] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(Boolean);
  const [loading, setLoading] = useState(Boolean);
  const [is_Star, setIs_Star] = useState(0);
  console.log(dataSingle);

  useEffect(() => {
    const handleSingle = async () => {
      // Gửi thông tin đăng nhập đến API
      setLoading(true);
      const dataUser = await AsyncStorage.getItem('user');
      await fetch('https://milknodejs.onrender.com/single/getSingle', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: dataUser,
        }),
      })
        .then(response => response.json())
        .then(json => {
          // Xử lý phản hồi từ API
          if (json.message) {
            // Tạo tài khoản thành công
            setDataSingle(json?.result);
            setLoading(false);
          } else {
            // Tạo tài khoản thất bại
            console.log(json.error);
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
    handleSingle();
  }, []);

  const handleRatingWrapper = async (ratedValue, itemData) => {
    // Gọi handleRating với ratedValue và itemData
    console.log('Đánh giá:', ratedValue);
    console.log('Đánh giá:', itemData.idMilk);
    try {
      let resStar;
      await fetch('https://milknodejs.onrender.com/milk/getMilk', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: itemData.idMilk,
        }),
      })
        .then(response => response.json())
        .then(json => {
          // Xử lý phản hồi từ API
          // Update milk thành công
          resStar = json.result.star;
          console.log(json.result);
          console.log(json.message);
        });

      if (!resStar) {
        resStar = [];
      }

      await fetch('https://milknodejs.onrender.com/milk/updateMilk', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: itemData.idMilk,
          star: [...resStar, Number(ratedValue)],
        }),
      })
        .then(response => response.json())
        .then(json => {
          // Xử lý phản hồi từ API
          if (json.message) {
            // Tạo tài khoản thành công
            console.log(json.message);
          } else {
            // Tạo tài khoản thất bại
            console.log(json.error);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const updateSingle = item => {
    item.status = 1;
    console.log(item);

    fetch('https://milknodejs.onrender.com/single/updateSingle', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: item._id,
        idMilk: item.idMilk,
        idUser: item.idUser,
        name: item.name,
        describe: item.describe,
        image: item.image,
        price: item.price,
        supplier: item.supplier,
        email: item.email,
        phone: item.phone,
        address: item.address,
        quantity: item.quantity,
        status: 1,
        is_Star: 1,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // Xử lý phản hồi từ API
        if (json.message) {
          // Tạo tài khoản thành công
          setUpdateStatus(true);
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
      <NavBar
        title={'Đơn hàng của tôi'}
        onPressLeft={() => navigation.navigate('Milk')}
        style={{backgroundColor: GetColors().MAIN}}
        titleStyle={{color: GetColors().WHITE}}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.content}>
          {dataSingle.reverse()?.map((item, index) => {
            return (
              <View style={styles.list} key={index}>
                <View style={styles.contentImage}>
                  <Image
                    source={require('../../assets/sua1.jpg')}
                    style={styles.image}
                  />
                  <View style={styles.contentMilk}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.supplier}>{item.supplier}</Text>
                    <Text style={styles.price}>
                      Đơn giá: {item.price} vnđ/chiếc
                    </Text>
                    <Text style={styles.quantity}>
                      Số lượng: {item.quantity} chiếc
                    </Text>
                    <Text style={styles.quantityPrice}>
                      Thành tiền: {item.quantity * item.price} vnđ
                    </Text>
                    {item?.status == 1 ? (
                      <Text style={styles.price}>
                        Trạng thái: Đã nhận được hàng
                      </Text>
                    ) : (
                      <Text style={styles.price}>
                        Trạng thái: Đang vận chuyển
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.updateSingle}>
                  {item?.is_Star === 0 && (
                    <View style={styles.btnCancel}>
                      <Text>Cập nhật đơn hàng: </Text>
                      <AirbnbRating
                        count={5}
                        reviews={[
                          'Kém',
                          'Tạm được',
                          'Bình thường',
                          'Tốt',
                          'Xuất sắc',
                        ]}
                        defaultRating={0}
                        size={20}
                        onFinishRating={ratedValue => {
                          handleRatingWrapper(ratedValue, item);
                        }}
                      />
                    </View>
                  )}
                  <View style={styles.btnSuccess}>
                    <Button
                      title="Đã nhận được hàng"
                      onPress={() => {
                        updateSingle(item);
                      }}
                      color={GetColors().MAIN}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
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
    flex: 1,
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: GetColors().BG_MODAL,
    marginVertical: 2,
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
    paddingVertical: 4,
  },
  supplier: {
    fontSize: 16,
    color: GetColors().REDNOTI,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  price: {
    fontSize: 16,
    color: GetColors().BLACK400,
    paddingHorizontal: 12,
    paddingVertical: 4,
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
  updateSingle: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 3,
  },
  btnCancel: {
    flex: 1,
    paddingHorizontal: 10,
  },
  btnSuccess: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default Single;
