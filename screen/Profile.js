import { View, Text, Dimensions, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView,Button } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from './userContext'
import EvilIcons from '@expo/vector-icons/EvilIcons';

const Profile = () => {
  const {userData}=useContext(UserContext);
  const {data}=userData;
  const {name,password,mail}=data;
  const navigation=useNavigation();
  return (
    <SafeAreaView  style={{flex:1,backgroundColor:'white'}}>
      <View  style={{flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:Dimensions.get('screen').height*0.1}}>
      <EvilIcons style={{height:200}} name="user" size={200} color="black" />
      
        
        <Text style={{fontSize:25,fontWeight:'bold'}}>{name}</Text>
        <Text style={{fontSize:20,marginTop:10}}>{mail}</Text>
        <Text style={{fontSize:20,marginTop:10}}>{password}</Text>
      
      
      </View>
    </SafeAreaView>
  )
}

export default Profile

