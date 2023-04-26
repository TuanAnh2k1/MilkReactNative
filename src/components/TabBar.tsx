import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, FlatList} from 'react-native';
import GetColors from '../utils/CommonColors';

interface IData {
  title: string;
  hasNoti: boolean;
}

export interface TabBarProps {
  data: IData[];
  onSelect(): void;
  initialTab: number;
}

const TabBar = (props: TabBarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(props.initialTab);

  const renderItemTab = ({item, index}: {item: IData; index: number}) => {
    const isFocused = index === selectedIndex;
    return (
      <Pressable onPress={() => setSelectedIndex(index)}>
        <>
          <Text style={isFocused ? styles.title : styles.titleFocus}>
            {item.title}
            {item.hasNoti && <View style={styles.noti} />}
          </Text>
          {isFocused && <View style={styles.tabFocus} />}
        </>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabList}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={props.data}
          renderItem={renderItemTab}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  tabList: {
    paddingHorizontal: 16,
    backgroundColor: GetColors().WHITE,
    borderBottomColor: GetColors().BORDER,
    borderBottomWidth: 2,
  },
  title: {
    color: GetColors().MAIN,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  titleFocus: {
    color: GetColors().BLACK900,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  tabFocus: {
    marginHorizontal: 8,
    borderBottomColor: GetColors().MAIN,
    borderBottomWidth: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  noti: {
    width: 8,
    height: 8,
    backgroundColor: GetColors().REDNOTI,
    borderRadius: 4,
    position: 'absolute',
  },
});

export default TabBar;
