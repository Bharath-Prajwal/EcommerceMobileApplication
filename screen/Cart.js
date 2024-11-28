import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./userContext";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";

const Cart = () => {
  const { userData } = useContext(UserContext);
  const { data } = userData;
  const { mail } = data;
  const [cartItems, setcartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCartItems = async () => {
    try {
      const res = await axios.post("http://10.0.2.2:8000/popfromcart", {
        mail,
      });
      setcartItems(res.data.data);
      calculateTotal(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCartItems();
  }, [cartItems]);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const res = await axios.put("http://10.0.2.2:8000/updateQuantity", {
        id,
        quantity,
      });
      if (res.status === 200) {
        fetchCartItems(); // Refresh cart items to reflect new quantity
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error updating quantity");
    }
  };

  const deleteFromCart = async (id) => {
    try {
      const res = await axios.delete(`http://10.0.2.2:8000/delete/${id}`);
      if (res.status === 200) {
        Alert.alert("Successfully deleted from cart");
        fetchCartItems();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      {/* Display the cart items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id} // Unique key for each item
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              borderColor: "grey",
              borderWidth: 2,
              width: "auto",
              backgroundColor: "white",
              padding: 8,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <View
              style={{
                flexDirection: "column",
                width: Dimensions.get("screen").width * 0.65,
                justifyContent: "space-between",
              }}
            >
              <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
              <Text style={{ fontSize: 20 }}>Price: ₹{item.price}</Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  onPress={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Feather name="minus-square" size={24} color="black" />
                </Pressable>
                <Text style={{ fontSize: 20, padding: 5 }}>
                  {item.quantity}
                </Text>
                <Pressable
                  onPress={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  <Feather name="plus-square" size={24} color="black" />
                </Pressable>

                <Pressable
                  onPress={() => deleteFromCart(item._id)}
                  style={{
                    marginLeft: Dimensions.get("screen").width * 0.47,
                    borderBlockColor: "grey",
                    borderWidth: 1,
                    width: 34,
                  }}
                >
                  <EvilIcons name="trash" size={34} color="black" />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <View style={{marginTop:Dimensions.get('screen').height*0.86,position:'absolute',marginLeft:Dimensions.get('screen').width*0.25}}>
        <Text style={{fontSize:20,borderWidth:1,borderColor:'black',backgroundColor:'gold',padding:8,borderRadius:10}}>Total Amount: ₹{totalAmount}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
