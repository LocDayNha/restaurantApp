import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Item_List_Category from '../../item/Item_List_Category';
import Item_List_Order from '../../item/Item_List_Order';
import Slideshow from 'react-native-image-slider-show';
import AxiosInstance from '../../util/AxiosInstance';

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

const HomeMenu = props => {
  const {navigation} = props;

  const toProfile = () => {
    navigation.navigate('Profile');
  };
  const toHistory = () => {
    navigation.navigate('History');
  };

  const [position, setPosition] = useState(0);
  const [idCategory, setidCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [dataMenu, setdataMenu] = useState([]);
  const getData = async () => {
    setIsLoading(true);
    try {
      const dataFood = await AxiosInstance().get('/menu/get');
      if (!dataFood || dataFood.length === 0) {
        console.log('Lấy dữ liệu thất bại của /menu/get');
      } else {
        setdataMenu(dataFood);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMenu = async query => {
    setIsLoading(true);
    try {
      const searchResult = await AxiosInstance().get(
        `/menu/search?name=${query}`,
      );
      if (!searchResult || searchResult.length === 0) {
        console.log('Không tìm thấy kết quả cho tìm kiếm');
      } else {
        setdataMenu(searchResult);
      }
    } catch (error) {
      console.error(
        'Error searching menu:',
        error.response ? error.response.data : error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getMenuByCategory = async () => {
    setIsLoading(true);
    try {
      const dataByCategory = await AxiosInstance().get(
        '/menu/getByCategory/' + idCategory,
      );
      if (!dataByCategory || dataByCategory.length === 0) {
        console.log('Lấy dữ liệu thất bại của /menu/getByCategory/');
      } else {
        setdataMenu(dataByCategory);
      }
    } catch (error) {
      console.error('Error fetching menu by category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [dataCategory, setdataCategory] = useState([]);
  const getCategory = async () => {
    try {
      const dataCate = await AxiosInstance().get('/category/get');
      if (!dataCate || dataCate.length === 0) {
        console.log('Lấy dữ liệu thất bại của /category/get');
      } else {
        setdataCategory(dataCate);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    getData();
    getCategory();
  }, []);

  useEffect(() => {
    if (idCategory && idCategory !== null) {
      getMenuByCategory();
    }
  }, [idCategory]);

  const handleSearch = text => {
    setSearchQuery(text);
    if (text.length > 0) {
      searchMenu(text);
    } else {
      getData();
    }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header_container}>
        <Text style={styles.header}>Phoenix Restaurant</Text>
        <Image
          style={styles.avatar}
          source={require('../../image/logo_phoenixRestaurant.png')}
        />
      </View>

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
            onChangeText={handleSearch}
          />
          <Image style={styles.ic_search} />
        </View>
      </View>

      <Slideshow
        containerStyle={styles.banner}
        height={180}
        position={position}
        dataSource={Banner}
        scrollEnabled={true}
      />

      <View style={styles.list_category}>
        <FlatList
          data={dataCategory}
          renderItem={({item}) => (
            <Item_List_Category
              data={item}
              onchangeIdCategory={setidCategory}
              onPress={getMenuByCategory}
              bgcl={item._id === idCategory ? '#95AE45' : '#ffffff'}
              textColor={item._id === idCategory ? 'white' : 'black'}
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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={dataMenu}
          renderItem={({item}) => <Item_List_Order data={item} />}
          keyExtractor={item => item._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.foodListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
  avatar: {
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
    backgroundColor: '#fff',
    width: '90%',
    height: 45,
    borderRadius: 22.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
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
