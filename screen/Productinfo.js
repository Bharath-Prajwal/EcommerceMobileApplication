import { Alert, Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { UserContext } from './userContext';
import axios from 'axios';
const Productinfo = () => {
  const navigation=useNavigation();
  const route=useRoute();
  const {userData}=useContext(UserContext);
  const {data}=userData;
  const {name,password,mail}=data;

  const addtoCart=()=>{
    const cartitem={
      mail:mail,
      image:route.params.image,
      title:route.params.title,
      price:route.params.price,
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
    
    <SafeAreaView style={{backgroundColor:'white'}}>
      <AntDesign style={{marginLeft:Dimensions.get('screen').width*0.8,marginTop:Dimensions.get('screen').height*0.1}} name="sharealt" size={30} color="black" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item,index)=>(
          <Image style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height*0.45,marginTop:20,resizeMode:'center'}} source={{uri:item}} key={index}/>
        ))}
      </ScrollView>
      <Text style={{color:'black',fontSize:30,fontWeight:'bold',marginLeft:10}}>₹{route.params.price}</Text>
      <Text style={{color:'black',marginTop:10}}>{route.params.title}</Text>

      <TouchableOpacity onPress={addtoCart}style={{width:Dimensions.get('screen').width*0.8,backgroundColor:'gold',padding:10,alignItems:'center',marginLeft:Dimensions.get('screen').width*0.1,borderRadius:20,marginTop:20  }}>
        <Text>Add to cart</Text>
     </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Productinfo

const styles = StyleSheet.create({})