import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screen/login';
import AntDesign from '@expo/vector-icons/AntDesign';
import Register from '../screen/Register';
import Entypo from '@expo/vector-icons/Entypo';
import Home from '../screen/Home';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screen/Profile';
import Product from '../screen/Product';
import ProductItem from '../component/ProductItem';
import Productinfo from '../screen/Productinfo';
import Cart from '../screen/Cart';

const Navigation = () => {
    const Stack=createNativeStackNavigator();
    const Tab=createBottomTabNavigator();
    const TabNavigation=()=>{
      return(
        <Tab.Navigator>
          <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerShown:false,
            tabBarLabel:"Home",
            tabBarIcon:({focused})=>focused?(<Entypo name="home" size={24} color="black" />):(<AntDesign name="home" size={24} color="black" />)
            }}/>
          <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            headerShown:false,
            tabBarLabel:"Profile",
            tabBarIcon:({focused})=>focused?(<FontAwesome name="user" size={24} color="black" />):(<AntDesign name="user" size={24} color="black" />)
            }}/>
          <Tab.Screen 
          name="Cart" 
          component={Cart} 
          options={{
            headerShown:false,
            tabBarLabel:"cart",
            tabBarIcon:({focused})=>focused?(<Entypo name="shopping-cart" size={24} color="black" />):(<AntDesign name="shoppingcart" size={24} color="black" />)
            }}/>
        </Tab.Navigator>
      )
    }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Main" component={TabNavigation} options={{headerShown:false}}/>
        <Stack.Screen name='info' component={Productinfo} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation