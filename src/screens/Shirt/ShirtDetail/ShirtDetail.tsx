import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Image,
  Text,
  Button,
} from 'react-native';
import {NavBar} from '../../../components';
import GetColors from '../../../utils/CommonColors';

const ShirtDetail = (props: {navigation: any}) => {
  const {navigation} = props;
  const data = props.route.params.data;
  const [quantity, setQuantity] = useState(1);
  const totals = Number(data.total);

  return (
    <View style={styles.container}>
      <NavBar
        title={'Shirt Detail'}
        onPressLeft={() => navigation.navigate('Shirt')}
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
        </View>
        <View style={styles.contentShirt}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.supplier}>{data.supplier}</Text>
        </View>
        <View style={styles.contentPrice}>
          <Text style={styles.price}>{data.price} vnđ</Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}>
              <Text style={styles.number}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable
              onPress={() => {
                setQuantity(quantity + 1);
              }}>
              <Text style={styles.number}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.contentTotal}>
          <Text style={styles.total}>còn lại: {data.total}</Text>
          {quantity > totals && (
            <Text style={styles.errorTotal}>
              Số lượng bạn chọn vượt quá hàng trong kho
            </Text>
          )}
        </View>
        <Text style={styles.describe}>{data.describe}</Text>
      </ScrollView>
      <View style={styles.btnContent}>
        <Button
          title="Đặt hàng"
          color={GetColors().MAIN}
          onPress={() => {
            navigation.navigate('EmailShirt', {
              data: data,
              quantity: quantity,
            });
          }}
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
  },
  image: {
    width: '100%',
    height: 300,
  },
  contentShirt: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: GetColors().BLACK900,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quantity: {
    fontSize: 20,
    color: GetColors().BLACK900,
    paddingHorizontal: 12,
  },
  supplier: {
    fontSize: 16,
    color: GetColors().REDNOTI,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contentPrice: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  price: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: GetColors().BLACK400,
  },
  number: {
    fontSize: 22,
    color: GetColors().BLACK900,
  },
  contentTotal: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  total: {
    color: GetColors().BLACK900,
    flex: 1,
  },
  errorTotal: {
    color: GetColors().RED500,
  },
  describe: {
    fontSize: 14,
    color: GetColors().BLACK,
    marginHorizontal: 16,
    paddingVertical: 8,
    borderColor: GetColors().BG_MODAL,
    borderTopWidth: 1,
  },
  btnContent: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});

export default ShirtDetail;
