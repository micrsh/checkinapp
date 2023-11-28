import { StatusBar } from "expo-status-bar";
import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Settings,
  Animated,
} from "react-native";
import { useRef, useState } from "react";
// Tab icons
import usericon from "./assets/usericon.png";
import home from "./assets/home.png";
import search from "./assets/search.png";
import noti from "./assets/noti.png";
import setting from "./assets/setting.png";
import logout from "./assets/logout.png";

// Menu
import menu from "./assets/menu.png";
import close from "./assets/close.png";

// Photo
import khanthieunhi from "./assets/khanthieunhi.png";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

export default function App() {
  const [currentTab, setCurrentTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);

  // Animation properties
  const offSetValue = useRef(new Animated.Value(0)).current;

  // Scale Initally
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffSet = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
        <Image source={usericon} style={{ width: 60, height: 60 }}></Image>

        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Trưởng Hiếu
        </Text>

        <TouchableOpacity>
          <Text style={{ color: "white", marginTop: 10 }}>View Profile</Text>

          <View style={{ flexGrow: 0.8, marginTop: 50 }}>
            {tabButton(currentTab, setCurrentTab, "Home", home)}
            {tabButton(currentTab, setCurrentTab, "Search", search)}
            {tabButton(currentTab, setCurrentTab, "Notification", noti)}
            {tabButton(currentTab, setCurrentTab, "Setting", setting)}
          </View>

          <View>{tabButton(currentTab, setCurrentTab, "Logout", logout)}</View>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          // Transforming view
          transform: [{ scale: scaleValue }, { translateX: offSetValue }],
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffSet,
              },
            ],
          }}
        >
          {/* Button menu + Animation Tap */}
          <TouchableOpacity
            onPress={() => {
              // Do action Menu
              // Scalling the view

              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(offSetValue, {
                toValue: showMenu ? 0 : 220,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(closeButtonOffSet, {
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();

              setShowMenu(!showMenu);
            }}
          >
            <Image
              source={showMenu ? close : menu}
              style={{
                width: 30,
                height: 30,
                tintColor: "black",
                marginTop: 60,
              }}
            ></Image>
          </TouchableOpacity>
        </Animated.View>
        <View>{showTab(currentTab)}</View>
      </Animated.View>
    </SafeAreaView>
  );
}

const showTab = (currentTab) => {
  if (currentTab == "Home") {
    return (
      <View on>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
          {currentTab}
        </Text>

        <Image
          source={khanthieunhi}
          style={{ width: "100%", height: 150, marginTop: 20 }}
        ></Image>

        <Text style={{ fontSize: 25, paddingTop: 20 }}>
          Khăn quàng
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            {" "}
            Ngành Thiếu:
          </Text>
        </Text>
        <Text style={{ fontSize: 15, paddingTop: 10 }}>
          Màu xanh nước biển, với hình thập giá Chúa Kitô màu vàng ở phía sau.
          Màu xanh nước biển tượng trưng cho sức sống vươn lên mạnh mẽ như trời
          xanh biển rộng và một hy vọng lớn cho tương lai mà các em cần hy sinh
          để khuất phục gian khó một cách anh hùng.
        </Text>
      </View>
    );
  } else if (currentTab == "Search") {
    return (
      <View on>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
          {currentTab}
        </Text>
        <QRCodeScanner onRead={({data}) => alert(data)} flashMode={RNCamera.Constants.FlashMode.torch}>

        </QRCodeScanner>
      </View>
    );
  } else if (currentTab == "Notification") {
    return (
      <View on>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
          {currentTab}
        </Text>
      </View>
    );
  } else {
    return (
      <View on>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
          {currentTab}
        </Text>
      </View>
    );
  }
};

const tabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title == "Logout") {
        } else {
          setCurrentTab(title);
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == title ? "white" : "transparent",
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 8,
          marginTop: 10,
        }}
      >
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: currentTab == title ? "black" : "white",
          }}
        ></Image>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingLeft: 15,
            color: currentTab == title ? "black" : "white",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#65a0f7",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
