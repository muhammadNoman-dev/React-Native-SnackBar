import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import Snackbar from "./Snackbar";
import { useState } from "react";

export default function App() {
  const [openSnackBar, setOpenSnackBar] = useState(false);

  return (
    <SafeAreaView style={styles.snackbar}>
      <View style={styles.snackbar}>
        <Snackbar
          visible={openSnackBar}
          position="top"
          title={"Congratulations"}
          message="You have successfully read this message. Please continue working!"
          contype={"success"}
        />
        <Button
          title="press me"
          onPress={() => setOpenSnackBar(!openSnackBar)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
