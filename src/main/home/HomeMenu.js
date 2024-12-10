import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import Slider from '@react-native-community/slider';
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

const HomeMenu = ({navigation}) => {
  const [position, setPosition] = useState(0);
  const [idCategory, setidCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(500000); // Giá trị tối đa cho thanh trượt
  const [dataMenu, setdataMenu] = useState([]);
  const [dataCategory, setdataCategory] = useState([]);

  // Hàm dùng để lấy dữ liệu từ API
  const fetchData = useCallback(async (url, setData, errorMessage) => {
    try {
      const response = await AxiosInstance().get(url);
      setData(response || []); // Nếu không có dữ liệu, đặt mảng rỗng
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  }, []);

  // Lấy dữ liệu menu
  const getData = useCallback(() => {
    fetchData('/menu/get', setdataMenu, 'Failed to fetch data from /menu/get');
  }, [fetchData]);

  // Lấy dữ liệu danh mục
  const getCategory = useCallback(() => {
    fetchData(
      '/category/get',
      setdataCategory,
      'Failed to fetch data from /category/get',
    );
  }, [fetchData]);

  // Lấy menu theo danh mục
  const getMenuByCategory = useCallback(() => {
    if (idCategory) {
      fetchData(
        `/menu/getByCategory/${idCategory}`,
        setdataMenu,
        'Failed to fetch data from /menu/getByCategory/',
      );
    }
  }, [fetchData, idCategory]);

  // Tìm kiếm linh hoạt
  const handleFlexibleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Thông báo', 'Tên món ăn không được để trống.');
      return;
    }
    setIsLoading(true);
    setidCategory(null); // Đặt lại danh mục
    Keyboard.dismiss(); // Ẩn bàn phím
    try {
      const response = await AxiosInstance().get(
        `/menu/search?name=${searchQuery}&minPrice=10000&maxPrice=${sliderValue}`,
      );
      setdataMenu(response || []); // Đặt dữ liệu menu
    } catch (error) {
      console.error('Error fetching data from /menu/search:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, sliderValue]);

  // Lấy dữ liệu khi component được mount
  useEffect(() => {
    getData();
    getCategory();
  }, [getData, getCategory]);

  // Cập nhật menu khi danh mục thay đổi
  useEffect(() => {
    getMenuByCategory();
  }, [getMenuByCategory]);

  // Định dạng giá tiền
  const formatPrice = price =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Thay đổi danh mục
  const handleCategoryChange = useCallback(
    categoryId => {
      setidCategory(categoryId);
      setSearchQuery(''); // Đặt lại ô tìm kiếm
      getMenuByCategory();
    },
    [getMenuByCategory],
  );

  // Xử lý khi chọn món ăn
  const handleItemSelect = item => {
    const category = dataCategory.find(cat => cat._id === item.categoryId);
    if (category) {
      handleCategoryChange(category._id);
    }
  };

  // Render phần đầu của danh sách
  const renderHeader = useCallback(
    () => (
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
            <TouchableOpacity onPress={handleFlexibleSearch}>
              <Image
                style={styles.ic_search}
                source={require('../../icon/ic_search.png')}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Tìm kiếm món ăn"
              placeholderTextColor={'#888'}
              style={styles.content_search}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleFlexibleSearch}
              returnKeyType="search"
            />
          </View>
        </View>
        <View style={styles.priceSearchContainer}>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={10000}
              maximumValue={500000}
              step={1000}
              value={sliderValue}
              onValueChange={setSliderValue}
              onSlidingComplete={setSliderValue}
              minimumTrackTintColor="#95AE45"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#95AE45"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>10,000 VND</Text>
              <Text style={styles.sliderLabelText}>
                {formatPrice(sliderValue)} VND
              </Text>
            </View>
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
                onchangeIdCategory={handleCategoryChange}
                onPress={() => handleCategoryChange(item._id)}
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
    ),
    [dataCategory, idCategory, handleCategoryChange, searchQuery, sliderValue],
  );

  // Render phần cuối của danh sách
  const renderFooter = useCallback(() => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color="#95AE45" />;
  }, [isLoading]);

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={dataMenu}
      renderItem={({item}) => (
        <Item_List_Order data={item} onPress={() => handleItemSelect(item)} />
      )}
      keyExtractor={item => item._id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.foodListContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      ListEmptyComponent={() => (
        <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
      )}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
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
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    flexDirection: 'row',
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
  priceSearchContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  sliderContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 5,
  },
  slider: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  sliderLabelText: {
    fontSize: 14,
    color: '#444',
    fontWeight: 'bold',
  },
  priceLabel: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  searchButton: {
    backgroundColor: '#95AE45',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  foodListContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#95AE45',
  },
});

export default HomeMenu;
