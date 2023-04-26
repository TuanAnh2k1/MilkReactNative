import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {NavBar} from '../../../components';
import GetColors from '../../../utils/CommonColors';

const AddShirt = (props: {navigation: any}) => {
  const {navigation} = props;
  const [name, setName] = useState('');
  const [describe, setDescribe] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [supplier, setSupplier] = useState('');
  const [total, setTotal] = useState('');

  const handleAddShirt = async () => {
    // Gửi thông tin đăng nhập đến API
    console.log(name, describe, image, price, supplier);
    await fetch('https://musicfivestar.onrender.com/shirt/createShirt', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        describe: describe,
        image: image,
        price: price,
        supplier: supplier,
        total: total,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // Xử lý phản hồi từ API
        if (json.message) {
          // Tạo tài khoản thành công
          console.log(json?.message?.msgBody);
          navigation.navigate('Shirt', {loading: true});
        } else {
          // Tạo tài khoản thất bại
          console.log(json.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  // const chooseImage = () => {
  //   ImagePicker.launchImageLibrary({includeBase64: true}, response => {
  //     if (response.uri) {
  //       setImage(response.base64);
  //     }
  //   });
  // };
  return (
    <View style={styles.container}>
      <NavBar
        title={'Add Shirt'}
        style={{backgroundColor: GetColors().MAIN}}
        titleStyle={{color: GetColors().WHITE}}
        onPressLeft={() => {
          navigation.navigate('Shirt');
        }}
      />
      <ScrollView style={styles.content}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="name"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setName(text)}
            value={name}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="describe"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setDescribe(text)}
            value={describe}
          />
        </View>
        {/* <View style={styles.input}>
          {image && (
            <Image
              source={{uri: `data:${image.mime};base64,${image.data}`}}
              style={styles.image}
            />
          )}
          <Button title="Choose Image" onPress={chooseImage} />
        </View> */}
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="link image"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setImage(text)}
            value={image}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="price"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setPrice(text)}
            value={price}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="supplier"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setSupplier(text)}
            value={supplier}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputContent}
            placeholder="total"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setTotal(text)}
            value={total}
          />
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <Button
          title="Create Shirt"
          color={'tomato'}
          onPress={handleAddShirt}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    paddingVertical: 8,
    borderColor: GetColors().BG_MODAL,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
  },
  inputContent: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
});

export default AddShirt;
