import i18next from '../../i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AddMembersBtn, ButtonFooter, NavBar} from '../../components';
import GetColors from '../../utils/CommonColors';

const AddMembers = (props: {navigation: any}) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <NavBar
        title={i18next.t('navbar.addMember')}
        onPressLeft={() => navigation.navigate('SignIn')}
        style={{backgroundColor: GetColors().MAIN}}
        titleStyle={{color: GetColors().WHITE}}
        iconStyle={{tintColor: 'white'}}
      />
      <View style={styles.listOptions}>
        <AddMembersBtn
          title="Thêm từ cây nhân sự"
          arrowRight={require('../../assets/arrow-right.png')}
          image={require('../../assets/link.png')}
          onPress={() => {}}
        />
        <AddMembersBtn
          title="Mã QR, mã mời tham gia"
          arrowRight={require('../../assets/arrow-right.png')}
          image={require('../../assets/qrcode.png')}
          onPress={() => navigation.navigate('QRCodeInvite')}
        />
        <AddMembersBtn
          title="Thêm thủ công"
          arrowRight={require('../../assets/arrow-right.png')}
          image={require('../../assets/edit.png')}
          onPress={() => {}}
        />
      </View>
      <ButtonFooter
        title="Bỏ qua"
        onPress={() => {
          navigation.navigate('Product');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GetColors().BG,
  },
  listOptions: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

export default AddMembers;
