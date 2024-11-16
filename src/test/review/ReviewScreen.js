import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const reviews = [
  {
    id: '1',
    name: 'Triệu Vân',
    rating: 5,
    time: '2 mins ago',
    review: 'Món ăn ngon, nhà hàng thoáng mát lịch sự',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    media: require('../../image/hamberger.png'),
  },
  {
    id: '2',
    name: 'Lữ Bố',
    rating: 4,
    time: '2 mins ago',
    review: 'Tạm ổn',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    media: require('../../image/hamberger.png')
  },
  {
    id: '3',
    name: 'Điêu Thuyền',
    rating: 3,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },
  {
    id: '4',
    name: 'Điêu Thuyền',
    rating: 3,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },
  {
    id: '5',
    name: 'Điêu Thuyền',
    rating: 5,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },
  {
    id: '6',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '7',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '8',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '9',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '10',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '11',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '12',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '13',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '14',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '15',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '16',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '17',
    name: 'Điêu Thuyền',
    rating: 3,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },{
    id: '18',
    name: 'Điêu Thuyền',
    rating: 1,
    time: '2 mins ago',
    review: 'Nhà hàng đặt bàn hơi lâu',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    media: require('../../image/goiga.png'),
  },
];

// Chức năng tạo sao dựa trên xếp hạng
const getStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

// Hàm tính điểm đánh giá trung bình
const calculateAverageRating = (reviews) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

// Hàm đếm số lượng đánh giá cho mỗi xếp hạng sao (1-5)
const getStarCount = (reviews, starRating) => {
  return reviews.filter((review) => review.rating === starRating).length;
};

const ReviewScreen = () => {
  const averageRating = useMemo(() => calculateAverageRating(reviews), [reviews]);

  const renderReview = useCallback(({ item }) => (
    <View style={styles.reviewContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.reviewContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.stars}>{getStars(item.rating)}</Text>
        <Text style={styles.reviewText}>{item.review}</Text>

        {/* Display media (image or video) if available */}
        {item.media ? (
          typeof item.media === 'string' && item.media.endsWith('.mp4') ? (
            <View style={styles.mediaContainer}>
              <Video
                source={{ uri: item.media }}
                style={styles.media}
                controls
                resizeMode="contain"
                onError={(error) => console.log('Video error:', error)}
              />
            </View>
          ) : (
            <View style={styles.mediaContainer}>
              <Image source={item.media} style={styles.media} />
            </View>
          )
        ) : null}
      </View>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {/* <View style={styles.backButtonContainer}>
        <TouchableOpacity>
          <Image 
            source={require('../icon/back.png')} 
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
      </View> */}
      <View style={styles.header}>
        <Text style={styles.title}>Đánh giá liên quan</Text>
      </View>

      <View style={styles.ratingSummary}>
        <Text style={styles.ratingNumber}>{averageRating.toFixed(1)}</Text>
        <Text style={styles.reviewCount}>{reviews.length} Reviews</Text>

        {/* Star Rating Chart */}
        {[5, 4, 3, 2, 1].map((star) => (
          <View key={star} style={styles.starRow}>
            <Text style={styles.starText}>{star}</Text>
            <Text style={styles.star}>★</Text>
            <View style={styles.starBarContainer}>
              <View
                style={[
                  styles.starBar,
                  {
                    width: `${(getStarCount(reviews, star) / reviews.length) * 100}%`, // Display percentage for each star rating
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewList}
        initialNumToRender={5} // Initially render 5 reviews
        maxToRenderPerBatch={10} // Max number of reviews to render per batch
        windowSize={5} // How many items to render offscreen
      />

      <TouchableOpacity style={styles.writeReviewButton}>
        <Text style={styles.buttonText}>Thêm đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButtonContainer: {
    position: 'absolute', 
    top: 20,  
    left: 15, 
    zIndex: 1, 
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    right:-90
  },
  ratingSummary: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  reviewCount: {
    color: 'black',
    fontSize: 14,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starText: {
    fontSize: 16,
    color: 'black',
    width: 20,
  },
  star: {
    left: -5,
    fontSize: 20,
    color: '#ffcc00',
    top: -2,
  },
  starBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  starBar: {
    height: 8,
    backgroundColor: 'black',
  },
  reviewList: {
    paddingBottom: 80,
  },
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  stars: {
    fontSize: 14,
    color: '#ffcc00',
    marginBottom: 5,
  },
  time: {
    color: '#6b6b6b',
    fontSize: 12,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: 'black',
  },
  mediaContainer: {
    marginTop: 10,
  },
  mediaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  writeReviewButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReviewScreen;
