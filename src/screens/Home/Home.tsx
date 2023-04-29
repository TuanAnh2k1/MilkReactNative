import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetColors from '../../utils/CommonColors';

const Home = (props: {navigation: any}) => {
  const {navigation} = props;
  const getDataUser = async () => {
    try {
      const value = await AsyncStorage.getItem('role');
      if (value !== null || value || '') {
        navigation.navigate('Milk', {user: value});
      } else {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.imgWellcome}
        source={require('../../assets/wellcome.jpg')}
      /> */}
      <View style={{flex: 1}}>
        <Text style={styles.text1}>APP BÁN SỮA</Text>
        <Text style={styles.text2}>WELLCOME TO GEEZ APP</Text>
        <Text style={styles.text3}>
          Make your design workflow easier and save your time
        </Text>
      </View>
      <View style={styles.btnStarted}>
        <Button title="GET STARTED" onPress={getDataUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0b1e',
    paddingBottom: 8,
  },
  imgWellcome: {
    flex: 2,
    width: '100%',
  },
  text1: {
    color: '#a2b277',
    paddingTop: 50,
    paddingLeft: 41.5,
  },
  text2: {
    paddingVertical: 10,
    color: 'white',
    paddingLeft: 41.5,
    paddingRight: 130,
    fontWeight: '600',
    fontSize: 20,
  },
  text3: {
    color: 'white',
    paddingLeft: 41.5,
    paddingRight: 45,
    fontSize: 16,
  },
  btnStarted: {
    paddingHorizontal: 50,
    paddingTop: 16,
  },
});

export default Home;
