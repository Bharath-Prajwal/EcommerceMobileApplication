import {
  View,
  Text,
  Button,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ProductItem from "../component/ProductItem";
import AntDesign from "@expo/vector-icons/AntDesign";
import { UserContext } from "./userContext";

const Home = () => {
  const navigation = useNavigation();
  
  
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];

  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "50",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40% off",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40% off",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        setItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
    
  }, []);
  return (
    <SafeAreaView style={{ flesx: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#F83788",
            flexDirection: "row",
            padding: 8,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              marginLeft: 20,
              borderColor: "black",
              borderWidth: 1,
              padding: 3,
              width: 250,
              borderRadius: 10,
            }}
            placeholder="search for products"
          />
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list?.map((item, index) => (
            <Pressable
              key={item.id}
              style={{ alignItems: "center", marginLeft: 10 }}
            >
              <Image
                style={{ width: 60, height: 60, resizeMode: "contain" }}
                source={{ uri: item?.image }}
              />
              <Text>{item?.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            fontSize: 20,
            marginLeft: 30,
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          Trending Deal's Of the week
        </Text>
        <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 30 }}>
          {deals?.map((item, index) => (
            <Pressable
              key={item.id}
              style={{ marginLeft: 20, marginRight: 10 }}
            >
              <Image
                style={{ height: 200, width: 150 }}
                source={{ uri: item?.image }}
              />
            </Pressable>
          ))}
        </View>
        <Text
          style={{
            marginTop: 30,
            alignItems: "center",
            alignContent: "center",
            marginLeft: 30,
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Top Deals of the week
        </Text>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers?.map((item, index) => (
              <Pressable
                style={{ alignItems: "center", marginTop: 30 }}
                key={item.id}
                onPress={() => navigation.navigate("info",{
                  id:item.id,
                  image:item.image,
                  title:item.title,
                  price:item.price,
                  carouselImages:item.carouselImages,
                  color:item.color,
                  size:item.size,
                  price:item.price,
                  offer:item.offer,
                  item:item,
                })}
              >
                <Image
                  style={{
                    height: 120,
                    width: 120,
                    marginLeft: 20,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.image }}
                />
                <Text
                  style={{
                    backgroundColor: "red",
                    paddingLeft: 20,
                    width: 120,
                    color: "white",
                  }}
                >
                  UPTO {item?.offer}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {items?.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
