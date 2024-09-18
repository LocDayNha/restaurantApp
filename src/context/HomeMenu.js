import { View, Text, StyleSheet, Image, TextInput, FlatList, SafeAreaView, } from 'react-native'
import React, {useMemo, useState} from 'react'
import { SearchBar } from '@rneui/themed';

import Item_List_Category from './Item_List_Category';
import Item_List_Order from './Item_List_Order';

const image = <Image source={require('../images/ic_search.png')}/>

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


const HomeMenu = (props) => {
  const [selectedId, setSelectedId] = useState()

  //test filter
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

  const [ctgrID, setCTGRID] = useState('gr1')
  
  const filterList = useMemo(
    () => {
      if(ctgrID == 'gr1') return filter.filter(itemListOder => ctgrID === itemListOder.categoryID)
        return filter.filter(itemListOder => ctgrID === itemListOder.categoryID)
    },
    [ctgrID, filter]
  )

  return (
    //container
    <View style={{flex: 1, paddingLeft: 20,backgroundColor: '#ffffff'}}>

      {/* header */}
      <View style={styles.header_container}>
        <Text style={styles.header}>Chào Phi đẹp trai</Text>
        <Image style={styles.avata} source={require('../images/gura.jpg')} />
      </View>

      {/* Tìm kiếm */}
      <View elevation={5} style={styles.search}>
        <Image style={styles.ic_search} source={require('../images/ic_search.png')} />
        <TextInput  placeholder='Tìm kiếm' placeholderTextColor={'#888'} style={styles.content_search}/>
        <Image style={styles.ic_search} source={require('../images/ic_delete.png')} />
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
      <Image style={styles.banner} source={require('../images/gura.jpg')} />

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
      <View  style={styles.list_order}>
        <FlatList
          data={filterList}
          // extraData={DATAoder}
          //renderItem={({item}) => <Item_List_Order data={item} />}
          renderItem={({item}) => <Item_List_Order data={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          numColumns={2}
        />
      </View>

    </View>
    
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
      marginRight: 20
    },
    header_container: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
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
      width: 350, height: 150,
      marginTop: 20,
      borderRadius: 20,
    },
    list_category: {
      width: 350, 
      marginTop: 10,
    },
    list_order: {
      width: 350, 
      marginTop: 10,
      alignItems: 'center',
    },

  });
export default HomeMenu
