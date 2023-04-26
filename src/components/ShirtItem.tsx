import React from 'react';
import {StyleSheet, Pressable, Text, Image, View} from 'react-native';
import GetColors from '../utils/CommonColors';

export interface Props {
  name: string;
  describe: string;
  arrowRight: any;
  image: string;
  price: string;
  onPress(): void;
}

const ShirtItem = (props: Props) => {
  console.log('11111111: ', props.image);

  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      {props.image === '1' ? (
        <Image
          source={require('../assets/ao_phong.jpg')}
          style={styles.image}
        />
      ) : (
        <Image source={require('../assets/ao_somi.jpg')} style={styles.image} />
      )}

      <View style={styles.itemContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.describe}>{props.describe}</Text>
      </View>
      <Text style={styles.price}>{props.price}vnđ</Text>
      <Image source={props.arrowRight} style={styles.imageLink} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: GetColors().WHITE,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: 'rgb(225, 225, 225)',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 4},
  },
  itemContainer: {
    flex: 1,
  },
  image: {
    width: 52,
    height: 52,
  },
  imageLink: {
    width: 24,
    height: 24,
  },
  name: {
    marginLeft: 16,
    fontSize: 16,
    lineHeight: 22,
    color: GetColors().TEXT_MAIN,
  },
  describe: {
    marginLeft: 16,
    fontSize: 16,
    lineHeight: 22,
    color: GetColors().TEXT_MAIN,
  },
  price: {
    fontSize: 16,
    lineHeight: 22,
    color: GetColors().TEXT_MAIN,
    borderLeftWidth: 1,
    borderLeftColor: GetColors().BLACK900,
    paddingLeft: 4,
  },
});

export default ShirtItem;
