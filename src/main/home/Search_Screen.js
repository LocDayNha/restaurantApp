import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Item_List_Order from '../../item/Item_List_Order'
import AxiosInstance from '../../util/AxiosInstance'
const Search_Screen = () => {

    const [searchQuerry, setSearchQuerry] = useState("")

    const [dataMenu, setdataMenu] = useState([]);
    const getData = async () => {
        const dataFood = await AxiosInstance().get("/menu/get");
        if (!dataFood || dataFood.lenght === 0) {
        console.log('Lấy dữ liệu thấy bại của /menu/get');
        } else {
        setdataMenu(dataFood);
        }
    };

    const handlerSerch = (querry) => {
        if(querry == ""){
            getData()
        }
        else{
            setdataMenu(dataMenu.filter((dataMenu) => 
                dataMenu.name.toUpperCase().includes(querry.toUpperCase())
            ))
        }
       
    }

    useEffect(() => {
        getData()
        return () => {
        }
      }, [])
    return (
    <View>
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
                    clearButtonMode='alway'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(querry) => {handlerSerch(querry)}}
                />
            </View>
            <FlatList
                data={dataMenu}
                renderItem={({ item }) => <Item_List_Order data={item}/>}
                keyExtractor={item => item._id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.foodListContainer}
            />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        alignItems: 'center',
        marginTop: 20,
      },
      search: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: '90%',
        height: 45,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 1,
        shadowOpacity: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
      foodListContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: '5%'
      },
})

export default Search_Screen