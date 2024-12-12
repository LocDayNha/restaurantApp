import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  Keyboard,
} from 'react-native';
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

const priceRanges = [
  {label: '10.000 - 100.000', min: 10000, max: 100000},
  {label: '100.000 - 200.000', min: 100000, max: 200000},
  {label: '200.000 - 300.000', min: 200000, max: 300000},
  {label: '300.000 - 400.000', min: 300000, max: 400000},
  {label: '400.000 - 500.000', min: 400000, max: 500000},
];

const HomeMenu = ({navigation}) => {
  const [position, setPosition] = useState(0);
  const [idCategory, setIdCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataMenu, setDataMenu] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPriceRange, setCurrentPriceRange] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', 'desc'

  const getData = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance().get('/menu/get');
      if (response && response.length > 0) {
        setDataMenu(response);
      } else {
        console.log('Không tìm thấy dữ liệu từ /menu/get');
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
      ToastAndroid.show('Lỗi Loading data', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const getMenuByCategory = async categoryId => {
    try {
      setLoading(true);
      const response = await AxiosInstance().get(
        `/menu/getByCategory/${categoryId}`,
      );
      if (response && response.length > 0) {
        setDataMenu(response);
      } else {
        setDataMenu([]);
        ToastAndroid.show('No items in this category', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching category menu:', error);
      ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance().get('/category/get');
      if (response && response.length > 0) {
        setDataCategory(response);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const searchParams = {};

      if (searchQuery.trim()) {
        searchParams.name = searchQuery.trim();
      }

      if (currentPriceRange) {
        searchParams.minPrice = currentPriceRange.min;
        searchParams.maxPrice = currentPriceRange.max;
      }

      if (!searchQuery.trim() && !currentPriceRange) {
        ToastAndroid.show(
          'Vui lòng nhập tên món ăn hoặc chọn khoảng giá',
          ToastAndroid.SHORT,
        );
        return;
      }

      const response = await AxiosInstance().post('/menu/search', searchParams);

      if (response && response.length > 0) {
        let sortedData = [...response];
        if (sortOrder === 'asc') {
          sortedData.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
          sortedData.sort((a, b) => b.price - a.price);
        }
        setDataMenu(sortedData);
      } else {
        setDataMenu([]);
        ToastAndroid.show('Không có dữ liệu', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Search error:', error);
      ToastAndroid.show('Tìm kiếm thất bại', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  const handlePriceFilter = range => {
    setCurrentPriceRange(range);
    setPriceModalVisible(false);

    const searchParams = {
      minPrice: range.min,
      maxPrice: range.max,
    };

    if (searchQuery) {
      searchParams.name = searchQuery;
    }

    AxiosInstance()
      .post('/menu/search', searchParams)
      .then(response => {
        if (response && response.length > 0) {
          let sortedData = [...response];
          if (sortOrder === 'asc') {
            sortedData.sort((a, b) => a.price - b.price);
          } else if (sortOrder === 'desc') {
            sortedData.sort((a, b) => b.price - a.price);
          }
          setDataMenu(sortedData);
        } else {
          setDataMenu([]);
          ToastAndroid.show('Không có giá trị món ăn', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.error('Search error:', error);
        ToastAndroid.show('Đã xảy ra lỗi khi tìm kiếm', ToastAndroid.SHORT);
      });
  };

  const handleSort = order => {
    setSortOrder(order);
    setModalVisible(false);

    setDataMenu(prev => {
      const sorted = [...prev];
      if (order === 'asc') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (order === 'desc') {
        sorted.sort((a, b) => b.price - a.price);
      }
      return sorted;
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCurrentPriceRange(null);
    setSortOrder(null);
    getData();
    setModalVisible(false);
  };

  useEffect(() => {
    getData();
    getCategory();
  }, []);

  useEffect(() => {
    if (idCategory) {
      getMenuByCategory(idCategory);
    }
  }, [idCategory]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header_container}>
        <Text style={styles.header}>Phoenix Restaurant</Text>
        <Image
          style={styles.avata}
          source={require('../../image/logo_phoenixRestaurant.png')}
        />
      </View>

      <View elevation={5} style={styles.searchContainer}>
        <View style={styles.search}>
          <TouchableOpacity onPress={handleSearch}>
            <Image
              style={styles.ic_search}
              source={require('../../icon/ic_search.png')}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Nhập tên món ăn..."
            placeholderTextColor={'#888'}
            style={styles.content_search}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.ic_sort}
              source={require('../../icon/ic_filter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPriceModalVisible(true)}>
            <Image
              style={styles.ic_filter}
              source={require('../../icon/ic_sort.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
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
                    onchangeIdCategory={setIdCategory}
                    onPress={() => setIdCategory(item._id)}
                    bgcl={item._id === idCategory ? '#ffffff' : '#ffffff'}
                    textColor={item._id === idCategory ? 'black' : 'black'}
                  />
                )}
                keyExtractor={item => item._id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryListContainer}
              />
            </View>
          </>
        }
        data={dataMenu}
        renderItem={({item}) => <Item_List_Order data={item} />}
        keyExtractor={item => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.foodListContainer}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.noResultsText}>Đang tải...</Text>
          ) : (
            <Text style={styles.noResultsText}>Không tìm thấy món ăn !!!</Text>
          )
        }
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sắp xếp theo giá</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSort('asc')}>
              <Text style={styles.modalButtonText}>Thấp đến Cao</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSort('desc')}>
              <Text style={styles.modalButtonText}>Cao đến Thấp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={resetFilters}>
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={priceModalVisible}
        animationType="slide"
        onRequestClose={() => setPriceModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn khoảng giá</Text>
            {priceRanges.map(range => (
              <TouchableOpacity
                key={range.label}
                style={styles.modalButton}
                onPress={() => handlePriceFilter(range)}>
                <Text style={styles.modalButtonText}>{range.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setPriceModalVisible(false);
                setCurrentPriceRange(null);
              }}>
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
  avata: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginLeft: '8%',
  },
  header_container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  searchContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },
  ic_search: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  ic_sort: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  ic_filter: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  content_search: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  banner: {
    marginTop: 10,
    borderRadius: 20,
    width: '100%',
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
  foodListContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalButton: {
    padding: 12,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});

export default HomeMenu;
