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

const HomeMenu = props => {
  const {navigation} = props;

  const [position, setPosition] = useState(0);
  const [idCategory, setidCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataMenu, setdataMenu] = useState([]);
  const [dataCategory, setdataCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const priceRanges = [
    {label: '10.000 - 100.000', min: 10000, max: 100000},
    {label: '100.000 - 200.000', min: 100000, max: 200000},
    {label: '200.000 - 300.000', min: 200000, max: 300000},
    {label: '300.000 - 400.000', min: 300000, max: 400000},
    {label: '400.000 - 500.000', min: 400000, max: 500000},
  ];

  const getData = async () => {
    setLoading(true);
    const dataFood = await AxiosInstance().get('/menu/get');
    setLoading(false);
    if (!dataFood || dataFood.length === 0) {
      console.log('Lấy dữ liệu thất bại của /menu/get');
    } else {
      setdataMenu(dataFood);
    }
  };

  const getMenuByCategory = async categoryId => {
    setLoading(true);
    const dataByCategory = await AxiosInstance().get(
      '/menu/getByCategory/' + categoryId,
    );
    setLoading(false);
    if (!dataByCategory || dataByCategory.length === 0) {
      console.log('Lấy dữ liệu thất bại của /menu/getByCategory/');
    } else {
      setdataMenu(dataByCategory);
    }
  };

  const getCategory = async () => {
    setLoading(true);
    const dataCate = await AxiosInstance().get('/category/get');
    setLoading(false);
    if (!dataCate || dataCate.length === 0) {
      console.log('Lấy dữ liệu thất bại của /category/get');
    } else {
      setdataCategory(dataCate);
    }
  };

  useEffect(() => {
    getData();
    getCategory();
  }, []);

  useEffect(() => {
    if (idCategory && idCategory !== null) {
      getMenuByCategory(idCategory);
    }
  }, [idCategory]);

  const handleSearch = async () => {
    const selectedRange = priceRanges.find(
      range => range.label === selectedPriceRange,
    );
    const {min, max} = selectedRange || {};

    const searchParams = {};

    if (searchQuery) {
      searchParams.name = searchQuery;
    }

    if (min !== undefined && max !== undefined) {
      searchParams.minPrice = min;
      searchParams.maxPrice = max;
    }

    if (!searchQuery && (min === undefined || max === undefined)) {
      ToastAndroid.show(
        'Vui lòng nhập tên món ăn hoặc chọn mức giá',
        ToastAndroid.SHORT,
      );
      Keyboard.dismiss();
      return;
    }

    const dataSearch = await AxiosInstance().post('/menu/search', searchParams);

    if (!dataSearch || dataSearch.length === 0) {
      console.log('Không tìm thấy kết quả');
      ToastAndroid.show('Không tìm thấy món ăn', ToastAndroid.SHORT);
      setdataMenu([]);
      Keyboard.dismiss();
    } else {
      const filteredData = dataSearch.filter(item => {
        const matchesName = searchQuery
          ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        const matchesPrice =
          min !== undefined && max !== undefined
            ? item.price >= min && item.price <= max
            : true;
        return matchesName && matchesPrice;
      });

      setdataMenu(filteredData);
      Keyboard.dismiss();

      if (filteredData.length > 0) {
        const firstItemCategory = filteredData[0].categoryId;
        setidCategory(firstItemCategory);
      }
    }
  };

  const handleSortToggle = () => {
    setModalVisible(true);
  };

  const applySort = (ascending, reset = false) => {
    if (reset) {
      getData(); // Re-fetch the data to reset the order
    } else {
      setSortAscending(ascending);
      setdataMenu(prevData =>
        [...prevData].sort((a, b) =>
          ascending ? a.price - b.price : b.price - a.price,
        ),
      );
    }
    setModalVisible(false);
  };

  const handleCategorySelect = categoryId => {
    setidCategory(categoryId);
    getMenuByCategory(categoryId);
  };

  const handlePriceFilter = range => {
    setSelectedPriceRange(range.label);
    setPriceModalVisible(false);
    handleSearch();
  };

  const handlePriceFilterCancel = () => {
    setPriceModalVisible(false);
    setSelectedPriceRange(''); // Đặt lại phạm vi giá đã chọn

    if (searchQuery) {
      handleSearch(); // Tìm kiếm chỉ theo tên
    } else {
      ToastAndroid.show(
        'Bạn chỉ đang tìm kiếm theo tên món ăn.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header_container}>
        <Text style={styles.header}>Nhà hàng Phoenix</Text>
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
            placeholder="Nhập món cần tìm..."
            placeholderTextColor={'#888'}
            style={[
              styles.content_search,
              idCategory && {fontStyle: 'normal', color: '#555'},
            ]}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSortToggle}>
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
                    onchangeIdCategory={setidCategory}
                    onPress={() => handleCategorySelect(item._id)}
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
              onPress={() => applySort(true)}>
              <Text style={styles.modalButtonText}>Từ thấp đến cao</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => applySort(false)}>
              <Text style={styles.modalButtonText}>Từ cao đến thấp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => applySort(null, true)}>
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
            <Text style={styles.modalTitle}>Chọn mức giá</Text>
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
              onPress={handlePriceFilterCancel}>
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
    alignSelf: 'center',
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
    width: '85%',
  },
  banner: {
    marginLeft: '0%',
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
  list_food: {
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  foodListContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  priceRangeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    width: '90%',
    alignItems: 'center',
  },
  priceRangeText: {
    color: '#333',
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
  sortButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    width: '90%',
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});

export default HomeMenu;
