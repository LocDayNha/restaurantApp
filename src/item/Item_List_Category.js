import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const Item_List_Category = props => {
  const {data, bgcl, textColor, onchangeIdCategory} = props;

  const clickItem = () => {
    onchangeIdCategory(data._id);
  };

  return (
    <View
      elevation={5}
      style={[styles.item, {backgroundColor: bgcl}]}
      key={data._id}>
      <TouchableOpacity
        onPress={clickItem}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style={styles.avata} source={{uri: data.image}} />
        <Text style={[styles.title, {color: textColor}]}>{data.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  avata: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginVertical: 8,
  },
  item: {
    width: 90,
    height: 90,
    backgroundColor: '#95AE45',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 6,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.8,
    flexDirection: 'column',
  },
  title: {
    fontSize: 12,
    color: '#ffffff',
  },
});
export default Item_List_Category;
