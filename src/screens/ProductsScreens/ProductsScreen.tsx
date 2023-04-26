import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonFooter, ItemMember} from '../../components';
import TabBar from '../../components/TabBar';
import GetColors from '../../utils/CommonColors';

const ProductsScreens = () => {
  const comments = useSelector((state: any) => state.commentReducer.comments);
  const loading = useSelector((state: any) => state.commentReducer.isLoading);
  const dispatch = useDispatch();
  const [data, setData] = useState([
    {
      title: 'Hoạt động',
      hasNoti: false,
    },
    {
      title: 'Xác nhận thu',
      hasNoti: false,
    },
    {
      title: 'Bạn cần đóng',
      hasNoti: true,
    },
    {
      title: 'Báo cáo',
      hasNoti: false,
    },
    {
      title: 'Xem thêm',
      hasNoti: false,
    },
  ]);
  return (
    <View style={styles.container}>
      <TabBar data={data} initialTab={0} onSelect={() => {}} />
      {loading === true ? (
        <Text style={styles.textContent}>Loading</Text>
      ) : (
        <Text style={styles.textContent}>{JSON.stringify(comments)}</Text>
      )}
      <ItemMember
        name={'con cai nit'}
        image={require('../../assets/wellcome.jpg')}
      />
      <ButtonFooter
        title="Get comments"
        onPress={() => dispatch({type: 'GET_COMMENTS'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GetColors().MAIN,
  },
  textContent: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 2,
    height: 500,
    margin: 20,
    flex: 1,
  },
});

export default ProductsScreens;
