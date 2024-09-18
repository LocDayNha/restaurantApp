import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native'
import React,{useState} from 'react'


const Item_List_Order = (props) => {
  const {data} = props
    // const [selected, setSelected] = useState(false);

    // const Select = () => {
    //   setSelected(true)
    //   styles.item.backgroundColor = '#000000'
    // }
    

  return (
    <TouchableOpacity elevation={5} style={styles.item}>
      <Image style={styles.avata} source={{uri: data.image}}/>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.price}>{data.price}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    avata: {
        width: 100, height: 100,
        borderRadius: 50,
        marginVertical: 8,
      },
    item: {
      width: 150, height: 170,
      shadowColor: 'black', shadowOffset: {width:0, height: 3},shadowRadius: 1, shadowOpacity: 0.8,
      alignItems: 'center',
      marginVertical: 8,
      marginHorizontal: 10,
      borderRadius: 30,
      backgroundColor: '#ffffff',
      flexDirection: 'column',
    },
    title: {
      fontSize: 16,
      color:'#000000'
    },
    price: {
      fontSize: 15,
      color:'#888'
    },
});
export default Item_List_Order