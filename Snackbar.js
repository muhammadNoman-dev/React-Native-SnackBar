import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Easing,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Bubble from "./assets/bubbles.png";
import Back from "./assets/back.png";

const Snackbar = ({ title, message, contype, position, visible }) => {
  const animatedValue = useRef(new Animated.Value(0));

  const showSnackbar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const hideSnackbar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
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
        style={[
          styles.container,
          {
            backgroundColor:
              contype === "warning"
                ? "#e69840"
                : contype === "failure"
                ? "#f75452"
                : contype === "success"
                ? "#30db6c"
                : contype === "help"
                ? "#3987e6"
                : "brown",
          },
        ]}
      >
        <View style={{ width: "10%" }}>
          <View style={styles.containerLeft}>
            <AntDesign
              style={{ zIndex: 1 }}
              name="question"
              size={25}
              color="white"
            />
            <Image
              resizeMode={"contain"}
              tintColor={
                contype === "warning"
                  ? "#ad5e03"
                  : contype === "failure"
                  ? "#c70806"
                  : contype === "success"
                  ? "#038a32"
                  : contype === "help"
                  ? "#054fa8"
                  : "brown"
              }
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
          tintColor={
            contype === "warning"
              ? "#ad5e03"
              : contype === "failure"
              ? "#c70806"
              : contype === "success"
              ? "#038a32"
              : contype === "help"
              ? "#054fa8"
              : "brown"
          }
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
          style={{
            display: "flex",
            flexDirection: "column",
            width: "65%",
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={2} style={styles.message}>
            {message}
          </Text>
        </View>
        <AntDesign
          name="close"
          size={18}
          color="white"
          onPress={() => hideSnackbar()}
        />
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
  containerLeft: {
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -15,
    left: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    borderRadius: 20,
    height: 80,
    padding: 10,
  },
  snackbar: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    paddingTop: Platform.OS === "android" ? "15%" : 0,
  },
});
