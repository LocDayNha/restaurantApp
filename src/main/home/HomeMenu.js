import React, {useMemo, useState, useEffect} from 'react';
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
  ScrollView,
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

  const toProfile = () => {
    navigation.navigate('Profile');
  };
  const toHistory = () => {
    navigation.navigate('History');
  };

  const [position, setPosition] = useState(0); // slide ảnh quảng cáo
  const [idCategory, setidCategory] = useState(null);

  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  // get all menu
  const [dataMenu, setdataMenu] = useState([]);
  const getData = async () => {
    setLoading(true); // Start loading
    const dataFood = await AxiosInstance().get('/menu/get');
    setLoading(false); // End loading
    if (!dataFood || dataFood.length === 0) {
      console.log('Lấy dữ liệu thấy bại của /menu/get');
    } else {
      setdataMenu(dataFood);
    }
  };

  // get menu by category
  const getMenuByCategory = async () => {
    setLoading(true); // Start loading
    const dataByCategory = await AxiosInstance().get(
      '/menu/getByCategory/' + idCategory,
    );
    setLoading(false); // End loading
    if (!dataByCategory || dataByCategory.length === 0) {
      console.log('Lấy dữ liệu thấy bại của /menu/getByCategory/');
    } else {
      setdataMenu(dataByCategory);
    }
  };

  // get category
  const [dataCategory, setdataCategory] = useState([]);
  const getCategory = async () => {
    setLoading(true); // Start loading
    const dataCate = await AxiosInstance().get('/category/get');
    setLoading(false); // End loading
    if (!dataCate || dataCate.length === 0) {
      console.log('Lấy dữ liệu thấy bại của /category/get');
    } else {
      setdataCategory(dataCate);
    }
  };

  useEffect(() => {
    getData();
    getCategory();
    return () => {};
  }, []);

  useEffect(() => {
    if (idCategory && idCategory !== null) {
      getMenuByCategory();
    }
  }, [idCategory]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [sortAscending, setSortAscending] = useState(true); // New state for sorting

  const priceRanges = [
    {label: '10.000 - 50.000', min: 10000, max: 50000},
    {label: '50.000 - 100.000', min: 50000, max: 100000},
    {label: '100.000 - 200.000', min: 100000, max: 200000},
    {label: '200.000 - 500.000', min: 200000, max: 500000},
  ];

  const handleSearch = async () => {
    const selectedRange = priceRanges.find(
      range => range.label === selectedPriceRange,
    );
    const {min, max} = selectedRange || {};

    // Đảm bảo min và max được định nghĩa trước khi thực hiện yêu cầu
    if (min !== undefined && max !== undefined) {
      const dataSearch = await AxiosInstance().post('/menu/search', {
        name: searchQuery,
        minPrice: min,
        maxPrice: max,
      });

      if (!dataSearch || dataSearch.length === 0) {
        console.log('Không tìm thấy kết quả');
        ToastAndroid.show('Không tìm thấy kết quả', ToastAndroid.SHORT);
        setdataMenu([]); // Xóa dữ liệu menu
      } else {
        // Lọc dữ liệu trên client để đảm bảo chỉ hiển thị món trong khoảng giá
        const filteredData = dataSearch.filter(
          item => item.price >= min && item.price <= max,
        );
        setdataMenu(filteredData);
      }
    } else {
      // Tìm kiếm chỉ theo tên nếu không có khoảng giá
      const dataSearch = await AxiosInstance().post('/menu/search', {
        name: searchQuery,
      });

      if (!dataSearch || dataSearch.length === 0) {
        console.log('Không tìm thấy kết quả');
        setdataMenu([]); // Xóa dữ liệu menu
      } else {
        setdataMenu(dataSearch);
      }
    }
  };

  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
    setdataMenu(prevData =>
      [...prevData].sort((a, b) =>
        sortAscending ? a.price - b.price : b.price - a.price,
      ),
    );
  };

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header_container}>
        <Text style={styles.header}>Phoenix Restaurant</Text>
        <Image
          style={styles.avata}
          source={require('../../image/logo_phoenixRestaurant.png')}
        />
      </View>

      {/* Tìm kiếm */}
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
        </View>

        {/* Price Range Button */}
        <TouchableOpacity
          style={styles.priceRangeButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.priceRangeText}>
            {selectedPriceRange || 'Chọn khoảng giá'}
          </Text>
        </TouchableOpacity>

        {/* Sort Button */}
        <TouchableOpacity style={styles.sortButton} onPress={handleSortToggle}>
          <Text style={styles.sortButtonText}>
            {sortAscending ? 'Giá tăng dần' : 'Giá giảm dần'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Price Range Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn khoảng giá</Text>
            <ScrollView>
              {priceRanges.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalButton}
                  onPress={() => {
                    setSelectedPriceRange(range.label);
                    setModalVisible(false);
                    handleSearch(); // Kích hoạt tìm kiếm ngay sau khi chọn khoảng giá
                  }}>
                  <Text style={styles.modalButtonText}>{range.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setSelectedPriceRange('');
                  setModalVisible(false);
                  handleSearch(); // Tìm kiếm chỉ theo tên
                }}>
                <Text style={styles.modalButtonText}>Bỏ chọn</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
          renderItem={({item}) => (
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
      renderItem={({item}) => <Item_List_Order data={item} />}
      keyExtractor={item => item._id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.foodListContainer}
      ListEmptyComponent={
        loading ? (
          <Text style={styles.noResultsText}>Đang tải...</Text>
        ) : (
          <Text style={styles.noResultsText}>Không tìm thấy sản phẩm nào !!!</Text>
        )
      } // Display loading message or no results message
    />
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
  content_search: {
    fontSize: 16,
    flex: 1,
    width: '85%',
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
