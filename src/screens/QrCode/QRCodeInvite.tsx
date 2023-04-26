import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ButtonSolid, NavBar} from '../../components';
import GetColors from '../../utils/CommonColors';

const QRCodeInvite = (props: {navigation: any}) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
      />
      <NavBar
        title="QR"
        onPressLeft={() => navigation.navigate('AddMembers')}
        style={{backgroundColor: GetColors().MAIN}}
        titleStyle={{color: GetColors().WHITE}}
        iconStyle={{tintColor: 'white'}}
      />
      <View style={styles.main}>
        <Text style={styles.title}>Mã QR tham gia quỹ</Text>
        <Image
          source={require('../../assets/qrcode.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.action}>
        <ButtonSolid
          onPress={() => {}}
          title={'Lưu hình ảnh'}
          style={styles.saveImage}
          titleStyle={{color: GetColors().MAIN}}
        />
        <ButtonSolid
          onPress={() => {}}
          title={'Chia sẻ'}
          style={styles.shareImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GetColors().WHITE,
    position: 'relative',
  },
  backgroundImage: {
    height: 322,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  main: {
    marginTop: 32,
    left: '50%',
    transform: [{translateX: -155}],
    backgroundColor: GetColors().WHITE,
    height: 310,
    width: 310,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: 'rgb(225, 225, 225)',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 4},
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: GetColors().TEXT,
  },
  image: {
    height: 220,
    width: 220,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 28,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  saveImage: {
    backgroundColor: GetColors().WHITE,
    borderColor: GetColors().MAIN,
    borderWidth: 1,
    paddingHorizontal: 26,
    paddingVertical: 6,
    marginRight: 12,
  },
  shareImage: {
    paddingHorizontal: 46,
    paddingVertical: 6,
  },
});

export default QRCodeInvite;
