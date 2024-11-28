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
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  handleRegister = () => {
    const user = {
      name: name,
      mail: mail,
      password: password,
    };
    axios
      .post("http://10.0.2.2:8000/users", user)
      .then((response) => {
        Alert.alert("Success");
        setMail("");
        setName("");
        setPassword("");

        navigation.navigate("Login")
      })
      .catch((error) => {
        if(error.message==="Request failed with status code 401"){
          Alert.alert("User already Exists");
        }
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          flexDirection: "column",
          marginLeft: 20,
          marginRight: 20,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Register</Text>
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
          <Feather style={styles.icon} name="user" size={30} color="black" />
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            style={styles.input1}
            placeholder="Enter your name"
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
        <TouchableOpacity onPress={handleRegister} style={styles.btn}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
