import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Item_List_History from '../../item/Item_List_History';

const DATAhistory = [
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
    title: 'Gura 3',
    price: '1000'
  },
  {
    id: '4',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 4',
    price: '1000'
  },
  {
    id: '5',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 5',
    price: '1000'
  },
  {
    id: '6',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 6',
    price: '1000'
  },
  {
    id: '7',
    image: "https://tse3.mm.bing.net/th?id=OIP.jgSKnzfbsAaRWxczKM4OZwAAAA&pid=Api&P=0&h=220",
    title: 'Gura 7',
    price: '1000'
  },
  
  
];
const History = () => {

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={DATAhistory}
        extraData={DATAhistory}
        renderItem={({item}) => <Item_List_History data={item} />}
        keyExtractor={item => item.id}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  
  )
}
 const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    list: {
      marginTop: 20,
    }
 })

export default History