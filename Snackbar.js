import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Bubble from "./assets/bubbles.png";
import Back from "./assets/back.png";

const Snackbar = ({ title, message, contype, position, visible }) => {
  const animatedValue = useRef(new Animated.Value(0));

  console.log("platform", Platform);

  const showSnackbar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const hideSnackbar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    visible ? showSnackbar() : hideSnackbar();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.snackbar,
        {
          [position]: animatedValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0],
          }),
        },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "green",
          borderRadius: 20,
          height: 80,
          padding: 15,
          backgroundColor: contype === "info" ? "yellow" : "green",
        }}
      >
        <View style={{ width: "15%" }}>
          <View
            style={{
              zIndex: 1,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: -25,
              left: 10,
            }}
          >
            <AntDesign
              style={{ zIndex: 1 }}
              name="question"
              size={25}
              color="white"
            />
            <Image
              resizeMode={"contain"}
              tintColor="#86e84d"
              style={{
                position: "absolute",
                height: 45,
              }}
              source={Back}
            />
          </View>
        </View>
        <Image
          resizeMode={"contain"}
          style={{
            position: "absolute",
            bottom: 0,
            width: 55,
            height: 45,
            borderBottomLeftRadius: 20,
          }}
          source={Bubble}
        />
        <View
          style={{ display: "flex", flexDirection: "column", width: "60%" }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={2} style={styles.message}>
            {message}
          </Text>
        </View>
        <AntDesign name="close" size={18} color="white" />
      </View>
    </Animated.View>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "bold",
  },
  message: {
    color: "white",
  },
  snackbar: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    paddingTop: Platform.OS === "android" ? "15%" : 0,
  },
});
