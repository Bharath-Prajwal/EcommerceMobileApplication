import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screen/login';
import Navigation from './Navigations/Navigation';
import { UserContext } from './screen/userContext';
import { useState } from 'react';
export default function App() {
  const [userData,setUserData]=useState([]);
  return (
  
    <UserContext.Provider value={{userData,setUserData}}>
      <Navigation/>
    </UserContext.Provider>
  
  );
}


