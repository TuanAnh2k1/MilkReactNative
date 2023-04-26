import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import GetColors from '../utils/CommonColors';

export interface Props {
  name: string;
  image?: any;
}

const ItemMember = (props: Props) => {
  return (
    <View style={styles.container}>
      {props.image ? (
        <Image source={props.image} style={styles.image} />
      ) : (
        <Image source={require('../assets/signup.jpg')} style={styles.image} />
      )}
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GetColors().BORDER,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
  },
  name: {
    color: GetColors().BLACK900,
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 16,
  },
});

export default ItemMember;
