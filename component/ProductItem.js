import { View, Text, Pressable, Image, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo';
import { UserContext } from '../screen/userContext';
import axios from 'axios';
const ProductItem = ({item}) => {
  const {userData}=useContext(UserContext);
  const {data}=userData;
  const {name,password,mail}=data;

  const addtoCart=()=>{
    const cartitem={
      mail:mail,
      image:item.image,
      title:item.title,
      price:item.price,
    }
    axios.post("http://10.0.2.2:8000/pushtocart",cartitem)
    .then((res)=>{
      Alert.alert("Item added to cart");
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <Pressable style={{marginHorizontal:20,marginVertical:20}}>
        <Image style={{height:150,width:150,resizeMode:'contain'}} source={{uri:item?.image}}/>
        <Text numberOfLines={1} style={{width:150}}>{item?.title}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontWeight:'bold',fontSize:20}}>₹{item?.price}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{fontWeight:'bold',fontSize:20}}>{item?.rating?.rate}</Text>
        <Entypo name="star" size={24} color="gold" />
        </View>
        </View>
        <TouchableOpacity onPress={addtoCart} style={{alignItems:'center',borderColor:'gold',borderWidth:2,backgroundColor:'gold',borderRadius:10}}>
            <Text style={{padding:8,fontWeight:'bold'}}>Add to cart</Text>
        </TouchableOpacity>
    </Pressable>
  )
}

export default ProductItem