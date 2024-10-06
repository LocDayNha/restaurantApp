import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import Item_List_Category from '../../item/Item_List_Category';
import Item_List_Order from '../../item/Item_List_Order';
import Slideshow from 'react-native-image-slider-show';
import AxiosInstance from '../../util/AxiosInstance'

const Banner = [
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/Banner%2FFood%20Banner.png?alt=media&token=04e370ad-ffa7-454e-93ef-acc6d09e8bfe',
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/Banner%2FIce%20Cream%20Food%20Banner.png?alt=media&token=50ab00da-a04f-4959-ab53-36fcfbc0c466',
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/Banner%2FFast%20Food%20Banner.png?alt=media&token=80895639-688f-490c-9835-6e9c5aab7879',
  },
];

const HomeMenu = (props) => {
  const { navigation } = props;

  const toProfile = () => {
    navigation.navigate("Profile")
  }

  const [position, setPosition] = useState(0); // slide ảnh quảng cáo
  const [idCategory, setidCategory] = useState(null);

  // get all menu
  const [dataMenu, setdataMenu] = useState([]);
  const getData = async () => {
    const dataFood = await AxiosInstance().get("/menu/get");
    if (!dataFood || dataFood.lenght === 0) {
      ToastAndroid.show("Lấy dữ liệu thấy bại", ToastAndroid.SHORT);
    } else {
      setdataMenu(dataFood);
    }
  };

  // get menu by category
  const getMenuByCategory = async () => {
    const dataByCategory = await AxiosInstance().get("/menu/getByCategory/" + idCategory);
    if (!dataByCategory || dataByCategory.lenght === 0) {
      ToastAndroid.show("Lấy dữ liệu thấy bại", ToastAndroid.SHORT);
    } else {
      setdataMenu(dataByCategory);
    }
  };

  // get category
  const [dataCategory, setdataCategory] = useState([]);
  const getCategory = async () => {
    const dataCate = await AxiosInstance().get("/category/get");
    if (!dataCate || dataCate.lenght === 0) {
      ToastAndroid.show("Lấy dữ liệu thấy bại", ToastAndroid.SHORT);
    } else {
      setdataCategory(dataCate);
    }
  };

  useEffect(() => {
    getData(),
      getCategory();
    return () => {

    }
  }, [])

  useEffect(() => {
    if (idCategory && idCategory !== null) {
      getMenuByCategory();
    }
  }, [idCategory])

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header_container}>
        <Text style={styles.header}>Phoenix Restaurant</Text>
        <TouchableOpacity onPress={toProfile}>
          <Image style={styles.avata} source={require('../../image/gura.jpg')} />
        </TouchableOpacity>
      </View>

      {/* Tìm kiếm */}
      <View elevation={5} style={styles.searchContainer}>
        <View style={styles.search}>
          <Image
            style={styles.ic_search}
            source={require('../../icon/ic_search.png')}
          />
          <TextInput
            placeholder="Tìm kiếm"
            placeholderTextColor={'#888'}
            style={styles.content_search}
          />
          <Image
            style={styles.ic_search}
            source={require('../../icon/ic_delete.png')}
          />
        </View>
      </View>

      {/* Hình gì đây chưa xác định ?? */}
      <Slideshow
        containerStyle={styles.banner}
        height={180}
        position={position}
        dataSource={Banner}
        scrollEnabled={true}
      />

      {/* Danh sách loại món ăn */}
      <View style={styles.list_category}>
        <FlatList
          data={dataCategory}
          renderItem={({ item }) => (
            <Item_List_Category
              data={item}
              onchangeIdCategory={setidCategory}
              onPress={getMenuByCategory}
              bgcl={item._id === dataCategory._id ? '#95AE45' : '#ffffff'}
              textColor={item._id === dataCategory._id ? 'white' : 'black'}
            />
          )}
          keyExtractor={item => item._id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryListContainer}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={dataMenu}
      renderItem={({ item }) => <Item_List_Order data={item} />}
      keyExtractor={item => item._id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.foodListContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    marginLeft: 10
  },
  avata: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  header_container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  search: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '90%',
    height: 45,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ic_search: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  content_search: {
    fontSize: 16,
    flex: 1,
  },
  banner: {
    marginLeft: '5%',
    marginTop: 20,
    borderRadius: 20,
    width: '90%',
    height: 180,
  },
  list_category: {
    width: '100%',
    marginTop: 10,
  },
  categoryListContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  list_food: {
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  foodListContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default HomeMenu;
