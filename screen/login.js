import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { UserContext } from "./userContext";

const Login = () => {
  const {userData, setUserData} = useContext(UserContext);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  handleLogin = () => {
    const user = {
      mail: mail,
      password: password,
    };
    
    axios
      .post("http://10.0.2.2:8000/login", user)
      .then((res) => {
        setMail("");
        setPassword("");
        setUserData(res.data);
        console.log(userData);
        //Alert.alert("Success");
      navigation.navigate("Main")
      })
      .catch((err) => {
        if(err.message==="Request failed with status code 401"){
          Alert.alert("User not exists");
        }
        if(err.message==="Request failed with status code 403"){
          Alert.alert("Invalid password");
        }
      });
  };

  

  return (
    
      <SafeAreaView>
        <View
          style={{
            flexDirection: "column",
            marginLeft: 20,
            marginRight: 20,
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Login</Text>
          <View style={styles.userview}>
            <MaterialCommunityIcons name="gmail" size={30} color="black" />
            <TextInput
              value={mail}
              onChangeText={(text) => {
                setMail(text);
              }}
              style={styles.input1}
              placeholder="Enter your email"
            />
          </View>
          <View style={styles.userview}>
            <Feather style={styles.icon} name="lock" size={30} color="black" />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              style={styles.input1}
              placeholder="Enter your password"
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-start",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "blue", fontSize: 18 }}>Forgot password?</Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ color: "blue", fontSize: 16 }}
          >
            signup
          </Text>
        </View>
      </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    marginTop: Dimensions.get("screen").height * 0.2,
    color: "#F83758",
  },
  input1: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: Dimensions.get("screen").width * 0.7,
    fontSize: 20,
  },
  userview: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F83758",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 30,
  },
  icon: {
    paddingLeft: 3,
  },
  btn: {
    marginTop: 30,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "#F83758",
    padding: 18,
    alignItems: "center",
    borderRadius: 20,
  },
  btnText: {
    alignContent: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
