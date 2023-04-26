import React from 'react';
import {StyleSheet, Pressable, Text, Image} from 'react-native';
import GetColors from '../utils/CommonColors';

export interface Props {
  title: string;
  arrowRight: any;
  image: any;
  onPress(): void;
}

const AddMembersBtn = (props: Props) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Image source={props.image} style={{height: 24, width: 24}} />
      <Text style={styles.title}>{props.title}</Text>
      <Image source={props.arrowRight} style={{height: 24, width: 24}} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: GetColors().WHITE,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 16,
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: 'rgb(225, 225, 225)',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 4},
  },
  title: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    lineHeight: 22,
    color: GetColors().TEXT_MAIN,
  },
});

export default AddMembersBtn;
