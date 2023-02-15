import React, { useEffect, useRef, useState } from "react";
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

const Snackbar = ({ position, title, message, contype, duration = 3000 }) => {
  const animatedValue = useRef(new Animated.Value(0));
  const [timeoutId, setTimeoutId] = useState(null);

  const showSnackbar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start();

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      hideSnackbar();
    }, duration);

    setTimeoutId(id);
  };

  const hideSnackbar = () => {
    Animated.timing(animatedValue.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const getTintColor = () => {
    if (contype === "warning") return "#ad5e03";
    else if (contype === "failure") return "#c70806";
    else if (contype === "success") return "#038a32";
    else if (contype === "help") return "#054fa8";
    return "#c70806";
  };

  const getBackgroundColor = () => {
    if (contype === "warning") return "#e69840";
    else if (contype === "failure") return "#f75452";
    else if (contype === "success") return "#30db6c";
    else if (contype === "help") return "#3987e6";
    return "#f75452";
  };

  const getIcon = () => {
    if (contype === "warning") return "exclamation";
    else if (contype === "failure") return "close";
    else if (contype === "success") return "check";
    else if (contype === "help") return "question";
    return "close";
  };

  useEffect(() => {
    showSnackbar();
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

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
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        <View style={{ flex: 0.2 }}>
          <View style={styles.containerLeft}>
            <AntDesign
              style={{ zIndex: 1 }}
              name={getIcon()}
              size={20}
              color="white"
            />
            <Image
              resizeMode={"contain"}
              tintColor={getTintColor()}
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
          tintColor={getTintColor()}
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
            flex: 0.8,
            display: "flex",
            flexDirection: "column",
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
    fontSize: 12,
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
