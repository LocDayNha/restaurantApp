import { View, Text, StyleSheet, Image, TextInput, FlatList, SafeAreaView, ScrollView, } from 'react-native'
import React, {useMemo, useState, useEffect} from 'react'
import { SearchBar } from '@rneui/themed';

import Item_List_Category from '../../item/Item_List_Category';
import Item_List_Order from '../../item/Item_List_Order';
import Slideshow from 'react-native-image-slider-show';

const image = <Image source={require('../../icon/ic_search.png')}/>

//test list
const DATA = [
  {
    id: '7acbea-c1b1-46c2-ae5-3ad5b28ba',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 1',
    cateID: 'gr1',
  },
  {
    id: 'd7acbea-c1b1-4c2-aed5-3a53abb28ba',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 2',
    cateID: 'gr2',
  },
  {
    id: 'bacbea-c1b1-46c2-aed5-3ad53abb8a',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 4',
    cateID: 'gr3',
  },
  {
    id: 'cbea-1-46c2-aed5-3ad53abb28ba',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 3',
    cateID: 'gr4',
  },
  {
    id: '71b1-4c2-ed5-3ad53ab28ba',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 5',
    cateID: 'gr5',
  },
  
  
];

//test list
const DATAoder = [
  {
    id: '1',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 1',
    price: '2000'
  },
  {
    id: '2',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 2',
    price: '2000'
  },
  {
    id: '3',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 4',
    price: '1000'
  },
  
  
];

//list image
const Banner =[
  {
    url: "https://tse4.mm.bing.net/th?id=OIP.PrptVcgvLFXZ-dOyrIxIbwHaEK&pid=Api&P=0&h=220"
  },
  {
    url: "https://tse1.mm.bing.net/th?id=OIP.AqqmJFXr7aLUs8esOYE6GwHaEK&pid=Api&P=0&h=220"
  },
  {
    url: "https://staticg.sportskeeda.com/editor/2024/08/f3bbb-17250270311992-1920.jpg"
  }
]

const HomeMenu = (props) => {
  const [selectedId, setSelectedId] = useState()  // sắp xếp món ăn

  const [position, setPosition] = useState(0) // slide ảnh quảng cáo

  // danh sách loại món ăn (test)
  const [filter, setFilter] = useState([
    {
      id: '1',
      image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
      categoryID: 'gr1',
      title: 'Gura 1',
      price: '434'
    },
    {
      id: '2',
      image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
      categoryID: 'gr1',
      title: 'Gura 1',
      price: '43114'
    },
    {
      id: '3',
      image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
      categoryID: 'gr2',
      title: 'Gura 2',
      price: '54343'
    },
    {
      id: '4',
      image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
      categoryID: 'gr2',
      title: 'Gura 2',
      price: '865244'
    },
    {
      id: '5',
      image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
      categoryID: 'gr3',
      title: 'Gura 3',
      price: '8532'
    },
    {
      id: '6',
      image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
      categoryID: 'gr3',
      title: 'Gura 3',
      price: '9322'
    },
  ])

  const [ctgrID, setCTGRID] = useState('gr1') // id loại món ăn
  
  const filterList = useMemo(  // sắp xếp món ăn theo loại
    () => {
      if(ctgrID == 'gr1') return filter
        return filter.filter(itemListOder => ctgrID === itemListOder.categoryID)
    },
    [ctgrID, filter]
  )

  useEffect(()=>{
    const toggle = setInterval(() => {
      setPosition(position === Banner.length - 1 ? 0 : position + 1);
    }, 3000);

    return () => clearInterval(toggle);
  })

  return (
    //container
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center',backgroundColor: '#ffffff'}}>
        {/* header */}
        <View style={styles.header_container}>
          <Text style={styles.header}>Chào Phi đẹp trai</Text>
          <Image style={styles.avata} source={require('../../icon/gura.jpg')} />
        </View>

        {/* Tìm kiếm */}
        <View elevation={5} style={styles.search}>
          <Image style={styles.ic_search} source={require('../../icon/ic_search.png')} />
          <TextInput  placeholder='Tìm kiếm' placeholderTextColor={'#888'} style={styles.content_search}/>
          <Image style={styles.ic_search} source={require('../../icon/ic_delete.png')} />
        </View>

        {/* <SearchBar
          platform="android"
          containerStyle={styles.search}
          // inputContainerStyle={{}}
          // inputStyle={{}}
          // leftIconContainerStyle={{}}
          // rightIconContainerStyle={{}}
          // loadingProps={{}}
          //onChangeText={newVal => setValue(newVal)}
          placeholder="Type query here..."
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          searchIcon={image}
        /> */}

        {/* Hình gì đây chưa xác định ?? */}
        <Slideshow
        containerStyle={styles.banner}
        style={{height: 150}}
        height={150} 
        position={position} dataSource={Banner} 
        scrollEnabled={false}   
        />
        {/* Danh sách loại món ăn */}
        <View  style={styles.list_category}>
          <FlatList
            data={DATA}
            extraData={selectedId}
            renderItem={({item}) => <Item_List_Category data={item}
              onPress={() => [setSelectedId(item.id), setCTGRID(item.cateID)]}
              bgcl = {item.id === selectedId ? '#95AE45' : '#ffffff'}
              textColor = {item.id === selectedId ? 'white' : 'black'}
            />}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />   
        </View>
        

        {/* Danh sách món ăn */}
        <View  style={styles.list_food}>
          <FlatList 
            data={filterList}
            // extraData={DATAoder}
            //renderItem={({item}) => <Item_List_Order data={item} />}
            renderItem={({item}) => <Item_List_Order data={item} />}
            keyExtractor={item => item.id}
            horizontal={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
    
    
  )
}


//style
const styles = StyleSheet.create({
    header: {
      fontSize: 25,
      fontWeight: "bold",
      color: 'black',
    },
    avata: {
      width: 60, height: 60,
      borderRadius: 30,
    },
    header_container: {
      width: 350,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    search: {
      marginTop: 30,
      paddingLeft: 15,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      width: 350, height: 50,
      borderRadius: 10,
      shadowColor: 'black', shadowOffset: {width:0, height: 3},shadowRadius: 1, 
      shadowOpacity: 0.8,
      flexDirection: 'row',
      color: '#cccccc'
    },
    ic_search: {
      width: 25, height: 25,
      marginRight: 10
    },
    content_search: {
      fontSize: 20, 
      width: 250
    },
    content_delete: {
      width: 25, height: 25,
      marginRight: 10,
    },
    banner:{
      height: 150,
      marginTop: 20,
      borderRadius: 20,
    },
    list_category: {
      width: 350, 
      marginTop: 10,
    },
    list_food: {
      marginTop: 10,
      alignItems: 'center',
      flex: 1
    },

  });
export default HomeMenu
